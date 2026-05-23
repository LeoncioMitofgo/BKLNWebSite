// =============================================================
// chapter-l3-m4.jsx — Libro 3, Módulo 4: Análisis de datos
// =============================================================

function ChapterL3M4({ onNav }) {
  const flat = flatTOC();
  const idx  = flat.findIndex(c => c.id === 'l3-m4');
  const prev = idx > 0 ? flat[idx - 1] : null;
  const next = idx < flat.length - 1 ? flat[idx + 1] : null;

  return (
    <article className="reader-inner">
      <ChapterHeader
        book="// libro 3 · del código al mundo real"
        module="módulo 04"
        time="≈ 70 min"
        title={<>Análisis de datos</>}
        dek="Python domina la ciencia de datos por dos librerías: NumPy para números y Pandas para tablas. Aprende a explorar, filtrar, agrupar y transformar datos reales."
      />

      <p>
        Uno de los motivos por los que Python se convirtió en el lenguaje
        dominante en ciencia de datos e inteligencia artificial es su ecosistema
        científico. Dos librerías forman la base de casi todo:
        <strong> NumPy</strong> para operaciones numéricas ultrarrápidas y
        <strong> Pandas</strong> para trabajar con datos tabulares como si
        fueran hojas de cálculo programables.
      </p>

      <Callout kind="success" title="Todo ejecutable en el libro">
        NumPy y Pandas están disponibles en Pyodide. La primera ejecución
        puede tardar unos segundos mientras se cargan — es normal.
        Después todo va rápido.
      </Callout>

      {/* ── NumPy ── */}
      <h2>NumPy — el motor numérico</h2>

      <p>
        Las listas de Python son flexibles pero lentas para cálculos con
        millones de números. NumPy ofrece el <strong>ndarray</strong>: un
        array de tipo fijo almacenado en memoria contigua, con operaciones
        implementadas en C — entre 10 y 100 veces más rápido.
      </p>

      <CodeBlock code={`
import numpy as np

# Crear arrays
a = np.array([1, 2, 3, 4, 5])
b = np.array([10, 20, 30, 40, 50])

# Operaciones vectorizadas — sin bucles
print(a + b)          # [11 22 33 44 55]
print(a * 2)          # [ 2  4  6  8 10]
print(b / a)          # [10. 10. 10. 10. 10.]
print(a ** 2)         # [ 1  4  9 16 25]

# Arrays especiales
print(np.zeros(4))            # [0. 0. 0. 0.]
print(np.ones((2, 3)))        # matriz 2x3 de unos
print(np.arange(0, 10, 2))    # [0 2 4 6 8]
print(np.linspace(0, 1, 5))   # [0.  0.25 0.5  0.75 1. ]
      `} />

      <CodeBlock code={`
import numpy as np

# Estadísticas básicas
datos = np.array([23, 45, 12, 67, 34, 89, 56, 11, 78, 42])

print(f"Media:    {np.mean(datos):.1f}")
print(f"Mediana:  {np.median(datos):.1f}")
print(f"Desv. st: {np.std(datos):.1f}")
print(f"Min/Max:  {datos.min()} / {datos.max()}")

# Slicing y filtrado
print(datos[2:5])               # [12 67 34]
print(datos[datos > 50])        # [67 89 56 78] — filtro booleano
print(np.sort(datos)[-3:])      # [67 78 89] — top 3
      `} />

      <PyRunner
        initial={`import numpy as np

# Arrays y operaciones
temperaturas = np.array([18.2, 21.5, 19.8, 25.1, 23.4, 17.6, 22.0])
dias = ["lun", "mar", "mié", "jue", "vie", "sáb", "dom"]

print("Temperaturas de la semana:")
for dia, temp in zip(dias, temperaturas):
    barra = "█" * int(temp - 15)
    print(f"  {dia}: {temp:5.1f}°C {barra}")

print(f"\\nMedia:  {np.mean(temperaturas):.1f}°C")
print(f"Máxima: {np.max(temperaturas):.1f}°C ({dias[np.argmax(temperaturas)]})")
print(f"Mínima: {np.min(temperaturas):.1f}°C ({dias[np.argmin(temperaturas)]})")

# Días por encima de la media
media = np.mean(temperaturas)
calidos = np.array(dias)[temperaturas > media]
print(f"Días sobre la media: {', '.join(calidos)}")
`}
        hint="np.argmax() devuelve el índice del valor máximo — úsalo para encontrar el día más caluroso."
      />

      {/* ── Pandas ── */}
      <h2>Pandas — datos tabulares</h2>

      <p>
        Pandas añade dos estructuras sobre NumPy:
        <strong> Series</strong> (columna con índice) y
        <strong> DataFrame</strong> (tabla con filas y columnas etiquetadas).
        Es el equivalente a Excel pero programable, reproducible y capaz de
        manejar millones de filas.
      </p>

      <CodeBlock code={`
import pandas as pd

# Serie — columna con índice
ventas = pd.Series(
    [1200, 850, 1540, 930, 1100],
    index=["ene", "feb", "mar", "abr", "may"]
)
print(ventas["mar"])    # 1540
print(ventas[ventas > 1000])

# DataFrame — tabla completa
df = pd.DataFrame({
    "nombre":   ["Ana", "Luis", "Sara", "Pedro"],
    "edad":     [28, 34, 22, 41],
    "ciudad":   ["Madrid", "Barcelona", "Madrid", "Sevilla"],
    "salario":  [52000, 61000, 38000, 55000],
})
print(df)
print(df.dtypes)
      `} />

      {/* ── Explorar ── */}
      <h2>Explorar un DataFrame</h2>

      <PyRunner
        initial={`import pandas as pd

# Dataset simulado de empleados
df = pd.DataFrame({
    "nombre":      ["Ana", "Luis", "Sara", "Pedro", "Marta", "Jorge", "Elena"],
    "departamento":["IT", "Ventas", "IT", "RRHH", "Ventas", "IT", "RRHH"],
    "edad":        [28, 34, 22, 41, 29, 36, 31],
    "salario":     [52000, 38000, 61000, 45000, 41000, 68000, 47000],
    "remoto":      [True, False, True, False, True, True, False],
})

# Información general
print("Shape:", df.shape)
print()
print(df.head(3))
print()

# Estadísticas descriptivas de columnas numéricas
print(df[["edad", "salario"]].describe().round(1))
print()

# Valores únicos
print("Departamentos:", df["departamento"].unique())
print("Empleados remotos:", df["remoto"].sum())
`}
        hint="df.describe() muestra count, mean, std, min, cuartiles y max de todas las columnas numéricas."
      />

      {/* ── Seleccionar y filtrar ── */}
      <h2>Seleccionar y filtrar datos</h2>

      <CodeBlock code={`
import pandas as pd

df = pd.DataFrame({
    "producto": ["Teclado", "Monitor", "Ratón", "Auriculares", "Webcam"],
    "precio":   [79.99, 349.00, 29.99, 89.99, 59.99],
    "stock":    [45, 12, 120, 38, 7],
    "categoria":["Periférico", "Pantalla", "Periférico", "Audio", "Video"],
})

# Seleccionar columnas
print(df["precio"])
print(df[["producto", "precio"]])

# Filtros booleanos
baratos = df[df["precio"] < 60]
print(baratos)

# Múltiples condiciones
escasos = df[(df["stock"] < 20) & (df["precio"] > 50)]
print(escasos)

# loc — por etiquetas; iloc — por posición
print(df.loc[0, "producto"])       # "Teclado"
print(df.iloc[2, 1])               # 29.99
print(df.iloc[:3, :2])             # primeras 3 filas, 2 columnas
      `} />

      {/* ── Transformar ── */}
      <h2>Transformar columnas</h2>

      <PyRunner
        initial={`import pandas as pd

df = pd.DataFrame({
    "nombre":  ["Ana García", "luis martín", "SARA LÓPEZ"],
    "salario": [52000, 38000, 61000],
    "inicio":  ["2019-03-15", "2021-07-01", "2018-11-20"],
})

# Normalizar texto
df["nombre"] = df["nombre"].str.title()

# Nueva columna calculada
df["salario_mensual"] = (df["salario"] / 12).round(2)

# Convertir tipos
df["inicio"] = pd.to_datetime(df["inicio"])
df["anios_empresa"] = (pd.Timestamp("2025-01-01") - df["inicio"]).dt.days // 365

# apply — transformación fila a fila con función
df["nivel"] = df["salario"].apply(lambda s: "senior" if s > 55000 else "junior")

print(df.to_string(index=False))
`}
        hint="str.title(), pd.to_datetime() y apply() son las tres transformaciones más frecuentes en limpieza de datos."
      />

      {/* ── Groupby ── */}
      <h2>Agrupar y agregar con groupby</h2>

      <p>
        <code>groupby</code> es el equivalente a SQL <code>GROUP BY</code>:
        divide el DataFrame en grupos y aplica una función de agregación a cada uno.
      </p>

      <PyRunner
        initial={`import pandas as pd

df = pd.DataFrame({
    "nombre":  ["Ana","Luis","Sara","Pedro","Marta","Jorge","Elena","Raúl"],
    "depto":   ["IT","Ventas","IT","RRHH","Ventas","IT","RRHH","Ventas"],
    "salario": [52000,38000,61000,45000,41000,68000,47000,43000],
    "remoto":  [True,False,True,False,True,True,False,False],
})

# Salario medio por departamento
por_depto = df.groupby("depto")["salario"].agg(["mean","min","max","count"])
por_depto.columns = ["media","mínimo","máximo","empleados"]
por_depto["media"] = por_depto["media"].round(0).astype(int)
print("Por departamento:")
print(por_depto.sort_values("media", ascending=False))

# Múltiples columnas agrupadas
print("\\nRemoto vs presencial:")
print(df.groupby("remoto")["salario"].agg(["mean","count"]).round(0))

# Tabla pivote
print("\\nConteo por depto y modalidad:")
tabla = pd.crosstab(df["depto"], df["remoto"].map({True:"remoto", False:"presencial"}))
print(tabla)
`}
        hint="agg() acepta una lista de funciones: mean, sum, min, max, count, std... Puedes aplicar varias a la vez."
      />

      {/* ── NaN ── */}
      <h2>Datos faltantes</h2>

      <p>
        En datos reales siempre hay valores faltantes (<code>NaN</code>).
        Pandas los maneja con tres herramientas:
      </p>

      <PyRunner
        initial={`import pandas as pd
import numpy as np

df = pd.DataFrame({
    "nombre":  ["Ana", "Luis", "Sara", "Pedro", "Marta"],
    "edad":    [28, None, 22, 41, None],
    "salario": [52000, 38000, None, 45000, 41000],
    "ciudad":  ["Madrid", "Barcelona", None, "Sevilla", "Madrid"],
})

print("Valores faltantes por columna:")
print(df.isna().sum())

# Eliminar filas con cualquier NaN
print("\\nSin filas incompletas:")
print(df.dropna())

# Rellenar con valores específicos
df_rellenado = df.copy()
df_rellenado["edad"]    = df["edad"].fillna(df["edad"].median())
df_rellenado["salario"] = df["salario"].fillna(df["salario"].mean().round(0))
df_rellenado["ciudad"]  = df["ciudad"].fillna("Desconocida")

print("\\nCon valores rellenados:")
print(df_rellenado)
`}
        hint="fillna(df['col'].median()) es mejor que la media cuando hay valores extremos que distorsionan el promedio."
      />

      {/* ── CSV y JSON ── */}
      <h2>Leer y exportar datos</h2>

      <CodeBlock code={`
import pandas as pd

# Leer CSV
df = pd.read_csv("datos.csv")
df = pd.read_csv("datos.csv", sep=";", encoding="utf-8", parse_dates=["fecha"])

# Leer JSON
df = pd.read_json("datos.json")

# Leer desde URL directamente
df = pd.read_csv("https://ejemplo.com/datos.csv")

# Exportar
df.to_csv("resultado.csv", index=False)
df.to_json("resultado.json", orient="records", force_ascii=False)

# Filtrar y guardar subconjunto
df[df["activo"] == True].to_csv("activos.csv", index=False)
      `} />

      <Callout kind="tip" title="index=False al exportar CSV">
        Por defecto Pandas escribe el índice numérico como primera columna.
        Casi siempre no lo quieres — usa <code>index=False</code>.
      </Callout>

      {/* ── Visualización ── */}
      <h2>Visualización de datos</h2>

      <p>
        El análisis de datos suele terminar con un gráfico.
        <strong> Matplotlib</strong> es la librería base;
        <strong> Seaborn</strong> añade gráficos estadísticos con mejor aspecto
        por defecto:
      </p>

      <CodeBlock label="▸ local · python" code={`
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

df = pd.read_csv("ventas.csv")

# Histograma
df["precio"].hist(bins=20)
plt.title("Distribución de precios")
plt.xlabel("Precio (€)")
plt.savefig("histograma.png")
plt.show()

# Gráfico de barras por categoría
ventas_depto = df.groupby("departamento")["total"].sum()
ventas_depto.plot(kind="bar", rot=30)
plt.tight_layout()
plt.savefig("barras.png")
plt.show()

# Seaborn — correlación entre variables
sns.scatterplot(data=df, x="precio", y="unidades", hue="categoria")
plt.savefig("scatter.png")
plt.show()
      `} />

      {/* ── Quiz ── */}
      <Quiz
        question="¿Qué hace df.groupby('ciudad')['salario'].mean()?"
        options={[
          "Calcula la media de salario de toda la tabla.",
          "Agrupa los empleados por ciudad y calcula el salario medio de cada una.",
          "Filtra las filas donde ciudad es igual a salario.",
          "Ordena el DataFrame por ciudad y luego por salario.",
        ]}
        correct={1}
        explanation={"groupby('ciudad') divide el DataFrame en grupos según el valor de ciudad. Luego ['salario'].mean() calcula el promedio de salario dentro de cada grupo por separado."}
      />

      {/* ── Ejercicios ── */}
      <Exercise
        number={1}
        title="Analiza ventas con NumPy"
        difficulty="fácil"
        runner={{
          initial: `import numpy as np

# Ventas diarias de tres productos durante 4 semanas (28 días)
np.random.seed(42)
teclados    = np.random.randint(5,  20, size=28)
monitores   = np.random.randint(2,  10, size=28)
auriculares = np.random.randint(10, 30, size=28)

productos = {"Teclados": teclados, "Monitores": monitores, "Auriculares": auriculares}
precios   = {"Teclados": 79.99,   "Monitores": 349.00,   "Auriculares": 89.99}

print("Resumen de ventas (28 días):")
print(f"{'Producto':<15} {'Total uds':>10} {'Media/día':>10} {'Ingresos':>12}")
print("-" * 50)

for nombre, ventas in productos.items():
    total    = ventas.sum()
    media    = ventas.mean()
    ingresos = total * precios[nombre]
    print(f"{nombre:<15} {total:>10} {media:>10.1f} {ingresos:>11,.0f}€")

# Día con más ventas totales
totales_dia = teclados + monitores + auriculares
mejor_dia   = np.argmax(totales_dia) + 1
print(f"\\nMejor día: día {mejor_dia} ({totales_dia[mejor_dia-1]} uds vendidas)")
`,
          hint: 'np.argmax() devuelve el índice del máximo. Suma +1 para convertirlo en número de día (índice 0 = día 1).'
        }}
      >
        <p>Calcula estadísticas de ventas por producto usando operaciones vectorizadas de NumPy.</p>
      </Exercise>

      <Exercise
        number={2}
        title="Limpia y explora un dataset"
        difficulty="fácil"
        runner={{
          initial: `import pandas as pd
import numpy as np

# Dataset con problemas típicos del mundo real
df = pd.DataFrame({
    "id":       [1, 2, 3, 4, 5, 6, 7, 8],
    "nombre":   ["ana garcía", "LUIS MARTÍN", "Sara López", None, "pedro ruiz", "MARTA TORRES", "jorge díaz", "elena vega"],
    "edad":     [28, 34, 22, 41, None, 29, 36, 31],
    "salario":  [52000, 38000, 61000, 45000, 41000, None, 68000, 47000],
    "depto":    ["IT", "Ventas", "IT", "RRHH", "Ventas", "IT", "IT", "RRHH"],
})

print("Antes de limpiar:")
print(f"  Filas: {len(df)}")
print(f"  NaN:\\n{df.isna().sum()}\\n")

# 1. Normalizar nombres
df["nombre"] = df["nombre"].str.title()

# 2. Rellenar valores faltantes
df["nombre"]  = df["nombre"].fillna("Desconocido")
df["edad"]    = df["edad"].fillna(df["edad"].median())
df["salario"] = df["salario"].fillna(df["salario"].mean())

print("Después de limpiar:")
print(df.to_string(index=False))

print(f"\\nSalario medio: {df['salario'].mean():,.0f} €")
print(f"Edad media:    {df['edad'].mean():.1f} años")
`,
          hint: 'str.title() convierte "ana garcía" en "Ana García". Aplícalo después de fillna para no afectar los NaN.'
        }}
      >
        <p>Limpia un dataset con nombres mal formateados y valores faltantes usando las herramientas de Pandas.</p>
      </Exercise>

      <Exercise
        number={3}
        title="Análisis de ventas por mes y categoría"
        difficulty="media"
        runner={{
          initial: `import pandas as pd

df = pd.DataFrame({
    "fecha":     ["2025-01","2025-01","2025-02","2025-02","2025-03",
                  "2025-03","2025-01","2025-02","2025-03","2025-01"],
    "categoria": ["Electrónica","Ropa","Electrónica","Ropa","Electrónica",
                  "Ropa","Hogar","Hogar","Hogar","Electrónica"],
    "unidades":  [12, 45, 18, 38, 25, 52, 30, 28, 35, 8],
    "precio":    [299, 49, 299, 49, 299, 49, 89, 89, 89, 349],
})

df["ingresos"] = df["unidades"] * df["precio"]

# 1. Ingresos totales por mes
print("Ingresos por mes:")
por_mes = df.groupby("fecha")["ingresos"].sum()
for mes, total in por_mes.items():
    print(f"  {mes}: {total:>8,.0f} €")

# 2. Ingresos por categoría
print("\\nIngresos por categoría:")
por_cat = df.groupby("categoria")["ingresos"].sum().sort_values(ascending=False)
for cat, total in por_cat.items():
    print(f"  {cat:<15}: {total:>8,.0f} €")

# 3. Tabla cruzada mes × categoría
print("\\nDesglose mes × categoría:")
tabla = df.groupby(["fecha","categoria"])["ingresos"].sum().unstack(fill_value=0)
print(tabla)
`,
          hint: 'unstack() convierte el segundo nivel del índice en columnas, creando una tabla cruzada legible.'
        }}
      >
        <p>Agrupa ventas por mes y categoría con groupby para obtener un resumen ejecutivo.</p>
      </Exercise>

      <Exercise
        number={4}
        title="Filtra y rankea con múltiples condiciones"
        difficulty="media"
        runner={{
          initial: `import pandas as pd

df = pd.DataFrame({
    "pelicula":  ["Dune 2","Oppenheimer","Poor Things","La zona de interés",
                  "Anatomía de una caída","Maestro","May December","Priscilla"],
    "director":  ["Villeneuve","Nolan","Lanthimos","Glazer",
                  "Triet","Bradley Cooper","Haynes","Coppola"],
    "anyo":      [2024, 2023, 2023, 2023, 2023, 2023, 2023, 2023],
    "nota":      [8.1, 8.3, 7.9, 7.4, 7.7, 6.8, 6.5, 6.4],
    "duracion":  [167, 180, 141, 105, 152, 129, 113, 113],
    "premios":   [2, 7, 5, 1, 5, 3, 0, 0],
})

# 1. Películas con nota ≥ 7.5, ordenadas por nota descendente
print("Películas destacadas (nota ≥ 7.5):")
destacadas = df[df["nota"] >= 7.5].sort_values("nota", ascending=False)
for _, f in destacadas.iterrows():
    print(f"  {f['nota']} · {f['pelicula']} ({f['duracion']} min)")

# 2. Ranking compuesto: 60% nota + 40% premios normalizados
df["nota_norm"]    = (df["nota"] - df["nota"].min()) / (df["nota"].max() - df["nota"].min())
df["premios_norm"] = df["premios"] / df["premios"].max()
df["score"]        = (df["nota_norm"] * 0.6 + df["premios_norm"] * 0.4).round(3)

print("\\nRanking compuesto (nota + premios):")
ranking = df.sort_values("score", ascending=False)[["pelicula","nota","premios","score"]]
print(ranking.to_string(index=False))
`,
          hint: 'Normalizar a [0,1] con (x - min) / (max - min) permite combinar columnas con escalas distintas.'
        }}
      >
        <p>
          Filtra películas por nota y construye un ranking compuesto
          combinando nota y premios mediante normalización.
        </p>
      </Exercise>

      <Exercise
        number={5}
        title="Pipeline completo de análisis"
        difficulty="difícil"
        runner={{
          initial: `import pandas as pd
import numpy as np

np.random.seed(7)
n = 50

# Dataset de pedidos de e-commerce
df = pd.DataFrame({
    "pedido_id":  range(1001, 1001 + n),
    "cliente":    [f"CLI{np.random.randint(1, 16):03d}" for _ in range(n)],
    "categoria":  np.random.choice(["Electrónica","Ropa","Hogar","Libros"], n),
    "importe":    np.round(np.random.uniform(10, 500, n), 2),
    "devuelto":   np.random.choice([False, False, False, True], n),
    "mes":        np.random.choice(["Enero","Febrero","Marzo"], n),
})

print(f"Dataset: {len(df)} pedidos, {df['cliente'].nunique()} clientes únicos")
print(f"Tasa de devolución: {df['devuelto'].mean():.1%}")

# Solo pedidos no devueltos
ventas = df[~df["devuelto"]].copy()

# Ingresos reales por categoría
print("\\nIngresos por categoría (sin devoluciones):")
por_cat = ventas.groupby("categoria")["importe"].agg(
    pedidos="count",
    total="sum",
    media="mean"
).round(2).sort_values("total", ascending=False)
print(por_cat)

# Top 5 clientes
print("\\nTop 5 clientes:")
top = ventas.groupby("cliente")["importe"].sum().nlargest(5)
for cliente, total in top.items():
    print(f"  {cliente}: {total:.2f} €")

# Mes con mayor ticket medio
print("\\nTicket medio por mes:")
por_mes = ventas.groupby("mes")["importe"].mean().round(2)
print(por_mes.sort_values(ascending=False))
`,
          hint: 'nlargest(n) es el atajo de sort_values(ascending=False).head(n) — más conciso para los top N.'
        }}
      >
        <p>
          Construye un pipeline completo: genera un dataset, limpia los datos,
          filtra, agrupa y extrae insights de un escenario de e-commerce.
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
          <li><strong>NumPy</strong> — arrays tipados, operaciones vectorizadas, estadísticas rápidas.</li>
          <li><strong>Pandas Series/DataFrame</strong> — datos tabulares con índice y etiquetas.</li>
          <li><strong>head(), info(), describe()</strong> — primeros pasos en cualquier dataset.</li>
          <li><strong>Filtros booleanos</strong> — <code>df[df["col"] &gt; valor]</code> para seleccionar filas.</li>
          <li><strong>apply() y str.title()</strong> — transformar columnas fila a fila o vectorialmente.</li>
          <li><strong>groupby() + agg()</strong> — estadísticas por grupo, equivalente a SQL GROUP BY.</li>
          <li><strong>isna(), fillna(), dropna()</strong> — tratar datos faltantes.</li>
          <li><strong>to_csv() / to_json()</strong> — exportar resultados con <code>index=False</code>.</li>
        </ul>
      </div>

      <PullQuote>
        Los datos raramente mienten — pero siempre necesitan ser limpiados,
        agrupados y preguntados de la forma correcta para revelar su historia.
      </PullQuote>

      <ChapterNav
        prev={prev ? { id: prev.id, title: prev.title } : null}
        next={next ? { id: next.id, title: next.title } : null}
        onNav={onNav}
      />
    </article>
  );
}

window.ChapterL3M4 = ChapterL3M4;
