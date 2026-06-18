// ================================================================
// scripts/generate-libro-ia-pdf.mjs
// Genera el PDF completo del libro IA y Machine Learning con Python.
//
// Requisitos:
//   - El servidor de Next.js debe estar corriendo en localhost:3000
//     (npm run dev)
//   - puppeteer debe estar instalado:
//     npm install --save-dev puppeteer
//
// Uso:
//   node scripts/generate-libro-ia-pdf.mjs
// ================================================================

import puppeteer from 'puppeteer';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const ROOT      = path.join(__dirname, '..');
const OUT_PATH  = path.join(ROOT, 'libro-ia-completo.pdf');
const PRINT_URL = 'http://localhost:3000/libro-ia/print.html';

// Tiempos de espera
const TIMEOUT_NAV   = 30_000;   // 30s para cargar la página
const TIMEOUT_READY = 60_000;   // 60s para que React renderice todo
const SETTLE_MS     = 2_000;    // 2s extra para fuentes y estilos

async function run() {
  console.log('');
  console.log('📚  Generador de PDF — IA y Machine Learning con Python');
  console.log('─'.repeat(55));
  console.log(`  URL:    ${PRINT_URL}`);
  console.log(`  Salida: ${OUT_PATH}`);
  console.log('');

  const browser = await puppeteer.launch({
    headless: 'new',
    executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  try {
    const page = await browser.newPage();

    // Viewport A4 a 96dpi
    await page.setViewport({ width: 794, height: 1123, deviceScaleFactor: 1.5 });

    // Silenciar errores de consola del navegador (Pyodide no carga en print mode)
    page.on('console', msg => {
      if (msg.type() === 'error') return;
    });

    console.log('  → Cargando página...');
    await page.goto(PRINT_URL, {
      waitUntil: 'domcontentloaded',
      timeout: TIMEOUT_NAV,
    });

    // Esperar a que React renderice todos los capítulos
    console.log('  → Esperando render completo (React + Babel)...');
    await page.waitForFunction(
      () => window.__PRINT_READY === true && document.querySelector('.print-book') !== null,
      { timeout: TIMEOUT_READY }
    );

    // Tiempo extra para fuentes Google Fonts
    console.log('  → Cargando tipografías...');
    await new Promise(r => setTimeout(r, SETTLE_MS));

    // Contar capítulos renderizados
    const nChapters = await page.$$eval('.reader-inner', els => els.length);
    console.log(`  → ${nChapters} secciones renderizadas`);

    console.log('  → Generando PDF...');
    await page.pdf({
      path: OUT_PATH,
      format: 'A4',
      printBackground: true,
      margin: {
        top:    '18mm',
        right:  '20mm',
        bottom: '18mm',
        left:   '22mm',
      },
      displayHeaderFooter: true,
      headerTemplate: `
        <div style="
          width: 100%; padding: 0 22mm; box-sizing: border-box;
          font-family: 'JetBrains Mono', monospace; font-size: 7px;
          color: #9a8f80; display: flex; justify-content: space-between;
        ">
          <span>// IA y Machine Learning con Python</span>
          <span>BKLN Software &amp; Systems · bklnsoftware.tech</span>
        </div>`,
      footerTemplate: `
        <div style="
          width: 100%; padding: 0 22mm; box-sizing: border-box;
          font-family: 'JetBrains Mono', monospace; font-size: 7px;
          color: #9a8f80; display: flex; justify-content: space-between;
        ">
          <span>hello@bklnsoftware.com · +240 222 798 086</span>
          <span class="pageNumber"></span>
        </div>`,
    });

    console.log('');
    console.log('  ✓ PDF generado correctamente.');
    console.log(`  ✓ Archivo: ${OUT_PATH}`);
    console.log('');

  } finally {
    await browser.close();
  }
}

run().catch(err => {
  console.error('\n  ✗ Error al generar el PDF:');
  console.error(' ', err.message);
  console.error('');
  console.error('  Asegúrate de que:');
  console.error('  1. El servidor está corriendo: npm run dev');
  console.error('  2. Puppeteer está instalado: npm install --save-dev puppeteer');
  process.exit(1);
});
