// =============================================================
// chapter-l2-m5.jsx — Libro 2, Módulo 5: Archivos y datos
// =============================================================

function ChapterL2M5({ onNav }) {
  return (
    <article className="reader-inner">
      <ChapterHeader
        book="// libro 2 · programando con estructura"
        module="módulo 05"
        time="≈ 60 min"
        title={<>Archivos <em>y datos</em></>}
        dek="Hasta ahora tus programas olvidan todo al cerrarse. Aprenderás a leer y escribir archivos, trabajar con CSV y JSON, y hacer que tus datos sobrevivan entre ejecuciones."
      />

      <p>
        Un programa que no puede guardar ni leer datos es como un cuaderno sin páginas.
        Casi toda aplicación real necesita leer una configuración, guardar resultados,
        importar una lista de usuarios o exportar un informe. En Python, todo eso se hace
        con pocas herramientas bien diseñadas.
      </p>

      <h2>Abrir archivos: open()</h2>

      <p>
        La función <code>open()</code> es la puerta de entrada a cualquier archivo.
        Devuelve un <strong>objeto de archivo</strong> con el que puedes leer o escribir:
      </p>

      <CodeBlock code={`archivo = open("notas.txt", "r")   # abre para leer
contenido = archivo.read()
archivo.close()                    # ¡siempre hay que cerrar!
print(contenido)`} />

      <p>
        El segundo parámetro es el <strong>modo</strong>. Los más usados:
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
              <th style={fileThStyle}>Modo</th>
              <th style={fileThStyle}>Significado</th>
              <th style={fileThStyle}>Si el archivo no existe</th>
            </tr>
          </thead>
          <tbody>
            <FileRow m='"r"' d="Leer (por defecto)" e="Lanza FileNotFoundError" />
            <FileRow m='"w"' d="Escribir (borra el contenido anterior)" e="Lo crea" />
            <FileRow m='"a"' d="Añadir al final (append)" e="Lo crea" />
            <FileRow m='"x"' d="Crear nuevo (falla si ya existe)" e="Lo crea" />
            <FileRow m='"r+"' d="Leer y escribir" e="Lanza FileNotFoundError" />
            <FileRow m='"rb" / "wb"' d="Leer/escribir en modo binario" e="Según el modo" last />
          </tbody>
        </table>
      </div>

      <h2>with — la forma correcta de abrir archivos</h2>

      <p>
        El gestor de contexto <code>with</code> cierra el archivo automáticamente
        al salir del bloque, incluso si ocurre un error. Es la forma recomendada
        siempre:
      </p>

      <CodeBlock code={`# Forma antigua — arriesgada si hay un error antes de close()
archivo = open("notas.txt", "r")
contenido = archivo.read()
archivo.close()

# Forma correcta — with lo cierra solo
with open("notas.txt", "r", encoding="utf-8") as archivo:
    contenido = archivo.read()
# Aquí el archivo ya está cerrado automáticamente
print(contenido)`} />

      <Callout kind="tip" title="Especifica siempre el encoding">
        Sin <code>encoding="utf-8"</code>, Python usa el encoding por defecto del sistema
        operativo — que en Windows suele ser <em>cp1252</em> y puede romper tildes y caracteres
        especiales. Ponlo siempre: <code>open(ruta, "r", encoding="utf-8")</code>.
      </Callout>

      <h2>Leer archivos</h2>

      <p>Hay tres formas de leer el contenido de un archivo:</p>

      <CodeBlock code={`with open("poema.txt", "r", encoding="utf-8") as f:

    # 1. Todo de golpe como un string
    todo = f.read()

with open("poema.txt", "r", encoding="utf-8") as f:
    # 2. Como lista de líneas (cada línea incluye el \\n)
    lineas = f.readlines()

with open("poema.txt", "r", encoding="utf-8") as f:
    # 3. Línea a línea con un bucle (eficiente para archivos grandes)
    for linea in f:
        print(linea.strip())   # strip() elimina el \\n del final`} />

      <p>
        Para archivos grandes, iterar con <code>for linea in f</code> es mucho más eficiente
        que <code>readlines()</code> porque no carga todo en memoria a la vez.
      </p>

      <h2>Escribir archivos</h2>

      <CodeBlock code={`# Crear / sobreescribir
with open("salida.txt", "w", encoding="utf-8") as f:
    f.write("Primera línea\\n")
    f.write("Segunda línea\\n")

# Añadir al final sin borrar lo anterior
with open("salida.txt", "a", encoding="utf-8") as f:
    f.write("Tercera línea (añadida)\\n")

# Escribir varias líneas de golpe
lineas = ["uno\\n", "dos\\n", "tres\\n"]
with open("numeros.txt", "w", encoding="utf-8") as f:
    f.writelines(lineas)    # no añade \\n automáticamente — tú debes incluirlo`} />

      <Callout kind="warn" title='Modo "w" borra sin avisar'>
        <code>open("archivo.txt", "w")</code> borra todo el contenido existente en el acto,
        antes de que escribas nada. Si necesitas añadir al final de un archivo que ya
        tiene datos, usa <code>"a"</code> (append).
      </Callout>

      <Quiz
        question='¿Qué modo debes usar para añadir nuevas líneas al final de un archivo existente sin borrar su contenido?'
        options={['"w"', '"r+"', '"a"', '"x"']}
        correct={2}
        explanation='"a" (append) posiciona el cursor al final del archivo y nunca borra el contenido existente. "w" borra todo. "r+" permite leer y escribir pero no añade al final automáticamente. "x" falla si el archivo ya existe.'
      />

      <h2>Rutas con pathlib</h2>

      <p>
        El módulo <code>pathlib</code> hace que trabajar con rutas de archivos sea
        elegante y portable entre Windows, Mac y Linux:
      </p>

      <CodeBlock code={`from pathlib import Path

# Crear rutas sin preocuparte por / o \\
ruta = Path("datos") / "usuarios" / "lista.txt"
print(ruta)          # datos/usuarios/lista.txt  (o con \\ en Windows)

# Información sobre la ruta
print(ruta.name)         # lista.txt
print(ruta.stem)         # lista
print(ruta.suffix)       # .txt
print(ruta.parent)       # datos/usuarios

# Operaciones útiles
print(ruta.exists())     # True/False
print(ruta.is_file())    # True/False
print(ruta.is_dir())     # True/False

# Crear directorio (y los padres si no existen)
Path("mis_datos/subdir").mkdir(parents=True, exist_ok=True)

# Listar archivos de un directorio
carpeta = Path(".")
for archivo in carpeta.glob("*.txt"):
    print(archivo)

# Leer y escribir directamente desde Path
ruta = Path("notas.txt")
ruta.write_text("Hola desde pathlib\\n", encoding="utf-8")
contenido = ruta.read_text(encoding="utf-8")
print(contenido)`} />

      <Callout kind="info" title="pathlib reemplaza a os.path">
        Si ves código antiguo con <code>import os</code> y <code>os.path.join(...)</code>,
        <code>os.path.exists(...)</code> etc., ese es el estilo anterior. <code>pathlib</code>
        (disponible desde Python 3.4) es la alternativa moderna y más legible.
      </Callout>

      <h2>CSV — datos en tablas</h2>

      <p>
        CSV (<em>Comma-Separated Values</em>) es el formato más universal para intercambiar
        datos tabulares — Excel, bases de datos y casi toda herramienta puede leer y escribir CSV.
        Python tiene el módulo <code>csv</code> incluido:
      </p>

      <CodeBlock code={`import csv

# LEER un CSV
with open("empleados.csv", "r", encoding="utf-8", newline="") as f:
    lector = csv.DictReader(f)    # cada fila es un diccionario
    for fila in lector:
        print(fila["nombre"], "-", fila["departamento"])

# empleados.csv contiene:
# nombre,departamento,sueldo
# Ana García,Ingeniería,3200
# Luis Pérez,Marketing,2800`} />

      <CodeBlock code={`import csv

# ESCRIBIR un CSV
empleados = [
    {"nombre": "Ana García",  "departamento": "Ingeniería", "sueldo": 3200},
    {"nombre": "Luis Pérez",  "departamento": "Marketing",  "sueldo": 2800},
    {"nombre": "Sofía Ruiz",  "departamento": "Diseño",     "sueldo": 2600},
]

with open("empleados.csv", "w", encoding="utf-8", newline="") as f:
    campos = ["nombre", "departamento", "sueldo"]
    escritor = csv.DictWriter(f, fieldnames=campos)
    escritor.writeheader()       # escribe la línea de encabezados
    escritor.writerows(empleados)

print("CSV guardado.")`} />

      <Callout kind="tip" title='newline="" es obligatorio en Windows'>
        Al abrir un CSV en Windows, siempre usa <code>newline=""</code> para evitar que
        se dupliquen los saltos de línea. Es un detalle pequeño que causa confusión cuando
        se omite.
      </Callout>

      <h2>JSON — datos estructurados</h2>

      <p>
        JSON (<em>JavaScript Object Notation</em>) es el formato estándar para APIs web
        y configuración. En Python, los diccionarios y listas se convierten a JSON y
        viceversa de forma natural:
      </p>

      <CodeBlock code={`import json

# Python → JSON (serializar)
datos = {
    "nombre": "BKLN Software",
    "version": 2,
    "activo": True,
    "servicios": ["web", "android", "IA"],
    "contacto": {"email": "info@bkln.tech", "pais": "España"}
}

# Guardar en archivo
with open("config.json", "w", encoding="utf-8") as f:
    json.dump(datos, f, indent=2, ensure_ascii=False)

# JSON → Python (deserializar)
with open("config.json", "r", encoding="utf-8") as f:
    config = json.load(f)

print(config["nombre"])          # BKLN Software
print(config["servicios"][1])    # android
print(config["contacto"]["pais"]) # España`} />

      <p>
        También puedes convertir entre JSON y strings (útil para APIs):
      </p>

      <CodeBlock code={`import json

# Dict → string JSON
datos = {"ciudad": "Madrid", "temperatura": 22.5}
texto_json = json.dumps(datos, indent=2)
print(texto_json)
# {
#   "ciudad": "Madrid",
#   "temperatura": 22.5
# }

# String JSON → dict
recibido = '{"usuario": "ana", "activo": true}'
obj = json.loads(recibido)
print(obj["usuario"])    # ana
print(type(obj))         # <class 'dict'>`} />

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 'var(--s-4)',
        margin: 'var(--s-5) 0',
      }} className="fmt-grid">
        <FormatCard
          label="CSV"
          color="var(--accent)"
          cuando="Datos tabulares (hojas de cálculo, bases de datos, reportes)"
          ventaja="Universal, abre en Excel, ligero"
          limite="Sin tipos de datos — todo es texto"
        />
        <FormatCard
          label="JSON"
          color="var(--highlight)"
          cuando="APIs web, configuración, datos anidados"
          ventaja="Tipos nativos (bool, número, null), anidamiento"
          limite="Más verboso que CSV para tablas planas"
        />
        <style>{`@media (max-width: 720px) { .fmt-grid { grid-template-columns: 1fr !important; } }`}</style>
      </div>

      <h2>Ejemplo completo: agenda de contactos</h2>

      <p>
        Una agenda que guarda contactos en JSON, permite añadir, buscar y exportar a CSV.
      </p>

      <PyRunner
        initial={`import json
import csv
import io   # usamos StringIO para simular archivos en memoria

class Agenda:
    def __init__(self):
        self._contactos = {}

    def añadir(self, nombre, email, telefono=""):
        if not nombre or not email:
            raise ValueError("Nombre y email son obligatorios.")
        self._contactos[email] = {
            "nombre": nombre,
            "email": email,
            "telefono": telefono,
        }
        print(f"✓ Añadido: {nombre}")

    def buscar(self, termino):
        termino = termino.lower()
        return [
            c for c in self._contactos.values()
            if termino in c["nombre"].lower() or termino in c["email"].lower()
        ]

    def eliminar(self, email):
        if email in self._contactos:
            nombre = self._contactos.pop(email)["nombre"]
            print(f"✗ Eliminado: {nombre}")
        else:
            raise KeyError(f"No existe contacto con email: {email}")

    def a_json(self):
        return json.dumps(list(self._contactos.values()), indent=2, ensure_ascii=False)

    def a_csv(self):
        salida = io.StringIO()
        campos = ["nombre", "email", "telefono"]
        writer = csv.DictWriter(salida, fieldnames=campos)
        writer.writeheader()
        writer.writerows(self._contactos.values())
        return salida.getvalue()

    def __len__(self):
        return len(self._contactos)

    def __str__(self):
        if not self._contactos:
            return "Agenda vacía."
        lineas = []
        for c in self._contactos.values():
            tel = f" · {c['telefono']}" if c['telefono'] else ""
            lineas.append(f"  {c['nombre']} <{c['email']}>{tel}")
        return "\\n".join(lineas)


# Uso
agenda = Agenda()
agenda.añadir("Ana García",   "ana@ejemplo.com",  "+34 600 111 222")
agenda.añadir("Luis Pérez",   "luis@ejemplo.com", "+34 611 333 444")
agenda.añadir("Sofía Ruiz",   "sofia@bkln.tech")
agenda.añadir("Carlos López", "carlos@ejemplo.com", "+34 622 555 666")

print(f"\\nAgenda ({len(agenda)} contactos):")
print(agenda)

print("\\n— Buscar 'ejemplo' —")
for c in agenda.buscar("ejemplo"):
    print(f"  {c['nombre']}")

print("\\n— Exportar JSON —")
print(agenda.a_json())

print("\\n— Exportar CSV —")
print(agenda.a_csv())`}
      />

      <h2>Ejercicios</h2>

      <p style={{ color: 'var(--ink-2)' }}>
        Cinco ejercicios de dificultad creciente — desde leer un archivo simple
        hasta procesar y transformar datos entre formatos.
      </p>

      <Exercise
        number="5.1"
        title="Contador de palabras"
        difficulty="fácil"
        runner={{
          initial: `# Simula leer el siguiente texto como si fuera un archivo
# y cuenta cuántas veces aparece cada palabra.
# Muestra las 5 más frecuentes.
#
# Pista: usa un diccionario o collections.Counter

texto = """
Python es un lenguaje de programación. Python es fácil de aprender.
Aprender Python es útil para el desarrollo web y la ciencia de datos.
La ciencia de datos usa Python extensamente.
"""

# Tu código aquí — simula leer línea a línea con splitlines()
`,
          hint: 'Haz texto.lower() para igualar mayúsculas. Usa split() para obtener palabras. Elimina puntuación con str.strip(".,!?"). Un Counter(palabras) te da el conteo directo. .most_common(5) devuelve las 5 más frecuentes.',
          solution: {
            code: `from collections import Counter
import string

texto = """
Python es un lenguaje de programación. Python es fácil de aprender.
Aprender Python es útil para el desarrollo web y la ciencia de datos.
La ciencia de datos usa Python extensamente.
"""

palabras = []
for linea in texto.splitlines():
    for palabra in linea.split():
        limpia = palabra.strip(string.punctuation).lower()
        if limpia:
            palabras.append(limpia)

conteo = Counter(palabras)

print(f"Total de palabras: {len(palabras)}")
print(f"Palabras únicas: {len(conteo)}")
print("\\nTop 5 más frecuentes:")
for palabra, n in conteo.most_common(5):
    print(f"  {palabra:<15} {n} vez/veces")`,
            explanation: 'collections.Counter es una subclase de dict optimizada para contar. most_common(n) devuelve los n elementos más frecuentes ordenados. Limpiar la puntuación con strip(string.punctuation) evita que "datos." y "datos" cuenten como palabras distintas.',
          },
        }}
      >
        <p>Analiza la frecuencia de palabras en un texto como si viniese de un archivo.</p>
      </Exercise>

      <Exercise
        number="5.2"
        title="Diario personal"
        difficulty="fácil"
        runner={{
          initial: `# Crea un sistema de diario que guarde entradas en una lista
# y las exporte a formato texto y JSON.
# (Simulamos los archivos con variables de string)
#
# La clase Diario debe tener:
#   - añadir_entrada(texto) → guarda con fecha actual
#   - exportar_texto()      → devuelve string con todas las entradas
#   - exportar_json()       → devuelve string JSON
#   - __len__               → número de entradas

from datetime import datetime
import json

`,
          hint: 'Guarda cada entrada como {"fecha": str(datetime.now().date()), "texto": texto}. exportar_texto une las entradas con "\\n---\\n". exportar_json usa json.dumps(self._entradas, indent=2, ensure_ascii=False).',
          solution: {
            code: `from datetime import datetime
import json

class Diario:
    def __init__(self, autor):
        self.autor     = autor
        self._entradas = []

    def añadir_entrada(self, texto):
        entrada = {
            "fecha": str(datetime.now().date()),
            "hora":  datetime.now().strftime("%H:%M"),
            "texto": texto.strip(),
        }
        self._entradas.append(entrada)
        print(f"Entrada guardada ({entrada['fecha']})")

    def exportar_texto(self):
        if not self._entradas:
            return "Diario vacío."
        lineas = [f"Diario de {self.autor}\\n{'='*30}"]
        for e in self._entradas:
            lineas.append(f"\\n[{e['fecha']} {e['hora']}]")
            lineas.append(e['texto'])
            lineas.append("---")
        return "\\n".join(lineas)

    def exportar_json(self):
        datos = {"autor": self.autor, "entradas": self._entradas}
        return json.dumps(datos, indent=2, ensure_ascii=False)

    def __len__(self):
        return len(self._entradas)


diario = Diario("Leoncio")
diario.añadir_entrada("Hoy empecé a aprender manejo de archivos en Python.")
diario.añadir_entrada("Los archivos CSV son muy útiles para exportar datos.")
diario.añadir_entrada("JSON es perfecto para guardar configuración.")

print(f"\\nEntradas: {len(diario)}")
print()
print(diario.exportar_texto())
print()
print(diario.exportar_json())`,
            explanation: 'Este ejercicio combina POO con serialización de datos. datetime.now().date() da la fecha de hoy. json.dumps con ensure_ascii=False preserva tildes y caracteres especiales en el JSON.',
          },
        }}
      >
        <p>Un diario personal que puede exportar sus entradas a texto plano y JSON.</p>
      </Exercise>

      <Exercise
        number="5.3"
        title="Procesador de CSV"
        difficulty="media"
        runner={{
          initial: `# Tienes datos de ventas en formato CSV (como string).
# Procésalos para calcular:
#   - Total de ventas por vendedor
#   - Producto más vendido
#   - Mes con más ingresos
#
# Usa csv.DictReader con io.StringIO para leer el string como si fuera un archivo.

import csv
import io
from collections import defaultdict

csv_data = """vendedor,producto,cantidad,precio,mes
Ana,Laptop,2,1200,Enero
Luis,Ratón,10,25,Enero
Ana,Monitor,3,350,Febrero
Sofía,Laptop,1,1200,Febrero
Luis,Teclado,5,60,Marzo
Ana,Ratón,8,25,Marzo
Sofía,Monitor,2,350,Marzo
Luis,Laptop,1,1200,Enero"""

# Tu código aquí
`,
          hint: 'Usa csv.DictReader(io.StringIO(csv_data)). Para cada fila, fila["vendedor"], float(fila["precio"]) * int(fila["cantidad"]) da el ingreso. Usa defaultdict(float) para acumular por vendedor, producto y mes.',
          solution: {
            code: `import csv
import io
from collections import defaultdict

csv_data = """vendedor,producto,cantidad,precio,mes
Ana,Laptop,2,1200,Enero
Luis,Ratón,10,25,Enero
Ana,Monitor,3,350,Febrero
Sofía,Laptop,1,1200,Febrero
Luis,Teclado,5,60,Marzo
Ana,Ratón,8,25,Marzo
Sofía,Monitor,2,350,Marzo
Luis,Laptop,1,1200,Enero"""

ventas_vendedor  = defaultdict(float)
unidades_producto = defaultdict(int)
ingresos_mes     = defaultdict(float)

reader = csv.DictReader(io.StringIO(csv_data))
for fila in reader:
    ingreso   = int(fila["cantidad"]) * float(fila["precio"])
    vendedor  = fila["vendedor"]
    producto  = fila["producto"]
    mes       = fila["mes"]

    ventas_vendedor[vendedor]    += ingreso
    unidades_producto[producto]  += int(fila["cantidad"])
    ingresos_mes[mes]            += ingreso

print("=== Ventas por vendedor ===")
for vendedor, total in sorted(ventas_vendedor.items(), key=lambda x: -x[1]):
    print(f"  {vendedor:<8} {total:>8.2f} €")

mejor_producto = max(unidades_producto, key=unidades_producto.get)
print(f"\\nProducto más vendido: {mejor_producto} ({unidades_producto[mejor_producto]} unidades)")

mejor_mes = max(ingresos_mes, key=ingresos_mes.get)
print(f"Mejor mes: {mejor_mes} ({ingresos_mes[mejor_mes]:.2f} €)")`,
            explanation: 'io.StringIO convierte un string en un objeto de archivo — muy útil para probar código que normalmente trabajaría con archivos reales. defaultdict(float) inicializa automáticamente a 0.0 cualquier clave nueva, evitando el patrón if key not in d: d[key] = 0.',
          },
        }}
      >
        <p>Analiza datos de ventas desde un CSV para extraer estadísticas clave.</p>
      </Exercise>

      <Exercise
        number="5.4"
        title="Configuración JSON"
        difficulty="media"
        runner={{
          initial: `# Crea una clase "Configuracion" que:
#   - Cargue ajustes desde un string JSON (simula leer un archivo)
#   - Permita leer y escribir valores con config.get(clave, defecto)
#     y config.set(clave, valor)
#   - Soporte claves anidadas con punto: config.get("db.host")
#   - Exporte el estado actual a JSON
#   - Lance ValueError si intentas set() con una clave vacía

import json

json_inicial = """
{
  "app": {"nombre": "MiApp", "version": "1.0", "debug": false},
  "db":  {"host": "localhost", "puerto": 5432, "nombre": "produccion"},
  "email": {"smtp": "smtp.gmail.com", "puerto": 587}
}
"""
`,
          hint: 'Para claves anidadas con punto: descompón "db.host" en partes = clave.split("."). Navega el dict con un bucle: nodo = self._datos; for parte in partes[:-1]: nodo = nodo[parte]. Luego nodo[partes[-1]] es el valor.',
          solution: {
            code: `import json

class Configuracion:
    def __init__(self, json_texto):
        self._datos = json.loads(json_texto)

    def _navegar(self, clave):
        partes = clave.split(".")
        nodo = self._datos
        for parte in partes[:-1]:
            if parte not in nodo or not isinstance(nodo[parte], dict):
                return None, None
            nodo = nodo[parte]
        return nodo, partes[-1]

    def get(self, clave, defecto=None):
        nodo, ultima = self._navegar(clave)
        if nodo is None:
            return defecto
        return nodo.get(ultima, defecto)

    def set(self, clave, valor):
        if not clave or not clave.strip():
            raise ValueError("La clave no puede estar vacía.")
        nodo, ultima = self._navegar(clave)
        if nodo is None:
            raise KeyError(f"Ruta inválida: {clave}")
        nodo[ultima] = valor

    def exportar(self):
        return json.dumps(self._datos, indent=2, ensure_ascii=False)

    def __repr__(self):
        return f"Configuracion({list(self._datos.keys())})"


json_inicial = """
{
  "app": {"nombre": "MiApp", "version": "1.0", "debug": false},
  "db":  {"host": "localhost", "puerto": 5432, "nombre": "produccion"},
  "email": {"smtp": "smtp.gmail.com", "puerto": 587}
}
"""

config = Configuracion(json_inicial)

print(config.get("app.nombre"))          # MiApp
print(config.get("db.host"))             # localhost
print(config.get("db.timeout", 30))      # 30 (defecto)

config.set("app.debug", True)
config.set("db.host", "db.produccion.com")

print("\\nConfiguración actualizada:")
print(config.exportar())`,
            explanation: 'Las claves con punto (db.host) son un patrón común en configuración. La clave es navegar el diccionario parte a parte hasta llegar al penúltimo nivel, y luego leer o escribir la última clave. Este patrón aparece en librerías populares como python-dotenv y dynaconf.',
          },
        }}
      >
        <p>Un gestor de configuración que soporta claves anidadas con notación de punto.</p>
      </Exercise>

      <Exercise
        number="5.5"
        title="Conversor de formatos"
        difficulty="difícil"
        runner={{
          initial: `# Crea un conversor que transforme datos entre CSV y JSON.
#
# Funciones a implementar:
#   csv_a_json(csv_texto, indent=2) → string JSON
#   json_a_csv(json_texto)          → string CSV
#
# El JSON de entrada es una lista de objetos (dicts).
# El CSV de salida usa las claves del primer objeto como cabeceras.
#
# Además, crea una función:
#   normalizar_tipos(datos)
#       → convierte strings "true"/"false" a bool,
#         strings numéricos a int o float,
#         y deja el resto como string.

import csv, json, io
`,
          hint: 'csv_a_json: lee con DictReader, aplica normalizar_tipos a cada fila, convierte a json.dumps. json_a_csv: carga con json.loads, obtén campos con list(datos[0].keys()), escribe con DictWriter en un StringIO.',
          solution: {
            code: `import csv, json, io

def normalizar_tipos(fila):
    resultado = {}
    for clave, valor in fila.items():
        v = valor.strip()
        if v.lower() == "true":
            resultado[clave] = True
        elif v.lower() == "false":
            resultado[clave] = False
        else:
            try:
                resultado[clave] = int(v)
            except ValueError:
                try:
                    resultado[clave] = float(v)
                except ValueError:
                    resultado[clave] = v
    return resultado

def csv_a_json(csv_texto, indent=2):
    reader = csv.DictReader(io.StringIO(csv_texto))
    datos = [normalizar_tipos(dict(fila)) for fila in reader]
    return json.dumps(datos, indent=indent, ensure_ascii=False)

def json_a_csv(json_texto):
    datos = json.loads(json_texto)
    if not datos:
        return ""
    salida  = io.StringIO()
    campos  = list(datos[0].keys())
    writer  = csv.DictWriter(salida, fieldnames=campos, extrasaction="ignore")
    writer.writeheader()
    writer.writerows(datos)
    return salida.getvalue()


# Prueba CSV → JSON
csv_entrada = """nombre,edad,activo,sueldo
Ana García,28,true,3200.50
Luis Pérez,35,false,2800.00
Sofía Ruiz,24,true,2600.75"""

print("=== CSV → JSON ===")
resultado_json = csv_a_json(csv_entrada)
print(resultado_json)

# Prueba JSON → CSV
json_entrada = '[{"ciudad":"Madrid","pais":"España","pob":3300000},{"ciudad":"Barcelona","pais":"España","pob":1620000}]'
print("\\n=== JSON → CSV ===")
print(json_a_csv(json_entrada))`,
            explanation: 'normalizar_tipos convierte el CSV (donde todo es string) en datos con tipos correctos. El orden try int → float → string es importante: "42" es int, "3.14" es float, "hola" es string. csv.DictWriter con extrasaction="ignore" descarta claves extra del JSON que no están en los campos definidos.',
          },
        }}
      >
        <p>Convierte datos entre CSV y JSON, con detección automática de tipos.</p>
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
          <li><code>open(ruta, modo, encoding="utf-8")</code> abre un archivo. Especifica siempre el encoding.</li>
          <li>Usa siempre <code>with open(...) as f:</code> — cierra el archivo automáticamente.</li>
          <li>Modos: <code>"r"</code> leer · <code>"w"</code> escribir (borra) · <code>"a"</code> añadir · <code>"x"</code> crear nuevo.</li>
          <li><code>f.read()</code> todo · <code>f.readlines()</code> lista de líneas · <code>for linea in f</code> eficiente para archivos grandes.</li>
          <li><code>pathlib.Path</code> es la forma moderna de trabajar con rutas. Reemplaza a <code>os.path</code>.</li>
          <li><strong>CSV</strong>: usa el módulo <code>csv</code> con <code>DictReader</code> / <code>DictWriter</code> y <code>newline=""</code>.</li>
          <li><strong>JSON</strong>: <code>json.load(f)</code> lee un archivo · <code>json.dump(datos, f)</code> escribe · <code>json.loads/dumps</code> para strings.</li>
          <li>Usa <code>indent=2, ensure_ascii=False</code> en JSON para legibilidad y soporte de tildes.</li>
          <li><code>io.StringIO</code> simula un archivo en memoria — perfecto para tests y procesamiento intermedio.</li>
        </ul>
      </div>

      <PullQuote>
        Los archivos son la memoria de tu programa entre ejecuciones.
        Dominar CSV y JSON te abre la puerta a trabajar con datos del mundo real —
        desde APIs hasta hojas de cálculo de tu empresa.
      </PullQuote>

      <ChapterNav
        prev={{ id: 'l2-m4', title: 'Manejo de errores' }}
        next={{ id: 'l2-m6', title: 'Módulos y paquetes' }}
        onNav={onNav}
      />
    </article>
  );
}

