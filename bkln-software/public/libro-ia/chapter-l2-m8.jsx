// =============================================================
// chapter-l2-m8.jsx — Proyecto: sistema de recomendación
// =============================================================

function ChapterL2M8({ onNav }) {
  const flat = flatTOC();
  const idx = flat.findIndex(c => c.id === 'l2-m8');
  const prev = flat[idx - 1], next = flat[idx + 1];

  return (
    <article className="reader-inner">
      <ChapterHeader
        book="// libro ii — técnicas avanzadas"
        module="módulo 08"
        time="50 min · cierre del Libro 2"
        title={<>Proyecto:<br /><em>Recomendador</em><span style={{color:'var(--highlight)'}}>.</span></>}
        dek="Netflix, Spotify, Amazon — todos usan variantes de esto. Construye un sistema de recomendación desde cero."
      />

      <p>
        Los sistemas de recomendación son uno de los usos más tangibles del ML: sugieren productos,
        películas, canciones o artículos basándose en el comportamiento previo del usuario o en la
        similitud entre ítems. En este proyecto construirás dos variantes: basado en contenido
        (similitud entre ítems) y filtrado colaborativo (basado en usuarios similares).
      </p>

      <h2>Similitud por coseno</h2>

      <p>
        La <strong>similitud por coseno</strong> mide el ángulo entre dos vectores de características.
        Si dos películas tienen vectores similares (mismos géneros, actores, etc.), el coseno del
        ángulo entre ellos estará cerca de 1. Es la base del recomendador basado en contenido.
      </p>

      <Exercise number={1} title="Recomendador basado en contenido"
        runner={{
          initial: `import numpy as np
import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.preprocessing import MultiLabelBinarizer

# Dataset de películas con géneros
peliculas = pd.DataFrame({
    'titulo': [
        'Inception', 'Interstellar', 'The Matrix', 'Gravity',
        'The Dark Knight', 'Avatar', 'Avengers', 'Iron Man',
        'Titanic', 'La La Land', 'Whiplash', 'Parasite',
        'Get Out', 'Us', 'A Quiet Place',
    ],
    'generos': [
        ['SciFi', 'Thriller', 'Drama'],
        ['SciFi', 'Drama', 'Adventure'],
        ['SciFi', 'Action', 'Thriller'],
        ['SciFi', 'Thriller', 'Drama'],
        ['Action', 'Thriller', 'Crime'],
        ['SciFi', 'Action', 'Adventure'],
        ['Action', 'SciFi', 'Adventure'],
        ['Action', 'SciFi', 'Comedy'],
        ['Drama', 'Romance', 'History'],
        ['Drama', 'Romance', 'Music'],
        ['Drama', 'Music'],
        ['Drama', 'Thriller', 'Crime'],
        ['Horror', 'Thriller'],
        ['Horror', 'Thriller', 'Drama'],
        ['Horror', 'Thriller'],
    ],
    'rating_promedio': [8.8, 8.6, 8.7, 7.7, 9.0, 7.9, 8.4, 7.9, 7.8, 8.0, 8.5, 8.5, 7.7, 6.8, 7.5],
    'año': [2010, 2014, 1999, 2013, 2008, 2009, 2012, 2008, 1997, 2016, 2014, 2019, 2017, 2019, 2018],
})

# Encodear géneros con MultiLabelBinarizer
mlb = MultiLabelBinarizer()
generos_encoded = mlb.fit_transform(peliculas['generos'])
generos_df = pd.DataFrame(generos_encoded, columns=mlb.classes_)

# Features adicionales: año normalizado y rating
peliculas_features = pd.concat([
    generos_df,
    (peliculas[['año']] - 1990) / 30,
    (peliculas[['rating_promedio']] - 5) / 5,
], axis=1)

# Matriz de similitud coseno
sim_matrix = cosine_similarity(peliculas_features)
sim_df = pd.DataFrame(sim_matrix, index=peliculas['titulo'], columns=peliculas['titulo'])

def recomendar(titulo, n=4):
    if titulo not in sim_df.index:
        return []
    similitudes = sim_df[titulo].drop(titulo).sort_values(ascending=False)
    recomendaciones = []
    for t, sim in similitudes.head(n).items():
        idx = peliculas[peliculas['titulo'] == t].index[0]
        recomendaciones.append({
            'titulo': t,
            'similitud': sim,
            'generos': ', '.join(peliculas.loc[idx, 'generos']),
            'rating': peliculas.loc[idx, 'rating_promedio']
        })
    return recomendaciones

# Probar recomendaciones
for pelicula in ['Inception', 'The Dark Knight', 'Get Out']:
    print(f"\\n→ Si te gustó '{pelicula}', te recomendamos:")
    for r in recomendar(pelicula, n=3):
        print(f"   {r['titulo']:<20} (sim={r['similitud']:.2f}, rating={r['rating']}) — {r['generos']}")`,
          hint: 'cosine_similarity devuelve una matriz n×n donde el elemento [i,j] es la similitud entre los ítems i y j. Excluimos la película misma con .drop(titulo) antes de ordenar.',
        }}
      >
        <p>Construye un recomendador de películas basado en similitud de géneros y ratings. Prueba qué recomienda para diferentes películas.</p>
      </Exercise>

      <h2>Filtrado colaborativo</h2>

      <p>
        El filtrado colaborativo no mira las características de los ítems, sino los patrones de
        valoración de usuarios similares: "usuarios parecidos a ti también valoraron positivamente X".
        La técnica clásica usa <strong>factorización de matrices</strong> — descompone la matriz
        de usuario-ítem en vectores latentes que capturan preferencias.
      </p>

      <Exercise number={2} title="Filtrado colaborativo con SVD" difficulty="intermedio"
        runner={{
          initial: `import numpy as np
import pandas as pd
import matplotlib.pyplot as plt
from sklearn.decomposition import TruncatedSVD
from sklearn.metrics import mean_squared_error

np.random.seed(42)

# Simular 50 usuarios, 20 películas, ratings 1-5 (con muchos nulos)
n_users, n_movies = 50, 20
titulos = [f'Película_{i+1}' for i in range(n_movies)]
usuarios = [f'Usuario_{i+1}' for i in range(n_users)]

# Perfiles latentes: 3 tipos de usuario (acción, drama, sci-fi)
perfil_usuario = np.random.choice(['accion', 'drama', 'scifi'], n_users)
perfil_pelicula = np.random.choice(['accion', 'drama', 'scifi'], n_movies)

# Matriz de ratings con preferencias coherentes + ruido
ratings_true = np.zeros((n_users, n_movies))
for i in range(n_users):
    for j in range(n_movies):
        base = 4.0 if perfil_usuario[i] == perfil_pelicula[j] else 2.0
        ratings_true[i, j] = np.clip(base + np.random.randn() * 0.8, 1, 5)

# Ocultar el 70% de los ratings (simulando que el usuario no ha visto esa película)
mask = np.random.rand(n_users, n_movies) < 0.7
ratings_obs = ratings_true.copy()
ratings_obs[mask] = 0  # 0 = no visto

print(f"Ratings observados: {(~mask).sum()} de {n_users * n_movies} posibles ({(~mask).mean():.0%})")
print(f"Rating medio real:  {ratings_true.mean():.2f}")
print(f"Rating medio obs:   {ratings_obs[~mask].mean():.2f}")
print()

# Rellenar nulos con la media del usuario para SVD
ratings_filled = ratings_obs.copy()
for i in range(n_users):
    obs = ratings_obs[i, ratings_obs[i, :] > 0]
    if len(obs) > 0:
        ratings_filled[i, mask[i]] = obs.mean()

# Factorización con SVD truncado (k=3 factores latentes)
svd = TruncatedSVD(n_components=3, random_state=42)
U = svd.fit_transform(ratings_filled)   # n_users × 3
Sigma = np.diag(svd.singular_values_)   # 3 × 3
Vt = svd.components_                    # 3 × n_movies

ratings_pred = U @ Sigma @ Vt

# Evaluar solo en ratings no observados
y_true = ratings_true[mask]
y_pred = ratings_pred[mask].clip(1, 5)
rmse = mean_squared_error(y_true, y_pred)**0.5
print(f"RMSE en ratings no observados: {rmse:.3f}")

# Generar recomendaciones para un usuario
usuario_idx = 0
print(f"\\nRecomendaciones para {usuarios[usuario_idx]} (perfil: {perfil_usuario[usuario_idx]}):")
peliculas_no_vistas = np.where(mask[usuario_idx])[0]
scores = ratings_pred[usuario_idx, peliculas_no_vistas]
top_idx = peliculas_no_vistas[np.argsort(scores)[::-1][:5]]
for idx in top_idx:
    print(f"  {titulos[idx]:<15} score={ratings_pred[usuario_idx, idx]:.2f} (real={ratings_true[usuario_idx, idx]:.2f}, tipo={perfil_pelicula[idx]})")

# Visualización: matriz de ratings original vs predicha
fig, axes = plt.subplots(1, 2, figsize=(13, 5))
im1 = axes[0].imshow(ratings_true, cmap='YlOrRd', vmin=1, vmax=5, aspect='auto')
axes[0].set_title('Ratings reales'); axes[0].set_xlabel('Película'); axes[0].set_ylabel('Usuario')
plt.colorbar(im1, ax=axes[0])
im2 = axes[1].imshow(ratings_pred.clip(1,5), cmap='YlOrRd', vmin=1, vmax=5, aspect='auto')
axes[1].set_title('Ratings predichos por SVD'); axes[1].set_xlabel('Película'); axes[1].set_ylabel('Usuario')
plt.colorbar(im2, ax=axes[1])
plt.tight_layout()
plt.show()`,
          hint: 'TruncatedSVD descompone la matriz R ≈ U·Σ·Vt donde U captura los factores latentes de usuarios y Vt los de películas. Los factores latentes representan "géneros" aprendidos automáticamente.',
        }}
      >
        <p>Implementa un sistema de recomendación colaborativo con SVD. El modelo aprende preferencias ocultas de usuarios y predice ratings para películas que no han visto.</p>
      </Exercise>

      <Quiz
        question="¿Cuál es el 'problema del arranque en frío' (cold start) en sistemas de recomendación?"
        options={[
          'El sistema tarda mucho en cargar cuando hay muchos usuarios',
          'No se pueden hacer recomendaciones para usuarios nuevos o ítems nuevos sin historial previo',
          'El sistema se vuelve menos preciso con el tiempo si no se reentrenan los modelos',
          'Los ratings del primer día son menos fiables que los posteriores',
        ]}
        correct={1}
        explanation="El cold start es el principal desafío de los sistemas de recomendación: para un usuario nuevo (sin historial) o un ítem nuevo (sin valoraciones), no hay datos de los que aprender. Las soluciones incluyen recomendadores basados en contenido para nuevos ítems, o encuestas de onboarding para nuevos usuarios."
      />

      <Quiz
        question="¿En qué se diferencia un recomendador basado en contenido del filtrado colaborativo?"
        options={[
          'El basado en contenido es más rápido, el colaborativo es más preciso',
          'El basado en contenido usa características de los ítems; el colaborativo usa patrones de comportamiento de usuarios similares',
          'El basado en contenido requiere más datos; el colaborativo funciona con pocos',
          'Solo hay diferencia en el lenguaje de programación usado',
        ]}
        correct={1}
        explanation="Basado en contenido: 'esta película es similar a las que te gustaron según sus características (géneros, actores, etc.)'. Colaborativo: 'usuarios con gustos similares a los tuyos también valoraron esto'. El colaborativo es más poderoso pero necesita muchos datos de interacciones."
      />

      <Callout kind="success" title="¡Libro 2 completado!">
        <p>Has dominado las técnicas avanzadas de ML:</p>
        <ul>
          <li>Preprocesamiento: encoding, outliers, datos desbalanceados</li>
          <li>Regularización: Ridge, Lasso, ElasticNet</li>
          <li>SVM con kernels para datos no lineales</li>
          <li>Clustering: K-Means y DBSCAN</li>
          <li>PCA para reducción de dimensiones y visualización</li>
          <li>Selección de features: filter, embedded y wrapper</li>
          <li>Pipelines sin data leakage</li>
          <li>Sistemas de recomendación por contenido y colaborativo</li>
        </ul>
        <p>El Libro 3 entra en el deep learning: redes neuronales, CNNs para imágenes, NLP y los transformers que están redefiniendo la IA.</p>
      </Callout>

      <ChapterNav
        prev={prev ? { id: prev.id, title: prev.title } : null}
        next={next ? { id: next.id, title: next.title } : null}
        onNav={onNav}
      />
    </article>
  );
}

window.ChapterL2M8 = ChapterL2M8;
