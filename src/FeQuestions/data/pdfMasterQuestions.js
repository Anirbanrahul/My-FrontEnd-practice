// PDF Master Frontend Interview Questions (HTML/CSS, JS Core & Output, React & Architecture)

export const PDF_HTML_CSS_QUESTIONS = [
  {
    id: 'pdf-html-1',
    section: 'html',
    number: 101,
    question: 'What is semantic HTML and why should we use it?',
    answer: `**Semantic HTML** means using HTML tags that accurately convey the meaning and structure of the content to both the browser and the developer, rather than just using generic \`<div>\` and \`<span>\` containers.

**Semantic Tags Introduced in HTML5:**
- \`<header>\`: Introductory content or navigational links
- \`<nav>\`: Navigation links container
- \`<main>\`: Dominant content of the document
- \`<article>\`: Self-contained, independently distributable content (e.g., blog post, news card)
- \`<section>\`: Thematic grouping of content, typically with a heading
- \`<aside>\`: Tangentially related content (e.g., sidebars, related links)
- \`<footer>\`: Document or section footer
- \`<figure>\` and \`<figcaption>\`: Self-contained illustration/diagram with caption

**Code Example:**
\`\`\`html
<!-- ❌ Non-Semantic -->
<div class="header">
  <div class="nav">
    <div class="nav-item">Home</div>
  </div>
</div>
<div class="content">
  <div class="post">Blog Post Text</div>
</div>

<!-- ✅ Semantic HTML5 -->
<header>
  <nav>
    <a href="/home">Home</a>
  </nav>
</header>
<main>
  <article>
    <h1>Blog Post Title</h1>
    <p>Blog Post Text</p>
  </article>
</main>
\`\`\`

**Key Benefits for Interviews:**
1. **Accessibility (a11y)**: Screen readers use semantic landmarks so visually impaired users can jump between sections.
2. **SEO**: Search engine web crawlers easily understand content hierarchy and rank key content higher.
3. **Maintainability**: Clear, readable code structure that avoids "div soup".`
  },
  {
    id: 'pdf-html-2',
    section: 'html',
    number: 102,
    question: 'What is the difference between DIV and SPAN in HTML?',
    answer: `The primary difference lies in their **default display behavior** and **semantic role**:

| Feature | \`<div>\` | \`<span>\` |
| :--- | :--- | :--- |
| **Display Type** | Block-level (\`display: block\`) | Inline-level (\`display: inline\`) |
| **Line Behavior** | Always starts on a new line and takes 100% width | Flows inline with surrounding text without breaking line |
| **Dimensions** | Respects \`width\`, \`height\`, \`margin\`, and \`padding\` on all 4 sides | Does NOT respect \`width\`/\`height\`; vertical margins/paddings do not push surrounding lines |
| **Nesting** | Can contain block and inline elements | Should only contain other inline elements or text |

**Code Example:**
\`\`\`html
<!-- DIV starts on new line and takes full container width -->
<div style="background: lightblue; padding: 10px;">
  This is a block-level container.
</div>

<!-- SPAN sits within text stream -->
<p>
  Welcome to our <span style="color: red; font-weight: bold;">Special</span> Offer!
</p>
\`\`\``
  },
  {
    id: 'pdf-html-3',
    section: 'html',
    number: 103,
    question: 'Why is a URL encoded in HTML and web requests?',
    answer: `**URL Encoding** (also known as Percent-Encoding) converts characters that are not allowed or have special reserved meanings in URLs into valid, safe ASCII formats.

**Why it is needed:**
1. **Reserved Characters**: Characters like \`?\`, \`&\`, \`=\`, \`/\`, \`#\`, and \`:\` have special structural meaning in URLs (query strings, paths, anchors).
2. **Unsafe Characters**: Spaces, non-ASCII characters, and symbols (like emojis or quotes) can break URL parsing across browsers and HTTP servers.

**JavaScript Encoding Functions:**
\`\`\`javascript
const query = "React & Node.js Guide 100% Free!";

// encodeURIComponent: Encodes all special characters except standard URI letters/numbers (Used for Query Params)
const encodedParam = encodeURIComponent(query);
console.log(encodedParam);
// Output: "React%20%26%20Node.js%20Guide%20100%25%20Free!"

// encodeURI: Encodes a full URL, preserving URL delimiters like ':', '/', '?', '&'
const fullUrl = "https://example.com/search?q=" + encodeURIComponent(query);
console.log(fullUrl);
// Output: "https://example.com/search?q=React%20%26%20Node.js%20Guide%20100%25%20Free!"

// Decoding back
console.log(decodeURIComponent(encodedParam));
// Output: "React & Node.js Guide 100% Free!"
\`\`\``
  },
  {
    id: 'pdf-html-4',
    section: 'html',
    number: 104,
    question: 'Explain the key differences between LocalStorage, SessionStorage, and Cookies.',
    answer: `Web storage provides mechanisms to persist data on the client browser:

| Feature | \`localStorage\` | \`sessionStorage\` | \`Cookies\` |
| :--- | :--- | :--- | :--- |
| **Lifetime** | Persists indefinitely until explicitly deleted | Cleared when browser tab/window is closed | Configurable via \`Expires\` or \`Max-Age\` |
| **Capacity** | ~5MB - 10MB per origin | ~5MB per origin | ~4KB per cookie |
| **Server Transmission** | Never automatically sent with HTTP requests | Never automatically sent with HTTP requests | Automatically attached in HTTP \`Cookie\` request header |
| **Scope** | Shared across all tabs/windows of same origin | Isolated strictly to the specific tab/window | Shared across tabs; can be scoped to path/domain |
| **Security** | Vulnerable to XSS | Vulnerable to XSS | Can be protected with \`HttpOnly\`, \`Secure\`, and \`SameSite\` |

**Code Example:**
\`\`\`javascript
// LocalStorage
localStorage.setItem('theme', 'dark');
const theme = localStorage.getItem('theme');
localStorage.removeItem('theme');
localStorage.clear();

// SessionStorage
sessionStorage.setItem('tempToken', 'xyz-123');
const tempToken = sessionStorage.getItem('tempToken');
\`\`\``
  },
  {
    id: 'pdf-html-5',
    section: 'html',
    number: 105,
    question: 'How to open a hyperlink in a new window or tab in HTML securely?',
    answer: `To open a link in a new browser tab or window, use \`target="_blank"\`.

⚠️ **Crucial Security Requirement**: You must always include \`rel="noopener noreferrer"\` when using \`target="_blank"\`.

**Code Example:**
\`\`\`html
<a href="https://example.com" target="_blank" rel="noopener noreferrer">
  Visit External Site
</a>
\`\`\`

**Why \`rel="noopener noreferrer"\` is required (Reverse Tabnabbing Attack):**
1. **\`noopener\`**: Prevents the newly opened page from accessing the opening page's \`window.opener\` object, stopping malicious sites from redirecting your page to a phishing URL via \`window.opener.location = "fake-login.com"\`.
2. **\`noreferrer\`**: Prevents the browser from sending the \`Referer\` HTTP header to the destination page, hiding sensitive query parameters and URLs.`
  },
  {
    id: 'pdf-html-6',
    section: 'html',
    number: 106,
    question: 'What are the media element tags introduced in HTML5?',
    answer: `HTML5 introduced native multimedia elements eliminating the need for third-party plugins like Adobe Flash:

**1. \`<video>\`**: Embeds video files with native player controls.
**2. \`<audio>\`**: Embeds audio streams or sound files.
**3. \`<source>\`**: Specifies multiple media format alternatives (e.g., MP4, WebM, Ogg) for cross-browser fallback.
**4. \`<track>\`**: Specifies timed text tracks such as subtitles, captions, and descriptions.

**Code Example:**
\`\`\`html
<!-- Video with Multiple Sources & Subtitles -->
<video controls width="640" height="360" poster="/thumbnail.jpg">
  <source src="movie.webm" type="video/webm">
  <source src="movie.mp4" type="video/mp4">
  <track src="subtitles_en.vtt" kind="subtitles" srclang="en" label="English">
  Your browser does not support the video tag.
</video>

<!-- Audio Element -->
<audio controls autoplay muted loop>
  <source src="podcast.mp3" type="audio/mpeg">
  <source src="podcast.ogg" type="audio/ogg">
</audio>
\`\`\``
  },
  {
    id: 'pdf-html-7',
    section: 'html',
    number: 107,
    question: 'What is SVG? And list all HTML Input Types.',
    answer: `**SVG (Scalable Vector Graphics)** is an XML-based vector image format for two-dimensional graphics.
- **Key Advantage**: Renders using mathematical vectors, meaning it never pixelates or loses quality at any resolution/zoom level, and can be styled/animated directly with CSS and JavaScript.

**All Modern HTML \`<input>\` Types:**
- **Text & Data**: \`text\`, \`password\`, \`email\`, \`number\`, \`tel\`, \`url\`, \`search\`, \`hidden\`
- **Date & Time**: \`date\`, \`datetime-local\`, \`time\`, \`month\`, \`week\`
- **Choice & Selection**: \`checkbox\`, \`radio\`, \`color\`, \`range\`, \`file\`
- **Actions**: \`submit\`, \`reset\`, \`button\`, \`image\`

**Code Example:**
\`\`\`html
<!-- Inline SVG -->
<svg width="100" height="100" viewBox="0 0 100 100">
  <circle cx="50" cy="50" r="40" stroke="#38bdf8" stroke-width="4" fill="#0284c7" />
</svg>

<!-- Various Inputs -->
<input type="email" placeholder="Enter email" required />
<input type="range" min="0" max="100" value="50" />
<input type="color" value="#38bdf8" />
\`\`\``
  },
  {
    id: 'pdf-css-1',
    section: 'css',
    number: 108,
    question: 'What is the CSS Box Model and what does box-sizing do?',
    answer: `The **CSS Box Model** is the foundational layout model where every HTML element is treated as a rectangular box comprising 4 concentric layers:

1. **Content**: The text, images, or child elements.
2. **Padding**: Transparent space inside the element around the content.
3. **Border**: Outline wrapping the padding and content.
4. **Margin**: Transparent space outside the border separating the element from neighbors.

**\`box-sizing: content-box\` vs \`box-sizing: border-box\`:**
- **\`content-box\` (Browser Default)**: Width and height apply **only to content**. Adding 20px padding and 2px border increases the element's actual rendered size (\`Total Width = width + padding + border\`).
- **\`border-box\` (Industry Standard)**: Width and height include **content + padding + border**. Padding and borders do not expand the box outward.

**Code Example:**
\`\`\`css
/* Best Practice Universal Reset */
*, *::before, *::after {
  box-sizing: border-box;
}

.card {
  width: 300px;
  padding: 20px;
  border: 2px solid #38bdf8;
  margin: 15px;
  /* With border-box, total rendered width remains exactly 300px */
}
\`\`\``
  },
  {
    id: 'pdf-css-2',
    section: 'css',
    number: 109,
    question: 'What is the difference between CSS border and outline?',
    answer: `| Feature | \`border\` | \`outline\` |
| :--- | :--- | :--- |
| **Box Model Impact** | Part of the element box model; increases total element size | Drawn **outside** the box model; takes **no layout space** |
| **Reflow / Repaint** | Modifying border triggers layout **reflow & repaint** | Modifying outline triggers only **repaint** (better performance) |
| **Individual Sides** | Can style individual sides (\`border-bottom\`, \`border-left\`) | Must style all 4 sides uniformly (cannot outline single edge) |
| **Border Radius** | Follows \`border-radius\` curve | Does not always follow \`border-radius\` cleanly in older browsers (modern \`outline\` does) |
| **Primary Use** | Visual styling and component borders | Accessibility focus indicators (\`:focus-visible\`) |

**Code Example:**
\`\`\`css
button:focus-visible {
  outline: 2px solid #38bdf8;
  outline-offset: 4px; /* Space between border and outline */
}
\`\`\``
  },
  {
    id: 'pdf-css-3',
    section: 'css',
    number: 110,
    question: 'What is the difference between display: none and visibility: hidden?',
    answer: `| Feature | \`display: none\` | \`visibility: hidden\` | \`opacity: 0\` |
| :--- | :--- | :--- | :--- |
| **DOM Tree** | Remains in DOM tree | Remains in DOM tree | Remains in DOM tree |
| **Render Tree & Layout Space** | Completely removed from Render Tree; takes **0px space** | Takes **full layout space** as if visible | Takes **full layout space** |
| **Pointer Events / Clicks** | Inactive (cannot be clicked) | Inactive (cannot be clicked) | **Active** (can still be clicked unless \`pointer-events: none\`) |
| **CSS Transitions** | Cannot be transitioned | Can transition visibility after delay | Smoothly animatable |
| **Screen Readers** | Ignored by assistive tech | Ignored by assistive tech | Read by screen readers |

**Code Example:**
\`\`\`css
/* Completely removes box from layout */
.modal-closed {
  display: none;
}

/* Keeps space reserved, hides visually */
.loading-placeholder {
  visibility: hidden;
}
\`\`\``
  },
  {
    id: 'pdf-css-4',
    section: 'css',
    number: 111,
    question: 'Explain CSS Positioning properties (static, relative, absolute, fixed, sticky).',
    answer: `CSS \`position\` defines how an element is positioned within the viewport and document flow:

1. **\`static\` (Default)**: Normal document flow. \`top\`, \`right\`, \`bottom\`, \`left\`, and \`z-index\` have no effect.
2. **\`relative\`**: Stays in normal document flow, but offsets relative to its own natural position without affecting surrounding elements. Creates a positioning context for absolute children.
3. **\`absolute\`**: Removed from normal document flow. Positioned relative to its **closest positioned ancestor** (an ancestor with position other than \`static\`).
4. **\`fixed\`**: Removed from normal document flow. Positioned relative to the **browser viewport**. Does not scroll with the page.
5. **\`sticky\`**: Hybrid of \`relative\` and \`fixed\`. Behaves as \`relative\` until a scroll threshold is met, then "sticks" like \`fixed\` within its parent container.

**Code Example:**
\`\`\`css
/* Modal Backdrop & Dialog */
.parent {
  position: relative;
}

.child-badge {
  position: absolute;
  top: -8px;
  right: -8px;
}

.sticky-navbar {
  position: sticky;
  top: 0;
  z-index: 100;
}
\`\`\``
  },
  {
    id: 'pdf-css-5',
    section: 'css',
    number: 112,
    question: 'How to center a div horizontally and vertically using modern CSS?',
    answer: `Here are the top 4 modern techniques to center elements:

**1. CSS Grid (Shortest & Cleanest):**
\`\`\`css
.parent {
  display: grid;
  place-items: center; /* Centers both horizontal & vertical */
  min-height: 100vh;
}
\`\`\`

**2. CSS Flexbox (Most Popular & Versatile):**
\`\`\`css
.parent {
  display: flex;
  justify-content: center; /* Horizontal */
  align-items: center;     /* Vertical */
  min-height: 100vh;
}
\`\`\`

**3. Absolute Positioning + CSS Transform:**
\`\`\`css
.parent {
  position: relative;
  min-height: 100vh;
}
.child {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
\`\`\`

**4. Margin Auto in Flexbox:**
\`\`\`css
.parent {
  display: flex;
  min-height: 100vh;
}
.child {
  margin: auto; /* Automatically consumes all remaining space */
}
\`\`\``
  },
  {
    id: 'pdf-css-6',
    section: 'css',
    number: 113,
    question: 'In Flexbox, how do you make items stay on one line vs wrap to multiple lines?',
    answer: `In CSS Flexbox, multi-line wrapping behavior is controlled via the \`flex-wrap\` property:

1. **Stay on One Line (No Wrapping)**:
\`\`\`css
.flex-container {
  display: flex;
  flex-wrap: nowrap; /* Default behavior: items shrink to fit on single row */
}
\`\`\`

2. **Wrap to Multiple Lines When Out of Space**:
\`\`\`css
.flex-container {
  display: flex;
  flex-wrap: wrap; /* Items wrap onto new lines when width exceeds container */
  gap: 1rem;
}
\`\`\`

3. **Wrap in Reverse Order**:
\`\`\`css
.flex-container {
  display: flex;
  flex-wrap: wrap-reverse;
}
\`\`\`

💡 **Shorthand:** \`flex-flow: row wrap;\` combines \`flex-direction\` and \`flex-wrap\`.`
  }
];

