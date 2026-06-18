// =============================================================
// chapter-l1-m6.jsx — Clasificación: K-Nearest Neighbors
// =============================================================

function ChapterL1M6({ onNav }) {
  const flat = flatTOC();
  const idx = flat.findIndex(c => c.id === 'l1-m6');
  const prev = flat[idx - 1], next = flat[idx + 1];

  return (
    <article className="reader-inner">
      <ChapterHeader
        book="// libro i — fundamentos"
        module="módulo 06"
        time="35 min · clasificación visual"
        title={<>Clasificación<span style={{color:'var(--highlight)'}}>.</span></>}
        dek="Cuando la respuesta no es un número sino una categoría — y el algoritmo que aprende por vecindad."
      />

      <p>
        En el módulo anterior predijimos un <em>número continuo</em> (el precio de una casa).
        Pero muchos problemas reales requieren predecir una <strong>categoría</strong>: ¿este email
        es spam o no? ¿este cliente va a cancelar su suscripción? ¿este tumor es maligno o benigno?
        Eso es <strong>clasificación</strong>.
      </p>

      <p>
        El primer clasificador que aprenderás es <strong>K-Nearest Neighbors (KNN)</strong> — literalmente
        "K vecinos más cercanos". La idea es completamente intuitiva: para clasificar un punto nuevo,
        mira cuáles son sus K puntos más cercanos en el dataset de entrenamiento, y asígnale la categoría
        más frecuente entre esos vecinos.
      </p>

      <h2>Cómo funciona KNN</h2>

      <p>
        Imagina que tienes pacientes clasificados como "sano" o "enfermo" según dos análisis de sangre.
        Para clasificar a un paciente nuevo:
      </p>

      <ol>
        <li>Calcula la distancia entre el nuevo paciente y todos los del dataset</li>
        <li>Selecciona los K más cercanos</li>
        <li>La categoría que más se repite entre los K vecinos es la predicción</li>
      </ol>

      <CodeBlock code={`from sklearn.neighbors import KNeighborsClassifier
import numpy as np

# Dataset: [glucosa, presión] → [0=sano, 1=en riesgo]
X_train = np.array([
    [85, 70], [90, 75], [95, 80],  # sanos
    [140, 95], [160, 105], [150, 100],  # en riesgo
])
y_train = np.array([0, 0, 0, 1, 1, 1])

# Crear y entrenar el modelo con K=3
knn = KNeighborsClassifier(n_neighbors=3)
knn.fit(X_train, y_train)

# Clasificar un nuevo paciente
nuevo = np.array([[120, 88]])
clase = knn.predict(nuevo)[0]
proba = knn.predict_proba(nuevo)[0]

etiquetas = {0: 'Sano', 1: 'En riesgo'}
print(f"Paciente con glucosa=120, presión=88:")
print(f"  Clasificado como: {etiquetas[clase]}")
print(f"  Probabilidad sano: {proba[0]:.0%}")
print(f"  Probabilidad en riesgo: {proba[1]:.0%}")`} />

      <h2>Eligiendo K — el hiperparámetro clave</h2>

      <p>
        K es un <strong>hiperparámetro</strong>: un valor que tú decides antes del entrenamiento.
        K pequeño → el modelo es sensible al ruido (overfitting).
        K grande → el modelo es demasiado general (underfitting).
        La forma correcta de elegir K es probando diferentes valores y midiendo el accuracy en los datos de test.
      </p>

      <Exercise number={1} title="Encontrar el K óptimo"
        runner={{
          initial: `import numpy as np
import matplotlib.pyplot as plt
from sklearn.neighbors import KNeighborsClassifier
from sklearn.model_selection import train_test_split
from sklearn.datasets import load_iris
from sklearn.preprocessing import StandardScaler

# Dataset Iris: clasificar 3 especies de flores por sus medidas
iris = load_iris()
X, y = iris.data, iris.target

# Escalar features
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

X_train, X_test, y_train, y_test = train_test_split(
    X_scaled, y, test_size=0.25, random_state=42
)

# Probar K del 1 al 25
k_valores = range(1, 26)
accuracy_train = []
accuracy_test  = []

for k in k_valores:
    knn = KNeighborsClassifier(n_neighbors=k)
    knn.fit(X_train, y_train)
    accuracy_train.append(knn.score(X_train, y_train))
    accuracy_test.append(knn.score(X_test, y_test))

# Mejor K
mejor_k = k_valores[np.argmax(accuracy_test)]
mejor_acc = max(accuracy_test)
print(f"Mejor K: {mejor_k} → Accuracy test: {mejor_acc:.3f}")

# Gráfico
plt.figure(figsize=(10, 5))
plt.plot(k_valores, accuracy_train, 'o-', color='#1F4E5F', label='Train', linewidth=2)
plt.plot(k_valores, accuracy_test,  's-', color='#D9742A', label='Test',  linewidth=2)
plt.axvline(mejor_k, color='#C99419', linestyle='--', label=f'Mejor K={mejor_k}')
plt.xlabel('Valor de K'); plt.ylabel('Accuracy')
plt.title('Accuracy según K — Dataset Iris')
plt.legend(); plt.grid(True, alpha=0.3); plt.tight_layout()
plt.show()`,
          hint: 'knn.score(X, y) devuelve el accuracy directamente. np.argmax() encuentra el índice del valor máximo.',
        }}
      >
        <p>Prueba diferentes valores de K en el dataset Iris y visualiza cómo cambia el accuracy. Identifica el K óptimo.</p>
      </Exercise>

      <Exercise number={2} title="Clasificador de riesgo crediticio" difficulty="intermedio"
        runner={{
          initial: `import numpy as np
import matplotlib.pyplot as plt
from sklearn.neighbors import KNeighborsClassifier
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import classification_report, confusion_matrix

np.random.seed(42)
n = 300

# Features: [ingresos_mensual (k FCFA), deuda_actual (k FCFA), años_empleo]
ingresos  = np.random.normal(900, 250, n).clip(200, 3000)
deuda     = np.random.normal(400, 200, n).clip(0, 2000)
años_emp  = np.random.randint(0, 20, n)

# Etiqueta: aprobado (1) si ingresos altos, deuda baja y experiencia
ratio_deuda = deuda / ingresos
aprobado = ((ratio_deuda < 0.45) & (ingresos > 600) & (años_emp > 1)).astype(int)
# Añadir algo de ruido
flip = np.random.rand(n) < 0.08
aprobado[flip] = 1 - aprobado[flip]

X = np.column_stack([ingresos, deuda, años_emp])
y = aprobado

scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)
X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, test_size=0.25, random_state=42)

knn = KNeighborsClassifier(n_neighbors=7)
knn.fit(X_train, y_train)
y_pred = knn.predict(X_test)

print(f"Accuracy: {knn.score(X_test, y_test):.3f}")
print()
print("Reporte de clasificación:")
print(classification_report(y_test, y_pred, target_names=['Rechazado', 'Aprobado']))

# Visualizar distribución de predicciones
fig, axes = plt.subplots(1, 2, figsize=(11, 4))
# Scatter: ingresos vs deuda, coloreado por predicción
axes[0].scatter(ingresos[:len(y_test)], deuda[:len(y_test)],
                c=y_pred, cmap='coolwarm', alpha=0.6, s=30)
axes[0].set_xlabel('Ingresos (k FCFA)'); axes[0].set_ylabel('Deuda (k FCFA)')
axes[0].set_title('Predicciones del clasificador')
# Confusion matrix
cm = confusion_matrix(y_test, y_pred)
axes[1].imshow(cm, cmap='Blues')
for i in range(2):
    for j in range(2):
        axes[1].text(j, i, cm[i,j], ha='center', va='center', fontsize=14, fontweight='bold')
axes[1].set_xticks([0,1]); axes[1].set_yticks([0,1])
axes[1].set_xticklabels(['Rechazado','Aprobado']); axes[1].set_yticklabels(['Rechazado','Aprobado'])
axes[1].set_xlabel('Predicción'); axes[1].set_ylabel('Real')
axes[1].set_title('Matriz de confusión')
plt.tight_layout(); plt.show()`,
          hint: 'classification_report muestra precisión, recall y F1 para cada clase. La confusion matrix muestra los cuatro tipos de error posibles.',
        }}
      >
        <p>Clasifica solicitudes de crédito como aprobadas o rechazadas usando KNN. Evalúa el modelo con métricas específicas de clasificación.</p>
      </Exercise>

      <Quiz
        question="En KNN, ¿qué ocurre cuando usas K=1?"
        options={[
          'El modelo no puede hacer predicciones',
          'El modelo usa solo el vecino más cercano → puede memorizar el ruido del dataset',
          'K=1 es siempre el mejor valor porque es el más preciso',
          'El modelo necesita normalizar los datos antes de funcionar',
        ]}
        correct={1}
        explanation="Con K=1, el modelo asigna a cada punto la clase de su vecino más próximo. En entrenamiento tendrá accuracy perfecta (100%), pero fallará con datos nuevos porque habrá sobreajustado al ruido. Esto se llama overfitting."
      />

      <Quiz
        question="¿Por qué es importante normalizar las features antes de aplicar KNN?"
        options={[
          'KNN no funciona sin normalización, dará error',
          'Porque KNN basa sus predicciones en distancias, y features con rangos grandes dominarían',
          'Para reducir el tiempo de predicción',
          'Porque scikit-learn lo requiere en su API',
        ]}
        correct={1}
        explanation="KNN calcula distancias euclidianas. Si una feature va de 0-10 y otra de 0-1.000.000, la segunda domina la distancia y la primera se ignora. Normalizar pone todas las features en el mismo rango de influencia."
      />

      <Callout kind="success" title="Módulo completado">
        KNN es tu primer clasificador. En el siguiente módulo aprenderás los <em>árboles de decisión</em>
        — un algoritmo que aprende reglas explícitas que puedes leer y entender, y que lleva a uno de los
        algoritmos más potentes del ML clásico: Random Forest.
      </Callout>

      <ChapterNav
        prev={prev ? { id: prev.id, title: prev.title } : null}
        next={next ? { id: next.id, title: next.title } : null}
        onNav={onNav}
      />
    </article>
  );
}

window.ChapterL1M6 = ChapterL1M6;