const fileThStyle = {
  padding: '10px 14px',
  fontFamily: 'var(--font-mono)',
  fontSize: '0.7rem',
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: 'var(--ink-3)',
  fontWeight: 500,
};

function FileRow({ m, d, e, last }) {
  const cell = {
    padding: '9px 14px',
    borderTop: last ? '0' : '1px solid var(--border-soft)',
    verticalAlign: 'top',
  };
  return (
    <tr>
      <td style={{ ...cell, fontFamily: 'var(--font-mono)', color: 'var(--accent)', fontWeight: 600, whiteSpace: 'nowrap' }}>{m}</td>
      <td style={cell}>{d}</td>
      <td style={{ ...cell, color: 'var(--ink-2)', fontSize: '0.88rem' }}>{e}</td>
    </tr>
  );
}

function FormatCard({ label, color, cuando, ventaja, limite }) {
  return (
    <div style={{
      background: 'var(--paper-2)',
      border: '1px solid var(--border-soft)',
      borderRadius: 'var(--r-md)',
      padding: 'var(--s-4) var(--s-5)',
    }}>
      <div style={{
        fontFamily: 'var(--font-display)',
        fontSize: '1.4rem',
        fontWeight: 600,
        color,
        marginBottom: 'var(--s-3)',
      }}>{label}</div>
      <div style={{ fontSize: '0.88rem', color: 'var(--ink-2)', lineHeight: 1.7 }}>
        <div><strong style={{ color: 'var(--ink)' }}>Úsalo para:</strong> {cuando}</div>
        <div><strong style={{ color: 'var(--ink)' }}>Ventaja:</strong> {ventaja}</div>
        <div><strong style={{ color: 'var(--ink)' }}>Límite:</strong> {limite}</div>
      </div>
    </div>
  );
}

window.ChapterL2M5 = ChapterL2M5;
