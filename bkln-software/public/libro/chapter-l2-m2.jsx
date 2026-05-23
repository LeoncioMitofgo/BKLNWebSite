// =============================================================
// chapter-l2-m2.jsx — Libro 2, Módulo 2: Funciones avanzadas
// =============================================================

function ChapterL2M2({ onNav }) {
  return (
    <article className="reader-inner">
      <ChapterHeader
        book="// libro 2 · programando con estructura"
        module="módulo 02"
        time="≈ 55 min"
        title={<>Funciones <em>avanzadas</em></>}
        dek="En el Libro 1 aprendiste a definir y llamar funciones. Ahora aprenderás a tratarlas como cualquier otro valor: guardarlas en variables, pasarlas como argumentos y construir con ellas."
      />

      <p>
        En el Libro 1, las funciones eran bloques de código con nombre que llamabas cuando
        los necesitabas. Eso ya es poderoso. Pero Python va más lejos: las funciones son
        <strong> objetos de primera clase</strong>, lo que significa que puedes hacer con ellas
        exactamente lo mismo que con cualquier otro valor — guardarlas en variables, meterlas
        en listas, pasarlas como argumentos a otras funciones, devolverlas desde funciones.
      </p>

      <p>
        Ese cambio de perspectiva — de "las funciones son comandos" a "las funciones son valores" —
        abre una forma completamente nueva de programar.
      </p>

      <h2>Funciones como valores</h2>

      <p>
        Empieza por lo más simple: una función es un valor. Puedes asignarla a una variable
        y llamarla a través de ese nuevo nombre:
      </p>

      <CodeBlock code={`def saludar(nombre):
    return f"Hola, {nombre}!"

# "saludar" sin paréntesis es el objeto función, no una llamada
mi_funcion = saludar

print(mi_funcion("Ana"))     # Hola, Ana!
print(type(saludar))         # <class 'function'>`} />

      <ReplOutput>{`Hola, Ana!
<class 'function'>`}</ReplOutput>

      <p>
        Y si puedes guardarlas en variables, también puedes meterlas en listas o diccionarios
        y llamarlas dinámicamente:
      </p>

      <CodeBlock code={`def sumar(a, b):   return a + b
def restar(a, b):  return a - b
def mult(a, b):    return a * b

operaciones = {
    "+": sumar,
    "-": restar,
    "*": mult,
}

simbolo = "+"
resultado = operaciones[simbolo](10, 3)
print(resultado)    # 13`} />

      <ReplOutput>13</ReplOutput>

      <Callout kind="info" title="Pasar funciones como argumentos">
        Si una función puede ser un valor, también puede ser un argumento. Una función que
        recibe otra función como parámetro se llama <strong>función de orden superior</strong>.
        <code>sorted</code>, <code>map</code> y <code>filter</code> son ejemplos que ya vienen
        en Python — los veremos más adelante en este módulo.
      </Callout>

      <h2>Funciones lambda</h2>

      <p>
        Una <strong>lambda</strong> es una función anónima de una sola expresión. Útil cuando
        necesitas una función pequeña en el momento — sin la ceremonia de un <code>def</code>
        completo:
      </p>

      <CodeBlock code={`# Con def:
def cuadrado(x):
    return x * x

# Con lambda — exactamente lo mismo:
cuadrado = lambda x: x * x

print(cuadrado(5))   # 25`} />

      <ReplOutput>25</ReplOutput>

      <p>La sintaxis completa: <code>lambda parámetros: expresión</code>. El resultado de la expresión es el valor devuelto.</p>

      <CodeBlock code={`# Lambda con varios parámetros
suma = lambda a, b: a + b
print(suma(3, 4))        # 7

# Lambda con condición
par_o_impar = lambda n: "par" if n % 2 == 0 else "impar"
print(par_o_impar(7))    # impar`} />

      <ReplOutput>{`7
impar`}</ReplOutput>

      <Callout kind="tip" title="Cuándo usar lambda y cuándo def">
        La regla práctica: usa <code>lambda</code> solo cuando la función es tan sencilla que
        ponerle nombre haría el código <em>más difícil</em> de leer, no más fácil. El caso
        más común es pasarla como argumento a otra función (<code>sorted</code>, <code>map</code>…)
        sin necesidad de reutilizarla. Si la vas a usar más de una vez, o si tiene más de
        una línea de lógica, usa <code>def</code>.
      </Callout>

      <h3>El uso más común: el parámetro <code>key</code> de <code>sorted</code></h3>

      <p>
        <code>sorted</code> acepta un parámetro <code>key</code>: una función que transforma
        cada elemento antes de compararlo. Combinado con lambda, es muy expresivo:
      </p>

      <CodeBlock code={`nombres = ["Sofía", "Ana", "Alejandro", "Lu"]

# Ordenar por longitud del nombre
por_longitud = sorted(nombres, key=lambda n: len(n))
print(por_longitud)

# Ordenar lista de dicts por un campo
personas = [
    {"nombre": "Luis",  "edad": 30},
    {"nombre": "Ana",   "edad": 25},
    {"nombre": "Pedro", "edad": 28},
]
por_edad = sorted(personas, key=lambda p: p["edad"])
for p in por_edad:
    print(p["nombre"], p["edad"])`} />

      <ReplOutput>{`['Lu', 'Ana', 'Sofía', 'Alejandro']
Ana 25
Pedro 28
Luis 30`}</ReplOutput>

      <Quiz
        question="¿Qué imprime: (lambda x, y: x * y)(3, 4) ?"
        options={['None', '12', 'Error — las lambdas no se pueden llamar directamente', '7']}
        correct={1}
        explanation='Una lambda es un valor como cualquier otro. Si va entre paréntesis, puedes llamarla inmediatamente poniendo los argumentos después: (lambda x, y: x * y)(3, 4) define la función y la llama al instante. El resultado es 3 * 4 = 12.'
      />

      <h2>*args: número variable de argumentos</h2>

      <p>
        A veces no sabes de antemano cuántos argumentos recibirá tu función. <code>*args</code>
        permite capturarlos todos en una tupla:
      </p>

      <CodeBlock code={`def sumar_todo(*numeros):
    print(type(numeros))    # <class 'tuple'>
    total = 0
    for n in numeros:
        total += n
    return total

print(sumar_todo(1, 2, 3))          # 6
print(sumar_todo(10, 20, 30, 40))   # 100
print(sumar_todo())                 # 0`} />

      <ReplOutput>{`<class 'tuple'>
6
<class 'tuple'>
100
<class 'tuple'>
0`}</ReplOutput>

      <p>
        El nombre <code>args</code> es solo una convención — puedes usar cualquier nombre.
        Lo que hace especial al parámetro es el <strong>asterisco</strong> delante.
      </p>

      <h3>Combinar parámetros normales con <code>*args</code></h3>

      <p>
        Puedes mezclar parámetros normales con <code>*args</code>, pero los normales deben
        ir primero:
      </p>

      <CodeBlock code={`def presentar(saludo, *nombres):
    for nombre in nombres:
        print(f"{saludo}, {nombre}!")

presentar("Hola", "Ana", "Luis", "Pedro")
presentar("Buenos días", "Sofía")`} />

      <ReplOutput>{`Hola, Ana!
Hola, Luis!
Hola, Pedro!
Buenos días, Sofía!`}</ReplOutput>

      <h3>El operador <code>*</code> para desempaquetar</h3>

      <p>
        El asterisco también funciona al <em>llamar</em> a una función: desempaqueta una lista
        o tupla como argumentos individuales:
      </p>

      <CodeBlock code={`def sumar(a, b, c):
    return a + b + c

numeros = [1, 2, 3]
print(sumar(*numeros))    # equivale a sumar(1, 2, 3) → 6

# Útil con funciones built-in también
print(max(*numeros))      # 3`} />

      <ReplOutput>{`6
3`}</ReplOutput>

      <h2>**kwargs: argumentos por nombre variables</h2>

      <p>
        Si <code>*args</code> captura argumentos posicionales extra en una tupla,
        <code>**kwargs</code> captura argumentos <em>por nombre</em> extra en un diccionario:
      </p>

      <CodeBlock code={`def mostrar_datos(**info):
    print(type(info))    # <class 'dict'>
    for clave, valor in info.items():
        print(f"  {clave}: {valor}")

mostrar_datos(nombre="Ana", edad=25, ciudad="Madrid")`} />

      <ReplOutput>{`<class 'dict'>
  nombre: Ana
  edad: 25
  ciudad: Madrid`}</ReplOutput>

      <p>De nuevo, el nombre <code>kwargs</code> es solo convención. El doble asterisco es lo que importa.</p>

      <h3>El orden canónico de los parámetros</h3>

      <p>
        Si usas los cuatro tipos de parámetros a la vez, van en este orden concreto:
      </p>

      <CodeBlock code={`def f(normal, *args, solo_nombre=True, **kwargs):
    print(normal)
    print(args)
    print(solo_nombre)
    print(kwargs)

f(1, 2, 3, solo_nombre=False, extra="hola", otro=99)`} />

      <ReplOutput>{`1
(2, 3)
False
{'extra': 'hola', 'otro': 99}`}</ReplOutput>

      <div style={{
        background: 'var(--paper-2)',
        border: '1px solid var(--border-soft)',
        borderRadius: 'var(--r-md)',
        padding: 'var(--s-4) var(--s-5)',
        margin: 'var(--s-5) 0',
      }}>
        <div className="eyebrow" style={{ marginBottom: 'var(--s-3)' }}>// orden de los parámetros</div>
        <code style={{ fontSize: '1rem', color: 'var(--accent)' }}>
          def f(posicionales, *args, solo_keyword, **kwargs)
        </code>
        <ol style={{ margin: 'var(--s-3) 0 0', paddingLeft: '1.4em', color: 'var(--ink-2)', fontSize: '0.92rem' }}>
          <li>Parámetros posicionales normales</li>
          <li><code>*args</code> — captura el resto de posicionales</li>
          <li>Parámetros que <em>solo</em> se pueden pasar por nombre (van después del *)</li>
          <li><code>**kwargs</code> — captura el resto de los keyword</li>
        </ol>
      </div>

      <Callout kind="tip" title="**kwargs en la práctica">
        El uso más común de <code>**kwargs</code> no es tanto en tus propias funciones como
        al <em>reenviar</em> argumentos a otra función sin enumerarlos todos. Verás patrones
        como <code>def mi_print(**kwargs): print(**kwargs)</code> constantemente en librerías.
        También es la base de cómo funcionan los decoradores, que verás en el Libro 3.
      </Callout>

      <h2>Closures: funciones que recuerdan</h2>

      <p>
        Una <strong>closure</strong> (clausura) es una función definida <em>dentro</em> de otra
        función que "recuerda" las variables del entorno donde fue creada, incluso después de que
        la función exterior haya terminado.
      </p>

      <p>Empieza con un ejemplo sencillo:</p>

      <CodeBlock code={`def crear_saludador(saludo):
    # "saludo" es una variable local de crear_saludador
    def saludar(nombre):
        # saludar recuerda "saludo" aunque crear_saludador ya terminó
        return f"{saludo}, {nombre}!"
    return saludar   # devolvemos la función, no la llamamos

hola  = crear_saludador("Hola")
buenas = crear_saludador("Buenos días")

print(hola("Ana"))     # Hola, Ana!
print(buenas("Luis"))  # Buenos días, Luis!
print(hola("Pedro"))   # Hola, Pedro!`} />

      <ReplOutput>{`Hola, Ana!
Buenos días, Luis!
Hola, Pedro!`}</ReplOutput>

      <p>
        Fíjate: <code>crear_saludador</code> ya terminó cuando llamamos <code>hola("Ana")</code>,
        pero la función interna <code>saludar</code> todavía recuerda que <code>saludo</code> vale
        <code> "Hola"</code>. Eso es una closure: la función lleva consigo el entorno donde nació.
      </p>

      <h3>Un caso de uso real: fábricas de funciones</h3>

      <CodeBlock code={`def multiplicador(factor):
    return lambda x: x * factor

doble    = multiplicador(2)
triple   = multiplicador(3)
decima   = multiplicador(10)

print(doble(5))     # 10
print(triple(5))    # 15
print(decima(5))    # 50

# También sirven con listas:
datos = [1, 2, 3, 4, 5]
print(list(map(doble, datos)))    # [2, 4, 6, 8, 10]`} />

      <ReplOutput>{`10
15
50
[2, 4, 6, 8, 10]`}</ReplOutput>

      <Callout kind="info" title="¿Qué es map()?">
        <code>map(funcion, iterable)</code> aplica <code>funcion</code> a cada elemento
        del iterable y devuelve un iterador con los resultados. Es la alternativa funcional
        al patrón "lista vacía + bucle + append". Lo envolvemos en <code>list()</code>
        para obtener una lista concreta.
      </Callout>

      <h2><code>map</code> y <code>filter</code>: programación funcional básica</h2>

      <p>
        Python trae dos funciones de orden superior muy usadas que aplican una función a
        una colección:
      </p>

      <CodeBlock code={`numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# map: transforma cada elemento
cuadrados = list(map(lambda x: x ** 2, numeros))
print(cuadrados)

# filter: se queda con los que cumplen la condición
pares = list(filter(lambda x: x % 2 == 0, numeros))
print(pares)

# Combinados: cuadrado de los pares
resultado = list(map(lambda x: x ** 2, filter(lambda x: x % 2 == 0, numeros)))
print(resultado)`} />

      <ReplOutput>{`[1, 4, 9, 16, 25, 36, 49, 64, 81, 100]
[2, 4, 6, 8, 10]
[4, 16, 36, 64, 100]`}</ReplOutput>

      <Callout kind="tip" title="map/filter vs comprensiones de lista">
        En el Módulo 7 del Libro 2 verás las <strong>comprensiones de lista</strong>, que
        hacen lo mismo de forma más legible en Python moderno:
        <CodeBlock hideCopy code={`# Equivalentes:
list(map(lambda x: x**2, numeros))
[x**2 for x in numeros]

list(filter(lambda x: x % 2 == 0, numeros))
[x for x in numeros if x % 2 == 0]`} />
        <code>map</code> y <code>filter</code> siguen siendo útiles al combinar funciones
        ya definidas con nombre, sin necesidad de lambda.
      </Callout>

      <PyRunner
        initial={`# Experimenta con funciones de orden superior
def aplicar_a_todos(funcion, lista):
    """Aplica 'funcion' a cada elemento de 'lista'."""
    return [funcion(x) for x in lista]

def es_positivo(n):
    return n > 0

numeros = [-3, -1, 0, 2, 5, -2, 8]

positivos = [n for n in numeros if es_positivo(n)]
print("Positivos:", positivos)

# Prueba con tu propia función
cuadrados = aplicar_a_todos(lambda x: x**2, positivos)
print("Cuadrados:", cuadrados)`}
      />

      <h2>Ejercicios</h2>

      <p style={{ color: 'var(--ink-2)' }}>
        Cinco ejercicios que cubren cada concepto del módulo. El último los combina todos.
      </p>

      <Exercise
        number="2.1"
        title="Ordenar con criterio"
        difficulty="fácil"
        runner={{
          initial: `# Tienes esta lista de palabras.
# Ordénalas de tres formas distintas usando sorted() y lambda:
#   1) Por longitud (de menor a mayor).
#   2) Alfabéticamente inverso (Z → A).
#   3) Por la última letra de cada palabra.

palabras = ["banana", "kiwi", "manzana", "uva", "pera", "frambuesa"]
`,
          hint: 'sorted(palabras, key=lambda p: len(p)) para longitud. sorted(palabras, reverse=True) para inverso. sorted(palabras, key=lambda p: p[-1]) para la última letra.',
          solution: {
            code: `palabras = ["banana", "kiwi", "manzana", "uva", "pera", "frambuesa"]

por_longitud = sorted(palabras, key=lambda p: len(p))
print("Por longitud:", por_longitud)

inverso = sorted(palabras, reverse=True)
print("Inverso:", inverso)

por_ultima = sorted(palabras, key=lambda p: p[-1])
print("Por última letra:", por_ultima)`,
            explanation: 'El parámetro key acepta cualquier función de un argumento. La lambda recibe cada elemento y devuelve el valor por el que se compara. Es una de las combinaciones más usadas en Python real.',
          },
        }}
      >
        <p>Lambda + sorted: la combinación más frecuente del módulo.</p>
      </Exercise>

      <Exercise
        number="2.2"
        title="Función acumuladora flexible"
        difficulty="fácil"
        runner={{
          initial: `# Define una función "resumir" que acepte
# un número variable de números (*args) y devuelva
# un diccionario con:
#   - "total": la suma de todos
#   - "promedio": la media
#   - "maximo": el mayor
#   - "minimo": el menor
#
# Pruébala con varios conjuntos de números.

`,
          hint: 'def resumir(*numeros): — dentro, usa sum(), max(), min() sobre "numeros" (que es una tupla). El promedio es sum(numeros) / len(numeros). Devuelve un dict con las cuatro claves.',
          solution: {
            code: `def resumir(*numeros):
    if not numeros:
        return None
    return {
        "total":    sum(numeros),
        "promedio": sum(numeros) / len(numeros),
        "maximo":   max(numeros),
        "minimo":   min(numeros),
    }

print(resumir(3, 1, 4, 1, 5, 9, 2, 6))
print(resumir(100))
print(resumir())`,
            explanation: '*args convierte todos los argumentos posicionales en una tupla. Eso permite llamar a resumir() con cualquier cantidad de números. El guard "if not numeros" evita división por cero cuando no se pasa nada.',
          },
        }}
      >
        <p>Tu primera función con *args de utilidad real.</p>
      </Exercise>

      <Exercise
        number="2.3"
        title="Constructor de etiquetas HTML"
        difficulty="media"
        runner={{
          initial: `# Define una función "etiqueta" que construya
# una cadena HTML. Debe aceptar:
#   - tag: nombre de la etiqueta (obligatorio)
#   - contenido: texto dentro (obligatorio)
#   - **atributos: cualquier atributo HTML extra
#
# Ejemplos de uso:
#   etiqueta("p", "Hola")
#       → '<p>Hola</p>'
#
#   etiqueta("a", "Click aquí", href="https://...", target="_blank")
#       → '<a href="https://..." target="_blank">Click aquí</a>'

`,
          hint: 'Construye los atributos con un for sobre atributos.items(): f\'{k}="{v}"\'. Únelos con " ".join(...). Si hay atributos, pon un espacio antes de ellos en la etiqueta de apertura.',
          solution: {
            code: `def etiqueta(tag, contenido, **atributos):
    attrs = ""
    if atributos:
        partes = [f'{k}="{v}"' for k, v in atributos.items()]
        attrs = " " + " ".join(partes)
    return f"<{tag}{attrs}>{contenido}</{tag}>"

print(etiqueta("p", "Hola"))
print(etiqueta("a", "Click aquí", href="https://python.org", target="_blank"))
print(etiqueta("input", "", type="text", placeholder="Escribe aquí"))`,
            explanation: '**kwargs (aquí llamado "atributos") captura todos los argumentos por nombre extra como un diccionario. Luego los iteramos con .items() para construir la cadena de atributos. Este patrón es exactamente cómo funcionan los constructores de interfaces en muchas librerías.',
          },
        }}
      >
        <p>**kwargs en un caso de uso del mundo real.</p>
      </Exercise>

      <Exercise
        number="2.4"
        title="Fábrica de validadores"
        difficulty="media"
        runner={{
          initial: `# Crea una función "crear_validador" que reciba
# un valor mínimo y uno máximo, y DEVUELVA una función
# que comprueba si un número está en ese rango.
#
# Ejemplo de uso:
#   validar_edad    = crear_validador(0, 120)
#   validar_nota    = crear_validador(0, 10)
#   validar_porcentaje = crear_validador(0, 100)
#
#   print(validar_edad(25))      # True
#   print(validar_nota(11))      # False
#   print(validar_porcentaje(75)) # True

`,
          hint: 'def crear_validador(minimo, maximo): define dentro una función que recibe "n" y devuelve minimo <= n <= maximo. Devuelve esa función interna. Eso es una closure: la función interna recuerda minimo y maximo.',
          solution: {
            code: `def crear_validador(minimo, maximo):
    def validar(n):
        return minimo <= n <= maximo
    return validar

validar_edad        = crear_validador(0, 120)
validar_nota        = crear_validador(0, 10)
validar_porcentaje  = crear_validador(0, 100)

print(validar_edad(25))           # True
print(validar_edad(150))          # False
print(validar_nota(7))            # True
print(validar_nota(11))           # False
print(validar_porcentaje(75))     # True`,
            explanation: 'Esta es una closure clásica: crear_validador devuelve una función que "recuerda" los valores de minimo y maximo con los que fue creada. Cada llamada a crear_validador produce una función independiente con su propio par (minimo, maximo). Es el patrón de las "fábricas de funciones".',
          },
        }}
      >
        <p>Closures en acción: una fábrica de funciones validadoras.</p>
      </Exercise>

      <Exercise
        number="2.5"
        title="Pipeline de transformaciones"
        difficulty="difícil"
        runner={{
          initial: `# Implementa una función "pipeline" que reciba
# un valor inicial y un número variable de funciones,
# y aplique cada función al resultado de la anterior.
#
# Ejemplo:
#   resultado = pipeline(
#       "  Hola Mundo  ",
#       str.strip,           # quita espacios
#       str.lower,           # minúsculas
#       lambda s: s.replace(" ", "_"),  # espacios → _
#   )
#   print(resultado)  → "hola_mundo"
#
# Implementa pipeline y pruébalo con al menos
# dos casos distintos.

`,
          hint: 'def pipeline(valor, *funciones): Dentro, un for sobre funciones: valor = funcion(valor). Al final, return valor. Cada función transforma el resultado de la anterior.',
          solution: {
            code: `def pipeline(valor, *funciones):
    for funcion in funciones:
        valor = funcion(valor)
    return valor

# Caso 1: limpiar y normalizar texto
resultado1 = pipeline(
    "  Hola Mundo  ",
    str.strip,
    str.lower,
    lambda s: s.replace(" ", "_"),
)
print(resultado1)    # hola_mundo

# Caso 2: operaciones numéricas
resultado2 = pipeline(
    5,
    lambda x: x * 2,    # 10
    lambda x: x + 3,    # 13
    lambda x: x ** 2,   # 169
)
print(resultado2)    # 169`,
            explanation: 'Un pipeline encadena transformaciones: la salida de cada función es la entrada de la siguiente. *funciones captura todas las funciones pasadas como una tupla, y el bucle las aplica en orden. Este patrón aparece en librerías de procesamiento de datos (pandas, scikit-learn, etc.) bajo nombres como "pipe", "chain" o "compose".',
          },
        }}
      >
        <p>El reto final junta *args, lambdas y funciones como valores en un patrón profesional.</p>
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
          <li>Las funciones son <strong>objetos de primera clase</strong>: se guardan en variables, listas, dicts, y se pasan como argumentos.</li>
          <li><code>lambda params: expr</code> — función anónima de una línea. Ideal para <code>sorted(key=...)</code>, <code>map</code>, <code>filter</code>.</li>
          <li><code>*args</code> captura argumentos posicionales extra como <strong>tupla</strong>.</li>
          <li><code>**kwargs</code> captura argumentos por nombre extra como <strong>diccionario</strong>.</li>
          <li>Orden canónico: <code>def f(normal, *args, solo_kw, **kwargs)</code>.</li>
          <li>El operador <code>*</code> al llamar <em>desempaqueta</em> una lista como argumentos: <code>f(*lista)</code>.</li>
          <li><strong>Closure</strong>: función interna que recuerda variables del entorno donde fue creada, aunque ese entorno ya no exista.</li>
          <li><code>map(f, iter)</code> — aplica <code>f</code> a cada elemento.</li>
          <li><code>filter(f, iter)</code> — conserva los elementos donde <code>f</code> devuelve <code>True</code>.</li>
        </ul>
      </div>

      <PullQuote>
        Tratar las funciones como valores cambia la forma en que piensas los problemas.
        En el próximo módulo ese cambio se vuelve todavía más profundo: aprenderás a
        crear tus propios <em>tipos de datos</em> con clases y objetos.
      </PullQuote>

      <ChapterNav
        prev={{ id: 'l2-m1', title: 'Diccionarios y conjuntos' }}
        next={{ id: 'l2-m3', title: 'Programación orientada a objetos' }}
        onNav={onNav}
      />
    </article>
  );
}

window.ChapterL2M2 = ChapterL2M2;
