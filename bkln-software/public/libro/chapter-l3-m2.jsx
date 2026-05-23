// =============================================================
// chapter-l3-m2.jsx — Libro 3, Módulo 2: Bases de datos
// =============================================================

function ChapterL3M2({ onNav }) {
  const flat = flatTOC();
  const idx  = flat.findIndex(c => c.id === 'l3-m2');
  const prev = idx > 0 ? flat[idx - 1] : null;
  const next = idx < flat.length - 1 ? flat[idx + 1] : null;

  return (
    <article className="reader-inner">
      <ChapterHeader
        book="// libro 3 · del código al mundo real"
        module="módulo 02"
        time="≈ 65 min"
        title={<>Bases de datos</>}
        dek="Los archivos JSON se quedan cortos cuando los datos crecen. Las bases de datos resuelven eso: almacenamiento estructurado, consultas potentes y concurrencia sin dolor."
      />

      <p>
        En el módulo anterior guardaste datos en JSON. Funciona bien para
        configuraciones o datos pequeños — pero cuando tienes miles de registros,
        necesitas filtrar por múltiples criterios, o varios procesos leen y
        escriben a la vez, los archivos JSON se vuelven lentos e inseguros.
      </p>

      <p>
        Las bases de datos relacionales resuelven todos esos problemas.
        Python incluye <strong>SQLite</strong> en su librería estándar:
        una base de datos completa que vive en un único archivo (o en memoria).
        No necesitas instalar ningún servidor — perfecta para aprender, para
        apps locales y para prototipos.
      </p>

      <Callout kind="success" title="Todo funciona en el libro">
        SQLite está disponible en Pyodide. Todos los bloques ▶ Ejecutar
        de este módulo funcionan directamente aquí, sin instalar nada.
        Los datos viven en memoria (<code>:memory:</code>) y se reinician
        cada vez que pulsas Reiniciar.
      </Callout>

      {/* ── Sección 1: SQL básico ── */}
      <h2>El lenguaje SQL</h2>

      <p>
        SQL (Structured Query Language) es el idioma universal de las bases
        de datos relacionales. Los datos se organizan en <strong>tablas</strong>
        (como hojas de cálculo), con <strong>columnas</strong> de tipos fijos
        y <strong>filas</strong> de registros.
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 'var(--s-4)',
        margin: 'var(--s-5) 0',
      }}>
        {[
          { cmd: 'CREATE TABLE', desc: 'Crear una tabla nueva con sus columnas.' },
          { cmd: 'INSERT INTO',  desc: 'Añadir una fila de datos.' },
          { cmd: 'SELECT',       desc: 'Consultar y filtrar datos.' },
          { cmd: 'UPDATE',       desc: 'Modificar filas existentes.' },
          { cmd: 'DELETE',       desc: 'Eliminar filas.' },
          { cmd: 'DROP TABLE',   desc: 'Eliminar una tabla completa.' },
        ].map(({ cmd, desc }) => (
          <div key={cmd} style={{
            background: 'var(--paper-2)',
            border: '1px solid var(--border-soft)',
            borderRadius: 'var(--r-md)',
            padding: 'var(--s-3) var(--s-4)',
            display: 'flex',
            gap: 'var(--s-3)',
            alignItems: 'flex-start',
          }}>
            <code style={{
              fontFamily: 'var(--font-mono)',
              fontWeight: 700,
              fontSize: '0.8rem',
              color: 'var(--accent)',
              whiteSpace: 'nowrap',
              paddingTop: 2,
            }}>{cmd}</code>
            <span style={{ fontSize: '0.88rem', color: 'var(--ink-2)' }}>{desc}</span>
          </div>
        ))}
      </div>

      {/* ── Sección 2: sqlite3 ── */}
      <h2>El módulo sqlite3</h2>

      <p>
        Para usar SQLite desde Python importas el módulo <code>sqlite3</code>.
        El flujo siempre es el mismo: conectar → obtener cursor → ejecutar SQL
        → confirmar cambios → cerrar.
      </p>

      <CodeBlock code={`
import sqlite3

# Conectar (crea el archivo si no existe; :memory: para usar RAM)
conn = sqlite3.connect(":memory:")

# El cursor es quien ejecuta las consultas
cur = conn.cursor()

# Crear tabla
cur.execute("""
    CREATE TABLE IF NOT EXISTS productos (
        id       INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre   TEXT    NOT NULL,
        precio   REAL    NOT NULL,
        stock    INTEGER DEFAULT 0
    )
""")

# Insertar un registro
cur.execute("INSERT INTO productos (nombre, precio, stock) VALUES (?, ?, ?)",
            ("Teclado mecánico", 89.99, 15))

# Guardar los cambios
conn.commit()

# Consultar
cur.execute("SELECT * FROM productos")
filas = cur.fetchall()
print(filas)   # [(1, 'Teclado mecánico', 89.99, 15)]

conn.close()
      `} />

      <Callout kind="warn" title="Usa siempre parámetros ? — nunca f-strings">
        La forma segura de pasar valores a SQL es con <code>?</code> como
        marcador. Nunca construyas la consulta con f-strings o concatenación
        de strings — eso abre la puerta a inyección SQL.
        <CodeBlock hideCopy code={`
# ❌ Nunca hagas esto
cur.execute(f"SELECT * FROM usuarios WHERE nombre = '{nombre}'")

# ✓ Siempre así
cur.execute("SELECT * FROM usuarios WHERE nombre = ?", (nombre,))
        `} />
      </Callout>

      {/* ── Sección 3: context manager ── */}
      <h2>with — la forma correcta de conectar</h2>

      <p>
        Igual que con archivos, <code>with</code> garantiza que la conexión
        se cierra aunque haya un error. Además, <code>sqlite3</code> hace
        el <code>commit</code> automáticamente al salir del bloque:
      </p>

      <CodeBlock code={`
import sqlite3

with sqlite3.connect(":memory:") as conn:
    conn.row_factory = sqlite3.Row   # filas como diccionarios
    cur = conn.cursor()

    cur.execute("""
        CREATE TABLE tareas (
            id       INTEGER PRIMARY KEY AUTOINCREMENT,
            titulo   TEXT NOT NULL,
            hecha    INTEGER DEFAULT 0
        )
    """)

    tareas = [
        ("Estudiar SQLite", 1),
        ("Practicar ejercicios", 0),
        ("Hacer proyecto final", 0),
    ]
    cur.executemany(
        "INSERT INTO tareas (titulo, hecha) VALUES (?, ?)", tareas
    )

# Al salir del with: commit automático + conexión cerrada
      `} />

      <Callout kind="tip" title="row_factory = sqlite3.Row">
        Por defecto las filas son tuplas: <code>(1, 'algo', 0)</code>.
        Con <code>row_factory = sqlite3.Row</code> puedes acceder por nombre:
        <code> fila["titulo"]</code> en vez de <code>fila[1]</code>.
      </Callout>

      {/* ── Sección 4: SELECT ── */}
      <h2>Consultar datos con SELECT</h2>

      <p>
        SELECT es la instrucción más usada. Puedes filtrar con
        <code> WHERE</code>, ordenar con <code>ORDER BY</code>,
        limitar con <code>LIMIT</code> y agrupar con <code>GROUP BY</code>:
      </p>

      <CodeBlock code={`
import sqlite3

with sqlite3.connect(":memory:") as conn:
    conn.row_factory = sqlite3.Row
    cur = conn.cursor()

    cur.execute("""CREATE TABLE empleados (
        id   INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT, depto TEXT, salario REAL
    )""")
    cur.executemany("INSERT INTO empleados VALUES (NULL,?,?,?)", [
        ("Ana",   "Ingeniería", 52000),
        ("Luis",  "Marketing",  38000),
        ("Sara",  "Ingeniería", 61000),
        ("Pedro", "RRHH",       41000),
        ("Marta", "Marketing",  44000),
    ])

    # Filtrar + ordenar
    cur.execute("""
        SELECT nombre, salario
        FROM   empleados
        WHERE  depto = ? AND salario > ?
        ORDER  BY salario DESC
    """, ("Ingeniería", 50000))
    for fila in cur.fetchall():
        print(f"{fila['nombre']:10} {fila['salario']:>8.0f} €")

    # Agregaciones
    cur.execute("""
        SELECT depto, COUNT(*) AS total, AVG(salario) AS media
        FROM   empleados
        GROUP  BY depto
        ORDER  BY media DESC
    """)
    print("\nPor departamento:")
    for f in cur.fetchall():
        print(f"  {f['depto']:12} {f['total']} pers. · media {f['media']:,.0f} €")
      `} />

      <PyRunner
        initial={`import sqlite3

with sqlite3.connect(":memory:") as conn:
    conn.row_factory = sqlite3.Row
    cur = conn.cursor()

    # Crear e insertar
    cur.execute("""CREATE TABLE libros (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        titulo TEXT, autor TEXT, anyo INTEGER, paginas INTEGER
    )""")
    cur.executemany("INSERT INTO libros VALUES (NULL,?,?,?,?)", [
        ("El Quijote",         "Cervantes",    1605, 863),
        ("Cien años de soledad","García Márquez",1967, 471),
        ("1984",               "Orwell",       1949, 328),
        ("Dune",               "Herbert",      1965, 688),
        ("Fundación",          "Asimov",       1951, 244),
    ])

    # Libros con más de 400 páginas, ordenados por año
    print("Libros largos (>400 págs):")
    cur.execute("SELECT titulo, anyo, paginas FROM libros WHERE paginas > 400 ORDER BY anyo")
    for f in cur.fetchall():
        print(f"  {f['anyo']} · {f['titulo']} ({f['paginas']} págs.)")

    # El libro más corto
    cur.execute("SELECT titulo, paginas FROM libros ORDER BY paginas LIMIT 1")
    corto = cur.fetchone()
    print(f"\\nMás corto: {corto['titulo']} ({corto['paginas']} págs.)")
`}
        hint="Prueba a añadir más libros con executemany, o cambia el filtro WHERE para buscar por autor."
      />

      {/* ── Sección 5: UPDATE y DELETE ── */}
      <h2>Modificar y eliminar datos</h2>

      <CodeBlock code={`
import sqlite3

with sqlite3.connect(":memory:") as conn:
    cur = conn.cursor()
    cur.execute("CREATE TABLE stock (id INTEGER PRIMARY KEY, producto TEXT, qty INTEGER)")
    cur.executemany("INSERT INTO stock VALUES (?,?,?)", [
        (1, "Ratón",    50),
        (2, "Teclado",  30),
        (3, "Monitor",  10),
    ])

    # UPDATE — actualizar filas existentes
    cur.execute("UPDATE stock SET qty = qty - ? WHERE producto = ?", (5, "Ratón"))
    print("Tras vender 5 ratones:")
    for f in cur.execute("SELECT * FROM stock"):
        print(f"  {f[1]:10} {f[2]} uds")

    # DELETE — eliminar filas
    cur.execute("DELETE FROM stock WHERE qty < ?", (15,))
    print("\\nTras eliminar stock bajo (<15):")
    for f in cur.execute("SELECT * FROM stock"):
        print(f"  {f[1]:10} {f[2]} uds")

    # Ver cuántas filas afectó la última operación
    print(f"\\nFilas eliminadas: {cur.rowcount}")
      `} />

      {/* ── Sección 6: fetchone / fetchall / fetchmany ── */}
      <h2>Recuperar resultados</h2>

      <CodeBlock code={`
cur.fetchone()           # una fila (o None si no hay más)
cur.fetchall()           # todas las filas restantes como lista
cur.fetchmany(n)         # las siguientes n filas

# Iterar directamente sobre el cursor (memoria eficiente)
for fila in cur.execute("SELECT * FROM tabla"):
    procesar(fila)
      `} />

      <Callout kind="tip" title="fetchall() vs iterar el cursor">
        <code>fetchall()</code> carga todo en memoria de golpe — bien para
        conjuntos pequeños. Para tablas grandes, itera el cursor directamente:
        procesa fila a fila sin cargar todo a la vez.
      </Callout>

      {/* ── Sección 7: múltiples tablas ── */}
      <h2>Múltiples tablas y JOIN</h2>

      <p>
        La potencia real de las bases de datos relacionales está en conectar
        tablas mediante claves foráneas y consultas JOIN:
      </p>

      <PyRunner
        initial={`import sqlite3

with sqlite3.connect(":memory:") as conn:
    conn.row_factory = sqlite3.Row
    cur = conn.cursor()

    cur.execute("""CREATE TABLE clientes (
        id INTEGER PRIMARY KEY, nombre TEXT, ciudad TEXT
    )""")
    cur.execute("""CREATE TABLE pedidos (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        cliente_id INTEGER,
        producto TEXT,
        total REAL,
        FOREIGN KEY (cliente_id) REFERENCES clientes(id)
    )""")

    cur.executemany("INSERT INTO clientes VALUES (?,?,?)", [
        (1, "Ana García",  "Madrid"),
        (2, "Luis Ruiz",   "Barcelona"),
        (3, "Sara López",  "Sevilla"),
    ])
    cur.executemany("INSERT INTO pedidos VALUES (NULL,?,?,?)", [
        (1, "Portátil",  999.00),
        (1, "Ratón",      29.99),
        (2, "Teclado",    79.00),
        (3, "Monitor",   349.00),
        (3, "Webcam",     59.99),
    ])

    # JOIN: pedidos con nombre del cliente
    print("Todos los pedidos:")
    cur.execute("""
        SELECT c.nombre, p.producto, p.total
        FROM   pedidos p
        JOIN   clientes c ON p.cliente_id = c.id
        ORDER  BY c.nombre
    """)
    for f in cur.fetchall():
        print(f"  {f['nombre']:15} · {f['producto']:12} · {f['total']:>7.2f} €")

    # Total gastado por cliente
    print("\\nGasto por cliente:")
    cur.execute("""
        SELECT c.nombre, COUNT(p.id) AS pedidos, SUM(p.total) AS total
        FROM   clientes c
        LEFT   JOIN pedidos p ON p.cliente_id = c.id
        GROUP  BY c.id
        ORDER  BY total DESC
    """)
    for f in cur.fetchall():
        print(f"  {f['nombre']:15} {f['pedidos']} pedidos · {f['total'] or 0:.2f} €")
`}
        hint="Cambia JOIN por LEFT JOIN para ver también clientes sin pedidos."
      />

      {/* ── Sección 8: otras BBDD ── */}
      <h2>Más allá de SQLite</h2>

      <p>
        SQLite es perfecta para una app local o un prototipo. Para proyectos
        en producción con muchos usuarios existen bases de datos más potentes:
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: 'var(--s-4)',
        margin: 'var(--s-5) 0',
      }}>
        {[
          { name: 'PostgreSQL', pkg: 'psycopg2',  desc: 'La más potente. Open source. Ideal para producción.' },
          { name: 'MySQL',      pkg: 'mysql-connector-python', desc: 'Muy extendida. Popular en stacks web clásicos.' },
          { name: 'SQLAlchemy', pkg: 'sqlalchemy', desc: 'ORM que funciona con cualquier base de datos.' },
        ].map(({ name, pkg, desc }) => (
          <div key={name} style={{
            background: 'var(--paper-2)',
            border: '1px solid var(--border-soft)',
            borderRadius: 'var(--r-md)',
            padding: 'var(--s-4)',
          }}>
            <div style={{
              fontFamily: 'var(--font-mono)',
              fontWeight: 700,
              fontSize: '0.85rem',
              color: 'var(--accent)',
              marginBottom: 'var(--s-1)',
            }}>{name}</div>
            <code style={{ fontSize: '0.75rem', color: 'var(--ink-3)' }}>pip install {pkg}</code>
            <p style={{ fontSize: '0.88rem', color: 'var(--ink-2)', margin: 'var(--s-2) 0 0' }}>{desc}</p>
          </div>
        ))}
      </div>

      <p>
        Con SQLAlchemy (ORM) describes tus tablas como clases Python y
        haces consultas sin escribir SQL a mano:
      </p>

      <CodeBlock label="▸ local · python — SQLAlchemy" code={`
from sqlalchemy import create_engine, Column, Integer, String, Float
from sqlalchemy.orm import DeclarativeBase, Session

class Base(DeclarativeBase):
    pass

class Producto(Base):
    __tablename__ = "productos"
    id      = Column(Integer, primary_key=True)
    nombre  = Column(String,  nullable=False)
    precio  = Column(Float,   nullable=False)

engine = create_engine("sqlite:///tienda.db")
Base.metadata.create_all(engine)

with Session(engine) as session:
    session.add(Producto(nombre="Teclado", precio=79.99))
    session.commit()

    productos = session.query(Producto).filter(Producto.precio < 100).all()
    for p in productos:
        print(p.nombre, p.precio)
      `} />

      {/* ── Quiz ── */}
      <Quiz
        question="¿Por qué es peligroso construir consultas SQL con f-strings o concatenación?"
        options={[
          'Porque Python no permite f-strings con sqlite3.',
          'Porque permite inyección SQL: un usuario malicioso puede alterar la consulta.',
          'Porque las f-strings son más lentas que los parámetros ?.',
          'Porque sqlite3 solo acepta consultas en mayúsculas.',
        ]}
        correct={1}
        explanation={"La inyección SQL ocurre cuando un valor de usuario se inserta directamente en la consulta. Por ejemplo, si nombre = \"' OR '1'='1\", la condición WHERE se vuelve siempre verdadera. Los parámetros ? escapan los valores automáticamente."}
      />

      {/* ── Ejercicios ── */}
      <Exercise
        number={1}
        title="Crea y consulta una tabla de películas"
        difficulty="fácil"
        runner={{
          initial: `import sqlite3

with sqlite3.connect(":memory:") as conn:
    conn.row_factory = sqlite3.Row
    cur = conn.cursor()

    cur.execute("""
        CREATE TABLE peliculas (
            id      INTEGER PRIMARY KEY AUTOINCREMENT,
            titulo  TEXT    NOT NULL,
            director TEXT,
            anyo    INTEGER,
            nota    REAL
        )
    """)

    cur.executemany("INSERT INTO peliculas VALUES (NULL,?,?,?,?)", [
        ("El Padrino",    "Coppola",    1972, 9.2),
        ("Pulp Fiction",  "Tarantino",  1994, 8.9),
        ("Interstellar",  "Nolan",      2014, 8.6),
        ("Parásitos",     "Bong",       2019, 8.5),
        ("La La Land",    "Chazelle",   2016, 8.0),
        ("Oppenheimer",   "Nolan",      2023, 8.3),
    ])

    # 1. Películas con nota >= 8.5, ordenadas de mayor a menor
    print("Top películas:")
    cur.execute("SELECT titulo, nota FROM peliculas WHERE nota >= ? ORDER BY nota DESC", (8.5,))
    for f in cur.fetchall():
        print(f"  {f['nota']} · {f['titulo']}")

    # 2. Películas de Nolan
    print("\\nFilmografía de Nolan:")
    cur.execute("SELECT titulo, anyo FROM peliculas WHERE director = ? ORDER BY anyo", ("Nolan",))
    for f in cur.fetchall():
        print(f"  {f['anyo']} · {f['titulo']}")

    # 3. Nota media de todas las películas
    cur.execute("SELECT AVG(nota) FROM peliculas")
    media = cur.fetchone()[0]
    print(f"\\nNota media: {media:.2f}")
`,
          hint: 'Para la media puedes usar AVG() en SQL directamente, o calcularla en Python con sum/len.'
        }}
      >
        <p>Crea una tabla de películas, inserta datos y practica consultas con filtros y ORDER BY.</p>
      </Exercise>

      <Exercise
        number={2}
        title="Actualiza el inventario de una tienda"
        difficulty="fácil"
        runner={{
          initial: `import sqlite3

with sqlite3.connect(":memory:") as conn:
    conn.row_factory = sqlite3.Row
    cur = conn.cursor()

    cur.execute("""CREATE TABLE inventario (
        id INTEGER PRIMARY KEY, articulo TEXT, stock INTEGER, precio REAL
    )""")
    cur.executemany("INSERT INTO inventario VALUES (?,?,?,?)", [
        (1, "Mochila",     20, 45.00),
        (2, "Auriculares", 15, 89.99),
        (3, "Botella",     50, 22.50),
        (4, "Cuaderno",   100,  4.99),
        (5, "Bolígrafo",  200,  1.50),
    ])

    # Simula ventas: descuenta del stock
    ventas = [("Mochila", 5), ("Auriculares", 10), ("Botella", 30)]
    for articulo, cantidad in ventas:
        cur.execute("UPDATE inventario SET stock = stock - ? WHERE articulo = ?",
                    (cantidad, articulo))

    # Muestra artículos con stock bajo (< 10)
    print("⚠ Stock bajo:")
    cur.execute("SELECT articulo, stock FROM inventario WHERE stock < 10 ORDER BY stock")
    for f in cur.fetchall():
        print(f"  {f['articulo']:15} {f['stock']} uds")

    # Elimina artículos agotados
    cur.execute("DELETE FROM inventario WHERE stock <= 0")
    print(f"\\nEliminados: {cur.rowcount} artículos agotados")

    print("\\nInventario final:")
    for f in cur.execute("SELECT articulo, stock, precio FROM inventario ORDER BY articulo"):
        print(f"  {f['articulo']:15} {f['stock']:>3} uds · {f['precio']:.2f}€")
`,
          hint: 'UPDATE con stock = stock - ? es atómico: no necesitas leer el valor primero.'
        }}
      >
        <p>Practica UPDATE y DELETE gestionando el inventario de una tienda tras procesar ventas.</p>
      </Exercise>

      <Exercise
        number={3}
        title="Agenda de contactos con búsqueda"
        difficulty="media"
        runner={{
          initial: `import sqlite3

def crear_agenda(conn):
    conn.execute("""CREATE TABLE contactos (
        id    INTEGER PRIMARY KEY AUTOINCREMENT,
        nombre TEXT NOT NULL,
        email  TEXT UNIQUE,
        tel    TEXT,
        ciudad TEXT
    )""")

def agregar(conn, nombre, email, tel=None, ciudad=None):
    try:
        conn.execute(
            "INSERT INTO contactos (nombre, email, tel, ciudad) VALUES (?,?,?,?)",
            (nombre, email, tel, ciudad)
        )
        print(f"  ✓ Añadido: {nombre}")
    except sqlite3.IntegrityError:
        print(f"  ✗ Email duplicado: {email}")

def buscar(conn, termino):
    patron = f"%{termino}%"
    cur = conn.execute(
        "SELECT nombre, email, ciudad FROM contactos WHERE nombre LIKE ? OR ciudad LIKE ?",
        (patron, patron)
    )
    return cur.fetchall()

with sqlite3.connect(":memory:") as conn:
    conn.row_factory = sqlite3.Row
    crear_agenda(conn)

    print("Añadiendo contactos:")
    agregar(conn, "Ana García",   "ana@mail.com",  "612 000 001", "Madrid")
    agregar(conn, "Luis Martín",  "luis@mail.com", "612 000 002", "Barcelona")
    agregar(conn, "Sara López",   "sara@mail.com", "612 000 003", "Madrid")
    agregar(conn, "Ana García",   "ana@mail.com")  # duplicado

    print("\\nBúsqueda 'Madrid':")
    for c in buscar(conn, "Madrid"):
        print(f"  {c['nombre']:15} {c['email']}")

    print("\\nBúsqueda 'ana':")
    for c in buscar(conn, "ana"):
        print(f"  {c['nombre']:15} {c['ciudad']}")
`,
          hint: 'LIKE con % permite búsquedas parciales. UNIQUE en el email lanza IntegrityError al insertar duplicados.'
        }}
      >
        <p>
          Implementa una agenda de contactos con funciones para añadir y buscar,
          manejando emails duplicados con <code>IntegrityError</code>.
        </p>
      </Exercise>

      <Exercise
        number={4}
        title="Estadísticas con GROUP BY"
        difficulty="media"
        runner={{
          initial: `import sqlite3

with sqlite3.connect(":memory:") as conn:
    conn.row_factory = sqlite3.Row
    cur = conn.cursor()

    cur.execute("""CREATE TABLE ventas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        producto TEXT, categoria TEXT,
        cantidad INTEGER, precio_unit REAL,
        mes INTEGER
    )""")
    cur.executemany("INSERT INTO ventas VALUES (NULL,?,?,?,?,?)", [
        ("Portátil A", "Electrónica",  3, 899.00, 1),
        ("Ratón",      "Periféricos",  15, 29.99, 1),
        ("Portátil B", "Electrónica",  2, 1200.0, 2),
        ("Teclado",    "Periféricos",  8,  79.00, 2),
        ("Monitor",    "Electrónica",  5, 349.00, 2),
        ("Auriculares","Periféricos",  12, 89.99, 3),
        ("Tablet",     "Electrónica",  4, 499.00, 3),
        ("Ratón",      "Periféricos",  20, 29.99, 3),
    ])

    # Ingresos por categoría
    print("Ingresos por categoría:")
    cur.execute("""
        SELECT categoria,
               SUM(cantidad) AS unidades,
               SUM(cantidad * precio_unit) AS total
        FROM ventas
        GROUP BY categoria
        ORDER BY total DESC
    """)
    for f in cur.fetchall():
        print(f"  {f['categoria']:15} {f['unidades']:>4} uds · {f['total']:>8,.2f} €")

    # Mejor mes
    print("\\nIngresos por mes:")
    cur.execute("""
        SELECT mes, SUM(cantidad * precio_unit) AS total
        FROM ventas
        GROUP BY mes
        ORDER BY mes
    """)
    for f in cur.fetchall():
        print(f"  Mes {f['mes']}: {f['total']:>8,.2f} €")
`,
          hint: 'SUM(cantidad * precio_unit) calcula el ingreso total multiplicando directamente en SQL.'
        }}
      >
        <p>
          Calcula estadísticas de ventas por categoría y mes usando
          <code> GROUP BY</code>, <code>SUM</code> y <code>COUNT</code>.
        </p>
      </Exercise>

      <Exercise
        number={5}
        title="Sistema de notas con JOIN"
        difficulty="difícil"
        runner={{
          initial: `import sqlite3

with sqlite3.connect(":memory:") as conn:
    conn.row_factory = sqlite3.Row
    cur = conn.cursor()

    cur.execute("""CREATE TABLE alumnos (
        id INTEGER PRIMARY KEY, nombre TEXT, curso TEXT
    )""")
    cur.execute("""CREATE TABLE asignaturas (
        id INTEGER PRIMARY KEY, nombre TEXT, creditos INTEGER
    )""")
    cur.execute("""CREATE TABLE notas (
        alumno_id INTEGER, asignatura_id INTEGER, nota REAL,
        PRIMARY KEY (alumno_id, asignatura_id)
    )""")

    cur.executemany("INSERT INTO alumnos VALUES (?,?,?)", [
        (1, "Ana",   "DAM"), (2, "Luis",  "DAM"),
        (3, "Sara",  "DAW"), (4, "Pedro", "DAW"),
    ])
    cur.executemany("INSERT INTO asignaturas VALUES (?,?,?)", [
        (1, "Programación", 6), (2, "Bases de datos", 5), (3, "Redes", 4),
    ])
    cur.executemany("INSERT INTO notas VALUES (?,?,?)", [
        (1,1,9.0),(1,2,8.5),(1,3,7.0),
        (2,1,6.0),(2,2,7.5),(2,3,8.0),
        (3,1,8.0),(3,2,9.5),(3,3,6.5),
        (4,1,5.5),(4,2,6.0),(4,3,7.5),
    ])

    # Media por alumno
    print("Media por alumno:")
    cur.execute("""
        SELECT a.nombre, a.curso, ROUND(AVG(n.nota), 2) AS media
        FROM alumnos a
        JOIN notas n ON n.alumno_id = a.id
        GROUP BY a.id
        ORDER BY media DESC
    """)
    for f in cur.fetchall():
        print(f"  {f['nombre']:8} ({f['curso']}) → {f['media']}")

    # Mejor nota por asignatura
    print("\\nMejor nota por asignatura:")
    cur.execute("""
        SELECT s.nombre, a.nombre AS alumno, MAX(n.nota) AS nota
        FROM notas n
        JOIN alumnos a ON a.id = n.alumno_id
        JOIN asignaturas s ON s.id = n.asignatura_id
        GROUP BY n.asignatura_id
        ORDER BY s.nombre
    """)
    for f in cur.fetchall():
        print(f"  {f['nombre']:20} → {f['alumno']} ({f['nota']})")
`,
          hint: 'Cuando haces JOIN con varias tablas, usa aliases (a, n, s) para que las consultas sean más legibles.'
        }}
      >
        <p>
          Diseña un sistema de notas con tres tablas relacionadas y consultas
          JOIN para obtener estadísticas por alumno y por asignatura.
        </p>
      </Exercise>

      {/* ── Resumen ── */}
      <div style={{
        background: 'var(--paper-2)',
        border: '1px solid var(--border-soft)',
        borderRadius: 'var(--r-md)',
        padding: 'var(--s-5) var(--s-6)',
        margin: 'var(--s-6) 0',
      }}>
        <div className="eyebrow" style={{ marginBottom: 'var(--s-3)' }}>// resumen del módulo</div>
        <ul style={{ paddingLeft: '1.2em', margin: 0, lineHeight: 2 }}>
          <li><strong>sqlite3</strong> está en la librería estándar — no necesitas instalar nada.</li>
          <li><strong>with sqlite3.connect()</strong> gestiona la conexión y el commit automáticamente.</li>
          <li><strong>Siempre usa parámetros <code>?</code></strong> — nunca f-strings en SQL.</li>
          <li><strong>row_factory = sqlite3.Row</strong> permite acceder a columnas por nombre.</li>
          <li><strong>executemany()</strong> inserta múltiples filas de una lista eficientemente.</li>
          <li><strong>JOIN</strong> conecta tablas relacionadas; <strong>GROUP BY</strong> agrega datos.</li>
          <li>Para producción: <strong>PostgreSQL</strong> o <strong>SQLAlchemy</strong> (ORM).</li>
        </ul>
      </div>

      <PullQuote>
        Una base de datos bien diseñada no es solo almacenamiento —
        es la memoria estructurada de tu aplicación.
      </PullQuote>

      <ChapterNav
        prev={prev ? { id: prev.id, title: prev.title } : null}
        next={next ? { id: next.id, title: next.title } : null}
        onNav={onNav}
      />
    </article>
  );
}

window.ChapterL3M2 = ChapterL3M2;
