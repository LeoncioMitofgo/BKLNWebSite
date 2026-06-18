// =============================================================
// chapter-l2-m1.jsx — Preprocesamiento de datos
// =============================================================

function ChapterL2M1({ onNav }) {
  const flat = flatTOC();
  const idx = flat.findIndex(c => c.id === 'l2-m1');
  const prev = flat[idx - 1], next = flat[idx + 1];

  return (
    <article className="reader-inner">
      <ChapterHeader
        book="// libro ii — técnicas avanzadas"
        module="módulo 01"
        time="40 min · la base de todo modelo real"
        title={<>Preprocesamiento<br /><em>de datos</em><span style={{color:'var(--highlight)'}}>.</span></>}
        dek="El 80% del trabajo real en ML no es el modelo — es limpiar, transformar y preparar los datos correctamente."
      />

      <p>
        En los ejercicios del Libro 1 usamos datasets de scikit-learn ya limpios y bien formateados.
        En el mundo real, los datos vienen con valores nulos, categorías como texto, escalas dispares
        y outliers que rompen los modelos. Este módulo te enseña a manejar todos esos casos.
      </p>

      <h2>Variables categóricas: encoding</h2>

      <p>
        Los modelos de ML solo trabajan con números. Cuando tienes una columna "ciudad" con valores
        como "Madrid", "Barcelona", "Valencia", necesitas convertirla. Hay tres estrategias principales,
        y elegir la incorrecta puede introducir sesgos artificiales.
      </p>

      <DataTable
        data={[
          { técnica: 'Label Encoding', qué_hace: 'Madrid=0, Barcelona=1, Valencia=2', cuándo_usarla: 'Variables ordinales (Malo < Regular < Bueno)' },
          { técnica: 'One-Hot Encoding', qué_hace: 'Columna binaria por categoría', cuándo_usarla: 'Variables nominales sin orden (ciudad, color)' },
          { técnica: 'Ordinal Encoding', qué_hace: 'Asigna enteros respetando orden definido', cuándo_usarla: 'Variables con orden explícito (bajo/medio/alto)' },
        ]}
        caption="Cómo convertir variables categóricas a números"
      />

      <Exercise number={1} title="Encoding de variables categóricas"
        runner={{
          initial: `import numpy as np
import pandas as pd
from sklearn.preprocessing import LabelEncoder, OneHotEncoder, OrdinalEncoder

# Dataset de ejemplo: clientes de una tienda
datos = pd.DataFrame({
    'ciudad':    ['Madrid', 'Barcelona', 'Valencia', 'Madrid', 'Barcelona'],
    'nivel':     ['Alto', 'Bajo', 'Medio', 'Medio', 'Alto'],
    'genero':    ['M', 'F', 'F', 'M', 'F'],
    'compras':   [150, 80, 120, 200, 95]
})

print("Dataset original:")
print(datos)
print()

# 1. Label Encoding (solo para demostrar — MAL para 'ciudad')
le = LabelEncoder()
datos_le = datos.copy()
datos_le['ciudad_le'] = le.fit_transform(datos['ciudad'])
print("Label Encoding (ciudad):", dict(zip(le.classes_, le.transform(le.classes_))))

# 2. One-Hot Encoding (correcto para 'ciudad' y 'genero')
datos_ohe = pd.get_dummies(datos, columns=['ciudad', 'genero'], drop_first=False)
print()
print("One-Hot Encoding:")
print(datos_ohe)

# 3. Ordinal Encoding (correcto para 'nivel')
oe = OrdinalEncoder(categories=[['Bajo', 'Medio', 'Alto']])
datos_ord = datos.copy()
datos_ord['nivel_num'] = oe.fit_transform(datos[['nivel']])
print()
print("Ordinal Encoding (nivel):")
print(datos_ord[['nivel', 'nivel_num']])`,
          hint: 'pd.get_dummies() es la forma más rápida de aplicar One-Hot Encoding con pandas. OrdinalEncoder acepta el orden explícito de categorías.',
        }}
      >
        <p>Compara las tres técnicas de encoding en un dataset de clientes. Observa por qué Label Encoding en variables nominales puede introducir relaciones falsas.</p>
      </Exercise>

      <h2>Outliers: detección y tratamiento</h2>

      <p>
        Un outlier es un valor atípico que se aleja significativamente del resto. Puede ser un error
        de medición (glucosa = 9999) o un caso real extremo. Los outliers afectan gravemente a la
        regresión lineal y a los modelos basados en distancias como KNN.
      </p>

      <p>
        El método más robusto es el <strong>rango intercuartílico (IQR)</strong>: valores por debajo
        de Q1 − 1.5·IQR o por encima de Q3 + 1.5·IQR se consideran atípicos.
      </p>

      <Exercise number={2} title="Detección y manejo de outliers con IQR"
        runner={{
          initial: `import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

np.random.seed(42)
n = 200

# Dataset de salarios con outliers artificiales
salarios_normales = np.random.normal(2800, 600, n)
# Añadir outliers: errores de entrada de datos
outliers = np.array([25000, 30000, -500, 35000, 22000])
salarios = np.concatenate([salarios_normales, outliers])

df = pd.DataFrame({'salario': salarios})

# Calcular límites IQR
Q1 = df['salario'].quantile(0.25)
Q3 = df['salario'].quantile(0.75)
IQR = Q3 - Q1
lim_inf = Q1 - 1.5 * IQR
lim_sup = Q3 + 1.5 * IQR

es_outlier = (df['salario'] < lim_inf) | (df['salario'] > lim_sup)
print(f"Q1={Q1:.0f}, Q3={Q3:.0f}, IQR={IQR:.0f}")
print(f"Límites: [{lim_inf:.0f}, {lim_sup:.0f}]")
print(f"Outliers detectados: {es_outlier.sum()} de {len(df)}")
print()

# Estrategias de tratamiento
df_clip   = df.copy(); df_clip['salario']    = df['salario'].clip(lim_inf, lim_sup)
df_remove = df[~es_outlier].copy()
df_median = df.copy(); df_median.loc[es_outlier, 'salario'] = df['salario'].median()

print(f"Original  — media: {df['salario'].mean():.0f}, mediana: {df['salario'].median():.0f}")
print(f"Eliminado — media: {df_remove['salario'].mean():.0f}, mediana: {df_remove['salario'].median():.0f}")
print(f"Recortado — media: {df_clip['salario'].mean():.0f}, mediana: {df_clip['salario'].median():.0f}")

# Visualización
fig, axes = plt.subplots(1, 3, figsize=(13, 4))
for ax, d, title in zip(axes,
    [df['salario'], df_remove['salario'], df_clip['salario']],
    ['Original (con outliers)', 'Outliers eliminados', 'Outliers recortados']):
    ax.boxplot(d, vert=True)
    ax.set_title(title)
    ax.set_ylabel('Salario (FCFA)')
plt.tight_layout()
plt.show()`,
          hint: 'df.clip(lower, upper) recorta los valores al rango dado. df[~mask] filtra filas donde la máscara es False.',
        }}
      >
        <p>Detecta outliers en un dataset de salarios con el método IQR y compara tres estrategias de tratamiento: eliminar, recortar e imputar con la mediana.</p>
      </Exercise>

      <h2>Datos desbalanceados</h2>

      <p>
        Cuando una clase es mucho más frecuente que otra (por ejemplo, 98% transacciones legítimas
        vs 2% fraude), los modelos tienden a ignorar la clase minoritaria. Hay tres formas de combatirlo:
      </p>

      <Exercise number={3} title="class_weight vs SMOTE en clasificación desbalanceada" difficulty="intermedio"
        runner={{
          initial: `import numpy as np
import matplotlib.pyplot as plt
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import cross_validate
from sklearn.metrics import f1_score, make_scorer
from sklearn.datasets import make_classification

np.random.seed(42)

# Dataset muy desbalanceado: 95% negativos, 5% positivos
X, y = make_classification(
    n_samples=1000, n_features=8, n_informative=5,
    weights=[0.95, 0.05], random_state=42
)
print(f"Distribución: {(y==0).sum()} negativos / {(y==1).sum()} positivos")
print()

f1_minority = make_scorer(f1_score, pos_label=1)

modelos = {
    'Sin ajuste':          RandomForestClassifier(n_estimators=100, random_state=42),
    'class_weight=balanced': RandomForestClassifier(n_estimators=100, class_weight='balanced', random_state=42),
    'class_weight manual': RandomForestClassifier(n_estimators=100, class_weight={0:1, 1:20}, random_state=42),
}

resultados = {}
for nombre, modelo in modelos.items():
    cv = cross_validate(modelo, X, y, cv=5,
                        scoring={'accuracy': 'accuracy', 'f1': f1_minority})
    resultados[nombre] = cv
    print(f"{nombre}:")
    print(f"  Accuracy: {cv['test_accuracy'].mean():.3f} ± {cv['test_accuracy'].std():.3f}")
    print(f"  F1 clase minoritaria: {cv['test_f1'].mean():.3f} ± {cv['test_f1'].std():.3f}")
    print()

# Gráfico comparativo
fig, axes = plt.subplots(1, 2, figsize=(11, 4))
nombres = list(resultados.keys())
for i, (metrica, titulo) in enumerate([('test_accuracy', 'Accuracy'), ('test_f1', 'F1 (clase minoritaria)')]):
    axes[i].boxplot([resultados[n][metrica] for n in nombres],
                    labels=['Sin ajuste', 'Balanced', 'Manual'])
    axes[i].set_title(titulo)
    axes[i].grid(True, alpha=0.3)
plt.suptitle('Impacto de class_weight en dataset desbalanceado')
plt.tight_layout()
plt.show()`,
          hint: 'class_weight="balanced" ajusta automáticamente los pesos inversamente proporcionales a la frecuencia de cada clase. El F1 de la clase minoritaria es la métrica clave aquí.',
        }}
      >
        <p>Compara tres configuraciones de Random Forest en un dataset desbalanceado 95/5. Observa cómo <code>class_weight</code> mejora la detección de la clase minoritaria.</p>
      </Exercise>

      <Quiz
        question="Tienes una columna 'talla' con valores S, M, L, XL. ¿Qué encoding usarías?"
        options={[
          'One-Hot Encoding, porque son categorías sin orden',
          'Ordinal Encoding, porque hay un orden natural (S < M < L < XL)',
          'Label Encoding, porque son texto',
          'Ninguno, los modelos pueden manejar texto directamente',
        ]}
        correct={1}
        explanation="S < M < L < XL tiene un orden semántico claro. Ordinal Encoding preserva esa relación numérica (S=0, M=1, L=2, XL=3). One-Hot Encoding ignoraría el orden y crearía 4 columnas innecesariamente."
      />

      <Quiz
        question="Un modelo de fraude tiene Accuracy=99% en un dataset con 99% de transacciones legítimas. ¿Qué está pasando probablemente?"
        options={[
          'El modelo es excelente y está perfectamente calibrado',
          'El modelo puede estar prediciendo siempre "legítima" — una accuracy engañosa por el desbalance',
          'El modelo tiene data leakage del test set',
          'El dataset tiene demasiados outliers que el modelo maneja bien',
        ]}
        correct={1}
        explanation="En datasets 99/1, un modelo que siempre predice la clase mayoritaria tiene 99% accuracy sin aprender nada. Siempre usa F1, Recall o ROC-AUC en clasificación desbalanceada."
      />

      <Callout kind="success" title="Módulo completado">
        Ahora puedes manejar los tres problemas más comunes en datos reales: variables categóricas,
        outliers y desbalance de clases. En el siguiente módulo añadirás <em>regularización</em> a
        tus modelos de regresión para combatir el overfitting con alta dimensionalidad.
      </Callout>

      <ChapterNav
        prev={prev ? { id: prev.id, title: prev.title } : null}
        next={next ? { id: next.id, title: next.title } : null}
        onNav={onNav}
      />
    </article>
  );
}

window.ChapterL2M1 = ChapterL2M1;
