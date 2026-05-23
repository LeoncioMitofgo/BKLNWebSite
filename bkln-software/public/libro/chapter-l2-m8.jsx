// =============================================================
// chapter-l2-m8.jsx — Libro 2, Módulo 8: Proyecto final intermedio
// =============================================================

function ChapterL2M8({ onNav }) {
  return (
    <article className="reader-inner">
      <ChapterHeader
        book="// libro 2 · programando con estructura"
        module="módulo 08 · proyecto final"
        time="≈ 90 min"
        title={<><em>TaskFlow</em> — Gestor de proyectos</>}
        dek="El proyecto final del Libro 2 integra todo lo que has aprendido: POO, errores, archivos, módulos, comprensiones y generadores — en un sistema real y funcional."
      />

      <p>
        Has llegado al final del Libro 2. A lo largo de estos módulos has construido
        una caja de herramientas poderosa: clases, excepciones propias, archivos JSON,
        módulos, comprensiones, generadores. Ahora toca usarlas todas juntas.
      </p>

      <p>
        El proyecto se llama <strong>TaskFlow</strong>: un gestor de proyectos y tareas
        que funciona desde Python. Podrás crear proyectos, añadir tareas, asignarlas
        a personas, filtrar por estado y exportar reportes en JSON y texto.
      </p>

      <div style={{
        background: 'var(--paper-2)',
        border: '1px solid var(--border-soft)',
        borderRadius: 'var(--r-md)',
        padding: 'var(--s-5) var(--s-6)',
        margin: 'var(--s-5) 0',
      }}>
        <div className="eyebrow" style={{ marginBottom: 'var(--s-3)' }}>// qué vamos a construir</div>
        <ul style={{ paddingLeft: '1.2em', margin: 0, lineHeight: 2 }}>
          <li><strong>Clases:</strong> <code>Tarea</code>, <code>Proyecto</code>, <code>TaskFlow</code> — con atributos, métodos y dunder methods.</li>
          <li><strong>Excepciones propias:</strong> <code>TareaNoEncontradaError</code>, <code>ProyectoNoEncontradoError</code>.</li>
          <li><strong>Archivos JSON:</strong> guardar y cargar el estado completo del sistema.</li>
          <li><strong>Comprensiones:</strong> filtrar tareas por estado, prioridad o asignado.</li>
          <li><strong>Generadores:</strong> producir reportes línea a línea.</li>
          <li><strong>Módulo propio:</strong> función <code>main()</code> con <code>if __name__ == "__main__"</code>.</li>
        </ul>
      </div>

      <h2>Fase 1 — Las excepciones</h2>

      <p>
        Empezamos por las excepciones propias. Son la base del sistema de errores
        y hay que definirlas antes que el resto:
      </p>

      <CodeBlock code={`# excepciones.py

class ErrorTaskFlow(Exception):
    """Excepción base del sistema."""
    pass

class TareaNoEncontradaError(ErrorTaskFlow):
    def __init__(self, tarea_id):
        self.tarea_id = tarea_id
        super().__init__(f"Tarea '{tarea_id}' no encontrada.")

class ProyectoNoEncontradoError(ErrorTaskFlow):
    def __init__(self, nombre):
        self.nombre = nombre
        super().__init__(f"Proyecto '{nombre}' no encontrado.")

class EstadoInvalidoError(ErrorTaskFlow):
    ESTADOS_VALIDOS = ("pendiente", "en_progreso", "completada", "cancelada")
    def __init__(self, estado):
        super().__init__(
            f"Estado '{estado}' no válido. "
            f"Usa: {self.ESTADOS_VALIDOS}"
        )`} />

      <h2>Fase 2 — La clase Tarea</h2>

      <CodeBlock code={`# tarea.py
from datetime import date

ESTADOS   = ("pendiente", "en_progreso", "completada", "cancelada")
PRIORIDADES = ("baja", "media", "alta", "crítica")

class Tarea:
    _contador = 0   # atributo de clase para generar IDs únicos

    def __init__(self, titulo, descripcion="", prioridad="media", asignado=None):
        if not titulo.strip():
            raise ValueError("El título de la tarea no puede estar vacío.")
        if prioridad not in PRIORIDADES:
            raise ValueError(f"Prioridad '{prioridad}' no válida.")

        Tarea._contador += 1
        self.id          = f"T{Tarea._contador:03d}"
        self.titulo      = titulo.strip()
        self.descripcion = descripcion
        self.prioridad   = prioridad
        self.asignado    = asignado
        self.estado      = "pendiente"
        self.creada      = date.today()
        self.completada  = None

    def cambiar_estado(self, nuevo_estado):
        if nuevo_estado not in ESTADOS:
            raise EstadoInvalidoError(nuevo_estado)
        self.estado = nuevo_estado
        if nuevo_estado == "completada":
            self.completada = date.today()

    def asignar(self, persona):
        self.asignado = persona

    @property
    def esta_completada(self):
        return self.estado == "completada"

    def a_dict(self):
        return {
            "id":          self.id,
            "titulo":      self.titulo,
            "descripcion": self.descripcion,
            "prioridad":   self.prioridad,
            "asignado":    self.asignado,
            "estado":      self.estado,
            "creada":      str(self.creada),
            "completada":  str(self.completada) if self.completada else None,
        }

    def __str__(self):
        asig = f" → {self.asignado}" if self.asignado else ""
        return f"[{self.id}] {self.titulo} [{self.prioridad.upper()}] {self.estado}{asig}"

    def __repr__(self):
        return f"Tarea(id={self.id!r}, titulo={self.titulo!r})"

    def __eq__(self, otra):
        return isinstance(otra, Tarea) and self.id == otra.id`} />

      <h2>Fase 3 — La clase Proyecto</h2>

      <CodeBlock code={`# proyecto.py

class Proyecto:
    def __init__(self, nombre, descripcion=""):
        if not nombre.strip():
            raise ValueError("El nombre del proyecto no puede estar vacío.")
        self.nombre      = nombre.strip()
        self.descripcion = descripcion
        self._tareas     = {}    # id → Tarea

    # ── añadir y buscar ──────────────────────────────────────
    def añadir_tarea(self, tarea):
        self._tareas[tarea.id] = tarea

    def obtener_tarea(self, tarea_id):
        if tarea_id not in self._tareas:
            raise TareaNoEncontradaError(tarea_id)
        return self._tareas[tarea_id]

    def eliminar_tarea(self, tarea_id):
        if tarea_id not in self._tareas:
            raise TareaNoEncontradaError(tarea_id)
        return self._tareas.pop(tarea_id)

    # ── filtros con comprensiones ─────────────────────────────
    @property
    def todas(self):
        return list(self._tareas.values())

    def por_estado(self, estado):
        return [t for t in self._tareas.values() if t.estado == estado]

    def por_prioridad(self, prioridad):
        return [t for t in self._tareas.values() if t.prioridad == prioridad]

    def por_asignado(self, persona):
        return [t for t in self._tareas.values() if t.asignado == persona]

    # ── estadísticas ─────────────────────────────────────────
    @property
    def progreso(self):
        if not self._tareas:
            return 0.0
        completadas = sum(1 for t in self._tareas.values() if t.esta_completada)
        return (completadas / len(self._tareas)) * 100

    @property
    def resumen(self):
        from collections import Counter
        estados = Counter(t.estado for t in self._tareas.values())
        return dict(estados)

    # ── serialización ─────────────────────────────────────────
    def a_dict(self):
        return {
            "nombre":      self.nombre,
            "descripcion": self.descripcion,
            "tareas":      [t.a_dict() for t in self._tareas.values()],
        }

    def __len__(self):
        return len(self._tareas)

    def __str__(self):
        return f"Proyecto '{self.nombre}' — {len(self)} tareas — {self.progreso:.0f}% completado"`} />

      <h2>Fase 4 — El sistema principal: TaskFlow</h2>

      <CodeBlock code={`# taskflow.py
import json
from pathlib import Path

class TaskFlow:
    def __init__(self, archivo="taskflow.json"):
        self._proyectos = {}
        self._archivo   = Path(archivo)
        if self._archivo.exists():
            self.cargar()

    # ── proyectos ────────────────────────────────────────────
    def crear_proyecto(self, nombre, descripcion=""):
        if nombre in self._proyectos:
            raise ValueError(f"El proyecto '{nombre}' ya existe.")
        self._proyectos[nombre] = Proyecto(nombre, descripcion)
        print(f"✓ Proyecto creado: {nombre}")
        return self._proyectos[nombre]

    def obtener_proyecto(self, nombre):
        if nombre not in self._proyectos:
            raise ProyectoNoEncontradoError(nombre)
        return self._proyectos[nombre]

    def eliminar_proyecto(self, nombre):
        if nombre not in self._proyectos:
            raise ProyectoNoEncontradoError(nombre)
        del self._proyectos[nombre]
        print(f"✗ Proyecto eliminado: {nombre}")

    # ── persistencia ─────────────────────────────────────────
    def guardar(self):
        datos = {nombre: p.a_dict() for nombre, p in self._proyectos.items()}
        self._archivo.write_text(
            json.dumps(datos, indent=2, ensure_ascii=False),
            encoding="utf-8"
        )
        print(f"💾 Guardado en {self._archivo}")

    def cargar(self):
        datos = json.loads(self._archivo.read_text(encoding="utf-8"))
        for nombre, p_data in datos.items():
            p = Proyecto(p_data["nombre"], p_data.get("descripcion", ""))
            for t_data in p_data.get("tareas", []):
                t = Tarea(t_data["titulo"], t_data.get("descripcion",""),
                          t_data.get("prioridad","media"), t_data.get("asignado"))
                t.id     = t_data["id"]
                t.estado = t_data["estado"]
                p.añadir_tarea(t)
            self._proyectos[nombre] = p
        print(f"📂 Cargado desde {self._archivo}")

    # ── reportes con generadores ──────────────────────────────
    def generar_reporte(self, nombre_proyecto):
        p = self.obtener_proyecto(nombre_proyecto)
        yield f"{'='*50}"
        yield f"REPORTE: {p.nombre}"
        yield f"{'='*50}"
        yield f"Descripción : {p.descripcion or '—'}"
        yield f"Tareas      : {len(p)}"
        yield f"Progreso    : {p.progreso:.1f}%"
        yield f"Estado      : {p.resumen}"
        yield f"{'─'*50}"
        prioridad_orden = {"crítica": 0, "alta": 1, "media": 2, "baja": 3}
        for tarea in sorted(p.todas, key=lambda t: prioridad_orden[t.prioridad]):
            yield str(tarea)
        yield f"{'='*50}"

    def reporte_global(self):
        yield f"{'='*50}"
        yield f"TASKFLOW — REPORTE GLOBAL"
        yield f"Proyectos activos: {len(self._proyectos)}"
        yield f"{'='*50}"
        for nombre, p in self._proyectos.items():
            yield f"  {p}"
            resumen = p.resumen
            for estado, n in resumen.items():
                yield f"    {estado:<15} {n} tarea(s)"
        yield f"{'='*50}"

    # ── búsqueda global ───────────────────────────────────────
    def buscar_tareas(self, termino):
        termino = termino.lower()
        return [
            (nombre_p, t)
            for nombre_p, p in self._proyectos.items()
            for t in p.todas
            if termino in t.titulo.lower() or termino in (t.asignado or "").lower()
        ]

    def __len__(self):
        return len(self._proyectos)

    def __str__(self):
        return f"TaskFlow — {len(self)} proyecto(s)"`} />

      <h2>Fase 5 — El programa completo</h2>

      <p>
        Aquí está todo junto, ejecutable. Puedes modificar los datos y ver cómo
        interactúan todas las partes del sistema:
      </p>

      <PyRunner
        initial={`# ══════════════════════════════════════════════════════
# TaskFlow — Gestor de proyectos y tareas
# Proyecto final · Libro 2
# ══════════════════════════════════════════════════════

import json
from datetime import date
from collections import Counter

# ── Excepciones ───────────────────────────────────────

class ErrorTaskFlow(Exception): pass

class TareaNoEncontradaError(ErrorTaskFlow):
    def __init__(self, tid): super().__init__(f"Tarea '{tid}' no encontrada.")

class ProyectoNoEncontradoError(ErrorTaskFlow):
    def __init__(self, n): super().__init__(f"Proyecto '{n}' no encontrado.")

# ── Tarea ─────────────────────────────────────────────

ESTADOS     = ("pendiente", "en_progreso", "completada", "cancelada")
PRIORIDADES = ("baja", "media", "alta", "crítica")

class Tarea:
    _contador = 0

    def __init__(self, titulo, prioridad="media", asignado=None):
        Tarea._contador += 1
        self.id        = f"T{Tarea._contador:03d}"
        self.titulo    = titulo.strip()
        self.prioridad = prioridad
        self.asignado  = asignado
        self.estado    = "pendiente"
        self.creada    = date.today()

    def avanzar(self):
        pasos = {"pendiente": "en_progreso", "en_progreso": "completada"}
        self.estado = pasos.get(self.estado, self.estado)

    @property
    def completa(self): return self.estado == "completada"

    def a_dict(self):
        return {"id": self.id, "titulo": self.titulo,
                "prioridad": self.prioridad, "asignado": self.asignado,
                "estado": self.estado}

    def __str__(self):
        icono = {"pendiente": "○", "en_progreso": "◑", "completada": "●", "cancelada": "✗"}
        asig  = f" @{self.asignado}" if self.asignado else ""
        return f"  {icono.get(self.estado,'?')} [{self.id}] {self.titulo:<28} [{self.prioridad}]{asig}"

# ── Proyecto ──────────────────────────────────────────

class Proyecto:
    def __init__(self, nombre, descripcion=""):
        self.nombre      = nombre
        self.descripcion = descripcion
        self._tareas     = {}

    def añadir(self, tarea):
        self._tareas[tarea.id] = tarea
        return tarea

    def obtener(self, tid):
        if tid not in self._tareas: raise TareaNoEncontradaError(tid)
        return self._tareas[tid]

    def por_estado(self, estado):
        return [t for t in self._tareas.values() if t.estado == estado]

    def por_asignado(self, persona):
        return [t for t in self._tareas.values() if t.asignado == persona]

    @property
    def progreso(self):
        if not self._tareas: return 0.0
        return sum(1 for t in self._tareas.values() if t.completa) / len(self._tareas) * 100

    @property
    def todas(self): return list(self._tareas.values())

    def resumen_estados(self):
        return dict(Counter(t.estado for t in self._tareas.values()))

    def reporte(self):
        orden = {"crítica": 0, "alta": 1, "media": 2, "baja": 3}
        yield f"  Proyecto: {self.nombre}  |  {self.progreso:.0f}% completado"
        yield f"  {'─'*46}"
        for t in sorted(self._tareas.values(), key=lambda x: orden[x.prioridad]):
            yield str(t)
        for estado, n in self.resumen_estados().items():
            yield f"  {'':>4}{estado}: {n}"

    def a_dict(self):
        return {"nombre": self.nombre, "descripcion": self.descripcion,
                "tareas": [t.a_dict() for t in self._tareas.values()]}

    def __len__(self): return len(self._tareas)
    def __str__(self): return f"Proyecto '{self.nombre}' — {len(self)} tareas ({self.progreso:.0f}%)"

# ── TaskFlow ──────────────────────────────────────────

class TaskFlow:
    def __init__(self):
        self._proyectos = {}

    def nuevo_proyecto(self, nombre, desc=""):
        p = Proyecto(nombre, desc)
        self._proyectos[nombre] = p
        return p

    def proyecto(self, nombre):
        if nombre not in self._proyectos: raise ProyectoNoEncontradoError(nombre)
        return self._proyectos[nombre]

    def buscar(self, termino):
        t = termino.lower()
        return [(pn, ta) for pn, p in self._proyectos.items()
                for ta in p.todas if t in ta.titulo.lower() or t in (ta.asignado or "").lower()]

    def reporte_global(self):
        yield "╔" + "═"*48 + "╗"
        yield f"║{'TASKFLOW — REPORTE GLOBAL':^48}║"
        yield "╠" + "═"*48 + "╣"
        for p in self._proyectos.values():
            yield from p.reporte()
            yield "╠" + "─"*48 + "╣"
        yield "╚" + "═"*48 + "╝"

    def exportar_json(self):
        return json.dumps({n: p.a_dict() for n, p in self._proyectos.items()},
                          indent=2, ensure_ascii=False)

# ══════════════════════════════════════════════════════
# DEMO — usa el sistema
# ══════════════════════════════════════════════════════

tf = TaskFlow()

# Crear proyectos
web  = tf.nuevo_proyecto("Web BKLN", "Sitio web corporativo v2")
app  = tf.nuevo_proyecto("App Móvil", "App Android para clientes")

# Añadir tareas al proyecto web
web.añadir(Tarea("Diseño de wireframes",      "alta",    "Ana"))
web.añadir(Tarea("Maquetación HTML/CSS",      "alta",    "Luis"))
web.añadir(Tarea("Integración con Supabase",  "crítica", "Ana"))
web.añadir(Tarea("SEO y metadatos",           "media",   "Sofía"))
web.añadir(Tarea("Testing de formularios",    "media",   "Luis"))
web.añadir(Tarea("Optimización de imágenes",  "baja",    "Sofía"))

# Añadir tareas a la app
app.añadir(Tarea("Diseño de pantallas",       "alta",    "Ana"))
app.añadir(Tarea("API de autenticación",      "crítica", "Carlos"))
app.añadir(Tarea("Pantalla de inicio",        "alta",    "Luis"))
app.añadir(Tarea("Tests de integración",      "media",   "Carlos"))

# Simular progreso
web.obtener("T001").avanzar()   # wireframes → en progreso
web.obtener("T001").avanzar()   # → completada
web.obtener("T002").avanzar()   # HTML → en progreso
web.obtener("T003").avanzar()   # Supabase → en progreso
app.obtener("T007").avanzar()   # Diseño → en progreso
app.obtener("T007").avanzar()   # → completada
app.obtener("T009").avanzar()   # Inicio → en progreso

# ── Reporte global ────────────────────────────────────
for linea in tf.reporte_global():
    print(linea)

# ── Filtros ───────────────────────────────────────────
print("\\nTareas pendientes en Web BKLN:")
for t in web.por_estado("pendiente"):
    print(t)

print("\\nTareas de Ana (todos los proyectos):")
for proyecto_nombre, tarea in tf.buscar("Ana"):
    print(f"  [{proyecto_nombre}] {tarea.titulo} — {tarea.estado}")

# ── Estadísticas ──────────────────────────────────────
print("\\nResumen de estados por proyecto:")
for nombre, p in tf._proyectos.items():
    print(f"  {nombre}: {p.resumen_estados()}")

# ── Exportar JSON ─────────────────────────────────────
datos_json = tf.exportar_json()
print(f"\\nJSON generado: {len(datos_json)} caracteres")
print(datos_json[:300] + "...")`}
      />

      <h2>Desafíos de ampliación</h2>

      <p style={{ color: 'var(--ink-2)' }}>
        El proyecto base funciona. Estos desafíos te llevan más allá —
        cada uno añade una capa real de funcionalidad.
      </p>

      <Exercise
        number="8.1"
        title="Fechas límite y alertas"
        difficulty="media"
        runner={{
          initial: `# Añade a la clase Tarea un atributo "fecha_limite" (date o None).
# Implementa una propiedad "vencida" que devuelva True si:
#   - tiene fecha_limite
#   - la fecha ya pasó
#   - la tarea no está completada
#
# Añade al Proyecto un método "vencidas()" que devuelva
# todas las tareas vencidas ordenadas por fecha_limite.
#
# Y una función "alerta_vencidas(proyecto)" que imprima
# un resumen de tareas vencidas con cuántos días llevan de retraso.

from datetime import date

class Tarea:
    _contador = 0
    def __init__(self, titulo, prioridad="media", fecha_limite=None):
        Tarea._contador += 1
        self.id           = f"T{Tarea._contador:03d}"
        self.titulo       = titulo
        self.prioridad    = prioridad
        self.estado       = "pendiente"
        self.fecha_limite = fecha_limite  # date o None

    # Añade aquí la propiedad "vencida"

`,
          hint: 'vencida: return self.fecha_limite is not None and self.fecha_limite < date.today() and self.estado != "completada". retraso: (date.today() - t.fecha_limite).days. Ordena con sorted(..., key=lambda t: t.fecha_limite).',
          solution: {
            code: `from datetime import date, timedelta

class Tarea:
    _contador = 0
    def __init__(self, titulo, prioridad="media", fecha_limite=None):
        Tarea._contador += 1
        self.id           = f"T{Tarea._contador:03d}"
        self.titulo       = titulo
        self.prioridad    = prioridad
        self.estado       = "pendiente"
        self.fecha_limite = fecha_limite

    @property
    def vencida(self):
        return (self.fecha_limite is not None
                and self.fecha_limite < date.today()
                and self.estado != "completada")

    @property
    def dias_retraso(self):
        if not self.vencida: return 0
        return (date.today() - self.fecha_limite).days

    def __str__(self):
        venc = f" ⚠ {self.dias_retraso}d de retraso" if self.vencida else ""
        lim  = f" (límite: {self.fecha_limite})" if self.fecha_limite else ""
        return f"  [{self.id}] {self.titulo}{lim}{venc}"


class Proyecto:
    def __init__(self, nombre):
        self.nombre  = nombre
        self._tareas = {}

    def añadir(self, t): self._tareas[t.id] = t; return t

    def vencidas(self):
        return sorted(
            [t for t in self._tareas.values() if t.vencida],
            key=lambda t: t.fecha_limite
        )


def alerta_vencidas(proyecto):
    venc = proyecto.vencidas()
    if not venc:
        print(f"✓ {proyecto.nombre}: sin tareas vencidas.")
        return
    print(f"⚠ {proyecto.nombre}: {len(venc)} tarea(s) vencida(s):")
    for t in venc:
        print(t)


# Prueba
hoy  = date.today()
ayer = hoy - timedelta(days=1)
hace3 = hoy - timedelta(days=3)
man  = hoy + timedelta(days=1)

p = Proyecto("Demo")
p.añadir(Tarea("Tarea urgente",    "crítica", hace3))
p.añadir(Tarea("Tarea de ayer",    "alta",    ayer))
p.añadir(Tarea("Tarea de mañana",  "media",   man))
p.añadir(Tarea("Sin fecha",        "baja"))

alerta_vencidas(p)`,
            explanation: 'La propiedad vencida usa tres condiciones con and: tiene fecha límite AND ya pasó AND no está completa. timedelta permite sumar y restar días a una fecha. sorted con key=lambda t: t.fecha_limite ordena por fecha (los date se comparan naturalmente en Python).',
          },
        }}
      >
        <p>Añade fechas límite y un sistema de alertas de tareas vencidas.</p>
      </Exercise>

      <Exercise
        number="8.2"
        title="Historial de cambios"
        difficulty="media"
        runner={{
          initial: `# Añade a la clase Tarea un historial de cambios.
# Cada vez que cambie el estado o el asignado, guarda:
#   {"fecha": hoy, "campo": "estado", "anterior": "pendiente", "nuevo": "en_progreso"}
#
# Implementa:
#   - tarea.historial  → lista de cambios
#   - tarea.ver_historial() → imprime el historial de forma legible
#   - decorador "registrar_cambio(campo)" que añade automáticamente
#     la entrada al historial antes de ejecutar el método

from datetime import date
from functools import wraps

`,
          hint: 'El decorador registrar_cambio(campo) debe: 1) guardar el valor anterior con getattr(self, campo), 2) ejecutar la función, 3) guardar el nuevo valor y añadir al historial. Hazlo como closure: def registrar_cambio(campo): def decorador(func): @wraps(func) def wrapper(self, *args): ...',
          solution: {
            code: `from datetime import date
from functools import wraps

def registrar_cambio(campo):
    def decorador(func):
        @wraps(func)
        def wrapper(self, *args, **kwargs):
            anterior = getattr(self, campo, None)
            resultado = func(self, *args, **kwargs)
            nuevo = getattr(self, campo, None)
            if anterior != nuevo:
                self._historial.append({
                    "fecha":    str(date.today()),
                    "campo":    campo,
                    "anterior": anterior,
                    "nuevo":    nuevo,
                })
            return resultado
        return wrapper
    return decorador


class Tarea:
    _contador = 0
    def __init__(self, titulo, prioridad="media"):
        Tarea._contador += 1
        self.id         = f"T{Tarea._contador:03d}"
        self.titulo     = titulo
        self.prioridad  = prioridad
        self.estado     = "pendiente"
        self.asignado   = None
        self._historial = []

    @registrar_cambio("estado")
    def cambiar_estado(self, nuevo):
        self.estado = nuevo

    @registrar_cambio("asignado")
    def asignar(self, persona):
        self.asignado = persona

    def ver_historial(self):
        if not self._historial:
            print(f"[{self.id}] Sin cambios registrados.")
            return
        print(f"Historial de {self.titulo}:")
        for h in self._historial:
            print(f"  {h['fecha']} | {h['campo']}: '{h['anterior']}' → '{h['nuevo']}'")

    @property
    def historial(self): return list(self._historial)


t = Tarea("Desarrollar API de usuarios", "alta")
t.asignar("Ana")
t.cambiar_estado("en_progreso")
t.asignar("Luis")
t.cambiar_estado("completada")
t.asignar("Luis")   # sin cambio — no debería registrarse

t.ver_historial()
print(f"\\nTotal de cambios: {len(t.historial)}")`,
            explanation: 'El decorador registrar_cambio usa getattr para leer el valor del atributo antes y después de ejecutar la función. Solo registra si el valor realmente cambió (anterior != nuevo). Este patrón — decoradores que observan cambios — es la base de sistemas de auditoría en aplicaciones reales.',
          },
        }}
      >
        <p>Registra automáticamente cada cambio en una tarea con un decorador.</p>
      </Exercise>

      <Exercise
        number="8.3"
        title="Importar tareas desde CSV"
        difficulty="media"
        runner={{
          initial: `# Añade al sistema la capacidad de importar tareas desde CSV.
# El CSV tiene este formato:
#   titulo,prioridad,asignado,estado
#
# Implementa:
#   importar_csv(proyecto, csv_texto) → añade las tareas al proyecto
#       - Valida que prioridad sea válida (baja/media/alta/crítica)
#       - Si la prioridad no es válida, usa "media" y registra una advertencia
#       - Devuelve (importadas, advertencias) como tupla
#
# Luego exportar_csv(proyecto) → devuelve el CSV del proyecto completo

import csv, io

PRIORIDADES = ("baja", "media", "alta", "crítica")

`,
          hint: 'Usa csv.DictReader(io.StringIO(csv_texto)) para leer. Valida prioridad con if fila["prioridad"] not in PRIORIDADES. Para exportar usa csv.DictWriter con fieldnames=["id","titulo","prioridad","asignado","estado"].',
          solution: {
            code: `import csv, io

PRIORIDADES = ("baja", "media", "alta", "crítica")

class Tarea:
    _contador = 0
    def __init__(self, titulo, prioridad="media", asignado=None):
        Tarea._contador += 1
        self.id       = f"T{Tarea._contador:03d}"
        self.titulo   = titulo
        self.prioridad = prioridad if prioridad in PRIORIDADES else "media"
        self.asignado  = asignado or None
        self.estado    = "pendiente"

    def a_dict(self):
        return {"id": self.id, "titulo": self.titulo,
                "prioridad": self.prioridad, "asignado": self.asignado or "",
                "estado": self.estado}


class Proyecto:
    def __init__(self, nombre):
        self.nombre  = nombre
        self._tareas = {}
    def añadir(self, t): self._tareas[t.id] = t
    @property
    def todas(self): return list(self._tareas.values())


def importar_csv(proyecto, csv_texto):
    importadas, advertencias = 0, []
    reader = csv.DictReader(io.StringIO(csv_texto))
    for i, fila in enumerate(reader, 1):
        prioridad = fila.get("prioridad", "media").strip()
        if prioridad not in PRIORIDADES:
            advertencias.append(f"Fila {i}: prioridad '{prioridad}' inválida → usando 'media'")
            prioridad = "media"
        t = Tarea(fila["titulo"].strip(), prioridad, fila.get("asignado","").strip() or None)
        if fila.get("estado","").strip() in ("en_progreso","completada","cancelada"):
            t.estado = fila["estado"].strip()
        proyecto.añadir(t)
        importadas += 1
    return importadas, advertencias


def exportar_csv(proyecto):
    salida  = io.StringIO()
    campos  = ["id","titulo","prioridad","asignado","estado"]
    writer  = csv.DictWriter(salida, fieldnames=campos)
    writer.writeheader()
    writer.writerows(t.a_dict() for t in proyecto.todas)
    return salida.getvalue()


# Prueba
csv_entrada = """titulo,prioridad,asignado,estado
Diseño de logo,alta,Ana,completada
Landing page,media,Luis,en_progreso
Blog corporativo,extraña,Sofia,pendiente
Newsletter,baja,,pendiente"""

p = Proyecto("Marketing")
n, warnings = importar_csv(p, csv_entrada)

print(f"Importadas: {n} tareas")
if warnings:
    print("Advertencias:")
    for w in warnings: print(f"  ⚠ {w}")

print("\\nCSV exportado:")
print(exportar_csv(p))`,
            explanation: 'importar_csv devuelve una tupla (importadas, advertencias) — un patrón común en procesamiento de datos: nunca abortas ante un error menor, recoges todos los problemas y los reportas al final. La comprensión writer.writerows(t.a_dict() for t in proyecto.todas) pasa un generador directamente a writerows, sin crear una lista intermedia.',
          },
        }}
      >
        <p>Importa y exporta tareas en formato CSV con validación robusta.</p>
      </Exercise>

      <Exercise
        number="8.4"
        title="Búsqueda avanzada"
        difficulty="difícil"
        runner={{
          initial: `# Implementa un sistema de búsqueda avanzada para el proyecto.
#
# buscar(proyecto, **criterios) debe filtrar tareas por cualquier
# combinación de:
#   - estado="completada"
#   - prioridad="alta"
#   - asignado="Ana"
#   - titulo_contiene="API"
#   - ordenar_por="prioridad"  (baja→alta o al revés con descendente=True)
#
# Devuelve una lista de Tarea ordenada.
#
# Ejemplo:
#   buscar(p, prioridad="alta", asignado="Ana", ordenar_por="titulo")

PRIORIDADES = {"baja": 0, "media": 1, "alta": 2, "crítica": 3}

`,
          hint: 'Empieza con todas las tareas. Para cada criterio en **kwargs, filtra la lista. Para titulo_contiene usa .lower() in t.titulo.lower(). Para ordenar_por, usa sorted con key=lambda t: getattr(t, ordenar_por) o el dict PRIORIDADES si ordenar_por=="prioridad".',
          solution: {
            code: `PRIORIDADES = {"baja": 0, "media": 1, "alta": 2, "crítica": 3}

class Tarea:
    _contador = 0
    def __init__(self, titulo, prioridad="media", asignado=None, estado="pendiente"):
        Tarea._contador += 1
        self.id       = f"T{Tarea._contador:03d}"
        self.titulo   = titulo
        self.prioridad = prioridad
        self.asignado  = asignado
        self.estado    = estado

    def __str__(self):
        return f"  [{self.id}] {self.titulo:<30} [{self.prioridad:<8}] {self.estado} @{self.asignado or '—'}"


class Proyecto:
    def __init__(self, nombre):
        self.nombre  = nombre
        self._tareas = {}
    def añadir(self, t): self._tareas[t.id] = t; return t
    @property
    def todas(self): return list(self._tareas.values())


def buscar(proyecto, estado=None, prioridad=None, asignado=None,
           titulo_contiene=None, ordenar_por="id", descendente=False):
    resultado = proyecto.todas

    if estado:
        resultado = [t for t in resultado if t.estado == estado]
    if prioridad:
        resultado = [t for t in resultado if t.prioridad == prioridad]
    if asignado:
        resultado = [t for t in resultado if t.asignado == asignado]
    if titulo_contiene:
        resultado = [t for t in resultado if titulo_contiene.lower() in t.titulo.lower()]

    if ordenar_por == "prioridad":
        key = lambda t: PRIORIDADES.get(t.prioridad, 0)
    else:
        key = lambda t: getattr(t, ordenar_por, "")

    return sorted(resultado, key=key, reverse=descendente)


# Datos de prueba
p = Proyecto("Demo")
p.añadir(Tarea("Diseño API REST",      "crítica", "Ana",   "en_progreso"))
p.añadir(Tarea("Tests unitarios",      "alta",    "Luis",  "pendiente"))
p.añadir(Tarea("Documentar API",       "media",   "Ana",   "pendiente"))
p.añadir(Tarea("Deploy producción",    "crítica", "Carlos","pendiente"))
p.añadir(Tarea("Optimizar consultas",  "alta",    "Ana",   "completada"))
p.añadir(Tarea("Revisar logs API",     "baja",    "Luis",  "pendiente"))

print("Tareas de Ana:")
for t in buscar(p, asignado="Ana"): print(t)

print("\\nTareas críticas o altas (pendientes) por prioridad desc:")
for t in buscar(p, estado="pendiente", ordenar_por="prioridad", descendente=True):
    if t.prioridad in ("alta","crítica"): print(t)

print("\\nTareas que contienen 'API':")
for t in buscar(p, titulo_contiene="API"): print(t)`,
            explanation: 'buscar usa **kwargs como parámetros con nombre por defecto (=None). Cada filtro solo se aplica si su valor no es None. El ordenar_por dinámico usa getattr(t, campo) — esto permite ordenar por cualquier atributo de Tarea sin escribir un case/switch. Es un patrón muy flexible para APIs de búsqueda.',
          },
        }}
      >
        <p>Un buscador flexible que filtra tareas por cualquier combinación de criterios.</p>
      </Exercise>

      <Exercise
        number="8.5"
        title="Dashboard de métricas"
        difficulty="difícil"
        runner={{
          initial: `# Implementa un dashboard que calcule métricas del sistema completo.
#
# metricas(taskflow) debe devolver un dict con:
#   - total_proyectos
#   - total_tareas
#   - tasa_completado (% del total)
#   - por_prioridad: {prioridad: n} de todas las tareas
#   - por_asignado:  {persona: {"total": n, "completadas": n, "tasa": %}}
#   - proyecto_mas_avanzado: nombre del proyecto con más % completado
#   - proyecto_mas_atrasado: nombre del proyecto con menos % completado (>0 tareas)
#
# Luego imprimir_dashboard(metricas) que muestre el resultado formateado.

from collections import defaultdict

`,
          hint: 'Usa comprensiones para calcular todas las listas de tareas. para por_asignado: defaultdict con {"total":0,"completadas":0}. tasa_completado: completadas/total*100. proyecto_mas_avanzado: max(proyectos, key=lambda p: p.progreso).',
          solution: {
            code: `from collections import defaultdict

class Tarea:
    _contador = 0
    def __init__(self, titulo, prioridad="media", asignado=None, estado="pendiente"):
        Tarea._contador += 1
        self.id       = f"T{Tarea._contador:03d}"
        self.titulo   = titulo
        self.prioridad = prioridad
        self.asignado  = asignado
        self.estado    = estado
    @property
    def completa(self): return self.estado == "completada"

class Proyecto:
    def __init__(self, nombre):
        self.nombre  = nombre
        self._tareas = {}
    def añadir(self, t): self._tareas[t.id] = t; return t
    @property
    def todas(self): return list(self._tareas.values())
    @property
    def progreso(self):
        if not self._tareas: return 0.0
        return sum(1 for t in self._tareas.values() if t.completa)/len(self._tareas)*100

class TaskFlow:
    def __init__(self): self._proyectos = {}
    def nuevo(self, nombre):
        p = Proyecto(nombre); self._proyectos[nombre] = p; return p
    @property
    def proyectos(self): return list(self._proyectos.values())
    @property
    def todas_tareas(self): return [t for p in self._proyectos.values() for t in p.todas]


def metricas(tf):
    tareas      = tf.todas_tareas
    completadas = [t for t in tareas if t.completa]
    por_prior   = defaultdict(int)
    por_asig    = defaultdict(lambda: {"total": 0, "completadas": 0})

    for t in tareas:
        por_prior[t.prioridad] += 1
        if t.asignado:
            por_asig[t.asignado]["total"] += 1
            if t.completa:
                por_asig[t.asignado]["completadas"] += 1

    for datos in por_asig.values():
        datos["tasa"] = round(datos["completadas"]/datos["total"]*100, 1) if datos["total"] else 0

    proyectos = [p for p in tf.proyectos if len(p.todas) > 0]
    return {
        "total_proyectos":       len(tf.proyectos),
        "total_tareas":          len(tareas),
        "tasa_completado":       round(len(completadas)/len(tareas)*100, 1) if tareas else 0,
        "por_prioridad":         dict(por_prior),
        "por_asignado":          dict(por_asig),
        "proyecto_mas_avanzado": max(proyectos, key=lambda p: p.progreso).nombre if proyectos else "—",
        "proyecto_mas_atrasado": min(proyectos, key=lambda p: p.progreso).nombre if proyectos else "—",
    }


def imprimir_dashboard(m):
    print(f"{'═'*45}")
    print(f"  TASKFLOW DASHBOARD")
    print(f"{'═'*45}")
    print(f"  Proyectos:      {m['total_proyectos']}")
    print(f"  Tareas totales: {m['total_tareas']}")
    print(f"  Completado:     {m['tasa_completado']}%")
    print(f"{'─'*45}")
    print("  Por prioridad:")
    for p, n in sorted(m["por_prioridad"].items()): print(f"    {p:<10} {n}")
    print(f"{'─'*45}")
    print("  Por persona:")
    for persona, d in sorted(m["por_asignado"].items()):
        barra = "█" * int(d["tasa"]//10)
        print(f"    {persona:<10} {d['completadas']}/{d['total']} ({d['tasa']}%) {barra}")
    print(f"{'─'*45}")
    print(f"  Más avanzado: {m['proyecto_mas_avanzado']}")
    print(f"  Más atrasado: {m['proyecto_mas_atrasado']}")
    print(f"{'═'*45}")


# Datos de demo
tf = TaskFlow()
web  = tf.nuevo("Web BKLN")
app  = tf.nuevo("App Móvil")
mkt  = tf.nuevo("Marketing")

for t in [Tarea("Wireframes","alta","Ana","completada"), Tarea("HTML","alta","Luis","completada"),
          Tarea("Supabase","crítica","Ana","en_progreso"), Tarea("SEO","media","Sofía","pendiente")]:
    web.añadir(t)

for t in [Tarea("Diseño UI","alta","Ana","completada"), Tarea("Auth API","crítica","Carlos","en_progreso"),
          Tarea("Home screen","alta","Luis","pendiente"), Tarea("Tests","media","Carlos","pendiente")]:
    app.añadir(t)

for t in [Tarea("Campaña email","media","Sofía","completada"), Tarea("Redes sociales","baja","Sofía","completada"),
          Tarea("Analytics","media","Luis","pendiente")]:
    mkt.añadir(t)

imprimir_dashboard(metricas(tf))`,
            explanation: 'El dashboard usa defaultdict(lambda: {...}) para inicializar automáticamente la estructura de métricas por asignado. La barra de progreso "█" * int(tasa//10) convierte un porcentaje a una barra visual en ASCII. max/min con key=lambda p: p.progreso sobre una lista de proyectos es elegante y eficiente — una sola expresión hace lo que un bucle con comparaciones haría en 5 líneas.',
          },
        }}
      >
        <p>Un dashboard completo con métricas, rendimiento por persona y barra de progreso.</p>
      </Exercise>

      <h2>Cierre del Libro 2</h2>

      <div style={{
        background: 'var(--paper-2)',
        border: '1px solid var(--border-soft)',
        borderRadius: 'var(--r-md)',
        padding: 'var(--s-5) var(--s-6)',
        margin: 'var(--s-5) 0',
      }}>
        <div className="eyebrow" style={{ marginBottom: 'var(--s-3)' }}>// lo que dominas ahora</div>
        <ul style={{ paddingLeft: '1.2em', margin: 0 }}>
          <li><strong>Módulo 1:</strong> Diccionarios y conjuntos — las estructuras de datos más versátiles.</li>
          <li><strong>Módulo 2:</strong> Funciones avanzadas — closures, decoradores, *args, **kwargs.</li>
          <li><strong>Módulo 3:</strong> POO — clases, herencia, polimorfismo, dunder methods.</li>
          <li><strong>Módulo 4:</strong> Errores — try/except, raise, excepciones propias.</li>
          <li><strong>Módulo 5:</strong> Archivos — open/with, pathlib, CSV, JSON.</li>
          <li><strong>Módulo 6:</strong> Módulos — import, biblioteca estándar, pip, venv.</li>
          <li><strong>Módulo 7:</strong> Comprensiones y generadores — código expresivo y eficiente.</li>
          <li><strong>Módulo 8:</strong> Proyecto TaskFlow — todo integrado en un sistema real.</li>
        </ul>
      </div>

      <PullQuote>
        Ahora puedes estructurar un programa real, manejarlo cuando falla,
        guardar y leer sus datos, y procesar colecciones de forma eficiente.
        Eso es programar con estructura — y eso es el Libro 2.
      </PullQuote>

      <div style={{
        marginTop: 'var(--s-7)',
        padding: 'var(--s-6)',
        background: 'linear-gradient(135deg, var(--paper-2) 0%, var(--paper-3) 100%)',
        border: '1px solid var(--border-soft)',
        borderRadius: 'var(--r-lg)',
        textAlign: 'center',
      }}>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.75rem', letterSpacing: '0.12em', color: 'var(--ink-3)', marginBottom: 'var(--s-3)' }}>// siguiente etapa</div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(1.8rem, 3vw, 2.8rem)', fontWeight: 500, lineHeight: 1.1, marginBottom: 'var(--s-4)' }}>
          Libro 3: Python <em style={{ color: 'var(--highlight)' }}>Avanzado</em>
        </div>
        <p style={{ color: 'var(--ink-2)', maxWidth: '42ch', margin: '0 auto var(--s-5)' }}>
          Web con Flask, bases de datos, APIs externas, análisis de datos con pandas,
          automatización, testing y despliegue en la nube.
        </p>
        <a
          href="#l3-m1"
          className="btn btn-primary"
          onClick={(e) => { e.preventDefault(); onNav('l3-m1'); }}
        >
          Empezar Libro 3 →
        </a>
      </div>

      <ChapterNav
        prev={{ id: 'l2-m7', title: 'Comprensiones e iteradores' }}
        next={{ id: 'l3-m1', title: 'Python y la web' }}
        onNav={onNav}
      />
    </article>
  );
}

window.ChapterL2M8 = ChapterL2M8;
