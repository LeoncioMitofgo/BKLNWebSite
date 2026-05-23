// =============================================================
// chapter-l1-m5.jsx — Libro 1, Módulo 5: Funciones
// =============================================================

function ChapterL1M5({ onNav }) {
  return (
    <article className="reader-inner">
      <ChapterHeader
        book="// libro 1 · primeros pasos"
        module="módulo 05"
        time="≈ 45 min"
        title={<>Funciones</>}
        dek="Empacar bloques de código con nombre. Es lo que separa los scripts sueltos de los programas de verdad."
      />

      <p>
        Imagina que cada vez que quisieras hacer café tuvieras que explicar paso a paso cómo
        encender la cafetera, dosificar el café, calentar el agua y servir. Sería agotador.
        En la vida real, dices "haz café" y ya: alguien ya empaquetó esos pasos bajo ese nombre.
      </p>

      <p>
        Eso es exactamente una <strong>función</strong> en programación: <em>un bloque de código con
        nombre, que puedes ejecutar (llamar) cuantas veces quieras</em>. Definir bien tus funciones es la
        diferencia entre un programa que crece bien y uno que se vuelve un caos imposible de mantener.
      </p>

      <h2>Definir y llamar funciones</h2>

      <p>Vamos al ejemplo más simple posible:</p>

      <CodeBlock code={`def saludar():
    print("¡Hola!")
    print("Bienvenido al programa.")

# Llamar a la función (ejecutarla)
saludar()
saludar()`} />

      <ReplOutput>{`¡Hola!
Bienvenida al programa.
¡Hola!
Bienvenida al programa.`}</ReplOutput>

      <p>Las cuatro piezas clave:</p>

      <ol>
        <li><strong><code>def</code></strong>: la palabra clave para <em>definir</em> una función. Como <code>if</code> o <code>for</code>.</li>
        <li><strong>El nombre</strong> (<code>saludar</code>): elígelo descriptivo. Como las variables, en minúsculas con guiones bajos.</li>
        <li><strong>Los paréntesis</strong> <code>()</code>: ahora vacíos, pero ahí van los parámetros cuando los tenga.</li>
        <li><strong>Los dos puntos y la sangría</strong>: igual que en <code>if</code> y <code>for</code>. Todo lo sangrado pertenece a la función.</li>
      </ol>

      <p>
        Y luego, fuera de la definición, <strong>llamar</strong> a la función con su nombre y los paréntesis:
        <code> saludar()</code>. Eso ejecuta el bloque. Sin los paréntesis, Python no la llama — solo ve el nombre.
      </p>

      <Callout kind="info" title="Definir ≠ ejecutar">
        Definir una función no la ejecuta. Es como escribir una receta en un papel: tener la receta
        no es cocinar. <strong>Llamarla</strong> (poner los paréntesis) es lo que la ejecuta.
      </Callout>

      <h3>¿Por qué usar funciones?</h3>

      <ul>
        <li><strong>Reutilizar.</strong> Escríbelo una vez, úsalo cien.</li>
        <li><strong>Organizar.</strong> Un programa de 500 líneas sueltas es un infierno. 500 líneas repartidas en 20 funciones bien nombradas se lee como un libro.</li>
        <li><strong>Darle nombre a una idea.</strong> Ver <code>calcular_precio_con_iva(100)</code> es infinitamente más claro que ver <code>100 * 1.21</code> repetido por todo el código.</li>
        <li><strong>Probar y arreglar más fácil.</strong> Si algo falla, ya sabes en qué función mirar.</li>
      </ul>

      <h2>Parámetros y argumentos</h2>

      <p>
        Una función vacía como <code>saludar()</code> es útil, pero limitada. Lo que la hace
        poderosa es que <strong>puede recibir información</strong> cuando la llamas:
      </p>

      <CodeBlock code={`def saludar(nombre):
    print(f"¡Hola, {nombre}!")

saludar("Ana")
saludar("Luis")
saludar("Sofía")`} />

      <ReplOutput>{`¡Hola, Ana!
¡Hola, Luis!
¡Hola, Sofía!`}</ReplOutput>

      <p>Dos palabras nuevas que vale la pena diferenciar:</p>

      <ul>
        <li><strong>Parámetro</strong>: el nombre que aparece <em>al definir</em> la función (<code>nombre</code>, dentro de los paréntesis del <code>def</code>). Es como una variable local que solo existe dentro de la función.</li>
        <li><strong>Argumento</strong>: el valor real que pasas <em>al llamarla</em> (<code>"Ana"</code>, dentro de los paréntesis de la llamada).</li>
      </ul>

      <Callout kind="tip" title="No te obsesiones con los nombres">
        En la práctica casi todo el mundo usa "parámetro" y "argumento" como sinónimos.
        Tú sabe la diferencia, pero no te corrijas demasiado: lo importante es entender
        <em> qué hacen</em>.
      </Callout>

      <h3>Varios parámetros</h3>

      <CodeBlock code={`def saludar(nombre, idioma):
    if idioma == "es":
        print(f"¡Hola, {nombre}!")
    elif idioma == "en":
        print(f"Hello, {nombre}!")
    else:
        print(f"Bonjour, {nombre}!")

saludar("Ana", "es")
saludar("John", "en")
saludar("Pierre", "fr")`} />

      <ReplOutput>{`¡Hola, Ana!
Hello, John!
Bonjour, Pierre!`}</ReplOutput>

      <p>El orden importa: el primer argumento va al primer parámetro, el segundo al segundo, y así.</p>

      <h3>Argumentos por nombre (keyword arguments)</h3>

      <p>
        Python te deja pasar los argumentos por <em>nombre</em>, no solo por orden. Útil cuando
        la función tiene muchos parámetros y no quieres acordarte del orden exacto:
      </p>

      <CodeBlock code={`def crear_perfil(nombre, edad, ciudad):
    print(f"{nombre}, {edad} años, vive en {ciudad}")

# Por posición:
crear_perfil("Ana", 25, "Madrid")

# Por nombre (más legible):
crear_perfil(nombre="Ana", ciudad="Madrid", edad=25)

# Mezcla: posicionales primero, después los con nombre
crear_perfil("Ana", ciudad="Madrid", edad=25)`} />

      <ReplOutput>{`Ana, 25 años, vive en Madrid
Ana, 25 años, vive en Madrid
Ana, 25 años, vive en Madrid`}</ReplOutput>

      <h3>Valores por defecto</h3>

      <p>
        Puedes darle a un parámetro un valor <strong>por defecto</strong>. Si quien llama a la
        función no lo proporciona, se usa el valor por defecto:
      </p>

      <CodeBlock code={`def saludar(nombre, idioma="es"):
    if idioma == "es":
        print(f"¡Hola, {nombre}!")
    else:
        print(f"Hello, {nombre}!")

saludar("Ana")              # usa el valor por defecto "es"
saludar("John", "en")       # sobrescribe el valor por defecto
saludar("Pierre", idioma="en")`} />

      <ReplOutput>{`¡Hola, Ana!
Hello, John!
Hello, Pierre!`}</ReplOutput>

      <Callout kind="warn" title="Los parámetros con default van AL FINAL">
        Esto da error: <code>def f(idioma="es", nombre):</code>. La regla es: <strong>primero los
        parámetros obligatorios, después los que tienen valor por defecto</strong>. Tiene sentido:
        si lo hicieras al revés, no podrías saber qué argumento es cuál cuando llamas con menos
        argumentos.
      </Callout>

      <Quiz
        question='Si defino:  def f(a, b=10, c=20):  ¿cuál de estas llamadas es INVÁLIDA?'
        options={[
          'f(1)',
          'f(1, 2)',
          'f(1, c=5)',
          'f(b=2, c=3)',
        ]}
        correct={3}
        explanation='La cuarta llamada f(b=2, c=3) no proporciona valor para "a", que es obligatorio (no tiene default). Las otras tres son válidas: "a" recibe 1, y b/c usan default si no se pasan o el valor dado si sí.'
      />

      <h2>Devolver valores: <code>return</code></h2>

      <p>
        Hasta ahora las funciones solo <em>hacían cosas</em> — imprimían texto. Pero la mayoría
        de las funciones útiles <strong>calculan algo y te lo devuelven</strong> para que tú lo uses
        donde quieras. Para eso está la palabra clave <code>return</code>.
      </p>

      <CodeBlock code={`def cuadrado(x):
    return x * x

resultado = cuadrado(7)
print(resultado)              # 49

# También puedes usarlo directamente en otra expresión:
print(cuadrado(3) + cuadrado(4))   # 9 + 16 = 25`} />

      <ReplOutput>{`49
25`}</ReplOutput>

      <p>Tres cosas que pasan cuando Python ejecuta <code>return</code>:</p>

      <ol>
        <li><strong>Evalúa</strong> la expresión que va después del <code>return</code>.</li>
        <li><strong>Sale</strong> de la función inmediatamente, aunque queden líneas debajo.</li>
        <li>El valor evaluado <strong>reemplaza a la llamada</strong> en el código que llamó a la función.</li>
      </ol>

      <h3><code>print</code> NO es lo mismo que <code>return</code></h3>

      <Callout kind="warn" title="¡Cuidado! El malentendido más común al empezar">
        <p style={{ margin: 0 }}>
          <code>print</code> y <code>return</code> hacen cosas <strong>completamente diferentes</strong>:
        </p>
        <ul style={{ margin: 'var(--s-2) 0 0', paddingLeft: '1.2em' }}>
          <li><code>print</code> muestra algo <em>al usuario</em>, en la pantalla.</li>
          <li><code>return</code> devuelve un valor <em>al código que llamó a la función</em>, para que pueda usarlo.</li>
        </ul>
      </Callout>

      <p>Mira la diferencia clara:</p>

      <CodeBlock code={`def cuadrado_print(x):
    print(x * x)

def cuadrado_return(x):
    return x * x

# Llamada 1: imprime 49, pero el "resultado" es None
a = cuadrado_print(7)
print(f"a vale: {a}")

# Llamada 2: no imprime nada por sí sola, pero el valor es 49
b = cuadrado_return(7)
print(f"b vale: {b}")

# Solo b se puede usar para más cálculos:
print(f"b * 2 = {b * 2}")
print(f"a * 2 = {a * 2}")  # 💥 ERROR: no se puede multiplicar None`} />

      <ReplOutput>{`49
a vale: None
b vale: 49
b * 2 = 98
TypeError: unsupported operand type(s) for *: 'NoneType' and 'int'`}</ReplOutput>

      <p>
        Cuando una función no tiene <code>return</code> explícito (o tiene un <code>return</code> sin valor),
        Python devuelve automáticamente <code>None</code>: un valor especial que significa
        "nada". Si intentas hacer cuentas con <code>None</code>, todo explota.
      </p>

      <Callout kind="tip" title="La regla del pulgar">
        Si tu función <strong>calcula algo</strong>, usa <code>return</code>.<br />
        Si tu función <strong>solo muestra algo o ejecuta una acción</strong>, sin necesidad de devolver
        nada (como guardar en un archivo, dibujar en pantalla), no necesitas <code>return</code>.
      </Callout>

      <h3>Salida temprana con <code>return</code></h3>

      <p>
        Cuando Python ejecuta un <code>return</code>, sale de la función inmediatamente. Esto
        te permite escribir funciones más claras evitando anidamientos profundos:
      </p>

      <CodeBlock code={`def calcular_descuento(precio, es_socio):
    # Salidas tempranas para los casos especiales:
    if precio <= 0:
        return 0
    if not es_socio:
        return precio

    # Caso principal: socio con precio válido
    return precio * 0.85

print(calcular_descuento(100, True))    # 85.0 (15% descuento)
print(calcular_descuento(100, False))   # 100 (sin descuento)
print(calcular_descuento(-5, True))     # 0`} />

      <ReplOutput>{`85.0
100
0`}</ReplOutput>

      <h3>Devolver varios valores</h3>

      <p>
        Python tiene un truco bonito: una función puede devolver <strong>varios valores</strong> a la vez,
        separándolos con comas:
      </p>

      <CodeBlock code={`def dividir(a, b):
    cociente = a // b
    resto = a % b
    return cociente, resto

# Y al llamarla, los recibes con dos variables:
c, r = dividir(17, 5)
print(f"17 / 5 → cociente {c}, resto {r}")`} />

      <ReplOutput>17 / 5 → cociente 3, resto 2</ReplOutput>

      <p>
        Verás esto mucho en Python. Internamente se llama "tupla" (lo veremos en el módulo de listas
        y tuplas), pero por ahora pi&eacute;nsalo como "varios valores que viajan juntos".
      </p>

      <Quiz
        question='¿Qué imprimirá este código?  def f(x): return x + 1; print(x + 100)'
        options={[
          'Imprimirá x + 100 y devolverá x + 1',
          'Imprimirá nada y devolverá x + 1',
          'Imprimirá x + 1 y x + 100',
          'Dará error',
        ]}
        correct={1}
        explanation='Cuando se ejecuta el return, Python sale de la función inmediatamente. La línea print() después del return nunca se ejecuta. Es código "muerto" — VS Code suele marcarlo en gris.'
      />

      <h2>Alcance: variables que viven dentro de la función</h2>

      <p>
        Las variables que creas <em>dentro</em> de una función solo existen <em>dentro</em> de esa función.
        En cuanto la función termina, esas variables desaparecen. A esto se le llama <strong>alcance local</strong>:
      </p>

      <CodeBlock code={`def calcular():
    secreto = 42         # variable local a la función
    return secreto * 2

print(calcular())        # 84
print(secreto)           # 💥 NameError: secreto no existe aquí`} />

      <p>
        Esto es bueno — significa que dos funciones pueden usar variables con el mismo nombre
        sin pisarse:
      </p>

      <CodeBlock code={`def funcion_a():
    x = 10
    return x

def funcion_b():
    x = 999
    return x

print(funcion_a())   # 10
print(funcion_b())   # 999`} />

      <p>
        Los parámetros son también variables locales. Cambiar el valor de un parámetro dentro de
        la función no afecta a la variable que pasaste cuando la llamaste:
      </p>

      <CodeBlock code={`def doblar(n):
    n = n * 2
    return n

mi_numero = 5
print(doblar(mi_numero))   # 10
print(mi_numero)           # 5 — sigue valiendo 5, no cambió`} />

      <Callout kind="info" title="Variables globales: úsalas con cuidado">
        Una variable definida <em>fuera</em> de toda función es <strong>global</strong>: las funciones
        pueden <em>leerla</em>. Pero modificarla desde dentro requiere usar la palabra clave
        <code> global</code>, y eso casi siempre es señal de mal diseño. La regla práctica:
        <strong> pásalo como parámetro</strong>, no leas variables globales.
      </Callout>

      <h2>Funciones integradas (built-ins) de Python</h2>

      <p>
        Python ya viene con docenas de funciones listas para usar — algunas las has visto, otras
        son nuevas. Aquí las más importantes para tu día a día:
      </p>

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
              <th style={th2}>Función</th>
              <th style={th2}>Hace</th>
              <th style={th2}>Ejemplo</th>
            </tr>
          </thead>
          <tbody>
            <BIRow fn="print(x)" what="Muestra x en pantalla" ej='print("hola") → hola' />
            <BIRow fn="input(t)" what="Pide texto al usuario" ej='input("Nombre: ")' />
            <BIRow fn="len(x)" what="Longitud de x" ej='len("hola") → 4' />
            <BIRow fn="type(x)" what="Tipo de x" ej="type(5) → int" />
            <BIRow fn="int(x)" what="Convertir a entero" ej='int("3") → 3' />
            <BIRow fn="float(x)" what="Convertir a decimal" ej='float("3.14")' />
            <BIRow fn="str(x)" what="Convertir a texto" ej='str(42) → "42"' />
            <BIRow fn="abs(x)" what="Valor absoluto" ej="abs(-7) → 7" />
            <BIRow fn="max(a, b)" what="El máximo de varios" ej="max(3, 8, 5) → 8" />
            <BIRow fn="min(a, b)" what="El mínimo de varios" ej="min(3, 8, 5) → 3" />
            <BIRow fn="round(x, n)" what="Redondear a n decimales" ej="round(3.456, 2) → 3.46" />
            <BIRow fn="sum(c)" what="Suma de una colección" ej="sum([1,2,3]) → 6" />
            <BIRow fn="range(n)" what="Genera números" ej="range(3) → 0,1,2" last />
          </tbody>
        </table>
      </div>

      <CodeBlock code={`# Algunas en acción:
print(len("Python"))        # 6
print(abs(-15))             # 15
print(max(2, 9, 4, 7))      # 9
print(round(3.7))           # 4
print(round(3.14159, 2))    # 3.14
print(sum([10, 20, 30]))    # 60`} />

      <ReplOutput>{`6
15
9
4
3.14
60`}</ReplOutput>

      <Callout kind="tip" title="¿Existirá una función para...?">
        Antes de escribir una función nueva, busca si ya existe. Python (y sus librerías) tienen
        funciones para casi todo: contar, ordenar, parsear, formatear, calcular, generar.
        Una búsqueda de tres segundos en internet — <em>"python how to round a number"</em> —
        te puede ahorrar treinta minutos de reinventar la rueda.
      </Callout>

      <h2>Un ejemplo completo: refactorizar un programa</h2>

      <p>
        Vamos a ver cómo se transforma un programa cuando le metes funciones. Mira esta versión
        sin funciones, una receta lineal:
      </p>

      <CodeBlock code={`# SIN funciones — todo seguido, repetido y mezclado
print("=== Calculadora de descuentos ===")
precio = float(input("Precio: "))
es_socio = input("¿Eres socio? (s/n): ") == "s"
if es_socio:
    precio_final = precio * 0.85
else:
    precio_final = precio
print(f"Precio final: {precio_final}")

print("=== Segundo cliente ===")
precio = float(input("Precio: "))
es_socio = input("¿Eres socio? (s/n): ") == "s"
if es_socio:
    precio_final = precio * 0.85
else:
    precio_final = precio
print(f"Precio final: {precio_final}")`} />

      <p>Y ahora la misma idea organizada en funciones:</p>

      <CodeBlock code={`# CON funciones — cada idea tiene su nombre

def aplicar_descuento(precio, es_socio):
    if es_socio:
        return precio * 0.85
    return precio

def atender_cliente():
    precio = float(input("Precio: "))
    es_socio = input("¿Eres socio? (s/n): ") == "s"
    final = aplicar_descuento(precio, es_socio)
    print(f"Precio final: {final}")

# Programa principal: solo lectura, sin lógica
print("=== Calculadora de descuentos ===")
atender_cliente()
print("=== Segundo cliente ===")
atender_cliente()`} />

      <p>Lo que ganamos:</p>
      <ul>
        <li><strong>No repetimos lógica.</strong> La regla del 15% está en un solo sitio. Si cambia a 20%, lo arreglamos una vez.</li>
        <li><strong>El "programa principal" se lee como un esquema.</strong> Si vuelves a este código en seis meses, ves la estructura de un vistazo.</li>
        <li><strong>Es más fácil probarlo.</strong> Puedes llamar a <code>aplicar_descuento(100, True)</code> directamente para comprobar que devuelve 85.0, sin tener que reescribir todo el programa.</li>
      </ul>

      <PullQuote>
        Una buena función hace <em>una sola cosa</em>, la hace <em>bien</em>, y su nombre lo dice todo.
      </PullQuote>

      <h2>Ejercicios</h2>

      <p style={{ color: 'var(--ink-2)' }}>
        Cinco ejercicios. Hasta ahora habías escrito código suelto; a partir de aquí
        empezarás a pensar en términos de funciones.
      </p>

      <Exercise
        number="5.1"
        title="Tu primera función"
        difficulty="fácil"
        runner={{
          initial: `# Define una función llamada "saludar_dos_veces"
# que reciba un nombre y lo salude DOS veces.
#
# Después llama a la función con tu nombre.
#
# Salida esperada (si nombre = "Carlos"):
#   ¡Hola, Carlos!
#   ¡Hola, Carlos!

`,
          hint: 'def saludar_dos_veces(nombre):  con dos puntos al final. Dentro, dos llamadas a print con una f-string. Después, fuera de la función, una llamada saludar_dos_veces("...").',
          solution: {
            code: `def saludar_dos_veces(nombre):
    print(f"¡Hola, {nombre}!")
    print(f"¡Hola, {nombre}!")

saludar_dos_veces("Carlos")`,
            explanation: 'Definición + llamada. Acuérdate de la sangría de 4 espacios y de los dos puntos. Llamar a la función fuera del bloque (sin sangría) es lo que la ejecuta.',
          },
        }}
      >
        <p>Calentamos motores: definir y llamar.</p>
      </Exercise>

      <Exercise
        number="5.2"
        title="Convertir grados Celsius a Fahrenheit"
        difficulty="fácil"
        runner={{
          initial: `# Define una función "celsius_a_fahrenheit" que
# reciba una temperatura en grados Celsius y
# DEVUELVA la equivalente en Fahrenheit.
#
# Fórmula:  F = C * 9 / 5 + 32
#
# Después prueba con tres temperaturas y muestra:
#   0°C = 32.0°F
#   100°C = 212.0°F
#   -40°C = -40.0°F

`,
          hint: 'def celsius_a_fahrenheit(c): return c * 9 / 5 + 32. Después tres prints con f-strings que llamen a la función dentro de las llaves: f"{c}°C = {celsius_a_fahrenheit(c)}°F".',
          solution: {
            code: `def celsius_a_fahrenheit(c):
    return c * 9 / 5 + 32

for temp in [0, 100, -40]:
    print(f"{temp}°C = {celsius_a_fahrenheit(temp)}°F")`,
            explanation: 'El return permite usar el resultado dentro de cualquier expresión, como una f-string. -40 es famoso: es la única temperatura donde Celsius y Fahrenheit dan el mismo número.',
          },
        }}
      >
        <p>Tu primera función con <code>return</code> útil.</p>
      </Exercise>

      <Exercise
        number="5.3"
        title="Saludo con idioma por defecto"
        difficulty="media"
        runner={{
          initial: `# Define "saludar" con dos parámetros:
#   - nombre (obligatorio)
#   - idioma (por defecto "es")
#
# Debe devolver (return) el saludo correspondiente,
# NO imprimir.
#
# Idiomas: "es" → "¡Hola, X!"
#          "en" → "Hello, X!"
#          "fr" → "Bonjour, X!"
#
# Prueba: imprime el resultado de tres llamadas distintas.

`,
          hint: 'def saludar(nombre, idioma="es"): luego if/elif/else, cada rama hace return con una f-string. La llamada se imprime con print(saludar(...)).',
          solution: {
            code: `def saludar(nombre, idioma="es"):
    if idioma == "es":
        return f"¡Hola, {nombre}!"
    elif idioma == "en":
        return f"Hello, {nombre}!"
    else:
        return f"Bonjour, {nombre}!"

print(saludar("Ana"))
print(saludar("John", "en"))
print(saludar("Pierre", idioma="fr"))`,
            explanation: 'Tres detalles importantes: (1) el parámetro con default va al final, (2) return en cada rama devuelve un valor distinto, (3) la última llamada usa nombre por keyword para mostrar que también funciona.',
          },
        }}
      >
        <p>Parámetros por defecto + return.</p>
      </Exercise>

      <Exercise
        number="5.4"
        title="Calculadora de IMC"
        difficulty="media"
        runner={{
          initial: `# Define dos funciones:
#
# 1) calcular_imc(peso_kg, altura_m)
#    Devuelve el IMC = peso / altura^2
#
# 2) categoria_imc(imc)
#    Devuelve un texto según el rango:
#      imc < 18.5  → "Bajo peso"
#      18.5 a 24.9 → "Normal"
#      25.0 a 29.9 → "Sobrepeso"
#      >= 30       → "Obesidad"
#
# Después: pide al usuario peso y altura, calcula,
# y muestra el IMC con DOS DECIMALES y su categoría.

`,
          hint: 'Para el IMC usa la potencia: altura ** 2. Para los dos decimales: round(imc, 2) o usa f-string con formato {imc:.2f}. La segunda función es un if/elif/else como los del Módulo 4.',
          solution: {
            code: `def calcular_imc(peso_kg, altura_m):
    return peso_kg / (altura_m ** 2)

def categoria_imc(imc):
    if imc < 18.5:
        return "Bajo peso"
    elif imc < 25:
        return "Normal"
    elif imc < 30:
        return "Sobrepeso"
    else:
        return "Obesidad"

peso = float(input("Peso (kg): "))
altura = float(input("Altura (m): "))

imc = calcular_imc(peso, altura)
print(f"Tu IMC es {imc:.2f} ({categoria_imc(imc)})")`,
            explanation: 'Fíjate cómo cada función hace UNA sola cosa. Calcular el IMC y clasificarlo son responsabilidades distintas. El código del programa principal se lee como una receta clara. Y el truco {imc:.2f} fuerza dos decimales — lo usaremos a fondo más adelante.',
          },
        }}
      >
        <p>Dos funciones que cooperan. Esto es programar de verdad.</p>
      </Exercise>

      <Exercise
        number="5.5"
        title="Mini-calculadora con funciones"
        difficulty="media"
        runner={{
          initial: `# Define cuatro funciones, una por operación:
#   sumar(a, b), restar(a, b), multiplicar(a, b), dividir(a, b)
#
# CUIDADO con dividir: si b == 0, devuelve None
# (o una cadena "Indefinido"); no calcules.
#
# Después: prueba las cuatro y muestra los resultados.

`,
          hint: 'Cuatro funciones de una sola línea (return a + b, etc.). Para dividir, comprueba primero if b == 0 y devuelve None o "Indefinido". El programa de prueba puede ser una serie de prints con f-strings.',
          solution: {
            code: `def sumar(a, b):
    return a + b

def restar(a, b):
    return a - b

def multiplicar(a, b):
    return a * b

def dividir(a, b):
    if b == 0:
        return "Indefinido"
    return a / b

print(f"3 + 4 = {sumar(3, 4)}")
print(f"10 - 6 = {restar(10, 6)}")
print(f"5 * 7 = {multiplicar(5, 7)}")
print(f"20 / 4 = {dividir(20, 4)}")
print(f"20 / 0 = {dividir(20, 0)}")`,
            explanation: 'En "dividir" usamos la técnica de "salida temprana": si el caso especial se cumple, devolvemos algo y salimos. El return saca de la función inmediatamente, así que el "return a / b" final solo se ejecuta cuando b no es 0. Patrón muy común en código profesional.',
          },
        }}
      >
        <p>El módulo se cierra con tu primera mini-API: cuatro funciones que cubren una tarea.</p>
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
          <li><code>def nombre(parámetros):</code> define una función. La sangría marca su cuerpo.</li>
          <li>Para <strong>ejecutarla</strong>, llámala con paréntesis: <code>nombre()</code>.</li>
          <li><strong>Parámetro</strong> (al definir) ≠ <strong>argumento</strong> (al llamar). Llevan el mismo orden.</li>
          <li>Argumentos por nombre (keyword): <code>f(x=1)</code>. Útil cuando hay muchos parámetros.</li>
          <li>Valores por defecto: <code>def f(x, y=10):</code>. <strong>Los defaults van al final</strong>.</li>
          <li><code>return</code> devuelve un valor y sale de la función. Sin <code>return</code>, devuelve <code>None</code>.</li>
          <li><strong><code>print</code> no es <code>return</code></strong>: uno muestra al usuario, el otro devuelve al código.</li>
          <li>Las variables creadas dentro de una función son <strong>locales</strong> — desaparecen al salir.</li>
          <li>Python ya tiene funciones <strong>built-in</strong> útiles: <code>len</code>, <code>type</code>, <code>abs</code>, <code>min</code>, <code>max</code>, <code>round</code>, <code>sum</code>…</li>
        </ul>
      </div>

      <PullQuote>
        En el próximo módulo aprenderás a manejar <em>colecciones de datos</em>: listas y tuplas.
        Las funciones combinadas con listas son lo que de verdad desencadena el poder de Python.
      </PullQuote>

      <ChapterNav
        prev={{ id: 'l1-m4', title: 'Control de flujo' }}
        next={{ id: 'l1-m6', title: 'Listas y tuplas' }}
        onNav={onNav}
      />
    </article>
  );
}

const th2 = {
  padding: '10px 14px',
  fontFamily: 'var(--font-mono)',
  fontSize: '0.7rem',
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: 'var(--ink-3)',
  fontWeight: 500,
};

function BIRow({ fn, what, ej, last }) {
  const cellStyle = {
    padding: '9px 14px',
    borderTop: last ? '0' : '1px solid var(--border-soft)',
    verticalAlign: 'top',
  };
  return (
    <tr>
      <td style={{ ...cellStyle, fontFamily: 'var(--font-mono)', color: 'var(--accent)', fontWeight: 600, whiteSpace: 'nowrap' }}>{fn}</td>
      <td style={cellStyle}>{what}</td>
      <td style={{ ...cellStyle, fontFamily: 'var(--font-mono)', color: 'var(--ink-2)', fontSize: '0.86rem' }}>{ej}</td>
    </tr>
  );
}

window.ChapterL1M5 = ChapterL1M5;
