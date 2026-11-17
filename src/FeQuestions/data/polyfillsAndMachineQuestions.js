// Frontend Interview Bible - Polyfills, Machine Coding & Performance Optimization

export const POLYFILL_QUESTIONS = [
  {
    id: 'poly-1',
    section: 'polyfills',
    number: 1,
    question: 'forEach polyfill.',
    answer: `A spec-compliant polyfill for **\`Array.prototype.forEach\`** must:
1. Handle \`null\` or \`undefined\` context (\`this\`).
2. Verify the callback is a callable function.
3. Skip deleted or empty slots in **sparse arrays** using the \`in\` operator.
4. Support the optional **\`thisArg\`** execution context.

\`\`\`javascript
if (!Array.prototype.myForEach) {
  Array.prototype.myForEach = function(callback, thisArg) {
    if (this == null) {
      throw new TypeError("Array.prototype.myForEach called on null or undefined");
    }
    if (typeof callback !== "function") {
      throw new TypeError(callback + " is not a function");
    }

    const O = Object(this);
    const len = O.length >>> 0; // Unsigned 32-bit integer conversion

    for (let i = 0; i < len; i++) {
      // 'in' operator check ensures sparse array empty slots are skipped!
      if (i in O) {
        callback.call(thisArg, O[i], i, O);
      }
    }
  };
}

// Verification with sparse array:
const arr = [1, , 3]; // index 1 is empty slot
arr.myForEach((val, idx) => console.log(idx, val));
// Output: 0 1, 2 3 (skips index 1!)
\`\`\`

👉 Interview Tip: Always highlight the \`if (i in O)\` check! Junior candidates write simple \`for\` loops that pass \`undefined\` for sparse slots, whereas the ECMAScript spec mandates skipping empty holes.`
  },
  {
    id: 'poly-2',
    section: 'polyfills',
    number: 2,
    question: 'Map polyfill.',
    answer: `A spec-compliant polyfill for **\`Array.prototype.map\`** constructs a new array of matching length, invokes the callback on each defined slot, and returns the newly allocated array.

\`\`\`javascript
if (!Array.prototype.myMap) {
  Array.prototype.myMap = function(callback, thisArg) {
    if (this == null) {
      throw new TypeError("Array.prototype.myMap called on null or undefined");
    }
    if (typeof callback !== "function") {
      throw new TypeError(callback + " is not a function");
    }

    const O = Object(this);
    const len = O.length >>> 0;
    const result = new Array(len); // Pre-allocate array capacity

    for (let i = 0; i < len; i++) {
      if (i in O) {
        result[i] = callback.call(thisArg, O[i], i, O);
      }
    }

    return result;
  };
}

const numbers = [10, 20, 30];
const doubled = numbers.myMap((n, i) => n * 2 + i);
console.log(doubled); // [20, 41, 62]
\`\`\`

### Complexity:
- **Time Complexity**: $\\mathcal{O}(n)$ linear time.
- **Space Complexity**: $\\mathcal{O}(n)$ for the mapped result array.`
  },
  {
    id: 'poly-3',
    section: 'polyfills',
    number: 3,
    question: 'Filter polyfill.',
    answer: `A spec-compliant polyfill for **\`Array.prototype.filter\`** creates a new array and pushes only elements for which the callback returns a truthy value.

\`\`\`javascript
if (!Array.prototype.myFilter) {
  Array.prototype.myFilter = function(callback, thisArg) {
    if (this == null) {
      throw new TypeError("Array.prototype.myFilter called on null or undefined");
    }
    if (typeof callback !== "function") {
      throw new TypeError(callback + " is not a function");
    }

    const O = Object(this);
    const len = O.length >>> 0;
    const result = [];

    for (let i = 0; i < len; i++) {
      if (i in O) {
        const val = O[i];
        // Coerce callback return to boolean
        if (Boolean(callback.call(thisArg, val, i, O))) {
          result.push(val);
        }
      }
    }

    return result;
  };
}

const scores = [85, 42, 98, 71, 33];
const passing = scores.myFilter(s => s >= 70);
console.log(passing); // [85, 98, 71]
\`\`\``
  },
  {
    id: 'poly-4',
    section: 'polyfills',
    number: 4,
    question: 'Reduce polyfill.',
    answer: `**\`Array.prototype.reduce\`** is the most complex array polyfill because it must handle cases where **\`initialValue\` is provided vs omitted**.

### Spec Rules:
1. If \`initialValue\` is provided: accumulator starts as \`initialValue\`, and iteration starts at index \`0\`.
2. If \`initialValue\` is omitted: accumulator starts as the **first non-empty slot** in the array, and iteration starts at the subsequent index.
3. If the array is empty and no \`initialValue\` is supplied: throws **\`TypeError: Reduce of empty array with no initial value\`**.

\`\`\`javascript
if (!Array.prototype.myReduce) {
  Array.prototype.myReduce = function(callback, initialValue) {
    if (this == null) {
      throw new TypeError("Array.prototype.myReduce called on null or undefined");
    }
    if (typeof callback !== "function") {
      throw new TypeError(callback + " is not a function");
    }

    const O = Object(this);
    const len = O.length >>> 0;
    let k = 0;
    let accumulator;

    // Check if initialValue argument was provided (inspect arguments length)
    if (arguments.length >= 2) {
      accumulator = initialValue;
    } else {
      // Find the first present element for empty/sparse arrays
      let kPresent = false;
      while (k < len) {
        if (k in O) {
          accumulator = O[k];
          kPresent = true;
          k++;
          break;
        }
        k++;
      }
      if (!kPresent) {
        throw new TypeError("Reduce of empty array with no initial value");
      }
    }

    while (k < len) {
      if (k in O) {
        accumulator = callback(accumulator, O[k], k, O);
      }
      k++;
    }

    return accumulator;
  };
}

console.log([1, 2, 3, 4].myReduce((acc, n) => acc + n, 0)); // 10
console.log([1, 2, 3, 4].myReduce((acc, n) => acc * n));    // 24 (initialValue omitted)
\`\`\``
  },
  {
    id: 'poly-5',
    section: 'polyfills',
    number: 5,
    question: 'Some and Every function polyfill.',
    answer: `Short-circuiting polyfills for **\`some()\`** and **\`every()\`**:

\`\`\`javascript
// some: returns true as soon as ANY element passes (Short-circuiting)
Array.prototype.mySome = function(callback, thisArg) {
  if (this == null) throw new TypeError();
  if (typeof callback !== "function") throw new TypeError();

  const O = Object(this);
  const len = O.length >>> 0;

  for (let i = 0; i < len; i++) {
    if (i in O && callback.call(thisArg, O[i], i, O)) {
      return true; // Short-circuit early!
    }
  }
  return false;
};

// every: returns false as soon as ANY element fails (Short-circuiting)
Array.prototype.myEvery = function(callback, thisArg) {
  if (this == null) throw new TypeError();
  if (typeof callback !== "function") throw new TypeError();

  const O = Object(this);
  const len = O.length >>> 0;

  for (let i = 0; i < len; i++) {
    if (i in O && !callback.call(thisArg, O[i], i, O)) {
      return false; // Short-circuit early!
    }
  }
  return true;
};
\`\`\``
  },
  {
    id: 'poly-6',
    section: 'polyfills',
    number: 6,
    question: 'Push and Pop polyfill.',
    answer: `\`\`\`javascript
// myPush: Appends items and returns the new length property
Array.prototype.myPush = function(...items) {
  const O = Object(this);
  let len = O.length >>> 0;

  for (let i = 0; i < items.length; i++) {
    O[len] = items[i];
    len++;
  }

  O.length = len;
  return len;
};

// myPop: Removes last element and returns it
Array.prototype.myPop = function() {
  const O = Object(this);
  let len = O.length >>> 0;

  if (len === 0) {
    O.length = 0;
    return undefined;
  }

  const lastIndex = len - 1;
  const element = O[lastIndex];
  delete O[lastIndex];
  O.length = lastIndex;

  return element;
};
\`\`\``
  },
  {
    id: 'poly-7',
    section: 'polyfills',
    number: 7,
    question: 'Slice and Splice polyfill.',
    answer: `Spec-compliant implementation of \`slice\` handling negative indices and boundary clamping:

\`\`\`javascript
// mySlice: Pure, non-mutating shallow copy
Array.prototype.mySlice = function(start = 0, end) {
  const O = Object(this);
  const len = O.length >>> 0;
  const result = [];

  // Convert negative start index relative to length
  let k = start < 0 ? Math.max(len + start, 0) : Math.min(start, len);
  // Convert negative or omitted end index
  let finalEnd = end === undefined ? len : (end < 0 ? Math.max(len + end, 0) : Math.min(end, len));

  while (k < finalEnd) {
    if (k in O) result.push(O[k]);
    k++;
  }

  return result;
};

const letters = ["a", "b", "c", "d", "e"];
console.log(letters.mySlice(1, 3));  // ["b", "c"]
console.log(letters.mySlice(-2));    // ["d", "e"]
\`\`\``
  },
  {
    id: 'poly-8',
    section: 'polyfills',
    number: 8,
    question: 'Call Bind and Apply polyfill.',
    answer: `Production polyfills for \`call\`, \`apply\`, and \`bind\` using unique Symbol property keys:

\`\`\`javascript
// 1. Function.prototype.myCall
Function.prototype.myCall = function(context = window, ...args) {
  if (typeof this !== "function") throw new TypeError("Must be a function");
  
  context = (context !== null && context !== undefined) ? Object(context) : window;
  const fnKey = Symbol("fnKey");
  context[fnKey] = this;

  const result = context[fnKey](...args);
  delete context[fnKey];
  return result;
};

// 2. Function.prototype.myApply
Function.prototype.myApply = function(context = window, argsArray = []) {
  if (typeof this !== "function") throw new TypeError("Must be a function");
  
  context = (context !== null && context !== undefined) ? Object(context) : window;
  const fnKey = Symbol("fnKey");
  context[fnKey] = this;

  const result = Array.isArray(argsArray) ? context[fnKey](...argsArray) : context[fnKey]();
  delete context[fnKey];
  return result;
};

// 3. Function.prototype.myBind (Supports currying and 'new' constructor invocation!)
Function.prototype.myBind = function(context, ...boundArgs) {
  const originalFn = this;

  function boundFunction(...callArgs) {
    // If invoked with 'new', 'this' is an instance of boundFunction!
    const isNew = this instanceof boundFunction;
    return originalFn.apply(isNew ? this : context, [...boundArgs, ...callArgs]);
  }

  if (originalFn.prototype) {
    boundFunction.prototype = Object.create(originalFn.prototype);
  }

  return boundFunction;
};
\`\`\`

👉 Interview Tip: Pointing out that \`bind()\` must support the \`new\` operator (where the bound context is discarded in favor of the newly created instance) is the ultimate senior differentiator.`
  },
  {
    id: 'poly-9',
    section: 'polyfills',
    number: 9,
    question: 'Promise.all polyfill.',
    answer: `A spec-compliant polyfill for **\`Promise.all\`** must:
1. Return a Promise.
2. Resolve immediately with \`[]\` if the input iterable is empty.
3. Convert non-promise values using \`Promise.resolve(item)\`.
4. Preserve the exact input order of results regardless of completion speed.
5. **Fail-Fast**: Immediately reject if any promise rejects.

\`\`\`javascript
Promise.myAll = function(promises) {
  return new Promise((resolve, reject) => {
    if (!promises || typeof promises[Symbol.iterator] !== "function") {
      return reject(new TypeError("Argument must be an iterable"));
    }

    const items = Array.from(promises);
    if (items.length === 0) return resolve([]);

    const results = new Array(items.length);
    let resolvedCount = 0;

    items.forEach((item, index) => {
      // Promise.resolve wraps primitives in a resolved Promise
      Promise.resolve(item)
        .then((val) => {
          results[index] = val; // Store at original index (preserves order!)
          resolvedCount++;

          if (resolvedCount === items.length) {
            resolve(results);
          }
        })
        .catch(reject); // Immediate fail-fast rejection
    });
  });
};

// Test
const p1 = Promise.resolve(10);
const p2 = new Promise(res => setTimeout(() => res(20), 50));
const p3 = 30; // Plain value

Promise.myAll([p1, p2, p3]).then(console.log); // [10, 20, 30]
\`\`\``
  },
  {
    id: 'poly-10',
    section: 'polyfills',
    number: 10,
    question: 'Debounce polyfill.',
    answer: `**Debounce** delays function execution until after a specified quiet period (e.g. 300ms) has elapsed since the last time the function was invoked. Ideal for search inputs and resize listeners.

\`\`\`javascript
function debounce(fn, delay, { immediate = false } = {}) {
  let timerId = null;

  function debounced(...args) {
    const context = this;
    const callNow = immediate && !timerId;

    clearTimeout(timerId);

    timerId = setTimeout(() => {
      timerId = null;
      if (!immediate) {
        fn.apply(context, args);
      }
    }, delay);

    if (callNow) {
      fn.apply(context, args);
    }
  }

  // Cancel method for component cleanup
  debounced.cancel = () => {
    clearTimeout(timerId);
    timerId = null;
  };

  return debounced;
}
\`\`\``
  },
  {
    id: 'poly-11',
    section: 'polyfills',
    number: 11,
    question: 'Throttle polyfill.',
    answer: `**Throttle** guarantees that a function executes at most once per specified time interval (e.g. once every 200ms), ignoring continuous triggers in between. Ideal for scroll tracking, dragging, and gaming loops.

\`\`\`javascript
function throttle(fn, interval) {
  let lastExecTime = 0;
  let timerId = null;

  return function throttled(...args) {
    const context = this;
    const now = performance.now();
    const remainingTime = interval - (now - lastExecTime);

    if (remainingTime <= 0) {
      if (timerId) {
        clearTimeout(timerId);
        timerId = null;
      }
      lastExecTime = now;
      fn.apply(context, args);
    } else if (!timerId) {
      // Trailing edge trigger: ensures the final trailing event isn't lost
      timerId = setTimeout(() => {
        lastExecTime = performance.now();
        timerId = null;
        fn.apply(context, args);
      }, remainingTime);
    }
  };
}
\`\`\``
  },
  {
    id: 'poly-12',
    section: 'polyfills',
    number: 12,
    question: 'JSON.stringify polyfill.',
    answer: `A recursive implementation of \`JSON.stringify()\` handling types, dates, and omitting \`undefined\`:

\`\`\`javascript
function customStringify(data) {
  // Primitives
  if (data === null) return "null";
  if (typeof data === "number" || typeof data === "boolean") return String(data);
  if (typeof data === "string") return \`"\${data.replace(/"/g, '\\\\"')}"\`;
  if (typeof data === "bigint") throw new TypeError("Do not know how to serialize a BigInt");
  if (typeof data === "function" || typeof data === "symbol" || data === undefined) {
    return undefined;
  }

  // Dates
  if (data instanceof Date) return \`"\${data.toISOString()}"\`;

  // Arrays
  if (Array.isArray(data)) {
    const arrayElements = data.map(item => {
      const res = customStringify(item);
      return res === undefined ? "null" : res; // undefined in arrays becomes null
    });
    return \`[\${arrayElements.join(",")}]\`;
  }

  // Objects
  if (typeof data === "object") {
    const entries = [];
    for (const key of Object.keys(data)) {
      const valStr = customStringify(data[key]);
      // Skip undefined, functions, and symbols in objects
      if (valStr !== undefined) {
        entries.push(\`"\${key}":\${valStr}\`);
      }
    }
    return \`{\${entries.join(",")}}\`;
  }
}
\`\`\``
  }
];

