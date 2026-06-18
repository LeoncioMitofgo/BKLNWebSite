// =============================================================
// chapter-l2-m2.jsx — Regresión con regularización
// =============================================================

function ChapterL2M2({ onNav }) {
  const flat = flatTOC();
  const idx = flat.findIndex(c => c.id === 'l2-m2');
  const prev = flat[idx - 1], next = flat[idx + 1];

  return (
    <article className="reader-inner">
      <ChapterHeader
        book="// libro ii — técnicas avanzadas"
        module="módulo 02"
        time="40 min · combatir el overfitting en regresión"
        title={<>Regularización<span style={{color:'var(--highlight)'}}>.</span></>}
        dek="Cuando el modelo memoriza en vez de aprender — cómo añadir una penalización que fuerza la generalización."
      />

      <p>
        La regresión lineal ordinaria minimiza el error de predicción sin ninguna restricción.
        Con muchas features, puede asignar coeficientes enormes a variables irrelevantes y memorizar
        el ruido del training set. La <strong>regularización</strong> añade una penalización al tamaño
        de los coeficientes, obligando al modelo a ser más conservador.
      </p>

      <h2>Ridge, Lasso y ElasticNet</h2>

      <p>
        Las tres variantes difieren en <em>cómo</em> penalizan los coeficientes. La diferencia clave:
        Lasso puede llevar coeficientes exactamente a cero (selección de features automática),
        Ridge los reduce pero nunca los elimina.
      </p>

      <DataTable
        data={[
          { modelo: 'Ridge (L2)', penalización: 'Suma de cuadrados de coeficientes', efecto: 'Reduce todos los coefs., ninguno llega a 0', cuándo: 'Muchas features correlacionadas' },
          { modelo: 'Lasso (L1)', penalización: 'Suma de valores absolutos', efecto: 'Elimina features irrelevantes (coef.=0)', cuándo: 'Muchas features, pocas relevantes' },
          { modelo: 'ElasticNet', penalización: 'Combinación L1 + L2', efecto: 'Intermedio: elimina algunas, reduce otras', cuándo: 'Cuando no sabes cuál aplicar' },
        ]}
        caption="Comparativa de métodos de regularización"
      />

      <Exercise number={1} title="Efecto visual de la regularización en los coeficientes"
        runner={{
          initial: `import numpy as np
import matplotlib.pyplot as plt
from sklearn.linear_model import LinearRegression, Ridge, Lasso, ElasticNet
from sklearn.datasets import make_regression
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split

np.random.seed(42)

# Dataset con 20 features, solo 5 son realmente informativas
X, y = make_regression(n_samples=150, n_features=20, n_informative=5,
                        noise=30, random_state=42)

scaler = StandardScaler()
X_s = scaler.fit_transform(X)
X_train, X_test, y_train, y_test = train_test_split(X_s, y, test_size=0.25, random_state=42)

modelos = {
    'LinearRegression': LinearRegression(),
    'Ridge (α=10)':     Ridge(alpha=10),
    'Lasso (α=1)':      Lasso(alpha=1),
    'ElasticNet':       ElasticNet(alpha=1, l1_ratio=0.5),
}

fig, axes = plt.subplots(2, 2, figsize=(12, 8))
axes = axes.flatten()

for ax, (nombre, modelo) in zip(axes, modelos.items()):
    modelo.fit(X_train, y_train)
    r2_train = modelo.score(X_train, y_train)
    r2_test  = modelo.score(X_test, y_test)
    n_cero   = np.sum(np.abs(modelo.coef_) < 0.01)

    ax.bar(range(20), modelo.coef_, color=['#C99419' if abs(c) > 0.01 else '#ccc' for c in modelo.coef_])
    ax.axhline(0, color='black', linewidth=0.8)
    ax.set_title(f"{nombre}\\nR² train={r2_train:.3f}, test={r2_test:.3f}, coefs≈0: {n_cero}")
    ax.set_xlabel('Feature'); ax.set_ylabel('Coeficiente')

plt.suptitle('Efecto de la regularización sobre los coeficientes', fontsize=13, y=1.01)
plt.tight_layout()
plt.show()`,
          hint: 'Lasso con alpha suficiente lleva muchos coeficientes exactamente a 0.0. Compara cuántas features "amarillas" (activas) quedan en cada modelo.',
        }}
      >
        <p>Visualiza cómo Ridge, Lasso y ElasticNet afectan a los coeficientes comparados con regresión lineal sin regularización. Observa qué modelo elimina más features.</p>
      </Exercise>

      <h2>Selección automática de alpha con validación cruzada</h2>

      <p>
        Alpha (λ) controla la fuerza de la regularización. Alpha=0 es regresión lineal pura;
        alpha muy alto hace el modelo demasiado simple. scikit-learn ofrece <code>RidgeCV</code> y
        <code>LassoCV</code> que prueban múltiples valores automáticamente usando validación cruzada.
      </p>

      <Exercise number={2} title="Selección automática de alpha — consumo energético" difficulty="intermedio"
        runner={{
          initial: `import numpy as np
import matplotlib.pyplot as plt
from sklearn.linear_model import RidgeCV, LassoCV, LinearRegression
from sklearn.preprocessing import StandardScaler
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error

np.random.seed(42)
n = 300

# Dataset simulado: consumo energético de edificios
superficie  = np.random.normal(150, 60, n).clip(30, 500)
habitaciones = np.random.randint(1, 7, n)
antiguedad  = np.random.randint(0, 50, n)
aislamiento = np.random.choice([0, 1, 2], n)  # 0=ninguno, 1=básico, 2=óptimo
orientacion = np.random.choice([0, 1], n)      # 0=norte, 1=sur
temp_media  = np.random.normal(15, 5, n)

# Features adicionales irrelevantes (ruido)
ruido1 = np.random.randn(n)
ruido2 = np.random.randn(n)
ruido3 = np.random.randn(n)

consumo = (
    2.5 * superficie +
    80 * habitaciones +
    1.2 * antiguedad -
    400 * aislamiento -
    120 * orientacion -
    30 * temp_media +
    np.random.normal(0, 150, n)
)

feature_names = ['superficie', 'habitaciones', 'antiguedad', 'aislamiento', 'orientacion', 'temp_media', 'ruido1', 'ruido2', 'ruido3']
X = np.column_stack([superficie, habitaciones, antiguedad, aislamiento, orientacion, temp_media, ruido1, ruido2, ruido3])

scaler = StandardScaler()
X_s = scaler.fit_transform(X)
X_train, X_test, y_train, y_test = train_test_split(X_s, consumo, test_size=0.25, random_state=42)

alphas = np.logspace(-2, 4, 50)

ridge_cv = RidgeCV(alphas=alphas, cv=10).fit(X_train, y_train)
lasso_cv = LassoCV(alphas=alphas, cv=10, max_iter=5000).fit(X_train, y_train)
lr       = LinearRegression().fit(X_train, y_train)

for nombre, modelo in [('LinearRegression', lr), ('RidgeCV', ridge_cv), ('LassoCV', lasso_cv)]:
    rmse_tr = mean_squared_error(y_train, modelo.predict(X_train))**0.5
    rmse_te = mean_squared_error(y_test,  modelo.predict(X_test))**0.5
    alpha_str = f"  α={modelo.alpha_:.3f}" if hasattr(modelo, 'alpha_') else ""
    print(f"{nombre}{alpha_str}")
    print(f"  RMSE train={rmse_tr:.1f}, test={rmse_te:.1f}")

# Comparar coeficientes
fig, axes = plt.subplots(1, 3, figsize=(14, 5))
for ax, (nombre, modelo) in zip(axes, [('LinearRegression', lr), (f'Ridge α={ridge_cv.alpha_:.2f}', ridge_cv), (f'Lasso α={lasso_cv.alpha_:.4f}', lasso_cv)]):
    colores = ['#C99419' if abs(c) > 0.01 else '#bbb' for c in modelo.coef_]
    ax.barh(feature_names, modelo.coef_, color=colores)
    ax.axvline(0, color='black', linewidth=0.8)
    ax.set_title(nombre)
plt.suptitle('Coeficientes estandarizados', y=1.02)
plt.tight_layout()
plt.show()`,
          hint: 'RidgeCV y LassoCV exponen .alpha_ con el alpha óptimo encontrado. np.logspace(-2, 4) crea una escala logarítmica de 0.01 a 10000.',
        }}
      >
        <p>Aplica Ridge y Lasso con selección automática de alpha en un dataset de consumo energético con features de ruido. Verifica que Lasso elimina las variables irrelevantes.</p>
      </Exercise>

      <Quiz
        question="¿Cuál es la principal diferencia entre Ridge y Lasso?"
        options={[
          'Ridge es más rápido de calcular que Lasso',
          'Lasso puede llevar coeficientes exactamente a cero (selección de features), Ridge solo los reduce',
          'Ridge funciona solo para clasificación, Lasso para regresión',
          'Lasso usa validación cruzada automáticamente, Ridge no',
        ]}
        correct={1}
        explanation="La penalización L1 de Lasso genera soluciones sparse: muchos coeficientes exactamente 0. Ridge (L2) reduce los coeficientes pero raramente los elimina. Por eso Lasso actúa como selector automático de features."
      />

      <Quiz
        question="Tu modelo de regresión tiene R²=0.97 en training y R²=0.61 en test. ¿Qué haría regularización?"
        options={[
          'Empeoraría ambos scores porque añade restricciones innecesarias',
          'Reduciría el R² de training ligeramente pero mejoraría el de test al reducir overfitting',
          'Aumentaría el R² de training porque el modelo aprende mejor',
          'Solo afecta al training set, no al test',
        ]}
        correct={1}
        explanation="0.97 en train y 0.61 en test es overfitting claro. La regularización penaliza coeficientes grandes, forzando al modelo a encontrar patrones más generalizables. El train score baja un poco, el test score sube — ese es el objetivo."
      />

      <Callout kind="success" title="Módulo completado">
        Ya sabes combatir el overfitting con regularización y seleccionar automáticamente el
        hiperparámetro alpha. En el siguiente módulo explorarás las <em>Máquinas de Soporte Vectorial</em>
        — un algoritmo diferente que maximiza el margen de separación entre clases.
      </Callout>

      <ChapterNav
        prev={prev ? { id: prev.id, title: prev.title } : null}
        next={next ? { id: next.id, title: next.title } : null}
        onNav={onNav}
      />
    </article>
  );
}

window.ChapterL2M2 = ChapterL2M2;
