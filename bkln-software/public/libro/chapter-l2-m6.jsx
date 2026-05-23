// =============================================================
// chapter-l2-m6.jsx — Libro 2, Módulo 6: Módulos y paquetes
// =============================================================

function ChapterL2M6({ onNav }) {
  return (
    <article className="reader-inner">
      <ChapterHeader
        book="// libro 2 · programando con estructura"
        module="módulo 06"
        time="≈ 55 min"
        title={<>Módulos <em>y paquetes</em></>}
        dek="Un programa de verdad no vive en un solo archivo. Aprenderás a organizar tu código en módulos, reutilizar la biblioteca estándar de Python y usar paquetes de terceros con pip."
      />

      <p>
        Cuando un programa crece, meterlo todo en un único archivo se vuelve caótico.
        Python resuelve esto con <strong>módulos</strong>: cualquier archivo <code>.py</code> es
        un módulo que puedes importar desde otro. Agrupa varios módulos en una carpeta
        y tienes un <strong>paquete</strong>. Y la comunidad ha publicado cientos de miles de
        paquetes listos para usar — no tienes que reinventar la rueda.
      </p>

      <h2>Importar módulos</h2>

      <p>Hay varias formas de importar — cada una con su uso apropiado:</p>

      <CodeBlock code={`# 1. Importar el módulo completo
import math
print(math.sqrt(16))      # 4.0
print(math.pi)            # 3.141592...

# 2. Importar algo específico
from math import sqrt, pi
print(sqrt(25))           # 5.0  — sin el prefijo "math."
print(pi)                 # 3.141592...

# 3. Importar con alias — útil para nombres largos
import datetime as dt
hoy = dt.date.today()
print(hoy)                # 2026-05-23

from collections import defaultdict as ddict
conteo = ddict(int)

# 4. Importar todo (evítalo en código serio)
from math import *        # importa sqrt, pi, sin, cos... todo
# Problema: no sabes qué está en tu namespace`} />

      <Callout kind="warn" title="Evita from módulo import *">
        <code>import *</code> llena tu espacio de nombres con nombres desconocidos y puede
        sobreescribir variables que ya tenías. En scripts personales pasa, pero en código
        que otros van a leer o mantener es una mala práctica. Sé explícito.
      </Callout>

      <h2>La biblioteca estándar</h2>

      <p>
        Python viene con más de 200 módulos incluidos — sin instalar nada. Estos son
        los más útiles del día a día:
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
              <th style={modThStyle}>Módulo</th>
              <th style={modThStyle}>Para qué sirve</th>
            </tr>
          </thead>
          <tbody>
            <ModRow m="math" d="Operaciones matemáticas: sqrt, ceil, floor, log, trigonometría" />
            <ModRow m="random" d="Números aleatorios, mezclar listas, elegir elementos al azar" />
            <ModRow m="datetime" d="Fechas y horas: date, time, datetime, timedelta" />
            <ModRow m="os" d="Interactuar con el sistema operativo: rutas, variables de entorno" />
            <ModRow m="sys" d="Acceso al intérprete: argumentos de línea de comandos, salir" />
            <ModRow m="pathlib" d="Rutas modernas (visto en M5)" />
            <ModRow m="json" d="Serializar/deserializar JSON (visto en M5)" />
            <ModRow m="csv" d="Leer y escribir CSV (visto en M5)" />
            <ModRow m="collections" d="Counter, defaultdict, deque, namedtuple, OrderedDict" />
            <ModRow m="itertools" d="Combinaciones, permutaciones, ciclos, cadenas de iterables" />
            <ModRow m="functools" d="lru_cache, reduce, wraps, partial" />
            <ModRow m="re" d="Expresiones regulares para buscar y transformar texto" />
            <ModRow m="time" d="Medir tiempo, pausas con sleep" />
            <ModRow m="string" d="Constantes de caracteres: ascii_letters, digits, punctuation" last />
          </tbody>
        </table>
      </div>

      <h3>Ejemplos rápidos de los más usados</h3>

      <CodeBlock code={`import random

# Número aleatorio entre 1 y 100
print(random.randint(1, 100))

# Elemento aleatorio de una lista
colores = ["rojo", "verde", "azul", "amarillo"]
print(random.choice(colores))

# Mezclar una lista (in-place)
random.shuffle(colores)
print(colores)

# Muestra aleatoria sin repetición
print(random.sample(range(1, 50), k=6))  # como la lotería`} />

      <CodeBlock code={`from datetime import date, datetime, timedelta

hoy       = date.today()
ahora     = datetime.now()
mañana    = hoy + timedelta(days=1)
hace_una_semana = hoy - timedelta(weeks=1)

print(hoy)                               # 2026-05-23
print(ahora.strftime("%d/%m/%Y %H:%M"))  # 23/05/2026 14:32
print(mañana)                            # 2026-05-24

# Diferencia entre fechas
nacimiento = date(1990, 6, 15)
edad_dias  = (hoy - nacimiento).days
print(f"Días vividos: {edad_dias:,}")`} />

      <CodeBlock code={`from collections import Counter, defaultdict, deque

# Counter — contar elementos
texto  = "mississippi"
conteo = Counter(texto)
print(conteo.most_common(3))     # [('s', 4), ('i', 4), ('p', 2)]

# defaultdict — dict con valor por defecto
grupos = defaultdict(list)
datos  = [("A", 1), ("B", 2), ("A", 3), ("B", 4), ("C", 5)]
for clave, valor in datos:
    grupos[clave].append(valor)
print(dict(grupos))              # {'A': [1, 3], 'B': [2, 4], 'C': [5]}

# deque — cola doble eficiente
cola = deque([1, 2, 3])
cola.appendleft(0)               # añadir al inicio
cola.append(4)                   # añadir al final
print(cola)                      # deque([0, 1, 2, 3, 4])
print(cola.popleft())            # 0 — sacar del inicio (O(1))`} />

      <Quiz
        question="¿Cuál es la forma correcta de importar solo la función randint del módulo random?"
        options={['import random.randint', 'from random import randint', 'import randint from random', 'include random.randint']}
        correct={1}
        explanation='La sintaxis correcta es "from módulo import nombre". Así puedes usar randint() directamente sin el prefijo random. La forma "import random" también funciona pero entonces debes escribir random.randint().'
      />

      <h2>Crear tus propios módulos</h2>

      <p>
        Cualquier archivo <code>.py</code> es un módulo. Si tienes un proyecto con varios
        archivos, puedes importar funciones y clases entre ellos:
      </p>

      <CodeBlock code={`# archivo: utilidades.py
def formatear_precio(precio, moneda="€"):
    return f"{precio:,.2f} {moneda}"

def porcentaje(valor, total):
    if total == 0:
        return 0.0
    return (valor / total) * 100

PI_APROXIMADO = 3.14159`} />

      <CodeBlock code={`# archivo: main.py  — en la misma carpeta que utilidades.py
from utilidades import formatear_precio, porcentaje, PI_APROXIMADO

print(formatear_precio(1234.5))          # 1,234.50 €
print(formatear_precio(99.99, "USD"))    # 99.99 USD
print(porcentaje(30, 200))              # 15.0
print(PI_APROXIMADO)                    # 3.14159`} />

      <h2>El bloque if __name__ == "__main__"</h2>

      <p>
        Cuando Python ejecuta un archivo directamente, la variable especial
        <code> __name__</code> vale <code>"__main__"</code>. Cuando ese mismo archivo
        se importa desde otro, <code>__name__</code> vale el nombre del módulo.
        Esto te permite tener código que solo se ejecuta cuando lanzas el archivo directamente:
      </p>

      <CodeBlock code={`# archivo: calculadora.py

def sumar(a, b):
    return a + b

def restar(a, b):
    return a - b

# Este bloque solo se ejecuta con "python calculadora.py"
# No se ejecuta si alguien hace "from calculadora import sumar"
if __name__ == "__main__":
    print("Probando la calculadora...")
    print(sumar(10, 5))    # 15
    print(restar(10, 5))   # 5`} />

      <Callout kind="tip" title="Regla de oro: siempre usa este patrón">
        Todo módulo que pueda ser tanto importado como ejecutado directamente debería
        tener su código de prueba o punto de entrada dentro de
        <code> if __name__ == "__main__":</code>. Es la convención universal en Python.
      </Callout>

      <h2>Paquetes — organizar módulos en carpetas</h2>

      <p>
        Un <strong>paquete</strong> es una carpeta que contiene módulos y un archivo
        especial <code>__init__.py</code> (puede estar vacío). Esto le dice a Python
        que esa carpeta es un paquete importable:
      </p>

      <CodeBlock code={`mi_proyecto/
│
├── main.py
│
└── tienda/               ← paquete
    ├── __init__.py       ← obligatorio (puede estar vacío)
    ├── productos.py
    ├── clientes.py
    └── utils/            ← subpaquete
        ├── __init__.py
        └── formateo.py`} />

      <CodeBlock code={`# main.py — importar desde el paquete

from tienda.productos import Producto, Inventario
from tienda.clientes  import Cliente
from tienda.utils.formateo import formatear_precio

# O importar el módulo completo
import tienda.productos as prod`} />

      <CodeBlock code={`# tienda/__init__.py — puedes re-exportar cosas aquí
# para que sean accesibles directamente desde "tienda"

from .productos import Producto
from .clientes  import Cliente

# Ahora se puede hacer: from tienda import Producto
# En lugar de:          from tienda.productos import Producto`} />

      <h2>pip — instalar paquetes externos</h2>

      <p>
        <code>pip</code> es el instalador de paquetes de Python. Tiene acceso a más de
        500,000 paquetes publicados en <strong>PyPI</strong> (Python Package Index):
      </p>

      <CodeBlock code={`# En la terminal (no en Python):

# Instalar un paquete
pip install requests

# Instalar una versión específica
pip install requests==2.31.0

# Actualizar un paquete
pip install --upgrade requests

# Desinstalar
pip uninstall requests

# Ver paquetes instalados
pip list

# Guardar dependencias del proyecto en un archivo
pip freeze > requirements.txt

# Instalar todo lo que hay en requirements.txt
pip install -r requirements.txt`} />

      <h2>Entornos virtuales con venv</h2>

      <p>
        Un <strong>entorno virtual</strong> es una instalación aislada de Python para
        tu proyecto. Cada proyecto tiene sus propias versiones de paquetes sin interferir
        con otros proyectos ni con el Python del sistema:
      </p>

      <CodeBlock code={`# En la terminal — crear el entorno virtual
python -m venv venv          # crea la carpeta "venv"

# Activar (Windows)
venv\\Scripts\\activate

# Activar (Mac/Linux)
source venv/bin/activate

# El prompt cambia: (venv) C:\\proyecto>
# Ahora pip instala solo en este entorno
pip install requests pandas

# Desactivar
deactivate`} />

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 'var(--s-4)',
        margin: 'var(--s-5) 0',
      }} className="venv-grid">
        <VenvCard
          label="Sin venv"
          color="var(--ink-3)"
          items={[
            'pip instala para todo el sistema',
            'Proyecto A necesita requests 2.28',
            'Proyecto B necesita requests 2.31',
            '¡Conflicto! Solo una versión puede estar instalada',
          ]}
        />
        <VenvCard
          label="Con venv"
          color="var(--highlight)"
          items={[
            'Cada proyecto tiene su propia carpeta venv',
            'Proyecto A: requests 2.28 en su venv',
            'Proyecto B: requests 2.31 en su venv',
            'Sin conflictos — completamente aislados',
          ]}
        />
        <style>{`@media (max-width: 720px) { .venv-grid { grid-template-columns: 1fr !important; } }`}</style>
      </div>

      <Callout kind="info" title="Añade venv/ a .gitignore">
        La carpeta del entorno virtual nunca debe subirse a Git — puede pesar cientos de
        MB. Lo que sí subes es <code>requirements.txt</code> con la lista de dependencias.
        Cualquiera puede recrear el entorno con <code>pip install -r requirements.txt</code>.
      </Callout>

      <h2>Paquetes populares que deberías conocer</h2>

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
              <th style={modThStyle}>Paquete</th>
              <th style={modThStyle}>Para qué</th>
            </tr>
          </thead>
          <tbody>
            <ModRow m="requests" d="Hacer peticiones HTTP — la forma de hablar con APIs web" />
            <ModRow m="pandas" d="Análisis de datos: tablas, filtros, estadísticas, CSV/Excel" />
            <ModRow m="numpy" d="Arrays numéricos y matemáticas de alto rendimiento" />
            <ModRow m="flask / fastapi" d="Crear APIs y aplicaciones web" />
            <ModRow m="sqlalchemy" d="Trabajar con bases de datos SQL desde Python" />
            <ModRow m="pytest" d="Escribir y ejecutar tests automáticos" />
            <ModRow m="pydantic" d="Validación de datos y modelos tipados" />
            <ModRow m="rich" d="Texto con colores, tablas y progreso en la terminal" last />
          </tbody>
        </table>
      </div>

      <h2>Ejemplo completo: utilidades de proyecto</h2>

      <p>
        Un mini-paquete de utilidades que demuestra importaciones, módulos propios
        y uso de la biblioteca estándar.
      </p>

      <PyRunner
        initial={`# Simulamos tener varios "módulos" como funciones agrupadas
# En un proyecto real serían archivos .py separados

import math
import random
import string
from datetime import datetime
from collections import Counter

# ── módulo: matemáticas ──────────────────────────────────────
def estadisticas(numeros):
    if not numeros:
        raise ValueError("La lista no puede estar vacía.")
    n     = len(numeros)
    media = sum(numeros) / n
    varianza = sum((x - media) ** 2 for x in numeros) / n
    return {
        "n":         n,
        "min":       min(numeros),
        "max":       max(numeros),
        "media":     round(media, 4),
        "desv_std":  round(math.sqrt(varianza), 4),
        "mediana":   sorted(numeros)[n // 2],
    }

# ── módulo: texto ─────────────────────────────────────────────
def generar_password(longitud=12, simbolos=True):
    chars = string.ascii_letters + string.digits
    if simbolos:
        chars += string.punctuation
    return "".join(random.choice(chars) for _ in range(longitud))

def palabras_frecuentes(texto, top=5):
    palabras = texto.lower().split()
    limpias  = [p.strip(string.punctuation) for p in palabras if p.strip(string.punctuation)]
    return Counter(limpias).most_common(top)

# ── módulo: tiempo ────────────────────────────────────────────
def timestamp_legible():
    return datetime.now().strftime("%Y-%m-%d %H:%M:%S")

def cronometrar(func, *args, **kwargs):
    import time
    inicio    = time.perf_counter()
    resultado = func(*args, **kwargs)
    duracion  = time.perf_counter() - inicio
    return resultado, round(duracion * 1000, 3)   # en milisegundos

# ── uso ───────────────────────────────────────────────────────
datos = [random.gauss(100, 15) for _ in range(1000)]
stats = estadisticas(datos)
print("Estadísticas de 1000 valores aleatorios:")
for k, v in stats.items():
    print(f"  {k:<10} {v}")

print(f"\\nTimestamp: {timestamp_legible()}")

print(f"\\nPasswords generadas:")
for _ in range(3):
    print(f"  {generar_password(16)}")

texto_ejemplo = """
Python es potente. Python es legible. Python es versátil.
Muchos programadores eligen Python como primer lenguaje.
Python tiene una comunidad enorme y muchos paquetes disponibles.
"""
print("\\nPalabras más frecuentes:")
for palabra, n in palabras_frecuentes(texto_ejemplo, top=5):
    print(f"  {palabra:<12} {n}x")

resultado, ms = cronometrar(estadisticas, datos)
print(f"\\nTiempo de estadisticas(): {ms} ms")`}
      />

      <h2>Ejercicios</h2>

      <p style={{ color: 'var(--ink-2)' }}>
        Cinco ejercicios para practicar importaciones, módulos de la biblioteca estándar
        y organización de código.
      </p>

      <Exercise
        number="6.1"
        title="Calculadora de fechas"
        difficulty="fácil"
        runner={{
          initial: `# Usa el módulo datetime para crear una calculadora de fechas.
# Implementa estas funciones:
#
#   dias_hasta(fecha_str)   → días que faltan desde hoy hasta "YYYY-MM-DD"
#   edad_en_dias(fecha_str) → días que han pasado desde "YYYY-MM-DD"
#   dia_semana(fecha_str)   → "lunes", "martes"... en español
#
# Prueba con tu fecha de nacimiento y una fecha futura.

from datetime import date

DIAS_ES = ["lunes","martes","miércoles","jueves","viernes","sábado","domingo"]

`,
          hint: 'Usa date.fromisoformat("YYYY-MM-DD") para parsear la fecha. La diferencia entre fechas devuelve un timedelta con .days. date.weekday() devuelve 0=lunes...6=domingo.',
          solution: {
            code: `from datetime import date

DIAS_ES = ["lunes","martes","miércoles","jueves","viernes","sábado","domingo"]

def dias_hasta(fecha_str):
    fecha = date.fromisoformat(fecha_str)
    return (fecha - date.today()).days

def edad_en_dias(fecha_str):
    fecha = date.fromisoformat(fecha_str)
    return (date.today() - fecha).days

def dia_semana(fecha_str):
    fecha = date.fromisoformat(fecha_str)
    return DIAS_ES[fecha.weekday()]

# Pruebas
print(f"Días hasta fin de año: {dias_hasta('2026-12-31')}")
print(f"Días desde 01/01/2000: {edad_en_dias('2000-01-01')}")
print(f"El 25/12/2026 es:      {dia_semana('2026-12-25')}") `,
            explanation: 'date.fromisoformat() es la forma más directa de parsear fechas en formato ISO (YYYY-MM-DD). La resta entre dos objetos date devuelve un timedelta — acceder a .days da el número de días como entero positivo o negativo.',
          },
        }}
      >
        <p>Trabaja con fechas usando el módulo datetime de la biblioteca estándar.</p>
      </Exercise>

      <Exercise
        number="6.2"
        title="Generador de datos falsos"
        difficulty="fácil"
        runner={{
          initial: `# Usa random y string para crear un generador de datos de prueba.
# Implementa:
#
#   generar_nombre()   → nombre completo aleatorio
#   generar_email(nombre, apellido) → email basado en el nombre
#   generar_telefono() → "+34 6XX XXX XXX"
#   generar_usuario()  → dict con nombre, email, telefono, id_usuario
#
# El id_usuario es un string de 8 caracteres alfanuméricos aleatorios.

import random
import string

NOMBRES    = ["Ana","Luis","Sofía","Carlos","María","Pedro","Laura","Jorge"]
APELLIDOS  = ["García","Pérez","López","Martínez","Sánchez","Ruiz","Torres"]
DOMINIOS   = ["gmail.com","yahoo.es","hotmail.com","outlook.es"]

`,
          hint: 'generar_nombre usa random.choice en NOMBRES y APELLIDOS. generar_email normaliza con .lower() y añade random.choice(DOMINIOS). generar_telefono usa randint para los dígitos. El id usa random.choices(string.ascii_lowercase + string.digits, k=8).',
          solution: {
            code: `import random
import string

NOMBRES   = ["Ana","Luis","Sofía","Carlos","María","Pedro","Laura","Jorge"]
APELLIDOS = ["García","Pérez","López","Martínez","Sánchez","Ruiz","Torres"]
DOMINIOS  = ["gmail.com","yahoo.es","hotmail.com","outlook.es"]

def generar_nombre():
    return random.choice(NOMBRES), random.choice(APELLIDOS)

def generar_email(nombre, apellido):
    n = nombre.lower().replace(" ","")
    a = apellido.lower().replace(" ","")
    num = random.randint(1, 999)
    return f"{n}.{a}{num}@{random.choice(DOMINIOS)}"

def generar_telefono():
    prefijo = random.choice(["6","7"])
    resto   = "".join(str(random.randint(0,9)) for _ in range(8))
    return f"+34 {prefijo}{resto[:2]} {resto[2:5]} {resto[5:]}"

def generar_usuario():
    nombre, apellido = generar_nombre()
    return {
        "id":       "".join(random.choices(string.ascii_lowercase + string.digits, k=8)),
        "nombre":   f"{nombre} {apellido}",
        "email":    generar_email(nombre, apellido),
        "telefono": generar_telefono(),
    }

print("Usuarios de prueba generados:")
for _ in range(4):
    u = generar_usuario()
    print(f"  [{u['id']}] {u['nombre']:<20} {u['email']:<35} {u['telefono']}")`,
            explanation: 'random.choices (con s) permite elegir k elementos con repetición — perfecto para IDs aleatorios. La diferencia con random.choice (sin s) es que choice elige uno solo. Este tipo de generador de datos falsos es muy útil para poblar bases de datos de desarrollo.',
          },
        }}
      >
        <p>Genera datos de usuarios de prueba usando random y string.</p>
      </Exercise>

      <Exercise
        number="6.3"
        title="Análisis de texto con re"
        difficulty="media"
        runner={{
          initial: `# Usa el módulo re (expresiones regulares) para analizar texto.
# Implementa:
#
#   extraer_emails(texto)     → lista de emails encontrados
#   extraer_urls(texto)       → lista de URLs (http/https)
#   extraer_numeros(texto)    → lista de números (int o float)
#   contar_palabras(texto)    → dict {palabra: frecuencia}, sin stopwords
#
# STOPWORDS = {"el","la","los","las","un","una","de","en","y","a","que","se"}

import re
from collections import Counter

STOPWORDS = {"el","la","los","las","un","una","de","en","y","a","que","se","es","con","del"}

texto = """
Contacta con Ana en ana.garcia@ejemplo.com o visita https://www.bklnsoftware.tech
para más información. Luis tiene 3 proyectos activos valorados en 1500.50 euros.
Su email es luis.perez123@gmail.com y su web es http://luisperez.dev
El precio total es 42 dólares más 3.75 de envío.
"""
`,
          hint: 'Emails: r"[\\w.+-]+@[\\w-]+\\.[\\w.]+" . URLs: r"https?://[\\S]+" . Números: r"\\d+\\.?\\d*" . Para palabras: re.findall(r"\\b[a-záéíóúñ]+\\b", texto.lower()) luego filtra stopwords.',
          solution: {
            code: `import re
from collections import Counter

STOPWORDS = {"el","la","los","las","un","una","de","en","y","a","que","se","es","con","del"}

def extraer_emails(texto):
    return re.findall(r'[\\w.+-]+@[\\w-]+\\.[\\w.]+', texto)

def extraer_urls(texto):
    return re.findall(r'https?://[^\\s]+', texto)

def extraer_numeros(texto):
    return [float(n) if '.' in n else int(n)
            for n in re.findall(r'\\d+\\.\\d+|\\d+', texto)]

def contar_palabras(texto, top=10):
    palabras = re.findall(r'\\b[a-záéíóúñ]+\\b', texto.lower())
    filtradas = [p for p in palabras if p not in STOPWORDS and len(p) > 2]
    return Counter(filtradas).most_common(top)

texto = """
Contacta con Ana en ana.garcia@ejemplo.com o visita https://www.bklnsoftware.tech
para más información. Luis tiene 3 proyectos activos valorados en 1500.50 euros.
Su email es luis.perez123@gmail.com y su web es http://luisperez.dev
El precio total es 42 dólares más 3.75 de envío.
"""

print("Emails:", extraer_emails(texto))
print("URLs:", extraer_urls(texto))
print("Números:", extraer_numeros(texto))
print("\\nPalabras más frecuentes:")
for palabra, n in contar_palabras(texto):
    print(f"  {palabra}: {n}")`,
            explanation: 'Las expresiones regulares son un mini-lenguaje para buscar patrones en texto. \\w+ significa "uno o más caracteres de palabra". \\d+ significa "uno o más dígitos". https?:// significa "http" seguido de una "s" opcional. Son intimidantes al principio pero indispensables para procesar texto real.',
          },
        }}
      >
        <p>Usa expresiones regulares para extraer información estructurada de texto libre.</p>
      </Exercise>

      <Exercise
        number="6.4"
        title="Módulo de logging propio"
        difficulty="media"
        runner={{
          initial: `# Crea un módulo de logging simple inspirado en el estándar.
# Niveles: DEBUG < INFO < WARNING < ERROR < CRITICAL
#
# Clase Logger:
#   - __init__(nombre, nivel_minimo="INFO")
#   - debug(msg), info(msg), warning(msg), error(msg), critical(msg)
#   - Cada mensaje muestra: [TIMESTAMP] [NIVEL] [nombre] mensaje
#   - Solo muestra mensajes con nivel >= nivel_minimo
#   - guardar_en(lista) → guarda mensajes también en esa lista (opcional)
#
# Prueba con dos loggers: uno en DEBUG y otro en WARNING

from datetime import datetime

NIVELES = {"DEBUG": 0, "INFO": 1, "WARNING": 2, "ERROR": 3, "CRITICAL": 4}
`,
          hint: 'En cada método (debug, info...) compara NIVELES[nivel] >= NIVELES[self._nivel_minimo]. Si pasa, formatea el mensaje con datetime.now().strftime(...) y el nombre del nivel. Guarda en self._registro si existe.',
          solution: {
            code: `from datetime import datetime

NIVELES = {"DEBUG": 0, "INFO": 1, "WARNING": 2, "ERROR": 3, "CRITICAL": 4}

COLORES = {
    "DEBUG":    "// DEBUG   ",
    "INFO":     "// INFO    ",
    "WARNING":  "// WARNING ",
    "ERROR":    "// ERROR   ",
    "CRITICAL": "// CRITICAL",
}

class Logger:
    def __init__(self, nombre, nivel_minimo="INFO"):
        self.nombre         = nombre
        self._nivel_minimo  = nivel_minimo.upper()
        self._registro      = None

    def guardar_en(self, lista):
        self._registro = lista

    def _log(self, nivel, msg):
        if NIVELES.get(nivel, 0) < NIVELES.get(self._nivel_minimo, 0):
            return
        ts      = datetime.now().strftime("%H:%M:%S")
        linea   = f"[{ts}] {COLORES[nivel]} [{self.nombre}] {msg}"
        print(linea)
        if self._registro is not None:
            self._registro.append({"nivel": nivel, "msg": msg, "ts": ts})

    def debug(self, msg):    self._log("DEBUG", msg)
    def info(self, msg):     self._log("INFO", msg)
    def warning(self, msg):  self._log("WARNING", msg)
    def error(self, msg):    self._log("ERROR", msg)
    def critical(self, msg): self._log("CRITICAL", msg)


# Logger para desarrollo — muestra todo
dev = Logger("App", nivel_minimo="DEBUG")
historial = []
dev.guardar_en(historial)

dev.debug("Iniciando conexión con la base de datos...")
dev.info("Servidor arrancado en puerto 8000")
dev.warning("Memoria al 80% de capacidad")
dev.error("Fallo al conectar con el servicio de email")
dev.critical("Base de datos no responde")

# Logger para producción — solo warnings en adelante
prod = Logger("Produccion", nivel_minimo="WARNING")
print("\\n--- Logger de producción ---")
prod.debug("Este mensaje NO aparece")
prod.info("Este tampoco")
prod.warning("Este sí aparece")
prod.error("Este también")

print(f"\\nMensajes registrados: {len(historial)}")`,
            explanation: 'Este ejercicio reproduce el patrón del módulo logging de Python. La clave es el filtrado por nivel numérico: solo se muestra si NIVELES[nivel] >= NIVELES[nivel_minimo]. El método _log centraliza toda la lógica — los métodos debug/info/warning/error/critical son wrappers de una sola línea.',
          },
        }}
      >
        <p>Construye un sistema de logging con niveles, inspirado en el módulo estándar.</p>
      </Exercise>

      <Exercise
        number="6.5"
        title="Mini framework de comandos"
        difficulty="difícil"
        runner={{
          initial: `# Crea un sistema tipo CLI donde puedes registrar comandos
# con un decorador y luego ejecutarlos por nombre.
#
# La clase Aplicacion debe tener:
#   @app.comando(nombre, descripcion)  → decorador que registra una función
#   app.ejecutar(linea)                → parsea "nombre arg1 arg2" y llama la función
#   app.ayuda()                        → muestra todos los comandos disponibles
#
# Prueba registrando al menos 3 comandos: saludar, sumar, eco

import functools

`,
          hint: 'El decorador comando(nombre, desc) devuelve un decorador que guarda func en self._comandos[nombre]. ejecutar(linea) hace partes = linea.split(), nombre = partes[0], args = partes[1:], y llama self._comandos[nombre](*args). Maneja CommandoNoEncontrado con una excepción propia.',
          solution: {
            code: `import functools

class ComandoNoEncontradoError(Exception):
    pass

class Aplicacion:
    def __init__(self, nombre):
        self.nombre      = nombre
        self._comandos   = {}

    def comando(self, nombre, descripcion=""):
        def decorador(func):
            @functools.wraps(func)
            def wrapper(*args, **kwargs):
                return func(*args, **kwargs)
            self._comandos[nombre] = {
                "func": wrapper,
                "desc": descripcion,
                "args": func.__code__.co_varnames[:func.__code__.co_argcount],
            }
            return wrapper
        return decorador

    def ejecutar(self, linea):
        partes  = linea.strip().split()
        if not partes:
            return
        nombre  = partes[0]
        args    = partes[1:]
        if nombre not in self._comandos:
            raise ComandoNoEncontradoError(f"Comando '{nombre}' no encontrado. Usa 'ayuda'.")
        return self._comandos[nombre]["func"](*args)

    def ayuda(self):
        print(f"\\n{self.nombre} — comandos disponibles:")
        for nombre, info in self._comandos.items():
            print(f"  {nombre:<15} {info['desc']}")
        print()


# Definir la aplicación
app = Aplicacion("MiCLI v1.0")

@app.comando("saludar", "Saluda a una persona: saludar <nombre>")
def saludar(nombre="mundo"):
    print(f"¡Hola, {nombre}!")

@app.comando("sumar", "Suma dos números: sumar <a> <b>")
def sumar(a, b):
    try:
        print(f"Resultado: {float(a) + float(b)}")
    except ValueError:
        print("Error: los argumentos deben ser números.")

@app.comando("eco", "Repite el mensaje: eco <texto...>")
def eco(*palabras):
    print("Eco:", " ".join(palabras))

@app.comando("mayusculas", "Convierte texto a mayúsculas")
def mayusculas(*palabras):
    print(" ".join(palabras).upper())

# Usar la aplicación
app.ayuda()

comandos = [
    "saludar Leoncio",
    "sumar 42 58",
    "eco hola mundo desde Python",
    "mayusculas bkln software systems",
    "desconocido arg",
]

for cmd in comandos:
    print(f"> {cmd}")
    try:
        app.ejecutar(cmd)
    except ComandoNoEncontradoError as e:
        print(f"  ✗ {e}")
    print()`,
            explanation: 'Este patrón de registro con decoradores es exactamente cómo funcionan frameworks como Flask (@app.route) o Click (@click.command). El decorador guarda la función en un diccionario interno; ejecutar() la busca y llama. functools.wraps preserva el nombre y docstring de la función original.',
          },
        }}
      >
        <p>Un mini-framework CLI con registro de comandos mediante decoradores.</p>
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
          <li><code>import módulo</code> importa el módulo completo. <code>from módulo import nombre</code> importa algo específico.</li>
          <li>Usa <code>as</code> para crear alias: <code>import numpy as np</code>.</li>
          <li>Evita <code>from módulo import *</code> — contamina el namespace y dificulta la lectura.</li>
          <li>Python incluye más de 200 módulos estándar: <code>math</code>, <code>random</code>, <code>datetime</code>, <code>collections</code>, <code>re</code>, <code>os</code>, <code>sys</code>…</li>
          <li>Cualquier archivo <code>.py</code> es un módulo importable.</li>
          <li>Usa <code>if __name__ == "__main__":</code> para código que solo se ejecuta directamente.</li>
          <li>Un <strong>paquete</strong> es una carpeta con <code>__init__.py</code> que agrupa módulos relacionados.</li>
          <li><strong>pip</strong> instala paquetes de PyPI: <code>pip install nombre</code>.</li>
          <li>Usa siempre un <strong>entorno virtual</strong> (<code>python -m venv venv</code>) por proyecto.</li>
          <li>Guarda las dependencias con <code>pip freeze &gt; requirements.txt</code> y <strong>nunca</strong> subas la carpeta <code>venv</code> a Git.</li>
        </ul>
      </div>

      <PullQuote>
        No reinventes la rueda — Python tiene módulos para casi todo.
        El programador eficiente sabe qué existe en la biblioteca estándar
        antes de escribir una sola línea.
      </PullQuote>

      <ChapterNav
        prev={{ id: 'l2-m5', title: 'Archivos y datos' }}
        next={{ id: 'l2-m7', title: 'Comprensiones e iteradores' }}
        onNav={onNav}
      />
    </article>
  );
}

