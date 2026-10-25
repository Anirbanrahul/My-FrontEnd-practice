export const JS_CONCEPTUAL_QUESTIONS = [
  {
    id: 'jsc-1',
    section: 'js-conceptual',
    number: 1,
    question: 'Explain what is Javascript?',
    answer: `JavaScript is a high-level, interpreted (JIT-compiled), dynamic, multi-paradigm programming language. It supports prototype-based object orientation, first-class functions, and event-driven asynchronous execution.`
  },
  {
    id: 'jsc-2',
    section: 'js-conceptual',
    number: 2,
    question: 'Is Javascript script single threaded or multithreaded. Explain in detail.',
    answer: `JavaScript runtime engine (V8, JavaScriptCore) is **single-threaded** because it has a single Call Stack executing one task at a time. However, the environment (Browser/Node.js) provides Web APIs, Libuv worker pools, and Web Workers enabling asynchronous non-blocking multi-threaded tasks.`
  },
  {
    id: 'jsc-3',
    section: 'js-conceptual',
    number: 3,
    question: 'How can I add Javascript in my HTML code, give me 2 possible ways.',
    answer: `1. **Internal Script Tag**: \`<script> console.log('Hello'); </script>\`
2. **External Script File**: \`<script src="app.js"></script>\``
  },
  {
    id: 'jsc-4',
    section: 'js-conceptual',
    number: 4,
    question: 'Can I add a script tag in the head element?',
    answer: `Yes, you can place \`<script>\` in the \`<head>\`. To prevent blocking HTML parsing, use \`defer\` or \`async\` attributes.`
  },
  {
    id: 'jsc-5',
    section: 'js-conceptual',
    number: 5,
    question: 'Does adding script tag in head element cause any problem?',
    answer: `Without \`async\` or \`defer\`, a synchronous \`<script>\` tag in \`<head>\` blocks DOM parsing (render-blocking), causing a blank screen until script fetches and executes.`
  },
  {
    id: 'jsc-6',
    section: 'js-conceptual',
    number: 6,
    question: 'What are async and defer attributes?',
    answer: `- **\`async\`**: Downloads in background asynchronously; executes immediately once downloaded (may execute before DOM is ready).
- **\`defer\`**: Downloads in background asynchronously; executes strictly *after* HTML DOM parsing is complete in document order.`
  },
  {
    id: 'jsc-7',
    section: 'js-conceptual',
    number: 7,
    question: 'Explain data types in Javascript.',
    answer: `- **Primitives (7)**: \`string\`, \`number\`, \`boolean\`, \`undefined\`, \`null\`, \`symbol\`, \`bigint\`. (Immutable, stored by value).
- **Non-Primitives**: \`Object\` (including \`Array\`, \`Function\`, \`Date\`, \`Map\`, \`Set\`). (Mutable, stored by reference).`
  },
  {
    id: 'jsc-8',
    section: 'js-conceptual',
    number: 8,
    question: 'What is hoisting? Give examples.',
    answer: `Hoisting is JS memory creation phase behavior where variable & function declarations are moved to the top of their scope before execution.
- \`var\` is hoisted as \`undefined\`.
- \`let\` & \`const\` are hoisted into **Temporal Dead Zone (TDZ)**.
- Function declarations are fully hoisted.`
  },
  {
    id: 'jsc-9',
    section: 'js-conceptual',
    number: 9,
    question: 'What is closure? Give Examples.',
    answer: `A closure is a function bundled together with references to its surrounding lexical environment. It allows an inner function to access variables from an outer enclosing function even after that outer function has finished executing.`
  },
  {
    id: 'jsc-10',
    section: 'js-conceptual',
    number: 10,
    question: 'What is stale Closure. Give Examples.',
    answer: `A stale closure occurs when a closure captures variable state at creation time, but that variable is later updated elsewhere while the closure continues referencing the old stale value.`
  },
  {
    id: 'jsc-11',
    section: 'js-conceptual',
    number: 11,
    question: 'Explain currying, it’s use case and its benefits.',
    answer: `Currying is a technique of transforming a function taking multiple arguments \`f(a, b, c)\` into a sequence of unary functions \`f(a)(b)(c)\`.`
  },
  {
    id: 'jsc-12',
    section: 'js-conceptual',
    number: 12,
    question: 'What is an IIFE?',
    answer: `An IIFE (**Immediately Invoked Function Expression**) is a JavaScript function that runs as soon as it is defined, preventing global scope pollution.`
  },
  {
    id: 'jsc-13',
    section: 'js-conceptual',
    number: 13,
    question: 'Give 4 ways to create an IIFE.',
    answer: `1. \`(function() { ... })();\`
2. \`(function() { ... }());\`
3. \`!function() { ... }();\`
4. \`(() => { ... })();\``
  },
  {
    id: 'jsc-14',
    section: 'js-conceptual',
    number: 14,
    question: 'What are operators in JS.',
    answer: `Symbols performing operations on operands: Arithmetic (\`+\`, \`-\`), Logical (\`&&\`, \`||\`, \`!\`), Comparison (\`===\`, \`>\`), Assignment (\`=\`, \`+=\`), Bitwise, Ternary (\`?\`), Nullish (\`??\`).`
  },
  {
    id: 'jsc-15',
    section: 'js-conceptual',
    number: 15,
    question: 'How can I check data type of variables in JS.',
    answer: `- \`typeof variable\` (primitives)
- \`Array.isArray(arr)\`
- \`obj instanceof Constructor\`
- \`Object.prototype.toString.call(val)\``
  },
  {
    id: 'jsc-16',
    section: 'js-conceptual',
    number: 16,
    question: 'Explain Abstract Equality in Javascript (==).',
    answer: `Abstract equality (\`==\`) compares two values with **implicit type coercion** if their types differ.`
  },
  {
    id: 'jsc-17',
    section: 'js-conceptual',
    number: 17,
    question: 'How == is different from ===.',
    answer: `\`==\` performs type coercion before comparison; \`===\` (Strict Equality) checks both value and exact type without coercion.`
  },
  {
    id: 'jsc-18',
    section: 'js-conceptual',
    number: 18,
    question: 'Explain Execution Context.',
    answer: `The environment in which JS code is evaluated and executed. Contains **Memory Creation Phase** (allocating space for variables & functions) and **Code Execution Phase** (line-by-line execution).`
  },
  {
    id: 'jsc-19',
    section: 'js-conceptual',
    number: 19,
    question: 'What is Lexical Scope.',
    answer: `Lexical scope means variable access is determined statically by physical position and nesting of functions in source code at compile time.`
  },
  {
    id: 'jsc-20',
    section: 'js-conceptual',
    number: 20,
    question: 'Explain this keyword.',
    answer: `\`this\` references the object executing the current function. Its value depends on call-site execution context (global, object method, explicit bind, or constructor).`
  },
  {
    id: 'jsc-21',
    section: 'js-conceptual',
    number: 21,
    question: 'What is call bind and apply?',
    answer: `- **\`call\`**: Invokes function immediately passing arguments individually: \`fn.call(ctx, arg1, arg2)\`.
- **\`apply\`**: Invokes function immediately passing arguments as array: \`fn.apply(ctx, [arg1, arg2])\`.
- **\`bind\`**: Returns a new bound function with locked context without immediate invocation.`
  },
  {
    id: 'jsc-22',
    section: 'js-conceptual',
    number: 22,
    question: 'Explain what is the new Keyword.',
    answer: `The \`new\` keyword creates a blank object, sets its prototype \`__proto__\` to the constructor function's \`prototype\`, binds \`this\` to the new object, and returns it.`
  },
  {
    id: 'jsc-23',
    section: 'js-conceptual',
    number: 23,
    question: 'What are prototypes in JS?',
    answer: `Prototypes are the mechanism by which JavaScript objects inherit features from one another.`
  },
  {
    id: 'jsc-24',
    section: 'js-conceptual',
    number: 24,
    question: 'Explain difference between __proto__, prototype, [[prototype]].',
    answer: `- **\`prototype\`**: Property on constructor functions used to build \`__proto__\` for instances.
- **\`__proto__\`**: Accessor property pointing to internal \`[[Prototype]]\` on objects.
- **\`[[Prototype]]\`**: Internal hidden property reference on objects.`
  },
  {
    id: 'jsc-25',
    section: 'js-conceptual',
    number: 25,
    question: 'What is prototypical inheritance? How it is different from classical inheritance.',
    answer: `Objects inherit directly from other objects via dynamic prototype chain links rather than class blueprints.`
  },
  {
    id: 'jsc-26',
    section: 'js-conceptual',
    number: 26,
    question: 'What is the difference between var, let and const?',
    answer: `- **\`var\`**: Function-scoped, re-declarable, hoisted as \`undefined\`.
- **\`let\`**: Block-scoped, non-re-declarable, hoisted in TDZ.
- **\`const\`**: Block-scoped, non-reassignable constant reference.`
  },
  {
    id: 'jsc-27',
    section: 'js-conceptual',
    number: 27,
    question: 'What are Symbols in JS?',
    answer: `Primitive data type used to create guaranteed unique identifier keys for objects.`
  },
  {
    id: 'jsc-28',
    section: 'js-conceptual',
    number: 28,
    question: 'What is the spread and rest concept in JS.',
    answer: `- **Spread (\`...\`)**: Expands iterable items into individual elements.
- **Rest (\`...\`)**: Gathers remaining individual items into an array.`
  },
  {
    id: 'jsc-29',
    section: 'js-conceptual',
    number: 29,
    question: 'Explain destructuring.',
    answer: `Syntax allowing extraction of array values or object properties into distinct variables.`
  },
  {
    id: 'jsc-30',
    section: 'js-conceptual',
    number: 30,
    question: 'Explain difference between || and ??.',
    answer: `- **\`||\`**: Returns right operand if left operand is falsy (\`0\`, \`""\`, \`false\`, \`null\`, \`undefined\`).
- **\`??\`**: Returns right operand ONLY if left operand is nullish (\`null\` or \`undefined\`).`
  },
  {
    id: 'jsc-31',
    section: 'js-conceptual',
    number: 31,
    question: 'What is optional chaining?',
    answer: `The \`?.\` operator safely reads nested property values without throwing error if intermediate reference is nullish.`
  },
  {
    id: 'jsc-32',
    section: 'js-conceptual',
    number: 32,
    question: 'What is functional programming?',
    answer: `Programming paradigm treating computation as evaluation of pure mathematical functions, avoiding side effects and mutable shared state.`
  },
  {
    id: 'jsc-33',
    section: 'js-conceptual',
    number: 33,
    question: 'What is the difference between reduce and reduceRight.',
    answer: `\`reduce\` traverses array from left-to-right (index 0..N-1); \`reduceRight\` traverses from right-to-left (index N-1..0).`
  },
  {
    id: 'jsc-34',
    section: 'js-conceptual',
    number: 34,
    question: 'What are callbacks?',
    answer: `Functions passed as arguments to another function to be executed later upon completion of a task.`
  },
  {
    id: 'jsc-35',
    section: 'js-conceptual',
    number: 35,
    question: 'Explain inversion of control.',
    answer: `Loss of control over program flow when handing callback functions to third-party APIs.`
  },
  {
    id: 'jsc-36',
    section: 'js-conceptual',
    number: 36,
    question: 'What are promises?',
    answer: `Objects representing eventual completion or failure of an asynchronous operation.`
  },
  {
    id: 'jsc-37',
    section: 'js-conceptual',
    number: 37,
    question: 'What are the different states of promises?',
    answer: `1. **Pending**: Initial state.
2. **Fulfilled**: Successfully resolved.
3. **Rejected**: Operation failed.`
  },
  {
    id: 'jsc-38',
    section: 'js-conceptual',
    number: 38,
    question: 'When does the finally block get called under promises?',
    answer: `Always executes when promise is settled (either fulfilled or rejected).`
  },
  {
    id: 'jsc-39',
    section: 'js-conceptual',
    number: 39,
    question: 'How can I handle errors using try catch in JS.',
    answer: `Wrap synchronous or async/await code inside \`try { ... } catch (error) { ... }\` block.`
  },
  {
    id: 'jsc-40',
    section: 'js-conceptual',
    number: 40,
    question: 'What is tagged template literal.',
    answer: `Advanced template literal format allowing function parsing of string literals and interpolations.`
  },
  {
    id: 'jsc-41',
    section: 'js-conceptual',
    number: 41,
    question: 'How does this work inside the arrow function?',
    answer: `Arrow functions do not have their own \`this\`; they lexically inherit \`this\` from surrounding scope.`
  },
  {
    id: 'jsc-42',
    section: 'js-conceptual',
    number: 42,
    question: 'What is the difference between an arrow and normal function? Explain 7 Differences.',
    answer: `1. Syntax brevity
2. Lexical \`this\`
3. No \`arguments\` object
4. Cannot be used as Constructor (\`new\`)
5. No \`prototype\` property
6. Cannot be generator function
7. No duplicate named parameters allowed in strict mode`
  },
  {
    id: 'jsc-43',
    section: 'js-conceptual',
    number: 43,
    question: 'Explain Sets. How they are different from arrays.',
    answer: `Set stores unique values of any type. Unlike arrays, Sets prevent duplicates and have O(1) \`has()\` lookups.`
  },
  {
    id: 'jsc-44',
    section: 'js-conceptual',
    number: 44,
    question: 'What are the arguments keywords present in all functions in javascript.',
    answer: `Array-like object available inside non-arrow functions containing arguments passed to that function.`
  },
  {
    id: 'jsc-45',
    section: 'js-conceptual',
    number: 45,
    question: 'What is "use strict" and what it does.',
    answer: `Directive enabling strict mode, preventing undeclared global variables, duplicate parameters, and dangerous silent errors.`
  },
  {
    id: 'jsc-46',
    section: 'js-conceptual',
    number: 46,
    question: 'How does the for...of loop differ from the for...in loop?',
    answer: `- **\`for...of\`**: Iterates over *values* of iterable objects (Arrays, Strings, Maps).
- **\`for...in\`**: Iterates over enumerable *keys/properties* of an object.`
  },
  {
    id: 'jsc-47',
    section: 'js-conceptual',
    number: 47,
    question: 'How does the async/await syntax simplify asynchronous code in JavaScript?',
    answer: `Syntactic sugar over Promises allowing async code to be written sequentially like synchronous code.`
  },
  {
    id: 'jsc-48',
    section: 'js-conceptual',
    number: 48,
    question: 'Explain the difference between map and filter.',
    answer: `- **\`map\`**: Transforms each element returning same-length array.
- **\`filter\`**: Returns subset array matching boolean predicate condition.`
  },
  {
    id: 'jsc-49',
    section: 'js-conceptual',
    number: 49,
    question: 'What Map and Weak Map in Javascript?',
    answer: `Map holds key-value pairs of any type. WeakMap holds object keys with weak references allowing garbage collection.`
  },
  {
    id: 'jsc-50',
    section: 'js-conceptual',
    number: 50,
    question: 'What are weakRef in Javascript.',
    answer: `WeakRef holds weak reference to an target object without preventing garbage collection.`
  },
  {
    id: 'jsc-51',
    section: 'js-conceptual',
    number: 51,
    question: 'What is difference between setTimeout and requestAnimationFrame.',
    answer: `\`setTimeout\` executes after minimum timer delay; \`requestAnimationFrame\` syncs execution right before next browser repaint (~60fps).`
  }
];
