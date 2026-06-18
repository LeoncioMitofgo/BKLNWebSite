// =============================================================
// chapter-l1-m3.jsx — Pandas: datos en tablas
// =============================================================

function ChapterL1M3({ onNav }) {
  const flat = flatTOC();
  const idx = flat.findIndex(c => c.id === 'l1-m3');
  const prev = flat[idx - 1], next = flat[idx + 1];

  return (
    <article className="reader-inner">
      <ChapterHeader
        book="// libro i — fundamentos"
        module="módulo 03"
        time="35 min · ejercicios incluidos"
        title={<>Pandas<span style={{color:'var(--highlight)'}}>.</span></>}
        dek="DataFrames, exploración y limpieza de datos — donde el 80% del trabajo real de ML ocurre."
      />

      <p>
        En proyectos reales de machine learning, el 80% del tiempo se dedica a entender, limpiar y preparar
        los datos. <strong>Pandas</strong> es la herramienta que hace posible ese trabajo. Si NumPy son los
        cimientos, Pandas es la planta baja donde realmente vives.
      </p>

      <p>
        La estructura central de Pandas es el <strong>DataFrame</strong>: una tabla con filas y columnas
        donde cada columna puede tener un tipo distinto (números, texto, fechas). Es como una hoja de
        cálculo, pero controlada desde código.
      </p>

      <h2>Crear DataFrames</h2>

      <CodeBlock code={`import pandas as pd

# Desde un diccionario (la forma más común)
datos = {
    'nombre':      ['Ana', 'Carlos', 'Fatima', 'Jean', 'María'],
    'edad':        [28, 34, 22, 45, 31],
    'ciudad':      ['Malabo', 'Bata', 'Malabo', 'Ebebiyin', 'Bata'],
    'salario':     [850_000, 1_200_000, 650_000, 980_000, 1_100_000],
    'activo':      [True, True, True, False, True],
}

df = pd.DataFrame(datos)
print(df)
print("\\nForma:", df.shape)  # (5, 5) — 5 filas, 5 columnas`} />

      <h2>Exploración inicial</h2>

      <p>
        Cada vez que recibes un nuevo dataset, estos son los primeros comandos que ejecutas:
      </p>

      <CodeBlock code={`import pandas as pd
import numpy as np

# Simular dataset de empleados
np.random.seed(42)
df = pd.DataFrame({
    'edad':     np.random.randint(22, 60, 200),
    'salario':  np.random.normal(950_000, 200_000, 200).astype(int),
    'años_exp': np.random.randint(0, 20, 200),
    'ciudad':   np.random.choice(['Malabo', 'Bata', 'Mongomo'], 200),
})

print(df.head())         # primeras 5 filas
print("\\n", df.info())  # tipos de datos y nulos
print("\\n", df.describe())  # estadísticas descriptivas`} />

      <h2>Selección de datos</h2>

      <CodeBlock code={`import pandas as pd

df = pd.DataFrame({
    'producto': ['arroz', 'aceite', 'azúcar', 'sal', 'leche'],
    'precio':   [1200, 2500, 800, 400, 1800],
    'stock':    [50, 30, 80, 120, 15],
    'categoría':['granos', 'aceites', 'granos', 'condimentos', 'lácteos'],
})

# Seleccionar columna
print(df['precio'])
print(df[['producto', 'precio']])  # varias columnas

# Filtrar filas (boolean indexing)
baratos = df[df['precio'] < 1000]
print(baratos)

# Filtro múltiple: precio < 2000 Y stock > 20
seleccion = df[(df['precio'] < 2000) & (df['stock'] > 20)]
print(seleccion)

# Seleccionar por posición
print(df.iloc[0])    # primera fila
print(df.iloc[1:3])  # filas 1 y 2`} />

      <h2>Operaciones sobre columnas</h2>

      <CodeBlock code={`import pandas as pd

df = pd.DataFrame({
    'producto':  ['arroz', 'aceite', 'azúcar', 'sal', 'leche'],
    'precio':    [1200, 2500, 800, 400, 1800],
    'stock':     [50, 30, 80, 120, 15],
})

# Nueva columna: valor total en almacén
df['valor_total'] = df['precio'] * df['stock']

# Transformar columna existente
df['precio_con_iva'] = df['precio'] * 1.15

# Ordenar
df_ordenado = df.sort_values('valor_total', ascending=False)
print(df_ordenado.to_string(index=False))`} />

      <h2>Agrupación — groupby</h2>

      <p>
        <code>groupby</code> es una de las operaciones más potentes de Pandas. Agrupa filas por una
        columna y calcula estadísticas por grupo:
      </p>

      <CodeBlock code={`import pandas as pd
import numpy as np

np.random.seed(0)
ventas = pd.DataFrame({
    'ciudad':   np.random.choice(['Malabo', 'Bata', 'Mongomo'], 100),
    'producto': np.random.choice(['A', 'B', 'C'], 100),
    'monto':    np.random.randint(10_000, 500_000, 100),
})

# Ventas totales por ciudad
por_ciudad = ventas.groupby('ciudad')['monto'].sum().sort_values(ascending=False)
print(por_ciudad)

# Media y total por ciudad y producto
resumen = ventas.groupby(['ciudad', 'producto'])['monto'].agg(['mean', 'sum'])
print(resumen)`} />

      <h2>Valores nulos — el problema más común en ML</h2>

      <p>
        Los datos reales casi siempre tienen valores faltantes (<code>NaN</code>). Los modelos de ML
        no pueden trabajar con ellos directamente — hay que tratarlos primero.
      </p>

      <CodeBlock code={`import pandas as pd
import numpy as np

df = pd.DataFrame({
    'edad':      [25, np.nan, 32, 28, np.nan, 41],
    'salario':   [800_000, 1_200_000, np.nan, 950_000, 1_100_000, np.nan],
    'ciudad':    ['Malabo', 'Bata', None, 'Malabo', 'Bata', 'Mongomo'],
})

print("Nulos por columna:")
print(df.isnull().sum())

# Estrategia 1: eliminar filas con nulos
df_limpio = df.dropna()

# Estrategia 2: rellenar con la media (para números)
df['edad'].fillna(df['edad'].mean(), inplace=True)
df['salario'].fillna(df['salario'].median(), inplace=True)

# Estrategia 3: rellenar con el valor más frecuente (para texto)
df['ciudad'].fillna(df['ciudad'].mode()[0], inplace=True)

print("\\nDespués de limpiar:")
print(df.isnull().sum())`} />

      <Callout kind="warn" title="Nunca elimines nulos sin pensar">
        Eliminar filas con nulos puede parecer la solución fácil, pero si el 30% de tus datos tiene
        valores faltantes y los eliminas, pierdes información valiosa. Rellenar con la media o mediana
        suele ser mejor. En el Libro 2 aprenderás técnicas más sofisticadas de imputación.
      </Callout>

      <Quiz
        question="Tienes un DataFrame con 1000 filas. df[df['precio'] > 500] devuelve 342 filas. ¿Qué significa?"
        options={[
          '342 productos tienen precio mayor que 500',
          'El precio promedio es 342',
          'Hay 342 errores en el DataFrame',
          'Faltan 342 valores en la columna precio',
        ]}
        correct={0}
        explanation="El boolean indexing df[condición] filtra y devuelve solo las filas donde la condición es True. Si devuelve 342 filas, es que 342 productos cumplen precio > 500."
      />

      <Quiz
        question="¿Para qué sirve df.describe()?"
        options={[
          'Muestra los primeros 5 registros del DataFrame',
          'Muestra estadísticas descriptivas: media, std, min, max, percentiles de columnas numéricas',
          'Describe los nombres de las columnas y sus tipos',
          'Calcula correlaciones entre todas las columnas',
        ]}
        correct={1}
        explanation="describe() genera un resumen estadístico: count, mean, std, min, 25%, 50%, 75%, max para cada columna numérica. Es el primer comando de exploración de cualquier dataset."
      />

      <Exercise number={1} title="Análisis de ventas de una empresa"
        runner={{
          initial: `import pandas as pd
import numpy as np

# Dataset de ventas
np.random.seed(123)
n = 200
df = pd.DataFrame({
    'fecha':     pd.date_range('2024-01-01', periods=n, freq='D'),
    'ciudad':    np.random.choice(['Malabo', 'Bata', 'Mongomo', 'Ebibeyin'], n),
    'producto':  np.random.choice(['Electrónica', 'Ropa', 'Alimentación', 'Hogar'], n),
    'monto':     np.random.randint(5_000, 200_000, n),
    'unidades':  np.random.randint(1, 50, n),
})

# 1. Muestra las primeras 5 filas
print("=== Primeras filas ===")
print(df.head())

# 2. Estadísticas básicas del monto
print("\\n=== Estadísticas de ventas ===")
print(df['monto'].describe())

# 3. Ciudad con más ventas en total
print("\\n=== Ventas por ciudad ===")
print(df.groupby('ciudad')['monto'].sum().sort_values(ascending=False))

# 4. Producto más vendido (por unidades)
print("\\n=== Unidades por producto ===")
print(df.groupby('producto')['unidades'].sum().sort_values(ascending=False))`,
          hint: 'Usa groupby("columna")["otra"].sum() para agregar.',
          solution: {
            code: `import pandas as pd, numpy as np
np.random.seed(123)
n = 200
df = pd.DataFrame({
    'ciudad': np.random.choice(['Malabo','Bata','Mongomo','Ebibeyin'], n),
    'producto': np.random.choice(['Electrónica','Ropa','Alimentación','Hogar'], n),
    'monto': np.random.randint(5_000, 200_000, n),
    'unidades': np.random.randint(1, 50, n),
})
print(df.groupby('ciudad')['monto'].sum().sort_values(ascending=False))
print(df.groupby('producto')['unidades'].sum().sort_values(ascending=False))`,
          }
        }}
      >
        <p>Analiza un dataset de ventas: explora la estructura, calcula estadísticas por ciudad y producto.</p>
      </Exercise>

      <Exercise number={2} title="Limpieza de datos reales" difficulty="intermedio"
        runner={{
          initial: `import pandas as pd
import numpy as np

# Dataset con problemas típicos: nulos, duplicados, tipos incorrectos
data = {
    'nombre':   ['Ana García', 'Carlos López', None, 'Ana García', 'María Pérez', 'Juan Ruiz'],
    'edad':     [28, None, 35, 28, 'treinta', 42],
    'salario':  [850_000, 1_200_000, 780_000, 850_000, None, 960_000],
    'ciudad':   ['Malabo', 'Bata', 'malabo', None, 'Bata', 'Mongomo'],
}
df = pd.DataFrame(data)

print("=== DataFrame original ===")
print(df)
print("\\nNulos:", df.isnull().sum().sum(), "valores nulos")
print("Duplicados:", df.duplicated().sum(), "filas duplicadas")

# TU TURNO: limpia el dataset
# 1. Elimina duplicados
df = df.drop_duplicates()

# 2. Convierte 'edad' a numérico (errors='coerce' convierte errores en NaN)
df['edad'] = pd.to_numeric(df['edad'], errors='coerce')

# 3. Rellena nulos de edad con la mediana
df['edad'] = df['edad'].fillna(df['edad'].median())

# 4. Rellena nulos de salario con la media
df['salario'] = df['salario'].fillna(df['salario'].mean())

# 5. Normaliza ciudad a mayúsculas consistentes
df['ciudad'] = df['ciudad'].str.title().fillna('Desconocido')

# 6. Elimina filas donde nombre es nulo
df = df.dropna(subset=['nombre'])

print("\\n=== DataFrame limpio ===")
print(df.reset_index(drop=True))`,
          hint: 'pd.to_numeric(col, errors="coerce") convierte errores a NaN. str.title() capitaliza correctamente.',
          solution: {
            code: `import pandas as pd, numpy as np
data = {'nombre':['Ana','Carlos',None,'Ana','María','Juan'], 'edad':[28,None,35,28,'treinta',42], 'salario':[850,1200,780,850,None,960], 'ciudad':['Malabo','Bata','malabo',None,'Bata','Mongomo']}
df = pd.DataFrame(data)
df = df.drop_duplicates()
df['edad'] = pd.to_numeric(df['edad'], errors='coerce').fillna(df['edad'].median())
df['salario'] = df['salario'].fillna(df['salario'].mean())
df['ciudad'] = df['ciudad'].str.title().fillna('Desconocido')
df = df.dropna(subset=['nombre'])
print(df.reset_index(drop=True))`,
          }
        }}
      >
        <p>Limpia un dataset con problemas reales: valores nulos, tipos incorrectos, duplicados y capitalización inconsistente.</p>
      </Exercise>

      <Callout kind="success" title="Módulo completado">
        Pandas te permite explorar, filtrar, agrupar y limpiar datos con pocas líneas de código.
        En el siguiente módulo aprenderás a <em>visualizar</em> esos datos — porque un gráfico revela
        patrones que no verías nunca en una tabla.
      </Callout>

      <ChapterNav
        prev={prev ? { id: prev.id, title: prev.title } : null}
        next={next ? { id: next.id, title: next.title } : null}
        onNav={onNav}
      />
    </article>
  );
}

window.ChapterL1M3 = ChapterL1M3;
