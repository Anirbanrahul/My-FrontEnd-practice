// Frontend Interview Bible - DOM Manipulation & Task-Based FE Design

export const DOM_EVENTS_QUESTIONS = [
  {
    id: 'dom-1',
    section: 'dom-events',
    number: 1,
    question: 'How does event delegation work in the context of JavaScript event handling?',
    answer: `**Event Delegation** is a high-performance design pattern where a single event listener is attached to a shared ancestor element rather than attaching hundreds of individual listeners to child nodes, leveraging **Event Bubbling**.

### How It Works:
1. When an event fires on a child element (e.g. clicking a \`<button>\` or \`<li>\`), it triggers on the target, then bubbles upwards through the DOM hierarchy.
2. The ancestor listener catches the bubbling event.
3. The listener uses **\`e.target.closest('selector')\`** or \`e.target.matches('selector')\` to verify if the event originated from a relevant interactive child.

\`\`\`javascript
// Single listener manages thousands of table rows or dynamic list items
const tableBody = document.querySelector("#user-table-body");

tableBody.addEventListener("click", (event) => {
  // Find nearest matching button within the clicked path
  const deleteBtn = event.target.closest(".btn-delete");
  if (!deleteBtn) return; // Click occurred elsewhere in the row

  const row = deleteBtn.closest("tr");
  const userId = row.dataset.userId;

  console.log(\`Deleting user: \${userId}\`);
  row.remove();
});
\`\`\`

### Key Benefits:
- **Massive Memory Savings**: Allocates 1 listener in memory instead of 10,000 listeners for large tables or infinite lists.
- **Dynamic Elements Support**: Automatically works for newly added DOM elements inserted via AJAX/fetch without needing re-binding.
- **Zero Memory Leaks on Deletion**: Removing child rows does not leave dangling detached event listeners.`
  },
  {
    id: 'dom-2',
    section: 'dom-events',
    number: 2,
    question: 'Explain the differences between the DOMContentLoaded and load events.',
    answer: `Both events signal document readiness milestones during browser page initialization, but occur at very different points in the **Critical Rendering Path**:

| Event | Fired On | When Does It Fire? | Waits For Images & Stylesheets? |
| :--- | :--- | :--- | :--- |
| **\`DOMContentLoaded\`** | \`document\` | When HTML is fully parsed and DOM tree is built | ❌ **No** (Fires before heavy images/fonts load) |
| **\`load\`** | \`window\` | When HTML **AND** all external subresources have loaded | ✅ **Yes** (Waits for all images, iframes, stylesheets) |

\`\`\`javascript
// Best for initializing UI widgets, attaching event handlers, mounting components:
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM Tree ready! Safe to querySelector and attach click handlers.");
});

// Best for calculating accurate layout bounding rects of images or hide splash loaders:
window.addEventListener("load", () => {
  console.log("Entire page completely loaded including all 4K images & fonts!");
});
\`\`\`

👉 Interview Tip: Always initialize frontend scripts on \`DOMContentLoaded\` (or use \`<script defer>\`) rather than waiting for \`window.load\` to make applications interactive seconds faster on slow mobile connections.`
  },
  {
    id: 'dom-3',
    section: 'dom-events',
    number: 3,
    question: 'How can you stop event propagation in JavaScript?',
    answer: `The standard DOM Event interface provides two distinct methods to halt event transmission along the DOM hierarchy:

### 1. \`event.stopPropagation()\`:
- Prevents the event from traveling further up (bubbling) or down (capturing) the DOM tree to parent ancestor nodes.
- **However**, any other event listeners attached to the **exact same DOM element** will still execute!

### 2. \`event.stopImmediatePropagation()\`:
- Stops propagation up the DOM tree **AND** immediately halts execution of any other listeners registered on the **exact same element** for that event.

\`\`\`javascript
const button = document.querySelector("#submit-btn");

// Listener 1: Form Validation Guard
button.addEventListener("click", (e) => {
  if (!isFormValid()) {
    console.log("Validation failed: halting all other button handlers!");
    e.stopImmediatePropagation(); // Listener 2 will NEVER run!
    e.stopPropagation();          // Parent form will NEVER see click!
  }
});

// Listener 2: Network Dispatcher
button.addEventListener("click", () => {
  console.log("Dispatching network payload...");
});
\`\`\`

📌 Note: Neither method prevents the default browser action (like following a link or submitting a form). To prevent default actions, call **\`event.preventDefault()\`**.`
  },
  {
    id: 'dom-4',
    section: 'dom-events',
    number: 4,
    question: 'Describe the purpose of the addEventListener method and how it works.',
    answer: `The **\`addEventListener()\`** method registers an event handler function on an \`EventTarget\` (Element, Document, or Window).

### Formal Syntax:
\`\`\`javascript
target.addEventListener(type, listener, optionsOrUseCapture);
\`\`\`

### The \`options\` Parameter:
1. **\`capture: boolean\`**: When \`true\`, fires the handler during the **Capturing Phase** before reaching the target.
2. **\`once: boolean\`**: When \`true\`, automatically invokes \`removeEventListener()\` after the first execution (ideal for one-time initialization).
3. **\`passive: boolean\`**: When \`true\`, asserts the handler will never call \`e.preventDefault()\`. This allows browser scrolling engines to scroll immediately without waiting for JavaScript execution, boosting scroll smoothness (60+ FPS).
4. **\`signal: AbortSignal\`**: Allows removing the listener programmatically via an \`AbortController\`.

\`\`\`javascript
const controller = new AbortController();

// High performance passive scroll listener with AbortController cleanup
window.addEventListener("scroll", handleScroll, {
  passive: true,
  signal: controller.signal
});

// Cleanup listener anytime in 1 line:
controller.abort();
\`\`\``
  },
  {
    id: 'dom-5',
    section: 'dom-events',
    number: 5,
    question: 'What is the event object, and how is it used in JavaScript event handling?',
    answer: `The **Event Object** is an object automatically created by the browser engine and passed as the first parameter to any event listener callback, providing metadata and control methods for that event.

### Key Properties & Methods:
- **\`e.target\`**: The deepest element in the DOM where the event actually initiated.
- **\`e.currentTarget\`**: The element to which the event listener is currently attached.
- **\`e.type\`**: The name of the event (\`"click"\`, \`"keydown"\`, \`"submit"\`).
- **\`e.clientX\` / \`e.clientY\`**: Mouse coordinates relative to the visible viewport.
- **\`e.key\` / \`e.code\`**: The physical key pressed during keyboard events.
- **\`e.preventDefault()\`**: Cancels the browser's default action.
- **\`e.stopPropagation()\`**: Halts bubbling/capturing up the DOM.

\`\`\`javascript
const list = document.querySelector("#todo-list");

list.addEventListener("click", (e) => {
  console.log("Clicked Element (target):", e.target.tagName);
  console.log("Container Element (currentTarget):", e.currentTarget.id);
  console.log("Mouse position:", e.clientX, e.clientY);
});
\`\`\``
  },
  {
    id: 'dom-6',
    section: 'dom-events',
    number: 6,
    question: 'Explain the differences between the onclick attribute and addEventListener for handling click events.',
    answer: `| Architectural Criterion | \`onclick\` Property / Attribute | \`addEventListener('click', ...)\` |
| :--- | :--- | :--- |
| **Multiple Listeners** | ❌ **Only 1 handler** (subsequent assignments overwrite prior handlers) | ✅ **Multiple independent handlers** can be registered |
| **Event Phase Control** | Only supports **Bubbling Phase** | Supports both **Capturing** and **Bubbling** phases |
| **Advanced Options** | None | Supports \`passive\`, \`once\`, and \`AbortSignal\` |
| **Separation of Concerns** | Inline HTML attributes mix markup with logic | Clean separation of JavaScript logic from markup |

\`\`\`javascript
const btn = document.querySelector("#btn");

// onclick: Overwrites
btn.onclick = () => console.log("First");
btn.onclick = () => console.log("Second"); // Overwrites! Only "Second" prints!

// addEventListener: Coexists
btn.addEventListener("click", () => console.log("Handler A"));
btn.addEventListener("click", () => console.log("Handler B")); // Both execute!
\`\`\``
  },
  {
    id: 'dom-7',
    section: 'dom-events',
    number: 7,
    question: 'Explain the concept of bubbling and capturing in event propagation.',
    answer: `The W3C DOM Event specification divides event dispatching into **3 sequential phases**:

\`\`\`mermaid
flowchart TD
    Window["Window"] --> Document["Document"]
    Document --> Body["HTML / Body"]
    Body --> Parent["Parent Container"]
    Parent --> Target["Target Element (Phase 2: At Target)"]

    subgraph Capturing ["Phase 1: Capturing (Trickling Down)"]
        Window -.-> Document -.-> Body -.-> Parent
    end

    subgraph Bubbling ["Phase 3: Bubbling (Bubbling Up)"]
        Target -.-> Parent2["Parent Container"] -.-> Body2["Body"] -.-> Window2["Window"]
    end
\`\`\`

1. **Phase 1: Capturing Phase (Trickling)**:
   - The event travels down from the top-level \`window\`, through \`document\`, \`<html>\`, \`<body>\`, and ancestor nodes down toward the target.
   - Handlers registered with \`{ capture: true }\` execute during this phase.
2. **Phase 2: Target Phase**:
   - The event reaches the actual element that was clicked or triggered.
3. **Phase 3: Bubbling Phase**:
   - The event bubbles back upwards from the target element through all parent ancestors to \`window\`.
   - Default standard listeners (\`{ capture: false }\`) execute during this phase.`
  },
  {
    id: 'dom-8',
    section: 'dom-events',
    number: 8,
    question: 'How can you simulate a click event using JavaScript?',
    answer: `Programmatically triggering click events can be accomplished via native method invocation or custom synthetic events:

### Method 1: The Native \`.click()\` Method (Most Common)
\`\`\`javascript
const fileInput = document.querySelector("#hidden-file-input");
const customBtn = document.querySelector("#custom-upload-btn");

// Simulate click on hidden file input when pretty button is clicked
customBtn.addEventListener("click", () => {
  fileInput.click();
});
\`\`\`

### Method 2: Synthetic Event Dispatching via \`dispatchEvent\` (Advanced)
Allows custom configuration of bubbling, cancellation, and mouse coordinates:
\`\`\`javascript
const targetElement = document.querySelector("#interactive-target");

const syntheticClick = new MouseEvent("click", {
  bubbles: true,        // Event bubbles up the DOM tree
  cancelable: true,     // Event can be cancelled with preventDefault
  view: window,
  clientX: 150,
  clientY: 200
});

targetElement.dispatchEvent(syntheticClick);
\`\`\``
  },
  {
    id: 'dom-9',
    section: 'dom-events',
    number: 9,
    question: 'Explain the differences between the keyup, keydown, and keypress events.',
    answer: `| Event | When Does It Fire? | Repeats on Hold? | Current Specification Status |
| :--- | :--- | :--- | :--- |
| **\`keydown\`** | When a physical key is first pressed down | ✅ **Yes** (Continuous repeat stream) | **Standard & Active** |
| **\`keypress\`** | Fired when a key produced a character | Yes | ❌ **Deprecated in modern DOM specs** |
| **\`keyup\`** | When the physical key is released | ❌ No (Fires once upon release) | **Standard & Active** |

\`\`\`javascript
const inputField = document.querySelector("#search-input");

// keydown: Captures modifier keys (Ctrl, Shift, Esc, Backspace, Arrow keys)
inputField.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    inputField.blur();
    closeDropdown();
  }
});

// keyup: Fires after input value has updated in the DOM
inputField.addEventListener("keyup", (e) => {
  console.log("Current value after release:", e.target.value);
});
\`\`\`

👉 Interview Tip: Always use **\`e.key\`** (e.g. \`"Enter"\`, \`"Escape"\`) instead of deprecated numeric \`e.keyCode\` or \`e.which\` values (\`13\`, \`27\`).`
  },
  {
    id: 'dom-10',
    section: 'dom-events',
    number: 10,
    question: 'What is the purpose of the preventDefault method in JavaScript events? (And Difference between querySelector and document.getElementsByClassName)',
    answer: `### 1. Purpose of \`event.preventDefault()\`:
Cancels the browser's native default behavior associated with an event without stopping its propagation:
- Prevents form submit buttons from reloading the full webpage.
- Prevents anchor \`<a href="...">\` tags from triggering page navigation.
- Prevents checkbox inputs from toggling state if a confirmation dialog is rejected.

### 2. \`querySelector\` vs \`getElementsByClassName\`:
| Feature | \`document.querySelector()\` / \`querySelectorAll()\` | \`document.getElementsByClassName()\` |
| :--- | :--- | :--- |
| **Selector Syntax** | Full CSS Selector syntax (\`.class\`, \`#id > div[type]\`) | Class names only (no dot prefix) |
| **Return Type** | Static \`Element\` or static \`NodeList\` | **Live \`HTMLCollection\`** |
| **Live DOM Updates** | **Static snapshot** (does not update if DOM changes) | **Live** (automatically updates when DOM changes!) |
| **Array Methods** | \`NodeList\` supports \`.forEach()\` natively | \`HTMLCollection\` lacks \`.forEach\` (must convert via \`Array.from\`) |`
  }
];

