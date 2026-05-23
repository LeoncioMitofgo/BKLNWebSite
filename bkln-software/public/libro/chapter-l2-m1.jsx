// =============================================================
// chapter-l2-m1.jsx — Libro 2, Módulo 1: Diccionarios y conjuntos
// =============================================================

function ChapterL2M1({ onNav }) {
  return (
    <article className="reader-inner">
      <ChapterHeader
        book="// libro 2 · programando con estructura"
        module="módulo 01"
        time="≈ 50 min"
        title={<>Diccionarios y <em>conjuntos</em></>}
        dek="Las listas guardan cosas en orden. Los diccionarios las guardan con nombre. Es la diferencia entre una caja numerada y un archivador con pestañas."
      />

      <p>
        En el Libro 1 aprendiste a guardar colecciones de datos en listas. Las listas son perfectas
        cuando el <em>orden</em> importa: el primer elemento, el segundo, el último. Pero a veces
        el orden no es lo que necesitas — lo que necesitas es <strong>acceder a un valor por su nombre</strong>.
      </p>

      <p>
        Piensa en un contacto de teléfono: no te interesa que "nombre" sea el elemento 0 y "teléfono"
        sea el elemento 1. Lo que te interesa es preguntar <em>"dame el teléfono de este contacto"</em>
        directamente, sin contar posiciones. Para eso existen los <strong>diccionarios</strong>.
      </p>

      <h2>¿Qué es un diccionario?</h2>

      <p>
        Un <strong>diccionario</strong> es una colección de pares <em>clave → valor</em>. Cada valor
        tiene un nombre único (la clave), y accedes al valor dándole la clave — no un número de posición.
      </p>

      <CodeBlock code={`# Una lista guardaba esto así:
contacto_lista = ["Ana", "ana@email.com", "+34600123456"]
# Para el teléfono: contacto_lista[2]  — hay que recordar el índice

# Un diccionario lo guarda así:
contacto = {
    "nombre": "Ana",
    "email":  "ana@email.com",
    "tel":    "+34600123456",
}
# Para el teléfono: contacto["tel"]  — directo, sin contar`} />

      <p>
        La sintaxis usa llaves <code>{'{}'}</code>. Cada par va como <code>clave: valor</code>,
        separado por comas. Las claves casi siempre son cadenas de texto, aunque pueden ser
        enteros u otros tipos inmutables.
      </p>

      <Callout kind="info" title="Las claves son únicas">
        Un diccionario no puede tener dos entradas con la misma clave. Si asignas un valor
        a una clave que ya existe, el valor anterior se sobreescribe. Las claves funcionan
        como los nombres de las variables: únicos dentro de su espacio.
      </Callout>

      <h2>Crear un diccionario</h2>

      <CodeBlock code={`# Diccionario literal
persona = {"nombre": "Luis", "edad": 28, "activo": True}

# Diccionario vacío (para ir llenando)
config = {}

# También se puede con dict() y argumentos por nombre
punto = dict(x=10, y=20)
print(punto)   # {'x': 10, 'y': 20}

# Los valores pueden ser de cualquier tipo
perfil = {
    "usuario":  "pedro92",
    "puntos":   1500,
    "niveles":  [1, 2, 3, 5],   # incluso una lista
    "premium":  False,
}`} />

      <ReplOutput>{`{'x': 10, 'y': 20}`}</ReplOutput>

      <h2>Acceder a valores</h2>

      <p>Para leer un valor, usas la clave entre corchetes — igual que con los índices de una lista, pero con nombres:</p>

      <CodeBlock code={`persona = {"nombre": "Luis", "edad": 28, "ciudad": "Madrid"}

print(persona["nombre"])    # Luis
print(persona["edad"])      # 28

# Clave inexistente → error
print(persona["email"])     # 💥 KeyError: 'email'`} />

      <ReplOutput>{`Luis
28
KeyError: 'email'`}</ReplOutput>

      <h3>El método <code>.get()</code>: acceso seguro</h3>

      <p>
        Cuando no estás seguro de si una clave existe, usar <code>[]</code> puede explotar con
        un <code>KeyError</code>. El método <code>.get()</code> devuelve un valor por defecto
        en lugar de lanzar el error:
      </p>

      <CodeBlock code={`persona = {"nombre": "Luis", "edad": 28}

# Con corchetes: explota si la clave no existe
# persona["email"]  ← KeyError

# Con .get(): devuelve None si no existe
print(persona.get("email"))             # None

# O el valor que tú elijas como "por defecto"
print(persona.get("email", "sin email"))   # sin email
print(persona.get("nombre", "sin nombre")) # Luis`} />

      <ReplOutput>{`None
sin email
Luis`}</ReplOutput>

      <Callout kind="tip" title=".get() es tu mejor amigo con datos externos">
        Cuando recibes datos de una API, un archivo JSON o un formulario, nunca sabes con
        certeza qué campos vienen. Usar <code>.get(clave, valor_por_defecto)</code> hace tu
        código robusto sin necesidad de comprobar si la clave existe antes.
      </Callout>

      <Quiz
        question='Dado: d = {"a": 1, "b": 2}. ¿Qué devuelve d.get("c", 0) ?'
        options={['KeyError', '0', 'None', '""']}
        correct={1}
        explanation='.get() acepta un segundo argumento que es el valor por defecto. Como "c" no está en el diccionario, devuelve el default que le pasamos: 0. Si no le pasáramos default, devolvería None.'
      />

      <h2>Modificar un diccionario</h2>

      <p>Los diccionarios son <strong>mutables</strong>: puedes añadir, cambiar y eliminar entradas:</p>

      <CodeBlock code={`persona = {"nombre": "Luis", "edad": 28}

# Añadir una clave nueva
persona["email"] = "luis@email.com"

# Cambiar el valor de una clave existente
persona["edad"] = 29

# Eliminar una clave con del
del persona["email"]

# Eliminar y obtener el valor con .pop()
edad = persona.pop("edad")
print(edad)       # 29
print(persona)    # {'nombre': 'Luis'}`} />

      <ReplOutput>{`29
{'nombre': 'Luis'}`}</ReplOutput>

      <Callout kind="warn" title="¡Cuidado! del no avisa si la clave no existe">
        <code>del d["clave"]</code> lanza <code>KeyError</code> si la clave no está.
        Si no estás seguro, usa <code>d.pop("clave", None)</code>: elimina si existe,
        devuelve <code>None</code> (o lo que le pases) si no.
      </Callout>

      <h2>Iterar sobre un diccionario</h2>

      <p>
        Hay tres formas de recorrer un diccionario con un bucle <code>for</code>, según qué
        te interese:
      </p>

      <CodeBlock code={`precios = {"manzana": 1.20, "pera": 0.90, "kiwi": 2.50}

# 1) Solo las claves (comportamiento por defecto)
for producto in precios:
    print(producto)

print("---")

# 2) Solo los valores
for precio in precios.values():
    print(precio)

print("---")

# 3) Clave Y valor a la vez — el más usado
for producto, precio in precios.items():
    print(f"{producto}: {precio} €")`} />

      <ReplOutput>{`manzana
pera
kiwi
---
1.2
0.9
2.5
---
manzana: 1.2 €
pera: 0.9 €
kiwi: 2.5 €`}</ReplOutput>

      <Callout kind="info" title="Los diccionarios mantienen el orden de inserción">
        Desde Python 3.7, los diccionarios <strong>recuerdan el orden en que añadiste
        las claves</strong>. Al iterarlos, los elementos aparecen en ese mismo orden.
        En versiones anteriores no había garantía de orden — por eso lo verás mencionado
        en código antiguo.
      </Callout>

      <h2>Métodos esenciales</h2>

      <div style={{
        margin: 'var(--s-5) 0',
        background: 'var(--paper-2)',
        border: '1px solid var(--border-soft)',
        borderRadius: 'var(--r-md)',
        overflow: 'hidden',
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.92rem' }}>
          <thead>
            <tr style={{ background: 'var(--paper-3)', textAlign: 'left' }}>
              <th style={dThStyle}>Método</th>
              <th style={dThStyle}>Hace</th>
              <th style={dThStyle}>Ejemplo</th>
            </tr>
          </thead>
          <tbody>
            <DRow m=".get(k, d)" w="Valor de k, o d si no existe" e='d.get("x", 0)' />
            <DRow m=".keys()" w="Vista de todas las claves" e='list(d.keys())' />
            <DRow m=".values()" w="Vista de todos los valores" e='list(d.values())' />
            <DRow m=".items()" w="Vista de pares (clave, valor)" e='for k, v in d.items()' />
            <DRow m=".pop(k, d)" w="Elimina k y devuelve su valor" e='d.pop("x", None)' />
            <DRow m=".update(otro)" w="Fusiona otro dict en este" e='d.update({"y": 2})' />
            <DRow m=".copy()" w="Copia superficial del diccionario" e='copia = d.copy()' />
            <DRow m=".clear()" w="Vacía el diccionario" e='d.clear()' last />
          </tbody>
        </table>
      </div>

      <h3>El método <code>.update()</code>: fusionar diccionarios</h3>

      <p>
        <code>.update()</code> copia todas las claves de otro diccionario en el actual.
        Si coincide alguna clave, el valor nuevo sobreescribe al viejo:
      </p>

      <CodeBlock code={`base = {"nombre": "Ana", "edad": 25}
extras = {"ciudad": "Madrid", "edad": 26}   # "edad" ya existe en base

base.update(extras)
print(base)
# {'nombre': 'Ana', 'edad': 26, 'ciudad': 'Madrid'}`} />

      <ReplOutput>{`{'nombre': 'Ana', 'edad': 26, 'ciudad': 'Madrid'}`}</ReplOutput>

      <p>
        También puedes fusionar con el operador <code>|</code> (Python 3.9+), que crea
        un diccionario nuevo en lugar de modificar el original:
      </p>

      <CodeBlock code={`a = {"x": 1, "y": 2}
b = {"y": 99, "z": 3}

c = a | b          # nuevo diccionario
print(c)           # {'x': 1, 'y': 99, 'z': 3}
print(a)           # {'x': 1, 'y': 2}  ← sin cambios`} />

      <ReplOutput>{`{'x': 1, 'y': 99, 'z': 3}
{'x': 1, 'y': 2}`}</ReplOutput>

      <h2>Diccionarios anidados</h2>

      <p>
        El valor de una clave puede ser otro diccionario. Es la forma natural de representar
        estructuras de datos del mundo real (un usuario con su dirección, un producto con
        sus variantes, un JSON de una API):
      </p>

      <CodeBlock code={`usuario = {
    "nombre": "Ana",
    "edad": 25,
    "direccion": {
        "calle": "Gran Vía, 10",
        "ciudad": "Madrid",
        "cp": "28013",
    },
    "intereses": ["Python", "ciclismo", "fotografía"],
}

# Acceder en profundidad
print(usuario["direccion"]["ciudad"])    # Madrid
print(usuario["intereses"][0])          # Python`} />

      <ReplOutput>{`Madrid
Python`}</ReplOutput>

      <Callout kind="tip" title="No anides más de 2-3 niveles">
        Diccionarios muy anidados se vuelven difíciles de leer y mantener. Si te encuentras
        con cuatro o cinco niveles, probablemente hay una forma mejor de organizar los datos
        — con clases (Módulo 3) o con un diseño más plano.
      </Callout>

      <PyRunner
        initial={`# Experimenta con diccionarios
agenda = {}

# Añade tres contactos
agenda["Ana"] = {"tel": "600111222", "ciudad": "Madrid"}
agenda["Luis"] = {"tel": "600333444", "ciudad": "Barcelona"}
agenda["Sofía"] = {"tel": "600555666", "ciudad": "Madrid"}

# Busca solo los que viven en Madrid
print("Contactos en Madrid:")
for nombre, datos in agenda.items():
    if datos["ciudad"] == "Madrid":
        print(f"  {nombre}: {datos['tel']}")`}
      />

      <h2>Conjuntos (<code>set</code>)</h2>

      <p>
        Un <strong>conjunto</strong> es una colección <em>sin orden</em> y <em>sin duplicados</em>.
        Si una lista es como una fila de cajas numeradas, un conjunto es como una bolsa: puedes meter
        cosas, sacarlas, preguntar si algo está dentro, pero no hay posiciones ni elementos repetidos.
      </p>

      <CodeBlock code={`# Crear un conjunto con llaves (sin claves, solo valores)
colores = {"rojo", "verde", "azul"}
print(colores)          # {'rojo', 'verde', 'azul'} — orden no garantizado

# Crear desde una lista — elimina duplicados automáticamente
numeros = set([1, 2, 2, 3, 3, 3, 4])
print(numeros)          # {1, 2, 3, 4}

# Conjunto vacío — ¡ojo! {} crea un dict vacío, no un set vacío
vacio = set()
print(type(vacio))      # <class 'set'>`} />

      <ReplOutput>{`{'rojo', 'verde', 'azul'}
{1, 2, 3, 4}
<class 'set'>`}</ReplOutput>

      <Callout kind="warn" title="¡Cuidado! {} es un diccionario vacío, no un conjunto">
        Para crear un conjunto vacío siempre usa <code>set()</code>. Si escribes <code>{'{}'}</code>,
        Python lo interpreta como un diccionario vacío. Es una trampa clásica del lenguaje.
      </Callout>

      <h3>Operaciones básicas</h3>

      <CodeBlock code={`frutas = {"manzana", "pera", "kiwi"}

# Comprobar si algo está dentro — O(1), muy rápido
print("pera" in frutas)        # True
print("uva" in frutas)         # False

# Añadir y eliminar
frutas.add("uva")
frutas.discard("kiwi")         # no da error si no existe
print(frutas)

# Cuántos elementos
print(len(frutas))             # 3`} />

      <ReplOutput>{`True
False
{'manzana', 'pera', 'uva'}
3`}</ReplOutput>

      <h3>Operaciones de conjunto — la magia real</h3>

      <p>
        Donde los conjuntos brillan es en las operaciones matemáticas entre dos colecciones.
        Son exactamente las operaciones de teoría de conjuntos que conoces del colegio:
      </p>

      <CodeBlock code={`a = {1, 2, 3, 4, 5}
b = {4, 5, 6, 7, 8}

# Unión — todos los elementos de ambos (sin duplicados)
print(a | b)          # {1, 2, 3, 4, 5, 6, 7, 8}

# Intersección — solo los que están en ambos
print(a & b)          # {4, 5}

# Diferencia — los de a que NO están en b
print(a - b)          # {1, 2, 3}

# Diferencia simétrica — los que están en uno u otro, pero no en ambos
print(a ^ b)          # {1, 2, 3, 6, 7, 8}`} />

      <ReplOutput>{`{1, 2, 3, 4, 5, 6, 7, 8}
{4, 5}
{1, 2, 3}
{1, 2, 3, 6, 7, 8}`}</ReplOutput>

      <Callout kind="info" title="Caso de uso clásico: eliminar duplicados de una lista">
        El truco más usado de los conjuntos en la práctica es precisamente este:
        convertir una lista con duplicados en una lista sin ellos.
        <CodeBlock hideCopy code={`# Lista con repeticiones
emails = ["a@x.com", "b@x.com", "a@x.com", "c@x.com", "b@x.com"]

# Eliminar duplicados (y volver a lista si es necesario)
unicos = list(set(emails))
print(len(unicos))   # 3`} />
        Ojo: el resultado no mantiene el orden original. Si el orden importa,
        en el Libro 2 verás alternativas.
      </Callout>

      <Quiz
        question='¿Cuál es el resultado de {1, 2, 3} & {2, 3, 4} ?'
        options={['{1, 2, 3, 4}', '{2, 3}', '{1, 4}', '{1, 2, 3, 2, 3, 4}']}
        correct={1}
        explanation='El operador & es la intersección: devuelve los elementos que están en AMBOS conjuntos. 2 y 3 aparecen en los dos; 1 solo está en el primero y 4 solo en el segundo.'
      />

      <h3>¿Cuándo usar un conjunto en lugar de una lista?</h3>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 'var(--s-4)',
        margin: 'var(--s-5) 0',
      }} className="ds-grid">
        <div style={dsCardStyle}>
          <div style={dsHeadStyle('var(--accent)')}>Lista [ ]</div>
          <ul style={{ margin: 0, paddingLeft: '1.2em', fontSize: '0.92rem', color: 'var(--ink-2)' }}>
            <li>El orden importa</li>
            <li>Puede haber duplicados</li>
            <li>Acceso por posición (<code>[i]</code>)</li>
            <li>Secuencias, historial, filas</li>
          </ul>
        </div>
        <div style={dsCardStyle}>
          <div style={dsHeadStyle('var(--highlight)')}>Conjunto {'{}'}</div>
          <ul style={{ margin: 0, paddingLeft: '1.2em', fontSize: '0.92rem', color: 'var(--ink-2)' }}>
            <li>El orden no importa</li>
            <li>Sin duplicados, siempre</li>
            <li>Comprobar pertenencia ultra-rápido</li>
            <li>Tags, permisos, IDs únicos</li>
          </ul>
        </div>
        <style>{`@media (max-width: 720px) { .ds-grid { grid-template-columns: 1fr !important; } }`}</style>
      </div>

      <p>
        La diferencia de velocidad al comprobar pertenencia (<code>x in coleccion</code>) es
        enorme: en una lista Python revisa elemento por elemento (lento en listas grandes), mientras
        que en un conjunto usa una tabla hash — responde en tiempo constante sin importar el tamaño.
      </p>

      <h2>Ejercicios</h2>

      <p style={{ color: 'var(--ink-2)' }}>
        Cinco ejercicios. Los primeros tres consolidan diccionarios; los últimos dos combinan
        todo lo del módulo con lógica real.
      </p>

      <Exercise
        number="1.1"
        title="Agenda de contactos"
        difficulty="fácil"
        runner={{
          initial: `# Crea un diccionario "agenda" con al menos tres contactos.
# Cada clave es el nombre (str) y cada valor es el teléfono (str).
#
# Después:
#   1) Imprime el teléfono de un contacto por su nombre.
#   2) Añade un contacto nuevo.
#   3) Recorre la agenda con .items() e imprime cada par.

`,
          hint: 'agenda = {"Ana": "600...", "Luis": "700..."}. Para el teléfono: agenda["Ana"]. Para añadir: agenda["nuevo"] = "...". Para recorrer: for nombre, tel in agenda.items(): print(f"...").',
          solution: {
            code: `agenda = {
    "Ana":   "600111222",
    "Luis":  "600333444",
    "Sofía": "600555666",
}

print(agenda["Ana"])

agenda["Carlos"] = "600777888"

for nombre, tel in agenda.items():
    print(f"{nombre}: {tel}")`,
            explanation: 'El patrón clave→valor hace que acceder por nombre sea natural e instantáneo. .items() es la forma idiomática de recorrer un diccionario cuando necesitas ambas partes.',
          },
        }}
      >
        <p>El primer diccionario real: una agenda de contactos.</p>
      </Exercise>

      <Exercise
        number="1.2"
        title="Contar palabras"
        difficulty="media"
        runner={{
          initial: `# Dada esta cadena, cuenta cuántas veces
# aparece cada palabra (ignorando mayúsculas).
#
# Salida esperada (puede variar el orden):
#   el: 2
#   gato: 2
#   ...

texto = "el gato come el pescado del gato goloso"

# Pista: split() parte el texto en palabras.
# Para cada palabra, si ya está en el dict, suma 1.
# Si no está, ponla con valor 1.

`,
          hint: 'conteo = {}. Recorre las palabras con for palabra in texto.split(): (convertida a minúsculas con .lower()). Dentro: conteo[palabra] = conteo.get(palabra, 0) + 1',
          solution: {
            code: `texto = "el gato come el pescado del gato goloso"
conteo = {}

for palabra in texto.lower().split():
    conteo[palabra] = conteo.get(palabra, 0) + 1

for palabra, n in sorted(conteo.items()):
    print(f"{palabra}: {n}")`,
            explanation: 'El truco clave: conteo.get(palabra, 0) + 1. Si la palabra ya existe, suma 1 a su conteo actual. Si no existe, .get devuelve 0 y se guarda como 1. Este patrón de "contador con .get" es uno de los más usados en Python.',
          },
        }}
      >
        <p>El patrón del contador con diccionarios. Aparece en casi todo el análisis de texto.</p>
      </Exercise>

      <Exercise
        number="1.3"
        title="Inventario con precios"
        difficulty="media"
        runner={{
          initial: `# Tienes este inventario de productos con precio y stock.
# Escribe código que:
#   1) Calcule el valor total del inventario (precio * stock de cada producto).
#   2) Imprima los productos con stock = 0 (agotados).
#   3) Imprima el producto más caro.

inventario = {
    "manzana": {"precio": 1.20, "stock": 50},
    "pera":    {"precio": 0.90, "stock":  0},
    "kiwi":    {"precio": 2.50, "stock": 30},
    "mango":   {"precio": 3.80, "stock":  0},
    "uva":     {"precio": 1.10, "stock": 80},
}

`,
          hint: 'Para el total: acumulador + precio * stock en un for. Para agotados: if datos["stock"] == 0. Para el más caro: guarda el nombre y precio del máximo conforme recorres (patrón del máximo del Módulo 6 del Libro 1).',
          solution: {
            code: `inventario = {
    "manzana": {"precio": 1.20, "stock": 50},
    "pera":    {"precio": 0.90, "stock":  0},
    "kiwi":    {"precio": 2.50, "stock": 30},
    "mango":   {"precio": 3.80, "stock":  0},
    "uva":     {"precio": 1.10, "stock": 80},
}

total = 0
agotados = []
mas_caro = None
precio_max = 0

for nombre, datos in inventario.items():
    total += datos["precio"] * datos["stock"]
    if datos["stock"] == 0:
        agotados.append(nombre)
    if datos["precio"] > precio_max:
        precio_max = datos["precio"]
        mas_caro = nombre

print(f"Valor total del inventario: {total:.2f} €")
print(f"Productos agotados: {', '.join(agotados)}")
print(f"Producto más caro: {mas_caro} ({precio_max:.2f} €)")`,
            explanation: 'Los diccionarios anidados (dict de dicts) son la estructura más común cuando trabajas con datos del mundo real — APIs, JSON, bases de datos. Este ejercicio imita exactamente ese patrón.',
          },
        }}
      >
        <p>Diccionarios anidados con lógica de negocio real.</p>
      </Exercise>

      <Exercise
        number="1.4"
        title="Intersección de intereses"
        difficulty="media"
        runner={{
          initial: `# Dos usuarios tienen listas de intereses.
# Usa conjuntos para encontrar:
#   1) Intereses en común.
#   2) Intereses exclusivos de cada uno (no compartidos).
#   3) Todos los intereses combinados (sin duplicados).

ana   = ["Python", "ciclismo", "fotografía", "viajes", "cocina"]
pedro = ["JavaScript", "ciclismo", "viajes", "música", "fotografía"]

`,
          hint: 'Convierte las listas a set con set(...). Después usa &, - y | para obtener cada resultado. Convierte de vuelta a list o sorted() para mostrar.',
          solution: {
            code: `ana   = {"Python", "ciclismo", "fotografía", "viajes", "cocina"}
pedro = {"JavaScript", "ciclismo", "viajes", "música", "fotografía"}

comunes      = ana & pedro
solo_ana     = ana - pedro
solo_pedro   = pedro - ana
todos        = ana | pedro

print("En común:", sorted(comunes))
print("Solo Ana:", sorted(solo_ana))
print("Solo Pedro:", sorted(solo_pedro))
print("Todos:", sorted(todos))`,
            explanation: 'Las operaciones de conjuntos resuelven en una línea lo que con listas requeriría bucles anidados. Cualquier problema de "quién tiene X pero no Y" es candidato a conjuntos.',
          },
        }}
      >
        <p>Conjuntos en acción: un caso de uso clásico del mundo real.</p>
      </Exercise>

      <Exercise
        number="1.5"
        title="Mini-traductor"
        difficulty="media"
        runner={{
          initial: `# Construye un mini-traductor inglés → español.
#
# El programa debe:
#   1) Usar un diccionario como "base de datos" de palabras.
#   2) Pedir una palabra al usuario en un bucle.
#   3) Si la conoce, mostrar la traducción.
#   4) Si no la conoce, decirlo.
#   5) Si el usuario escribe "salir", terminar.
#
# Incluye al menos 8 palabras en tu diccionario.

`,
          hint: 'diccionario = {"hello": "hola", "world": "mundo", ...}. Bucle while True: palabra = input(...).strip().lower(). Comprobar con .get(palabra) o con "in". Para salir: if palabra == "salir": break.',
          solution: {
            code: `diccionario = {
    "hello":    "hola",
    "world":    "mundo",
    "cat":      "gato",
    "dog":      "perro",
    "house":    "casa",
    "water":    "agua",
    "fire":     "fuego",
    "book":     "libro",
    "computer": "computadora",
}

print("Mini-traductor inglés → español")
print('Escribe "salir" para terminar.')

while True:
    palabra = input("Palabra en inglés: ").strip().lower()
    if palabra == "salir":
        print("¡Hasta luego!")
        break
    traduccion = diccionario.get(palabra)
    if traduccion:
        print(f"  → {traduccion}")
    else:
        print(f'  No conozco "{palabra}".')`,
            explanation: 'Un diccionario como base de datos de búsqueda es uno de los patrones más comunes en programación. La clave es el término de búsqueda, el valor es lo que devuelves. .get() aquí es perfecto: si no está, devuelve None, que en un if se evalúa como False.',
          },
        }}
      >
        <p>Un programa interactivo real usando un diccionario como base de datos.</p>
      </Exercise>

      <h2>Resumen del módulo</h2>

      <div style={{
        background: 'var(--paper-2)',
        border: '1px solid var(--border-soft)',
        borderRadius: 'var(--r-md)',
        padding: 'var(--s-5) var(--s-6)',
        margin: 'var(--s-5) 0',
      }}>
        <div className="eyebrow" style={{ marginBottom: 'var(--s-3)' }}>// lo importante en una página</div>
        <ul style={{ paddingLeft: '1.2em', margin: 0 }}>
          <li><strong>Diccionario</strong>: colección de pares <code>clave: valor</code>. Se crea con <code>{`{}`}</code>.</li>
          <li>Acceso: <code>d["clave"]</code> (error si no existe) o <code>d.get("clave", default)</code> (seguro).</li>
          <li>Modificar: <code>d["k"] = v</code> añade o sobreescribe. <code>del d["k"]</code> o <code>d.pop("k")</code> eliminan.</li>
          <li>Iterar: <code>.keys()</code>, <code>.values()</code>, <code>.items()</code>. El más usado: <code>for k, v in d.items()</code>.</li>
          <li><code>.update(otro)</code> fusiona un diccionario en otro. <code>a | b</code> crea uno nuevo.</li>
          <li>Desde Python 3.7, los dicts <strong>mantienen el orden de inserción</strong>.</li>
          <li><strong>Conjunto</strong> (<code>set</code>): sin orden, sin duplicados. Se crea con <code>{`{v1, v2}`}</code> o <code>set()</code>.</li>
          <li>Operaciones: <code>|</code> unión, <code>&amp;</code> intersección, <code>-</code> diferencia, <code>^</code> diferencia simétrica.</li>
          <li><code>x in conjunto</code> es <strong>muy rápido</strong> (tiempo constante). Ideal para comprobar pertenencia.</li>
          <li>Truco clásico: <code>list(set(lista))</code> elimina duplicados de una lista.</li>
        </ul>
      </div>

      <PullQuote>
        Con listas, diccionarios y conjuntos ya puedes modelar casi cualquier dato del
        mundo real. En el próximo módulo, las funciones se vuelven mucho más poderosas:
        <em> lambdas, *args, **kwargs</em> y los patrones que usa el código profesional.
      </PullQuote>

      <ChapterNav
        prev={{ id: 'l1-m8', title: 'Proyecto final básico' }}
        next={{ id: 'l2-m2', title: 'Funciones avanzadas' }}
        onNav={onNav}
      />
    </article>
  );
}

