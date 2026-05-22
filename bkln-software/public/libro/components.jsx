// =============================================================
// components.jsx — pedagogical building blocks for the Python book
// CodeBlock, Callout, Quiz, Exercise, Runner (Pyodide), PullQuote
// =============================================================

const { useState, useEffect, useRef, useCallback } = React;

/* ---------- Tiny Python syntax highlighter ----------
   Token-stream highlighter. Not perfect Python, but good
   enough for teaching code. Handles strings, comments,
   numbers, keywords, builtins, f-strings, REPL prompts.
*/
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

    // REPL prompts
    if ((c === '>' && source.slice(i, i+4) === '>>> ') ||
        (c === '.' && source.slice(i, i+4) === '... ')) {
      push('prompt', source.slice(i, i+4));
      i += 4;
      continue;
    }

    // Comments
    if (c === '#') {
      const nl = source.indexOf('\n', i);
      const end = nl === -1 ? source.length : nl;
      push('comment', source.slice(i, end));
      i = end;
      continue;
    }

    // Strings (triple, then single)
    if (c === '"' || c === "'") {
      const triple = source.slice(i, i+3);
      if (triple === '"""' || triple === "'''") {
        const q = triple;
        const end = source.indexOf(q, i+3);
        const stop = end === -1 ? source.length : end + 3;
        push('string', source.slice(i, stop));
        i = stop;
        continue;
      }
      // single-line string (handle f"" prefix already consumed below as ident)
      let j = i + 1;
      while (j < source.length && source[j] !== c && source[j] !== '\n') {
        if (source[j] === '\\') j += 2; else j += 1;
      }
      push('string', source.slice(i, Math.min(j+1, source.length)));
      i = Math.min(j+1, source.length);
      continue;
    }

    // f-string / r-string prefix + quote
    if (/[fFrRbB]/.test(c) && (source[i+1] === '"' || source[i+1] === "'")) {
      const q = source[i+1];
      let j = i + 2;
      while (j < source.length && source[j] !== q && source[j] !== '\n') {
        if (source[j] === '\\') j += 2; else j += 1;
      }
      push('string', source.slice(i, Math.min(j+1, source.length)));
      i = Math.min(j+1, source.length);
      continue;
    }

    // Numbers
    if (/[0-9]/.test(c) || (c === '.' && /[0-9]/.test(source[i+1] || ''))) {
      let j = i;
      while (j < source.length && /[0-9_\.]/.test(source[j])) j++;
      push('number', source.slice(i, j));
      i = j;
      continue;
    }

    // Identifiers / keywords / builtins
    if (/[A-Za-z_]/.test(c)) {
      let j = i;
      while (j < source.length && /[A-Za-z0-9_]/.test(source[j])) j++;
      const word = source.slice(i, j);
      const after = source[j];
      if (PY_KEYWORDS.has(word)) push('keyword', word);
      else if (PY_BUILTINS.has(word) && after === '(') push('builtin', word);
      else if (PY_BUILTINS.has(word)) push('builtin', word);
      else if (after === '(') push('func', word);
      else push('plain', word);
      i = j;
      continue;
    }

    // Operators / punctuation
    if (/[\+\-\*\/=<>!&|%~\^]/.test(c)) {
      let j = i;
      while (j < source.length && /[\+\-\*\/=<>!&|%~\^]/.test(source[j])) j++;
      push('op', source.slice(i, j));
      i = j;
      continue;
    }

    push('plain', c);
    i++;
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
        {!hideCopy && (
          <button className="codeblock-copy" onClick={copy} aria-label="Copiar código">
            {copied ? '✓ copiado' : 'copiar'}
          </button>
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

/* ---------- REPL / output block — for showing output not source ---------- */
function ReplOutput({ children }) {
  return (
    <div className="codeblock">
      <div className="codeblock-head">
        <span className="codeblock-lang">salida</span>
      </div>
      <pre><code className="tok-output">{children}</code></pre>
    </div>
  );
}

/* ---------- Callout ---------- */
function Callout({ kind = 'info', title, children }) {
  const cls = {
    info: 'callout',
    warn: 'callout callout-warn',
    tip: 'callout callout-tip',
    success: 'callout callout-success',
  }[kind] || 'callout';
  const glyph = {
    info: 'i',
    warn: '!',
    tip: '✦',
    success: '✓',
  }[kind] || 'i';
  const defaultTitle = {
    info: 'Nota',
    warn: '¡Cuidado!',
    tip: 'Truco',
    success: 'Bien hecho',
  }[kind];
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
  const [picked, setPicked] = useState(null);
  const letters = ['A','B','C','D','E'];
  return (
    <div className="quiz">
      <div className="quiz-tag">Quiz rápido</div>
      <div className="quiz-q">{question}</div>
      <ul className="quiz-options">
        {options.map((opt, idx) => {
          const isPicked = picked === idx;
          const isCorrect = idx === correct;
          let cls = 'quiz-opt';
          if (picked != null) {
            cls += ' disabled';
            if (isCorrect) cls += ' correct';
            else if (isPicked) cls += ' incorrect';
          }
          return (
            <li key={idx}>
              <button
                className={cls}
                onClick={() => picked == null && setPicked(idx)}
                disabled={picked != null}
              >
                <span className="quiz-opt-letter">{letters[idx]}</span>
                <span>{opt}</span>
                <span className="quiz-opt-mark">
                  {picked != null && isCorrect ? '✓' : (picked != null && isPicked && !isCorrect ? '✗' : '')}
                </span>
              </button>
            </li>
          );
        })}
      </ul>
      {picked != null && (
        <div className={`quiz-feedback ${picked === correct ? 'ok' : 'err'}`}>
          <strong>{picked === correct ? '¡Correcto! ' : 'No del todo. '}</strong>
          {explanation}
        </div>
      )}
    </div>
  );
}

/* ---------- Pyodide singleton ---------- */
let pyodidePromise = null;
function loadPyodide() {
  if (pyodidePromise) return pyodidePromise;
  pyodidePromise = new Promise((resolve, reject) => {
    if (window.loadPyodide) {
      window.loadPyodide({ indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.26.2/full/' })
        .then(resolve).catch(reject);
      return;
    }
    const s = document.createElement('script');
    s.src = 'https://cdn.jsdelivr.net/pyodide/v0.26.2/full/pyodide.js';
    s.onload = () => {
      window.loadPyodide({ indexURL: 'https://cdn.jsdelivr.net/pyodide/v0.26.2/full/' })
        .then(resolve).catch(reject);
    };
    s.onerror = () => reject(new Error('No se pudo cargar Pyodide'));
    document.head.appendChild(s);
  });
  return pyodidePromise;
}

/* ---------- PyRunner: editable, runnable Python in-page ---------- */
function PyRunner({ initial, hint, solution }) {
  const [code, setCode] = useState(initial || '');
  const [output, setOutput] = useState('');
  const [err, setErr] = useState(false);
  const [status, setStatus] = useState('idle'); // idle | loading | ready | running | err
  const taRef = useRef(null);

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
    setOutput('');
    setErr(false);
    setStatus('loading');
    try {
      const py = await loadPyodide();
      setStatus('running');
      let buf = '';
      py.setStdout({ batched: (s) => { buf += s + '\n'; } });
      py.setStderr({ batched: (s) => { buf += s + '\n'; } });
      try {
        await py.runPythonAsync(code);
        setOutput(buf || '');
        setStatus('ready');
      } catch (e) {
        setOutput(buf + '\n' + String(e.message || e));
        setErr(true);
        setStatus('err');
      }
    } catch (e) {
      setOutput('No se pudo cargar el intérprete de Python.\n' + String(e.message || e));
      setErr(true);
      setStatus('err');
    }
  }, [code]);

  const reset = () => {
    setCode(initial || '');
    setOutput('');
    setErr(false);
    setStatus('idle');
  };

  const statusLabel = {
    idle: 'listo para ejecutar',
    loading: 'cargando python…',
    running: 'ejecutando…',
    ready: 'ejecutado ✓',
    err: 'con error',
  }[status];

  return (
    <div className="runner">
      <div className="runner-editor">
        <div className="runner-editor-head">
          <span>tu código · python</span>
          <span className={`runner-status ${status === 'loading' || status === 'running' ? 'loading' : status === 'ready' ? 'ready' : status === 'err' ? 'err' : ''}`}>
            {statusLabel}
          </span>
        </div>
        <textarea
          ref={taRef}
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
      <div className={`runner-output ${err ? 'err' : ''} ${!output ? 'empty' : ''}`}>
        {output || '— la salida de tu programa aparecerá aquí —'}
      </div>
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
      <button className="btn-link" onClick={() => setShown(s => !s)}>
        {shown ? 'Ocultar pista' : '? Pista'}
      </button>
      {shown && (
        <div style={{
          flexBasis: '100%',
          padding: '10px 14px',
          background: 'var(--highlight-soft)',
          color: 'var(--ink)',
          borderLeft: '3px solid var(--highlight)',
          borderRadius: 'var(--r-sm)',
          fontSize: '0.92rem',
          lineHeight: 1.5,
        }}>
          {hint}
        </div>
      )}
    </>
  );
}

/* ---------- Exercise ---------- */
function Exercise({ number, title, difficulty = 'fácil', children, runner }) {
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

/* ---------- Pull quote ---------- */
function PullQuote({ children }) {
  return <blockquote className="pullquote">{children}</blockquote>;
}

/* ---------- Chapter header ---------- */
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

/* ---------- Chapter navigation footer ---------- */
function ChapterNav({ prev, next, onNav }) {
  return (
    <nav className="chapter-nav">
      {prev ? (
        <a className="chapter-nav-link" href={`#${prev.id}`} onClick={(e) => { e.preventDefault(); onNav(prev.id); }}>
          <span className="dir">← Anterior</span>
          <span className="label">{prev.title}</span>
        </a>
      ) : <span className="chapter-nav-link disabled"><span className="dir">— inicio —</span></span>}
      {next ? (
        <a className="chapter-nav-link next" href={`#${next.id}`} onClick={(e) => { e.preventDefault(); onNav(next.id); }}>
          <span className="dir">Siguiente →</span>
          <span className="label">{next.title}</span>
        </a>
      ) : <span className="chapter-nav-link next disabled"><span className="dir">— fin —</span></span>}
    </nav>
  );
}

// expose globally so other babel scripts can use
Object.assign(window, {
  CodeBlock, ReplOutput, Callout, Quiz, Exercise, PyRunner, PullQuote,
  ChapterHeader, ChapterNav, HighlightedPython, highlightPython,
});
