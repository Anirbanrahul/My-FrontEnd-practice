export const POLYFILL_QUESTIONS = [
  {
    id: 'poly-1',
    section: 'polyfills',
    number: 1,
    question: 'forEach polyfill.',
    answer: `\`\`\`javascript
Array.prototype.myForEach = function(callback, thisArg) {
  for (let i = 0; i < this.length; i++) {
    if (i in this) {
      callback.call(thisArg, this[i], i, this);
    }
  }
};
\`\`\``
  },
  {
    id: 'poly-2',
    section: 'polyfills',
    number: 2,
    question: 'Map polyfill.',
    answer: `\`\`\`javascript
Array.prototype.myMap = function(callback, thisArg) {
  const res = new Array(this.length);
  for (let i = 0; i < this.length; i++) {
    if (i in this) {
      res[i] = callback.call(thisArg, this[i], i, this);
    }
  }
  return res;
};
\`\`\``
  },
  {
    id: 'poly-3',
    section: 'polyfills',
    number: 3,
    question: 'Filter polyfill.',
    answer: `\`\`\`javascript
Array.prototype.myFilter = function(callback, thisArg) {
  const res = [];
  for (let i = 0; i < this.length; i++) {
    if (i in this && callback.call(thisArg, this[i], i, this)) {
      res.push(this[i]);
    }
  }
  return res;
};
\`\`\``
  },
  {
    id: 'poly-4',
    section: 'polyfills',
    number: 4,
    question: 'Reduce polyfill.',
    answer: `\`\`\`javascript
Array.prototype.myReduce = function(callback, initialValue) {
  let hasInitial = arguments.length >= 2;
  let acc = hasInitial ? initialValue : this[0];
  let startIdx = hasInitial ? 0 : 1;
  for (let i = startIdx; i < this.length; i++) {
    if (i in this) {
      acc = callback(acc, this[i], i, this);
    }
  }
  return acc;
};
\`\`\``
  },
  {
    id: 'poly-5',
    section: 'polyfills',
    number: 5,
    question: 'Some and Every function polyfill.',
    answer: `\`\`\`javascript
Array.prototype.mySome = function(callback) {
  for (let i = 0; i < this.length; i++) {
    if (i in this && callback(this[i], i, this)) return true;
  }
  return false;
};
Array.prototype.myEvery = function(callback) {
  for (let i = 0; i < this.length; i++) {
    if (i in this && !callback(this[i], i, this)) return false;
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
Array.prototype.myPush = function(...items) {
  for (let item of items) {
    this[this.length] = item;
  }
  return this.length;
};
Array.prototype.myPop = function() {
  if (this.length === 0) return undefined;
  const item = this[this.length - 1];
  delete this[this.length - 1];
  this.length--;
  return item;
};
\`\`\``
  },
  {
    id: 'poly-7',
    section: 'polyfills',
    number: 7,
    question: 'Slice and Splice polyfill.',
    answer: `\`\`\`javascript
Array.prototype.mySlice = function(start = 0, end = this.length) {
  const res = [];
  let s = start < 0 ? Math.max(this.length + start, 0) : Math.min(start, this.length);
  let e = end < 0 ? Math.max(this.length + end, 0) : Math.min(end, this.length);
  for (let i = s; i < e; i++) res.push(this[i]);
  return res;
};
\`\`\``
  },
  {
    id: 'poly-8',
    section: 'polyfills',
    number: 8,
    question: 'Call Bind and Apply polyfill.',
    answer: `\`\`\`javascript
Function.prototype.myCall = function(context = window, ...args) {
  const fnSymbol = Symbol();
  context[fnSymbol] = this;
  const result = context[fnSymbol](...args);
  delete context[fnSymbol];
  return result;
};
Function.prototype.myBind = function(context, ...boundArgs) {
  const fn = this;
  return function(...args) {
    return fn.call(context, ...boundArgs, ...args);
  };
};
\`\`\``
  },
  {
    id: 'poly-9',
    section: 'polyfills',
    number: 9,
    question: 'Promise.all polyfill.',
    answer: `\`\`\`javascript
Promise.myAll = function(promises) {
  return new Promise((resolve, reject) => {
    let results = [];
    let completed = 0;
    if (promises.length === 0) return resolve([]);
    promises.forEach((p, i) => {
      Promise.resolve(p).then(res => {
        results[i] = res;
        completed++;
        if (completed === promises.length) resolve(results);
      }).catch(reject);
    });
  });
};
\`\`\``
  },
  {
    id: 'poly-10',
    section: 'polyfills',
    number: 10,
    question: 'Debounce polyfill.',
    answer: `\`\`\`javascript
function debounce(fn, delay) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
}
\`\`\``
  },
  {
    id: 'poly-11',
    section: 'polyfills',
    number: 11,
    question: 'Throttle polyfill.',
    answer: `\`\`\`javascript
function throttle(fn, delay) {
  let lastCall = 0;
  return function(...args) {
    const now = Date.now();
    if (now - lastCall >= delay) {
      lastCall = now;
      fn.apply(this, args);
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
    answer: `\`\`\`javascript
function customStringify(obj) {
  if (typeof obj === 'string') return '"' + obj + '"';
  if (typeof obj === 'number' || typeof obj === 'boolean' || obj === null) return String(obj);
  if (Array.isArray(obj)) return '[' + obj.map(customStringify).join(',') + ']';
  if (typeof obj === 'object') {
    let keys = Object.keys(obj);
    return '{' + keys.map(k => '"' + k + '":' + customStringify(obj[k])).join(',') + '}';
  }
  return undefined;
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
    answer: `Maintain write pointer \`k\`. Iterate read pointer, whenever \`nums[i] !== 0\`, swap \`nums[k++]\` with \`nums[i]\`.`
  },
  {
    id: 'mc-2',
    section: 'machine-coding',
    number: 2,
    question: 'Find number in array where each adjacent element is +1 or -1.',
    answer: `Use step-skipping: jump index by \`Math.abs(target - nums[i])\` to skip unnecessary checks in O(step) time!`
  },
  {
    id: 'mc-3',
    section: 'machine-coding',
    number: 3,
    question: 'Write a function to shuffle an array (Fisher-Yates).',
    answer: `\`\`\`javascript
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}
\`\`\``
  },
  {
    id: 'mc-4',
    section: 'machine-coding',
    number: 4,
    question: 'Write a function which gives us a fibonacci sequence of a given number.',
    answer: `\`\`\`javascript
function fibonacci(n) {
  let seq = [0, 1];
  for (let i = 2; i < n; i++) {
    seq.push(seq[i - 1] + seq[i - 2]);
  }
  return seq.slice(0, n);
}
\`\`\``
  },
  {
    id: 'mc-5',
    section: 'machine-coding',
    number: 5,
    question: 'Remove all bad numbers (-1) from array.',
    answer: `\`arr.filter(x => x !== -1)\``
  },
  {
    id: 'mc-6',
    section: 'machine-coding',
    number: 6,
    question: 'Write a function to flatten a given array.',
    answer: `\`\`\`javascript
function flat(arr, depth = 1) {
  return depth > 0 
    ? arr.reduce((acc, val) => acc.concat(Array.isArray(val) ? flat(val, depth - 1) : val), [])
    : arr.slice();
}
\`\`\``
  },
  {
    id: 'mc-7',
    section: 'machine-coding',
    number: 7,
    question: 'Convert string "a.b.c.d.e" into nested object {a:{b:{c:{d:"e"}}}}.',
    answer: `\`\`\`javascript
function stringToObject(str) {
  const parts = str.split('.');
  return parts.reduceRight((acc, key, i) => {
    if (i === parts.length - 2) return { [key]: parts[parts.length - 1] };
    return { [key]: acc };
  }, {});
}
\`\`\``
  },
  {
    id: 'mc-8',
    section: 'machine-coding',
    number: 8,
    question: 'Write a function which merges two given arrays.',
    answer: `\`[...arr1, ...arr2]\` or custom sorted merge.`
  },
  {
    id: 'mc-9',
    section: 'machine-coding',
    number: 9,
    question: 'Write a function which removes duplicates from array.',
    answer: `\`[...new Set(arr)]\``
  },
  {
    id: 'mc-10',
    section: 'machine-coding',
    number: 10,
    question: 'Write a function which converts a given function into curry version of it (sum(2)(2)).',
    answer: `\`\`\`javascript
function curry(fn) {
  return function curried(...args) {
    if (args.length >= fn.length) return fn.apply(this, args);
    return (...nextArgs) => curried.apply(this, args.concat(nextArgs));
  };
}
\`\`\``
  },
  {
    id: 'mc-11',
    section: 'machine-coding',
    number: 11,
    question: 'Missing number from 0..n.',
    answer: `\`expected = n*(n+1)/2\` minus \`sum(nums)\`.`
  },
  {
    id: 'mc-12',
    section: 'machine-coding',
    number: 12,
    question: 'Write a function which deep-clones a given object.',
    answer: `\`\`\`javascript
function deepClone(obj) {
  if (obj === null || typeof obj !== 'object') return obj;
  if (obj instanceof Date) return new Date(obj);
  if (Array.isArray(obj)) return obj.map(deepClone);
  const copy = {};
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) copy[key] = deepClone(obj[key]);
  }
  return copy;
}
\`\`\``
  },
  {
    id: 'mc-13',
    section: 'machine-coding',
    number: 13,
    question: 'Write a function which deep-compares passed value.',
    answer: `Recursively compare object keys and primitive equality.`
  },
  {
    id: 'mc-14',
    section: 'machine-coding',
    number: 14,
    question: 'Write a function which implements ==.',
    answer: `Custom coercion comparator handling string/number/boolean/null coercion.`
  },
  {
    id: 'mc-15',
    section: 'machine-coding',
    number: 15,
    question: 'Write a function which works like a new Keyword.',
    answer: `\`\`\`javascript
function customNew(Constructor, ...args) {
  const obj = Object.create(Constructor.prototype);
  const res = Constructor.apply(obj, args);
  return typeof res === 'object' && res !== null ? res : obj;
}
\`\`\``
  },
  {
    id: 'mc-16',
    section: 'machine-coding',
    number: 16,
    question: 'Write a function which makes a chain of promise.',
    answer: `\`tasks.reduce((p, task) => p.then(task), Promise.resolve())\``
  },
  {
    id: 'mc-17',
    section: 'machine-coding',
    number: 17,
    question: 'Validate valid parentheses string.',
    answer: `Use Stack matching \`()\`, \`{}\`, \`[]\`.`
  },
  {
    id: 'mc-18',
    section: 'machine-coding',
    number: 18,
    question: 'Implement string compression ("aaabbbcc" -> "a3b3c2").',
    answer: `\`\`\`javascript
function compress(str) {
  let res = "", count = 1;
  for (let i = 0; i < str.length; i++) {
    if (str[i] === str[i + 1]) count++;
    else { res += str[i] + count; count = 1; }
  }
  return res;
}
\`\`\``
  }
];

