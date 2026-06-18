// =============================================================
// chapter-l2-m4.jsx — Clustering sin etiquetas
// =============================================================

function ChapterL2M4({ onNav }) {
  const flat = flatTOC();
  const idx = flat.findIndex(c => c.id === 'l2-m4');
  const prev = flat[idx - 1], next = flat[idx + 1];

  return (
    <article className="reader-inner">
      <ChapterHeader
        book="// libro ii — técnicas avanzadas"
        module="módulo 04"
        time="40 min · aprendizaje sin etiquetas"
        title={<>Clustering<span style={{color:'var(--highlight)'}}>.</span></>}
        dek="¿Qué pasa cuando no tienes etiquetas? El modelo encuentra la estructura oculta de los datos por sí solo."
      />

      <p>
        Hasta ahora todos los modelos que hemos usado son de <strong>aprendizaje supervisado</strong>:
        tienes datos y la respuesta correcta para cada uno. Pero ¿qué pasa cuando solo tienes datos
        sin etiquetas? Eso es el <strong>aprendizaje no supervisado</strong>.
      </p>

      <p>
        El clustering agrupa puntos similares sin saber de antemano qué grupos existen. Es
        útil para segmentar clientes, detectar anomalías, agrupar noticias similares o entender
        la estructura natural de un dataset antes de etiquetarlo.
      </p>

      <h2>K-Means: el algoritmo más popular</h2>

      <p>
        K-Means funciona iterativamente: elige K centroides al azar, asigna cada punto al centroide
        más cercano, recalcula los centroides como la media de su grupo, y repite hasta converger.
        La dificultad: debes especificar K de antemano.
      </p>

      <Exercise number={1} title="K-Means y el método del codo"
        runner={{
          initial: `import numpy as np
import matplotlib.pyplot as plt
from sklearn.cluster import KMeans
from sklearn.preprocessing import StandardScaler
from sklearn.datasets import make_blobs

np.random.seed(42)

# Crear 4 clusters bien diferenciados
X, y_real = make_blobs(n_samples=300, centers=4, cluster_std=0.8, random_state=42)
scaler = StandardScaler()
X_s = scaler.fit_transform(X)

# Método del codo: encontrar K óptimo
inertias = []
K_range = range(1, 11)
for k in K_range:
    km = KMeans(n_clusters=k, random_state=42, n_init=10)
    km.fit(X_s)
    inertias.append(km.inertia_)

# Encontrar el codo automáticamente
diffs = np.diff(inertias)
diffs2 = np.diff(diffs)
codo_k = np.argmax(diffs2) + 2  # +2 por doble diff y 0-indexing

print(f"K óptimo sugerido por el método del codo: {codo_k}")
print()

# Ajustar con el K óptimo
km_final = KMeans(n_clusters=codo_k, random_state=42, n_init=10)
etiquetas = km_final.fit_predict(X_s)

fig, axes = plt.subplots(1, 3, figsize=(14, 4))

# Método del codo
axes[0].plot(K_range, inertias, 'o-', color='#1F4E5F', linewidth=2)
axes[0].axvline(codo_k, color='#C99419', linestyle='--', label=f'Codo K={codo_k}')
axes[0].set_xlabel('Número de clusters K')
axes[0].set_ylabel('Inercia (WCSS)')
axes[0].set_title('Método del codo')
axes[0].legend(); axes[0].grid(True, alpha=0.3)

# Clusters encontrados
sc = axes[1].scatter(X_s[:,0], X_s[:,1], c=etiquetas, cmap='tab10', s=20, alpha=0.8)
axes[1].scatter(km_final.cluster_centers_[:,0], km_final.cluster_centers_[:,1],
                marker='X', s=200, c='black', zorder=5, label='Centroides')
axes[1].set_title(f'K-Means con K={codo_k}'); axes[1].legend()

# Clusters reales
axes[2].scatter(X_s[:,0], X_s[:,1], c=y_real, cmap='tab10', s=20, alpha=0.8)
axes[2].set_title('Grupos reales (referencia)')

plt.tight_layout()
plt.show()`,
          hint: 'La inercia mide la suma de distancias al cuadrado de cada punto a su centroide. El "codo" es donde agregar más clusters ya no reduce mucho la inercia.',
        }}
      >
        <p>Aplica K-Means con el método del codo para encontrar el número óptimo de clusters. Compara los clusters encontrados con la estructura real de los datos.</p>
      </Exercise>

      <h2>DBSCAN: clustering sin especificar K</h2>

      <p>
        DBSCAN (Density-Based Spatial Clustering) encuentra clusters como zonas densas separadas
        por regiones de baja densidad. Ventajas clave: no necesitas especificar K, puede encontrar
        clusters de forma arbitraria, y detecta outliers automáticamente (puntos sin cluster).
      </p>

      <Exercise number={2} title="Segmentación de clientes con K-Means y DBSCAN" difficulty="intermedio"
        runner={{
          initial: `import numpy as np
import matplotlib.pyplot as plt
from sklearn.cluster import KMeans, DBSCAN
from sklearn.preprocessing import StandardScaler
from sklearn.metrics import silhouette_score

np.random.seed(42)
n = 400

# Dataset de clientes: [gasto_mensual, frecuencia_compras, antiguedad_meses]
gasto      = np.concatenate([
    np.random.normal(200, 50, 100),   # clientes básicos
    np.random.normal(800, 100, 100),  # clientes premium
    np.random.normal(400, 80, 150),   # clientes medios
    np.random.normal(50, 20, 50),     # clientes inactivos
])
frecuencia = np.concatenate([
    np.random.normal(2, 0.5, 100),
    np.random.normal(8, 1.2, 100),
    np.random.normal(4, 1.0, 150),
    np.random.normal(0.5, 0.2, 50),
]).clip(0)
antiguedad = np.concatenate([
    np.random.normal(12, 4, 100),
    np.random.normal(36, 8, 100),
    np.random.normal(18, 6, 150),
    np.random.normal(6, 3, 50),
]).clip(1)

X = np.column_stack([gasto, frecuencia, antiguedad])
scaler = StandardScaler()
X_s = scaler.fit_transform(X)

# K-Means con K=4
km = KMeans(n_clusters=4, random_state=42, n_init=10)
km_labels = km.fit_predict(X_s)
km_sil = silhouette_score(X_s, km_labels)

# DBSCAN
db = DBSCAN(eps=0.5, min_samples=10)
db_labels = db.fit_predict(X_s)
n_clusters_db = len(set(db_labels)) - (1 if -1 in db_labels else 0)
n_outliers = (db_labels == -1).sum()
db_sil = silhouette_score(X_s, db_labels) if n_clusters_db > 1 else 0

print(f"K-Means: {len(set(km_labels))} clusters, silhouette={km_sil:.3f}")
print(f"DBSCAN:  {n_clusters_db} clusters, {n_outliers} outliers, silhouette={db_sil:.3f}")
print()
print("Perfil de clientes K-Means:")
feature_names = ['Gasto mensual', 'Frecuencia', 'Antigüedad']
for k in range(4):
    mask = km_labels == k
    centro = scaler.inverse_transform(km.cluster_centers_)[k]
    print(f"  Cluster {k} ({mask.sum()} clientes): gasto={centro[0]:.0f}, freq={centro[1]:.1f}, ant={centro[2]:.0f}m")

# Visualización
fig, axes = plt.subplots(1, 2, figsize=(12, 5))
for ax, (labels, titulo) in zip(axes,
    [(km_labels, f'K-Means (K=4, sil={km_sil:.2f})'),
     (db_labels, f'DBSCAN (eps=0.5, sil={db_sil:.2f})')]):
    sc = ax.scatter(gasto, frecuencia, c=labels, cmap='tab10', s=15, alpha=0.7)
    ax.set_xlabel('Gasto mensual (FCFA)'); ax.set_ylabel('Frecuencia de compra')
    ax.set_title(titulo)
plt.tight_layout()
plt.show()`,
          hint: 'El Silhouette Score mide la calidad del clustering (−1 a 1, mayor es mejor). En DBSCAN, los puntos con label=−1 son outliers no asignados a ningún cluster.',
        }}
      >
        <p>Segmenta clientes con K-Means y DBSCAN. Compara los perfiles resultantes y usa el Silhouette Score para evaluar la calidad del clustering.</p>
      </Exercise>

      <Quiz
        question="¿Cuál es la principal limitación de K-Means?"
        options={[
          'Es demasiado lento para datasets grandes',
          'Debes especificar K de antemano y asume clusters esféricos de tamaño similar',
          'No puede trabajar con datos numéricos continuos',
          'Solo funciona con 2 features',
        ]}
        correct={1}
        explanation="K-Means requiere que especifiques K antes de correr, y asume que los clusters son aproximadamente esféricos y de tamaño similar. DBSCAN resuelve el primer problema (descubre K automáticamente) y puede encontrar clusters de forma arbitraria."
      />

      <Quiz
        question="¿Qué representa un punto con label=-1 en DBSCAN?"
        options={[
          'Un punto que pertenece al primer cluster (índice -1)',
          'Un outlier: un punto demasiado aislado para pertenecer a ningún cluster',
          'Un error del algoritmo que indica que los parámetros son incorrectos',
          'El centroide del cluster más cercano',
        ]}
        correct={1}
        explanation="En DBSCAN, label=-1 significa 'ruido' o outlier — un punto que no tiene suficientes vecinos cercanos para formar parte de un cluster. Esta detección automática de anomalías es una de las grandes ventajas de DBSCAN."
      />

      <Callout kind="success" title="Módulo completado">
        El clustering te permite explorar datos sin etiquetar y descubrir su estructura natural.
        En el siguiente módulo aprenderás <em>PCA</em> — cómo reducir cientos de dimensiones a
        unas pocas sin perder la información esencial.
      </Callout>

      <ChapterNav
        prev={prev ? { id: prev.id, title: prev.title } : null}
        next={next ? { id: next.id, title: next.title } : null}
        onNav={onNav}
      />
    </article>
  );
}

window.ChapterL2M4 = ChapterL2M4;
