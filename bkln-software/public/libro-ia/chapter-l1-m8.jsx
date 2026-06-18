// =============================================================
// chapter-l1-m8.jsx — Evaluación de modelos
// =============================================================

function ChapterL1M8({ onNav }) {
  const flat = flatTOC();
  const idx = flat.findIndex(c => c.id === 'l1-m8');
  const prev = flat[idx - 1], next = flat[idx + 1];

  return (
    <article className="reader-inner">
      <ChapterHeader
        book="// libro i — fundamentos"
        module="módulo 08"
        time="35 min · cierre del Libro 1"
        title={<>Evaluación<br /><em>de modelos</em><span style={{color:'var(--highlight)'}}>.</span></>}
        dek="Un modelo que no sabe que se equivoca es peor que ningún modelo. Aprende a medir correctamente."
      />

      <p>
        Has aprendido a construir modelos. Ahora aprenderás la parte más importante: <strong>saber si
        realmente funcionan</strong>. Un modelo que parece preciso en tus pruebas pero falla en producción
        puede ser peor que no tener modelo — porque tomas decisiones basadas en predicciones incorrectas.
      </p>

      <h2>El problema del data leakage</h2>

      <p>
        El error más grave en ML. Ocurre cuando información del futuro (o del test set) contamina el
        entrenamiento. El modelo aprende a "hacer trampa" y parece tener una precisión irreal.
      </p>

      <CodeBlock code={`# MAL EJEMPLO — data leakage
from sklearn.preprocessing import StandardScaler
import numpy as np

X = np.random.randn(100, 5)
y = np.random.randint(0, 2, 100)

# ❌ ERROR: escalar ANTES de dividir mezcla info del test en el train
scaler = StandardScaler()
X_escalado = scaler.fit_transform(X)  # usa estadísticas de TODO el dataset

from sklearn.model_selection import train_test_split
X_train, X_test = train_test_split(X_escalado)

# ✅ CORRECTO: dividir primero, escalar después
X_train_raw, X_test_raw, y_train, y_test = train_test_split(X, y)
scaler = StandardScaler()
X_train = scaler.fit_transform(X_train_raw)  # aprende de train
X_test  = scaler.transform(X_test_raw)       # aplica sin reaprender`} />

      <h2>Métricas de clasificación</h2>

      <p>
        <strong>Accuracy</strong> (porcentaje de aciertos) es la métrica más simple, pero puede ser engañosa
        cuando las clases están desbalanceadas. Si el 95% de tus emails son legítimos, un modelo que nunca
        detecta spam tiene 95% de accuracy — y es completamente inútil.
      </p>

      <CodeBlock code={`# Las cuatro métricas esenciales de clasificación

# Precision: de todos los que dije que son positivos, ¿cuántos lo eran?
#   → "¿Cuándo digo que es fraude, estoy en lo correcto?"

# Recall (sensibilidad): de todos los positivos reales, ¿cuántos encontré?
#   → "¿Cuánto fraude real detecté?"

# F1-Score: media armónica de precision y recall
#   → Útil cuando quieres equilibrar ambas métricas

# La elección depende del problema:
# - Diagnóstico médico: maximiza Recall (no puedes perder enfermos)
# - Filtro de spam: maximiza Precision (no quieres perder emails importantes)
`} />

      <DataTable
        data={[
          { métrica: 'Accuracy', qué_mide: '% predicciones correctas', cuando_usarla: 'Clases balanceadas' },
          { métrica: 'Precision', qué_mide: 'De los "positivos" predichos, % reales', cuando_usarla: 'Coste alto de falsos positivos' },
          { métrica: 'Recall', qué_mide: 'De los positivos reales, % detectados', cuando_usarla: 'Coste alto de falsos negativos' },
          { métrica: 'F1-Score', qué_mide: 'Balance entre precision y recall', cuando_usarla: 'Clases desbalanceadas' },
          { métrica: 'ROC-AUC', qué_mide: 'Capacidad discriminativa general', cuando_usarla: 'Comparar modelos diferentes' },
        ]}
        caption="Guía rápida para elegir la métrica correcta según el problema"
      />

      <Exercise number={1} title="Evaluación completa de un clasificador de fraude"
        runner={{
          initial: `import numpy as np
import matplotlib.pyplot as plt
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split
from sklearn.metrics import (classification_report, confusion_matrix,
                              roc_auc_score, roc_curve)

np.random.seed(42)
n = 1000

# Dataset desbalanceado: 5% de transacciones son fraude
X = np.random.randn(n, 6)
# Clase 1 (fraude) → puntos en extremos del espacio de features
es_fraude = (np.abs(X[:, 0]) > 1.5) & (np.abs(X[:, 2]) > 1.5)
y = es_fraude.astype(int)
print(f"Distribución: {(y==0).sum()} legítimas / {(y==1).sum()} fraudes ({y.mean():.1%} fraude)")

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=42)

rf = RandomForestClassifier(n_estimators=100, class_weight='balanced', random_state=42)
rf.fit(X_train, y_train)
y_pred = rf.predict(X_test)
y_proba = rf.predict_proba(X_test)[:, 1]

print(f"\\nAccuracy:  {(y_pred == y_test).mean():.3f}")
print(f"ROC-AUC:   {roc_auc_score(y_test, y_proba):.3f}")
print()
print(classification_report(y_test, y_pred, target_names=['Legítima','Fraude']))

# Gráficos
fig, axes = plt.subplots(1, 2, figsize=(12, 5))

# Confusion matrix
cm = confusion_matrix(y_test, y_pred)
im = axes[0].imshow(cm, cmap='Blues')
for i in range(2):
    for j in range(2):
        color = 'white' if cm[i,j] > cm.max()/2 else 'black'
        axes[0].text(j, i, f'{cm[i,j]}', ha='center', va='center', fontsize=16, fontweight='bold', color=color)
axes[0].set_xticks([0,1]); axes[0].set_yticks([0,1])
axes[0].set_xticklabels(['Legítima','Fraude']); axes[0].set_yticklabels(['Legítima','Fraude'])
axes[0].set_xlabel('Predicción'); axes[0].set_ylabel('Real')
axes[0].set_title('Matriz de confusión')

# Curva ROC
fpr, tpr, _ = roc_curve(y_test, y_proba)
auc = roc_auc_score(y_test, y_proba)
axes[1].plot(fpr, tpr, color='#1F4E5F', linewidth=2.5, label=f'AUC = {auc:.3f}')
axes[1].plot([0,1],[0,1], 'k--', alpha=0.4, label='Azar')
axes[1].set_xlabel('Tasa de Falsos Positivos'); axes[1].set_ylabel('Tasa de Verdaderos Positivos')
axes[1].set_title('Curva ROC'); axes[1].legend(); axes[1].grid(True, alpha=0.3)

plt.tight_layout(); plt.show()`,
          hint: 'class_weight="balanced" hace que el modelo dé más peso a la clase minoritaria (fraude). Crucial en datasets desbalanceados.',
        }}
      >
        <p>Evalúa un detector de fraude bancario con todas las métricas relevantes: matriz de confusión, precision/recall por clase y curva ROC.</p>
      </Exercise>

      <h2>Validación cruzada — una evaluación más honesta</h2>

      <p>
        Con un solo train/test split, el resultado depende de qué datos cayeron en cada parte. La
        <strong> validación cruzada k-fold</strong> reparte los datos en k partes, entrena k veces
        (cada vez dejando una parte distinta como test) y promedia. Es mucho más fiable.
      </p>

      <Exercise number={2} title="Comparar tres modelos con validación cruzada" difficulty="intermedio"
        runner={{
          initial: `import numpy as np
import matplotlib.pyplot as plt
from sklearn.model_selection import cross_validate
from sklearn.tree import DecisionTreeClassifier
from sklearn.ensemble import RandomForestClassifier
from sklearn.neighbors import KNeighborsClassifier
from sklearn.datasets import load_breast_cancer
from sklearn.preprocessing import StandardScaler

# Dataset de cáncer de mama — clasificación binaria médica
datos = load_breast_cancer()
X, y = datos.data, datos.target

scaler = StandardScaler()
X_norm = scaler.fit_transform(X)

modelos = {
    'Árbol (depth=4)': DecisionTreeClassifier(max_depth=4, random_state=42),
    'KNN (K=7)':       KNeighborsClassifier(n_neighbors=7),
    'Random Forest':   RandomForestClassifier(n_estimators=100, random_state=42),
}

metricas = ['accuracy', 'precision', 'recall', 'f1']
resultados = {}

for nombre, modelo in modelos.items():
    cv = cross_validate(modelo, X_norm, y, cv=10, scoring=metricas)
    resultados[nombre] = {m: cv[f'test_{m}'] for m in metricas}
    print(f"{nombre}:")
    for m in metricas:
        scores = resultados[nombre][m]
        print(f"  {m:10s}: {scores.mean():.3f} ± {scores.std():.3f}")
    print()

# Gráfico comparativo
fig, axes = plt.subplots(1, 4, figsize=(14, 5))
for i, m in enumerate(metricas):
    datos_plot = [[resultados[n][m]] for n in modelos]
    axes[i].boxplot([resultados[n][m] for n in modelos], labels=['Árbol','KNN','RF'])
    axes[i].set_title(m.capitalize())
    axes[i].set_ylim(0.8, 1.0)
    axes[i].grid(True, alpha=0.3)
plt.suptitle('Comparativa modelos — Validación cruzada 10-fold', y=1.02)
plt.tight_layout(); plt.show()`,
          hint: 'cross_validate con múltiples métricas devuelve un dict con test_accuracy, test_precision, etc. Usa cv=10 para 10 particiones.',
        }}
      >
        <p>Compara tres modelos con validación cruzada de 10 particiones y múltiples métricas. ¿Cuál es mejor para diagnóstico médico?</p>
      </Exercise>

      <Quiz
        question="Un modelo de detección de enfermedades tiene Accuracy=98% pero Recall=40%. ¿Es un buen modelo?"
        options={[
          'Sí, 98% de accuracy es excelente para cualquier problema médico',
          'No — Recall=40% significa que el modelo falla al detectar el 60% de los enfermos reales',
          'Depende de cuántos datos tiene el training set',
          'Sí, mientras la precision sea alta el recall no importa',
        ]}
        correct={1}
        explanation="En diagnóstico médico, el Recall (sensibilidad) es crítico: mide qué % de enfermos reales detecta el modelo. Recall=40% significa que el 60% de los enfermos pasarían como sanos — desastroso en medicina. La alta accuracy puede ser engañosa si hay muchos negativos (sanos)."
      />

      <Quiz
        question="¿Cuál es la principal ventaja de la validación cruzada sobre un solo train/test split?"
        options={[
          'Es más rápida de ejecutar',
          'Usa más datos para entrenamiento siempre',
          'Da una estimación más estable del rendimiento real, al promediar sobre múltiples particiones',
          'Evita automáticamente el overfitting',
        ]}
        correct={2}
        explanation="Con un solo split, la evaluación depende de qué datos cayeron en test por azar. Con 10-fold cross-validation, evalúas sobre el dataset completo en 10 iteraciones. La media y desviación estándar reflejan mucho mejor el rendimiento real del modelo."
      />

      <Callout kind="success" title="¡Libro 1 completado!">
        <p>Has dominado el stack fundamental del ML en Python:</p>
        <ul>
          <li>NumPy para manipulación de arrays y álgebra lineal</li>
          <li>Pandas para exploración y limpieza de datos</li>
          <li>Matplotlib para visualización</li>
          <li>Regresión lineal, KNN, árboles de decisión y Random Forest</li>
          <li>Evaluación correcta con métricas, confusión matrix y validación cruzada</li>
        </ul>
        <p>El Libro 2 te lleva a técnicas más avanzadas: preprocesamiento, SVM, clustering, PCA y pipelines. El Libro 3 entra en redes neuronales profundas y los modelos que están cambiando el mundo.</p>
      </Callout>

      <ChapterNav
        prev={prev ? { id: prev.id, title: prev.title } : null}
        next={next ? { id: next.id, title: next.title } : null}
        onNav={onNav}
      />
    </article>
  );
}

window.ChapterL1M8 = ChapterL1M8;
