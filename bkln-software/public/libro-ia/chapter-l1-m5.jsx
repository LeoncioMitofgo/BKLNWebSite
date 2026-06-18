// =============================================================
// chapter-l1-m5.jsx — Regresión lineal
// =============================================================

function ChapterL1M5({ onNav }) {
  const flat = flatTOC();
  const idx = flat.findIndex(c => c.id === 'l1-m5');
  const prev = flat[idx - 1], next = flat[idx + 1];

  return (
    <article className="reader-inner">
      <ChapterHeader
        book="// libro i — fundamentos"
        module="módulo 05"
        time="40 min · primer modelo real"
        title={<>Regresión<br /><em>lineal</em><span style={{color:'var(--highlight)'}}>.</span></>}
        dek="Tu primer modelo predictivo: encontrar la línea que mejor describe la relación entre variables."
      />

      <p>
        La <strong>regresión lineal</strong> es el algoritmo de ML más antiguo y más importante que aprenderás.
        No porque sea el más potente — hay muchos más precisos — sino porque sienta las bases conceptuales
        de todo lo que viene después: pérdida, optimización, entrenamiento, predicción.
      </p>

      <p>
        La idea es simple: dada una nube de puntos, encontrar la línea recta que mejor los representa.
        Esa línea te permite predecir el valor de <em>y</em> para cualquier <em>x</em> nuevo que nunca viste.
      </p>

      <h2>La ecuación de la línea</h2>

      <p>
        Una línea recta se define por dos parámetros: <strong>pendiente</strong> (<em>m</em>) e
        <strong> intercepto</strong> (<em>b</em>):
      </p>

      <CodeBlock code={`# y = m * x + b
# Ejemplo: precio de casa = 350000 * metros + 5000000
# m = 350000 (precio por m² adicional)
# b = 5000000 (precio base sin metros)

metros = 80
precio = 350_000 * metros + 5_000_000
print(f"Casa de {metros}m²: {precio:,} FCFA")`} />

      <p>
        El trabajo del algoritmo de regresión lineal es <em>encontrar</em> los valores óptimos de
        <em> m</em> y <em>b</em> que minimicen el error entre las predicciones y los valores reales.
      </p>

      <h2>El error: función de coste</h2>

      <p>
        ¿Cómo mide el modelo qué tan buena es su línea? Con el <strong>Error Cuadrático Medio (MSE)</strong>:
        calcula la diferencia entre cada predicción y el valor real, la eleva al cuadrado (para que los
        errores negativos no cancelen a los positivos) y calcula la media.
      </p>

      <CodeBlock code={`import numpy as np

y_real = np.array([200, 350, 280, 410, 320])
y_pred = np.array([190, 360, 270, 420, 310])

errores = y_real - y_pred
mse = np.mean(errores ** 2)
rmse = np.sqrt(mse)  # mismas unidades que y

print("Errores:", errores)
print(f"MSE: {mse:.2f}")
print(f"RMSE: {rmse:.2f}")  # → 11.40`} />

      <h2>Regresión lineal con scikit-learn</h2>

      <p>
        En la práctica, scikit-learn hace todo el trabajo de optimización por ti. El flujo siempre es el mismo:
        <strong> crear → fit → predict</strong>.
      </p>

      <Exercise number={1} title="Predecir precios de casas"
        runner={{
          initial: `import numpy as np
import matplotlib.pyplot as plt
from sklearn.linear_model import LinearRegression
from sklearn.metrics import mean_squared_error, r2_score

# Datos: m² → precio en millones FCFA
np.random.seed(42)
metros = np.random.randint(40, 300, 60)
precio = metros * 3.5 + np.random.normal(0, 20, 60) + 20  # millones FCFA

X = metros.reshape(-1, 1)  # sklearn espera (n_muestras, n_features)
y = precio

# Separar en entrenamiento (80%) y prueba (20%)
from sklearn.model_selection import train_test_split
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Crear y entrenar el modelo
modelo = LinearRegression()
modelo.fit(X_train, y_train)

# Evaluar
y_pred = modelo.predict(X_test)
r2   = r2_score(y_test, y_pred)
rmse = np.sqrt(mean_squared_error(y_test, y_pred))

print(f"Pendiente (precio/m²): {modelo.coef_[0]:.2f} M FCFA")
print(f"Intercepto:            {modelo.intercept_:.2f} M FCFA")
print(f"R² (precisión):        {r2:.3f}")
print(f"RMSE (error típico):   {rmse:.2f} M FCFA")

# Visualizar
plt.figure(figsize=(9, 5))
plt.scatter(X_test, y_test, color='#1F4E5F', alpha=0.7, label='Datos reales', s=50)
plt.plot(X_test, y_pred, color='#D9742A', linewidth=2.5, label='Predicción del modelo')
plt.xlabel('Superficie (m²)'); plt.ylabel('Precio (M FCFA)')
plt.title(f'Regresión lineal — R²={r2:.3f}')
plt.legend(); plt.grid(True, alpha=0.3); plt.tight_layout()
plt.show()`,
          hint: 'reshape(-1, 1) convierte un vector 1D a columna 2D, que sklearn requiere para X. r2_score de 1.0 sería perfecto; por encima de 0.85 es muy bueno.',
        }}
      >
        <p>Construye un modelo de regresión lineal para predecir precios de casas según los metros cuadrados. Evalúalo con R² y RMSE, y visualiza la línea de predicción.</p>
      </Exercise>

      <h2>Regresión múltiple — varias características</h2>

      <p>
        Pocas veces una sola variable predice bien el resultado. La regresión <strong>múltiple</strong>
        usa varias características a la vez:
      </p>

      <Exercise number={2} title="Regresión múltiple: precio con metros, habitaciones y antigüedad" difficulty="intermedio"
        runner={{
          initial: `import numpy as np
import pandas as pd
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import r2_score
from sklearn.preprocessing import StandardScaler

np.random.seed(0)
n = 200

# Generar dataset sintético de inmuebles
metros      = np.random.randint(40, 300, n)
habitaciones = np.random.randint(1, 6, n)
antiguedad  = np.random.randint(0, 40, n)

# Precio = función de las 3 variables + ruido
precio = (metros * 3.5 +
          habitaciones * 15 -
          antiguedad * 2 +
          np.random.normal(0, 15, n) + 30)

df = pd.DataFrame({'metros': metros, 'habitaciones': habitaciones,
                   'antiguedad': antiguedad, 'precio': precio})

X = df[['metros', 'habitaciones', 'antiguedad']]
y = df['precio']

# Escalar features (importante en regresión múltiple)
scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, test_size=0.2, random_state=42)

modelo = LinearRegression()
modelo.fit(X_train, y_train)

r2 = r2_score(y_test, modelo.predict(X_test))
print(f"R²: {r2:.3f}")
print("\\nCoeficientes (importancia de cada feature):")
for feature, coef in zip(['metros','habitaciones','antiguedad'], modelo.coef_):
    print(f"  {feature:15s}: {coef:+.2f}")

# Predecir una casa específica
casa_nueva = scaler.transform([[120, 3, 10]])  # 120m², 3 hab, 10 años
pred = modelo.predict(casa_nueva)[0]
print(f"\\nPredicción 120m², 3 hab, 10 años: {pred:.1f} M FCFA")`,
          hint: 'StandardScaler normaliza las features para que todas tengan media 0 y desviación estándar 1. Importante cuando las features tienen escalas muy diferentes.',
          solution: {
            code: `# La clave: fit_transform en train, solo transform en test/nuevos datos
# Nunca uses fit_transform en datos de test — contaminaría la evaluación`,
            explanation: 'El StandardScaler aprende la media y desviación de los datos de entrenamiento. Para datos de test y predicciones nuevas, solo aplica la transformación (transform), no la recalcula.',
          }
        }}
      >
        <p>Usa tres características para predecir el precio de inmuebles. Compara los coeficientes para entender qué variable influye más.</p>
      </Exercise>

      <Quiz
        question="Un modelo de regresión lineal tiene R²=0.92. ¿Qué significa?"
        options={[
          'El modelo tiene un 92% de probabilidad de estar bien entrenado',
          'El modelo explica el 92% de la varianza de la variable objetivo',
          'El error promedio del modelo es del 8%',
          'El modelo predice correctamente 92 de cada 100 valores',
        ]}
        correct={1}
        explanation="R² (coeficiente de determinación) mide qué proporción de la variabilidad en y es explicada por el modelo. R²=0.92 significa que el modelo captura el 92% de los patrones en los datos. 1.0 sería perfecto."
      />

      <Quiz
        question="¿Por qué usamos train_test_split antes de evaluar el modelo?"
        options={[
          'Para que el entrenamiento sea más rápido',
          'Para evaluar el modelo con datos que nunca vio durante el entrenamiento',
          'Porque sklearn lo requiere obligatoriamente',
          'Para reducir el uso de memoria RAM',
        ]}
        correct={1}
        explanation="Evaluar con los mismos datos de entrenamiento daría una falsa sensación de precisión. El modelo memoriza los datos de train. Solo los datos de test (que nunca vio) revelan si realmente generaliza."
      />

      <Callout kind="success" title="Módulo completado">
        Has entrenado y evaluado tu primer modelo de regresión lineal real. Entiendes los conceptos
        clave: coste, entrenamiento, evaluación con R² y RMSE, y la importancia del train/test split.
        En el siguiente módulo pasaremos a la <em>clasificación</em> — cuando la respuesta no es un
        número continuo sino una categoría.
      </Callout>

      <ChapterNav
        prev={prev ? { id: prev.id, title: prev.title } : null}
        next={next ? { id: next.id, title: next.title } : null}
        onNav={onNav}
      />
    </article>
  );
}

window.ChapterL1M5 = ChapterL1M5;