const modThStyle = {
  padding: '10px 14px',
  fontFamily: 'var(--font-mono)',
  fontSize: '0.7rem',
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: 'var(--ink-3)',
  fontWeight: 500,
};

function ModRow({ m, d, last }) {
  const cell = {
    padding: '9px 14px',
    borderTop: last ? '0' : '1px solid var(--border-soft)',
    verticalAlign: 'top',
  };
  return (
    <tr>
      <td style={{ ...cell, fontFamily: 'var(--font-mono)', color: 'var(--accent)', fontWeight: 600, whiteSpace: 'nowrap' }}>{m}</td>
      <td style={{ ...cell, color: 'var(--ink-2)' }}>{d}</td>
    </tr>
  );
}

function VenvCard({ label, color, items }) {
  return (
    <div style={{
      background: 'var(--paper-2)',
      border: '1px solid var(--border-soft)',
      borderRadius: 'var(--r-md)',
      padding: 'var(--s-4) var(--s-5)',
    }}>
      <div style={{
        fontFamily: 'var(--font-display)',
        fontSize: '1.2rem',
        fontWeight: 600,
        color,
        marginBottom: 'var(--s-3)',
      }}>{label}</div>
      <ul style={{ margin: 0, paddingLeft: '1.2em', fontSize: '0.88rem', color: 'var(--ink-2)', lineHeight: 1.8 }}>
        {items.map((item, i) => <li key={i}>{item}</li>)}
      </ul>
    </div>
  );
}

window.ChapterL2M6 = ChapterL2M6;
