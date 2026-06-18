// =============================================================
// pages-special.jsx — Cover and Intro for IA & ML book
// =============================================================

function CoverPage({ onNav }) {
  return (
    <div className="cover">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', paddingTop: 'var(--s-3)' }}>
        <span className="eyebrow eyebrow-accent">// edición uno · 2026</span>
        <span className="eyebrow">3 libros · 24 módulos · Python en el navegador</span>
      </div>

      <div className="cover-grid">
        <div>
          <p className="eyebrow" style={{ marginBottom: 'var(--s-3)' }}>una serie en tres libros</p>
          <h1 style={{ fontFamily: 'var(--font-display)', fontSize: 'clamp(3.2rem, 10vw, 8rem)', lineHeight: 0.92, letterSpacing: '-0.04em', fontWeight: 500, margin: 0, marginBottom: 'var(--s-4)' }}>
            IA<br />
            <em style={{ color: 'var(--highlight)' }}>con</em><br />
            Python<span style={{ color: 'var(--highlight)' }}>.</span>
          </h1>
          <p style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: 'clamp(1.3rem, 2vw, 1.75rem)', lineHeight: 1.35, color: 'var(--ink-2)', maxWidth: '28ch', margin: 0, marginBottom: 'var(--s-6)' }}>
            De los datos crudos a los modelos que toman decisiones reales.
          </p>
          <div style={{ display: 'flex', gap: 'var(--s-3)', flexWrap: 'wrap', marginTop: 'var(--s-5)' }}>
            <a className="btn btn-primary" href="#intro" onClick={(e) => { e.preventDefault(); onNav('intro'); }}>Empezar a leer →</a>
            <a className="btn btn-ghost" href="#l1-m1" onClick={(e) => { e.preventDefault(); onNav('l1-m1'); }}>Saltar al Módulo 1</a>
          </div>
        </div>

        <CoverMotif />
      </div>

      <div style={{ borderTop: '1px solid var(--border-soft)', paddingTop: 'var(--s-5)', marginTop: 'var(--s-7)', display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'var(--s-5)' }} className="cover-books">
        <CoverBookCard num="i" title="Fundamentos"
          subtitle="NumPy · Pandas · Matplotlib · sklearn"
          desc="Manipulación de datos, visualización y tus primeros modelos: regresión, clasificación y evaluación."
          onNav={() => onNav('l1-m1')} />
        <CoverBookCard num="ii" title="Intermedio"
          subtitle="Preprocesamiento · SVM · Clustering · PCA"
          desc="Técnicas avanzadas de ML, pipelines automáticos y un proyecto de sistema de recomendación."
          onNav={() => onNav('l2-m1')} />
        <CoverBookCard num="iii" title="Deep Learning"
          subtitle="Redes neuronales · CNN · Transformers · LLMs"
          desc="Arquitecturas profundas, fine-tuning de modelos de lenguaje y construcción de agentes inteligentes."
          onNav={() => onNav('l3-m1')} />
      </div>

      <div style={{ marginTop: 'var(--s-6)', paddingTop: 'var(--s-4)', borderTop: '1px solid var(--border-soft)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 'var(--s-3)' }}>
        <span className="eyebrow">// para programadores Python con bases · ejecuta código real en el navegador</span>
        <span className="eyebrow" style={{ textAlign: 'center' }}>
          Leoncio Felipe Mitogo · <span style={{ color: 'var(--highlight)' }}>BKLN Software &amp; Systems</span>
        </span>
        <span className="eyebrow">manual de aprendizaje · ed. 01</span>
      </div>

      <style>{`@media (max-width: 800px) { .cover-books { grid-template-columns: 1fr !important; } }`}</style>
    </div>
  );
}

function CoverBookCard({ num, title, subtitle, desc, onNav }) {
  return (
    <a href="#" onClick={(e) => { e.preventDefault(); onNav(); }}
       style={{ display: 'block', padding: 'var(--s-4) var(--s-5) var(--s-5)', border: '1px solid var(--border-soft)', borderRadius: 'var(--r-md)', textDecoration: 'none', color: 'var(--ink)', transition: 'all var(--t-base)', background: 'var(--paper-2)' }}
       onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--highlight)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
       onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-soft)'; e.currentTarget.style.transform = 'none'; }}
    >
      <div style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '2.2rem', color: 'var(--highlight)', lineHeight: 1, marginBottom: 'var(--s-3)' }}>{num}</div>
      <div className="eyebrow" style={{ marginBottom: 4 }}>{subtitle}</div>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 500, letterSpacing: '-0.015em', marginBottom: 'var(--s-2)' }}>{title}</div>
      <p style={{ fontSize: '0.92rem', color: 'var(--ink-2)', margin: 0, lineHeight: 1.5 }}>{desc}</p>
    </a>
  );
}

