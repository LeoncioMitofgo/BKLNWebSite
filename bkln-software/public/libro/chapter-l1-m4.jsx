// =============================================================
// chapter-l1-m4.jsx — Libro 1, Módulo 4: Control de flujo
// =============================================================

function ChapterL1M4({ onNav }) {
  return (
    <article className="reader-inner">
      <ChapterHeader
        book="// libro 1 · primeros pasos"
        module="módulo 04"
        time="≈ 45 min"
        title={<>Control de <em>flujo</em></>}
        dek="Hasta ahora tus programas iban línea por línea, sin desvíos. Aquí aprenden a decidir, a repetir, a ramificarse."
      />

      <p>
        Recuerda las tres ideas que vimos en el Módulo 1: <em>secuencia, decisión, repetición</em>.
        Hasta ahora solo has hecho secuencia: línea tras línea, en orden, sin desvíos.
      </p>

      <p>
        En este módulo desbloqueas las otras dos. Con la <strong>decisión</strong> tu programa puede
        hacer una cosa o la otra dependiendo de lo que pase. Con la <strong>repetición</strong> puede
        hacer algo cien veces sin que tengas que escribirlo cien veces. Estas dos ideas, juntas,
        son lo que hace que un programa parezca <em>inteligente</em>.
      </p>

      <h2>Condicionales: <code>if</code></h2>

      <p>
        La forma más simple de decidir en Python: <em>"si esta condición es verdadera, haz esto"</em>.
      </p>

      <CodeBlock code={`edad = 20

if edad >= 18:
    print("Eres mayor de edad.")
    print("Puedes votar.")

print("Fin del programa.")`} />

      <ReplOutput>{`Eres mayor de edad.
Puedes votar.
Fin del programa.`}</ReplOutput>

      <p>Mira con cuidado, hay tres detalles importantísimos:</p>

      <ol>
        <li><strong>Los dos puntos <code>:</code></strong> al final del <code>if</code>. <em>No olvides nunca esos dos puntos.</em></li>
        <li><strong>La sangría</strong> (esos 4 espacios al inicio). En Python, la sangría <em>no es decorativa</em> — es lo que le dice al programa qué líneas pertenecen al <code>if</code>.</li>
        <li><strong>La condición</strong> (<code>edad &gt;= 18</code>) es una expresión que se evalúa a <code>True</code> o <code>False</code>. Si es <code>True</code>, se ejecuta el bloque sangrado. Si es <code>False</code>, se salta.</li>
      </ol>

      <Callout kind="warn" title="¡Cuidado! Python es estricto con la sangría">
        <p style={{ margin: 0 }}>
          En otros lenguajes la sangría es opcional; en Python es <strong>obligatoria</strong>.
          Las líneas que están dentro de un <code>if</code> deben empezar con la misma cantidad
          de espacios (la convención son 4). Si mezclas tabuladores con espacios, o pones
          sangrías irregulares, Python te lanza un <code>IndentationError</code>.
        </p>
        <p style={{ margin: 'var(--s-2) 0 0' }}>
          La buena noticia: VS Code lo hace automático. Cuando escribes los dos puntos y bajas
          de línea, el editor te sangra solo.
        </p>
      </Callout>

      <h3><code>if</code> + <code>else</code>: "si no, entonces..."</h3>

      <p>
        Casi siempre, cuando una condición no se cumple, quieres hacer otra cosa, no nada.
        Para eso está <code>else</code>:
      </p>

      <CodeBlock code={`edad = 15

if edad >= 18:
    print("Puedes entrar al cine de mayores.")
else:
    print("Lo siento, eres demasiado joven.")`} />

      <ReplOutput>Lo siento, eres demasiado joven.</ReplOutput>

      <p>
        El bloque del <code>else</code> se ejecuta cuando la condición del <code>if</code> es
        <strong> falsa</strong>. <strong>Solo uno de los dos bloques se ejecuta, nunca los dos.</strong>
      </p>

      <h3><code>elif</code>: varias opciones encadenadas</h3>

      <p>
        ¿Y si tienes tres o más caminos posibles? Para eso existe <code>elif</code> (es la
        abreviatura de <em>"else if"</em>):
      </p>

      <CodeBlock code={`nota = 7

if nota >= 9:
    print("Sobresaliente")
elif nota >= 7:
    print("Notable")
elif nota >= 5:
    print("Aprobado")
else:
    print("Suspenso")`} />

      <ReplOutput>Notable</ReplOutput>

      <p>Python evalúa las condiciones <strong>en orden, de arriba abajo</strong>, y se queda con la primera que sea verdadera:</p>

      <ol>
        <li>¿Es <code>nota &gt;= 9</code>? No (7 no es &gt;= 9). Sigue.</li>
        <li>¿Es <code>nota &gt;= 7</code>? Sí. Ejecuta este bloque.</li>
        <li>El resto (<code>elif</code> y <code>else</code>) <strong>ya no se evalúan</strong>.</li>
      </ol>

      <Callout kind="tip" title="El orden importa">
        Por eso ponemos primero la nota más alta. Si pusiéramos <code>nota &gt;= 5</code> arriba,
        un sobresaliente acabaría imprimiendo "Aprobado" — la primera condición que matchea es la que gana.
      </Callout>

      <Quiz
        question="¿Qué imprimirá este código cuando nota = 9?"
        options={[
          'Sobresaliente, Notable, Aprobado (todas las que se cumplen)',
          'Solo "Sobresaliente"',
          'Solo "Aprobado" (es la última condición verdadera)',
          'Error de sintaxis',
        ]}
        correct={1}
        explanation='Las cadenas if/elif/else son exclusivas: en cuanto una condición se cumple, se ejecuta su bloque y el resto se ignora. Para 9: la primera (>=9) ya es True, imprime "Sobresaliente" y termina.'
      />

      <h3>Anidar: <code>if</code> dentro de <code>if</code></h3>

      <p>
        Dentro de un <code>if</code> puedes meter otro <code>if</code>. Solo añade un nivel más de sangría:
      </p>

      <CodeBlock code={`edad = 22
tiene_carnet = True

if edad >= 18:
    print("Eres mayor de edad.")
    if tiene_carnet:
        print("Puedes conducir.")
    else:
        print("Sácate el carnet primero.")
else:
    print("No puedes conducir todavía.")`} />

      <ReplOutput>{`Eres mayor de edad.
Puedes conducir.`}</ReplOutput>

      <Callout kind="tip" title="No abuses del anidamiento">
        Si te encuentras con tres o cuatro <code>if</code> dentro de <code>if</code>, casi siempre
        hay una forma más limpia. A veces se puede juntar con <code>and</code>:
        <code>if edad &gt;= 18 and tiene_carnet:</code> ahorra una capa entera.
        Más adelante veremos otras técnicas (cláusulas tempranas, funciones).
      </Callout>

      <h2>Bucles <code>while</code>: repetir mientras...</h2>

      <p>
        Un <strong>bucle</strong> es un trozo de código que se repite. El primero que veremos
        es el bucle <code>while</code>: <em>"mientras esta condición sea verdadera, sigue
        repitiendo este bloque"</em>.
      </p>

      <CodeBlock code={`contador = 1

while contador <= 5:
    print(f"Vuelta número {contador}")
    contador += 1

print("Fin.")`} />

      <ReplOutput>{`Vuelta número 1
Vuelta número 2
Vuelta número 3
Vuelta número 4
Vuelta número 5
Fin.`}</ReplOutput>

      <p>Diseccionemos:</p>

      <ol>
        <li>Antes del bucle, inicializamos una variable: <code>contador = 1</code>.</li>
        <li>El <code>while</code> evalúa la condición <code>contador &lt;= 5</code>. Si es verdadera, ejecuta el bloque.</li>
        <li>Dentro del bloque, hacemos algo <em>y</em> modificamos el contador con <code>contador += 1</code>.</li>
        <li>Al terminar el bloque, Python vuelve al <code>while</code> y evalúa la condición de nuevo.</li>
        <li>Cuando la condición es <code>False</code> (cuando <code>contador</code> llega a 6), el bucle termina.</li>
      </ol>

      <Callout kind="warn" title="¡Cuidado! El bucle infinito">
        <p style={{ margin: 0 }}>
          Si te olvidas de modificar la variable que controla el bucle, la condición nunca cambia,
          y Python repite el bloque <strong>para siempre</strong>. Tu programa se queda colgado.
        </p>
        <CodeBlock hideCopy code={`contador = 1
while contador <= 5:
    print("¡Ayuda!")
    # ← falta contador += 1
    # → esto se imprime para siempre`} />
        <p style={{ margin: 0 }}>
          Para parar un programa colgado en la terminal, pulsa <code>Ctrl + C</code>. En este libro,
          el editor pone un límite automático para que no se cuelgue, pero en VS Code real sí pasa.
        </p>
      </Callout>

      <h3>Un caso de uso real: pedir hasta que sea válido</h3>

      <p>
        El <code>while</code> brilla cuando no sabes cuántas veces vas a tener que repetir algo:
      </p>

      <CodeBlock code={`# Pedir un número positivo hasta que el usuario obedezca
numero = int(input("Dame un número positivo: "))

while numero <= 0:
    print("Eso no es positivo. Inténtalo de nuevo.")
    numero = int(input("Dame un número positivo: "))

print(f"Gracias. Anotado: {numero}")`} />

      <h2>Bucles <code>for</code>: para cada cosa de una lista</h2>

      <p>
        Si el <code>while</code> sirve para "repetir mientras se cumpla X", el <code>for</code> sirve
        para "repetir <strong>una vez por cada</strong> cosa de una colección".
      </p>

      <p>El ejemplo más simple: recorrer una lista de nombres.</p>

      <CodeBlock code={`nombres = ["Ana", "Luis", "Sofía"]

for nombre in nombres:
    print(f"Hola, {nombre}")`} />

      <ReplOutput>{`Hola, Ana
Hola, Luis
Hola, Sofía`}</ReplOutput>

      <p>Léelo en voz alta: <em>"para cada nombre en nombres, imprime hola nombre"</em>. Casi inglés natural.</p>

      <p>
        En cada vuelta, la variable <code>nombre</code> (el nombre lo eliges tú) toma uno de los valores
        de la lista. Primera vuelta vale "Ana", segunda "Luis", tercera "Sofía". Cuando se acaba la
        lista, el bucle termina.
      </p>

      <Callout kind="info" title="No te preocupes por las listas todavía">
        Las listas son el tema del Módulo 6. Por ahora basta saber que se escriben con corchetes
        <code> [ ... ]</code> y elementos separados por comas. Las usamos aquí como excusa para
        poder ejecutar un <code>for</code>.
      </Callout>

      <h3><code>range</code>: el generador de números</h3>

      <p>
        Muy a menudo lo que quieres es repetir algo <em>un número exacto de veces</em>. Para eso
        existe la función <code>range</code>, que produce una secuencia de números:
      </p>

      <CodeBlock code={`# range(5) genera los números 0, 1, 2, 3, 4
for i in range(5):
    print(f"Iteración {i}")`} />

      <ReplOutput>{`Iteración 0
Iteración 1
Iteración 2
Iteración 3
Iteración 4`}</ReplOutput>

      <Callout kind="warn" title="¡Cuidado! range empieza en 0 y NO incluye el final">
        <code>range(5)</code> produce <code>0, 1, 2, 3, 4</code> — cinco números,
        pero el <strong>5 no aparece</strong>. Si quieres del 1 al 5 inclusive,
        usa <code>range(1, 6)</code>.
      </Callout>

      <p>Las tres formas de usar <code>range</code>:</p>

      <CodeBlock code={`# 1) range(fin): de 0 a fin-1
for i in range(3):
    print(i)            # 0, 1, 2

# 2) range(inicio, fin): de inicio a fin-1
for i in range(10, 13):
    print(i)            # 10, 11, 12

# 3) range(inicio, fin, paso): saltando "paso" en "paso"
for i in range(0, 20, 5):
    print(i)            # 0, 5, 10, 15

# Truco: paso negativo para ir hacia atrás
for i in range(5, 0, -1):
    print(i)            # 5, 4, 3, 2, 1`} />

      <Quiz
        question="¿Cuántos números imprime range(2, 10, 3) ?"
        options={['3 números: 2, 5, 8', '4 números: 2, 5, 8, 10', '8 números: 2, 3, 4, 5, 6, 7, 8, 9', '10 números: del 0 al 9']}
        correct={0}
        explanation="range(2, 10, 3) empieza en 2, va de 3 en 3, y se detiene ANTES de llegar a 10. Por tanto produce: 2, 5, 8. El 11 ya sería pasado de 10, pero el 10 mismo tampoco se incluye (la regla del 'fin no incluido' siempre aplica)."
      />

      <h3>Cuándo usar <code>while</code> y cuándo <code>for</code></h3>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 'var(--s-4)',
        margin: 'var(--s-5) 0',
      }} className="loop-grid">
        <div style={loopCardStyle}>
          <div style={loopHeadStyle('var(--accent)')}>for</div>
          <p style={{ margin: 0 }}>
            Cuando sabes <strong>cuántas veces</strong> hay que repetir, o tienes una
            <strong> colección</strong> que recorrer. Es la elección por defecto.
          </p>
        </div>
        <div style={loopCardStyle}>
          <div style={loopHeadStyle('var(--highlight)')}>while</div>
          <p style={{ margin: 0 }}>
            Cuando no sabes cuántas veces será — solo sabes que paras cuando se cumple
            <strong> una condición</strong>. (Inputs, eventos, búsquedas.)
          </p>
        </div>
        <style>{`@media (max-width: 720px) { .loop-grid { grid-template-columns: 1fr !important; } }`}</style>
      </div>

      <h2><code>break</code>, <code>continue</code> y <code>pass</code></h2>

      <p>
        A veces necesitas <em>interrumpir</em> el ritmo normal de un bucle. Python tiene
        tres palabras clave para esto.
      </p>

      <h3><code>break</code>: salir del bucle ahora mismo</h3>

      <p>
        <code>break</code> aborta el bucle por completo, aunque queden iteraciones por hacer.
        Útil cuando ya encontraste lo que buscabas:
      </p>

      <CodeBlock code={`# Buscar el primer número par
for i in range(1, 100):
    if i % 2 == 0:
        print(f"El primer par es {i}")
        break  # ya no me interesa seguir
print("Fin de la búsqueda.")`} />

      <ReplOutput>{`El primer par es 2
Fin de la búsqueda.`}</ReplOutput>

      <h3><code>continue</code>: saltarse esta iteración</h3>

      <p>
        <code>continue</code> no aborta el bucle — solo <em>se salta el resto de esta vuelta</em> y
        pasa a la siguiente:
      </p>

      <CodeBlock code={`# Imprimir solo los números impares del 1 al 10
for i in range(1, 11):
    if i % 2 == 0:
        continue  # saltarse los pares
    print(i)`} />

      <ReplOutput>{`1
3
5
7
9`}</ReplOutput>

      <h3><code>pass</code>: no hacer nada</h3>

      <p>
        <code>pass</code> es un comodín que significa literalmente <em>"no hagas nada aquí"</em>.
        Lo usarás cuando Python te exija un bloque pero todavía no quieras escribirlo:
      </p>

      <CodeBlock code={`edad = 20

if edad >= 18:
    pass  # TODO: implementar después
else:
    print("Demasiado joven.")`} />

      <p>
        Sin el <code>pass</code>, dejar el <code>if</code> con el cuerpo vacío sería un error de sintaxis.
        <code>pass</code> es la forma de decirle a Python: <em>"sí, hay un bloque aquí, pero está intencionalmente vacío"</em>.
      </p>

      <Callout kind="tip" title="break y continue funcionan también con while">
        Ambas funcionan dentro de cualquier bucle, sea <code>for</code> o <code>while</code>.
        <code>break</code> es especialmente útil para terminar bucles <code>while True</code>,
        que son una forma idiomática de hacer "repetir hasta que pase algo".
      </Callout>

      <h3>El patrón <code>while True</code> + <code>break</code></h3>

      <p>
        Una forma muy común de escribir bucles que repiten "hasta que el usuario diga basta":
      </p>

      <CodeBlock code={`while True:
    respuesta = input("¿Quieres seguir? (s/n): ")
    if respuesta == "n":
        print("Adiós.")
        break
    print("Vale, seguimos.")`} />

      <p>
        <code>while True</code> es un bucle infinito — la condición siempre es verdadera.
        Lo único que lo termina es el <code>break</code> de dentro. Es una receta clásica.
      </p>

      <Quiz
        question="En este bucle, ¿qué número se imprime al final? for i in range(10): if i == 7: break; print(i)"
        options={['10', '9 (el último antes de 10)', '7', '6 (la última iteración antes del break)']}
        correct={3}
        explanation='El bucle va imprimiendo 0, 1, 2, 3, 4, 5, 6. En la iteración i=7, entra al if, ejecuta break y sale del bucle SIN imprimir el 7. El último número impreso es 6.'
      />

      <h2>Un programa que junta todo: el adivinador</h2>

      <p>
        Vamos a juntar condicionales, bucles, comparaciones y entradas del usuario en un
        programa real — un mini-juego para adivinar un número:
      </p>

      <CodeBlock code={`secreto = 42
intentos = 0

while True:
    intentos += 1
    intento = int(input("Adivina un número (1-100): "))

    if intento == secreto:
        print(f"¡Acertaste! Lo lograste en {intentos} intentos.")
        break
    elif intento < secreto:
        print("Más alto...")
    else:
        print("Más bajo...")`} />

      <p>Mira cómo cada herramienta cumple un papel:</p>

      <ul>
        <li><strong>Variables</strong> guardan el secreto y el conteo.</li>
        <li><strong>input</strong> + <strong>int</strong> piden y convierten la respuesta.</li>
        <li><strong>while True + break</strong> repite hasta que el usuario acierte.</li>
        <li><strong>if / elif / else</strong> decide qué pista dar.</li>
        <li><strong>f-strings</strong> dan formato al mensaje final.</li>
      </ul>

      <PullQuote>
        Hasta hace dos módulos no podías hacer nada de esto. Ahora puedes escribir un juego
        real. <em>Eso</em> es progreso.
      </PullQuote>

      <h2>Ejercicios</h2>

      <p style={{ color: 'var(--ink-2)' }}>
        Cinco ejercicios. Los últimos dos son los más completos que has hecho hasta ahora —
        empiezan a parecerse a programas de verdad.
      </p>

      <Exercise
        number="4.1"
        title="¿Aprobado o suspenso?"
        difficulty="fácil"
        runner={{
          initial: `# Pide al usuario una nota (entero) y muestra:
#  - "Aprobado" si la nota es >= 5
#  - "Suspenso" si la nota es < 5
#
# Usa if/else.

`,
          hint: 'int(input(...)) para obtener la nota. Después un if con la comparación >= 5 y un else con el caso contrario.',
          solution: {
            code: `nota = int(input("Tu nota: "))

if nota >= 5:
    print("Aprobado")
else:
    print("Suspenso")`,
            explanation: 'El if/else más básico. Acuérdate: los dos puntos, la sangría de 4 espacios, y la condición se evalúa como booleano. Esa es toda la receta.',
          },
        }}
      >
        <p>Calentamos motores con un if/else simple.</p>
      </Exercise>

      <Exercise
        number="4.2"
        title="Categorías de edad"
        difficulty="fácil"
        runner={{
          initial: `# Pide la edad del usuario y muéstrale a qué
# grupo pertenece:
#   < 13     → "Niño/a"
#   13 a 17  → "Adolescente"
#   18 a 64  → "Adulto/a"
#   >= 65    → "Tercera edad"
#
# Usa if/elif/else en orden inteligente.

`,
          hint: 'El orden importa: ve de menor a mayor (o de mayor a menor), pero sé consistente. Si vas de menor a mayor: primero < 13, luego < 18 (que ya implica >=13), luego < 65, y else cubre lo que queda.',
          solution: {
            code: `edad = int(input("Edad: "))

if edad < 13:
    print("Niño/a")
elif edad < 18:
    print("Adolescente")
elif edad < 65:
    print("Adulto/a")
else:
    print("Tercera edad")`,
            explanation: 'Yendo de menor a mayor, no necesitas comprobar el límite inferior porque las condiciones anteriores ya lo descartaron. En el segundo elif (< 18) sabemos que la edad ya es >= 13. Por eso el orden importa.',
          },
        }}
      >
        <p>Una cascada de elif. Práctica clásica.</p>
      </Exercise>

      <Exercise
        number="4.3"
        title="Cuenta atrás"
        difficulty="fácil"
        runner={{
          initial: `# Imprime una cuenta atrás del 10 al 1,
# y al final imprime "¡Despegue!".
# Usa un bucle (for o while, tú decides).

`,
          hint: 'Para for, usa range(10, 0, -1) — empieza en 10, baja de uno en uno, no incluye el 0. Para while, parte de un contador en 10 y decrementa con -= 1.',
          solution: {
            code: `for i in range(10, 0, -1):
    print(i)
print("¡Despegue!")

# Versión con while:
# contador = 10
# while contador > 0:
#     print(contador)
#     contador -= 1
# print("¡Despegue!")`,
            explanation: 'Cualquiera de los dos enfoques sirve, pero el for con range(10, 0, -1) es más conciso y más "pythónico" — deja claro de un vistazo el rango y la dirección.',
          },
        }}
      >
        <p>Una cuenta atrás clásica. Bucle <code>for</code> con paso negativo.</p>
      </Exercise>

      <Exercise
        number="4.4"
        title="Suma de los primeros N números"
        difficulty="media"
        runner={{
          initial: `# Pide al usuario un número N.
# Calcula la suma 1 + 2 + 3 + ... + N
# y muéstrala así:  "La suma del 1 al N es: ..."
#
# Usa un bucle con una variable "acumulador".

`,
          hint: 'Inicializa una variable suma = 0 ANTES del bucle. Dentro del bucle, suma += i. El bucle debe ir de 1 a N inclusive, así que range(1, n + 1).',
          solution: {
            code: `n = int(input("Hasta qué número: "))
suma = 0

for i in range(1, n + 1):
    suma += i

print(f"La suma del 1 al {n} es: {suma}")`,
            explanation: 'El patrón "acumulador": una variable que arranca en 0 (o en 1 para multiplicaciones) y va creciendo dentro del bucle. Aparece por todas partes. Y el truquito range(1, n+1) para incluir el N: acuérdate de que range no incluye el final.',
          },
        }}
      >
        <p>El patrón del acumulador. Lo usarás cientos de veces en tu vida.</p>
      </Exercise>

      <Exercise
        number="4.5"
        title="Validador de contraseña"
        difficulty="media"
        runner={{
          initial: `# Implementa un mini login muy simple.
# La contraseña correcta es: python123
#
# El usuario tiene HASTA 3 INTENTOS.
# - Si acierta antes, muestra "¡Bienvenido!" y termina.
# - Si falla los 3, muestra "Cuenta bloqueada." y termina.
#
# Usa un bucle for con range(3) y un break para
# salir antes si acierta.

`,
          hint: 'for intento in range(3): pide la contraseña con input(). Compara con ==. Si coincide: bienvenido + break. Después del bucle (sin sangría), un mensaje "bloqueada" — pero solo se debe mostrar si NO acertó. Truco: usa una variable booleana "acerto = False" antes del bucle, ponla True si acierta, y comprueba al final.',
          solution: {
            code: `correcta = "python123"
acerto = False

for intento in range(3):
    clave = input("Contraseña: ")
    if clave == correcta:
        print("¡Bienvenido!")
        acerto = True
        break
    else:
        print(f"Incorrecto. Te quedan {2 - intento} intentos.")

if not acerto:
    print("Cuenta bloqueada.")`,
            explanation: 'Patrón clásico: bandera booleana ("acerto") + bucle con break. Cuando se sale del bucle, la bandera nos dice si fue por éxito o por agotar intentos. Es la base de la lógica de cualquier login del mundo.',
          },
        }}
      >
        <p>Combina <code>for</code>, <code>if</code>, <code>break</code> y un poco de lógica.</p>
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
          <li><code>if condición:</code> ejecuta su bloque si la condición es <code>True</code>.</li>
          <li><code>else:</code> bloque que se ejecuta si la condición del if es <code>False</code>.</li>
          <li><code>elif</code> = "else if". Se evalúan en orden y solo <strong>una</strong> rama se ejecuta.</li>
          <li>La <strong>sangría</strong> (4 espacios) define qué líneas pertenecen al bloque. No es opcional.</li>
          <li><code>while condición:</code> repite el bloque mientras la condición sea verdadera.</li>
          <li><code>for x in coleccion:</code> repite el bloque una vez por cada elemento.</li>
          <li><code>range(inicio, fin, paso)</code> genera números. <strong>El fin no se incluye.</strong></li>
          <li><code>break</code> sale del bucle inmediatamente. <code>continue</code> salta a la siguiente iteración. <code>pass</code> no hace nada (placeholder).</li>
          <li><strong>Bucles infinitos</strong>: olvidar actualizar la variable del while. <code>Ctrl+C</code> para abortar.</li>
        </ul>
      </div>

      <PullQuote>
        En el próximo módulo aprenderás a empaquetar bloques de código en
        <em> funciones reutilizables</em>. Es el momento en que los programas dejan de ser scripts
        sueltos y empiezan a parecerse a algo construido.
      </PullQuote>

      <ChapterNav
        prev={{ id: 'l1-m3', title: 'Operadores y expresiones' }}
        next={{ id: 'l1-m5', title: 'Funciones' }}
        onNav={onNav}
      />
    </article>
  );
}

const loopCardStyle = {
  background: 'var(--paper-2)',
  border: '1px solid var(--border-soft)',
  borderRadius: 'var(--r-md)',
  padding: 'var(--s-4) var(--s-5)',
};

const loopHeadStyle = (color) => ({
  fontFamily: 'var(--font-mono)',
  fontWeight: 600,
  fontSize: '1.4rem',
  color,
  marginBottom: 'var(--s-2)',
});

window.ChapterL1M4 = ChapterL1M4;
