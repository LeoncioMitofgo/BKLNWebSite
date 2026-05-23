// =============================================================
// chapter-l2-m7.jsx — Libro 2, Módulo 7: Comprensiones e iteradores
// =============================================================

function ChapterL2M7({ onNav }) {
  return (
    <article className="reader-inner">
      <ChapterHeader
        book="// libro 2 · programando con estructura"
        module="módulo 07"
        time="≈ 60 min"
        title={<>Comprensiones <em>e iteradores</em></>}
        dek="El código Python experto no es más largo — es más expresivo. Las comprensiones y los generadores te permiten transformar y procesar datos en una fracción del código, sin sacrificar claridad."
      />

      <p>
        Uno de los rasgos que distingue a un programador Python intermedio de uno principiante
        es el uso fluido de <strong>comprensiones</strong>. Son una forma compacta y legible
        de construir listas, diccionarios y conjuntos a partir de otros iterables.
        Los <strong>generadores</strong> van un paso más allá: producen valores uno a uno
        sin cargar todo en memoria.
      </p>

      <h2>List comprehensions</h2>

      <p>
        La forma larga de construir una lista a partir de otra:
      </p>

      <CodeBlock code={`# Forma tradicional — con bucle
cuadrados = []
for n in range(1, 11):
    cuadrados.append(n ** 2)
print(cuadrados)
# [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]`} />

      <p>La misma operación con una <strong>list comprehension</strong>:</p>

      <CodeBlock code={`# List comprehension — una línea, misma semántica
cuadrados = [n ** 2 for n in range(1, 11)]
print(cuadrados)
# [1, 4, 9, 16, 25, 36, 49, 64, 81, 100]`} />

      <p>La estructura siempre sigue el mismo patrón:</p>

      <CodeBlock code={`# [expresion for elemento in iterable]

nombres    = ["ana", "luis", "sofía"]
en_mayus   = [n.title() for n in nombres]
longitudes = [len(n) for n in nombres]

print(en_mayus)    # ['Ana', 'Luis', 'Sofía']
print(longitudes)  # [3, 4, 5]`} />

      <h2>Filtrar con if</h2>

      <p>
        Puedes añadir una condición al final para incluir solo los elementos que la cumplan:
      </p>

      <CodeBlock code={`# [expresion for elemento in iterable if condicion]

numeros = range(1, 21)

pares      = [n for n in numeros if n % 2 == 0]
impares    = [n for n in numeros if n % 2 != 0]
multiplos3 = [n for n in numeros if n % 3 == 0]

print(pares)       # [2, 4, 6, 8, 10, 12, 14, 16, 18, 20]
print(multiplos3)  # [3, 6, 9, 12, 15, 18]

# Filtrar y transformar a la vez
palabras  = ["python", "es", "genial", "y", "potente"]
largas    = [p.upper() for p in palabras if len(p) > 3]
print(largas)      # ['PYTHON', 'GENIAL', 'POTENTE']`} />

      <h3>if/else dentro de la expresión</h3>

      <p>
        También puedes usar un <code>if/else</code> como expresión condicional
        (ternario) en la parte de la expresión — esto es diferente del filtro:
      </p>

      <CodeBlock code={`# if/else como expresión — transforma TODOS los elementos
numeros = range(1, 11)
etiquetas = ["par" if n % 2 == 0 else "impar" for n in numeros]
print(etiquetas)
# ['impar', 'par', 'impar', 'par', 'impar', 'par', 'impar', 'par', 'impar', 'par']

# Reemplazar negativos por 0
datos = [5, -3, 8, -1, 0, 7, -4, 2]
positivos = [x if x > 0 else 0 for x in datos]
print(positivos)   # [5, 0, 8, 0, 0, 7, 0, 2]`} />

      <Quiz
        question="¿Cuál de estas comprensiones devuelve los cuadrados de los números pares del 1 al 10?"
        options={[
          '[n**2 for n in range(1,11) if n % 2]',
          '[n**2 if n % 2 == 0 for n in range(1,11)]',
          '[n**2 for n in range(1,11) if n % 2 == 0]',
          '[n for n**2 in range(1,11) if n % 2 == 0]',
        ]}
        correct={2}
        explanation='La estructura correcta es [expresión for elemento in iterable if condición]. El filtro "if n % 2 == 0" selecciona solo los pares, y "n**2" los eleva al cuadrado. La opción A filtra los impares (if n % 2 es True cuando n es impar). Las opciones B y D tienen sintaxis inválida.'
      />

      <h2>Dict y set comprehensions</h2>

      <p>
        La misma idea funciona para diccionarios y conjuntos:
      </p>

      <CodeBlock code={`# Dict comprehension — {clave: valor for ... in ...}
nombres   = ["Ana", "Luis", "Sofía", "Carlos"]
longitudes = {nombre: len(nombre) for nombre in nombres}
print(longitudes)
# {'Ana': 3, 'Luis': 4, 'Sofía': 5, 'Carlos': 6}

# Invertir un diccionario (si los valores son únicos)
original  = {"a": 1, "b": 2, "c": 3}
invertido = {v: k for k, v in original.items()}
print(invertido)   # {1: 'a', 2: 'b', 3: 'c'}

# Set comprehension — {expresion for ...}
texto  = "mississippi"
letras = {c for c in texto}           # elimina duplicados automáticamente
print(sorted(letras))                 # ['i', 'm', 'p', 's']

# Longitudes únicas de palabras
palabras  = ["hola", "mundo", "python", "es", "genial", "aquí"]
unicas    = {len(p) for p in palabras}
print(sorted(unicas))                 # [2, 4, 5, 6]`} />

      <h2>Comprensiones anidadas</h2>

      <CodeBlock code={`# Matriz 3x3 de ceros
matriz = [[0 for _ in range(3)] for _ in range(3)]
print(matriz)
# [[0, 0, 0], [0, 0, 0], [0, 0, 0]]

# Aplanar una lista de listas
listas = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
plana  = [n for sublista in listas for n in sublista]
print(plana)
# [1, 2, 3, 4, 5, 6, 7, 8, 9]

# Pares (x, y) donde x != y
pares = [(x, y) for x in range(1, 4) for y in range(1, 4) if x != y]
print(pares)
# [(1,2),(1,3),(2,1),(2,3),(3,1),(3,2)]`} />

      <Callout kind="warn" title="Cuando una comprehension es demasiado compleja">
        Si una comprensión necesita más de dos condiciones o anidamientos, es mejor
        volver al bucle tradicional. La claridad siempre gana. Una comprensión en tres
        líneas que nadie entiende es peor que un bucle en cinco líneas que todo el mundo lee.
      </Callout>

      <h2>Generadores — procesar sin cargar en memoria</h2>

      <p>
        Una <strong>expresión generadora</strong> es como una list comprehension pero
        con paréntesis. La diferencia clave: no crea la lista completa en memoria,
        produce los valores <em>uno a uno</em> cuando se los pides:
      </p>

      <CodeBlock code={`# List comprehension — crea TODA la lista en memoria de golpe
cuadrados_lista = [n ** 2 for n in range(1_000_000)]   # ocupa ~8 MB

# Expresión generadora — produce un valor cada vez que se necesita
cuadrados_gen   = (n ** 2 for n in range(1_000_000))   # ocupa ~100 bytes

# Usar el generador
print(next(cuadrados_gen))   # 0
print(next(cuadrados_gen))   # 1
print(next(cuadrados_gen))   # 4

# O en un bucle
gen = (n ** 2 for n in range(5))
for valor in gen:
    print(valor, end=" ")    # 0 1 4 9 16`} />

      <p>
        Muchas funciones de Python aceptan generadores directamente — no necesitas
        construir una lista intermedia:
      </p>

      <CodeBlock code={`# sum, max, min, any, all aceptan generadores
numeros  = range(1, 101)

total    = sum(n ** 2 for n in numeros)
maximo   = max(n for n in numeros if n % 7 == 0)
hay_par  = any(n % 2 == 0 for n in [1, 3, 5, 7, 8])
todos_pos = all(n > 0 for n in [1, 5, 3, 9, 2])

print(total)     # 338350
print(maximo)    # 98
print(hay_par)   # True
print(todos_pos) # True`} />

      <h2>Funciones generadoras con yield</h2>

      <p>
        Puedes crear tus propios generadores con <code>yield</code>. Cada vez que
        se llama a <code>next()</code>, la función se ejecuta hasta el siguiente
        <code>yield</code>, devuelve ese valor y <em>pausa</em>:
      </p>

      <CodeBlock code={`def contar_hasta(n):
    i = 0
    while i < n:
        yield i       # pausa aquí y devuelve i
        i += 1        # continúa desde aquí en la siguiente llamada

gen = contar_hasta(5)
print(next(gen))  # 0
print(next(gen))  # 1
print(next(gen))  # 2

# O iterar con for
for valor in contar_hasta(5):
    print(valor, end=" ")    # 0 1 2 3 4`} />

      <CodeBlock code={`def fibonacci():
    """Genera la secuencia de Fibonacci infinitamente."""
    a, b = 0, 1
    while True:
        yield a
        a, b = b, a + b

# Tomar los primeros 10 números de Fibonacci
gen = fibonacci()
primeros_10 = [next(gen) for _ in range(10)]
print(primeros_10)
# [0, 1, 1, 2, 3, 5, 8, 13, 21, 34]`} />

      <Callout kind="info" title="Generadores infinitos — sin problema de memoria">
        Un generador puede ser infinito (como <code>fibonacci()</code>) porque nunca
        construye toda la secuencia. Solo produce el siguiente valor cuando se lo pides.
        Esto es imposible con una lista normal.
      </Callout>

      <h2>Funciones built-in para iterar</h2>

      <p>
        Python tiene varias funciones que devuelven iteradores y hacen el código más limpio:
      </p>

      <CodeBlock code={`# enumerate — índice + valor a la vez
frutas = ["manzana", "pera", "uva"]
for i, fruta in enumerate(frutas, start=1):
    print(f"{i}. {fruta}")
# 1. manzana  2. pera  3. uva

# zip — combinar varios iterables en paralelo
nombres  = ["Ana", "Luis", "Sofía"]
edades   = [28, 35, 24]
ciudades = ["Madrid", "Barcelona", "Sevilla"]

for nombre, edad, ciudad in zip(nombres, edades, ciudades):
    print(f"{nombre}, {edad} años, {ciudad}")

# sorted — ordenar sin modificar el original
numeros   = [3, 1, 4, 1, 5, 9, 2, 6]
ordenados = sorted(numeros)
por_abs   = sorted([-3, 1, -4, 2], key=abs)  # por valor absoluto
palabras  = ["banana", "Manzana", "cereza"]
alfa      = sorted(palabras, key=str.lower)   # case-insensitive
print(ordenados)   # [1, 1, 2, 3, 4, 5, 6, 9]
print(por_abs)     # [1, 2, -3, -4]
print(alfa)        # ['banana', 'Manzana', 'cereza']`} />

      <CodeBlock code={`# map — aplica una función a cada elemento
numeros = [1, 2, 3, 4, 5]
cuadrados = list(map(lambda x: x ** 2, numeros))
print(cuadrados)   # [1, 4, 9, 16, 25]

# Hoy se prefiere una list comprehension:
cuadrados = [x ** 2 for x in numeros]   # más legible

# filter — filtra elementos
pares = list(filter(lambda x: x % 2 == 0, range(1, 11)))
print(pares)       # [2, 4, 6, 8, 10]

# Hoy se prefiere:
pares = [x for x in range(1, 11) if x % 2 == 0]`} />

      <h2>itertools — el arsenal del iterador</h2>

      <CodeBlock code={`from itertools import chain, islice, groupby, combinations, permutations, product, cycle, count

# chain — concatenar iterables
lista1 = [1, 2, 3]
lista2 = [4, 5, 6]
print(list(chain(lista1, lista2)))     # [1, 2, 3, 4, 5, 6]
print(list(chain("ABC", "XY")))        # ['A', 'B', 'C', 'X', 'Y']

# islice — tomar N elementos de un iterable (incluso infinito)
from itertools import count
naturales = count(1)                   # 1, 2, 3, 4, 5... infinito
print(list(islice(naturales, 10)))     # [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# combinations y permutations
letras = ['A', 'B', 'C']
print(list(combinations(letras, 2)))   # [('A','B'),('A','C'),('B','C')]
print(list(permutations(letras, 2)))   # [('A','B'),('A','C'),('B','A')...]

# product — producto cartesiano
colores = ['rojo', 'azul']
tallas  = ['S', 'M', 'L']
variantes = list(product(colores, tallas))
print(variantes[:4])   # [('rojo','S'),('rojo','M'),('rojo','L'),('azul','S')]`} />

      <h2>Ejemplo completo: pipeline de datos</h2>

      <p>
        Un pipeline que procesa una colección de empleados usando comprensiones,
        generadores y funciones de iteración — todo encadenado de forma eficiente.
      </p>

      <PyRunner
        initial={`from itertools import groupby
from collections import defaultdict

empleados = [
    {"nombre": "Ana García",   "dept": "Ingeniería", "sueldo": 3800, "años": 5},
    {"nombre": "Luis Pérez",   "dept": "Marketing",  "sueldo": 2800, "años": 2},
    {"nombre": "Sofía Ruiz",   "dept": "Ingeniería", "sueldo": 4200, "años": 8},
    {"nombre": "Carlos López", "dept": "RRHH",       "sueldo": 2600, "años": 1},
    {"nombre": "Marta Díaz",   "dept": "Marketing",  "sueldo": 3100, "años": 4},
    {"nombre": "Pedro Alonso", "dept": "Ingeniería", "sueldo": 3500, "años": 3},
    {"nombre": "Elena Mora",   "dept": "RRHH",       "sueldo": 2900, "años": 6},
    {"nombre": "Javier Ruiz",  "dept": "Marketing",  "sueldo": 2400, "años": 1},
]

# 1. Sueldos > 3000 con bonificación del 10%
con_bonus = [
    {**e, "sueldo_final": e["sueldo"] * 1.10}
    for e in empleados
    if e["sueldo"] > 3000
]
print("Con bonificación (sueldo > 3000):")
for e in con_bonus:
    print(f"  {e['nombre']:<18} {e['sueldo_final']:,.0f} €")

# 2. Sueldo medio por departamento
por_dept = defaultdict(list)
for e in empleados:
    por_dept[e["dept"]].append(e["sueldo"])

print("\\nMedia salarial por departamento:")
medias = {dept: sum(sueldos)/len(sueldos) for dept, sueldos in por_dept.items()}
for dept, media in sorted(medias.items(), key=lambda x: -x[1]):
    print(f"  {dept:<15} {media:,.0f} €")

# 3. Top 3 mejor pagados
top3 = sorted(empleados, key=lambda e: e["sueldo"], reverse=True)[:3]
print("\\nTop 3 mejor pagados:")
for i, e in enumerate(top3, 1):
    print(f"  {i}. {e['nombre']:<18} {e['sueldo']:,} €")

# 4. Años de experiencia acumulados por departamento (generador)
def años_por_dept(empleados, dept):
    return sum(e["años"] for e in empleados if e["dept"] == dept)

print("\\nExperiencia acumulada:")
for dept in sorted(por_dept):
    total = años_por_dept(empleados, dept)
    print(f"  {dept:<15} {total} años")

# 5. ¿Hay algún empleado con más de 7 años?
hay_veterano = any(e["años"] > 7 for e in empleados)
todos_senior = all(e["años"] > 2 for e in empleados)
print(f"\\n¿Hay veterano (>7 años)? {hay_veterano}")
print(f"¿Todos con >2 años?     {todos_senior}")`}
      />

      <h2>Ejercicios</h2>

      <p style={{ color: 'var(--ink-2)' }}>
        Cinco ejercicios que van de comprensiones básicas a generadores y pipelines completos.
      </p>

      <Exercise
        number="7.1"
        title="Comprensiones básicas"
        difficulty="fácil"
        runner={{
          initial: `# Resuelve cada uno con una sola comprensión (sin bucles for tradicionales):
#
# 1. Lista de los cubos de 1 a 10
# 2. Lista de palabras que tienen más de 4 letras (de 'palabras')
# 3. Dict donde clave=palabra, valor=longitud (solo palabras con >4 letras)
# 4. Set de las primeras letras de cada palabra (en minúscula)
# 5. Lista de tuplas (palabra, longitud) ordenada por longitud descendente

palabras = ["Python", "es", "un", "lenguaje", "muy", "potente", "y", "elegante"]
`,
          hint: 'Cada uno es una comprensión directa. Para el 5, combina una list comprehension con sorted(..., key=lambda x: -x[1]) o sorted(..., key=lambda x: x[1], reverse=True).',
          solution: {
            code: `palabras = ["Python", "es", "un", "lenguaje", "muy", "potente", "y", "elegante"]

# 1. Cubos de 1 a 10
cubos = [n**3 for n in range(1, 11)]
print("Cubos:", cubos)

# 2. Palabras con más de 4 letras
largas = [p for p in palabras if len(p) > 4]
print("Largas:", largas)

# 3. Dict palabra → longitud (>4 letras)
dict_largas = {p: len(p) for p in palabras if len(p) > 4}
print("Dict:", dict_largas)

# 4. Set de primeras letras
iniciales = {p[0].lower() for p in palabras}
print("Iniciales:", sorted(iniciales))

# 5. Tuplas ordenadas por longitud descendente
por_longitud = sorted([(p, len(p)) for p in palabras], key=lambda x: -x[1])
print("Por longitud:", por_longitud)`,
            explanation: 'Las comprensiones en Python son expresiones, no sentencias — pueden aparecer dentro de sorted(), sum(), any() y otras funciones. El patrón sorted([...], key=lambda x: -x[1]) ordena descendente por el segundo elemento de cada tupla.',
          },
        }}
      >
        <p>Cinco transformaciones clásicas resueltas con comprensiones.</p>
      </Exercise>

      <Exercise
        number="7.2"
        title="Aplanar y transformar"
        difficulty="fácil"
        runner={{
          initial: `# Usa comprensiones para resolver:
#
# 1. Aplanar esta lista de listas en una lista plana
# 2. De la lista plana, obtener solo los números pares al cuadrado
# 3. Crear un dict {numero: "par"/"impar"} para los números del 1 al 15
# 4. De 'facturas', calcular el total con IVA (21%) solo de las > 100€

listas = [[3, 1, 4], [1, 5, 9], [2, 6, 5], [3, 5, 8]]

facturas = [
    {"concepto": "Diseño web", "base": 850},
    {"concepto": "Logo",       "base":  90},
    {"concepto": "Hosting",    "base":  45},
    {"concepto": "App móvil",  "base": 2400},
    {"concepto": "SEO",        "base": 120},
]
`,
          hint: 'Aplanar: [n for sublista in listas for n in sublista]. Dict par/impar: {n: "par" if n%2==0 else "impar" for n in range(1,16)}. Total IVA: sum(f["base"]*1.21 for f in facturas if f["base"]>100).',
          solution: {
            code: `listas = [[3, 1, 4], [1, 5, 9], [2, 6, 5], [3, 5, 8]]

facturas = [
    {"concepto": "Diseño web", "base": 850},
    {"concepto": "Logo",       "base":  90},
    {"concepto": "Hosting",    "base":  45},
    {"concepto": "App móvil",  "base": 2400},
    {"concepto": "SEO",        "base": 120},
]

# 1. Aplanar
plana = [n for sublista in listas for n in sublista]
print("Plana:", plana)

# 2. Pares al cuadrado
pares_cuadrado = [n**2 for n in plana if n % 2 == 0]
print("Pares²:", pares_cuadrado)

# 3. Dict par/impar
paridad = {n: "par" if n % 2 == 0 else "impar" for n in range(1, 16)}
print("Paridad:", paridad)

# 4. Total con IVA de facturas > 100€
total_iva = sum(f["base"] * 1.21 for f in facturas if f["base"] > 100)
facturas_aplicadas = [f["concepto"] for f in facturas if f["base"] > 100]
print(f"\\nFacturas con IVA: {facturas_aplicadas}")
print(f"Total con IVA: {total_iva:.2f} €")`,
            explanation: 'La comprensión anidada [n for sublista in listas for n in sublista] se lee igual que el bucle: "por cada sublista en listas, por cada n en sublista". El orden de los for en la comprensión es el mismo que en los bucles anidados equivalentes.',
          },
        }}
      >
        <p>Aplanar estructuras y transformar datos con comprensiones.</p>
      </Exercise>

      <Exercise
        number="7.3"
        title="Generador de primos"
        difficulty="media"
        runner={{
          initial: `# Crea un generador "primos()" que genere números primos infinitamente.
# Luego:
#   1. Imprime los primeros 20 primos
#   2. El primer primo mayor que 100
#   3. La suma de los primos menores de 50
#   4. Los primos entre 50 y 100
#
# Un número n es primo si no es divisible por ningún entero entre 2 y sqrt(n).

from itertools import islice
import math

def es_primo(n):
    pass  # implementa esta función auxiliar

def primos():
    pass  # generador infinito de primos
`,
          hint: 'es_primo: n<2 no es primo. Para 2<=n, comprueba si algún i en range(2, int(math.sqrt(n))+1) divide n. El generador: n=2; while True: if es_primo(n): yield n; n+=1.',
          solution: {
            code: `from itertools import islice, takewhile, dropwhile
import math

def es_primo(n):
    if n < 2:
        return False
    if n == 2:
        return True
    if n % 2 == 0:
        return False
    for i in range(3, int(math.sqrt(n)) + 1, 2):
        if n % i == 0:
            return False
    return True

def primos():
    n = 2
    while True:
        if es_primo(n):
            yield n
        n += 1

# 1. Primeros 20 primos
primeros_20 = list(islice(primos(), 20))
print("Primeros 20 primos:")
print(primeros_20)

# 2. Primer primo mayor que 100
gen = primos()
mayor_100 = next(p for p in gen if p > 100)
print(f"\\nPrimer primo > 100: {mayor_100}")

# 3. Suma de primos < 50
suma = sum(p for p in primos() if p < 50)
print(f"Suma de primos < 50: {suma}")

# 4. Primos entre 50 y 100
entre_50_100 = [p for p in primos() if 50 <= p <= 100]
print(f"Primos entre 50 y 100: {entre_50_100}")`,
            explanation: 'El generador infinito de primos funciona porque yield pausa la ejecución. islice(primos(), 20) pide exactamente 20 valores y para. next(p for p in gen if p > 100) es un generador expression dentro de next() — produce el primer valor que cumple la condición. Esto es mucho más eficiente que generar todos los primos hasta ese punto en una lista.',
          },
        }}
      >
        <p>Un generador infinito de números primos combinado con islice y expresiones generadoras.</p>
      </Exercise>

      <Exercise
        number="7.4"
        title="Pipeline de transformación"
        difficulty="media"
        runner={{
          initial: `# Crea un sistema de pipeline encadenable.
# Cada paso transforma los datos del anterior, usando generadores.
#
# Implementa estas funciones generadoras:
#   leer_datos(lista)           → yield cada elemento
#   filtrar(gen, condicion)     → yield solo los que cumplen condicion
#   transformar(gen, func)      → yield func(elemento)
#   tomar(gen, n)               → yield los primeros n elementos
#
# Úsalas para:
# 1. De una lista de strings con números y palabras,
#    tomar los que son numéricos, convertirlos a int,
#    filtrar los > 10, y tomar los 5 primeros.

datos_crudos = [
    "42", "hola", "7", "150", "mundo", "3", "88",
    "Python", "200", "5", "1000", "cero", "15", "99"
]
`,
          hint: 'Cada función generadora recibe un iterable (gen) y hace "for item in gen: if/yield". Para filtrar: for item in gen: if condicion(item): yield item. Para transformar: for item in gen: yield func(item). Encadena: tomar(filtrar(transformar(filtrar(leer_datos(datos), str.isnumeric), int), lambda x: x>10), 5).',
          solution: {
            code: `datos_crudos = [
    "42", "hola", "7", "150", "mundo", "3", "88",
    "Python", "200", "5", "1000", "cero", "15", "99"
]

def leer_datos(lista):
    for item in lista:
        yield item

def filtrar(gen, condicion):
    for item in gen:
        if condicion(item):
            yield item

def transformar(gen, func):
    for item in gen:
        yield func(item)

def tomar(gen, n):
    for i, item in enumerate(gen):
        if i >= n:
            break
        yield item

# Pipeline encadenado
pipeline = tomar(
    filtrar(
        transformar(
            filtrar(leer_datos(datos_crudos), str.isnumeric),
            int
        ),
        lambda x: x > 10
    ),
    5
)

resultado = list(pipeline)
print(f"Resultado del pipeline: {resultado}")

# Alternativa con comprensión generadora (equivalente)
alternativa = list(
    x for x in
    (int(s) for s in datos_crudos if s.isnumeric())
    if x > 10
)[:5]
print(f"Alternativa compacta:   {alternativa}")`,
            explanation: 'Este patrón de pipeline con generadores es muy potente: cada función generadora procesa un elemento a la vez, sin materializar listas intermedias. Es la base de cómo funcionan librerías como pandas o las pipelines de datos en producción. La clave: los generadores son lazy — solo producen el siguiente valor cuando se los pide.',
          },
        }}
      >
        <p>Un pipeline de procesamiento de datos con generadores encadenados.</p>
      </Exercise>

      <Exercise
        number="7.5"
        title="Combinatoria con itertools"
        difficulty="difícil"
        runner={{
          initial: `# Usa itertools para resolver estos problemas combinatorios:
#
# 1. Un menú tiene 4 entrantes, 5 principales y 3 postres.
#    ¿Cuántas combinaciones de menú completo existen?
#    Imprime los primeros 5.
#
# 2. Un equipo de 10 personas necesita elegir 3 para un proyecto.
#    ¿Cuántas formas hay de elegirlos?
#
# 3. ¿Cuántas palabras de 4 letras distintas se pueden formar
#    con las letras de "PYTHON" (sin repetir letra)?
#
# 4. Genera todas las contraseñas de 2 dígitos y 1 letra
#    (dígitos del 0-3, letras A-C) y muestra cuántas hay.

from itertools import product, combinations, permutations, islice
import string
`,
          hint: 'product(entrantes, principales, postres) da todas las combinaciones. len(list(combinations(equipo, 3))) para el equipo. permutations("PYTHON", 4) para palabras. Para contraseñas: product("0123", "0123", "ABC") y cuenta las únicas con 2 dígitos y 1 letra.',
          solution: {
            code: `from itertools import product, combinations, permutations, islice

# 1. Menú completo
entrantes   = ["Ensalada", "Sopa", "Croquetas", "Gazpacho"]
principales = ["Paella", "Merluza", "Chuletón", "Pollo", "Pasta"]
postres     = ["Tarta", "Helado", "Flan"]

menus = list(product(entrantes, principales, postres))
print(f"1. Combinaciones de menú: {len(menus)}")
print("   Primeras 5:")
for m in menus[:5]:
    print(f"   {m[0]} + {m[1]} + {m[2]}")

# 2. Elección de equipo
equipo  = list(range(1, 11))   # personas 1-10
grupos  = list(combinations(equipo, 3))
print(f"\\n2. Formas de elegir 3 de 10: {len(grupos)}")

# 3. Palabras de 4 letras de "PYTHON"
palabras = list(permutations("PYTHON", 4))
print(f"\\n3. Palabras de 4 letras con PYTHON: {len(palabras)}")
print("   Primeras 5:", ["".join(p) for p in palabras[:5]])

# 4. Contraseñas: 2 dígitos + 1 letra
digitos = "0123"
letras  = "ABC"
# Generamos todas las posiciones posibles de la letra (pos 0, 1, 2)
contrasenas = set()
for pos_letra in range(3):
    for combo in product(digitos, digitos, letras):
        partes = list(combo)
        # Reordenamos para poner la letra en la posición correcta
        if pos_letra == 0:
            pw = combo[2] + combo[0] + combo[1]
        elif pos_letra == 1:
            pw = combo[0] + combo[2] + combo[1]
        else:
            pw = combo[0] + combo[1] + combo[2]
        contrasenas.add(pw)
print(f"\\n4. Contraseñas (2 dígitos + 1 letra): {len(contrasenas)}")
print("   Ejemplos:", sorted(contrasenas)[:6])`,
            explanation: 'itertools.product es el producto cartesiano — equivalente a bucles for anidados. combinations(iter, r) elige r elementos sin importar el orden (combinaciones). permutations(iter, r) importa el orden (permutaciones). La fórmula matemática: C(10,3) = 10!/(3!·7!) = 120. P(6,4) = 6!/(6-4)! = 360. Comprobar con len() es más fiable que calcular a mano.',
          },
        }}
      >
        <p>Resuelve cuatro problemas de combinatoria usando itertools.</p>
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
          <li><strong>List comprehension</strong>: <code>[expr for x in iter]</code> · con filtro: <code>[expr for x in iter if cond]</code>.</li>
          <li>El <code>if/else</code> ternario va en la <em>expresión</em>: <code>[a if cond else b for x in iter]</code>.</li>
          <li><strong>Dict comprehension</strong>: <code>{'{'}k: v for k, v in iter{'}'}</code>. <strong>Set comprehension</strong>: <code>{'{'}expr for x in iter{'}'}</code>.</li>
          <li>Comprensiones anidadas: <code>[n for sub in listas for n in sub]</code> aplana listas de listas.</li>
          <li><strong>Expresión generadora</strong>: igual que list comprehension pero con <code>()</code> — produce valores uno a uno, sin crear la lista.</li>
          <li><strong>Función generadora</strong>: usa <code>yield</code> en lugar de <code>return</code> — pausa y reanuda su ejecución.</li>
          <li><code>next(gen)</code> extrae el siguiente valor. Los generadores son iterables: puedes usarlos en <code>for</code>, <code>sum</code>, <code>list</code>, etc.</li>
          <li>Built-ins clave: <code>enumerate</code>, <code>zip</code>, <code>sorted</code>, <code>map</code>, <code>filter</code>, <code>any</code>, <code>all</code>.</li>
          <li><code>itertools</code>: <code>chain</code>, <code>islice</code>, <code>combinations</code>, <code>permutations</code>, <code>product</code>, <code>cycle</code>, <code>count</code>.</li>
          <li>Regla de oro: si la comprensión no cabe en una línea clara, usa un bucle.</li>
        </ul>
      </div>

      <PullQuote>
        Las comprensiones son Python pensando en voz alta.
        Un buen generador puede procesar un millón de registros
        con la misma memoria que uno solo.
      </PullQuote>

      <ChapterNav
        prev={{ id: 'l2-m6', title: 'Módulos y paquetes' }}
        next={{ id: 'l2-m8', title: 'Proyecto final intermedio' }}
        onNav={onNav}
      />
    </article>
  );
}

window.ChapterL2M7 = ChapterL2M7;
