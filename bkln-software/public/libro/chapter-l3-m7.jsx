// =============================================================
// chapter-l3-m7.jsx — Libro 3, Módulo 7: Python profesional
// =============================================================

function ChapterL3M7({ onNav }) {
  const flat = flatTOC();
  const idx  = flat.findIndex(c => c.id === 'l3-m7');
  const prev = idx > 0 ? flat[idx - 1] : null;
  const next = idx < flat.length - 1 ? flat[idx + 1] : null;

  return (
    <article className="reader-inner">
      <ChapterHeader
        book="// libro 3 · del código al mundo real"
        module="módulo 07"
        time="≈ 70 min"
        title={<>Python profesional</>}
        dek="El código que funciona es el punto de partida. El código profesional es mantenible, tipado, bien estructurado y preparado para que otros (o tú mismo en seis meses) lo entiendan y extiendan."
      />

      <p>
        Hasta aquí has aprendido a resolver problemas con Python. Este módulo
        trata de algo diferente: cómo escribir código que otros puedan leer,
        mantener y extender sin necesidad de preguntarte nada.
      </p>
      <p>
        Son las herramientas y convenciones que separan un script que funciona
        de un proyecto que escala: tipos, dataclasses, context managers,
        decoradores avanzados, logging y estructura de proyecto.
      </p>

      <Callout kind="success" title="Todo ejecutable en el libro">
        Type hints, dataclasses, contextlib, functools y logging son parte
        de la librería estándar — todo funciona en Pyodide.
        Las herramientas de línea de comandos (black, mypy, ruff) las mostramos
        como <strong>▸ local</strong>.
      </Callout>

      {/* ── Type hints ── */}
      <h2>Type hints — código que se explica solo</h2>

      <p>
        Python es dinámico, pero puedes anotar los tipos de variables,
        parámetros y retornos. Las anotaciones no cambian el comportamiento
        en tiempo de ejecución, pero permiten que editores y herramientas
        como <code>mypy</code> detecten errores antes de ejecutar el código:
      </p>

      <CodeBlock code={`
# Tipos básicos
nombre: str = "Ana"
edad:   int = 28
precio: float = 99.99
activo: bool  = True

# Colecciones (Python 3.9+)
def procesar(nombres: list[str]) -> dict[str, int]:
    return {n: len(n) for n in nombres}

# Opcionales y uniones
from typing import Optional

def buscar_usuario(id: int) -> Optional[str]:
    # puede devolver str o None
    usuarios = {1: "Ana", 2: "Luis"}
    return usuarios.get(id)

# Callable — funciones como parámetros
from typing import Callable

def aplicar(fn: Callable[[int, int], int], a: int, b: int) -> int:
    return fn(a, b)

resultado = aplicar(lambda x, y: x + y, 3, 4)   # 7
      `} />

      <CodeBlock code={`
from typing import TypeVar, Generic

# TypeVar — genéricos para funciones que trabajan con cualquier tipo
T = TypeVar("T")

def primero(lista: list[T]) -> T | None:
    return lista[0] if lista else None

primero([1, 2, 3])       # devuelve int
primero(["a", "b"])      # devuelve str

# TypedDict — diccionarios con tipos específicos por clave
from typing import TypedDict

class Usuario(TypedDict):
    nombre: str
    edad:   int
    email:  str

def crear_saludo(usuario: Usuario) -> str:
    return f"Hola {usuario['nombre']}, tienes {usuario['edad']} años"
      `} />

      <PyRunner
        initial={`from typing import Optional, Callable

# Función con tipos bien anotados
def filtrar_y_transformar(
    datos:     list[float],
    condicion: Callable[[float], bool],
    transformar: Callable[[float], float],
) -> list[float]:
    return [transformar(x) for x in datos if condicion(x)]

# Uso con lambdas
precios = [12.5, 8.0, 45.0, 3.2, 99.9, 22.0, 6.5]

caros_con_iva = filtrar_y_transformar(
    precios,
    condicion   = lambda p: p > 10,
    transformar = lambda p: round(p * 1.21, 2),
)
print("Precios >10€ con IVA:", caros_con_iva)

# Optional como retorno
def primer_par(numeros: list[int]) -> Optional[int]:
    for n in numeros:
        if n % 2 == 0:
            return n
    return None

lista = [1, 3, 5, 4, 7]
resultado = primer_par(lista)
if resultado is not None:
    print(f"Primer número par: {resultado}")
else:
    print("No hay números pares")
`}
        hint="Callable[[float], bool] significa: función que recibe un float y devuelve bool. Los types hints documentan la intención sin ejecutar nada."
      />

      {/* ── dataclasses ── */}
      <h2>dataclasses — clases sin boilerplate</h2>

      <p>
        El decorador <code>@dataclass</code> genera automáticamente
        <code> __init__</code>, <code>__repr__</code> y <code>__eq__</code>
        basándose en las anotaciones de la clase. Menos código, más intención:
      </p>

      <PyRunner
        initial={`from dataclasses import dataclass, field
from typing import Optional

@dataclass
class Producto:
    codigo:      str
    nombre:      str
    precio:      float
    stock:       int = 0
    descuento:   float = 0.0
    etiquetas:   list[str] = field(default_factory=list)

    def precio_final(self) -> float:
        return round(self.precio * (1 - self.descuento), 2)

    def disponible(self) -> bool:
        return self.stock > 0

    def __post_init__(self):
        # Validación al crear la instancia
        if self.precio <= 0:
            raise ValueError(f"El precio debe ser positivo: {self.precio}")
        if not 0 <= self.descuento < 1:
            raise ValueError(f"Descuento inválido: {self.descuento}")


# Python genera __init__, __repr__ y __eq__ automáticamente
p1 = Producto("P001", "Teclado mecánico", 89.99, stock=15, descuento=0.1,
              etiquetas=["periférico", "gaming"])
p2 = Producto("P002", "Ratón inalámbrico", 34.99, stock=0)

print(p1)             # __repr__ automático
print(f"Precio con descuento: {p1.precio_final()}€")
print(f"¿Disponible? {p1.disponible()} / {p2.disponible()}")
print(f"Etiquetas: {p1.etiquetas}")

# __eq__ compara todos los campos
p3 = Producto("P001", "Teclado mecánico", 89.99, stock=15, descuento=0.1,
              etiquetas=["periférico", "gaming"])
print(f"p1 == p3: {p1 == p3}")
`}
        hint="field(default_factory=list) evita el bug clásico de compartir la misma lista entre instancias. Nunca uses [] como default_factory directamente."
      />

      <CodeBlock code={`
from dataclasses import dataclass
from typing import ClassVar

@dataclass(frozen=True)   # inmutable como una namedtuple, hashable
class Punto:
    x: float
    y: float

    def distancia(self, otro: "Punto") -> float:
        return ((self.x - otro.x)**2 + (self.y - otro.y)**2) ** 0.5

p = Punto(3.0, 4.0)
# p.x = 10  # ← TypeError: frozen instance

# frozen=True permite usar Punto como clave de diccionario o en sets
puntos = {Punto(0, 0), Punto(1, 1)}
      `} />

      {/* ── Context managers ── */}
      <h2>Context managers — recursos con garantías</h2>

      <p>
        Ya conoces <code>with open()</code>. Puedes crear tus propios
        context managers de dos formas: con una clase o con
        <code> @contextmanager</code>:
      </p>

      <PyRunner
        initial={`from contextlib import contextmanager
import time

# Con @contextmanager (la forma más concisa)
@contextmanager
def cronometro(etiqueta=""):
    inicio = time.perf_counter()
    try:
        yield   # aquí se ejecuta el bloque with
    finally:
        fin = time.perf_counter()
        print(f"[{etiqueta or 'tiempo'}] {fin - inicio:.4f}s")

@contextmanager
def transaccion_simulada(nombre):
    print(f"BEGIN {nombre}")
    try:
        yield
        print(f"COMMIT {nombre}")
    except Exception as e:
        print(f"ROLLBACK {nombre}: {e}")
        raise

# Uso
with cronometro("suma larga"):
    total = sum(range(1_000_000))
    print(f"Suma: {total:,}")

print()

with transaccion_simulada("actualizar_precios"):
    print("  Actualizando precio P001...")
    print("  Actualizando precio P002...")

print()

try:
    with transaccion_simulada("operacion_fallida"):
        print("  Ejecutando paso 1...")
        raise ValueError("Error simulado en paso 2")
except ValueError:
    pass
`}
        hint="El try/finally en @contextmanager garantiza que el código después del yield se ejecuta siempre, incluso si hay una excepción."
      />

      {/* ── Decoradores avanzados ── */}
      <h2>Decoradores avanzados</h2>

      <p>
        En el Libro 2 viste decoradores básicos. Aquí van tres patrones
        más potentes: preservar metadatos con <code>functools.wraps</code>,
        decoradores con parámetros y decoradores de clase:
      </p>

      <PyRunner
        initial={`import functools
import time

# ── Patrón 1: functools.wraps ────────────────────────────────────
def registrar(fn):
    @functools.wraps(fn)   # preserva __name__, __doc__, etc.
    def wrapper(*args, **kwargs):
        print(f"→ llamando {fn.__name__}")
        resultado = fn(*args, **kwargs)
        print(f"← {fn.__name__} terminó")
        return resultado
    return wrapper

# ── Patrón 2: decorador con parámetros ──────────────────────────
def reintentar(veces=3, espera=0):
    def decorador(fn):
        @functools.wraps(fn)
        def wrapper(*args, **kwargs):
            for intento in range(1, veces + 1):
                try:
                    return fn(*args, **kwargs)
                except Exception as e:
                    if intento == veces:
                        raise
                    print(f"  Intento {intento} fallido: {e}. Reintentando...")
        return wrapper
    return decorador

# ── Patrón 3: caché con parámetro de TTL ────────────────────────
def cachear(fn):
    cache = {}
    @functools.wraps(fn)
    def wrapper(*args):
        if args not in cache:
            cache[args] = fn(*args)
        return cache[args]
    wrapper.cache = cache   # acceso al caché desde fuera
    return wrapper

# Uso
@registrar
def saludar(nombre):
    return f"Hola, {nombre}"

@reintentar(veces=3)
def operacion_inestable(n):
    import random
    if random.random() < 0.6:
        raise ConnectionError("Fallo de red simulado")
    return n * 2

@cachear
def fibonacci(n):
    if n < 2: return n
    return fibonacci(n - 1) + fibonacci(n - 2)

print(saludar("Ana"))
print()
print(f"fibonacci(10) = {fibonacci(10)}")
print(f"fibonacci(20) = {fibonacci(20)}")
print(f"Entradas en caché: {len(fibonacci.cache)}")
`}
        hint="functools.wraps copia __name__, __doc__ y __qualname__ de la función original al wrapper — sin él, todos los decoradores tendrían nombre 'wrapper'."
      />

      {/* ── Logging ── */}
      <h2>logging — trazabilidad profesional</h2>

      <p>
        <code>print()</code> es para explorar. <code>logging</code> es para
        producción: niveles configurables, múltiples destinos (archivo, consola,
        servicio externo) y contexto automático (módulo, línea, timestamp):
      </p>

      <PyRunner
        initial={`import logging

# Configuración básica
logging.basicConfig(
    level  = logging.DEBUG,
    format = "%(asctime)s [%(levelname)-8s] %(name)s: %(message)s",
    datefmt= "%H:%M:%S",
)

# Cada módulo tiene su propio logger
log = logging.getLogger("mi_app.procesador")

def procesar_pedido(pedido_id: int, importe: float) -> bool:
    log.info("Procesando pedido #%d (%.2f€)", pedido_id, importe)

    if importe <= 0:
        log.error("Importe inválido: %.2f — pedido #%d rechazado", importe, pedido_id)
        return False

    if importe > 1000:
        log.warning("Pedido de alto valor: %.2f€ — revisión manual recomendada", importe)

    log.debug("Verificando stock para pedido #%d", pedido_id)
    log.debug("Stock OK — procediendo al pago")
    log.info("Pedido #%d completado correctamente", pedido_id)
    return True

procesar_pedido(1001, 49.99)
print()
procesar_pedido(1002, 1500.00)
print()
procesar_pedido(1003, -10.00)
`}
        hint="Usa %s y %d en los mensajes de log en vez de f-strings: logging solo formatea el string si el mensaje va a mostrarse, ahorrando CPU al nivel WARNING cuando estás logueando DEBUG."
      />

      <CodeBlock label="▸ local · python — logging a archivo" code={`
import logging
from logging.handlers import RotatingFileHandler

def configurar_logging(nivel=logging.INFO):
    logger = logging.getLogger()
    logger.setLevel(nivel)

    # Handler para consola
    consola = logging.StreamHandler()
    consola.setLevel(logging.WARNING)   # solo WARNING+ en pantalla

    # Handler para archivo con rotación (max 5MB, 3 archivos)
    archivo = RotatingFileHandler(
        "app.log", maxBytes=5*1024*1024, backupCount=3, encoding="utf-8"
    )
    archivo.setLevel(logging.DEBUG)     # todo en el archivo

    formato = logging.Formatter(
        "%(asctime)s [%(levelname)s] %(name)s:%(lineno)d — %(message)s"
    )
    consola.setFormatter(formato)
    archivo.setFormatter(formato)

    logger.addHandler(consola)
    logger.addHandler(archivo)

configurar_logging()
      `} />

      {/* ── Estructura de proyecto ── */}
      <h2>Estructura de proyecto profesional</h2>

      <CodeBlock lang="text" label="src layout — el estándar moderno" code={`
mi_proyecto/
├── src/
│   └── mi_paquete/
│       ├── __init__.py
│       ├── modelos.py
│       ├── servicios.py
│       └── utils.py
├── tests/
│   ├── __init__.py
│   ├── test_modelos.py
│   └── test_servicios.py
├── pyproject.toml       ← configuración del proyecto
├── README.md
└── .gitignore
      `} />

      <CodeBlock label="pyproject.toml" lang="text" code={`
[build-system]
requires      = ["hatchling"]
build-backend = "hatchling.build"

[project]
name        = "mi-paquete"
version     = "0.1.0"
description = "Descripción del proyecto"
requires-python = ">=3.11"
dependencies = [
    "requests>=2.31",
    "pandas>=2.0",
]

[project.optional-dependencies]
dev = ["pytest", "pytest-cov", "mypy", "ruff"]

[tool.ruff]
line-length = 88
select      = ["E", "F", "I"]

[tool.mypy]
strict = true
      `} />

      {/* ── Herramientas ── */}
      <h2>Herramientas del ecosistema profesional</h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 'var(--s-4)',
        margin: 'var(--s-5) 0',
      }}>
        {[
          { nombre: 'ruff',      cmd: 'pip install ruff',   desc: 'Linter y formateador ultrarrápido (reemplaza flake8 + black + isort). El estándar actual.' },
          { nombre: 'mypy',      cmd: 'pip install mypy',   desc: 'Verificador de tipos estático. Detecta errores de tipo sin ejecutar el código.' },
          { nombre: 'pytest',    cmd: 'pip install pytest',  desc: 'Framework de tests. Ya lo conoces del módulo anterior.' },
          { nombre: 'pre-commit',cmd: 'pip install pre-commit', desc: 'Ejecuta ruff y mypy automáticamente antes de cada git commit.' },
        ].map(({ nombre, cmd, desc }) => (
          <div key={nombre} style={{
            background: 'var(--paper-2)',
            border: '1px solid var(--border-soft)',
            borderRadius: 'var(--r-md)',
            padding: 'var(--s-4)',
          }}>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontWeight: 700,
              fontSize: '0.9rem',
              color: 'var(--accent)',
              marginBottom: 'var(--s-1)',
            }}>{nombre}</div>
            <code style={{ fontSize: '0.75rem', color: 'var(--ink-3)' }}>{cmd}</code>
            <p style={{ fontSize: '0.87rem', color: 'var(--ink-2)', margin: 'var(--s-2) 0 0' }}>{desc}</p>
          </div>
        ))}
      </div>

      <CodeBlock label="terminal — flujo de trabajo diario" lang="text" code={`
# Formatear y limpiar el código
ruff check . --fix
ruff format .

# Verificar tipos
mypy src/

# Ejecutar tests con cobertura
pytest --cov=src --cov-report=term-missing

# Crear entorno virtual limpio
python -m venv .venv
source .venv/bin/activate   # Linux/Mac
.venv\\Scripts\\activate       # Windows
pip install -e ".[dev]"
      `} />

      {/* ── Protocol / ABC ── */}
      <h2>Clases abstractas y Protocol</h2>

      <PyRunner
        initial={`from abc import ABC, abstractmethod
from typing import Protocol

# ABC — herencia formal, lanza error si no implementas el método
class Almacenamiento(ABC):

    @abstractmethod
    def guardar(self, clave: str, datos: dict) -> None: ...

    @abstractmethod
    def cargar(self, clave: str) -> dict | None: ...

    def existe(self, clave: str) -> bool:
        return self.cargar(clave) is not None

class AlmacenamientoMemoria(Almacenamiento):
    def __init__(self):
        self._datos: dict[str, dict] = {}

    def guardar(self, clave: str, datos: dict) -> None:
        self._datos[clave] = datos

    def cargar(self, clave: str) -> dict | None:
        return self._datos.get(clave)

# Protocol — duck typing estructural (sin herencia)
class Serializable(Protocol):
    def a_dict(self) -> dict: ...
    def desde_dict(self, datos: dict) -> None: ...

# Prueba
repo = AlmacenamientoMemoria()
repo.guardar("usuario_1", {"nombre": "Ana", "edad": 28})
repo.guardar("usuario_2", {"nombre": "Luis", "edad": 34})

print("¿Existe usuario_1?", repo.existe("usuario_1"))
print("¿Existe usuario_3?", repo.existe("usuario_3"))
print("Datos:", repo.cargar("usuario_1"))

# No puedes instanciar la clase abstracta directamente
try:
    Almacenamiento()
except TypeError as e:
    print(f"Correcto: {e}")
`}
        hint="ABC obliga a implementar los métodos abstractos — Python lanza TypeError al instanciar si alguno falta. Protocol es más flexible: cualquier clase que tenga los métodos correctos cumple el protocolo, sin heredar."
      />

      {/* ── Quiz ── */}
      <Quiz
        question="¿Para qué sirve @dataclass(frozen=True)?"
        options={[
          "Hace que la clase no pueda ser subclaseada.",
          "Hace que las instancias sean inmutables y hashables (se pueden usar como claves de diccionario).",
          "Congela los valores por defecto de los campos.",
          "Impide que se llame a __post_init__.",
        ]}
        correct={1}
        explanation={"frozen=True genera __setattr__ y __delattr__ que lanzan FrozenInstanceError al intentar modificar un campo. Al ser inmutable, Python puede calcular un hash estable (__hash__), lo que permite usar instancias como claves de dict o elementos de set."}
      />

      {/* ── Ejercicios ── */}
      <Exercise
        number={1}
        title="Diseña dataclasses con validación"
        difficulty="fácil"
        runner={{
          initial: `from dataclasses import dataclass, field
from typing import Optional

@dataclass
class Direccion:
    calle:    str
    ciudad:   str
    pais:     str = "ES"
    codigo_postal: Optional[str] = None

@dataclass
class Cliente:
    nombre:    str
    email:     str
    edad:      int
    direccion: Optional[Direccion] = None
    compras:   list[float] = field(default_factory=list)

    def __post_init__(self):
        if "@" not in self.email:
            raise ValueError(f"Email inválido: {self.email}")
        if not 0 < self.edad < 130:
            raise ValueError(f"Edad inválida: {self.edad}")
        self.email = self.email.lower().strip()

    def total_gastado(self) -> float:
        return round(sum(self.compras), 2)

    def ticket_medio(self) -> Optional[float]:
        if not self.compras:
            return None
        return round(self.total_gastado() / len(self.compras), 2)

# Crear clientes
dir1 = Direccion("Calle Mayor 1", "Madrid", codigo_postal="28001")
c1   = Cliente("Ana García", "ANA@MAIL.COM", 28, dir1, [49.99, 129.00, 15.50])
c2   = Cliente("Luis Martín", "luis@mail.com", 34)

print(c1)
print(f"Total gastado:  {c1.total_gastado()}€")
print(f"Ticket medio:   {c1.ticket_medio()}€")
print(f"Email normalizado: {c1.email}")
print(f"\\n{c2.nombre} — sin compras, ticket medio: {c2.ticket_medio()}")

try:
    Cliente("Error", "no-es-un-email", 25)
except ValueError as e:
    print(f"\\nValidación OK: {e}")
`,
          hint: '__post_init__ se ejecuta justo después de __init__. Es el lugar correcto para validar y normalizar los datos de entrada.'
        }}
      >
        <p>Crea dataclasses con validación en <code>__post_init__</code> y métodos calculados.</p>
      </Exercise>

      <Exercise
        number={2}
        title="Context manager para medir rendimiento"
        difficulty="fácil"
        runner={{
          initial: `from contextlib import contextmanager
import time

@contextmanager
def medir(etiqueta: str, umbral_ms: float = None):
    """
    Context manager que mide el tiempo de ejecución.
    Si umbral_ms se especifica, avisa si se supera.
    """
    inicio = time.perf_counter()
    try:
        yield
    finally:
        duracion_ms = (time.perf_counter() - inicio) * 1000
        estado = ""
        if umbral_ms and duracion_ms > umbral_ms:
            estado = f" ⚠ LENTO (límite: {umbral_ms:.0f}ms)"
        print(f"  [{etiqueta}] {duracion_ms:.2f}ms{estado}")

# Prueba con distintas operaciones
print("Benchmarks:\\n")

with medir("suma 1M números", umbral_ms=50):
    resultado = sum(range(1_000_000))
    print(f"    resultado: {resultado:,}")

with medir("crear lista por comprensión", umbral_ms=20):
    cuadrados = [x**2 for x in range(10_000)]

with medir("ordenar lista", umbral_ms=10):
    import random
    datos = list(range(10_000))
    random.shuffle(datos)
    datos.sort()

with medir("operación rápida", umbral_ms=5):
    x = 2 ** 100
`,
          hint: 'yield sin valor devuelve None al bloque with. El try/finally garantiza que el tiempo se calcula siempre, incluso si hay una excepción.'
        }}
      >
        <p>Implementa un context manager para medir tiempos con alerta si se supera un umbral.</p>
      </Exercise>

      <Exercise
        number={3}
        title="Decorador de caché con tiempo de expiración"
        difficulty="media"
        runner={{
          initial: `import functools
import time

def cache_ttl(segundos: int):
    """
    Decorador de caché con tiempo de vida (TTL).
    Los resultados expiran tras 'segundos' segundos.
    """
    def decorador(fn):
        cache: dict = {}

        @functools.wraps(fn)
        def wrapper(*args, **kwargs):
            clave = (args, tuple(sorted(kwargs.items())))
            ahora = time.time()

            if clave in cache:
                resultado, timestamp = cache[clave]
                if ahora - timestamp < segundos:
                    print(f"  [caché HIT] {fn.__name__}{args}")
                    return resultado
                else:
                    print(f"  [caché EXPIRADO] {fn.__name__}{args}")

            print(f"  [caché MISS] calculando {fn.__name__}{args}...")
            resultado = fn(*args, **kwargs)
            cache[clave] = (resultado, ahora)
            return resultado

        wrapper.limpiar_cache = lambda: cache.clear()
        wrapper.tamaño_cache  = lambda: len(cache)
        return wrapper
    return decorador

# Simula una función costosa
@cache_ttl(segundos=5)
def calcular_estadisticas(n: int) -> dict:
    # Simulamos trabajo costoso
    datos = list(range(n))
    return {
        "suma":   sum(datos),
        "media":  sum(datos) / n if n else 0,
        "maximo": max(datos) if datos else None,
    }

print("Primera llamada:")
r1 = calcular_estadisticas(100)
print(f"  suma={r1['suma']}, media={r1['media']}\\n")

print("Segunda llamada (mismos args):")
r2 = calcular_estadisticas(100)
print(f"  suma={r2['suma']}\\n")

print("Llamada con args distintos:")
r3 = calcular_estadisticas(50)
print(f"  suma={r3['suma']}\\n")

print(f"Entradas en caché: {calcular_estadisticas.tamaño_cache()}")
`,
          hint: 'La clave del caché incluye los args Y los kwargs para distinguir llamadas equivalentes. tuple(sorted(kwargs.items())) convierte el dict en algo hashable.'
        }}
      >
        <p>
          Implementa un decorador de caché con TTL (time-to-live) que expira
          los resultados tras un número de segundos configurable.
        </p>
      </Exercise>

      <Exercise
        number={4}
        title="Sistema de logging estructurado"
        difficulty="media"
        runner={{
          initial: `import logging
import functools

# Logger del módulo
logging.basicConfig(
    level  = logging.DEBUG,
    format = "%(asctime)s [%(levelname)-8s] %(message)s",
    datefmt= "%H:%M:%S",
)
log = logging.getLogger("tienda")

# Decorador que loguea llamadas y excepciones
def loguear_llamada(nivel=logging.DEBUG):
    def decorador(fn):
        @functools.wraps(fn)
        def wrapper(*args, **kwargs):
            nombre = fn.__qualname__
            log.log(nivel, "→ %s(%s)", nombre,
                    ", ".join([repr(a) for a in args] +
                              [f"{k}={v!r}" for k, v in kwargs.items()]))
            try:
                resultado = fn(*args, **kwargs)
                log.log(nivel, "← %s = %r", nombre, resultado)
                return resultado
            except Exception as e:
                log.error("✗ %s lanzó %s: %s", nombre, type(e).__name__, e)
                raise
        return wrapper
    return decorador

class ServicioInventario:

    def __init__(self):
        self._stock = {"P001": 20, "P002": 5, "P003": 0}
        log.info("ServicioInventario inicializado con %d productos", len(self._stock))

    @loguear_llamada(logging.INFO)
    def consultar_stock(self, codigo: str) -> int:
        stock = self._stock.get(codigo, -1)
        if stock == -1:
            raise KeyError(f"Producto {codigo} no encontrado")
        return stock

    @loguear_llamada(logging.INFO)
    def vender(self, codigo: str, cantidad: int) -> bool:
        stock = self.consultar_stock(codigo)
        if stock < cantidad:
            log.warning("Stock insuficiente para %s: tiene %d, pide %d", codigo, stock, cantidad)
            return False
        self._stock[codigo] -= cantidad
        log.info("Venta OK: %s × %d. Stock restante: %d", codigo, cantidad, self._stock[codigo])
        return True

# Prueba
s = ServicioInventario()
print()
s.consultar_stock("P001")
print()
s.vender("P001", 5)
print()
s.vender("P002", 10)   # stock insuficiente
print()
try:
    s.consultar_stock("P999")
except KeyError:
    pass
`,
          hint: 'log.log(nivel, mensaje) permite pasar el nivel como variable, lo que hace el decorador reutilizable para cualquier nivel de logging.'
        }}
      >
        <p>
          Combina logging y decoradores para trazar automáticamente todas
          las llamadas a métodos de una clase de servicio.
        </p>
      </Exercise>

      <Exercise
        number={5}
        title="Clase abstracta para repositorios de datos"
        difficulty="difícil"
        runner={{
          initial: `from abc import ABC, abstractmethod
from dataclasses import dataclass, field
from typing import Optional
import json

@dataclass
class Articulo:
    id:       int
    titulo:   str
    precio:   float
    categoria: str
    activo:   bool = True

    def a_dict(self) -> dict:
        return {"id": self.id, "titulo": self.titulo,
                "precio": self.precio, "categoria": self.categoria,
                "activo": self.activo}

class RepositorioBase(ABC):
    """Contrato que deben cumplir todos los repositorios."""

    @abstractmethod
    def guardar(self, articulo: Articulo) -> None: ...

    @abstractmethod
    def obtener(self, id: int) -> Optional[Articulo]: ...

    @abstractmethod
    def listar(self) -> list[Articulo]: ...

    @abstractmethod
    def eliminar(self, id: int) -> bool: ...

    def buscar_por_categoria(self, categoria: str) -> list[Articulo]:
        return [a for a in self.listar() if a.categoria == categoria]


class RepositorioMemoria(RepositorioBase):
    def __init__(self):
        self._datos: dict[int, Articulo] = {}

    def guardar(self, articulo: Articulo) -> None:
        self._datos[articulo.id] = articulo

    def obtener(self, id: int) -> Optional[Articulo]:
        return self._datos.get(id)

    def listar(self) -> list[Articulo]:
        return list(self._datos.values())

    def eliminar(self, id: int) -> bool:
        if id in self._datos:
            del self._datos[id]
            return True
        return False


# La misma lógica de negocio funciona con cualquier implementación
def poblar_y_consultar(repo: RepositorioBase):
    articulos = [
        Articulo(1, "Teclado mecánico", 89.99, "Periféricos"),
        Articulo(2, "Monitor 27 pulgadas", 349.00, "Pantallas"),
        Articulo(3, "Ratón inalámbrico", 34.99, "Periféricos"),
        Articulo(4, "Webcam HD", 59.99, "Periféricos"),
    ]
    for a in articulos:
        repo.guardar(a)

    print(f"Total artículos: {len(repo.listar())}")
    print(f"Periféricos: {len(repo.buscar_por_categoria('Periféricos'))}")

    repo.eliminar(3)
    print(f"Tras eliminar P3: {len(repo.listar())} artículos")

    art = repo.obtener(1)
    print(f"Artículo 1: {art.titulo} ({art.precio}€)")

repo = RepositorioMemoria()
poblar_y_consultar(repo)
`,
          hint: 'El patrón Repositorio (ABC + implementaciones concretas) permite cambiar de memoria a SQLite a PostgreSQL sin tocar la lógica de negocio — solo cambia qué implementación inyectas.'
        }}
      >
        <p>
          Diseña una clase abstracta <code>RepositorioBase</code> e impleméntala
          en memoria. La lógica de negocio debe funcionar con cualquier implementación.
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
          <li><strong>Type hints</strong> — documentan intención y permiten que mypy detecte errores sin ejecutar.</li>
          <li><strong>@dataclass</strong> — genera __init__, __repr__, __eq__ desde las anotaciones.</li>
          <li><strong>frozen=True</strong> — instancias inmutables y hashables.</li>
          <li><strong>@contextmanager</strong> — context managers con <code>yield</code> y <code>try/finally</strong>.</li>
          <li><strong>functools.wraps</strong> — preserva metadatos al decorar funciones.</li>
          <li><strong>logging</strong> — niveles, handlers, formatters; no uses print en producción.</li>
          <li><strong>ABC + @abstractmethod</strong> — contratos que las subclases deben cumplir.</li>
          <li><strong>pyproject.toml + ruff + mypy</strong> — la base de cualquier proyecto profesional.</li>
        </ul>
      </div>

      <PullQuote>
        El código limpio no es el que el compilador entiende —
        es el que tu compañero de equipo entiende a las dos de la madrugada.
      </PullQuote>

      <ChapterNav
        prev={prev ? { id: prev.id, title: prev.title } : null}
        next={next ? { id: next.id, title: next.title } : null}
        onNav={onNav}
      />
    </article>
  );
}

window.ChapterL3M7 = ChapterL3M7;