export const MACHINE_CODING_QUESTIONS = [
  {
    id: 'mc-1',
    section: 'machine-coding',
    number: 1,
    question: 'Moves all 0s to the right of the array.',
    answer: `Two-pointer in-place partition moving zeroes to the end while maintaining the relative order of non-zero elements:

\`\`\`javascript
function moveZeroes(nums) {
  let writePointer = 0;

  // Move all non-zero elements to front
  for (let readPointer = 0; readPointer < nums.length; readPointer++) {
    if (nums[readPointer] !== 0) {
      // Swap to preserve non-zero elements
      [nums[writePointer], nums[readPointer]] = [nums[readPointer], nums[writePointer]];
      writePointer++;
    }
  }

  return nums;
}

const arr = [0, 1, 0, 3, 12];
console.log(moveZeroes(arr)); // [1, 3, 12, 0, 0]
\`\`\`

### Complexity:
- **Time Complexity**: $\\mathcal{O}(n)$ single pass.
- **Space Complexity**: $\\mathcal{O}(1)$ in-place swap without auxiliary array.`
  },
  {
    id: 'mc-2',
    section: 'machine-coding',
    number: 2,
    question: 'Find number in array where each adjacent element is +1 or -1.',
    answer: `Step-skipping search algorithm that runs faster than linear time by jumping indices:

\`\`\`javascript
function searchStepArray(arr, target) {
  let i = 0;
  while (i < arr.length) {
    if (arr[i] === target) return i;

    // Because adjacent difference is at most 1, target is at least |arr[i] - target| steps away!
    const diff = Math.abs(arr[i] - target);
    i += diff;
  }
  return -1;
}

const arr = [4, 5, 6, 7, 6, 5, 6, 7, 8, 9];
console.log(searchStepArray(arr, 8)); // index 8
\`\`\``
  },
  {
    id: 'mc-3',
    section: 'machine-coding',
    number: 3,
    question: 'Write a function to shuffle an array (Fisher-Yates).',
    answer: `The **Fisher-Yates (Knuth) Shuffle** is the mathematically unbiased $\\mathcal{O}(n)$ in-place array shuffling algorithm.

\`\`\`javascript
function fisherYatesShuffle(arr) {
  const result = [...arr]; // Avoid mutating input

  for (let i = result.length - 1; i > 0; i--) {
    // Generate random index between 0 and i inclusive
    const j = Math.floor(Math.random() * (i + 1));
    // Swap elements
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}

console.log(fisherYatesShuffle([1, 2, 3, 4, 5]));
\`\`\`

👉 Interview Tip: Sorting with \`arr.sort(() => Math.random() - 0.5)\` is biased and does not produce a uniform distribution. Always write Fisher-Yates!`
  },
  {
    id: 'mc-4',
    section: 'machine-coding',
    number: 4,
    question: 'Write a function which gives us a fibonacci sequence of a given number.',
    answer: `\`\`\`javascript
function getFibonacci(count) {
  if (count <= 0) return [];
  if (count === 1) return [0];

  const fib = [0, 1];
  while (fib.length < count) {
    fib.push(fib[fib.length - 1] + fib[fib.length - 2]);
  }
  return fib;
}
\`\`\``
  },
  {
    id: 'mc-5',
    section: 'machine-coding',
    number: 5,
    question: 'Remove all bad numbers (-1) from array.',
    answer: `\`\`\`javascript
// Method 1: Pure filter
const removeBadNumbers = (arr) => arr.filter(n => n !== -1);

// Method 2: In-place removal (O(1) Memory)
function removeBadNumbersInPlace(arr) {
  let write = 0;
  for (let read = 0; read < arr.length; read++) {
    if (arr[read] !== -1) {
      arr[write++] = arr[read];
    }
  }
  arr.length = write;
  return arr;
}
\`\`\``
  },
  {
    id: 'mc-6',
    section: 'machine-coding',
    number: 6,
    question: 'Write a function to flatten a given array.',
    answer: `Spec-compliant implementation of \`Array.prototype.flat(depth)\`:

\`\`\`javascript
function customFlat(arr, depth = 1) {
  if (!Array.isArray(arr)) return [];
  if (depth <= 0) return arr.slice();

  return arr.reduce((acc, item) => {
    if (Array.isArray(item)) {
      acc.push(...customFlat(item, depth - 1));
    } else {
      acc.push(item);
    }
    return acc;
  }, []);
}

const deeplyNested = [1, [2, [3, [4]]], 5];
console.log(customFlat(deeplyNested, 2)); // [1, 2, 3, [4], 5]
console.log(customFlat(deeplyNested, Infinity)); // [1, 2, 3, 4, 5]
\`\`\``
  },
  {
    id: 'mc-7',
    section: 'machine-coding',
    number: 7,
    question: 'Convert string "a.b.c.d.e" into nested object {a:{b:{c:{d:"e"}}}}.',
    answer: `\`\`\`javascript
function stringToNestedObject(pathStr) {
  const segments = pathStr.split(".");
  const lastIndex = segments.length - 1;

  return segments.slice(0, -1).reduceRight((acc, key, i) => {
    return { [key]: i === lastIndex - 1 ? segments[lastIndex] : acc };
  }, {});
}

console.log(stringToNestedObject("a.b.c.d.e"));
// Output: { a: { b: { c: { d: "e" } } } }
\`\`\``
  },
  {
    id: 'mc-8',
    section: 'machine-coding',
    number: 8,
    question: 'Write a function which merges two given arrays.',
    answer: `\`\`\`javascript
// Unsorted concatenation
const mergeSimple = (a, b) => [...a, ...b];

// Sorted merge (O(N+M))
function mergeSorted(a, b) {
  const result = [];
  let i = 0, j = 0;
  while (i < a.length && j < b.length) {
    result.push(a[i] < b[j] ? a[i++] : b[j++]);
  }
  return [...result, ...a.slice(i), ...b.slice(j)];
}
\`\`\``
  },
  {
    id: 'mc-9',
    section: 'machine-coding',
    number: 9,
    question: 'Write a function which removes duplicates from array.',
    answer: `\`\`\`javascript
const removeDuplicates = arr => [...new Set(arr)];
\`\`\``
  },
  {
    id: 'mc-10',
    section: 'machine-coding',
    number: 10,
    question: 'Write a function which converts a given function into curry version of it (sum(2)(2)).',
    answer: `General Auto-Currying implementation:

\`\`\`javascript
function curry(fn) {
  return function curried(...args) {
    // If accumulated arguments satisfy function arity, execute:
    if (args.length >= fn.length) {
      return fn.apply(this, args);
    }
    // Otherwise return wrapper gathering subsequent arguments:
    return function(...moreArgs) {
      return curried.apply(this, [...args, ...moreArgs]);
    };
  };
}

const add = (a, b, c) => a + b + c;
const curriedAdd = curry(add);

console.log(curriedAdd(1)(2)(3)); // 6
console.log(curriedAdd(1, 2)(3)); // 6
\`\`\``
  },
  {
    id: 'mc-11',
    section: 'machine-coding',
    number: 11,
    question: 'Missing number from 0..n.',
    answer: `Find missing number in $\\mathcal{O}(n)$ time and $\\mathcal{O}(1)$ space using Gauss's summation formula:
$$\\text{ExpectedSum} = \\frac{n(n + 1)}{2}$$

\`\`\`javascript
function findMissingNumber(nums) {
  const n = nums.length;
  const expectedSum = (n * (n + 1)) / 2;
  const actualSum = nums.reduce((acc, num) => acc + num, 0);

  return expectedSum - actualSum;
}

console.log(findMissingNumber([3, 0, 1])); // 2 (since 0, 1, 2, 3)
\`\`\``
  },
  {
    id: 'mc-12',
    section: 'machine-coding',
    number: 12,
    question: 'Write a function which deep-clones a given object.',
    answer: `Production deep clone supporting circular references, Dates, RegExps, and Sets:

\`\`\`javascript
function deepClone(obj, hash = new WeakMap()) {
  if (obj === null || typeof obj !== "object") return obj;
  if (obj instanceof Date) return new Date(obj.getTime());
  if (obj instanceof RegExp) return new RegExp(obj.source, obj.flags);

  // Circular reference detection
  if (hash.has(obj)) return hash.get(obj);

  const clone = Array.isArray(obj) ? [] : Object.create(Object.getPrototypeOf(obj));
  hash.set(obj, clone);

  // Clone symbols and regular keys
  const keys = [...Object.keys(obj), ...Object.getOwnPropertySymbols(obj)];
  for (const key of keys) {
    clone[key] = deepClone(obj[key], hash);
  }

  return clone;
}

// Or modern browser standard:
// const clone = structuredClone(original);
\`\`\``
  },
  {
    id: 'mc-13',
    section: 'machine-coding',
    number: 13,
    question: 'Write a function which deep-compares passed value.',
    answer: `\`\`\`javascript
function deepEqual(a, b) {
  if (a === b) return true;

  if (a === null || typeof a !== "object" || b === null || typeof b !== "object") {
    return false;
  }

  const keysA = Object.keys(a);
  const keysB = Object.keys(b);

  if (keysA.length !== keysB.length) return false;

  for (const key of keysA) {
    if (!Object.prototype.hasOwnProperty.call(b, key) || !deepEqual(a[key], b[key])) {
      return false;
    }
  }

  return true;
}
\`\`\``
  },
  {
    id: 'mc-14',
    section: 'machine-coding',
    number: 14,
    question: 'Write a function which implements ==.',
    answer: `Implements the ECMAScript IsLooselyEqual algorithm:

\`\`\`javascript
function customLooselyEqual(x, y) {
  // 1. Same Type
  if (typeof x === typeof y) return x === y;

  // 2. null and undefined
  if ((x === null && y === undefined) || (x === undefined && y === null)) return true;

  // 3. Number and String
  if (typeof x === "number" && typeof y === "string") return x === Number(y);
  if (typeof x === "string" && typeof y === "number") return Number(x) === y;

  // 4. Boolean conversions
  if (typeof x === "boolean") return customLooselyEqual(Number(x), y);
  if (typeof y === "boolean") return customLooselyEqual(x, Number(y));

  // 5. Object to primitive
  if (typeof x === "object" && x !== null && (typeof y === "string" || typeof y === "number")) {
    return customLooselyEqual(String(x), y);
  }
  if (typeof y === "object" && y !== null && (typeof x === "string" || typeof x === "number")) {
    return customLooselyEqual(x, String(y));
  }

  return false;
}
\`\`\``
  },
  {
    id: 'mc-15',
    section: 'machine-coding',
    number: 15,
    question: 'Write a function which works like a new Keyword.',
    answer: `\`\`\`javascript
function customNew(Constructor, ...args) {
  // 1. Create empty object inheriting Constructor prototype
  const instance = Object.create(Constructor.prototype);

  // 2. Invoke constructor with instance bound as 'this'
  const result = Constructor.apply(instance, args);

  // 3. Return explicit object if returned, otherwise newly created instance
  return (typeof result === "object" && result !== null) ? result : instance;
}
\`\`\``
  },
  {
    id: 'mc-16',
    section: 'machine-coding',
    number: 16,
    question: 'Write a function which makes a chain of promise.',
    answer: `Sequentially executes an array of asynchronous tasks one after another:

\`\`\`javascript
function sequencePromises(tasks) {
  return tasks.reduce((promiseChain, currentTask) => {
    return promiseChain.then(results => 
      currentTask().then(result => [...results, result])
    );
  }, Promise.resolve([]));
}

// Or with async/await:
async function executeSequentially(tasks) {
  const results = [];
  for (const task of tasks) {
    results.push(await task());
  }
  return results;
}
\`\`\``
  },
  {
    id: 'mc-17',
    section: 'machine-coding',
    number: 17,
    question: 'Validate valid parentheses string.',
    answer: `Validates matching bracket pairs \`()\`, \`{}\`, \`[]\` using a LIFO Stack in $\\mathcal{O}(n)$ time:

\`\`\`javascript
function isValidParentheses(s) {
  const stack = [];
  const map = { ')': '(', '}': '{', ']': '[' };

  for (const char of s) {
    if (char === '(' || char === '{' || char === '[') {
      stack.push(char);
    } else if (char in map) {
      if (stack.pop() !== map[char]) return false;
    }
  }

  return stack.length === 0;
}

console.log(isValidParentheses("({[]})")); // true
console.log(isValidParentheses("([)]"));   // false
\`\`\``
  },
  {
    id: 'mc-18',
    section: 'machine-coding',
    number: 18,
    question: 'Implement string compression ("aaabbbcc" -> "a3b3c2").',
    answer: `\`\`\`javascript
function compressString(str) {
  if (!str) return "";

  let compressed = "";
  let count = 1;

  for (let i = 0; i < str.length; i++) {
    if (str[i] === str[i + 1]) {
      count++;
    } else {
      compressed += str[i] + count;
      count = 1;
    }
  }

  // Return original if compressed is not shorter
  return compressed.length < str.length ? compressed : str;
}

console.log(compressString("aaabbbcc")); // "a3b3c2"
\`\`\``
  }
];

