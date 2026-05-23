// =============================================================
// chapter-l3-m1.jsx — Libro 3, Módulo 1: Python y la web
// =============================================================

function ChapterL3M1({ onNav }) {
  const flat = flatTOC();
  const idx  = flat.findIndex(c => c.id === 'l3-m1');
  const prev = idx > 0 ? flat[idx - 1] : null;
  const next = idx < flat.length - 1 ? flat[idx + 1] : null;

  return (
    <article className="reader-inner">
      <ChapterHeader
        book="// libro 3 · del código al mundo real"
        module="módulo 01"
        time="≈ 60 min"
        title={<>Python y la web</>}
        dek="La web es el ecosistema más grande del mundo. En este módulo aprendes a hablar su idioma: HTTP, URLs, APIs REST y scraping básico — todo desde Python."
      />

      <p>
        Casi todo lo interesante en programación hoy pasa por la web: consumir
        datos de una API, automatizar formularios, descargar archivos, publicar
        resultados. Python tiene herramientas excelentes para todo esto, tanto
        en su librería estándar como en paquetes externos.
      </p>

      <p>
        Este módulo te enseña a ser un <strong>cliente web desde Python</strong>:
        entender cómo funciona HTTP, construir y analizar URLs, hacer peticiones
        GET y POST, y procesar las respuestas en JSON o HTML.
      </p>

      <Callout kind="info" title="Qué puedes ejecutar aquí">
        Los bloques con ▶ Ejecutar corren en el navegador. Las peticiones HTTP
        reales (<code>requests</code>, <code>urllib.request</code>) necesitan
        tu Python local — te lo indicamos con una etiqueta <strong>▸ local</strong>.
      </Callout>

      {/* ── Sección 1: HTTP ── */}
      <h2>Cómo funciona HTTP</h2>

      <p>
        HTTP (HyperText Transfer Protocol) es el protocolo que usan navegadores
        y programas para comunicarse con servidores. La conversación siempre
        sigue el mismo patrón: el cliente hace una <strong>petición</strong>,
        el servidor devuelve una <strong>respuesta</strong>.
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 'var(--s-4)',
        margin: 'var(--s-5) 0',
      }}>
        {[
          { method: 'GET',    color: '#2E7D32', desc: 'Pedir un recurso. No modifica nada.' },
          { method: 'POST',   color: '#1565C0', desc: 'Enviar datos nuevos al servidor.' },
          { method: 'PUT',    color: '#E65100', desc: 'Reemplazar un recurso existente.' },
          { method: 'DELETE', color: '#B71C1C', desc: 'Eliminar un recurso.' },
        ].map(({ method, color, desc }) => (
          <div key={method} style={{
            background: 'var(--paper-2)',
            border: '1px solid var(--border-soft)',
            borderRadius: 'var(--r-md)',
            padding: 'var(--s-4)',
          }}>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontWeight: 700,
              fontSize: '0.9rem',
              color,
              marginBottom: 'var(--s-2)',
            }}>{method}</div>
            <div style={{ fontSize: '0.9rem', color: 'var(--ink-2)' }}>{desc}</div>
          </div>
        ))}
      </div>

      <p>
        Cada respuesta incluye un <strong>código de estado</strong> que indica
        si todo fue bien o qué salió mal:
      </p>

      <CodeBlock lang="text" label="códigos HTTP frecuentes" code={`
200 OK            → éxito, aquí tienes los datos
201 Created       → recurso creado correctamente
400 Bad Request   → tu petición tiene errores
401 Unauthorized  → necesitas autenticarte
403 Forbidden     → no tienes permiso
404 Not Found     → el recurso no existe
429 Too Many Req  → excediste el límite de peticiones
500 Server Error  → el servidor tuvo un problema
      `} />

      {/* ── Sección 2: URLs ── */}
      <h2>Anatomía de una URL</h2>

      <p>
        Antes de hacer peticiones hay que entender las URLs. Cada parte
        tiene un nombre y un propósito:
      </p>

      <CodeBlock lang="text" label="partes de una URL" code={`
https://api.ejemplo.com/v2/usuarios?pais=es&activo=true#perfil
│       │               │            │                  │
esquema host            ruta         query              fragmento
      `} />

      <p>
        Python incluye <code>urllib.parse</code> para trabajar con URLs sin
        construirlas a mano concatenando strings (que es error propenso):
      </p>

      <CodeBlock code={`
from urllib.parse import urlparse, urlencode, urljoin, quote

# Descomponer una URL
url = "https://api.ejemplo.com/v2/usuarios?pais=es&activo=true"
partes = urlparse(url)

print(partes.scheme)    # https
print(partes.netloc)    # api.ejemplo.com
print(partes.path)      # /v2/usuarios
print(partes.query)     # pais=es&activo=true

# Construir query string desde un diccionario
params = {"pais": "es", "activo": True, "pagina": 1}
qs = urlencode(params)
print(qs)   # pais=es&activo=True&pagina=1

# Combinar URLs base + ruta relativa
base = "https://api.ejemplo.com/v2/"
print(urljoin(base, "usuarios/42"))   # https://api.ejemplo.com/v2/usuarios/42

# Escapar caracteres especiales
texto = "Python es genial!"
print(quote(texto))   # Python%20es%20genial%21
      `} />

      <PyRunner
        initial={`from urllib.parse import urlparse, urlencode, urljoin

# Prueba con esta URL
url = "https://jsonplaceholder.typicode.com/posts?userId=1&_limit=5"
p = urlparse(url)

print("Esquema: ", p.scheme)
print("Host:    ", p.netloc)
print("Ruta:    ", p.path)
print("Query:   ", p.query)

# Construye tu propia URL
params = {"ciudad": "Madrid", "pagina": 2, "por_pagina": 20}
base = "https://api.clima.com/datos"
qs = urlencode(params)
print(f"\\nURL construida: {base}?{qs}")
`}
        hint="Cambia los params del diccionario y observa cómo cambia la URL generada."
      />

      {/* ── Sección 3: urllib.request ── */}
      <h2>Peticiones con urllib (librería estándar)</h2>

      <p>
        Para hacer peticiones HTTP sin instalar nada, Python incluye
        <code> urllib.request</code>. Funciona, pero su API es algo verbosa:
      </p>

      <CodeBlock label="▸ local · python" code={`
import urllib.request
import json

url = "https://jsonplaceholder.typicode.com/posts/1"

with urllib.request.urlopen(url) as respuesta:
    codigo = respuesta.getcode()          # 200
    datos  = json.loads(respuesta.read()) # decodifica JSON

print(f"Código: {codigo}")
print(f"Título: {datos['title']}")
print(f"Cuerpo: {datos['body'][:60]}...")
      `} />

      <Callout kind="tip" title="¿Por qué usar with?">
        <code>urlopen</code> abre una conexión de red. Usar <code>with</code>
        garantiza que se cierra aunque haya un error — igual que con archivos.
      </Callout>

      {/* ── Sección 4: requests ── */}
      <h2>La librería requests</h2>

      <p>
        <code>requests</code> es el estándar de facto para HTTP en Python.
        Su API es más limpia y maneja automáticamente muchos detalles
        (redireccionamientos, cookies, codificación):
      </p>

      <CodeBlock label="terminal" code={`pip install requests`} lang="text" />

      <CodeBlock label="▸ local · python" code={`
import requests

# GET básico
r = requests.get("https://jsonplaceholder.typicode.com/posts/1")

print(r.status_code)      # 200
print(r.headers["Content-Type"])
datos = r.json()          # decodifica automáticamente
print(datos["title"])

# GET con parámetros — requests construye la URL por ti
r = requests.get(
    "https://jsonplaceholder.typicode.com/posts",
    params={"userId": 1, "_limit": 3}
)
for post in r.json():
    print(f"  [{post['id']}] {post['title'][:40]}")
      `} />

      <CodeBlock label="▸ local · python — POST con JSON" code={`
import requests

nuevo = {
    "title":  "Mi primer post desde Python",
    "body":   "Hola mundo desde requests",
    "userId": 1,
}

r = requests.post(
    "https://jsonplaceholder.typicode.com/posts",
    json=nuevo          # serializa a JSON y pone el header correcto
)

print(r.status_code)   # 201 Created
print(r.json())        # {"id": 101, "title": ..., ...}
      `} />

      <Callout kind="warn" title="Maneja siempre los errores">
        {`Las peticiones pueden fallar por muchas razones. Usa r.raise_for_status()
para lanzar una excepción si el código es 4xx o 5xx:`}
        <CodeBlock label="▸ local · python" code={`
import requests

try:
    r = requests.get("https://api.ejemplo.com/recurso/999")
    r.raise_for_status()   # lanza HTTPError si no es 2xx
    datos = r.json()
except requests.exceptions.HTTPError as e:
    print(f"Error HTTP: {e.response.status_code}")
except requests.exceptions.ConnectionError:
    print("Sin conexión")
except requests.exceptions.Timeout:
    print("La petición tardó demasiado")
        `} />
      </Callout>

      {/* ── Sección 5: APIs REST ── */}
      <h2>Consumir una API REST</h2>

      <p>
        Una API REST es un servidor que responde peticiones HTTP devolviendo
        datos en JSON. Casi todos los servicios modernos tienen una:
        clima, redes sociales, mapas, pagos, IA...
      </p>

      <p>
        El flujo siempre es el mismo:
      </p>

      <CodeBlock lang="text" label="flujo API REST" code={`
1. Leer la documentación de la API
2. Obtener credenciales (API key) si es necesario
3. Construir la URL con los parámetros correctos
4. Hacer GET / POST / ...
5. Parsear el JSON de la respuesta
6. Usar los datos en tu programa
      `} />

      <p>
        Este ejercicio usa datos simulados — el mismo JSON que devolvería
        una API real de clima. Practica filtrando y procesando la respuesta:
      </p>

      <PyRunner
        initial={`import json

# Respuesta simulada de una API de clima
respuesta_api = """
{
  "ciudad": "Madrid",
  "pais": "ES",
  "pronostico": [
    {"dia": "lunes",    "max": 28, "min": 14, "estado": "soleado"},
    {"dia": "martes",   "max": 25, "min": 13, "estado": "nublado"},
    {"dia": "miércoles","max": 19, "min": 11, "estado": "lluvia"},
    {"dia": "jueves",   "max": 22, "min": 12, "estado": "nublado"},
    {"dia": "viernes",  "max": 30, "min": 16, "estado": "soleado"}
  ]
}
"""

datos = json.loads(respuesta_api)
print(f"Pronóstico para {datos['ciudad']}, {datos['pais']}\\n")

# Días soleados
soleados = [d for d in datos["pronostico"] if d["estado"] == "soleado"]
print("Días soleados:")
for d in soleados:
    print(f"  {d['dia']}: max {d['max']}°C")

# Temperatura media máxima
media = sum(d["max"] for d in datos["pronostico"]) / len(datos["pronostico"])
print(f"\\nMedia de máximas: {media:.1f}°C")
`}
        hint="Prueba a filtrar los días con lluvia, o a encontrar el día más frío."
        solution={{
          code: `import json

respuesta_api = """{"ciudad":"Madrid","pais":"ES","pronostico":[
  {"dia":"lunes","max":28,"min":14,"estado":"soleado"},
  {"dia":"martes","max":25,"min":13,"estado":"nublado"},
  {"dia":"miércoles","max":19,"min":11,"estado":"lluvia"},
  {"dia":"jueves","max":22,"min":12,"estado":"nublado"},
  {"dia":"viernes","max":30,"min":16,"estado":"soleado"}
]}"""

datos = json.loads(respuesta_api)
pronostico = datos["pronostico"]

# Día más frío
mas_frio = min(pronostico, key=lambda d: d["min"])
print(f"Día más frío: {mas_frio['dia']} ({mas_frio['min']}°C)")

# Días con lluvia
lluvia = [d["dia"] for d in pronostico if d["estado"] == "lluvia"]
print(f"Días con lluvia: {', '.join(lluvia)}")`,
          explanation: 'min() con key= es la forma pythónica de encontrar el elemento mínimo según un criterio.'
        }}
      />

      {/* ── Sección 6: Scraping ── */}
      <h2>Web scraping básico</h2>

      <p>
        Cuando un sitio no tiene API, puedes extraer datos directamente
        del HTML — a esto se llama <em>scraping</em>. Python incluye
        <code> html.parser</code> para parsear HTML sin instalar nada.
        Para webs más complejas existe la librería <code>BeautifulSoup</code>.
      </p>

      <CodeBlock label="▸ local · python — con requests + html.parser" code={`
import requests
from html.parser import HTMLParser

class ExtractorTitulos(HTMLParser):
    def __init__(self):
        super().__init__()
        self.dentro_h1 = False
        self.titulos   = []

    def handle_starttag(self, tag, attrs):
        if tag == 'h1':
            self.dentro_h1 = True

    def handle_endtag(self, tag):
        if tag == 'h1':
            self.dentro_h1 = False

    def handle_data(self, data):
        if self.dentro_h1 and data.strip():
            self.titulos.append(data.strip())

r = requests.get("https://example.com")
parser = ExtractorTitulos()
parser.feed(r.text)
print(parser.titulos)
      `} />

      <Callout kind="tip" title="BeautifulSoup — más cómodo para scraping">
        {`pip install beautifulsoup4\n\nCon BS4 el mismo ejemplo queda en tres líneas:`}
        <CodeBlock label="▸ local · python" code={`
from bs4 import BeautifulSoup
import requests

sopa = BeautifulSoup(requests.get("https://example.com").text, "html.parser")
titulos = [h1.text for h1 in sopa.find_all("h1")]
print(titulos)
        `} />
      </Callout>

      <p>
        Con <code>html.parser</code> también puedes procesar HTML que ya
        tienes en un string — sin hacer ninguna petición de red:
      </p>

      <PyRunner
        initial={`from html.parser import HTMLParser

class ExtractorLinks(HTMLParser):
    def __init__(self):
        super().__init__()
        self.links = []

    def handle_starttag(self, tag, attrs):
        if tag == "a":
            atributos = dict(attrs)
            href = atributos.get("href", "")
            texto = atributos.get("title", "")
            self.links.append((href, texto))

html = """
<nav>
  <a href="/inicio"   title="Inicio">Home</a>
  <a href="/docs"     title="Documentación">Docs</a>
  <a href="/contacto" title="Contacto">Contact</a>
  <a href="https://github.com" title="GitHub">GitHub</a>
</nav>
"""

parser = ExtractorLinks()
parser.feed(html)

print(f"Encontrados {len(parser.links)} enlaces:\\n")
for href, titulo in parser.links:
    print(f"  {titulo:20} → {href}")

# Solo los links externos
externos = [(h, t) for h, t in parser.links if h.startswith("http")]
print(f"\\nLinks externos: {len(externos)}")
`}
        hint="Prueba a extraer también el texto del enlace, no solo el href."
      />

      {/* ── Quiz ── */}
      <Quiz
        question="¿Qué código de estado HTTP indica que se creó un recurso correctamente?"
        options={[
          '200 OK',
          '201 Created',
          '204 No Content',
          '301 Moved Permanently',
        ]}
        correct={1}
        explanation="201 Created se devuelve típicamente al hacer POST para crear un nuevo recurso. 200 es para peticiones que devuelven datos existentes."
      />

      {/* ── Ejercicios ── */}
      <Exercise
        number={1}
        title="Inspecciona y construye URLs"
        difficulty="fácil"
        runner={{
          initial: `from urllib.parse import urlparse, urlencode, parse_qs

# 1. Descompone esta URL y muestra cada parte
url = "https://tienda.ejemplo.com/productos?categoria=libros&precio_max=30&pagina=2"

partes = urlparse(url)
print("Host:   ", partes.netloc)
print("Ruta:   ", partes.path)
print("Query:  ", partes.query)

# 2. Convierte el query string en diccionario
params = parse_qs(partes.query)
print("Params: ", params)

# 3. Construye una nueva URL para la página 3
nuevos = {"categoria": "libros", "precio_max": 30, "pagina": 3}
print("Nueva URL:", f"{partes.scheme}://{partes.netloc}{partes.path}?{urlencode(nuevos)}")
`,
          hint: 'parse_qs devuelve listas por cada clave. Usa parse_qs(query, keep_blank_values=True) si quieres incluir parámetros vacíos.'
        }}
      >
        <p>
          Analiza la URL de una tienda online y construye la siguiente página
          de resultados.
        </p>
      </Exercise>

      <Exercise
        number={2}
        title="Procesa una respuesta de API de usuarios"
        difficulty="fácil"
        runner={{
          initial: `import json

# Respuesta simulada de una API de usuarios
datos = json.loads("""[
  {"id": 1, "nombre": "Ana García",    "rol": "admin",  "activo": true,  "proyectos": 5},
  {"id": 2, "nombre": "Luis Martín",   "rol": "editor", "activo": true,  "proyectos": 2},
  {"id": 3, "nombre": "Sara López",    "rol": "viewer", "activo": false, "proyectos": 0},
  {"id": 4, "nombre": "Pedro Ruiz",    "rol": "editor", "activo": true,  "proyectos": 8},
  {"id": 5, "nombre": "Marta Torres",  "rol": "admin",  "activo": true,  "proyectos": 3}
]""")

# Filtra solo usuarios activos
activos = [u for u in datos if u["activo"]]
print(f"Usuarios activos: {len(activos)}")

# Muestra los admins
admins = [u["nombre"] for u in datos if u["rol"] == "admin"]
print(f"Admins: {', '.join(admins)}")

# El editor con más proyectos
editores = [u for u in datos if u["rol"] == "editor"]
top = max(editores, key=lambda u: u["proyectos"])
print(f"Editor más activo: {top['nombre']} ({top['proyectos']} proyectos)")
`,
          hint: 'Usa list comprehensions para filtrar y max() con key= para encontrar el máximo.'
        }}
      >
        <p>
          Filtra y agrupa usuarios de una API usando comprensiones y
          funciones de orden superior.
        </p>
      </Exercise>

      <Exercise
        number={3}
        title="Construye un cliente GET con headers"
        difficulty="media"
      >
        <p>
          Escribe en tu Python local un script que haga una petición GET
          con headers personalizados, maneje errores con
          <code> raise_for_status()</code> y muestre el resultado formateado.
        </p>
        <CodeBlock label="▸ local · python — plantilla" code={`
import requests
import json

URL = "https://jsonplaceholder.typicode.com/users"

headers = {
    "Accept":     "application/json",
    "User-Agent": "MiScript/1.0",
}

try:
    r = requests.get(URL, headers=headers, timeout=10)
    r.raise_for_status()
    usuarios = r.json()

    print(f"Total usuarios: {len(usuarios)}")
    for u in usuarios[:3]:
        print(f"  {u['name']:20} — {u['email']}")

except requests.exceptions.HTTPError as e:
    print(f"HTTP {e.response.status_code}: {e}")
except requests.exceptions.RequestException as e:
    print(f"Error de red: {e}")
        `} />
      </Exercise>

      <Exercise
        number={4}
        title="Paginación de resultados"
        difficulty="media"
        runner={{
          initial: `import json

# Simulamos múltiples páginas de una API
def pagina_simulada(num, por_pagina=3):
    todos = [
        {"id": i, "titulo": f"Artículo {i}", "vistas": (i * 137) % 500}
        for i in range(1, 16)
    ]
    inicio = (num - 1) * por_pagina
    items  = todos[inicio:inicio + por_pagina]
    return {
        "pagina": num,
        "total": len(todos),
        "items": items,
        "siguiente": num + 1 if inicio + por_pagina < len(todos) else None
    }

# Recolecta TODOS los artículos paginando
todos_articulos = []
pagina = 1

while True:
    resp = pagina_simulada(pagina)
    todos_articulos.extend(resp["items"])
    print(f"Página {pagina}: {len(resp['items'])} artículos")

    if resp["siguiente"] is None:
        break
    pagina += 1

print(f"\\nTotal recolectado: {len(todos_articulos)} artículos")
top3 = sorted(todos_articulos, key=lambda a: a["vistas"], reverse=True)[:3]
print("Top 3 por vistas:")
for a in top3:
    print(f"  {a['titulo']:15} — {a['vistas']} vistas")
`,
          hint: 'El patrón while True + break cuando siguiente es None es el estándar para APIs paginadas.'
        }}
      >
        <p>
          Muchas APIs devuelven los resultados en páginas. Implementa un
          bucle que recorra todas las páginas y acumule los resultados.
        </p>
      </Exercise>

      <Exercise
        number={5}
        title="Extrae datos de HTML"
        difficulty="media"
        runner={{
          initial: `from html.parser import HTMLParser

class ExtractorTabla(HTMLParser):
    def __init__(self):
        super().__init__()
        self.en_td = False
        self.fila_actual = []
        self.filas = []
        self.celda_actual = ""

    def handle_starttag(self, tag, attrs):
        if tag == "tr":
            self.fila_actual = []
        elif tag in ("td", "th"):
            self.en_td = True
            self.celda_actual = ""

    def handle_endtag(self, tag):
        if tag in ("td", "th"):
            self.fila_actual.append(self.celda_actual.strip())
            self.en_td = False
        elif tag == "tr" and self.fila_actual:
            self.filas.append(self.fila_actual)

    def handle_data(self, data):
        if self.en_td:
            self.celda_actual += data

html_tabla = """
<table>
  <tr><th>País</th><th>Capital</th><th>Población (M)</th></tr>
  <tr><td>España</td><td>Madrid</td><td>47.4</td></tr>
  <tr><td>México</td><td>Ciudad de México</td><td>128.9</td></tr>
  <tr><td>Argentina</td><td>Buenos Aires</td><td>45.2</td></tr>
  <tr><td>Colombia</td><td>Bogotá</td><td>51.9</td></tr>
</table>
"""

parser = ExtractorTabla()
parser.feed(html_tabla)

cabeceras = parser.filas[0]
datos     = parser.filas[1:]

print(f"Columnas: {cabeceras}")
print()
for fila in datos:
    fila_dict = dict(zip(cabeceras, fila))
    print(f"  {fila_dict['País']:12} → capital: {fila_dict['Capital']}")

# País más poblado
mas_poblado = max(datos, key=lambda f: float(f[2]))
print(f"\\nMás poblado: {mas_poblado[0]} ({mas_poblado[2]}M hab.)")
`,
          hint: 'zip(cabeceras, fila) es la forma más limpia de convertir una fila en diccionario.'
        }}
      >
        <p>
          Parsea una tabla HTML y extrae los datos en un formato estructurado
          que puedas procesar con Python.
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
          <li><strong>HTTP</strong> es el protocolo cliente-servidor. GET pide datos, POST los envía.</li>
          <li><strong>urllib.parse</strong> construye y descompone URLs sin concatenar strings.</li>
          <li><strong>urllib.request</strong> hace peticiones sin instalar nada extra.</li>
          <li><strong>requests</strong> es la librería más usada: API limpia, manejo automático de JSON y errores.</li>
          <li><strong>r.raise_for_status()</strong> lanza excepción en 4xx/5xx — úsalo siempre.</li>
          <li><strong>Scraping</strong> con <code>html.parser</code> cuando no hay API; <code>BeautifulSoup</code> para webs complejas.</li>
        </ul>
      </div>

      <PullQuote>
        La web es el mayor repositorio de datos del mundo. Saber hablar HTTP
        desde Python es saber cómo acceder a él.
      </PullQuote>

      <ChapterNav
        prev={prev ? { id: prev.id, title: prev.title } : null}
        next={next ? { id: next.id, title: next.title } : null}
        onNav={onNav}
      />
    </article>
  );
}

window.ChapterL3M1 = ChapterL3M1;
