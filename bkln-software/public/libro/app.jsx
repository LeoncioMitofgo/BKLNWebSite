// =============================================================
// app.jsx — root book reader: sidebar TOC, hash-based routing,
// chapter dispatcher, tweaks panel.
// =============================================================

const { useEffect: useEffectApp, useState: useStateApp, useMemo: useMemoApp } = React;

const TWEAK_DEFAULTS = /*EDITMODE-BEGIN*/{
  "theme": "light",
  "density": "comfortable",
  "fontSize": 18,
  "accent": "#1F4E5F",
  "showProgress": true
}/*EDITMODE-END*/;

function useHashRoute(defaultId) {
  const [id, setId] = useStateApp(() => {
    const h = window.location.hash.slice(1);
    return h || defaultId;
  });
  useEffectApp(() => {
    const onHash = () => {
      const h = window.location.hash.slice(1);
      setId(h || defaultId);
      window.scrollTo({ top: 0, behavior: 'instant' });
    };
    window.addEventListener('hashchange', onHash);
    return () => window.removeEventListener('hashchange', onHash);
  }, [defaultId]);
  const nav = (newId) => {
    window.location.hash = newId;
  };
  return [id, nav];
}

function Sidebar({ activeId, onNav, isOpen, onClose }) {
  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="toc-brand">
        <a className="toc-brand-mark" href="#cover" onClick={(e) => { e.preventDefault(); onNav('cover'); onClose(); }}>
          Python<span className="dot">.</span> <em>desde cero</em>
        </a>
        <div className="toc-brand-sub">// serie en tres libros</div>
      </div>

      <ul className="toc-list" style={{ marginBottom: 'var(--s-5)' }}>
        {TOC.filter(t => t.kind === 'special').map(item => (
          <li key={item.id} className="toc-item">
            <a
              className={`toc-link ${activeId === item.id ? 'active' : ''}`}
              href={`#${item.id}`}
              onClick={(e) => { e.preventDefault(); onNav(item.id); onClose(); }}
            >
              <span className="toc-num">→</span>
              <span className="toc-special">{item.label}</span>
            </a>
          </li>
        ))}
      </ul>

      {TOC.filter(t => !t.kind).map(book => (
        <div key={book.bookId} className="toc-book">
          <div className="toc-book-head">
            <span className="toc-book-num">{book.bookNum}</span>
            <span className="toc-book-title">{book.bookTitle.split(' — ')[0]}</span>
          </div>
          <ul className="toc-list">
            {book.chapters.map(ch => (
              <li key={ch.id} className="toc-item">
                <a
                  className={`toc-link ${activeId === ch.id ? 'active' : ''}`}
                  href={`#${ch.id}`}
                  onClick={(e) => { e.preventDefault(); onNav(ch.id); onClose(); }}
                >
                  <span className="toc-num">{ch.num}</span>
                  <span>
                    {ch.title}
                    {ch.status === 'stub' && (
                      <span style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.62rem',
                        letterSpacing: '0.1em',
                        color: 'var(--ink-3)',
                        marginLeft: 6,
                        textTransform: 'uppercase',
                        opacity: 0.7,
                      }}>· borrador</span>
                    )}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}

      <div style={{
        marginTop: 'var(--s-6)',
        paddingTop: 'var(--s-4)',
        borderTop: '1px solid var(--border-soft)',
        fontFamily: 'var(--font-mono)',
        fontSize: '0.66rem',
        color: 'var(--ink-3)',
        letterSpacing: '0.08em',
        textTransform: 'uppercase',
      }}>
        // ed. 01 · 2026 — manual de aprendizaje
      </div>
    </aside>
  );
}

function StubChapter({ id, title, onNav }) {
  // Find prev/next from flat TOC
  const flat = flatTOC();
  const idx = flat.findIndex(c => c.id === id);
  const prev = idx > 0 ? flat[idx - 1] : null;
  const next = idx < flat.length - 1 ? flat[idx + 1] : null;

  return (
    <article className="reader-inner">
      <ChapterHeader
        book="// próximamente"
        module={id}
        title={title}
        dek="Este capítulo está en desarrollo. La estructura del libro ya está lista — el contenido completo llegará en próximas iteraciones."
      />

      <div style={{
        padding: 'var(--s-7) var(--s-6)',
        background: 'var(--paper-2)',
        border: '1px dashed var(--border)',
        borderRadius: 'var(--r-lg)',
        textAlign: 'center',
        margin: 'var(--s-6) 0',
      }}>
        <div style={{
          fontFamily: 'var(--font-display)',
          fontStyle: 'italic',
          fontSize: '4rem',
          color: 'var(--highlight)',
          lineHeight: 1,
          marginBottom: 'var(--s-3)',
        }}>···</div>
        <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--ink-2)', margin: 0, marginBottom: 'var(--s-3)' }}>
          En construcción.
        </p>
        <p style={{ color: 'var(--ink-3)', fontSize: '0.95rem', margin: 0 }}>
          Pídeme escribir este módulo cuando estés listo para seguir.
        </p>
      </div>

      <ChapterNav
        prev={prev ? { id: prev.id, title: prev.title } : null}
        next={next ? { id: next.id, title: next.title } : null}
        onNav={onNav}
      />
    </article>
  );
}

function Reader({ activeId, onNav }) {
  // Cover
  if (activeId === 'cover') return <CoverPage onNav={onNav} />;
  if (activeId === 'intro') return <IntroPage onNav={onNav} />;
  if (activeId === 'l1-m1') return <ChapterL1M1 onNav={onNav} />;
  if (activeId === 'l1-m2') return <ChapterL1M2 onNav={onNav} />;
  if (activeId === 'l1-m3') return <ChapterL1M3 onNav={onNav} />;
  if (activeId === 'l1-m4') return <ChapterL1M4 onNav={onNav} />;
  if (activeId === 'l1-m5') return <ChapterL1M5 onNav={onNav} />;
  if (activeId === 'l1-m6') return <ChapterL1M6 onNav={onNav} />;
  if (activeId === 'l1-m7') return <ChapterL1M7 onNav={onNav} />;
  if (activeId === 'l1-m8') return <ChapterL1M8 onNav={onNav} />;
  if (activeId === 'l2-m1') return <ChapterL2M1 onNav={onNav} />;
  if (activeId === 'l2-m2') return <ChapterL2M2 onNav={onNav} />;
  if (activeId === 'l2-m3') return <ChapterL2M3 onNav={onNav} />;
  if (activeId === 'l2-m4') return <ChapterL2M4 onNav={onNav} />;
  if (activeId === 'l2-m5') return <ChapterL2M5 onNav={onNav} />;
  if (activeId === 'l2-m6') return <ChapterL2M6 onNav={onNav} />;
  if (activeId === 'l2-m7') return <ChapterL2M7 onNav={onNav} />;
  if (activeId === 'l2-m8') return <ChapterL2M8 onNav={onNav} />;
  if (activeId === 'l3-m1') return <ChapterL3M1 onNav={onNav} />;
  if (activeId === 'l3-m2') return <ChapterL3M2 onNav={onNav} />;
  if (activeId === 'l3-m3') return <ChapterL3M3 onNav={onNav} />;
  if (activeId === 'l3-m4') return <ChapterL3M4 onNav={onNav} />;
  if (activeId === 'l3-m5') return <ChapterL3M5 onNav={onNav} />;
  if (activeId === 'l3-m6') return <ChapterL3M6 onNav={onNav} />;
  if (activeId === 'l3-m7') return <ChapterL3M7 onNav={onNav} />;

  // Stub for everything else — find the chapter title from TOC
  for (const book of TOC) {
    if (book.kind === 'special') continue;
    for (const ch of book.chapters) {
      if (ch.id === activeId) {
        return <StubChapter id={activeId} title={ch.title} onNav={onNav} />;
      }
    }
  }
  // fallback
  return <CoverPage onNav={onNav} />;
}

function applyTweaks(t) {
  const root = document.documentElement;
  root.setAttribute('data-theme', t.theme);
  root.style.setProperty('--base-size', `${t.fontSize}px`);
  root.style.setProperty('--measure', t.density === 'cozy' ? '60ch' : t.density === 'spacious' ? '76ch' : '68ch');
  if (t.accent) root.style.setProperty('--accent', t.accent);
}

function BookApp() {
  const [activeId, navTo] = useHashRoute('cover');
  const [sidebarOpen, setSidebarOpen] = useStateApp(false);
  const [tweaks, setTweak] = window.useTweaks
    ? window.useTweaks(TWEAK_DEFAULTS)
    : [TWEAK_DEFAULTS, () => {}];

  useEffectApp(() => { applyTweaks(tweaks); }, [tweaks]);

  // close sidebar on route change (mobile)
  useEffectApp(() => { setSidebarOpen(false); }, [activeId]);

  // Find progress label
  const progressInfo = useMemoApp(() => {
    const flat = flatTOC();
    const idx = flat.findIndex(c => c.id === activeId);
    if (idx === -1) return null;
    return { idx: idx + 1, total: flat.length };
  }, [activeId]);

  return (
    <div className="app">
      <Sidebar
        activeId={activeId}
        onNav={navTo}
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />

      <main className="reader" data-screen-label={activeId}>
        <div className="mobile-bar">
          <button onClick={() => setSidebarOpen(true)} aria-label="Abrir índice">≡ Índice</button>
          <span style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '1.1rem' }}>
            Python<span style={{ color: 'var(--highlight)' }}>.</span> desde cero
          </span>
        </div>

        <Reader activeId={activeId} onNav={navTo} />
      </main>

      {tweaks.showProgress && progressInfo && (
        <div className="progress">
          {String(progressInfo.idx).padStart(2,'0')} / {String(progressInfo.total).padStart(2,'0')}
        </div>
      )}

      {/* Tweaks panel — rendered when host activates it */}
      {window.TweaksPanel && (
        <window.TweaksPanel title="Tweaks">
          <window.TweakSection title="Apariencia">
            <window.TweakRadio
              label="Tema"
              value={tweaks.theme}
              options={[
                { value: 'light', label: 'Papel' },
                { value: 'dark', label: 'Noche' },
              ]}
              onChange={(v) => setTweak('theme', v)}
            />
            <window.TweakSlider
              label="Tamaño de texto"
              value={tweaks.fontSize}
              min={15} max={22} step={1}
              onChange={(v) => setTweak('fontSize', v)}
            />
            <window.TweakRadio
              label="Densidad"
              value={tweaks.density}
              options={[
                { value: 'cozy', label: 'Compacta' },
                { value: 'comfortable', label: 'Cómoda' },
                { value: 'spacious', label: 'Amplia' },
              ]}
              onChange={(v) => setTweak('density', v)}
            />
            <window.TweakColor
              label="Acento"
              value={tweaks.accent}
              options={['#1F4E5F', '#A8331E', '#3F6B3B', '#5B3A8E', '#1A1715']}
              onChange={(v) => setTweak('accent', v)}
            />
            <window.TweakToggle
              label="Indicador de progreso"
              value={tweaks.showProgress}
              onChange={(v) => setTweak('showProgress', v)}
            />
          </window.TweakSection>
        </window.TweaksPanel>
      )}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<BookApp />);