export const PERFORMANCE_QUESTIONS = [
  {
    id: 'perf-1',
    section: 'performance',
    number: 1,
    question: 'How will you decrease the initial load time?',
    answer: `Code splitting (dynamic imports), minification, image optimization (WebP/AVIF, lazy loading), CDN caching, HTTP/2 multiplexing, reducing bundle size (tree shaking).`
  },
  {
    id: 'perf-2',
    section: 'performance',
    number: 2,
    question: 'What is CDN? Explain benefits.',
    answer: `Content Delivery Network: Geographically distributed server network delivering web content closer to users. **Benefits**: Lower latency, reduced server load, DDoS mitigation.`
  },
  {
    id: 'perf-3',
    section: 'performance',
    number: 3,
    question: 'What are the different cache mechanisms provided by browsers?',
    answer: `HTTP Cache (Cache-Control, ETag), Service Worker Cache API, LocalStorage, SessionStorage, IndexedDB, Memory Cache.`
  },
  {
    id: 'perf-4',
    section: 'performance',
    number: 4,
    question: 'What is http only cookie.',
    answer: `Cookie attribute preventing client-side JavaScript (\`document.cookie\`) from reading it, mitigating XSS token theft attacks.`
  },
  {
    id: 'perf-5',
    section: 'performance',
    number: 5,
    question: 'What is CORS?',
    answer: `Cross-Origin Resource Sharing: Browser security mechanism enforcing HTTP headers (\`Access-Control-Allow-Origin\`) to restrict cross-origin requests.`
  },
  {
    id: 'perf-6',
    section: 'performance',
    number: 6,
    question: 'How will you handle 10000 dom elements?',
    answer: `Use **DOM Virtualization / Windowing** (e.g. \`react-window\`), rendering only visible elements in viewport.`
  },
  {
    id: 'perf-7',
    section: 'performance',
    number: 7,
    question: 'What is DNS lookup?',
    answer: `Translating human-readable domain names (\`example.com\`) into IP addresses (\`93.184.216.34\`).`
  },
  {
    id: 'perf-8',
    section: 'performance',
    number: 8,
    question: 'What is preload, prefetch and preconnect.',
    answer: `- **\`preload\`**: High-priority fetch of critical current page resources.
- **\`prefetch\`**: Low-priority fetch of resources likely needed for future navigation.
- **\`preconnect\`**: Establishes early connection (DNS+TLS) to third-party domains.`
  },
  {
    id: 'perf-9',
    section: 'performance',
    number: 9,
    question: 'Explain SSR, ISR, and SSG.',
    answer: `- **SSR (Server-Side Rendering)**: Generates HTML per request at runtime.
- **SSG (Static Site Generation)**: Pre-builds HTML pages at build time.
- **ISR (Incremental Static Regeneration)**: Re-generates static pages in background without full site rebuild.`
  },
  {
    id: 'perf-10',
    section: 'performance',
    number: 10,
    question: 'What are compression strategies?',
    answer: `Gzip, Brotli (\`br\`), WebP/AVIF image encoding, Minification (Terser), Tree Shaking.`
  },
  {
    id: 'perf-11',
    section: 'performance',
    number: 11,
    question: 'What is DNS lookup optimization?',
    answer: `Using \`<link rel="dns-prefetch" href="//api.example.com">\` to resolve IP before fetch.`
  },
  {
    id: 'perf-12',
    section: 'performance',
    number: 12,
    question: 'How will you prevent XSS Attack?',
    answer: `Sanitize user input, escape HTML rendering, use Content Security Policy (CSP) headers, HttpOnly cookies.`
  },
  {
    id: 'perf-13',
    section: 'performance',
    number: 13,
    question: 'How will you prevent CSRF Attack?',
    answer: `Use Anti-CSRF tokens, \`SameSite=Strict\` cookie attribute, CORS policies.`
  },
  {
    id: 'perf-14',
    section: 'performance',
    number: 14,
    question: 'What is SSE and WebSocket?',
    answer: `- **SSE (Server-Sent Events)**: 1-way streaming from server to client over HTTP.
- **WebSocket**: Full-duplex 2-way real-time communication channel.`
  },
  {
    id: 'perf-15',
    section: 'performance',
    number: 15,
    question: 'What are different font loading strategies?',
    answer: `\`font-display: swap\`, preloading \`.woff2\` files, Subset fonts.`
  },
  {
    id: 'perf-16',
    section: 'performance',
    number: 16,
    question: 'What are screen readers?',
    answer: `Assistive technologies (NVDA, VoiceOver) reading webpage content aloud for visually impaired users.`
  },
  {
    id: 'perf-17',
    section: 'performance',
    number: 17,
    question: 'How can you make your website accessible for disabled person?',
    answer: `Use Semantic HTML, ARIA roles/labels, keyboard navigation (\`tabindex\`), high contrast colors.`
  },
  {
    id: 'perf-18',
    section: 'performance',
    number: 18,
    question: 'Explain aria attributes.',
    answer: `Accessible Rich Internet Applications attributes (\`aria-label\`, \`aria-expanded\`, \`aria-hidden\`) providing accessibility context.`
  },
  {
    id: 'perf-19',
    section: 'performance',
    number: 19,
    question: 'Explain Critical Rendering path.',
    answer: `DOM -> CSSOM -> Render Tree -> Layout -> Paint.`
  },
  {
    id: 'perf-20',
    section: 'performance',
    number: 20,
    question: 'What are 4 Web Vitals?',
    answer: `LCP (Largest Contentful Paint), INP (Interaction to Next Paint), CLS (Cumulative Layout Shift), FCP (First Contentful Paint).`
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
    answer: `Dead code elimination mechanism removing unused ES6 module exports from production JS bundle.`
  },
  {
    id: 'perf-23',
    section: 'performance',
    number: 23,
    question: 'Explain SEO. And how can you accommodate it in SPA?',
    answer: `Search Engine Optimization. In SPAs, use SSR/SSG, dynamic meta titles via React Helmet, and structured JSON-LD data.`
  },
  {
    id: 'perf-24',
    section: 'performance',
    number: 24,
    question: 'What is Robot.txt file?',
    answer: `Text file instructing search engine crawlers which URLs or paths they can or cannot crawl.`
  },
  {
    id: 'perf-25',
    section: 'performance',
    number: 25,
    question: 'Explain sitemap.xml file.',
    answer: `XML file listing all key URLs of a website helping search engines index pages efficiently.`
  },
  {
    id: 'perf-26',
    section: 'performance',
    number: 26,
    question: 'Explain differences between a production build and a development build.',
    answer: `Dev build includes hot reloading, debug logs, unminified code; production build minifies, tree-shakes, compresses assets.`
  },
  {
    id: 'perf-27',
    section: 'performance',
    number: 27,
    question: 'What is SourceMap file.',
    answer: `Mapping file linking compiled/minified production code back to original unminified source code for debugging.`
  }
];
