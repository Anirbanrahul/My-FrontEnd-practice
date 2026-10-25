export const DOM_EVENTS_QUESTIONS = [
  {
    id: 'dom-1',
    section: 'dom-events',
    number: 1,
    question: 'How does event delegation work in the context of JavaScript event handling?',
    answer: `Event delegation is a pattern where a single event listener is attached to a parent element to manage events for multiple child elements by leveraging **event bubbling**.
\`\`\`javascript
document.querySelector('#parent-list').addEventListener('click', (e) => {
  if (e.target.matches('li')) {
    console.log('Clicked item:', e.target.textContent);
  }
});
\`\`\`
**Benefits**: Reduces memory usage (1 listener instead of 1000s) and handles dynamically added elements automatically.`
  },
  {
    id: 'dom-2',
    section: 'dom-events',
    number: 2,
    question: 'Explain the differences between the DOMContentLoaded and load events.',
    answer: `- **\`DOMContentLoaded\`**: Fires when initial HTML document is fully parsed and DOM tree is constructed (styles, images, and subframes don't need to be finished loading).
- **\`load\`**: Fires when whole page is completely loaded, including all dependent resources (images, stylesheets, scripts, iframes).`
  },
  {
    id: 'dom-3',
    section: 'dom-events',
    number: 3,
    question: 'How can you stop event propagation in JavaScript?',
    answer: `- **\`e.stopPropagation()\`**: Stops event from traveling up (bubbling) or down (capturing) the DOM tree.
- **\`e.stopImmediatePropagation()\`**: Stops propagation AND prevents any other event listeners attached to the exact same element from being executed.`
  },
  {
    id: 'dom-4',
    section: 'dom-events',
    number: 4,
    question: 'Describe the purpose of the addEventListener method and how it works.',
    answer: `Registers an event handler function on an EventTarget (\`Element\`, \`Document\`, \`Window\`).
\`\`\`javascript
target.addEventListener(type, listener, useCaptureOrOptions);
\`\`\`
Options object accepts \`capture: true|false\`, \`once: true\`, and \`passive: true\` (improves touch/wheel scroll performance).`
  },
  {
    id: 'dom-5',
    section: 'dom-events',
    number: 5,
    question: 'What is the event object, and how is it used in JavaScript event handling?',
    answer: `An object automatically passed to event handler functions containing properties and methods regarding the event (\`e.target\`, \`e.currentTarget\`, \`e.type\`, \`e.preventDefault()\`, \`e.stopPropagation()\`).`
  },
  {
    id: 'dom-6',
    section: 'dom-events',
    number: 6,
    question: 'Explain the differences between the onclick attribute and addEventListener for handling click events.',
    answer: `- **\`onclick\`**: Inline attribute or property (\`element.onclick = fn\`). Overwrites previous \`onclick\` handlers (only 1 handler allowed).
- **\`addEventListener\`**: Standard W3C approach allowing multiple independent listeners on the same element with event phase control.`
  },
  {
    id: 'dom-7',
    section: 'dom-events',
    number: 7,
    question: 'Explain the concept of bubbling and capturing in event propagation.',
    answer: `1. **Capturing Phase**: Event travels down from \`window\` to target element.
2. **Target Phase**: Event reaches target element.
3. **Bubbling Phase**: Event bubbles back up from target element to \`window\`.`
  },
  {
    id: 'dom-8',
    section: 'dom-events',
    number: 8,
    question: 'How can you simulate a click event using JavaScript?',
    answer: `Use \`element.click()\` or \`element.dispatchEvent(new MouseEvent('click', { bubbles: true }))\`.`
  },
  {
    id: 'dom-9',
    section: 'dom-events',
    number: 9,
    question: 'Explain the differences between the keyup, keydown, and keypress events.',
    answer: `- **\`keydown\`**: Fires when key is first pressed down (repeats if held).
- **\`keypress\`**: Deprecated; fired when character key produced a character.
- **\`keyup\`**: Fires when key is released.`
  },
  {
    id: 'dom-10',
    section: 'dom-events',
    number: 10,
    question: 'What is the purpose of the preventDefault method in JavaScript events? (And Difference between querySelector and document.getElementsByClassName)',
    answer: `- **\`e.preventDefault()\`**: Cancels default browser behavior (e.g. form submission page refresh or link navigation).
- **\`querySelector\` vs \`getElementsByClassName\`**:
  - \`querySelector\`: Returns first element matching CSS selector as static \`Element\`.
  - \`getElementsByClassName\`: Returns live HTMLCollection updating automatically when DOM mutates.`
  }
];

