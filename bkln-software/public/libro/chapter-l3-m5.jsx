// =============================================================
// chapter-l3-m5.jsx — Libro 3, Módulo 5: Automatización
// =============================================================

function ChapterL3M5({ onNav }) {
  const flat = flatTOC();
  const idx  = flat.findIndex(c => c.id === 'l3-m5');
  const prev = idx > 0 ? flat[idx - 1] : null;
  const next = idx < flat.length - 1 ? flat[idx + 1] : null;

  return (
    <article className="reader-inner">
      <ChapterHeader
        book="// libro 3 · del código al mundo real"
        module="módulo 05"
        time="≈ 65 min"
        title={<>Automatización</>}
        dek="Todo lo que haces repetitivamente con el ratón o el teclado, Python puede hacerlo por ti. Archivos, emails, Excel, comandos del sistema, tareas programadas — sin intervención humana."
      />

      <p>
        La automatización es donde Python demuestra su valor más rápidamente.
        Un script de 30 líneas puede reemplazar horas de trabajo manual:
        renombrar mil archivos, enviar emails personalizados a una lista,
        generar informes en Excel cada lunes a las 8:00, o hacer capturas
        de pantalla de páginas web.
      </p>
      <p>
        Este módulo cubre las herramientas más usadas: manipulación avanzada
        de archivos con <code>pathlib</code> y <code>shutil</code>, comandos
        del sistema con <code>subprocess</code>, tareas programadas con
        <code> schedule</code>, emails con <code>smtplib</code> y hojas de
        cálculo con <code>openpyxl</code>.
      </p>

      <Callout kind="info" title="Qué puedes ejecutar aquí">
        <code>pathlib</code> y la lógica de organización funcionan en el libro.
        <code> subprocess</code>, <code>shutil</code> sobre el sistema real,
        <code> smtplib</code> y <code>openpyxl</code> necesitan tu Python local
        — los marcamos con <strong>▸ local</strong>.
      </Callout>

      {/* ── pathlib avanzado ── */}
      <h2>pathlib — rutas como objetos</h2>

      <p>
        Ya conoces <code>pathlib</code> del Libro 2. Aquí vas más allá:
        buscar archivos recursivamente, filtrar por extensión, y construir
        la lógica de automatización de directorios.
      </p>

      <PyRunner
        initial={`from pathlib import Path, PurePath
from datetime import datetime

# Simular un directorio de descargas con archivos mezclados
archivos_simulados = [
    "informe_ventas_2025-01.pdf",
    "foto_vacaciones.jpg",
    "presupuesto_q1.xlsx",
    "cancion_favorita.mp3",
    "foto_cumple.png",
    "contrato_cliente.pdf",
    "notas_reunion.txt",
    "musica_trabajo.mp3",
    "datos_marzo.xlsx",
    "video_presentacion.mp4",
]

# Reglas de organización por extensión
destinos = {
    ".pdf":  "Documentos/PDFs",
    ".xlsx": "Documentos/Excel",
    ".txt":  "Documentos/Texto",
    ".jpg":  "Imágenes",
    ".png":  "Imágenes",
    ".mp3":  "Música",
    ".mp4":  "Vídeos",
}

print("Plan de organización:\\n")
movimientos = {}

for nombre in archivos_simulados:
    p = PurePath(nombre)
    extension = p.suffix.lower()
    carpeta = destinos.get(extension, "Otros")

    if carpeta not in movimientos:
        movimientos[carpeta] = []
    movimientos[carpeta].append(nombre)

for carpeta, archivos in sorted(movimientos.items()):
    print(f"  📁 {carpeta}/")
    for archivo in archivos:
        print(f"       {archivo}")
`}
        hint="PurePath no accede al disco — es perfecta para calcular rutas sin necesitar archivos reales."
      />

      <CodeBlock label="▸ local · python — buscar archivos recursivamente" code={`
from pathlib import Path

carpeta = Path.home() / "Documentos"

# Todos los PDF del directorio y subdirectorios
pdfs = list(carpeta.rglob("*.pdf"))
print(f"Encontrados {len(pdfs)} archivos PDF")

# Archivos modificados en los últimos 7 días
import time
hace_7_dias = time.time() - (7 * 24 * 3600)
recientes = [p for p in carpeta.rglob("*") if p.is_file() and p.stat().st_mtime > hace_7_dias]
print(f"Modificados esta semana: {len(recientes)}")

# Calcular tamaño total de una carpeta
total_bytes = sum(p.stat().st_size for p in carpeta.rglob("*") if p.is_file())
print(f"Tamaño total: {total_bytes / 1024 / 1024:.1f} MB")
      `} />

      {/* ── shutil ── */}
      <h2>shutil — operaciones de alto nivel sobre archivos</h2>

      <p>
        Mientras <code>pathlib</code> trabaja con rutas, <code>shutil</code>
        mueve, copia y elimina archivos y directorios completos:
      </p>

      <CodeBlock label="▸ local · python" code={`
import shutil
from pathlib import Path

origen  = Path("descargas")
destino = Path("organizado")

# Copiar un archivo
shutil.copy2("informe.pdf", destino / "pdfs" / "informe.pdf")
# copy2 preserva metadatos (fecha de modificación, etc.)

# Mover un archivo
shutil.move("borrador.docx", destino / "docs")

# Copiar un directorio completo
shutil.copytree(origen, destino / "backup")

# Eliminar un directorio completo (¡sin papelera de reciclaje!)
shutil.rmtree(destino / "temporal")

# Comprimir en ZIP
shutil.make_archive("backup_junio", "zip", "proyecto/")
# → genera backup_junio.zip
      `} />

      <Callout kind="warn" title="shutil.rmtree no tiene deshacer">
        {`rmtree elimina el directorio y todo su contenido sin pasar por la
papelera. Añade siempre una confirmación o prueba primero en modo
simulación (dry_run) antes de ejecutarlo en producción.`}
      </Callout>

      {/* ── Script organizador completo ── */}
      <h2>Script completo: organizar descargas</h2>

      <CodeBlock label="▸ local · python — organizar_descargas.py" code={`
import shutil
from pathlib import Path
from datetime import datetime

ORIGEN  = Path.home() / "Downloads"
DESTINO = Path.home() / "Downloads" / "_organizado"

REGLAS = {
    "Imágenes":    {".jpg", ".jpeg", ".png", ".gif", ".webp", ".svg"},
    "Documentos":  {".pdf", ".doc", ".docx", ".txt", ".md", ".odt"},
    "Hojas":       {".xls", ".xlsx", ".csv", ".ods"},
    "Vídeos":      {".mp4", ".mov", ".avi", ".mkv", ".webm"},
    "Música":      {".mp3", ".wav", ".flac", ".ogg", ".m4a"},
    "Comprimidos": {".zip", ".rar", ".7z", ".tar", ".gz"},
    "Código":      {".py", ".js", ".ts", ".html", ".css", ".json"},
}

def clasificar(extension):
    ext = extension.lower()
    for carpeta, extensiones in REGLAS.items():
        if ext in extensiones:
            return carpeta
    return "Otros"

def organizar(dry_run=True):
    movidos = 0
    for archivo in ORIGEN.iterdir():
        if archivo.is_file() and not archivo.name.startswith("."):
            carpeta = clasificar(archivo.suffix)
            destino = DESTINO / carpeta / archivo.name

            # Si ya existe, añade timestamp
            if destino.exists():
                ts = datetime.now().strftime("%Y%m%d_%H%M%S")
                destino = destino.with_stem(f"{destino.stem}_{ts}")

            print(f"  {'[DRY]' if dry_run else '[MV]'} {archivo.name} → {carpeta}/")
            if not dry_run:
                destino.parent.mkdir(parents=True, exist_ok=True)
                shutil.move(archivo, destino)
            movidos += 1

    print(f"\\n{movidos} archivos {'serían movidos' if dry_run else 'movidos'}.")

# Primero simula, luego ejecuta de verdad
organizar(dry_run=True)
# organizar(dry_run=False)
      `} />

      {/* ── subprocess ── */}
      <h2>subprocess — comandos del sistema</h2>

      <p>
        <code>subprocess</code> te permite ejecutar cualquier comando
        del sistema operativo desde Python y capturar su salida:
      </p>

      <CodeBlock label="▸ local · python" code={`
import subprocess

# Ejecutar un comando y capturar salida
resultado = subprocess.run(
    ["git", "log", "--oneline", "-5"],
    capture_output=True,
    text=True,
    check=True        # lanza excepción si el comando falla
)
print(resultado.stdout)

# Pasar datos a stdin
entrada = "uno\\ndos\\ntres\\n"
r = subprocess.run(["sort"], input=entrada, capture_output=True, text=True)
print(r.stdout)

# Ejecutar script Python externo
subprocess.run(["python", "mi_script.py", "--arg", "valor"], check=True)
      `} />

      <Callout kind="warn" title="Nunca uses shell=True con datos del usuario">
        {`subprocess.run(f"ls {carpeta}", shell=True) es vulnerable a
inyección de comandos si carpeta viene del usuario. Siempre pasa
los argumentos como lista: subprocess.run(["ls", str(carpeta)]).`}
      </Callout>

      {/* ── schedule ── */}
      <h2>schedule — tareas periódicas</h2>

      <CodeBlock label="terminal" lang="text" code={`pip install schedule`} />

      <CodeBlock label="▸ local · python — tarea_semanal.py" code={`
import schedule
import time
from datetime import datetime

def generar_informe():
    print(f"[{datetime.now():%H:%M}] Generando informe semanal...")
    # aquí va tu lógica: leer CSV, generar Excel, enviar email...

def limpiar_temporales():
    print(f"[{datetime.now():%H:%M}] Limpiando archivos temporales...")

def verificar_backups():
    print(f"[{datetime.now():%H:%M}] Verificando backups...")

# Definir el calendario
schedule.every().monday.at("08:00").do(generar_informe)
schedule.every().day.at("23:00").do(limpiar_temporales)
schedule.every(6).hours.do(verificar_backups)
schedule.every(30).minutes.do(lambda: print("Comprobando..."))

print("Planificador iniciado. Ctrl+C para detener.")
while True:
    schedule.run_pending()
    time.sleep(60)
      `} />

      {/* ── smtplib ── */}
      <h2>Enviar emails con smtplib</h2>

      <CodeBlock label="▸ local · python" code={`
import smtplib
import os
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from email.mime.base import MIMEBase
from email import encoders
from pathlib import Path

def enviar_email(destinatario, asunto, cuerpo, adjunto=None):
    remitente = os.environ["EMAIL_FROM"]
    password  = os.environ["EMAIL_PASSWORD"]

    msg = MIMEMultipart()
    msg["From"]    = remitente
    msg["To"]      = destinatario
    msg["Subject"] = asunto
    msg.attach(MIMEText(cuerpo, "plain", "utf-8"))

    if adjunto:
        ruta = Path(adjunto)
        with open(ruta, "rb") as f:
            parte = MIMEBase("application", "octet-stream")
            parte.set_payload(f.read())
        encoders.encode_base64(parte)
        parte.add_header("Content-Disposition", f"attachment; filename={ruta.name}")
        msg.attach(parte)

    with smtplib.SMTP_SSL("smtp.gmail.com", 465) as servidor:
        servidor.login(remitente, password)
        servidor.sendmail(remitente, destinatario, msg.as_string())
        print(f"Email enviado a {destinatario}")

# Envío masivo personalizado
clientes = [
    {"nombre": "Ana", "email": "ana@ejemplo.com", "factura": "FAC001.pdf"},
    {"nombre": "Luis", "email": "luis@ejemplo.com", "factura": "FAC002.pdf"},
]

for c in clientes:
    cuerpo = f"Hola {c['nombre']},\\n\\nAdjunto encontrarás tu factura.\\n\\nSaludos"
    enviar_email(c["email"], "Tu factura de junio", cuerpo, c["factura"])
      `} />

      <Callout kind="tip" title="Gmail: usa contraseñas de aplicación">
        {`Gmail no permite tu contraseña normal para SMTP.
Ve a Cuenta de Google → Seguridad → Verificación en 2 pasos → Contraseñas de aplicación.
Genera una y úsala como EMAIL_PASSWORD.`}
      </Callout>

      {/* ── openpyxl ── */}
      <h2>Excel con openpyxl</h2>

      <CodeBlock label="terminal" lang="text" code={`pip install openpyxl`} />

      <CodeBlock label="▸ local · python" code={`
from openpyxl import Workbook, load_workbook
from openpyxl.styles import Font, PatternFill, Alignment
from openpyxl.utils import get_column_letter

wb = Workbook()
ws = wb.active
ws.title = "Ventas Mayo"

# Cabecera con estilo
cabecera = ["Producto", "Unidades", "Precio", "Total"]
for col, texto in enumerate(cabecera, 1):
    celda = ws.cell(row=1, column=col, value=texto)
    celda.font = Font(bold=True, color="FFFFFF")
    celda.fill = PatternFill("solid", fgColor="1F4E5F")
    celda.alignment = Alignment(horizontal="center")

# Datos
filas = [
    ("Teclado mecánico", 15, 79.99),
    ("Monitor 27\"",      8, 349.00),
    ("Ratón inalámbrico", 32, 29.99),
]
for r, (producto, uds, precio) in enumerate(filas, 2):
    ws.cell(r, 1, producto)
    ws.cell(r, 2, uds)
    ws.cell(r, 3, precio)
    ws.cell(r, 4, f"=B{r}*C{r}")   # fórmula Excel

# Autoajustar anchos
for col in ws.columns:
    max_len = max(len(str(c.value or "")) for c in col)
    ws.column_dimensions[get_column_letter(col[0].column)].width = max_len + 4

wb.save("ventas_mayo.xlsx")
print("Excel generado: ventas_mayo.xlsx")
      `} />

      {/* ── Quiz ── */}
      <Quiz
        question="¿Cuál es la diferencia entre shutil.copy() y shutil.copy2()?"
        options={[
          "copy() es más rápido; copy2() comprueba si el archivo ya existe.",
          "copy() copia solo el contenido; copy2() también copia los metadatos como la fecha de modificación.",
          "copy2() permite copiar directorios; copy() solo archivos.",
          "No hay diferencia práctica entre las dos funciones.",
        ]}
        correct={1}
        explanation={"copy() copia el contenido y los permisos del archivo. copy2() hace lo mismo pero además preserva los metadatos del sistema de archivos como la fecha de última modificación — equivalente a cp -p en Unix."}
      />

      {/* ── Ejercicios ── */}
      <Exercise
        number={1}
        title="Clasifica archivos por extensión y fecha"
        difficulty="fácil"
        runner={{
          initial: `from pathlib import PurePath
from datetime import datetime, timedelta

# Lista simulada de archivos con fechas de modificación
archivos = [
    ("proyecto_final.py",    "2025-04-10"),
    ("foto_evento.jpg",      "2025-05-20"),
    ("presupuesto.xlsx",     "2025-03-15"),
    ("video_demo.mp4",       "2025-05-18"),
    ("notas.txt",            "2025-01-05"),
    ("datos_q1.csv",         "2025-04-25"),
    ("logo_empresa.png",     "2025-05-19"),
    ("script_backup.py",     "2025-02-28"),
    ("informe_anual.pdf",    "2025-05-01"),
    ("cancion.mp3",          "2025-03-30"),
]

TIPOS = {
    ".py":   "Código",
    ".txt":  "Texto",
    ".csv":  "Datos",
    ".pdf":  "Documentos",
    ".xlsx": "Documentos",
    ".jpg":  "Imágenes",
    ".png":  "Imágenes",
    ".mp4":  "Vídeos",
    ".mp3":  "Música",
}

hoy = datetime(2025, 5, 23)

print("Clasificación por tipo y antigüedad:\\n")
por_tipo = {}

for nombre, fecha_str in archivos:
    p       = PurePath(nombre)
    ext     = p.suffix.lower()
    tipo    = TIPOS.get(ext, "Otros")
    fecha   = datetime.fromisoformat(fecha_str)
    dias    = (hoy - fecha).days
    reciente = "🟢 reciente" if dias <= 30 else ("🟡 este año" if dias <= 180 else "🔴 antiguo")

    if tipo not in por_tipo:
        por_tipo[tipo] = []
    por_tipo[tipo].append((nombre, dias, reciente))

for tipo, lista in sorted(por_tipo.items()):
    print(f"  {tipo}:")
    for nombre, dias, estado in lista:
        print(f"    {estado}  {nombre} ({dias} días)")
`,
          hint: 'datetime.fromisoformat() convierte "2025-05-20" en un objeto datetime. La diferencia entre dos datetimes da un timedelta con .days.'
        }}
      >
        <p>
          Clasifica una lista de archivos por tipo y detecta cuáles son
          recientes, de este año o antiguos según su fecha de modificación.
        </p>
      </Exercise>

      <Exercise
        number={2}
        title="Renombrado masivo con patrón"
        difficulty="fácil"
        runner={{
          initial: `from pathlib import PurePath
import re

# Archivos descargados con nombres caóticos de la cámara
archivos = [
    "IMG_20250315_142301.jpg",
    "IMG_20250316_091522.jpg",
    "VID_20250315_180045.mp4",
    "IMG_20250401_120000.jpg",
    "Screenshot_20250520_093012.png",
    "IMG_20250401_135522.jpg",
]

def nuevo_nombre(original):
    p = PurePath(original)
    nombre = p.stem
    ext    = p.suffix

    # Extraer fecha del nombre (formato YYYYMMDD)
    m = re.search(r"(\\d{4})(\\d{2})(\\d{2})_(\\d{2})(\\d{2})(\\d{2})", nombre)
    if not m:
        return original

    anyo, mes, dia, hora, minuto, _ = m.groups()
    tipo = "foto" if ext.lower() in (".jpg",".jpeg",".png") else "video"
    return f"{anyo}-{mes}-{dia}_{hora}{minuto}_{tipo}{ext}"

print("Plan de renombrado:\\n")
for original in archivos:
    nuevo = nuevo_nombre(original)
    cambio = "→" if nuevo != original else "="
    print(f"  {original}")
    print(f"  {cambio} {nuevo}\\n")
`,
          hint: 'Los grupos de captura en regex (\\d{4}) permiten extraer partes de la cadena con m.groups().'
        }}
      >
        <p>
          Genera un plan de renombrado para fotos y vídeos de cámara,
          convirtiendo nombres caóticos a un formato legible por fecha.
        </p>
      </Exercise>

      <Exercise
        number={3}
        title="Analiza un log de servidor"
        difficulty="media"
        runner={{
          initial: `import re
from collections import Counter
from datetime import datetime

# Fragmento de log de servidor web (formato Apache Combined)
log = """
192.168.1.10 - - [20/May/2025:10:32:15] "GET /index.html HTTP/1.1" 200 2048
10.0.0.5 - - [20/May/2025:10:32:18] "GET /api/datos HTTP/1.1" 200 512
192.168.1.15 - - [20/May/2025:10:32:20] "POST /login HTTP/1.1" 401 128
192.168.1.10 - - [20/May/2025:10:32:22] "GET /api/datos HTTP/1.1" 200 512
10.0.0.8 - - [20/May/2025:10:32:25] "GET /pagina-no-existe HTTP/1.1" 404 256
192.168.1.10 - - [20/May/2025:10:32:30] "GET /api/usuarios HTTP/1.1" 200 1024
10.0.0.5 - - [20/May/2025:10:32:35] "DELETE /api/datos/42 HTTP/1.1" 403 64
192.168.1.15 - - [20/May/2025:10:32:40] "POST /login HTTP/1.1" 401 128
10.0.0.8 - - [20/May/2025:10:32:45] "GET /robots.txt HTTP/1.1" 404 64
192.168.1.20 - - [20/May/2025:10:32:50] "GET /admin HTTP/1.1" 403 128
""".strip().splitlines()

patron = re.compile(
    r'(\\S+) .+ "\\w+ (\\S+) .+" (\\d{3}) (\\d+)'
)

ips      = Counter()
rutas    = Counter()
codigos  = Counter()
total_bytes = 0

for linea in log:
    m = patron.match(linea)
    if m:
        ip, ruta, codigo, bytes_ = m.groups()
        ips[ip] += 1
        rutas[ruta] += 1
        codigos[codigo] += 1
        total_bytes += int(bytes_)

print(f"Total peticiones: {len(log)}")
print(f"Datos transferidos: {total_bytes:,} bytes")

print("\\nCódigos de respuesta:")
for codigo, n in sorted(codigos.items()):
    print(f"  {codigo}: {n} peticiones")

print("\\nIPs más activas:")
for ip, n in ips.most_common(3):
    print(f"  {ip}: {n} peticiones")

errores_4xx = [l for l in log if '" 4' in l]
print(f"\\nErrores 4xx: {len(errores_4xx)}")
`,
          hint: 'Counter.most_common(n) devuelve los n elementos más frecuentes — no necesitas ordenar manualmente.'
        }}
      >
        <p>
          Parsea un log de servidor con regex, cuenta peticiones por IP
          y código de respuesta, y detecta patrones sospechosos.
        </p>
      </Exercise>

      <Exercise
        number={4}
        title="Generador de informes en texto"
        difficulty="media"
        runner={{
          initial: `from datetime import datetime, date

# Datos de ventas del mes
ventas = [
    {"dia": 1,  "producto": "Teclado",  "uds": 5,  "precio": 79.99},
    {"dia": 1,  "producto": "Ratón",    "uds": 12, "precio": 29.99},
    {"dia": 3,  "producto": "Monitor",  "uds": 2,  "precio": 349.00},
    {"dia": 5,  "producto": "Teclado",  "uds": 8,  "precio": 79.99},
    {"dia": 5,  "producto": "Auricular","uds": 6,  "precio": 89.99},
    {"dia": 8,  "producto": "Ratón",    "uds": 15, "precio": 29.99},
    {"dia": 10, "producto": "Monitor",  "uds": 3,  "precio": 349.00},
    {"dia": 12, "producto": "Teclado",  "uds": 4,  "precio": 79.99},
]

def calcular_total(v):
    return v["uds"] * v["precio"]

# Agrupar por producto
por_producto = {}
for v in ventas:
    p = v["producto"]
    if p not in por_producto:
        por_producto[p] = {"uds": 0, "ingresos": 0.0}
    por_producto[p]["uds"]      += v["uds"]
    por_producto[p]["ingresos"] += calcular_total(v)

total_general = sum(calcular_total(v) for v in ventas)

# Generar informe
lineas = [
    "=" * 50,
    "INFORME DE VENTAS — MAYO 2025",
    f"Generado: {datetime.now():%d/%m/%Y %H:%M}",
    "=" * 50,
    "",
    f"{'PRODUCTO':<15} {'UDS':>6} {'INGRESOS':>12} {'%TOTAL':>8}",
    "-" * 50,
]

for prod, datos in sorted(por_producto.items(), key=lambda x: -x[1]["ingresos"]):
    pct = datos["ingresos"] / total_general * 100
    lineas.append(
        f"{prod:<15} {datos['uds']:>6} {datos['ingresos']:>11,.2f}€ {pct:>7.1f}%"
    )

lineas += [
    "-" * 50,
    f"{'TOTAL':<15} {'':>6} {total_general:>11,.2f}€",
    "",
    "FIN DEL INFORME",
]

informe = "\\n".join(lineas)
print(informe)
`,
          hint: 'f"{valor:<15}" alinea a la izquierda en 15 caracteres; {:>12,.2f} alinea a la derecha con separador de miles y 2 decimales.'
        }}
      >
        <p>
          Genera un informe de ventas formateado en texto plano que podría
          guardarse en un archivo o enviarse por email.
        </p>
      </Exercise>

      <Exercise
        number={5}
        title="Sistema de backup inteligente"
        difficulty="difícil"
        runner={{
          initial: `from pathlib import PurePath
from datetime import datetime, timedelta
import hashlib

# Simular un sistema de backup que evita copias duplicadas

def hash_simulado(nombre):
    # En producción usarías hashlib.md5(open(f,'rb').read()).hexdigest()
    return hashlib.md5(nombre.encode()).hexdigest()[:8]

# Estado actual del backup (archivos ya respaldados con su hash)
backup_existente = {
    "informe_enero.pdf":  "a1b2c3d4",
    "datos_clientes.csv": "e5f6g7h8",
    "logo.png":           "i9j0k1l2",
}

# Archivos actuales en el proyecto
archivos_actuales = [
    ("informe_enero.pdf",   "a1b2c3d4"),   # sin cambios
    ("datos_clientes.csv",  "NUEVO_HASH"),  # modificado
    ("logo.png",            "i9j0k1l2"),   # sin cambios
    ("informe_febrero.pdf", "m3n4o5p6"),   # nuevo
    ("script.py",           "q7r8s9t0"),   # nuevo
    ("borrador.txt",        "u1v2w3x4"),   # nuevo
]

print("Análisis de backup:\\n")

a_copiar   = []
sin_cambios = []

for nombre, hash_actual in archivos_actuales:
    hash_guardado = backup_existente.get(nombre)

    if hash_guardado is None:
        a_copiar.append((nombre, "NUEVO"))
    elif hash_guardado != hash_actual:
        a_copiar.append((nombre, "MODIFICADO"))
    else:
        sin_cambios.append(nombre)

print(f"Sin cambios ({len(sin_cambios)}):")
for f in sin_cambios:
    print(f"  ✓ {f}")

print(f"\\nA respaldar ({len(a_copiar)}):")
for nombre, motivo in a_copiar:
    print(f"  → {nombre}  [{motivo}]")

# En producción: shutil.copy2(origen/nombre, destino/nombre)
print(f"\\nTotal: {len(a_copiar)} archivos a copiar, {len(sin_cambios)} omitidos")
ts = datetime.now().strftime("%Y%m%d_%H%M")
print(f"Nombre del backup: backup_{ts}.zip")
`,
          hint: 'Comparar hashes MD5 es la forma estándar de detectar si un archivo cambió sin comparar byte a byte.'
        }}
      >
        <p>
          Implementa la lógica de un sistema de backup incremental que solo
          copia archivos nuevos o modificados, usando hashes para detectar cambios.
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
          <li><strong>pathlib.rglob()</strong> — busca archivos recursivamente por patrón.</li>
          <li><strong>shutil</strong> — copy2, move, copytree, rmtree, make_archive.</li>
          <li><strong>subprocess.run()</strong> — ejecuta comandos; siempre como lista, nunca con shell=True y datos externos.</li>
          <li><strong>schedule</strong> — tareas periódicas sin depender del cron del sistema.</li>
          <li><strong>smtplib + MIME</strong> — emails con adjuntos; usa variables de entorno para credenciales.</li>
          <li><strong>openpyxl</strong> — crea y modifica Excel con estilos y fórmulas desde Python.</li>
          <li>Añade siempre un <strong>dry_run</strong> antes de ejecutar operaciones destructivas.</li>
        </ul>
      </div>

      <PullQuote>
        El mejor programador no es el que más rápido teclea —
        es el que hace que la máquina teclee por él.
      </PullQuote>

      <ChapterNav
        prev={prev ? { id: prev.id, title: prev.title } : null}
        next={next ? { id: next.id, title: next.title } : null}
        onNav={onNav}
      />
    </article>
  );
}

window.ChapterL3M5 = ChapterL3M5;
