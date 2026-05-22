import os
import uuid
import tempfile
from pathlib import Path

from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
from fastapi.responses import FileResponse

from analyzer import load_file, analyze

app = FastAPI(title="Analizador de Ventas", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Servir el frontend desde /
frontend_path = Path(__file__).parent.parent / "frontend"
if frontend_path.exists():
    app.mount("/static", StaticFiles(directory=str(frontend_path)), name="static")

    @app.get("/")
    def index():
        return FileResponse(str(frontend_path / "index.html"))


@app.post("/api/analyze")
async def analyze_file(file: UploadFile = File(...)):
    # Validar extensión
    allowed = {'.xlsx', '.xls', '.csv'}
    ext = Path(file.filename).suffix.lower()
    if ext not in allowed:
        raise HTTPException(400, f"Formato no soportado. Usa: {', '.join(allowed)}")

    # Guardar en temporal
    tmp = tempfile.NamedTemporaryFile(delete=False, suffix=ext)
    try:
        content = await file.read()
        if len(content) > 10 * 1024 * 1024:  # 10 MB máx
            raise HTTPException(400, "El archivo supera el límite de 10 MB.")
        tmp.write(content)
        tmp.flush()
        tmp.close()

        df = load_file(tmp.name)
        if df.empty:
            raise HTTPException(400, "El archivo está vacío o no tiene datos legibles.")

        result = analyze(df)
        return {"ok": True, "filename": file.filename, **result}

    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(500, f"Error procesando el archivo: {str(e)}")
    finally:
        os.unlink(tmp.name)


@app.get("/api/health")
def health():
    return {"status": "ok"}
