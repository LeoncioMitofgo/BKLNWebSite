// =============================================================
// pages-special.jsx — Cover and Intro pages
// =============================================================

function CoverPage({ onNav }) {
  return (
    <div className="cover">
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', paddingTop: 'var(--s-3)' }}>
        <span className="eyebrow eyebrow-accent">// edición uno · 2026</span>
        <span className="eyebrow">3 libros · 24 módulos</span>
      </div>

      <div className="cover-grid">
        <div>
          <p className="eyebrow" style={{ marginBottom: 'var(--s-3)' }}>una serie en tres libros</p>
          <h1 style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(4rem, 11vw, 9rem)',
            lineHeight: 0.92,
            letterSpacing: '-0.04em',
            fontWeight: 500,
            margin: 0,
            marginBottom: 'var(--s-4)',
          }}>
            Python<br />
            <em style={{ color: 'var(--highlight)' }}>desde</em><br />
            cero<span style={{ color: 'var(--highlight)' }}>.</span>
          </h1>
          <p style={{
            fontFamily: 'var(--font-display)',
            fontStyle: 'italic',
            fontSize: 'clamp(1.4rem, 2vw, 1.85rem)',
            lineHeight: 1.3,
            color: 'var(--ink-2)',
            maxWidth: '24ch',
            margin: 0,
            marginBottom: 'var(--s-6)',
          }}>
            Aprende a programar de la idea a tu primera app en la nube.
          </p>

          <div style={{ display: 'flex', gap: 'var(--s-3)', flexWrap: 'wrap', marginTop: 'var(--s-5)' }}>
            <a className="btn btn-primary" href="#intro" onClick={(e) => { e.preventDefault(); onNav('intro'); }}>
              Empezar a leer →
            </a>
            <a className="btn btn-ghost" href="#l1-m1" onClick={(e) => { e.preventDefault(); onNav('l1-m1'); }}>
              Saltar al Módulo 1
            </a>
          </div>
        </div>

        {/* Motif — stacked book spines / REPL prompt */}
        <CoverMotif />
      </div>

      {/* footer strip — table of contents preview */}
      <div style={{
        borderTop: '1px solid var(--border-soft)',
        paddingTop: 'var(--s-5)',
        marginTop: 'var(--s-7)',
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 'var(--s-5)',
      }} className="cover-books">
        <CoverBookCard
          num="i"
          title="Básico"
          subtitle="Primeros pasos en programación"
          desc="Variables, condicionales, bucles, funciones y tu primer mini-juego."
          onNav={() => onNav('l1-m1')}
        />
        <CoverBookCard
          num="ii"
          title="Intermedio"
          subtitle="Programando con estructura"
          desc="POO, errores, archivos, módulos y comprensiones."
          onNav={() => onNav('l2-m1')}
        />
        <CoverBookCard
          num="iii"
          title="Avanzado"
          subtitle="Del código al mundo real"
          desc="Web con Flask, bases de datos, APIs, análisis de datos y despliegue."
          onNav={() => onNav('l3-m1')}
        />
      </div>

      <div style={{
        marginTop: 'var(--s-6)',
        paddingTop: 'var(--s-4)',
        borderTop: '1px solid var(--border-soft)',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: 'var(--s-3)',
      }}>
        <span className="eyebrow">// para jóvenes y adultos · principiantes absolutos · español</span>
        <span className="eyebrow" style={{ textAlign: 'center' }}>
          Leoncio Felipe Mitogo · <span style={{ color: 'var(--highlight)' }}>BKLN Software &amp; Systems</span>
        </span>
        <span className="eyebrow">manual de aprendizaje · ed. 01</span>
      </div>

      <style>{`
        @media (max-width: 800px) {
          .cover-books { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
}

function CoverBookCard({ num, title, subtitle, desc, onNav }) {
  return (
    <a href="#"
       onClick={(e) => { e.preventDefault(); onNav(); }}
       style={{
         display: 'block',
         padding: 'var(--s-4) var(--s-5) var(--s-5)',
         border: '1px solid var(--border-soft)',
         borderRadius: 'var(--r-md)',
         textDecoration: 'none',
         color: 'var(--ink)',
         transition: 'all var(--t-base)',
         background: 'var(--paper-2)',
       }}
       onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--highlight)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
       onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--border-soft)'; e.currentTarget.style.transform = 'none'; }}
    >
      <div style={{
        fontFamily: 'var(--font-display)',
        fontStyle: 'italic',
        fontSize: '2.2rem',
        color: 'var(--highlight)',
        lineHeight: 1,
        marginBottom: 'var(--s-3)',
      }}>{num}</div>
      <div className="eyebrow" style={{ marginBottom: 4 }}>{subtitle}</div>
      <div style={{ fontFamily: 'var(--font-display)', fontSize: '1.6rem', fontWeight: 500, letterSpacing: '-0.015em', marginBottom: 'var(--s-2)' }}>{title}</div>
      <p style={{ fontSize: '0.92rem', color: 'var(--ink-2)', margin: 0, lineHeight: 1.5 }}>{desc}</p>
    </a>
  );
}

function CoverMotif() {
  // Stacked REPL-style screen — visual signature of the book
  return (
    <div style={{
      background: 'var(--code-bg)',
      borderRadius: 'var(--r-lg)',
      padding: '22px 26px',
      fontFamily: 'var(--font-mono)',
      fontSize: '0.95rem',
      lineHeight: 1.65,
      color: 'var(--code-fg)',
      border: '1px solid rgba(255,255,255,0.06)',
      transform: 'rotate(-1.4deg)',
      boxShadow: '0 30px 60px -20px rgba(0,0,0,0.4), 0 12px 24px -10px rgba(0,0,0,0.25)',
      position: 'relative',
    }}>
      {/* fake traffic lights */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 18 }}>
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#E36414', opacity: 0.7 }}></span>
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#C99419', opacity: 0.7 }}></span>
        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#3F6B3B', opacity: 0.7 }}></span>
      </div>

      <div><span className="tok-prompt">&gt;&gt;&gt; </span><span className="tok-builtin">print</span>(<span className="tok-string">"Hola, mundo"</span>)</div>
      <div style={{ color: 'var(--code-comment)' }}>Hola, mundo</div>
      <div style={{ marginTop: 8 }}><span className="tok-prompt">&gt;&gt;&gt; </span><span className="tok-keyword">for</span> i <span className="tok-keyword">in</span> <span className="tok-builtin">range</span>(<span className="tok-number">3</span>):</div>
      <div><span className="tok-prompt">... </span>    <span className="tok-builtin">print</span>(<span className="tok-string">"código → arte"</span>)</div>
      <div style={{ color: 'var(--code-comment)' }}>código → arte</div>
      <div style={{ color: 'var(--code-comment)' }}>código → arte</div>
      <div style={{ color: 'var(--code-comment)' }}>código → arte</div>
      <div style={{ marginTop: 8 }}><span className="tok-prompt">&gt;&gt;&gt; </span><span style={{
        display: 'inline-block', width: 8, height: 16, background: 'var(--code-fg)',
        verticalAlign: 'text-bottom', animation: 'blink 1.1s steps(1) infinite',
      }}></span></div>

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
        time="5 min de lectura"
        title={<>Cómo usar este libro<span style={{color:'var(--highlight)'}}>.</span></>}
        dek="Una guía de bienvenida antes de escribir tu primera línea de código."
      />

      <p>
        Este libro está pensado para alguien que <strong>nunca ha programado</strong>. Si ese eres tú, estás
        exactamente en el lugar correcto. No necesitas matemáticas avanzadas, ni saber inglés, ni tener
        una computadora cara. Solo necesitas curiosidad y una hora al día.
      </p>

      <p>
        La serie está dividida en <strong>tres libros</strong>: el primero te enseña los fundamentos del
        lenguaje, el segundo te muestra cómo organizar programas grandes y el tercero te lleva a construir
        aplicaciones reales que viven en internet. Avanza a tu ritmo. No hay prisa.
      </p>

      <h2>El ritmo del libro</h2>

      <p>Cada módulo sigue la misma estructura. Una vez que la conozcas, sabrás siempre qué viene después:</p>

      <ol>
        <li><strong>Una explicación corta.</strong> En lenguaje sencillo, con analogías de la vida diaria.</li>
        <li><strong>Ejemplos de código.</strong> Cortos, comentados, fáciles de copiar y probar.</li>
        <li><strong>Quizzes rápidos.</strong> Para verificar que el concepto se entendió antes de seguir.</li>
        <li><strong>Ejercicios al final.</strong> Para programar tú, no solo leer.</li>
        <li><strong>Un resumen.</strong> Una tarjeta de repaso con todo lo importante del módulo.</li>
      </ol>

      <h2>Los elementos del libro</h2>

      <p>Por todo el libro vas a encontrar cuatro tipos de cajas. Cada una te dice algo distinto:</p>

      <Callout kind="info" title="Nota">
        Las <strong>notas</strong> son aclaraciones o detalles que vale la pena recordar, pero
        que no son obligatorios para seguir adelante.
      </Callout>

      <Callout kind="warn" title="¡Cuidado!">
        Los <strong>avisos</strong> marcan errores comunes que muchas personas cometen.
        Léelos con atención: te van a ahorrar horas de frustración.
      </Callout>

      <Callout kind="tip" title="Truco">
        Los <strong>trucos</strong> son atajos o buenas prácticas que solo conocen quienes ya
        tienen experiencia. Adoptarlos desde el principio te va a hacer ver como una persona experta.
      </Callout>

      <Callout kind="success" title="Bien hecho">
        Los <strong>logros</strong> aparecen al final de cada sección importante.
        Si llegas a uno, párate un momento, respira, y celebra. Programar también es eso.
      </Callout>

      <h2>El código que ves en el libro</h2>

      <p>Los bloques de código tienen este aspecto:</p>

      <CodeBlock code={`# Esto es código de Python.
# Las líneas que empiezan con # son comentarios:
# Python las ignora, son notas para humanos.

nombre = "Ana"
print("Hola,", nombre)`} />

      <p>
        Puedes copiar cualquier bloque con el botón <code>copiar</code> en la esquina superior.
        Te recomiendo que <strong>no copies todo</strong>: escribe los ejemplos a mano la primera vez.
        Tu cerebro aprende muchísimo más cuando tus dedos teclean los símbolos uno a uno.
      </p>

      <h2>Los ejercicios son ejecutables</h2>

      <p>
        Al final de cada módulo encontrarás ejercicios con un editor de código integrado. Puedes
        escribir tu solución directamente en el navegador y presionar <strong>Ejecutar</strong> para ver
        si funciona. No necesitas instalar nada para empezar.
      </p>

      <Callout kind="tip" title="Antes del Libro 3">
        Para los proyectos avanzados (web, bases de datos) necesitarás instalar Python en tu
        computadora. Te enseñaremos cómo hacerlo en el <strong>Módulo 1</strong>. Es más fácil de lo que parece.
      </Callout>

      <PullQuote>
        El secreto de aprender a programar no es la inteligencia. Es la <em>constancia</em>:
        un poco cada día, sin saltarse los ejercicios.
      </PullQuote>

      <h2>Una promesa</h2>

      <p>
        Si terminas los tres libros, vas a poder construir cosas reales: una página web, un
        análisis de datos, un bot que automatice tareas aburridas. No serás "programador profesional"
        todavía, pero tendrás la base sólida para llegar ahí. El resto es práctica.
      </p>

      <p style={{ marginTop: 'var(--s-6)' }}>
        <em>¿Listo? Pasa la página.</em>
      </p>

      <ChapterNav
        prev={{ id: 'cover', title: 'Portada' }}
        next={{ id: 'l1-m1', title: '¿Qué es programar?' }}
        onNav={onNav}
      />
    </article>
  );
}

window.CoverPage = CoverPage;
window.IntroPage = IntroPage;
