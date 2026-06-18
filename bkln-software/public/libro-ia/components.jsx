// =============================================================
// components.jsx — IA & ML book components
// Same design as Python book + matplotlib plot rendering,
// DataTable, and ML-aware PyRunner with package loading.
// =============================================================

const { useState, useEffect, useRef, useCallback } = React;

/* ---------- Tiny Python syntax highlighter (same as libro) ---------- */
const PY_KEYWORDS = new Set([
  'False','None','True','and','as','assert','async','await','break',
  'class','continue','def','del','elif','else','except','finally',
  'for','from','global','if','import','in','is','lambda','nonlocal',
  'not','or','pass','raise','return','try','while','with','yield','match','case'
]);
const PY_BUILTINS = new Set([
  'print','input','len','range','int','float','str','bool','list','tuple',
  'dict','set','type','abs','min','max','sum','sorted','reversed','enumerate',
  'zip','map','filter','open','round','isinstance','format','help','dir','id'
]);

function highlightPython(source) {
  const out = [];
  let i = 0;
  const push = (cls, text) => out.push({ cls, text });

  while (i < source.length) {
    const c = source[i];
    const rest = source.slice(i);

    if ((c === '>' && source.slice(i, i+4) === '>>> ') ||
        (c === '.' && source.slice(i, i+4) === '... ')) {
      push('prompt', source.slice(i, i+4)); i += 4; continue;
    }
    if (c === '#') {
      const nl = source.indexOf('\n', i);
      const end = nl === -1 ? source.length : nl;
      push('comment', source.slice(i, end)); i = end; continue;
    }
    if (c === '"' || c === "'") {
      const triple = source.slice(i, i+3);
      if (triple === '"""' || triple === "'''") {
        const q = triple;
        const end = source.indexOf(q, i+3);
        const stop = end === -1 ? source.length : end + 3;
        push('string', source.slice(i, stop)); i = stop; continue;
      }
      let j = i + 1;
      while (j < source.length && source[j] !== c && source[j] !== '\n') {
        if (source[j] === '\\') j += 2; else j += 1;
      }
      push('string', source.slice(i, Math.min(j+1, source.length)));
      i = Math.min(j+1, source.length); continue;
    }
    if (/[fFrRbB]/.test(c) && (source[i+1] === '"' || source[i+1] === "'")) {
      const q = source[i+1];
      let j = i + 2;
      while (j < source.length && source[j] !== q && source[j] !== '\n') {
        if (source[j] === '\\') j += 2; else j += 1;
      }
      push('string', source.slice(i, Math.min(j+1, source.length)));
      i = Math.min(j+1, source.length); continue;
    }
    if (/[0-9]/.test(c) || (c === '.' && /[0-9]/.test(source[i+1] || ''))) {
      let j = i;
      while (j < source.length && /[0-9_\.]/.test(source[j])) j++;
      push('number', source.slice(i, j)); i = j; continue;
    }
    if (/[A-Za-z_]/.test(c)) {
      let j = i;
      while (j < source.length && /[A-Za-z0-9_]/.test(source[j])) j++;
      const word = source.slice(i, j);
      const after = source[j];
      if (PY_KEYWORDS.has(word)) push('keyword', word);
      else if (PY_BUILTINS.has(word)) push('builtin', word);
      else if (after === '(') push('func', word);
      else push('plain', word);
      i = j; continue;
    }
    if (/[\+\-\*\/=<>!&|%~\^]/.test(c)) {
      let j = i;
      while (j < source.length && /[\+\-\*\/=<>!&|%~\^]/.test(source[j])) j++;
      push('op', source.slice(i, j)); i = j; continue;
    }
    push('plain', c); i++;
  }
  return out;
}

function HighlightedPython({ code }) {
  const tokens = highlightPython(code);
  return (
    <code>
      {tokens.map((t, idx) => (
        t.cls === 'plain'
          ? <React.Fragment key={idx}>{t.text}</React.Fragment>
          : <span key={idx} className={`tok-${t.cls}`}>{t.text}</span>
      ))}
    </code>
  );
}