export const PDF_OUTPUT_QUESTIONS = [
  {
    id: 'pdf-output-1',
    section: 'js-output',
    number: 101,
    question: 'How to convert a string into an array in JavaScript? Show all approaches.',
    answer: `Here are the 4 primary ways to convert a string into an array:

**1. \`String.prototype.split()\` (Most common):**
\`\`\`javascript
let str = "Hello,How are you";

// Split by comma delimiter
console.log(str.split(","));
// Output: [ 'Hello', 'How are you' ]

// Split every single character
console.log(str.split(""));
// Output: ['H','e','l','l','o',',','H','o','w',' ','a','r','e',' ','y','o','u']

// Without arguments (puts whole string in single element array)
console.log(str.split());
// Output: [ 'Hello,How are you' ]
\`\`\`

**2. Spread Operator \`[...str]\` (Unicode & Emoji safe):**
\`\`\`javascript
const greeting = "Hi 🚀";
console.log([...greeting]);
// Output: ['H', 'i', ' ', '🚀']
\`\`\`

**3. \`Array.from(str)\`:**
\`\`\`javascript
console.log(Array.from("React"));
// Output: ['R', 'e', 'a', 'c', 't']
\`\`\`

**4. \`Object.assign([], str)\`:**
\`\`\`javascript
console.log(Object.assign([], "JS"));
// Output: ['J', 'S']
\`\`\``
  },
  {
    id: 'pdf-output-2',
    section: 'js-output',
    number: 102,
    question: 'Reverse the words in the provided sentence: "My love is Javascript"',
    answer: `**Problem:** Reverse word order while maintaining the characters within each word.

**Code Solution:**
\`\`\`javascript
let abc = 'My love is Javascript';

// 1. Split sentence into words array by space
// 2. Reverse array elements
// 3. Join words back with space
let result = abc.split(' ').reverse().join(' ');

console.log(result);
\`\`\`

Output:
\`\`\`
Javascript is love My
\`\`\`

💡 **Explanation:** \`abc.split(' ')\` produces \`['My', 'love', 'is', 'Javascript']\`. Reversing gives \`['Javascript', 'is', 'love', 'My']\`, and \`.join(' ')\` produces \`"Javascript is love My"\`.`
  },
  {
    id: 'pdf-output-3',
    section: 'js-output',
    number: 103,
    question: 'Reverse the characters in the provided string: "I love my work"',
    answer: `**Code Solution:**
\`\`\`javascript
let str = 'I love my work';

let temp = str.split('').reverse().join('');

console.log(temp);
\`\`\`

Output:
\`\`\`
krow ym evol I
\`\`\`

**Algorithmic Approach without built-in methods (Two Pointers / Loop):**
\`\`\`javascript
function reverseString(s) {
  let reversed = '';
  for (let i = s.length - 1; i >= 0; i--) {
    reversed += s[i];
  }
  return reversed;
}

console.log(reverseString('I love my work'));
// Output: "krow ym evol I"
\`\`\``
  },
  {
    id: 'pdf-output-4',
    section: 'js-output',
    number: 104,
    question: 'Remove the whitespace from left and right side of a string.',
    answer: `**Code Solution:**
\`\`\`javascript
let str = ' abcd ';

console.log(str.trim());
// Output: "abcd"

// Trim only starting whitespace
console.log(str.trimStart());
// Output: "abcd "

// Trim only ending whitespace
console.log(str.trimEnd());
// Output: " abcd"
\`\`\`

💡 **Note:** \`trim()\` returns a new string and does not mutate the original string because JavaScript strings are immutable.`
  },
  {
    id: 'pdf-output-5',
    section: 'js-output',
    number: 105,
    question: 'Remove the first character and last character from a string.',
    answer: `**1. Remove First Character:**
\`\`\`javascript
let str = "Hello,How are you";

// Using substring
console.log(str.substring(1));
// Output: "ello,How are you"

// Using slice
console.log(str.slice(1));
// Output: "ello,How are you"
\`\`\`

**2. Remove Last Character:**
\`\`\`javascript
let str = "Hello,How are you";

// Using substring with length - 1
console.log(str.substring(0, str.length - 1));
// Output: "Hello,How are yo"

// Using negative index with slice (Cleanest)
console.log(str.slice(0, -1));
// Output: "Hello,How are yo"
\`\`\``
  },
  {
    id: 'pdf-output-6',
    section: 'js-output',
    number: 106,
    question: 'Whenever we compare two blank arrays ([] == []), what will be the output and why?',
    answer: `**Code Snippet:**
\`\`\`javascript
let c = [];
let d = [];

console.log(c == d);
console.log(c === d);
\`\`\`

Output:
\`\`\`
false
false
\`\`\`

**Why:**
- In JavaScript, objects and arrays are **reference types**.
- When comparing non-primitives with \`==\` or \`===\`, JavaScript compares their **memory addresses (references)**, NOT their structural content.
- \`c\` and \`d\` point to two completely separate allocated memory locations in the heap.
- Comparison evaluates to \`true\` only if both variables reference the exact same object in memory:
\`\`\`javascript
let a = [];
let b = a; // b points to the same reference as a
console.log(a === b); // true
\`\`\``
  },
  {
    id: 'pdf-output-7',
    section: 'js-output',
    number: 107,
    question: 'If we divide a string by a number, what will be the output: console.log("abc" / 2)?',
    answer: `**Code Snippet:**
\`\`\`javascript
console.log("abc" / 2);
console.log("10" / 2);
console.log(typeof NaN);
console.log(NaN === NaN);
\`\`\`

Output:
\`\`\`
NaN
5
"number"
false
\`\`\`

**Explanation:**
1. The division operator \`/\` attempts numeric type coercion on \`"abc"\`.
2. \`Number("abc")\` evaluates to \`NaN\` (Not a Number).
3. Any arithmetic operation involving \`NaN\` produces \`NaN\`.
4. Conversely, \`"10" / 2\` converts \`"10"\` to number \`10\`, outputting \`5\`.
5. 💡 **Interview Gotcha:** \`typeof NaN\` is \`"number"\`, and \`NaN === NaN\` is always \`false\`. Use \`Number.isNaN(val)\` to test for NaN.`
  },
  {
    id: 'pdf-output-8',
    section: 'js-output',
    number: 108,
    question: 'What will be the output of: let data = 10 - - 10; console.log(data)?',
    answer: `**Code Snippet:**
\`\`\`javascript
let data = 10 - - 10;
console.log(data);
\`\`\`

Output:
\`\`\`
20
\`\`\`

**Explanation:**
- The expression contains a subtraction operator followed by a unary negation operator: \`10 - (-10)\`.
- Two consecutive minuses evaluate to mathematical addition: \`10 + 10 = 20\`.
- Conversely, \`10 + + 10\` also equals \`20\` (unary plus coercion).`
  },
  {
    id: 'pdf-output-9',
    section: 'js-output',
    number: 109,
    question: 'Remove duplicate elements from an array in JavaScript.',
    answer: `Here are the top 3 modern techniques to deduplicate arrays:

**1. Using \`Set\` and Spread Operator (O(n) - Best & Cleanest):**
\`\`\`javascript
const arr = [1, 2, 3, 4, 4, 5, 6];
const unique = [...new Set(arr)];

console.log(unique);
// Output: [1, 2, 3, 4, 5, 6]
\`\`\`

**2. Using \`filter\` and \`indexOf\` (O(n²)):**
\`\`\`javascript
const uniqueFilter = arr.filter((item, index) => arr.indexOf(item) === index);
console.log(uniqueFilter);
// Output: [1, 2, 3, 4, 5, 6]
\`\`\`

**3. Using \`reduce\` with lookup Map (O(n) for objects):**
\`\`\`javascript
const uniqueReduce = arr.reduce((acc, curr) => {
  if (!acc.includes(curr)) acc.push(curr);
  return acc;
}, []);
\`\`\``
  },
  {
    id: 'pdf-output-10',
    section: 'js-output',
    number: 110,
    question: 'Swap two variable values without using a temporary variable.',
    answer: `**1. ES6 Array Destructuring (Modern Standard):**
\`\`\`javascript
let a = 10;
let b = 20;

[a, b] = [b, a];

console.log('a:', a, 'b:', b);
// Output: a: 20 b: 10
\`\`\`

**2. Arithmetic Operators (Addition & Subtraction):**
\`\`\`javascript
let x = 10, y = 20;
x = x + y; // 30
y = x - y; // 10
x = x - y; // 20
console.log('x:', x, 'y:', y);
// Output: x: 20 y: 10
\`\`\`

**3. Bitwise XOR Operator:**
\`\`\`javascript
let p = 10, q = 20;
p = p ^ q;
q = p ^ q;
p = p ^ q;
console.log('p:', p, 'q:', q);
// Output: p: 20 q: 10
\`\`\``
  },
  {
    id: 'pdf-output-11',
    section: 'js-output',
    number: 111,
    question: 'Merge two objects and explain collision handling.',
    answer: `**Code Example:**
\`\`\`javascript
let data = { name: 'Aditya', age: 29, skill: 'JS' };
let info = { name: 'Adi', city: 'Pune', mail: 'aditya123@gmail.com' };

// Spread Operator merge
let merged = { ...data, ...info };

console.log(merged);
\`\`\`

Output:
\`\`\`javascript
{
  name: 'Adi',
  age: 29,
  skill: 'JS',
  city: 'Pune',
  mail: 'aditya123@gmail.com'
}
\`\`\`

💡 **Collision Rule:** Properties from objects unpacked later in the spread overwrite earlier matching keys (\`name: 'Adi'\` overwrote \`name: 'Aditya'\`).`
  },
  {
    id: 'pdf-output-12',
    section: 'js-output',
    number: 112,
    question: 'How to prevent new properties from being added to an object? Object.seal vs Object.freeze vs Object.preventExtensions.',
    answer: `JavaScript provides 3 levels of object immutability:

| Method | Add New Props? | Delete Props? | Modify Existing Values? | Configure Descriptors? |
| :--- | :--- | :--- | :--- | :--- |
| **\`Object.preventExtensions(obj)\`** | ❌ No | ✅ Yes | ✅ Yes | ✅ Yes |
| **\`Object.seal(obj)\`** | ❌ No | ❌ No | ✅ **Yes** | ❌ No |
| **\`Object.freeze(obj)\`** | ❌ No | ❌ No | ❌ **No** | ❌ No |

**Code Example:**
\`\`\`javascript
let person = { name: 'Saket' };
Object.seal(person);

// Attempting to add new property -> Ignored (throws TypeError in strict mode)
person.age = 29;

// Modifying existing property -> Allowed!
person.name = 'Aditya';

console.log(person);
// Output: { name: 'Aditya' }
\`\`\``
  },
  {
    id: 'pdf-output-13',
    section: 'js-output',
    number: 113,
    question: 'Add an element to the beginning of an array and merge two arrays.',
    answer: `**1. Add to First Position (\`unshift\` vs Spread):**
\`\`\`javascript
let data = [2, 9, 0, 10];

// unshift mutates original array in place
data.unshift(10);
console.log(data);
// Output: [10, 2, 9, 0, 10]

// Immutable prepending using spread operator
let newData = [10, ...[2, 9, 0, 10]];
console.log(newData);
// Output: [10, 2, 9, 0, 10]
\`\`\`

**2. Merge Two Arrays (\`[...a, ...b]\` vs \`concat\`):**
\`\`\`javascript
let a = [1, 2, 3, 4];
let b = [2, 3, 5, 6];

let c = [...a, ...b];
console.log(c);
// Output: [1, 2, 3, 4, 2, 3, 5, 6]
\`\`\``
  },
  {
    id: 'pdf-output-14',
    section: 'js-output',
    number: 114,
    question: 'What will be the output in strict mode when assigning to an undeclared variable?',
    answer: `**Code Snippet:**
\`\`\`javascript
function getAge() {
  'use strict';
  age = 21;
  console.log(age);
}

getAge();
\`\`\`

Output:
\`\`\`
ReferenceError: age is not defined
\`\`\`

**Explanation:**
- In non-strict mode, assigning to an undeclared variable creates an implicit global variable on \`window.age\`.
- In strict mode (\`'use strict'\`), implicit global variable creation is strictly forbidden and throws a runtime \`ReferenceError\`.`
  },
  {
    id: 'pdf-output-15',
    section: 'js-output',
    number: 115,
    question: "Guess the output of typeof 3 + 4 + '50' vs typeof (3 + 4 + '50').",
    answer: `**Code Snippet:**
\`\`\`javascript
console.log(typeof 3 + 4 + '50');
console.log(typeof (3 + 4 + '50'));
\`\`\`

Output:
\`\`\`
number450
string
\`\`\`

**Step-by-Step Operator Precedence Breakdown:**
1. \`typeof 3 + 4 + '50'\`:
   - \`typeof\` has higher operator precedence than \`+\`.
   - \`typeof 3\` evaluates to \`"number"\`.
   - \`"number" + 4\` evaluates to \`"number4"\` (string concatenation).
   - \`"number4" + '50'\` evaluates to \`"number450"\`.

2. \`typeof (3 + 4 + '50')\`:
   - Parentheses evaluate first: \`3 + 4 = 7\`.
   - \`7 + '50' = '750'\` (string).
   - \`typeof '750'\` evaluates to \`"string"\`.`
  },
  {
    id: 'pdf-output-16',
    section: 'js-output',
    number: 116,
    question: 'What will be the output of IIFE scope variable assignment: (() => { let x = (y = 10); })();',
    answer: `**Code Snippet:**
\`\`\`javascript
(() => {
  let x = (y = 10);
})();

console.log(typeof x);
console.log(typeof y);
console.log(y);
\`\`\`

Output:
\`\`\`
undefined
number
10
\`\`\`

**Explanation:**
- \`let x = (y = 10)\` is evaluated from right to left.
- \`y = 10\` does not have a declaration keyword (\`let\`, \`const\`, \`var\`). In non-strict mode, \`y\` leaks to the global window scope.
- \`let x\` is block-scoped strictly to the IIFE function body and is inaccessible outside.
- \`typeof x\` safely returns \`"undefined"\` (or throws ReferenceError if accessed directly).
- \`typeof y\` returns \`"number"\` and \`y\` evaluates to \`10\`.`
  },
  {
    id: 'pdf-output-17',
    section: 'js-output',
    number: 117,
    question: 'What is the best way to empty an array in JavaScript and maintain references?',
    answer: `**Code Comparison:**
\`\`\`javascript
let arr1 = [1, 2, 3, 4];
let ref1 = arr1;

// Method 1: Reassigning to []
arr1 = [];
console.log(arr1); // []
console.log(ref1); // [1, 2, 3, 4] -> ⚠️ Reference was NOT cleared!

let arr2 = [1, 2, 3, 4];
let ref2 = arr2;

// Method 2: Setting length = 0 (BEST PRACTICE)
arr2.length = 0;
console.log(arr2); // []
console.log(ref2); // [] -> ✅ Mutates memory in-place for all references!

// Method 3: Using splice
let arr3 = [1, 2, 3, 4];
arr3.splice(0, arr3.length);
\`\`\``
  },
  {
    id: 'pdf-output-18',
    section: 'js-output',
    number: 118,
    question: "What will be the output of console.log('A' - 1) and console.log(2 + '-2' + '2')?",
    answer: `**Code Snippet:**
\`\`\`javascript
console.log('A' - 1);
console.log(2 + '-2' + '2');
\`\`\`

Output:
\`\`\`
NaN
2-22
\`\`\`

**Explanation:**
1. \`'A' - 1\`: The \`-\` operator forces numeric coercion. \`Number('A')\` is \`NaN\`. \`NaN - 1\` is \`NaN\`.
2. \`2 + '-2' + '2'\`: The \`+\` operator with any string operand forces string concatenation:
   - \`2 + '-2'\` becomes \`"2-2"\`
   - \`"2-2" + '2'\` becomes \`"2-22"\`.`
  },
  {
    id: 'pdf-output-19',
    section: 'js-output',
    number: 119,
    question: 'How do you accurately compare two objects in JavaScript?',
    answer: `**Code Snippet:**
\`\`\`javascript
var abc = { hasUser: false, isUser: false };
var xyz = { isUser: false, hasUser: false };

// JSON.stringify comparison
console.log(JSON.stringify(abc) === JSON.stringify(xyz));
// Output: false (Because key serialization order differs!)
\`\`\`

**Accurate Deep Equality Function:**
\`\`\`javascript
function deepEqual(obj1, obj2) {
  if (obj1 === obj2) return true;
  if (typeof obj1 !== 'object' || obj1 === null || typeof obj2 !== 'object' || obj2 === null) {
    return false;
  }
  const keys1 = Object.keys(obj1);
  const keys2 = Object.keys(obj2);
  if (keys1.length !== keys2.length) return false;

  for (let key of keys1) {
    if (!keys2.includes(key) || !deepEqual(obj1[key], obj2[key])) {
      return false;
    }
  }
  return true;
}

console.log(deepEqual(abc, xyz));
// Output: true
\`\`\``
  },
  {
    id: 'pdf-output-20',
    section: 'js-output',
    number: 120,
    question: 'Remove duplicate objects from an array based on unique object properties.',
    answer: `**Code Solution:**
\`\`\`javascript
const arr = [
  { id: 1, name: 'one' },
  { id: 2, name: 'two' },
  { id: 1, name: 'one' },
  { id: 2, name: 'two' },
  { id: 3, name: 'three' }
];

// Deduplicate using Map by ID
const uniqueById = Array.from(
  new Map(arr.map(item => [item.id, item])).values()
);

console.log(uniqueById);
\`\`\`

Output:
\`\`\`javascript
[
  { id: 1, name: 'one' },
  { id: 2, name: 'two' },
  { id: 3, name: 'three' }
]
\`\`\``
  },
  {
    id: 'pdf-output-21',
    section: 'js-output',
    number: 121,
    question: 'Convert PascalCase string "MyNameIsJohn" into spaced words "My Name Is John".',
    answer: `**Code Solution:**
\`\`\`javascript
var name = "MyNameIsJohn";

// Regular expression inserts space before every capital letter
var result = name.replace(/[A-Z]/g, ' $&').trim();

console.log(result);
\`\`\`

Output:
\`\`\`
My Name Is John
\`\`\`

💡 **Explanation:** \`$&amp;\` in \`replace()\` references the matched uppercase letter. Prepending a space and calling \`trim()\` produces spaced words cleanly.`
  },
  {
    id: 'pdf-output-22',
    section: 'js-output',
    number: 122,
    question: 'Sort numbers in ascending and descending order in JavaScript.',
    answer: `**Code Solution:**
\`\`\`javascript
const arr = [1, 2, 3, 88, 5, 7];

// Ascending sort
const ascending = [...arr].sort((a, b) => a - b);
console.log(ascending);
// Output: [ 1, 2, 3, 5, 7, 88 ]

// Descending sort
const descending = [...arr].sort((a, b) => b - a);
console.log(descending);
// Output: [ 88, 7, 5, 3, 2, 1 ]
\`\`\`

⚠️ **Critical Gotcha:** \`arr.sort()\` with no callback converts numbers to strings and sorts lexicographically (\`[1, 2, 3, 5, 7, 88]\` becomes \`[1, 2, 3, 5, 7, 88]\`, but \`[10, 2]\` sorts incorrectly as \`[10, 2]\`). Always provide a numeric comparator \`(a, b) => a - b\`.`
  },
  {
    id: 'pdf-output-23',
    section: 'js-output',
    number: 123,
    question: 'Find the most frequent element in an array in O(n) linear time.',
    answer: `**Code Solution using Hash Map:**
\`\`\`javascript
function mostFrequent(arr) {
  if (arr.length === 0) return null;

  const freqMap = {};
  let maxElement = arr[0];
  let maxCount = 0;

  for (const num of arr) {
    freqMap[num] = (freqMap[num] || 0) + 1;
    if (freqMap[num] > maxCount) {
      maxCount = freqMap[num];
      maxElement = num;
    }
  }

  return { element: maxElement, count: maxCount };
}

const arr = [1, 3, 3, 3, 4, 4, 4, 4, 5];
console.log(mostFrequent(arr));
// Output: { element: 4, count: 4 }
\`\`\``
  },
  {
    id: 'pdf-output-24',
    section: 'js-output',
    number: 124,
    question: 'Merge elements of two arrays alternatively into a single array.',
    answer: `**Code Solution:**
\`\`\`javascript
const arr1 = [1, 2, 3, 4, 5];
const arr2 = [6, 7, 8, 9, 10];

const mergeAlternatively = (a, b) => {
  const result = [];
  const maxLength = Math.max(a.length, b.length);

  for (let i = 0; i < maxLength; i++) {
    if (i < a.length) result.push(a[i]);
    if (i < b.length) result.push(b[i]);
  }

  return result;
};

console.log(mergeAlternatively(arr1, arr2));
\`\`\`

Output:
\`\`\`
[ 1, 6, 2, 7, 3, 8, 4, 9, 5, 10 ]
\`\`\``
  }
];

