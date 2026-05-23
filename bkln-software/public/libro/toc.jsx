// =============================================================
// toc.jsx — table of contents for the entire series.
// One source of truth used by the sidebar and chapter navigation.
// =============================================================

const TOC = [
  {
    id: 'cover',
    kind: 'special',
    title: 'Portada',
    label: 'Inicio',
  },
  {
    id: 'intro',
    kind: 'special',
    title: '¿Cómo usar este libro?',
    label: 'Cómo leer',
  },
  {
    bookId: 'libro-1',
    bookNum: 'Libro 1',
    bookTitle: 'Python básico — Primeros pasos',
    chapters: [
      { id: 'l1-m1', num: '01', title: '¿Qué es programar?', status: 'ready' },
      { id: 'l1-m2', num: '02', title: 'Variables y tipos de datos', status: 'ready' },
      { id: 'l1-m3', num: '03', title: 'Operadores y expresiones', status: 'ready' },
      { id: 'l1-m4', num: '04', title: 'Control de flujo', status: 'ready' },
      { id: 'l1-m5', num: '05', title: 'Funciones', status: 'ready' },
      { id: 'l1-m6', num: '06', title: 'Listas y tuplas', status: 'ready' },
      { id: 'l1-m7', num: '07', title: 'Cadenas de texto', status: 'ready' },
      { id: 'l1-m8', num: '08', title: 'Proyecto final básico', status: 'ready' },
    ],
  },
  {
    bookId: 'libro-2',
    bookNum: 'Libro 2',
    bookTitle: 'Python intermedio — Programando con estructura',
    chapters: [
      { id: 'l2-m1', num: '01', title: 'Diccionarios y conjuntos', status: 'ready' },
      { id: 'l2-m2', num: '02', title: 'Funciones avanzadas', status: 'ready' },
      { id: 'l2-m3', num: '03', title: 'Programación orientada a objetos', status: 'ready' },
      { id: 'l2-m4', num: '04', title: 'Manejo de errores', status: 'ready' },
      { id: 'l2-m5', num: '05', title: 'Archivos y datos', status: 'ready' },
      { id: 'l2-m6', num: '06', title: 'Módulos y paquetes', status: 'ready' },
      { id: 'l2-m7', num: '07', title: 'Comprensiones e iteradores', status: 'ready' },
      { id: 'l2-m8', num: '08', title: 'Proyecto final intermedio', status: 'ready' },
    ],
  },
  {
    bookId: 'libro-3',
    bookNum: 'Libro 3',
    bookTitle: 'Python avanzado — Del código al mundo real',
    chapters: [
      { id: 'l3-m1', num: '01', title: 'Python y la web', status: 'ready' },
      { id: 'l3-m2', num: '02', title: 'Bases de datos', status: 'ready' },
      { id: 'l3-m3', num: '03', title: 'APIs y servicios externos', status: 'ready' },
      { id: 'l3-m4', num: '04', title: 'Análisis de datos', status: 'ready' },
      { id: 'l3-m5', num: '05', title: 'Automatización', status: 'ready' },
      { id: 'l3-m6', num: '06', title: 'Testing y calidad', status: 'ready' },
      { id: 'l3-m7', num: '07', title: 'Python profesional', status: 'ready' },
      { id: 'l3-m8', num: '08', title: 'Proyecto final avanzado', status: 'ready' },
    ],
  },
];

// Flatten into ordered list of chapter ids for prev/next nav
function flatTOC() {
  const out = [];
  for (const item of TOC) {
    if (item.kind === 'special') {
      out.push({ id: item.id, title: item.title });
    } else {
      for (const ch of item.chapters) {
        out.push({ id: ch.id, title: ch.title, bookNum: item.bookNum, num: ch.num });
      }
    }
  }
  return out;
}

window.TOC = TOC;
window.flatTOC = flatTOC;
