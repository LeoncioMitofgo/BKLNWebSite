// =============================================================
// chapter-l2-m6.jsx — Selección de características
// =============================================================

function ChapterL2M6({ onNav }) {
  const flat = flatTOC();
  const idx = flat.findIndex(c => c.id === 'l2-m6');
  const prev = flat[idx - 1], next = flat[idx + 1];

  return (
    <article className="reader-inner">
      <ChapterHeader
        book="// libro ii — técnicas avanzadas"
        module="módulo 06"
        time="35 min · menos features, mejor modelo"
        title={<>Selección de<br /><em>características</em><span style={{color:'var(--highlight)'}}>.</span></>}
        dek="Más features no siempre es mejor. Elegir las correctas reduce overfitting, acelera el entrenamiento y mejora la interpretabilidad."
      />

      <p>
        Tener 200 features cuando solo 15 son relevantes perjudica al modelo: introduce ruido,
        genera correlaciones espurias y hace el modelo más lento e interpretable. La
        <strong> selección de features</strong> es el proceso de identificar y conservar
        solo las variables más útiles.
      </p>

      <p>
        Hay tres familias de métodos: <em>filter methods</em> (estadísticos, independientes del modelo),
        <em>wrapper methods</em> (prueban subconjuntos de features con el modelo) y
        <em>embedded methods</em> (el propio modelo selecciona, como Lasso o árboles).
      </p>

      <DataTable
        data={[
          { método: 'Varianza', familia: 'Filter', idea: 'Elimina features con muy poca varianza (casi constantes)', pros: 'Muy rápido' },
          { método: 'Correlación / ANOVA', familia: 'Filter', idea: 'Selecciona features más correlacionadas con el target', pros: 'Independiente del modelo' },
          { método: 'SelectFromModel', familia: 'Embedded', idea: 'Usa importancias de un árbol/Lasso para filtrar', pros: 'Captura interacciones no lineales' },
          { método: 'RFE', familia: 'Wrapper', idea: 'Elimina la feature menos importante iterativamente', pros: 'Muy preciso pero costoso' },
        ]}
        caption="Métodos principales de selección de features"
      />

      <Exercise number={1} title="Comparando métodos de selección de features"
        runner={{
          initial: `import numpy as np
import matplotlib.pyplot as plt
from sklearn.datasets import make_classification
from sklearn.feature_selection import (VarianceThreshold, SelectKBest, f_classif,
                                        SelectFromModel, RFE)
from sklearn.ensemble import RandomForestClassifier
from sklearn.linear_model import LassoCV
from sklearn.model_selection import cross_val_score
from sklearn.preprocessing import StandardScaler

np.random.seed(42)

# Dataset: 5 features informativas, 15 de ruido
X, y = make_classification(
    n_samples=300, n_features=20, n_informative=5,
    n_redundant=5, n_repeated=0, random_state=42
)
# Añadir 2 features casi constantes
X[:, 18] = 0.01 + np.random.randn(300) * 0.001
X[:, 19] = 5.0  + np.random.randn(300) * 0.001

scaler = StandardScaler()
X_s = scaler.fit_transform(X)

rf_eval = RandomForestClassifier(n_estimators=100, random_state=42)

metodos = {
    'Todas (20)':        X_s,
    'Varianza (umbral)': VarianceThreshold(threshold=0.01).fit_transform(X_s),
    'ANOVA top-10':      SelectKBest(f_classif, k=10).fit_transform(X_s, y),
    'RF importances':    SelectFromModel(RandomForestClassifier(n_estimators=100, random_state=42)).fit_transform(X_s, y),
    'Lasso':             SelectFromModel(LassoCV(cv=5, max_iter=3000)).fit_transform(X_s, y),
    'RFE (10 feat.)':    RFE(RandomForestClassifier(n_estimators=50, random_state=42), n_features_to_select=10, step=2).fit_transform(X_s, y),
}

print(f"{'Método':<20} {'Features':>8} {'Accuracy':>10}")
print('-' * 42)
resultados = {}
for nombre, X_sel in metodos.items():
    acc = cross_val_score(rf_eval, X_sel, y, cv=5).mean()
    resultados[nombre] = (X_sel.shape[1], acc)
    print(f"{nombre:<20} {X_sel.shape[1]:>8} {acc:>10.3f}")

# Gráfico
fig, ax = plt.subplots(figsize=(10, 5))
nombres = list(resultados.keys())
features = [resultados[n][0] for n in nombres]
accuracies = [resultados[n][1] for n in nombres]
colores = ['#ccc' if n == 'Todas (20)' else '#1F4E5F' for n in nombres]

ax.barh(nombres, accuracies, color=colores, alpha=0.8)
for i, (f, a) in enumerate(zip(features, accuracies)):
    ax.text(a + 0.001, i, f'{a:.3f} ({f} feat.)', va='center', fontsize=9)
ax.set_xlabel('Accuracy (CV 5-fold)')
ax.set_title('Comparativa de métodos de selección de features')
ax.set_xlim(0.7, 1.0)
plt.tight_layout()
plt.show()`,
          hint: 'SelectFromModel con un Random Forest usa las feature_importances_ del modelo para decidir qué conservar. El umbral por defecto es la media de importancias.',
        }}
      >
        <p>Compara 5 métodos de selección de features en un dataset con features de ruido. Observa cómo reducir features puede mejorar (o mantener) la accuracy.</p>
      </Exercise>

      <h2>Análisis de importancia con Random Forest</h2>

      <Exercise number={2} title="Importancia de features en datos de salud" difficulty="intermedio"
        runner={{
          initial: `import numpy as np
import matplotlib.pyplot as plt
from sklearn.datasets import load_diabetes
from sklearn.ensemble import RandomForestRegressor, GradientBoostingRegressor
from sklearn.inspection import permutation_importance
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler

datos = load_diabetes()
X, y = datos.data, datos.target
feature_names = datos.feature_names

scaler = StandardScaler()
X_s = scaler.fit_transform(X)
X_train, X_test, y_train, y_test = train_test_split(X_s, y, test_size=0.25, random_state=42)

rf = RandomForestRegressor(n_estimators=200, random_state=42)
rf.fit(X_train, y_train)

# Importancia por impureza (built-in) — rápida pero puede ser sesgada
imp_builtin = rf.feature_importances_

# Importancia por permutación — más fiable
perm = permutation_importance(rf, X_test, y_test, n_repeats=20, random_state=42)
imp_perm_mean = perm.importances_mean
imp_perm_std  = perm.importances_std

print(f"R² test: {rf.score(X_test, y_test):.3f}")
print()
print(f"{'Feature':<12} {'Imp. impureza':>14} {'Imp. permutación':>18}")
orden = np.argsort(imp_perm_mean)[::-1]
for i in orden:
    print(f"{feature_names[i]:<12} {imp_builtin[i]:>14.4f} {imp_perm_mean[i]:>14.4f} ± {imp_perm_std[i]:.4f}")

# Visualización
fig, axes = plt.subplots(1, 2, figsize=(13, 5))
orden_builtin = np.argsort(imp_builtin)
axes[0].barh([feature_names[i] for i in orden_builtin],
             [imp_builtin[i] for i in orden_builtin], color='#1F4E5F', alpha=0.8)
axes[0].set_title('Importancia por impureza (MDI)')
axes[0].set_xlabel('Importancia')

orden_perm = np.argsort(imp_perm_mean)
axes[1].barh([feature_names[i] for i in orden_perm],
             [imp_perm_mean[i] for i in orden_perm],
             xerr=[imp_perm_std[i] for i in orden_perm],
             color='#C99419', alpha=0.8, capsize=4)
axes[1].set_title('Importancia por permutación')
axes[1].set_xlabel('Disminución en R²')

plt.suptitle('Comparativa de métodos de importancia', y=1.02)
plt.tight_layout()
plt.show()`,
          hint: 'La importancia por permutación mezcla aleatoriamente cada feature y mide cuánto baja el R². Es más fiable que la importancia MDI, especialmente con features correlacionadas.',
        }}
      >
        <p>Compara la importancia por impureza (MDI) vs importancia por permutación en datos de diabetes. Observa si ambos métodos coinciden en las features más relevantes.</p>
      </Exercise>

      <Quiz
        question="¿Por qué la importancia por permutación es más fiable que la importancia MDI (impureza) de Random Forest?"
        options={[
          'Porque es más rápida de calcular',
          'Porque mide el impacto real en el conjunto de test, evitando el sesgo de MDI hacia features de alta cardinalidad o numéricas',
          'Porque MDI solo funciona con clasificación, no regresión',
          'Porque permutación usa todos los datos mientras MDI usa solo el training set',
        ]}
        correct={1}
        explanation="MDI (Mean Decrease in Impurity) se calcula en training y tiende a sobreestimar la importancia de features con muchos valores únicos (alta cardinalidad). La importancia por permutación se mide en test y refleja el impacto real en nuevos datos."
      />

      <Quiz
        question="Tienes un dataset con 500 features y 200 muestras. ¿Qué harías primero antes de entrenar?"
        options={[
          'Entrenar directamente con todas las features — más es mejor',
          'Aplicar selección de features o PCA para reducir dimensionalidad antes de entrenar',
          'Aumentar el número de muestras con data augmentation',
          'Usar solo las 10 primeras features del dataset',
        ]}
        correct={1}
        explanation="Con 500 features y 200 muestras (n << p), cualquier modelo sobreajustará trivialmente. Selección de features o PCA es el primer paso obligatorio. Esta situación (más features que muestras) es común en bioinformática y análisis de texto."
      />

      <Callout kind="success" title="Módulo completado">
        Ahora tienes un arsenal completo de técnicas de selección de features. En el siguiente
        módulo aprenderás a encadenar todos estos pasos — preprocesamiento, selección, escalado,
        modelo — en un único objeto llamado <em>Pipeline</em>.
      </Callout>

      <ChapterNav
        prev={prev ? { id: prev.id, title: prev.title } : null}
        next={next ? { id: next.id, title: next.title } : null}
        onNav={onNav}
      />
    </article>
  );
}

window.ChapterL2M6 = ChapterL2M6;
