// =============================================================
// chapter-l1-m1.jsx — Libro 1, Módulo 1: ¿Qué es programar?
// =============================================================

function ChapterL1M1({ onNav }) {
  return (
    <article className="reader-inner">
      <ChapterHeader
        book="// libro 1 · primeros pasos"
        module="módulo 01"
        time="≈ 35 min"
        title={<>¿Qué es <em>programar</em>?</>}
        dek="Antes de escribir una sola línea de código, vamos a entender qué hace en realidad una computadora cuando la programamos."
      />

      <p>
        Empecemos por una pregunta que parece tonta pero no lo es: <strong>¿qué es exactamente una computadora?</strong>
      </p>

      <p>
        Una computadora es una máquina que hace una cosa, una sola, increíblemente rápido: <em>seguir instrucciones</em>.
        No piensa. No tiene intuición. No improvisa. Si le dices que sume dos números, suma dos números.
        Si le dices que muestre un texto, muestra ese texto. Si le dices "haz café", se queda mirándote (no
        tiene cafetera).
      </p>

      <p>
        <strong>Programar es escribir esas instrucciones en un idioma que la computadora entiende.</strong>
        Ese idioma se llama <em>lenguaje de programación</em>, y en este libro vamos a aprender uno
        muy popular llamado <strong>Python</strong>.
      </p>

      <Callout kind="info" title="Una analogía útil">
        Piensa en una receta de cocina. Una receta es una lista ordenada de pasos
        para preparar un plato. Si saltas un paso, o pones la sal antes que el aceite,
        el plato sale distinto. Un programa es exactamente eso: una receta para la computadora.
      </Callout>

      <h2>La lógica computacional</h2>

      <p>
        Cuando programas, no solo escribes pasos: organizas <em>la lógica</em> detrás de esos pasos.
        Casi todos los programas del mundo, desde el más simple hasta el que controla un cohete espacial,
        se construyen con solo <strong>tres ideas</strong>:
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(3, 1fr)',
        gap: 'var(--s-4)',
        margin: 'var(--s-5) 0',
      }} className="three-cards">
        <IdeaCard num="1" title="Secuencia" desc="Una cosa después de otra, en orden. Saca el pan, úntale mantequilla, ponle queso." />
        <IdeaCard num="2" title="Decisión" desc="Si pasa X, haz una cosa. Si no, haz otra. Si llueve, lleva paraguas." />
        <IdeaCard num="3" title="Repetición" desc="Haz algo varias veces, hasta que pase X. Mientras la cafetera no esté llena, sigue echando agua." />
        <style>{`@media (max-width: 720px) { .three-cards { grid-template-columns: 1fr !important; } }`}</style>
      </div>

      <p>
        Con solo esas tres herramientas — secuencia, decisión, repetición — se puede escribir cualquier programa
        que exista. Suena increíble, pero es cierto. Lo vamos a comprobar a lo largo de este libro.
      </p>

      <Quiz
        question="Si te pido que escribas una receta para hacer un té, ¿qué tipo de lógica estás usando principalmente?"
        options={[
          'Decisión: el agua puede estar fría o caliente',
          'Secuencia: hay pasos que deben ir en cierto orden',
          'Repetición: tengo que echar muchas hojas de té',
          'Ninguna, una receta no es lógica computacional',
        ]}
        correct={1}
        explanation="Una receta es ante todo una secuencia: primero hierves el agua, luego pones la bolsita, luego esperas. El orden importa. Aunque también puede haber decisiones ('si quieres con azúcar...') y repeticiones, lo que la define es la secuencia."
      />

      <h2>¿Qué es Python y por qué aprenderlo?</h2>

      <p>
        Python es un lenguaje de programación creado en 1991 por un programador holandés llamado
        <strong> Guido van Rossum</strong>. El nombre no viene del animal — viene de <em>Monty Python</em>,
        un grupo de comedia británico que a Guido le encantaba.
      </p>

      <p>
        Hoy, treinta y tantos años después, Python es uno de los lenguajes <strong>más usados del mundo</strong>.
        Lo usan en Google, en Netflix, en la NASA, en los bancos. Lo usan los científicos para analizar datos,
        los artistas para crear obras digitales, los profesores para enseñar a sus estudiantes. Y, lo más
        importante para ti: es <strong>el mejor lenguaje para empezar</strong>.
      </p>

      <h3>¿Por qué empezar con Python?</h3>

      <ul>
        <li><strong>Se lee como inglés.</strong> Mira: <code>if edad &gt;= 18: print("Eres adulto")</code>. Casi lo puedes traducir sin saber programar.</li>
        <li><strong>Perdona los errores.</strong> Otros lenguajes son muy exigentes con la sintaxis. Python te deja respirar.</li>
        <li><strong>Sirve para casi todo.</strong> Páginas web, inteligencia artificial, robots, videojuegos, hojas de cálculo. Lo que se te ocurra.</li>
        <li><strong>Tiene la comunidad más grande.</strong> Cuando te atasques (y te vas a atascar), encontrarás la respuesta en internet a un clic.</li>
      </ul>

      <PullQuote>
        Python es como la bicicleta de los lenguajes: simple, confiable, y te lleva
        a casi cualquier sitio sin ponértela difícil.
      </PullQuote>

      <Callout kind="tip" title="No vas a 'desperdiciar' tu tiempo">
        Una preocupación común es: <em>"¿y si después tengo que aprender otro lenguaje?"</em>.
        Te aseguro que lo que aprendas en Python — variables, bucles, funciones, lógica —
        se traslada directamente a JavaScript, a Java, a C, al que sea. Programar es como
        montar en bici: aprendes una vez y luego solo cambias el modelo.
      </Callout>

      <h2>Instalación de Python y VS Code</h2>

      <p>
        Para los primeros módulos vas a poder ejecutar código <strong>directamente en este libro</strong>,
        sin instalar nada. Pero para programar de verdad en tu computadora necesitas dos cosas:
        <strong> Python</strong> (el lenguaje) y <strong>VS Code</strong> (el editor donde vas a escribir el código).
      </p>

      <h3>Paso 1 — Instalar Python</h3>

      <ol>
        <li>Entra a <a href="https://www.python.org/downloads/" target="_blank" rel="noopener">python.org/downloads</a>.</li>
        <li>Pulsa el botón grande amarillo que dice <strong>"Download Python 3.x.x"</strong> (el número de versión cambia con el tiempo, cualquiera de la versión 3 te sirve).</li>
        <li>Abre el archivo descargado.</li>
        <li><strong>Muy importante:</strong> en la primera pantalla del instalador, marca la casilla
        <code>Add Python to PATH</code> antes de pulsar <em>Install Now</em>.</li>
      </ol>

      <Callout kind="warn" title="¡Cuidado! No te saltes esta casilla">
        Si olvidas marcar <code>Add Python to PATH</code> durante la instalación, después tu
        computadora "no encontrará" Python cuando intentes usarlo desde la terminal.
        No es el fin del mundo (se puede arreglar), pero te vas a frustrar. Marca la casilla.
      </Callout>

      <h3>Paso 2 — Verificar que Python quedó instalado</h3>

      <p>Abre la terminal de tu sistema:</p>
      <ul>
        <li><strong>Windows:</strong> busca <em>"Símbolo del sistema"</em> o <em>"PowerShell"</em>.</li>
        <li><strong>macOS:</strong> abre <em>"Terminal"</em> (Cmd+Espacio, escribe "terminal").</li>
        <li><strong>Linux:</strong> ya sabes dónde está tu terminal.</li>
      </ul>

      <p>Escribe esto y presiona Enter:</p>

      <CodeBlock lang="bash" code={`python --version`} />

      <p>Deberías ver algo como esto:</p>

      <ReplOutput>Python 3.12.4</ReplOutput>

      <p>
        Si ves un número de versión que empieza con <strong>3</strong>, perfecto. Si ves un mensaje
        de error o un número que empieza con 2, prueba con <code>python3 --version</code>. Si tampoco
        funciona, revisa el paso anterior.
      </p>

      <h3>Paso 3 — Instalar VS Code</h3>

      <p>
        VS Code (Visual Studio Code) es un editor de texto gratuito hecho por Microsoft.
        Es lo que vas a usar para escribir tus programas.
      </p>

      <ol>
        <li>Entra a <a href="https://code.visualstudio.com" target="_blank" rel="noopener">code.visualstudio.com</a>.</li>
        <li>Descarga la versión para tu sistema y abre el instalador.</li>
        <li>Acepta las opciones por defecto, no necesitas cambiar nada.</li>
        <li>Cuando termine, abre VS Code.</li>
      </ol>

      <h3>Paso 4 — Activar la extensión de Python en VS Code</h3>

      <p>
        Las <em>extensiones</em> son como aplicaciones que añaden funciones a VS Code.
        Hay una oficial de Microsoft que entiende Python y te ayuda mientras escribes.
      </p>

      <ol>
        <li>En VS Code, mira la barra de iconos a la izquierda. Busca el que parece cuatro cuadritos.</li>
        <li>En el buscador escribe <code>Python</code>.</li>
        <li>El primer resultado debe ser de <strong>Microsoft</strong>. Púlsalo y luego pulsa <em>Install</em>.</li>
      </ol>

      <Callout kind="success" title="¡Listo!">
        Tienes Python y VS Code instalados. Acabas de montar tu primer entorno de desarrollo.
        Eso es algo que la mayoría de la gente nunca hace en su vida. Estás dentro.
      </Callout>

      <h2>Tu primer programa: Hola, mundo</h2>

      <p>
        Hay una tradición tan vieja como la programación misma: el primer programa que escribes
        en cualquier lenguaje nuevo es uno que muestre <strong>"Hola, mundo"</strong> en la pantalla.
        Vamos a respetarla.
      </p>

      <h3>Versión 1 — Directamente en este libro</h3>

      <p>
        Lo más rápido. Abajo tienes un mini-editor. Pulsa <strong>Ejecutar</strong> y mira la magia:
      </p>

      <PyRunner initial={`print("Hola, mundo")`} />

      <p>
        ¿Funcionó? Felicidades. <strong>Acabas de programar.</strong> Ahora vamos a entender qué pasó:
      </p>

      <ul>
        <li><code>print</code> es una <strong>función</strong> de Python: una instrucción que ya viene
        incluida. Su trabajo es mostrar cosas en la pantalla.</li>
        <li>Los <strong>paréntesis</strong> son la forma de "llamar" a la función — de decirle a Python: hazlo.</li>
        <li>Dentro de los paréntesis va el <strong>argumento</strong>: lo que queremos que
        <code>print</code> muestre.</li>
        <li>Las <strong>comillas</strong> rodean al texto. En Python, cualquier cosa entre comillas
        es una <em>cadena de texto</em>. Si quitas las comillas, Python pensará que <code>Hola</code>
        es el nombre de algo (una variable) y, como no existe nada llamado así todavía, va a fallar.</li>
      </ul>

      <Callout kind="warn" title="Error común: olvidar las comillas">
        Si escribes <code>print(Hola, mundo)</code> sin las comillas, Python te dará un error
        que dice algo como <code>NameError: name 'Hola' is not defined</code>. Recuerda: <strong>texto = entre comillas</strong>.
      </Callout>

      <h3>Versión 2 — En tu computadora</h3>

      <p>Ahora vamos a hacerlo en VS Code, como un programador de verdad:</p>

      <ol>
        <li>Abre VS Code.</li>
        <li>Pulsa <code>Archivo → Abrir Carpeta...</code> y elige una carpeta nueva en cualquier lugar
        (por ejemplo, en tu Escritorio una carpeta llamada <code>python</code>).</li>
        <li>Crea un archivo nuevo: <code>Archivo → Nuevo archivo</code>. Guárdalo con el nombre <code>hola.py</code>.
        La extensión <code>.py</code> le dice a la computadora que es un archivo de Python.</li>
        <li>Dentro del archivo escribe exactamente esto:</li>
      </ol>

      <CodeBlock code={`print("Hola, mundo")`} />

      <ol start="5">
        <li>Guarda con <code>Ctrl+S</code> (o <code>Cmd+S</code> en Mac).</li>
        <li>Abre la terminal integrada de VS Code: menú <code>Terminal → Nueva terminal</code>.</li>
        <li>Escribe esto y presiona Enter:</li>
      </ol>

      <CodeBlock lang="bash" code={`python hola.py`} />

      <p>Deberías ver:</p>

      <ReplOutput>Hola, mundo</ReplOutput>

      <Callout kind="success" title="Eres oficialmente programador">
        Acabas de ejecutar un programa de Python desde la terminal. No es trivial —
        es exactamente la misma forma en que los profesionales ejecutan sus programas todos los días.
      </Callout>

      <h2>El modo interactivo (REPL)</h2>

      <p>
        Python tiene un modo especial muy útil para experimentar, llamado <strong>REPL</strong>
        (siglas de <em>Read-Eval-Print Loop</em>: leer, evaluar, imprimir, repetir). Es como una
        conversación con Python: tú escribes algo, Python te responde inmediatamente.
      </p>

      <p>Para entrar al REPL, abre la terminal y escribe:</p>

      <CodeBlock lang="bash" code={`python`} />

      <p>Verás algo como esto, y un cursor parpadeando:</p>

      <CodeBlock code={`>>> `} hideCopy />

      <p>Ahora puedes escribir Python línea a línea:</p>

      <CodeBlock code={`>>> 2 + 2
4
>>> "hola" + " " + "mundo"
'hola mundo'
>>> print("¿estás ahí, Python?")
¿estás ahí, Python?`} />

      <Callout kind="tip" title="El REPL es tu mejor amigo al aprender">
        Cuando tengas dudas — "¿qué pasa si sumo un número y un texto?", "¿cómo se llama esto?" —
        no las pienses en abstracto: <strong>pruébalas en el REPL</strong>. Python te responderá
        en menos de un segundo y aprenderás diez veces más rápido. Para salir del REPL escribe
        <code>exit()</code> y Enter.
      </Callout>

      <h2>Comentarios: notas para humanos</h2>

      <p>
        En Python, cualquier línea que empieza con <code>#</code> es un <strong>comentario</strong>.
        Python los ignora completamente. Sirven para dejar notas para ti mismo o para otras personas
        que lean tu código.
      </p>

      <CodeBlock code={`# Este es mi primer programa.
# Mañana ya no me acordaré de qué hace,
# así que dejo este recordatorio.

print("Hola, mundo")  # también pueden ir al final de una línea`} />

      <p>
        Los comentarios <strong>no son opcionales</strong> para un buen programador.
        Vas a leer mucho más código del que vas a escribir, y los comentarios son lo único
        que te salva cuando vuelves a un programa después de tres meses.
      </p>

      <Quiz
        question="¿Qué hará Python cuando ejecute este programa?"
        options={[
          'Mostrará dos veces "Hola"',
          'Mostrará "Hola" solo una vez',
          'Dará un error porque hay un símbolo # raro',
          'No mostrará nada',
        ]}
        correct={1}
        explanation='El símbolo # convierte el resto de la línea en comentario. Python ignora la línea "# print(\"Hola\")", así que solo se ejecuta la otra. Una sola "Hola" aparecerá en pantalla.'
      />

      <p style={{ marginTop: 'calc(-1 * var(--s-4))', color: 'var(--ink-3)', fontSize: '0.88rem' }}>
        <em>Programa de referencia para el quiz:</em>
      </p>
      <CodeBlock code={`# print("Hola")
print("Hola")`} hideCopy />

      <h2>Ejercicios</h2>

      <p style={{ color: 'var(--ink-2)' }}>
        Llegó el momento de mover los dedos. Estos ejercicios son cortos pero importantes — no los saltes.
        Cada uno tiene un editor en el que puedes probar tu solución. Si te atascas, mira la pista.
        Si después de varios intentos no te sale, abre la solución.
      </p>

      <Exercise
        number="1.1"
        title="Tu primer saludo personalizado"
        difficulty="fácil"
        runner={{
          initial: `# Modifica la siguiente línea para que muestre
# "Hola, [tu nombre]" — pon TU nombre.

print("Hola, ...")`,
          hint: 'Reemplaza los tres puntitos por tu nombre. ¡Pero mantén las comillas!',
          solution: {
            code: `print("Hola, Carlos")`,
            explanation: 'Cualquier texto que esté entre las comillas se mostrará tal cual. Las comillas marcan dónde empieza y dónde termina el texto.',
          },
        }}
      >
        <p>Haz que el programa salude por tu propio nombre.</p>
      </Exercise>

      <Exercise
        number="1.2"
        title="Tres líneas, tres saludos"
        difficulty="fácil"
        runner={{
          initial: `# Escribe TRES líneas usando print
# para saludar en tres idiomas distintos:
# español, inglés y otro a tu elección.

print("...")`,
          hint: 'Cada llamada a print() es independiente. Una debajo de otra, sin más.',
          solution: {
            code: `print("Hola")
print("Hello")
print("Bonjour")`,
            explanation: 'Cada print() muestra su contenido en una línea propia. Python ejecuta las instrucciones de arriba abajo, en orden.',
          },
        }}
      >
        <p>Las computadoras ejecutan instrucciones <strong>en secuencia</strong>. Vamos a verlo.</p>
      </Exercise>

      <Exercise
        number="1.3"
        title="Un poema corto"
        difficulty="fácil"
        runner={{
          initial: `# Usa print varias veces para imprimir
# este pequeño poema, línea por línea:
#
#   Hola, mundo.
#   No sé qué hago aquí,
#   pero sé que es código.
#
# (no incluyas el #)

`,
          hint: 'Tres líneas de poema = tres llamadas a print(). El orden importa.',
          solution: {
            code: `print("Hola, mundo.")
print("No sé qué hago aquí,")
print("pero sé que es código.")`,
            explanation: 'Cuando Python encuentra varios print() seguidos, los ejecuta uno detrás de otro, y cada uno produce una línea nueva en la salida.',
          },
        }}
      >
        <p>Vamos a hacer que la secuencia trabaje para ti.</p>
      </Exercise>

      <Exercise
        number="1.4"
        title="Un pequeño cálculo"
        difficulty="media"
        runner={{
          initial: `# print no sirve solo para textos.
# También sirve para mostrar el RESULTADO de un cálculo.
#
# Sin usar comillas, haz que Python muestre
# el resultado de multiplicar 15 por 24.

print(  )`,
          hint: 'Dentro de los paréntesis va una operación matemática. En Python, el símbolo de multiplicar es * (asterisco).',
          solution: {
            code: `print(15 * 24)`,
            explanation: 'Sin comillas, Python NO trata "15 * 24" como texto: lo trata como un cálculo real, lo resuelve (= 360), y muestra el resultado. Esa es una diferencia enorme: con comillas mostraría literalmente el texto "15 * 24".',
          },
        }}
      >
        <p>Hasta ahora hemos mostrado solo texto. Pero <code>print</code> puede hacer mucho más.</p>
      </Exercise>

      <Exercise
        number="1.5"
        title="Encuentra el error"
        difficulty="media"
        runner={{
          initial: `# Este programa NO funciona.
# Ejecútalo para ver el error que da,
# y luego arréglalo para que muestre
# correctamente: Hola, soy Python

print(Hola, soy Python)`,
          hint: '¿Qué le falta a "Hola, soy Python" para que Python sepa que es un texto y no nombres de variables?',
          solution: {
            code: `print("Hola, soy Python")`,
            explanation: 'El error original es NameError: name "Hola" is not defined. Python intentaba interpretar "Hola" como el nombre de una variable que no existe. Al envolver el texto en comillas, le decimos: esto es una cadena de texto, trátalo literalmente.',
          },
        }}
      >
        <p>
          Aprender a leer errores es una habilidad más importante que aprender a escribir código.
          Vamos a empezar pronto.
        </p>
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
          <li><strong>Programar</strong> es escribir instrucciones que la computadora ejecuta en orden.</li>
          <li>Casi todo programa usa tres ideas: <strong>secuencia</strong>, <strong>decisión</strong> y <strong>repetición</strong>.</li>
          <li><strong>Python</strong> es un lenguaje fácil de leer, popular y bueno para empezar.</li>
          <li>Para programar necesitas <strong>Python</strong> (el lenguaje) y un <strong>editor</strong> como VS Code.</li>
          <li><code>print("texto")</code> muestra cosas en pantalla. Los textos van entre comillas.</li>
          <li>El <strong>REPL</strong> (entras con <code>python</code> en la terminal) sirve para experimentar.</li>
          <li>Las líneas que empiezan con <code>#</code> son <strong>comentarios</strong>: notas para humanos.</li>
        </ul>
      </div>

      <PullQuote>
        En el próximo módulo, los programas dejarán de ser estáticos: aprenderás a
        guardar datos, a recibir información del usuario, y a hacer que tu código
        recuerde lo que pasó antes.
      </PullQuote>

      <ChapterNav
        prev={{ id: 'intro', title: 'Cómo usar este libro' }}
        next={{ id: 'l1-m2', title: 'Variables y tipos de datos' }}
        onNav={onNav}
      />
    </article>
  );
}

function IdeaCard({ num, title, desc }) {
  return (
    <div style={{
      background: 'var(--paper-2)',
      border: '1px solid var(--border-soft)',
      borderRadius: 'var(--r-md)',
      padding: 'var(--s-4) var(--s-4) var(--s-5)',
      position: 'relative',
    }}>
      <div style={{
        fontFamily: 'var(--font-display)',
        fontStyle: 'italic',
        fontSize: '2.4rem',
        color: 'var(--highlight)',
        lineHeight: 1,
        marginBottom: 'var(--s-2)',
      }}>{num}</div>
      <div style={{
        fontFamily: 'var(--font-display)',
        fontSize: '1.3rem',
        fontWeight: 500,
        letterSpacing: '-0.01em',
        marginBottom: 6,
      }}>{title}</div>
      <p style={{ margin: 0, fontSize: '0.92rem', color: 'var(--ink-2)', lineHeight: 1.5 }}>{desc}</p>
    </div>
  );
}

window.ChapterL1M1 = ChapterL1M1;
