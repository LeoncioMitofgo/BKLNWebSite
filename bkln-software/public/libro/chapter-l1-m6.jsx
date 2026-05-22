// =============================================================
// chapter-l1-m6.jsx — Libro 1, Módulo 6: Listas y tuplas
// =============================================================

function ChapterL1M6({ onNav }) {
  return (
    <article className="reader-inner">
      <ChapterHeader
        book="// libro 1 · primeros pasos"
        module="módulo 06"
        time="≈ 50 min"
        title={<>Listas y <em>tuplas</em></>}
        dek="Hasta ahora cada variable guardaba un solo valor. Llegó el momento de guardar colecciones enteras en una sola variable."
      />

      <p>
        Hasta ahora, cada variable que has visto guarda <em>un</em> valor: un número, un texto,
        un booleano. Eso funciona para programas pequeños, pero la realidad casi nunca se deja
        modelar con valores sueltos.
      </p>

      <p>
        Piensa en los amigos de tu lista de cumpleaños, los productos de un carrito de compra,
        las temperaturas de cada día del mes. Todo eso son <strong>colecciones</strong> de datos:
        muchos valores que pertenecen a una misma idea y queremos manejar juntos.
      </p>

      <p>
        Python tiene varios tipos de colecciones. En este módulo aprenderás los dos más esenciales:
        las <strong>listas</strong> y las <strong>tuplas</strong>.
      </p>

      <h2>Crear una lista</h2>

      <p>
        Una <strong>lista</strong> es una secuencia ordenada de valores. Se escribe entre corchetes,
        con los elementos separados por comas:
      </p>

      <CodeBlock code={`# Lista de cadenas
frutas = ["manzana", "pera", "uva"]

# Lista de números
edades = [25, 30, 18, 42]

# Lista mixta (Python permite mezclar tipos)
mezcla = [1, "hola", True, 3.14]

# Lista vacía — la usaremos mucho para "ir llenando"
carrito = []

print(frutas)
print(carrito)`} />

      <ReplOutput>{`['manzana', 'pera', 'uva']
[]`}</ReplOutput>

      <Callout kind="tip" title="¿Cuánto mide una lista?">
        La función <code>len</code> que viste con cadenas también funciona con listas:
        <code> len(["a", "b", "c"]) </code> da <code>3</code>. Vas a usarla todo el tiempo.
      </Callout>

      <h2>Acceder a los elementos: indexación</h2>

      <p>
        Cada elemento de una lista tiene una <strong>posición</strong> (en inglés, <em>index</em>).
        Para obtener un elemento, usa corchetes con el número de su posición:
      </p>

      <CodeBlock code={`frutas = ["manzana", "pera", "uva", "kiwi"]

print(frutas[0])    # primer elemento
print(frutas[1])    # segundo
print(frutas[3])    # cuarto`} />

      <ReplOutput>{`manzana
pera
kiwi`}</ReplOutput>

      <Callout kind="warn" title="¡Cuidado! En Python se empieza a contar desde 0">
        <p style={{ margin: 0 }}>
          El primer elemento es <code>frutas[0]</code>, no <code>frutas[1]</code>. El último de
          una lista de 4 elementos es <code>frutas[3]</code>, no <code>frutas[4]</code>.
        </p>
        <p style={{ margin: 'var(--s-2) 0 0' }}>
          Esto es así en casi todos los lenguajes y al principio confunde. Después de un par de
          semanas se vuelve natural y empiezas a contar todo desde 0 incluso fuera del código
          (te lo aviso de antemano).
        </p>
      </Callout>

      <h3>Índices negativos: contar desde el final</h3>

      <p>
        Python tiene un truco bonito que pocos lenguajes tienen: si usas un número negativo,
        Python cuenta desde el final hacia atrás:
      </p>

      <CodeBlock code={`frutas = ["manzana", "pera", "uva", "kiwi"]

print(frutas[-1])   # el último
print(frutas[-2])   # el penúltimo`} />

      <ReplOutput>{`kiwi
uva`}</ReplOutput>

      <p>
        Esto es muy útil cuando solo te interesa el último elemento y no quieres preocuparte por
        cuántos haya en total.
      </p>

      <Callout kind="warn" title="Error clásico: IndexError">
        Si pides un índice que no existe (<code>frutas[10]</code> en una lista de 4), Python lanza
        <code> IndexError: list index out of range</code>. Antes de acceder a un índice grande,
        comprueba con <code>len</code>.
      </Callout>

      <Quiz
        question='Si tengo lista = ["a", "b", "c", "d", "e"], ¿qué imprime lista[-3]?'
        options={['"a"', '"b"', '"c"', '"e"']}
        correct={2}
        explanation='Los índices negativos cuentan desde el final: -1 es el último ("e"), -2 es "d", -3 es "c". Truco: el índice negativo y el índice positivo siempre suman len(lista). Aquí 5: -3 y 2 suman 5, y lista[2] también es "c".'
      />

      <h2>Modificar la lista</h2>

      <p>Las listas son <strong>mutables</strong>, lo que significa que puedes cambiar su contenido:</p>

      <CodeBlock code={`frutas = ["manzana", "pera", "uva"]

# Cambiar un elemento existente
frutas[1] = "plátano"
print(frutas)

# Añadir al final
frutas.append("kiwi")
print(frutas)

# Insertar en una posición concreta
frutas.insert(0, "fresa")    # al principio
print(frutas)

# Quitar por valor (la primera ocurrencia)
frutas.remove("manzana")
print(frutas)

# Quitar y devolver el último
ultimo = frutas.pop()
print(f"Saqué: {ultimo}")
print(frutas)`} />

      <ReplOutput>{`['manzana', 'plátano', 'uva']
['manzana', 'plátano', 'uva', 'kiwi']
['fresa', 'manzana', 'plátano', 'uva', 'kiwi']
['fresa', 'plátano', 'uva', 'kiwi']
Saqué: kiwi
['fresa', 'plátano', 'uva']`}</ReplOutput>

      <p>Observa la sintaxis nueva: <code>frutas.append("kiwi")</code>. El punto significa
        <em> "este es un método de este objeto"</em>. <code>append</code> es un método de la lista
        — una función que vive dentro de la lista y opera sobre ella. Los <strong>métodos</strong> los verás muchísimo.
      </p>

      <h3>Los métodos esenciales de las listas</h3>

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
              <th style={thM}>Método</th>
              <th style={thM}>Qué hace</th>
              <th style={thM}>Ejemplo</th>
            </tr>
          </thead>
          <tbody>
            <MRow m=".append(x)" w="Añade x al final" e='[1,2].append(3) → [1,2,3]' />
            <MRow m=".insert(i, x)" w="Inserta x en la posición i" e='[1,3].insert(1, 2) → [1,2,3]' />
            <MRow m=".remove(x)" w="Quita la primera aparición de x" e='[1,2,3,2].remove(2) → [1,3,2]' />
            <MRow m=".pop()" w="Quita y devuelve el último" e='[1,2,3].pop() → devuelve 3' />
            <MRow m=".pop(i)" w="Quita y devuelve el de la posición i" e='[1,2,3].pop(0) → devuelve 1' />
            <MRow m=".clear()" w="Vacía la lista entera" e='[1,2,3].clear() → []' />
            <MRow m=".sort()" w="Ordena la lista (en su sitio)" e='[3,1,2].sort() → [1,2,3]' />
            <MRow m=".reverse()" w="Invierte el orden" e='[1,2,3].reverse() → [3,2,1]' />
            <MRow m=".count(x)" w="Cuántas veces aparece x" e='[1,2,1].count(1) → 2' />
            <MRow m=".index(x)" w="Posición de la primera aparición" e='["a","b"].index("b") → 1' last />
          </tbody>
        </table>
      </div>

      <Callout kind="tip" title="Algunos métodos devuelven, otros modifican">
        Fíjate: <code>append</code>, <code>sort</code>, <code>reverse</code> <strong>modifican</strong>
        la lista y devuelven <code>None</code>. <code>pop</code>, <code>count</code>, <code>index</code>
        <strong>devuelven</strong> un valor. Si escribes <code>nueva = lista.sort()</code>,
        nueva valdrá <code>None</code>: la lista se ordenó, pero el método no devolvió nada.
      </Callout>

      <h2>Recorrer una lista: <code>for</code> + lista</h2>

      <p>
        Ya viste el bucle <code>for</code> en el Módulo 4. Recorrer una lista es su uso más natural:
      </p>

      <CodeBlock code={`frutas = ["manzana", "pera", "uva"]

for fruta in frutas:
    print(f"Me gusta la {fruta}.")`} />

      <ReplOutput>{`Me gusta la manzana.
Me gusta la pera.
Me gusta la uva.`}</ReplOutput>

      <p>
        Para cada vuelta, la variable <code>fruta</code> toma el valor de uno de los elementos.
        No necesitas índices.
      </p>

      <h3>Cuando sí necesitas el índice: <code>enumerate</code></h3>

      <p>
        A veces, recorriendo la lista, también te interesa la posición de cada elemento.
        Python tiene una función ideal para eso: <code>enumerate</code>.
      </p>

      <CodeBlock code={`frutas = ["manzana", "pera", "uva"]

for i, fruta in enumerate(frutas):
    print(f"{i}: {fruta}")`} />

      <ReplOutput>{`0: manzana
1: pera
2: uva`}</ReplOutput>

      <Callout kind="tip" title="enumerate vs range(len(...))">
        Mucha gente que viene de otros lenguajes escribe <code>for i in range(len(frutas)):</code>
        y luego accede con <code>frutas[i]</code>. <strong>No lo hagas en Python.</strong>
        <code> enumerate </code> es la forma idiomática: más limpia, más rápida, y dice
        explícitamente qué quieres.
      </Callout>

      <h2>Slicing: trocear listas</h2>

      <p>
        Los <strong>slices</strong> (rebanadas) te permiten sacar un trozo de una lista —
        un sub-lista contigua. La sintaxis es <code>lista[inicio:fin]</code>, y como con <code>range</code>,
        el final <em>no se incluye</em>.
      </p>

      <CodeBlock code={`nums = [10, 20, 30, 40, 50, 60, 70]

print(nums[1:4])     # de índice 1 a 3
print(nums[:3])      # desde el inicio hasta el índice 2
print(nums[4:])      # desde el índice 4 hasta el final
print(nums[-3:])     # los últimos 3
print(nums[::2])     # uno sí, uno no (paso 2)
print(nums[::-1])    # toda la lista al revés`} />

      <ReplOutput>{`[20, 30, 40]
[10, 20, 30]
[50, 60, 70]
[50, 60, 70]
[10, 30, 50, 70]
[70, 60, 50, 40, 30, 20, 10]`}</ReplOutput>

      <Callout kind="info" title="Los slices NO modifican la original">
        Al cortar una lista, obtienes una <em>nueva</em> lista; la original sigue igual. Esto es
        una diferencia importante con métodos como <code>sort</code> o <code>append</code> que
        sí modifican.
      </Callout>

      <h2>Operadores con listas</h2>

      <CodeBlock code={`a = [1, 2, 3]
b = [4, 5]

# Concatenar (juntar)
c = a + b
print(c)                  # [1, 2, 3, 4, 5]

# Repetir
print([0] * 5)            # [0, 0, 0, 0, 0]

# Comprobar si algo está dentro
print(3 in a)             # True
print(99 in a)            # False
print("manzana" in ["pera", "uva"])  # False`} />

      <ReplOutput>{`[1, 2, 3, 4, 5]
[0, 0, 0, 0, 0]
True
False
False`}</ReplOutput>

      <p>
        El operador <code>in</code> es uno de los más útiles de Python. Lee literalmente como
        <em> "está en"</em> y devuelve un booleano. Lo usarás en cada otro <code>if</code> que escribas.
      </p>

      <Quiz
        question='¿Cuál es el resultado de  [1, 2, 3][1:-1]  ?'
        options={['[1]', '[2]', '[1, 2]', '[2, 3]']}
        correct={1}
        explanation='El slice empieza en el índice 1 (el segundo elemento, que es 2) y termina antes del índice -1 (que es el último, 3). Eso deja solo el elemento del medio: [2]. Truco muy usado: lista[1:-1] te quita el primero y el último.'
      />

      <h2>Funciones útiles con listas</h2>

      <p>Además de los métodos, hay funciones built-in que reciben listas como argumento:</p>

      <CodeBlock code={`temperaturas = [22.5, 18.0, 25.3, 19.7, 21.1]

print(len(temperaturas))    # 5 — cuántos elementos
print(max(temperaturas))    # el mayor
print(min(temperaturas))    # el menor
print(sum(temperaturas))    # la suma
print(sum(temperaturas) / len(temperaturas))  # promedio

# sorted devuelve una NUEVA lista ordenada (a diferencia de .sort())
ordenadas = sorted(temperaturas)
print(ordenadas)
print(temperaturas)         # la original sin tocar`} />

      <ReplOutput>{`5
25.3
18.0
106.6
21.32
[18.0, 19.7, 21.1, 22.5, 25.3]
[22.5, 18.0, 25.3, 19.7, 21.1]`}</ReplOutput>

      <Callout kind="info" title="sorted() vs .sort()">
        Dos formas de ordenar, sutilmente distintas:
        <ul style={{ margin: 'var(--s-2) 0 0', paddingLeft: '1.2em' }}>
          <li><code>lista.sort()</code>: modifica la lista en su sitio, no devuelve nada.</li>
          <li><code>sorted(lista)</code>: NO modifica, devuelve una <em>nueva</em> lista ordenada.</li>
        </ul>
        Usa <code>sorted</code> si necesitas la original intacta; usa <code>.sort()</code> si no.
      </Callout>

      <h2>Listas dentro de listas (matrices)</h2>

      <p>
        Una lista puede contener cualquier cosa, incluso otras listas. Es la forma de representar
        tablas, matrices, tableros de juego:
      </p>

      <CodeBlock code={`# Un tablero 3x3 (como el del tres en raya)
tablero = [
    ["X", "O", "X"],
    [" ", "X", " "],
    ["O", " ", "X"],
]

# Acceder a una fila completa
print(tablero[1])              # [' ', 'X', ' ']

# Acceder a una casilla (fila, columna)
print(tablero[0][1])           # "O" — fila 0, columna 1
print(tablero[2][0])           # "O" — fila 2, columna 0

# Recorrer todo el tablero
for fila in tablero:
    for casilla in fila:
        print(casilla, end=" ")
    print()   # salto de línea al final de cada fila`} />

      <ReplOutput>{`[' ', 'X', ' ']
O
O
X O X
  X
O   X`}</ReplOutput>

      <Callout kind="tip" title="El truco end=' '">
        Por defecto <code>print</code> añade un salto de línea al final. Con el argumento
        <code> end=" " </code> le dices a Python que termine con un espacio en lugar del salto.
        Es perfecto para imprimir una fila completa en una sola línea.
      </Callout>

      <h2>Tuplas: como listas, pero a prueba de cambios</h2>

      <p>
        Una <strong>tupla</strong> es prácticamente igual que una lista, con una diferencia
        fundamental: <strong>no se puede modificar después de crearla</strong>. Se dice que es
        <em> inmutable</em>.
      </p>

      <p>Las tuplas se escriben con paréntesis (en lugar de corchetes), o sin nada:</p>

      <CodeBlock code={`# Las tres formas son válidas:
coords = (40.4168, -3.7038)
colores = "rojo", "verde", "azul"    # los paréntesis son opcionales
vacia = ()

print(coords)
print(coords[0])                     # se accede igual que las listas
print(colores[-1])

# Pero NO puedes modificarla:
coords[0] = 99                       # 💥 TypeError`} />

      <ReplOutput>{`(40.4168, -3.7038)
40.4168
azul
TypeError: 'tuple' object does not support item assignment`}</ReplOutput>

      <h3>¿Para qué sirve algo "que no se puede modificar"?</h3>

      <ul>
        <li><strong>Para datos que <em>conceptualmente</em> no deben cambiar.</strong>
          Las coordenadas de Madrid son las coordenadas de Madrid — no tiene sentido tener un método
          para cambiarlas. Una tupla deja claro: "esto es un paquete cerrado".
        </li>
        <li><strong>Para devolver varias cosas desde una función.</strong> Cuando hiciste <code>return cociente, resto</code>
          en el módulo anterior, en realidad estabas devolviendo una tupla.
        </li>
        <li><strong>Para usar como clave en diccionarios</strong> (lo verás en el Libro 2). Las listas no se pueden, las tuplas sí.</li>
      </ul>

      <h3>Desempaquetar tuplas (y listas)</h3>

      <p>
        Python te deja "desempaquetar" una tupla — o una lista — en varias variables de una vez.
        Es elegantísimo:
      </p>

      <CodeBlock code={`punto = (10, 20)
x, y = punto
print(x)         # 10
print(y)         # 20

# Funciona con cualquier número de elementos
nombres = ("Ana", "Luis", "Sofía")
a, b, c = nombres

# Y también con listas
[primero, segundo, tercero] = [100, 200, 300]

# El truquito de intercambiar variables (¿recuerdas el Módulo 2?):
a, b = b, a
print(a, b)`} />

      <ReplOutput>{`10
20
Luis Ana`}</ReplOutput>

      <PullQuote>
        El intercambio <code>a, b = b, a</code> es Python en su máxima expresión: hace algo
        sencillo de forma sencilla, sin trucos crípticos. Memorízalo.
      </PullQuote>

      <Quiz
        question="Sea t = (1, 2, 3). ¿Cuál de estas líneas da error?"
        options={[
          'print(t[0])',
          'len(t)',
          'a, b, c = t',
          't[0] = 99',
        ]}
        correct={3}
        explanation='Las tuplas son inmutables: no puedes reasignar uno de sus elementos. Las otras tres operaciones (acceder, medir longitud, desempaquetar) son lectura, y todas funcionan.'
      />

      <h2>Listas vs tuplas: cuándo usar cada una</h2>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 'var(--s-4)',
        margin: 'var(--s-5) 0',
      }} className="lt-grid">
        <div style={ltCardStyle}>
          <div style={{ ...ltHeadStyle, color: 'var(--accent)' }}>[ Lista ]</div>
          <p style={{ margin: '0 0 var(--s-2)', fontSize: '0.92rem' }}>
            Cuando la <strong>colección puede cambiar</strong>: añadir, quitar, reordenar.
          </p>
          <ul style={{ paddingLeft: '1em', margin: 0, fontSize: '0.88rem', color: 'var(--ink-2)' }}>
            <li>Carrito de compra</li>
            <li>Lista de tareas</li>
            <li>Resultados de un sensor</li>
          </ul>
        </div>
        <div style={ltCardStyle}>
          <div style={{ ...ltHeadStyle, color: 'var(--highlight)' }}>( Tupla )</div>
          <p style={{ margin: '0 0 var(--s-2)', fontSize: '0.92rem' }}>
            Cuando la <strong>colección no debe cambiar</strong>: representa un dato cerrado.
          </p>
          <ul style={{ paddingLeft: '1em', margin: 0, fontSize: '0.88rem', color: 'var(--ink-2)' }}>
            <li>Coordenadas (lat, lng)</li>
            <li>Resolución (ancho, alto)</li>
            <li>Valores devueltos por una función</li>
          </ul>
        </div>
        <style>{`@media (max-width: 720px) { .lt-grid { grid-template-columns: 1fr !important; } }`}</style>
      </div>

      <h2>Un patrón completísimo: filtrar y transformar</h2>

      <p>
        Antes de pasar a los ejercicios, mira este patrón clásico que combina casi todo lo del
        módulo. Lo vas a usar miles de veces en tu vida:
      </p>

      <CodeBlock code={`# Tenemos las temperaturas de una semana
temperaturas = [22.5, 31.0, 18.2, 35.8, 27.4, 14.0, 29.1]

# Queremos: solo los días calurosos (>= 25°),
# en grados Fahrenheit.

calurosos_f = []
for t in temperaturas:
    if t >= 25:
        f = t * 9 / 5 + 32
        calurosos_f.append(f)

print("Días calurosos (F):", calurosos_f)
print(f"Total de días calurosos: {len(calurosos_f)}")
print(f"Promedio: {sum(calurosos_f) / len(calurosos_f):.1f}°F")`} />

      <ReplOutput>{`Días calurosos (F): [87.8, 96.44000000000001, 81.32, 84.38]
Total de días calurosos: 4
Promedio: 87.5°F`}</ReplOutput>

      <p>
        El patrón se repite así de aquí en adelante: <strong>una lista vacía + un bucle + un if + un append</strong>.
        Más adelante (en el Libro 2) veremos una forma todavía más compacta llamada <em>list comprehensions</em>,
        pero esta versión es perfecta para entender qué pasa.
      </p>

      <h2>Ejercicios</h2>

      <p style={{ color: 'var(--ink-2)' }}>
        Cinco ejercicios que cubren los usos más típicos de listas. El último es un mini-proyecto
        que junta todo el libro hasta ahora.
      </p>

      <Exercise
        number="6.1"
        title="Resumen de notas"
        difficulty="fácil"
        runner={{
          initial: `# Dada esta lista de notas, calcula y muestra:
#   - La cantidad de notas
#   - La nota máxima
#   - La nota mínima
#   - El promedio (con 2 decimales)

notas = [8.5, 6.0, 7.2, 9.1, 5.5, 7.8, 6.4]

`,
          hint: 'len, max, min, sum son tus amigos. Para el promedio, sum / len. Para mostrar con 2 decimales en una f-string, usa {promedio:.2f}.',
          solution: {
            code: `notas = [8.5, 6.0, 7.2, 9.1, 5.5, 7.8, 6.4]

print(f"Cantidad: {len(notas)}")
print(f"Máxima: {max(notas)}")
print(f"Mínima: {min(notas)}")
print(f"Promedio: {sum(notas) / len(notas):.2f}")`,
            explanation: 'Las funciones built-in cubren casi todas las estadísticas básicas con una sola línea cada una. Quedarte hasta aquí ya te resuelve el 80% de los análisis simples de datos.',
          },
        }}
      >
        <p>Estadísticas básicas con funciones built-in.</p>
      </Exercise>

      <Exercise
        number="6.2"
        title="Construir una lista poco a poco"
        difficulty="fácil"
        runner={{
          initial: `# Crea una lista VACÍA llamada "cuadrados".
# Recórrela del 1 al 10 con un for y añade
# (con append) el CUADRADO de cada número.
#
# Al final, imprime la lista. Debe ser:
#   [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]

`,
          hint: 'cuadrados = []. for i in range(1, 11): cuadrados.append(i ** 2). print(cuadrados).',
          solution: {
            code: `cuadrados = []

for i in range(1, 11):
    cuadrados.append(i ** 2)

print(cuadrados)`,
            explanation: 'El patrón "lista vacía + bucle + append" es el más usado para construir listas dinámicamente. Lo verás en cada programa real que escribas.',
          },
        }}
      >
        <p>El patrón fundamental: lista vacía + bucle + <code>append</code>.</p>
      </Exercise>

      <Exercise
        number="6.3"
        title="Filtrar palabras largas"
        difficulty="media"
        runner={{
          initial: `# Dada esta lista de palabras, crea una nueva
# lista llamada "largas" con solo las que tengan
# MÁS DE 5 LETRAS. Después imprímela.

palabras = ["sol", "tarde", "elefante", "luna", "computadora", "agua", "Python"]

`,
          hint: 'Lista vacía + bucle + if con len(palabra) > 5 + append. Recuerda: len() también funciona con cadenas.',
          solution: {
            code: `palabras = ["sol", "tarde", "elefante", "luna", "computadora", "agua", "Python"]
largas = []

for palabra in palabras:
    if len(palabra) > 5:
        largas.append(palabra)

print(largas)`,
            explanation: 'El patrón "filtrar": recorrer una lista y meter en otra solo lo que cumple cierta condición. Junto con "transformar" (modificar antes de guardar), son los dos patrones más usados al trabajar con datos.',
          },
        }}
      >
        <p>Tu primer filtro. Patrón clave del módulo.</p>
      </Exercise>

      <Exercise
        number="6.4"
        title="Invertir sin usar reverse()"
        difficulty="media"
        runner={{
          initial: `# Crea una función "invertir(lista)" que devuelva
# una NUEVA lista con los elementos al revés.
#
# RESTRICCIÓN: no uses .reverse() ni el slice [::-1].
# Hazlo con un bucle.
#
# Después prueba con [1, 2, 3, 4, 5] → [5, 4, 3, 2, 1].

def invertir(lista):
    pass  # tu código aquí

print(invertir([1, 2, 3, 4, 5]))`,
          hint: 'Una forma: crear una lista vacía y recorrer la original AL REVÉS (con índices negativos, o range(len(lista)-1, -1, -1)) haciendo append a la nueva. Otra forma: ir insertando al principio (insert(0, x)) recorriendo la original al derecho.',
          solution: {
            code: `def invertir(lista):
    resultado = []
    for x in lista:
        resultado.insert(0, x)
    return resultado

print(invertir([1, 2, 3, 4, 5]))

# Alternativa con índices:
# def invertir(lista):
#     resultado = []
#     for i in range(len(lista) - 1, -1, -1):
#         resultado.append(lista[i])
#     return resultado`,
            explanation: 'Reinventar funciones que ya existen (.reverse(), [::-1]) es ÚTIL para aprender. En código real, usa siempre lo que Python te ofrece — es más rápido y menos propenso a bugs. Aquí lo importante es que entiendas cómo se podría hacer.',
          },
        }}
      >
        <p>Toca pensar un poquito. Sin usar atajos.</p>
      </Exercise>

      <Exercise
        number="6.5"
        title="Lista de la compra"
        difficulty="media"
        runner={{
          initial: `# Construye un mini-programa interactivo de lista de la compra.
#
# Funcionamiento:
#  - El programa repite hasta que el usuario escriba "fin".
#  - En cada vuelta pide un producto y lo añade a la lista.
#  - Si el usuario escribe "fin", muestra la lista completa
#    y termina.
#
# Pista: while True + break.

`,
          hint: 'compra = []. while True: producto = input(...). if producto == "fin": break, después del bucle imprime la lista. Si quieres ser elegante, también puedes contar al final cuántas cosas se compraron.',
          solution: {
            code: `compra = []

while True:
    producto = input("Producto (o 'fin' para terminar): ")
    if producto == "fin":
        break
    compra.append(producto)

print(f"\\nTu lista tiene {len(compra)} productos:")
for i, p in enumerate(compra, start=1):
    print(f"  {i}. {p}")`,
            explanation: 'Junta cuatro cosas: lista vacía + while True + break + enumerate (con start=1 para empezar a numerar desde 1, más amable para humanos). Programas como este son perfectamente "publicables" — funcionales, claros, útiles.',
          },
        }}
      >
        <p>Un mini-proyecto interactivo. Junta listas, bucles e input.</p>
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
          <li><strong>Lista</strong>: secuencia ordenada y <strong>mutable</strong>. <code>{`["a", "b"]`}</code>.</li>
          <li>Acceso: <code>lista[0]</code> es el primero. <strong>Se empieza en 0.</strong> <code>lista[-1]</code> es el último.</li>
          <li>Métodos clave: <code>.append</code>, <code>.insert</code>, <code>.remove</code>, <code>.pop</code>, <code>.sort</code>, <code>.reverse</code>, <code>.count</code>, <code>.index</code>.</li>
          <li>Slicing: <code>lista[1:4]</code>, <code>lista[:3]</code>, <code>lista[::-1]</code>. <strong>El fin no se incluye.</strong></li>
          <li>Recorrer: <code>for x in lista:</code>. Con índice: <code>for i, x in enumerate(lista):</code>.</li>
          <li>Operadores: <code>+</code> concatena, <code>*</code> repite, <code>in</code> comprueba pertenencia.</li>
          <li>Funciones: <code>len</code>, <code>max</code>, <code>min</code>, <code>sum</code>, <code>sorted</code> (no modifica).</li>
          <li>Listas dentro de listas para representar matrices: <code>tablero[fila][columna]</code>.</li>
          <li><strong>Tupla</strong>: como una lista pero <strong>inmutable</strong>. <code>(a, b)</code>.</li>
          <li>Desempaquetar: <code>x, y = punto</code>. Intercambiar: <code>a, b = b, a</code>.</li>
        </ul>
      </div>

      <PullQuote>
        En el próximo módulo nos centramos en un tipo de dato que has visto desde el primer día,
        pero al que todavía no le habíamos prestado atención: <em>las cadenas de texto</em>.
        Vas a descubrir que esconden más de lo que parecía.
      </PullQuote>

      <ChapterNav
        prev={{ id: 'l1-m5', title: 'Funciones' }}
        next={{ id: 'l1-m7', title: 'Cadenas de texto' }}
        onNav={onNav}
      />
    </article>
  );
}

