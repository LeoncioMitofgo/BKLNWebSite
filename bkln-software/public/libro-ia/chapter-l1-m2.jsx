// =============================================================
// chapter-l1-m2.jsx — NumPy: vectores y matrices
// =============================================================

function ChapterL1M2({ onNav }) {
  const flat = flatTOC();
  const idx = flat.findIndex(c => c.id === 'l1-m2');
  const prev = flat[idx - 1], next = flat[idx + 1];

  return (
    <article className="reader-inner">
      <ChapterHeader
        book="// libro i — fundamentos"
        module="módulo 02"
        time="30 min · ejercicios incluidos"
        title={<>NumPy<span style={{color:'var(--highlight)'}}>.</span></>}
        dek="Vectores, matrices y operaciones matemáticas a escala — la columna vertebral del ML."
      />

      <p>
        Imagina que tienes 100.000 precios de casas y necesitas calcular la media, multiplicar todos por
        un factor de conversión de moneda y encontrar los que están por encima del umbral. Con listas de
        Python puras, eso requiere bucles. Con <strong>NumPy</strong>, es una sola línea.
      </p>

      <p>
        NumPy introduce el <strong>array</strong> — una estructura de datos homogénea y multidimensional
        que opera a velocidad nativa (C por debajo). Todo el ecosistema ML de Python — Pandas, scikit-learn,
        TensorFlow, PyTorch — usa arrays de NumPy internamente.
      </p>

      <h2>Crear arrays</h2>

      <CodeBlock code={`import numpy as np

# Desde una lista de Python
a = np.array([10, 20, 30, 40, 50])
print(a)         # [10 20 30 40 50]
print(a.dtype)   # int64
print(a.shape)   # (5,)  ← 5 elementos, 1 dimensión

# Secuencias
rango = np.arange(0, 10, 2)    # [0 2 4 6 8]
linspace = np.linspace(0, 1, 5) # [0.   0.25 0.5  0.75 1.  ]

# Arrays especiales
ceros = np.zeros(4)       # [0. 0. 0. 0.]
unos  = np.ones((2, 3))   # matriz 2×3 de unos
aleatorio = np.random.rand(3, 3)  # matriz 3×3 aleatoria`} />

      <h2>Arrays 2D: las matrices</h2>

      <p>
        En ML, los datos normalmente se representan como matrices donde cada <strong>fila es un ejemplo</strong>
        y cada <strong>columna es una característica</strong> (feature). Un dataset de 1000 casas con 5
        características sería una matriz de forma <code>(1000, 5)</code>.
      </p>

      <CodeBlock code={`import numpy as np

# Dataset: 4 casas con 3 características (m², habitaciones, año)
X = np.array([
    [85,  3, 2010],
    [120, 4, 2015],
    [60,  2, 2008],
    [200, 5, 2020],
])

print("Forma:", X.shape)      # (4, 3) — 4 filas, 3 columnas
print("Primera casa:", X[0])  # [85  3  2010]
print("Todos los m²:", X[:, 0])  # [85 120 60 200]`} />

      <h2>Operaciones vectorizadas</h2>

      <p>
        La ventaja clave de NumPy es que las operaciones se aplican a <em>todos los elementos a la vez</em>
        sin escribir bucles. Esto es lo que se llama <strong>vectorización</strong>.
      </p>

      <CodeBlock code={`import numpy as np

precios_fcfa = np.array([15_000_000, 22_000_000, 8_500_000, 35_000_000])

# Convertir a euros (tasa aproximada: 1 EUR ≈ 655 FCFA)
precios_eur = precios_fcfa / 655
print(precios_eur.astype(int))  # [22900 33587 12977 53435]

# Aplicar descuento del 10% a todos
con_descuento = precios_fcfa * 0.90
print(con_descuento / 1_000_000, "millones FCFA")

# Filtrar: ¿cuáles cuestan más de 20M FCFA?
caros = precios_fcfa[precios_fcfa > 20_000_000]
print("Propiedades caras:", caros)`} />

      <h2>Estadísticas básicas</h2>

      <CodeBlock code={`import numpy as np

notas = np.array([72, 85, 61, 90, 78, 55, 88, 94, 66, 73])

print("Media:", np.mean(notas))       # 76.2
print("Mediana:", np.median(notas))   # 75.5
print("Desv. estándar:", np.std(notas))  # 12.6
print("Mínimo:", np.min(notas))       # 55
print("Máximo:", np.max(notas))       # 94
print("25%:", np.percentile(notas, 25))  # 66.75
print("75%:", np.percentile(notas, 75))  # 88.5`} />

      <h2>Álgebra lineal — el corazón del ML</h2>

      <p>
        Los algoritmos de ML son matemáticamente operaciones de álgebra lineal. NumPy las hace simples:
      </p>

      <CodeBlock code={`import numpy as np

# Producto punto (dot product) — clave en regresión y redes neuronales
pesos = np.array([0.3, 0.5, 0.2])
features = np.array([100, 3, 2015])
prediccion = np.dot(pesos, features)
print("Predicción:", prediccion)

# Multiplicación de matrices
A = np.array([[1, 2], [3, 4]])
B = np.array([[5, 6], [7, 8]])
C = A @ B    # operador @ para matrices en Python 3
print(C)     # [[19 22] [43 50]]

# Transponer
print(A.T)   # [[1 3] [2 4]]`} />

      <Callout kind="tip" title="Shape es todo">
        Antes de operar con arrays, mira siempre <code>array.shape</code>. La mayoría de los errores
        en ML provienen de shapes incompatibles. Un error como <em>shapes (100, 5) and (4,) not aligned</em>
        significa que estás multiplicando matrices de dimensiones incorrectas.
      </Callout>

      <Quiz
        question="Tienes un dataset con 500 muestras y 8 características. ¿Cuál es el shape del array?"
        options={['(8, 500)', '(500, 8)', '(500,)', '(8,)']}
        correct={1}
        explanation="La convención en ML es (n_muestras, n_características). 500 filas (ejemplos) × 8 columnas (features) → shape (500, 8)."
      />

      <Quiz
        question="¿Cuál es la diferencia entre np.zeros(5) y np.zeros((5, 5))?"
        options={[
          'Son idénticos, solo es una cuestión de estilo',
          'El primero crea un vector de 5 elementos; el segundo una matriz 5×5',
          'El primero crea enteros; el segundo crea floats',
          'np.zeros((5,5)) es una forma incorrecta de escribirlo',
        ]}
        correct={1}
        explanation="np.zeros(5) → shape (5,) — un vector 1D de 5 ceros. np.zeros((5,5)) → shape (5,5) — una matriz 2D de 5×5 ceros. La tupla define las dimensiones."
      />

      <Exercise number={1} title="Estadísticas de ventas con NumPy"
        runner={{
          initial: `import numpy as np

# Ventas mensuales de un negocio (en miles de FCFA)
ventas = np.array([
    450, 520, 380, 610, 490, 720, 680, 530, 450, 590, 640, 710
])

# Calcula y muestra:
# 1. Total anual
# 2. Promedio mensual
# 3. Mes con más ventas (índice)
# 4. Meses por encima del promedio (cuántos)
# 5. Crecimiento: último mes vs primer mes (%)

total = np.sum(ventas)
promedio = np.mean(ventas)
mejor_mes = np.argmax(ventas) + 1  # +1 para que sea mes 1-12
encima = np.sum(ventas > promedio)
crecimiento = (ventas[-1] - ventas[0]) / ventas[0] * 100

print(f"Total anual: {total:,} k FCFA")
print(f"Promedio mensual: {promedio:.0f} k FCFA")
print(f"Mejor mes: mes {mejor_mes} ({ventas[mejor_mes-1]:,} k FCFA)")
print(f"Meses sobre el promedio: {encima}")
print(f"Crecimiento anual: {crecimiento:+.1f}%")`,
          hint: 'np.argmax() devuelve el índice del valor máximo. np.sum(condición) cuenta cuántos True hay.',
          solution: {
            code: `import numpy as np
ventas = np.array([450,520,380,610,490,720,680,530,450,590,640,710])
print(f"Total: {np.sum(ventas):,}")
print(f"Media: {np.mean(ventas):.0f}")
print(f"Mejor mes: {np.argmax(ventas)+1}")
print(f"Sobre media: {np.sum(ventas > np.mean(ventas))}")
print(f"Crecimiento: {(ventas[-1]-ventas[0])/ventas[0]*100:+.1f}%")`,
          }
        }}
      >
        <p>Analiza las ventas mensuales de un negocio usando las funciones estadísticas de NumPy.</p>
      </Exercise>

      <Exercise number={2} title="Normalización — preparar datos para ML" difficulty="intermedio"
        runner={{
          initial: `import numpy as np

# Los modelos ML funcionan mejor cuando los datos
# están en rangos similares. La normalización min-max
# lleva todos los valores al rango [0, 1].

edades = np.array([22, 35, 28, 45, 19, 52, 33, 41, 27, 38])

# Fórmula: (x - min) / (max - min)
minimo = np.min(edades)
maximo = np.max(edades)
edades_norm = (edades - minimo) / (maximo - minimo)

print("Originales:", edades)
print("Normalizadas:", edades_norm.round(3))
print("¿Rango [0,1]?", edades_norm.min(), "—", edades_norm.max())

# Ahora normaliza también estos precios de casas (m²):
metros = np.array([55, 80, 120, 65, 200, 90, 45, 150])
metros_norm = (metros - metros.min()) / (metros.max() - metros.min())
print("\\nMetros norm.:", metros_norm.round(3))`,
          hint: 'La fórmula min-max es: (x - x.min()) / (x.max() - x.min()). NumPy aplica esto element-wise automáticamente.',
          solution: {
            code: `import numpy as np
def minmax(arr):
    return (arr - arr.min()) / (arr.max() - arr.min())

edades = np.array([22, 35, 28, 45, 19, 52, 33, 41, 27, 38])
metros = np.array([55, 80, 120, 65, 200, 90, 45, 150])

print("Edades norm.:", minmax(edades).round(3))
print("Metros norm.:", minmax(metros).round(3))`,
            explanation: 'La normalización es un paso crítico en ML. Sin ella, features con rangos grandes (precios, distancias) dominan sobre features con rangos pequeños (0-1), sesgando el modelo.',
          }
        }}
      >
        <p>
          En ML es fundamental que todas las características estén en rangos similares antes de entrenar.
          Implementa la normalización min-max para llevar los datos al rango [0, 1].
        </p>
      </Exercise>

      <Callout kind="success" title="Módulo completado">
        Dominas los arrays de NumPy: creación, indexación, operaciones vectorizadas y álgebra lineal básica.
        En el siguiente módulo aprenderás Pandas — construido sobre NumPy — para trabajar con datos reales
        en formato tabular.
      </Callout>

      <ChapterNav
        prev={prev ? { id: prev.id, title: prev.title } : null}
        next={next ? { id: next.id, title: next.title } : null}
        onNav={onNav}
      />
    </article>
  );
}

window.ChapterL1M2 = ChapterL1M2;