export const PERFORMANCE_QUESTIONS = [
  {
    id: 'perf-1',
    section: 'performance',
    number: 1,
    question: 'How will you decrease the initial load time?',
    answer: `Comprehensive optimization blueprint to minimize initial page load latency:

1. **Code Splitting & Dynamic Imports**: Split route components with \`React.lazy()\` so clients download only initial route bundles.
2. **Optimize Assets**: Compress images to next-gen formats (WebP, AVIF) and lazy load below-the-fold media with \`loading="lazy"\`.
3. **Minimize Critical CSS**: Inline critical above-the-fold CSS and load non-critical stylesheets asynchronously.
4. **Tree-Shaking**: Use ES6 modules and avoid importing full monolithic libraries.
5. **Modern CDN & HTTP/2 / HTTP/3**: Utilize geographically distributed edge caching with multiplexing and header compression.
6. **Resource Hints**: Configure \`<link rel="preconnect">\` and \`<link rel="preload">\` for critical fonts and hero assets.`
  },
  {
    id: 'perf-2',
    section: 'performance',
    number: 2,
    question: 'What is CDN? Explain benefits.',
    answer: `A **Content Delivery Network (CDN)** is a geographically distributed network of proxy Edge servers that store cached copies of static assets (JS, CSS, images, videos) physically close to end users.

### Key Benefits:
- **Low Latency & High Bandwidth**: Users in Tokyo fetch assets from a Tokyo edge node rather than round-tripping to a Virginia origin server.
- **Origin Server Offloading**: Edge servers handle 90%+ of static hits, dramatically reducing origin load.
- **DDoS Protection & Edge Security**: Absorbs distributed traffic spikes and filters attacks at the edge (Cloudflare, Fastly).`
  },
  {
    id: 'perf-3',
    section: 'performance',
    number: 3,
    question: 'What are the different cache mechanisms provided by browsers?',
    answer: `The 5-layer browser caching architecture:

1. **Memory Cache**: In-memory cache holding resources fetched during current session (instant 0ms read).
2. **Service Worker Cache API**: Programmable caching for offline PWAs via CacheStorage.
3. **HTTP Disk Cache**: Controlled by HTTP response headers (\`Cache-Control: max-age=31536000, immutable\`, \`ETag\`, \`Last-Modified\`).
4. **Client Web Storage**: \`localStorage\` (~5MB permanent), \`sessionStorage\` (~5MB per tab).
5. **IndexedDB**: Asynchronous transactional NoSQL database for large structured datasets.`
  },
  {
    id: 'perf-4',
    section: 'performance',
    number: 4,
    question: 'What is http only cookie.',
    answer: `An **\`HttpOnly\`** cookie is an HTTP cookie configured with the \`HttpOnly\` flag, which strictly forbids client-side JavaScript from reading or writing it via \`document.cookie\`.

### Why It Is Essential for Security:
- Even if an attacker executes arbitrary Cross-Site Scripting (XSS) on your website, they **cannot read the session token** stored in an \`HttpOnly\` cookie, preventing account takeover.`
  },
  {
    id: 'perf-5',
    section: 'performance',
    number: 5,
    question: 'What is CORS?',
    answer: `**CORS (Cross-Origin Resource Sharing)** is a browser security mechanism that uses HTTP headers to allow servers to declare which origins are permitted to access their API resources.

\`\`\`http
Access-Control-Allow-Origin: https://myapp.com
Access-Control-Allow-Methods: GET, POST, PUT, DELETE
Access-Control-Allow-Headers: Content-Type, Authorization
\`\`\``
  },
  {
    id: 'perf-6',
    section: 'performance',
    number: 6,
    question: 'How will you handle 10000 dom elements?',
    answer: `Rendering 10,000 real DOM nodes simultaneously causes severe browser memory bloat and layout thrashing.

### The Solution: Virtualized Windowing
- Render **only the visible elements in the current viewport window** (e.g. 20 items) plus a small overscan buffer.
- As the user scrolls, reuse existing DOM nodes, updating their content based on scroll offset calculations.
- Use libraries like **\`react-window\`** or **\`@tanstack/react-virtual\`** to maintain 60 FPS scrolling regardless of list size (10,000 or 1,000,000 rows).`
  },
  {
    id: 'perf-7',
    section: 'performance',
    number: 7,
    question: 'What is DNS lookup?',
    answer: `**DNS (Domain Name System) Lookup** is the process by which a client browser queries DNS servers to translate a human-readable domain name (\`api.example.com\`) into a machine-routable IP address (\`93.184.216.34\`).`
  },
  {
    id: 'perf-8',
    section: 'performance',
    number: 8,
    question: 'What is preload, prefetch and preconnect.',
    answer: `| Resource Hint | Priority | When to Use |
| :--- | :--- | :--- |
| **\`preload\`** | **High** | Critical assets needed for **current page immediately** (hero images, web fonts) |
| **\`prefetch\`** | **Low** | Assets likely needed for **future navigation** (next route code chunks) |
| **\`preconnect\`** | **Early handshake** | Establishes early DNS, TCP, and TLS handshake to 3rd-party domains (e.g. Google Fonts) |

\`\`\`html
<link rel="preconnect" href="https://fonts.googleapis.com">
<link rel="preload" href="/fonts/inter.woff2" as="font" type="font/woff2" crossorigin>
<link rel="prefetch" href="/js/checkout-chunk.js">
\`\`\``
  },
  {
    id: 'perf-9',
    section: 'performance',
    number: 9,
    question: 'Explain SSR, ISR, and SSG.',
    answer: `Modern rendering architectures in frameworks like Next.js:

- **SSG (Static Site Generation)**: HTML pages pre-built at compile time. Fastest CDN caching; ideal for blogs and docs.
- **SSR (Server-Side Rendering)**: HTML compiled on-demand by Node.js server per incoming HTTP request. Fresh dynamic data; best for authenticated dashboards.
- **ISR (Incremental Static Regeneration)**: Statically generates pages, but revalidates and regenerates them in the background on a timer interval without rebuilding the whole site.`
  },
  {
    id: 'perf-10',
    section: 'performance',
    number: 10,
    question: 'What are compression strategies?',
    answer: `1. **Brotli (\`br\`)**: Modern text compression algorithm (~15-20% smaller than Gzip).
2. **Gzip (\`gzip\`)**: Universal fallback compression for older clients.
3. **Image Compression**: Modern AVIF and WebP lossy/lossless codecs.
4. **JavaScript Minification**: Terser / ESBuild stripping dead whitespace and mangling identifier names.`
  },
  {
    id: 'perf-11',
    section: 'performance',
    number: 11,
    question: 'What is DNS lookup optimization?',
    answer: `Use **\`<link rel="dns-prefetch" href="//api.thirdparty.com">\`** to resolve external IP addresses in the background before the user initiates a network request, shaving 50-200ms of latency off external calls.`
  },
  {
    id: 'perf-12',
    section: 'performance',
    number: 12,
    question: 'How will you prevent XSS Attack?',
    answer: `**Cross-Site Scripting (XSS)** prevention strategies:
1. **Never use \`innerHTML\` with untrusted inputs** (use \`textContent\` or sanitize via **DOMPurify**).
2. Enforce strict **Content Security Policy (CSP)** HTTP headers to block unauthorized script execution.
3. Store authentication tokens in **\`HttpOnly\` cookies** so scripts cannot read credentials.
4. Leverage React's automatic JSX string escaping.`
  },
  {
    id: 'perf-13',
    section: 'performance',
    number: 13,
    question: 'How will you prevent CSRF Attack?',
    answer: `**Cross-Site Request Forgery (CSRF)** prevention strategies:
1. **\`SameSite=Lax\` or \`SameSite=Strict\` Cookie Flag**: Prevents cookies from being transmitted in cross-site requests.
2. **Anti-CSRF Tokens**: Cryptographic token validated on server during form submissions.
3. **Verify Origin & Referer Headers**: Reject requests originating from external untrusted domains.`
  },
  {
    id: 'perf-14',
    section: 'performance',
    number: 14,
    question: 'What is SSE and WebSocket?',
    answer: `| Feature | Server-Sent Events (SSE) | WebSockets |
| :--- | :--- | :--- |
| **Direction** | **Unidirectional** (Server $\\to$ Client only) | **Full-Duplex Bidirectional** (Client $\\rightleftarrows$ Server) |
| **Protocol** | Standard HTTP/1.1 or HTTP/2 | Separate TCP protocol (\`ws://\` / \`wss://\`) |
| **Reconnection** | Native automatic reconnection | Must be handled manually in JavaScript |
| **Use-Case** | Live financial stock tickers, notification feeds | Chat applications, real-time multiplayer games |`
  },
  {
    id: 'perf-15',
    section: 'performance',
    number: 15,
    question: 'What are different font loading strategies?',
    answer: `1. **\`font-display: swap\`**: Immediately renders fallback system font, swapping to web font once downloaded to prevent invisible text (FOIT).
2. **Preload WOFF2**: \`<link rel="preload" href="/fonts/inter.woff2" as="font" type="font/woff2" crossorigin>\`.
3. **Font Subsetting**: Strip unused foreign language character glyphs to reduce font file size from 500KB to 30KB.`
  },
  {
    id: 'perf-16',
    section: 'performance',
    number: 16,
    question: 'What are screen readers?',
    answer: `**Screen Readers** (e.g. NVDA, JAWS on Windows; VoiceOver on macOS/iOS; TalkBack on Android) are assistive technologies that interpret the browser's **Accessibility Tree** to read visual webpage content aloud via synthesized speech or refreshable braille displays for visually impaired users.`
  },
  {
    id: 'perf-17',
    section: 'performance',
    number: 17,
    question: 'How can you make your website accessible for disabled person?',
    answer: `1. **Semantic HTML**: Use native elements (\`<button>\`, \`<nav>\`, \`<main>\`) that carry native keyboard and screen reader accessibility.
2. **Keyboard Navigation**: Ensure full interactivity via \`Tab\`, \`Enter\`, and \`Space\` without mouse traps.
3. **Color Contrast**: Adhere to WCAG AA minimum 4.5:1 contrast ratio.
4. **Alt Text**: Provide descriptive \`alt\` tags on informative images (\`alt=""\` for decorative images).
5. **Visible Focus Indicators**: Style \`:focus-visible\` with clear outlines.`
  },
  {
    id: 'perf-18',
    section: 'performance',
    number: 18,
    question: 'Explain aria attributes.',
    answer: `**ARIA (Accessible Rich Internet Applications)** attributes supply metadata when native HTML elements cannot convey full meaning:
- **\`aria-label\`**: Provides an accessible string label when visual text is absent (e.g. icon-only buttons).
- **\`aria-expanded="true|false"\`**: Communicates accordion or dropdown collapsed/open state.
- **\`aria-hidden="true"\`**: Hides purely decorative cosmetic elements from assistive technologies.`
  },
  {
    id: 'perf-19',
    section: 'performance',
    number: 19,
    question: 'Explain Critical Rendering path.',
    answer: `The sequence of steps browsers take to convert HTML, CSS, and JS into pixels:
1. **DOM Construction**: HTML $\\to$ DOM Tree.
2. **CSSOM Construction**: CSS $\\to$ CSS Object Model.
3. **Render Tree**: Combines visible DOM nodes with CSSOM computed styles.
4. **Layout (Reflow)**: Calculates geometric coordinates and bounding boxes.
5. **Paint**: Draws text, colors, borders, and shadows to bitmap layers.
6. **Composite**: GPU layers are composited and displayed on screen.`
  },
  {
    id: 'perf-20',
    section: 'performance',
    number: 20,
    question: 'What are 4 Web Vitals?',
    answer: `1. **LCP (Largest Contentful Paint)**: Loading speed of largest visible content block (Target: $\\le 2.5\\text{s}$).
2. **INP (Interaction to Next Paint)**: Page responsiveness to user clicks and taps (Target: $\\le 200\\text{ms}$).
3. **CLS (Cumulative Layout Shift)**: Visual stability preventing layout jumps (Target: $\\le 0.1$).
4. **FCP (First Contentful Paint)**: First rendered DOM element (Target: $\\le 1.8\\text{s}$).`
  },
  {
    id: 'perf-21',
    section: 'performance',
    number: 21,
    question: 'Explain package.json and package-lock.json.',
    answer: `- **\`package.json\`**: Manifest of dependencies with version ranges (\`^\`, \`~\`).
- **\`package-lock.json\`**: Locks exact dependency versions & dependency tree for deterministic builds.`
  },
  {
    id: 'perf-22',
    section: 'performance',
    number: 22,
    question: 'What is Tree Shaking?',
    answer: `**Tree Shaking** is a dead-code elimination optimization performed by module bundlers (Vite, Rollup, Webpack) that strips away unused exported functions from the final production bundle by analyzing ES6 \`import\` and \`export\` statements.`
  },
  {
    id: 'perf-23',
    section: 'performance',
    number: 23,
    question: 'Explain SEO. And how can you accommodate it in SPA?',
    answer: `**Search Engine Optimization (SEO)** in Single Page Applications:
1. **Server-Side Rendering (SSR) or Static Pre-rendering**: Delivers populated HTML to crawlers.
2. **Dynamic Head Tags**: Use libraries like \`react-helmet-async\` to populate canonical URLs, titles, and meta descriptions per route.
3. **Structured Data**: Embed Schema.org JSON-LD scripts.`
  },
  {
    id: 'perf-24',
    section: 'performance',
    number: 24,
    question: 'What is Robot.txt file?',
    answer: `A plain text file located at \`/robots.txt\` that instructs search engine web crawlers which URL paths they are allowed or forbidden to crawl:
\`\`\`txt
User-agent: *
Disallow: /admin/
Disallow: /api/
Sitemap: https://example.com/sitemap.xml
\`\`\``
  },
  {
    id: 'perf-25',
    section: 'performance',
    number: 25,
    question: 'Explain sitemap.xml file.',
    answer: `An XML document located at \`/sitemap.xml\` listing all canonical URLs on a website along with metadata (\`lastmod\`, \`changefreq\`, \`priority\`), helping search engines index deep pages efficiently.`
  },
  {
    id: 'perf-26',
    section: 'performance',
    number: 26,
    question: 'Explain differences between a production build and a development build.',
    answer: `| Feature | Development Build | Production Build |
| :--- | :--- | :--- |
| **Code Minification** | Unminified with comments | **Minified & mangled (Terser / ESBuild)** |
| **Hot Module Replacement** | Enabled (Fast Refresh) | Disabled |
| **Dead Code Elimination** | Disabled | **Full Tree-Shaking enabled** |
| **Bundle Size** | Heavy (5MB+) | **Lightweight (<200KB per chunk)** |
| **Debug Aids** | Detailed warnings & full SourceMaps | Clean logs, stripped prop-types |`
  },
  {
    id: 'perf-27',
    section: 'performance',
    number: 27,
    question: 'What is SourceMap file.',
    answer: `A **Source Map** (\`.map\` file) is a JSON mapping file that maps compiled, bundled, and minified production code back to its original source files (TypeScript, JSX, SCSS), enabling developers to debug production errors using exact line numbers in browser DevTools.`
  }
];
