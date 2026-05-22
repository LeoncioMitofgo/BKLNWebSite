// =============================================================
// chapter-l1-m7.jsx — Libro 1, Módulo 7: Cadenas de texto
// =============================================================

function ChapterL1M7({ onNav }) {
  return (
    <article className="reader-inner">
      <ChapterHeader
        book="// libro 1 · primeros pasos"
        module="módulo 07"
        time="≈ 45 min"
        title={<>Cadenas de <em>texto</em></>}
        dek="Has trabajado con texto desde el primer día. Ahora vamos a abrir la caja y ver todo lo que se puede hacer con él."
      />

      <p>
        Las <strong>cadenas de texto</strong> — los <em>strings</em>, en inglés — son uno de los
        tipos más importantes de cualquier lenguaje de programación. Todo lo que el usuario escribe
        es texto. Lo que muestras en pantalla es texto. Los nombres de archivos son texto. Los datos
        que descargas de internet son, casi siempre, texto.
      </p>

      <p>
        En este módulo dejamos de tratarlas como "esas cosas entre comillas" y aprendemos a
        operarlas con la misma soltura que los números y las listas.
      </p>

      <h2>Las cadenas son secuencias</h2>

      <p>
        Una cadena es, en el fondo, una <strong>secuencia de caracteres</strong>. Eso significa que
        muchas cosas que aprendiste con listas en el módulo anterior también funcionan aquí:
      </p>

      <CodeBlock code={`palabra = "Python"

# Longitud
print(len(palabra))         # 6

# Indexar — empezando desde 0
print(palabra[0])           # P
print(palabra[1])           # y
print(palabra[-1])          # n  (último)

# Slicing — igual que en listas
print(palabra[0:3])         # Pyt
print(palabra[3:])          # hon
print(palabra[::-1])        # nohtyP   (al revés)

# Operador "in"
print("th" in palabra)      # True
print("X" in palabra)       # False`} />

      <ReplOutput>{`6
P
y
n
Pyt
hon
nohtyP
True
False`}</ReplOutput>

      <Callout kind="info" title="Las cadenas son inmutables">
        A diferencia de las listas, <strong>no puedes modificar una cadena</strong> después
        de crearla. Esto da error: <code>palabra[0] = "X"</code>.
        Para "cambiar" una cadena, en realidad creas una nueva. Lo verás constantemente.
      </Callout>

      <h3>Concatenar y repetir</h3>

      <CodeBlock code={`nombre = "Ana"
saludo = "Hola, " + nombre + "!"
print(saludo)

# Repetir
linea = "-" * 30
print(linea)
print("centrado")
print(linea)`} />

      <ReplOutput>{`Hola, Ana!
------------------------------
centrado
------------------------------`}</ReplOutput>

      <h2>Los métodos esenciales</h2>

      <p>
        Cada cadena trae un montón de funciones "metidas dentro" — los <strong>métodos</strong>.
        Se llaman con el punto. Te presento los que vas a usar el 90% del tiempo.
      </p>

      <h3>Mayúsculas, minúsculas</h3>

      <CodeBlock code={`texto = "Hola Mundo"

print(texto.upper())        # HOLA MUNDO
print(texto.lower())        # hola mundo
print(texto.title())        # Hola Mundo (capitaliza cada palabra)
print(texto.capitalize())   # Hola mundo (solo la primera)

# La cadena original NO cambia (es inmutable):
print(texto)                # Hola Mundo`} />

      <ReplOutput>{`HOLA MUNDO
hola mundo
Hola Mundo
Hola mundo
Hola Mundo`}</ReplOutput>

      <Callout kind="tip" title="Comparaciones sin importar mayúsculas">
        ¿Quieres comparar si dos cadenas son iguales sin que importen las mayúsculas?
        Pásalas a la misma forma antes:
        <code> usuario.lower() == "ana"</code>. Truco clásico en formularios y logins.
      </Callout>

      <h3>Limpiar espacios: <code>strip</code></h3>

      <p>
        Cuando el usuario escribe algo, suele poner espacios sobrantes al principio o al final
        sin querer. <code>strip</code> los quita:
      </p>

      <CodeBlock code={`entrada = "   hola   "
print(f"|{entrada}|")           # |   hola   |
print(f"|{entrada.strip()}|")   # |hola|

# También existen:
print("   hola   ".lstrip())    # quita solo a la IZQUIERDA → "hola   "
print("   hola   ".rstrip())    # quita solo a la DERECHA → "   hola"

# strip también acepta qué caracteres quitar:
print("###hola###".strip("#"))  # "hola"`} />

      <ReplOutput>{`|   hola   |
|hola|
hola   
   hola
hola`}</ReplOutput>

      <h3>Buscar y reemplazar</h3>

      <CodeBlock code={`frase = "Me gusta Python porque Python es claro"

# ¿Está? ¿Dónde?
print("Python" in frase)        # True
print(frase.find("Python"))     # 9 (posición de la PRIMERA aparición)
print(frase.find("Java"))       # -1 (no está)

# Contar apariciones
print(frase.count("Python"))    # 2

# Reemplazar (devuelve una NUEVA cadena)
nuevo = frase.replace("Python", "JavaScript")
print(nuevo)
print(frase)   # la original sigue intacta`} />

      <ReplOutput>{`True
9
-1
2
Me gusta JavaScript porque JavaScript es claro
Me gusta Python porque Python es claro`}</ReplOutput>

      <Callout kind="warn" title="find no es la única opción">
        Existe también <code>.index("Python")</code>, que hace lo mismo pero <strong>da error</strong>
        si no encuentra. <code>find</code> es más seguro porque devuelve <code>-1</code> en lugar
        de explotar. Úsalo en duda.
      </Callout>

      <h3>Comprobar el contenido: los <code>is...</code></h3>

      <CodeBlock code={`print("python".isalpha())     # True — solo letras
print("python3".isalpha())    # False — tiene un dígito
print("12345".isdigit())      # True — solo dígitos
print("hola mundo".isalnum()) # False — el espacio no es alfanumérico
print("hola".isalnum())       # True
print("ABC".isupper())        # True
print("abc".islower())        # True
print("   ".isspace())        # True — solo espacios`} />

      <ReplOutput>{`True
False
True
False
True
True
True
True`}</ReplOutput>

      <p>Estos métodos son muy útiles para <strong>validar entradas del usuario</strong>:</p>

      <CodeBlock code={`edad = input("¿Cuántos años tienes? ")

if edad.isdigit():
    edad = int(edad)
    print(f"Vale, tienes {edad} años.")
else:
    print("Eso no es un número entero.")`} />

      <h3>Separar y juntar: <code>split</code> y <code>join</code></h3>

      <p>
        Probablemente los dos métodos más útiles de la familia. Convierten texto en lista
        y viceversa.
      </p>

      <CodeBlock code={`# split: cadena → lista
frase = "Me gusta mucho Python"
palabras = frase.split()          # por defecto separa por espacios
print(palabras)
print(len(palabras))

# Con otro separador
fila = "Ana,25,Madrid"
campos = fila.split(",")
print(campos)

# join: lista → cadena
nombres = ["Ana", "Luis", "Sofía"]
unidos = ", ".join(nombres)
print(unidos)

# La sintaxis de join sorprende: el separador va PRIMERO
# Lectura: "junta los elementos de nombres usando ', ' entre cada uno"`} />

      <ReplOutput>{`['Me', 'gusta', 'mucho', 'Python']
4
['Ana', '25', 'Madrid']
Ana, Luis, Sofía`}</ReplOutput>

      <Callout kind="tip" title="split + procesar + join: el patrón rey">
        Cuando trabajas con datos en formato texto (CSV, líneas de un archivo, entrada del usuario),
        casi siempre haces lo mismo:
        <ol style={{ margin: 'var(--s-2) 0', paddingLeft: '1.2em' }}>
          <li><strong>Split</strong>: parte el texto en una lista.</li>
          <li><strong>Procesar</strong>: recorre la lista con un <code>for</code> y haz lo tuyo.</li>
          <li><strong>Join</strong>: vuelve a juntar (si quieres una cadena final).</li>
        </ol>
        Lo verás todo el tiempo a partir de aquí.
      </Callout>

      <h3>Tabla resumen</h3>

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
              <th style={thS}>Método</th>
              <th style={thS}>Qué hace</th>
              <th style={thS}>Ejemplo</th>
            </tr>
          </thead>
          <tbody>
            <SRow m=".upper()" w="Todo a mayúsculas" e='"hola".upper() → "HOLA"' />
            <SRow m=".lower()" w="Todo a minúsculas" e='"HOLA".lower() → "hola"' />
            <SRow m=".title()" w="Capitaliza cada palabra" e='"hola mundo".title()' />
            <SRow m=".strip()" w="Quita espacios de los extremos" e='"  ok  ".strip() → "ok"' />
            <SRow m=".replace(a, b)" w="Reemplaza a por b" e='"abc".replace("b", "X")' />
            <SRow m=".split(sep)" w="Parte en lista por sep" e='"a,b,c".split(",")' />
            <SRow m=".join(lista)" w="Une lista con sep entre medias" e='",".join(["a","b"])' />
            <SRow m=".find(s)" w="Posición de s (-1 si no está)" e='"abc".find("b") → 1' />
            <SRow m=".count(s)" w="Cuántas veces aparece s" e='"banana".count("a") → 3' />
            <SRow m=".startswith(s)" w="¿Empieza por s?" e='"hola".startswith("ho")' />
            <SRow m=".endswith(s)" w="¿Termina con s?" e='"hola.py".endswith(".py")' />
            <SRow m=".isdigit()" w="¿Solo contiene dígitos?" e='"123".isdigit() → True' last />
          </tbody>
        </table>
      </div>

      <Quiz
        question='¿Cuál es el resultado de  "  Hola Mundo  ".strip().lower().replace(" ", "-")  ?'
        options={['"hola-mundo"', '" hola mundo "', '"hola mundo"', '"--hola-mundo--"']}
        correct={0}
        explanation='Tres pasos en cadena: (1) strip() quita los espacios de los extremos → "Hola Mundo", (2) lower() pasa a minúsculas → "hola mundo", (3) replace cambia el espacio del medio por guión → "hola-mundo". Esta técnica de "encadenar métodos" es habitual en Python.'
      />

      <h2>f-strings, a fondo</h2>

      <p>
        Las viste en el Módulo 2. Sabes que sirven para meter variables dentro de una cadena
        con <code>{`f"texto {variable} texto"`}</code>. Pero pueden hacer muchísimo más.
      </p>

      <h3>Cualquier expresión, no solo variables</h3>

      <CodeBlock code={`x = 5

print(f"x + 1 = {x + 1}")
print(f"raíz cuadrada = {x ** 0.5}")
print(f"¿es par? {x % 2 == 0}")
print(f"mayúsculas: {'hola mundo'.upper()}")`} />

      <ReplOutput>{`x + 1 = 6
raíz cuadrada = 2.23606797749979
¿es par? False
mayúsculas: HOLA MUNDO`}</ReplOutput>

      <h3>Formato de números: decimales fijos</h3>

      <p>
        Detrás del valor, después de dos puntos, puedes poner un <strong>especificador de formato</strong>.
        Lo más útil al principio: limitar los decimales.
      </p>

      <CodeBlock code={`pi = 3.14159265358979

print(f"{pi:.2f}")       # 2 decimales
print(f"{pi:.4f}")       # 4 decimales
print(f"{pi:.0f}")       # sin decimales (redondea)

precio = 1234.5
print(f"Total: {precio:.2f} €")`} />

      <ReplOutput>{`3.14
3.1416
3
Total: 1234.50 €`}</ReplOutput>

      <h3>Anchura y relleno</h3>

      <p>Útil cuando alineas datos en columnas, como en una tabla de texto:</p>

      <CodeBlock code={`# {valor:ancho} → reserva al menos "ancho" caracteres
print(f"|{'Ana':10}|")        # alineada a la izquierda por defecto
print(f"|{'Ana':>10}|")       # > = derecha
print(f"|{'Ana':^10}|")       # ^ = centrada
print(f"|{'Ana':*^10}|")      # rellena con *

# Útil para imprimir tablas:
productos = [("Pan", 1.20), ("Leche", 0.95), ("Huevos", 2.50)]
for nombre, precio in productos:
    print(f"{nombre:10} {precio:>6.2f} €")`} />

      <ReplOutput>{`|Ana       |
|       Ana|
|   Ana    |
|***Ana****|
Pan          1.20 €
Leche        0.95 €
Huevos       2.50 €`}</ReplOutput>

      <h3>Separadores de miles</h3>

      <CodeBlock code={`grande = 1234567

print(f"{grande:,}")          # 1,234,567  (separador en inglés)
print(f"{grande:_}")          # 1_234_567  (separador con guión bajo)

# Combina con decimales:
ingresos = 1234567.89
print(f"Ingresos: {ingresos:,.2f} €")`} />

      <ReplOutput>{`1,234,567
1_234_567
Ingresos: 1,234,567.89 €`}</ReplOutput>

      <Callout kind="info" title="Cadenas multilínea con triple comilla">
        Para textos largos con varias líneas, usa triple comilla. Respeta los saltos de línea
        tal como los escribes:
        <CodeBlock code={`mensaje = """Hola,

Esto es un mensaje
de varias líneas.

Saludos."""

print(mensaje)`} hideCopy />
      </Callout>

      <h2>Recorrer una cadena</h2>

      <p>
        Como cualquier secuencia, una cadena se puede recorrer con un <code>for</code> — vuelta a vuelta
        toma cada carácter:
      </p>

      <CodeBlock code={`palabra = "Python"

for letra in palabra:
    print(letra)

# Si necesitas el índice también:
for i, letra in enumerate(palabra):
    print(f"{i}: {letra}")`} />

      <ReplOutput>{`P
y
t
h
o
n
0: P
1: y
2: t
3: h
4: o
5: n`}</ReplOutput>

      <p>Un caso útil clásico: contar algo letra a letra:</p>

      <CodeBlock code={`# Contar vocales en una frase
frase = "Programar es como escribir cartas a un alienígena obediente"
vocales = 0

for letra in frase.lower():
    if letra in "aeiouáéíóú":
        vocales += 1

print(f"La frase tiene {vocales} vocales.")`} />

      <ReplOutput>La frase tiene 23 vocales.</ReplOutput>

      <Callout kind="tip" title="Fíjate en la condición">
        <code>letra in "aeiou"</code> hace exactamente lo mismo que comprobar elemento a elemento.
        Cuando el operador <code>in</code> se usa con una cadena, devuelve True si el carácter (o
        subcadena) está dentro. Es uno de los trucos más limpios de Python.
      </Callout>

      <Quiz
        question='Sea s = "Hola Mundo". ¿Qué imprime s.split()[1][::-1] ?'
        options={['"Hola"', '"odnuM"', '"aloH"', '"Mundo"']}
        correct={1}
        explanation='Paso a paso: s.split() devuelve ["Hola", "Mundo"]. Tomar [1] da "Mundo". Y [::-1] invierte la cadena → "odnuM". Encadenar operaciones así es muy pythónico, aunque a veces vale la pena partirlo en varias líneas para que se entienda mejor.'
      />

      <h2>Caracteres especiales: secuencias de escape</h2>

      <p>
        Algunas cosas son difíciles de meter literalmente en una cadena: un salto de línea,
        una tabulación, una comilla del mismo tipo que las que la rodean. Para eso existen las
        <strong>secuencias de escape</strong>: dos caracteres que empiezan con barra invertida
        <code> \ </code> y representan algo especial.
      </p>

      <CodeBlock code={`print("Línea 1\\nLínea 2")          # \\n = salto de línea
print("Columna1\\tColumna2")        # \\t = tabulación
print("Ella dijo \\"hola\\"")        # comilla doble dentro de "..."
print('Es de él\\'s perro')          # comilla simple dentro de '...'
print("Barra: \\\\")                  # barra invertida literal`} />

      <ReplOutput>{`Línea 1
Línea 2
Columna1	Columna2
Ella dijo "hola"
Es de él's perro
Barra: \\`}</ReplOutput>

      <Callout kind="info" title="¿Y si no quieres que la barra escape?">
        A veces (por ejemplo en rutas de Windows) lo último que quieres es que <code>\n</code> sea
        un salto de línea. Para esos casos existen las <em>raw strings</em>: pones una <code>r</code>
        antes de las comillas y todo se trata literal:
        <code> r"C:\nombre\archivo.txt"</code>. Lo verás en módulos posteriores.
      </Callout>

      <h2>Un ejemplo completo: limpiar y formatear datos</h2>

      <p>
        Vamos a juntar varias técnicas para resolver un problema real: limpiar una línea sucia
        que parece venir de un formulario mal hecho.
      </p>

      <CodeBlock code={`# Línea sucia que llega del formulario
linea = "  ANA   ;  ana@ejemplo.COM ;  +34 600 11 22 33  "

# Paso 1: partir por ";" y limpiar cada campo
campos = linea.split(";")
campos_limpios = []
for c in campos:
    campos_limpios.append(c.strip())

print(campos_limpios)
# → ['ANA', 'ana@ejemplo.COM', '+34 600 11 22 33']

# Paso 2: normalizar
nombre, email, telefono = campos_limpios
nombre = nombre.title()                          # "Ana"
email = email.lower()                            # "ana@ejemplo.com"
telefono = telefono.replace(" ", "")             # "+34600112233"

# Paso 3: mostrar bonito
print(f"Nombre:   {nombre}")
print(f"Email:    {email}")
print(f"Teléfono: {telefono}")`} />

      <ReplOutput>{`['ANA', 'ana@ejemplo.COM', '+34 600 11 22 33']
Nombre:   Ana
Email:    ana@ejemplo.com
Teléfono: +34600112233`}</ReplOutput>

      <p>
        Cada paso usa una herramienta del módulo. Esto es lo que en el mundo real se llama
        <em> "data cleaning"</em>, y es probablemente la actividad a la que más tiempo dedica
        una programadora de datos.
      </p>

      <PullQuote>
        Las cadenas parecen tontas hasta el día en que descubres que casi todo lo que recibes
        de internet es una cadena que hay que entender. Saber manipularlas bien es <em>media
        carrera</em>.
      </PullQuote>

      <h2>Ejercicios</h2>

      <Exercise
        number="7.1"
        title="Saludo formal"
        difficulty="fácil"
        runner={{
          initial: `# Pide al usuario su nombre.
# Limpia los espacios sobrantes y capitaliza
# correctamente (primera letra en mayúscula,
# el resto en minúscula).
#
# Saluda: "Estimado/a [Nombre],"

`,
          hint: 'Usa .strip() para los espacios y .title() (o .capitalize()) para capitalizar. Después una f-string con el saludo.',
          solution: {
            code: `nombre = input("Tu nombre: ").strip().title()
print(f"Estimado/a {nombre},")`,
            explanation: 'Encadenar dos métodos en una sola línea es muy idiomático. Primero strip() limpia, después title() capitaliza. Como cada uno devuelve una nueva cadena, los podemos pegar sin variables intermedias.',
          },
        }}
      >
        <p>Limpieza básica con <code>strip</code> y capitalización.</p>
      </Exercise>

      <Exercise
        number="7.2"
        title="Contador de palabras"
        difficulty="fácil"
        runner={{
          initial: `# Pide al usuario una frase.
# Cuenta cuántas PALABRAS tiene y muéstralo así:
#   "Tu frase tiene N palabras."
#
# Pista: split() sin argumentos separa por espacios.

`,
          hint: 'frase = input(...). palabras = frase.split(). len(palabras). Una f-string con eso.',
          solution: {
            code: `frase = input("Escribe una frase: ")
palabras = frase.split()
print(f"Tu frase tiene {len(palabras)} palabras.")`,
            explanation: 'split() sin argumento es astuto: trata cualquier número de espacios (uno, varios, tabuladores) como un solo separador, e ignora los espacios al principio y al final. Perfecto para contar palabras.',
          },
        }}
      >
        <p>Tu primer análisis de texto con <code>split</code> y <code>len</code>.</p>
      </Exercise>

      <Exercise
        number="7.3"
        title="¿Es un palíndromo?"
        difficulty="media"
        runner={{
          initial: `# Un palíndromo es una palabra que se lee
# igual al derecho que al revés (ignorando
# mayúsculas y espacios). Ejemplos:
#   "ana", "Anita lava la tina", "reconocer"
#
# Escribe una función  es_palindromo(texto)
# que devuelva True o False.
#
# Pruébala con varias palabras.

def es_palindromo(texto):
    pass

print(es_palindromo("Anita lava la tina"))   # True
print(es_palindromo("Hola"))                  # False`,
          hint: 'Tres pasos: (1) limpia el texto: pásalo a minúsculas Y quita los espacios (con .replace(" ", "")), (2) invierte la cadena con [::-1], (3) compara con la original con ==.',
          solution: {
            code: `def es_palindromo(texto):
    limpio = texto.lower().replace(" ", "")
    return limpio == limpio[::-1]

print(es_palindromo("Anita lava la tina"))   # True
print(es_palindromo("Hola"))                  # False
print(es_palindromo("reconocer"))             # True`,
            explanation: 'La clave es darse cuenta de que la respuesta es solo "¿el texto limpio es igual a sí mismo invertido?". Eso es una sola línea: limpio == limpio[::-1]. El resto es preparar el texto. Una función limpia y pequeña.',
          },
        }}
      >
        <p>Un clásico de las entrevistas técnicas. Junta varias técnicas del módulo.</p>
      </Exercise>

      <Exercise
        number="7.4"
        title="Tabla de productos"
        difficulty="media"
        runner={{
          initial: `# Dada esta lista de productos, imprime una tabla
# alineada como esta:
#
#   Pan          1.20 €
#   Leche        0.95 €
#   Huevos       2.50 €
#   Mantequilla  3.75 €
#
# El nombre ocupa 12 caracteres alineado a la
# izquierda y el precio va con DOS DECIMALES.

productos = [
    ("Pan", 1.2),
    ("Leche", 0.95),
    ("Huevos", 2.5),
    ("Mantequilla", 3.75),
]

`,
          hint: 'Recorre con un for nombre, precio in productos: y usa una f-string con {nombre:12}{precio:>6.2f}. El {:12} reserva 12 caracteres para el nombre. El {precio:>6.2f} alinea a la derecha en 6 caracteres con 2 decimales.',
          solution: {
            code: `productos = [
    ("Pan", 1.2),
    ("Leche", 0.95),
    ("Huevos", 2.5),
    ("Mantequilla", 3.75),
]

for nombre, precio in productos:
    print(f"{nombre:12} {precio:>6.2f} €")`,
            explanation: 'Desempaquetar la tupla directamente en el for (nombre, precio) ya lo hicimos en el módulo anterior — aquí lo combinamos con los especificadores de formato. Esta es la forma idiomática de imprimir tablas en Python.',
          },
        }}
      >
        <p>Aplica el formato de f-strings para alinear datos en columnas.</p>
      </Exercise>

      <Exercise
        number="7.5"
        title="Parser de CSV mini"
        difficulty="media"
        runner={{
          initial: `# Tenemos un "archivo CSV" como una cadena multilínea.
# Cada línea: nombre,edad,ciudad  (separados por comas).
#
# Tareas:
#  1) Recorre cada línea (split por "\\n").
#  2) Parte cada línea por "," y limpia espacios.
#  3) Muestra una línea por persona con formato:
#       "Ana (25 años) vive en Madrid."

datos = """Ana, 25, Madrid
Luis, 30, Barcelona
Sofía, 22, Sevilla"""

`,
          hint: 'datos.split("\\n") da las líneas. Para cada línea, otro split(",") da los tres campos. Quita espacios con strip() en cada uno. Después convierte la edad a int si quieres, y haz un print con f-string.',
          solution: {
            code: `datos = """Ana, 25, Madrid
Luis, 30, Barcelona
Sofía, 22, Sevilla"""

for linea in datos.split("\\n"):
    campos = linea.split(",")
    nombre = campos[0].strip()
    edad = campos[1].strip()
    ciudad = campos[2].strip()
    print(f"{nombre} ({edad} años) vive en {ciudad}.")`,
            explanation: 'Acabas de escribir un mini-parser de CSV. Lo gracioso: el código que has hecho es básicamente lo mismo que hace la librería csv de Python por dentro, solo que ellos manejan casos extremos (comas dentro de campos, comillas, etc.). Para datos sencillos, tu versión es suficiente.',
          },
        }}
      >
        <p>Un ejercicio que parece avanzado, pero es solo combinar lo aprendido.</p>
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
          <li>Las cadenas son <strong>secuencias inmutables</strong> de caracteres.</li>
          <li>Indexación y slicing igual que en listas: <code>s[0]</code>, <code>s[1:4]</code>, <code>s[::-1]</code>.</li>
          <li>Mayúsculas: <code>.upper()</code>, <code>.lower()</code>, <code>.title()</code>.</li>
          <li>Limpiar: <code>.strip()</code>, <code>.replace(a, b)</code>.</li>
          <li>Buscar: <code>in</code>, <code>.find(s)</code> (-1 si no está), <code>.count(s)</code>.</li>
          <li>Validar: <code>.isdigit()</code>, <code>.isalpha()</code>, <code>.startswith()</code>, <code>.endswith()</code>.</li>
          <li><strong>Split y join</strong>: convertir entre cadena y lista. El patrón rey al procesar datos.</li>
          <li>f-strings avanzadas: <code>{`{x:.2f}`}</code> decimales, <code>{`{x:10}`}</code> ancho, <code>{`{x:>10}`}</code> alineación, <code>{`{x:,}`}</code> separador de miles.</li>
          <li>Cadenas multilínea con triple comilla <code>"""..."""</code>.</li>
          <li>Escapes: <code>\n</code>, <code>\t</code>, <code>\"</code>, <code>\\</code>.</li>
        </ul>
      </div>

      <PullQuote>
        Has llegado al último contenido del Libro 1. Solo falta el proyecto final, donde vas a
        unir todo lo aprendido en algo que <em>parece</em> un programa profesional.
      </PullQuote>

      <ChapterNav
        prev={{ id: 'l1-m6', title: 'Listas y tuplas' }}
        next={{ id: 'l1-m8', title: 'Proyecto final básico' }}
        onNav={onNav}
      />
    </article>
  );
}

const thS = {
  padding: '10px 14px',
  fontFamily: 'var(--font-mono)',
  fontSize: '0.7rem',
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: 'var(--ink-3)',
  fontWeight: 500,
};

function SRow({ m, w, e, last }) {
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

window.ChapterL1M7 = ChapterL1M7;
