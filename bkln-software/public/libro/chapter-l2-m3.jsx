// =============================================================
// chapter-l2-m3.jsx — Libro 2, Módulo 3: Programación orientada a objetos
// =============================================================

function ChapterL2M3({ onNav }) {
  return (
    <article className="reader-inner">
      <ChapterHeader
        book="// libro 2 · programando con estructura"
        module="módulo 03"
        time="≈ 65 min"
        title={<>Programación <em>orientada a objetos</em></>}
        dek="Hasta ahora has organizado tu código con funciones. La POO te da una herramienta más poderosa: agrupar datos y comportamiento en un solo tipo nuevo que tú defines."
      />

      <p>
        Imagina que estás modelando una cuenta bancaria. Necesitas guardar el titular, el saldo,
        el número de cuenta. Y también necesitas operaciones: depositar, retirar, consultar.
        Con lo que sabes hasta ahora harías un diccionario para los datos y funciones separadas
        para las operaciones. Funciona, pero nada impide que alguien modifique el saldo
        directamente, o que llames a la función de retirar con el diccionario equivocado.
      </p>

      <p>
        La <strong>programación orientada a objetos</strong> (POO) resuelve esto empaquetando
        datos y operaciones juntos en una <strong>clase</strong>: un nuevo tipo de dato que tú
        defines, con sus propias reglas.
      </p>

      <h2>Clases y objetos: el concepto</h2>

      <p>
        Una <strong>clase</strong> es el molde. Un <strong>objeto</strong> (o instancia) es
        algo concreto creado a partir de ese molde. La clase <code>Perro</code> describe qué
        es un perro — tiene nombre, raza, edad, puede ladrar. Cada perro concreto (<em>Rex</em>,
        <em>Luna</em>) es un objeto distinto creado a partir de ese mismo molde.
      </p>

      <div style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr',
        gap: 'var(--s-4)',
        margin: 'var(--s-5) 0',
      }} className="oo-grid">
        <OOCard
          label="Clase"
          icon="// molde"
          color="var(--accent)"
          items={['Define la estructura', 'Define el comportamiento', 'Existe una sola vez', 'Ejemplo: Perro, CuentaBancaria']}
        />
        <OOCard
          label="Objeto / Instancia"
          icon="// copia concreta"
          color="var(--highlight)"
          items={['Tiene valores propios', 'Tiene los métodos de su clase', 'Puede haber miles', 'Ejemplo: mi_perro, cuenta_de_ana']}
        />
        <style>{`@media (max-width: 720px) { .oo-grid { grid-template-columns: 1fr !important; } }`}</style>
      </div>

      <h2>Tu primera clase</h2>

      <p>Definir una clase en Python:</p>

      <CodeBlock code={`class Perro:
    def __init__(self, nombre, raza):
        self.nombre = nombre
        self.raza   = raza

    def ladrar(self):
        return f"{self.nombre} dice: ¡Guau!"

# Crear dos objetos (instancias) de la clase Perro
rex  = Perro("Rex", "Pastor alemán")
luna = Perro("Luna", "Golden retriever")

print(rex.nombre)        # Rex
print(luna.raza)         # Golden retriever
print(rex.ladrar())      # Rex dice: ¡Guau!
print(luna.ladrar())     # Luna dice: ¡Guau!`} />

      <ReplOutput>{`Rex
Golden retriever
Rex dice: ¡Guau!
Luna dice: ¡Guau!`}</ReplOutput>

      <p>Hay tres cosas nuevas que entender bien:</p>

      <ol>
        <li>
          <strong><code>class Perro:</code></strong> — define la clase. Por convención, los
          nombres de clase usan <em>CamelCase</em>: primera letra de cada palabra en mayúscula.
        </li>
        <li>
          <strong><code>__init__</code></strong> — es el <em>constructor</em>: el método que
          Python llama automáticamente cuando creas una nueva instancia con <code>Perro(...)</code>.
          Aquí es donde inicializas los datos del objeto.
        </li>
        <li>
          <strong><code>self</code></strong> — es una referencia al propio objeto. Siempre es
          el primer parámetro de cualquier método, pero no lo pasas tú — Python lo pasa solo.
          <code>self.nombre</code> accede al atributo <code>nombre</code> de <em>ese</em> objeto concreto.
        </li>
      </ol>

      <Callout kind="warn" title="¡Cuidado! self no es opcional">
        Si te olvidas de <code>self</code> como primer parámetro de un método, Python dará un
        error raro cuando lo llames. Y si te olvidas de escribir <code>self.nombre</code> y
        escribes solo <code>nombre</code>, estarás creando una variable local que desaparece
        al terminar <code>__init__</code> — el objeto quedará sin ese atributo.
      </Callout>

      <h2>Atributos</h2>

      <p>
        Los <strong>atributos</strong> son las variables de un objeto. Se crean asignando
        con <code>self.algo = valor</code> dentro de los métodos (normalmente en <code>__init__</code>)
        y se accede a ellos con <code>objeto.algo</code>:
      </p>

      <CodeBlock code={`class CuentaBancaria:
    def __init__(self, titular, saldo_inicial=0):
        self.titular = titular
        self.saldo   = saldo_inicial
        self.movimientos = []       # atributo que empieza vacío

    def depositar(self, cantidad):
        self.saldo += cantidad
        self.movimientos.append(f"+{cantidad}")

    def retirar(self, cantidad):
        if cantidad > self.saldo:
            print("Saldo insuficiente.")
            return
        self.saldo -= cantidad
        self.movimientos.append(f"-{cantidad}")

    def ver_saldo(self):
        return f"{self.titular}: {self.saldo:.2f} €"

cuenta = CuentaBancaria("Ana", 1000)
cuenta.depositar(500)
cuenta.retirar(200)
cuenta.retirar(2000)   # saldo insuficiente

print(cuenta.ver_saldo())
print(cuenta.movimientos)`} />

      <ReplOutput>{`Saldo insuficiente.
Ana: 1300.00 €
['+500', '-200']`}</ReplOutput>

      <h3>Atributos de clase vs atributos de instancia</h3>

      <p>
        Los atributos que defines dentro de <code>__init__</code> con <code>self</code> son
        <strong> de instancia</strong>: cada objeto tiene los suyos. También puedes definir
        atributos <strong>de clase</strong> directamente en el cuerpo de la clase — son
        compartidos por todas las instancias:
      </p>

      <CodeBlock code={`class Producto:
    iva = 0.21           # atributo de CLASE — igual para todos los productos

    def __init__(self, nombre, precio_base):
        self.nombre      = nombre        # atributo de INSTANCIA
        self.precio_base = precio_base

    def precio_final(self):
        return self.precio_base * (1 + Producto.iva)

p1 = Producto("Teclado", 50)
p2 = Producto("Ratón", 30)

print(p1.precio_final())    # 60.5
print(p2.precio_final())    # 36.3

# Si cambia el IVA, afecta a todos los productos
Producto.iva = 0.10
print(p1.precio_final())    # 55.0`} />

      <ReplOutput>{`60.5
36.3
55.0`}</ReplOutput>

      <Quiz
        question='En una clase Circulo con self.radio = radio en __init__, ¿cómo accedes al radio del objeto "c"?'
        options={['Circulo.radio', 'c.radio', 'self.radio', 'radio']}
        correct={1}
        explanation='self.radio es la forma correcta dentro de los métodos de la clase. Pero desde fuera del objeto (como en el código principal), accedes con el nombre del objeto: c.radio. Circulo.radio solo funcionaría si fuera un atributo de clase, no de instancia.'
      />

      <h2>Métodos</h2>

      <p>
        Los <strong>métodos</strong> son las funciones de un objeto. Se definen igual que funciones
        normales pero dentro de la clase, con <code>self</code> como primer parámetro. Ya los has
        visto — <code>ladrar</code>, <code>depositar</code> — pero hay unos especiales que vale
        la pena conocer bien.
      </p>

      <h3>Métodos especiales (<em>dunder methods</em>)</h3>

      <p>
        Python tiene métodos con nombre entre dobles guiones bajos (<code>__nombre__</code>)
        que se llaman automáticamente en ciertas situaciones. Se llaman <em>dunder methods</em>
        (de <em>double underscore</em>). Los más útiles:
      </p>

      <CodeBlock code={`class Punto:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __str__(self):
        """Lo que ve el usuario con print()."""
        return f"Punto({self.x}, {self.y})"

    def __repr__(self):
        """Representación técnica — para depurar."""
        return f"Punto(x={self.x!r}, y={self.y!r})"

    def __eq__(self, otro):
        """Cuándo dos puntos son iguales (==)."""
        return self.x == otro.x and self.y == otro.y

    def __add__(self, otro):
        """Qué hace el operador + con dos puntos."""
        return Punto(self.x + otro.x, self.y + otro.y)

p1 = Punto(1, 2)
p2 = Punto(3, 4)
p3 = Punto(1, 2)

print(p1)              # Punto(1, 2)       ← usa __str__
print(repr(p1))        # Punto(x=1, y=2)   ← usa __repr__
print(p1 == p3)        # True              ← usa __eq__
print(p1 == p2)        # False
print(p1 + p2)         # Punto(4, 6)       ← usa __add__`} />

      <ReplOutput>{`Punto(1, 2)
Punto(x=1, y=2)
True
False
Punto(4, 6)`}</ReplOutput>

      <Callout kind="tip" title="__str__ es lo mínimo que debes implementar">
        Sin <code>__str__</code>, <code>print(mi_objeto)</code> muestra algo como
        <code>&lt;__main__.Punto object at 0x7f3a...&gt;</code> — inútil para depurar.
        Implementa siempre <code>__str__</code> en tus clases. Con dos líneas conviertes
        tu objeto en algo legible.
      </Callout>

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
              <th style={poThStyle}>Método</th>
              <th style={poThStyle}>Se activa cuando…</th>
              <th style={poThStyle}>Ejemplo</th>
            </tr>
          </thead>
          <tbody>
            <PoRow m="__init__" w="Se crea un objeto" e="Perro(...)" />
            <PoRow m="__str__" w="print(obj) o str(obj)" e='print(p1)' />
            <PoRow m="__repr__" w="repr(obj) o en consola" e='repr(p1)' />
            <PoRow m="__len__" w="len(obj)" e='len(mi_objeto)' />
            <PoRow m="__eq__" w="obj1 == obj2" e='p1 == p2' />
            <PoRow m="__lt__" w="obj1 &lt; obj2" e='p1 &lt; p2' />
            <PoRow m="__add__" w="obj1 + obj2" e='p1 + p2' />
            <PoRow m="__contains__" w='"x" in obj' e='"a" in mi_col' last />
          </tbody>
        </table>
      </div>

      <h2>Herencia</h2>

      <p>
        La <strong>herencia</strong> permite crear una clase nueva basándose en una existente.
        La clase nueva (<em>hija</em> o <em>subclase</em>) hereda todos los atributos y métodos
        de la clase original (<em>padre</em> o <em>superclase</em>) y puede añadir los suyos
        o cambiar los que necesite.
      </p>

      <CodeBlock code={`class Animal:
    def __init__(self, nombre, sonido):
        self.nombre = nombre
        self.sonido = sonido

    def hablar(self):
        return f"{self.nombre} hace {self.sonido}"

    def __str__(self):
        return f"Animal({self.nombre})"


class Perro(Animal):
    def __init__(self, nombre):
        super().__init__(nombre, "guau")   # llama al __init__ del padre
        self.trucos = []

    def aprender(self, truco):
        self.trucos.append(truco)

    def __str__(self):
        return f"Perro({self.nombre})"


class Gato(Animal):
    def __init__(self, nombre, es_indoor=True):
        super().__init__(nombre, "miau")
        self.es_indoor = es_indoor

    def ronronear(self):
        return f"{self.nombre} ronronea..."


rex  = Perro("Rex")
misi = Gato("Misi")

print(rex.hablar())         # heredado de Animal
print(misi.hablar())        # heredado de Animal
rex.aprender("sentarse")
print(rex.trucos)
print(misi.ronronear())
print(isinstance(rex, Perro))    # True
print(isinstance(rex, Animal))   # True — también es un Animal`} />

      <ReplOutput>{`Rex hace guau
Misi hace miau
['sentarse']
Misi ronronea...
True
True`}</ReplOutput>

      <p>
        <code>super()</code> es la forma de referirse a la clase padre desde la hija.
        <code>super().__init__(...)</code> llama al constructor del padre sin tener que
        repetir su código.
      </p>

      <Callout kind="info" title="isinstance() es mejor que type()">
        <code>isinstance(obj, Clase)</code> devuelve <code>True</code> si el objeto es
        de esa clase <em>o de cualquier subclase suya</em>. <code>type(obj) == Clase</code>
        solo es <code>True</code> si es exactamente esa clase. En código real casi siempre
        quieres <code>isinstance</code>.
      </Callout>

      <h3>Sobreescribir métodos (<em>override</em>)</h3>

      <p>
        Si la subclase define un método con el mismo nombre que el padre, el suyo tiene
        prioridad. Eso se llama <strong>sobreescribir</strong> el método:
      </p>

      <CodeBlock code={`class Forma:
    def area(self):
        return 0

    def describir(self):
        return f"Soy una forma con área {self.area():.2f}"


class Circulo(Forma):
    def __init__(self, radio):
        self.radio = radio

    def area(self):                    # sobreescribe el de Forma
        return 3.14159 * self.radio ** 2


class Rectangulo(Forma):
    def __init__(self, ancho, alto):
        self.ancho = ancho
        self.alto  = alto

    def area(self):                    # sobreescribe el de Forma
        return self.ancho * self.alto


c = Circulo(5)
r = Rectangulo(4, 6)

print(c.describir())    # usa area() de Circulo
print(r.describir())    # usa area() de Rectangulo`} />

      <ReplOutput>{`Soy una forma con área 78.54
Soy una forma con área 24.00`}</ReplOutput>

      <p>
        Fíjate en el detalle: <code>describir()</code> está definido solo en <code>Forma</code>,
        pero cuando lo llamas desde un <code>Circulo</code>, el <code>self.area()</code> llama
        al <code>area()</code> del <code>Circulo</code>, no al de <code>Forma</code>. Esto
        se llama <strong>polimorfismo</strong>: el mismo código funciona distinto según
        el tipo real del objeto.
      </p>

      <h2>Encapsulamiento: convenciones de privacidad</h2>

      <p>
        Python no tiene atributos "privados" de verdad, pero tiene una convención que todo
        el mundo respeta: <strong>un guión bajo delante</strong> significa "esto es interno,
        no lo toques desde fuera":
      </p>

      <CodeBlock code={`class Temperatura:
    def __init__(self, celsius):
        self._celsius = celsius        # convención: "privado"

    @property
    def celsius(self):
        return self._celsius

    @celsius.setter
    def celsius(self, valor):
        if valor < -273.15:
            raise ValueError("Temperatura por debajo del cero absoluto.")
        self._celsius = valor

    @property
    def fahrenheit(self):
        return self._celsius * 9/5 + 32


t = Temperatura(100)
print(t.celsius)       # 100    ← acceso como atributo
print(t.fahrenheit)    # 212.0

t.celsius = 25         # ← usa el setter, que valida
print(t.celsius)       # 25

t.celsius = -300       # ValueError`} />

      <ReplOutput>{`100
212.0
25
ValueError: Temperatura por debajo del cero absoluto.`}</ReplOutput>

      <Callout kind="info" title="@property: atributos inteligentes">
        El decorador <code>@property</code> (que veremos más a fondo en el Libro 3) convierte
        un método en un atributo de solo lectura. Con <code>@nombre.setter</code> añades
        validación al asignar. Así el usuario escribe <code>t.celsius = 25</code> (sencillo)
        y por detrás se ejecuta código de validación (seguro).
      </Callout>

      <h2>Un ejemplo completo: Biblioteca</h2>

      <p>
        Vamos a construir algo real: un sistema mínimo de biblioteca con libros y préstamos.
      </p>

      <PyRunner
        initial={`class Libro:
    def __init__(self, titulo, autor, isbn):
        self.titulo    = titulo
        self.autor     = autor
        self.isbn      = isbn
        self.prestado  = False

    def __str__(self):
        estado = "prestado" if self.prestado else "disponible"
        return f'"{self.titulo}" — {self.autor} [{estado}]'


class Biblioteca:
    def __init__(self, nombre):
        self.nombre  = nombre
        self._libros = {}             # isbn → Libro

    def añadir(self, libro):
        self._libros[libro.isbn] = libro
        print(f"Añadido: {libro}")

    def prestar(self, isbn):
        libro = self._libros.get(isbn)
        if not libro:
            print("ISBN no encontrado.")
            return
        if libro.prestado:
            print(f'"{libro.titulo}" ya está prestado.')
            return
        libro.prestado = True
        print(f'Prestado: "{libro.titulo}"')

    def devolver(self, isbn):
        libro = self._libros.get(isbn)
        if libro:
            libro.prestado = False
            print(f'Devuelto: "{libro.titulo}"')

    def catalogo(self):
        print(f"\\n=== {self.nombre} ({len(self._libros)} libros) ===")
        for libro in self._libros.values():
            print(" ", libro)


# Uso
bib = Biblioteca("Biblioteca Municipal")

bib.añadir(Libro("El Quijote",         "Cervantes",  "001"))
bib.añadir(Libro("Cien años de soledad","García Márquez","002"))
bib.añadir(Libro("1984",               "Orwell",     "003"))

bib.prestar("001")
bib.prestar("001")    # ya prestado
bib.catalogo()

bib.devolver("001")
bib.catalogo()`}
      />

      <h2>Ejercicios</h2>

      <p style={{ color: 'var(--ink-2)' }}>
        Cinco ejercicios de complejidad creciente. El primero es una clase simple;
        el último incluye herencia y métodos especiales.
      </p>

      <Exercise
        number="3.1"
        title="Clase Rectángulo"
        difficulty="fácil"
        runner={{
          initial: `# Define una clase "Rectangulo" con:
#   - __init__(ancho, alto)
#   - area()    → devuelve ancho * alto
#   - perimetro() → devuelve 2 * (ancho + alto)
#   - __str__   → "Rectángulo(ancho=X, alto=Y)"
#   - es_cuadrado() → True si ancho == alto
#
# Crea dos rectángulos y prueba todos los métodos.

`,
          hint: 'class Rectangulo: — recuerda el self en cada método. area usa self.ancho * self.alto. __str__ devuelve una f-string con los atributos.',
          solution: {
            code: `class Rectangulo:
    def __init__(self, ancho, alto):
        self.ancho = ancho
        self.alto  = alto

    def area(self):
        return self.ancho * self.alto

    def perimetro(self):
        return 2 * (self.ancho + self.alto)

    def es_cuadrado(self):
        return self.ancho == self.alto

    def __str__(self):
        return f"Rectángulo(ancho={self.ancho}, alto={self.alto})"

r1 = Rectangulo(4, 6)
r2 = Rectangulo(5, 5)

print(r1)
print(f"Área: {r1.area()}, Perímetro: {r1.perimetro()}")
print(f"¿Cuadrado? {r1.es_cuadrado()}")
print()
print(r2)
print(f"¿Cuadrado? {r2.es_cuadrado()}")`,
            explanation: 'La estructura clásica de una clase: __init__ para guardar atributos, métodos para el comportamiento, __str__ para la representación. Cada método recibe self y trabaja con self.ancho, self.alto.',
          },
        }}
      >
        <p>Tu primera clase completa con atributos, métodos y __str__.</p>
      </Exercise>

      <Exercise
        number="3.2"
        title="Pila (Stack)"
        difficulty="fácil"
        runner={{
          initial: `# Implementa una clase "Pila" que modele
# una estructura LIFO (último en entrar, primero en salir).
#
# Métodos:
#   apilar(valor)   → añade un elemento arriba
#   desapilar()     → elimina y devuelve el elemento de arriba
#                     (None si está vacía)
#   ver_tope()      → devuelve el elemento de arriba sin eliminarlo
#   esta_vacia()    → True si no hay elementos
#   __len__         → número de elementos
#   __str__         → representación de la pila
#
# Pruébala con varios elementos.

`,
          hint: 'Usa una lista interna self._elementos. apilar → append. desapilar → pop() con guard si está vacía. ver_tope → self._elementos[-1]. __len__ → return len(self._elementos).',
          solution: {
            code: `class Pila:
    def __init__(self):
        self._elementos = []

    def apilar(self, valor):
        self._elementos.append(valor)

    def desapilar(self):
        if self.esta_vacia():
            return None
        return self._elementos.pop()

    def ver_tope(self):
        if self.esta_vacia():
            return None
        return self._elementos[-1]

    def esta_vacia(self):
        return len(self._elementos) == 0

    def __len__(self):
        return len(self._elementos)

    def __str__(self):
        return f"Pila{self._elementos}"

p = Pila()
p.apilar(1)
p.apilar(2)
p.apilar(3)
print(p)
print(f"Tope: {p.ver_tope()}")
print(f"Desapilado: {p.desapilar()}")
print(p)
print(f"Tamaño: {len(p)}")`,
            explanation: 'La Pila es una clase clásica para aprender POO. El atributo _elementos es "privado" (convención del guión bajo). Los métodos son una interfaz limpia que esconde la implementación — el usuario de la clase no sabe ni le importa que por dentro es una lista.',
          },
        }}
      >
        <p>Una estructura de datos clásica implementada como clase.</p>
      </Exercise>

      <Exercise
        number="3.3"
        title="Jerarquía de empleados"
        difficulty="media"
        runner={{
          initial: `# Define una jerarquía de clases:
#
#   Empleado (base)
#     - __init__(nombre, sueldo_base)
#     - salario_mensual() → devuelve sueldo_base
#     - __str__
#
#   Gerente(Empleado)
#     - __init__(nombre, sueldo_base, bonus)
#     - salario_mensual() → sueldo_base + bonus
#
#   Vendedor(Empleado)
#     - __init__(nombre, sueldo_base, comision, ventas)
#     - salario_mensual() → sueldo_base + comision * ventas
#
# Crea una lista con empleados de distintos tipos y
# calcula la nómina total usando polimorfismo.

`,
          hint: 'Gerente y Vendedor extienden Empleado. En el __init__ de cada subclase llama a super().__init__(nombre, sueldo_base) y guarda los atributos extra. Para la nómina: suma e.salario_mensual() para e in empleados.',
          solution: {
            code: `class Empleado:
    def __init__(self, nombre, sueldo_base):
        self.nombre      = nombre
        self.sueldo_base = sueldo_base

    def salario_mensual(self):
        return self.sueldo_base

    def __str__(self):
        return f"{self.__class__.__name__}({self.nombre}, {self.salario_mensual():.2f} €)"


class Gerente(Empleado):
    def __init__(self, nombre, sueldo_base, bonus):
        super().__init__(nombre, sueldo_base)
        self.bonus = bonus

    def salario_mensual(self):
        return self.sueldo_base + self.bonus


class Vendedor(Empleado):
    def __init__(self, nombre, sueldo_base, comision, ventas):
        super().__init__(nombre, sueldo_base)
        self.comision = comision
        self.ventas   = ventas

    def salario_mensual(self):
        return self.sueldo_base + self.comision * self.ventas


plantilla = [
    Empleado("Carlos",  1800),
    Gerente("Ana",      2500, 800),
    Vendedor("Luis",    1500, 0.05, 12000),
    Vendedor("Sofía",   1500, 0.05, 8000),
]

for e in plantilla:
    print(e)

nomina = sum(e.salario_mensual() for e in plantilla)
print(f"\\nNómina total: {nomina:.2f} €")`,
            explanation: 'Este es el polimorfismo en acción: la misma llamada e.salario_mensual() produce resultados distintos según el tipo real del objeto. El código de la nómina no sabe ni le importa si es Empleado, Gerente o Vendedor — solo llama al método y Python hace lo correcto.',
          },
        }}
      >
        <p>Herencia y polimorfismo en un ejemplo de negocio real.</p>
      </Exercise>

      <Exercise
        number="3.4"
        title="Vector 2D con operadores"
        difficulty="media"
        runner={{
          initial: `# Crea una clase "Vector2D" con:
#   - __init__(x, y)
#   - __str__    → "Vector(x, y)"
#   - __add__    → suma de dos vectores
#   - __sub__    → resta de dos vectores
#   - __mul__    → multiplicación por un escalar (número)
#   - __eq__     → igualdad
#   - magnitud() → sqrt(x² + y²)  (usa import math)
#   - normalizar() → vector dividido por su magnitud
#
# Prueba: print(v1 + v2), print(v1 * 3), etc.

import math
`,
          hint: '__add__(self, otro) devuelve Vector2D(self.x + otro.x, self.y + otro.y). __mul__(self, escalar) devuelve Vector2D(self.x * escalar, self.y * escalar). magnitud usa math.sqrt.',
          solution: {
            code: `import math

class Vector2D:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __str__(self):
        return f"Vector({self.x}, {self.y})"

    def __repr__(self):
        return self.__str__()

    def __add__(self, otro):
        return Vector2D(self.x + otro.x, self.y + otro.y)

    def __sub__(self, otro):
        return Vector2D(self.x - otro.x, self.y - otro.y)

    def __mul__(self, escalar):
        return Vector2D(self.x * escalar, self.y * escalar)

    def __eq__(self, otro):
        return self.x == otro.x and self.y == otro.y

    def magnitud(self):
        return math.sqrt(self.x**2 + self.y**2)

    def normalizar(self):
        m = self.magnitud()
        return Vector2D(self.x / m, self.y / m)

v1 = Vector2D(3, 4)
v2 = Vector2D(1, 2)

print(v1 + v2)
print(v1 - v2)
print(v1 * 3)
print(v1 == Vector2D(3, 4))
print(f"Magnitud de v1: {v1.magnitud()}")
print(f"Normalizado: {v1.normalizar()}")`,
            explanation: 'Los métodos dunder convierten tu clase en algo que se comporta como un tipo nativo de Python. Ahora puedes sumar vectores con + como si fueran números. Ese es el poder del protocolo de objetos de Python.',
          },
        }}
      >
        <p>Métodos especiales para hacer que tu clase funcione con los operadores de Python.</p>
      </Exercise>

      <Exercise
        number="3.5"
        title="Sistema de inventario"
        difficulty="difícil"
        runner={{
          initial: `# Construye un sistema de inventario con dos clases:
#
# Producto:
#   - __init__(nombre, precio, stock)
#   - aplicar_descuento(porcentaje)  → modifica el precio
#   - __str__
#
# Inventario:
#   - __init__()
#   - añadir(producto)
#   - buscar(nombre) → Producto o None
#   - productos_bajo_stock(minimo=5) → lista de productos con stock <= minimo
#   - valor_total() → suma de precio * stock de todos los productos
#   - __len__  → número de productos distintos
#   - __str__  → lista de todos los productos

`,
          hint: 'Inventario guarda los productos en un dict {nombre: producto}. buscar usa .get(). productos_bajo_stock hace [p for p in self._productos.values() if p.stock <= minimo]. valor_total suma precio * stock de cada uno.',
          solution: {
            code: `class Producto:
    def __init__(self, nombre, precio, stock):
        self.nombre = nombre
        self.precio = precio
        self.stock  = stock

    def aplicar_descuento(self, porcentaje):
        self.precio *= (1 - porcentaje / 100)

    def __str__(self):
        return f"{self.nombre}: {self.precio:.2f} € (stock: {self.stock})"


class Inventario:
    def __init__(self):
        self._productos = {}

    def añadir(self, producto):
        self._productos[producto.nombre] = producto

    def buscar(self, nombre):
        return self._productos.get(nombre)

    def productos_bajo_stock(self, minimo=5):
        return [p for p in self._productos.values() if p.stock <= minimo]

    def valor_total(self):
        return sum(p.precio * p.stock for p in self._productos.values())

    def __len__(self):
        return len(self._productos)

    def __str__(self):
        lineas = [str(p) for p in self._productos.values()]
        return "\\n".join(lineas)


inv = Inventario()
inv.añadir(Producto("Teclado",  49.99, 10))
inv.añadir(Producto("Ratón",    29.99,  3))
inv.añadir(Producto("Monitor", 299.99,  2))
inv.añadir(Producto("Cable",     5.99, 50))

print(f"Productos: {len(inv)}")
print(f"Valor total: {inv.valor_total():.2f} €")
print("\\nBajo stock:")
for p in inv.productos_bajo_stock():
    print(" ", p)

inv.buscar("Teclado").aplicar_descuento(10)
print("\\nDespués del descuento:")
print(inv)`,
            explanation: 'Este ejercicio junta todo: dos clases que colaboran, atributo privado _productos, comprensiones de lista dentro de métodos, dunder __len__ y __str__ en Inventario. Es el patrón que encontrarás en cualquier aplicación real con entidades y colecciones.',
          },
        }}
      >
        <p>Un sistema real con dos clases que colaboran. Cierra el módulo con todo integrado.</p>
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
          <li><strong>Clase</strong>: molde que define estructura y comportamiento. <strong>Objeto</strong>: copia concreta de ese molde.</li>
          <li><code>class Nombre:</code> define la clase. Convención: <em>CamelCase</em>.</li>
          <li><code>__init__(self, ...)</code> es el constructor — se llama al crear el objeto.</li>
          <li><code>self</code> es la referencia al objeto actual. Siempre es el primer parámetro de los métodos.</li>
          <li><strong>Atributos de instancia</strong>: <code>self.x = v</code>. Cada objeto tiene los suyos.</li>
          <li><strong>Atributos de clase</strong>: fuera de métodos, compartidos por todos los objetos.</li>
          <li><strong>Dunder methods</strong> (<code>__str__</code>, <code>__eq__</code>, <code>__add__</code>…) definen cómo se comporta el objeto con operadores y funciones de Python.</li>
          <li><strong>Herencia</strong>: <code>class Hija(Padre):</code>. Usa <code>super()</code> para llamar al padre.</li>
          <li><strong>Polimorfismo</strong>: el mismo método se comporta distinto según la subclase. No necesitas saber el tipo exacto.</li>
          <li>Convención <code>_privado</code>: guión bajo = "interno, no uses desde fuera".</li>
          <li><code>@property</code> convierte un método en un atributo con validación.</li>
          <li><code>isinstance(obj, Clase)</code> comprueba el tipo incluyendo herencia.</li>
        </ul>
      </div>

      <PullQuote>
        La POO no es una técnica — es una forma de pensar. Una vez que ves el mundo
        en términos de objetos con responsabilidades claras, escribir programas grandes
        se vuelve <em>manejable</em> en lugar de caótico.
      </PullQuote>

      <ChapterNav
        prev={{ id: 'l2-m2', title: 'Funciones avanzadas' }}
        next={{ id: 'l2-m4', title: 'Manejo de errores' }}
        onNav={onNav}
      />
    </article>
  );
}

