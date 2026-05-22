// =============================================================
// chapter-l1-m2.jsx — Libro 1, Módulo 2: Variables y tipos de datos
// =============================================================

function ChapterL1M2({ onNav }) {
  return (
    <article className="reader-inner">
      <ChapterHeader
        book="// libro 1 · primeros pasos"
        module="módulo 02"
        time="≈ 40 min"
        title={<>Variables y <em>tipos</em> de datos</>}
        dek="Hasta ahora tus programas no recuerdan nada. En este módulo aprenderás a guardar información para usarla después."
      />

      <p>
        En el módulo anterior aprendiste a mostrar texto en pantalla con <code>print</code>.
        Pero un programa que solo muestra cosas y nunca recuerda nada es como una persona con
        amnesia total: cada instrucción ocurre, e inmediatamente se olvida.
      </p>

      <p>
        Para que un programa sea útil de verdad necesita <strong>memoria</strong>: una forma de
        guardar valores para usarlos después. En programación, a esos "espacios de memoria con
        nombre" se les llama <strong>variables</strong>. Son la idea más importante de todo el módulo.
      </p>

      <h2>¿Qué es una variable?</h2>

      <p>
        Imagina que tienes una caja con una etiqueta. En la etiqueta escribes un nombre — por
        ejemplo, <em>"edad"</em> — y dentro de la caja guardas un valor — por ejemplo, el número 25.
        A partir de ese momento, cada vez que quieras ese 25, no tienes que recordar el número:
        pides el contenido de la caja "edad" y listo.
      </p>

      <p>Eso es una variable. Vamos a verlo en Python:</p>

      <CodeBlock code={`edad = 25
print(edad)`} />

      <ReplOutput>25</ReplOutput>

      <p>
        Tres cosas pasaron aquí. Léelas despacio porque vas a hacer esto un millón de veces en tu vida:
      </p>

      <ol>
        <li>Escribimos un <strong>nombre</strong>: <code>edad</code>.</li>
        <li>Pusimos el signo <strong>igual</strong> <code>=</code>. En Python, el <code>=</code> NO significa
          "es igual a" — significa <strong>"guarda el valor de la derecha en el nombre de la izquierda"</strong>.</li>
        <li>A la derecha pusimos el <strong>valor</strong>: <code>25</code>.</li>
      </ol>

      <p>
        Cuando después escribimos <code>print(edad)</code>, Python no muestra la palabra "edad" — muestra
        lo que <em>contiene</em> esa variable: el número 25.
      </p>

      <Callout kind="info" title="El signo igual va al revés de lo que parece">
        Cuando lees <code>edad = 25</code>, no lo leas como "edad es igual a 25". Léelo como
        <strong> "edad recibe el valor 25"</strong> o <strong>"guarda 25 en edad"</strong>.
        Esto te va a evitar muchas confusiones cuando lleguemos a cosas como <code>x = x + 1</code>.
      </Callout>

      <h3>Reutilizar y cambiar el valor</h3>

      <p>
        Una vez que tienes una variable, puedes usarla en cualquier sitio donde podrías usar el valor.
        Y puedes cambiar su contenido cuando quieras — por eso se llaman "variables", su valor varía:
      </p>

      <CodeBlock code={`edad = 25
print("Tienes", edad, "años")

edad = 26
print("Ahora tienes", edad, "años")`} />

      <ReplOutput>{`Tienes 25 años
Ahora tienes 26 años`}</ReplOutput>

      <p>
        Date cuenta de una cosa importante: <strong>la variable solo recuerda su valor más reciente</strong>.
        Cuando hicimos <code>edad = 26</code>, el 25 desapareció para siempre. La caja no acumula
        valores: cada vez que metes algo nuevo, lo viejo se va a la basura.
      </p>

      <h3>Las reglas para los nombres</h3>

      <p>
        No puedes llamar a una variable como te de la gana. Python tiene unas reglas:
      </p>

      <ul>
        <li>Solo letras, números y guión bajo <code>_</code>. <strong>Nada de espacios ni guiones.</strong></li>
        <li>No puede empezar por un número. <code>edad1</code> sí; <code>1edad</code> no.</li>
        <li>Distingue mayúsculas y minúsculas. <code>edad</code> y <code>Edad</code> son <strong>dos variables distintas</strong>.</li>
        <li>No puedes usar palabras reservadas del lenguaje como <code>if</code>, <code>for</code>, <code>print</code>, <code>True</code>...</li>
      </ul>

      <p>Y, aunque no es una regla técnica, hay <strong>convenciones</strong> que sí debes seguir:</p>

      <ul>
        <li>Nombres en <strong>minúsculas</strong>: <code>edad</code>, no <code>Edad</code>.</li>
        <li>Si el nombre tiene varias palabras, sepáralas con guión bajo: <code>edad_del_usuario</code>, no <code>edaddelusuario</code> ni <code>edadDelUsuario</code>.</li>
        <li>Usa nombres <strong>descriptivos</strong>. <code>x</code> y <code>a</code> son una pésima idea casi siempre.</li>
      </ul>

      <Callout kind="warn" title="¡Cuidado! Nombres mal puestos = bugs invisibles">
        Python distingue mayúsculas. Si guardas <code>edad = 25</code> y después escribes <code>print(Edad)</code>,
        no recibirás 25 — recibirás un <code>NameError</code>. Y como no es un error de sintaxis,
        a primera vista parece que el programa "está bien". Cuidado.
      </Callout>

      <Quiz
        question="¿Cuál de estos NO es un nombre válido para una variable en Python?"
        options={[
          'mi_edad',
          '_total',
          '2_intentos',
          'usuarioFinal',
        ]}
        correct={2}
        explanation="Los nombres de variable no pueden empezar por un número. '2_intentos' falla. 'mi_edad', '_total' y 'usuarioFinal' son todos válidos — aunque 'usuarioFinal' rompe la convención de Python (debería ser 'usuario_final')."
      />

      <h2>Los cuatro tipos básicos</h2>

      <p>
        Todas las variables guardan <strong>algún tipo</strong> de dato. En Python no tienes que decirle
        a la variable qué tipo va a guardar (a diferencia de otros lenguajes), pero Python lo sabe
        internamente y te trata distinto según lo que pongas. Estos son los cuatro tipos con los que
        vas a vivir el 90% del tiempo:
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: 'var(--s-3)',
        margin: 'var(--s-5) 0',
      }} className="type-grid">
        <TypeCard tag="int" title="Enteros" example="42, 0, -7" desc="Números sin parte decimal. Para contar cosas, edades, posiciones." />
        <TypeCard tag="float" title="Decimales" example="3.14, 0.5, -2.75" desc="Números con punto decimal. Para precios, mediciones, promedios." />
        <TypeCard tag="str" title="Cadenas" example='"hola", "Ana"' desc="Textos. Cualquier cosa entre comillas. Para nombres, frases, símbolos." />
        <TypeCard tag="bool" title="Booleanos" example="True, False" desc="Solo dos valores posibles: verdadero o falso. Para condiciones, banderas." />
        <style>{`@media (max-width: 720px) { .type-grid { grid-template-columns: 1fr !important; } }`}</style>
      </div>

      <h3>Enteros — <code>int</code></h3>

      <p>
        Los <strong>enteros</strong> son números sin decimales. Pueden ser positivos, negativos o cero.
        En Python puedes hacer matemáticas con ellos como en una calculadora:
      </p>

      <CodeBlock code={`anos = 30
hijos = 2
suma = anos + hijos
print(suma)

# Operaciones disponibles:
print(7 + 3)    # suma
print(7 - 3)    # resta
print(7 * 3)    # multiplicación
print(7 / 3)    # división (¡da un decimal!)
print(7 // 3)   # división entera (descarta los decimales)
print(7 % 3)    # resto de la división
print(7 ** 3)   # potencia (7 elevado a 3)`} />

      <ReplOutput>{`32
10
4
21
2.3333333333333335
2
1
343`}</ReplOutput>

      <Callout kind="tip" title="División normal vs división entera">
        Ojo con la diferencia: <code>7 / 3</code> da <code>2.333...</code> (un <em>decimal</em>),
        mientras que <code>7 // 3</code> da <code>2</code> (un <em>entero</em>, descartando lo
        que sobra). Si solo te interesa "cuántas veces cabe", usa <code>//</code>.
        Si quieres el resultado exacto, usa <code>/</code>.
      </Callout>

      <h3>Decimales — <code>float</code></h3>

      <p>
        Los <strong>decimales</strong>, llamados <code>float</code> (de <em>floating point</em>, punto
        flotante), son números con parte decimal. <strong>El separador es el punto, no la coma</strong>,
        aunque escribamos en español:
      </p>

      <CodeBlock code={`precio = 19.99
descuento = 0.15
final = precio - precio * descuento
print(final)`} />

      <ReplOutput>16.9915</ReplOutput>

      <Callout kind="warn" title="¡Cuidado! Coma decimal NO funciona">
        En español escribimos <em>19,99 euros</em>. Pero en Python (y en casi todos los lenguajes
        de programación) el separador decimal es el <strong>punto</strong>: <code>19.99</code>.
        Si pones <code>19,99</code>, Python pensará que son dos valores separados por una coma.
      </Callout>

      <h3>Cadenas de texto — <code>str</code></h3>

      <p>
        Las <strong>cadenas</strong> (en inglés <em>strings</em>) son textos. Van entre comillas. Pueden
        ser comillas dobles o simples — ambas funcionan, lo importante es que la cadena empiece y termine
        con el mismo tipo:
      </p>

      <CodeBlock code={`nombre = "Ana"
saludo = 'Hola'
print(saludo, nombre)

# También puedes pegar (concatenar) cadenas con +
mensaje = saludo + ", " + nombre
print(mensaje)

# Y repetirlas con *
risa = "ja" * 5
print(risa)`} />

      <ReplOutput>{`Hola Ana
Hola, Ana
jajajajaja`}</ReplOutput>

      <Callout kind="info" title="¿Comillas dobles o simples?">
        En Python son <strong>equivalentes</strong>. La regla práctica es: si tu texto contiene
        comillas dobles, usa simples por fuera (y viceversa). Ejemplo:
        <code> 'Ella dijo "hola"' </code> funciona perfecto. Y si tu texto tiene los dos,
        existe el truco de escapar la comilla con barra invertida: <code>"Ella dijo \"hola\""</code>.
      </Callout>

      <h3>Booleanos — <code>bool</code></h3>

      <p>
        Los <strong>booleanos</strong> solo tienen dos valores posibles: <code>True</code> (verdadero) y
        <code> False</code> (falso). Se usan para preguntas con respuesta de sí/no. <strong>Atención: van con la
        primera letra en mayúscula</strong>. <code>true</code> en minúsculas no funciona.
      </p>

      <CodeBlock code={`es_mayor = True
tiene_carnet = False

print(es_mayor)
print(tiene_carnet)

# Los booleanos suelen venir de comparaciones
print(18 >= 18)   # ¿18 es mayor o igual a 18?
print("Ana" == "Pedro")   # ¿son la misma cadena?`} />

      <ReplOutput>{`True
False
True
False`}</ReplOutput>

      <Callout kind="tip" title="¿Por qué se llaman booleanos?">
        Por <strong>George Boole</strong>, un matemático del siglo XIX que inventó el álgebra
        que lleva su nombre. Toda la electrónica digital — y por tanto las computadoras —
        están construidas sobre su trabajo. Curioso, ¿no?
      </Callout>

      <h3>Saber qué tipo tiene una variable</h3>

      <p>
        Si alguna vez tienes dudas sobre qué tipo guarda una variable, pregúntaselo a Python con
        la función <code>type</code>:
      </p>

      <CodeBlock code={`edad = 30
precio = 19.99
nombre = "Ana"
activo = True

print(type(edad))
print(type(precio))
print(type(nombre))
print(type(activo))`} />

      <ReplOutput>{`<class 'int'>
<class 'float'>
<class 'str'>
<class 'bool'>`}</ReplOutput>

      <Quiz
        question='¿Qué tipo tendrá la variable "x" después de ejecutar: x = "42" ?'
        options={[
          'int — es un número',
          'str — está entre comillas',
          'bool — porque sí',
          'float — porque tiene 2 dígitos',
        ]}
        correct={1}
        explanation='Las comillas son lo que define el tipo. Cualquier cosa entre comillas es una cadena de texto (str), aunque su contenido sean números. "42" y 42 se ven parecido pero son cosas completamente distintas para Python.'
      />

      <h2>Hablar con el usuario — la función <code>input</code></h2>

      <p>
        Hasta ahora todos los valores que guardabas en variables los escribías tú en el código.
        Pero un programa real recibe información de alguien que lo usa. Para pedirle datos
        al usuario, Python tiene la función <code>input</code>.
      </p>

      <p>
        Cuando Python ejecuta <code>input(...)</code>, hace tres cosas:
      </p>

      <ol>
        <li>Muestra el texto que le pasas dentro de los paréntesis (el "prompt", o aviso).</li>
        <li>Se queda <strong>esperando</strong> a que el usuario escriba algo y pulse Enter.</li>
        <li>Devuelve lo que el usuario escribió, como una <strong>cadena de texto</strong>.</li>
      </ol>

      <CodeBlock code={`nombre = input("¿Cómo te llamas? ")
print("Hola,", nombre)`} />

      <p>Si el usuario escribe <em>Ana</em> y pulsa Enter, verá:</p>

      <ReplOutput>{`¿Cómo te llamas? Ana
Hola, Ana`}</ReplOutput>

      <Callout kind="warn" title="¡Cuidado! input SIEMPRE devuelve texto">
        Esta es la trampa más común al empezar. Aunque el usuario escriba <em>25</em>, lo que
        Python guarda es la cadena <code>"25"</code>, no el número <code>25</code>. Si intentas
        hacer cuentas con eso, Python te va a regañar.
      </Callout>

      <p>Mira este ejemplo problemático:</p>

      <CodeBlock code={`edad = input("¿Cuántos años tienes? ")
print(edad + 1)`} />

      <p>El usuario escribe <code>25</code>. ¿Qué pasa? Python da un error:</p>

      <ReplOutput>{`TypeError: can only concatenate str (not "int") to str`}</ReplOutput>

      <p>
        Python te está diciendo: "intentaste sumar un número a una cadena, y eso no se puede".
        La solución es <strong>convertir</strong> el texto a número primero. Eso lo veremos a continuación.
      </p>

      <h2>Conversión de tipos</h2>

      <p>
        Convertir un valor de un tipo a otro se llama <strong>casting</strong> (o, en español, "conversión
        de tipos"). Python tiene una función dedicada para cada tipo, con un nombre fácil de recordar:
      </p>

      <CodeBlock code={`# Convertir texto a entero
edad_texto = "25"
edad = int(edad_texto)
print(edad + 1)

# Convertir texto a decimal
precio = float("19.99")
print(precio * 2)

# Convertir número a texto
ano = 2026
mensaje = "Estamos en " + str(ano)
print(mensaje)`} />

      <ReplOutput>{`26
39.98
Estamos en 2026`}</ReplOutput>

      <p>Y volviendo al ejemplo anterior, así se arregla:</p>

      <CodeBlock code={`edad = int(input("¿Cuántos años tienes? "))
print("El año que viene tendrás", edad + 1)`} />

      <p>
        Fíjate en el truco: estamos llamando a <code>int(...)</code> alrededor de <code>input(...)</code>.
        Python ejecuta primero la función de adentro (<code>input</code> pide el texto), y luego la
        de afuera (<code>int</code> lo convierte). Es como peinarse: primero te lavas el pelo, luego
        te peinas. El orden importa.
      </p>

      <Callout kind="warn" title="Cuidado: conversión imposible = error">
        Si intentas hacer <code>int("hola")</code>, Python no puede convertir eso a número y te
        dará un <code>ValueError</code>. Por ahora, asume que los usuarios escriben lo que pides
        (más adelante veremos cómo manejar entradas inválidas con <code>try/except</code>).
      </Callout>

      <h3>La tabla de conversiones</h3>

      <p>Memoriza este resumen — lo vas a usar todo el tiempo:</p>

      <div style={{
        margin: 'var(--s-5) 0',
        background: 'var(--paper-2)',
        border: '1px solid var(--border-soft)',
        borderRadius: 'var(--r-md)',
        overflow: 'hidden',
      }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.95rem' }}>
          <thead>
            <tr style={{ background: 'var(--paper-3)', textAlign: 'left' }}>
              <th style={{ padding: '10px 14px', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-3)' }}>Quieres pasar a…</th>
              <th style={{ padding: '10px 14px', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-3)' }}>Usas la función</th>
              <th style={{ padding: '10px 14px', fontFamily: 'var(--font-mono)', fontSize: '0.75rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-3)' }}>Ejemplo</th>
            </tr>
          </thead>
          <tbody>
            <TableRow tipo="Entero" fn="int(...)" ej={'int("25") → 25'} />
            <TableRow tipo="Decimal" fn="float(...)" ej={'float("3.14") → 3.14'} />
            <TableRow tipo="Texto" fn="str(...)" ej={'str(2026) → "2026"'} />
            <TableRow tipo="Booleano" fn="bool(...)" ej={'bool(0) → False'} last />
          </tbody>
        </table>
      </div>

      <h2>Formatear texto: f-strings (un adelanto)</h2>

      <p>
        Antes de cerrar el módulo, un truco que vas a usar en TODOS tus programas a partir de ya. Hasta
        ahora has visto <code>print("Hola,", nombre)</code> separando con comas, o el truco de pegar
        con <code>+</code>. Hay una forma mucho mejor: las <strong>f-strings</strong>.
      </p>

      <p>
        Una f-string es una cadena que empieza con la letra <code>f</code> antes de las comillas.
        Dentro de la cadena, puedes meter variables entre llaves <code>{'{}'}</code> y Python las
        reemplaza por su valor:
      </p>

      <CodeBlock code={`nombre = "Ana"
edad = 25
print(f"Hola, {nombre}. Tienes {edad} años.")

# Hasta puedes meter cálculos dentro de las llaves
precio = 19.99
print(f"Con IVA: {precio * 1.21} euros")`} />

      <ReplOutput>{`Hola, Ana. Tienes 25 años.
Con IVA: 24.1879 euros`}</ReplOutput>

      <Callout kind="success" title="A partir de ahora, usa siempre f-strings">
        Son más fáciles de leer, no te obligan a convertir números a texto manualmente y
        evitan errores de espaciado. En el resto del libro las verás constantemente.
      </Callout>

      <Quiz
        question="¿Cuál de estas líneas guarda el número 7 (no el texto '7') en una variable llamada cantidad?"
        options={[
          'cantidad = "7"',
          'cantidad = int(input("¿Cuántos? "))',
          'cantidad = input("¿Cuántos? ")',
          'cantidad = "siete"',
        ]}
        correct={1}
        explanation={`input() siempre devuelve un texto. Para convertir esa entrada en un número entero, hay que envolverla en int(). La opción 1 guarda la cadena "7", la 3 guarda el texto que escribió el usuario sin convertir, y la 4 guarda otra cadena.`}
      />

      <h2>Ejercicios</h2>

      <p style={{ color: 'var(--ink-2)' }}>
        Cinco ejercicios. Empieza por el primero y avanza en orden. Cuando estés atascada,
        usa la pista; cuando estés <em>realmente</em> atascada, abre la solución y entiéndela
        antes de seguir.
      </p>

      <Exercise
        number="2.1"
        title="Tu ficha personal"
        difficulty="fácil"
        runner={{
          initial: `# Crea tres variables: tu nombre (texto),
# tu edad (entero) y tu altura en metros (decimal).
#
# Luego muéstralas con un print y una f-string,
# en una sola línea que diga algo como:
#
#   Soy Ana, tengo 25 años y mido 1.65 metros.

nombre = ""
edad = 0
altura = 0.0

print(f"...")`,
          hint: 'Reemplaza los valores iniciales por los tuyos. Después escribe la f-string usando {nombre}, {edad}, {altura} dentro del texto.',
          solution: {
            code: `nombre = "Ana"
edad = 25
altura = 1.65

print(f"Soy {nombre}, tengo {edad} años y mido {altura} metros.")`,
            explanation: 'Cada variable guarda su valor con su propio tipo. La f-string mezcla todo en una sola línea de texto, sin que tengas que convertir nada.',
          },
        }}
      >
        <p>Vamos a usar los cuatro tipos básicos en algo concreto.</p>
      </Exercise>

      <Exercise
        number="2.2"
        title="Calculadora de propinas"
        difficulty="fácil"
        runner={{
          initial: `# Una propina del 10% sobre una cuenta del restaurante.
#
# 1) Crea una variable "cuenta" con el valor 45.50
# 2) Calcula la propina (10% de la cuenta) y guárdala en "propina"
# 3) Calcula el total (cuenta + propina) y guárdalo en "total"
# 4) Muestra las tres cantidades con una f-string.

`,
          hint: 'El 10% de un número es ese número multiplicado por 0.10. La f-string puede tener varias variables {cuenta}, {propina}, {total}.',
          solution: {
            code: `cuenta = 45.50
propina = cuenta * 0.10
total = cuenta + propina

print(f"Cuenta: {cuenta}")
print(f"Propina (10%): {propina}")
print(f"Total: {total}")`,
            explanation: 'Las variables guardan resultados intermedios. Eso hace el código más legible: en vez de meter el cálculo dentro del print, le pones nombre y luego lo usas. Cada nombre cuenta una parte de la historia.',
          },
        }}
      >
        <p>Aplicaciones de cálculo: el "hola mundo" de los datos.</p>
      </Exercise>

      <Exercise
        number="2.3"
        title="Conversor de años a días"
        difficulty="media"
        runner={{
          initial: `# Pídele al usuario su edad en años.
# Calcula y muestra aproximadamente cuántos
# DÍAS ha vivido (asume 365 días por año).
#
# IMPORTANTE: input() te devuelve un TEXTO,
# así que tendrás que convertirlo.

`,
          hint: 'Usa int(input(...)) para guardar la edad como entero. Luego multiplícala por 365 dentro de una f-string o de un print.',
          solution: {
            code: `edad = int(input("¿Cuántos años tienes? "))
dias = edad * 365
print(f"Has vivido aproximadamente {dias} días.")`,
            explanation: 'Sin el int() alrededor del input(), edad sería el texto "25" en lugar del número 25, y "25" * 365 daría como resultado... un texto enorme repetido 365 veces. ¡Pruébalo! El casting es esencial.',
          },
        }}
      >
        <p>Aquí necesitas convertir tipos. Recuerda: <code>input</code> siempre devuelve texto.</p>
      </Exercise>

      <Exercise
        number="2.4"
        title="Intercambio de variables"
        difficulty="media"
        runner={{
          initial: `# Tienes dos variables con valores.
# Sin perder ninguno de los dos, haz que
# "a" tenga el valor original de "b", y "b"
# tenga el valor original de "a".
#
# Después de tu código, los prints deben mostrar:
#   a = 200
#   b = 100

a = 100
b = 200

# escribe tu código aquí

print(f"a = {a}")
print(f"b = {b}")`,
          hint: 'Si simplemente haces a = b, perdiste el valor original de a. Una solución clásica usa una tercera variable temporal: aux = a, después a = b, después b = aux. Python además tiene un truco para hacerlo en una sola línea.',
          solution: {
            code: `a = 100
b = 200

# Versión clásica con variable temporal:
aux = a
a = b
b = aux

# Versión "pythonica" en una sola línea:
# a, b = b, a

print(f"a = {a}")
print(f"b = {b}")`,
            explanation: 'Este es un clásico de las entrevistas de programación. La solución elegante con a, b = b, a la veremos a fondo en el módulo de tuplas. Por ahora, entender la versión con variable temporal es lo importante.',
          },
        }}
      >
        <p>Un ejercicio que parece tonto pero enseña una idea profunda sobre cómo funcionan las variables.</p>
      </Exercise>

      <Exercise
        number="2.5"
        title="Tu primera mini-app interactiva"
        difficulty="media"
        runner={{
          initial: `# Construye un programa que:
#  1) Pregunte el nombre del usuario.
#  2) Pregunte su año de nacimiento.
#  3) Calcule su edad aproximada (asume el año actual = 2026).
#  4) Muestre un mensaje personalizado, por ejemplo:
#     "Hola, Ana. En 2026 cumples 25 años."

# tu código aquí

`,
          hint: 'Dos input(): uno para el nombre (no necesita conversión, ya es texto) y otro para el año de nacimiento (sí necesita int()). Después: edad = 2026 - año_nacimiento. Por último, una f-string con todo.',
          solution: {
            code: `nombre = input("¿Cómo te llamas? ")
ano_nacimiento = int(input("¿En qué año naciste? "))
edad = 2026 - ano_nacimiento

print(f"Hola, {nombre}. En 2026 cumples {edad} años.")`,
            explanation: 'Acabas de escribir tu primera mini-aplicación interactiva: recibe datos, los procesa y muestra un resultado personalizado. Toda la programación es, en el fondo, variaciones más complejas de este patrón.',
          },
        }}
      >
        <p>Combina todo: <code>input</code>, conversión de tipos, cálculo, y una f-string final.</p>
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
          <li>Una <strong>variable</strong> es una caja con nombre donde Python guarda un valor.</li>
          <li>El <code>=</code> se lee como <em>"recibe"</em>: <code>nombre = "Ana"</code> = "guarda Ana en nombre".</li>
          <li>Los nombres llevan <strong>minúsculas</strong>, sin espacios, separadas por <code>_</code>.</li>
          <li>Los cuatro tipos básicos: <code>int</code> (enteros), <code>float</code> (decimales), <code>str</code> (cadenas), <code>bool</code> (verdadero/falso).</li>
          <li><code>input("texto")</code> pide datos al usuario y <strong>siempre</strong> devuelve un texto.</li>
          <li>Para convertir: <code>int()</code>, <code>float()</code>, <code>str()</code>, <code>bool()</code>.</li>
          <li>Las <strong>f-strings</strong> son la forma moderna de formatear texto: <code>f"Hola {'{nombre}'}"</code>.</li>
          <li><code>type(variable)</code> te dice qué tipo guarda una variable.</li>
        </ul>
      </div>

      <PullQuote>
        Hasta ahora tus programas hacían siempre lo mismo. En el próximo módulo, gracias a los
        <em> operadores </em>, podrán empezar a tomar decisiones.
      </PullQuote>

      <ChapterNav
        prev={{ id: 'l1-m1', title: '¿Qué es programar?' }}
        next={{ id: 'l1-m3', title: 'Operadores y expresiones' }}
        onNav={onNav}
      />
    </article>
  );
}

function TypeCard({ tag, title, example, desc }) {
  return (
    <div style={{
      background: 'var(--paper-2)',
      border: '1px solid var(--border-soft)',
      borderRadius: 'var(--r-md)',
      padding: 'var(--s-4)',
    }}>
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.78rem',
        letterSpacing: '0.08em',
        color: 'var(--highlight)',
        background: 'var(--highlight-soft)',
        display: 'inline-block',
        padding: '2px 8px',
        borderRadius: 'var(--r-xs)',
        marginBottom: 'var(--s-2)',
        fontWeight: 600,
      }}>{tag}</div>
      <div style={{
        fontFamily: 'var(--font-display)',
        fontSize: '1.3rem',
        fontWeight: 500,
        letterSpacing: '-0.01em',
        marginBottom: 4,
      }}>{title}</div>
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.85rem',
        color: 'var(--ink-2)',
        marginBottom: 6,
        background: 'var(--paper)',
        padding: '3px 8px',
        borderRadius: 'var(--r-xs)',
        display: 'inline-block',
        border: '1px solid var(--border-soft)',
      }}>{example}</div>
      <p style={{ margin: 0, fontSize: '0.92rem', color: 'var(--ink-2)', lineHeight: 1.5 }}>{desc}</p>
    </div>
  );
}

function TableRow({ tipo, fn, ej, last }) {
  const cellStyle = {
    padding: '12px 14px',
    borderTop: last ? '0' : '1px solid var(--border-soft)',
  };
  return (
    <tr>
      <td style={cellStyle}>{tipo}</td>
      <td style={{ ...cellStyle, fontFamily: 'var(--font-mono)', color: 'var(--accent)' }}>{fn}</td>
      <td style={{ ...cellStyle, fontFamily: 'var(--font-mono)', color: 'var(--ink-2)', fontSize: '0.9rem' }}>{ej}</td>
    </tr>
  );
}

window.ChapterL1M2 = ChapterL1M2;
