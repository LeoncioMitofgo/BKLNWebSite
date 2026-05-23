// =============================================================
// chapter-l3-m3.jsx — Libro 3, Módulo 3: APIs y servicios externos
// =============================================================

function ChapterL3M3({ onNav }) {
  const flat = flatTOC();
  const idx  = flat.findIndex(c => c.id === 'l3-m3');
  const prev = idx > 0 ? flat[idx - 1] : null;
  const next = idx < flat.length - 1 ? flat[idx + 1] : null;

  return (
    <article className="reader-inner">
      <ChapterHeader
        book="// libro 3 · del código al mundo real"
        module="módulo 03"
        time="≈ 65 min"
        title={<>APIs y servicios externos</>}
        dek="Ya sabes hacer peticiones HTTP. Ahora aprendes a integrarte con servicios reales: autenticación, API keys, rate limiting, webhooks y las APIs más usadas en la industria."
      />

      <p>
        En el módulo de la web aprendiste a hacer peticiones GET y POST básicas.
        Las APIs del mundo real añaden una capa más: necesitas identificarte,
        respetar límites de uso, manejar errores específicos y procesar
        respuestas JSON que pueden ser complejas y anidadas.
      </p>

      <p>
        Este módulo te enseña a trabajar con APIs de verdad — las mismas
        que usarás en proyectos profesionales. GitHub, OpenAI, Stripe,
        Twilio, Google Maps... todas siguen los mismos patrones que verás aquí.
      </p>

      <Callout kind="info" title="Código local vs. en el libro">
        Las peticiones HTTP reales necesitan tu Python local. Los ejercicios
        con ▶ Ejecutar usan respuestas simuladas para practicar el procesamiento
        de JSON sin necesitar conexión ni API keys.
      </Callout>

      {/* ── Sección 1: Autenticación ── */}
      <h2>Autenticación: cómo identificarte</h2>

      <p>
        La mayoría de APIs requieren que te identifiques para saber quién hace
        las peticiones, controlar el uso y proteger los datos. Hay tres formas
        principales:
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: 'var(--s-4)',
        margin: 'var(--s-5) 0',
      }}>
        {[
          {
            tipo: 'API Key',
            desc: 'Una clave secreta que mandas en cada petición. Simple y muy extendida.',
            ejemplo: 'OpenWeatherMap, NASA, NewsAPI',
          },
          {
            tipo: 'Bearer Token',
            desc: 'Token temporal en el header Authorization. Más seguro que una API key fija.',
            ejemplo: 'GitHub, Twitter/X, Spotify',
          },
          {
            tipo: 'OAuth 2.0',
            desc: 'Flujo completo donde el usuario autoriza el acceso. Para actuar en su nombre.',
            ejemplo: 'Google, Facebook, GitHub Apps',
          },
        ].map(({ tipo, desc, ejemplo }) => (
          <div key={tipo} style={{
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
            }}>{tipo}</div>
            <p style={{ fontSize: '0.88rem', color: 'var(--ink-2)', margin: '0 0 var(--s-2)' }}>{desc}</p>
            <div style={{ fontSize: '0.78rem', color: 'var(--ink-3)', fontFamily: 'var(--font-mono)' }}>
              ej: {ejemplo}
            </div>
          </div>
        ))}
      </div>

      {/* ── Sección 2: API Key ── */}
      <h2>API Keys — el método más común</h2>

      <p>
        Una API key es una cadena de texto que el servicio te da al registrarte.
        Se puede enviar de tres formas distintas según la API:
      </p>

      <CodeBlock label="▸ local · python" code={`
import requests

API_KEY = "tu_api_key_aqui"   # nunca la pongas directamente en el código

# Forma 1: como parámetro en la URL (query string)
r = requests.get(
    "https://api.openweathermap.org/data/2.5/weather",
    params={"q": "Madrid", "appid": API_KEY, "units": "metric", "lang": "es"}
)

# Forma 2: en el header (más segura — no aparece en logs de servidor)
r = requests.get(
    "https://api.ejemplo.com/datos",
    headers={"X-API-Key": API_KEY}
)

# Forma 3: en el header Authorization
r = requests.get(
    "https://api.ejemplo.com/datos",
    headers={"Authorization": f"ApiKey {API_KEY}"}
)
      `} />

      <Callout kind="warn" title="Nunca guardes API keys en el código">
        {`Si subes tu código a GitHub con una API key visible, bots automatizados
la detectan en minutos y la usan. La solución: variables de entorno.`}
        <CodeBlock label="▸ local · python" code={`
import os
import requests

API_KEY = os.environ.get("OPENWEATHER_API_KEY")
if not API_KEY:
    raise ValueError("Falta la variable de entorno OPENWEATHER_API_KEY")
        `} />
        <CodeBlock label="terminal — cómo definir la variable" lang="text" code={`
# Linux / Mac
export OPENWEATHER_API_KEY="tu_clave_aqui"

# Windows PowerShell
$env:OPENWEATHER_API_KEY = "tu_clave_aqui"
        `} />
      </Callout>

      {/* ── Sección 3: Bearer Token ── */}
      <h2>Bearer Token — GitHub como ejemplo</h2>

      <p>
        GitHub usa tokens de acceso personal (PAT). Los creas en
        <em> Settings → Developer settings → Personal access tokens</em>.
        Se envían en el header <code>Authorization</code>:
      </p>

      <CodeBlock label="▸ local · python — GitHub API" code={`
import requests
import os

TOKEN = os.environ.get("GITHUB_TOKEN")

headers = {
    "Authorization": f"Bearer {TOKEN}",
    "Accept": "application/vnd.github+json",
    "X-GitHub-Api-Version": "2022-11-28",
}

# Tus repositorios
r = requests.get("https://api.github.com/user/repos", headers=headers)
r.raise_for_status()

repos = r.json()
for repo in repos[:5]:
    estrellas = repo["stargazers_count"]
    print(f"  {'★' * min(estrellas, 5)} {repo['name']} — {repo['description'] or ''}")

# Issues de un repositorio
r = requests.get(
    "https://api.github.com/repos/python/cpython/issues",
    headers=headers,
    params={"state": "open", "per_page": 5}
)
for issue in r.json():
    print(f"  #{issue['number']} {issue['title'][:60]}")
      `} />

      {/* ── Sección 4: Rate limiting ── */}
      <h2>Rate limiting — respetar los límites</h2>

      <p>
        Todas las APIs limitan cuántas peticiones puedes hacer por minuto
        o por hora. Si las superas, recibirás un <code>429 Too Many Requests</code>.
        La respuesta suele incluir headers que te dicen cuánto esperar:
      </p>

      <CodeBlock label="▸ local · python" code={`
import requests
import time

def peticion_con_reintento(url, headers, max_intentos=3):
    for intento in range(max_intentos):
        r = requests.get(url, headers=headers)

        if r.status_code == 429:
            # El header Retry-After dice cuántos segundos esperar
            espera = int(r.headers.get("Retry-After", 60))
            print(f"Rate limit alcanzado. Esperando {espera}s...")
            time.sleep(espera)
            continue

        if r.status_code == 200:
            return r.json()

        r.raise_for_status()

    raise Exception(f"Falló tras {max_intentos} intentos")

# Headers informativos de rate limit (GitHub los incluye)
r = requests.get("https://api.github.com/rate_limit")
datos = r.json()["rate"]
print(f"Límite:    {datos['limit']}")
print(f"Restantes: {datos['remaining']}")
print(f"Se reinicia: {datos['reset']}")  # timestamp Unix
      `} />

      <Callout kind="tip" title="Estrategia para no pasarte del límite">
        {`Guarda en caché las respuestas que no cambian frecuentemente.
Si una petición devuelve los mismos datos durante horas, guárdalos
localmente y no vuelvas a llamar a la API hasta que caduquen.`}
      </Callout>

      {/* ── Sección 5: Caché simple ── */}
      <h2>Caché básico con archivos JSON</h2>

      <CodeBlock label="▸ local · python" code={`
import requests, json, time
from pathlib import Path

CACHE_FILE = Path("cache_api.json")
CACHE_TTL  = 3600   # segundos (1 hora)

def cargar_cache():
    if CACHE_FILE.exists():
        return json.loads(CACHE_FILE.read_text())
    return {}

def guardar_cache(cache):
    CACHE_FILE.write_text(json.dumps(cache, indent=2))

def get_con_cache(url, params=None):
    cache = cargar_cache()
    clave = url + str(sorted((params or {}).items()))

    if clave in cache:
        entrada = cache[clave]
        if time.time() - entrada["timestamp"] < CACHE_TTL:
            print("  [caché] usando respuesta guardada")
            return entrada["datos"]

    print("  [api] petición real")
    r = requests.get(url, params=params)
    r.raise_for_status()
    datos = r.json()

    cache[clave] = {"timestamp": time.time(), "datos": datos}
    guardar_cache(cache)
    return datos
      `} />

      {/* ── Sección 6: JSON anidado ── */}
      <h2>Navegar JSON anidado</h2>

      <p>
        Las APIs reales devuelven JSON complejo con múltiples niveles de
        anidación. Hay que saber navegar la estructura y manejar claves
        opcionales sin que el programa explote:
      </p>

      <PyRunner
        initial={`import json

# Respuesta típica de una API de repositorios de código
respuesta = json.loads("""
{
  "total_count": 3,
  "items": [
    {
      "id": 1001,
      "name": "fastapi",
      "full_name": "tiangolo/fastapi",
      "owner": {"login": "tiangolo", "type": "User"},
      "description": "FastAPI framework, high performance",
      "stargazers_count": 75000,
      "language": "Python",
      "topics": ["api", "python", "fastapi", "openapi"],
      "license": {"name": "MIT License"},
      "open_issues_count": 312
    },
    {
      "id": 1002,
      "name": "requests",
      "full_name": "psf/requests",
      "owner": {"login": "psf", "type": "Organization"},
      "description": "A simple, yet elegant, HTTP library.",
      "stargazers_count": 51000,
      "language": "Python",
      "topics": ["http", "python", "requests"],
      "license": {"name": "Apache License 2.0"},
      "open_issues_count": 47
    },
    {
      "id": 1003,
      "name": "textual",
      "full_name": "Textualize/textual",
      "owner": {"login": "Textualize", "type": "Organization"},
      "description": "The lean application framework for Python",
      "stargazers_count": 25000,
      "language": "Python",
      "topics": ["tui", "python", "terminal"],
      "license": null,
      "open_issues_count": 98
    }
  ]
}
""")

print(f"Total encontrados: {respuesta['total_count']}\\n")

for repo in respuesta["items"]:
    # .get() con valor por defecto para claves opcionales
    licencia = repo.get("license") or {}
    nombre_lic = licencia.get("name", "Sin licencia")

    estrellas = repo["stargazers_count"]
    barra = "★" * min(estrellas // 10000, 7)

    print(f"{repo['full_name']}")
    print(f"  {barra} {estrellas:,} estrellas · {nombre_lic}")
    print(f"  Temas: {', '.join(repo['topics'][:3])}")
    print()

# El más popular
top = max(respuesta["items"], key=lambda r: r["stargazers_count"])
print(f"El más popular: {top['name']} ({top['stargazers_count']:,} ★)")
`}
        hint="Usa .get('clave', valor_por_defecto) cuando una clave puede no estar presente en todos los registros."
      />

      {/* ── Sección 7: Paginación ── */}
      <h2>Paginación con Link header</h2>

      <p>
        Muchas APIs paginan sus respuestas. Algunas usan parámetros
        <code> page</code> y <code>per_page</code>; otras (como GitHub)
        incluyen un header <code>Link</code> con la URL de la siguiente página:
      </p>

      <CodeBlock label="▸ local · python" code={`
import requests

def obtener_todos(url, headers, params=None):
    resultados = []
    params = dict(params or {})
    params["per_page"] = 100   # máximo por página

    while url:
        r = requests.get(url, headers=headers, params=params)
        r.raise_for_status()
        resultados.extend(r.json())

        # GitHub pone la siguiente página en el header Link
        link = r.headers.get("Link", "")
        url = None
        params = {}   # la URL del link ya trae los params

        for parte in link.split(","):
            if 'rel="next"' in parte:
                url = parte.split(";")[0].strip().strip("<>")
                break

    return resultados

# Uso
TOKEN = "tu_token"
headers = {"Authorization": f"Bearer {TOKEN}"}
repos = obtener_todos("https://api.github.com/user/repos", headers)
print(f"Total repos: {len(repos)}")
      `} />

      {/* ── Sección 8: Webhooks ── */}
      <h2>Webhooks — que la API te llame a ti</h2>

      <p>
        Hasta ahora siempre eras tú quien llamaba a la API. Los webhooks
        invierten eso: el servicio externo llama a tu servidor cuando ocurre
        algo (un pago, un commit, un mensaje nuevo...).
      </p>

      <CodeBlock lang="text" label="flujo webhook" code={`
Sin webhook:  Tu app → (cada 5 min) → ¿hay datos nuevos? → API
Con webhook:  API → (cuando pasa algo) → Tu servidor
      `} />

      <CodeBlock label="▸ local · python — servidor webhook mínimo con Flask" code={`
from flask import Flask, request, abort
import hmac, hashlib, os

app = Flask(__name__)
SECRET = os.environ.get("WEBHOOK_SECRET", "").encode()

def verificar_firma(payload, firma_recibida):
    firma_esperada = "sha256=" + hmac.new(SECRET, payload, hashlib.sha256).hexdigest()
    return hmac.compare_digest(firma_esperada, firma_recibida)

@app.route("/webhook/github", methods=["POST"])
def webhook_github():
    firma = request.headers.get("X-Hub-Signature-256", "")
    if not verificar_firma(request.data, firma):
        abort(401)

    evento = request.headers.get("X-GitHub-Event")
    datos  = request.json

    if evento == "push":
        repo   = datos["repository"]["name"]
        autor  = datos["pusher"]["name"]
        commits = len(datos["commits"])
        print(f"Push en {repo} por {autor}: {commits} commit(s)")

    return {"status": "ok"}, 200
      `} />

      <Callout kind="tip" title="Verificar la firma del webhook">
        {`Cualquiera podría enviar peticiones a tu endpoint.
Verifica siempre la firma HMAC que el servicio incluye en los headers
para confirmar que la petición viene de quien dice.`}
      </Callout>

      {/* ── Quiz ── */}
      <Quiz
        question="¿Cuál es la forma más segura de almacenar una API key en tu código Python?"
        options={[
          'Escribirla directamente en el código entre comillas.',
          'Guardarla en un archivo keys.txt junto al proyecto.',
          'Leerla desde una variable de entorno con os.environ.get().',
          'Codificarla en base64 dentro del código.',
        ]}
        correct={2}
        explanation={"Las variables de entorno separan la configuración del código. Así puedes subir el código a GitHub sin exponer claves. Base64 no es cifrado — es solo una codificación reversible en segundos."}
      />

      {/* ── Ejercicios ── */}
      <Exercise
        number={1}
        title="Procesa la respuesta de una API de clima"
        difficulty="fácil"
        runner={{
          initial: `import json

# Respuesta simulada de OpenWeatherMap
datos = json.loads("""
{
  "name": "Málaga",
  "sys": {"country": "ES", "sunrise": 1716867600, "sunset": 1716919200},
  "main": {
    "temp": 26.4,
    "feels_like": 26.1,
    "humidity": 62,
    "pressure": 1014
  },
  "weather": [{"main": "Clear", "description": "cielo claro"}],
  "wind": {"speed": 4.2, "deg": 220},
  "visibility": 10000
}
""")

# Extrae y muestra los datos de forma legible
ciudad   = datos["name"]
pais     = datos["sys"]["country"]
temp     = datos["main"]["temp"]
sensacion = datos["main"]["feels_like"]
humedad  = datos["main"]["humidity"]
descripcion = datos["weather"][0]["description"]
viento   = datos["wind"]["speed"]

print(f"Clima en {ciudad}, {pais}")
print(f"  {descripcion.capitalize()}")
print(f"  Temperatura: {temp}°C (sensación {sensacion}°C)")
print(f"  Humedad:     {humedad}%")
print(f"  Viento:      {viento} m/s")

# Convierte velocidad de viento a km/h
viento_kmh = viento * 3.6
print(f"               ({viento_kmh:.1f} km/h)")
`,
          hint: 'Los datos anidados se acceden encadenando corchetes: datos["weather"][0]["description"]'
        }}
      >
        <p>
          Extrae y formatea los datos de una respuesta típica de la API
          de OpenWeatherMap.
        </p>
      </Exercise>

      <Exercise
        number={2}
        title="Filtra y ordena resultados de una API"
        difficulty="fácil"
        runner={{
          initial: `import json

# Respuesta simulada de una API de películas (tipo TMDB)
peliculas = json.loads("""[
  {"id": 1, "titulo": "Dune: Parte Dos", "anyo": 2024, "nota": 8.1,
   "generos": ["ciencia ficción", "aventura"], "idioma": "en"},
  {"id": 2, "titulo": "El maestro jardienero", "anyo": 2022, "nota": 6.8,
   "generos": ["drama", "romance"], "idioma": "en"},
  {"id": 3, "titulo": "Oppenheimer", "anyo": 2023, "nota": 8.3,
   "generos": ["drama", "historia"], "idioma": "en"},
  {"id": 4, "titulo": "Poor Things", "anyo": 2023, "nota": 7.9,
   "generos": ["comedia", "romance", "ciencia ficción"], "idioma": "en"},
  {"id": 5, "titulo": "La zona de interés", "anyo": 2023, "nota": 7.4,
   "generos": ["drama", "historia"], "idioma": "de"},
  {"id": 6, "titulo": "Anatomía de una caída", "anyo": 2023, "nota": 7.7,
   "generos": ["drama", "thriller"], "idioma": "fr"}
]""")

# 1. Solo películas de 2023, ordenadas por nota
print("Películas de 2023 (por nota):")
de_2023 = sorted(
    [p for p in peliculas if p["anyo"] == 2023],
    key=lambda p: p["nota"],
    reverse=True
)
for p in de_2023:
    print(f"  {p['nota']} · {p['titulo']}")

# 2. Películas de drama
print("\\nPelículas de drama:")
dramas = [p for p in peliculas if "drama" in p["generos"]]
for p in dramas:
    print(f"  {p['titulo']} ({p['anyo']})")

# 3. Nota media de todas
media = sum(p["nota"] for p in peliculas) / len(peliculas)
print(f"\\nNota media del listado: {media:.2f}")
`,
          hint: 'Para filtrar por género usa "drama" in p["generos"], que comprueba si el string está en la lista.'
        }}
      >
        <p>
          Filtra y ordena una colección de películas simulando el trabajo
          con la respuesta de una API tipo TMDB.
        </p>
      </Exercise>

      <Exercise
        number={3}
        title="Construye un cliente de API reutilizable"
        difficulty="media"
      >
        <p>
          Escribe en tu Python local una clase que encapsule la lógica
          de autenticación, reintentos y rate limiting para una API concreta.
        </p>
        <CodeBlock label="▸ local · python — plantilla" code={`
import requests, time, os

class ClienteAPI:
    BASE_URL = "https://api.ejemplo.com/v1"

    def __init__(self):
        self.api_key = os.environ["MI_API_KEY"]
        self.session = requests.Session()
        self.session.headers.update({
            "Authorization": f"Bearer {self.api_key}",
            "Accept": "application/json",
        })

    def _get(self, endpoint, params=None, reintentos=3):
        url = f"{self.BASE_URL}/{endpoint}"
        for intento in range(reintentos):
            r = self.session.get(url, params=params, timeout=10)
            if r.status_code == 429:
                time.sleep(int(r.headers.get("Retry-After", 5)))
                continue
            r.raise_for_status()
            return r.json()
        raise Exception(f"Falló {reintentos} veces: {url}")

    def buscar(self, query, limite=10):
        return self._get("buscar", {"q": query, "limit": limite})

    def detalle(self, item_id):
        return self._get(f"items/{item_id}")

# Uso
cliente = ClienteAPI()
resultados = cliente.buscar("python programacion")
        `} />
      </Exercise>

      <Exercise
        number={4}
        title="Normaliza respuestas de múltiples APIs"
        difficulty="media"
        runner={{
          initial: `import json

# Diferentes APIs devuelven el mismo concepto con distintos formatos
api_openweather = json.loads("""
{
  "name": "Madrid",
  "main": {"temp": 22.5, "humidity": 55},
  "weather": [{"description": "nubes dispersas"}],
  "wind": {"speed": 3.1}
}
""")

api_weatherapi = json.loads("""
{
  "location": {"name": "Madrid", "country": "Spain"},
  "current": {
    "temp_c": 22.5,
    "humidity": 55,
    "condition": {"text": "Partly cloudy"},
    "wind_kph": 11.2
  }
}
""")

# Función que normaliza ambos formatos al mismo esquema
def normalizar_openweather(datos):
    return {
        "ciudad":      datos["name"],
        "temperatura": datos["main"]["temp"],
        "humedad":     datos["main"]["humidity"],
        "descripcion": datos["weather"][0]["description"],
        "viento_kmh":  round(datos["wind"]["speed"] * 3.6, 1),
    }

def normalizar_weatherapi(datos):
    loc = datos["location"]
    cur = datos["current"]
    return {
        "ciudad":      loc["name"],
        "temperatura": cur["temp_c"],
        "humedad":     cur["humidity"],
        "descripcion": cur["condition"]["text"],
        "viento_kmh":  cur["wind_kph"],
    }

# Ahora el resto del código es igual para ambas fuentes
for nombre, datos in [
    ("OpenWeather", normalizar_openweather(api_openweather)),
    ("WeatherAPI",  normalizar_weatherapi(api_weatherapi)),
]:
    print(f"Fuente: {nombre}")
    print(f"  {datos['ciudad']}: {datos['temperatura']}°C, "
          f"{datos['humedad']}% humedad, {datos['viento_kmh']} km/h")
`,
          hint: 'El patrón adaptador (normalizar_X) desacopla el formato de la API de la lógica de tu programa.'
        }}
      >
        <p>
          Dos APIs distintas devuelven datos de clima con estructuras diferentes.
          Escribe funciones que normalicen ambas al mismo esquema interno.
        </p>
      </Exercise>

      <Exercise
        number={5}
        title="Descarga y procesa datos paginados"
        difficulty="difícil"
        runner={{
          initial: `import json

# Simulamos un endpoint paginado
_datos_totales = [
    {"id": i, "usuario": f"user_{i:03d}",
     "accion": ["login","compra","logout","visita"][i % 4],
     "importe": round((i * 17.3) % 200, 2) if i % 4 == 1 else 0}
    for i in range(1, 31)
]

def endpoint_paginado(pagina=1, por_pagina=5):
    inicio = (pagina - 1) * por_pagina
    items  = _datos_totales[inicio:inicio + por_pagina]
    total  = len(_datos_totales)
    return {
        "pagina":    pagina,
        "por_pagina": por_pagina,
        "total":     total,
        "paginas":   (total + por_pagina - 1) // por_pagina,
        "datos":     items,
        "siguiente": pagina + 1 if inicio + por_pagina < total else None,
    }

# Recorre todas las páginas
todos = []
pagina = 1

while True:
    resp = endpoint_paginado(pagina=pagina)
    todos.extend(resp["datos"])
    print(f"Página {pagina}/{resp['paginas']}: {len(resp['datos'])} registros")

    if resp["siguiente"] is None:
        break
    pagina += 1

print(f"\\nTotal registros: {len(todos)}")

# Análisis de los datos
compras = [e for e in todos if e["accion"] == "compra"]
total_ventas = sum(e["importe"] for e in compras)
print(f"Compras: {len(compras)}")
print(f"Total ventas: {total_ventas:.2f} €")
print(f"Ticket medio: {total_ventas / len(compras):.2f} €")
`,
          hint: 'El campo "siguiente" siendo None es la señal de que no hay más páginas — rompe el bucle ahí.'
        }}
      >
        <p>
          Recorre todas las páginas de un endpoint paginado, acumula los
          registros y calcula estadísticas del conjunto completo.
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
          <li><strong>API Key, Bearer Token y OAuth</strong> son los tres métodos de autenticación más comunes.</li>
          <li><strong>Nunca en el código</strong> — usa <code>os.environ.get()</code> para las claves secretas.</li>
          <li><strong>429</strong> significa rate limit — usa el header <code>Retry-After</code> y espera.</li>
          <li><strong>Caché JSON</strong> evita peticiones repetidas y protege tu cuota de API.</li>
          <li><strong>.get("clave", defecto)</strong> para acceder a campos opcionales sin KeyError.</li>
          <li><strong>Normaliza</strong> los formatos de distintas APIs a un esquema interno común.</li>
          <li><strong>Webhooks</strong> invierten el flujo — el servicio te llama a ti cuando pasa algo.</li>
        </ul>
      </div>

      <PullQuote>
        Una API bien integrada no es solo código que funciona — es
        código que respeta límites, protege secretos y falla con gracia.
      </PullQuote>

      <ChapterNav
        prev={prev ? { id: prev.id, title: prev.title } : null}
        next={next ? { id: next.id, title: next.title } : null}
        onNav={onNav}
      />
    </article>
  );
}

window.ChapterL3M3 = ChapterL3M3;
