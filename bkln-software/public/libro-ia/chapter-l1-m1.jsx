// =============================================================
// chapter-l1-m1.jsx — ¿Qué es la IA?
// =============================================================

function ChapterL1M1({ onNav }) {
  const flat = flatTOC();
  const idx = flat.findIndex(c => c.id === 'l1-m1');
  const prev = idx > 0 ? flat[idx - 1] : null;
  const next = idx < flat.length - 1 ? flat[idx + 1] : null;

  return (
    <article className="reader-inner">
      <ChapterHeader
        book="// libro i — fundamentos"
        module="módulo 01"
        time="20 min de lectura"
        title={<>¿Qué es la IA?<span style={{color:'var(--highlight)'}}>.</span></>}
        dek="Diferencia entre inteligencia artificial, machine learning y deep learning — y por qué importa."
      />

      <p>
        La <strong>inteligencia artificial</strong> (IA) es un campo de la informática cuyo objetivo es
        construir sistemas capaces de realizar tareas que normalmente requieren inteligencia humana:
        reconocer imágenes, entender texto, tomar decisiones o predecir resultados. No es ciencia ficción
        ni magia — es matemática, datos y código bien organizado.
      </p>

      <p>
        Dentro de la IA existen varias ramas. Las tres más importantes hoy son:
      </p>

      <ul>
        <li><strong>Inteligencia Artificial</strong> — el campo completo: cualquier técnica que hace a una máquina "inteligente".</li>
        <li><strong>Machine Learning (ML)</strong> — una rama de la IA donde los sistemas <em>aprenden de datos</em> en lugar de seguir reglas escritas a mano.</li>
        <li><strong>Deep Learning (DL)</strong> — una rama del ML que usa redes neuronales con muchas capas. Es lo que hay detrás de ChatGPT, DALL-E y los coches autónomos.</li>
      </ul>

      <Callout kind="tip" title="La metáfora clave">
        La IA tradicional es como darle a alguien un <strong>manual de reglas</strong> para jugar ajedrez.
        El ML es como dejarle ver <strong>un millón de partidas</strong> y que descubra las reglas él solo.
      </Callout>

      <h2>¿Cómo aprende una máquina?</h2>

      <p>
        El proceso de machine learning sigue siempre la misma estructura, independientemente del problema:
      </p>

      <ol>
        <li><strong>Datos</strong> — el combustible. Sin datos no hay aprendizaje.</li>
        <li><strong>Algoritmo</strong> — el método matemático que extrae patrones de los datos.</li>
        <li><strong>Modelo</strong> — el resultado del entrenamiento. Un modelo es una función que transforma entradas en predicciones.</li>
        <li><strong>Evaluación</strong> — ¿cómo de buenas son las predicciones? Hay que medirlo.</li>
        <li><strong>Predicción</strong> — el modelo en producción, respondiendo preguntas sobre datos nuevos.</li>
      </ol>

      <h2>Tipos de aprendizaje</h2>

      <p>Según cómo se usan los datos, el ML se clasifica en tres tipos:</p>

      <p>
        <strong>Aprendizaje supervisado</strong> — los datos tienen etiquetas. Cada ejemplo tiene una respuesta
        correcta conocida. Ejemplo: fotos de gatos y perros, donde ya sabes cuál es cuál. El modelo aprende
        a clasificar imágenes nuevas. La mayoría del ML práctico es supervisado.
      </p>

      <p>
        <strong>Aprendizaje no supervisado</strong> — los datos no tienen etiquetas. El modelo busca
        estructuras ocultas por sí solo. Ejemplo: agrupar clientes por comportamiento de compra sin saber
        de antemano cuántos grupos existen.
      </p>

      <p>
        <strong>Aprendizaje por refuerzo</strong> — el modelo aprende por ensayo y error, recibiendo
        recompensas o penalizaciones. Es lo que usan los agentes de videojuegos y los robots que aprenden
        a caminar.
      </p>

      <DataTable
        data={[
          { tipo: 'Supervisado', datos: 'Etiquetados', ejemplo: 'Predecir precio de casa', algoritmos: 'Regresión, SVM, Árboles' },
          { tipo: 'No supervisado', datos: 'Sin etiquetas', ejemplo: 'Agrupar clientes', algoritmos: 'K-Means, PCA, DBSCAN' },
          { tipo: 'Por refuerzo', datos: 'Recompensas', ejemplo: 'Jugar al ajedrez', algoritmos: 'Q-Learning, PPO' },
        ]}
        caption="Los tres paradigmas del machine learning"
      />

      <h2>Aplicaciones reales</h2>

      <p>
        El ML no es teoría académica. Está en todas partes, incluyendo contextos muy cercanos a nosotros:
        los sistemas de predicción de lluvias para la agricultura, la detección de fraude en transferencias
        bancarias, los chatbots de atención al cliente, los algoritmos de recomendación de contenido. En
        Guinea Ecuatorial, sectores como el petróleo, la pesca y la banca ya están explorando estas tecnologías.
      </p>

      <h2>El ecosistema Python para ML</h2>

      <p>
        Python domina el campo del ML. Estas son las librerías que usarás en este libro:
      </p>

      <DataTable
        data={[
          { librería: 'NumPy', para: 'Álgebra lineal y arrays', módulo: 'import numpy as np' },
          { librería: 'Pandas', para: 'Tablas de datos (DataFrames)', módulo: 'import pandas as pd' },
          { librería: 'Matplotlib', para: 'Visualización y gráficos', módulo: 'import matplotlib.pyplot as plt' },
          { librería: 'scikit-learn', para: 'Algoritmos de ML', módulo: 'from sklearn import ...' },
        ]}
        caption="El stack básico de ML en Python — los cuatro pilares"
      />

      <CodeBlock code={`# El pipeline más simple del mundo: predecir con sklearn
import numpy as np
from sklearn.linear_model import LinearRegression

# Datos: horas de estudio → nota del examen
horas = np.array([[1], [2], [3], [4], [5], [6], [7], [8]])
notas = np.array([40, 52, 61, 70, 75, 82, 88, 94])

# Crear y entrenar el modelo
modelo = LinearRegression()
modelo.fit(horas, notas)

# Predecir: ¿qué nota para 9 horas de estudio?
prediccion = modelo.predict([[9]])
print(f"Predicción para 9 horas: {prediccion[0]:.1f} puntos")`} />

      <Callout kind="info" title="No te preocupes si no entiendes todo aún">
        Este ejemplo es un adelanto de lo que aprenderás en el Módulo 5. Por ahora, observa la estructura:
        datos → <code>fit()</code> → <code>predict()</code>. Esa es la base de todo sklearn.
      </Callout>

      <Quiz
        question="¿Cuál es la diferencia principal entre ML y la programación tradicional?"
        options={[
          'El ML usa Python y la programación tradicional usa Java',
          'En ML el sistema aprende patrones de datos; en programación tradicional el programador escribe las reglas',
          'El ML solo funciona para imágenes y la programación tradicional para texto',
          'No hay diferencia real, son lo mismo con distinto nombre',
        ]}
        correct={1}
        explanation="En programación tradicional escribes reglas explícitas (if precio > X, entonces...). En ML le das datos al algoritmo y él descubre las reglas por sí solo."
      />

      <Quiz
        question="Si tienes fotos de tumores etiquetadas como 'maligno' o 'benigno' y entrenas un modelo para clasificar nuevas fotos, ¿qué tipo de aprendizaje es?"
        options={[
          'No supervisado, porque las fotos vienen sin contexto',
          'Supervisado, porque tienes ejemplos con respuestas correctas conocidas',
          'Por refuerzo, porque el modelo recibe recompensas',
          'Deep learning, porque las imágenes son complejas',
        ]}
        correct={1}
        explanation="Las etiquetas ('maligno'/'benigno') son exactamente eso: respuestas correctas conocidas. Eso define el aprendizaje supervisado."
      />

      <Exercise number={1} title="Explora el ecosistema ML"
        runner={{
          initial: `# Importa las cuatro librerías del stack ML
# y muestra su versión para confirmar que están disponibles
import numpy as np
import pandas as pd
import matplotlib
import sklearn

print("NumPy:", np.__version__)
print("Pandas:", pd.__version__)
print("Matplotlib:", matplotlib.__version__)
print("scikit-learn:", sklearn.__version__)
print()
print("¡El entorno ML está listo!")`,
          hint: 'Las versiones se acceden con .__version__ en cada librería.',
          solution: {
            code: `import numpy as np
import pandas as pd
import matplotlib
import sklearn

print("NumPy:", np.__version__)
print("Pandas:", pd.__version__)
print("Matplotlib:", matplotlib.__version__)
print("scikit-learn:", sklearn.__version__)`,
            explanation: 'Este ejercicio confirma que las librerías están instaladas. La primera ejecución puede tardar mientras el navegador las descarga.',
          }
        }}
      >
        <p>Importa las cuatro librerías fundamentales del ML en Python y muestra su versión. Este será el "hola mundo" de todos tus proyectos de ML.</p>
      </Exercise>

      <Exercise number={2} title="Tu primera predicción" difficulty="fácil"
        runner={{
          initial: `import numpy as np
from sklearn.linear_model import LinearRegression

# Datos: temperatura (°C) → ventas de bebidas
temperatura = np.array([[20], [25], [28], [30], [33], [35], [38]])
ventas      = np.array([150,  180,  200,  220,  260,  290,  330])

# 1. Crea el modelo
modelo = LinearRegression()

# 2. Entrénalo con los datos
modelo.fit(temperatura, ventas)

# 3. Predice las ventas para 32°C y 40°C
pred_32 = modelo.predict([[32]])
pred_40 = modelo.predict([[40]])

print(f"Ventas esperadas a 32°C: {pred_32[0]:.0f} unidades")
print(f"Ventas esperadas a 40°C: {pred_40[0]:.0f} unidades")`,
          hint: 'El flujo es siempre: crear modelo → fit(X, y) → predict([[valor]])',
          solution: {
            code: `import numpy as np
from sklearn.linear_model import LinearRegression

temperatura = np.array([[20],[25],[28],[30],[33],[35],[38]])
ventas = np.array([150, 180, 200, 220, 260, 290, 330])

modelo = LinearRegression()
modelo.fit(temperatura, ventas)

print(f"Ventas a 32°C: {modelo.predict([[32]])[0]:.0f}")
print(f"Ventas a 40°C: {modelo.predict([[40]])[0]:.0f}")`,
            explanation: 'LinearRegression encuentra la línea recta que mejor describe la relación temperatura→ventas, y la usa para hacer predicciones en valores que nunca vio.',
          }
        }}
      >
        <p>Tienes datos históricos de temperatura y ventas de bebidas. Entrena un modelo de regresión lineal y predice las ventas para 32°C y 40°C.</p>
      </Exercise>

      <Callout kind="success" title="Módulo completado">
        Ahora entiendes la diferencia entre IA, ML y DL, los tres tipos de aprendizaje, y has ejecutado
        tu primera predicción real. En el siguiente módulo aprenderás NumPy — la base matemática sobre
        la que se construye todo el ecosistema ML.
      </Callout>

      <ChapterNav
        prev={prev ? { id: prev.id, title: prev.title } : null}
        next={next ? { id: next.id, title: next.title } : null}
        onNav={onNav}
      />
    </article>
  );
}

window.ChapterL1M1 = ChapterL1M1;
