"""
Lógica de análisis de datos de ventas con pandas.
Detecta automáticamente columnas de fecha, producto, cantidad y precio.
"""

import pandas as pd
import json
from typing import Optional


# Palabras clave para detectar columnas por nombre
_DATE_KEYS    = ['fecha', 'date', 'día', 'dia', 'day', 'periodo', 'mes', 'month']
_PRODUCT_KEYS = ['producto', 'product', 'articulo', 'artículo', 'item', 'descripcion',
                 'descripción', 'nombre', 'name', 'concepto', 'servicio']
_QTY_KEYS     = ['cantidad', 'qty', 'quantity', 'unidades', 'units', 'cant', 'piezas']
_PRICE_KEYS   = ['precio', 'price', 'importe', 'total', 'monto', 'valor', 'value',
                 'venta', 'revenue', 'ingreso', 'amount']


def _match_col(columns: list[str], keywords: list[str]) -> Optional[str]:
    """Devuelve la primera columna cuyo nombre contenga alguna keyword."""
    for col in columns:
        col_lower = col.lower().strip()
        if any(k in col_lower for k in keywords):
            return col
    return None


def _safe_numeric(series: pd.Series) -> pd.Series:
    """Convierte una serie a numérico eliminando símbolos de moneda."""
    return pd.to_numeric(
        series.astype(str).str.replace(r'[^\d.,\-]', '', regex=True).str.replace(',', '.'),
        errors='coerce'
    )


def load_file(path: str) -> pd.DataFrame:
    """Carga Excel (.xlsx/.xls) o CSV."""
    lower = path.lower()
    if lower.endswith('.csv'):
        # Intenta detectar separador automáticamente
        return pd.read_csv(path, sep=None, engine='python', encoding='utf-8-sig')
    else:
        return pd.read_excel(path, engine='openpyxl')


def analyze(df: pd.DataFrame) -> dict:
    """
    Recibe un DataFrame y devuelve un dict con todas las métricas e
    información para las gráficas del frontend.
    """
    cols = list(df.columns)

    date_col    = _match_col(cols, _DATE_KEYS)
    product_col = _match_col(cols, _PRODUCT_KEYS)
    qty_col     = _match_col(cols, _QTY_KEYS)
    price_col   = _match_col(cols, _PRICE_KEYS)

    # Limpiar columnas numéricas
    if qty_col:
        df[qty_col] = _safe_numeric(df[qty_col])
    if price_col:
        df[price_col] = _safe_numeric(df[price_col])

    total_rows = len(df)

    # ── Métricas principales ──────────────────────────────────────────────
    total_revenue = float(df[price_col].sum()) if price_col else None
    total_units   = float(df[qty_col].sum())   if qty_col   else None
    avg_ticket    = (total_revenue / total_rows) if (total_revenue and total_rows) else None

    # ── Top productos ─────────────────────────────────────────────────────
    top_products = []
    if product_col and price_col:
        grp = (
            df.groupby(product_col)[price_col]
            .sum()
            .sort_values(ascending=False)
            .head(8)
        )
        top_products = [
            {'name': str(k), 'value': round(float(v), 2)}
            for k, v in grp.items()
        ]
    elif product_col and qty_col:
        grp = (
            df.groupby(product_col)[qty_col]
            .sum()
            .sort_values(ascending=False)
            .head(8)
        )
        top_products = [
            {'name': str(k), 'value': round(float(v), 2)}
            for k, v in grp.items()
        ]

    # ── Ventas por fecha ──────────────────────────────────────────────────
    sales_over_time = []
    if date_col and price_col:
        df['_date'] = pd.to_datetime(df[date_col], dayfirst=True, errors='coerce')
        df_valid = df.dropna(subset=['_date'])
        if not df_valid.empty:
            grp = (
                df_valid.groupby(df_valid['_date'].dt.date)[price_col]
                .sum()
                .sort_index()
            )
            sales_over_time = [
                {'date': str(k), 'value': round(float(v), 2)}
                for k, v in grp.items()
            ]

    # ── Columnas detectadas (para mostrar al usuario) ─────────────────────
    detected = {
        'fecha':    date_col,
        'producto': product_col,
        'cantidad': qty_col,
        'precio':   price_col,
    }

    return {
        'rows':            total_rows,
        'total_revenue':   round(total_revenue, 2) if total_revenue is not None else None,
        'total_units':     round(total_units, 2)   if total_units   is not None else None,
        'avg_ticket':      round(avg_ticket, 2)    if avg_ticket    is not None else None,
        'top_products':    top_products,
        'sales_over_time': sales_over_time,
        'columns':         cols,
        'detected':        detected,
    }