export const TASK_DESIGN_QUESTIONS = [
  {
    id: 'task-1',
    section: 'task-design',
    number: 1,
    question: 'Find the time taken by a function in Javascript.',
    answer: `Use \`performance.now()\` or \`console.time()\`:
\`\`\`javascript
const start = performance.now();
myFunction();
const end = performance.now();
console.log(\`Execution time: \${end - start} ms\`);
\`\`\``
  },
  {
    id: 'task-2',
    section: 'task-design',
    number: 2,
    question: 'Implement Infinite Scroll Using Javascript.',
    answer: `Use \`IntersectionObserver\` on a sentinel target element at bottom of list:
\`\`\`javascript
const observer = new IntersectionObserver((entries) => {
  if (entries[0].isIntersecting) {
    loadMoreItems();
  }
}, { threshold: 1.0 });
observer.observe(document.querySelector('#scroll-sentinel'));
\`\`\``
  },
  {
    id: 'task-3',
    section: 'task-design',
    number: 3,
    question: 'How can you clear all timeouts in Javascript?',
    answer: `Create a global registry of timeout IDs or clear highest ID downwards:
\`\`\`javascript
let id = setTimeout(() => {}, 0);
while (id--) {
  clearTimeout(id);
}
\`\`\``
  },
  {
    id: 'task-4',
    section: 'task-design',
    number: 4,
    question: 'Print numbers from 1 - 100 with a delay of 2 sec, and also Update the numbers in UI.',
    answer: `Use \`setInterval\` or async loop:
\`\`\`javascript
let count = 1;
const timer = setInterval(() => {
  document.getElementById('display').textContent = count;
  if (count === 100) clearInterval(timer);
  count++;
}, 2000);
\`\`\``
  },
  {
    id: 'task-5',
    section: 'task-design',
    number: 5,
    question: 'Show a dialog, when I click a button, make sure to handle the keyboard close, and outside close of dialog.',
    answer: `Listen for Escape key (\`keydown\`) and click outside modal backdrop (\`e.target === modalContainer\`).`
  },
  {
    id: 'task-6',
    section: 'task-design',
    number: 6,
    question: 'Make an expanded collapse div (Accordion Implementation). Add relevant Animations.',
    answer: `Toggle \`max-height\` or \`grid-template-rows: 0fr -> 1fr\` with \`transition: grid-template-rows 0.3s ease\`.`
  },
  {
    id: 'task-7',
    section: 'task-design',
    number: 7,
    question: 'How will you implement a star rating UI?',
    answer: `Render 5 star icons with \`hover\` & \`click\` listeners managing state \`rating\` and \`hoverRating\`.`
  },
  {
    id: 'task-8',
    section: 'task-design',
    number: 8,
    question: 'Create an input text, and show suggestions as user types. Create your own array of suggestions.',
    answer: `Attach \`input\` listener with debounced filter on suggestions array.`
  },
  {
    id: 'task-9',
    section: 'task-design',
    number: 9,
    question: 'In The webpage, add background:yellow, to all text which are greater than 5 characters.',
    answer: `Traverse DOM text nodes or query all elements, split words, wrap words > 5 chars in \`<mark style="background:yellow">\`.`
  },
  {
    id: 'task-10',
    section: 'task-design',
    number: 10,
    question: 'Implement a Kanban Board using Javascript.',
    answer: `Use HTML5 Drag and Drop API (\`dragstart\`, \`dragover\`, \`drop\`) or state arrays updating column keys.`
  },
  {
    id: 'task-11',
    section: 'task-design',
    number: 11,
    question: 'You have an api, which gives some data, now you have shown all the data in the UI. Use any hosting provider, host JSON and consume it.',
    answer: `Host JSON on GitHub Gist / JSONKeeper, fetch via \`fetch(url).then(res => res.json())\` and render in DOM.`
  },
  {
    id: 'task-12',
    section: 'task-design',
    number: 12,
    question: 'Build a calculator with basic arithmetic operations. Use only Plain JS.',
    answer: `Grid layout buttons with \`eval\` or custom expression parser updating display input value.`
  },
  {
    id: 'task-13',
    section: 'task-design',
    number: 13,
    question: 'Create a stopwatch.',
    answer: `Maintain \`elapsedTime\`, update UI via \`requestAnimationFrame\` or \`setInterval(10ms)\`.`
  },
  {
    id: 'task-14',
    section: 'task-design',
    number: 14,
    question: 'Create a timer, once time is over show an alert.',
    answer: `Countdown interval decrementing seconds; when \`seconds === 0\`, clear interval and trigger \`alert()\`.`
  },
  {
    id: 'task-15',
    section: 'task-design',
    number: 15,
    question: 'Demonstrate usage of prompt and confirm box.',
    answer: `\`\`\`javascript
const name = prompt("What is your name?");
if (confirm(\`Hello \${name}, do you want to proceed?\`)) {
  console.log("Confirmed!");
}
\`\`\``
  },
  {
    id: 'task-16',
    section: 'task-design',
    number: 16,
    question: 'Using prompt take number from user, and based on that number print a triangle of *. Number given by the user denotes the number of rows in a triangle.',
    answer: `\`\`\`javascript
const rows = Number(prompt("Enter rows:"));
let result = "";
for (let i = 1; i <= rows; i++) {
  result += "*".repeat(i) + "\\n";
}
console.log(result);
\`\`\``
  },
  {
    id: 'task-17',
    section: 'task-design',
    number: 17,
    question: 'Move a div from left of the screen to the right of the screen.',
    answer: `Use CSS keyframes \`transform: translateX(0) -> translateX(calc(100vw - 100%))\` or JS \`requestAnimationFrame\`.`
  },
  {
    id: 'task-18',
    section: 'task-design',
    number: 18,
    question: 'Show a tooltip, on hover of a button. Make sure to give the user the ability to change tooltip position (left, right, top, bottom).',
    answer: `Position tooltip relative to button using \`getBoundingClientRect()\` or CSS attribute \`data-position="top"\`.`
  },
  {
    id: 'task-19',
    section: 'task-design',
    number: 19,
    question: 'Create a feature using which I can show notifications on my website (Toast message). Auto dismissed after 3s, stacked.',
    answer: `Create toast manager pushing elements to fixed container with \`setTimeout(() => removeToast(), 3000)\`.`
  },
  {
    id: 'task-20',
    section: 'task-design',
    number: 20,
    question: 'Create tic-tac-toe game.',
    answer: `Maintain 9-length state array \`['','',...]\`, check winning combinations \`[0,1,2],[3,4,5],[6,7,8],[0,3,6],[1,4,7],[2,5,8],[0,4,8],[2,4,6]\`.`
  },
  {
    id: 'task-21',
    section: 'task-design',
    number: 21,
    question: 'How can you lazy load an image?',
    answer: `Use native \`loading="lazy"\` attribute or \`IntersectionObserver\` swapping \`data-src\` to \`src\`.`
  }
];
