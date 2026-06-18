// =============================================================
// chapter-l1-m4.jsx — Matplotlib: ver para entender
// =============================================================

function ChapterL1M4({ onNav }) {
  const flat = flatTOC();
  const idx = flat.findIndex(c => c.id === 'l1-m4');
  const prev = flat[idx - 1], next = flat[idx + 1];

  return (
    <article className="reader-inner">
      <ChapterHeader
        book="// libro i — fundamentos"
        module="módulo 04"
        time="30 min · gráficos interactivos"
        title={<>Matplotlib<span style={{color:'var(--highlight)'}}>.</span></>}
        dek="Visualizar datos revela lo que los números ocultan — y es esencial antes de entrenar cualquier modelo."
      />

      <p>
        Antes de construir un modelo, siempre visualiza los datos. Un gráfico te puede decir en segundos
        si hay outliers, si hay una relación lineal o cuadrática, si los datos están desbalanceados,
        o si simplemente hay un error en el dataset. Sin visualización, entrenas a ciegas.
      </p>

      <p>
        <strong>Matplotlib</strong> es la librería de visualización más usada en Python. Todos los gráficos
        que ves en papers de ML, tutoriales de data science y notebooks de Jupyter los genera (directa o
        indirectamente) Matplotlib. En este módulo aprenderás los cuatro tipos de gráfico que más usarás
        en ML — y los verás renderizados en tiempo real en el navegador.
      </p>

      <Callout kind="tip" title="plt.show() genera la imagen aquí">
        En este libro, cuando escribes <code>plt.show()</code> el gráfico aparece directamente debajo del
        editor. No se abre ninguna ventana externa. Puedes modificar el código y volver a ejecutar para
        ver los cambios al instante.
      </Callout>

      <h2>Gráfico de líneas</h2>

      <p>
        Ideal para datos temporales: evolución de ventas, pérdida durante el entrenamiento, temperatura a lo
        largo del tiempo.
      </p>

      <Exercise number={1} title="Evolución de ventas mensuales"
        runner={{
          initial: `import matplotlib.pyplot as plt
import numpy as np

meses = ['Ene','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic']
ventas_2023 = [420, 390, 510, 480, 560, 620, 590, 640, 580, 700, 750, 820]
ventas_2024 = [450, 420, 540, 510, 600, 670, 640, 700, 650, 760, 810, 900]

x = np.arange(len(meses))

plt.figure(figsize=(10, 5))
plt.plot(x, ventas_2023, marker='o', label='2023', color='#1F4E5F', linewidth=2)
plt.plot(x, ventas_2024, marker='s', label='2024', color='#D9742A', linewidth=2)

plt.xticks(x, meses)
plt.xlabel('Mes')
plt.ylabel('Ventas (miles FCFA)')
plt.title('Evolución de ventas — comparativa anual')
plt.legend()
plt.grid(True, alpha=0.3)
plt.tight_layout()
plt.show()`,
          hint: 'plt.plot(x, y, marker="o", label="nombre") dibuja la línea. plt.legend() muestra la leyenda.',
        }}
      >
        <p>Dibuja la evolución de ventas de dos años para comparar la tendencia.</p>
      </Exercise>

      <h2>Gráfico de dispersión (scatter)</h2>

      <p>
        El más importante en ML para visualizar la <strong>relación entre dos variables</strong>. Antes de
        hacer una regresión, siempre haz un scatter plot para ver si la relación tiene sentido.
      </p>

      <Exercise number={2} title="Relación tamaño–precio de inmuebles"
        runner={{
          initial: `import matplotlib.pyplot as plt
import numpy as np

np.random.seed(42)
n = 80
metros = np.random.randint(40, 250, n)
# Precio base según metros + ruido
precio = metros * 350_000 + np.random.normal(0, 5_000_000, n)

# Clasificar por zona
zona = np.where(metros > 130, 'Zona norte', 'Zona sur')

plt.figure(figsize=(9, 6))
for z, color in [('Zona norte', '#1F4E5F'), ('Zona sur', '#D9742A')]:
    mask = zona == z
    plt.scatter(metros[mask], precio[mask] / 1_000_000,
                label=z, color=color, alpha=0.7, s=60)

plt.xlabel('Superficie (m²)')
plt.ylabel('Precio (millones FCFA)')
plt.title('Precio de inmuebles según superficie — Malabo')
plt.legend()
plt.grid(True, alpha=0.25)
plt.tight_layout()
plt.show()`,
          hint: 'Usa alpha para transparencia cuando los puntos se superponen. s controla el tamaño de los puntos.',
        }}
      >
        <p>Visualiza la relación entre superficie y precio de inmuebles, diferenciando por zona.</p>
      </Exercise>

      <h2>Histograma</h2>

      <p>
        Muestra la <strong>distribución</strong> de una variable — cuántos valores caen en cada rango.
        Esencial para detectar sesgo, outliers y si los datos siguen una distribución normal.
      </p>

      <Exercise number={3} title="Distribución de salarios"
        runner={{
          initial: `import matplotlib.pyplot as plt
import numpy as np

np.random.seed(7)
# Salarios en FCFA con distribución asimétrica (realista)
salarios_bajos  = np.random.normal(650_000, 80_000, 300)
salarios_medios = np.random.normal(1_100_000, 150_000, 150)
salarios_altos  = np.random.normal(2_500_000, 400_000, 50)
todos = np.concatenate([salarios_bajos, salarios_medios, salarios_altos])

plt.figure(figsize=(10, 5))
plt.hist(todos / 1000, bins=40, color='#1F4E5F', alpha=0.75, edgecolor='white')

# Líneas de referencia
plt.axvline(np.median(todos)/1000, color='#D9742A', linestyle='--', linewidth=2, label=f'Mediana: {np.median(todos)/1000:.0f}k')
plt.axvline(np.mean(todos)/1000,   color='#C99419', linestyle='--', linewidth=2, label=f'Media: {np.mean(todos)/1000:.0f}k')

plt.xlabel('Salario (miles FCFA)')
plt.ylabel('Frecuencia')
plt.title('Distribución de salarios')
plt.legend()
plt.tight_layout()
plt.show()`,
          hint: 'bins controla el número de barras. axvline dibuja una línea vertical en un valor X.',
        }}
      >
        <p>Visualiza la distribución de salarios y añade líneas de referencia para media y mediana.</p>
      </Exercise>

      <h2>Subplots — múltiples gráficos en uno</h2>

      <Exercise number={4} title="Panel de análisis exploratorio" difficulty="intermedio"
        runner={{
          initial: `import matplotlib.pyplot as plt
import numpy as np

np.random.seed(42)
n = 150
edad      = np.random.randint(18, 65, n)
salario   = edad * 20_000 + np.random.normal(0, 100_000, n) + 200_000
años_exp  = np.maximum(0, edad - 22 + np.random.randint(-3, 5, n))
educacion = np.random.choice(['Secundaria','Grado','Máster','Doctorado'], n,
                              p=[0.30, 0.45, 0.20, 0.05])

fig, axes = plt.subplots(2, 2, figsize=(12, 9))
fig.suptitle('Análisis exploratorio — Dataset de empleados', fontsize=14)

# 1. Distribución de edades
axes[0,0].hist(edad, bins=20, color='#1F4E5F', alpha=0.75, edgecolor='white')
axes[0,0].set_title('Distribución de edades'); axes[0,0].set_xlabel('Edad')

# 2. Salario vs edad
axes[0,1].scatter(edad, salario/1_000_000, alpha=0.5, color='#D9742A', s=25)
axes[0,1].set_title('Salario vs Edad'); axes[0,1].set_xlabel('Edad'); axes[0,1].set_ylabel('Salario (M FCFA)')

# 3. Años de experiencia vs salario
axes[1,0].scatter(años_exp, salario/1_000_000, alpha=0.5, color='#3F6B3B', s=25)
axes[1,0].set_title('Experiencia vs Salario'); axes[1,0].set_xlabel('Años exp.')

# 4. Distribución por nivel educativo
conteo = {e: (educacion == e).sum() for e in ['Secundaria','Grado','Máster','Doctorado']}
axes[1,1].bar(conteo.keys(), conteo.values(), color=['#1F4E5F','#D9742A','#C99419','#3F6B3B'])
axes[1,1].set_title('Nivel educativo')

plt.tight_layout()
plt.show()`,
          hint: 'fig, axes = plt.subplots(filas, columnas) crea una cuadrícula de gráficos. Accede a cada uno con axes[fila, columna].',
        }}
      >
        <p>Crea un panel de 4 gráficos para el análisis exploratorio completo de un dataset de empleados.</p>
      </Exercise>

      <Quiz
        question="¿Qué tipo de gráfico usarías para ver si existe una relación lineal entre dos variables numéricas?"
        options={[
          'Histograma',
          'Gráfico de barras',
          'Gráfico de dispersión (scatter)',
          'Gráfico de líneas',
        ]}
        correct={2}
        explanation="El scatter plot muestra cada par (x, y) como un punto. Si los puntos siguen una tendencia lineal, hay correlación. Es el gráfico de referencia para decidir si una regresión lineal tiene sentido."
      />

      <Quiz
        question="Al visualizar datos antes de entrenar un modelo, ¿cuál es el objetivo principal?"
        options={[
          'Hacer que los datos sean más grandes',
          'Detectar patrones, outliers y problemas antes de que el modelo los encuentre',
          'Reducir el tiempo de entrenamiento del modelo',
          'Convertir los datos de CSV a formato NumPy',
        ]}
        correct={1}
        explanation="La visualización exploratoria es una fase de diagnóstico. Te dice si los datos tienen errores, relaciones inusuales, outliers o sesgos antes de invertir tiempo en entrenar un modelo con datos de mala calidad."
      />

      <Callout kind="success" title="Módulo completado">
        Ahora puedes visualizar datos reales con cuatro tipos de gráfico esenciales en ML.
        En el siguiente módulo darás el salto más importante: construir tu primer modelo predictivo
        con regresión lineal.
      </Callout>

      <ChapterNav
        prev={prev ? { id: prev.id, title: prev.title } : null}
        next={next ? { id: next.id, title: next.title } : null}
        onNav={onNav}
      />
    </article>
  );
}

window.ChapterL1M4 = ChapterL1M4;
