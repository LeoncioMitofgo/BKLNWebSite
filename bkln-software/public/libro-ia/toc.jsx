// =============================================================
// toc.jsx — Table of contents for IA y Machine Learning
// =============================================================

const TOC = [
  { kind: 'special', id: 'cover',  label: 'Portada' },
  { kind: 'special', id: 'intro',  label: 'Cómo usar este libro' },

  {
    bookId: 1, bookNum: 'i',
    bookTitle: 'Fundamentos — Datos, NumPy, Pandas y tus primeros modelos',
    chapters: [
      { id: 'l1-m1', num: '01', title: '¿Qué es la IA?', time: '20 min' },
      { id: 'l1-m2', num: '02', title: 'NumPy — vectores y matrices', time: '30 min' },
      { id: 'l1-m3', num: '03', title: 'Pandas — datos en tablas', time: '35 min' },
      { id: 'l1-m4', num: '04', title: 'Matplotlib — ver para entender', time: '30 min' },
      { id: 'l1-m5', num: '05', title: 'Regresión lineal', time: '40 min' },
      { id: 'l1-m6', num: '06', title: 'Clasificación — K-Nearest Neighbors', time: '35 min' },
      { id: 'l1-m7', num: '07', title: 'Árboles de decisión y Random Forest', time: '40 min' },
      { id: 'l1-m8', num: '08', title: 'Evaluación de modelos', time: '35 min' },
    ],
  },

  {
    bookId: 2, bookNum: 'ii',
    bookTitle: 'Intermedio — ML con profundidad y proyectos reales',
    chapters: [
      { id: 'l2-m1', num: '01', title: 'Preprocesamiento de datos', time: '40 min' },
      { id: 'l2-m2', num: '02', title: 'Regresión con regularización', time: '35 min' },
      { id: 'l2-m3', num: '03', title: 'Máquinas de soporte vectorial', time: '40 min' },
      { id: 'l2-m4', num: '04', title: 'Clustering sin etiquetas', time: '35 min' },
      { id: 'l2-m5', num: '05', title: 'PCA y reducción de dimensiones', time: '35 min' },
      { id: 'l2-m6', num: '06', title: 'Selección de características', time: '30 min' },
      { id: 'l2-m7', num: '07', title: 'Pipelines y automatización', time: '40 min' },
      { id: 'l2-m8', num: '08', title: 'Proyecto: sistema de recomendación', time: '50 min' },
    ],
  },

  {
    bookId: 3, bookNum: 'iii',
    bookTitle: 'Deep Learning — Redes neuronales e IA Generativa',
    chapters: [
      { id: 'l3-m1', num: '01', title: 'Redes neuronales artificiales', time: '45 min', status: 'stub' },
      { id: 'l3-m2', num: '02', title: 'Backpropagation y gradiente', time: '45 min', status: 'stub' },
      { id: 'l3-m3', num: '03', title: 'Redes convolucionales (CNN)', time: '50 min', status: 'stub' },
      { id: 'l3-m4', num: '04', title: 'Redes recurrentes (RNN)', time: '50 min', status: 'stub' },
      { id: 'l3-m5', num: '05', title: 'Transformers y atención', time: '55 min', status: 'stub' },
      { id: 'l3-m6', num: '06', title: 'Fine-tuning de modelos de lenguaje', time: '60 min', status: 'stub' },
      { id: 'l3-m7', num: '07', title: 'Agentes y herramientas', time: '55 min', status: 'stub' },
      { id: 'l3-m8', num: '08', title: 'Proyecto final — asistente con contexto', time: '90 min', status: 'stub' },
    ],
  },
];

function flatTOC() {
  const out = [];
  for (const entry of TOC) {
    if (entry.kind === 'special') continue;
    for (const ch of entry.chapters) out.push(ch);
  }
  return out;
}
