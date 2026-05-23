// =============================================================
// chapter-l1-m8.jsx — Libro 1, Módulo 8: Proyecto final básico
// =============================================================

function ChapterL1M8({ onNav }) {
  return (
    <article className="reader-inner">
      <ChapterHeader
        book="// libro 1 · primeros pasos"
        module="módulo 08 · final"
        time="≈ 60 min"
        title={<>Proyecto <em>final</em></>}
        dek="Llegaste al final del Libro 1. En vez de aprender algo nuevo, vamos a construir dos programas reales con todo lo que ya sabes."
      />

      <p>
        Has aprendido siete módulos: variables, operadores, condicionales, bucles, funciones,
        listas, cadenas. Cada uno te ha enseñado piezas sueltas. Hoy vamos a <strong>juntarlas</strong>.
      </p>

      <p>
        No vas a aprender nada nuevo en este módulo. Lo que vas a hacer es algo más importante:
        <strong> construir programas completos de principio a fin</strong>. Ese es el momento en el que
        de verdad descubres si has entendido algo.
      </p>

      <div style={{
        background: 'var(--paper-2)',
        border: '1px solid var(--border-soft)',
        borderRadius: 'var(--r-md)',
        padding: 'var(--s-4) var(--s-5)',
        margin: 'var(--s-5) 0',
        display: 'grid',
        gridTemplateColumns: '40px 1fr',
        gap: 'var(--s-3)',
        alignItems: 'baseline',
      }}>
        <div className="numeral" style={{ fontSize: '2rem', lineHeight: 1 }}>i</div>
        <div>
          <div className="eyebrow" style={{ marginBottom: 4 }}>el contenido del módulo</div>
          <ol style={{ margin: 0, paddingLeft: '1.2em' }}>
            <li><strong>Calculadora interactiva</strong> con menú de operaciones.</li>
            <li><strong>Juego: adivina el número</strong> — con pistas, intentos y récord.</li>
            <li><strong>Repaso general</strong> de las ideas grandes del Libro 1.</li>
            <li><strong>Retos opcionales</strong> para llevar los proyectos más lejos.</li>
          </ol>
        </div>
      </div>

      <h2>Proyecto 1 — La calculadora interactiva</h2>

      <p>
        Una calculadora real, que no se cierra después de un cálculo. Funciona con un menú y
        sigue activa hasta que el usuario decida salir. Es decir: combina bucles, condicionales,
        funciones y manejo de entradas.
      </p>

      <h3>Cómo se va a comportar</h3>

      <p>Antes de escribir nada, vamos a describir el programa con palabras. Es el primer paso de cualquier proyecto serio:</p>

      <ol>
        <li>Muestra un menú con las cinco operaciones: sumar, restar, multiplicar, dividir, salir.</li>
        <li>El usuario elige una opción (un número del 1 al 5).</li>
        <li>Si elige una operación, pide dos números y muestra el resultado.</li>
        <li>Vuelve al menú.</li>
        <li>Si elige 5, se despide y termina.</li>
        <li>Si el usuario escribe algo raro, no se rompe: muestra un aviso y vuelve al menú.</li>
      </ol>

      <Callout kind="tip" title="Antes de programar: piensa">
        Describir un programa antes de escribirlo te ahorra horas. Si no puedes contar
        en palabras lo que quieres que pase, tampoco vas a poder escribirlo en Python.
        Empieza siempre con un boceto en lenguaje natural.
      </Callout>

      <h3>Versión 1 — Sin funciones, todo seguido</h3>

      <p>
        Empezamos por una versión "lineal", que junta toda la lógica en el bucle principal.
        Funciona, pero ya verás que se siente apretada:
      </p>

      <CodeBlock code={`print("=== Calculadora ===")

while True:
    print()
    print("1) Sumar")
    print("2) Restar")
    print("3) Multiplicar")
    print("4) Dividir")
    print("5) Salir")
    opcion = input("Elige: ").strip()

    if opcion == "5":
        print("¡Hasta luego!")
        break

    if opcion not in ("1", "2", "3", "4"):
        print("Opción no válida.")
        continue

    a = float(input("Primer número: "))
    b = float(input("Segundo número: "))

    if opcion == "1":
        print(f"Resultado: {a + b}")
    elif opcion == "2":
        print(f"Resultado: {a - b}")
    elif opcion == "3":
        print(f"Resultado: {a * b}")
    elif opcion == "4":
        if b == 0:
            print("No se puede dividir entre 0.")
        else:
            print(f"Resultado: {a / b}")`} />

      <p>
        Si la pruebas, funciona perfectamente. Pero la función principal hace <em>de todo</em>:
        imprime menú, valida, pide números, ejecuta lógica, formatea salida. Eso es justo lo que
        las <strong>funciones</strong> vinieron a arreglar.
      </p>

      <h3>Versión 2 — Refactorizada con funciones</h3>

      <p>Misma calculadora, partida en piezas. Cada función hace una sola cosa:</p>

      <CodeBlock code={`def mostrar_menu():
    print()
    print("=== Calculadora ===")
    print("1) Sumar")
    print("2) Restar")
    print("3) Multiplicar")
    print("4) Dividir")
    print("5) Salir")

def pedir_numero(mensaje):
    return float(input(mensaje))

def calcular(opcion, a, b):
    if opcion == "1": return a + b
    if opcion == "2": return a - b
    if opcion == "3": return a * b
    if opcion == "4":
        if b == 0:
            return None      # señal de "no se pudo"
        return a / b

def main():
    while True:
        mostrar_menu()
        opcion = input("Elige: ").strip()

        if opcion == "5":
            print("¡Hasta luego!")
            break

        if opcion not in ("1", "2", "3", "4"):
            print("Opción no válida.")
            continue

        a = pedir_numero("Primer número: ")
        b = pedir_numero("Segundo número: ")

        resultado = calcular(opcion, a, b)
        if resultado is None:
            print("No se puede dividir entre 0.")
        else:
            print(f"Resultado: {resultado:.2f}")

main()`} />

      <p>
        El programa principal (<code>main</code>) ahora se lee como un esquema, casi como las
        cinco frases con las que lo describimos al principio. Si en el futuro quieres añadir una
        operación nueva, sabes <em>exactamente</em> dónde tocar: en <code>calcular</code> y en
        <code> mostrar_menu</code>. Eso es <strong>código mantenible</strong>.
      </p>

      <Callout kind="info" title="¿Qué es 'None'?">
        Lo conociste en el Módulo 5: es el valor especial de Python para "nada". Aquí lo usamos
        como <em>señal</em> desde <code>calcular</code> hacia <code>main</code>:
        <em> "no pude hacer la cuenta"</em>. <code>resultado is None</code> es la forma idiomática
        de comprobarlo (sí, se escribe <code>is</code>, no <code>==</code>; la razón la verás en el Libro 2).
      </Callout>

      <h3>Pruébala</h3>

      <PyRunner
        initial={`def mostrar_menu():
    print()
    print("=== Calculadora ===")
    print("1) Sumar")
    print("2) Restar")
    print("3) Multiplicar")
    print("4) Dividir")
    print("5) Salir")

def calcular(opcion, a, b):
    if opcion == "1": return a + b
    if opcion == "2": return a - b
    if opcion == "3": return a * b
    if opcion == "4":
        if b == 0:
            return None
        return a / b

def main():
    while True:
        mostrar_menu()
        opcion = input("Elige: ").strip()

        if opcion == "5":
            print("¡Hasta luego!")
            break

        if opcion not in ("1", "2", "3", "4"):
            print("Opción no válida.")
            continue

        a = float(input("Primer número: "))
        b = float(input("Segundo número: "))

        resultado = calcular(opcion, a, b)
        if resultado is None:
            print("No se puede dividir entre 0.")
        else:
            print(f"Resultado: {resultado:.2f}")

main()`}
      />

      <h2>Proyecto 2 — Adivina el número</h2>

      <p>
        El segundo proyecto es un mini-juego que viste de pasada en el Módulo 4. Lo vamos a hacer
        completo: con cuenta de intentos, pistas, control de entradas inválidas, opción de jugar
        de nuevo y récord de partidas.
      </p>

      <h3>El boceto</h3>

      <ol>
        <li>El programa elige un número secreto entre 1 y 100.</li>
        <li>El jugador tiene varios intentos para adivinarlo.</li>
        <li>Después de cada intento, recibe una pista: <em>"más alto"</em> o <em>"más bajo"</em>.</li>
        <li>Si lo adivina, se le felicita y se le dice cuántos intentos usó.</li>
        <li>Si escribe algo que no es un número, el programa no se rompe — le pide otra vez.</li>
        <li>Al final, le pregunta si quiere jugar otra partida.</li>
        <li>Al salir, muestra cuántas partidas jugó y su mejor récord (menos intentos).</li>
      </ol>

      <h3>Pieza nueva: <code>random</code></h3>

      <p>
        Para que el programa elija un número al azar, necesitamos un <strong>módulo</strong> de Python
        llamado <code>random</code>. Los módulos son librerías de funciones extra que Python
        trae instaladas — los veremos a fondo en el Libro 2. Por ahora basta saber que para
        usarlas, las <em>importas</em> al inicio del archivo:
      </p>

      <CodeBlock code={`import random

# random.randint(a, b) devuelve un entero entre a y b (ambos incluidos)
secreto = random.randint(1, 100)
print(secreto)   # un número distinto cada vez que ejecutas`} />

      <h3>El juego completo</h3>

      <CodeBlock code={`import random

def pedir_intento():
    """Pide un número al usuario, repitiendo si la entrada es inválida."""
    while True:
        texto = input("Tu intento: ").strip()
        if texto.isdigit():
            return int(texto)
        print("Eso no es un número entero. Inténtalo de nuevo.")

def jugar_partida():
    secreto = random.randint(1, 100)
    intentos = 0
    print()
    print("He pensado un número entre 1 y 100. ¡Adivínalo!")

    while True:
        intento = pedir_intento()
        intentos += 1

        if intento == secreto:
            print(f"¡Lo lograste en {intentos} intentos!")
            return intentos
        elif intento < secreto:
            print("Más alto...")
        else:
            print("Más bajo...")

def main():
    partidas = 0
    mejor = None       # ningún récord todavía

    while True:
        intentos = jugar_partida()
        partidas += 1

        if mejor is None or intentos < mejor:
            mejor = intentos

        respuesta = input("¿Otra partida? (s/n): ").strip().lower()
        if respuesta != "s":
            break

    print()
    print("=== Resumen ===")
    print(f"Partidas jugadas: {partidas}")
    print(f"Mejor récord: {mejor} intentos")
    print("¡Gracias por jugar!")

main()`} />

      <p>Tres detalles que vale la pena resaltar:</p>

      <ul>
        <li>
          <strong><code>pedir_intento</code> usa un bucle interno</strong> para validar la entrada.
          Si el usuario escribe <em>"abc"</em>, no se rompe — vuelve a preguntar. Patrón muy común
          en programas que reciben entradas humanas.
        </li>
        <li>
          <strong><code>jugar_partida</code> devuelve los intentos.</strong> Así <code>main</code>
          puede calcular el récord acumulado entre partidas. Una función que devuelve es muchísimo
          más reutilizable que una que solo imprime.
        </li>
        <li>
          <strong>El récord empieza como <code>None</code></strong>. La condición
          <code> mejor is None or intentos &lt; mejor </code> aprovecha que <code>or</code>
          es perezoso: si el primer lado es <code>True</code>, ni siquiera evalúa el segundo,
          así que no falla al comparar con <code>None</code>.
        </li>
      </ul>

      <Callout kind="tip" title="¿Qué es esa línea de texto al principio de la función?">
        <code>"""Pide un número..."""</code> es una <em>docstring</em>: una cadena multilínea
        que sirve como documentación de la función. Python la guarda automáticamente y
        otras herramientas (como VS Code) la usan para mostrar ayuda. Acostúmbrate a poner una
        docstring en cada función que escribas; tu yo-de-dentro-de-tres-meses te lo va a agradecer.
      </Callout>

      <h3>Pruébalo</h3>

      <PyRunner
        initial={`import random

def pedir_intento():
    while True:
        texto = input("Tu intento: ").strip()
        if texto.isdigit():
            return int(texto)
        print("Eso no es un número entero. Inténtalo de nuevo.")

def jugar_partida():
    secreto = random.randint(1, 100)
    intentos = 0
    print()
    print("He pensado un número entre 1 y 100. ¡Adivínalo!")

    while True:
        intento = pedir_intento()
        intentos += 1

        if intento == secreto:
            print(f"¡Lo lograste en {intentos} intentos!")
            return intentos
        elif intento < secreto:
            print("Más alto...")
        else:
            print("Más bajo...")

def main():
    partidas = 0
    mejor = None

    while True:
        intentos = jugar_partida()
        partidas += 1

        if mejor is None or intentos < mejor:
            mejor = intentos

        respuesta = input("¿Otra partida? (s/n): ").strip().lower()
        if respuesta != "s":
            break

    print()
    print("=== Resumen ===")
    print(f"Partidas jugadas: {partidas}")
    print(f"Mejor récord: {mejor} intentos")
    print("¡Gracias por jugar!")

main()`}
      />

      <PullQuote>
        Acabas de escribir un programa que <em>parece</em> un programa de verdad. Bucles dentro
        de bucles, funciones que cooperan, validación de entradas, datos que persisten entre
        partidas. Hace dos meses no escribías ni "Hola, mundo".
      </PullQuote>

      <h2>Repaso general del Libro 1</h2>

      <p>Antes de los retos, repasemos las ideas grandes — no la sintaxis, las <em>ideas</em>:</p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(2, 1fr)',
        gap: 'var(--s-3)',
        margin: 'var(--s-5) 0',
      }} className="recap-grid">
        <RecapCard num="01" title="Las tres ideas básicas" desc="Todo programa es combinación de secuencia, decisión y repetición. Cualquier complejidad nace de combinarlas." />
        <RecapCard num="02" title="Datos con nombre" desc="Las variables guardan valores; cada valor tiene un tipo (int, float, str, bool); los tipos se pueden convertir." />
        <RecapCard num="03" title="Operar es preguntar" desc="Aritmética para calcular, comparación para preguntar, lógica para combinar. Y el % es uno de los más útiles." />
        <RecapCard num="04" title="Decidir y repetir" desc="if / elif / else para elegir caminos. for y while para repetir. break, continue, pass para controlar el ritmo." />
        <RecapCard num="05" title="Empaquetar ideas" desc="Las funciones agrupan código bajo un nombre. Reciben parámetros y devuelven resultados con return." />
        <RecapCard num="06" title="Colecciones" desc="Listas (mutables) y tuplas (inmutables). Recorrer con for, indexar, hacer slices, append y operadores." />
        <RecapCard num="07" title="Manejar texto" desc="Las cadenas son secuencias inmutables. Split + join son los dos métodos más usados." />
        <RecapCard num="08" title="Combinar todo" desc="Un programa real no es una técnica nueva: es saber qué pieza usar y cuándo. Esto solo se aprende practicando." />
        <style>{`@media (max-width: 720px) { .recap-grid { grid-template-columns: 1fr !important; } }`}</style>
      </div>

      <Callout kind="success" title="Lo más importante que aprendiste no es Python">
        Aprendiste a <strong>descomponer un problema</strong> en piezas pequeñas y a hacer que esas
        piezas trabajen juntas. Esa habilidad — el "pensamiento computacional" — se traslada a
        cualquier lenguaje, a cualquier oficio, a cualquier reto. Python fue solo el medio.
      </Callout>

      <h2>Retos finales</h2>

      <p style={{ color: 'var(--ink-2)' }}>
        Cinco retos opcionales. No vienen con solución completa — para eso ya estás preparado. Si
        terminas dos o tres, ya puedes considerar el Libro 1 dominado. Los más avanzados pueden
        intentar los cinco antes de pasar al Libro 2.
      </p>

      <Exercise
        number="R.1"
        title="Calculadora con historial"
        difficulty="media"
        runner={{
          initial: `# Amplía la calculadora del Proyecto 1 con un HISTORIAL:
#
#  - Cada cálculo exitoso se añade a una lista en
#    formato cadena, por ejemplo: "10.0 + 3.0 = 13.0".
#  - Añade una nueva opción "6) Ver historial" en el menú
#    que recorra la lista e imprima cada entrada.
#  - Al salir, muestra cuántos cálculos hizo el usuario.

import random

# tu solución aquí

`,
          hint: 'Crea una lista vacía "historial" antes del bucle principal. Cada vez que un cálculo tenga éxito, haz historial.append(f"{a} OP {b} = {resultado}"). Para la opción 6, recorre con for y enumera. Para mostrar el conteo final: len(historial).',
        }}
      >
        <p>
          Una variación natural: que tu calculadora <em>recuerde</em> todo lo que ha hecho.
        </p>
      </Exercise>

      <Exercise
        number="R.2"
        title="Adivina con dificultades"
        difficulty="media"
        runner={{
          initial: `# Amplía el juego de adivinar con TRES niveles de dificultad
# antes de empezar cada partida:
#
#   Fácil:   número entre 1 y 50,   10 intentos
#   Normal:  número entre 1 y 100,  7 intentos
#   Difícil: número entre 1 y 200,  5 intentos
#
# Si el usuario AGOTA los intentos sin acertar, mostrar
# el número secreto y considerar la partida como perdida.

import random

# tu solución aquí

`,
          hint: 'Antes de cada partida, pide el nivel. Guarda (rango_max, intentos_maximos) según la elección. En jugar_partida, recibe esos dos como parámetros. En el bucle interno, lleva un contador y rompe si llega al máximo. Devuelve algo como (acerto, intentos) o usa None para perdidas.',
        }}
      >
        <p>Niveles de dificultad: una pequeña adición que cambia mucho la sensación.</p>
      </Exercise>

      <Exercise
        number="R.3"
        title="Análisis de un texto"
        difficulty="media"
        runner={{
          initial: `# Pide al usuario un texto (puede ser una frase larga o
# pegado de varios párrafos) y muéstrale estas estadísticas:
#
#   - Cantidad total de caracteres
#   - Cantidad de palabras
#   - Palabra más larga
#   - Cantidad de vocales (a, e, i, o, u, incluidas las acentuadas)
#   - Promedio de letras por palabra (1 decimal)

`,
          hint: 'Usa split() para palabras, len para tamaños. Para la palabra más larga: recorre la lista con un for y guarda la más larga en una variable. Las vocales: recorre cada letra del texto en minúsculas y comprueba "in" sobre una cadena que las contenga.',
        }}
      >
        <p>Un mini-analizador de texto. Combina los módulos 6 y 7.</p>
      </Exercise>

      <Exercise
        number="R.4"
        title="Gestor de tareas"
        difficulty="difícil"
        runner={{
          initial: `# Construye un gestor de tareas por consola con menú:
#
#  1) Añadir tarea
#  2) Listar tareas (numeradas)
#  3) Marcar tarea como hecha (pidiendo su número)
#  4) Eliminar tarea (pidiendo su número)
#  5) Salir
#
# Guarda las tareas en una lista de tuplas: (texto, hecha?)
# Cuando una tarea está hecha, márcala con [✓] al listar.

`,
          hint: 'Cada tarea es una tupla (texto, hecha) donde hecha es True/False. Como las tuplas son inmutables, para "marcar como hecha" creas una nueva tupla y reemplazas en la lista: tareas[i] = (tareas[i][0], True). Para listar con [✓] o [ ] usa un f-string con condicional.',
        }}
      >
        <p>Un programa real: una pequeña aplicación de productividad. Casi una app.</p>
      </Exercise>

      <Exercise
        number="R.5"
        title="Tu turno"
        difficulty="?"
        runner={{
          initial: `# El reto final es libre.
#
# Inventa un mini-programa interactivo con menú,
# que combine al menos:
#   - Funciones
#   - Listas o tuplas
#   - Un bucle while con condición de salida
#   - Manejo de entrada inválida
#   - Una validación con un método de string (isdigit, etc.)
#
# Ideas: contador de calorías, conversor de divisas,
# generador de contraseñas, agenda telefónica, mini-test
# de preguntas, simulador de cajero...

`,
          hint: 'Empieza por el boceto en palabras (como hicimos con la calculadora). Después define el main() vacío con las llamadas a funciones que tendrías que escribir. Después rellena cada función una por una.',
        }}
      >
        <p>El reto final no tiene enunciado. Inventa tú.</p>
      </Exercise>

      <h2>Y ahora qué</h2>

      <p>
        Has terminado el Libro 1. <strong>Esto es muchísimo</strong>. Si llegaste hasta aquí
        habiendo escrito (y entendido) la mayoría de los ejercicios, no eres "alguien que está aprendiendo
        Python" — eres alguien que <em>sabe</em> Python básico.
      </p>

      <p>El Libro 2 te va a llevar al siguiente nivel:</p>

      <ul>
        <li><strong>Diccionarios y conjuntos</strong>: estructuras de datos más expresivas que las listas.</li>
        <li><strong>Funciones avanzadas</strong>: lambdas, *args, closures.</li>
        <li><strong>Programación orientada a objetos</strong>: clases y objetos. Una forma nueva de organizar tu código.</li>
        <li><strong>Manejo de errores</strong>: hacer programas que no se rompen aunque las cosas vayan mal.</li>
        <li><strong>Archivos</strong>: leer y escribir en el disco. Tus programas dejan de olvidar todo al cerrarse.</li>
        <li><strong>Módulos y paquetes</strong>: usar código de otros e instalar librerías con <code>pip</code>.</li>
        <li><strong>Comprensiones</strong>: las dos líneas mágicas que reemplazan a quince.</li>
        <li><strong>Proyecto final intermedio</strong>: una agenda de contactos y un gestor de tareas con persistencia.</li>
      </ul>

      <Callout kind="tip" title="Antes de saltar al Libro 2">
        Te recomiendo dos cosas: (1) <strong>termina al menos dos retos finales</strong> de este módulo;
        eso te asienta lo aprendido. (2) <strong>Instala Python en tu computadora</strong> si todavía no
        lo hiciste y ejecuta uno de los proyectos desde la terminal — la experiencia de "abrir tu
        editor y ejecutar tu propio archivo" es importante.
      </Callout>

      <PullQuote>
        Aprender a programar se parece a aprender un idioma: durante mucho tiempo entiendes pero no
        hablas con fluidez. Después, casi sin darte cuenta, un día <em>conviertes ideas en código</em>
        sin tener que parar a pensar la gramática. Estás a un paso de ese día.
      </PullQuote>

      <div style={{
        marginTop: 'var(--s-7)',
        padding: 'var(--s-6) var(--s-6)',
        background: 'var(--paper-2)',
        border: '1px solid var(--border)',
        borderRadius: 'var(--r-lg)',
        textAlign: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}>
        <div className="eyebrow eyebrow-accent" style={{ marginBottom: 'var(--s-3)' }}>
          // fin del libro 1
        </div>
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(2.4rem, 5vw, 3.6rem)',
          lineHeight: 1.05,
          fontWeight: 500,
          letterSpacing: '-0.025em',
          marginBottom: 'var(--s-3)',
        }}>
          Has terminado.
        </div>
        <p style={{
          fontFamily: 'var(--font-display)',
          fontStyle: 'italic',
          fontSize: '1.3rem',
          color: 'var(--ink-2)',
          maxWidth: '40ch',
          margin: '0 auto var(--s-5)',
        }}>
          Ya sabes los fundamentos de Python. Cuando estés listo,
          el Libro 2 te espera.
        </p>
        <div style={{ display: 'flex', justifyContent: 'center', gap: 'var(--s-3)', flexWrap: 'wrap' }}>
          <a
            className="btn btn-primary"
            href="#l2-m1"
            onClick={(e) => { e.preventDefault(); onNav('l2-m1'); }}
          >
            Empezar el Libro 2 →
          </a>
          <a
            className="btn btn-ghost"
            href="#cover"
            onClick={(e) => { e.preventDefault(); onNav('cover'); }}
          >
            Volver a la portada
          </a>
        </div>
      </div>

      <ChapterNav
        prev={{ id: 'l1-m7', title: 'Cadenas de texto' }}
        next={{ id: 'l2-m1', title: 'Diccionarios y conjuntos' }}
        onNav={onNav}
      />
    </article>
  );
}

function RecapCard({ num, title, desc }) {
  return (
    <div style={{
      background: 'var(--paper-2)',
      border: '1px solid var(--border-soft)',
      borderRadius: 'var(--r-md)',
      padding: 'var(--s-4)',
      display: 'grid',
      gridTemplateColumns: '50px 1fr',
      gap: 'var(--s-3)',
      alignItems: 'baseline',
    }}>
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '1.1rem',
        color: 'var(--highlight)',
        fontWeight: 600,
        letterSpacing: '0.04em',
      }}>{num}</div>
      <div>
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: '1.15rem',
          fontWeight: 500,
          letterSpacing: '-0.01em',
          marginBottom: 4,
        }}>{title}</div>
        <p style={{
          margin: 0,
          fontSize: '0.88rem',
          color: 'var(--ink-2)',
          lineHeight: 1.5,
        }}>{desc}</p>
      </div>
    </div>
  );
}

window.ChapterL1M8 = ChapterL1M8;