const dThStyle = {
  padding: '10px 14px',
  fontFamily: 'var(--font-mono)',
  fontSize: '0.7rem',
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: 'var(--ink-3)',
  fontWeight: 500,
};

function DRow({ m, w, e, last }) {
  const cell = {
    padding: '9px 14px',
    borderTop: last ? '0' : '1px solid var(--border-soft)',
    verticalAlign: 'top',
  };
  return (
    <tr>
      <td style={{ ...cell, fontFamily: 'var(--font-mono)', color: 'var(--accent)', fontWeight: 600, whiteSpace: 'nowrap' }}>{m}</td>
      <td style={cell}>{w}</td>
      <td style={{ ...cell, fontFamily: 'var(--font-mono)', color: 'var(--ink-2)', fontSize: '0.86rem' }}>{e}</td>
    </tr>
  );
}

const dsCardStyle = {
  background: 'var(--paper-2)',
  border: '1px solid var(--border-soft)',
  borderRadius: 'var(--r-md)',
  padding: 'var(--s-4) var(--s-5)',
};

const dsHeadStyle = (color) => ({
  fontFamily: 'var(--font-mono)',
  fontWeight: 600,
  fontSize: '1.2rem',
  color,
  marginBottom: 'var(--s-3)',
});

window.ChapterL2M1 = ChapterL2M1;
