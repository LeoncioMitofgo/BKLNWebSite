// =============================================================
// chapter-l2-m7.jsx — Pipelines y automatización
// =============================================================

function ChapterL2M7({ onNav }) {
  const flat = flatTOC();
  const idx = flat.findIndex(c => c.id === 'l2-m7');
  const prev = flat[idx - 1], next = flat[idx + 1];

  return (
    <article className="reader-inner">
      <ChapterHeader
        book="// libro ii — técnicas avanzadas"
        module="módulo 07"
        time="40 min · el código que va a producción"
        title={<>Pipelines<span style={{color:'var(--highlight)'}}>.</span></>}
        dek="Un Pipeline encadena todo el procesamiento en un objeto reproducible, sin data leakage y listo para producción."
      />

      <p>
        En los módulos anteriores has aplicado escalado, encoding, selección de features y modelo
        como pasos separados. En la práctica esto es propenso a errores — especialmente el
        <strong> data leakage</strong>: si escales los datos antes del split, el modelo "ve" el test set.
      </p>

      <p>
        La solución es el <strong>Pipeline</strong> de scikit-learn: un objeto que encadena todos
        los pasos de transformación y el modelo final. Cuando llamas <code>pipeline.fit(X_train)</code>,
        todos los pasos aprenden solo del training set. Cuando llamas <code>pipeline.predict(X_test)</code>,
        aplica las transformaciones aprendidas al test sin reaprender — garantizando que no hay leakage.
      </p>

      <CodeBlock code={`from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.decomposition import PCA
from sklearn.svm import SVC

# Pipeline: scaler → PCA → SVM
pipeline = Pipeline([
    ('scaler', StandardScaler()),   # Paso 1: normalizar
    ('pca',    PCA(n_components=10)),  # Paso 2: reducir dimensiones
    ('svm',    SVC(kernel='rbf', C=1.0)),  # Paso 3: clasificar
])

# fit() solo en training set — sin data leakage posible
pipeline.fit(X_train, y_train)

# predict() aplica automáticamente todos los pasos al test
accuracy = pipeline.score(X_test, y_test)
print(f"Accuracy: {accuracy:.3f}")`} />

      <h2>ColumnTransformer: preprocesamiento mixto</h2>

      <p>
        En datos reales tienes columnas numéricas y categóricas que necesitan transformaciones distintas.
        <code>ColumnTransformer</code> aplica transformadores diferentes a diferentes columnas,
        y se puede usar dentro de un Pipeline.
      </p>

      <Exercise number={1} title="Pipeline completo con datos mixtos"
        runner={{
          initial: `import numpy as np
import pandas as pd
from sklearn.pipeline import Pipeline
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import StandardScaler, OneHotEncoder
from sklearn.impute import SimpleImputer
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split, cross_val_score

np.random.seed(42)
n = 400

# Dataset realista: empleados con datos mixtos y valores nulos
df = pd.DataFrame({
    'edad':          np.random.randint(22, 60, n).astype(float),
    'salario':       np.random.normal(2500, 800, n).clip(800),
    'años_empresa':  np.random.randint(0, 25, n).astype(float),
    'nivel_estudios': np.random.choice(['Primaria','Secundaria','Universidad','Posgrado'], n),
    'departamento':  np.random.choice(['Ventas','IT','RRHH','Finanzas','Operaciones'], n),
    'horas_extra':   np.random.normal(5, 3, n).clip(0),
})

# Añadir valores nulos realistas
for col in ['edad', 'salario', 'años_empresa', 'horas_extra']:
    idx = np.random.choice(n, int(n * 0.08), replace=False)
    df.loc[idx, col] = np.nan

# Target: abandona la empresa (1) o no (0)
df['abandona'] = (
    (df['salario'].fillna(df['salario'].median()) < 1800) |
    (df['horas_extra'].fillna(0) > 10)
).astype(int)
flip = np.random.rand(n) < 0.1
df['abandona'] ^= flip

X = df.drop('abandona', axis=1)
y = df['abandona']

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.25, random_state=42)

# Identificar columnas por tipo
cols_num = ['edad', 'salario', 'años_empresa', 'horas_extra']
cols_cat = ['nivel_estudios', 'departamento']

# Transformadores por tipo de columna
num_pipeline = Pipeline([
    ('imputer', SimpleImputer(strategy='median')),
    ('scaler',  StandardScaler()),
])
cat_pipeline = Pipeline([
    ('imputer', SimpleImputer(strategy='most_frequent')),
    ('ohe',     OneHotEncoder(handle_unknown='ignore', sparse_output=False)),
])

preprocessor = ColumnTransformer([
    ('num', num_pipeline, cols_num),
    ('cat', cat_pipeline, cols_cat),
])

# Pipeline completo
full_pipeline = Pipeline([
    ('prep',  preprocessor),
    ('model', RandomForestClassifier(n_estimators=100, class_weight='balanced', random_state=42)),
])

full_pipeline.fit(X_train, y_train)
acc_test = full_pipeline.score(X_test, y_test)
cv_scores = cross_val_score(full_pipeline, X, y, cv=5)

print(f"Nulls en el dataset: {X.isnull().sum().sum()} valores")
print(f"Distribución target: {y.mean():.1%} abandonan")
print()
print(f"Accuracy test:          {acc_test:.3f}")
print(f"Accuracy CV (5-fold):   {cv_scores.mean():.3f} ± {cv_scores.std():.3f}")`,
          hint: 'ColumnTransformer aplica transformadores diferentes a subconjuntos de columnas y concatena los resultados. SimpleImputer(strategy="median") rellena nulos con la mediana de la columna.',
        }}
      >
        <p>Construye un pipeline completo con datos mixtos (numéricos + categóricos), valores nulos y un clasificador. El Pipeline garantiza que no hay data leakage en la validación cruzada.</p>
      </Exercise>

      <h2>Búsqueda de hiperparámetros en el Pipeline</h2>

      <Exercise number={2} title="GridSearchCV sobre un Pipeline completo" difficulty="intermedio"
        runner={{
          initial: `import numpy as np
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.decomposition import PCA
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import GridSearchCV, cross_val_score
from sklearn.datasets import load_breast_cancer

datos = load_breast_cancer()
X, y = datos.data, datos.target

# Pipeline: scaler → PCA → Random Forest
pipeline = Pipeline([
    ('scaler', StandardScaler()),
    ('pca',    PCA()),
    ('rf',     RandomForestClassifier(random_state=42)),
])

# Los parámetros se nombran como 'paso__parametro'
param_grid = {
    'pca__n_components': [5, 10, 15, 20],
    'rf__n_estimators':  [50, 100],
    'rf__max_depth':     [None, 5, 10],
}

gs = GridSearchCV(
    pipeline, param_grid,
    cv=5, scoring='accuracy',
    n_jobs=-1, verbose=0
)
gs.fit(X, y)

print("Mejores parámetros:")
for k, v in gs.best_params_.items():
    print(f"  {k}: {v}")
print()
print(f"Mejor accuracy CV:  {gs.best_score_:.4f}")

# Comparar con pipeline sin optimización
pipeline_base = Pipeline([
    ('scaler', StandardScaler()),
    ('rf',     RandomForestClassifier(n_estimators=100, random_state=42)),
])
acc_base = cross_val_score(pipeline_base, X, y, cv=5).mean()
print(f"Sin PCA ni tuning:  {acc_base:.4f}")
print()

# Top 5 configuraciones
import pandas as pd
resultados = pd.DataFrame(gs.cv_results_)
top5 = resultados.nlargest(5, 'mean_test_score')[['param_pca__n_components', 'param_rf__n_estimators', 'param_rf__max_depth', 'mean_test_score']]
print("Top 5 configuraciones:")
print(top5.to_string(index=False))`,
          hint: 'En GridSearchCV con Pipeline, los parámetros se nombran como "nombre_paso__parametro". El __ doble separa el nombre del paso del parámetro del transformador.',
        }}
      >
        <p>Aplica GridSearchCV a un Pipeline completo (StandardScaler → PCA → Random Forest) para optimizar simultáneamente la compresión PCA y los hiperparámetros del modelo.</p>
      </Exercise>

      <Quiz
        question="¿Por qué usar Pipeline previene el data leakage en validación cruzada?"
        options={[
          'Porque Pipeline separa automáticamente train y test en carpetas diferentes',
          'Porque fit() y transform() se aplican solo al fold de training en cada iteración CV, sin ver el fold de test',
          'Porque Pipeline aplica los transformadores después del split, no antes',
          'Pipeline no previene data leakage, solo organiza el código',
        ]}
        correct={1}
        explanation="Cuando cross_val_score usa un Pipeline, en cada fold llama a pipeline.fit(X_train_fold) (el escalador aprende de ese fold), luego pipeline.predict(X_test_fold) (aplica el escalador aprendido). Sin Pipeline, si escalas antes de cross_val_score, el escalador ya vio el test fold — eso es data leakage."
      />

      <Quiz
        question="¿Cómo referencias el parámetro 'n_estimators' del paso 'rf' en un GridSearchCV con Pipeline?"
        options={[
          `'n_estimators'`,
          `'rf.n_estimators'`,
          `'rf__n_estimators'`,
          `'RandomForestClassifier__n_estimators'`,
        ]}
        correct={2}
        explanation="La convención de scikit-learn para Pipelines es 'nombre_paso__parametro' con doble guion bajo. Así GridSearchCV sabe que 'n_estimators' pertenece al paso 'rf' del Pipeline."
      />

      <Callout kind="success" title="Módulo completado">
        Los Pipelines son la forma correcta de construir modelos de ML listos para producción.
        En el módulo final del Libro 2 aplicarás todo lo aprendido en un <em>proyecto completo</em>:
        un sistema de recomendación basado en similitud.
      </Callout>

      <ChapterNav
        prev={prev ? { id: prev.id, title: prev.title } : null}
        next={next ? { id: next.id, title: next.title } : null}
        onNav={onNav}
      />
    </article>
  );
}

window.ChapterL2M7 = ChapterL2M7;
