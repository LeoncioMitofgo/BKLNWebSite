// =============================================================
// app.jsx — IA & ML book reader (same architecture as libro)
// =============================================================

const { useEffect: useEffectApp, useState: useStateApp, useMemo: useMemoApp } = React;

const PROGRESS_KEY = 'bkln-libro-ia-progress';
const LAST_KEY = 'bkln-libro-ia-last';

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
    if (h) return h;
    try {
      const last = localStorage.getItem(LAST_KEY);
      if (last) return last;
    } catch {}
    return defaultId;
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
  return [id, (newId) => { window.location.hash = newId; }];
}

function Sidebar({ activeId, onNav, isOpen, onClose, completed }) {
  const flat = flatTOC();
  const doneCount = flat.filter(c => completed.includes(c.id)).length;
  const pct = flat.length > 0 ? Math.round((doneCount / flat.length) * 100) : 0;

  return (
    <aside className={`sidebar ${isOpen ? 'open' : ''}`}>
      <div className="toc-brand">
        <a className="toc-brand-mark" href="#cover" onClick={(e) => { e.preventDefault(); onNav('cover'); onClose(); }}>
          IA<span className="dot">.</span> <em>con Python</em>
        </a>
        <div className="toc-brand-sub">// serie en tres libros</div>
      </div>

      <div style={{ padding: '0 var(--s-3) var(--s-4)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--ink-3)', letterSpacing: '0.06em', textTransform: 'uppercase', marginBottom: 5 }}>
          <span>Progreso</span>
          <span>{doneCount} / {flat.length}</span>
        </div>
        <div style={{ height: 3, background: 'var(--border)', borderRadius: 2, overflow: 'hidden' }}>
          <div style={{ height: '100%', width: `${pct}%`, background: 'var(--highlight)', transition: 'width 0.4s ease' }} />
        </div>
      </div>

      <ul className="toc-list" style={{ marginBottom: 'var(--s-5)' }}>
        {TOC.filter(t => t.kind === 'special').map(item => (
          <li key={item.id} className="toc-item">
            <a className={`toc-link ${activeId === item.id ? 'active' : ''}`} href={`#${item.id}`}
               onClick={(e) => { e.preventDefault(); onNav(item.id); onClose(); }}>
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
                <a className={`toc-link ${activeId === ch.id ? 'active' : ''}`} href={`#${ch.id}`}
                   onClick={(e) => { e.preventDefault(); onNav(ch.id); onClose(); }}>
                  <span className="toc-num">{ch.num}</span>
                  <span>
                    {ch.title}
                    {completed.includes(ch.id) && (
                      <span style={{ color: 'var(--highlight)', marginLeft: 5, fontSize: '0.72rem' }}>✓</span>
                    )}
                    {ch.status === 'stub' && (
                      <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.62rem', letterSpacing: '0.1em', color: 'var(--ink-3)', marginLeft: 6, textTransform: 'uppercase', opacity: 0.7 }}>· próx.</span>
                    )}
                  </span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      ))}

      <div style={{ marginTop: 'var(--s-6)', paddingTop: 'var(--s-4)', borderTop: '1px solid var(--border-soft)', fontFamily: 'var(--font-mono)', fontSize: '0.66rem', color: 'var(--ink-3)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
        // ed. 01 · 2026 — manual de aprendizaje
      </div>
    </aside>
  );
}

function StubChapter({ id, title, onNav }) {
  const flat = flatTOC();
  const idx = flat.findIndex(c => c.id === id);
  const prev = idx > 0 ? flat[idx - 1] : null;
  const next = idx < flat.length - 1 ? flat[idx + 1] : null;

  return (
    <article className="reader-inner">
      <ChapterHeader book="// próximamente" module={id} title={title}
        dek="Este capítulo está en desarrollo. El Libro 1 está completo — continúa los módulos siguientes." />
      <div style={{ padding: 'var(--s-7) var(--s-6)', background: 'var(--paper-2)', border: '1px dashed var(--border)', borderRadius: 'var(--r-lg)', textAlign: 'center', margin: 'var(--s-6) 0' }}>
        <div style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '4rem', color: 'var(--highlight)', lineHeight: 1, marginBottom: 'var(--s-3)' }}>···</div>
        <p style={{ fontFamily: 'var(--font-display)', fontSize: '1.4rem', color: 'var(--ink-2)', margin: 0, marginBottom: 'var(--s-3)' }}>En construcción.</p>
        <p style={{ color: 'var(--ink-3)', fontSize: '0.95rem', margin: 0 }}>Pídeme escribir este módulo cuando estés listo para seguir.</p>
      </div>
      <ChapterNav prev={prev ? { id: prev.id, title: prev.title } : null} next={next ? { id: next.id, title: next.title } : null} onNav={onNav} />
    </article>
  );
}

