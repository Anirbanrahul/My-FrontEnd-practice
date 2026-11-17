// 67 JS Theory & Scenario Questions & Answers (from Saikrishna Nangunuri Ebook)

export const JS_THEORY_SAIKRISHNA_QUESTIONS = [
  {
    id: 'jst-1',
    section: 'js-theory-sai',
    number: 1,
    question: 'Is javascript a dynamically typed language or a statically typed language?',
    answer: `JavaScript is a **dynamically typed language**, meaning variable types are associated with runtime values rather than variable declarations, and type checks occur during execution.

### Dynamic Typing vs Static Typing:
- **Dynamic Typing (JavaScript, Python)**:
  - Variables hold references to values of any type and can be freely reassigned to different types at runtime.
  - Type checking occurs at execution time.
- **Static Typing (TypeScript, Java, Rust)**:
  - Variable types are explicitly declared or inferred at compile time.
  - Type checking catches mismatched assignments before any code runs.

\`\`\`javascript
// Dynamic typing in JavaScript
let value = "Senior Engineer"; // type is string
console.log(typeof value);     // "string"

value = 42;                    // Dynamically reassigned to number
console.log(typeof value);     // "number"

value = { role: "Architect" }; // Dynamically reassigned to object
console.log(typeof value);     // "object"
\`\`\`

👉 Interview Tip: While dynamic typing offers development speed, it introduces runtime \`TypeError\` risks. In modern frontend development, **TypeScript** is layered over JavaScript to provide compile-time static type safety without altering JavaScript runtime mechanics.`
  },
  {
    id: 'jst-2',
    section: 'js-theory-sai',
    number: 2,
    question: 'What are the different datatypes in javascript?',
    answer: `JavaScript types are strictly classified into **7 Primitive Types** and **Reference Types (Objects)**.

### 1. Primitive Types (Stored by value on Call Stack):
1. **\`string\`**: Immutable sequence of UTF-16 code units.
2. **\`number\`**: IEEE 754 64-bit float (values from $\\pm 5 \\times 10^{-324}$ to $\\pm 1.797 \\times 10^{308}$, includes \`NaN\`, \`+Infinity\`, \`-Infinity\`).
3. **\`boolean\`**: Logical \`true\` or \`false\`.
4. **\`null\`**: Intentional absence of any object reference.
5. **\`undefined\`**: Uninitialized variable default value.
6. **\`bigint\`**: Arbitrary precision integer for values beyond $2^{53}-1$ (\`9007199254740991n\`).
7. **\`symbol\`**: Unique, immutable identifier token.

### 2. Reference Types (Stored by reference on Heap Memory):
- **\`Object\`**: Keyed collections, including specialized instances:
  - \`Array\`, \`Function\`, \`Date\`, \`RegExp\`, \`Map\`, \`Set\`, \`WeakMap\`, \`WeakSet\`, \`Promise\`.

\`\`\`javascript
// Stack vs Heap Storage Demonstration
let primitiveA = 50;
let primitiveB = primitiveA; // Independent copy on the stack
primitiveB = 100;
console.log(primitiveA);     // 50 (Unaffected)

const refA = { score: 50 };
const refB = refA;           // Copies pointer address referencing same heap memory
refB.score = 100;
console.log(refA.score);     // 100 (Mutated via shared reference!)
\`\`\``
  },
  {
    id: 'jst-3',
    section: 'js-theory-sai',
    number: 3,
    question: 'What is Hoisting in javascript?',
    answer: `**Hoisting** is the JavaScript engine's compile-phase behavior where memory space is allocated for variable, function, and class declarations before any code is executed line-by-line.

### How Hoisting Works During Execution Context Creation:
1. **Creation Phase**:
   - The engine scans the current scope for declarations.
   - Function declarations are registered and their complete function body is retained in memory.
   - Variables declared with \`var\` are allocated memory and initialized to **\`undefined\`**.
   - Variables declared with \`let\` and \`const\` are allocated memory but left uninitialized in the **Temporal Dead Zone (TDZ)**.
2. **Execution Phase**:
   - The engine steps through code sequentially, evaluating assignments and invocations.

\`\`\`javascript
// Function Declaration is completely hoisted:
console.log(calculateBonus(1000)); // 200 (Works even before declaration!)

function calculateBonus(salary) {
  return salary * 0.2;
}

// 'var' variable is hoisted as undefined:
console.log(bonusRate); // undefined (NOT ReferenceError)
var bonusRate = 0.2;
console.log(bonusRate); // 0.2
\`\`\`

👉 Interview Tip: Always clarify that hoisting is an execution context memory allocation mechanism—the engine does not physically move or reorder lines in your source file.`
  },
  {
    id: 'jst-4',
    section: 'js-theory-sai',
    number: 4,
    question: 'What are the various things hoisted in javascript?',
    answer: `Different JavaScript declaration constructs exhibit distinct hoisting semantics during the Memory Creation phase:

| Construct | Hoisted? | Initialized To | Access Before Declaration |
| :--- | :--- | :--- | :--- |
| **Function Declarations** | ✅ Yes | Complete Function Object | ✅ **Fully usable** |
| **\`var\` Variables** | ✅ Yes | \`undefined\` | Returns \`undefined\` |
| **\`let\` & \`const\`** | ✅ Yes | **Uninitialized** (TDZ) | ❌ Throws \`ReferenceError\` |
| **Function Expressions (\`var fn = ...\`)** | ✅ Variable hoisted | \`undefined\` | ❌ Throws \`TypeError: fn is not a function\` |
| **Arrow Functions** | ✅ Follows variable keyword | \`undefined\` or TDZ | ❌ Throws \`TypeError\` or \`ReferenceError\` |
| **ES6 Classes** | ✅ Yes | **Uninitialized** (TDZ) | ❌ Throws \`ReferenceError\` |
| **Imports (\`import\`)** | ✅ Yes | Live Module Binding | ✅ Hoisted to top of module |

\`\`\`javascript
// Example: Function Declaration vs Function Expression Hoisting
testDecl(); // "Declaration Works!"
// testExpr(); // Uncaught TypeError: testExpr is not a function

function testDecl() {
  console.log("Declaration Works!");
}

var testExpr = function() {
  console.log("Expression Executed");
};
\`\`\``
  },
  {
    id: 'jst-5',
    section: 'js-theory-sai',
    number: 5,
    question: 'What is temporal dead zone?',
    answer: `The **Temporal Dead Zone (TDZ)** is the temporal window between entering a scope and the actual line of code where a \`let\` or \`const\` variable is declared and initialized.

### Mechanics of the TDZ:
- When execution enters a block scope containing \`let\` or \`const\`, the engine allocates a binding in the Lexical Environment during the creation phase.
- However, until execution reaches the declaration line, the binding is in an **uninitialized** state.
- Any attempt to read or write to that variable while in the TDZ throws an immediate **\`ReferenceError: Cannot access 'x' before initialization\`**.

\`\`\`javascript
{
  // === TDZ for 'developer' begins ===
  // console.log(typeof developer); // Throws ReferenceError (even typeof is NOT safe in TDZ!)
  
  let unused = 10; // developer is still in TDZ here
  
  // === TDZ for 'developer' ends here ===
  let developer = "Sarah"; 
  console.log(developer); // "Sarah"
}
\`\`\`

👉 Interview Tip: Note that \`typeof\` is normally safe for undeclared variables (\`typeof unknownVar === "undefined"\`), but when used on a variable inside its TDZ, it throws a runtime \`ReferenceError\`.`
  },
  {
    id: 'jst-6',
    section: 'js-theory-sai',
    number: 6,
    question: 'What are the differences let, var and const?',
    answer: `The table below breaks down the foundational scoping, hoisting, and mutability differences between \`var\`, \`let\`, and \`const\`:

| Feature | \`var\` | \`let\` | \`const\` |
| :--- | :--- | :--- | :--- |
| **Scope Level** | **Function Scope** | **Block Scope** (\`{ ... }\`) | **Block Scope** (\`{ ... }\`) |
| **Hoisting State** | Initialized to \`undefined\` | Uninitialized (In TDZ) | Uninitialized (In TDZ) |
| **Re-declaration** | Allowed within same scope | **Disallowed** (Throws \`SyntaxError\`) | **Disallowed** (Throws \`SyntaxError\`) |
| **Re-assignment** | Allowed | Allowed | **Disallowed** (Throws \`TypeError\`) |
| **Must Initialize?** | Optional (\`var x;\`) | Optional (\`let x;\`) | **Mandatory** (\`const x = 10;\`) |
| **Global Object Attachment** | Attaches to \`window\` in browser | Does not attach to \`window\` | Does not attach to \`window\` |

\`\`\`javascript
// Block Scope Difference
for (var i = 0; i < 3; i++) {
  // i leaks outside!
}
console.log(i); // 3

for (let j = 0; j < 3; j++) {
  // j is scoped to each loop iteration!
}
// console.log(j); // Uncaught ReferenceError: j is not defined
\`\`\`

📌 Note: \`const\` guarantees **immutable binding**, not immutable value. An object declared with \`const\` can have its properties modified, but cannot be reassigned to a different object.`
  },
  {
    id: 'jst-7',
    section: 'js-theory-sai',
    number: 7,
    question: 'List out some key features of ES6?',
    answer: `**ECMAScript 2015 (ES6)** was the most transformative evolution in JavaScript history, introducing modern language features for scalable application architecture:

### Top ES6 Features:
1. **Block-Scoped Declarations**: \`let\` and \`const\` with Temporal Dead Zone.
2. **Arrow Functions**: Concise \`=>\` syntax with lexical \`this\` binding.
3. **Template Literals**: Multi-line strings and interpolation via backticks (\`\` \${expr} \`\`).
4. **Destructuring Assignment**: Pattern matching extraction for objects and arrays.
5. **Spread & Rest Operators**: \`...\` syntax for expanding and condensing iterables.
6. **Default Parameter Values**: \`function greet(name = "Guest")\`.
7. **Classes & Modules**: Formal \`class\`, \`extends\`, \`super\`, and native \`import\`/\`export\`.
8. **Native Promises**: Asynchronous state management replacing callback hell.
9. **Enhanced Data Structures**: \`Map\`, \`Set\`, \`WeakMap\`, \`WeakSet\`.
10. **Iterators & Generators**: Custom iteration protocols using \`function*\` and \`yield\`.

\`\`\`javascript
// Combining ES6 features cleanly:
class UserService {
  constructor(baseUrl = "https://api.dev") {
    this.baseUrl = baseUrl;
  }

  async fetchUser({ id, role = "standard" }) {
    const res = await fetch(\`\${this.baseUrl}/users/\${id}?role=\${role}\`);
    const { name, permissions = [] } = await res.json();
    return { name, permissions: [...permissions, "view"] };
  }
}
\`\`\``
  },
  {
    id: 'jst-8',
    section: 'js-theory-sai',
    number: 8,
    question: 'What are limitations of arrow functions in javascript?',
    answer: `While arrow functions are concise and resolve lexical \`this\` binding, they have key technical limitations that make them unsuitable for certain architectural patterns:

### Technical Limitations:
1. **No Own \`this\`**: Cannot be dynamically bound at invocation site; ignore \`call()\`, \`apply()\`, and \`bind()\`.
2. **Cannot Be Used as Constructors**:
   - Calling \`new ArrowFunc()\` throws **\`TypeError: ArrowFunc is not a constructor\`**.
3. **No \`prototype\` Property**:
   - Arrow functions lack a \`.prototype\` property, preventing prototypal method attachments.
4. **No \`arguments\` Object**:
   - Do not bind a local \`arguments\` identifier (must use rest parameters \`...args\`).
5. **Cannot Be Used as Generators**:
   - Cannot use the \`yield\` keyword inside their body.
6. **Unsuitable for Object Methods**:
   - Inside object literals, lexical \`this\` points to the outer enclosing scope (usually \`window\`), not the object instance.

\`\`\`javascript
const user = {
  name: "Marcus",
  // ❌ ANTI-PATTERN: Arrow function as object method
  badGreet: () => \`Hi, I am \${this.name}\`,
  
  // ✅ CORRECT: Standard method shorthand
  goodGreet() { return \`Hi, I am \${this.name}\`; }
};

console.log(user.badGreet());  // "Hi, I am undefined"
console.log(user.goodGreet()); // "Hi, I am Marcus"
\`\`\``
  },
  {
    id: 'jst-9',
    section: 'js-theory-sai',
    number: 9,
    question: 'What’s the spread operator in javascript?',
    answer: `The **Spread Operator (\`...\`)** unpacks the elements of an iterable (array, string, set, map) or own enumerable properties of an object into an individual list of elements or key-value pairs.

### Primary Use-Cases:
1. **Array Cloning & Concatenation**:
\`\`\`javascript
const original = [1, 2, 3];
const shallowClone = [...original];
const merged = [...original, 4, 5, ...[6, 7]]; // [1, 2, 3, 4, 5, 6, 7]
\`\`\`

2. **Function Arguments Spreading**:
\`\`\`javascript
const coordinates = [10, 25, 5];
const max = Math.max(...coordinates); // Equivalent to Math.max(10, 25, 5) -> 25
\`\`\`

3. **Shallow Object Merging & Immutability**:
\`\`\`javascript
const baseConfig = { theme: "dark", showNotifications: true };
const userConfig = { showNotifications: false, fontSize: 16 };

const activeConfig = { ...baseConfig, ...userConfig };
// { theme: "dark", showNotifications: false, fontSize: 16 }
\`\`\`

📌 Note: Spread performs a **shallow copy**. If items in the array or object are references to nested objects, both the original and copy will reference the identical nested object in heap memory.`
  },
  {
    id: 'jst-10',
    section: 'js-theory-sai',
    number: 10,
    question: 'What is rest operator in javascript?',
    answer: `The **Rest Parameter syntax (\`...identifier\`)** condenses an indefinite number of trailing arguments or elements into a single cohesive JavaScript Array.

### Primary Use-Cases:
1. **Variadic Function Parameters**:
   - Replaces the legacy \`arguments\` object with a genuine array supporting \`map\`, \`filter\`, and \`reduce\`.
\`\`\`javascript
function calculateCartTotal(discountRate, ...itemPrices) {
  const subtotal = itemPrices.reduce((sum, price) => sum + price, 0);
  return subtotal * (1 - discountRate);
}

console.log(calculateCartTotal(0.1, 50, 100, 25)); // 157.5
\`\`\`

2. **Destructuring Rest Elements**:
\`\`\`javascript
const [leadDeveloper, assistant, ...teamMembers] = ["Alice", "Bob", "Charlie", "David", "Eva"];
console.log(leadDeveloper); // "Alice"
console.log(teamMembers);   // ["Charlie", "David", "Eva"]

const { id, role, ...profileDetails } = { id: 101, role: "Admin", name: "Alex", country: "US" };
console.log(profileDetails); // { name: "Alex", country: "US" }
\`\`\`

👉 Interview Tip: The Rest parameter must strictly be the **final parameter** in a parameter list or destructuring pattern; trailing parameters like \`function(a, ...rest, b)\` trigger a compile-time \`SyntaxError\`.`
  },
  {
    id: 'jst-11',
    section: 'js-theory-sai',
    number: 11,
    question: 'What is destructuring?',
    answer: `**Destructuring** is a convenient syntax that enables unpacking values from arrays or properties from objects into distinct variables using pattern matching.

\`\`\`javascript
// 1. Object Destructuring with Aliasing & Defaults
const response = {
  status: 200,
  payload: {
    user: { id: 42, username: "anirban_codes" }
  }
};

const {
  status: httpStatus,              // Alias status -> httpStatus
  payload: { user: { username } }, // Nested destructuring
  timestamp = Date.now()           // Default fallback
} = response;

console.log(httpStatus); // 200
console.log(username);   // "anirban_codes"
console.log(timestamp);  // Current timestamp

// 2. Swapping variables in-place without a temp variable
let first = "Frontend", second = "Backend";
[first, second] = [second, first];
console.log(first, second); // "Backend", "Frontend"
\`\`\``
  },
  {
    id: 'jst-12',
    section: 'js-theory-sai',
    number: 12,
    question: 'What are the differences between Map and Set?',
    answer: `Both \`Map\` and \`Set\` are keyed ES6 collections, but they serve fundamentally different data structure purposes:

| Architectural Criterion | \`Map\` | \`Set\` |
| :--- | :--- | :--- |
| **Structure** | Collection of **Key-Value Pairs** (\`[key, value]\`) | Collection of **Unique Values** |
| **Uniqueness Rule** | Keys must be unique; values can be duplicates | **All values must be strictly unique** |
| **Primary Methods** | \`.set(key, val)\`, \`.get(key)\`, \`.has(key)\` | \`.add(val)\`, \`.has(val)\`, \`.delete(val)\` |
| **Permitted Keys/Values** | Any data type (objects, functions, primitives) | Any data type |
| **Lookup Target** | \`map.get(key)\` retrieves corresponding value | \`set.has(val)\` checks boolean existence |

\`\`\`javascript
// Map: User Cache
const userCache = new Map();
const userObj = { id: 1 };
userCache.set(userObj, { permissions: ["admin", "editor"] });
console.log(userCache.get(userObj).permissions); // ["admin", "editor"]

// Set: Unique Tag Tracker
const tagTracker = new Set(["react", "vite", "react", "css"]);
console.log(tagTracker.size); // 3 (duplicate "react" discarded)
\`\`\``
  },
  {
    id: 'jst-13',
    section: 'js-theory-sai',
    number: 13,
    question: 'What are modules in javascript?',
    answer: `**ES Modules (ESM)** are standardized, self-contained JavaScript files that encapsulate variables and functions, exposing public APIs via \`export\` and consuming external dependencies via \`import\`.

### Key Characteristics:
1. **Automatic Strict Mode**: Modules always execute in strict mode (\`"use strict"\`).
2. **Module Scope**: Variables declared top-level do not leak into the global \`window\` object.
3. **Static Analysis & Tree-Shaking**: Imports and exports must be declared at the top-level (outside \`if\` blocks), enabling modern bundlers (Vite, Rollup) to eliminate dead code during compilation.
4. **Deferred by Default in HTML**: \`<script type="module" src="app.js">\` automatically behaves as if \`defer\` is present.

\`\`\`javascript
// mathUtils.js (Named & Default Exports)
export const PI = 3.14159;
export function square(x) { return x * x; }
export default function add(a, b) { return a + b; }

// app.js (Importing)
import add, { PI, square } from './mathUtils.js';

console.log(add(10, 20)); // 30
console.log(square(4));   // 16
\`\`\`

👉 Interview Tip: Contrast **ES Modules** (\`import\`/\`export\` - asynchronous and statically analyzable) with legacy **CommonJS** (\`require\`/\`module.exports\` - synchronous and dynamic, standard in older Node.js).`
  },
  {
    id: 'jst-14',
    section: 'js-theory-sai',
    number: 14,
    question: 'Difference between Pass by Value and Pass by Reference?',
    answer: `In JavaScript, parameter passing semantics depend strictly on whether the argument is a **Primitive** or an **Object**:

### 1. Pass by Value (Primitives):
- Primitives (\`number\`, \`string\`, \`boolean\`, \`null\`, \`undefined\`, \`symbol\`, \`bigint\`) are passed by **value**.
- A separate copy of the value is allocated on the stack. Changes inside the function have zero effect on the outer variable.

### 2. Pass by Reference / Sharing (Objects & Arrays):
- Objects are passed by **reference of the pointer address**.
- The function receives a copy of the memory pointer pointing to the identical object on the heap.
- **Mutating properties** alters the external object.
- **Reassigning the variable identifier** points the local parameter to a new memory address, leaving the outer object unchanged.

\`\`\`javascript
// Scenario A: Primitive (Pass by Value)
let count = 10;
function modifyPrimitive(val) {
  val = 999;
}
modifyPrimitive(count);
console.log(count); // 10 (Unaffected)

// Scenario B: Object Mutation (Pass by Reference)
const person = { name: "Anirban" };
function modifyObject(obj) {
  obj.name = "Rahul"; // Mutates heap memory!
}
modifyObject(person);
console.log(person.name); // "Rahul" (Changed!)

// Scenario C: Object Reassignment (Reference Broken)
const team = { lead: "Dan" };
function reassignObject(obj) {
  obj = { lead: "Sophie" }; // Points local variable to new object
}
reassignObject(team);
console.log(team.lead); // "Dan" (Original object was NOT modified!)
\`\`\``
  },
  {
    id: 'jst-15',
    section: 'js-theory-sai',
    number: 15,
    question: 'Difference between map and filter?',
    answer: `Both are pure, non-mutating higher-order methods on \`Array.prototype\`, but they perform distinct operations:

| Feature | \`map(callback)\` | \`filter(callback)\` |
| :--- | :--- | :--- |
| **Output Length** | **Always equal** to input array length ($N \\to N$) | **$\\le$ input array length** ($N \\to 0..N$) |
| **Callback Expectation** | Returns the **transformed item** | Returns a **boolean truthy/falsy condition** |
| **Purpose** | One-to-one projection/transformation | Extraction of matching elements |

\`\`\`javascript
const users = [
  { name: "John", age: 17 },
  { name: "Jane", age: 24 },
  { name: "Alex", age: 31 }
];

// filter: Keep only adults (age >= 18)
const adults = users.filter(u => u.age >= 18);
console.log(adults); 
// [{ name: "Jane", age: 24 }, { name: "Alex", age: 31 }]

// map: Extract uppercase user names
const userNames = users.map(u => u.name.toUpperCase());
console.log(userNames); 
// ["JOHN", "JANE", "ALEX"]
\`\`\``
  },
  {
    id: 'jst-16',
    section: 'js-theory-sai',
    number: 16,
    question: 'Difference between map() and forEach()?',
    answer: `The primary distinction between \`map()\` and \`forEach()\` lies in their **return values** and intended functional paradigms:

| Architectural Criterion | \`map()\` | \`forEach()\` |
| :--- | :--- | :--- |
| **Return Value** | Returns a **brand new array** with transformed elements | Returns **\`undefined\`** |
| **Chainability** | ✅ Can chain \`.filter()\`, \`.reduce()\`, etc. | ❌ Cannot be chained (returns undefined) |
| **Paradigm** | Functional programming (Pure transformations) | Imperative programming (Executing side effects) |
| **Original Array Mutation** | Does not mutate original array | Does not mutate on its own, but callback often does |

\`\`\`javascript
const numbers = [1, 2, 3];

// forEach: Used for side effects (logging, DOM injection)
const forEachResult = numbers.forEach(n => console.log(n * 2));
console.log(forEachResult); // undefined

// map: Used for pure transformations
const mapResult = numbers.map(n => n * 2);
console.log(mapResult); // [2, 4, 6]
\`\`\`

👉 Interview Tip: Never use \`map()\` if you are not planning to use the returned array. Doing so needlessly allocates memory for a new array that will immediately be discarded.`
  },
  {
    id: 'jst-17',
    section: 'js-theory-sai',
    number: 17,
    question: 'Difference between for-in and for-of?',
    answer: `\`for...in\` and \`for...of\` inspect different aspects of data structures:

\`\`\`javascript
const frameworkList = ["React", "Vue", "Angular"];
frameworkList.author = "Google"; // Custom enumerable property

// for...in: Iterates over ENUMERABLE PROPERTY KEYS (Strings)
for (const key in frameworkList) {
  console.log(key, typeof key); 
  // "0" (string), "1" (string), "2" (string), "author" (string)
}

// for...of: Iterates over ITERABLE VALUES
for (const value of frameworkList) {
  console.log(value); 
  // "React", "Vue", "Angular" (Ignores custom property!)
}
\`\`\`

### Rule of Thumb:
- Use **\`for...in\`** for inspecting keys of plain **Objects** (\`{ a: 1, b: 2 }\`).
- Use **\`for...of\`** for iterating values of **Arrays, Sets, Maps, and Strings**.`
  },
  {
    id: 'jst-18',
    section: 'js-theory-sai',
    number: 18,
    question: 'Difference between find vs findIndex?',
    answer: `Both \`find()\` and \`findIndex()\` search an array using a predicate callback and terminate immediately upon the **first match** (short-circuiting).

### Comparison:
| Method | Returns on Match | Returns if No Match Found |
| :--- | :--- | :--- |
| **\`find()\`** | The **element value** itself | **\`undefined\`** |
| **\`findIndex()\`** | The **zero-based numeric index** | **\`-1\`** |

\`\`\`javascript
const tasks = [
  { id: 101, title: "Design Architecture", done: true },
  { id: 102, title: "Implement Unit Tests", done: false },
  { id: 103, title: "Deploy to Prod", done: false }
];

// find(): Get the first pending task object
const nextTask = tasks.find(t => !t.done);
console.log(nextTask); // { id: 102, title: "Implement Unit Tests", done: false }

// findIndex(): Get index for updating or splicing
const nextIndex = tasks.findIndex(t => !t.done);
console.log(nextIndex); // 1

// If element doesn't exist:
console.log(tasks.find(t => t.id === 999));      // undefined
console.log(tasks.findIndex(t => t.id === 999)); // -1
\`\`\``
  },
  {
    id: 'jst-19',
    section: 'js-theory-sai',
    number: 19,
    question: 'Difference between Pure and Impure functions?',
    answer: `In Functional Programming, functions are categorized based on **determinism** and **side effects**:

### 1. Pure Functions:
- **Deterministic**: Given identical arguments, always returns the identical result.
- **Zero Side Effects**: Does not mutate external variables, modify input parameters, perform console I/O, or trigger network requests.
\`\`\`javascript
// Pure Function
const calculateTax = (price, taxRate) => price * taxRate;
\`\`\`

### 2. Impure Functions:
- Produces different outputs for the same inputs (e.g. relying on \`Date.now()\`, \`Math.random()\`, or external mutable state).
- Causes observable side effects (mutates parameters in-place, writes to localStorage, alters global DOM).
\`\`\`javascript
// Impure Function (Relies on external state & mutates parameter)
let globalDiscount = 0.1;
function applyDiscount(cart) {
  cart.total = cart.total - (cart.total * globalDiscount); // Mutates input!
  cart.updatedAt = Date.now(); // Non-deterministic!
  return cart;
}
\`\`\`

👉 Interview Tip: React Components and Redux Reducers are required to be **pure functions**. Purity enables predictable caching, time-travel debugging, and safe concurrent rendering in React 18/19.`
  },
  {
    id: 'jst-20',
    section: 'js-theory-sai',
    number: 20,
    question: 'Differences between call(), apply() and bind()?',
    answer: `All three methods allow explicit assignment of the \`this\` execution context:

| Method | Immediate Invocation | Parameter Format | Return Value |
| :--- | :--- | :--- | :--- |
| **\`call\`** | ✅ Invokes immediately | Arguments passed individually: \`fn.call(ctx, a, b)\` | Result of function |
| **\`apply\`** | ✅ Invokes immediately | Arguments passed as array: \`fn.apply(ctx, [a, b])\` | Result of function |
| **\`bind\`** | ❌ **Does NOT invoke** | Arguments passed individually: \`fn.bind(ctx, a)\` | **New permanently bound function** |

\`\`\`javascript
const server = { port: 8080 };

function startServer(protocol, mode) {
  return \`Listening on \${protocol}://localhost:\${this.port} in \${mode} mode.\`;
}

// 1. call: arguments passed as comma-separated list
console.log(startServer.call(server, "https", "production"));

// 2. apply: arguments passed as an array
console.log(startServer.apply(server, ["http", "development"]));

// 3. bind: returns a new bound function (Currying / Event Handlers)
const launchHttps = startServer.bind(server, "https");
console.log(launchHttps("staging"));
\`\`\``
  },
  {
    id: 'jst-21',
    section: 'js-theory-sai',
    number: 21,
    question: 'Different ways to create object in javascript?',
    answer: `JavaScript provides 5 primary patterns for object creation:

\`\`\`javascript
// 1. Object Literal (Most common & performant)
const obj1 = { name: "Literal", active: true };

// 2. Object Constructor
const obj2 = new Object();
obj2.name = "Constructor";

// 3. Object.create() (Direct Prototypal Inheritance)
const proto = { greet() { return "Hello"; } };
const obj3 = Object.create(proto); // Sets proto as obj3's [[Prototype]]

// 4. Constructor Function with 'new'
function User(name) { this.name = name; }
User.prototype.role = "Member";
const obj4 = new User("Alice");

// 5. ES6 Class (Modern Standard)
class Product {
  constructor(name, price) {
    this.name = name;
    this.price = price;
  }
}
const obj5 = new Product("Laptop", 1200);
\`\`\``
  },
  {
    id: 'jst-22',
    section: 'js-theory-sai',
    number: 22,
    question: 'Difference between Object.keys, values and entries?',
    answer: `These static helper methods extract own enumerable properties from an object into arrays:

\`\`\`javascript
const engineer = {
  name: "Anirban",
  role: "Lead Architect",
  experienceYears: 8
};

// 1. Object.keys(obj) -> Array of string property keys
console.log(Object.keys(engineer));
// ["name", "role", "experienceYears"]

// 2. Object.values(obj) -> Array of property values
console.log(Object.values(engineer));
// ["Anirban", "Lead Architect", 8]

// 3. Object.entries(obj) -> Array of [key, value] pairs (Ideal for Map conversion)
console.log(Object.entries(engineer));
// [["name", "Anirban"], ["role", "Lead Architect"], ["experienceYears", 8]]

// Converting entries back into an object:
const clone = Object.fromEntries(Object.entries(engineer));
\`\`\``
  },
  {
    id: 'jst-23',
    section: 'js-theory-sai',
    number: 23,
    question: 'Difference between Object.freeze() vs Object.seal()?',
    answer: `Both methods prevent structural modification of objects, but \`freeze()\` is significantly stricter:

| Action Allowed? | Normal Object | \`Object.seal(obj)\` | \`Object.freeze(obj)\` |
| :--- | :--- | :--- | :--- |
| **Add New Properties?** | ✅ Allowed | ❌ **Prevented** | ❌ **Prevented** |
| **Delete Properties?** | ✅ Allowed | ❌ **Prevented** | ❌ **Prevented** |
| **Modify Existing Values?** | ✅ Allowed | ✅ **ALLOWED** | ❌ **Prevented (Read-Only)** |
| **Change Descriptors (\`configurable\`)?** | ✅ Allowed | ❌ Prevented | ❌ Prevented |

\`\`\`javascript
const sealedObj = Object.seal({ id: 1, name: "Alpha" });
sealedObj.name = "Beta"; // ✅ Allowed (Modifying existing values works!)
delete sealedObj.id;     // ❌ Silently fails (or throws TypeError in strict mode)
sealedObj.newProp = 42;  // ❌ Silently fails

const frozenObj = Object.freeze({ id: 1, name: "Alpha" });
frozenObj.name = "Beta"; // ❌ Silently fails (Values are read-only!)
\`\`\`

📌 Note: Both \`freeze()\` and \`seal()\` are **shallow**. Nested child objects can still be mutated unless recursively frozen.`
  },
  {
    id: 'jst-24',
    section: 'js-theory-sai',
    number: 24,
    question: 'What is a polyfill in javascript?',
    answer: `A **Polyfill** is a client-side JavaScript code snippet that replicates modern web API or ECMAScript features in older browser environments that lack native support.

### How a Polyfill Works:
It checks if the feature already exists natively on the prototype or global object; if missing, it attaches a compatible implementation:

\`\`\`javascript
// Production-grade Polyfill for Array.prototype.includes
if (!Array.prototype.includes) {
  Array.prototype.includes = function(searchElement, fromIndex = 0) {
    if (this == null) throw new TypeError('"this" is null or not defined');
    const O = Object(this);
    const len = O.length >>> 0;
    if (len === 0) return false;

    let k = Math.max(fromIndex >= 0 ? fromIndex : len - Math.abs(fromIndex), 0);

    while (k < len) {
      // Special NaN check: NaN === NaN is false in JS, but [NaN].includes(NaN) is true!
      if (O[k] === searchElement || (Number.isNaN(O[k]) && Number.isNaN(searchElement))) {
        return true;
      }
      k++;
    }
    return false;
  };
}
\`\`\`

👉 Interview Tip: Contrast **Polyfills** (which implement runtime APIs like \`Promise\` or \`Array.prototype.flat\`) with **Transpilers** like Babel (which compile new syntax constructs like \`() => {}\` or optional chaining \`?.\` down to ES5 syntax).`
  },
  {
    id: 'jst-25',
    section: 'js-theory-sai',
    number: 25,
    question: 'What is prototype in javascript?',
    answer: `In JavaScript, a **Prototype** is an internal object link associated with every JavaScript object from which it can inherit methods and properties.

### Prototype Delegation Mechanics:
- When code attempts to access a property or method on an object:
  $$\\text{Instance} \\xrightarrow{\\text{__proto__}} \\text{Constructor.prototype} \\xrightarrow{\\text{__proto__}} \\text{Object.prototype} \\xrightarrow{\\text{__proto__}} \\text{null}$$
- If found anywhere along this chain, the value is returned; if \`null\` is reached without a match, \`undefined\` is returned.

\`\`\`javascript
function Device(model) {
  this.model = model;
}

// Methods defined on prototype are shared across ALL instances
Device.prototype.powerOn = function() {
  return \`\${this.model} is booting up...\`;
};

const phone1 = new Device("Pixel 9");
const phone2 = new Device("Galaxy S25");

console.log(phone1.powerOn === phone2.powerOn); // true (Shared memory reference!)
\`\`\``
  },
  {
    id: 'jst-26',
    section: 'js-theory-sai',
    number: 26,
    question: 'What is generator function in javascript?',
    answer: `A **Generator Function** (\`function*\`) is a specialized function that can pause execution midway and resume later, retaining its internal variable state across pauses.

### Mechanics:
- Invoking a generator function does not run its body immediately; it returns a **Generator Object** conforming to the Iterator protocol.
- Calling \`.next()\` executes the generator until it encounters the **\`yield\`** keyword.
- It returns an object \`{ value: yieldedValue, done: boolean }\`.

\`\`\`javascript
// Infinite ID Generator
function* idGenerator(prefix = "ID") {
  let count = 1;
  while (true) {
    yield \`\${prefix}-\${count++}\`; // Execution pauses right here!
  }
}

const gen = idGenerator("USER");
console.log(gen.next()); // { value: "USER-1", done: false }
console.log(gen.next()); // { value: "USER-2", done: false }
console.log(gen.next()); // { value: "USER-3", done: false }
\`\`\`

👉 Interview Tip: Generators were the foundation for asynchronous flow control libraries like Redux Saga before native \`async/await\` became ubiquitous.`
  },
  {
    id: 'jst-27',
    section: 'js-theory-sai',
    number: 27,
    question: 'What is IIFE?',
    answer: `An **IIFE (Immediately Invoked Function Expression)** is a JavaScript function executed immediately at the point of declaration.

\`\`\`javascript
(function(appName) {
  const apiKey = "super_secret_token"; // Enclosed in private scope
  console.log(\`\${appName} initialized securely.\`);
})("AnalyticsEngine");
\`\`\`

### Why Use IIFE:
1. **Data Privacy**: Prevents variables from polluting the global \`window\` namespace.
2. **Avoid Global Variable Collisions**: Critical when bundling multiple legacy scripts on a single page.`
  },
  {
    id: 'jst-28',
    section: 'js-theory-sai',
    number: 28,
    question: 'What is CORS?',
    answer: `**CORS (Cross-Origin Resource Sharing)** is a browser-enforced security mechanism that uses HTTP headers to allow a web application running at one origin (domain, protocol, or port) to access resources from a server at a different origin.

### Same-Origin Policy (SOP):
- Two URLs share the same origin if and only if their **protocol**, **host**, and **port** are identical.
- By default, browsers block cross-origin HTTP requests initiated by scripts (\`fetch\` or \`XMLHttpRequest\`).

### How CORS Works (Preflight Request):
For "non-simple" requests (e.g. requests with \`Authorization\` headers, \`application/json\` content type, or methods like \`PUT\`/\`DELETE\`), the browser automatically sends an **OPTIONS Preflight** request:

\`\`\`http
OPTIONS /api/data HTTP/1.1
Origin: https://myfrontend.com
Access-Control-Request-Method: POST
Access-Control-Request-Headers: Content-Type, Authorization
\`\`\`

The server must reply with appropriate CORS approval headers:
\`\`\`http
HTTP/1.1 200 OK
Access-Control-Allow-Origin: https://myfrontend.com
Access-Control-Allow-Methods: GET, POST, OPTIONS
Access-Control-Allow-Headers: Content-Type, Authorization
\`\`\`

👉 Interview Tip: Emphasize that CORS is a **browser security boundary**, not a server restriction. If you make the exact same HTTP request from Postman, cURL, or a Node.js server, it succeeds without CORS errors.`
  },
  {
    id: 'jst-29',
    section: 'js-theory-sai',
    number: 29,
    question: 'Differences between typescript and javascript?',
    answer: `**TypeScript** is an open-source, strongly-typed superset of JavaScript developed by Microsoft that compiles down to clean, standards-compliant JavaScript.

| Feature | JavaScript | TypeScript |
| :--- | :--- | :--- |
| **Typing System** | Dynamic typing (evaluated at runtime) | **Static typing** (evaluated at compile time) |
| **Error Discovery** | Runtime errors in production or QA | **Compile-time syntax & type errors** during development |
| **Interfaces & Generics** | ❌ No native interface constructs | ✅ Rich Interfaces, Type Aliases, and Generics |
| **Tooling & Refactoring** | Basic IDE autocompletion | Enterprise-grade IntelliSense and auto-refactoring |
| **Execution** | Runs natively in browsers and Node.js | Must be **transpiled to JavaScript** before execution |

\`\`\`typescript
// TypeScript Compile-Time Safety
interface User {
  id: number;
  email: string;
  role?: "admin" | "member"; // Optional union type
}

function sendNotification(user: User): string {
  return \`Sending email to \${user.email}\`;
}

// sendNotification({ id: 1 }); 
// Compile Error: Property 'email' is missing in type '{ id: number; }'
\`\`\``
  },
  {
    id: 'jst-30',
    section: 'js-theory-sai',
    number: 30,
    question: 'Authentication vs authorization?',
    answer: `While frequently confused, **Authentication** and **Authorization** represent the two distinct pillars of web application security:

| Security Domain | Authentication (AuthN) | Authorization (AuthZ) |
| :--- | :--- | :--- |
| **Core Question** | **"Who are you?"** | **"What permissions do you have?"** |
| **Purpose** | Verifies the identity of the user | Determines access rights to specific resources |
| **Mechanisms** | Passwords, MFA/2FA, Biometrics, SSO, OTP | Role-Based Access Control (RBAC), JWT scopes, ACLs |
| **Execution Order** | **Always occurs first** | Occurs **after** successful authentication |
| **HTTP Status Code** | **\`401 Unauthorized\`** (Missing or invalid identity) | **\`403 Forbidden\`** (Identity known, but access denied) |

\`\`\`javascript
// Express Middleware Flow
app.get("/api/admin/metrics", 
  authenticateUser, // Step 1: Checks JWT signature (Who are you?)
  requireAdminRole, // Step 2: Checks user.role === 'admin' (Are you allowed here?)
  (req, res) => res.json({ revenue: "$1.2M" })
);
\`\`\``
  },
  {
    id: 'jst-31',
    section: 'js-theory-sai',
    number: 31,
    question: 'Difference between null and undefined?',
    answer: `In JavaScript, both represent absent values, but with distinct semantic origins:

| Criterion | \`undefined\` | \`null\` |
| :--- | :--- | :--- |
| **Semantic Meaning** | Variable has been declared but **not yet assigned a value** | **Intentional explicit assignment** of "no value" |
| **Origin** | Set automatically by the JavaScript engine | Assigned manually by developers |
| **\`typeof\` result** | \`"undefined"\` | **\`"object"\`** (Historical JS bug!) |
| **Numeric Coercion** | \`Number(undefined)\` evaluates to **\`NaN\`** | \`Number(null)\` evaluates to **\`0\`** |
| **Default Parameters** | Triggers function default parameters | Does **NOT** trigger default parameters |

\`\`\`javascript
let unassigned;
console.log(unassigned); // undefined

let emptyUser = null;
console.log(emptyUser);  // null

function greet(name = "Guest") {
  console.log("Hello, " + name);
}

greet(undefined); // "Hello, Guest" (Default parameter triggered)
greet(null);      // "Hello, null"  (Default NOT triggered!)
\`\`\``
  },
  {
    id: 'jst-32',
    section: 'js-theory-sai',
    number: 32,
    question: 'Difference between == and ===?',
    answer: `- **\`==\` (Abstract Equality)**: Converts operands of different types to a common type via implicit coercion before comparing.
- **\`===\` (Strict Equality)**: Evaluates both value and exact type without coercion.

\`\`\`javascript
console.log(0 == false);   // true (false coerced to 0)
console.log(0 === false);  // false (number !== boolean)

console.log("" == 0);      // true ("" coerced to 0)
console.log("" === 0);     // false (string !== number)
\`\`\``
  },
  {
    id: 'jst-33',
    section: 'js-theory-sai',
    number: 33,
    question: 'Slice vs Splice in javascript?',
    answer: `One of the most frequently tested array manipulation questions:

| Feature | \`slice(start, end)\` | \`splice(start, deleteCount, ...items)\` |
| :--- | :--- | :--- |
| **Mutates Original Array?** | ❌ **NO (Pure)** | ✅ **YES (Mutates in-place!)** |
| **Return Value** | A new shallow copy of extracted elements | An array containing the deleted elements |
| **Primary Use-Case** | Safely reading a sub-array without side effects | Adding, removing, or replacing elements in-place |

\`\`\`javascript
// 1. slice() - Pure & Non-mutating
const fruits = ["Apple", "Banana", "Cherry", "Date"];
const extracted = fruits.slice(1, 3); // Extracts index 1 up to (not including) index 3

console.log(extracted); // ["Banana", "Cherry"]
console.log(fruits);    // ["Apple", "Banana", "Cherry", "Date"] (Untouched!)

// 2. splice() - In-place Mutation
const deletedItems = fruits.splice(1, 2, "Blueberry", "Cranberry");
console.log(deletedItems); // ["Banana", "Cherry"] (Removed elements)
console.log(fruits);       // ["Apple", "Blueberry", "Cranberry", "Date"] (Mutated!)
\`\`\``
  },
  {
    id: 'jst-34',
    section: 'js-theory-sai',
    number: 34,
    question: 'What is setTimeOut in javascript?',
    answer: `\`setTimeout\` is a host Web API method that schedules a callback function to be executed **once** after a minimum threshold delay in milliseconds.

\`\`\`javascript
const timerId = setTimeout(() => {
  console.log("Executed after 2 seconds");
}, 2000);

// Can be cancelled prior to execution:
clearTimeout(timerId);
\`\`\`

📌 Note: The millisecond delay represents a **minimum delay**, not a guaranteed exact timing. If the Call Stack is busy with heavy synchronous tasks, the callback will wait in the Macrotask Queue until the stack clears.`
  },
  {
    id: 'jst-35',
    section: 'js-theory-sai',
    number: 35,
    question: 'What is setInterval in javascript?',
    answer: `\`setInterval\` is a Web API method that repeatedly invokes a callback function at regular millisecond intervals until cancelled via \`clearInterval(intervalId)\`.

\`\`\`javascript
let seconds = 0;
const intervalId = setInterval(() => {
  seconds++;
  console.log(\`Timer: \${seconds}s\`);
  if (seconds >= 5) {
    clearInterval(intervalId); // Stop repeating
  }
}, 1000);
\`\`\`

👉 Interview Tip: If the task inside \`setInterval\` takes longer to execute than the interval delay, interval executions can stack up with zero delay between them. In production, prefer **recursive \`setTimeout\`** which guarantees the previous execution finishes before scheduling the next delay.`
  },
  {
    id: 'jst-36',
    section: 'js-theory-sai',
    number: 36,
    question: 'What are Promises in javascript?',
    answer: `A **Promise** is a native JavaScript object representing the eventual result of an asynchronous operation.

### The 3 Mutually Exclusive States:
1. **\`pending\`**: In-flight asynchronous task.
2. **\`fulfilled\`**: Task succeeded with a value (\`resolve(data)\`).
3. **\`rejected\`**: Task failed with an error reason (\`reject(err)\`).

\`\`\`javascript
const fetchScore = () => new Promise((resolve) => setTimeout(() => resolve(95), 100));

fetchScore()
  .then(score => console.log("Score:", score))
  .catch(err => console.error(err));
\`\`\``
  },
  {
    id: 'jst-37',
    section: 'js-theory-sai',
    number: 37,
    question: 'Differences between Promise.all, allSettled, any, race?',
    answer: `JavaScript provides 4 static combinators on \`Promise\` for managing concurrent asynchronous workflows:

| Combinator | Resolves When... | Rejects When... | Ideal Use-Case |
| :--- | :--- | :--- | :--- |
| **\`Promise.all()\`** | **ALL** promises fulfill | **FIRST** promise rejects (Fail-Fast) | Dependent tasks where all data is required |
| **\`Promise.allSettled()\`** | **ALL** promises settle (Never fails!) | Never rejects | Independent batch tasks where you need status of all |
| **\`Promise.any()\`** | **FIRST** promise fulfills | **ALL** promises reject (AggregateError) | Fast mirror/fallback fetching |
| **\`Promise.race()\`** | **FIRST** promise settles (win by fulfill OR reject) | Win by first rejection | Request timeouts |

\`\`\`javascript
const p1 = Promise.resolve("Data A");
const p2 = Promise.reject("Network Fail");

// Promise.all: FAILS because p2 rejected
Promise.all([p1, p2]).catch(err => console.log("all failed:", err)); // "Network Fail"

// Promise.allSettled: SUCCEEDS with report
Promise.allSettled([p1, p2]).then(results => console.log(results));
// [
//   { status: 'fulfilled', value: 'Data A' },
//   { status: 'rejected', reason: 'Network Fail' }
// ]
\`\`\``
  },
  {
    id: 'jst-38',
    section: 'js-theory-sai',
    number: 38,
    question: 'What is a callstack in javascript?',
    answer: `The **Call Stack** is a **Last-In, First-Out (LIFO)** data structure used by the JavaScript engine to track where in the program execution is currently taking place.

### Lifecycle of the Call Stack:
- When a function is called, a new **Execution Context** frame is pushed onto the top of the stack.
- When the function finishes and returns, its frame is popped off the stack.
- If stack limits are exceeded by unbounded recursion, the engine throws **\`RangeError: Maximum call stack size exceeded\` (Stack Overflow)**.

\`\`\`javascript
function a() { b(); }
function b() { c(); }
function c() { console.trace("Stack Trace"); }
a();
// Call Stack order: [Global] -> [a] -> [b] -> [c]
\`\`\``
  },
  {
    id: 'jst-39',
    section: 'js-theory-sai',
    number: 39,
    question: 'What is a closure?',
    answer: `A **Closure** gives an inner function access to its outer enclosing scope's variables even after the outer function has finished executing and its stack frame has popped.

\`\`\`javascript
function createRateLimiter(limit) {
  let requests = 0; // Preserved in heap via closure
  return function() {
    if (++requests > limit) return "Rate limit exceeded!";
    return \`Request \${requests} approved\`;
  };
}

const limiter = createRateLimiter(2);
console.log(limiter()); // Request 1 approved
console.log(limiter()); // Request 2 approved
console.log(limiter()); // Rate limit exceeded!
\`\`\``
  },
  {
    id: 'jst-40',
    section: 'js-theory-sai',
    number: 40,
    question: 'What are callbacks in javascript?',
    answer: `A **Callback** is a function passed as an argument to another function, intended to be executed after a preceding task completes.

\`\`\`javascript
function downloadFile(url, callback) {
  setTimeout(() => {
    callback(\`Content from \${url}\`);
  }, 100);
}

downloadFile("https://example.com/asset.png", content => {
  console.log("Downloaded:", content);
});
\`\`\``
  },
  {
    id: 'jst-41',
    section: 'js-theory-sai',
    number: 41,
    question: 'What are Higher Order Functions in javascript?',
    answer: `A **Higher-Order Function (HOF)** is a function that does at least one of the following:
1. Takes one or more functions as arguments (e.g. \`map\`, \`filter\`, \`addEventListener\`).
2. Returns another function as its result (e.g. closures, currying factories).

\`\`\`javascript
// Higher-Order Function returning a function
function withTiming(fn) {
  return function(...args) {
    const start = performance.now();
    const result = fn(...args);
    const end = performance.now();
    console.log(\`Execution time: \${(end - start).toFixed(4)}ms\`);
    return result;
  };
}

const slowCompute = (n) => {
  let sum = 0;
  for (let i = 0; i < n; i++) sum += i;
  return sum;
};

const timedCompute = withTiming(slowCompute);
timedCompute(1000000); // Logs execution time automatically
\`\`\``
  },
  {
    id: 'jst-42',
    section: 'js-theory-sai',
    number: 42,
    question: 'Difference between Local Storage and Session storage?',
    answer: `Both are client-side Web Storage APIs providing synchronous key-value storage (~5MB), but differ in **data lifespan**:

| Criterion | \`localStorage\` | \`sessionStorage\` |
| :--- | :--- | :--- |
| **Lifespan** | **Permanent**; survives browser restarts and OS reboots | **Tab Session only**; wiped when tab is closed |
| **Cross-Tab Sharing** | Shared across all tabs & windows of same origin | **Isolated per tab** (duplicate tab creates new session copy) |
| **API Syntax** | \`localStorage.setItem(k, v)\` | \`sessionStorage.setItem(k, v)\` |
| **Storage Capacity** | ~5MB per origin | ~5MB per origin |

\`\`\`javascript
// Persists user dark mode preference indefinitely
localStorage.setItem('theme', 'dark');

// Stores one-time checkout wizard form state for current tab
sessionStorage.setItem('checkoutStep', 'payment');
\`\`\``
  },
  {
    id: 'jst-43',
    section: 'js-theory-sai',
    number: 43,
    question: 'Difference between Indexeddb and sessionstorage?',
    answer: `| Feature | \`sessionStorage\` | \`IndexedDB\` |
| :--- | :--- | :--- |
| **Storage Model** | Simple string key-value pairs | **Transactional NoSQL Object Store** |
| **Capacity** | ~5MB | **Hundreds of Megabytes to Gigabytes** (up to 80% disk) |
| **Execution** | **Synchronous** (blocks UI thread) | **Asynchronous** (non-blocking via Promises/Events) |
| **Complex Queries** | None (key lookup only) | Indexes, range queries, cursors |
| **Use-Case** | Small transient session flags | Offline PWAs, rich media caching, large datasets |`
  },
  {
    id: 'jst-44',
    section: 'js-theory-sai',
    number: 44,
    question: 'Possible followup scenarios on local storage',
    answer: `Common senior interview scenarios regarding \`localStorage\`:

1. **Reopening Browser**: Data persists indefinitely across browser restarts.
2. **Cross-Tab Synchronization**: Updates trigger a \`window.addEventListener('storage', e => ...)\` event in **all other tabs** of the same origin (not in the tab triggering the change).
3. **Storage Quota Exceeded**: Writing beyond capacity throws a \`QuotaExceededError\` exception. Always wrap in \`try...catch\`.
4. **Security Vulnerability**: Vulnerable to **Cross-Site Scripting (XSS)**. Never store sensitive tokens (JWT authentication tokens, credit cards) in \`localStorage\`. Use \`HttpOnly\`, \`Secure\`, \`SameSite\` cookies instead.`
  },
  {
    id: 'jst-45',
    section: 'js-theory-sai',
    number: 45,
    question: 'Possible followup scenarios on session storage',
    answer: `Key scenarios for \`sessionStorage\`:

1. **Closing and Reopening Tab**: Data is permanently deleted.
2. **Duplicating a Tab (Right Click -> Duplicate)**: The browser clones the existing tab's session storage into the new tab, but subsequent changes in either tab are isolated.
3. **Navigating to Another Page in Same Tab**: Data survives page reloads and cross-page navigations within the same tab.`
  },
  {
    id: 'jst-46',
    section: 'js-theory-sai',
    number: 46,
    question: 'What are cookies?',
    answer: `**HTTP Cookies** are small text strings (up to 4KB) stored by the browser that are automatically included in every subsequent HTTP request sent to the origin server.

### Key Cookie Flags for Security:
- **\`HttpOnly\`**: Prevents client-side JavaScript access via \`document.cookie\`, completely mitigating XSS token theft.
- **\`Secure\`**: Transmitted only over encrypted HTTPS connections.
- **\`SameSite=Strict|Lax|None\`**: Defends against Cross-Site Request Forgery (CSRF) attacks.`
  },
  {
    id: 'jst-47',
    section: 'js-theory-sai',
    number: 47,
    question: 'Interview scenarios on this keyword',
    answer: `Predicting \`this\` in tricky interview scenarios:

\`\`\`javascript
// Scenario 1: Method extraction loses context
const user = {
  name: "Dan",
  greet() { return this.name; }
};
const unboundGreet = user.greet;
console.log(unboundGreet()); // undefined (Invoked as plain function -> this is window/undefined)

// Scenario 2: Nested callback loses context
const car = {
  speed: 100,
  drive() {
    setTimeout(function() {
      console.log(this.speed); // undefined (Normal function in setTimeout gets default binding)
    }, 100);
    
    // Fix: Arrow function inherits lexical 'this'
    setTimeout(() => {
      console.log(this.speed); // 100
    }, 100);
  }
};
car.drive();
\`\`\``
  },
  {
    id: 'jst-48',
    section: 'js-theory-sai',
    number: 48,
    question: 'What are Interceptors?',
    answer: `An **Interceptor** is middleware that intercepts HTTP requests or responses globally before they are sent or handled by application code (commonly used in libraries like **Axios** or modern \`fetch\` wrappers).

\`\`\`javascript
// Axios Request Interceptor: Injects Auth Header automatically
axios.interceptors.request.use(config => {
  const token = getAuthToken();
  if (token) config.headers.Authorization = \`Bearer \${token}\`;
  return config;
});

// Axios Response Interceptor: Global 401 Unauthorized handler
axios.interceptors.response.use(
  response => response,
  error => {
    if (error.response?.status === 401) {
      redirectToLogin();
    }
    return Promise.reject(error);
  }
);
\`\`\``
  },
  {
    id: 'jst-49',
    section: 'js-theory-sai',
    number: 49,
    question: 'What is eval()?',
    answer: `The \`eval()\` function evaluates a string of JavaScript code dynamically at runtime.

\`\`\`javascript
eval("var x = 10 + 20;");
console.log(x); // 30
\`\`\`

📌 Note: **"eval is evil"**! Never use \`eval()\` in production:
1. **Severe Security Vulnerability**: Injects arbitrary code if handling user inputs (XSS).
2. **Destroys Performance**: Prevents the JS engine's TurboFan compiler from optimizing variable lookups because dynamic code can mutate lexical scopes.`
  },
  {
    id: 'jst-50',
    section: 'js-theory-sai',
    number: 50,
    question: 'Difference between Shallow copy and deep copy?',
    answer: `| Feature | Shallow Copy (\`{ ...obj }\`, \`Object.assign\`) | Deep Copy (\`structuredClone(obj)\`) |
| :--- | :--- | :--- |
| **Top-Level Properties** | Cloned to new memory | Cloned to new memory |
| **Nested Objects / Arrays** | **Shared by reference** (Mutating child mutates original!) | **Recursively cloned** to completely independent memory |

\`\`\`javascript
const original = { name: "Anirban", address: { city: "Kolkata" } };

// Shallow Copy
const shallow = { ...original };
shallow.address.city = "Bangalore";
console.log(original.address.city); // "Bangalore" (Mutated original!)

// Deep Copy (Modern native standard)
const deep = structuredClone(original);
deep.address.city = "Delhi";
console.log(original.address.city); // "Bangalore" (Protected from mutation!)
\`\`\``
  },
  {
    id: 'jst-51',
    section: 'js-theory-sai',
    number: 51,
    question: 'Difference between undeclared and undefined variables?',
    answer: `- **\`undefined\`**: A variable has been declared in the program scope, but has not yet been assigned a value.
- **Undeclared**: A variable identifier that has never been declared with \`var\`, \`let\`, or \`const\`. Accessing it throws **\`ReferenceError: x is not defined\`**.

\`\`\`javascript
let declaredVar;
console.log(declaredVar); // undefined

// console.log(neverDeclared); // Uncaught ReferenceError: neverDeclared is not defined
\`\`\``
  },
  {
    id: 'jst-52',
    section: 'js-theory-sai',
    number: 52,
    question: 'What is event bubbling?',
    answer: `**Event Bubbling** is the DOM event propagation phase where an event triggers on the deepest target element first, and then successively bubbles **upwards** through all ancestor elements in the DOM hierarchy to the \`window\`.

\`\`\`javascript
// Child click triggers parent listeners by default:
document.getElementById("childBtn").addEventListener("click", () => {
  console.log("Child clicked");
});

document.getElementById("parentContainer").addEventListener("click", () => {
  console.log("Parent bubbled");
});
// Clicking button outputs: "Child clicked" -> "Parent bubbled"

// Prevent bubbling:
// e.stopPropagation();
\`\`\``
  },
  {
    id: 'jst-53',
    section: 'js-theory-sai',
    number: 53,
    question: 'What is event capturing?',
    answer: `**Event Capturing (Trickling)** is the initial DOM event propagation phase where the event travels **downwards** from the \`window\` root through ancestor nodes until reaching the target element.

\`\`\`javascript
// Enable capturing by passing { capture: true } as the 3rd argument:
document.getElementById("parent").addEventListener("click", () => {
  console.log("Parent captured first!");
}, { capture: true });
\`\`\``
  },
  {
    id: 'jst-54',
    section: 'js-theory-sai',
    number: 54,
    question: 'Various array methods in javascript?',
    answer: `Essential \`Array.prototype\` methods categorized by mutation behavior:

1. **Mutating Methods**: \`push()\`, \`pop()\`, \`shift()\`, \`unshift()\`, \`splice()\`, \`sort()\`, \`reverse()\`, \`fill()\`.
2. **Pure / Non-Mutating Methods**: \`map()\`, \`filter()\`, \`reduce()\`, \`slice()\`, \`concat()\`, \`flat()\`, \`flatMap()\`.
3. **Search & Inspection**: \`find()\`, \`findIndex()\`, \`includes()\`, \`indexOf()\`, \`some()\`, \`every()\`.
4. **Modern ES2023 Non-Mutating Alternatives**: \`toSorted()\`, \`toReversed()\`, \`toSpliced()\`, \`with()\`.`
  },
  {
    id: 'jst-55',
    section: 'js-theory-sai',
    number: 55,
    question: 'Differences between some and every in javascript?',
    answer: `| Method | Returns \`true\` If... | Short-Circuits On |
| :--- | :--- | :--- |
| **\`some()\`** | **At least one** element passes the test | First \`true\` element |
| **\`every()\`** | **ALL** elements pass the test | First \`false\` element |

\`\`\`javascript
const scores = [85, 92, 45, 78];

console.log(scores.some(s => s < 50));  // true (At least one failing score exists)
console.log(scores.every(s => s >= 50)); // false (Not all scores are passing)
\`\`\``
  },
  {
    id: 'jst-56',
    section: 'js-theory-sai',
    number: 56,
    question: 'What are the different types of errors in javascript?',
    answer: `Standard built-in error types inheriting from \`Error.prototype\`:

1. **\`SyntaxError\`**: Code fails grammar parsing (e.g. mismatched brackets).
2. **\`ReferenceError\`**: Accessing non-existent variable or accessing a variable in TDZ.
3. **\`TypeError\`**: Value is not of expected type (e.g. \`null.foo\`, invoking non-function).
4. **\`RangeError\`**: Value outside allowed numeric range (e.g. \`new Array(-1)\`, max call stack recursion).
5. **\`URIError\`**: Malformed parameters passed to \`encodeURI()\` or \`decodeURI()\`.`
  },
  {
    id: 'jst-57',
    section: 'js-theory-sai',
    number: 57,
    question: 'What is tree shaking in javascript?',
    answer: `**Tree Shaking** is a dead-code elimination optimization performed by modern module bundlers (Vite, Rollup, Webpack) that strips away unused exports from the final production bundle.

### How it Works:
- Relies strictly on the static structure of **ES6 Modules** (\`import\` and \`export\`).
- If a utility library exports 100 functions, but your application only imports 1, the other 99 functions are omitted from the bundle, drastically reducing asset size.`
  },
  {
    id: 'jst-58',
    section: 'js-theory-sai',
    number: 58,
    question: 'What is prototype inheritance in javascript?',
    answer: `Prototypal inheritance is the process by which a child object delegates property lookups to a parent prototype object via its internal \`[[Prototype]]\` link:

\`\`\`javascript
const animal = {
  isAlive: true,
  eat() { return "Consuming calories"; }
};

const dog = Object.create(animal);
dog.bark = function() { return "Woof!"; };

console.log(dog.isAlive); // true (Inherited via prototype chain)
\`\`\``
  },
  {
    id: 'jst-59',
    section: 'js-theory-sai',
    number: 59,
    question: 'Differences between fetch and axios?',
    answer: `| Feature | Native \`fetch()\` | \`axios\` Library |
| :--- | :--- | :--- |
| **Installation** | Built-in browser API (Zero bundle size) | 3rd-party npm package |
| **HTTP Error Handling** | Rejects **only** on network failure (404/500 resolve as ok=false) | Rejects automatically on status $\\ge 400$ |
| **JSON Serialization** | Manual (\`await res.json()\`) | **Automatic JSON parsing & serialization** |
| **Interceptors** | ❌ None natively (requires manual wrapper) | ✅ Built-in request/response interceptors |
| **Upload Progress** | Limited | Native upload progress events |`
  },
  {
    id: 'jst-60',
    section: 'js-theory-sai',
    number: 60,
    question: 'What are DRY, KISS, YAGNI, SOLID Principles?',
    answer: `Foundational software engineering design principles:

- **DRY (Don't Repeat Yourself)**: Eliminate duplicate logic through reusable abstractions.
- **KISS (Keep It Simple, Stupid)**: Favor simple, clear implementations over premature complexity.
- **YAGNI (You Aren't Gonna Need It)**: Do not implement features until they are actually required.
- **SOLID**:
  - **S**: Single Responsibility Principle
  - **O**: Open/Closed Principle
  - **L**: Liskov Substitution Principle
  - **I**: Interface Segregation Principle
  - **D**: Dependency Inversion Principle`
  },
  {
    id: 'jst-61',
    section: 'js-theory-sai',
    number: 61,
    question: 'What is Babel?',
    answer: `**Babel** is a JavaScript transpiler compiler that converts modern ECMAScript (ES2020+, JSX, TypeScript) into backwards-compatible JavaScript syntax executable in legacy browser environments.`
  },
  {
    id: 'jst-62',
    section: 'js-theory-sai',
    number: 62,
    question: 'Main advantages of arrow functions?',
    answer: `1. **Lexical \`this\` Binding**: Solves the classic problem of \`this\` rebinding in callbacks.
2. **Concise Syntax**: One-line implicit returns (\`x => x * 2\`).
3. **No \`arguments\` Boilerplate**: Encourages clean rest parameters.`
  },
  {
    id: 'jst-63',
    section: 'js-theory-sai',
    number: 63,
    question: 'What is clearInterval in javascript?',
    answer: `\`clearInterval(timerId)\` stops the recurring timer instantiated by \`setInterval()\`, freeing memory resources and preventing background leaks.`
  },
  {
    id: 'jst-64',
    section: 'js-theory-sai',
    number: 64,
    question: 'What are webworkers and give an example?',
    answer: `A **Web Worker** allows running CPU-intensive JavaScript scripts in background OS threads separated from the main execution thread, preventing UI freezing.

\`\`\`javascript
// main.js
const worker = new Worker('worker.js');
worker.postMessage({ number: 40 });

worker.onmessage = (e) => {
  console.log("Calculated Fibonacci:", e.data);
};

// worker.js
self.onmessage = (e) => {
  const result = fibonacci(e.data.number);
  self.postMessage(result);
};
\`\`\``
  },
  {
    id: 'jst-65',
    section: 'js-theory-sai',
    number: 65,
    question: 'Differences between ^ and ~ symbol in package.json?',
    answer: `Semantic Versioning (SemVer: \`MAJOR.MINOR.PATCH\`):

- **\`^1.2.3\` (Caret)**: Updates **Minor** and **Patch** versions (\`>= 1.2.3 < 2.0.0\`).
- **\`~1.2.3\` (Tilde)**: Updates **Patch** versions only (\`>= 1.2.3 < 1.3.0\`).`
  },
  {
    id: 'jst-66',
    section: 'js-theory-sai',
    number: 66,
    question: 'Plain javascript basic questions: change style & add class',
    answer: `\`\`\`javascript
const el = document.getElementById("myBox");

// Change style directly
el.style.backgroundColor = "#3b82f6";
el.style.padding = "16px";

// ClassList API (Best Practice)
el.classList.add("active");
el.classList.remove("hidden");
el.classList.toggle("selected");
\`\`\``
  },
  {
    id: 'jst-67',
    section: 'js-theory-sai',
    number: 67,
    question: 'Is javascript synchronous or asynchronous and single threaded or multithreaded?',
    answer: `JavaScript is fundamentally a **single-threaded, synchronous language** with a single Call Stack. However, it achieves **non-blocking asynchronous behavior** via the browser/Node.js host environment using Web APIs, the Task Queues, and the **Event Loop**.`
  }
];
