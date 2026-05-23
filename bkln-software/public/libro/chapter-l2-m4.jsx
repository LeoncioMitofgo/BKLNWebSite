// =============================================================
// chapter-l2-m4.jsx — Libro 2, Módulo 4: Manejo de errores
// =============================================================

function ChapterL2M4({ onNav }) {
  return (
    <article className="reader-inner">
      <ChapterHeader
        book="// libro 2 · programando con estructura"
        module="módulo 04"
        time="≈ 55 min"
        title={<>Manejo de <em>errores</em></>}
        dek="Los errores no son el enemigo — son información. Aprenderás a anticiparlos, capturarlos y responder con gracia en lugar de dejar que tu programa explote."
      />

      <p>
        Todo programa que interactúa con el mundo real va a encontrar situaciones inesperadas:
        el usuario escribe letras donde se esperaba un número, el archivo que buscas no existe,
        la conexión a internet se corta. En Python, cuando algo falla, se lanza una
        <strong> excepción</strong>. Si nadie la captura, el programa se detiene con un mensaje
        de error. Si la capturas, puedes decidir qué hacer.
      </p>

      <p>
        Manejar errores bien es lo que separa un script personal de una aplicación profesional.
      </p>

      <h2>Los errores más comunes en Python</h2>

      <p>
        Antes de capturar excepciones, conviene conocer las más frecuentes. Python tiene una
        jerarquía de excepciones — todas son clases que heredan de <code>Exception</code>:
      </p>

      <div style={{
        margin: 'var(--s-5) 0',
        background: 'var(--paper-2)',
        border: '1px solid var(--border-soft)',
        borderRadius: 'var(--r-md)',
        overflow: 'hidden',
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.92rem' }}>
          <thead>
            <tr style={{ background: 'var(--paper-3)', textAlign: 'left' }}>
              <th style={errThStyle}>Excepción</th>
              <th style={errThStyle}>Cuándo ocurre</th>
              <th style={errThStyle}>Ejemplo</th>
            </tr>
          </thead>
          <tbody>
            <ErrRow e="TypeError" w="Tipo de dato incorrecto" ex='int("hola")' />
            <ErrRow e="ValueError" w="Tipo correcto, valor inválido" ex='int("3.5")' />
            <ErrRow e="NameError" w="Variable no definida" ex="print(x)" />
            <ErrRow e="IndexError" w="Índice fuera de rango" ex='lista[99]' />
            <ErrRow e="KeyError" w="Clave no existe en dict" ex='d["x"]' />
            <ErrRow e="ZeroDivisionError" w="División por cero" ex="10 / 0" />
            <ErrRow e="FileNotFoundError" w="Archivo no encontrado" ex='open("x.txt")' />
            <ErrRow e="AttributeError" w="Atributo no existe" ex='"hola".push(1)' />
            <ErrRow e="ImportError" w="Módulo no encontrado" ex="import xyz" last />
          </tbody>
        </table>
      </div>

      <h2>try / except — la estructura básica</h2>

      <p>
        La forma de capturar una excepción es envolver el código peligroso en un bloque
        <code> try</code> y manejar el error en <code>except</code>:
      </p>

      <CodeBlock code={`# Sin manejo de errores — el programa explota
numero = int(input("Escribe un número: "))  # ¿y si el usuario escribe "hola"?
print(f"El doble es {numero * 2}")`} />

      <CodeBlock code={`# Con manejo de errores — el programa responde con gracia
try:
    numero = int(input("Escribe un número: "))
    print(f"El doble es {numero * 2}")
except ValueError:
    print("Eso no es un número válido. Inténtalo de nuevo.")`} />

      <p>
        Python ejecuta el bloque <code>try</code>. Si en algún punto lanza una excepción
        del tipo indicado, salta directamente al <code>except</code> y ejecuta ese bloque.
        Si no ocurre ningún error, el <code>except</code> se ignora.
      </p>

      <Callout kind="info" title="Nombra la excepción específica">
        Siempre especifica qué excepción esperas. Usar <code>except:</code> a secas captura
        absolutamente todo — incluso errores del sistema que no deberías silenciar, como
        <code> KeyboardInterrupt</code> (el usuario pulsa Ctrl+C). Sé preciso.
      </Callout>

      <h2>Capturar múltiples excepciones</h2>

      <p>
        Puedes manejar distintos tipos de error de forma diferente, o agrupar varios
        en un mismo <code>except</code>:
      </p>

      <CodeBlock code={`def dividir(a, b):
    try:
        resultado = a / b
        return resultado
    except ZeroDivisionError:
        print("Error: no se puede dividir por cero.")
        return None
    except TypeError:
        print("Error: ambos valores deben ser números.")
        return None

print(dividir(10, 2))    # 5.0
print(dividir(10, 0))    # Error: no se puede dividir por cero.
print(dividir(10, "x"))  # Error: ambos valores deben ser números.`} />

      <ReplOutput>{`5.0
Error: no se puede dividir por cero.
None
Error: ambos valores deben ser números.
None`}</ReplOutput>

      <p>
        O capturar varios en un solo <code>except</code> usando una tupla:
      </p>

      <CodeBlock code={`try:
    valor = int(input("Número: "))
    resultado = 100 / valor
    print(resultado)
except (ValueError, ZeroDivisionError):
    print("Entrada inválida: introduce un número distinto de cero.")`} />

      <h2>Obtener información del error</h2>

      <p>
        Con <code>as e</code> obtienes el objeto de la excepción, que contiene el mensaje
        de error original. Útil para logs y diagnósticos:
      </p>

      <CodeBlock code={`try:
    archivo = open("datos.txt")
    contenido = archivo.read()
except FileNotFoundError as e:
    print(f"No encontré el archivo: {e}")
except PermissionError as e:
    print(f"Sin permiso para leer: {e}")`} />

      <ReplOutput>{`No encontré el archivo: [Errno 2] No such file or directory: 'datos.txt'`}</ReplOutput>

      <Quiz
        question="¿Qué excepción lanza Python al hacer lista = [1, 2, 3] y luego lista[10]?"
        options={['ValueError', 'KeyError', 'IndexError', 'TypeError']}
        correct={2}
        explanation='IndexError ocurre cuando intentas acceder a un índice que no existe en una lista o tupla. KeyError es para diccionarios. ValueError es para valores inválidos del tipo correcto. TypeError es para operaciones con tipos incompatibles.'
      />

      <h2>else y finally</h2>

      <p>
        El bloque <code>try/except</code> puede tener dos cláusulas adicionales:
      </p>

      <CodeBlock code={`try:
    numero = int(input("Número: "))
    resultado = 100 / numero
except ValueError:
    print("No es un número entero.")
except ZeroDivisionError:
    print("No puedes dividir por cero.")
else:
    # Se ejecuta SOLO si no hubo ninguna excepción
    print(f"Resultado: {resultado}")
finally:
    # Se ejecuta SIEMPRE — haya habido error o no
    print("Operación finalizada.")`} />

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 'var(--s-4)',
        margin: 'var(--s-5) 0',
      }} className="err-grid">
        <ErrCard
          label="else"
          color="var(--accent)"
          desc="Se ejecuta solo si el bloque try terminó sin errores. Ideal para el código que depende de que todo salió bien."
        />
        <ErrCard
          label="finally"
          color="var(--highlight)"
          desc="Se ejecuta siempre, haya error o no. Ideal para liberar recursos: cerrar archivos, conexiones, etc."
        />
        <style>{`@media (max-width: 720px) { .err-grid { grid-template-columns: 1fr !important; } }`}</style>
      </div>

      <p>
        El caso más importante de <code>finally</code> en la práctica es asegurarse de
        cerrar recursos aunque falle algo:
      </p>

      <CodeBlock code={`archivo = None
try:
    archivo = open("datos.txt", "r")
    contenido = archivo.read()
    print(contenido)
except FileNotFoundError:
    print("El archivo no existe.")
finally:
    if archivo:
        archivo.close()    # se cierra siempre, incluso si hubo error
        print("Archivo cerrado.")`} />

      <Callout kind="tip" title="with: la forma moderna de manejar recursos">
        Para archivos y conexiones, Python tiene el gestor de contexto <code>with</code> que
        cierra el recurso automáticamente — sin necesitar <code>finally</code>:
        <br /><br />
        <code>with open("datos.txt") as f:</code><br />
        <code>&nbsp;&nbsp;&nbsp;&nbsp;contenido = f.read()</code>
        <br /><br />
        Al salir del bloque <code>with</code> (con error o sin él), el archivo se cierra solo.
        Lo veremos en detalle en el Módulo 5.
      </Callout>

      <h2>raise — lanzar excepciones</h2>

      <p>
        No solo puedes capturar excepciones — también puedes lanzarlas tú mismo con
        <code> raise</code>. Esto es útil cuando recibes datos que técnicamente son válidos
        para Python pero inválidos para tu lógica:
      </p>

      <CodeBlock code={`def establecer_edad(edad):
    if not isinstance(edad, int):
        raise TypeError(f"La edad debe ser un entero, no {type(edad).__name__}.")
    if edad < 0 or edad > 150:
        raise ValueError(f"La edad {edad} está fuera del rango válido (0-150).")
    return edad

# Uso correcto
print(establecer_edad(25))     # 25

# Uso incorrecto — lanza excepciones
try:
    establecer_edad(-5)
except ValueError as e:
    print(f"ValueError: {e}")

try:
    establecer_edad("adulto")
except TypeError as e:
    print(f"TypeError: {e}")`} />

      <ReplOutput>{`25
ValueError: La edad -5 está fuera del rango válido (0-150).
TypeError: La edad debe ser un entero, no str.`}</ReplOutput>

      <p>
        También puedes relanzar la misma excepción que capturaste, si quieres hacer algo
        (como registrarla) antes de dejar que suba:
      </p>

      <CodeBlock code={`def procesar(datos):
    try:
        resultado = datos["valor"] * 2
        return resultado
    except KeyError as e:
        print(f"[LOG] Clave faltante: {e}")
        raise    # relanza la misma excepción`} />

      <h2>Excepciones propias</h2>

      <p>
        Puedes crear tus propias excepciones definiendo una clase que herede de
        <code> Exception</code>. Esto hace tu código más expresivo: en lugar de un
        <code> ValueError</code> genérico, lanzas un <code>SaldoInsuficienteError</code>
        que dice exactamente qué pasó:
      </p>

      <CodeBlock code={`class SaldoInsuficienteError(Exception):
    def __init__(self, saldo, cantidad):
        self.saldo    = saldo
        self.cantidad = cantidad
        super().__init__(
            f"Saldo insuficiente: tienes {saldo:.2f} € pero intentas retirar {cantidad:.2f} €."
        )


class CuentaBancaria:
    def __init__(self, titular, saldo=0):
        self.titular = titular
        self.saldo   = saldo

    def retirar(self, cantidad):
        if cantidad <= 0:
            raise ValueError("La cantidad a retirar debe ser positiva.")
        if cantidad > self.saldo:
            raise SaldoInsuficienteError(self.saldo, cantidad)
        self.saldo -= cantidad
        return self.saldo

    def __str__(self):
        return f"Cuenta de {self.titular}: {self.saldo:.2f} €"


cuenta = CuentaBancaria("Ana", 500)

try:
    cuenta.retirar(200)
    print(cuenta)
    cuenta.retirar(400)    # esto falla
except SaldoInsuficienteError as e:
    print(f"Operación rechazada — {e}")
except ValueError as e:
    print(f"Entrada inválida — {e}")`} />

      <ReplOutput>{`Cuenta de Ana: 300.00 €
Operación rechazada — Saldo insuficiente: tienes 300.00 € pero intentas retirar 400.00 €.`}</ReplOutput>

      <Callout kind="info" title="Cuándo crear excepciones propias">
        Crea una excepción propia cuando el error que quieres señalar es específico de
        tu dominio (negocio, juego, aplicación). Si capturas <code>SaldoInsuficienteError</code>
        en lugar de <code>Exception</code>, el código que llama a tu función sabe exactamente
        qué salió mal y puede reaccionar de forma precisa.
      </Callout>

      <h2>Buenas prácticas</h2>

      <div style={{
        background: 'var(--paper-2)',
        border: '1px solid var(--border-soft)',
        borderRadius: 'var(--r-md)',
        padding: 'var(--s-5) var(--s-6)',
        margin: 'var(--s-5) 0',
      }}>
        <ul style={{ paddingLeft: '1.2em', margin: 0, lineHeight: 2 }}>
          <li><strong>Captura lo específico.</strong> <code>except ValueError</code> es mejor que <code>except Exception</code>, que es mejor que <code>except</code> a secas.</li>
          <li><strong>No silencies errores.</strong> Un <code>except: pass</code> es una de las peores cosas que puedes escribir — oculta problemas reales.</li>
          <li><strong>El try debe ser pequeño.</strong> Solo envuelve el código que puede fallar, no bloques enormes.</li>
          <li><strong>Usa finally para limpiar.</strong> Archivos, conexiones y recursos deben cerrarse siempre.</li>
          <li><strong>Crea excepciones propias</strong> cuando el error es específico de tu dominio.</li>
          <li><strong>Incluye contexto en el mensaje.</strong> <code>"Valor inválido: -5"</code> es mejor que <code>"Error"</code>.</li>
        </ul>
      </div>

      <h2>Ejemplo completo: validador de formulario</h2>

      <p>
        Un sistema de validación que usa excepciones propias para señalar errores concretos
        en los datos de un usuario.
      </p>

      <PyRunner
        initial={`class ErrorValidacion(Exception):
    pass

class CampoVacioError(ErrorValidacion):
    def __init__(self, campo):
        super().__init__(f"El campo '{campo}' no puede estar vacío.")

class EdadInvalidaError(ErrorValidacion):
    def __init__(self, edad):
        super().__init__(f"La edad '{edad}' no es válida (debe ser un número entre 0 y 120).")

class EmailInvalidoError(ErrorValidacion):
    def __init__(self, email):
        super().__init__(f"El email '{email}' no tiene formato válido.")


def validar_nombre(nombre):
    if not nombre or not nombre.strip():
        raise CampoVacioError("nombre")
    return nombre.strip().title()

def validar_edad(edad_texto):
    try:
        edad = int(edad_texto)
    except ValueError:
        raise EdadInvalidaError(edad_texto)
    if not 0 <= edad <= 120:
        raise EdadInvalidaError(edad_texto)
    return edad

def validar_email(email):
    if not email or "@" not in email or "." not in email.split("@")[-1]:
        raise EmailInvalidoError(email)
    return email.lower()

def registrar_usuario(nombre, edad_texto, email):
    errores = []
    nombre_ok = edad_ok = email_ok = None

    try:
        nombre_ok = validar_nombre(nombre)
    except CampoVacioError as e:
        errores.append(str(e))

    try:
        edad_ok = validar_edad(edad_texto)
    except EdadInvalidaError as e:
        errores.append(str(e))

    try:
        email_ok = validar_email(email)
    except EmailInvalidoError as e:
        errores.append(str(e))

    if errores:
        print("\\nRegistro fallido. Errores encontrados:")
        for err in errores:
            print(f"  ✗ {err}")
        return None

    usuario = {"nombre": nombre_ok, "edad": edad_ok, "email": email_ok}
    print(f"\\n✓ Usuario registrado: {usuario}")
    return usuario

# Casos de prueba
registrar_usuario("Ana García", "28", "ana@ejemplo.com")
registrar_usuario("", "abc", "no-es-un-email")
registrar_usuario("Luis", "200", "luis@correo.es")`}
      />

      <h2>Ejercicios</h2>

      <p style={{ color: 'var(--ink-2)' }}>
        Cinco ejercicios de dificultad creciente. Del try/except básico hasta crear
        tu propio sistema de excepciones.
      </p>

      <Exercise
        number="4.1"
        title="Conversión segura"
        difficulty="fácil"
        runner={{
          initial: `# Escribe una función "convertir_entero(texto)"
# que intente convertir un texto a entero.
# Si falla, en lugar de lanzar un error,
# devuelve None e imprime un mensaje descriptivo.
#
# Pruébala con: "42", "3.14", "hola", "", "0"

`,
          hint: 'Usa try/except ValueError. Si int(texto) funciona, devuelve el entero. Si lanza ValueError, imprime el mensaje y devuelve None.',
          solution: {
            code: `def convertir_entero(texto):
    try:
        return int(texto)
    except ValueError:
        print(f"No se puede convertir '{texto}' a entero.")
        return None

print(convertir_entero("42"))     # 42
print(convertir_entero("3.14"))   # falla
print(convertir_entero("hola"))   # falla
print(convertir_entero(""))       # falla
print(convertir_entero("0"))      # 0`,
            explanation: 'El patrón más básico de manejo de errores: intenta la operación, captura el error específico (ValueError en int()) y devuelve un valor seguro (None) en lugar de propagarlo.',
          },
        }}
      >
        <p>Convierte texto a entero sin que el programa explote si el texto no es válido.</p>
      </Exercise>

      <Exercise
        number="4.2"
        title="Acceso seguro a diccionarios"
        difficulty="fácil"
        runner={{
          initial: `# Escribe una función "obtener_valor(diccionario, clave, defecto=None)"
# que devuelva el valor de la clave en el diccionario.
# Si la clave no existe, devuelve el valor por defecto
# (sin lanzar KeyError).
#
# Versión 1: usando try/except KeyError
# Versión 2: misma función pero SIN try/except (hay un método del dict que hace esto)
#
# Prueba ambas con:
config = {"host": "localhost", "puerto": 5432, "debug": True}

`,
          hint: 'Versión 1: try: return d[clave] except KeyError: return defecto. Versión 2: el método .get() de los diccionarios hace exactamente esto.',
          solution: {
            code: `def obtener_valor_v1(diccionario, clave, defecto=None):
    try:
        return diccionario[clave]
    except KeyError:
        return defecto

def obtener_valor_v2(diccionario, clave, defecto=None):
    return diccionario.get(clave, defecto)

config = {"host": "localhost", "puerto": 5432, "debug": True}

# Versión 1
print(obtener_valor_v1(config, "host"))         # localhost
print(obtener_valor_v1(config, "password"))     # None
print(obtener_valor_v1(config, "timeout", 30))  # 30

# Versión 2 — idéntico resultado
print(obtener_valor_v2(config, "puerto"))       # 5432
print(obtener_valor_v2(config, "usuario", "admin"))  # admin`,
            explanation: 'Tanto try/except KeyError como .get() son correctos. La moraleja: a veces Python ya tiene una solución más directa que capturar excepciones. Conocer los métodos de cada tipo de dato evita código innecesariamente complejo.',
          },
        }}
      >
        <p>Accede a un diccionario sin arriesgarte a un KeyError.</p>
      </Exercise>

      <Exercise
        number="4.3"
        title="Lector de archivos robusto"
        difficulty="media"
        runner={{
          initial: `# Escribe una función "leer_lineas(ruta)"
# que abra y lea un archivo línea a línea.
# Debe manejar:
#   - FileNotFoundError  → mensaje claro, devuelve []
#   - PermissionError    → mensaje claro, devuelve []
#   - UnicodeDecodeError → intenta releer con encoding="latin-1"
#                         si aún falla, devuelve []
#
# Como no tenemos archivos reales aquí, prueba el comportamiento
# simulando los errores con raise:

def leer_lineas(ruta):
    pass  # tu código aquí

# Test 1: archivo inexistente
resultado = leer_lineas("inexistente.txt")
print(f"Resultado: {resultado}")
`,
          hint: 'try: open(ruta, encoding="utf-8") except FileNotFoundError: ... except PermissionError: ... except UnicodeDecodeError: intenta de nuevo con open(ruta, encoding="latin-1"). Usa with para abrir el archivo.',
          solution: {
            code: `def leer_lineas(ruta):
    try:
        with open(ruta, encoding="utf-8") as f:
            return f.readlines()
    except FileNotFoundError:
        print(f"Archivo no encontrado: {ruta}")
        return []
    except PermissionError:
        print(f"Sin permiso para leer: {ruta}")
        return []
    except UnicodeDecodeError:
        try:
            with open(ruta, encoding="latin-1") as f:
                print(f"Advertencia: {ruta} leído con encoding latin-1.")
                return f.readlines()
        except Exception as e:
            print(f"No se pudo leer el archivo: {e}")
            return []

# Prueba con archivo inexistente
resultado = leer_lineas("inexistente.txt")
print(f"Resultado: {resultado}")`,
            explanation: 'En el mundo real, leer archivos puede fallar por múltiples razones. Esta función los maneja todos y siempre devuelve algo utilizable (una lista, quizás vacía). El try anidado para el UnicodeDecodeError es un patrón común cuando trabajas con archivos de texto de origen desconocido.',
          },
        }}
      >
        <p>Un lector de archivos que no se rompe ante problemas del mundo real.</p>
      </Exercise>

      <Exercise
        number="4.4"
        title="Excepciones propias para una tienda"
        difficulty="media"
        runner={{
          initial: `# Crea un sistema de tienda con excepciones propias:
#
# Excepciones:
#   - ErrorTienda(Exception)          → base
#   - ProductoNoEncontradoError       → hereda de ErrorTienda
#   - StockInsuficienteError          → hereda de ErrorTienda
#
# Clase Tienda:
#   - __init__()  → inventario vacío {}
#   - añadir(nombre, precio, stock)
#   - comprar(nombre, cantidad)
#       → lanza ProductoNoEncontradoError si no existe
#       → lanza StockInsuficienteError si no hay suficiente stock
#       → si todo ok, resta el stock y devuelve el precio total
#   - __str__  → muestra el inventario

`,
          hint: 'class ProductoNoEncontradoError(ErrorTienda): def __init__(self, nombre): super().__init__(f"Producto no encontrado: {nombre}"). Para StockInsuficienteError guarda stock_disponible y cantidad_pedida en los atributos además del mensaje.',
          solution: {
            code: `class ErrorTienda(Exception):
    pass

class ProductoNoEncontradoError(ErrorTienda):
    def __init__(self, nombre):
        self.nombre = nombre
        super().__init__(f"Producto no encontrado: '{nombre}'.")

class StockInsuficienteError(ErrorTienda):
    def __init__(self, nombre, disponible, pedido):
        self.disponible = disponible
        self.pedido     = pedido
        super().__init__(
            f"Stock insuficiente para '{nombre}': hay {disponible}, pides {pedido}."
        )


class Tienda:
    def __init__(self):
        self._inventario = {}

    def añadir(self, nombre, precio, stock):
        self._inventario[nombre] = {"precio": precio, "stock": stock}

    def comprar(self, nombre, cantidad):
        if nombre not in self._inventario:
            raise ProductoNoEncontradoError(nombre)
        producto = self._inventario[nombre]
        if producto["stock"] < cantidad:
            raise StockInsuficienteError(nombre, producto["stock"], cantidad)
        producto["stock"] -= cantidad
        return producto["precio"] * cantidad

    def __str__(self):
        lineas = [f"{'Producto':<15} {'Precio':>8} {'Stock':>6}"]
        lineas.append("-" * 32)
        for nombre, datos in self._inventario.items():
            lineas.append(f"{nombre:<15} {datos['precio']:>7.2f}€ {datos['stock']:>6}")
        return "\\n".join(lineas)


tienda = Tienda()
tienda.añadir("Teclado", 49.99, 5)
tienda.añadir("Ratón",   29.99, 2)
tienda.añadir("Monitor", 299.99, 1)

print(tienda)
print()

for nombre, cantidad in [("Teclado", 2), ("Ratón", 5), ("Impresora", 1)]:
    try:
        total = tienda.comprar(nombre, cantidad)
        print(f"✓ Compra de {cantidad}x {nombre}: {total:.2f} €")
    except StockInsuficienteError as e:
        print(f"✗ {e}")
    except ProductoNoEncontradoError as e:
        print(f"✗ {e}")`,
            explanation: 'Las excepciones propias hacen el código de la tienda expresivo: quien llama a comprar() sabe exactamente por qué falló. La jerarquía ErrorTienda → subclases permite capturar todos los errores de la tienda con except ErrorTienda si se quiere, o tipos específicos cuando importa la distinción.',
          },
        }}
      >
        <p>Diseña una jerarquía de excepciones para un sistema de tienda.</p>
      </Exercise>

      <Exercise
        number="4.5"
        title="Reintento automático"
        difficulty="difícil"
        runner={{
          initial: `# Crea un decorador "reintentar(veces=3, excepciones=(Exception,))"
# que ejecute una función hasta N veces si lanza alguna de las
# excepciones indicadas. Si tras todos los intentos sigue fallando,
# relanza la última excepción.
#
# Uso esperado:
#
# @reintentar(veces=3, excepciones=(ValueError,))
# def convertir(texto):
#     return int(texto)
#
# Simula una función que falla las primeras 2 veces y
# tiene éxito a la tercera vez usando un contador externo.

import functools

contador = {"intentos": 0}

`,
          hint: 'Un decorador es una función que recibe una función y devuelve otra. def reintentar(veces, excepciones): def decorador(func): @functools.wraps(func) def wrapper(*args, **kwargs): for i in range(veces): try: return func(...) except excepciones: if i == veces-1: raise. return wrapper. return decorador.',
          solution: {
            code: `import functools

def reintentar(veces=3, excepciones=(Exception,)):
    def decorador(func):
        @functools.wraps(func)
        def wrapper(*args, **kwargs):
            ultimo_error = None
            for intento in range(1, veces + 1):
                try:
                    resultado = func(*args, **kwargs)
                    if intento > 1:
                        print(f"  ✓ Éxito en el intento {intento}.")
                    return resultado
                except excepciones as e:
                    ultimo_error = e
                    print(f"  Intento {intento}/{veces} fallido: {e}")
            raise ultimo_error
        return wrapper
    return decorador


# Simulación: falla las 2 primeras veces, tiene éxito a la 3ª
contador = {"intentos": 0}

@reintentar(veces=3, excepciones=(ValueError,))
def operacion_inestable(valor):
    contador["intentos"] += 1
    if contador["intentos"] < 3:
        raise ValueError(f"Servicio no disponible (intento {contador['intentos']})")
    return f"Resultado procesado: {valor}"

print("Probando función con reintentos:")
try:
    resultado = operacion_inestable("datos importantes")
    print(resultado)
except ValueError as e:
    print(f"Falló tras todos los intentos: {e}")

print()

# Función que siempre falla
@reintentar(veces=2, excepciones=(ConnectionError,))
def siempre_falla():
    raise ConnectionError("Sin conexión")

print("Probando función que siempre falla:")
try:
    siempre_falla()
except ConnectionError as e:
    print(f"Finalmente falló: {e}")`,
            explanation: 'El decorador reintentar es un patrón real usado en producción para operaciones de red, bases de datos o APIs externas que pueden fallar temporalmente. El truco clave: guardar el último error y relanzarlo con raise (sin argumentos) cuando se agotan los intentos — así el llamador recibe la excepción original intacta.',
          },
        }}
      >
        <p>Un decorador que reintenta una función automáticamente ante fallos transitorios.</p>
      </Exercise>

      <h2>Resumen del módulo</h2>

      <div style={{
        background: 'var(--paper-2)',
        border: '1px solid var(--border-soft)',
        borderRadius: 'var(--r-md)',
        padding: 'var(--s-5) var(--s-6)',
        margin: 'var(--s-5) 0',
      }}>
        <div className="eyebrow" style={{ marginBottom: 'var(--s-3)' }}>// lo importante en una página</div>
        <ul style={{ paddingLeft: '1.2em', margin: 0 }}>
          <li>Una <strong>excepción</strong> es un objeto que Python lanza cuando ocurre un error en tiempo de ejecución.</li>
          <li><code>try / except TipoError:</code> captura excepciones del tipo indicado. Sé siempre específico.</li>
          <li>Usa <code>except TipoError as e:</code> para acceder al mensaje y atributos del error.</li>
          <li>Puedes capturar varios tipos con <code>except (TypeError, ValueError):</code> o con múltiples bloques <code>except</code>.</li>
          <li><strong><code>else</code></strong>: se ejecuta solo si no hubo ninguna excepción.</li>
          <li><strong><code>finally</code></strong>: se ejecuta siempre. Úsalo para cerrar recursos.</li>
          <li><code>raise MiError(...)</code> lanza una excepción. <code>raise</code> solo relanza la actual.</li>
          <li>Crea <strong>excepciones propias</strong> heredando de <code>Exception</code> para errores específicos de tu dominio.</li>
          <li>Nunca uses <code>except: pass</code>. Silenciar errores oculta problemas reales.</li>
          <li>Los bloques <code>try</code> deben ser pequeños — solo el código que puede fallar.</li>
        </ul>
      </div>

      <PullQuote>
        Un programa que maneja errores bien no es el que nunca falla —
        es el que <em>sabe qué hacer</em> cuando algo sale mal.
      </PullQuote>

      <ChapterNav
        prev={{ id: 'l2-m3', title: 'Programación orientada a objetos' }}
        next={{ id: 'l2-m5', title: 'Archivos y datos' }}
        onNav={onNav}
      />
    </article>
  );
}

