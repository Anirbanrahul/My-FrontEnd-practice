// Frontend Interview Bible - Complete Master Q&A Dataset (JS Conceptual Section)

export const JS_CONCEPTUAL_QUESTIONS = [
  {
    id: 'jsc-1',
    section: 'js-conceptual',
    number: 1,
    question: 'Explain what is Javascript?',
    answer: `**JavaScript (JS)** is a high-level, just-in-time (JIT) compiled, multi-paradigm, dynamic programming language conforming to the **ECMAScript (ECMA-262)** standard.

### Core Architecture & Characteristics:
1. **Single-Threaded & Event-Driven**:
   - Executes instructions sequentially using a single Call Stack, while delegating asynchronous tasks (timers, network I/O, DOM events) to host environment APIs (Browser Web APIs or Node.js Libuv).
2. **Prototype-Based Object Orientation**:
   - Implements inheritance via internal prototype chains (\`[[Prototype]]\`) rather than rigid class structures (ES6 classes are syntactic sugar over prototypal delegation).
3. **First-Class Functions**:
   - Functions are treated as first-class citizens: they can be assigned to variables, passed as arguments, returned from other functions, and carry properties.
4. **Dynamic Typing**:
   - Variables are not bound to a fixed type; types are associated with values at runtime.

\`\`\`javascript
// Multi-paradigm demonstration: Functional + Object-Oriented
const createCounter = (initialCount = 0) => {
  let count = initialCount; // Encapsulated private state via Closure
  return {
    increment: () => ++count,
    decrement: () => --count,
    getCount: () => count
  };
};

const counter = createCounter(10);
console.log(counter.increment()); // 11
console.log(counter.getCount());  // 11
\`\`\`

👉 Interview Tip: Modern JavaScript engines (like Google Chrome's **V8**) do not purely interpret JavaScript line-by-line; they use a two-tier execution pipeline: the **Ignition interpreter** converts bytecode quickly for fast startup, while the **TurboFan optimizing compiler** monitors runtime profiling data to compile hot functions directly into machine code.`
  },
  {
    id: 'jsc-2',
    section: 'js-conceptual',
    number: 2,
    question: 'Is Javascript script single threaded or multithreaded. Explain in detail.',
    answer: `The JavaScript runtime engine is fundamentally **single-threaded**, but the host execution environment (Browser or Node.js) is **multi-threaded**.

### The Two Halves of Execution:
1. **The JavaScript Engine (Single-Threaded)**:
   - Engines like V8 or JavaScriptCore possess exactly **one Call Stack** and **one Memory Heap**.
   - It can evaluate only one instruction at any given time. Synchronous CPU-intensive operations block the entire thread.

2. **The Host Environment (Multi-Threaded)**:
   - The browser provides background operating system threads for:
     - **Web APIs**: Network requests (\`fetch\`), DOM events, timers (\`setTimeout\`), indexedDB, audio.
     - **Event Loop & Task Queues**: The Event Loop constantly monitors the Call Stack. When the Call Stack is empty, it pushes completed callbacks from the **Microtask Queue** and **Macrotask Queue** onto the stack.
     - **Web Workers**: Allows spawning dedicated background OS worker threads for heavy computation without blocking the main UI thread.

\`\`\`javascript
console.log("1: Synchronous Main Thread");

// Delegated to Web API Timer thread (Non-blocking)
setTimeout(() => {
  console.log("4: Macrotask Queue Callback");
}, 0);

// Delegated to Microtask Queue (Executes before next macrotask)
Promise.resolve().then(() => {
  console.log("3: Microtask Queue Callback");
});

console.log("2: Synchronous Main Thread Complete");

// Output Order:
// 1: Synchronous Main Thread
// 2: Synchronous Main Thread Complete
// 3: Microtask Queue Callback
// 4: Macrotask Queue Callback
\`\`\`

👉 Interview Tip: Whenever an interviewer asks if JavaScript is single-threaded, distinguish between the *JS engine's single execution thread* and the *browser's multi-threaded asynchronous runtime architecture*.`
  },
  {
    id: 'jsc-3',
    section: 'js-conceptual',
    number: 3,
    question: 'How can I add Javascript in my HTML code, give me 2 possible ways.',
    answer: `JavaScript can be injected into an HTML document using **Internal Scripts** or **External Scripts**.

### 1. Internal Scripting (Embedded \`<script>\` Tag):
Directly writing JavaScript logic within the HTML markup between \`<script>\` tags:
\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
  <title>Internal Script</title>
</head>
<body>
  <h1>Internal Scripting</h1>
  <script>
    document.addEventListener("DOMContentLoaded", () => {
      console.log("DOM parsed and internal script executed!");
    });
  </script>
</body>
</html>
\`\`\`

### 2. External Script File (\`src\` Attribute):
Referencing an external \`.js\` file via the \`src\` attribute:
\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
  <title>External Script</title>
  <!-- Best Practice: External file with defer attribute -->
  <script src="/js/app.js" defer></script>
</head>
<body>
  <div id="root"></div>
</body>
</html>
\`\`\`

### Comparison:
| Criteria | Internal Script | External Script |
| :--- | :--- | :--- |
| **Caching** | ❌ Cannot be cached independently (re-downloaded with HTML) | ✅ **Cached by browser HTTP cache** across all pages |
| **Separation of Concerns** | ❌ Mixes structure and behavioral logic | ✅ Clean separation of concerns |
| **Performance** | Good for tiny critical scripts (e.g. theme initialization) | Best practice for enterprise application codebases |`
  },
  {
    id: 'jsc-4',
    section: 'js-conceptual',
    number: 4,
    question: 'Can I add a script tag in the head element?',
    answer: `**Yes**, you can add a \`<script>\` tag inside the \`<head>\` element. However, how the browser processes it depends on the attributes provided (\`async\`, \`defer\`, or plain synchronous).

\`\`\`html
<head>
  <!-- 1. PLAIN SYNCHRONOUS: Blocks HTML parsing until fetched and executed (Anti-pattern!) -->
  <script src="/js/heavy-bundle.js"></script>

  <!-- 2. DEFERRED: Fetched in parallel, executed strictly after DOM is fully constructed (Recommended) -->
  <script src="/js/app.js" defer></script>

  <!-- 3. ASYNCHRONOUS: Fetched in parallel, executed immediately when downloaded (Great for analytics) -->
  <script src="/js/analytics.js" async></script>
</head>
\`\`\`

📌 Note: Placing a plain, synchronous \`<script>\` in the \`<head>\` halts HTML tokenization and rendering, resulting in a blank white screen until the script network roundtrip completes. Always pair \`<head>\` scripts with \`defer\` or \`async\`.`
  },
  {
    id: 'jsc-5',
    section: 'js-conceptual',
    number: 5,
    question: 'Does adding script tag in head element cause any problem?',
    answer: `Adding a **plain synchronous** \`<script>\` tag in the \`<head>\` creates two severe architectural and user-experience issues:

### 1. Parser Blocking & White Screen (FOUC / High FCP):
- HTML parsers are single-threaded. When the parser hits \`<script src="app.js"></script>\`, it must **pause HTML parsing**, initiate a network request, download the script, and execute it before resuming HTML parsing.
- This delays the **First Contentful Paint (FCP)** and freezes the screen.

### 2. \`Null\` DOM Reference Errors:
- Because the script executes before the \`<body>\` has been parsed, any attempt to access or manipulate DOM elements returns \`null\` or throws a \`TypeError\`:
\`\`\`html
<head>
  <script>
    // CRASH! #btn does not exist in the DOM yet!
    const btn = document.getElementById("btn");
    btn.addEventListener("click", () => console.log("clicked")); 
    // Uncaught TypeError: Cannot read properties of null (reading 'addEventListener')
  </script>
</head>
<body>
  <button id="btn">Click Me</button>
</body>
\`\`\`

👉 Interview Tip: The modern industry solution is to place the script tag in the \`<head>\` with the \`defer\` attribute. This triggers parallel network download while guaranteeing DOM readiness prior to execution.`
  },
  {
    id: 'jsc-6',
    section: 'js-conceptual',
    number: 6,
    question: 'What are async and defer attributes?',
    answer: `Both \`async\` and \`defer\` are boolean attributes added to external \`<script>\` tags to enable **non-blocking, parallel downloading** of JavaScript files while HTML parsing continues uninterrupted.

### Comprehensive Comparison:
| Feature | Synchronous (Default) | \`async\` | \`defer\` |
| :--- | :--- | :--- | :--- |
| **Download Pipeline** | Pauses HTML parser to download | Downloads in background **concurrently** | Downloads in background **concurrently** |
| **Execution Timing** | Immediately upon download, blocks parser | Executes **immediately when downloaded**, pausing HTML parser | Executes **strictly after HTML parsing is complete** |
| **Execution Order** | Sequential | **Unordered** (First downloaded executes first!) | **Guaranteed preserved document order** |
| **DOM Ready State** | DOM not ready if in \`<head>\` | DOM may or may not be ready | DOM is guaranteed completely parsed |
| **Primary Use-Case** | Legacy scripts | Independent 3rd-party analytics (GTM, Mixpanel) | Application bundle (React, Vue, main app logic) |

\`\`\`html
<head>
  <!-- Library A must execute BEFORE App B -> USE DEFER -->
  <script src="library-a.js" defer></script>
  <script src="app-b.js" defer></script>

  <!-- Analytics has zero dependencies on other scripts -> USE ASYNC -->
  <script src="google-analytics.js" async></script>
</head>
\`\`\`

👉 Interview Tip: \`defer\` scripts always run right before the browser dispatches the \`DOMContentLoaded\` event, making \`defer\` the gold standard for modern application bundles.`
  },
  {
    id: 'jsc-7',
    section: 'js-conceptual',
    number: 7,
    question: 'Explain data types in Javascript.',
    answer: `JavaScript is dynamically typed and categorizes all values into two overarching classifications: **Primitive Data Types** (7 types) and **Reference / Non-Primitive Data Types** (Objects).

### 1. Primitive Types (Stored by Value on the Call Stack):
Primitives are immutable (their contents cannot be altered in-place):
1. **\`string\`**: Textual data enclosed in \`""\`, \`''\`, or template literals \`\` \`\` \`\`.
2. **\`number\`**: Double-precision 64-bit IEEE 754 floating-point values (includes \`NaN\` and \`Infinity\`).
3. **\`boolean\`**: Logical \`true\` or \`false\`.
4. **\`undefined\`**: Automatically assigned to declared variables that have not yet been initialized.
5. **\`null\`**: Intentional assignment of "no value" or empty object reference pointer.
6. **\`symbol\`**: Unique and immutable identifier token used primarily for object property keys.
7. **\`bigint\`**: Arbitrary-precision integer for numbers exceeding \`Number.MAX_SAFE_INTEGER\` ($2^{53} - 1$).

### 2. Reference Types (Stored by Reference on the Memory Heap):
Objects are mutable structures. Variables hold a memory pointer reference, not the actual data payload:
- **\`Object\`**, **\`Array\`**, **\`Function\`**, **\`Date\`**, **\`RegExp\`**, **\`Map\`**, **\`Set\`**, **\`WeakMap\`**, **\`WeakSet\`**.

\`\`\`javascript
// Primitives are copied by VALUE
let a = 10;
let b = a;
b = 20;
console.log(a); // 10 (Unaffected)

// Objects are copied by REFERENCE
const user1 = { name: "Alice" };
const user2 = user1;
user2.name = "Bob";
console.log(user1.name); // "Bob" (Mutated because both share the same heap memory address!)
\`\`\`

📌 Note: The infamous JavaScript quirk \`typeof null === 'object'\` is a historical bug in the original 1995 JavaScript implementation where type tags in the C engine marked objects with binary \`000\`, and \`null\` was represented as a NULL pointer (\`0x00\`).`
  },
  {
    id: 'jsc-8',
    section: 'js-conceptual',
    number: 8,
    question: 'What is hoisting? Give examples.',
    answer: `**Hoisting** is the JavaScript engine's behavior during the **Creation Phase** of an Execution Context, where variable, function, and class declarations are allocated memory before any code is executed line-by-line.

### How Different Declarations are Hoisted:
1. **Function Declarations**:
   - Fully hoisted along with their complete function body. Can be invoked before their written declaration.
2. **\`var\` Declarations**:
   - Variable name is hoisted and initialized to **\`undefined\`**.
3. **\`let\` and \`const\` Declarations**:
   - Hoisted into memory, but left **uninitialized** in the **Temporal Dead Zone (TDZ)** until the line of declaration is evaluated. Accessing them prematurely throws a \`ReferenceError\`.
4. **Function Expressions & Arrow Functions**:
   - Follow variable hoisting rules (\`var foo = () => {}\` is hoisted as \`undefined\`, attempting to invoke it throws \`TypeError: foo is not a function\`).

\`\`\`javascript
// 1. Function Declaration Hoisting: SUCCEEDS
greet(); // Output: "Hello World"
function greet() {
  console.log("Hello World");
}

// 2. 'var' Hoisting: Returns undefined
console.log(myVar); // Output: undefined
var myVar = 42;

// 3. 'let' / 'const' in TDZ: THROWS ReferenceError
console.log(myLet); // Uncaught ReferenceError: Cannot access 'myLet' before initialization
let myLet = 100;

// 4. Function Expression: THROWS TypeError
sayHi(); // Uncaught TypeError: sayHi is not a function
var sayHi = function() {
  console.log("Hi");
};
\`\`\`

👉 Interview Tip: Be precise: JavaScript does *not* physically move code to the top of your file. Hoisting is a conceptual mental model for how the engine scans declarations during memory allocation before code execution.`
  },
  {
    id: 'jsc-9',
    section: 'js-conceptual',
    number: 9,
    question: 'What is closure? Give Examples.',
    answer: `A **Closure** is the combination of a function bundled together with references to its surrounding lexical environment. A closure grants an inner function access to variables defined in its outer enclosing scope, even after that outer function has returned and its execution context has been popped off the Call Stack.

### How It Works Under the Hood:
- Normally, when a function finishes executing, its local execution context and variables are garbage collected.
- However, if an inner function retains a reference to those outer variables, the engine preserves that lexical environment scope on the **Memory Heap**.

\`\`\`javascript
// Practical Example: Private Encapsulated State (Bank Account)
function createBankAccount(initialBalance) {
  let balance = initialBalance; // Private variable enclosed in closure

  return {
    deposit(amount) {
      if (amount <= 0) throw new Error("Deposit must be positive");
      balance += amount;
      return balance;
    },
    withdraw(amount) {
      if (amount > balance) throw new Error("Insufficient funds");
      balance -= amount;
      return balance;
    },
    getBalance() {
      return balance;
    }
  };
}

const account = createBankAccount(1000);
console.log(account.deposit(500));  // 1500
console.log(account.withdraw(200)); // 1300
console.log(account.getBalance());  // 1300
console.log(account.balance);       // undefined (Cannot be accessed or modified directly!)
\`\`\`

### Common Real-World Use-Cases:
1. **Data Encapsulation & Information Hiding** (Simulating private fields before ES2022 \`#privateField\`).
2. **Function Currying & Partial Application**.
3. **Event Handlers & Callback Configuration**.
4. **Memoization / Caching Factories**.`
  },
  {
    id: 'jsc-10',
    section: 'js-conceptual',
    number: 10,
    question: 'What is stale Closure. Give Examples.',
    answer: `A **Stale Closure** occurs when a closure captures variable values from an earlier execution context, but that state changes over time while the closure continues to reference the outdated (stale) value captured at its creation.

### Classic React \`useEffect\` / \`setInterval\` Bug:
\`\`\`javascript
// In React: Stale closure trap
function CounterComponent() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    // This interval callback captures 'count' from the FIRST render (count = 0)
    const timer = setInterval(() => {
      console.log("Current Count in interval:", count);
      // BUG: count is always 0 inside this closure!
      setCount(count + 1); // Continually sets 0 + 1 = 1!
    }, 1000);

    return () => clearInterval(timer);
  }, []); // Empty dependency array -> interval never re-created
}
\`\`\`

### How to Fix Stale Closures:
1. **Functional State Updates (Best Practice)**:
   - Provide an updater callback to state setters: \`setCount(prevCount => prevCount + 1)\`.
2. **Include Dependencies in Hooks**:
   - Add \`[count]\` to the dependency array so the closure is recreated with fresh values.
3. **Mutable Refs (\`useRef\`)**:
   - Store the value in a ref object (\`countRef.current = count\`), which holds an immutable reference to a mutable property:
\`\`\`javascript
// Fix via Functional Update
const timer = setInterval(() => {
  setCount(prev => prev + 1); // Always accesses the latest state!
}, 1000);
\`\`\`

👉 Interview Tip: Whenever an interviewer asks about React hooks bugs or timer problems, stale closure is almost always the root cause.`
  },
  {
    id: 'jsc-11',
    section: 'js-conceptual',
    number: 11,
    question: 'Explain currying, it’s use case and its benefits.',
    answer: `**Currying** is a functional programming technique of decomposing a function that accepts multiple arguments into a sequence of nested unary functions that each take a single argument:
$$f(a, b, c) \\implies f(a)(b)(c)$$

### Implementation:
\`\`\`javascript
// Standard Multi-argument Function
const standardAdd = (a, b, c) => a + b + c;

// Curried Version
const curriedAdd = a => b => c => a + b + c;

console.log(curriedAdd(1)(2)(3)); // 6

// Generic Auto-Currying Function
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }
    return function(...nextArgs) {
      return curried.apply(this, args.concat(nextArgs));
    };
  };
}
\`\`\`

### Real-World Use-Case: Configurable Logging & Middleware:
\`\`\`javascript
const log = level => prefix => message => {
  console.log(\`[\${level.toUpperCase()}] [\${prefix}] \${message}\`);
};

// Create specialized pre-configured utility functions
const logError = log("error");
const logAuthError = logError("AuthService");

logAuthError("Token expired");    // [ERROR] [AuthService] Token expired
logAuthError("Invalid signature"); // [ERROR] [AuthService] Invalid signature
\`\`\`

### Key Benefits:
1. **Partial Application**: Create specialized reusable helper functions with pre-bound arguments.
2. **Function Composition**: Easily pipe and chain unary functions together.
3. **Purity & Testability**: Enforces deterministic, easily testable modular units.`
  },
  {
    id: 'jsc-12',
    section: 'js-conceptual',
    number: 12,
    question: 'What is an IIFE?',
    answer: `An **IIFE** (**Immediately Invoked Function Expression**) is a JavaScript function that executes immediately as soon as it is parsed and compiled by the JavaScript engine.

### Anatomy of an IIFE:
\`\`\`javascript
(function() {
  const privateToken = "secret_123";
  console.log("IIFE executed immediately!");
})();

// console.log(privateToken); // Uncaught ReferenceError: privateToken is not defined
\`\`\`

1. **Grouping Operator \`()\`**: Converts the function keyword from a *declaration* into an *expression*.
2. **Invocation Operator \`()\`**: Immediately executes the function expression.

### Why Developers Use IIFEs:
1. **Preventing Global Scope Pollution**:
   - In the era before ES6 modules (\`import/export\`) and \`let\`/\`const\`, any variable declared with \`var\` in a \`<script>\` leaked into the global \`window\` object. An IIFE confined variables inside a private function scope.
2. **Module Pattern**:
   - Creating isolated singleton modules with exposed public APIs.
3. **Capturing Scope in Loops** (historical fix for \`var\` in \`for\` loops).`
  },
  {
    id: 'jsc-13',
    section: 'js-conceptual',
    number: 13,
    question: 'Give 4 ways to create an IIFE.',
    answer: `An IIFE can be formed using several syntactic techniques that force the JavaScript parser to treat the \`function\` token as an expression rather than a statement:

\`\`\`javascript
// Way 1: Classical Wrapping Parentheses (Douglas Crockford style)
(function() {
  console.log("Way 1: Standard Classic IIFE");
})();

// Way 2: Internal Parentheses (Alternative Crockford style)
(function() {
  console.log("Way 2: Enclosed Invocation");
}());

// Way 3: Modern ES6 Arrow Function IIFE
(() => {
  console.log("Way 3: Modern ES6 Arrow IIFE");
})();

// Way 4: Unary Operator Prefix (!, +, -, ~)
// The unary operator forces the function declaration to evaluate as an expression
!function() {
  console.log("Way 4: Unary Negation IIFE");
}();

+function() {
  console.log("Way 4b: Unary Plus IIFE");
}();
\`\`\`

👉 Interview Tip: The unary prefix trick (\`!function(){}()\`) saves 1 byte compared to wrapping parentheses and was heavily utilized by early minification tools like UglifyJS.`
  },
  {
    id: 'jsc-14',
    section: 'js-conceptual',
    number: 14,
    question: 'What are operators in JS.',
    answer: `Operators are special syntactic symbols that perform mathematical, logical, relational, or bitwise evaluations on one or more **operands**.

### Primary Operator Categories:
1. **Arithmetic**: \`+\`, \`-\`, \`*\`, \`/\`, \`%\` (modulus), \`**\` (exponentiation), \`++\`, \`--\`.
2. **Comparison**:
   - Strict: \`===\`, \`!==\`
   - Abstract / Coercive: \`==\`, \`!=\`
   - Relational: \`>\`, \`<\`, \`>=\`, \`<=\`
3. **Logical**:
   - \`&&\` (Logical AND - short-circuits on first falsy value)
   - \`||\` (Logical OR - short-circuits on first truthy value)
   - \`!\` (Logical NOT)
4. **Nullish Coalescing (\`??\`)**:
   - Returns right-hand operand only if left operand is \`null\` or \`undefined\`.
5. **Assignment**: \`=\`, \`+=\`, \`-=\`, \`*=\`, \`&&=\`, \`||=\`, \`??=\`.
6. **Bitwise**: \`&\`, \`|\`, \`^\`, \`~\`, \`<<\`, \`>>\`, \`>>>\`.
7. **Ternary**: \`condition ? exprIfTrue : exprIfFalse\`.
8. **Unary**: \`typeof\`, \`instanceof\`, \`delete\`, \`void\`, unary \`+\` (converts to number).`
  },
  {
    id: 'jsc-15',
    section: 'js-conceptual',
    number: 15,
    question: 'How can I check data type of variables in JS.',
    answer: `Due to historic JavaScript language quirks, accurately determining data types requires selecting the correct inspection technique based on whether you are examining primitives or objects.

### The 4 Detection Methods:

\`\`\`javascript
// Method 1: 'typeof' operator (Best for Primitives)
console.log(typeof "hello");     // "string"
console.log(typeof 42);          // "number"
console.log(typeof true);        // "boolean"
console.log(typeof undefined);   // "undefined"
console.log(typeof Symbol());    // "symbol"
console.log(typeof 10n);         // "bigint"
console.log(typeof (() => {}));  // "function"
// Quirks:
console.log(typeof null);        // "object" (BUG!)
console.log(typeof [1, 2]);      // "object"

// Method 2: Array.isArray() (Best for Arrays)
console.log(Array.isArray([1, 2])); // true

// Method 3: 'instanceof' operator (Prototype Chain check)
console.log(new Date() instanceof Date); // true
console.log(/abc/ instanceof RegExp);     // true

// Method 4: Object.prototype.toString.call() (The Golden Bullet!)
// Reliably identifies ANY internal [[Class]] type tag
function getExactType(val) {
  return Object.prototype.toString.call(val).slice(8, -1).toLowerCase();
}

console.log(getExactType(null));        // "null"
console.log(getExactType([1, 2]));      // "array"
console.log(getExactType(new Date()));  // "date"
console.log(getExactType(/abc/));       // "regexp"
console.log(getExactType(new Map()));   // "map"
\`\`\`

👉 Interview Tip: Always recommend \`Object.prototype.toString.call(val)\` when an interviewer asks how to reliably differentiate between \`null\`, \`array\`, \`date\`, and regular objects.`
  },
  {
    id: 'jsc-16',
    section: 'js-conceptual',
    number: 16,
    question: 'Explain Abstract Equality in Javascript (==).',
    answer: `The **Abstract Equality Operator (\`==\`)** compares two operands for equality by performing **implicit type coercion** according to the ECMAScript *IsLooselyEqual* specification if the operands are of different data types.

### ECMAScript Abstract Equality Coercion Algorithm:
1. **Same Type**: If operands share identical types, compare strictly (\`===\`).
2. **\`null\` and \`undefined\`**: \`null == undefined\` evaluates to **\`true\`**. Neither coerces to anything else.
3. **Number and String**: If comparing \`Number == String\`, the string is converted to a number via \`ToNumber(string)\`.
4. **Boolean Comparisons**: If one operand is a boolean, convert the boolean to a number (\`true \\to 1\`, \`false \\to 0\`) and re-compare.
5. **Object and Primitive**: If comparing an object to a primitive, convert the object to a primitive via \`ToPrimitive(object)\` (invoking \`[Symbol.toPrimitive]()\`, \`valueOf()\`, then \`toString()\`).

\`\`\`javascript
console.log("42" == 42);          // true ("42" -> 42)
console.log(true == 1);           // true (true -> 1)
console.log(false == 0);          // true (false -> 0)
console.log(null == undefined);   // true (Special rule)
console.log(null == 0);           // false (null only equals undefined with ==)
console.log([10] == 10);          // true ([10].toString() -> "10" -> 10)
console.log([] == 0);             // true ([].toString() -> "" -> 0)
console.log([] == ![]);           // true (![] is false -> [] == false -> "" == 0 -> 0 == 0)
\`\`\`

📌 Note: Because of these complex, error-prone implicit conversion rules, production code guidelines (like ESLint \`eqeqeq\`) universally enforce using strict equality (\`===\`).`
  },
  {
    id: 'jsc-17',
    section: 'js-conceptual',
    number: 17,
    question: 'How == is different from ===.',
    answer: `The fundamental difference between \`==\` (Loose Equality) and \`===\` (Strict Equality) is that **\`===\` does not perform type coercion**.

### Comparison Breakdown:
| Feature | Abstract Equality (\`==\`) | Strict Equality (\`===\`) |
| :--- | :--- | :--- |
| **Type Check** | Coerces mismatched types before comparison | **Fails immediately** if types differ |
| **Performance** | Slightly slower due to coercion evaluation | Faster (immediate type check) |
| **Predictability** | Prone to bizarre edge cases (\`"" == false\`) | Deterministic and safe |

\`\`\`javascript
console.log(5 === "5");         // false (number vs string)
console.log(5 == "5");          // true ("5" coerced to 5)

console.log(null === undefined);// false (types differ)
console.log(null == undefined); // true

console.log(0 === false);       // false
console.log(0 == false);        // true (false coerced to 0)

// Objects are compared by REFERENCE in both == and ===
const a = { id: 1 };
const b = { id: 1 };
console.log(a === b); // false (Different memory addresses)
console.log(a == b);  // false
\`\`\`

👉 Interview Tip: The only standard acceptable use-case for \`==\` in modern JavaScript is checking for both \`null\` and \`undefined\` simultaneously: \`if (val == null)\`, which checks if \`val\` is either \`null\` or \`undefined\` in one concise check.`
  },
  {
    id: 'jsc-18',
    section: 'js-conceptual',
    number: 18,
    question: 'Explain Execution Context.',
    answer: `An **Execution Context (EC)** is the internal abstract environment created by the JavaScript engine to evaluate and execute code. It contains the code currently running and everything assisting in its execution.

### Types of Execution Context:
1. **Global Execution Context (GEC)**:
   - Created when the script first loads.
   - Sets up the global object (\`window\` in browsers, \`global\` in Node.js) and binds \`this\` to it.
2. **Function Execution Context (FEC)**:
   - Created anew every time a function is invoked.
3. **Eval Execution Context**:
   - Created when code runs inside \`eval()\`.

### The 2 Internal Execution Phases:
Each Execution Context runs in two sequential phases:

1. **Memory Creation Phase (Compile / Hoisting Phase)**:
   - Scans the code.
   - Allocates memory for variables and functions.
   - Binds function declarations to memory; sets \`var\` to \`undefined\`; leaves \`let\` and \`const\` in the Temporal Dead Zone (TDZ).
   - Establishes the **Scope Chain** and determines the value of \`this\`.

2. **Code Execution Phase**:
   - Runs code sequentially line-by-line.
   - Assigns actual values to variables and invokes function calls.

\`\`\`javascript
var x = 10;
function multiply(n) {
  var result = n * 2;
  return result;
}
var y = multiply(x);

// Step 1 (Creation Phase):
// Memory: x -> undefined, multiply -> function body, y -> undefined
// Step 2 (Execution Phase):
// x = 10;
// multiply(10) pushes a new Function Execution Context onto Call Stack.
// Inside FEC: n = 10, result = 20 -> returns 20. FEC popped off stack.
// y = 20.
\`\`\``
  },
  {
    id: 'jsc-19',
    section: 'js-conceptual',
    number: 19,
    question: 'What is Lexical Scope.',
    answer: `**Lexical Scope** (also known as Static Scope) means that the accessibility and resolution of variables is determined strictly by the **physical placement and nesting of functions and blocks in the source code at author time**, not where or how functions are called at runtime.

### How the Scope Chain Resolves:
- When a variable is referenced inside an inner function:
  1. The engine checks the **Current Function Scope**.
  2. If not found, it traverses upward to the **Enclosing Parent Scope**.
  3. This continues up the **Scope Chain** until it reaches the **Global Scope**.
  4. If the variable is still not found in the global scope, it throws an \`Uncaught ReferenceError\`.

\`\`\`javascript
const globalVar = "I am Global";

function outer() {
  const outerVar = "I am Outer";

  function inner() {
    const innerVar = "I am Inner";
    // Can access all 3 variables because of lexical nesting!
    console.log(innerVar);  // Found in local scope
    console.log(outerVar);  // Found in parent lexical scope
    console.log(globalVar); // Found in global scope
  }

  inner();
}

outer();
\`\`\`

👉 Interview Tip: Highlight that JavaScript is *lexically scoped*, unlike dynamically scoped languages (such as Bash) where variable resolution depends on the function call site.`
  },
  {
    id: 'jsc-20',
    section: 'js-conceptual',
    number: 20,
    question: 'Explain this keyword.',
    answer: `In JavaScript, the \`this\` keyword is an execution context reference that points to the object currently executing the function. Unlike lexically scoped variables, \`this\` is dynamically bound at runtime based on **how and where the function is invoked (the Call-Site)**.

### The 4 Rules of \`this\` Binding:

1. **Default Binding (Direct Function Call)**:
   - In non-strict mode: points to the global object (\`window\`).
   - In strict mode (\`"use strict"\`): points to \`undefined\`.
\`\`\`javascript
function show() { console.log(this); }
show(); // window (or undefined in strict mode)
\`\`\`

2. **Implicit Binding (Invoked as an Object Method)**:
   - Points to the object to the left of the dot at invocation time.
\`\`\`javascript
const user = {
  name: "Sarah",
  getName() { console.log(this.name); }
};
user.getName(); // "Sarah" (this -> user)
\`\`\`

3. **Explicit Binding (\`call\`, \`apply\`, \`bind\`)**:
   - Explicitly dictates what \`this\` should point to.
\`\`\`javascript
function greet() { console.log(this.title); }
greet.call({ title: "Lead Architect" }); // "Lead Architect"
\`\`\`

4. **\`new\` Binding (Constructor Call)**:
   - Binds \`this\` to the brand new instance object created by the \`new\` keyword.

### Special Case: Arrow Functions:
- Arrow functions **do not have their own \`this\`**. They lexically inherit \`this\` from their enclosing lexical context at definition time.`
  },
  {
    id: 'jsc-21',
    section: 'js-conceptual',
    number: 21,
    question: 'What is call bind and apply?',
    answer: `\`call\`, \`apply\`, and \`bind\` are methods located on \`Function.prototype\` used to explicitly control and override the \`this\` context of a function.

### Method Comparison:
| Method | Invocation | Arguments Passing | Return Value |
| :--- | :--- | :--- | :--- |
| **\`call()\`** | **Invokes immediately** | Comma-separated list: \`fn.call(ctx, arg1, arg2)\` | Result of function |
| **\`apply()\`** | **Invokes immediately** | Array or array-like: \`fn.apply(ctx, [arg1, arg2])\` | Result of function |
| **\`bind()\`** | **Does NOT invoke** | Comma-separated list: \`fn.bind(ctx, arg1)\` | **New permanently bound function** |

\`\`\`javascript
const engineer = { name: "Anirban" };

function introduce(skill1, skill2) {
  console.log(\`Hi, I am \${this.name}. I specialize in \${skill1} and \${skill2}.\`);
}

// 1. call: arguments passed individually
introduce.call(engineer, "React", "TypeScript");
// Output: Hi, I am Anirban. I specialize in React and TypeScript.

// 2. apply: arguments passed as an array
introduce.apply(engineer, ["Node.js", "Docker"]);
// Output: Hi, I am Anirban. I specialize in Node.js and Docker.

// 3. bind: returns a new function with locked context (Currying / Callbacks)
const boundIntro = introduce.bind(engineer, "Next.js");
boundIntro("GraphQL");
// Output: Hi, I am Anirban. I specialize in Next.js and GraphQL.
\`\`\`

👉 Interview Tip: A handy mnemonic to remember: **C**all takes **C**ommas; **A**pply takes **A**rrays; **B**ind returns a **B**ound function.`
  },
  {
    id: 'jsc-22',
    section: 'js-conceptual',
    number: 22,
    question: 'Explain what is the new Keyword.',
    answer: `The \`new\` operator instantiates a new object from a constructor function or ES6 class.

### The 4 Steps Executed by the \`new\` Operator:
1. **Creates a Fresh Empty Object**: An empty plain JavaScript object \`{}\` is allocated in heap memory.
2. **Links the Prototype**: Sets the internal \`[[Prototype]]\` (\`__proto__\`) of the new object to the constructor function's \`prototype\` property.
3. **Binds \`this\` and Executes**: Invokes the constructor function with the newly created object bound as \`this\`.
4. **Returns the Object**:
   - If the constructor returns an explicit non-primitive object, that object is returned.
   - Otherwise, the newly created object is returned automatically.

\`\`\`javascript
// Step-by-Step Polyfill Simulation of 'new'
function customNew(Constructor, ...args) {
  // Step 1 & 2: Create object and link prototype
  const instance = Object.create(Constructor.prototype);

  // Step 3: Execute constructor with instance bound to 'this'
  const result = Constructor.apply(instance, args);

  // Step 4: Return instance unless constructor returned an object
  return (typeof result === "object" && result !== null) ? result : instance;
}

function Developer(name, role) {
  this.name = name;
  this.role = role;
}
Developer.prototype.code = function() {
  return \`\${this.name} is writing clean code.\`;
};

const dev = customNew(Developer, "Devin", "Frontend Specialist");
console.log(dev.name);          // "Devin"
console.log(dev.code());        // "Devin is writing clean code."
console.log(dev instanceof Developer); // true
\`\`\``
  },
  {
    id: 'jsc-23',
    section: 'js-conceptual',
    number: 23,
    question: 'What are prototypes in JS?',
    answer: `In JavaScript, **Prototypes** are the foundational mechanism by which objects inherit properties, methods, and behaviors from other objects.

### The Prototype Mechanism:
- Every object in JavaScript has an internal link to another object called its **prototype** (referenced internally via \`[[Prototype]]\` or accessible via \`Object.getPrototypeOf(obj)\`).
- When attempting to access a property on an object (e.g. \`obj.toString()\`), the JavaScript engine:
  1. Checks if the property exists on the object directly (**Own Property**).
  2. If not found, looks up its prototype (\`obj.__proto__\`).
  3. Continues ascending through the **Prototype Chain** until it reaches the root: \`Object.prototype\`.
  4. If not found at the root, \`Object.prototype.__proto__\` is \`null\`, and \`undefined\` is returned.

\`\`\`javascript
const vehicle = {
  hasWheels: true,
  drive() { return "Moving forward..."; }
};

// Create car object inheriting from vehicle prototype
const car = Object.create(vehicle);
car.doors = 4;

console.log(car.doors);     // 4 (Own property)
console.log(car.hasWheels);  // true (Inherited from vehicle prototype)
console.log(car.drive());    // "Moving forward..." (Inherited from vehicle prototype)

// Property shadowing:
car.hasWheels = false;
console.log(car.hasWheels);     // false (Shadows prototype property)
console.log(vehicle.hasWheels); // true (Original prototype untouched)
\`\`\`

👉 Interview Tip: Prototypes save memory: rather than copying identical utility methods across thousands of object instances, methods are defined once on the prototype object and shared via prototype delegation.`
  },
  {
    id: 'jsc-24',
    section: 'js-conceptual',
    number: 24,
    question: 'Explain difference between __proto__, prototype, [[prototype]].',
    answer: `These three terms represent different views of the JavaScript prototypal inheritance mechanism:

### 1. \`[[Prototype]]\` (Internal Engine Slot):
- The internal, hidden specification reference that every JavaScript object holds pointing to its prototype object.
- Not directly accessible in code; inspected via \`Object.getPrototypeOf(obj)\` and \`Object.setPrototypeOf(obj, newProto)\`.

### 2. \`__proto__\` (Accessor Property):
- A legacy getter/setter exposed on \`Object.prototype\` that exposes the hidden \`[[Prototype]]\` slot.
- Exists in web browsers for historical debugging compatibility, but deprecated in modern production code in favor of \`Object.getPrototypeOf()\`.

### 3. \`prototype\` (Constructor Property):
- A property that exists **only on functions** (specifically constructor functions and ES6 classes; arrow functions do not have it).
- It serves as the blueprint object that will become the \`[[Prototype]]\` of all instances instantiated using \`new FunctionName()\`.

\`\`\`javascript
function Person(name) {
  this.name = name;
}

Person.prototype.sayHi = function() { console.log("Hi"); };

const p1 = new Person("Alex");

// The relationship:
console.log(p1.__proto__ === Person.prototype); // true
console.log(Object.getPrototypeOf(p1) === Person.prototype); // true

// Functions have .prototype; plain instances do NOT:
console.log(Person.prototype); // { sayHi: [Function], constructor: Person }
console.log(p1.prototype);     // undefined (p1 is an instance, not a constructor!)
\`\`\``
  },
  {
    id: 'jsc-25',
    section: 'js-conceptual',
    number: 25,
    question: 'What is prototypical inheritance? How it is different from classical inheritance.',
    answer: `JavaScript implements **Prototypal Inheritance**, which is fundamentally different from the **Classical Inheritance** found in languages like Java or C++.

### Prototypal vs Classical Inheritance:
| Feature | Classical Inheritance (Java / C++) | Prototypal Inheritance (JavaScript) |
| :--- | :--- | :--- |
| **Model** | Class-based blueprint model | Object-to-Object delegation model |
| **Creation** | Classes define types; objects are instantiated copies | Objects link directly to other live objects |
| **Flexibility** | Rigid, compile-time hierarchical inheritance | Dynamic at runtime (prototypes can be augmented or swapped live) |
| **Memory** | Properties and methods are copied to instances | Methods are delegated through memory links without copying |

\`\`\`javascript
// Prototypal Inheritance using pure objects (Object.create)
const human = {
  species: "Homo sapiens",
  breathe() { return "Breathing oxygen..."; }
};

const developer = Object.create(human);
developer.role = "Frontend Engineer";

console.log(developer.species); // "Homo sapiens" (Delegated to human)
console.log(developer.breathe()); // "Breathing oxygen..."
\`\`\`

📌 Note: The ES6 \`class\` and \`extends\` keywords in JavaScript do **not** introduce a classical inheritance engine; they are purely syntactic sugar over existing prototypal inheritance.`
  },
  {
    id: 'jsc-26',
    section: 'js-conceptual',
    number: 26,
    question: 'What is the difference between var, let and const?',
    answer: `ES6 introduced \`let\` and \`const\` to address historical scoping and mutability bugs associated with \`var\`.

### Detailed Comparison Matrix:
| Feature | \`var\` | \`let\` | \`const\` |
| :--- | :--- | :--- | :--- |
| **Scope** | **Function Scoped** (ignores \`if/for\` blocks) | **Block Scoped** (\`{ ... }\`) | **Block Scoped** (\`{ ... }\`) |
| **Hoisting** | Hoisted and initialized to **\`undefined\`** | Hoisted into **Temporal Dead Zone (TDZ)** | Hoisted into **Temporal Dead Zone (TDZ)** |
| **Re-declaration** | ✅ Allowed in same scope | ❌ Throws \`SyntaxError\` | ❌ Throws \`SyntaxError\` |
| **Re-assignment** | ✅ Allowed | ✅ Allowed | ❌ Throws \`TypeError\` |
| **Window Property** | Attaches to \`window.variableName\` | ❌ Does not attach to \`window\` | ❌ Does not attach to \`window\` |

\`\`\`javascript
// 1. Scope demonstration
if (true) {
  var globalPollution = "I escape blocks!";
  let blockScoped = "I am trapped in this block!";
}
console.log(globalPollution); // "I escape blocks!"
// console.log(blockScoped);  // Uncaught ReferenceError: blockScoped is not defined

// 2. const immutability nuance:
// const prevents REASSIGNMENT of the variable identifier; it does NOT make objects immutable!
const user = { name: "John" };
user.name = "Jonathan"; // ✅ Allowed (Object mutation)
console.log(user.name); // "Jonathan"
// user = { name: "Bob" }; // ❌ Uncaught TypeError: Assignment to constant variable.
\`\`\`

👉 Interview Tip: To make an object genuinely immutable in JavaScript, combine \`const\` with \`Object.freeze(obj)\` or deep cloning utilities.`
  },
  {
    id: 'jsc-27',
    section: 'js-conceptual',
    number: 27,
    question: 'What are Symbols in JS?',
    answer: `Introduced in ES6, **Symbol** is a primitive data type used to create **guaranteed unique and immutable identifiers**.

### Key Characteristics:
- Every \`Symbol()\` call returns a unique symbol, even if created with the same description.
- Cannot be coerced to strings automatically (must use \`String(sym)\` or \`sym.toString()\`).
- Symbol object keys are non-enumerable in standard \`for...in\` loops and \`Object.keys()\`.

\`\`\`javascript
const sym1 = Symbol("userId");
const sym2 = Symbol("userId");
console.log(sym1 === sym2); // false (Guaranteed unique!)

// Use-Case 1: Collision-free object property keys
const user = {
  name: "Alice",
  [sym1]: 98765 // Hidden metadata key
};

console.log(user[sym1]); // 98765
console.log(Object.keys(user)); // ["name"] (Symbol key is omitted!)
console.log(Object.getOwnPropertySymbols(user)); // [ Symbol(userId) ]

// Use-Case 2: Well-Known Symbols (Customizing Engine Behaviors)
class CustomCollection {
  constructor(...items) { this.items = items; }
  // Customize iteration behavior for 'for...of'
  *[Symbol.iterator]() {
    for (const item of this.items) yield item;
  }
}

const col = new CustomCollection("A", "B", "C");
for (const item of col) {
  console.log(item); // Prints A, B, C
}
\`\`\``
  },
  {
    id: 'jsc-28',
    section: 'js-conceptual',
    number: 28,
    question: 'What is the spread and rest concept in JS.',
    answer: `Both **Spread** and **Rest** use the identical three-dots syntax (\`...\`), but perform inverse operations based on context.

### 1. The Spread Operator (\`...iterable\`):
- **Expands** an iterable (array, string, object) into individual elements.
- Used in array literals, function calls, and object cloning.
\`\`\`javascript
// Array expansion and merging
const nums = [1, 2, 3];
const combined = [...nums, 4, 5]; // [1, 2, 3, 4, 5]

// Function call argument spreading
Math.max(...nums); // Equivalent to Math.max(1, 2, 3) -> 3

// Shallow Object Copy
const user = { name: "Dan", age: 30 };
const updated = { ...user, age: 31, role: "Admin" };
\`\`\`

### 2. The Rest Parameter (\`...args\`):
- **Condenses** multiple trailing elements into a single cohesive array.
- Used in function parameter lists and destructuring assignments.
\`\`\`javascript
// Gathers unlimited arguments into an array
function sum(...numbers) {
  return numbers.reduce((total, n) => total + n, 0);
}
console.log(sum(10, 20, 30)); // 60

// Destructuring Rest
const [first, second, ...remaining] = [1, 2, 3, 4, 5];
console.log(first);     // 1
console.log(remaining); // [3, 4, 5]
\`\`\`

👉 Interview Tip: The Rest parameter must **always** be the last parameter in a function signature or destructuring pattern (e.g. \`function(a, ...rest)\` is valid; \`function(...rest, b)\` throws a \`SyntaxError\`).`
  },
  {
    id: 'jsc-29',
    section: 'js-conceptual',
    number: 29,
    question: 'Explain destructuring.',
    answer: `**Destructuring Assignment** is an ES6 syntax feature that allows unpacking properties from objects or values from arrays directly into distinct variables with concise, declarative syntax.

### 1. Object Destructuring:
\`\`\`javascript
const employee = {
  id: 101,
  fullName: "Priya Sharma",
  department: { title: "Architecture", floor: 3 }
};

// Renaming, default values, and nested destructuring
const {
  fullName: name, // Rename fullName to name
  salary = 95000, // Default fallback if undefined
  department: { title } // Deeply nested extraction
} = employee;

console.log(name);   // "Priya Sharma"
console.log(salary); // 95000
console.log(title);  // "Architecture"
\`\`\`

### 2. Array Destructuring:
\`\`\`javascript
const coordinates = [40.7128, -74.0060, 10];

// Skipping elements and rest gathering
const [lat, lng, , precision = 1] = coordinates;
console.log(lat, lng); // 40.7128, -74.0060

// Value swapping without a temporary third variable!
let a = 1, b = 2;
[a, b] = [b, a];
console.log(a, b); // 2, 1
\`\`\``
  },
  {
    id: 'jsc-30',
    section: 'js-conceptual',
    number: 30,
    question: 'Explain difference between || and ??.',
    answer: `Both \`||\` (Logical OR) and \`??\` (Nullish Coalescing) provide default fallback values, but they evaluate what constitutes a "missing" value differently.

### Comparison:
| Operator | Condition to trigger fallback | Treats \`0\`, \`""\`, \`false\` as missing? |
| :--- | :--- | :--- |
| **Logical OR (\`\|\|\`)** | Any **Falsy** value (\`false\`, \`0\`, \`""\`, \`null\`, \`undefined\`, \`NaN\`) | **YES** (Overwrites legitimate \`0\` or \`""\`!) |
| **Nullish Coalescing (\`??\`)** | Strictly **Nullish** values (\`null\` or \`undefined\` only) | **NO** (Preserves legitimate \`0\`, \`""\`, \`false\`) |

\`\`\`javascript
// Scenario: A user setting with quantity 0 or empty string name
const userSettings = {
  volume: 0,
  username: "",
  notificationsEnabled: false,
  bio: null
};

// Using || (BUG: Overwrites 0 and "")
console.log(userSettings.volume || 50);             // 50 (BUG! Volume 0 is muted, not 50!)
console.log(userSettings.username || "Anonymous");   // "Anonymous" (BUG! Overwrites empty name)
console.log(userSettings.notificationsEnabled || true); // true (BUG!)

// Using ?? (Correctly respects 0, "", false)
console.log(userSettings.volume ?? 50);             // 0 (Correct!)
console.log(userSettings.username ?? "Anonymous");   // "" (Correct!)
console.log(userSettings.notificationsEnabled ?? true); // false (Correct!)
console.log(userSettings.bio ?? "No bio provided"); // "No bio provided" (Triggered because null)
\`\`\`

👉 Interview Tip: Whenever configuring numerical thresholds, scores, counts, or toggles, always use \`??\` to prevent zero and false from being accidentally replaced by fallback values.`
  },
  {
    id: 'jsc-31',
    section: 'js-conceptual',
    number: 31,
    question: 'What is optional chaining?',
    answer: `The **Optional Chaining Operator (\`?.\`)** allows safe navigation and property reading across deeply nested object structures without throwing a \`TypeError\` if an intermediate property is \`null\` or \`undefined\`.

### Behavior:
If the reference before \`?.\` evaluates to \`null\` or \`undefined\`, expression evaluation **short-circuits immediately** and evaluates to \`undefined\`.

\`\`\`javascript
const user = {
  name: "Leo",
  address: null,
  getPreferences: null
};

// Before optional chaining (Verbose guard checking):
const cityOld = user && user.address && user.address.city;

// With optional chaining:
const city = user?.address?.city;
console.log(city); // undefined (No runtime exception thrown!)

// Optional call on functions:
user.getPreferences?.(); // Safely does nothing if function doesn't exist

// Optional indexing on arrays:
const firstItem = user.orders?.[0]?.productName;
\`\`\`

📌 Note: Optional chaining cannot be used on the left-hand side of an assignment (e.g. \`user?.address = "NY"\` throws an invalid left-hand side \`SyntaxError\`).`
  },
  {
    id: 'jsc-32',
    section: 'js-conceptual',
    number: 32,
    question: 'What is functional programming?',
    answer: `**Functional Programming (FP)** is a declarative programming paradigm where applications are structured by composing pure mathematical functions, avoiding mutable state and side effects.

### Core Tenets of Functional Programming in JavaScript:
1. **Pure Functions**:
   - Deterministic: Same input **always** yields identical output.
   - Zero Side Effects: Does not alter external variables, write to disk, or mutate global DOM state.
2. **Immutability**:
   - State is never modified in-place; changes return fresh transformed data copies.
3. **First-Class & Higher-Order Functions**:
   - Functions are treated as values that can be passed to and returned from other functions.
4. **Function Composition**:
   - Combining simple unary functions into complex operational pipelines.

\`\`\`javascript
// Imperative Approach (Mutates external state via loops)
const numbers = [1, 2, 3, 4, 5];
let imperativeSum = 0;
for (let i = 0; i < numbers.length; i++) {
  if (numbers[i] % 2 === 0) {
    imperativeSum += numbers[i] * 2;
  }
}

// Functional Programming Approach (Pure, Declarative, Immutable)
const isEven = n => n % 2 === 0;
const double = n => n * 2;
const sum = (acc, n) => acc + n;

const functionalSum = numbers
  .filter(isEven)
  .map(double)
  .reduce(sum, 0);

console.log(functionalSum); // 12
\`\`\``
  },
  {
    id: 'jsc-33',
    section: 'js-conceptual',
    number: 33,
    question: 'What is the difference between reduce and reduceRight.',
    answer: `Both \`reduce\` and \`reduceRight\` are higher-order array methods that accumulate array elements into a single aggregate value, but they traverse the array in **opposite directions**.

### Comparison:
| Method | Traversal Direction | Initial Index (No Initial Value) |
| :--- | :--- | :--- |
| **\`reduce()\`** | **Left to Right** (Index \`0\` $\\to$ \`length - 1\`) | Accumulator = \`arr[0]\`, Current = \`arr[1]\` |
| **\`reduceRight()\`** | **Right to Left** (Index \`length - 1\` $\\to$ \`0\`) | Accumulator = \`arr[last]\`, Current = \`arr[last - 1]\` |

\`\`\`javascript
const words = ["Frontend", "Engineer", "Bible"];

// reduce: Left to Right
const leftToRight = words.reduce((acc, word) => acc + " " + word);
console.log(leftToRight); // "Frontend Engineer Bible"

// reduceRight: Right to Left
const rightToLeft = words.reduceRight((acc, word) => acc + " " + word);
console.log(rightToLeft); // "Bible Engineer Frontend"

// Practical Use-Case: Function Composition (Pipe vs Compose)
// pipe evaluates left-to-right (reduce)
const pipe = (...fns) => x => fns.reduce((v, fn) => fn(v), x);

// compose evaluates right-to-left like mathematical f(g(x)) (reduceRight)
const compose = (...fns) => x => fns.reduceRight((v, fn) => fn(v), x);

const add5 = x => x + 5;
const multiply2 = x => x * 2;

console.log(pipe(add5, multiply2)(10));    // (10 + 5) * 2 = 30
console.log(compose(add5, multiply2)(10)); // (10 * 2) + 5 = 25
\`\`\``
  },
  {
    id: 'jsc-34',
    section: 'js-conceptual',
    number: 34,
    question: 'What are callbacks?',
    answer: `A **Callback Function** is a function passed as an argument into another function, designed to be executed ("called back") at a later point in time once an operation or asynchronous task finishes.

### Synchronous vs Asynchronous Callbacks:
1. **Synchronous Callbacks**:
   - Executed immediately during execution of the parent function.
   - Examples: \`Array.prototype.map\`, \`filter\`, \`forEach\`.
2. **Asynchronous Callbacks**:
   - Executed in the future after an asynchronous event (timer, I/O, network) completes.
   - Examples: \`setTimeout\`, \`addEventListener\`, \`fs.readFile\`.

\`\`\`javascript
// Asynchronous Callback Pattern
function fetchUserData(userId, onSuccess, onError) {
  setTimeout(() => {
    const database = { 1: { id: 1, name: "Marcus" } };
    const user = database[userId];
    if (user) {
      onSuccess(user);
    } else {
      onError(new Error("User not found"));
    }
  }, 500);
}

fetchUserData(
  1,
  user => console.log("User Loaded:", user.name),
  err => console.error("Error:", err.message)
);
\`\`\`

### Drawbacks of Callback-Driven Asynchrony:
- **Callback Hell (Pyramid of Doom)**: Deeply nested callbacks making code unreadable.
- **Inversion of Control**: Trusting an external API to call your callback correctly.`
  },
  {
    id: 'jsc-35',
    section: 'js-conceptual',
    number: 35,
    question: 'Explain inversion of control.',
    answer: `**Inversion of Control (IoC)** is a severe architectural vulnerability inherent in callback-based asynchronous programming where you surrender control of your program's execution flow to a third-party function or library.

### The Pitfall:
When passing a callback function into a 3rd-party utility (e.g. an analytics tracking or payment API):
- You trust that the 3rd-party API will call your callback:
  1. Not too early.
  2. Not too late.
  3. Exactly **once** (not zero times, and not multiple times!).
  4. With the expected arguments.
  5. Without swallowing errors.

\`\`\`javascript
// The Callback Inversion of Control Risk
chargeCreditCard(paymentDetails, function chargeSuccessCallback() {
  // CRITICAL BUSINESS LOGIC:
  // What happens if chargeCreditCard has a bug and calls this callback TWICE?
  // The customer is charged twice!
  trackAnalytics();
  provisionOrder();
});
\`\`\`

### The Solution: Promises Invert the Control Back:
Promises solve Inversion of Control by returning a standard, immutable trust object.
- Promises guarantee:
  1. Only one resolution (either resolved or rejected, never both).
  2. Resolution is immutable once settled.
  3. Callbacks are scheduled via the microtask queue, guaranteeing predictable asynchronous execution.`
  },
  {
    id: 'jsc-36',
    section: 'js-conceptual',
    number: 36,
    question: 'What are promises?',
    answer: `A **Promise** is a native JavaScript object representing the eventual completion (or failure) of an asynchronous operation and its resulting value.

### Promise Lifecycle & State Machine:
A Promise exists in one of three mutually exclusive states:
1. **Pending**: Initial state; neither fulfilled nor rejected.
2. **Fulfilled**: Operation succeeded; \`resolve(value)\` was called.
3. **Rejected**: Operation failed; \`reject(reason)\` was called.

Once settled (fulfilled or rejected), a Promise is **immutable**—it can never change state again.

\`\`\`javascript
function fetchProduct(productId) {
  return new Promise((resolve, reject) => {
    if (!productId) {
      return reject(new Error("Valid Product ID required"));
    }
    
    // Simulate async network request
    setTimeout(() => {
      resolve({ id: productId, name: "Mechanical Keyboard", price: 120 });
    }, 300);
  });
}

// Consuming Promises with Chaining
fetchProduct(42)
  .then(product => {
    console.log("Loaded:", product.name);
    return product.price * 1.18; // Transform & return to next .then
  })
  .then(priceWithTax => {
    console.log("Total Price with GST:", priceWithTax.toFixed(2));
  })
  .catch(error => {
    console.error("Pipeline Failed:", error.message);
  })
  .finally(() => {
    console.log("Cleanup and hide spinner");
  });
\`\`\`

👉 Interview Tip: Callbacks inside \`.then()\` and \`.catch()\` are **always** placed on the **Microtask Queue**, guaranteeing they run after current synchronous execution but before the browser renders or processes macrotasks (\`setTimeout\`).`
  },
  {
    id: 'jsc-37',
    section: 'js-conceptual',
    number: 37,
    question: 'What are the different states of promises?',
    answer: `Under the ECMAScript specification, a Promise has **3 fundamental states**:

\`\`\`mermaid
stateDiagram-v2
    [*] --> Pending
    Pending --> Fulfilled : resolve(value)
    Pending --> Rejected : reject(error)
    Fulfilled --> Settled
    Rejected --> Settled
\`\`\`

1. **\`pending\`**:
   - The default initial state when the Promise is constructed.
   - The asynchronous operation is currently in-flight.
2. **\`fulfilled\`**:
   - The asynchronous operation completed successfully.
   - Holds an immutable resolution value accessed via \`.then(value => ...)\`.
3. **\`rejected\`**:
   - The asynchronous operation encountered an error or failed.
   - Holds an immutable rejection reason accessed via \`.catch(error => ...)\`.

📌 Note: A Promise is described as **Settled** (or Resolved) once it is either fulfilled or rejected. Settling is permanent.`
  },
  {
    id: 'jsc-38',
    section: 'js-conceptual',
    number: 38,
    question: 'When does the finally block get called under promises?',
    answer: `The \`.finally(callback)\` method executes **unconditionally whenever the Promise settles**—meaning it runs regardless of whether the Promise was fulfilled or rejected.

### Key Behaviors of \`.finally()\`:
1. **Takes No Arguments**: The callback receives no parameters (it cannot inspect the fulfilled value or rejection reason).
2. **Transparent Value Passthrough**: It passes the original settled value or error through to downstream \`.then()\` or \`.catch()\` handlers.
3. **Guaranteed Execution**: Ideal for side-effect cleanups (closing database connections, dismissing loading spinners, resetting flags).

\`\`\`javascript
let isLoading = true;

fetchData()
  .then(data => {
    console.log("Data loaded successfully:", data);
  })
  .catch(err => {
    console.error("Fetch failed:", err);
  })
  .finally(() => {
    // Executes in BOTH success and failure scenarios!
    isLoading = false;
    hideLoadingSpinner();
  });
\`\`\``
  },
  {
    id: 'jsc-39',
    section: 'js-conceptual',
    number: 39,
    question: 'How can I handle errors using try catch in JS.',
    answer: `The \`try...catch\` statement marks a block of statements to attempt, and specifies a response should an exception be thrown.

### Syntax & Mechanics:
\`\`\`javascript
try {
  // Code that may throw an exception
  const result = parseServerData(invalidJsonString);
} catch (error) {
  // Executes only if an error is thrown in try block
  console.error("Error Caught:", error.name, error.message);
} finally {
  // Always executes regardless of error or return statements
  cleanupResources();
}
\`\`\`

### Critical Gotcha: Asynchronous Code Handling:
\`try...catch\` **cannot** catch asynchronous errors inside callbacks or promises unless used with \`async/await\`!

\`\`\`javascript
// ❌ FAILS: The try block finishes BEFORE setTimeout callback fires!
try {
  setTimeout(() => {
    throw new Error("Unhandled Timer Error!"); // Uncaught Exception! Crashes Node process!
  }, 100);
} catch (err) {
  console.log("Will NEVER be reached!");
}

// ✅ CORRECT: try...catch with async/await
async function loadUserData() {
  try {
    const response = await fetch("https://api.example.com/user");
    if (!response.ok) throw new Error(\`HTTP error! status: \${response.status}\`);
    const data = await response.json();
    return data;
  } catch (err) {
    console.error("Caught asynchronous error cleanly:", err.message);
  }
}
\`\`\``
  },
  {
    id: 'jsc-40',
    section: 'js-conceptual',
    number: 40,
    question: 'What is tagged template literal.',
    answer: `A **Tagged Template Literal** is an advanced form of template literal where the string literal is parsed through a tag function before evaluation.

### How It Works:
The tag function receives:
1. An array of raw string segments.
2. The evaluated expression values as subsequent arguments.

\`\`\`javascript
// Tag function: Sanitizes strings to prevent XSS attacks
function sanitize(strings, ...values) {
  return strings.reduce((acc, str, i) => {
    const val = values[i - 1];
    const sanitizedVal = typeof val === "string" 
      ? val.replace(/</g, "&lt;").replace(/>/g, "&gt;") 
      : (val ?? "");
    return acc + sanitizedVal + str;
  });
}

const maliciousInput = "<script>alert('Hacked!')</script>";
const safeHtml = sanitize\`<div>Welcome, \${maliciousInput}!</div>\`;

console.log(safeHtml);
// Output: <div>Welcome, &lt;script&gt;alert('Hacked!')&lt;/script&gt;!</div>
\`\`\`

👉 Interview Tip: Popular production libraries like **styled-components** (\`styled.div\`\`), **GraphQL** (\`gql\`\`), and **Lit** use tagged template literals to compile CSS, parse queries, and sanitize HTML.`
  },
  {
    id: 'jsc-41',
    section: 'js-conceptual',
    number: 41,
    question: 'How does this work inside the arrow function?',
    answer: `Arrow functions do **not** define their own \`this\` execution context. Instead, they capture the \`this\` value of the **enclosing lexical scope** at author/definition time.

### Lexical \`this\` Mechanics:
- Arrow functions ignore \`call()\`, \`apply()\`, and \`bind()\` attempts to rebind \`this\`.
- They solve the classic problem of \`this\` being rebound or lost inside callbacks and event handlers.

\`\`\`javascript
const timer = {
  seconds: 0,
  start() {
    // Normal function: 'this' refers to timer object here
    setInterval(() => {
      // Arrow function captures 'this' lexically from start()!
      this.seconds++;
      console.log("Elapsed:", this.seconds);
    }, 1000);
  }
};

timer.start(); // Works cleanly!

// Anti-Pattern: Using arrow functions as object methods
const user = {
  name: "Dave",
  // BUG: Lexical scope of this object literal is the global window!
  greet: () => {
    console.log(\`Hello, my name is \${this.name}\`);
  }
};
user.greet(); // Hello, my name is undefined
\`\`\`

📌 Note: Never use arrow functions for object methods that need access to the object itself or for prototype method declarations.`
  },
  {
    id: 'jsc-42',
    section: 'js-conceptual',
    number: 42,
    question: 'What is the difference between an arrow and normal function? Explain 7 Differences.',
    answer: `ES6 Arrow Functions provide concise syntax, but differ substantially from traditional function declarations across 7 foundational engine mechanics:

### 7 Key Architectural Differences:
| # | Architectural Feature | Traditional Normal Function | Modern Arrow Function |
| :--- | :--- | :--- | :--- |
| **1** | **\`this\` Binding** | **Dynamic** (bound at call-site based on invocation) | **Lexical** (inherited from enclosing scope at authoring) |
| **2** | **Constructor (\`new\`)** | ✅ Can be invoked with \`new\` to create instances | ❌ Cannot be constructor; throws \`TypeError\` |
| **3** | **\`prototype\` Property** | ✅ Possesses a \`.prototype\` property | ❌ Has **no** \`.prototype\` property |
| **4** | **\`arguments\` Object** | ✅ Exposes local \`arguments\` object | ❌ No \`arguments\` (use rest \`...args\` instead) |
| **5** | **Duplicate Parameters** | ✅ Allowed in non-strict mode (\`function(a, a)\`) | ❌ Disallowed; throws \`SyntaxError\` |
| **6** | **Generator Support** | ✅ Can be defined as a generator (\`function*\`) | ❌ Cannot use \`yield\` or be a generator |
| **7** | **Methods \`call/apply/bind\`** | ✅ Rebinds \`this\` context | ❌ Ignored; context remains lexically locked |

\`\`\`javascript
// Demonstration of Constructor & Arguments differences
function RegularFn() {
  console.log("Arguments length:", arguments.length);
}
const ArrowFn = () => {};

new RegularFn(1, 2); // Arguments length: 2
// new ArrowFn();    // Uncaught TypeError: ArrowFn is not a constructor
\`\`\``
  },
  {
    id: 'jsc-43',
    section: 'js-conceptual',
    number: 43,
    question: 'Explain Sets. How they are different from arrays.',
    answer: `A **\`Set\`** is an ES6 built-in collection of **guaranteed unique values** of any data type (both primitives and object references).

### Key Differences:
| Feature | Array (\`[]\`) | Set (\`new Set()\`) |
| :--- | :--- | :--- |
| **Uniqueness** | Allows duplicate elements | **Enforces strict uniqueness** (duplicates ignored) |
| **Order & Indexing** | Indexed by numeric keys (\`arr[0]\`) | Elements iterated in insertion order; **no numeric indexing** |
| **Lookup Performance** | \`arr.includes(x)\` is **$O(n)$ linear time** | \`set.has(x)\` is **$O(1)$ constant time** |
| **Direct Mutations** | \`push\`, \`pop\`, \`splice\` | \`add\`, \`delete\`, \`clear\`, \`has\` |

\`\`\`javascript
// 1. Deduplicating an array in 1 line
const rawArray = [1, 2, 2, 3, 4, 4, 5];
const uniqueArray = [...new Set(rawArray)];
console.log(uniqueArray); // [1, 2, 3, 4, 5]

// 2. High-Performance Lookups
const activeUserIds = new Set([101, 204, 305]);
console.log(activeUserIds.has(204)); // true - O(1) Instant Hash Lookup!
\`\`\``
  },
  {
    id: 'jsc-44',
    section: 'js-conceptual',
    number: 44,
    question: 'What are the arguments keywords present in all functions in javascript.',
    answer: `The **\`arguments\`** object is an **array-like object** accessible locally inside all standard (non-arrow) functions that contains entries for each argument passed to that function.

### Characteristics & Limitations:
- **Array-Like, but NOT an Array**: It possesses a \`.length\` property and numeric indices (\`arguments[0]\`), but lacks array methods (\`map\`, \`filter\`, \`reduce\`, \`forEach\`).
- **Not Present in Arrow Functions**: Arrow functions do not bind an \`arguments\` identifier.

\`\`\`javascript
function calculateAverage() {
  // Convert array-like object to a genuine Array:
  const args = Array.from(arguments);
  // Or: const args = [...arguments];
  
  const sum = args.reduce((acc, val) => acc + val, 0);
  return sum / arguments.length;
}

console.log(calculateAverage(10, 20, 30, 40)); // 25

// Modern Best Practice: Rest parameters supersede arguments
function modernAverage(...numbers) {
  return numbers.reduce((acc, val) => acc + val, 0) / numbers.length;
}
\`\`\``
  },
  {
    id: 'jsc-45',
    section: 'js-conceptual',
    number: 45,
    question: 'What is "use strict" and what it does.',
    answer: `The \`"use strict";\` directive enables **Strict Mode** in JavaScript, opting into a restricted variant of JavaScript that eliminates silent errors and enhances runtime performance.

### Key Behaviors Enforced by Strict Mode:
1. **Prevents Accidental Global Variables**:
   - Assigning to an undeclared variable throws a \`ReferenceError\` instead of creating a global property on \`window\`.
2. **Disallows Silent Assignment Failures**:
   - Writing to read-only properties (like \`NaN = 5;\` or frozen objects) throws a \`TypeError\`.
3. **Eliminates \`this\` Coercion**:
   - In standard functions, \`this\` remains \`undefined\` instead of coercing to the \`window\` global object.
4. **Prevents Duplicate Parameter Names**:
   - \`function sum(a, a, b)\` throws a compile-time \`SyntaxError\`.
5. **Forbids Octal Syntax & \`with\` Statements**.

\`\`\`javascript
"use strict";

// 1. Accidental Global
// leakedVar = 100; // Uncaught ReferenceError: leakedVar is not defined

// 2. Default this is undefined
function checkThis() {
  console.log(this);
}
checkThis(); // undefined (Safely prevents mutating window)
\`\`\`

👉 Interview Tip: All ES6 Modules (\`import\` / \`export\`) and class bodies automatically run in strict mode by default without needing the explicit \`"use strict"\` string directive.`
  },
  {
    id: 'jsc-46',
    section: 'js-conceptual',
    number: 46,
    question: 'How does the for...of loop differ from the for...in loop?',
    answer: `While both are iteration loops, they inspect completely different targets across objects and iterables.

### Comparison Table:
| Loop Syntax | Iterates Over | Primary Target | Skips Non-Enumerables? |
| :--- | :--- | :--- | :--- |
| **\`for...in\`** | **Enumerable Keys (Property Names)** | Plain **Objects** (\`{ key: val }\`) | Yes (Also traverses Prototype Chain!) |
| **\`for...of\`** | **Values directly** | **Iterables** (Arrays, Strings, Sets, Maps) | Follows \`[Symbol.iterator]\` |

\`\`\`javascript
const fruits = ["Apple", "Banana", "Cherry"];
fruits.customProperty = "FruitBasket";

// for...in loops over KEYS / INDICES
for (const key in fruits) {
  console.log(key); // "0", "1", "2", "customProperty" (Includes custom property!)
}

// for...of loops over VALUES
for (const val of fruits) {
  console.log(val); // "Apple", "Banana", "Cherry" (Only iterates array elements!)
}
\`\`\`

👉 Interview Tip: Never use \`for...in\` to iterate over arrays because it yields index keys as strings and will iterate over prototype properties added to \`Array.prototype\`. Use \`for...of\` for arrays and iterables.`
  },
  {
    id: 'jsc-47',
    section: 'js-conceptual',
    number: 47,
    question: 'How does the async/await syntax simplify asynchronous code in JavaScript?',
    answer: `Introduced in ES2017, **\`async/await\`** is syntactic sugar built on top of native Promises and Generators that allows asynchronous, non-blocking code to be written and read sequentially like synchronous code.

### Architectural Benefits:
1. **Eliminates Chaining Boilerplate**: Replaces nested \`.then()\` callbacks with clean linear statements.
2. **Standard Error Handling**: Allows handling both synchronous exceptions and asynchronous network failures within a single standard \`try...catch\` block.
3. **Enhanced Debugging**: Stack traces pause neatly at \`await\` expressions without losing intermediate function context.

\`\`\`javascript
// With Promises (.then chaining)
function getUserData(userId) {
  return fetch(\`/api/users/\${userId}\`)
    .then(res => res.json())
    .then(user => fetch(\`/api/orders/\${user.orderId}\`))
    .then(res => res.json())
    .catch(err => console.error(err));
}

// With async/await (Clean, Linear & Maintainable)
async function getUserDataModern(userId) {
  try {
    const userRes = await fetch(\`/api/users/\${userId}\`);
    const user = await userRes.json();
    
    const orderRes = await fetch(\`/api/orders/\${user.orderId}\`);
    const order = await orderRes.json();
    
    return { user, order };
  } catch (error) {
    console.error("Failed to load user pipeline:", error);
  }
}
\`\`\`

📌 Note: Under the hood, an \`async\` function always returns a Promise, and \`await\` pauses execution of only the current async function while yielding control back to the main event loop.`
  },
  {
    id: 'jsc-48',
    section: 'js-conceptual',
    number: 48,
    question: 'Explain the difference between map and filter.',
    answer: `Both \`map\` and \`filter\` are pure, non-mutating higher-order array methods, but they serve different transformation purposes:

### Comparison:
| Feature | \`map()\` | \`filter()\` |
| :--- | :--- | :--- |
| **Output Array Length** | **Always identical** to input array length | **Less than or equal** to input array length |
| **Callback Return Expectation** | The transformed replacement element | A boolean truthy/falsy predicate test |
| **Purpose** | **Transforms** each element into a new representation | **Extracts a subset** of elements matching a condition |

\`\`\`javascript
const numbers = [10, 15, 20, 25, 30];

// map: Transforms each number (e.g. format as currency)
const formatted = numbers.map(num => \`$\${num.toFixed(2)}\`);
console.log(formatted); // ["$10.00", "$15.00", "$20.00", "$25.00", "$30.00"]

// filter: Keeps only elements >= 20
const filtered = numbers.filter(num => num >= 20);
console.log(filtered); // [20, 25, 30]
\`\`\``
  },
  {
    id: 'jsc-49',
    section: 'js-conceptual',
    number: 49,
    question: 'What Map and Weak Map in Javascript?',
    answer: `Both \`Map\` and \`WeakMap\` are key-value hash collections, but they manage object references and Garbage Collection fundamentally differently.

### Comparison Table:
| Feature | \`Map\` | \`WeakMap\` |
| :--- | :--- | :--- |
| **Permitted Key Types** | **Any type** (primitives, objects, functions) | **Objects only** (primitives disallowed) |
| **Garbage Collection** | Strongly holds keys; prevents garbage collection | **Weak references**: If key object has no other references, it is **garbage collected**! |
| **Enumerability** | ✅ Iterable (\`keys()\`, \`values()\`, \`entries()\`, \`for...of\`) | ❌ **Non-iterable** (size cannot be computed) |
| **\`.size\` Property** | ✅ Yes (\`map.size\`) | ❌ No |
| **Primary Use-Case** | General key-value dictionaries | Storing private component state or caching metadata for DOM nodes |

\`\`\`javascript
// WeakMap Use-Case: Memory-safe DOM node metadata caching
const domMetadata = new WeakMap();

let button = document.createElement("button");
domMetadata.set(button, { clickCount: 0 });

// When the DOM node is removed and dereferenced:
button.remove();
button = null; 
// The metadata in domMetadata is AUTOMATICALLY cleaned up by Garbage Collector!
// Prevents memory leaks!
\`\`\``
  },
  {
    id: 'jsc-50',
    section: 'js-conceptual',
    number: 50,
    question: 'What are weakRef in Javascript.',
    answer: `Introduced in ES2021, a **\`WeakRef\`** (Weak Reference) allows you to hold a reference to a target object without preventing that object from being reclaimed by the JavaScript engine's **Garbage Collector (GC)**.

### Mechanics & API:
- Standard object assignments create strong references. As long as a strong reference exists in memory, GC cannot free the object.
- A \`WeakRef\` does not protect the object. At any point, if memory is needed and no strong references remain, GC deletes the target.
- Use \`weakRef.deref()\` to retrieve the target object. If the object was garbage-collected, \`deref()\` returns \`undefined\`.

\`\`\`javascript
// Practical Use-Case: Memory-Conscious Image Cache
class ImageCache {
  constructor() {
    this.cache = new Map();
  }

  set(key, imageObj) {
    this.cache.set(key, new WeakRef(imageObj));
  }

  get(key) {
    const ref = this.cache.get(key);
    if (!ref) return null;
    
    const obj = ref.deref();
    if (obj) {
      return obj; // Cache hit!
    } else {
      this.cache.delete(key); // Object was collected by GC
      return null;
    }
  }
}
\`\`\`

📌 Note: Avoid relying on \`WeakRef\` for core application logic or deterministic tests, because garbage collector sweep schedules vary unpredictably between browser engines.`
  },
  {
    id: 'jsc-51',
    section: 'js-conceptual',
    number: 51,
    question: 'What is difference between setTimeout and requestAnimationFrame.',
    answer: `While both schedule future callback execution, \`setTimeout\` is tied to the **Event Loop timer clock**, while \`requestAnimationFrame\` (rAF) is synchronized directly with the **Browser Display Hardware Refresh Rate**.

### Comprehensive Comparison:
| Criterion | \`setTimeout(fn, delay)\` | \`requestAnimationFrame(fn)\` |
| :--- | :--- | :--- |
| **Synchronization** | Independent timer queue; unsynchronized with display | **Locked to display refresh rate** (typically 60Hz = ~16.6ms, 120Hz = ~8.3ms) |
| **Execution Phase** | Runs in **Macrotask Queue** | Runs right **before the next browser Repaint/Composite** |
| **Visual Animation Quality** | Prone to frame drops, stutter, and screen tearing | **Buttery-smooth, tear-free 60+ FPS animations** |
| **Background Tabs** | Throttled to $\\ge 1000\\text{ms}$ in background tabs | **Completely paused** when tab is inactive, saving battery & CPU! |

\`\`\`javascript
// Smooth 60 FPS animation loop with requestAnimationFrame
function animateElement(element, duration) {
  let start = null;

  function step(timestamp) {
    if (!start) start = timestamp;
    const progress = Math.min((timestamp - start) / duration, 1);
    
    element.style.transform = \`translateX(\${progress * 300}px)\`;
    
    if (progress < 1) {
      requestAnimationFrame(step); // Schedule next frame right before next VSync
    }
  }

  requestAnimationFrame(step);
}
\`\`\`

👉 Interview Tip: Always use \`requestAnimationFrame\` for JavaScript-based UI animations, canvas rendering, or game loops. Use \`setTimeout\` purely for delayed task scheduling.`
  }
];
