// =============================================================
// chapter-l2-m5.jsx — PCA y reducción de dimensiones
// =============================================================

function ChapterL2M5({ onNav }) {
  const flat = flatTOC();
  const idx = flat.findIndex(c => c.id === 'l2-m5');
  const prev = flat[idx - 1], next = flat[idx + 1];

  return (
    <article className="reader-inner">
      <ChapterHeader
        book="// libro ii — técnicas avanzadas"
        module="módulo 05"
        time="40 min · ver lo invisible en alta dimensión"
        title={<>PCA y reducción<br /><em>de dimensiones</em><span style={{color:'var(--highlight)'}}>.</span></>}
        dek="Con 500 features no puedes visualizar nada. PCA comprime la información esencial en 2 o 3 dimensiones."
      />

      <p>
        Muchos datasets reales tienen decenas o cientos de features. Esto crea el <strong>problema
        de la maldición de la dimensionalidad</strong>: con más dimensiones, los puntos se vuelven
        más dispersos, los modelos necesitan exponencialmente más datos y la visualización es imposible.
      </p>

      <p>
        El <strong>Análisis de Componentes Principales (PCA)</strong> encuentra las direcciones del
        espacio que contienen la mayor varianza en los datos y proyecta todo ahí. No es simplemente
        elegir las mejores features — es crear <em>nuevas</em> features que son combinaciones lineales
        de las originales, maximizando la varianza capturada.
      </p>

      <h2>Cómo funciona PCA</h2>

      <p>
        Cada <strong>componente principal</strong> es una dirección ortogonal que captura la máxima
        varianza restante después de las componentes anteriores. La primera captura más varianza que
        cualquier otra dirección; la segunda captura la máxima del espacio ortogonal a la primera; etc.
      </p>

      <Exercise number={1} title="PCA paso a paso — varianza explicada"
        runner={{
          initial: `import numpy as np
import matplotlib.pyplot as plt
from sklearn.decomposition import PCA
from sklearn.datasets import load_breast_cancer
from sklearn.preprocessing import StandardScaler

# Dataset de cáncer de mama: 30 features → ¿cuántas necesitamos?
datos = load_breast_cancer()
X, y = datos.data, datos.target
nombres = datos.feature_names

scaler = StandardScaler()
X_s = scaler.fit_transform(X)

# PCA completo para analizar varianza
pca_full = PCA()
pca_full.fit(X_s)

varianza_acum = np.cumsum(pca_full.explained_variance_ratio_)
n_95 = np.argmax(varianza_acum >= 0.95) + 1
n_99 = np.argmax(varianza_acum >= 0.99) + 1

print(f"Features originales: {X_s.shape[1]}")
print(f"Componentes para 95% de varianza: {n_95}")
print(f"Componentes para 99% de varianza: {n_99}")
print()
print("Varianza explicada por primeras 10 PCs:")
for i, v in enumerate(pca_full.explained_variance_ratio_[:10]):
    barra = '█' * int(v * 100)
    print(f"  PC{i+1:2d}: {v:.3f}  {barra}")

# Visualización
fig, axes = plt.subplots(1, 2, figsize=(12, 5))

# Varianza por componente
axes[0].bar(range(1, 16), pca_full.explained_variance_ratio_[:15] * 100,
            color='#1F4E5F', alpha=0.8)
axes[0].set_xlabel('Componente principal')
axes[0].set_ylabel('% de varianza explicada')
axes[0].set_title('Varianza por componente (primeras 15)')

# Varianza acumulada
axes[1].plot(range(1, 31), varianza_acum * 100, 'o-', color='#1F4E5F', markersize=4)
axes[1].axhline(95, color='#C99419', linestyle='--', label='95%')
axes[1].axhline(99, color='#A8331E', linestyle='--', label='99%')
axes[1].axvline(n_95, color='#C99419', linestyle=':', alpha=0.7)
axes[1].axvline(n_99, color='#A8331E', linestyle=':', alpha=0.7)
axes[1].set_xlabel('Número de componentes')
axes[1].set_ylabel('% de varianza acumulada')
axes[1].set_title('Varianza acumulada')
axes[1].legend(); axes[1].grid(True, alpha=0.3)

plt.tight_layout()
plt.show()`,
          hint: 'explained_variance_ratio_ es un array con la fracción de varianza explicada por cada componente. np.cumsum() calcula la suma acumulada.',
        }}
      >
        <p>Analiza cuántas componentes necesitas para capturar el 95% y 99% de la varianza en un dataset de cáncer de mama con 30 features.</p>
      </Exercise>

      <h2>PCA para visualización 2D</h2>

      <p>
        Una de las aplicaciones más valiosas de PCA: comprimir datos de alta dimensión a 2 dimensiones
        para visualizarlos. Aunque perdemos información, las 2 primeras componentes suelen capturar
        la estructura más importante.
      </p>

      <Exercise number={2} title="Visualización y compresión con PCA" difficulty="intermedio"
        runner={{
          initial: `import numpy as np
import matplotlib.pyplot as plt
from sklearn.decomposition import PCA
from sklearn.datasets import load_digits
from sklearn.preprocessing import StandardScaler
from sklearn.neighbors import KNeighborsClassifier
from sklearn.model_selection import cross_val_score

# Dataset de dígitos: 64 features (8x8 píxeles), 10 clases
digits = load_digits()
X, y = digits.data, digits.target

scaler = StandardScaler()
X_s = scaler.fit_transform(X)

# KNN con todas las features
knn_full = KNeighborsClassifier(n_neighbors=5)
acc_full = cross_val_score(knn_full, X_s, y, cv=5).mean()
print(f"KNN con 64 features: accuracy={acc_full:.3f}")

# PCA a diferentes dimensiones
dims = [2, 5, 10, 20, 30, 40]
accuracies = []
for n in dims:
    pca = PCA(n_components=n)
    X_pca = pca.fit_transform(X_s)
    knn = KNeighborsClassifier(n_neighbors=5)
    acc = cross_val_score(knn, X_pca, y, cv=5).mean()
    var = pca.explained_variance_ratio_.sum()
    accuracies.append(acc)
    print(f"PCA({n:2d}): varianza={var:.1%}, accuracy={acc:.3f}")

print()

# Proyección 2D para visualización
pca_2d = PCA(n_components=2)
X_2d = pca_2d.fit_transform(X_s)
var_2d = pca_2d.explained_variance_ratio_.sum()
print(f"Varianza capturada con 2 componentes: {var_2d:.1%}")

fig, axes = plt.subplots(1, 2, figsize=(13, 5))

# Scatter 2D de los dígitos
scatter = axes[0].scatter(X_2d[:,0], X_2d[:,1], c=y, cmap='tab10', s=8, alpha=0.7)
plt.colorbar(scatter, ax=axes[0])
axes[0].set_title(f'Dígitos en 2D con PCA ({var_2d:.0%} varianza)')
axes[0].set_xlabel('PC1'); axes[0].set_ylabel('PC2')

# Accuracy vs número de componentes
axes[1].plot(dims, accuracies, 'o-', color='#1F4E5F', linewidth=2, markersize=7, label='PCA + KNN')
axes[1].axhline(acc_full, color='#C99419', linestyle='--', label=f'64 features: {acc_full:.3f}')
axes[1].set_xlabel('Número de componentes PCA')
axes[1].set_ylabel('Accuracy (CV 5-fold)')
axes[1].set_title('Accuracy vs compresión PCA')
axes[1].legend(); axes[1].grid(True, alpha=0.3)

plt.tight_layout()
plt.show()`,
          hint: 'Con PCA(n_components=20) sobre 64 features, el KNN suele mejorar su accuracy (menos ruido) además de ser más rápido. Observa el "codo" en la curva accuracy vs componentes.',
        }}
      >
        <p>Usa PCA para visualizar 1797 dígitos manuscritos en 2D y compara el accuracy de KNN con diferentes niveles de compresión. ¿Cuántas componentes dan el mejor resultado?</p>
      </Exercise>

      <Quiz
        question="¿Por qué es importante normalizar los datos ANTES de aplicar PCA?"
        options={[
          'PCA falla si los datos no están normalizados',
          'Porque PCA se basa en varianza, y features con mayor escala dominarán artificialmente las componentes',
          'Para que PCA sea más rápido computacionalmente',
          'Porque la normalización elimina las correlaciones entre features',
        ]}
        correct={1}
        explanation="PCA maximiza la varianza. Si 'salario' va de 0 a 100.000 y 'edad' de 0 a 100, la varianza de salario dominará las componentes aunque edad sea más informativa. StandardScaler pone todas las features en la misma escala antes de que PCA las compare."
      />

      <Quiz
        question="¿Qué significa que las dos primeras componentes de PCA explican el 85% de la varianza?"
        options={[
          'El 85% de las features originales están representadas en esas dos componentes',
          'El 85% de la información (variabilidad) del dataset puede representarse en 2 dimensiones',
          'El modelo entrenado en esas 2 dimensiones tendrá 85% de accuracy',
          'El 15% de los datos son outliers que PCA ignoró',
        ]}
        correct={1}
        explanation="La varianza explicada mide qué proporción de la variabilidad total del dataset está capturada en las componentes. 85% significa que proyectar a 2D preserva el 85% de la 'información' (dispersión) de los datos originales."
      />

      <Callout kind="success" title="Módulo completado">
        PCA es una herramienta fundamental para visualización, reducción de ruido y como paso previo
        a otros modelos. En el siguiente módulo aprenderás técnicas de <em>selección de features</em>
        — cómo elegir las variables más relevantes basándote en estadísticas y en los propios modelos.
      </Callout>

      <ChapterNav
        prev={prev ? { id: prev.id, title: prev.title } : null}
        next={next ? { id: next.id, title: next.title } : null}
        onNav={onNav}
      />
    </article>
  );
}

window.ChapterL2M5 = ChapterL2M5;
