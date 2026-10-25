// 50 JS Output-Based Questions & Detailed Explanations (from Saikrishna Nangunuri Ebook)

export const OUTPUT_BASED_QUESTIONS = [
  {
    id: 'out-1',
    section: 'js-output',
    number: 1,
    question: 'What is the output of 3+2+"7" ?',
    answer: `**Output**: \`"57"\`
**Explanation**: Left-to-right addition associativity. \`3 + 2\` evaluates to numeric \`5\`. Then \`5 + "7"\` triggers string concatenation resulting in \`"57"\`.`
  },
  {
    id: 'out-2',
    section: 'js-output',
    number: 2,
    question: 'What is the output of 1<2<3 and 1>2>3 ?',
    answer: `**Output**: \`true, false\`
**Explanation**: Left-to-right evaluation:
- \`1 < 2 < 3\` -> \`(1 < 2) < 3\` -> \`true < 3\` -> \`1 < 3\` -> \`true\`.
- \`1 > 2 > 3\` -> \`(1 > 2) > 3\` -> \`false > 3\` -> \`0 > 3\` -> \`false\`.`
  },
  {
    id: 'out-3',
    section: 'js-output',
    number: 3,
    question: 'Guess the output of const p = { k: 1 }; const q = { k: 1 }; console.log(p==q, p===q);',
    answer: `**Output**: \`false, false\`
**Explanation**: Objects are compared by reference in memory, not content. Since \`p\` and \`q\` point to distinct memory addresses, both \`==\` and \`===\` return \`false\`.`
  },
  {
    id: 'out-4',
    section: 'js-output',
    number: 4,
    question: 'Guess the outputs of arithmetic coercion expressions:\na) 2+2\nb) "2"+"2"\nc) 2+2-2\nd) "2"+"2"-"2"\ne) 4+"2"+2+4+"25"+2+2',
    answer: `**Outputs**:
- a) \`4\` (Numeric addition)
- b) \`"22"\` (String concatenation)
- c) \`2\` (\`4 - 2\`)
- d) \`20\` (\`"22" - "2"\` converts \`"22"\` to number 22, then subtracts 2)
- e) \`"42242522"\` (Evaluates left to right with string concatenation)`
  },
  {
    id: 'out-5',
    section: 'js-output',
    number: 5,
    question: 'What is the output of let a = "jscafe"; a[0] = "c"; console.log(a);',
    answer: `**Output**: \`"jscafe"\`
**Explanation**: Primitive strings are immutable in JavaScript. Index assignment fails silently (or throws TypeError in strict mode).`
  },
  {
    id: 'out-6',
    section: 'js-output',
    number: 6,
    question: 'Output of: var x=10; function foo(){ var x=5; console.log(x); } foo(); console.log(x);',
    answer: `**Output**: \`5\` then \`10\`
**Explanation**: \`var x=5\` inside \`foo()\` is function-scoped and shadows the global \`x=10\`. Outside \`foo()\`, global \`x\` remains \`10\`.`
  },
  {
    id: 'out-7',
    section: 'js-output',
    number: 7,
    question: 'Guess the output of Event Loop:\nconsole.log("Start");\nsetTimeout(()=>console.log("Timeout"),0);\nPromise.resolve().then(()=>console.log("Promise"));\nconsole.log("End");',
    answer: `**Output**: \`Start\`, \`End\`, \`Promise\`, \`Timeout\`
**Explanation**: Synchronous code (\`Start\`, \`End\`) executes first. Microtasks (\`Promise.then\`) run before Macrotasks (\`setTimeout\`).`
  },
  {
    id: 'out-8',
    section: 'js-output',
    number: 8,
    question: 'Output of loop with var & setTimeout:\nfunction x() { for(var i=1; i<=5; i++) { setTimeout(()=>console.log(i), i*1000); } } x();',
    answer: `**Output**: Logs \`6, 6, 6, 6, 6\` at 1s intervals.
**Explanation**: \`var i\` is function-scoped and shared across iterations. By the time callbacks run, \`i\` has reached 6. (Fix with \`let i\` or IIFE closure).`
  },
  {
    id: 'out-9',
    section: 'js-output',
    number: 9,
    question: 'What will be the output of: function x(){ let a=10; function d(){ console.log(a); } a=500; return d; } var z=x(); z();',
    answer: `**Output**: \`500\`
**Explanation**: Closures retain references to variable memory bindings, not values at function definition time. When \`d()\` is executed, \`a\` is 500.`
  },
  {
    id: 'out-10',
    section: 'js-output',
    number: 10,
    question: 'What’s the output of: getData1(); getData(); function getData1(){ console.log("getData11"); } var getData = () => console.log("Hello");',
    answer: `**Output**: \`TypeError: getData is not a function\`
**Explanation**: \`function getData1\` is fully hoisted. \`var getData\` is hoisted as \`undefined\`, so calling \`getData()\` throws TypeError.`
  },
  {
    id: 'out-11',
    section: 'js-output',
    number: 11,
    question: 'Whats the output of: function func() { try { console.log(1); return; } catch(e) { console.log(2); } finally { console.log(3); } console.log(4); } func();',
    answer: `**Output**: \`1\` then \`3\`
**Explanation**: \`finally\` block ALWAYS executes even if \`try\` contains an explicit \`return\`. Line 4 is never reached.`
  },
  {
    id: 'out-12',
    section: 'js-output',
    number: 12,
    question: 'What’s the output of: const nums=[1,2,3]; nums.forEach(n => { if(n%2===0) break; console.log(n); });',
    answer: `**Output**: \`SyntaxError: Illegal break statement\`
**Explanation**: \`break\` is only valid inside loops (\`for\`, \`while\`), not inside callback functions like \`forEach()\`.`
  },
  {
    id: 'out-13',
    section: 'js-output',
    number: 13,
    question: 'Whats the output of: let a = true; setTimeout(() => { a = false; }, 2000); while(a) { console.log("inside"); }',
    answer: `**Output**: Infinite loop printing \`inside\` continuously.
**Explanation**: Synchronous \`while(a)\` blocks the main call stack thread, preventing the Event Loop from executing the \`setTimeout\` callback.`
  },
  {
    id: 'out-14',
    section: 'js-output',
    number: 14,
    question: 'Output of: setTimeout(()=>console.log(1),0); console.log(2); new Promise(res=>{ console.log(3); res(); }).then(()=>console.log(4)); console.log(5);',
    answer: `**Output**: \`2\`, \`3\`, \`5\`, \`4\`, \`1\`
**Explanation**: Promise executor runs synchronously (\`3\`). Microtask (\`4\`) runs before Macrotask (\`1\`).`
  },
  {
    id: 'out-15',
    section: 'js-output',
    number: 15,
    question: 'Output of async function order: console.log("D"); foo(); console.log("E"); async function foo(){ console.log("A"); await Promise.resolve(); console.log("B"); }',
    answer: `**Output**: \`D\`, \`A\`, \`E\`, \`B\`
**Explanation**: \`foo()\` executes \`"A"\` synchronously up to \`await\`, then yields control to main context (\`"E"\`), then resumes microtask (\`"B"\`).`
  },
  {
    id: 'out-16',
    section: 'js-output',
    number: 16,
    question: 'Guess the output: let output = (function(x){ delete x; return x; })(3); console.log(output);',
    answer: `**Output**: \`3\`
**Explanation**: \`delete\` operator deletes object properties, not local function variables or parameters.`
  },
  {
    id: 'out-17',
    section: 'js-output',
    number: 17,
    question: 'Output of: for(var i=0; i<3; i++) { setTimeout(() => console.log(i), 1000 + i); }',
    answer: `**Output**: \`3, 3, 3\`
**Explanation**: \`var\` is function-scoped; when timeouts fire after ~1s, \`i\` equals 3.`
  },
  {
    id: 'out-18',
    section: 'js-output',
    number: 18,
    question: 'Output of IIFE argument delete check: (function(x){ delete x; return x; })(3)',
    answer: `**Output**: \`3\``
  },
  {
    id: 'out-19',
    section: 'js-output',
    number: 19,
    question: 'Guess output: let c=0; let id = setInterval(()=>{ console.log(c++) }, 200); setTimeout(()=>{ clearInterval(id) }, 2000)',
    answer: `**Output**: Logs numbers \`0, 1, 2, 3, 4, 5, 6, 7, 8, 9\` every 200ms until cleared at 2000ms.`
  },
  {
    id: 'out-20',
    section: 'js-output',
    number: 20,
    question: 'What is output of: function getName1(){ console.log(this.name); } Object.prototype.getName2 = () => { console.log(this.name); }; let personObj = { name:"Tony", print:getName1 }; personObj.print(); personObj.getName2();',
    answer: `**Output**: \`"Tony"\` then \`undefined\`
**Explanation**: \`getName1\` called as method on \`personObj\` binds \`this\` to \`personObj\`. Arrow function \`getName2\` inherits lexical \`this\` (window/global) which has no \`name\` property.`
  },
  {
    id: 'out-21',
    section: 'js-output',
    number: 21,
    question: 'Output of: function test(){ console.log(a); console.log(foo()); var a=1; function foo(){ return 2; } } test();',
    answer: `**Output**: \`undefined\` then \`2\`
**Explanation**: \`var a\` is hoisted as \`undefined\`. Function declaration \`foo\` is fully hoisted.`
  },
  {
    id: 'out-22',
    section: 'js-output',
    number: 22,
    question: 'Output of rejected promise chain: function job(){ return new Promise((res,rej)=>rej()); } job().then(()=>console.log(1)).catch(()=>console.log(3)).then(()=>console.log(4));',
    answer: `**Output**: \`3\` then \`4\`
**Explanation**: Rejection skips first \`.then()\`, enters \`.catch()\` (\`3\`), and continues down the chain to subsequent \`.then()\` (\`4\`).`
  },
  {
    id: 'out-23',
    section: 'js-output',
    number: 23,
    question: 'Guess output: var a=1; function data(){ if(!a){ var a=10; } console.log(a); } data(); console.log(a);',
    answer: `**Output**: \`10\` then \`1\`
**Explanation**: Inside \`data()\`, \`var a\` is hoisted to top of function as \`undefined\`. \`!undefined\` evaluates to \`true\`, setting local \`a=10\`. Outer global \`a\` remains \`1\`.`
  },
  {
    id: 'out-24',
    section: 'js-output',
    number: 24,
    question: 'Output of array comparison: let a=[1,2]; let b=[1,2]; console.log(a==b, a===b);',
    answer: `**Output**: \`false, false\`
**Explanation**: Reference equality check for distinct array instances in memory.`
  },
  {
    id: 'out-25',
    section: 'js-output',
    number: 25,
    question: 'Output of: let a=3; let b=new Number(3); console.log(a==b, a===b);',
    answer: `**Output**: \`true, false\`
**Explanation**: \`==\` coercively compares primitive 3 with \`Number(3)\` object value. \`===\` checks strict type (\`number\` vs \`object\`).`
  },
  {
    id: 'out-26',
    section: 'js-output',
    number: 26,
    question: 'Guess output: var x=23; (function(){ var x=43; (function random(){ x++; console.log(x); var x=21; })(); })();',
    answer: `**Output**: \`NaN\`
**Explanation**: Inside \`random()\`, \`var x\` is hoisted as \`undefined\`. \`undefined++\` results in \`NaN\`.`
  },
  {
    id: 'out-27',
    section: 'js-output',
    number: 27,
    question: 'Answer typeof outputs:\ntypeof [1,2]\ntypeof null\ntypeof NaN\ntypeof 1234n\ntypeof Symbol()',
    answer: `**Outputs**:
- \`typeof [1,2]\` -> \`"object"\`
- \`typeof null\` -> \`"object"\`
- \`typeof NaN\` -> \`"number"\`
- \`typeof 1234n\` -> \`"bigint"\`
- \`typeof Symbol()\` -> \`"symbol"\``
  },
  {
    id: 'out-28',
    section: 'js-output',
    number: 28,
    question: 'Find security issue in: const data = await fetch("api"); div.innerHTML = data;',
    answer: `**Issue**: Cross-Site Scripting (XSS). Assigning untrusted string directly to \`innerHTML\` allows script injection. Use \`textContent\` or DOMPurify.`
  },
  {
    id: 'out-29',
    section: 'js-output',
    number: 29,
    question: 'Guess output: console.log(typeof typeof 1);',
    answer: `**Output**: \`"string"\`
**Explanation**: \`typeof 1\` returns \`"number"\`. \`typeof "number"\` returns \`"string"\`.`
  },
  {
    id: 'out-30',
    section: 'js-output',
    number: 30,
    question: 'Output of: x++; console.log(x); var x = 21;',
    answer: `**Output**: \`NaN\`
**Explanation**: \`var x\` hoisted as \`undefined\`. \`undefined++\` -> \`NaN\`.`
  },
  {
    id: 'out-31',
    section: 'js-output',
    number: 31,
    question: 'Output of: const x=[1]; const y=[2]; console.log(x+y);',
    answer: `**Output**: \`"12"\`
**Explanation**: Array \`+\` operator calls \`toString()\` on arrays (\`"1"\` + \`"2"\` = \`"12"\`).`
  },
  {
    id: 'out-32',
    section: 'js-output',
    number: 32,
    question: 'Output of: const data = { name: "sai", name: "krishna" }; console.log(data.name);',
    answer: `**Output**: \`"krishna"\`
**Explanation**: Duplicate keys in objects overwrite previous definitions.`
  },
  {
    id: 'out-33',
    section: 'js-output',
    number: 33,
    question: 'Output of: let x = 10 + 2 * 3; console.log(x);',
    answer: `**Output**: \`16\` (Multiplication operator precedence over addition).`
  },
  {
    id: 'out-34',
    section: 'js-output',
    number: 34,
    question: 'Output of: const x=[1,2,3]; const y=[1,3,4]; console.log(x+y);',
    answer: `**Output**: \`"1,2,31,3,4"\` (\`"1,2,3"\` + \`"1,3,4"\`).`
  },
  {
    id: 'out-35',
    section: 'js-output',
    number: 35,
    question: 'Output of: console.log(+true); console.log(!"sai");',
    answer: `**Output**: \`1, false\`
**Explanation**: Unary \`+\` converts \`true\` to \`1\`. Logical NOT \`!\` on truthy string \`"sai"\` gives \`false\`.`
  },
  {
    id: 'out-36',
    section: 'js-output',
    number: 36,
    question: 'Outputs of:\nconsole.log([] + []);\nconsole.log([1] + []);\nconsole.log([1] + "abc");',
    answer: `**Outputs**:
- \`[] + []\` -> \`""\`
- \`[1] + []\` -> \`"1"\`
- \`[1] + "abc"\` -> \`"1abc"\``
  },
  {
    id: 'out-37',
    section: 'js-output',
    number: 37,
    question: 'Output of: function getAge(...args) { console.log(typeof args); } getAge(21);',
    answer: `**Output**: \`"object"\`
**Explanation**: Rest parameter \`args\` is an array instance, and \`typeof []\` returns \`"object"\`.`
  },
  {
    id: 'out-38',
    section: 'js-output',
    number: 38,
    question: 'Output of: const obj = { a: "one", b: "two", a: "three" }; console.log(obj);',
    answer: `**Output**: \`{ a: "three", b: "two" }\``
  },
  {
    id: 'out-39',
    section: 'js-output',
    number: 39,
    question: 'Output of: var z = 1, y = z = typeof y; console.log(y);',
    answer: `**Output**: \`"undefined"\`
**Explanation**: Right-to-left assignment. \`typeof y\` is evaluated first (where \`y\` is hoisted as \`undefined\`), returning \`"undefined"\`.`
  },
  {
    id: 'out-40',
    section: 'js-output',
    number: 40,
    question: 'Outputs of:\nconsole.log(false || null || "Hello");\nconsole.log(false && null && "Hello");',
    answer: `**Outputs**: \`"Hello"\` and \`false\`
**Explanation**: \`||\` returns first truthy value. \`&&\` returns first falsy value.`
  },
  {
    id: 'out-41',
    section: 'js-output',
    number: 41,
    question: 'Output of: const numbers = [1,2,3,4,5]; const [x, ...y] = numbers; console.log(x, y);',
    answer: `**Output**: \`1\` and \`[2, 3, 4, 5]\``
  },
  {
    id: 'out-42',
    section: 'js-output',
    number: 42,
    question: 'Output of: const str = "abc" + + "def"; console.log(str);',
    answer: `**Output**: \`"abcNaN"\`
**Explanation**: Unary \`+ "def"\` evaluates to \`NaN\`. String concatenation \`"abc" + NaN\` yields \`"abcNaN"\`.`
  },
  {
    id: 'out-43',
    section: 'js-output',
    number: 43,
    question: 'Output of: let newlist = [1].push(2); console.log(newlist.push(3));',
    answer: `**Output**: \`TypeError: newlist.push is not a function\`
**Explanation**: \`Array.prototype.push()\` returns the **new length** (number \`2\`), not the array!`
  },
  {
    id: 'out-44',
    section: 'js-output',
    number: 44,
    question: 'Outputs of:\nconsole.log(0 || 1);\nconsole.log(1 || 2);\nconsole.log(0 && 1);\nconsole.log(1 && 2);',
    answer: `**Outputs**: \`1, 1, 0, 2\``
  },
  {
    id: 'out-45',
    section: 'js-output',
    number: 45,
    question: 'Output of: console.log(data()); var data = function() { return "1"; };',
    answer: `**Output**: \`TypeError: data is not a function\`
**Explanation**: Function expression is hoisted as \`var data = undefined\`.`
  },
  {
    id: 'out-46',
    section: 'js-output',
    number: 46,
    question: 'Output of: const arr = [1,2,3]; arr[5] = 6; console.log(arr.length);',
    answer: `**Output**: \`6\`
**Explanation**: Array length equals highest index + 1 (\`5 + 1 = 6\`).`
  },
  {
    id: 'out-47',
    section: 'js-output',
    number: 47,
    question: 'Output of: const obj = { a: 1 }; obj.a = 2; console.log(obj);',
    answer: `**Output**: \`{ a: 2 }\` (\`const\` prevents object variable reassignment, not property mutation).`
  },
  {
    id: 'out-48',
    section: 'js-output',
    number: 48,
    question: 'Output of: let x = { a: undefined, b: null }; console.log(JSON.stringify(x));',
    answer: `**Output**: \`'{"b":null}'\`
**Explanation**: \`JSON.stringify()\` omits keys with \`undefined\` values.`
  },
  {
    id: 'out-49',
    section: 'js-output',
    number: 49,
    question: 'Outputs of: console.log(true + 1); console.log(true + "1");',
    answer: `**Outputs**: \`2\` and \`"true1"\``
  },
  {
    id: 'out-50',
    section: 'js-output',
    number: 50,
    question: 'Output of: const str = "hello"; str.data = "val"; console.log(str.data);',
    answer: `**Output**: \`undefined\`
**Explanation**: Custom properties assigned to primitive strings are discarded immediately.`
  }
];
