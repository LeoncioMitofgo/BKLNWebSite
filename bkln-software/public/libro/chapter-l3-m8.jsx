// =============================================================
// chapter-l3-m8.jsx — Libro 3, Módulo 8: Proyecto final avanzado
// =============================================================

function ChapterL3M8({ onNav }) {
  const flat = flatTOC();
  const idx  = flat.findIndex(c => c.id === 'l3-m8');
  const prev = idx > 0 ? flat[idx - 1] : null;
  const next = null; // último módulo

  return (
    <article className="reader-inner">
      <ChapterHeader
        book="// libro 3 · del código al mundo real"
        module="módulo 08 · proyecto final"
        time="≈ 120 min"
        title={<><em>DataBoard</em> — Panel de métricas</>}
        dek="El proyecto final del Libro 3 integra todo: APIs, SQLite, Pandas, automatización, tests, logging y código profesional — en un sistema real de análisis de ventas."
      />

      <p>
        Has llegado al final. No solo del Libro 3 — sino de toda la serie.
        En este proyecto construirás <strong>DataBoard</strong>: un sistema
        de monitoreo de métricas de e-commerce que recoge datos de ventas,
        los almacena en una base de datos, detecta anomalías, genera informes
        automáticos y tiene una suite de tests completa.
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
          <li><strong>Modelos</strong>: <code>Venta</code>, <code>Producto</code>, <code>Alerta</code> — dataclasses tipadas.</li>
          <li><strong>Base de datos</strong>: SQLite con repositorio abstracto (ABC).</li>
          <li><strong>Colector</strong>: ingesta de datos simulando una API externa.</li>
          <li><strong>Analizador</strong>: métricas con Pandas y NumPy, detección de anomalías.</li>
          <li><strong>Alertas</strong>: umbrales configurables, notificaciones por consola y log.</li>
          <li><strong>Reportes</strong>: generación automática de informes en texto.</li>
          <li><strong>Tests</strong>: suite unittest con mocks y setUp.</li>
          <li><strong>Logging</strong>: trazabilidad completa del sistema.</li>
        </ul>
      </div>

      <Callout kind="success" title="Todo ejecutable en el libro">
        SQLite, dataclasses, unittest, logging, NumPy y Pandas están disponibles
        en Pyodide. Construirás cada fase aquí mismo con ▶ Ejecutar.
      </Callout>

      {/* ── Fase 1: Modelos ── */}
      <h2>Fase 1 — Modelos de datos</h2>

      <p>
        Empezamos por las estructuras de datos. Usamos
        <code> @dataclass</code> con type hints para que el sistema sea
        autodocumentado y seguro:
      </p>

      <PyRunner
        initial={`from dataclasses import dataclass, field
from typing import Optional
from datetime import datetime, date
from enum import Enum

class Categoria(Enum):
    ELECTRONICA  = "Electrónica"
    ROPA         = "Ropa"
    HOGAR        = "Hogar"
    DEPORTES     = "Deportes"

class NivelAlerta(Enum):
    INFO     = "INFO"
    WARNING  = "WARNING"
    CRITICA  = "CRÍTICA"

@dataclass
class Producto:
    id:        int
    nombre:    str
    categoria: Categoria
    precio:    float
    activo:    bool = True

    def __post_init__(self):
        if self.precio <= 0:
            raise ValueError(f"Precio inválido: {self.precio}")

@dataclass
class Venta:
    id:          int
    producto_id: int
    cantidad:    int
    precio_unit: float
    fecha:       date
    region:      str = "ES"

    @property
    def total(self) -> float:
        return round(self.cantidad * self.precio_unit, 2)

@dataclass
class Alerta:
    nivel:   NivelAlerta
    mensaje: str
    metrica: str
    valor:   float
    umbral:  float
    fecha:   datetime = field(default_factory=datetime.now)

    def __str__(self) -> str:
        return f"[{self.nivel.value}] {self.metrica}: {self.valor:.2f} (umbral: {self.umbral:.2f}) — {self.mensaje}"

# Prueba
p1 = Producto(1, "Teclado mecánico", Categoria.ELECTRONICA, 89.99)
p2 = Producto(2, "Camiseta", Categoria.ROPA, 24.99)

v1 = Venta(1, 1, 5, 89.99, date(2025, 5, 1))
v2 = Venta(2, 2, 12, 24.99, date(2025, 5, 1))

print(p1)
print(f"Venta #{v1.id}: {v1.cantidad} × {v1.precio_unit}€ = {v1.total}€")

alerta = Alerta(NivelAlerta.WARNING, "Ventas por debajo del objetivo", "ventas_dia", 1200, 1500)
print(alerta)

try:
    Producto(99, "Roto", Categoria.HOGAR, -10)
except ValueError as e:
    print(f"Validación OK: {e}")
`}
        hint="La propiedad @property total se calcula en el momento de acceder — no se almacena, evita inconsistencias si cambia precio o cantidad."
      />

      {/* ── Fase 2: Base de datos ── */}
      <h2>Fase 2 — Repositorio SQLite</h2>

      <p>
        Implementamos el patrón Repositorio: una clase abstracta define
        el contrato, SQLite es una de las posibles implementaciones:
      </p>

      <PyRunner
        initial={`from abc import ABC, abstractmethod
from dataclasses import dataclass, field
from typing import Optional
from datetime import date
import sqlite3

@dataclass
class Venta:
    id:          int
    producto_id: int
    cantidad:    int
    precio_unit: float
    fecha:       date
    region:      str = "ES"

    @property
    def total(self) -> float:
        return round(self.cantidad * self.precio_unit, 2)

class RepositorioVentas(ABC):
    @abstractmethod
    def insertar(self, venta: Venta) -> None: ...
    @abstractmethod
    def obtener(self, id: int) -> Optional[Venta]: ...
    @abstractmethod
    def listar_por_fecha(self, desde: date, hasta: date) -> list[Venta]: ...
    @abstractmethod
    def total_por_region(self) -> dict[str, float]: ...

class RepositorioSQLite(RepositorioVentas):
    def __init__(self, conn: sqlite3.Connection):
        self.conn = conn
        self.conn.row_factory = sqlite3.Row
        self._crear_tablas()

    def _crear_tablas(self):
        self.conn.execute("""
            CREATE TABLE IF NOT EXISTS ventas (
                id          INTEGER PRIMARY KEY,
                producto_id INTEGER NOT NULL,
                cantidad    INTEGER NOT NULL,
                precio_unit REAL    NOT NULL,
                fecha       TEXT    NOT NULL,
                region      TEXT    DEFAULT 'ES'
            )
        """)
        self.conn.commit()

    def insertar(self, venta: Venta) -> None:
        self.conn.execute(
            "INSERT INTO ventas VALUES (?,?,?,?,?,?)",
            (venta.id, venta.producto_id, venta.cantidad,
             venta.precio_unit, str(venta.fecha), venta.region)
        )
        self.conn.commit()

    def obtener(self, id: int) -> Optional[Venta]:
        row = self.conn.execute("SELECT * FROM ventas WHERE id=?", (id,)).fetchone()
        if not row:
            return None
        return Venta(row["id"], row["producto_id"], row["cantidad"],
                     row["precio_unit"], date.fromisoformat(row["fecha"]), row["region"])

    def listar_por_fecha(self, desde: date, hasta: date) -> list[Venta]:
        rows = self.conn.execute(
            "SELECT * FROM ventas WHERE fecha BETWEEN ? AND ? ORDER BY fecha",
            (str(desde), str(hasta))
        ).fetchall()
        return [Venta(r["id"], r["producto_id"], r["cantidad"],
                      r["precio_unit"], date.fromisoformat(r["fecha"]), r["region"])
                for r in rows]

    def total_por_region(self) -> dict[str, float]:
        rows = self.conn.execute(
            "SELECT region, SUM(cantidad*precio_unit) AS total FROM ventas GROUP BY region"
        ).fetchall()
        return {r["region"]: round(r["total"], 2) for r in rows}

# Prueba
conn = sqlite3.connect(":memory:")
repo = RepositorioSQLite(conn)

ventas = [
    Venta(1, 1, 5, 89.99, date(2025,5,1), "ES"),
    Venta(2, 2, 12, 24.99, date(2025,5,2), "MX"),
    Venta(3, 1, 3, 89.99, date(2025,5,3), "ES"),
    Venta(4, 3, 8, 49.99, date(2025,5,4), "CO"),
    Venta(5, 2, 20, 24.99, date(2025,5,5), "MX"),
]
for v in ventas:
    repo.insertar(v)

mayo = repo.listar_por_fecha(date(2025,5,1), date(2025,5,5))
print(f"Ventas en mayo: {len(mayo)}")
print(f"Venta #3: {repo.obtener(3).total}€")
print("Total por región:")
for region, total in sorted(repo.total_por_region().items()):
    print(f"  {region}: {total}€")
`}
        hint="conn.row_factory = sqlite3.Row permite acceder a columnas por nombre (row['id']) en vez de por índice (row[0])."
      />

      {/* ── Fase 3: Analizador ── */}
      <h2>Fase 3 — Analizador de métricas</h2>

      <p>
        El analizador recibe los datos y produce métricas, tendencias
        y detección de anomalías con NumPy y Pandas:
      </p>

      <PyRunner
        initial={`import pandas as pd
import numpy as np
from datetime import date

# Datos de ventas simulados (30 días)
np.random.seed(42)
n = 30
fechas     = pd.date_range("2025-05-01", periods=n)
categorias = np.random.choice(["Electrónica","Ropa","Hogar","Deportes"], n)
ventas_dia = np.random.normal(loc=1500, scale=300, size=n).clip(min=200).round(2)
unidades   = np.random.randint(5, 50, size=n)

df = pd.DataFrame({
    "fecha":     fechas,
    "categoria": categorias,
    "ingresos":  ventas_dia,
    "unidades":  unidades,
})

class AnalizadorMetricas:
    def __init__(self, df: pd.DataFrame):
        self.df = df.copy()
        self.df["fecha"] = pd.to_datetime(self.df["fecha"])

    def resumen(self) -> dict:
        return {
            "total_ingresos": round(self.df["ingresos"].sum(), 2),
            "media_diaria":   round(self.df["ingresos"].mean(), 2),
            "mejor_dia":      str(self.df.loc[self.df["ingresos"].idxmax(), "fecha"].date()),
            "peor_dia":       str(self.df.loc[self.df["ingresos"].idxmin(), "fecha"].date()),
            "total_unidades": int(self.df["unidades"].sum()),
        }

    def por_categoria(self) -> pd.DataFrame:
        return self.df.groupby("categoria").agg(
            ingresos=("ingresos", "sum"),
            unidades=("unidades", "sum"),
            dias=("fecha", "count"),
        ).round(2).sort_values("ingresos", ascending=False)

    def detectar_anomalias(self, umbral_sigma: float = 2.0) -> pd.DataFrame:
        media = self.df["ingresos"].mean()
        sigma = self.df["ingresos"].std()
        return self.df[abs(self.df["ingresos"] - media) > umbral_sigma * sigma].copy()

    def tendencia_semanal(self) -> pd.Series:
        return self.df.set_index("fecha").resample("W")["ingresos"].sum().round(2)

analizador = AnalizadorMetricas(df)

resumen = analizador.resumen()
print("=== RESUMEN MAYO 2025 ===")
for k, v in resumen.items():
    print(f"  {k:20}: {v}")

print("\\n=== POR CATEGORÍA ===")
print(analizador.por_categoria())

anomalias = analizador.detectar_anomalias()
print(f"\\n=== ANOMALÍAS DETECTADAS: {len(anomalias)} ===")
if not anomalias.empty:
    for _, r in anomalias.iterrows():
        print(f"  {r['fecha'].date()} — {r['ingresos']:.2f}€ ({r['categoria']})")

print("\\n=== TENDENCIA SEMANAL ===")
for fecha, total in analizador.tendencia_semanal().items():
    print(f"  {fecha.date()}: {total:.2f}€")
`}
        hint="idxmax() devuelve el índice de la fila con el valor máximo — úsalo con loc para obtener todos los datos de esa fila."
      />

      {/* ── Fase 4: Sistema de alertas ── */}
      <h2>Fase 4 — Sistema de alertas</h2>

      <PyRunner
        initial={`from dataclasses import dataclass, field
from typing import Callable
from datetime import datetime
from enum import Enum
import logging

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)-8s] %(message)s",
    datefmt="%H:%M:%S",
)
log = logging.getLogger("databoard.alertas")

class NivelAlerta(Enum):
    INFO    = "INFO"
    WARNING = "WARNING"
    CRITICA = "CRÍTICA"

@dataclass
class ReglaAlerta:
    nombre:    str
    metrica:   str
    umbral:    float
    condicion: Callable[[float, float], bool]  # (valor, umbral) -> bool
    nivel:     NivelAlerta
    mensaje:   str

@dataclass
class Alerta:
    regla:  ReglaAlerta
    valor:  float
    fecha:  datetime = field(default_factory=datetime.now)

    def __str__(self) -> str:
        return (f"[{self.regla.nivel.value}] {self.regla.nombre}: "
                f"{self.valor:.2f} (umbral {self.regla.umbral:.2f}) — {self.regla.mensaje}")

class SistemaAlertas:
    def __init__(self):
        self.reglas:  list[ReglaAlerta] = []
        self.historial: list[Alerta]   = []

    def registrar_regla(self, regla: ReglaAlerta) -> None:
        self.reglas.append(regla)
        log.debug("Regla registrada: %s", regla.nombre)

    def evaluar(self, metricas: dict[str, float]) -> list[Alerta]:
        nuevas_alertas = []
        for regla in self.reglas:
            valor = metricas.get(regla.metrica)
            if valor is None:
                continue
            if regla.condicion(valor, regla.umbral):
                alerta = Alerta(regla, valor)
                self.historial.append(alerta)
                nuevas_alertas.append(alerta)
                if regla.nivel == NivelAlerta.CRITICA:
                    log.error("%s", alerta)
                elif regla.nivel == NivelAlerta.WARNING:
                    log.warning("%s", alerta)
                else:
                    log.info("%s", alerta)
        return nuevas_alertas

# Configurar el sistema
sistema = SistemaAlertas()

sistema.registrar_regla(ReglaAlerta(
    "Ventas bajas",    "ingresos_dia",  1000,
    lambda v, u: v < u, NivelAlerta.WARNING, "Ventas por debajo del objetivo diario"
))
sistema.registrar_regla(ReglaAlerta(
    "Ventas críticas", "ingresos_dia",  500,
    lambda v, u: v < u, NivelAlerta.CRITICA, "Ventas en nivel crítico — revisar urgente"
))
sistema.registrar_regla(ReglaAlerta(
    "Tasa de conversión baja", "conversion_pct", 2.0,
    lambda v, u: v < u, NivelAlerta.WARNING, "Tasa de conversión por debajo del 2%"
))
sistema.registrar_regla(ReglaAlerta(
    "Stock bajo", "stock_minimo", 10,
    lambda v, u: v < u, NivelAlerta.INFO, "Algunos productos con stock bajo"
))

# Evaluar métricas del día
print("Evaluando métricas del día...\\n")
metricas_hoy = {
    "ingresos_dia":    750.0,
    "conversion_pct":  1.8,
    "stock_minimo":    5,
    "usuarios_activos": 1240,
}

alertas = sistema.evaluar(metricas_hoy)
print(f"\\n{len(alertas)} alerta(s) generada(s)")
print(f"Historial total: {len(sistema.historial)} alertas")
`}
        hint="Guardar la condición como Callable en la regla hace el sistema extensible — añadir una regla nueva no requiere tocar el código de evaluación."
      />

      {/* ── Fase 5: Reportes ── */}
      <h2>Fase 5 — Generador de reportes</h2>

      <PyRunner
        initial={`from datetime import date, datetime
from contextlib import contextmanager
import io

@contextmanager
def seccion_reporte(titulo: str, archivo):
    separador = "=" * 52
    archivo.write(f"\\n{separador}\\n")
    archivo.write(f"  {titulo.upper()}\\n")
    archivo.write(f"{separador}\\n")
    yield archivo
    archivo.write("\\n")

def generar_reporte(metricas: dict, alertas: list, periodo: str) -> str:
    buf = io.StringIO()
    ahora = datetime.now().strftime("%d/%m/%Y %H:%M")

    buf.write(f"DATABOARD — INFORME DIARIO\\n")
    buf.write(f"Generado: {ahora} | Período: {periodo}\\n")
    buf.write("=" * 52 + "\\n")

    with seccion_reporte("Resumen ejecutivo", buf) as f:
        for clave, valor in metricas.items():
            etiqueta = clave.replace("_", " ").title()
            if isinstance(valor, float):
                f.write(f"  {etiqueta:<25} {valor:>10.2f}\\n")
            else:
                f.write(f"  {etiqueta:<25} {valor:>10}\\n")

    with seccion_reporte("Ingresos por categoría", buf) as f:
        categorias = {
            "Electrónica": 8450.20,
            "Ropa":        3210.80,
            "Hogar":       2890.50,
            "Deportes":    1540.30,
        }
        total = sum(categorias.values())
        for cat, ing in sorted(categorias.items(), key=lambda x: -x[1]):
            pct = ing / total * 100
            barra = "█" * int(pct / 4)
            f.write(f"  {cat:<14} {ing:>8,.2f}€  {pct:>5.1f}%  {barra}\\n")
        f.write(f"  {'TOTAL':<14} {total:>8,.2f}€\\n")

    with seccion_reporte(f"Alertas ({len(alertas)})", buf) as f:
        if alertas:
            for alerta in alertas:
                f.write(f"  {'⚠'} {alerta}\\n")
        else:
            f.write("  ✓ Sin alertas activas\\n")

    buf.write("=" * 52 + "\\n")
    buf.write("FIN DEL INFORME\\n")
    return buf.getvalue()

# Generar informe
metricas = {
    "ingresos_totales":   16091.80,
    "unidades_vendidas":  342,
    "ticket_medio":       47.05,
    "tasa_conversion_pct": 3.2,
    "nuevos_clientes":    87,
}
alertas = [
    "Stock bajo en Producto P042 (3 uds)",
]

informe = generar_reporte(metricas, alertas, "Mayo 2025")
print(informe)
`}
        hint="io.StringIO() es un archivo en memoria — puedes usar .write() como con un archivo real y luego obtener el contenido con .getvalue(). Perfecto para generar texto sin tocar el disco."
      />

      {/* ── Fase 6: Tests ── */}
      <h2>Fase 6 — Suite de tests</h2>

      <PyRunner
        initial={`import unittest
from unittest.mock import Mock, MagicMock, patch
from dataclasses import dataclass, field
from datetime import date, datetime
from enum import Enum
from typing import Optional
import sqlite3

# ── Modelos mínimos para los tests ──────────────────────────────

class NivelAlerta(Enum):
    WARNING = "WARNING"
    CRITICA = "CRÍTICA"

@dataclass
class Venta:
    id: int; producto_id: int; cantidad: int
    precio_unit: float; fecha: date; region: str = "ES"

    @property
    def total(self): return round(self.cantidad * self.precio_unit, 2)

@dataclass
class Producto:
    id: int; nombre: str; precio: float; activo: bool = True
    def __post_init__(self):
        if self.precio <= 0: raise ValueError("Precio debe ser positivo")

# ── Tests del modelo Venta ───────────────────────────────────────

class TestVenta(unittest.TestCase):

    def setUp(self):
        self.venta = Venta(1, 10, 5, 89.99, date(2025, 5, 1), "ES")

    def test_total_calculado(self):
        self.assertAlmostEqual(self.venta.total, 449.95, places=2)

    def test_total_con_cantidad_uno(self):
        v = Venta(2, 1, 1, 29.99, date(2025, 5, 1))
        self.assertAlmostEqual(v.total, 29.99, places=2)

    def test_region_por_defecto(self):
        v = Venta(3, 1, 2, 10.0, date(2025, 5, 1))
        self.assertEqual(v.region, "ES")

# ── Tests del modelo Producto ────────────────────────────────────

class TestProducto(unittest.TestCase):

    def test_precio_invalido(self):
        with self.assertRaises(ValueError):
            Producto(1, "Roto", -5.0)

    def test_precio_cero(self):
        with self.assertRaises(ValueError):
            Producto(2, "Gratis?", 0.0)

    def test_producto_valido(self):
        p = Producto(3, "Teclado", 89.99)
        self.assertTrue(p.activo)
        self.assertEqual(p.precio, 89.99)

# ── Tests con Mock ───────────────────────────────────────────────

class TestAnalizador(unittest.TestCase):

    def test_calcula_total(self):
        repo_mock = Mock()
        repo_mock.listar_por_fecha.return_value = [
            Venta(1, 1, 5, 89.99, date(2025,5,1)),
            Venta(2, 2, 3, 29.99, date(2025,5,2)),
        ]
        ventas = repo_mock.listar_por_fecha(date(2025,5,1), date(2025,5,31))
        total  = sum(v.total for v in ventas)
        self.assertAlmostEqual(total, 539.92, places=2)

    def test_sin_ventas(self):
        repo_mock = Mock()
        repo_mock.listar_por_fecha.return_value = []
        ventas = repo_mock.listar_por_fecha(date(2025,5,1), date(2025,5,31))
        self.assertEqual(len(ventas), 0)

# ── Ejecutar todo ────────────────────────────────────────────────
loader = unittest.TestLoader()
suite  = unittest.TestSuite()
for cls in [TestVenta, TestProducto, TestAnalizador]:
    suite.addTests(loader.loadTestsFromTestCase(cls))

runner = unittest.TextTestRunner(verbosity=2)
resultado = runner.run(suite)
print(f"\\n{'✓ Todos los tests pasaron' if resultado.wasSuccessful() else '✗ Hay tests fallando'}")
`}
        hint="wasSuccessful() devuelve True si no hubo fallos ni errores — úsalo para decidir si continuar en un pipeline de CI/CD."
      />

      {/* ── Sistema completo integrado ── */}
      <h2>Sistema completo integrado</h2>

      <p>
        Ahora unimos todas las fases en un único flujo de datos:
        ingesta → almacenamiento → análisis → alertas → reporte.
      </p>

      <PyRunner
        initial={`import sqlite3, logging, io
import pandas as pd
import numpy as np
from datetime import date, timedelta
from contextlib import contextmanager

# ── Configuración ────────────────────────────────────────────────
logging.basicConfig(level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(message)s", datefmt="%H:%M:%S")
log = logging.getLogger("databoard")

# ── Datos simulados (30 días de ventas) ──────────────────────────
np.random.seed(7)
hoy   = date(2025, 5, 31)
fechas = [hoy - timedelta(days=i) for i in range(29, -1, -1)]
CATEGORIAS = ["Electrónica","Ropa","Hogar","Deportes"]

registros = []
for i, f in enumerate(fechas):
    for _ in range(np.random.randint(3, 8)):
        cat = np.random.choice(CATEGORIAS)
        registros.append({
            "fecha":     str(f),
            "categoria": cat,
            "ingresos":  round(float(np.random.normal(300, 80)), 2),
            "unidades":  int(np.random.randint(1, 15)),
        })

log.info("Datos generados: %d registros en 30 días", len(registros))

# ── Almacenamiento en SQLite ─────────────────────────────────────
conn = sqlite3.connect(":memory:")
conn.execute("""CREATE TABLE ventas(
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    fecha TEXT, categoria TEXT, ingresos REAL, unidades INTEGER
)""")
conn.executemany("INSERT INTO ventas(fecha,categoria,ingresos,unidades) VALUES(?,?,?,?)",
    [(r["fecha"],r["categoria"],r["ingresos"],r["unidades"]) for r in registros])
conn.commit()
log.info("Datos persistidos en SQLite")

# ── Análisis con Pandas ──────────────────────────────────────────
df = pd.read_sql("SELECT * FROM ventas", conn)
df["fecha"] = pd.to_datetime(df["fecha"])

resumen_cat = df.groupby("categoria").agg(
    ingresos=("ingresos","sum"),
    unidades=("unidades","sum")
).round(2).sort_values("ingresos", ascending=False)

daily = df.groupby("fecha")["ingresos"].sum()
media   = daily.mean()
sigma   = daily.std()
anomalias = daily[abs(daily - media) > 2 * sigma]

# ── Alertas ──────────────────────────────────────────────────────
UMBRAL_DIA   = 1500
alertas = []
ultimo_dia = daily.iloc[-1]
if ultimo_dia < UMBRAL_DIA:
    msg = f"Ingresos del día {hoy}: {ultimo_dia:.2f}€ < umbral {UMBRAL_DIA}€"
    alertas.append(("⚠ WARNING", msg))
    log.warning(msg)
if len(anomalias) > 0:
    alertas.append(("ℹ INFO", f"{len(anomalias)} días con ingresos anómalos"))

# ── Reporte final ─────────────────────────────────────────────────
buf = io.StringIO()
total_ingresos = df["ingresos"].sum()
total_unidades = df["unidades"].sum()

buf.write("╔══════════════════════════════════════════╗\\n")
buf.write("║      DATABOARD — INFORME MAYO 2025       ║\\n")
buf.write("╚══════════════════════════════════════════╝\\n\\n")
buf.write(f"  Registros analizados : {len(df):>8,}\\n")
buf.write(f"  Ingresos totales     : {total_ingresos:>8,.2f}€\\n")
buf.write(f"  Unidades vendidas    : {total_unidades:>8,}\\n")
buf.write(f"  Media diaria         : {media:>8,.2f}€\\n\\n")

buf.write("  INGRESOS POR CATEGORÍA:\\n")
for cat, row in resumen_cat.iterrows():
    pct  = row["ingresos"] / total_ingresos * 100
    barra = "█" * int(pct / 5)
    buf.write(f"  {cat:<14} {row['ingresos']:>8,.0f}€  {pct:>5.1f}%  {barra}\\n")

if alertas:
    buf.write(f"\\n  ALERTAS ({len(alertas)}):\\n")
    for nivel, msg in alertas:
        buf.write(f"  {nivel} {msg}\\n")
else:
    buf.write("\\n  ✓ Sin alertas activas\\n")

print(buf.getvalue())
log.info("Informe generado correctamente")
`}
        hint="pd.read_sql() lee una query SQL directamente en un DataFrame — une los dos mundos (SQLite + Pandas) en una sola línea."
      />

      {/* ── Ejercicios ── */}
      <Exercise
        number={1}
        title="Extiende el modelo con descuentos"
        difficulty="media"
        runner={{
          initial: `from dataclasses import dataclass, field
from typing import Optional
from datetime import date

@dataclass
class Descuento:
    codigo:      str
    porcentaje:  float     # 0.0 a 1.0
    valido_hasta: date
    usos_max:    Optional[int] = None
    usos_actual: int = 0

    def __post_init__(self):
        if not 0 < self.porcentaje <= 1:
            raise ValueError(f"Porcentaje inválido: {self.porcentaje}")

    def es_valido(self, hoy: date) -> bool:
        if hoy > self.valido_hasta:
            return False
        if self.usos_max is not None and self.usos_actual >= self.usos_max:
            return False
        return True

    def aplicar(self, precio: float, hoy: date) -> float:
        if not self.es_valido(hoy):
            raise ValueError(f"Descuento {self.codigo} no válido")
        self.usos_actual += 1
        return round(precio * (1 - self.porcentaje), 2)

@dataclass
class VentaConDescuento:
    id:           int
    producto_id:  int
    cantidad:     int
    precio_unit:  float
    fecha:        date
    descuento:    Optional[Descuento] = None

    @property
    def precio_final(self) -> float:
        base = self.cantidad * self.precio_unit
        if self.descuento and self.descuento.es_valido(self.fecha):
            return self.descuento.aplicar(base, self.fecha)
        return round(base, 2)

    @property
    def ahorro(self) -> float:
        base = self.cantidad * self.precio_unit
        return round(base - self.precio_final, 2)

# Prueba el sistema de descuentos
hoy = date(2025, 5, 23)

d1 = Descuento("MAYO20", 0.20, date(2025, 5, 31), usos_max=100)
d2 = Descuento("VERANO10", 0.10, date(2025, 6, 30))
d_expirado = Descuento("VIEJO50", 0.50, date(2025, 4, 1))

ventas = [
    VentaConDescuento(1, 101, 3, 89.99, hoy, d1),
    VentaConDescuento(2, 102, 1, 349.0, hoy, d2),
    VentaConDescuento(3, 103, 2, 24.99, hoy, d_expirado),
    VentaConDescuento(4, 101, 1, 89.99, hoy),
]

total_facturado = 0
total_ahorrado  = 0

print("Resumen de ventas con descuentos:\\n")
for v in ventas:
    pf = v.precio_final
    ah = v.ahorro
    total_facturado += pf
    total_ahorrado  += ah
    descuento_info = v.descuento.codigo if v.descuento and v.descuento.es_valido(hoy) else "sin descuento"
    print(f"  Venta #{v.id}: {pf:.2f}€ (ahorro: {ah:.2f}€) [{descuento_info}]")

print(f"\\nTotal facturado: {total_facturado:.2f}€")
print(f"Total ahorrado:  {total_ahorrado:.2f}€")
print(f"Usos de MAYO20:  {d1.usos_actual}")
`,
          hint: 'es_valido() debe comprobar tanto la fecha como el límite de usos — y usarse desde aplicar() para no permitir descuentos inválidos.'
        }}
      >
        <p>
          Extiende el sistema de ventas con un modelo de descuentos que
          valida fecha de expiración y límite de usos.
        </p>
      </Exercise>

      <Exercise
        number={2}
        title="Análisis de tendencias con ventanas temporales"
        difficulty="media"
        runner={{
          initial: `import pandas as pd
import numpy as np

np.random.seed(42)
fechas  = pd.date_range("2025-01-01", periods=90)
ingresos = np.cumsum(np.random.normal(100, 30, 90)) + 5000
ingresos = np.clip(ingresos, 0, None)

df = pd.DataFrame({"fecha": fechas, "ingresos": ingresos.round(2)})
df.set_index("fecha", inplace=True)

# Media móvil de 7 y 30 días
df["mm7"]  = df["ingresos"].rolling(7).mean().round(2)
df["mm30"] = df["ingresos"].rolling(30).mean().round(2)

# Variación respecto al día anterior
df["variacion_pct"] = df["ingresos"].pct_change() * 100

# Detectar cruces de la media móvil (señal de cambio de tendencia)
df["tendencia"] = np.where(df["mm7"] > df["mm30"], "alcista", "bajista")

# Reporte de tendencia
print("Análisis de tendencias (últimas 2 semanas):\\n")
ultimos = df.dropna().tail(14)
for fecha, row in ultimos.iterrows():
    flecha = "↑" if row["variacion_pct"] > 0 else "↓"
    print(f"  {fecha.date()}  {row['ingresos']:>8.2f}€  "
          f"{flecha} {abs(row['variacion_pct']):>5.1f}%  [{row['tendencia']}]")

print(f"\\nTendencia actual: {df['tendencia'].iloc[-1].upper()}")
print(f"Media 7 días:  {df['mm7'].iloc[-1]:.2f}€")
print(f"Media 30 días: {df['mm30'].iloc[-1]:.2f}€")
`,
          hint: 'rolling(n).mean() calcula la media móvil de las últimas n filas. NaN aparece en los primeros n-1 registros donde no hay suficientes datos previos.'
        }}
      >
        <p>
          Calcula medias móviles y detecta cruces de tendencia en una serie
          temporal de ingresos de 90 días.
        </p>
      </Exercise>

      <Exercise
        number={3}
        title="Sistema de alertas configurable"
        difficulty="media"
        runner={{
          initial: `from dataclasses import dataclass, field
from typing import Callable
from enum import Enum
from datetime import datetime

class Nivel(Enum):
    INFO    = "ℹ INFO"
    WARNING = "⚠ WARNING"
    CRITICA = "🔴 CRÍTICA"

@dataclass
class Regla:
    nombre:    str
    metrica:   str
    umbral:    float
    condicion: Callable[[float, float], bool]
    nivel:     Nivel
    mensaje:   str

@dataclass
class Alerta:
    regla:  Regla
    valor:  float
    fecha:  datetime = field(default_factory=datetime.now)

    def __str__(self):
        return (f"{self.regla.nivel.value} | {self.regla.nombre}: "
                f"valor={self.valor:.2f}, umbral={self.regla.umbral:.2f}")

class Motor:
    def __init__(self):
        self._reglas:   list[Regla]  = []
        self._historial: list[Alerta] = []

    def agregar_regla(self, regla: Regla) -> "Motor":
        self._reglas.append(regla)
        return self   # permite encadenamiento

    def evaluar(self, metricas: dict[str, float]) -> list[Alerta]:
        alertas = []
        for r in self._reglas:
            v = metricas.get(r.metrica)
            if v is not None and r.condicion(v, r.umbral):
                a = Alerta(r, v)
                alertas.append(a)
                self._historial.append(a)
        return alertas

    def resumen_historial(self) -> dict[str, int]:
        return {n.value: sum(1 for a in self._historial if a.regla.nivel == n)
                for n in Nivel}

# Configurar motor con encadenamiento
motor = (Motor()
    .agregar_regla(Regla("Ventas diarias",    "ventas_dia",    1000, lambda v,u: v<u, Nivel.WARNING, "Bajo objetivo"))
    .agregar_regla(Regla("Ventas críticas",   "ventas_dia",     400, lambda v,u: v<u, Nivel.CRITICA, "Urgente"))
    .agregar_regla(Regla("Tasa conversión",   "conversion",      2.0, lambda v,u: v<u, Nivel.WARNING, "Baja conversión"))
    .agregar_regla(Regla("Stock bajo",        "stock_min",       5,  lambda v,u: v<u, Nivel.INFO,    "Reponer stock"))
    .agregar_regla(Regla("Devoluciones altas","devoluciones_pct",10, lambda v,u: v>u, Nivel.CRITICA, "Revisar calidad"))
)

dias = [
    {"ventas_dia": 1200, "conversion": 3.1, "stock_min": 8,  "devoluciones_pct": 2},
    {"ventas_dia":  800, "conversion": 1.8, "stock_min": 8,  "devoluciones_pct": 3},
    {"ventas_dia":  350, "conversion": 1.5, "stock_min": 3,  "devoluciones_pct": 12},
]

for i, metricas in enumerate(dias, 1):
    alertas = motor.evaluar(metricas)
    print(f"Día {i}: ventas={metricas['ventas_dia']}€ — {len(alertas)} alerta(s)")
    for a in alertas:
        print(f"  {a}")

print(f"\\nResumen historial: {motor.resumen_historial()}")
`,
          hint: 'El método agregar_regla devuelve self para permitir encadenamiento (motor.agregar_regla(...).agregar_regla(...)). Es el patrón Builder.'
        }}
      >
        <p>
          Implementa un motor de alertas configurable con encadenamiento de métodos
          y evalúalo contra métricas de varios días.
        </p>
      </Exercise>

      <Exercise
        number={4}
        title="Tests del analizador con datos controlados"
        difficulty="difícil"
        runner={{
          initial: `import unittest
import pandas as pd
import numpy as np
from datetime import date, timedelta

class AnalizadorVentas:
    def __init__(self, df: pd.DataFrame):
        self.df = df.copy()

    def total_ingresos(self) -> float:
        return round(float(self.df["ingresos"].sum()), 2)

    def media_diaria(self) -> float:
        daily = self.df.groupby("fecha")["ingresos"].sum()
        return round(float(daily.mean()), 2)

    def top_categoria(self) -> str:
        return self.df.groupby("categoria")["ingresos"].sum().idxmax()

    def detectar_anomalias(self, sigma: float = 2.0) -> list[str]:
        daily = self.df.groupby("fecha")["ingresos"].sum()
        media, std = daily.mean(), daily.std()
        anomalos = daily[abs(daily - media) > sigma * std]
        return [str(f) for f in anomalos.index]

    def crecimiento_pct(self) -> float:
        daily = self.df.groupby("fecha")["ingresos"].sum().sort_index()
        if len(daily) < 2:
            return 0.0
        mitad = len(daily) // 2
        primera = daily.iloc[:mitad].mean()
        segunda = daily.iloc[mitad:].mean()
        return round((segunda - primera) / primera * 100, 2) if primera > 0 else 0.0


def df_controlado(n_dias=10, ingresos_por_dia=None):
    fechas = [date(2025,5,1) + timedelta(days=i) for i in range(n_dias)]
    ingresos = ingresos_por_dia or [500.0] * n_dias
    return pd.DataFrame({
        "fecha":     [str(f) for f in fechas] * 2,
        "categoria": ["Electrónica"] * n_dias + ["Ropa"] * n_dias,
        "ingresos":  ingresos + [x * 0.5 for x in ingresos],
    })


class TestAnalizadorVentas(unittest.TestCase):

    def setUp(self):
        self.df_uniforme = df_controlado(10, [500.0] * 10)
        self.analizador  = AnalizadorVentas(self.df_uniforme)

    def test_total_ingresos(self):
        # 10 días × (500 Electrónica + 250 Ropa) = 7500
        self.assertAlmostEqual(self.analizador.total_ingresos(), 7500.0, places=2)

    def test_media_diaria(self):
        # 750€/día (500 + 250 por día)
        self.assertAlmostEqual(self.analizador.media_diaria(), 750.0, places=2)

    def test_top_categoria_es_electronica(self):
        self.assertEqual(self.analizador.top_categoria(), "Electrónica")

    def test_sin_anomalias_en_datos_uniformes(self):
        anomalias = self.analizador.detectar_anomalias()
        self.assertEqual(len(anomalias), 0)

    def test_detecta_anomalia_obvia(self):
        ingresos = [500.0] * 9 + [10000.0]   # día 10 es un outlier
        df = df_controlado(10, ingresos)
        an = AnalizadorVentas(df)
        anomalias = an.detectar_anomalias(sigma=2.0)
        self.assertGreater(len(anomalias), 0)

    def test_crecimiento_positivo(self):
        ingresos = list(range(100, 600, 50))  # creciente
        df = df_controlado(len(ingresos), ingresos)
        an = AnalizadorVentas(df)
        self.assertGreater(an.crecimiento_pct(), 0)

    def test_df_vacio_no_explota(self):
        df = pd.DataFrame(columns=["fecha","categoria","ingresos"])
        an = AnalizadorVentas(df)
        self.assertEqual(an.total_ingresos(), 0.0)


loader = unittest.TestLoader()
suite  = loader.loadTestsFromTestCase(TestAnalizadorVentas)
runner = unittest.TextTestRunner(verbosity=2)
resultado = runner.run(suite)
print(f"\\n{'✓ Suite OK' if resultado.wasSuccessful() else '✗ Hay fallos'}")
`,
          hint: 'df_controlado() con datos deterministas es la clave: sabes exactamente qué esperar, así los tests son repetibles y no dependen de datos aleatorios.'
        }}
      >
        <p>
          Escribe una suite completa de tests para el <code>AnalizadorVentas</code>
          usando datos controlados y deterministas en cada test.
        </p>
      </Exercise>

      <Exercise
        number={5}
        title="Pipeline completo de extremo a extremo"
        difficulty="difícil"
        runner={{
          initial: `import sqlite3, pandas as pd, numpy as np, io, logging
from datetime import date, timedelta, datetime
from dataclasses import dataclass, field
from contextlib import contextmanager

logging.basicConfig(level=logging.WARNING, format="[%(levelname)s] %(message)s")
log = logging.getLogger("pipeline")

# ── 1. Configuración ──────────────────────────────────────────────
@dataclass
class Config:
    periodo_dias:    int   = 30
    umbral_diario:   float = 1000.0
    sigma_anomalias: float = 2.0
    top_n_productos: int   = 3

# ── 2. Ingesta ────────────────────────────────────────────────────
def generar_datos(cfg: Config, seed: int = 42) -> list[dict]:
    np.random.seed(seed)
    hoy    = date(2025, 5, 31)
    cats   = ["Electrónica","Ropa","Hogar","Deportes"]
    datos  = []
    for i in range(cfg.periodo_dias):
        fecha = hoy - timedelta(days=cfg.periodo_dias - 1 - i)
        for _ in range(np.random.randint(3, 8)):
            datos.append({
                "fecha":     str(fecha),
                "categoria": np.random.choice(cats),
                "producto":  f"P{np.random.randint(1,20):03d}",
                "ingresos":  round(abs(float(np.random.normal(250, 60))), 2),
                "unidades":  int(np.random.randint(1, 10)),
            })
    return datos

# ── 3. Almacenamiento ─────────────────────────────────────────────
@contextmanager
def base_de_datos():
    conn = sqlite3.connect(":memory:")
    conn.execute("""CREATE TABLE ventas(
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        fecha TEXT, categoria TEXT, producto TEXT,
        ingresos REAL, unidades INTEGER
    )""")
    try:
        yield conn
    finally:
        conn.close()

# ── 4. Análisis ───────────────────────────────────────────────────
def analizar(df: pd.DataFrame, cfg: Config) -> dict:
    daily    = df.groupby("fecha")["ingresos"].sum()
    media    = daily.mean()
    sigma    = daily.std()
    anomalias = daily[abs(daily - media) > cfg.sigma_anomalias * sigma]

    alertas = []
    ultimo = daily.iloc[-1]
    if ultimo < cfg.umbral_diario:
        alertas.append(f"Último día ({daily.index[-1]}): {ultimo:.0f}€ < {cfg.umbral_diario:.0f}€")

    top = (df.groupby("categoria")["ingresos"].sum()
           .sort_values(ascending=False).head(cfg.top_n_productos))

    return {
        "total":       round(float(df["ingresos"].sum()), 2),
        "media_dia":   round(float(media), 2),
        "anomalias":   len(anomalias),
        "alertas":     alertas,
        "top_cats":    top.to_dict(),
        "dias":        len(daily),
    }

# ── 5. Reporte ────────────────────────────────────────────────────
def reporte(resultado: dict, cfg: Config) -> str:
    buf = io.StringIO()
    buf.write(f"DATABOARD — INFORME FINAL ({resultado['dias']} días)\\n")
    buf.write("═" * 45 + "\\n\\n")
    buf.write(f"  Total ingresos   : {resultado['total']:>10,.2f}€\\n")
    buf.write(f"  Media diaria     : {resultado['media_dia']:>10,.2f}€\\n")
    buf.write(f"  Días anómalos    : {resultado['anomalias']:>10}\\n\\n")
    buf.write("  TOP CATEGORÍAS:\\n")
    total = sum(resultado["top_cats"].values())
    for cat, ing in resultado["top_cats"].items():
        barra = "█" * int(ing / total * 20)
        buf.write(f"  {cat:<14} {ing:>8,.0f}€  {barra}\\n")
    if resultado["alertas"]:
        buf.write(f"\\n  ⚠ ALERTAS ({len(resultado['alertas'])}):\\n")
        for a in resultado["alertas"]:
            buf.write(f"  {a}\\n")
    else:
        buf.write("\\n  ✓ Sin alertas activas\\n")
    return buf.getvalue()

# ── 6. Pipeline principal ─────────────────────────────────────────
cfg  = Config(periodo_dias=30, umbral_diario=1200)
datos = generar_datos(cfg)

with base_de_datos() as conn:
    conn.executemany(
        "INSERT INTO ventas(fecha,categoria,producto,ingresos,unidades) VALUES(?,?,?,?,?)",
        [(d["fecha"],d["categoria"],d["producto"],d["ingresos"],d["unidades"]) for d in datos]
    )
    df = pd.read_sql("SELECT * FROM ventas ORDER BY fecha", conn)

resultado = analizar(df, cfg)
print(reporte(resultado, cfg))
log.info("Pipeline completado: %d registros procesados", len(datos))
`,
          hint: 'El pipeline tiene una sola dirección de datos: Config → generar_datos → base_de_datos → analizar → reporte. Cada función hace una cosa y las compones en el bloque principal.'
        }}
      >
        <p>
          Implementa el pipeline completo de DataBoard: configuración,
          ingesta, almacenamiento, análisis, alertas y reporte en un único
          flujo de extremo a extremo.
        </p>
      </Exercise>

      {/* ── Cierre de la serie ── */}
      <div style={{
        background: 'linear-gradient(135deg, var(--paper-2) 0%, var(--paper) 100%)',
        border: '2px solid var(--accent)',
        borderRadius: 'var(--r-lg)',
        padding: 'var(--s-7) var(--s-6)',
        margin: 'var(--s-8) 0',
        textAlign: 'center',
      }}>
        <div style={{
          fontFamily: 'var(--font-display)',
          fontStyle: 'italic',
          fontSize: '3.5rem',
          color: 'var(--highlight)',
          lineHeight: 1,
          marginBottom: 'var(--s-4)',
        }}>✦</div>
        <h2 style={{ margin: '0 0 var(--s-4)', fontFamily: 'var(--font-display)', fontSize: '1.8rem' }}>
          Has completado la serie
        </h2>
        <p style={{ color: 'var(--ink-2)', fontSize: '1.05rem', maxWidth: '48ch', margin: '0 auto var(--s-5)' }}>
          Libro 1 — fundamentos. Libro 2 — estructura. Libro 3 — el mundo real.
          Veinticuatro módulos, cientos de ejercicios, un lenguaje que ya es tuyo.
        </p>
        <div style={{
          display: 'inline-block',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.82rem',
          color: 'var(--ink-3)',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
          borderTop: '1px solid var(--border-soft)',
          paddingTop: 'var(--s-4)',
          marginTop: 'var(--s-2)',
        }}>
          // Python desde cero · serie en tres libros · ed. 01 · 2026
        </div>
      </div>

      <div style={{
        background: 'var(--paper-2)',
        border: '1px solid var(--border-soft)',
        borderRadius: 'var(--r-md)',
        padding: 'var(--s-5) var(--s-6)',
        margin: 'var(--s-6) 0',
      }}>
        <div className="eyebrow" style={{ marginBottom: 'var(--s-3)' }}>// a dónde ir desde aquí</div>
        <ul style={{ paddingLeft: '1.2em', margin: 0, lineHeight: 2.2 }}>
          <li><strong>FastAPI</strong> — construye APIs REST profesionales en Python.</li>
          <li><strong>Django</strong> — el framework web más completo del ecosistema.</li>
          <li><strong>scikit-learn</strong> — machine learning con Python.</li>
          <li><strong>Docker + GitHub Actions</strong> — despliegue y CI/CD.</li>
          <li><strong>asyncio</strong> — programación asíncrona para I/O masivo.</li>
          <li><strong>Contribuir a open source</strong> — la mejor forma de seguir aprendiendo.</li>
        </ul>
      </div>

      {/* ── Resumen ── */}
      <div style={{
        background: 'var(--paper-2)',
        border: '1px solid var(--border-soft)',
        borderRadius: 'var(--r-md)',
        padding: 'var(--s-5) var(--s-6)',
        margin: 'var(--s-6) 0',
      }}>
        <div className="eyebrow" style={{ marginBottom: 'var(--s-3)' }}>// lo que has construido en DataBoard</div>
        <ul style={{ paddingLeft: '1.2em', margin: 0, lineHeight: 2 }}>
          <li><strong>Modelos</strong> tipados con dataclasses y validación en __post_init__.</li>
          <li><strong>Repositorio SQLite</strong> detrás de una interfaz abstracta (ABC).</li>
          <li><strong>Análisis</strong> con Pandas (groupby, rolling) y NumPy (anomalías por sigma).</li>
          <li><strong>Alertas</strong> configurables con reglas como funciones Callable.</li>
          <li><strong>Reportes</strong> generados en memoria con io.StringIO y context managers.</li>
          <li><strong>Tests</strong> con datos controlados, mocks y setUp/tearDown.</li>
          <li><strong>Pipeline</strong> completo de extremo a extremo.</li>
        </ul>
      </div>

      <PullQuote>
        No aprendes a programar leyendo sobre programación.
        Lo aprendes construyendo cosas, rompiéndolas y volviéndolas a construir.
        Ya tienes las herramientas — úsalas.
      </PullQuote>

      <ChapterNav
        prev={prev ? { id: prev.id, title: prev.title } : null}
        next={null}
        onNav={onNav}
      />
    </article>
  );
}

window.ChapterL3M8 = ChapterL3M8;
