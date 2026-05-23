// =============================================================
// chapter-l3-m6.jsx — Libro 3, Módulo 6: Testing y calidad
// =============================================================

function ChapterL3M6({ onNav }) {
  const flat = flatTOC();
  const idx  = flat.findIndex(c => c.id === 'l3-m6');
  const prev = idx > 0 ? flat[idx - 1] : null;
  const next = idx < flat.length - 1 ? flat[idx + 1] : null;

  return (
    <article className="reader-inner">
      <ChapterHeader
        book="// libro 3 · del código al mundo real"
        module="módulo 06"
        time="≈ 65 min"
        title={<>Testing y calidad</>}
        dek="El código sin tests es código que solo funciona en tu cabeza. Los tests son la red de seguridad que te permite cambiar, mejorar y colaborar sin miedo a romper lo que ya funciona."
      />

      <p>
        Llegados a este punto ya sabes escribir programas que funcionan.
        El siguiente nivel es saber que funcionan — y seguir sabiendo que
        funcionan después de cada cambio. Para eso existen los tests automatizados.
      </p>
      <p>
        Un test es código que comprueba que tu código hace lo que se supone
        que debe hacer. Parece redundante, pero es la diferencia entre
        desarrollar con confianza y desarrollar con miedo.
      </p>

      <Callout kind="success" title="unittest funciona en el libro">
        <code>unittest</code> es parte de la librería estándar y funciona
        perfectamente en Pyodide. Todos los bloques ▶ Ejecutar de este módulo
        corren aquí mismo. <code>pytest</code> y <code>coverage</code> los
        mostramos como código local.
      </Callout>

      {/* ── Por qué testear ── */}
      <h2>Por qué escribir tests</h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 'var(--s-4)',
        margin: 'var(--s-5) 0',
      }}>
        {[
          { titulo: 'Regresiones', desc: 'Un bug que arreglaste vuelve silenciosamente al refactorizar. Los tests lo detectan al instante.' },
          { titulo: 'Confianza', desc: 'Puedes cambiar el código sabiendo que si los tests pasan, nada se ha roto.' },
          { titulo: 'Documentación viva', desc: 'Los tests muestran cómo se usa tu código con ejemplos reales que siempre están actualizados.' },
          { titulo: 'Diseño mejor', desc: 'El código difícil de testear suele ser código mal estructurado. Testear obliga a mejorar el diseño.' },
        ].map(({ titulo, desc }) => (
          <div key={titulo} style={{
            background: 'var(--paper-2)',
            border: '1px solid var(--border-soft)',
            borderRadius: 'var(--r-md)',
            padding: 'var(--s-4)',
          }}>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontWeight: 700,
              fontSize: '0.85rem',
              color: 'var(--accent)',
              marginBottom: 'var(--s-2)',
            }}>{titulo}</div>
            <p style={{ fontSize: '0.88rem', color: 'var(--ink-2)', margin: 0 }}>{desc}</p>
          </div>
        ))}
      </div>

      {/* ── unittest básico ── */}
      <h2>unittest — el framework de la librería estándar</h2>

      <p>
        <code>unittest</code> viene con Python. Los tests se organizan en
        clases que heredan de <code>TestCase</code>, y cada método cuyo
        nombre empiece por <code>test_</code> es un test independiente:
      </p>

      <CodeBlock code={`
import unittest

# La función que vamos a testear
def dividir(a, b):
    if b == 0:
        raise ValueError("No se puede dividir por cero")
    return a / b

class TestDividir(unittest.TestCase):

    def test_division_entera(self):
        self.assertEqual(dividir(10, 2), 5.0)

    def test_division_decimal(self):
        self.assertAlmostEqual(dividir(1, 3), 0.333, places=3)

    def test_negativo(self):
        self.assertEqual(dividir(-9, 3), -3.0)

    def test_division_por_cero(self):
        with self.assertRaises(ValueError):
            dividir(5, 0)

    def test_resultado_positivo(self):
        self.assertGreater(dividir(10, 3), 0)
`} />

      <p>
        Los métodos <code>assert*</code> más usados:
      </p>

      <CodeBlock code={`
self.assertEqual(a, b)          # a == b
self.assertNotEqual(a, b)       # a != b
self.assertTrue(expr)           # bool(expr) is True
self.assertFalse(expr)          # bool(expr) is False
self.assertIn(item, container)  # item in container
self.assertIsNone(expr)         # expr is None
self.assertIsInstance(obj, cls) # isinstance(obj, cls)
self.assertAlmostEqual(a, b)    # para floats (evita problemas de precisión)
self.assertRaises(Exc, fn, *args)   # fn(*args) lanza Exc
      `} />

      <PyRunner
        initial={`import unittest

def es_palindromo(texto):
    limpio = texto.lower().replace(" ", "").replace(",", "").replace(".", "")
    return limpio == limpio[::-1]

def contar_vocales(texto):
    return sum(1 for c in texto.lower() if c in "aeiouáéíóú")

class TestTexto(unittest.TestCase):

    def test_palindromo_simple(self):
        self.assertTrue(es_palindromo("radar"))

    def test_palindromo_con_espacios(self):
        self.assertTrue(es_palindromo("Anita lava la tina"))

    def test_no_es_palindromo(self):
        self.assertFalse(es_palindromo("Python"))

    def test_vocales_basico(self):
        self.assertEqual(contar_vocales("Python"), 1)

    def test_vocales_con_acento(self):
        self.assertEqual(contar_vocales("murciélago"), 5)

    def test_vocales_vacio(self):
        self.assertEqual(contar_vocales(""), 0)

# Ejecutar los tests dentro del script
loader = unittest.TestLoader()
suite  = loader.loadTestsFromTestCase(TestTexto)
runner = unittest.TextTestRunner(verbosity=2)
runner.run(suite)
`}
        hint="Cada método test_* es independiente. Si uno falla, los demás siguen ejecutándose."
      />

      {/* ── setUp / tearDown ── */}
      <h2>setUp y tearDown — preparar el contexto</h2>

      <p>
        Si varios tests necesitan los mismos datos de partida, <code>setUp</code>
        los prepara antes de cada test y <code>tearDown</code> los limpia después:
      </p>

      <PyRunner
        initial={`import unittest

class Carrito:
    def __init__(self):
        self.items = {}

    def agregar(self, producto, precio, cantidad=1):
        if producto in self.items:
            self.items[producto]["cantidad"] += cantidad
        else:
            self.items[producto] = {"precio": precio, "cantidad": cantidad}

    def eliminar(self, producto):
        if producto not in self.items:
            raise KeyError(f"Producto no encontrado: {producto}")
        del self.items[producto]

    def total(self):
        return sum(v["precio"] * v["cantidad"] for v in self.items.values())

    def __len__(self):
        return len(self.items)


class TestCarrito(unittest.TestCase):

    def setUp(self):
        # Se ejecuta ANTES de cada test
        self.carrito = Carrito()
        self.carrito.agregar("Teclado", 79.99)
        self.carrito.agregar("Ratón", 29.99)

    def test_total_inicial(self):
        self.assertAlmostEqual(self.carrito.total(), 109.98, places=2)

    def test_agregar_producto(self):
        self.carrito.agregar("Monitor", 349.00)
        self.assertEqual(len(self.carrito), 3)

    def test_agregar_duplicado_suma_cantidad(self):
        self.carrito.agregar("Teclado", 79.99, cantidad=2)
        self.assertEqual(self.carrito.items["Teclado"]["cantidad"], 3)

    def test_eliminar_producto(self):
        self.carrito.eliminar("Ratón")
        self.assertEqual(len(self.carrito), 1)

    def test_eliminar_inexistente_lanza_error(self):
        with self.assertRaises(KeyError):
            self.carrito.eliminar("Monitor")


loader = unittest.TestLoader()
suite  = loader.loadTestsFromTestCase(TestCarrito)
runner = unittest.TextTestRunner(verbosity=2)
runner.run(suite)
`}
        hint="setUp crea un carrito fresco antes de cada test — así no hay dependencias entre tests y el orden no importa."
      />

      {/* ── Mocks ── */}
      <h2>unittest.mock — aislar dependencias</h2>

      <p>
        Cuando tu función llama a una API, una base de datos o el reloj del sistema,
        no quieres que el test dependa de esas cosas externas.
        <code> Mock</code> te permite reemplazar esas dependencias por objetos
        controlados que devuelven lo que tú decides:
      </p>

      <PyRunner
        initial={`import unittest
from unittest.mock import Mock, patch, MagicMock

# Función que depende de un servicio externo
def precio_con_descuento(api_cliente, producto_id, descuento_pct):
    precio = api_cliente.obtener_precio(producto_id)
    if precio is None:
        raise ValueError("Producto no encontrado")
    return round(precio * (1 - descuento_pct / 100), 2)

class TestDescuento(unittest.TestCase):

    def test_descuento_aplicado(self):
        # Creamos un mock que simula el cliente de API
        api_mock = Mock()
        api_mock.obtener_precio.return_value = 100.0

        resultado = precio_con_descuento(api_mock, "P001", 20)

        self.assertEqual(resultado, 80.0)
        # Verificamos que se llamó a la API con el argumento correcto
        api_mock.obtener_precio.assert_called_once_with("P001")

    def test_producto_no_encontrado(self):
        api_mock = Mock()
        api_mock.obtener_precio.return_value = None

        with self.assertRaises(ValueError):
            precio_con_descuento(api_mock, "NOEXISTE", 10)

    def test_sin_descuento(self):
        api_mock = Mock()
        api_mock.obtener_precio.return_value = 50.0
        self.assertEqual(precio_con_descuento(api_mock, "P002", 0), 50.0)


loader = unittest.TestLoader()
suite  = loader.loadTestsFromTestCase(TestDescuento)
runner = unittest.TextTestRunner(verbosity=2)
runner.run(suite)
`}
        hint="Mock() crea un objeto que acepta cualquier llamada y devuelve lo que definas en return_value."
      />

      {/* ── doctest ── */}
      <h2>doctest — tests en la documentación</h2>

      <p>
        <code>doctest</code> extrae y ejecuta los ejemplos del docstring.
        Es perfecto para funciones con comportamiento simple:
      </p>

      <PyRunner
        initial={`import doctest

def celsius_a_fahrenheit(grados):
    """
    Convierte grados Celsius a Fahrenheit.

    >>> celsius_a_fahrenheit(0)
    32.0
    >>> celsius_a_fahrenheit(100)
    212.0
    >>> celsius_a_fahrenheit(-40)
    -40.0
    >>> celsius_a_fahrenheit(37)
    98.6
    """
    return round(grados * 9 / 5 + 32, 1)

def es_primo(n):
    """
    Devuelve True si n es un número primo.

    >>> es_primo(2)
    True
    >>> es_primo(17)
    True
    >>> es_primo(1)
    False
    >>> es_primo(9)
    False
    >>> es_primo(0)
    False
    """
    if n < 2:
        return False
    return all(n % i != 0 for i in range(2, int(n**0.5) + 1))

# Ejecutar todos los doctests del módulo
resultados = doctest.testmod(verbose=True)
print(f"\\n{resultados.attempted} tests, {resultados.failed} fallos")
`}
        hint="Los ejemplos en el docstring tienen que coincidir exactamente con la salida — incluyendo espacios y formatos."
      />

      {/* ── pytest ── */}
      <h2>pytest — el estándar de la industria</h2>

      <CodeBlock label="terminal" lang="text" code={`pip install pytest`} />

      <p>
        pytest simplifica la escritura de tests: no necesitas clases,
        las aserciones son <code>assert</code> normales, y los mensajes
        de error son mucho más informativos:
      </p>

      <CodeBlock label="▸ local · test_calculadora.py" code={`
# Con pytest no necesitas heredar de TestCase ni usar métodos assert*
import pytest
from calculadora import sumar, dividir

def test_suma_positivos():
    assert sumar(2, 3) == 5

def test_suma_negativos():
    assert sumar(-1, -1) == -2

def test_division_por_cero():
    with pytest.raises(ValueError, match="cero"):
        dividir(10, 0)

# Parametrize — el mismo test con múltiples entradas
@pytest.mark.parametrize("a, b, esperado", [
    (10,  2,  5.0),
    (9,   3,  3.0),
    (-6,  2, -3.0),
    (1,   4,  0.25),
])
def test_division_parametrizada(a, b, esperado):
    assert dividir(a, b) == esperado
      `} />

      <CodeBlock label="▸ local · fixtures en pytest" code={`
import pytest

# Una fixture es una función que prepara datos reutilizables
@pytest.fixture
def carrito_vacio():
    return Carrito()

@pytest.fixture
def carrito_con_items():
    c = Carrito()
    c.agregar("Teclado", 79.99)
    c.agregar("Ratón", 29.99)
    return c

# Los tests reciben las fixtures como argumentos
def test_carrito_vacio_total_cero(carrito_vacio):
    assert carrito_vacio.total() == 0

def test_carrito_con_items_total(carrito_con_items):
    assert carrito_con_items.total() == pytest.approx(109.98, abs=0.01)
      `} />

      <CodeBlock label="terminal — ejecutar tests" lang="text" code={`
pytest                     # todos los tests del proyecto
pytest test_calculadora.py # un archivo concreto
pytest -v                  # verbose: muestra cada test
pytest -k "suma"           # solo tests cuyo nombre contenga "suma"
pytest --tb=short          # traceback corto al fallar
      `} />

      {/* ── coverage ── */}
      <h2>Cobertura de código</h2>

      <CodeBlock label="terminal" lang="text" code={`pip install pytest-cov`} />

      <CodeBlock label="terminal" lang="text" code={`
pytest --cov=mi_modulo --cov-report=term-missing

# Salida:
# Name              Stmts   Miss  Cover   Missing
# -----------------------------------------------
# mi_modulo.py         25      3    88%   34-36
      `} />

      <Callout kind="tip" title="¿Cuánta cobertura es suficiente?">
        {`No hay un número mágico. 80% es un objetivo razonable para empezar.
100% no garantiza ausencia de bugs — puedes tener todas las líneas
cubiertas pero no haber probado las combinaciones importantes.
Prioriza testear la lógica de negocio crítica, no rellenar números.`}
      </Callout>

      {/* ── TDD ── */}
      <h2>TDD — Test Driven Development</h2>

      <p>
        TDD invierte el orden habitual: primero escribes el test (que falla
        porque aún no hay código), luego escribes el mínimo código para que
        pase, y finalmente refactorizas:
      </p>

      <CodeBlock lang="text" label="ciclo TDD" code={`
🔴 Red    → Escribe un test que falle
🟢 Green  → Escribe el código mínimo para que pase
🔵 Refactor → Mejora el código sin romper los tests
        → Repite
      `} />

      <PyRunner
        initial={`import unittest

# ── Paso 1: escribimos el test ANTES que el código ──────────────
class TestValidador(unittest.TestCase):

    def test_email_valido(self):
        self.assertTrue(validar_email("usuario@ejemplo.com"))

    def test_email_sin_arroba(self):
        self.assertFalse(validar_email("usuarioejemplo.com"))

    def test_email_sin_dominio(self):
        self.assertFalse(validar_email("usuario@"))

    def test_email_vacio(self):
        self.assertFalse(validar_email(""))

    def test_email_con_subdominio(self):
        self.assertTrue(validar_email("user@mail.empresa.com"))

# ── Paso 2: implementamos la función para que los tests pasen ───
import re

def validar_email(email):
    if not email:
        return False
    patron = r'^[a-zA-Z0-9._%+\\-]+@[a-zA-Z0-9.\\-]+\\.[a-zA-Z]{2,}$'
    return bool(re.match(patron, email))

# ── Paso 3: ejecutamos — deben pasar todos ─────────────────────
loader = unittest.TestLoader()
suite  = loader.loadTestsFromTestCase(TestValidador)
runner = unittest.TextTestRunner(verbosity=2)
runner.run(suite)
`}
        hint="Fíjate que los tests se escriben antes que la función validar_email. Cuando ejecutas, ya tienes la implementación — pero el proceso real sería: escribe tests → ve los fallos → implementa → ve los éxitos."
      />

      {/* ── Quiz ── */}
      <Quiz
        question="¿Qué hace setUp() en una clase TestCase de unittest?"
        options={[
          "Se ejecuta una vez al inicio de toda la suite de tests.",
          "Se ejecuta antes de cada método test_*, preparando un estado limpio para cada test.",
          "Configura las variables de entorno del proyecto.",
          "Inicializa pytest con los parámetros del test runner.",
        ]}
        correct={1}
        explanation={"setUp() se llama antes de cada método test_* individualmente, no una sola vez. Esto garantiza que cada test parte de un estado limpio e independiente. setUpClass() (método de clase) es el que se ejecuta una sola vez por clase."}
      />

      {/* ── Ejercicios ── */}
      <Exercise
        number={1}
        title="Testea una función de validación"
        difficulty="fácil"
        runner={{
          initial: `import unittest

def validar_contrasena(pwd):
    """
    Válida si una contraseña cumple los requisitos:
    - Al menos 8 caracteres
    - Al menos una mayúscula
    - Al menos un número
    - Al menos un carácter especial (!@#$%^&*)
    Devuelve (True, "") si es válida, o (False, "motivo") si no.
    """
    if len(pwd) < 8:
        return False, "Mínimo 8 caracteres"
    if not any(c.isupper() for c in pwd):
        return False, "Necesita al menos una mayúscula"
    if not any(c.isdigit() for c in pwd):
        return False, "Necesita al menos un número"
    if not any(c in "!@#$%^&*" for c in pwd):
        return False, "Necesita al menos un carácter especial"
    return True, ""


class TestContrasena(unittest.TestCase):

    def test_contrasena_valida(self):
        ok, _ = validar_contrasena("Python3!Segura")
        self.assertTrue(ok)

    def test_demasiado_corta(self):
        ok, msg = validar_contrasena("Py3!")
        self.assertFalse(ok)
        self.assertIn("8 caracteres", msg)

    def test_sin_mayuscula(self):
        ok, msg = validar_contrasena("python3!segura")
        self.assertFalse(ok)
        self.assertIn("mayúscula", msg)

    def test_sin_numero(self):
        ok, msg = validar_contrasena("Python!Segura")
        self.assertFalse(ok)
        self.assertIn("número", msg)

    def test_sin_especial(self):
        ok, msg = validar_contrasena("Python3Segura")
        self.assertFalse(ok)
        self.assertIn("especial", msg)

    def test_exactamente_8_chars(self):
        ok, _ = validar_contrasena("Python3!")
        self.assertTrue(ok)


loader = unittest.TestLoader()
suite  = loader.loadTestsFromTestCase(TestContrasena)
runner = unittest.TextTestRunner(verbosity=2)
runner.run(suite)
`,
          hint: 'assertIn(substring, string) comprueba si el mensaje de error contiene la palabra clave esperada.'
        }}
      >
        <p>Escribe y ejecuta tests para una función de validación de contraseñas con múltiples reglas.</p>
      </Exercise>

      <Exercise
        number={2}
        title="Tests con setUp para una cuenta bancaria"
        difficulty="fácil"
        runner={{
          initial: `import unittest

class CuentaBancaria:
    def __init__(self, titular, saldo_inicial=0):
        self.titular = titular
        self._saldo  = saldo_inicial
        self._movimientos = []

    def depositar(self, cantidad):
        if cantidad <= 0:
            raise ValueError("La cantidad debe ser positiva")
        self._saldo += cantidad
        self._movimientos.append(("deposito", cantidad))

    def retirar(self, cantidad):
        if cantidad <= 0:
            raise ValueError("La cantidad debe ser positiva")
        if cantidad > self._saldo:
            raise ValueError("Saldo insuficiente")
        self._saldo -= cantidad
        self._movimientos.append(("retirada", cantidad))

    @property
    def saldo(self):
        return self._saldo

    def num_movimientos(self):
        return len(self._movimientos)


class TestCuentaBancaria(unittest.TestCase):

    def setUp(self):
        self.cuenta = CuentaBancaria("Ana García", 100.0)

    def test_saldo_inicial(self):
        self.assertEqual(self.cuenta.saldo, 100.0)

    def test_deposito_aumenta_saldo(self):
        self.cuenta.depositar(50)
        self.assertEqual(self.cuenta.saldo, 150.0)

    def test_retirada_disminuye_saldo(self):
        self.cuenta.retirar(30)
        self.assertEqual(self.cuenta.saldo, 70.0)

    def test_retirada_sin_fondos(self):
        with self.assertRaises(ValueError) as ctx:
            self.cuenta.retirar(500)
        self.assertIn("insuficiente", str(ctx.exception))

    def test_deposito_negativo(self):
        with self.assertRaises(ValueError):
            self.cuenta.depositar(-10)

    def test_movimientos_se_registran(self):
        self.cuenta.depositar(50)
        self.cuenta.retirar(20)
        self.assertEqual(self.cuenta.num_movimientos(), 2)


loader = unittest.TestLoader()
suite  = loader.loadTestsFromTestCase(TestCuentaBancaria)
runner = unittest.TextTestRunner(verbosity=2)
runner.run(suite)
`,
          hint: 'assertRaises como context manager (with self.assertRaises(...) as ctx) permite inspeccionar el mensaje de la excepción con str(ctx.exception).'
        }}
      >
        <p>
          Usa <code>setUp</code> para preparar una cuenta bancaria fresca
          en cada test y verifica depósitos, retiradas y errores.
        </p>
      </Exercise>

      <Exercise
        number={3}
        title="Doctests para funciones matemáticas"
        difficulty="fácil"
        runner={{
          initial: `import doctest
import math

def factorial(n):
    """
    Calcula el factorial de n (n!).
    Solo acepta enteros no negativos.

    >>> factorial(0)
    1
    >>> factorial(1)
    1
    >>> factorial(5)
    120
    >>> factorial(10)
    3628800
    >>> factorial(-1)
    Traceback (most recent call last):
        ...
    ValueError: n debe ser un entero no negativo
    """
    if not isinstance(n, int) or n < 0:
        raise ValueError("n debe ser un entero no negativo")
    if n == 0:
        return 1
    return n * factorial(n - 1)

def media_geometrica(numeros):
    """
    Calcula la media geométrica de una lista de números positivos.

    >>> round(media_geometrica([1, 4, 16]), 4)
    4.0
    >>> round(media_geometrica([2, 8]), 4)
    4.0
    >>> media_geometrica([])
    Traceback (most recent call last):
        ...
    ValueError: La lista no puede estar vacía
    """
    if not numeros:
        raise ValueError("La lista no puede estar vacía")
    producto = 1
    for n in numeros:
        producto *= n
    return producto ** (1 / len(numeros))

resultados = doctest.testmod(verbose=True)
print(f"\\n{resultados.attempted} tests ejecutados, {resultados.failed} fallaron")
`,
          hint: 'Para testear excepciones en doctest usa el formato Traceback (most recent call last): ... NombreError: mensaje'
        }}
      >
        <p>
          Escribe doctests para funciones matemáticas incluyendo casos
          normales y casos que lanzan excepciones.
        </p>
      </Exercise>

      <Exercise
        number={4}
        title="Testea con Mocks una función que usa tiempo"
        difficulty="media"
        runner={{
          initial: `import unittest
from unittest.mock import Mock, patch
from datetime import datetime

def generar_id_pedido(prefijo="ORD"):
    """Genera un ID único basado en la fecha y hora actual."""
    ahora = datetime.now()
    return f"{prefijo}-{ahora.strftime('%Y%m%d%H%M%S')}"

def calcular_descuento(precio, cliente_premium, hora_actual=None):
    """
    Aplica descuentos según el cliente y la hora:
    - Cliente premium: 15% siempre
    - Happy hour (14-16h): 10% adicional para todos
    """
    if hora_actual is None:
        hora_actual = datetime.now().hour

    descuento = 0.15 if cliente_premium else 0

    if 14 <= hora_actual < 16:
        descuento += 0.10

    return round(precio * (1 - descuento), 2)


class TestPedidos(unittest.TestCase):

    def test_id_formato_correcto(self):
        id_pedido = generar_id_pedido()
        self.assertTrue(id_pedido.startswith("ORD-"))
        self.assertEqual(len(id_pedido), 4 + 14)  # "ORD-" + "YYYYMMDDHHmmss"

    def test_id_prefijo_personalizado(self):
        id_pedido = generar_id_pedido("VTA")
        self.assertTrue(id_pedido.startswith("VTA-"))

    def test_descuento_premium(self):
        precio = calcular_descuento(100, cliente_premium=True, hora_actual=10)
        self.assertAlmostEqual(precio, 85.0, places=2)

    def test_descuento_happy_hour(self):
        precio = calcular_descuento(100, cliente_premium=False, hora_actual=15)
        self.assertAlmostEqual(precio, 90.0, places=2)

    def test_descuento_premium_y_happy_hour(self):
        precio = calcular_descuento(100, cliente_premium=True, hora_actual=15)
        self.assertAlmostEqual(precio, 75.0, places=2)

    def test_sin_descuento(self):
        precio = calcular_descuento(100, cliente_premium=False, hora_actual=10)
        self.assertAlmostEqual(precio, 100.0, places=2)


loader = unittest.TestLoader()
suite  = loader.loadTestsFromTestCase(TestPedidos)
runner = unittest.TextTestRunner(verbosity=2)
runner.run(suite)
`,
          hint: 'Diseñar calcular_descuento para recibir hora_actual como parámetro (en vez de llamar datetime.now() internamente) es el patrón de "inyección de dependencias" — hace la función fácilmente testeable.'
        }}
      >
        <p>
          Testea funciones que dependen del tiempo pasando la hora como
          parámetro en vez de usar <code>datetime.now()</code> internamente.
        </p>
      </Exercise>

      <Exercise
        number={5}
        title="Suite completa con múltiples clases"
        difficulty="difícil"
        runner={{
          initial: `import unittest

# ── Código a testear ─────────────────────────────────────────────

class Inventario:
    def __init__(self):
        self._productos = {}

    def agregar_producto(self, codigo, nombre, precio, stock):
        if codigo in self._productos:
            raise ValueError(f"Producto {codigo} ya existe")
        if precio <= 0 or stock < 0:
            raise ValueError("Precio y stock deben ser positivos")
        self._productos[codigo] = {"nombre": nombre, "precio": precio, "stock": stock}

    def vender(self, codigo, cantidad):
        if codigo not in self._productos:
            raise KeyError(f"Producto {codigo} no encontrado")
        if self._productos[codigo]["stock"] < cantidad:
            raise ValueError("Stock insuficiente")
        self._productos[codigo]["stock"] -= cantidad
        return self._productos[codigo]["precio"] * cantidad

    def valor_total_stock(self):
        return sum(p["precio"] * p["stock"] for p in self._productos.values())

    def productos_bajo_stock(self, umbral=5):
        return [c for c, p in self._productos.items() if p["stock"] <= umbral]

# ── Tests ────────────────────────────────────────────────────────

class TestInventario(unittest.TestCase):

    def setUp(self):
        self.inv = Inventario()
        self.inv.agregar_producto("P001", "Teclado", 79.99, 20)
        self.inv.agregar_producto("P002", "Ratón",   29.99, 3)
        self.inv.agregar_producto("P003", "Monitor", 349.00, 8)

class TestAgregar(TestInventario):

    def test_agregar_nuevo(self):
        self.inv.agregar_producto("P004", "Webcam", 59.99, 10)
        self.assertIn("P004", self.inv._productos)

    def test_agregar_duplicado_lanza_error(self):
        with self.assertRaises(ValueError):
            self.inv.agregar_producto("P001", "Otro", 10, 5)

    def test_precio_negativo_lanza_error(self):
        with self.assertRaises(ValueError):
            self.inv.agregar_producto("P005", "Raro", -10, 5)

class TestVentas(TestInventario):

    def test_venta_exitosa_devuelve_total(self):
        total = self.inv.vender("P001", 2)
        self.assertAlmostEqual(total, 159.98, places=2)

    def test_venta_reduce_stock(self):
        self.inv.vender("P003", 3)
        self.assertEqual(self.inv._productos["P003"]["stock"], 5)

    def test_venta_sin_stock(self):
        with self.assertRaises(ValueError):
            self.inv.vender("P002", 10)

    def test_venta_producto_inexistente(self):
        with self.assertRaises(KeyError):
            self.inv.vender("NOEXISTE", 1)

class TestEstadisticas(TestInventario):

    def test_valor_total_correcto(self):
        esperado = 79.99*20 + 29.99*3 + 349.00*8
        self.assertAlmostEqual(self.inv.valor_total_stock(), esperado, places=2)

    def test_productos_bajo_stock(self):
        bajos = self.inv.productos_bajo_stock(umbral=5)
        self.assertIn("P002", bajos)
        self.assertNotIn("P001", bajos)


# Ejecutar toda la suite
loader = unittest.TestLoader()
suite  = unittest.TestSuite()
for cls in [TestAgregar, TestVentas, TestEstadisticas]:
    suite.addTests(loader.loadTestsFromTestCase(cls))

runner = unittest.TextTestRunner(verbosity=2)
runner.run(suite)
`,
          hint: 'Dividir los tests en subclases (TestAgregar, TestVentas, TestEstadisticas) que heredan del setUp común es el patrón para organizar suites grandes.'
        }}
      >
        <p>
          Organiza una suite completa con clases de test separadas por
          responsabilidad que comparten el mismo <code>setUp</code>.
        </p>
      </Exercise>

      {/* ── Resumen ── */}
      <div style={{
        background: 'var(--paper-2)',
        border: '1px solid var(--border-soft)',
        borderRadius: 'var(--r-md)',
        padding: 'var(--s-5) var(--s-6)',
        margin: 'var(--s-6) 0',
      }}>
        <div className="eyebrow" style={{ marginBottom: 'var(--s-3)' }}>// resumen del módulo</div>
        <ul style={{ paddingLeft: '1.2em', margin: 0, lineHeight: 2 }}>
          <li><strong>unittest.TestCase</strong> — clase base; métodos <code>test_*</code> son tests independientes.</li>
          <li><strong>setUp / tearDown</strong> — estado limpio antes/después de cada test.</li>
          <li><strong>assert*</strong> — assertEqual, assertRaises, assertIn, assertAlmostEqual...</li>
          <li><strong>Mock()</strong> — reemplaza dependencias externas (APIs, bases de datos, tiempo).</li>
          <li><strong>doctest</strong> — ejemplos en docstrings que también son tests ejecutables.</li>
          <li><strong>pytest</strong> — más conciso, fixtures potentes, parametrize, mejor output.</li>
          <li><strong>coverage</strong> — mide qué líneas se ejecutan durante los tests.</li>
          <li><strong>TDD</strong> — escribe el test primero, luego el código que lo hace pasar.</li>
        </ul>
      </div>

      <PullQuote>
        Un test que nunca ha fallado no demuestra que el código funciona —
        demuestra que el test nunca ha encontrado el bug.
      </PullQuote>

      <ChapterNav
        prev={prev ? { id: prev.id, title: prev.title } : null}
        next={next ? { id: next.id, title: next.title } : null}
        onNav={onNav}
      />
    </article>
  );
}

window.ChapterL3M6 = ChapterL3M6;