/* ---------- CodeBlock ---------- */
function CodeBlock({ code, lang = 'python', label, hideCopy }) {
  const [copied, setCopied] = useState(false);
  const trimmed = code.replace(/^\n+|\n+$/g, '');
  const copy = () => {
    navigator.clipboard?.writeText(trimmed);
    setCopied(true);
    setTimeout(() => setCopied(false), 1400);
  };
  return (
    <div className="codeblock">
      <div className="codeblock-head">
        <span className="codeblock-lang">{label || lang}</span>
        {!hideCopy && !window.__PRINT_MODE && (
          <button className="codeblock-copy" onClick={copy}>{copied ? '✓ copiado' : 'copiar'}</button>
        )}
      </div>
      <pre>
        {lang === 'python'
          ? <HighlightedPython code={trimmed} />
          : <code>{trimmed}</code>}
      </pre>
    </div>
  );
}

function ReplOutput({ children }) {
  return (
    <div className="codeblock">
      <div className="codeblock-head"><span className="codeblock-lang">salida</span></div>
      <pre><code className="tok-output">{children}</code></pre>
    </div>
  );
}

/* ---------- Callout ---------- */
function Callout({ kind = 'info', title, children }) {
  const cls = { info:'callout', warn:'callout callout-warn', tip:'callout callout-tip', success:'callout callout-success' }[kind] || 'callout';
  const glyph = { info:'i', warn:'!', tip:'✦', success:'✓' }[kind] || 'i';
  const defaultTitle = { info:'Nota', warn:'¡Cuidado!', tip:'Truco', success:'Bien hecho' }[kind];
  return (
    <aside className={cls}>
      <div className="callout-head">
        <span className="glyph">{glyph}</span>
        <span>{title || defaultTitle}</span>
      </div>
      <div>{children}</div>
    </aside>
  );
}

/* ---------- Quiz ---------- */
function Quiz({ question, options, correct, explanation }) {
  const letters = ['A','B','C','D','E'];
  if (window.__PRINT_MODE) {
    return (
      <div className="quiz print-quiz">
        <div className="quiz-tag">Quiz rápido</div>
        <p className="quiz-q">{question}</p>
        <ul className="quiz-options">
          {options.map((opt, idx) => (
            <li key={idx}>
              <div className={`quiz-opt disabled ${idx === correct ? 'correct' : ''}`}>
                <span className="quiz-opt-letter">{letters[idx]}</span>
                <span>{opt}</span>
                {idx === correct && <span className="quiz-opt-mark">✓</span>}
              </div>
            </li>
          ))}
        </ul>
        <div className="quiz-feedback ok">
          <strong>Respuesta — {letters[correct]}. </strong>{explanation}
        </div>
      </div>
    );
  }
  const [picked, setPicked] = useState(null);
  return (
    <div className="quiz">
      <div className="quiz-tag">Quiz rápido</div>
      <div className="quiz-q">{question}</div>
      <ul className="quiz-options">
        {options.map((opt, idx) => {
          const isPicked = picked === idx;
          const isCorrect = idx === correct;
          let cls = 'quiz-opt';
          if (picked != null) { cls += ' disabled'; if (isCorrect) cls += ' correct'; else if (isPicked) cls += ' incorrect'; }
          return (
            <li key={idx}>
              <button className={cls} onClick={() => picked == null && setPicked(idx)} disabled={picked != null}>
                <span className="quiz-opt-letter">{letters[idx]}</span>
                <span>{opt}</span>
                <span className="quiz-opt-mark">{picked != null && isCorrect ? '✓' : (picked != null && isPicked && !isCorrect ? '✗' : '')}</span>
              </button>
            </li>
          );
        })}
      </ul>
      {picked != null && (
        <div className={`quiz-feedback ${picked === correct ? 'ok' : 'err'}`}>
          <strong>{picked === correct ? '¡Correcto! ' : 'No del todo. '}</strong>{explanation}
        </div>
      )}
    </div>
  );
}