const thM = {
  padding: '10px 14px',
  fontFamily: 'var(--font-mono)',
  fontSize: '0.7rem',
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: 'var(--ink-3)',
  fontWeight: 500,
};

function MRow({ m, w, e, last }) {
  const cellStyle = {
    padding: '9px 14px',
    borderTop: last ? '0' : '1px solid var(--border-soft)',
    verticalAlign: 'top',
  };
  return (
    <tr>
      <td style={{ ...cellStyle, fontFamily: 'var(--font-mono)', color: 'var(--accent)', fontWeight: 600, whiteSpace: 'nowrap' }}>{m}</td>
      <td style={cellStyle}>{w}</td>
      <td style={{ ...cellStyle, fontFamily: 'var(--font-mono)', color: 'var(--ink-2)', fontSize: '0.84rem' }}>{e}</td>
    </tr>
  );
}

const ltCardStyle = {
  background: 'var(--paper-2)',
  border: '1px solid var(--border-soft)',
  borderRadius: 'var(--r-md)',
  padding: 'var(--s-4) var(--s-5)',
};

const ltHeadStyle = {
  fontFamily: 'var(--font-mono)',
  fontWeight: 600,
  fontSize: '1.3rem',
  marginBottom: 'var(--s-2)',
  letterSpacing: '0.02em',
};

window.ChapterL1M6 = ChapterL1M6;
