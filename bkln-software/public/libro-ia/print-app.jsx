// =============================================================
// print-app.jsx — Renderiza los 3 libros completos para PDF
// Cargado por print.html (window.__PRINT_MODE = true ya activado)
// =============================================================

// StubChapter para print — capítulos del Libro III aún en desarrollo
function StubChapter({ id, title }) {
  const flat = flatTOC();
  const idx = flat.findIndex(c => c.id === id);
  return (
    <article className="reader-inner">
      <ChapterHeader
        book="// próximamente"
        module={id}
        title={title}
        dek="Este capítulo estará disponible en la siguiente edición del libro."
      />
      <div className="print-stub">
        // en desarrollo · próxima edición
      </div>
    </article>
  );
}
window.StubChapter = StubChapter;

// Portada con tabla de contenidos
function PrintCover() {
  const books = TOC.filter(t => !t.kind);
  return (
    <div className="print-cover">
      <div className="print-cover-tag">// BKLN Software &amp; Systems · Serie de aprendizaje</div>
      <h1>IA y Machine Learning<br /><em>con Python.</em></h1>
      <div className="print-cover-sub">// serie en tres libros · ed. 01 · 2026</div>

      <div className="print-cover-toc">
        {books.map(book => (
          <div key={book.bookId} className="print-cover-toc-book">
            <div className="print-cover-toc-book-label">
              Libro {book.bookNum} — {book.bookTitle.split(' — ')[0]}
            </div>
            {book.chapters.map(ch => (
              <div key={ch.id} className="print-cover-toc-chapter">
                <span>{ch.num}. {ch.title}</span>
                <span>{ch.time}</span>
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="print-cover-footer">
        <span>hello@bklnsoftware.com · bklnsoftware.tech</span>
        <span>+240 222 798 086</span>
        <span>Malabo · Guinea Ecuatorial</span>
      </div>
    </div>
  );
}

// Nota al lector
function PrintNota() {
  return (
    <div className="print-nota">
      <ChapterHeader
        book="// antes de empezar"
        title="Nota al lector"
        dek="Cómo aprovechar este libro en su versión impresa."
      />
      <p>
        Este libro fue diseñado como una experiencia interactiva en web: los ejercicios incluyen
        un entorno de ejecución de Python en el navegador, los quizzes son interactivos y el
        progreso se guarda automáticamente.
      </p>
      <p>
        En esta versión PDF encontrarás el contenido completo — explicaciones, código de todos
        los ejercicios y las respuestas correctas de cada quiz — listo para leer offline en
        cualquier dispositivo.
      </p>
      <p>
        Para la experiencia completa con código ejecutable, visita:
        <strong> bklnsoftware.tech/cursos</strong>
      </p>
      <p style={{fontFamily: 'var(--font-mono)', fontSize: '0.82rem', color: 'var(--ink-3)'}}>
        // versión web: bklnsoftware.tech · contacto: hello@bklnsoftware.com · +240 222 798 086
      </p>
    </div>
  );
}

// Divisor entre libros
function PrintBookDivider({ roman, title, subtitle, chapters }) {
  return (
    <div className="print-book-divider">
      <div className="print-book-divider-roman">{roman}</div>
      <h2>{title}</h2>
      <p>{subtitle}</p>
      <div className="print-book-divider-chapters">
        {chapters.map(ch => (
          <div key={ch.id}>{ch.num}. {ch.title} · {ch.time}</div>
        ))}
      </div>
    </div>
  );
}

function PrintApp() {
  const noop = () => {};
  const books = TOC.filter(t => !t.kind);
  const [b1, b2, b3] = books;

  return (
    <div className="print-book">
      <PrintCover />
      <PrintNota />

      <PrintBookDivider
        roman="i"
        title="Fundamentos"
        subtitle="Datos, NumPy, Pandas y tus primeros modelos"
        chapters={b1.chapters}
      />
      <ChapterL1M1 onNav={noop} />
      <ChapterL1M2 onNav={noop} />
      <ChapterL1M3 onNav={noop} />
      <ChapterL1M4 onNav={noop} />
      <ChapterL1M5 onNav={noop} />
      <ChapterL1M6 onNav={noop} />
      <ChapterL1M7 onNav={noop} />
      <ChapterL1M8 onNav={noop} />

      <PrintBookDivider
        roman="ii"
        title="Técnicas Avanzadas"
        subtitle="ML con profundidad, proyectos reales y pipelines"
        chapters={b2.chapters}
      />
      <ChapterL2M1 onNav={noop} />
      <ChapterL2M2 onNav={noop} />
      <ChapterL2M3 onNav={noop} />
      <ChapterL2M4 onNav={noop} />
      <ChapterL2M5 onNav={noop} />
      <ChapterL2M6 onNav={noop} />
      <ChapterL2M7 onNav={noop} />
      <ChapterL2M8 onNav={noop} />

      <PrintBookDivider
        roman="iii"
        title="Deep Learning"
        subtitle="Redes neuronales, transformers e IA generativa"
        chapters={b3.chapters}
      />
      <ChapterL3M1 onNav={noop} />
      <ChapterL3M2 onNav={noop} />
      <ChapterL3M3 onNav={noop} />
      <ChapterL3M4 onNav={noop} />
      <ChapterL3M5 onNav={noop} />
      <ChapterL3M6 onNav={noop} />
      <ChapterL3M7 onNav={noop} />
      <ChapterL3M8 onNav={noop} />
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<PrintApp />);
window.__PRINT_READY = true;
