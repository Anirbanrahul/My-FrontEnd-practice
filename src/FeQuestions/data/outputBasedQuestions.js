// 50 JS Output-Based Questions & Detailed Explanations (from Saikrishna Nangunuri Ebook)

export const OUTPUT_BASED_QUESTIONS = [
  {
    id: 'out-1',
    section: 'js-output',
    number: 1,
    question: 'What is the output of 3+2+"7" ?',
    answer: `Output: \`"57"\`

### Step-by-Step Execution Trace:
1. **Operator Precedence & Associativity**: The addition operator (\`+\`) has left-to-right associativity.
2. **First Operation (\`3 + 2\`)**: Both operands are numbers. The engine performs standard numeric addition:
   $$3 + 2 = 5$$
3. **Second Operation (\`5 + "7"\`)**: One operand is a number (\`5\`) and the other is a string (\`"7"\`).
4. **Type Coercion Rule**: According to ECMAScript \`ApplyStringOrNumericBinaryOperator\`, if either operand to \`+\` is a string, the other operand is converted to a string via \`ToString()\` and string concatenation is executed:
   $$\\text{"5"} + \\text{"7"} = \\text{"57"}$$

👉 Interview Tip: Contrast this with subtraction: \`3 + 2 - "7"\` would evaluate $5 - \\text{"7"} = -2$, because the \`-\` operator only triggers numeric conversion, never string concatenation.`
  },
  {
    id: 'out-2',
    section: 'js-output',
    number: 2,
    question: 'What is the output of 1<2<3 and 1>2>3 ?',
    answer: `Output: \`true, false\`

### Step-by-Step Execution Trace:
Relational comparison operators (\`<\`, \`>\`) evaluate strictly **left-to-right**:

#### Expression 1: \`1 < 2 < 3\`
1. **First Comparison**: \`(1 < 2)\` evaluates to boolean **\`true\`**.
2. **Next Comparison**: The expression becomes \`true < 3\`.
3. **Coercion**: The comparison operator coerces boolean \`true\` to number **\`1\`** via \`ToNumber(true)\`.
4. **Final Evaluation**: \`1 < 3\` evaluates to **\`true\`**.

#### Expression 2: \`1 > 2 > 3\`
1. **First Comparison**: \`(1 > 2)\` evaluates to boolean **\`false\`**.
2. **Next Comparison**: The expression becomes \`false > 3\`.
3. **Coercion**: The comparison operator coerces boolean \`false\` to number **\`0\`** via \`ToNumber(false)\`.
4. **Final Evaluation**: \`0 > 3\` evaluates to **\`false\`**.

📌 Note: Chained comparison like \`a < b < c\` does NOT test whether \`b\` is between \`a\` and \`c\` in JavaScript. You must explicitly write \`1 < 2 && 2 < 3\`.`
  },
  {
    id: 'out-3',
    section: 'js-output',
    number: 3,
    question: 'Guess the output of const p = { k: 1 }; const q = { k: 1 }; console.log(p==q, p===q);',
    answer: `Output: \`false, false\`

### Step-by-Step Execution Trace:
1. In JavaScript, non-primitive data types (Objects, Arrays, Functions) are stored in the **Memory Heap**.
2. When \`const p = { k: 1 }\` runs, a new object is allocated at memory address (e.g. \`0x001\`), and \`p\` stores this reference pointer.
3. When \`const q = { k: 1 }\` runs, a completely separate object is allocated at another memory address (e.g. \`0x002\`), and \`q\` stores this distinct pointer.
4. **Comparison Rule**: Both the loose equality (\`==\`) and strict equality (\`===\`) operators compare objects by **reference identity (memory address)**, NOT by structural content or value.
5. Since \`0x001 !== 0x002\`, both \`p == q\` and \`p === q\` return **\`false\`**.

👉 Interview Tip: To compare objects by structural value, use deep comparison utilities like \`_.isEqual()\` or write a recursive comparator comparing \`Object.keys()\`.`
  },
  {
    id: 'out-4',
    section: 'js-output',
    number: 4,
    question: 'Guess the outputs of arithmetic coercion expressions:\na) 2+2\nb) "2"+"2"\nc) 2+2-2\nd) "2"+"2"-"2"\ne) 4+"2"+2+4+"25"+2+2',
    answer: `Output:
- a) \`4\`
- b) \`"22"\`
- c) \`2\`
- d) \`20\`
- e) \`"42242522"\`

### Step-by-Step Execution Breakdown:
- **a) \`2 + 2\`**: Numeric addition $\\implies 4$.
- **b) \`"2" + "2"\`**: String concatenation $\\implies \\text{"22"}$.
- **c) \`2 + 2 - 2\`**: Evaluates left to right: \`(2 + 2) - 2\` $\\implies 4 - 2 = 2$.
- **d) \`"2" + "2" - "2"\`**:
  1. \`"2" + "2"\` results in string \`"22"\`.
  2. The subtraction operator (\`-\`) does not support string concatenation; it coerces operands to numbers: \`Number("22") - Number("2") = 22 - 2 = 20\`.
- **e) \`4 + "2" + 2 + 4 + "25" + 2 + 2\`**:
  1. \`4 + "2"\` $\\implies$ \`"42"\` (string)
  2. \`"42" + 2\` $\\implies$ \`"422"\` (string)
  3. \`"422" + 4\` $\\implies$ \`"4224"\` (string)
  4. \`"4224" + "25"\` $\\implies$ \`"422425"\` (string)
  5. \`"422425" + 2\` $\\implies$ \`"4224252"\` (string)
  6. \`"4224252" + 2\` $\\implies$ \`"42242522"\` (string)

📌 Note: Once a string enters a chain of \`+\` operations, all subsequent \`+\` operations default to string concatenation unless grouping parentheses are used.`
  },
  {
    id: 'out-5',
    section: 'js-output',
    number: 5,
    question: 'What is the output of let a = "jscafe"; a[0] = "c"; console.log(a);',
    answer: `Output: \`"jscafe"\`

### Step-by-Step Execution Trace:
1. \`let a = "jscafe"\` assigns a primitive string value to variable \`a\`.
2. **Primitive Immutability**: In JavaScript, all primitive types (including strings) are strictly **immutable**.
3. While strings allow indexed read access (\`a[0]\` returns \`"j"\`), bracket assignment (\`a[0] = "c"\`) fails silently in non-strict mode.
4. In strict mode (\`"use strict"\`), attempting to mutate a character index throws a \`TypeError: Cannot assign to read only property '0' of string 'jscafe'\`.
5. The string remains unchanged as \`"jscafe"\`.

👉 Interview Tip: To replace characters in a string, convert it to an array (\`[...str]\`), modify the index, and join it back (\`.join('')\`), or use \`str.replace()\`.`
  },
  {
    id: 'out-6',
    section: 'js-output',
    number: 6,
    question: 'Output of: var x=10; function foo(){ var x=5; console.log(x); } foo(); console.log(x);',
    answer: `Output: \`5\` then \`10\`

### Step-by-Step Execution Trace:
1. In the Global Execution Context, \`var x = 10\` registers \`x\` in the global scope.
2. When \`foo()\` is called, a new **Function Execution Context** is pushed onto the Call Stack.
3. Inside \`foo()\`, \`var x = 5\` declares a new local variable \`x\`. This locally **shadows** the outer global variable \`x\`.
4. \`console.log(x)\` inside \`foo()\` resolves to the local scope variable: outputs **\`5\`**.
5. \`foo()\` finishes and its execution context is popped off the Call Stack.
6. The second \`console.log(x)\` executes in the Global Execution Context, where global \`x\` is unaffected: outputs **\`10\`**.`
  },
  {
    id: 'out-7',
    section: 'js-output',
    number: 7,
    question: 'Guess the output of Event Loop:\nconsole.log("Start");\nsetTimeout(()=>console.log("Timeout"),0);\nPromise.resolve().then(()=>console.log("Promise"));\nconsole.log("End");',
    answer: `Output:
\`Start\`
\`End\`
\`Promise\`
\`Timeout\`

### Step-by-Step Execution Trace:
1. **Synchronous**: \`console.log("Start")\` executes immediately on the Call Stack $\\implies$ logs \`"Start"\`.
2. **Macrotask Queue**: \`setTimeout(..., 0)\` is delegated to Web API timer; its callback is pushed to the **Macrotask (Task) Queue**.
3. **Microtask Queue**: \`Promise.resolve().then(...)\` is resolved immediately; its callback is pushed to the **Microtask Queue**.
4. **Synchronous**: \`console.log("End")\` executes on the Call Stack $\\implies$ logs \`"End"\`.
5. **Call Stack is now empty**: The Event Loop checks the **Microtask Queue first**:
   - Pops Promise callback and runs $\\implies$ logs \`"Promise"\`.
6. Microtask queue is empty. The Event Loop moves to the **Macrotask Queue**:
   - Pops \`setTimeout\` callback and runs $\\implies$ logs \`"Timeout"\`.

👉 Interview Tip: The Event Loop always drains the entire Microtask Queue to completion before executing the next Macrotask.`
  },
  {
    id: 'out-8',
    section: 'js-output',
    number: 8,
    question: 'Output of loop with var & setTimeout:\nfunction x() { for(var i=1; i<=5; i++) { setTimeout(()=>console.log(i), i*1000); } } x();',
    answer: `Output: Logs \`6, 6, 6, 6, 6\` (each logged ~1 second apart).

### Step-by-Step Execution Trace:
1. The variable \`var i\` is **function-scoped**, meaning there is only one shared memory slot for \`i\` across the entire loop.
2. The synchronous loop runs to completion: \`i\` increments from 1 to 2, 3, 4, 5, and finally becomes **\`6\`** when the loop terminates.
3. During the loop, 5 \`setTimeout\` callbacks are registered in Web APIs with delays 1s, 2s, 3s, 4s, and 5s.
4. Each callback forms a closure over the **same shared \`i\` reference**.
5. When the timers fire, the loop has already completed, and the value of \`i\` in memory is \`6\`.

### How to Fix It:
1. **Use \`let\` (Block Scope)**: \`for (let i = 1; i <= 5; i++)\` creates a fresh, separate lexical binding for \`i\` per iteration.
2. **Use an IIFE / Closure**:
\`\`\`javascript
for (var i = 1; i <= 5; i++) {
  (function(capturedI) {
    setTimeout(() => console.log(capturedI), capturedI * 1000);
  })(i);
}
\`\`\``
  },
  {
    id: 'out-9',
    section: 'js-output',
    number: 9,
    question: 'What will be the output of: function x(){ let a=10; function d(){ console.log(a); } a=500; return d; } var z=x(); z();',
    answer: `Output: \`500\`

### Step-by-Step Execution Trace:
1. \`x()\` initializes local variable \`a = 10\`.
2. Function \`d()\` is defined inside \`x()\`, forming a closure over the lexical environment containing \`a\`.
3. Before returning, the value of \`a\` is mutated: \`a = 500\`.
4. \`x()\` returns function \`d\`, which is stored in variable \`z\`.
5. When \`z()\` is invoked, it accesses the variable \`a\` in its closed-over lexical environment.
6. **Key Closure Rule**: Closures hold live **references to variables in memory**, not static snapshot values from function definition time. Since \`a\` was mutated to 500, \`z()\` logs **\`500\`**.`
  },
  {
    id: 'out-10',
    section: 'js-output',
    number: 10,
    question: 'What’s the output of: getData1(); getData(); function getData1(){ console.log("getData11"); } var getData = () => console.log("Hello");',
    answer: `Output: Logs \`"getData11"\`, then throws:
\`Uncaught TypeError: getData is not a function\`

### Step-by-Step Execution Trace:
1. **Creation / Hoisting Phase**:
   - \`function getData1()\` is a function declaration: fully hoisted with its function body.
   - \`var getData\` is hoisted as a variable initialized to **\`undefined\`**.
2. **Execution Phase**:
   - Line 1: \`getData1()\` executes successfully and logs **\`"getData11"\`**.
   - Line 2: \`getData()\` is called. At this point in execution, \`getData\` is still \`undefined\`.
   - Calling \`undefined()\` triggers a runtime **\`TypeError: getData is not a function\`**.
   - The script halts immediately; line 4 is never reached.`
  },
  {
    id: 'out-11',
    section: 'js-output',
    number: 11,
    question: 'Whats the output of: function func() { try { console.log(1); return; } catch(e) { console.log(2); } finally { console.log(3); } console.log(4); } func();',
    answer: `Output: \`1\` then \`3\`

### Step-by-Step Execution Trace:
1. Execution enters \`try\` block $\\implies$ logs **\`1\`**.
2. \`return\` statement is encountered inside \`try\`. The engine prepares to exit the function.
3. **The \`finally\` Guarantee**: In JavaScript, a \`finally\` block **always executes** before a function can exit, even if the \`try\` block contains an explicit \`return\`.
4. The engine halts the return temporarily to execute the \`finally\` block $\\implies$ logs **\`3\`**.
5. Once \`finally\` completes, the suspended \`return\` executes, terminating the function.
6. \`console.log(4)\` is unreachable dead code and never runs.`
  },
  {
    id: 'out-12',
    section: 'js-output',
    number: 12,
    question: 'What’s the output of: const nums=[1,2,3]; nums.forEach(n => { if(n%2===0) break; console.log(n); });',
    answer: `Output: \`Uncaught SyntaxError: Illegal break statement\`

### Step-by-Step Execution Trace:
1. In JavaScript, \`break\` and \`continue\` statements are only syntactically valid inside formal iteration loops (\`for\`, \`for...of\`, \`for...in\`, \`while\`, \`do...while\`) or \`switch\` statements.
2. \`forEach()\` is a higher-order method that takes a **callback function**.
3. You cannot \`break\` out of a function execution context. The parser detects \`break\` inside a function body and throws a compile-time **\`SyntaxError\`**.

👉 Interview Tip: To terminate early during iteration, use a standard \`for...of\` loop or use array methods like \`some()\` or \`every()\`.`
  },
  {
    id: 'out-13',
    section: 'js-output',
    number: 13,
    question: 'Whats the output of: let a = true; setTimeout(() => { a = false; }, 2000); while(a) { console.log("inside"); }',
    answer: `Output: **Infinite loop** that freezes the browser tab or Node process, printing \`"inside"\` continuously without ever stopping.

### Step-by-Step Execution Trace:
1. \`let a = true\` initializes \`a\`.
2. \`setTimeout\` callback is scheduled with Web APIs to run in 2000ms.
3. The synchronous \`while(a)\` loop starts running on the single Call Stack.
4. **Single Thread Block**: Because JavaScript is single-threaded, the synchronous loop never yields control back to the Event Loop.
5. Even after 2000ms passes, the \`setTimeout\` callback sits in the Macrotask Queue waiting for the Call Stack to empty.
6. Since the Call Stack is permanently blocked by the \`while\` loop, the callback never executes, \`a\` remains \`true\`, and the thread hangs indefinitely.`
  },
  {
    id: 'out-14',
    section: 'js-output',
    number: 14,
    question: 'Output of: setTimeout(()=>console.log(1),0); console.log(2); new Promise(res=>{ console.log(3); res(); }).then(()=>console.log(4)); console.log(5);',
    answer: `Output: \`2, 3, 5, 4, 1\`

### Step-by-Step Execution Trace:
1. \`setTimeout(..., 0)\`: Schedules callback to **Macrotask Queue**.
2. \`console.log(2)\`: Synchronous $\\implies$ logs **\`2\`**.
3. \`new Promise(executor)\`: **The executor function runs SYNCHRONOUSLY** immediately upon construction $\\implies$ logs **\`3\`**.
4. \`res()\`: Fulfills promise. Its \`.then()\` callback is scheduled to **Microtask Queue**.
5. \`console.log(5)\`: Synchronous $\\implies$ logs **\`5\`**.
6. Synchronous code complete. Event loop checks **Microtask Queue** $\\implies$ logs **\`4\`**.
7. Microtasks empty. Event loop checks **Macrotask Queue** $\\implies$ logs **\`1\`**.`
  },
  {
    id: 'out-15',
    section: 'js-output',
    number: 15,
    question: 'Output of async function order: console.log("D"); foo(); console.log("E"); async function foo(){ console.log("A"); await Promise.resolve(); console.log("B"); }',
    answer: `Output: \`D, A, E, B\`

### Step-by-Step Execution Trace:
1. \`console.log("D")\` runs synchronously $\\implies$ logs **\`"D"\`**.
2. \`foo()\` is invoked. An \`async\` function executes synchronously until its first \`await\` expression.
3. \`console.log("A")\` runs synchronously inside \`foo()\` $\\implies$ logs **\`"A"\`**.
4. \`await Promise.resolve()\`: The function execution pauses here, and the remainder of \`foo()\` is scheduled as a **Microtask**.
5. Control immediately returns to the caller context.
6. \`console.log("E")\` runs synchronously $\\implies$ logs **\`"E"\`**.
7. Main call stack is empty. Microtask queue runs and resumes \`foo()\` $\\implies$ logs **\`"B"\`**.`
  },
  {
    id: 'out-16',
    section: 'js-output',
    number: 16,
    question: 'Guess the output: let output = (function(x){ delete x; return x; })(3); console.log(output);',
    answer: `Output: \`3\`

### Step-by-Step Execution Trace:
1. An IIFE is invoked with argument \`3\`, binding local parameter \`x = 3\`.
2. The \`delete\` operator in JavaScript is designed specifically to delete configurable **properties from objects** (e.g. \`delete user.age\`).
3. Using \`delete\` on a standalone variable, function argument, or lexical identifier has **no effect** and returns \`false\` (in strict mode, it throws a \`SyntaxError: Delete of an unqualified identifier in strict mode\`).
4. Therefore, \`x\` is not deleted and returns **\`3\`**.`
  },
  {
    id: 'out-17',
    section: 'js-output',
    number: 17,
    question: 'Output of: for(var i=0; i<3; i++) { setTimeout(() => console.log(i), 1000 + i); }',
    answer: `Output: \`3, 3, 3\` (logged at ~1000ms, 1001ms, 1002ms)

### Step-by-Step Execution Trace:
1. \`var i\` is hoisted to function/global scope.
2. The loop runs synchronously:
   - Iteration 0: schedules timer at 1000ms.
   - Iteration 1: schedules timer at 1001ms.
   - Iteration 2: schedules timer at 1002ms.
   - Loop exits when \`i === 3\`.
3. When the timers expire (~1 second later), all callbacks look up \`i\` from the same shared scope, where its value is **\`3\`**.`
  },
  {
    id: 'out-18',
    section: 'js-output',
    number: 18,
    question: 'Output of IIFE argument delete check: (function(x){ delete x; return x; })(3)',
    answer: `Output: \`3\`

### Step-by-Step Execution Trace:
Identical to question 16: \`delete\` cannot delete function parameters or local variables. The parameter \`x\` remains intact and evaluates to \`3\`.`
  },
  {
    id: 'out-19',
    section: 'js-output',
    number: 19,
    question: 'Guess output: let c=0; let id = setInterval(()=>{ console.log(c++) }, 200); setTimeout(()=>{ clearInterval(id) }, 2000)',
    answer: `Output: Logs integers \`0, 1, 2, 3, 4, 5, 6, 7, 8, 9\` (10 logs total)

### Step-by-Step Execution Trace:
1. \`setInterval\` fires every 200ms.
2. At 200ms: logs 0, \`c\` becomes 1.
3. At 400ms: logs 1.
4. Continuing through 1800ms: logs 8.
5. At 2000ms: the 10th interval fires (logs 9), and concurrently \`setTimeout\` fires at 2000ms, invoking \`clearInterval(id)\` to halt further executions.`
  },
  {
    id: 'out-20',
    section: 'js-output',
    number: 20,
    question: 'What is output of: function getName1(){ console.log(this.name); } Object.prototype.getName2 = () => { console.log(this.name); }; let personObj = { name:"Tony", print:getName1 }; personObj.print(); personObj.getName2();',
    answer: `Output: \`"Tony"\` then \`undefined\`

### Step-by-Step Execution Trace:
1. \`personObj.print()\`: \`getName1\` is invoked as a method of \`personObj\`. By **Implicit Binding**, \`this\` points to \`personObj\` $\\implies$ logs **\`"Tony"\`**.
2. \`personObj.getName2()\`: \`getName2\` is an **arrow function** defined on \`Object.prototype\`.
3. Arrow functions do not bind their own \`this\`; they capture \`this\` lexically from the scope where they were declared (here, the top-level global context / \`window\`).
4. Since the global context has no \`name\` property, \`this.name\` evaluates to **\`undefined\`**.`
  },
  {
    id: 'out-21',
    section: 'js-output',
    number: 21,
    question: 'Output of: function test(){ console.log(a); console.log(foo()); var a=1; function foo(){ return 2; } } test();',
    answer: `Output: \`undefined\` then \`2\`

### Step-by-Step Execution Trace:
1. Inside \`test()\`, the creation phase hoists \`var a\` as \`undefined\`, and \`function foo()\` with its full body.
2. \`console.log(a)\` runs before \`a = 1\` assignment $\\implies$ logs **\`undefined\`**.
3. \`console.log(foo())\` invokes the fully hoisted function $\\implies$ logs **\`2\`**.`
  },
  {
    id: 'out-22',
    section: 'js-output',
    number: 22,
    question: 'Output of rejected promise chain: function job(){ return new Promise((res,rej)=>rej()); } job().then(()=>console.log(1)).catch(()=>console.log(3)).then(()=>console.log(4));',
    answer: `Output: \`3\` then \`4\`

### Step-by-Step Execution Trace:
1. \`job()\` returns an immediately rejected promise.
2. The initial \`.then(()=>console.log(1))\` is bypassed because the promise is in a rejected state.
3. Execution jumps straight to \`.catch(()=>console.log(3))\` $\\implies$ logs **\`3\`**.
4. **Key Rule**: A \`.catch()\` block that completes without throwing an error returns a **fulfilled promise** with its return value (\`undefined\`).
5. Therefore, the subsequent \`.then(()=>console.log(4))\` executes normally $\\implies$ logs **\`4\`**.`
  },
  {
    id: 'out-23',
    section: 'js-output',
    number: 23,
    question: 'Guess output: var a=1; function data(){ if(!a){ var a=10; } console.log(a); } data(); console.log(a);',
    answer: `Output: \`10\` then \`1\`

### Step-by-Step Execution Trace:
1. Inside \`data()\`, the local declaration \`var a\` is hoisted to the top of the function scope and initialized to \`undefined\`.
2. This local \`a\` shadows the global \`a = 1\`.
3. Line \`if (!a)\`: \`!undefined\` evaluates to **\`true\`**!
4. The \`if\` branch executes: \`a = 10\`.
5. \`console.log(a)\` inside \`data()\` logs **\`10\`**.
6. Outside the function, the global variable \`a\` was never touched and remains **\`1\`**.`
  },
  {
    id: 'out-24',
    section: 'js-output',
    number: 24,
    question: 'Output of array comparison: let a=[1,2]; let b=[1,2]; console.log(a==b, a===b);',
    answer: `Output: \`false, false\`

### Step-by-Step Execution Trace:
Arrays are reference objects allocated in heap memory. \`a\` and \`b\` point to two distinct memory addresses. Reference comparison evaluates to \`false\` for both \`==\` and \`===\`.`
  },
  {
    id: 'out-25',
    section: 'js-output',
    number: 25,
    question: 'Output of: let a=3; let b=new Number(3); console.log(a==b, a===b);',
    answer: `Output: \`true, false\`

### Step-by-Step Execution Trace:
1. \`a\` is a primitive number (\`3\`).
2. \`b\` is an object instance created by \`new Number(3)\` (\`typeof b === "object"\`).
3. \`a == b\` (Loose equality): JavaScript coerces the object \`b\` to a primitive number using \`b.valueOf()\` $\\implies 3 == 3$ returns **\`true\`**.
4. \`a === b\` (Strict equality): Checks both type and value. Since \`number !== object\`, it returns **\`false\`**.`
  },
  {
    id: 'out-26',
    section: 'js-output',
    number: 26,
    question: 'Guess output: var x=23; (function(){ var x=43; (function random(){ x++; console.log(x); var x=21; })(); })();',
    answer: `Output: \`NaN\`

### Step-by-Step Execution Trace:
1. Inside the innermost \`random()\` function, \`var x=21\` is hoisted to the top of \`random()\` scope as \`undefined\`.
2. The statement \`x++\` attempts numeric increment on \`undefined\`:
   $$\\text{undefined} + 1 = \\text{NaN}$$
3. \`console.log(x)\` logs **\`NaN\`**.`
  },
  {
    id: 'out-27',
    section: 'js-output',
    number: 27,
    question: 'Answer typeof outputs:\ntypeof [1,2]\ntypeof null\ntypeof NaN\ntypeof 1234n\ntypeof Symbol()',
    answer: `Output:
- \`typeof [1,2]\` $\\implies$ \`"object"\`
- \`typeof null\` $\\implies$ \`"object"\` (Historical JavaScript bug)
- \`typeof NaN\` $\\implies$ \`"number"\` (NaN stands for Not-a-Number, but its type is number)
- \`typeof 1234n\` $\\implies$ \`"bigint"\`
- \`typeof Symbol()\` $\\implies$ \`"symbol"\``
  },
  {
    id: 'out-28',
    section: 'js-output',
    number: 28,
    question: 'Find security issue in: const data = await fetch("api"); div.innerHTML = data;',
    answer: `Output: **Vulnerability: Stored / Reflected Cross-Site Scripting (XSS)**

### Detailed Security Explanation:
- Assigning unverified external data directly to \`innerHTML\` forces the browser to parse HTML and execute any embedded \`<script>\` tags or \`<img src=x onerror=alert(...)>\` attack vectors.
- **Safe Alternatives**:
  1. Use **\`div.textContent = data\`** for plain text (escapes HTML automatically).
  2. If HTML is required, sanitize using **DOMPurify**: \`div.innerHTML = DOMPurify.sanitize(data)\`.`
  },
  {
    id: 'out-29',
    section: 'js-output',
    number: 29,
    question: 'Guess output: console.log(typeof typeof 1);',
    answer: `Output: \`"string"\`

### Step-by-Step Execution Trace:
1. Inner expression \`typeof 1\` evaluates to string **\`"number"\`**.
2. Outer expression becomes \`typeof "number"\`.
3. Since \`"number"\` is a string primitive, \`typeof "number"\` returns **\`"string"\`**.`
  },
  {
    id: 'out-30',
    section: 'js-output',
    number: 30,
    question: 'Output of: x++; console.log(x); var x = 21;',
    answer: `Output: \`NaN\`

### Step-by-Step Execution Trace:
1. \`var x\` is hoisted to the top of the scope and initialized to \`undefined\`.
2. \`x++\` performs mathematical increment on \`undefined\` $\\implies \\text{undefined} + 1 = \\text{NaN}$.
3. \`console.log(x)\` logs **\`NaN\`**.`
  },
  {
    id: 'out-31',
    section: 'js-output',
    number: 31,
    question: 'Output of: const x=[1]; const y=[2]; console.log(x+y);',
    answer: `Output: \`"12"\`

### Step-by-Step Execution Trace:
1. The binary \`+\` operator triggers type conversion via \`ToPrimitive()\`.
2. For arrays, \`ToPrimitive()\` invokes \`Array.prototype.toString()\`, which joins elements with commas: \`[1].toString() = "1"\` and \`[2].toString() = "2"\`.
3. String concatenation evaluates \`"1" + "2" = "12"\`.`
  },
  {
    id: 'out-32',
    section: 'js-output',
    number: 32,
    question: 'Output of: const data = { name: "sai", name: "krishna" }; console.log(data.name);',
    answer: `Output: \`"krishna"\`

### Step-by-Step Execution Trace:
When duplicate keys are declared inside an object literal, the last declared key **overwrites** previous property definitions. The key remains at its initial insertion position, but its value is updated to \`"krishna"\`.`
  },
  {
    id: 'out-33',
    section: 'js-output',
    number: 33,
    question: 'Output of: let x = 10 + 2 * 3; console.log(x);',
    answer: `Output: \`16\`

### Step-by-Step Execution Trace:
Multiplication (\`*\`) has an operator precedence of 12, whereas addition (\`+\`) has a precedence of 11. Therefore, \`2 * 3 = 6\` executes first, followed by \`10 + 6 = 16\`.`
  },
  {
    id: 'out-34',
    section: 'js-output',
    number: 34,
    question: 'Output of: const x=[1,2,3]; const y=[1,3,4]; console.log(x+y);',
    answer: `Output: \`"1,2,31,3,4"\`

### Step-by-Step Execution Trace:
Both arrays are coerced to strings via \`toString()\`:
- \`x.toString() = "1,2,3"\`
- \`y.toString() = "1,3,4"\`
Concatenating them yields \`"1,2,31,3,4"\`.`
  },
  {
    id: 'out-35',
    section: 'js-output',
    number: 35,
    question: 'Output of: console.log(+true); console.log(!"sai");',
    answer: `Output: \`1, false\`

### Step-by-Step Execution Trace:
1. Unary \`+\` converts boolean \`true\` to numeric **\`1\`**.
2. Any non-empty string in JavaScript is truthy. The logical NOT operator (\`!\`) converts truthy \`"sai"\` to boolean **\`false\`**.`
  },
  {
    id: 'out-36',
    section: 'js-output',
    number: 36,
    question: 'Outputs of:\nconsole.log([] + []);\nconsole.log([1] + []);\nconsole.log([1] + "abc");',
    answer: `Output:
- \`""\` (empty string)
- \`"1"\`
- \`"1abc"\`

### Explanation:
- \`[] + []\` $\\implies$ \`"".concat("")\` = \`""\`
- \`[1] + []\` $\\implies$ \`"1" + ""\` = \`"1"\`
- \`[1] + "abc"\` $\\implies$ \`"1" + "abc"\` = \`"1abc"\``
  },
  {
    id: 'out-37',
    section: 'js-output',
    number: 37,
    question: 'Output of: function getAge(...args) { console.log(typeof args); } getAge(21);',
    answer: `Output: \`"object"\`

### Step-by-Step Execution Trace:
The rest parameter \`...args\` gathers function arguments into an instance of an **Array** (\`[21]\`). In JavaScript, arrays are objects, so \`typeof [21]\` returns **\`"object"\`**.`
  },
  {
    id: 'out-38',
    section: 'js-output',
    number: 38,
    question: 'Output of: const obj = { a: "one", b: "two", a: "three" }; console.log(obj);',
    answer: `Output: \`{ a: "three", b: "two" }\`

### Explanation:
Duplicate keys overwrite prior keys. The final value for key \`a\` is \`"three"\`.`
  },
  {
    id: 'out-39',
    section: 'js-output',
    number: 39,
    question: 'Output of: var z = 1, y = z = typeof y; console.log(y);',
    answer: `Output: \`"undefined"\`

### Step-by-Step Execution Trace:
1. Declarations are hoisted: \`var z = undefined\`, \`var y = undefined\`.
2. The assignment \`y = z = typeof y\` evaluates from **right to left**.
3. \`typeof y\` evaluates first. Since \`y\` has not yet been assigned a value, it is \`undefined\`, and \`typeof undefined\` returns the string **\`"undefined"\`**.
4. \`z\` and \`y\` are both assigned the string \`"undefined"\`.`
  },
  {
    id: 'out-40',
    section: 'js-output',
    number: 40,
    question: 'Outputs of:\nconsole.log(false || null || "Hello");\nconsole.log(false && null && "Hello");',
    answer: `Output: \`"Hello"\` then \`false\`

### Short-Circuit Evaluation Rules:
1. **\`||\` (Logical OR)**: Returns the **first truthy value** encountered, or the last value if none are truthy.
   - \`false || null || "Hello"\` skips \`false\` and \`null\` to return **\`"Hello"\`**.
2. **\`&&\` (Logical AND)**: Returns the **first falsy value** encountered, or the last value if all are truthy.
   - \`false && null && "Hello"\` short-circuits immediately at **\`false\`**.`
  },
  {
    id: 'out-41',
    section: 'js-output',
    number: 41,
    question: 'Output of: const numbers = [1,2,3,4,5]; const [x, ...y] = numbers; console.log(x, y);',
    answer: `Output: \`1\` and \`[2, 3, 4, 5]\`

### Explanation:
Array destructuring assigns the first element to \`x = 1\`, while the rest operator \`...y\` captures all remaining elements into a new array \`y = [2, 3, 4, 5]\`.`
  },
  {
    id: 'out-42',
    section: 'js-output',
    number: 42,
    question: 'Output of: const str = "abc" + + "def"; console.log(str);',
    answer: `Output: \`"abcNaN"\`

### Step-by-Step Execution Trace:
1. Grouping evaluates the unary operator first: \`+ "def"\`.
2. Converting the non-numeric string \`"def"\` to a number via \`ToNumber("def")\` yields **\`NaN\`**.
3. Binary concatenation: \`"abc" + NaN = "abcNaN"\`.`
  },
  {
    id: 'out-43',
    section: 'js-output',
    number: 43,
    question: 'Output of: let newlist = [1].push(2); console.log(newlist.push(3));',
    answer: `Output: \`Uncaught TypeError: newlist.push is not a function\`

### Step-by-Step Execution Trace:
1. \`[1].push(2)\`: The \`push()\` method mutates the array in-place and returns the **new length of the array**, which is the number **\`2\`**.
2. Therefore, \`newlist\` is assigned the number \`2\` (\`typeof newlist === "number"\`).
3. Calling \`newlist.push(3)\` attempts to call \`.push()\` on a primitive number, throwing a **\`TypeError\`**.`
  },
  {
    id: 'out-44',
    section: 'js-output',
    number: 44,
    question: 'Outputs of:\nconsole.log(0 || 1);\nconsole.log(1 || 2);\nconsole.log(0 && 1);\nconsole.log(1 && 2);',
    answer: `Output: \`1, 1, 0, 2\`

### Evaluation Breakdown:
- \`0 || 1\`: 0 is falsy, returns right operand $\\implies 1$.
- \`1 || 2\`: 1 is truthy, short-circuits immediately $\\implies 1$.
- \`0 && 1\`: 0 is falsy, short-circuits immediately $\\implies 0$.
- \`1 && 2\`: 1 is truthy, continues and returns last operand $\\implies 2$.`
  },
  {
    id: 'out-45',
    section: 'js-output',
    number: 45,
    question: 'Output of: console.log(data()); var data = function() { return "1"; };',
    answer: `Output: \`Uncaught TypeError: data is not a function\`

### Explanation:
Function expressions are not hoisted with their bodies. \`var data\` is hoisted as \`undefined\`. Attempting to invoke \`undefined()\` on line 1 throws a \`TypeError\`.`
  },
  {
    id: 'out-46',
    section: 'js-output',
    number: 46,
    question: 'Output of: const arr = [1,2,3]; arr[5] = 6; console.log(arr.length);',
    answer: `Output: \`6\`

### Step-by-Step Execution Trace:
1. Assigning to an index beyond the current array boundary creates a **sparse array**.
2. Indices 3 and 4 become "empty slots" (holes in memory).
3. The array's \`length\` property is always equal to the highest index plus 1:
   $$\\text{length} = 5 + 1 = 6$$`
  },
  {
    id: 'out-47',
    section: 'js-output',
    number: 47,
    question: 'Output of: const obj = { a: 1 }; obj.a = 2; console.log(obj);',
    answer: `Output: \`{ a: 2 }\`

### Explanation:
The \`const\` declaration enforces immutable variable identifier rebinding. It prevents assigning \`obj = { ... }\`, but does not make the underlying object properties immutable.`
  },
  {
    id: 'out-48',
    section: 'js-output',
    number: 48,
    question: 'Output of: let x = { a: undefined, b: null }; console.log(JSON.stringify(x));',
    answer: `Output: \`'{"b":null}'\`

### Step-by-Step Execution Trace:
According to the JSON specification, \`undefined\` is not a valid JSON data type.
- When serializing an object, \`JSON.stringify()\` **completely omits keys whose values are \`undefined\`**, functions, or symbols.
- \`null\` is a valid JSON literal and is preserved. Thus, key \`a\` is omitted and only \`{"b":null}\` is serialized.`
  },
  {
    id: 'out-49',
    section: 'js-output',
    number: 49,
    question: 'Outputs of: console.log(true + 1); console.log(true + "1");',
    answer: `Output: \`2\` then \`"true1"\`

### Explanation:
- \`true + 1\`: Numeric addition coerces \`true \\to 1\`, evaluating $1 + 1 = 2$.
- \`true + "1"\`: String addition triggers string concatenation, evaluating \`"true" + "1" = "true1"\`.`
  },
  {
    id: 'out-50',
    section: 'js-output',
    number: 50,
    question: 'Output of: const str = "hello"; str.data = "val"; console.log(str.data);',
    answer: `Output: \`undefined\`

### Step-by-Step Execution Trace:
1. \`str\` is a primitive string.
2. When property access \`str.data = "val"\` occurs, the JavaScript engine temporarily creates an auto-boxed wrapper object (\`new String("hello")\`), assigns the property to that wrapper, and immediately discards the wrapper object for garbage collection.
3. On line 2, \`str.data\` creates another new wrapper object to read \`data\`, where \`data\` does not exist.
4. Hence, it evaluates to **\`undefined\`**.`
  }
];