const poThStyle = {
  padding: '10px 14px',
  fontFamily: 'var(--font-mono)',
  fontSize: '0.7rem',
  letterSpacing: '0.1em',
  textTransform: 'uppercase',
  color: 'var(--ink-3)',
  fontWeight: 500,
};

function PoRow({ m, w, e, last }) {
  const cell = {
    padding: '9px 14px',
    borderTop: last ? '0' : '1px solid var(--border-soft)',
    verticalAlign: 'top',
  };
  return (
    <tr>
      <td style={{ ...cell, fontFamily: 'var(--font-mono)', color: 'var(--accent)', fontWeight: 600, whiteSpace: 'nowrap' }}>{m}</td>
      <td style={cell}>{w}</td>
      <td style={{ ...cell, fontFamily: 'var(--font-mono)', color: 'var(--ink-2)', fontSize: '0.86rem' }}>{e}</td>
    </tr>
  );
}

function OOCard({ label, icon, color, items }) {
  return (
    <div style={{
      background: 'var(--paper-2)',
      border: '1px solid var(--border-soft)',
      borderRadius: 'var(--r-md)',
      padding: 'var(--s-4) var(--s-5)',
    }}>
      <div style={{
        fontFamily: 'var(--font-mono)',
        fontSize: '0.7rem',
        letterSpacing: '0.1em',
        color: 'var(--ink-3)',
        textTransform: 'uppercase',
        marginBottom: 4,
      }}>{icon}</div>
      <div style={{
        fontFamily: 'var(--font-display)',
        fontSize: '1.3rem',
        fontWeight: 500,
        color,
        marginBottom: 'var(--s-3)',
      }}>{label}</div>
      <ul style={{ margin: 0, paddingLeft: '1.2em', fontSize: '0.9rem', color: 'var(--ink-2)', lineHeight: 1.7 }}>
        {items.map((item, i) => <li key={i}>{item}</li>)}
      </ul>
    </div>
  );
}

window.ChapterL2M3 = ChapterL2M3;