function CoverMotif() {
  return (
    <div style={{ background: 'var(--code-bg)', borderRadius: 'var(--r-lg)', padding: '22px 26px', fontFamily: 'var(--font-mono)', fontSize: '0.88rem', lineHeight: 1.65, color: 'var(--code-fg)', border: '1px solid rgba(255,255,255,0.06)', transform: 'rotate(-1.4deg)', boxShadow: '0 30px 60px -20px rgba(0,0,0,0.4), 0 12px 24px -10px rgba(0,0,0,0.25)' }}>
      <div style={{ display: 'flex', gap: 6, marginBottom: 18 }}>
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#E36414', opacity: 0.7 }}></span>
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#C99419', opacity: 0.7 }}></span>
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#3F6B3B', opacity: 0.7 }}></span>
      </div>
      <div><span className="tok-keyword">import</span> <span className="tok-builtin">numpy</span> <span className="tok-keyword">as</span> np</div>
      <div><span className="tok-keyword">from</span> sklearn.linear_model <span className="tok-keyword">import</span> LinearRegression</div>
      <div style={{ marginTop: 8 }}><span className="tok-comment"># entrenar un modelo</span></div>
      <div>modelo <span className="tok-op">=</span> <span className="tok-func">LinearRegression</span>()</div>
      <div>modelo.<span className="tok-func">fit</span>(X_train, y_train)</div>
      <div style={{ marginTop: 8 }}><span className="tok-comment"># predecir nuevos datos</span></div>
      <div>y_pred <span className="tok-op">=</span> modelo.<span className="tok-func">predict</span>(X_test)</div>
      <div style={{ color: 'var(--code-comment)', marginTop: 8 }}>score: 0.94 ← ¡94% de precisión!</div>
      <div style={{ marginTop: 8 }}><span style={{ display: 'inline-block', width: 8, height: 16, background: 'var(--code-fg)', verticalAlign: 'text-bottom', animation: 'blink 1.1s steps(1) infinite' }}></span></div>
      <style>{`@keyframes blink { 50% { opacity: 0; } }`}</style>
    </div>
  );
}

/* ============================================================= */

function IntroPage({ onNav }) {
  return (
    <article className="reader-inner">
      <ChapterHeader
        book="// cómo leer"
        module="prólogo"
        time="8 min de lectura"
        title={<>Cómo usar este libro<span style={{color:'var(--highlight)'}}>.</span></>}
        dek="Una guía práctica antes de entrenar tu primer modelo."
      />

      <p>
        Este libro está pensado para alguien que <strong>ya sabe lo básico de Python</strong> — variables,
        bucles, funciones — y quiere dar el salto al mundo de la inteligencia artificial y el machine learning.
        No necesitas matemáticas avanzadas para empezar. La intuición viene primero; las fórmulas llegan después.
      </p>

      <p>
        El libro está dividido en <strong>tres libros</strong>: el primero te da las herramientas del ecosistema
        científico de Python (NumPy, Pandas, Matplotlib) y te lleva a construir y evaluar tus primeros modelos.
        El segundo profundiza en algoritmos más avanzados. El tercero entra en redes neuronales, transformers y
        los modelos de lenguaje que están cambiando el mundo.
      </p>

      <h2>Lo que diferencia este libro</h2>

      <p>
        Todo el código de este libro <strong>se ejecuta en tu navegador</strong>. No necesitas instalar Python,
        crear entornos virtuales ni configurar nada. Los ejercicios incluyen un editor integrado con
        NumPy, Pandas, Matplotlib y scikit-learn ya disponibles. Escribe código real, ve resultados reales —
        incluidos gráficos — sin salir de la página.
      </p>

      <Callout kind="warn" title="Primera ejecución">
        La primera vez que pulses <strong>Ejecutar</strong> en cualquier ejercicio, el navegador descarga
        el intérprete Python y las librerías científicas (~50 MB). Tarda entre 30 y 90 segundos según
        tu conexión. A partir de ahí, todo es instantáneo.
      </Callout>

      <h2>Los elementos del libro</h2>

      <Callout kind="info" title="Nota">
        Aclaraciones o detalles que vale la pena conocer pero que no son bloqueantes para seguir.
      </Callout>

      <Callout kind="warn" title="¡Cuidado!">
        Errores comunes o conceptos que confunden a muchos principiantes en IA/ML. Léelos con atención.
      </Callout>

      <Callout kind="tip" title="Truco">
        Buenas prácticas del mundo profesional que puedes adoptar desde el principio.
      </Callout>

      <Callout kind="success" title="Bien hecho">
        Aparece al final de secciones importantes. Para un momento y asimila lo que acabas de aprender.
      </Callout>

      <h2>Requisitos previos</h2>

      <p>Para sacar el máximo de este libro necesitas:</p>
      <ul>
        <li>Conocer los tipos básicos de Python: <code>list</code>, <code>dict</code>, <code>int</code>, <code>str</code></li>
        <li>Entender bucles <code>for</code>, funciones <code>def</code> y condicionales <code>if</code></li>
        <li>No tienes que saber álgebra lineal ni estadística — los conceptos se explican cuando se necesitan</li>
      </ul>

      <PullQuote>
        Machine learning no es magia. Es matemática aplicada más buenas decisiones sobre los datos.
        Y se aprende construyendo, no solo leyendo.
      </PullQuote>

      <p style={{ marginTop: 'var(--s-6)' }}>
        <em>¿Listo? El primer módulo te espera.</em>
      </p>

      <ChapterNav
        prev={{ id: 'cover', title: 'Portada' }}
        next={{ id: 'l1-m1', title: '¿Qué es la IA?' }}
        onNav={onNav}
      />
    </article>
  );
}

window.CoverPage = CoverPage;
window.IntroPage = IntroPage;
