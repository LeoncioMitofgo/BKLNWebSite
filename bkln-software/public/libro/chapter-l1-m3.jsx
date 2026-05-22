// =============================================================
// chapter-l1-m3.jsx — Libro 1, Módulo 3: Operadores y expresiones
// =============================================================

function ChapterL1M3({ onNav }) {
  return (
    <article className="reader-inner">
      <ChapterHeader
        book="// libro 1 · primeros pasos"
        module="módulo 03"
        time="≈ 35 min"
        title={<>Operadores y <em>expresiones</em></>}
        dek="Las piezas pequeñas con las que Python construye toda la lógica del mundo: sumar, comparar, decidir."
      />

      <p>
        En el módulo anterior aprendiste a guardar valores en variables. Pero un programa hace más
        que guardar: <em>opera</em> con esos valores. Suma, resta, compara, junta, decide.
      </p>

      <p>
        Los <strong>operadores</strong> son los símbolos que le dicen a Python qué hacer con los
        valores. Una <strong>expresión</strong> es cualquier combinación de valores y operadores
        que Python puede evaluar para obtener un resultado. Como en matemáticas: <code>2 + 3</code>
        es una expresión que se evalúa a <code>5</code>.
      </p>

      <p>Vamos a recorrer las tres familias principales de operadores.</p>

      <h2>Operadores aritméticos</h2>

      <p>
        Los conociste de pasada en el módulo anterior. Son los que ya usaste mil veces en
        la calculadora del colegio, más un par de extras útiles:
      </p>

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
              <th style={thStyle}>Operador</th>
              <th style={thStyle}>Nombre</th>
              <th style={thStyle}>Ejemplo</th>
              <th style={thStyle}>Resultado</th>
            </tr>
          </thead>
          <tbody>
            <OpRow op="+" name="Suma" ej="7 + 3" res="10" />
            <OpRow op="-" name="Resta" ej="7 - 3" res="4" />
            <OpRow op="*" name="Multiplicación" ej="7 * 3" res="21" />
            <OpRow op="/" name="División" ej="7 / 3" res="2.333..." />
            <OpRow op="//" name="División entera" ej="7 // 3" res="2" />
            <OpRow op="%" name="Resto (módulo)" ej="7 % 3" res="1" />
            <OpRow op="**" name="Potencia" ej="2 ** 8" res="256" last />
          </tbody>
        </table>
      </div>

      <h3>El operador <code>%</code> — el más subestimado</h3>

      <p>
        El operador <strong>módulo</strong>, escrito como <code>%</code>, te da el <em>resto</em>
        de una división. <code>7 % 3</code> es 1 porque 7 dividido entre 3 da 2, y sobra 1.
      </p>

      <p>
        Suena tonto, pero <code>%</code> es uno de los operadores que más vas a usar en tu vida
        de programadora. Una pista de por qué:
      </p>

      <CodeBlock code={`# ¿Un número es par?  → su resto al dividir entre 2 es 0
print(8 % 2)    # → 0  (8 es par)
print(7 % 2)    # → 1  (7 es impar)

# ¿Un año es múltiplo de 4?
print(2024 % 4) # → 0  (sí)
print(2025 % 4) # → 1  (no)`} />

      <ReplOutput>{`0
1
0
1`}</ReplOutput>

      <Callout kind="tip" title="Truco: detectar pares e impares">
        La regla de oro: <strong>un número es par si <code>n % 2 == 0</code></strong>.
        Lo vas a usar tanto que mejor lo aprendes ya.
      </Callout>

      <h3>Atajos: operadores compuestos</h3>

      <p>
        Cuando quieres modificar una variable basándote en su valor anterior, en lugar de
        escribir <code>contador = contador + 1</code>, Python te deja un atajo:
      </p>

      <CodeBlock code={`contador = 0

contador = contador + 1   # forma larga
contador += 1             # forma corta — equivalente

# Existen para los cinco operadores principales:
puntos = 100
puntos += 50    # puntos = puntos + 50  → 150
puntos -= 20    # puntos = puntos - 20  → 130
puntos *= 2     # puntos = puntos * 2   → 260
puntos //= 3    # puntos = puntos // 3  → 86
puntos %= 10    # puntos = puntos % 10  → 6

print(puntos)`} />

      <ReplOutput>6</ReplOutput>

      <Callout kind="info" title="El sentido del =">
        Acuérdate del módulo anterior: el <code>=</code> en Python no significa "igualdad", significa
        "guarda en". Por eso <code>contador = contador + 1</code> tiene sentido: <em>"guarda en
        contador el resultado de contador + 1"</em>. Si lo leyeras como matemática pura, sería absurdo
        (un número nunca es igual a sí mismo más uno).
      </Callout>

      <Quiz
        question="¿Cuál es el resultado de la expresión: 17 % 5 ?"
        options={['3', '2', '3.4', '0']}
        correct={1}
        explanation="17 dividido entre 5 da 3 (caben tres cincos en 17: 5 + 5 + 5 = 15), y sobra 2. El operador % devuelve ese resto. No confundir con 17 // 5, que sería 3."
      />

      <h2>Operadores de comparación</h2>

      <p>
        Una <strong>comparación</strong> es una pregunta con respuesta de sí o no.
        Por ejemplo: <em>"¿es 18 mayor o igual a 18?"</em>. Python responde con un booleano:
        <code>True</code> si la respuesta es sí, <code>False</code> si es no.
      </p>

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
              <th style={thStyle}>Operador</th>
              <th style={thStyle}>Pregunta</th>
              <th style={thStyle}>Ejemplo</th>
              <th style={thStyle}>Resultado</th>
            </tr>
          </thead>
          <tbody>
            <OpRow op="==" name="¿Son iguales?" ej="3 == 3" res="True" />
            <OpRow op="!=" name="¿Son distintos?" ej="3 != 5" res="True" />
            <OpRow op="<" name="¿Menor que?" ej="3 < 5" res="True" />
            <OpRow op=">" name="¿Mayor que?" ej="3 > 5" res="False" />
            <OpRow op="<=" name="¿Menor o igual?" ej="3 <= 3" res="True" />
            <OpRow op=">=" name="¿Mayor o igual?" ej="5 >= 3" res="True" last />
          </tbody>
        </table>
      </div>

      <Callout kind="warn" title="¡Cuidado! El error más cometido de la historia">
        <p style={{ margin: 0 }}>
          <code>=</code> y <code>==</code> son <strong>cosas distintas</strong>:
        </p>
        <ul style={{ margin: 'var(--s-2) 0 0', paddingLeft: '1.2em' }}>
          <li><code>=</code> &nbsp;<strong>guarda</strong> un valor en una variable.</li>
          <li><code>==</code> <strong>compara</strong> dos valores y devuelve True o False.</li>
        </ul>
        <p style={{ margin: 'var(--s-2) 0 0' }}>
          Confundirlos es el error más cometido de la historia de la programación. No es exageración.
        </p>
      </Callout>

      <p>Las comparaciones no son solo de números. También funcionan con texto:</p>

      <CodeBlock code={`# Comparación de cadenas
print("hola" == "hola")     # True
print("hola" == "Hola")     # False — distingue mayúsculas
print("ana" < "carla")      # True — orden alfabético`} />

      <ReplOutput>{`True
False
True`}</ReplOutput>

      <h2>Operadores lógicos</h2>

      <p>
        Las comparaciones contestan una pregunta. Pero a veces necesitas combinarlas: <em>"¿es
        mayor de edad <strong>Y</strong> tiene carnet?"</em>, <em>"¿está abierto <strong>O</strong> es domingo?"</em>.
      </p>

      <p>
        Para esto existen los tres <strong>operadores lógicos</strong>: <code>and</code>, <code>or</code>, <code>not</code>.
        Trabajan con valores booleanos y producen otro booleano.
      </p>

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
              <th style={thStyle}>Operador</th>
              <th style={thStyle}>Cuándo es True</th>
              <th style={thStyle}>Ejemplo</th>
              <th style={thStyle}>Resultado</th>
            </tr>
          </thead>
          <tbody>
            <OpRow op="and" name="Cuando AMBOS lados son True" ej="True and True" res="True" />
            <OpRow op="and" name="" ej="True and False" res="False" />
            <OpRow op="or" name="Cuando AL MENOS uno es True" ej="True or False" res="True" />
            <OpRow op="or" name="" ej="False or False" res="False" />
            <OpRow op="not" name="Invierte el valor" ej="not True" res="False" last />
          </tbody>
        </table>
      </div>

      <p>Y en código real:</p>

      <CodeBlock code={`edad = 22
tiene_carnet = True

# AND: ambas condiciones deben cumplirse
puede_conducir = edad >= 18 and tiene_carnet
print(puede_conducir)   # True

# OR: basta con que una se cumpla
es_finde = False
es_festivo = True
hay_descanso = es_finde or es_festivo
print(hay_descanso)     # True

# NOT: invierte
esta_abierto = False
print(not esta_abierto)  # True — está cerrado`} />

      <ReplOutput>{`True
True
True`}</ReplOutput>

      <Callout kind="tip" title="Léelos en voz alta">
        Python eligió palabras en lugar de símbolos (<code>&&</code>, <code>||</code> como otros
        lenguajes). Eso hace que el código se lea casi como una frase en inglés:
        <em> "if age greater-or-equal 18 and has_license"</em>. Aprovecha eso al elegir nombres:
        si tus variables están bien nombradas, tu lógica casi se entiende sola.
      </Callout>

      <h3>El truco: combinar comparaciones encadenadas</h3>

      <p>
        Python tiene una sintaxis especial bonita que casi ningún lenguaje permite: encadenar
        comparaciones. En vez de escribir <code>edad &gt;= 18 and edad &lt;= 65</code>, puedes hacer:
      </p>

      <CodeBlock code={`edad = 30

# Forma tradicional (funciona en cualquier lenguaje)
print(edad >= 18 and edad <= 65)

# Forma encadenada (estilo Python)
print(18 <= edad <= 65)`} />

      <ReplOutput>{`True
True`}</ReplOutput>

      <p>Las dos versiones hacen lo mismo. La segunda es más corta y se lee como en matemáticas.</p>

      <Quiz
        question="Sea edad = 16 y tiene_permiso = True. ¿Cuál es el resultado de: edad >= 18 or tiene_permiso ?"
        options={['True', 'False', 'Error', 'Depende']}
        correct={0}
        explanation="La primera parte (edad >= 18) es False, porque 16 no es mayor o igual a 18. Pero el operador 'or' devuelve True si AL MENOS UNA de las dos partes es True. Como tiene_permiso es True, el resultado completo es True."
      />

      <h2>Precedencia: ¿quién va primero?</h2>

      <p>
        Cuando una expresión tiene varios operadores, Python los evalúa en un orden concreto.
        Como en matemáticas — <em>"multiplicaciones antes que sumas"</em> — pero con muchos más
        operadores. Esto se llama <strong>precedencia</strong>.
      </p>

      <p>Mira este caso:</p>

      <CodeBlock code={`resultado = 2 + 3 * 4
print(resultado)`} />

      <ReplOutput>14</ReplOutput>

      <p>
        Python primero hizo <code>3 * 4</code> (porque <code>*</code> tiene más prioridad que <code>+</code>),
        y al resultado le sumó 2. <em>No fue de izquierda a derecha</em>.
      </p>

      <h3>La regla práctica</h3>

      <p>De mayor a menor prioridad, lo que necesitas recordar:</p>

      <ol>
        <li>Lo que esté entre <strong>paréntesis</strong> <code>()</code> — siempre primero.</li>
        <li>Potencias <code>**</code>.</li>
        <li><code>*</code> &nbsp;<code>/</code>&nbsp; <code>//</code>&nbsp; <code>%</code> — todos al mismo nivel.</li>
        <li><code>+</code> &nbsp;<code>-</code></li>
        <li>Comparaciones (<code>&lt;</code>, <code>&gt;</code>, <code>==</code>, etc.).</li>
        <li><code>not</code></li>
        <li><code>and</code></li>
        <li><code>or</code></li>
      </ol>

      <Callout kind="tip" title="No memorices la tabla. Usa paréntesis.">
        Aprenderte esta tabla de memoria es una mala inversión de tiempo. <strong>Usa paréntesis</strong>:
        son gratis, hacen tu código más claro y eliminan toda ambigüedad. <code>2 + (3 * 4)</code>
        es igual de rápido que <code>2 + 3 * 4</code>, pero quien lo lea no tiene que pensar.
      </Callout>

      <p>Compara y juzga tú mismo:</p>

      <CodeBlock code={`# ¿Qué hace esto? Difícil saberlo a primera vista.
es_valido = edad >= 18 and tiene_carnet or es_admin

# Con paréntesis se lee solo:
es_valido = (edad >= 18 and tiene_carnet) or es_admin`} hideCopy />

      <h2>Cuidado con la división por cero</h2>

      <p>
        Hay una operación que Python <strong>no puede hacer</strong>, y va a explotar con un error
        si lo intentas: dividir por cero.
      </p>

      <CodeBlock code={`resultado = 10 / 0
print(resultado)`} />

      <ReplOutput>ZeroDivisionError: division by zero</ReplOutput>

      <p>
        Lo mismo aplica para <code>//</code> y <code>%</code>. Cuando trabajes con valores que vienen
        del usuario, vas a tener que protegerte ante esa posibilidad (lo veremos a fondo en el módulo
        de manejo de errores en el Libro 2).
      </p>

      <Callout kind="warn" title="¡Cuidado! Floats y precisión">
        Si pruebas <code>0.1 + 0.2</code> en Python, te llevarás una sorpresa: el resultado es
        <code>0.30000000000000004</code>, no <code>0.3</code>. Es una limitación de cómo las
        computadoras guardan números decimales (todas, no solo Python). Para dinero y cosas
        donde la precisión importa, hay alternativas — pero para casi todo lo que harás al
        principio, esto no te va a estorbar.
      </Callout>

      <Quiz
        question="¿Cuál es el valor de: 10 - 4 ** 2 / 2 ?"
        options={['18', '2.0', '14', 'Error']}
        correct={1}
        explanation="Por precedencia: primero la potencia (4 ** 2 = 16), luego la división (16 / 2 = 8.0, da decimal porque / siempre da float), y al final la resta (10 - 8.0 = 2.0). Aquí está el porqué de usar paréntesis."
      />

      <h2>Ejercicios</h2>

      <p style={{ color: 'var(--ink-2)' }}>
        Cinco ejercicios para fijar lo aprendido. El último combina varios operadores —
        es exactamente la clase de problema que vas a encontrar en proyectos reales.
      </p>

      <Exercise
        number="3.1"
        title="Promedio de tres notas"
        difficulty="fácil"
        runner={{
          initial: `# Calcula el promedio de estas tres notas
# y muéstralo con una f-string:
#
#   El promedio es: 7.0

nota1 = 8
nota2 = 6
nota3 = 7

# tu código aquí

`,
          hint: 'Promedio = suma de los valores / cantidad de valores. Recuerda usar paréntesis para que primero se sume y luego se divida.',
          solution: {
            code: `nota1 = 8
nota2 = 6
nota3 = 7

promedio = (nota1 + nota2 + nota3) / 3
print(f"El promedio es: {promedio}")`,
            explanation: 'Sin paréntesis, nota1 + nota2 + nota3 / 3 daría 16.33... porque la división se haría antes que las sumas: primero nota3/3, luego se sumarían los demás. Los paréntesis fuerzan el orden correcto.',
          },
        }}
      >
        <p>Empezamos suave: aritmética con paréntesis.</p>
      </Exercise>

      <Exercise
        number="3.2"
        title="Par o impar"
        difficulty="fácil"
        runner={{
          initial: `# Pídele al usuario un número entero.
# Determina si es par o impar usando el operador %
# y muestra el resultado en una sola línea:
#
#   El número 7 es impar.
#
# Pista: par == 0  cuando el módulo entre 2 es 0.

`,
          hint: 'Usa una f-string que contenga "par" o "impar" según el resultado de número % 2. Una forma elegante: f"... {\'par\' if numero % 2 == 0 else \'impar\'}.". Pero también puedes usar dos prints separados con un if.',
          solution: {
            code: `numero = int(input("Dame un número: "))
es_par = numero % 2 == 0

# Versión sencilla:
if es_par:
    print(f"El número {numero} es par.")
else:
    print(f"El número {numero} es impar.")

# (Veremos el if a fondo en el próximo módulo.)`,
            explanation: 'El truco clave: numero % 2 da 0 si el número es par, 1 si es impar. Comparándolo con == 0 obtenemos un booleano que podemos usar en un if. Esta lógica aparece constantemente en programación.',
          },
        }}
      >
        <p>Tu primer programa que <em>decide</em> algo basándose en un cálculo.</p>
      </Exercise>

      <Exercise
        number="3.3"
        title="Cambio en monedas"
        difficulty="media"
        runner={{
          initial: `# Tienes una cantidad de céntimos.
# Calcula cuántos euros, cuántos céntimos
# y muestra el cambio así:
#
#   523 céntimos = 5 euros y 23 céntimos
#
# Pistas:
#  - euros = céntimos // 100  (división entera)
#  - resto = céntimos % 100   (módulo)

centimos = 523

# tu código aquí

`,
          hint: 'Aquí es donde // y % brillan juntos. // te da la parte entera (cuántos billetes de 100), % te da lo que sobra. Combinados con una f-string, en tres líneas tienes la solución.',
          solution: {
            code: `centimos = 523
euros = centimos // 100
resto = centimos % 100
print(f"{centimos} céntimos = {euros} euros y {resto} céntimos")`,
            explanation: 'Este patrón (// y % juntos) lo verás en todos los programas que separan unidades grandes y pequeñas: horas/minutos, kilómetros/metros, dólares/centavos. Memorízalo.',
          },
        }}
      >
        <p>Aplicación clásica del módulo y la división entera.</p>
      </Exercise>

      <Exercise
        number="3.4"
        title="¿Puedes entrar al concierto?"
        difficulty="media"
        runner={{
          initial: `# Determina si una persona puede entrar al concierto.
# Las reglas son:
#  - Tiene que tener al menos 18 años, Y
#  - Tener entrada, Y
#  - NO estar en la lista negra.
#
# Resuélvelo en UNA SOLA expresión booleana,
# guárdala en "puede_entrar" y muéstrala.

edad = 22
tiene_entrada = True
en_lista_negra = False

puede_entrar = 
print(puede_entrar)`,
          hint: 'Combina las tres condiciones con and. La tercera necesita not (no estar en la lista negra = not en_lista_negra).',
          solution: {
            code: `edad = 22
tiene_entrada = True
en_lista_negra = False

puede_entrar = edad >= 18 and tiene_entrada and not en_lista_negra
print(puede_entrar)`,
            explanation: 'Tres condiciones, todas obligatorias → AND triple. La tercera se lee como "y no está en la lista negra", que en Python es and not en_lista_negra. Cambia los valores de las variables para ver cómo cambia el resultado.',
          },
        }}
      >
        <p>Ahora a combinar operadores lógicos para una condición real.</p>
      </Exercise>

      <Exercise
        number="3.5"
        title="Mini-calculadora"
        difficulty="media"
        runner={{
          initial: `# Pide al usuario dos números y muéstrale
# las cinco operaciones básicas con una f-string.
#
# Ejemplo de salida si el usuario escribe 10 y 3:
#
#   10 + 3 = 13
#   10 - 3 = 7
#   10 * 3 = 30
#   10 / 3 = 3.3333333333333335
#   10 % 3 = 1

`,
          hint: 'Dos input() con int() para convertir a número. Luego cinco prints (o uno con saltos de línea \\n) usando f-strings. Recuerda que los operandos van dentro de las llaves: f"{a} + {b} = {a + b}".',
          solution: {
            code: `a = int(input("Primer número: "))
b = int(input("Segundo número: "))

print(f"{a} + {b} = {a + b}")
print(f"{a} - {b} = {a - b}")
print(f"{a} * {b} = {a * b}")
print(f"{a} / {b} = {a / b}")
print(f"{a} % {b} = {a % b}")`,
            explanation: 'Dentro de las llaves de una f-string puedes meter cualquier expresión, no solo nombres de variables. Por eso {a + b} funciona: Python primero hace la cuenta, después la inserta en el texto. Es una de las razones por las que las f-strings son tan poderosas.',
          },
        }}
      >
        <p>Acabamos con tu primera mini-app de utilidad real.</p>
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
          <li>Aritméticos: <code>+ - * / // % **</code>. <code>//</code> es división entera, <code>%</code> es el resto.</li>
          <li>Atajos: <code>+=</code>, <code>-=</code>, <code>*=</code>, <code>//=</code>, <code>%=</code> reemplazan a <code>x = x + ...</code>.</li>
          <li>Comparación: <code>==  !=  &lt;  &gt;  &lt;=  &gt;=</code>. Resultado siempre <code>True</code> o <code>False</code>.</li>
          <li><strong>Confusión más común:</strong> <code>=</code> asigna, <code>==</code> compara.</li>
          <li>Lógicos: <code>and</code> (los dos), <code>or</code> (al menos uno), <code>not</code> (invierte).</li>
          <li>Comparaciones encadenadas: <code>18 &lt;= edad &lt;= 65</code> es válido en Python.</li>
          <li>Precedencia: paréntesis &gt; potencia &gt; <code>* /</code> &gt; <code>+ -</code> &gt; comparaciones &gt; <code>not</code> &gt; <code>and</code> &gt; <code>or</code>.</li>
          <li>Cuando dudes, <strong>usa paréntesis</strong>. Son gratis y hacen el código legible.</li>
        </ul>
      </div>

      <PullQuote>
        Ya sabes <em>decir</em> cosas (Módulo 1), <em>recordar</em> cosas (Módulo 2)
        y <em>operar</em> con ellas (Módulo 3). Solo falta una pieza para escribir programas
        de verdad: <em>decidir</em>.
      </PullQuote>

      <ChapterNav
        prev={{ id: 'l1-m2', title: 'Variables y tipos de datos' }}
        next={{ id: 'l1-m4', title: 'Control de flujo' }}
        onNav={onNav}
      />
    </article>
  );
}

const thStyle = {
  padding: '10px 14px',
  fontFamily: 'var(--font-mono)',
  fontSize: '0.7rem',
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: 'var(--ink-3)',
  fontWeight: 500,
};

function OpRow({ op, name, ej, res, last }) {
  const cellStyle = {
    padding: '10px 14px',
    borderTop: last ? '0' : '1px solid var(--border-soft)',
    verticalAlign: 'top',
  };
  return (
    <tr>
      <td style={{ ...cellStyle, fontFamily: 'var(--font-mono)', color: 'var(--accent)', fontWeight: 600 }}>{op}</td>
      <td style={cellStyle}>{name}</td>
      <td style={{ ...cellStyle, fontFamily: 'var(--font-mono)', color: 'var(--ink-2)', fontSize: '0.9rem' }}>{ej}</td>
      <td style={{ ...cellStyle, fontFamily: 'var(--font-mono)', color: 'var(--highlight)', fontSize: '0.9rem', fontWeight: 600 }}>{res}</td>
    </tr>
  );
}

window.ChapterL1M3 = ChapterL1M3;