function Reader({ activeId, onNav }) {
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

  for (const book of TOC) {
    if (book.kind === 'special') continue;
    for (const ch of book.chapters) {
      if (ch.id === activeId) return <StubChapter id={activeId} title={ch.title} onNav={onNav} />;
    }
  }
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
  const [tweaks, setTweak] = window.useTweaks ? window.useTweaks(TWEAK_DEFAULTS) : [TWEAK_DEFAULTS, () => {}];

  const [completed, setCompleted] = useStateApp(() => {
    try { return JSON.parse(localStorage.getItem(PROGRESS_KEY) || '[]'); } catch { return []; }
  });

  const markDone = (id) => {
    setCompleted(prev => {
      if (prev.includes(id)) return prev;
      const next = [...prev, id];
      try { localStorage.setItem(PROGRESS_KEY, JSON.stringify(next)); } catch {}
      return next;
    });
  };

  window.__bookProgress = { completed, markDone };

  useEffectApp(() => { applyTweaks(tweaks); }, [tweaks]);
  useEffectApp(() => { setSidebarOpen(false); }, [activeId]);
  useEffectApp(() => {
    if (activeId && activeId !== 'cover') {
      try { localStorage.setItem(LAST_KEY, activeId); } catch {}
    }
  }, [activeId]);

  const progressInfo = useMemoApp(() => {
    const flat = flatTOC();
    const idx = flat.findIndex(c => c.id === activeId);
    if (idx === -1) return null;
    return { idx: idx + 1, total: flat.length };
  }, [activeId]);

  return (
    <div className="app">
      <Sidebar activeId={activeId} onNav={navTo} isOpen={sidebarOpen} onClose={() => setSidebarOpen(false)} completed={completed} />

      <main className="reader" data-screen-label={activeId}>
        <div className="mobile-bar">
          <button type="button" onClick={() => setSidebarOpen(true)} aria-label="Abrir índice">≡ Índice</button>
          <span style={{ fontFamily: 'var(--font-display)', fontStyle: 'italic', fontSize: '1.1rem' }}>
            IA<span style={{ color: 'var(--highlight)' }}>.</span> con Python
          </span>
        </div>
        <Reader activeId={activeId} onNav={navTo} />
      </main>

      {tweaks.showProgress && progressInfo && (
        <div className="progress">
          {String(progressInfo.idx).padStart(2,'0')} / {String(progressInfo.total).padStart(2,'0')}
        </div>
      )}

      {window.TweaksPanel && (
        <window.TweaksPanel title="Tweaks">
          <window.TweakSection title="Apariencia">
            <window.TweakRadio label="Tema" value={tweaks.theme}
              options={[{ value: 'light', label: 'Papel' }, { value: 'dark', label: 'Noche' }]}
              onChange={(v) => setTweak('theme', v)} />
            <window.TweakSlider label="Tamaño de texto" value={tweaks.fontSize} min={15} max={22} step={1} onChange={(v) => setTweak('fontSize', v)} />
            <window.TweakRadio label="Densidad" value={tweaks.density}
              options={[{ value: 'cozy', label: 'Compacta' }, { value: 'comfortable', label: 'Cómoda' }, { value: 'spacious', label: 'Amplia' }]}
              onChange={(v) => setTweak('density', v)} />
            <window.TweakColor label="Acento" value={tweaks.accent}
              options={['#1F4E5F', '#A8331E', '#3F6B3B', '#5B3A8E', '#1A1715']}
              onChange={(v) => setTweak('accent', v)} />
            <window.TweakToggle label="Indicador de progreso" value={tweaks.showProgress} onChange={(v) => setTweak('showProgress', v)} />
          </window.TweakSection>
        </window.TweaksPanel>
      )}
    </div>
  );
}

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<BookApp />);
