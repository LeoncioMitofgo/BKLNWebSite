// =============================================================
// chapter-l1-m7.jsx — Árboles de decisión y Random Forest
// =============================================================

function ChapterL1M7({ onNav }) {
  const flat = flatTOC();
  const idx = flat.findIndex(c => c.id === 'l1-m7');
  const prev = flat[idx - 1], next = flat[idx + 1];

  return (
    <article className="reader-inner">
      <ChapterHeader
        book="// libro i — fundamentos"
        module="módulo 07"
        time="40 min · el algoritmo más usado en producción"
        title={<>Árboles y<br /><em>Random Forest</em><span style={{color:'var(--highlight)'}}>.</span></>}
        dek="El algoritmo que aprende reglas legibles — y cómo cien árboles juntos superan a cualquiera por separado."
      />

      <p>
        Los <strong>árboles de decisión</strong> son los modelos más intuitivos del ML. Imitan exactamente
        cómo tomamos decisiones en la vida real: una serie de preguntas binarias que llevan a una conclusión.
        ¿Tiene fiebre? Sí → ¿Tos seca? Sí → <em>Probablemente viral</em>.
      </p>

      <p>
        La diferencia con KNN o la regresión es que un árbol <em>aprende las reglas explícitamente</em>.
        Puedes imprimirlo, leerlo y explicar cada predicción. En sectores como la banca, la salud o el
        sector legal, esto es a menudo más valioso que la precisión bruta.
      </p>

      <h2>Cómo aprende un árbol</h2>

      <p>
        En cada nodo del árbol, el algoritmo elige la pregunta (la división del espacio) que mejor separa
        las clases. El criterio más común es la <strong>impureza de Gini</strong>: mide cuán mezcladas
        están las clases en cada nodo. A mayor pureza, mejor la división.
      </p>

      <CodeBlock code={`from sklearn.tree import DecisionTreeClassifier
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split
from sklearn.metrics import accuracy_score

iris = load_iris()
X, y = iris.data, iris.target
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=42)

# Árbol sin límite → memorizará todo (overfitting)
arbol_profundo = DecisionTreeClassifier(random_state=42)
arbol_profundo.fit(X_train, y_train)

# Árbol limitado en profundidad → mejor generalización
arbol_podado = DecisionTreeClassifier(max_depth=3, random_state=42)
arbol_podado.fit(X_train, y_train)

print("Sin límite — Train:", arbol_profundo.score(X_train, y_train))
print("Sin límite — Test: ", arbol_profundo.score(X_test, y_test))
print()
print("Podado (depth=3) — Train:", arbol_podado.score(X_train, y_train))
print("Podado (depth=3) — Test: ", arbol_podado.score(X_test, y_test))`} />

      <Callout kind="warn" title="Overfitting en árboles">
        Un árbol sin límite de profundidad memoriza el dataset de entrenamiento — incluyendo el ruido.
        En entrenamiento tendrá 100% de accuracy, pero fallará con datos nuevos. Limitar la profundidad
        con <code>max_depth</code> es la forma más directa de combatir el overfitting.
      </Callout>

      <h2>Importancia de features</h2>

      <p>
        Una de las grandes ventajas de los árboles: te dicen qué variables son más importantes para la
        predicción. Esto es crucial para entender el problema y para limpiar features irrelevantes.
      </p>

      <Exercise number={1} title="Importancia de variables en predicción de diabetes"
        runner={{
          initial: `import numpy as np
import matplotlib.pyplot as plt
from sklearn.tree import DecisionTreeClassifier
from sklearn.datasets import load_diabetes
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import Binarizer

# Usamos el dataset de diabetes (regresión → lo convertimos a clasificación)
datos = load_diabetes()
X = datos.data
# Binarizamos: 1 si progresión alta, 0 si baja
umbral = np.median(datos.target)
y = (datos.target > umbral).astype(int)

feature_names = ['edad','sexo','IMC','PA','S1','S2','S3','S4','S5','S6']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=42)

arbol = DecisionTreeClassifier(max_depth=4, random_state=42)
arbol.fit(X_train, y_train)

print(f"Accuracy: {arbol.score(X_test, y_test):.3f}")
print()

# Importancia de features
importancias = arbol.feature_importances_
orden = np.argsort(importancias)[::-1]

print("Importancia de cada variable:")
for i in orden:
    bar = '█' * int(importancias[i] * 40)
    print(f"  {feature_names[i]:5s}: {importancias[i]:.3f}  {bar}")

# Gráfico
plt.figure(figsize=(9, 5))
plt.barh([feature_names[i] for i in orden[::-1]],
         [importancias[i] for i in orden[::-1]],
         color='#1F4E5F', alpha=0.8)
plt.xlabel('Importancia')
plt.title('Importancia de features — Árbol de decisión')
plt.tight_layout()
plt.show()`,
          hint: 'feature_importances_ es un array con la importancia relativa de cada feature. np.argsort()[::-1] ordena de mayor a menor.',
        }}
      >
        <p>Visualiza qué variables son más importantes para predecir la progresión de diabetes usando un árbol de decisión.</p>
      </Exercise>

      <h2>Random Forest — la sabiduría de la multitud</h2>

      <p>
        Un árbol individual es inestable: pequeñas variaciones en los datos pueden producir árboles muy
        distintos. La solución: entrenar <em>cientos de árboles</em> en versiones ligeramente diferentes
        del dataset, y combinar sus predicciones. A esto se llama <strong>ensemble</strong>.
      </p>

      <p>
        <strong>Random Forest</strong> hace exactamente eso: cada árbol se entrena con una muestra
        aleatoria del dataset (bootstrapping) y en cada nodo solo considera un subconjunto aleatorio
        de features. El resultado es mucho más robusto y preciso que cualquier árbol individual.
      </p>

      <Exercise number={2} title="Random Forest vs árbol individual" difficulty="intermedio"
        runner={{
          initial: `import numpy as np
import matplotlib.pyplot as plt
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import cross_val_score
from sklearn.datasets import make_classification

# Dataset sintético de clasificación binaria
X, y = make_classification(
    n_samples=500, n_features=10, n_informative=6,
    n_redundant=2, random_state=42
)

modelos = {
    'Árbol (depth=3)':  DecisionTreeClassifier(max_depth=3, random_state=42),
    'Árbol (sin límite)': DecisionTreeClassifier(random_state=42),
    'Random Forest (50 árboles)': RandomForestClassifier(n_estimators=50, random_state=42),
    'Random Forest (200 árboles)': RandomForestClassifier(n_estimators=200, random_state=42),
}

resultados = {}
for nombre, modelo in modelos.items():
    scores = cross_val_score(modelo, X, y, cv=5, scoring='accuracy')
    resultados[nombre] = scores
    print(f"{nombre:35s}  {scores.mean():.3f} ± {scores.std():.3f}")

# Gráfico comparativo
plt.figure(figsize=(10, 5))
nombres = list(resultados.keys())
medias  = [resultados[n].mean() for n in nombres]
errors  = [resultados[n].std() for n in nombres]
colores = ['#C99419', '#A8331E', '#1F4E5F', '#3F6B3B']

bars = plt.barh(nombres, medias, xerr=errors, color=colores, alpha=0.8, capsize=5)
plt.xlabel('Accuracy (validación cruzada 5-fold)')
plt.title('Comparativa: árbol individual vs Random Forest')
plt.xlim(0.6, 1.0)
plt.tight_layout()
plt.show()`,
          hint: 'cross_val_score evalúa el modelo en 5 particiones distintas. La media ± desviación estándar es una medida más fiable que una sola evaluación.',
        }}
      >
        <p>Compara el accuracy de un árbol individual vs Random Forest con validación cruzada. Observa cómo el ensemble mejora tanto la precisión como la estabilidad.</p>
      </Exercise>

      <Quiz
        question="¿Por qué Random Forest es más robusto que un árbol de decisión individual?"
        options={[
          'Porque usa más memoria RAM y puede procesar más datos',
          'Porque combina las predicciones de muchos árboles entrenados en muestras y features aleatorias',
          'Porque aplica normalización automática antes de entrenar',
          'Porque Random Forest no puede hacer overfitting nunca',
        ]}
        correct={1}
        explanation="La diversidad forzada (muestras aleatorias + features aleatorias por nodo) hace que cada árbol cometa errores distintos. Al promediar, los errores se cancelan parcialmente y el resultado es más estable y preciso."
      />

      <Quiz
        question="Un árbol de decisión sin límite de profundidad obtiene 100% de accuracy en training y 68% en test. ¿Qué ocurre?"
        options={[
          'El modelo es perfecto y necesita más datos de test',
          'Hay overfitting: el árbol memorizó el training en lugar de aprender patrones generalizables',
          'El dataset tiene muy pocos ejemplos de test',
          'El problema es demasiado difícil para un árbol de decisión',
        ]}
        correct={1}
        explanation="100% en train y 68% en test es el síntoma clásico de overfitting. El árbol se adaptó perfectamente al ruido del training set y no generaliza. Solución: limitar max_depth, min_samples_leaf, o usar Random Forest."
      />

      <Callout kind="success" title="Módulo completado">
        Entiendes los árboles de decisión, el problema del overfitting y por qué los ensembles como
        Random Forest son superiores. En el último módulo del Libro 1 aprenderás a medir correctamente
        si tu modelo realmente funciona — el paso que separa los proyectos de juguete de los sistemas
        en producción.
      </Callout>

      <ChapterNav
        prev={prev ? { id: prev.id, title: prev.title } : null}
        next={next ? { id: next.id, title: next.title } : null}
        onNav={onNav}
      />
    </article>
  );
}

window.ChapterL1M7 = ChapterL1M7;
