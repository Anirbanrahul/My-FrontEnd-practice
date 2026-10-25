// 67 JS Theory & Scenario Questions & Answers (from Saikrishna Nangunuri Ebook)

export const JS_THEORY_SAIKRISHNA_QUESTIONS = [
  {
    id: 'jst-1',
    section: 'js-theory-sai',
    number: 1,
    question: 'Is javascript a dynamically typed language or a statically typed language?',
    answer: `JavaScript is a **dynamically typed language**, meaning variable types are checked during runtime execution. TypeScript is statically typed (checked at compile time).`
  },
  {
    id: 'jst-2',
    section: 'js-theory-sai',
    number: 2,
    question: 'What are the different datatypes in javascript?',
    answer: `Primitives: String, Number, Boolean, Null, Undefined, BigInt, Symbol. Non-Primitives: Object (Array, Date, Map, Set).`
  },
  {
    id: 'jst-3',
    section: 'js-theory-sai',
    number: 3,
    question: 'What is Hoisting in javascript?',
    answer: `Hoisting moves variable and function declarations to the top of their scope during compilation.`
  },
  {
    id: 'jst-4',
    section: 'js-theory-sai',
    number: 4,
    question: 'What are the various things hoisted in javascript?',
    answer: `Function declarations (fully hoisted), \`var\` (hoisted as \`undefined\`), \`let\`/\`const\`/classes (hoisted in Temporal Dead Zone).`
  },
  {
    id: 'jst-5',
    section: 'js-theory-sai',
    number: 5,
    question: 'What is temporal dead zone?',
    answer: `The execution period between entering a scope and a \`let\`/\`const\` variable declaration being initialized.`
  },
  {
    id: 'jst-6',
    section: 'js-theory-sai',
    number: 6,
    question: 'What are the differences let, var and const?',
    answer: `\`var\` is function-scoped; \`let\` & \`const\` are block-scoped. \`const\` cannot be reassigned.`
  },
  {
    id: 'jst-7',
    section: 'js-theory-sai',
    number: 7,
    question: 'List out some key features of ES6?',
    answer: `Arrow functions, let/const, Destructuring, Template literals, Spread/Rest, Promises, Classes, Modules, Map/Set.`
  },
  {
    id: 'jst-8',
    section: 'js-theory-sai',
    number: 8,
    question: 'What are limitations of arrow functions in javascript?',
    answer: `No own \`this\`, no \`arguments\` object, cannot be used as constructors (\`new\`), cannot be generators.`
  },
  {
    id: 'jst-9',
    section: 'js-theory-sai',
    number: 9,
    question: 'What’s the spread operator in javascript?',
    answer: `Expands iterables into individual elements (\`[...arr]\`).`
  },
  {
    id: 'jst-10',
    section: 'js-theory-sai',
    number: 10,
    question: 'What is rest operator in javascript?',
    answer: `Condenses multiple arguments into a single array (\`function(...args)\`).`
  },
  {
    id: 'jst-11',
    section: 'js-theory-sai',
    number: 11,
    question: 'What is destructuring?',
    answer: `Extracting values from arrays/objects into distinct variables.`
  },
  {
    id: 'jst-12',
    section: 'js-theory-sai',
    number: 12,
    question: 'What are the differences between Map and Set?',
    answer: `Map holds key-value pairs; Set holds unique values.`
  },
  {
    id: 'jst-13',
    section: 'js-theory-sai',
    number: 13,
    question: 'What are modules in javascript?',
    answer: `Files that export/import reusable code snippets.`
  },
  {
    id: 'jst-14',
    section: 'js-theory-sai',
    number: 14,
    question: 'Difference between Pass by Value and Pass by Reference?',
    answer: `Primitives are passed by value; non-primitives (objects/arrays) are passed by reference.`
  },
  {
    id: 'jst-15',
    section: 'js-theory-sai',
    number: 15,
    question: 'Difference between map and filter?',
    answer: `\`map\` transforms elements; \`filter\` selects elements matching condition.`
  },
  {
    id: 'jst-16',
    section: 'js-theory-sai',
    number: 16,
    question: 'Difference between map() and forEach()?',
    answer: `\`map\` returns a new array; \`forEach\` returns undefined.`
  },
  {
    id: 'jst-17',
    section: 'js-theory-sai',
    number: 17,
    question: 'Difference between for-in and for-of?',
    answer: `\`for-in\` iterates object keys; \`for-of\` iterates iterable values.`
  },
  {
    id: 'jst-18',
    section: 'js-theory-sai',
    number: 18,
    question: 'Difference between find vs findIndex?',
    answer: `\`find\` returns matching element; \`findIndex\` returns matching element index.`
  },
  {
    id: 'jst-19',
    section: 'js-theory-sai',
    number: 19,
    question: 'Difference between Pure and Impure functions?',
    answer: `Pure functions return identical output for identical inputs with no side effects.`
  },
  {
    id: 'jst-20',
    section: 'js-theory-sai',
    number: 20,
    question: 'Differences between call(), apply() and bind()?',
    answer: `\`call\` passes comma arguments; \`apply\` passes array arguments; \`bind\` returns bound function.`
  },
  {
    id: 'jst-21',
    section: 'js-theory-sai',
    number: 21,
    question: 'Different ways to create object in javascript?',
    answer: `Object literal, Object constructor, \`Object.create()\`, \`Object.assign()\`, ES6 Classes.`
  },
  {
    id: 'jst-22',
    section: 'js-theory-sai',
    number: 22,
    question: 'Difference between Object.keys, values and entries?',
    answer: `\`keys\` -> array of keys; \`values\` -> array of values; \`entries\` -> array of \`[key, value]\` pairs.`
  },
  {
    id: 'jst-23',
    section: 'js-theory-sai',
    number: 23,
    question: 'Difference between Object.freeze() vs Object.seal()?',
    answer: `\`freeze\` prevents property addition & modification; \`seal\` prevents addition but allows modifying existing properties.`
  },
  {
    id: 'jst-24',
    section: 'js-theory-sai',
    number: 24,
    question: 'What is a polyfill in javascript?',
    answer: `Code snippet implementing modern features in older browsers lacking native support.`
  },
  {
    id: 'jst-25',
    section: 'js-theory-sai',
    number: 25,
    question: 'What is prototype in javascript?',
    answer: `Object mechanism enabling property and method inheritance.`
  },
  {
    id: 'jst-26',
    section: 'js-theory-sai',
    number: 26,
    question: 'What is generator function in javascript?',
    answer: `Function (\`function*\`) that can pause (\`yield\`) and resume (\`next()\`).`
  },
  {
    id: 'jst-27',
    section: 'js-theory-sai',
    number: 27,
    question: 'What is IIFE?',
    answer: `Immediately Invoked Function Expression executed as soon as defined.`
  },
  {
    id: 'jst-28',
    section: 'js-theory-sai',
    number: 28,
    question: 'What is CORS?',
    answer: `Cross-Origin Resource Sharing security mechanism allowing resource sharing across domains.`
  },
  {
    id: 'jst-29',
    section: 'js-theory-sai',
    number: 29,
    question: 'Differences between typescript and javascript?',
    answer: `TypeScript is statically typed superset of JavaScript with compilation checks and interfaces.`
  },
  {
    id: 'jst-30',
    section: 'js-theory-sai',
    number: 30,
    question: 'Authentication vs authorization?',
    answer: `Authentication verifies identity ("who you are"); Authorization verifies permissions ("what you can do").`
  },
  {
    id: 'jst-31',
    section: 'js-theory-sai',
    number: 31,
    question: 'Difference between null and undefined?',
    answer: `\`null\` is intentional empty value; \`undefined\` means variable declared but unassigned.`
  },
  {
    id: 'jst-32',
    section: 'js-theory-sai',
    number: 32,
    question: 'Difference between == and ===?',
    answer: `\`==\` coerces types; \`===\` checks exact value and type.`
  },
  {
    id: 'jst-33',
    section: 'js-theory-sai',
    number: 33,
    question: 'Slice vs Splice in javascript?',
    answer: `\`slice\` returns copy without mutating original; \`splice\` mutates original array.`
  },
  {
    id: 'jst-34',
    section: 'js-theory-sai',
    number: 34,
    question: 'What is setTimeOut in javascript?',
    answer: `Executes function once after specified millisecond delay.`
  },
  {
    id: 'jst-35',
    section: 'js-theory-sai',
    number: 35,
    question: 'What is setInterval in javascript?',
    answer: `Repeatedly executes function at specified millisecond intervals.`
  },
  {
    id: 'jst-36',
    section: 'js-theory-sai',
    number: 36,
    question: 'What are Promises in javascript?',
    answer: `Objects representing asynchronous operation completion (Pending, Fulfilled, Rejected, Settled).`
  },
  {
    id: 'jst-37',
    section: 'js-theory-sai',
    number: 37,
    question: 'Differences between Promise.all, allSettled, any, race?',
    answer: `- \`Promise.all\`: Waits for all to resolve or first rejection.
- \`Promise.allSettled\`: Waits for all to settle.
- \`Promise.any\`: Returns first fulfilled promise.
- \`Promise.race\`: Returns first settled promise.`
  },
  {
    id: 'jst-38',
    section: 'js-theory-sai',
    number: 38,
    question: 'What is a callstack in javascript?',
    answer: `LIFO stack tracking active function execution contexts.`
  },
  {
    id: 'jst-39',
    section: 'js-theory-sai',
    number: 39,
    question: 'What is a closure?',
    answer: `Function bundled with access to its outer lexical environment.`
  },
  {
    id: 'jst-40',
    section: 'js-theory-sai',
    number: 40,
    question: 'What are callbacks in javascript?',
    answer: `Functions passed as arguments executed after outer operation finishes.`
  },
  {
    id: 'jst-41',
    section: 'js-theory-sai',
    number: 41,
    question: 'What are Higher Order Functions in javascript?',
    answer: `Functions taking or returning other functions.`
  },
  {
    id: 'jst-42',
    section: 'js-theory-sai',
    number: 42,
    question: 'Difference between Local Storage and Session storage?',
    answer: `LocalStorage persists until cleared; SessionStorage is cleared when tab closes.`
  },
  {
    id: 'jst-43',
    section: 'js-theory-sai',
    number: 43,
    question: 'Difference between Indexeddb and sessionstorage?',
    answer: `IndexedDB stores large structured data asynchronously; SessionStorage stores 5MB string key-values synchronously.`
  },
  {
    id: 'jst-44',
    section: 'js-theory-sai',
    number: 44,
    question: 'Possible followup scenarios on local storage',
    answer: `1. Reopening browser -> Data persists. 2. Cross-tab same URL -> Data shared. 3. Max limit -> 5MB (QuotaExceededException).`
  },
  {
    id: 'jst-45',
    section: 'js-theory-sai',
    number: 45,
    question: 'Possible followup scenarios on session storage',
    answer: `1. Tab closed -> Data deleted. 2. Duplicate tab same URL -> Separate isolated storage.`
  },
  {
    id: 'jst-46',
    section: 'js-theory-sai',
    number: 46,
    question: 'What are cookies?',
    answer: `Small key-value pairs (~4KB) sent with HTTP requests for server session tracking.`
  },
  {
    id: 'jst-47',
    section: 'js-theory-sai',
    number: 47,
    question: 'Interview scenarios on this keyword',
    answer: `Global scope -> window; Strict function -> undefined; Method -> object; Arrow function -> lexical parent.`
  },
  {
    id: 'jst-48',
    section: 'js-theory-sai',
    number: 48,
    question: 'What are Interceptors?',
    answer: `Middleware intercepting HTTP requests/responses before processing (e.g. Axios interceptors).`
  },
  {
    id: 'jst-49',
    section: 'js-theory-sai',
    number: 49,
    question: 'What is eval()?',
    answer: `Evaluates JavaScript code string at runtime.`
  },
  {
    id: 'jst-50',
    section: 'js-theory-sai',
    number: 50,
    question: 'Difference between Shallow copy and deep copy?',
    answer: `Shallow copy copies top-level references; Deep copy recursively copies all nested structures.`
  },
  {
    id: 'jst-51',
    section: 'js-theory-sai',
    number: 51,
    question: 'Difference between undeclared and undefined variables?',
    answer: `Undeclared -> Variable not in program (ReferenceError); Undefined -> Declared but unassigned.`
  },
  {
    id: 'jst-52',
    section: 'js-theory-sai',
    number: 52,
    question: 'What is event bubbling?',
    answer: `Event propagation moving up from target element to parent ancestors.`
  },
  {
    id: 'jst-53',
    section: 'js-theory-sai',
    number: 53,
    question: 'What is event capturing?',
    answer: `Event propagation moving down from window ancestor to target element.`
  },
  {
    id: 'jst-54',
    section: 'js-theory-sai',
    number: 54,
    question: 'Various array methods in javascript?',
    answer: `\`toString\`, \`join\`, \`at\`, \`pop\`, \`push\`, \`shift\`, \`unshift\`, \`concat\`, \`copyWithin\`, \`flat\`, \`fill\`.`
  },
  {
    id: 'jst-55',
    section: 'js-theory-sai',
    number: 55,
    question: 'Differences between some and every in javascript?',
    answer: `\`some\` returns true if at least 1 element matches; \`every\` returns true only if ALL elements match.`
  },
  {
    id: 'jst-56',
    section: 'js-theory-sai',
    number: 56,
    question: 'What are the different types of errors in javascript?',
    answer: `SyntaxError, ReferenceError, TypeError, RangeError, EvalError, URIError.`
  },
  {
    id: 'jst-57',
    section: 'js-theory-sai',
    number: 57,
    question: 'What is tree shaking in javascript?',
    answer: `Bundler dead code elimination removing unused exports.`
  },
  {
    id: 'jst-58',
    section: 'js-theory-sai',
    number: 58,
    question: 'What is prototype inheritance in javascript?',
    answer: `Linking parent prototypes to child objects via \`Object.create()\`.`
  },
  {
    id: 'jst-59',
    section: 'js-theory-sai',
    number: 59,
    question: 'Differences between fetch and axios?',
    answer: `Fetch is built-in browser API; Axios is 3rd-party library supporting automatic JSON parsing and interceptors.`
  },
  {
    id: 'jst-60',
    section: 'js-theory-sai',
    number: 60,
    question: 'What are DRY, KISS, YAGNI, SOLID Principles?',
    answer: `DRY (Don't Repeat Yourself), KISS (Keep It Simple), YAGNI (You Aren't Gonna Need It), SOLID OOP principles.`
  },
  {
    id: 'jst-61',
    section: 'js-theory-sai',
    number: 61,
    question: 'What is Babel?',
    answer: `JavaScript transpiler converting ES6+ code to backwards-compatible JavaScript.`
  },
  {
    id: 'jst-62',
    section: 'js-theory-sai',
    number: 62,
    question: 'Main advantages of arrow functions?',
    answer: `Concise syntax, lexical \`this\` binding eliminating manual \`.bind(this)\`.`
  },
  {
    id: 'jst-63',
    section: 'js-theory-sai',
    number: 63,
    question: 'What is clearInterval in javascript?',
    answer: `Stops recurring execution started by \`setInterval()\`.`
  },
  {
    id: 'jst-64',
    section: 'js-theory-sai',
    number: 64,
    question: 'What are webworkers and give an example?',
    answer: `Runs script execution in background worker thread off main UI thread.`
  },
  {
    id: 'jst-65',
    section: 'js-theory-sai',
    number: 65,
    question: 'Differences between ^ and ~ symbol in package.json?',
    answer: `\`^\` (Caret) updates minor and patch versions; \`~\` (Tilde) updates patch versions only.`
  },
  {
    id: 'jst-66',
    section: 'js-theory-sai',
    number: 66,
    question: 'Plain javascript basic questions: change style & add class',
    answer: `\`element.style.color = "red"\` and \`element.classList.add("newClass")\`.`
  },
  {
    id: 'jst-67',
    section: 'js-theory-sai',
    number: 67,
    question: 'Is javascript synchronous or asynchronous and single threaded or multithreaded?',
    answer: `Synchronous single-threaded language handling async tasks via Event Loop queues.`
  }
];
