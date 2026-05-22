/* ── Analizador de Ventas — frontend ───────────────────────────────────── */

const API = '/api/analyze'

const $ = (id) => document.getElementById(id)

const screenUpload = $('screen-upload')
const screenReport = $('screen-report')
const dropZone     = $('drop-zone')
const fileInput    = $('file-input')
const uploadStatus = $('upload-status')
const uploadError  = $('upload-error')
const statusText   = $('status-text')

// ── Drag & drop ────────────────────────────────────────────────────────
dropZone.addEventListener('click', () => fileInput.click())

dropZone.addEventListener('dragover', (e) => {
  e.preventDefault()
  dropZone.classList.add('drag-over')
})
dropZone.addEventListener('dragleave', () => dropZone.classList.remove('drag-over'))
dropZone.addEventListener('drop', (e) => {
  e.preventDefault()
  dropZone.classList.remove('drag-over')
  const file = e.dataTransfer.files[0]
  if (file) uploadFile(file)
})

fileInput.addEventListener('change', () => {
  if (fileInput.files[0]) uploadFile(fileInput.files[0])
})

// ── Upload & analyze ───────────────────────────────────────────────────
async function uploadFile(file) {
  showStatus(`Analizando "${file.name}"…`)
  hideError()

  const form = new FormData()
  form.append('file', file)

  try {
    const res = await fetch(API, { method: 'POST', body: form })
    const data = await res.json()

    if (!res.ok) {
      showError(data.detail || 'Error desconocido.')
      hideStatus()
      return
    }

    hideStatus()
    renderReport(data)
  } catch (err) {
    showError('No se pudo conectar con el servidor.')
    hideStatus()
  }
}

// ── Render report ──────────────────────────────────────────────────────
function renderReport(data) {
  // KPIs
  const kpiGrid = $('kpi-grid')
  kpiGrid.innerHTML = ''

  kpi(kpiGrid, 'Registros analizados', fmt(data.rows, 0), '')
  if (data.total_revenue !== null)
    kpi(kpiGrid, 'Ingresos totales', fmtXAF(data.total_revenue), 'accent')
  if (data.total_units !== null)
    kpi(kpiGrid, 'Unidades vendidas', fmt(data.total_units, 0), 'success')
  if (data.avg_ticket !== null)
    kpi(kpiGrid, 'Ticket medio', fmtXAF(data.avg_ticket), '')

  // Columnas detectadas
  const detectedSec = $('detected-section')
  detectedSec.innerHTML = ''
  const label = document.createElement('span')
  label.className = 'detected-label'
  label.textContent = 'Columnas detectadas:'
  detectedSec.appendChild(label)

  const labels = { fecha: 'Fecha', producto: 'Producto', cantidad: 'Cantidad', precio: 'Precio/Total' }
  for (const [key, colName] of Object.entries(data.detected)) {
    if (colName) {
      const chip = document.createElement('span')
      chip.className = 'detected-chip'
      chip.innerHTML = `<span>${labels[key]}:</span>${colName}`
      detectedSec.appendChild(chip)
    }
  }

  // Filename
  $('report-filename').textContent = data.filename

  // Chart: top productos
  if (data.top_products && data.top_products.length > 0) {
    $('chart-top').style.display = 'block'
    const names  = data.top_products.map(p => p.name)
    const values = data.top_products.map(p => p.value)

    Plotly.newPlot('plot-top', [{
      type:        'bar',
      orientation: 'h',
      x:           values,
      y:           names,
      marker:      { color: '#2a6db5', opacity: 0.85 },
      hovertemplate: '%{y}<br>%{x:,.0f} XAF<extra></extra>',
    }], plotLayout({ yaxis: { autorange: 'reversed' } }), { responsive: true, displayModeBar: false })
  }

  // Chart: ventas en el tiempo
  if (data.sales_over_time && data.sales_over_time.length > 1) {
    $('chart-time').style.display = 'block'
    const dates  = data.sales_over_time.map(d => d.date)
    const values = data.sales_over_time.map(d => d.value)

    Plotly.newPlot('plot-time', [{
      type:  'scatter',
      mode:  'lines+markers',
      x:     dates,
      y:     values,
      line:  { color: '#5aabff', width: 2 },
      marker:{ color: '#5aabff', size: 5 },
      fill:  'tozeroy',
      fillcolor: 'rgba(90,171,255,0.08)',
      hovertemplate: '%{x}<br>%{y:,.0f} XAF<extra></extra>',
    }], plotLayout({}), { responsive: true, displayModeBar: false })
  }

  // Mostrar pantalla de informe
  screenUpload.classList.remove('active')
  screenReport.classList.add('active')
  window.scrollTo({ top: 0, behavior: 'instant' })
}

// ── Helpers ────────────────────────────────────────────────────────────
function kpi(parent, label, value, cls) {
  const card = document.createElement('div')
  card.className = 'kpi-card'
  card.innerHTML = `
    <div class="kpi-label">${label}</div>
    <div class="kpi-value ${cls}">${value}</div>
  `
  parent.appendChild(card)
}

function plotLayout(extra) {
  return Object.assign({
    paper_bgcolor: 'transparent',
    plot_bgcolor:  'transparent',
    font:          { family: 'Segoe UI, system-ui, sans-serif', color: '#8aadcc', size: 11 },
    margin:        { t: 10, r: 10, b: 40, l: 130 },
    xaxis:         { gridcolor: 'rgba(255,255,255,0.05)', zerolinecolor: 'rgba(255,255,255,0.1)' },
    yaxis:         { gridcolor: 'rgba(255,255,255,0.05)' },
    hoverlabel:    { bgcolor: '#1a2f42', bordercolor: '#2a6db5', font: { color: '#fff' } },
  }, extra)
}

function fmtXAF(n) {
  return new Intl.NumberFormat('fr-FR', {
    style: 'currency', currency: 'XAF', minimumFractionDigits: 0
  }).format(n)
}

function fmt(n, decimals) {
  return new Intl.NumberFormat('fr-FR', { maximumFractionDigits: decimals }).format(n)
}

function showStatus(msg) {
  statusText.textContent = msg
  uploadStatus.classList.remove('hidden')
}
function hideStatus() { uploadStatus.classList.add('hidden') }
function showError(msg) {
  uploadError.textContent = msg
  uploadError.classList.remove('hidden')
}
function hideError() { uploadError.classList.add('hidden') }

// ── Acciones del informe ───────────────────────────────────────────────
$('btn-new').addEventListener('click', () => {
  screenReport.classList.remove('active')
  screenUpload.classList.add('active')
  fileInput.value = ''
  $('kpi-grid').innerHTML = ''
  $('chart-top').style.display  = 'none'
  $('chart-time').style.display = 'none'
  window.scrollTo({ top: 0, behavior: 'instant' })
})

$('btn-print').addEventListener('click', () => window.print())