export const TASK_DESIGN_QUESTIONS = [
  {
    id: 'task-1',
    section: 'task-design',
    number: 1,
    question: 'Find the time taken by a function in Javascript.',
    answer: `Measuring execution performance accurately requires high-resolution timestamps from the **Performance API** or console timing tools.

### Approach 1: High-Resolution \`performance.now()\` (Sub-millisecond accuracy)
\`\`\`javascript
function measureExecutionTime(fn, ...args) {
  const startTime = performance.now();
  const result = fn(...args);
  const endTime = performance.now();

  const durationMs = (endTime - startTime).toFixed(3);
  console.log(\`Execution Time: \${durationMs} ms\`);
  return result;
}

// Example benchmark
const heavyCalculation = () => {
  let sum = 0;
  for (let i = 0; i < 5000000; i++) sum += Math.sqrt(i);
  return sum;
};

measureExecutionTime(heavyCalculation);
\`\`\`

### Approach 2: Developer Tools \`console.time()\` and \`console.timeEnd()\`
\`\`\`javascript
console.time("ArraySortingBenchmark");
[...Array(100000)].map(() => Math.random()).sort();
console.timeEnd("ArraySortingBenchmark");
\`\`\`

👉 Interview Tip: \`performance.now()\` measures time relative to page navigation start (\`performance.timeOrigin\`) with microsecond resolution, unaffected by operating system clock adjustments (unlike \`Date.now()\`).`
  },
  {
    id: 'task-2',
    section: 'task-design',
    number: 2,
    question: 'Implement Infinite Scroll Using Javascript.',
    answer: `The production-grade approach to infinite scrolling uses the **\`IntersectionObserver\` API** to monitor an invisible sentinel element placed at the bottom of the content container.

\`\`\`javascript
class InfiniteScroller {
  constructor(containerEl, sentinelEl, fetchBatchFn) {
    this.container = containerEl;
    this.sentinel = sentinelEl;
    this.fetchBatch = fetchBatchFn;
    this.isLoading = false;
    this.page = 1;

    this.initObserver();
  }

  initObserver() {
    this.observer = new IntersectionObserver(
      (entries) => {
        // Trigger load only when sentinel enters viewport and not already fetching
        if (entries[0].isIntersecting && !this.isLoading) {
          this.loadNextPage();
        }
      },
      { root: null, rootMargin: "300px", threshold: 0.1 } // 300px pre-fetch buffer
    );

    this.observer.observe(this.sentinel);
  }

  async loadNextPage() {
    this.isLoading = true;
    this.showSpinner();

    try {
      const newItems = await this.fetchBatch(this.page++);
      if (newItems.length === 0) {
        this.observer.disconnect(); // No more items: cease observing
        this.showEndMessage();
      } else {
        this.renderItems(newItems);
      }
    } catch (err) {
      console.error("Failed to load infinite scroll batch:", err);
    } finally {
      this.isLoading = false;
      this.hideSpinner();
    }
  }

  renderItems(items) {
    const fragment = document.createDocumentFragment();
    items.forEach((item) => {
      const card = document.createElement("div");
      card.className = "scroll-item-card";
      card.textContent = item.title;
      fragment.appendChild(card);
    });
    this.container.insertBefore(fragment, this.sentinel);
  }
}
\`\`\`

👉 Interview Tip: Using \`IntersectionObserver\` is vastly superior to listening to \`window.addEventListener('scroll')\` because it runs asynchronously on the browser compositing thread and avoids layout thrashing.`
  },
  {
    id: 'task-3',
    section: 'task-design',
    number: 3,
    question: 'How can you clear all timeouts in Javascript?',
    answer: `Browser timer IDs are incremental consecutive integers. You can clear all pending timeouts by spawning a dummy timer to find the highest registered ID and decrementing downward:

\`\`\`javascript
function clearAllTimeouts() {
  // 1. Create a dummy timeout to obtain the highest active timer ID
  let highestTimeoutId = setTimeout(() => {}, 0);

  // 2. Loop downward clearing every timer ID in the engine registry
  while (highestTimeoutId > 0) {
    clearTimeout(highestTimeoutId);
    clearInterval(highestTimeoutId); // Timeouts and intervals share the same ID pool!
    highestTimeoutId--;
  }

  console.log("All pending timeouts and intervals cleared.");
}
\`\`\`

### Architectural Alternative: The Timer Registry Pattern:
In production applications, avoid brute-force ID decrementing; maintain an explicit registry or wrap timers in an abortable manager:
\`\`\`javascript
class TimerManager {
  constructor() { this.activeTimers = new Set(); }

  setTimeout(fn, delay) {
    const id = setTimeout(() => {
      this.activeTimers.delete(id);
      fn();
    }, delay);
    this.activeTimers.add(id);
    return id;
  }

  clearAll() {
    this.activeTimers.forEach(id => clearTimeout(id));
    this.activeTimers.clear();
  }
}
\`\`\``
  },
  {
    id: 'task-4',
    section: 'task-design',
    number: 4,
    question: 'Print numbers from 1 - 100 with a delay of 2 sec, and also Update the numbers in UI.',
    answer: `\`\`\`html
<div class="counter-display">
  <h2>Live Counter: <span id="num-box">0</span></h2>
  <button id="stop-btn">Stop</button>
</div>

<script>
function startVisualCounter(start = 1, end = 100, intervalMs = 2000) {
  const display = document.getElementById("num-box");
  const stopBtn = document.getElementById("stop-btn");
  let current = start;

  // Render initial value immediately
  display.textContent = current;

  const timer = setInterval(() => {
    current++;
    display.textContent = current;

    if (current >= end) {
      clearInterval(timer);
      console.log("Counter reached limit: 100");
    }
  }, intervalMs);

  stopBtn.addEventListener("click", () => {
    clearInterval(timer);
    console.log("Counter manually halted at:", current);
  }, { once: true });
}

document.addEventListener("DOMContentLoaded", () => startVisualCounter());
</script>
\`\`\``
  },
  {
    id: 'task-5',
    section: 'task-design',
    number: 5,
    question: 'Show a dialog, when I click a button, make sure to handle the keyboard close, and outside close of dialog.',
    answer: `An accessible modal dialog requires:
1. Closing when pressing the **Escape key**.
2. Closing when clicking the **backdrop overlay** (outside the dialog).
3. **Accessibility Attributes** (\`role="dialog"\`, \`aria-modal="true"\`, focus trapping).

\`\`\`html
<!-- Modal Structure -->
<button id="open-modal-btn">Open Dialog</button>

<div id="modal-backdrop" class="modal-backdrop" role="dialog" aria-modal="true" aria-labelledby="modal-title" style="display: none;">
  <div class="modal-dialog-box" id="modal-content">
    <h3 id="modal-title">Confirm Action</h3>
    <p>Are you sure you want to proceed with this deployment?</p>
    <button id="confirm-btn">Confirm</button>
    <button id="close-modal-btn">Cancel</button>
  </div>
</div>

<script>
class AccessibleModal {
  constructor(backdropSelector, contentSelector, openBtnSelector) {
    this.backdrop = document.querySelector(backdropSelector);
    this.content = document.querySelector(contentSelector);
    this.openBtn = document.querySelector(openBtnSelector);

    this.bindEvents();
  }

  open() {
    this.backdrop.style.display = "flex";
    this.content.querySelector("button").focus(); // Focus management
    document.addEventListener("keydown", this.handleKeyDown);
  }

  close() {
    this.backdrop.style.display = "none";
    document.removeEventListener("keydown", this.handleKeyDown);
    this.openBtn.focus(); // Return focus to trigger button
  }

  handleKeyDown = (e) => {
    if (e.key === "Escape") this.close();
  };

  bindEvents() {
    this.openBtn.addEventListener("click", () => this.open());

    // Close on outside backdrop click (Target is backdrop, NOT content card)
    this.backdrop.addEventListener("click", (e) => {
      if (e.target === this.backdrop) this.close();
    });

    this.content.querySelector("#close-modal-btn").addEventListener("click", () => this.close());
  }
}

new AccessibleModal("#modal-backdrop", "#modal-content", "#open-modal-btn");
</script>
\`\`\``
  },
  {
    id: 'task-6',
    section: 'task-design',
    number: 6,
    question: 'Make an expanded collapse div (Accordion Implementation). Add relevant Animations.',
    answer: `Modern CSS animated accordion using **CSS Grid 0fr to 1fr transitions** (the smoothest, zero-hack layout animation).

\`\`\`html
<div class="accordion-item">
  <button class="accordion-header" aria-expanded="false" id="acc-btn-1">
    <span>What is the React 19 Action API?</span>
    <span class="icon">▼</span>
  </button>
  <div class="accordion-panel" role="region" aria-labelledby="acc-btn-1">
    <div class="accordion-content">
      <p>The Actions API in React 19 handles async transitions, optimistic updates, and form submissions automatically.</p>
    </div>
  </div>
</div>

<style>
.accordion-panel {
  display: grid;
  grid-template-rows: 0fr; /* Collapsed state */
  transition: grid-template-rows 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.accordion-panel.is-open {
  grid-template-rows: 1fr; /* Expanded state */
}

.accordion-content {
  overflow: hidden; /* Required for grid animation */
}
</style>

<script>
document.querySelectorAll(".accordion-header").forEach(header => {
  header.addEventListener("click", () => {
    const isExpanded = header.getAttribute("aria-expanded") === "true";
    const panel = header.nextElementSibling;

    header.setAttribute("aria-expanded", !isExpanded);
    panel.classList.toggle("is-open", !isExpanded);
  });
});
</script>
\`\`\``
  },
  {
    id: 'task-7',
    section: 'task-design',
    number: 7,
    question: 'How will you implement a star rating UI?',
    answer: `A Star Rating widget requires three visual states: **Committed Rating**, **Hover Preview**, and **Reset on MouseLeave**.

\`\`\`html
<div class="star-rating" id="star-rating" role="radiogroup" aria-label="Product Rating">
  <span class="star" data-rating="1">★</span>
  <span class="star" data-rating="2">★</span>
  <span class="star" data-rating="3">★</span>
  <span class="star" data-rating="4">★</span>
  <span class="star" data-rating="5">★</span>
</div>

<style>
.star {
  font-size: 2rem;
  cursor: pointer;
  color: #cbd5e1; /* Inactive star color */
  transition: color 0.15s ease, transform 0.1s;
}
.star.filled {
  color: #f59e0b; /* Active gold star */
}
</style>

<script>
class StarRatingWidget {
  constructor(containerSelector) {
    this.container = document.querySelector(containerSelector);
    this.stars = Array.from(this.container.querySelectorAll(".star"));
    this.currentRating = 0;

    this.bindEvents();
  }

  setVisualState(rating) {
    this.stars.forEach((star, index) => {
      star.classList.toggle("filled", index < rating);
    });
  }

  bindEvents() {
    this.container.addEventListener("mouseover", (e) => {
      const star = e.target.closest(".star");
      if (star) this.setVisualState(Number(star.dataset.rating));
    });

    this.container.addEventListener("mouseleave", () => {
      this.setVisualState(this.currentRating); // Reset to committed rating
    });

    this.container.addEventListener("click", (e) => {
      const star = e.target.closest(".star");
      if (star) {
        this.currentRating = Number(star.dataset.rating);
        this.setVisualState(this.currentRating);
        console.log("Committed Rating:", this.currentRating);
      }
    });
  }
}

new StarRatingWidget("#star-rating");
</script>
\`\`\``
  },
  {
    id: 'task-8',
    section: 'task-design',
    number: 8,
    question: 'Create an input text, and show suggestions as user types. Create your own array of suggestions.',
    answer: `Debounced autocomplete search dropdown with keyboard navigation:

\`\`\`javascript
const frameworks = ["React", "React Native", "Redux", "Remix", "Vue.js", "Vite", "Angular", "Svelte", "Next.js", "Nuxt.js"];

class Autocomplete {
  constructor(inputEl, dropdownEl, items) {
    this.input = inputEl;
    this.dropdown = dropdownEl;
    this.items = items;
    this.debounceTimer = null;

    this.bindEvents();
  }

  bindEvents() {
    this.input.addEventListener("input", (e) => {
      clearTimeout(this.debounceTimer);
      this.debounceTimer = setTimeout(() => {
        this.filterAndRender(e.target.value.trim());
      }, 250);
    });
  }

  filterAndRender(query) {
    if (!query) {
      this.dropdown.innerHTML = "";
      this.dropdown.style.display = "none";
      return;
    }

    const matches = this.items.filter(item => 
      item.toLowerCase().includes(query.toLowerCase())
    );

    if (matches.length === 0) {
      this.dropdown.innerHTML = '<div class="no-matches">No frameworks found</div>';
    } else {
      this.dropdown.innerHTML = matches
        .map(item => \`<div class="suggestion-item">\${item}</div>\`)
        .join("");
    }

    this.dropdown.style.display = "block";
  }
}
\`\`\``
  },
  {
    id: 'task-9',
    section: 'task-design',
    number: 9,
    question: 'In The webpage, add background:yellow, to all text which are greater than 5 characters.',
    answer: `Use a **TreeWalker** to safely traverse text nodes without destroying existing DOM event listeners:

\`\`\`javascript
function highlightLongWords(rootNode = document.body) {
  // Create TreeWalker to filter purely TEXT nodes
  const walker = document.createTreeWalker(
    rootNode,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode(node) {
        // Skip script and style tags
        const parentTag = node.parentNode.tagName;
        if (parentTag === "SCRIPT" || parentTag === "STYLE" || parentTag === "MARK") {
          return NodeFilter.FILTER_REJECT;
        }
        return node.nodeValue.trim().length > 0 
          ? NodeFilter.FILTER_ACCEPT 
          : NodeFilter.FILTER_SKIP;
      }
    }
  );

  const textNodes = [];
  while (walker.nextNode()) textNodes.push(walker.currentNode);

  textNodes.forEach(textNode => {
    const words = textNode.nodeValue.split(/(\\s+)/);
    const fragment = document.createDocumentFragment();

    words.forEach(word => {
      // Check clean alphanumeric length
      const cleanWord = word.replace(/[^a-zA-Z0-9]/g, "");
      if (cleanWord.length > 5) {
        const mark = document.createElement("mark");
        mark.style.backgroundColor = "yellow";
        mark.textContent = word;
        fragment.appendChild(mark);
      } else {
        fragment.appendChild(document.createTextNode(word));
      }
    });

    textNode.parentNode.replaceChild(fragment, textNode);
  });
}
\`\`\``
  },
  {
    id: 'task-10',
    section: 'task-design',
    number: 10,
    question: 'Implement a Kanban Board using Javascript.',
    answer: `Implement a Kanban Board using the native **HTML5 Drag and Drop API** (\`dragstart\`, \`dragover\`, \`drop\`):

\`\`\`html
<div class="kanban-board">
  <div class="kanban-column" id="todo" ondragover="event.preventDefault()">
    <h3>To Do</h3>
    <div class="kanban-card" draggable="true" id="task-1">Design System</div>
    <div class="kanban-card" draggable="true" id="task-2">Write Unit Tests</div>
  </div>

  <div class="kanban-column" id="in-progress" ondragover="event.preventDefault()">
    <h3>In Progress</h3>
  </div>

  <div class="kanban-column" id="done" ondragover="event.preventDefault()">
    <h3>Done</h3>
  </div>
</div>

<script>
document.querySelectorAll(".kanban-card").forEach(card => {
  card.addEventListener("dragstart", (e) => {
    e.dataTransfer.setData("text/plain", card.id);
    card.classList.add("dragging");
  });

  card.addEventListener("dragend", () => {
    card.classList.remove("dragging");
  });
});

document.querySelectorAll(".kanban-column").forEach(column => {
  column.addEventListener("dragover", (e) => {
    e.preventDefault(); // Necessary to allow drop
    column.classList.add("drag-over");
  });

  column.addEventListener("dragleave", () => {
    column.classList.remove("drag-over");
  });

  column.addEventListener("drop", (e) => {
    e.preventDefault();
    column.classList.remove("drag-over");
    const cardId = e.dataTransfer.getData("text/plain");
    const card = document.getElementById(cardId);
    if (card) column.appendChild(card);
  });
});
</script>
\`\`\``
  },
  {
    id: 'task-11',
    section: 'task-design',
    number: 11,
    question: 'You have an api, which gives some data, now you have shown all the data in the UI. Use any hosting provider, host JSON and consume it.',
    answer: `\`\`\`javascript
async function loadHostedProducts() {
  const container = document.getElementById("product-grid");
  container.innerHTML = '<div class="loader">Loading items...</div>';

  try {
    // Hosted on JSONBin or GitHub Gist
    const response = await fetch("https://api.jsonbin.io/v3/b/MY_BIN_ID/latest", {
      headers: { "X-Master-Key": "YOUR_SECRET_KEY" }
    });

    if (!response.ok) throw new Error(\`Network error: \${response.status}\`);
    const { record: products } = await response.json();

    const fragment = document.createDocumentFragment();
    products.forEach(item => {
      const card = document.createElement("article");
      card.className = "product-card";
      card.innerHTML = \`
        <h4>\${item.title}</h4>
        <p>Price: $\${item.price.toFixed(2)}</p>
      \`;
      fragment.appendChild(card);
    });

    container.innerHTML = "";
    container.appendChild(fragment);
  } catch (err) {
    container.innerHTML = \`<div class="error-banner">Failed: \${err.message}</div>\`;
  }
}
\`\`\``
  },
  {
    id: 'task-12',
    section: 'task-design',
    number: 12,
    question: 'Build a calculator with basic arithmetic operations. Use only Plain JS.',
    answer: `Safe expression evaluator without using dangerous \`eval()\`:

\`\`\`javascript
class SimpleCalculator {
  constructor(displayEl) {
    this.display = displayEl;
    this.currentExpression = "";
  }

  append(char) {
    // Prevent consecutive operators (e.g. "5++2")
    if (/[+\-*/]/.test(char) && /[+\-*/]$/.test(this.currentExpression)) {
      this.currentExpression = this.currentExpression.slice(0, -1) + char;
    } else {
      this.currentExpression += char;
    }
    this.updateUI();
  }

  clear() {
    this.currentExpression = "";
    this.updateUI("0");
  }

  calculate() {
    try {
      // Safe evaluation using Function constructor with sanitization
      if (!/^[0-9+\-*/. ]+$/.test(this.currentExpression)) throw new Error("Invalid Input");
      const result = new Function(\`return \${this.currentExpression}\`)();
      this.currentExpression = String(result);
      this.updateUI();
    } catch {
      this.updateUI("Error");
      this.currentExpression = "";
    }
  }

  updateUI(val = this.currentExpression) {
    this.display.value = val;
  }
}
\`\`\``
  },
  {
    id: 'task-13',
    section: 'task-design',
    number: 13,
    question: 'Create a stopwatch.',
    answer: `High precision stopwatch using \`performance.now()\` to prevent background tab timer drift:

\`\`\`javascript
class Stopwatch {
  constructor(displayEl) {
    this.display = displayEl;
    this.startTime = 0;
    this.elapsedTime = 0;
    this.animationFrameId = null;
    this.isRunning = false;
  }

  start() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.startTime = performance.now() - this.elapsedTime;
    this.tick();
  }

  tick = () => {
    this.elapsedTime = performance.now() - this.startTime;
    this.render();
    this.animationFrameId = requestAnimationFrame(this.tick);
  };

  stop() {
    this.isRunning = false;
    cancelAnimationFrame(this.animationFrameId);
  }

  reset() {
    this.stop();
    this.elapsedTime = 0;
    this.render();
  }

  render() {
    const totalMs = Math.floor(this.elapsedTime);
    const ms = Math.floor((totalMs % 1000) / 10);
    const sec = Math.floor((totalMs / 1000) % 60);
    const min = Math.floor(totalMs / 60000);

    const pad = n => String(n).padStart(2, "0");
    this.display.textContent = \`\${pad(min)}:\${pad(sec)}:\${pad(ms)}\`;
  }
}
\`\`\``
  },
  {
    id: 'task-14',
    section: 'task-design',
    number: 14,
    question: 'Create a timer, once time is over show an alert.',
    answer: `\`\`\`javascript
function startCountdownTimer(seconds, onTick, onComplete) {
  let remaining = seconds;
  onTick(remaining);

  const timerId = setInterval(() => {
    remaining--;
    onTick(remaining);

    if (remaining <= 0) {
      clearInterval(timerId);
      onComplete();
    }
  }, 1000);

  return () => clearInterval(timerId); // Cancellation token
}

// Usage:
const cancel = startCountdownTimer(
  10,
  (sec) => console.log(\`Time left: \${sec}s\`),
  () => alert("Time is up! Scheduled task complete.")
);
\`\`\``
  },
  {
    id: 'task-15',
    section: 'task-design',
    number: 15,
    question: 'Demonstrate usage of prompt and confirm box.',
    answer: `\`prompt()\` gathers textual user input; \`confirm()\` asks for a boolean OK/Cancel choice. Both are synchronous, blocking browser modal dialogs:

\`\`\`javascript
function handleUserOnboarding() {
  // prompt: Returns user string or null if Cancel clicked
  const username = prompt("Please enter your developer handle:", "coder123");

  if (!username) {
    console.log("Onboarding cancelled by user.");
    return;
  }

  // confirm: Returns true (OK) or false (Cancel)
  const agreesToTerms = confirm(\`Welcome, \${username}! Do you accept our Terms of Service?\`);

  if (agreesToTerms) {
    alert("Registration successfully finalized!");
  } else {
    alert("You must agree to terms to continue.");
  }
}
\`\`\``
  },
  {
    id: 'task-16',
    section: 'task-design',
    number: 16,
    question: 'Using prompt take number from user, and based on that number print a triangle of *. Number given by the user denotes the number of rows in a triangle.',
    answer: `\`\`\`javascript
function printStarTriangle() {
  const input = prompt("Enter number of rows:");
  const rows = parseInt(input, 10);

  if (isNaN(rows) || rows <= 0) {
    console.error("Please enter a valid positive integer.");
    return;
  }

  let pattern = "";
  for (let i = 1; i <= rows; i++) {
    // Optional centering spaces: " ".repeat(rows - i) + "*".repeat(2 * i - 1)
    pattern += "* ".repeat(i).trim() + "\\n";
  }

  console.log(pattern);
}

// For rows = 4:
// *
// * *
// * * *
// * * * *
\`\`\``
  },
  {
    id: 'task-17',
    section: 'task-design',
    number: 17,
    question: 'Move a div from left of the screen to the right of the screen.',
    answer: `High performance 60 FPS animation using hardware-accelerated CSS Transforms:

\`\`\`html
<div class="track">
  <div class="runner-box" id="box"></div>
</div>

<style>
.runner-box {
  width: 60px;
  height: 60px;
  background: #3b82f6;
  border-radius: 8px;
  
  /* GPU acceleration */
  animation: slideAcross 3s cubic-bezier(0.4, 0, 0.2, 1) infinite alternate;
  will-change: transform;
}

@keyframes slideAcross {
  0% {
    transform: translateX(0);
  }
  100% {
    /* Slide across full viewport minus element width */
    transform: translateX(calc(100vw - 100%));
  }
}
</style>
\`\`\``
  },
  {
    id: 'task-18',
    section: 'task-design',
    number: 18,
    question: 'Show a tooltip, on hover of a button. Make sure to give the user the ability to change tooltip position (left, right, top, bottom).',
    answer: `Pure declarative CSS tooltip configurable via HTML \`data-position\` and \`data-tooltip\` attributes:

\`\`\`html
<button class="has-tooltip" data-tooltip="Submit payment securely" data-position="top">
  Pay Now
</button>

<style>
.has-tooltip {
  position: relative;
}

.has-tooltip::before {
  content: attr(data-tooltip);
  position: absolute;
  padding: 6px 10px;
  background: #1e293b;
  color: #fff;
  font-size: 12px;
  border-radius: 4px;
  white-space: nowrap;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.2s ease, transform 0.2s ease;
  z-index: 1000;
}

/* Position: Top */
.has-tooltip[data-position="top"]::before {
  bottom: 125%;
  left: 50%;
  transform: translateX(-50%) translateY(4px);
}
.has-tooltip[data-position="top"]:hover::before {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}

/* Position: Bottom */
.has-tooltip[data-position="bottom"]::before {
  top: 125%;
  left: 50%;
  transform: translateX(-50%) translateY(-4px);
}
.has-tooltip[data-position="bottom"]:hover::before {
  opacity: 1;
  transform: translateX(-50%) translateY(0);
}
</style>
\`\`\``
  },
  {
    id: 'task-19',
    section: 'task-design',
    number: 19,
    question: 'Create a feature using which I can show notifications on my website (Toast message). Auto dismissed after 3s, stacked.',
    answer: `Production Toast Notification manager:

\`\`\`javascript
class ToastManager {
  constructor() {
    this.container = document.createElement("div");
    this.container.className = "toast-container";
    document.body.appendChild(this.container);
  }

  show(message, type = "info", duration = 3000) {
    const toast = document.createElement("div");
    toast.className = \`toast-card toast-\${type}\`;
    toast.innerHTML = \`
      <span class="toast-text">\${message}</span>
      <button class="toast-close" aria-label="Close">&times;</button>
    \`;

    this.container.appendChild(toast);

    // Fade-in animation
    requestAnimationFrame(() => toast.classList.add("visible"));

    const dismiss = () => {
      toast.classList.remove("visible");
      toast.addEventListener("transitionend", () => toast.remove());
    };

    const timer = setTimeout(dismiss, duration);

    toast.querySelector(".toast-close").addEventListener("click", () => {
      clearTimeout(timer);
      dismiss();
    });
  }
}

// Global instance
const toast = new ToastManager();
// toast.show("Changes saved successfully!", "success");
\`\`\``
  },
  {
    id: 'task-20',
    section: 'task-design',
    number: 20,
    question: 'Create tic-tac-toe game.',
    answer: `Full Vanilla JS Tic-Tac-Toe state machine:

\`\`\`javascript
class TicTacToe {
  constructor(boardEl, statusEl) {
    this.boardEl = boardEl;
    this.statusEl = statusEl;
    this.board = Array(9).fill(null);
    this.currentPlayer = "X";
    this.isGameOver = false;

    this.winningCombos = [
      [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
      [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
      [0, 4, 8], [2, 4, 6]             // Diagonals
    ];

    this.init();
  }

  init() {
    this.boardEl.innerHTML = "";
    this.board.forEach((_, idx) => {
      const cell = document.createElement("button");
      cell.className = "cell";
      cell.dataset.index = idx;
      cell.addEventListener("click", () => this.handleMove(idx));
      this.boardEl.appendChild(cell);
    });
    this.updateStatus(\`Player \${this.currentPlayer}'s turn\`);
  }

  handleMove(idx) {
    if (this.board[idx] || this.isGameOver) return;

    this.board[idx] = this.currentPlayer;
    this.boardEl.children[idx].textContent = this.currentPlayer;

    if (this.checkWin()) {
      this.isGameOver = true;
      this.updateStatus(\`🎉 Player \${this.currentPlayer} Wins!\`);
    } else if (this.board.every(cell => cell !== null)) {
      this.isGameOver = true;
      this.updateStatus("Game Tied!");
    } else {
      this.currentPlayer = this.currentPlayer === "X" ? "O" : "X";
      this.updateStatus(\`Player \${this.currentPlayer}'s turn\`);
    }
  }

  checkWin() {
    return this.winningCombos.some(([a, b, c]) => 
      this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c]
    );
  }

  updateStatus(msg) { this.statusEl.textContent = msg; }
}
\`\`\``
  },
  {
    id: 'task-21',
    section: 'task-design',
    number: 21,
    question: 'How can you lazy load an image?',
    answer: `### Approach 1: Native HTML5 (Preferred — Zero JS Overhead)
\`\`\`html
<!-- Native browser lazy loading with aspect ratio to prevent CLS -->
<img 
  src="/images/product.webp" 
  alt="Wireless Noise-Canceling Headphones" 
  loading="lazy" 
  width="600" 
  height="400"
/>
\`\`\`

### Approach 2: JavaScript \`IntersectionObserver\` (For Backgrounds or Custom Handlers)
\`\`\`javascript
function initLazyImages() {
  const images = document.querySelectorAll("img[data-src]");

  const observer = new IntersectionObserver((entries, obs) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const img = entry.target;
        img.src = img.dataset.src; // Swap placeholder with real asset
        img.removeAttribute("data-src");
        obs.unobserve(img); // Cease observing once loaded
      }
    });
  }, { rootMargin: "200px" }); // Preload 200px before appearing in viewport

  images.forEach(img => observer.observe(img));
}
\`\`\``
  }
];