/* ---------- DataTable — muestra un array de objetos como tabla ---------- */
function DataTable({ data, caption, maxRows = 6 }) {
  if (!data || !data.length) return null;
  const cols = Object.keys(data[0]);
  const rows = data.slice(0, maxRows);
  return (
    <figure style={{ margin: 'var(--s-5) 0', overflowX: 'auto' }}>
      <table style={{ width: '100%', borderCollapse: 'collapse', fontFamily: 'var(--font-mono)', fontSize: '0.84rem' }}>
        <thead>
          <tr>
            <th style={{ padding: '7px 12px', background: 'var(--paper-3)', border: '1px solid var(--border)', color: 'var(--ink-3)', textAlign: 'center', width: 40 }}>#</th>
            {cols.map(c => (
              <th key={c} style={{ padding: '7px 12px', background: 'var(--paper-3)', border: '1px solid var(--border)', color: 'var(--ink)', textAlign: 'left', fontWeight: 600, letterSpacing: '0.04em' }}>{c}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, i) => (
            <tr key={i}>
              <td style={{ padding: '6px 12px', border: '1px solid var(--border-soft)', color: 'var(--ink-3)', textAlign: 'center', background: 'var(--paper-2)' }}>{i}</td>
              {cols.map(c => (
                <td key={c} style={{ padding: '6px 12px', border: '1px solid var(--border-soft)', color: 'var(--ink-2)', background: i % 2 === 0 ? 'var(--paper)' : 'var(--paper-2)' }}>{String(row[c] ?? '')}</td>
              ))}
            </tr>
          ))}
          {data.length > maxRows && (
            <tr>
              <td colSpan={cols.length + 1} style={{ padding: '6px 12px', border: '1px solid var(--border-soft)', color: 'var(--ink-3)', textAlign: 'center', fontStyle: 'italic', fontSize: '0.78rem' }}>
                … {data.length - maxRows} filas más
              </td>
            </tr>
          )}
        </tbody>
      </table>
      {caption && (
        <figcaption style={{ fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--ink-3)', marginTop: 6, letterSpacing: '0.06em' }}>
          {caption}
        </figcaption>
      )}
    </figure>
  );
}

/* ---------- ML Pyodide singleton — carga paquetes científicos ---------- */
let mlPyodidePromise = null;
function getMLPyodide() {
  if (mlPyodidePromise) return mlPyodidePromise;
  mlPyodidePromise = new Promise(async (resolve, reject) => {
    try {
      if (typeof window.loadPyodide !== 'function') {
        await new Promise((res, rej) => {
          const s = document.createElement('script');
          s.src = 'https://cdn.jsdelivr.net/pyodide/v0.26.2/full/pyodide.js';
          s.onload = res; s.onerror = () => rej(new Error('No se pudo cargar Pyodide'));
          document.head.appendChild(s);
        });
      }
      const py = await window.loadPyodide({ indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.26.2/full/' });
      await py.loadPackage(['numpy', 'pandas', 'matplotlib', 'scikit-learn']);
      py.runPython(`import matplotlib; matplotlib.use('Agg')`);
      resolve(py);
    } catch (e) {
      reject(e);
    }
  });
  return mlPyodidePromise;
}

const PLOT_CAPTURE = `
__plot_b64__ = None
try:
    import matplotlib.pyplot as _plt
    if _plt.get_fignums():
        import io as _io, base64 as _b64
        _buf = _io.BytesIO()
        _plt.savefig(_buf, format='png', dpi=110, bbox_inches='tight')
        _buf.seek(0)
        __plot_b64__ = _b64.b64encode(_buf.read()).decode('utf-8')
        _plt.close('all')
except Exception:
    pass
__plot_b64__
`;

/* ---------- PyRunner — con soporte de matplotlib ---------- */
function PyRunner({ initial, hint, solution }) {
  const [code, setCode] = useState(initial || '');
  const [output, setOutput] = useState('');
  const [plotImg, setPlotImg] = useState(null);
  const [err, setErr] = useState(false);
  const [status, setStatus] = useState('idle');

  const fixTabs = (e) => {
    if (e.key === 'Tab') {
      e.preventDefault();
      const ta = e.target;
      const s = ta.selectionStart, en = ta.selectionEnd;
      const ins = '    ';
      ta.value = ta.value.slice(0, s) + ins + ta.value.slice(en);
      ta.selectionStart = ta.selectionEnd = s + ins.length;
      setCode(ta.value);
    }
  };

  const run = useCallback(async () => {
    setOutput(''); setPlotImg(null); setErr(false); setStatus('loading');
    try {
      const py = await getMLPyodide();
      setStatus('running');
      let buf = '';
      py.setStdout({ batched: (s) => { buf += s + '\n'; } });
      py.setStderr({ batched: (s) => { buf += s + '\n'; } });
      try {
        await py.runPythonAsync(code);
        const imgB64 = py.runPython(PLOT_CAPTURE);
        if (imgB64) setPlotImg(imgB64);
        setOutput(buf || '');
        setStatus('ready');
      } catch (e) {
        setOutput(buf + '\n' + String(e.message || e));
        setErr(true); setStatus('err');
      }
    } catch (e) {
      setOutput('No se pudieron cargar las librerías.\n' + String(e.message || e));
      setErr(true); setStatus('err');
    }
  }, [code]);

  const reset = () => { setCode(initial || ''); setOutput(''); setPlotImg(null); setErr(false); setStatus('idle'); };

  const statusLabel = {
    idle: 'listo para ejecutar',
    loading: 'cargando numpy · pandas · matplotlib · sklearn…',
    running: 'ejecutando…',
    ready: 'ejecutado ✓',
    err: 'con error',
  }[status];

  return (
    <div className="runner">
      <div className="runner-editor">
        <div className="runner-editor-head">
          <span>tu código · python</span>
          <span className={`runner-status ${['loading','running'].includes(status) ? 'loading' : status === 'ready' ? 'ready' : status === 'err' ? 'err' : ''}`}>
            {statusLabel}
          </span>
        </div>
        <textarea
          value={code}
          onChange={(e) => setCode(e.target.value)}
          onKeyDown={fixTabs}
          spellCheck={false}
          rows={Math.max(4, code.split('\n').length + 1)}
        />
      </div>
      <div className="runner-actions">
        <button className="btn btn-primary" onClick={run}>▶ Ejecutar</button>
        <button className="btn btn-ghost" onClick={reset}>Reiniciar</button>
        {hint && <HintButton hint={hint} />}
      </div>
      {plotImg && (
        <div style={{ marginTop: 'var(--s-3)', borderRadius: 'var(--r-md)', overflow: 'hidden', border: '1px solid var(--border-soft)' }}>
          <img src={`data:image/png;base64,${plotImg}`} alt="Gráfico generado" style={{ display: 'block', maxWidth: '100%' }} />
        </div>
      )}
      {(output || !plotImg) && (
        <div className={`runner-output ${err ? 'err' : ''} ${!output && !plotImg ? 'empty' : ''}`}>
          {output || (plotImg ? '' : '— la salida aparecerá aquí —')}
        </div>
      )}
      {solution && (
        <details className="solution">
          <summary>↳ Ver solución</summary>
          <div className="solution-body">
            <CodeBlock code={solution.code} />
            {solution.explanation && <p>{solution.explanation}</p>}
          </div>
        </details>
      )}
    </div>
  );
}

function HintButton({ hint }) {
  const [shown, setShown] = useState(false);
  return (
    <>
      <button className="btn-link" onClick={() => setShown(s => !s)}>{shown ? 'Ocultar pista' : '? Pista'}</button>
      {shown && (
        <div style={{ flexBasis: '100%', padding: '10px 14px', background: 'var(--highlight-soft)', color: 'var(--ink)', borderLeft: '3px solid var(--highlight)', borderRadius: 'var(--r-sm)', fontSize: '0.92rem', lineHeight: 1.5 }}>
          {hint}
        </div>
      )}
    </>
  );
}

/* ---------- Exercise ---------- */
function Exercise({ number, title, difficulty = 'fácil', children, runner }) {
  if (window.__PRINT_MODE) {
    return (
      <section className="exercise">
        <div className="exercise-head">
          <span className="exercise-tag">Ejercicio {number}</span>
          <span className="exercise-diff">· {difficulty}</span>
        </div>
        <h3 className="exercise-title">{title}</h3>
        <div className="exercise-body">{children}</div>
        {runner && <CodeBlock code={runner.initial} />}
        {runner?.hint && <p className="print-hint"><strong>Pista:</strong> {runner.hint}</p>}
      </section>
    );
  }
  return (
    <section className="exercise">
      <div className="exercise-head">
        <span className="exercise-tag">Ejercicio {number}</span>
        <span className="exercise-diff">· {difficulty}</span>
      </div>
      <h3 className="exercise-title">{title}</h3>
      <div className="exercise-body">{children}</div>
      {runner && <PyRunner {...runner} />}
    </section>
  );
}

function PullQuote({ children }) {
  return <blockquote className="pullquote">{children}</blockquote>;
}

/* ---------- ChapterHeader ---------- */
function ChapterHeader({ book, module, title, dek, time }) {
  return (
    <header className="chapter-header">
      <div className="chapter-meta">
        {book && <span className="eyebrow eyebrow-accent">{book}</span>}
        {module && <span className="eyebrow">{module}</span>}
        {time && <span className="eyebrow">{time}</span>}
      </div>
      <h1 className="chapter-title">{title}</h1>
      {dek && <p className="chapter-dek">{dek}</p>}
    </header>
  );
}

/* ---------- ChapterNav con botón Marcar completado ---------- */
function ChapterNav({ prev, next, onNav }) {
  if (window.__PRINT_MODE) return null;
  const currentId = window.location.hash.slice(1);
  const [isDone, setIsDone] = useState(() => {
    try {
      const saved = JSON.parse(localStorage.getItem('bkln-libro-ia-progress') || '[]');
      return saved.includes(currentId);
    } catch { return false; }
  });

  const handleMark = () => {
    if (isDone) return;
    window.__bookProgress?.markDone(currentId);
    setIsDone(true);
    if (next) setTimeout(() => onNav(next.id), 250);
  };

  return (
    <nav className="chapter-nav">
      {prev ? (
        <a className="chapter-nav-link" href={`#${prev.id}`} onClick={(e) => { e.preventDefault(); onNav(prev.id); }}>
          <span className="dir">← Anterior</span>
          <span className="label">{prev.title}</span>
        </a>
      ) : <span className="chapter-nav-link disabled"><span className="dir">— inicio —</span></span>}

      <button
        type="button"
        onClick={handleMark}
        disabled={isDone}
        style={{
          padding: '0.45rem 1.1rem',
          background: isDone ? 'transparent' : 'var(--highlight)',
          color: isDone ? 'var(--highlight)' : '#fff',
          border: isDone ? '1px solid var(--highlight)' : '1px solid transparent',
          borderRadius: 'var(--r-sm)',
          fontFamily: 'var(--font-body)',
          fontSize: '0.82rem',
          cursor: isDone ? 'default' : 'pointer',
          transition: 'all 0.2s',
          whiteSpace: 'nowrap',
        }}
      >
        {isDone ? '✓ Completado' : 'Marcar completado →'}
      </button>

      {next ? (
        <a className="chapter-nav-link next" href={`#${next.id}`} onClick={(e) => { e.preventDefault(); onNav(next.id); }}>
          <span className="dir">Siguiente →</span>
          <span className="label">{next.title}</span>
        </a>
      ) : <span className="chapter-nav-link next disabled"><span className="dir">— fin —</span></span>}
    </nav>
  );
}

Object.assign(window, {
  CodeBlock, ReplOutput, Callout, Quiz, Exercise, PyRunner, PullQuote, DataTable,
  ChapterHeader, ChapterNav, HighlightedPython, highlightPython,
});