const errThStyle = {
  padding: '10px 14px',
  fontFamily: 'var(--font-mono)',
  fontSize: '0.7rem',
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: 'var(--ink-3)',
  fontWeight: 500,
};

function ErrRow({ e, w, ex, last }) {
  const cell = {
    padding: '9px 14px',
    borderTop: last ? '0' : '1px solid var(--border-soft)',
    verticalAlign: 'top',
  };
  return (
    <tr>
      <td style={{ ...cell, fontFamily: 'var(--font-mono)', color: 'var(--accent)', fontWeight: 600, whiteSpace: 'nowrap' }}>{e}</td>
      <td style={cell}>{w}</td>
      <td style={{ ...cell, fontFamily: 'var(--font-mono)', color: 'var(--ink-2)', fontSize: '0.86rem' }}>{ex}</td>
    </tr>
  );
}

function ErrCard({ label, color, desc }) {
  return (
    <div style={{
      background: 'var(--paper-2)',
      border: '1px solid var(--border-soft)',
      borderRadius: 'var(--r-md)',
      padding: 'var(--s-4) var(--s-5)',
    }}>
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '1.1rem',
        fontWeight: 700,
        color,
        marginBottom: 'var(--s-2)',
      }}>{label}</div>
      <p style={{ margin: 0, fontSize: '0.9rem', color: 'var(--ink-2)', lineHeight: 1.6 }}>{desc}</p>
    </div>
  );
}

window.ChapterL2M4 = ChapterL2M4;