export const PDF_REACT_ARCHITECTURE_QUESTIONS = [
  {
    id: 'pdf-react-1',
    section: 'react-js',
    number: 101,
    question: 'What is Micro Frontend architecture and how does Webpack Module Federation enable it?',
    answer: `**Micro Frontend Architecture** is an architectural pattern where an independently deliverable frontend application is decomposed into smaller, semi-independent micro-apps that look and feel like a unified single application to the end user.

**Webpack 5 Module Federation:**
Module Federation allows multiple independent Webpack builds to share code, components, and libraries at **runtime** without publishing separate NPM packages.

**Code Example:**
\`\`\`javascript
// remote-app/webpack.config.js (Exposes Navigation & Header)
new ModuleFederationPlugin({
  name: 'remote_app',
  filename: 'remoteEntry.js',
  exposes: {
    './Header': './src/Header',
  },
  shared: { react: { singleton: true }, 'react-dom': { singleton: true } }
});

// host-app/webpack.config.js (Consumes Remote Header)
new ModuleFederationPlugin({
  name: 'host_app',
  remotes: {
    remoteApp: 'remote_app@http://localhost:3001/remoteEntry.js',
  },
  shared: { react: { singleton: true }, 'react-dom': { singleton: true } }
});

// Host App Component Consumption
const RemoteHeader = React.lazy(() => import('remoteApp/Header'));

function App() {
  return (
    <Suspense fallback={<div>Loading Header...</div>}>
      <RemoteHeader />
      <MainDashboard />
    </Suspense>
  );
}
\`\`\`

**Key Interview Benefits:**
1. **Independent Deployments**: Team A can deploy Header updates without rebuilding Host App.
2. **Autonomous Teams**: Teams can choose independent release cadences.`
  },
  {
    id: 'pdf-react-2',
    section: 'react-js',
    number: 102,
    question: 'How do you replicate componentDidMount, componentDidUpdate, and componentWillUnmount in React functional components?',
    answer: `The \`useEffect\` hook unifies class component lifecycle methods based on its dependency array:

\`\`\`javascript
import React, { useEffect, useState } from 'react';

function LifecycleComponent({ userId }) {
  const [data, setData] = useState(null);

  // 1. componentDidMount: Runs ONCE after initial mount
  useEffect(() => {
    console.log('Mounted: Fetching initial user list');
    const controller = new AbortController();
    fetch('/api/users', { signal: controller.signal })
      .then(res => res.json())
      .then(setData);

    // 3. componentWillUnmount: Cleanup function runs when component unmounts
    return () => {
      console.log('Unmounting: Aborting active fetch');
      controller.abort();
    };
  }, []); // Empty dependency array []

  // 2. componentDidUpdate: Runs when specific dependency changes
  useEffect(() => {
    console.log('Updated: userId prop changed to', userId);
    // Fetch details for new userId
  }, [userId]); // Runs only when userId changes

  return <div>{data ? 'User loaded' : 'Loading...'}</div>;
}
\`\`\``
  },
  {
    id: 'pdf-react-3',
    section: 'react-js',
    number: 103,
    question: 'What are Pure Components vs React.memo and what is their purpose?',
    answer: `Both \`PureComponent\` (class components) and \`React.memo\` (functional components) prevent unnecessary re-renders by performing a **shallow comparison** of props and state.

**\`React.memo\` Code Example:**
\`\`\`javascript
import React, { memo } from 'react';

// Regular Component: Re-renders every time Parent re-renders
const RegularCard = ({ title }) => {
  console.log('RegularCard rendered');
  return <div className="card">{title}</div>;
};

// Memoized Component: Re-renders ONLY if title prop actually changed
const MemoizedCard = memo(({ title }) => {
  console.log('MemoizedCard rendered');
  return <div className="card">{title}</div>;
});

// Custom comparison function for deep or specific prop checking
const CustomMemoCard = memo(({ user }) => {
  return <div>{user.name}</div>;
}, (prevProps, nextProps) => {
  return prevProps.user.id === nextProps.user.id;
});
\`\`\`

⚠️ **Interview Caveat:** If passing callback functions or object literals directly as props, combine \`React.memo\` with \`useCallback\` and \`useMemo\` in the parent component to preserve stable reference identities.`
  },
  {
    id: 'pdf-react-4',
    section: 'react-js',
    number: 104,
    question: 'Context API vs Redux: When should we use Redux over React Context?',
    answer: `| Feature | React Context API | Redux (Redux Toolkit) |
| :--- | :--- | :--- |
| **Primary Purpose** | Prop drilling prevention for low-frequency updates | Predictable global state management for complex flows |
| **Re-render Optimization** | Triggers re-renders on **all** consumer components when value changes | Fine-grained selector subscriptions (\`useSelector\`); only components reading changed slice re-render |
| **Middlewares & Async** | No built-in middleware; requires custom hooks or effects | Powerful middleware ecosystem (Redux Thunk, Saga, RTK Query) |
| **DevTools & Debugging** | Basic React DevTools | Time-travel debugging, action inspection, state diff logs |
| **Best Used For** | Theme, Auth User profile, UI Localization | Large e-commerce carts, complex data dashboards, multi-step checkouts |

**Code Example:**
\`\`\`javascript
// Redux Toolkit Slice Example
import { createSlice } from '@reduxjs/toolkit';

const cartSlice = createSlice({
  name: 'cart',
  initialState: { items: [], total: 0 },
  reducers: {
    addItem: (state, action) => {
      state.items.push(action.payload);
      state.total += action.payload.price;
    }
  }
});
\`\`\``
  },
  {
    id: 'pdf-react-5',
    section: 'react-js',
    number: 105,
    question: 'How do you handle multiple API calls in React and what happens if one fails?',
    answer: `Handling multiple concurrent API calls depends on whether you want all-or-nothing failure or graceful individual handling:

**1. \`Promise.all\` (Fail-Fast: If one fails, entire batch rejects):**
\`\`\`javascript
async function fetchDashboard() {
  try {
    const [userRes, ordersRes] = await Promise.all([
      fetch('/api/user'),
      fetch('/api/orders')
    ]);
    const user = await userRes.json();
    const orders = await ordersRes.json();
    return { user, orders };
  } catch (error) {
    console.error('At least one API call failed:', error);
  }
}
\`\`\`

**2. \`Promise.allSettled\` (Resilient: Returns status of every call without rejecting):**
\`\`\`javascript
async function fetchResilientData() {
  const results = await Promise.allSettled([
    fetch('/api/user').then(r => r.json()),
    fetch('/api/recommendations').then(r => r.json()),
    fetch('/api/analytics').then(r => r.json())
  ]);

  const userData = results[0].status === 'fulfilled' ? results[0].value : null;
  const recommendations = results[1].status === 'fulfilled' ? results[1].value : [];
  
  return { userData, recommendations };
}
\`\`\``
  },
  {
    id: 'pdf-react-6',
    section: 'react-js',
    number: 106,
    question: 'How to build multi-language support (English & Hindi) in a React application?',
    answer: `**Modern Approach using \`react-i18next\` and Translation Dictionaries:**

\`\`\`javascript
// i18n.js Configuration
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

const resources = {
  en: {
    translation: {
      welcome: "Welcome to our Machine Coding Hub",
      login: "Login",
      startPractice: "Start Interview Practice"
    }
  },
  hi: {
    translation: {
      welcome: "मशीन कोडिंग हब में आपका स्वागत है",
      login: "लॉग इन करें",
      startPractice: "इंटरव्यू अभ्यास शुरू करें"
    }
  }
};

i18n.use(initReactI18next).init({
  resources,
  lng: 'en', // Default language
  fallbackLng: 'en',
  interpolation: { escapeValue: false }
});

export default i18n;

// Component Consumption
import React from 'react';
import { useTranslation } from 'react-i18next';

function LanguageSwitcher() {
  const { t, i18n } = useTranslation();

  const changeLanguage = (lang) => {
    i18n.changeLanguage(lang);
    localStorage.setItem('app_lang', lang);
  };

  return (
    <div>
      <h1>{t('welcome')}</h1>
      <button onClick={() => changeLanguage('en')}>English</button>
      <button onClick={() => changeLanguage('hi')}>हिंदी</button>
    </div>
  );
}
\`\`\``
  }
];
