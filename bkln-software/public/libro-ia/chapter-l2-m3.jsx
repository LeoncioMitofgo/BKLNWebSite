// =============================================================
// chapter-l2-m3.jsx — Máquinas de soporte vectorial (SVM)
// =============================================================

function ChapterL2M3({ onNav }) {
  const flat = flatTOC();
  const idx = flat.findIndex(c => c.id === 'l2-m3');
  const prev = flat[idx - 1], next = flat[idx + 1];

  return (
    <article className="reader-inner">
      <ChapterHeader
        book="// libro ii — técnicas avanzadas"
        module="módulo 03"
        time="45 min · el clasificador de máximo margen"
        title={<>Máquinas de<br /><em>Soporte Vectorial</em><span style={{color:'var(--highlight)'}}>.</span></>}
        dek="SVM no busca cualquier línea que separe las clases — busca la que las separa con el mayor margen posible."
      />

      <p>
        Las <strong>Máquinas de Soporte Vectorial (SVM)</strong> son uno de los algoritmos más elegantes
        del ML clásico. Mientras que la regresión logística busca una frontera que clasifique correctamente,
        SVM busca la frontera que maximiza la distancia a los puntos más cercanos de cada clase
        — los llamados <em>vectores de soporte</em>.
      </p>

      <p>
        Esta diferencia parece pequeña, pero tiene grandes consecuencias: SVM tiende a generalizar mejor
        porque la frontera está lo más alejada posible de ambas clases. Además, con el
        <strong> kernel trick</strong>, SVM puede clasificar datos que no son linealmente separables
        proyectándolos a dimensiones superiores.
      </p>

      <h2>Kernels: la clave de la flexibilidad</h2>

      <DataTable
        data={[
          { kernel: 'linear', descripción: 'Frontera lineal (hiperplano)', cuándo: 'Datos linealmente separables, muchas features' },
          { kernel: 'rbf', descripción: 'Radial Basis Function — frontera circular/curva', cuándo: 'Datos no lineales, default recomendado' },
          { kernel: 'poly', descripción: 'Frontera polinómica de grado n', cuándo: 'Relaciones polinómicas conocidas' },
        ]}
        caption="Kernels principales en SVM y cuándo usarlos"
      />

      <Exercise number={1} title="SVM con diferentes kernels — comparativa visual"
        runner={{
          initial: `import numpy as np
import matplotlib.pyplot as plt
from sklearn.svm import SVC
from sklearn.datasets import make_moons, make_circles
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import cross_val_score

np.random.seed(42)

# Datos en forma de lunas: no linealmente separables
X_moons, y_moons = make_moons(n_samples=200, noise=0.2, random_state=42)
X_circles, y_circles = make_circles(n_samples=200, noise=0.15, factor=0.4, random_state=42)

scaler = StandardScaler()

fig, axes = plt.subplots(2, 3, figsize=(13, 8))

datasets = [('Lunas', X_moons, y_moons), ('Círculos', X_circles, y_circles)]
kernels  = ['linear', 'rbf', 'poly']

for row, (ds_name, X_raw, y) in enumerate(datasets):
    X = scaler.fit_transform(X_raw)
    for col, kernel in enumerate(kernels):
        ax = axes[row, col]
        svm = SVC(kernel=kernel, C=1.0, gamma='scale')
        svm.fit(X, y)

        # Generar grid para visualizar frontera
        xx, yy = np.meshgrid(np.linspace(X[:,0].min()-0.5, X[:,0].max()+0.5, 200),
                              np.linspace(X[:,1].min()-0.5, X[:,1].max()+0.5, 200))
        Z = svm.predict(np.c_[xx.ravel(), yy.ravel()]).reshape(xx.shape)
        ax.contourf(xx, yy, Z, alpha=0.3, cmap='RdYlBu')
        ax.scatter(X[:,0], X[:,1], c=y, cmap='RdYlBu', edgecolors='k', s=25, linewidths=0.5)

        acc = cross_val_score(svm, X, y, cv=5).mean()
        ax.set_title(f"{ds_name} | kernel={kernel}\\nAcc={acc:.3f}")
        ax.set_xticks([]); ax.set_yticks([])

plt.suptitle('SVM — Fronteras de decisión según kernel', fontsize=13, y=1.01)
plt.tight_layout()
plt.show()`,
          hint: 'El kernel rbf es el más flexible y funciona bien para la mayoría de problemas no lineales. El kernel lineal falla con datos en forma de luna o círculos concéntricos.',
        }}
      >
        <p>Visualiza cómo los diferentes kernels generan fronteras de decisión distintas en dos datasets clásicos no lineales.</p>
      </Exercise>

      <h2>El hiperparámetro C — margen duro vs suave</h2>

      <p>
        <code>C</code> controla el <strong>tradeoff entre margen y errores de clasificación</strong>:
        C pequeño → margen más amplio pero acepta algunos errores (más robusto al ruido).
        C grande → intenta clasificar todo correctamente aunque el margen sea estrecho (más susceptible a overfitting).
      </p>

      <Exercise number={2} title="Clasificador de calidad de vino con SVM" difficulty="intermedio"
        runner={{
          initial: `import numpy as np
import matplotlib.pyplot as plt
from sklearn.svm import SVC
from sklearn.datasets import load_wine
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import cross_val_score, GridSearchCV
from sklearn.metrics import classification_report, ConfusionMatrixDisplay

# Dataset de vinos: 3 clases, 13 features químicas
datos = load_wine()
X, y = datos.data, datos.target
nombres_clases = datos.target_names

scaler = StandardScaler()
X_s = scaler.fit_transform(X)

# Explorar efecto de C
C_valores = [0.01, 0.1, 1, 10, 100, 1000]
accuracies = []
for C in C_valores:
    svm = SVC(kernel='rbf', C=C, gamma='scale')
    acc = cross_val_score(svm, X_s, y, cv=5).mean()
    accuracies.append(acc)
    print(f"C={C:6}: accuracy={acc:.4f}")

print()

# Grid search para encontrar mejores parámetros
param_grid = {'C': [0.1, 1, 10, 100], 'gamma': ['scale', 'auto', 0.01, 0.1]}
gs = GridSearchCV(SVC(kernel='rbf'), param_grid, cv=5, scoring='accuracy', n_jobs=-1)
gs.fit(X_s, y)
print(f"Mejores params: {gs.best_params_}")
print(f"Mejor accuracy: {gs.best_score_:.4f}")

# Visualizar efecto de C
plt.figure(figsize=(8, 4))
plt.semilogx(C_valores, accuracies, 'o-', color='#1F4E5F', linewidth=2, markersize=8)
plt.xlabel('C (escala log)')
plt.ylabel('Accuracy (CV 5-fold)')
plt.title('Efecto del hiperparámetro C en SVM con kernel RBF')
plt.grid(True, alpha=0.3)
plt.tight_layout()
plt.show()`,
          hint: 'GridSearchCV prueba todas las combinaciones de C y gamma. .best_params_ devuelve los parámetros óptimos. Nota cómo el accuracy forma una curva de campana con C.',
        }}
      >
        <p>Clasifica 3 tipos de vino por sus propiedades químicas. Explora el efecto de C y usa GridSearchCV para encontrar los mejores hiperparámetros automáticamente.</p>
      </Exercise>

      <Quiz
        question="¿Qué son los 'vectores de soporte' en SVM?"
        options={[
          'Todos los puntos del dataset de entrenamiento',
          'Los puntos más cercanos a la frontera de decisión que definen el margen',
          'Los vectores de gradiente calculados durante el entrenamiento',
          'Los puntos mal clasificados por el modelo',
        ]}
        correct={1}
        explanation="Los vectores de soporte son los puntos de cada clase más cercanos a la frontera de decisión. Son literalmente los únicos puntos que importan para definir la frontera — si eliminases cualquier otro punto del training set, el modelo no cambiaría."
      />

      <Quiz
        question="¿Cuándo deberías usar kernel='linear' en lugar de 'rbf'?"
        options={[
          'Cuando tienes muchos datos (>10000 muestras) porque RBF es demasiado lento',
          'Cuando tienes muchas features y los datos son aproximadamente linealmente separables',
          'Cuando quieres visualizar la frontera de decisión en 2D',
          'Linear siempre es mejor porque es más simple',
        ]}
        correct={1}
        explanation="El kernel lineal es eficiente con muchas features (como en clasificación de texto con TF-IDF). En alta dimensión, los datos suelen ser linealmente separables. RBF es más poderoso pero puede hacer overfitting con pocas muestras y muchas features."
      />

      <Callout kind="success" title="Módulo completado">
        SVM es una herramienta poderosa especialmente útil con datos de alta dimensión o cuando
        el número de muestras no es enorme. En el siguiente módulo explorarás el aprendizaje
        <em> no supervisado</em> — clustering — donde no hay etiquetas y el modelo encuentra
        la estructura por sí solo.
      </Callout>

      <ChapterNav
        prev={prev ? { id: prev.id, title: prev.title } : null}
        next={next ? { id: next.id, title: next.title } : null}
        onNav={onNav}
      />
    </article>
  );
}

window.ChapterL2M3 = ChapterL2M3;
