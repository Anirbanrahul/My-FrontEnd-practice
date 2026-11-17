// Frontend Interview Bible - Complete Master Q&A Dataset (CSS Section)

export const CSS_QUESTIONS = [
  {
    id: 'css-1',
    section: 'css',
    number: 1,
    question: 'What is CSS?',
    answer: `**CSS (Cascading Style Sheets)** is a declarative stylesheet language used to specify the presentation, layout, visual design, and responsive formatting of documents written in HTML or XML.

### Core Architecture & Mechanics:
1. **The Cascade**:
   - Resolves conflicts when multiple CSS rules target the same element based on a strict 3-tier hierarchy: **Importance** (\`!important\`), **Specificity** (selector weight), and **Source Order** (last declared wins).
2. **The Style Engine & CSSOM**:
   - The browser parses raw CSS tokens into the **CSS Object Model (CSSOM)** tree.
   - The CSSOM is combined with the DOM tree to construct the **Render Tree**, which calculates visual geometry (Layout/Reflow) before drawing pixels to screen layers (Paint & Composite).

\`\`\`css
/* Modern CSS with custom properties (CSS variables) */
:root {
  --primary-color: #3b82f6;
  --surface-bg: #f8fafc;
  --spacing-base: 1rem;
}

.card {
  background-color: var(--surface-bg);
  border: 1px solid #e2e8f0;
  border-radius: 8px;
  padding: calc(var(--spacing-base) * 1.5);
  box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1);
  transition: transform 0.2s cubic-bezier(0.4, 0, 0.2, 1);
}

.card:hover {
  transform: translateY(-2px);
}
\`\`\`

👉 Interview Tip: Always mention that CSS is *render-blocking*. Until external stylesheets in the \`<head>\` are fully fetched and the CSSOM is constructed, the browser halts rendering to prevent Flash of Unstyled Content (FOUC).`
  },
  {
    id: 'css-2',
    section: 'css',
    number: 2,
    question: 'What is inheritance in CSS?',
    answer: `**CSS Inheritance** is the mechanism by which computed values of certain CSS properties applied to an ancestor element automatically cascade down to its descendant elements without explicit styling.

### Property Classification:
- **Naturally Inherited Properties** (Primarily Typography & Visibility):
  - \`color\`, \`font-family\`, \`font-size\`, \`font-weight\`, \`line-height\`, \`letter-spacing\`, \`text-align\`, \`visibility\`, \`cursor\`.
- **Non-Inherited Properties** (Box Model & Geometry):
  - \`margin\`, \`padding\`, \`border\`, \`width\`, \`height\`, \`background\`, \`position\`, \`display\`, \`z-index\`, \`transform\`.

### Explicit Inheritance Keywords:
- **\`inherit\`**: Forces the property to take the computed value from its direct parent.
- **\`initial\`**: Resets the property to its initial browser default defined in the CSS specification.
- **\`unset\`**: Resets to \`inherit\` if naturally inherited, otherwise resets to \`initial\`.
- **\`revert\`**: Reverts to the user-agent stylesheet style.

\`\`\`css
/* Example: Forcing inheritance on non-inherited properties */
.parent-card {
  border: 2px solid #3b82f6;
  background-color: #eff6ff;
  color: #1e3a8a; /* Inherited naturally by p and span */
}

.child-box {
  /* Force non-inherited properties to inherit from .parent-card */
  border: inherit; 
  background-color: inherit;
  
  /* Reset an inherited property back to browser specification default */
  color: initial;
}
\`\`\`

📌 Note: Form elements (\`<input>\`, \`<button>\`, \`<textarea>\`, \`<select>\`) do **not** inherit parent \`font-family\` or \`font-size\` by default due to browser User-Agent styles. You must explicitly configure \`font-family: inherit;\` on buttons and form inputs.`
  },
  {
    id: 'css-3',
    section: 'css',
    number: 3,
    question: 'Explain specificity rules in CSS?',
    answer: `**Specificity** is the algorithm browser layout engines use to determine which CSS declaration takes precedence when multiple conflicting selectors target the same DOM element.

### The 4-Tier Specificity Weight Matrix:
Specificity is calculated as a 4-component tuple **(a, b, c, d)**:

| Category | Selector Type | Weight Tuple | Examples |
| :--- | :--- | :--- | :--- |
| **a: Inline Styles** | Applied via \`style=""\` attribute | \`(1, 0, 0, 0)\` | \`<p style="color: red;">\` |
| **b: ID Selectors** | Unique ID references | \`(0, 1, 0, 0)\` | \`#navHeader\`, \`#mainModal\` |
| **c: Classes, Attributes & Pseudo-classes** | Grouping & state selectors | \`(0, 0, 1, 0)\` | \`.btn\`, \`[type="text"]\`, \`:hover\`, \`:focus\`, \`:nth-child()\` |
| **d: Elements & Pseudo-elements** | Type tags & sub-parts | \`(0, 0, 0, 1)\` | \`div\`, \`p\`, \`h1\`, \`::before\`, \`::after\`, \`::placeholder\` |

### What Has ZERO Specificity?
- The Universal Selector (\`*\`), Combinators (\`+\`, \`>\`, \`~\`, space), and the \`:where()\` functional pseudo-class carry weight \`(0, 0, 0, 0)\`.

### Calculation Examples:
\`\`\`css
/* 1. Universal Selector: (0, 0, 0, 0) */
* { margin: 0; }

/* 2. Single Tag: (0, 0, 0, 1) */
p { color: black; }

/* 3. Class + Tag: (0, 0, 1, 1) */
p.intro { color: green; }

/* 4. Attribute + Class + 2 Tags: (0, 0, 2, 2) */
nav.primary ul li a[href] { color: blue; }

/* 5. ID Selector: (0, 1, 0, 0) -> Beats 100 stacked classes! */
#heroText { color: orange; }

/* 6. Inline Style: (1, 0, 0, 0) -> Beats #heroText */
/* <p id="heroText" style="color: purple;"> -> PURPLE wins */
\`\`\`

👉 Interview Tip: Specificity values are compared column-by-column from left to right (\`a\` first, then \`b\`, then \`c\`, then \`d\`). An ID selector (\`0,1,0,0\`) will **always** defeat a selector with 50 classes (\`0,0,50,0\`) because column \`b\` takes absolute precedence over column \`c\`.`
  },
  {
    id: 'css-4',
    section: 'css',
    number: 4,
    question: 'Explain 4 ways to import CSS in an HTML file.',
    answer: `There are 4 standardized methodologies for applying CSS styles to an HTML document, each with distinct loading, performance, and maintenance trade-offs.

### 1. External Stylesheet (\`<link rel="stylesheet">\`):
- Placed inside document \`<head>\`.
- **Best Practice for Production**: Stylesheets are downloaded concurrently and cached across multiple pages by the browser HTTP cache.
\`\`\`html
<link rel="stylesheet" href="/css/main.css">
\`\`\`

### 2. Internal / Embedded Styles (\`<style>\` Tag):
- Placed directly inside the \`<head>\` or \`<body>\`.
- Useful for **Critical CSS** (inlining above-the-fold styles) to eliminate round-trip network latency on initial render.
\`\`\`html
<style>
  :root { --brand: #6366f1; }
  body { font-family: system-ui, sans-serif; }
</style>
\`\`\`

### 3. Inline Styles (\`style\` Attribute):
- Declared directly on individual DOM elements.
- Extremely high specificity \`(1, 0, 0, 0)\`, breaks separation of concerns, cannot be cached separately, and cannot use pseudo-classes (\`:hover\`) or media queries.
\`\`\`html
<div style="background-color: #fee2e2; color: #991b1b; padding: 12px;">Alert Box</div>
\`\`\`

### 4. CSS \`@import\` Rule:
- Placed at the very top of a \`<style>\` block or inside an external \`.css\` file.
- **Performance Warning**: \`@import\` triggers **sequential waterfall loading** because the browser must download and parse the parent CSS file before it even discovers the imported stylesheet.
\`\`\`css
/* Inside styles.css */
@import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;700&display=swap');
\`\`\`

📌 Note: In modern frontend architecture, prefer external \`<link rel="stylesheet">\` with bundlers (Vite/Webpack) that bundle, minify, and automatically extract critical CSS.`
  },
  {
    id: 'css-5',
    section: 'css',
    number: 5,
    question: 'Can I use <style> tag in body instead of Head?',
    answer: `**Technically Yes, but Strongly Discouraged in Production**: HTML5 formally permits the \`<style>\` tag inside the \`<body>\`, but doing so creates critical rendering bottlenecks and visual regressions.

### What Happens Under the Hood:
1. **Flash of Unstyled Content (FOUC)**:
   - When the HTML parser encounters elements before the \`<style>\` tag, it computes initial styles and paints unstyled content to the screen.
   - When the parser later encounters the \`<style>\` in the body, it invalidates previous style computations and forces an immediate **Reflow (Layout)** and **Repaint**, causing a jarring visual flicker.
2. **Parser Blocking & Pipeline Invalidation**:
   - Encountering late style blocks forces the browser layout engine to pause HTML streaming and re-evaluate the CSSOM.

\`\`\`html
<!-- Anti-pattern: Causes FOUC and double reflow -->
<body>
  <h1>Welcome to Dashboard</h1>
  <p>Some text already painted with default serif fonts...</p>

  <!-- Late style tag disrupts rendering pipeline -->
  <style>
    body { background-color: #0f172a; color: #f8fafc; font-family: sans-serif; }
  </style>
</body>
\`\`\`

👉 Interview Tip: The only modern exception is **scoped styling inside Web Components** using Shadow DOM (\`<template>\` and \`shadowRoot\`), where isolated \`<style>\` tags inside the body encapsulate component styles without bleeding into global scope.`
  },
  {
    id: 'css-6',
    section: 'css',
    number: 6,
    question: 'Explain !important. Can we use it !important in all CSS rules?',
    answer: `The \`!important\` directive is a flag appended to a CSS declaration (e.g., \`color: red !important;\`) that elevates that rule into the highest priority tier of the Cascade, overriding standard specificity calculations and inline styles.

### The Cascade Order with \`!important\`:
When \`!important\` is introduced, the priority hierarchy completely flips:
1. User-Agent \`!important\` declarations
2. User \`!important\` declarations
3. **Developer \`!important\` declarations** (Your code)
4. Inline styles (\`style=""\`)
5. High specificity developer selectors
6. Low specificity developer selectors

### Can You Use It in All Rules?
- **Syntactically**: Yes, the CSS parser will accept \`!important\` on any valid property.
- **Architecturally**: **No!** Using \`!important\` indiscriminately destroys the natural cascading behavior of CSS, leads to "specificity escalation wars" where other developers must use even more \`!important\` rules, and makes design system theming virtually impossible to maintain.

\`\`\`css
/* Bad Practice: Specificity war */
.btn {
  background: blue !important;
}
/* Now to override this for a danger button, you are FORCED into another !important */
.btn-danger {
  background: red !important;
}

/* Valid Best Practice: Utility override classes */
.hidden {
  display: none !important;
}
.sr-only {
  position: absolute !important;
  width: 1px !important;
  height: 1px !important;
  padding: 0 !important;
  margin: -1px !important;
  overflow: hidden !important;
  clip: rect(0, 0, 0, 0) !important;
}
\`\`\`

📌 Note: If two conflicting rules both have \`!important\`, normal specificity rules break the tie. If specificity is equal, source order (the later rule in the file) wins.`
  },
  {
    id: 'css-7',
    section: 'css',
    number: 7,
    question: 'How can you center a div in a webpage, horizontally and vertically. Give 3 Possible ways.',
    answer: `Centering an element both horizontally and vertically is one of the most common UI tasks. Here are the 3 modern production-standard techniques:

### Technique 1: CSS Grid (Most Concise - 2 Lines)
\`\`\`css
.parent-container {
  display: grid;
  place-items: center; /* Centers along both inline and block axes */
  min-height: 100vh;
}
\`\`\`

### Technique 2: Flexbox (Standard Industry Approach)
\`\`\`css
.parent-container {
  display: flex;
  justify-content: center; /* Horizontally along main axis */
  align-items: center;     /* Vertically along cross axis */
  min-height: 100vh;
}
\`\`\`

### Technique 3: Absolute Positioning + \`transform: translate()\` (Independent of Parent Display)
\`\`\`css
.parent-container {
  position: relative;
  min-height: 100vh;
}

.child-box {
  position: absolute;
  top: 50%;
  left: 50%;
  /* Shift element back by exactly half of its own width and height */
  transform: translate(-50%, -50%);
}
\`\`\`

### Comparison & When to Use:
| Technique | Best Used When | Browser Support |
| :--- | :--- | :--- |
| **Grid (\`place-items: center\`)** | Centering a single modal or card inside a container | All Modern Browsers |
| **Flexbox (\`justify\` + \`align\`)** | Centering items with spacing or dynamic child re-flow | Universal |
| **Absolute + Translate** | Element must float over existing content (e.g., custom tooltip or modal dialog) | Universal |

👉 Interview Tip: Mentioning \`place-items: center\` on CSS Grid immediately signals familiarity with modern, concise CSS3 specifications.`
  },
  {
    id: 'css-8',
    section: 'css',
    number: 8,
    question: 'Explain Positioning properties.',
    answer: `The CSS \`position\` property dictates the coordinate positioning algorithm used to compute the geometric placement of an element in the viewport or document.

### The 5 Positioning Schemes:
1. **\`static\` (Default)**:
   - Flows according to normal document layout.
   - Properties \`top\`, \`right\`, \`bottom\`, \`left\`, and \`z-index\` have **no effect**.

2. **\`relative\`**:
   - The element remains in the normal document flow (its original space is fully reserved).
   - Offsets (\`top\`, \`left\`, etc.) shift the visual box relative to its own natural position without displacing surrounding elements.
   - Creates a **Containing Block** for any \`position: absolute\` children.

3. **\`absolute\`**:
   - Completely removed from normal document flow (no space is reserved for it).
   - Positioned relative to its **nearest positioned ancestor** (any ancestor whose position is NOT \`static\`). If none exists, positioned relative to the Initial Containing Block (\`<html>\`).

4. **\`fixed\`**:
   - Removed from normal document flow.
   - Positioned strictly relative to the **browser viewport window**.
   - Stays locked in place on screen during page scrolling.

5. **\`sticky\`**:
   - Hybrid positioning: behaves as \`relative\` within its parent container until the scroll threshold reaches the specified offset (e.g., \`top: 0\`), at which point it "sticks" as \`fixed\` until the parent container ends.

\`\`\`css
/* Production Example: Modal with backdrop & sticky header */
.sticky-nav {
  position: sticky;
  top: 0;
  z-index: 100;
  background: white;
}

.modal-backdrop {
  position: fixed;
  inset: 0; /* Shorthand for top: 0; right: 0; bottom: 0; left: 0; */
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}
\`\`\`

📌 Note: \`position: fixed\` elements can behave as \`absolute\` if any ancestor has a CSS property that creates a new containing block (such as \`transform\`, \`perspective\`, or \`filter\` set to a non-none value).`
  },
  {
    id: 'css-9',
    section: 'css',
    number: 9,
    question: 'What is the difference between sticky and fixed?',
    answer: `While both \`position: sticky\` and \`position: fixed\` keep elements visible during scrolling, they operate under fundamentally different positioning mechanics and container constraints.

### Core Architectural Differences:
| Architectural Criterion | \`position: fixed\` | \`position: sticky\` |
| :--- | :--- | :--- |
| **Reference Anchor** | Always relative to the **viewport window** | Relative to the **scrolling container / parent element** |
| **Document Flow** | **Removed** from document flow (surrounding elements collapse into its space) | **Retained** in document flow (its space is preserved until scroll threshold is reached) |
| **Boundary Limit** | Never stopped; remains on screen indefinitely throughout document scroll | **Constrained** by its parent element boundaries; ceases sticking when parent leaves viewport |
| **Threshold Requirement** | Positions immediately using \`top/bottom/left/right\` coordinates | Requires at least one directional offset (e.g., \`top: 0\`) to activate sticking |

\`\`\`html
<!-- Sticky Header confined to Section boundary -->
<section style="height: 1000px; position: relative;">
  <header style="position: sticky; top: 0; background: #38bdf8;">
    Sticky Section Header (Only sticks while this section is on screen)
  </header>
  <div>Section content...</div>
</section>

<!-- Fixed Header always floating over entire screen -->
<header style="position: fixed; top: 0; left: 0; width: 100%; z-index: 999; background: #0f172a;">
  Fixed Global Navbar (Always stays on screen)
</header>
\`\`\`

👉 Interview Tip: A common bug with \`position: sticky\` occurs when any ancestor element has \`overflow: hidden\`, \`overflow: auto\`, or \`overflow: scroll\`. This traps the scroll context and prevents the sticky element from sticking to the viewport.`
  },
  {
    id: 'css-10',
    section: 'css',
    number: 10,
    question: 'What is difference between opacity:0, visibility:hidden and display:none?',
    answer: `These three properties hide elements visually, but each interacts differently with the browser's **DOM Tree**, **Layout/Reflow calculations**, **Accessibility (a11y) Tree**, and **Event Dispatching**.

### Comprehensive Comparison Matrix:
| Criterion | \`display: none\` | \`visibility: hidden\` | \`opacity: 0\` |
| :--- | :--- | :--- | :--- |
| **Visible on screen?** | ❌ No | ❌ No | ❌ No (Fully transparent) |
| **Takes up space in Layout?** | ❌ **No** (Removed from Render Tree) | ✅ **Yes** (Layout box remains intact) | ✅ **Yes** (Layout box remains intact) |
| **Triggers Reflow on toggle?** | ✅ **Yes** (Forces expensive Reflow + Repaint) | ❌ **No** (Triggers Repaint only) | ❌ **No** (Can animate via GPU Composite) |
| **Receives Mouse / Click Events?** | ❌ No | ❌ No | ✅ **Yes** (Users can click invisible buttons!) |
| **Read by Screen Readers?** | ❌ No | ❌ No | ✅ **Yes** (Screen readers will still read it) |
| **Animatable with CSS transitions?** | ❌ No (Binary toggle) | ❌ Limited (Visibility toggle) | ✅ **Yes** (Smooth fade in/out \`0\` to \`1\`) |

\`\`\`css
/* Smooth Fade Transition Pattern */
.modal-overlay {
  opacity: 0;
  visibility: hidden;
  transition: opacity 0.3s ease, visibility 0.3s ease;
}

.modal-overlay.active {
  opacity: 1;
  visibility: visible;
}
\`\`\`

📌 Note: When hiding an element with \`opacity: 0\`, always pair it with \`pointer-events: none\` to prevent users from accidentally clicking invisible links or interactive inputs.`
  },
  {
    id: 'css-11',
    section: 'css',
    number: 11,
    question: 'How can I only make horizontal scroll, and disable vertical scroll.',
    answer: `To enforce horizontal-only scrolling while strictly clipping vertical overflow, configure \`overflow-x\`, \`overflow-y\`, and container whitespace wrapping rules.

### Production Implementation:
\`\`\`css
.horizontal-scroll-container {
  display: flex;              /* Or white-space: nowrap with inline-block items */
  flex-wrap: nowrap;          /* Prevent items from wrapping to a new line */
  
  overflow-x: auto;           /* Enable horizontal scrolling when content overflows */
  overflow-y: hidden;         /* Suppress vertical scrollbar and clipping */
  
  -webkit-overflow-scrolling: touch; /* Momentum scrolling on iOS devices */
  overscroll-behavior-x: contain;    /* Prevent scroll chaining to parent body */
  
  gap: 16px;
  padding: 12px;
  width: 100%;
}

.scroll-card {
  flex: 0 0 280px;            /* Fix card width so items don't shrink */
  height: 180px;
  background: #f1f5f9;
  border-radius: 8px;
}
\`\`\`

### Step-by-Step Breakdown:
1. **\`flex-wrap: nowrap\`**: Forces all flex items to sit in a single horizontal row regardless of container width.
2. **\`overflow-x: auto\`**: Shows a horizontal scrollbar only when content overflows the container's physical width.
3. **\`overflow-y: hidden\`**: Cuts off any unexpected vertical overflow to ensure vertical scroll never triggers.
4. **\`overscroll-behavior-x: contain\`**: Prevents the browser from navigating back/forward on Mac swipe gestures or chaining scroll to the main window.`
  },
  {
    id: 'css-12',
    section: 'css',
    number: 12,
    question: 'Explain box model.',
    answer: `The **CSS Box Model** is the foundational layout paradigm in web design: every HTML element rendered by the browser is represented as a rectangular box comprised of 4 nested layers.

### The 4 Box Model Layers (Inside-Out):
1. **Content**:
   - The central area where text, images, or child DOM elements are rendered.
   - Sized via \`width\` and \`height\`.
2. **Padding**:
   - The transparent buffer area clearing space around the content, inside the border.
   - Sized via \`padding\`.
3. **Border**:
   - The outer edge encasing the padding and content.
   - Sized via \`border\`.
4. **Margin**:
   - The transparent area outside the border separating this element from neighboring elements.
   - Sized via \`margin\`.

### \`box-sizing: content-box\` vs \`border-box\`:
- **\`content-box\` (Browser Default)**:
  - Width and height apply **only** to the content area.
  $$\\text{Rendered Width} = \\text{width} + \\text{padding-left} + \\text{padding-right} + \\text{border-left} + \\text{border-right}$$
  - A box with \`width: 200px; padding: 20px; border: 5px solid;\` renders at **250px total width**!
- **\`border-box\` (Modern Standard)**:
  - Width and height encompass content, padding, and border.
  $$\\text{Total Rendered Width} = \\text{specified width (200px)}$$

\`\`\`css
/* Industry standard CSS Box Model reset */
*, *::before, *::after {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
\`\`\`

👉 Interview Tip: Always recommend applying \`box-sizing: border-box\` globally across all elements. It guarantees that adding padding or borders never blows out your grid columns or causes unexpected layout overflows.`
  },
  {
    id: 'css-13',
    section: 'css',
    number: 13,
    question: 'What does calc() function do?',
    answer: `The \`calc()\` function is a native CSS mathematical function that enables dynamic calculations to determine CSS property values, allowing mixing of disparate measurement units (such as percentages, rems, and pixels).

### Key Features:
- Supports mathematical operators: addition (\`+\`), subtraction (\`-\`), multiplication (\`*\`), and division (\`/\`).
- Evaluated dynamically in real-time by the browser layout engine.

### Strict Syntax Rules:
- The \`+\` and \`-\` operators **MUST** be surrounded by whitespace (e.g., \`calc(100% - 20px)\` is valid; \`calc(100%-20px)\` is an invalid syntax error).

\`\`\`css
/* 1. Fluid Layout with fixed sidebar */
.main-content {
  width: calc(100% - 280px);
  margin-left: 280px;
}

/* 2. Full viewport height minus header height */
.hero-section {
  min-height: calc(100vh - 64px);
}

/* 3. Combining CSS custom variables with calc */
:root {
  --base-padding: 8px;
  --scale-factor: 3;
}

.modal-dialog {
  padding: calc(var(--base-padding) * var(--scale-factor)); /* 24px */
}
\`\`\`

📌 Note: Modern CSS also introduces \`min()\`, \`max()\`, and \`clamp()\`, which can be nested directly inside or alongside \`calc()\` for responsive fluid typography and adaptive spacing.`
  },
  {
    id: 'css-14',
    section: 'css',
    number: 14,
    question: 'Explain rem vs em.',
    answer: `Both \`rem\` and \`em\` are relative typography and spacing units in CSS, but they calculate their pixel values relative to completely different reference points in the DOM tree.

### 1. \`rem\` (Root EM):
- **Reference Point**: Strictly relative to the font-size of the **root element** (\`<html>\`).
- **Predictability**: Consistent throughout the entire application. Whether an element is nested 1 level deep or 10 levels deep, \`1rem\` resolves to the exact same pixel value.
- If root font size is \`16px\`, \`2rem\` = \`32px\` everywhere.

### 2. \`em\` (Element EM):
- **Reference Point**:
  - For \`font-size\`: Relative to the font-size of its **immediate parent element**.
  - For \`padding\`/\`margin\`/\`width\`: Relative to the font-size of the **element itself**.
- **The Compounding Problem**: Nested elements using \`em\` multiply hierarchically, leading to compounding size bugs.

\`\`\`html
<div class="grandparent" style="font-size: 20px;">
  <div class="parent" style="font-size: 1.5em;"> <!-- 30px -->
    <div class="child" style="font-size: 1.5em;">  <!-- 45px (Compounded!) -->
      Compounded font size!
    </div>
  </div>
</div>
\`\`\`

### Rule of Thumb:
- Use **\`rem\`** for layout spacing, margins, padding, and typography scales to maintain app-wide consistency and respect user accessibility settings.
- Use **\`em\`** for elements that should scale proportionally with their own text size (e.g., button icons, badges, or rounded pills).`
  },
  {
    id: 'css-15',
    section: 'css',
    number: 15,
    question: 'What is the default value of rem.',
    answer: `In all major modern web browsers (Chrome, Safari, Firefox, Edge), the default root font size is **\`16px\`**.

### Standard Calculations:
$$\\text{Computed Pixels} = \\text{rem value} \\times 16\\text{px}$$

| REM Value | Computed Pixels (at Default 16px) |
| :--- | :--- |
| **0.25rem** | 4px |
| **0.5rem** | 8px |
| **0.75rem** | 12px |
| **1rem** | **16px** (Root Default) |
| **1.25rem** | 20px |
| **1.5rem** | 24px |
| **2rem** | 32px |

👉 Interview Tip: Never assume the user's root font size is always 16px. Visually impaired users often configure their operating system or browser font size setting to 20px or 24px. Hardcoding font sizes in \`px\` overrides user accessibility preferences, while using \`rem\` scales naturally with their preference.`
  },
  {
    id: 'css-16',
    section: 'css',
    number: 16,
    question: 'Explain how I can change 1rem = 20px.',
    answer: `To make \`1rem = 20px\`, you adjust the computed \`font-size\` on the root \`<html>\` element.

### Method 1: The Percentage Approach (Accessible & Recommended):
Since the browser default font-size is 16px:
$$\\frac{20\\text{px}}{16\\text{px}} = 125\\%$$

\`\`\`css
/* Set root font-size as a percentage of default */
html {
  font-size: 125%; /* 125% of 16px = 20px */
}
\`\`\`
- **Advantage**: If a user changes their base browser preference from 16px to 20px, your application scales proportionally to 25px, preserving accessibility compliance.

### Method 2: Fixed Pixel Assignment (Discouraged):
\`\`\`css
html {
  font-size: 20px; /* Overrides browser user settings */
}
\`\`\`

📌 Note: A famous historical developer trick is the "62.5% trick" (\`font-size: 62.5%\`), which sets \`1rem = 10px\` ($62.5\\% \\times 16\\text{px} = 10\\text{px}$), allowing engineers to easily convert pixels to rems in their head (e.g. 1.4rem = 14px, 2.4rem = 24px).`
  },
  {
    id: 'css-17',
    section: 'css',
    number: 17,
    question: 'What are the benefits of using rem.',
    answer: `Using \`rem\` units provides three critical engineering benefits in modern responsive web architecture:

1. **Accessibility Compliance (WCAG 1.4.4 - Resize Text)**:
   - When users with low vision increase their default font size in browser settings, all typography and layouts sized in \`rem\` scale proportionally. Hardcoded \`px\` units ignore browser user settings.

2. **Global Responsive Scaling**:
   - Changing the \`font-size\` of the \`<html>\` element inside a media query automatically scales the entire UI proportionately across different devices:
\`\`\`css
html { font-size: 100%; } /* Desktop base (16px) */

@media (max-width: 768px) {
  html { font-size: 90%; } /* Entire UI scales down slightly for mobile */
}
\`\`\`

3. **Eliminates the Compounding Bugs of \`em\`**:
   - Nested components maintain consistent dimensions regardless of how deeply they are nested in the DOM hierarchy.`
  },
  {
    id: 'css-18',
    section: 'css',
    number: 18,
    question: 'Explain clamp function.',
    answer: `The CSS \`clamp()\` function clamps a value between an allowed minimum value, a preferred dynamic value, and an allowed maximum value.

### Formal Syntax:
\`\`\`css
property: clamp(MINIMUM, PREFERRED, MAXIMUM);
\`\`\`

### Mathematical Logic:
$$\\text{Value} = \\max(\\text{MIN}, \\min(\\text{PREFERRED}, \\text{MAX}))$$
- As long as the preferred dynamic value is between MIN and MAX, the preferred value is used.
- If the preferred value drops below MIN, MIN is used.
- If the preferred value exceeds MAX, MAX is used.

### Production Example: Fluid Typography without Media Queries:
\`\`\`css
h1 {
  /* Minimum: 2rem (32px), Preferred: 5vw (5% of screen width), Maximum: 4rem (64px) */
  font-size: clamp(2rem, 5vw + 1rem, 4rem);
}

.responsive-container {
  /* Fluid padding that never squishes below 16px and never exceeds 64px */
  padding: clamp(1rem, 3vw, 4rem);
}
\`\`\`

👉 Interview Tip: Fluid typography with \`clamp()\` replaces dozens of fragile \`@media\` breakpoint queries with a single, elegant mathematical equation.`
  },
  {
    id: 'css-19',
    section: 'css',
    number: 19,
    question: 'How can I show ... when some text is overflowing a container.',
    answer: `To truncate single-line overflowing text with an ellipsis (\`...\`), you must combine **three mandatory CSS properties** on the containing block with an explicit or bounded width.

### The 3 Mandatory Properties:
1. **\`white-space: nowrap\`**: Prevents text from breaking onto multiple lines.
2. **\`overflow: hidden\`**: Clips any content exceeding the container box.
3. **\`text-overflow: ellipsis\`**: Replaces the clipped characters with a typographic ellipsis (\`...\`).

\`\`\`css
.truncate-single-line {
  width: 250px;           /* Or max-width */
  white-space: nowrap;    /* Step 1: Keep on 1 line */
  overflow: hidden;       /* Step 2: Hide overflow */
  text-overflow: ellipsis;/* Step 3: Render ... */
}
\`\`\`

📌 Note: These properties only take effect on elements with \`display: block\` or \`display: inline-block\`. An inline \`<span>\` cannot truncate text until its display is set to \`inline-block\` or \`block\` with an assigned width.`
  },
  {
    id: 'css-20',
    section: 'css',
    number: 20,
    question: 'How can I restrict the number of lines using css.',
    answer: `To truncate text across multiple lines (e.g. limiting blog post previews or card descriptions to exactly 2 or 3 lines), use CSS **Line Clamping**.

### The Modern Standard Implementation:
\`\`\`css
.line-clamp-3 {
  display: -webkit-box;
  -webkit-box-orient: vertical;
  -webkit-line-clamp: 3; /* Truncate after 3 lines */
  overflow: hidden;
}
\`\`\`

### Explanation of Properties:
- **\`display: -webkit-box\`**: Switches to the legacy flexbox model required for multi-line clamping algorithms.
- **\`-webkit-box-orient: vertical\`**: Sets the orientation of the box axis vertically.
- **\`-webkit-line-clamp: 3\`**: Instructs the layout engine to clip and append an ellipsis at the end of the third line.
- **\`overflow: hidden\`**: Cuts off text beyond the third line.

👉 Interview Tip: Even though these properties carry the \`-webkit-\` prefix, they are standardized in modern CSS and universally supported across Chrome, Firefox, Safari, and Edge.`
  },
  {
    id: 'css-21',
    section: 'css',
    number: 21,
    question: 'How can I animate height width using css.',
    answer: `While you can animate \`height\` and \`width\` directly using CSS transitions, doing so triggers the browser's expensive **Layout (Reflow)** phase on every animation frame, degrading performance.

### 1. Direct Width/Height Transition (Triggers Reflow):
\`\`\`css
.box {
  width: 100px;
  height: 100px;
  background: #3b82f6;
  transition: width 0.3s cubic-bezier(0.4, 0, 0.2, 1),
              height 0.3s cubic-bezier(0.4, 0, 0.2, 1);
}

.box:hover {
  width: 200px;
  height: 200px;
}
\`\`\`

### 2. High-Performance Alternative: GPU Composited Transforms (60+ FPS):
Instead of animating geometry, animate \`transform: scale()\`:
\`\`\`css
.optimized-box {
  width: 100px;
  height: 100px;
  background: #10b981;
  transition: transform 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  will-change: transform; /* Promotes element to a dedicated GPU Compositing layer */
}

.optimized-box:hover {
  transform: scale(2); /* Smooth GPU hardware acceleration */
}
\`\`\`

### 3. Animating to \`height: auto\` (Modern CSS Grid Solution):
Historically, CSS could not transition from \`0\` to \`auto\`. Modern CSS solves this using CSS Grid with fractional tracks:
\`\`\`css
.accordion-content {
  display: grid;
  grid-template-rows: 0fr;
  transition: grid-template-rows 0.3s ease-out;
}

.accordion-content.open {
  grid-template-rows: 1fr;
}

.accordion-inner {
  overflow: hidden;
}
\`\`\``
  },
  {
    id: 'css-22',
    section: 'css',
    number: 22,
    question: 'Rotate a div by 45 deg.',
    answer: `A \`<div>\` is rotated in two-dimensional or three-dimensional space using the CSS \`transform: rotate()\` function.

\`\`\`css
.rotated-card {
  width: 120px;
  height: 120px;
  background: linear-gradient(135deg, #6366f1, #a855f7);
  
  /* Rotate clockwise by 45 degrees */
  transform: rotate(45deg);
  
  /* Specify the pivot point of the rotation (default is center center / 50% 50%) */
  transform-origin: center center;
  
  transition: transform 0.4s ease;
}

.rotated-card:hover {
  transform: rotate(90deg) scale(1.1);
}
\`\`\`

### Key Concepts:
- Positive angles (\`45deg\`) rotate clockwise; negative angles (\`-45deg\`) rotate counter-clockwise.
- **\`transform-origin\`**: Defines the pivot point about which the element rotates (e.g. \`top left\`, \`50% 50%\`, \`bottom right\`).
- Transforms do not trigger layout reflows—they are handled during the **Composite** phase on the GPU.`
  },
  {
    id: 'css-23',
    section: 'css',
    number: 23,
    question: 'Explain flex, and its properties.',
    answer: `**CSS Flexbox (Flexible Box Layout)** is a 1-dimensional layout model engineered to distribute space and align items along either a horizontal row (main axis) or a vertical column (cross axis).

### 1. Flex Container Properties (Parent):
- **\`display: flex\`**: Establishes a flex formatting context.
- **\`flex-direction\`**: Sets main axis (\`row\` [default], \`row-reverse\`, \`column\`, \`column-reverse\`).
- **\`justify-content\`**: Controls item distribution along the **main axis** (\`flex-start\`, \`center\`, \`flex-end\`, \`space-between\`, \`space-around\`, \`space-evenly\`).
- **\`align-items\`**: Controls alignment across the **cross axis** (\`stretch\` [default], \`center\`, \`flex-start\`, \`flex-end\`, \`baseline\`).
- **\`flex-wrap\`**: Enables multi-line flex wrapping (\`nowrap\` [default], \`wrap\`, \`wrap-reverse\`).
- **\`gap\`**: Defines gutters between flex items (\`gap: 16px\`).

### 2. Flex Item Properties (Children):
- **\`flex-grow\`**: Proportion of remaining free space the item should absorb (default \`0\`).
- **\`flex-shrink\`**: Ability of item to shrink when space is scarce (default \`1\`).
- **\`flex-basis\`**: Initial default size before remaining space is distributed (default \`auto\`).
- **\`align-self\`**: Overrides container's \`align-items\` for this individual item.

\`\`\`css
/* Shorthand: flex: [flex-grow] [flex-shrink] [flex-basis] */
.sidebar {
  flex: 0 0 260px; /* Don't grow, don't shrink, stay exactly 260px */
}

.main-feed {
  flex: 1 1 auto;  /* Grow to fill remaining space, shrink if necessary */
}
\`\`\`

👉 Interview Tip: Remember that \`flex: 1\` is shorthand for \`flex: 1 1 0%\`, whereas \`flex: auto\` is shorthand for \`flex: 1 1 auto\`.`
  },
  {
    id: 'css-24',
    section: 'css',
    number: 24,
    question: 'How can I change the cursor using CSS.',
    answer: `The \`cursor\` property specifies the mouse pointer icon displayed when hovering over an element.

\`\`\`css
/* Common Interactive Cursor Settings */
.btn-primary    { cursor: pointer; }     /* Hand icon signaling clickability */
.btn-disabled   { cursor: not-allowed; } /* Circle with slash */
.draggable-card { cursor: grab; }        /* Open hand for drag */
.dragging       { cursor: grabbing; }    /* Closed fist while dragging */
.resizable      { cursor: col-resize; }  /* Horizontal resize arrows */
.loading-box    { cursor: wait; }        /* Hourglass or spinning wheel */
.text-selectable{ cursor: text; }        /* I-beam cursor */

/* Custom Image Cursor with coordinates and fallback */
.custom-pointer {
  cursor: url('/assets/custom-cursor.png') 16 16, auto;
}
\`\`\`

📌 Note: In custom image cursors, you must always provide a trailing system fallback keyword (such as \`, auto\` or \`, pointer\`) or the entire rule will be ignored by the browser.`
  },
  {
    id: 'css-25',
    section: 'css',
    number: 25,
    question: 'How can I apply CSS to the first word of a paragraph using CSS.',
    answer: `CSS natively provides \`::first-letter\` and \`::first-line\` pseudo-elements, but **there is no native \`::first-word\` pseudo-element** in the CSS specification.

### Recommended Approaches:
1. **Semantic HTML Wrapper (Standard Solution)**:
\`\`\`html
<p><span class="first-word">Important</span> notice for all attendees...</p>

<style>
  .first-word {
    font-weight: 800;
    color: #ef4444;
    text-transform: uppercase;
  }
</style>
\`\`\`

2. **Automated JavaScript Tokenizer**:
\`\`\`javascript
document.querySelectorAll('.highlight-first-word').forEach(el => {
  const words = el.innerHTML.trim().split(' ');
  if (words.length > 0) {
    words[0] = \`<span class="first-word">\${words[0]}</span>\`;
    el.innerHTML = words.join(' ');
  }
});
\`\`\`

👉 Interview Tip: If asked about \`::first-letter\`, remember that it only styles the very first typographic character, and only applies to block containers.`
  },
  {
    id: 'css-26',
    section: 'css',
    number: 26,
    question: 'How can I check if user devices support hover or not, and based on that apply CSS.',
    answer: `CSS Interaction Media Features allow developers to query the hardware capabilities of the user's pointing device through **\`hover\`** and **\`pointer\`** media queries.

### Implementation:
\`\`\`css
/* 1. Device with primary pointing mechanism that can hover (Desktop mouse/trackpad) */
@media (hover: hover) and (pointer: fine) {
  .interactive-card:hover {
    transform: translateY(-4px);
    box-shadow: 0 12px 24px rgba(0, 0, 0, 0.15);
  }
  
  .tooltip {
    display: none;
  }
  .trigger:hover + .tooltip {
    display: block;
  }
}

/* 2. Touchscreen devices without hover capability (Smartphones, Tablets) */
@media (hover: none) and (pointer: coarse) {
  /* Remove hover transitions that get "stuck" on mobile taps */
  .interactive-card:hover {
    transform: none;
  }

  /* Make tooltips or actions visible by default on mobile touch */
  .tooltip {
    display: block;
    position: static;
  }
}
\`\`\`

👉 Interview Tip: Using \`@media (hover: hover)\` is vastly superior to checking screen width with \`@media (max-width: 768px)\`, because modern tablets have large screens (1024px+) but lack hover, while some small netbooks have mice.`
  },
  {
    id: 'css-27',
    section: 'css',
    number: 27,
    question: 'Explain sibling selectors.',
    answer: `CSS sibling selectors target elements that share the same direct parent in the DOM tree.

### 1. Adjacent Sibling Combinator (\`+\`):
- Targets an element that **immediately follows** a specified element.
- Must be the exact next adjacent sibling.
\`\`\`css
/* Targets only the first paragraph directly following an <h1> */
h1 + p {
  font-size: 1.25rem;
  font-weight: 600;
  color: #1e293b;
}
\`\`\`

### 2. General Sibling Combinator (\`~\`):
- Targets **all siblings** that follow the specified element anywhere within the same parent container.
\`\`\`css
/* Targets all <p> elements that appear after an <h1>, even if other elements intervene */
h1 ~ p {
  line-height: 1.7;
}
\`\`\`

\`\`\`html
<h1>Title</h1>
<p>Paragraph 1 (Matched by both h1 + p and h1 ~ p)</p>
<div>Divider</div>
<p>Paragraph 2 (Matched ONLY by h1 ~ p, NOT by h1 + p)</p>
\`\`\``
  },
  {
    id: 'css-28',
    section: 'css',
    number: 28,
    question: 'Explain clearfix property.',
    answer: `**Clearfix** is a historic CSS layout pattern used to prevent a parent container from collapsing its height to \`0px\` when all its child elements are floated (\`float: left\` or \`float: right\`).

### The Problem: Float Height Collapse:
When child elements are floated, they are removed from the normal document flow. The parent container fails to calculate their height and collapses.

### The Micro-Clearfix Solution:
\`\`\`css
/* Nicholas Gallagher Micro Clearfix */
.clearfix::after {
  content: "";
  display: table;
  clear: both;
}
\`\`\`

### How it Works:
- \`content: ""\`: Generates an invisible pseudo-element at the bottom of the container.
- \`display: table\`: Creates an anonymous table cell that prevents margin collapse.
- \`clear: both\`: Forces the generated pseudo-element below all left- and right-floated children, compelling the parent container to enclose the full height.

👉 Interview Tip: Mention that in modern frontend development, \`float\` is reserved purely for wrapping text around images. Modern layouts use Flexbox or Grid, or the modern \`display: flow-root\` property which creates a new Block Formatting Context (BFC) without hacky pseudo-elements!`
  },
  {
    id: 'css-29',
    section: 'css',
    number: 29,
    question: 'Explain how z-index works in CSS.',
    answer: `The \`z-index\` property controls the visual stacking order of elements along the virtual Z-axis (depth perpendicular to the screen).

### The 2 Golden Rules of \`z-index\`:
1. **Requires a Positioned Element or Flex/Grid Child**:
   - \`z-index\` is completely **ignored** on static elements (\`position: static\`). It only works on elements with \`position: relative\`, \`absolute\`, \`fixed\`, \`sticky\`, or direct children of \`display: flex\` or \`display: grid\`.
2. **Constrained by Stacking Contexts**:
   - An element with \`z-index: 999999\` will still render **behind** an element with \`z-index: 1\` if its parent establishes a lower stacking context!

### Triggers that Create a New Stacking Context:
- Setting \`position\` other than static with a \`z-index\` other than \`auto\`.
- \`opacity\` less than 1.
- \`transform\`, \`filter\`, \`perspective\`, or \`clip-path\` not \`none\`.
- \`isolation: isolate\` (Explicit modern best practice).

\`\`\`css
/* Production Example: Isolating stacking context */
.modal-wrapper {
  isolation: isolate; /* Cleanly encapsulates modal z-index from page content */
  position: fixed;
  inset: 0;
  z-index: 50;
}
\`\`\``
  },
  {
    id: 'css-30',
    section: 'css',
    number: 30,
    question: 'What is the maximum number the z-index supports?',
    answer: `In all modern browser layout engines (Blink in Chromium, WebKit in Safari, and Gecko in Firefox), the \`z-index\` property is stored as an internal **32-bit signed integer**.

### The Boundary Values:
- **Maximum \`z-index\`**: **\`2,147,483,647\`** ($2^{31} - 1$)
- **Minimum \`z-index\`**: **\`-2,147,483,648\`** ($-2^{31}$)

\`\`\`css
/* Highest allowable z-index */
.highest-possible-layer {
  z-index: 2147483647;
}
\`\`\`

📌 Note: Passing values greater than \`2147483647\` causes integer overflow: older browser versions clamped it or wrapped around to negative values. In real production design systems, avoid arbitrary large numbers. Standardize on an intentional z-index scale:
- Base: \`0\`
- Dropdown: \`10\`
- Sticky header: \`20\`
- Modal backdrop: \`40\`
- Modal Dialog: \`50\`
- Toast notification: \`60\``
  },
  {
    id: 'css-31',
    section: 'css',
    number: 31,
    question: 'Explain background property.',
    answer: `The \`background\` shorthand property allows setting multiple background styling properties in a single consolidated declaration.

### Formal Syntax:
\`\`\`css
background: [bg-color] [bg-image] [bg-repeat] [bg-position] / [bg-size] [bg-attachment] [bg-origin] [bg-clip];
\`\`\`

### Example & Sub-Properties Breakdown:
\`\`\`css
.hero-banner {
  background: #0f172a url('/images/stars.webp') no-repeat center center / cover fixed;
}
\`\`\`

1. **\`background-color\`**: Fallback solid color (\`#0f172a\`).
2. **\`background-image\`**: Image URL or gradient (\`linear-gradient(45deg, #3b82f6, #ec4899)\`).
3. **\`background-repeat\`**: Repetition pattern (\`no-repeat\`, \`repeat-x\`, \`repeat-y\`, \`space\`).
4. **\`background-position\`**: Spatial alignment (\`top right\`, \`center center\`, \`50% 50%\`).
5. **\`background-size\`**: Sizing algorithm (\`cover\` scales to cover entire box; \`contain\` scales to fit without cropping).
6. **\`background-attachment\`**: Scroll behavior (\`scroll\` moves with content; \`fixed\` stays stationary relative to viewport).`
  },
  {
    id: 'css-32',
    section: 'css',
    number: 32,
    question: 'What are different measurement units in CSS. Give at least 6 units.',
    answer: `CSS measurement units are broadly classified into **Absolute Units** (fixed physical lengths) and **Relative Units** (proportional to another reference dimension).

### 6 Essential Units in Modern Development:
1. **\`px\` (Pixels - Absolute)**:
   - 1 CSS pixel = 1/96th of an inch. Predictable, but does not scale with root user preferences.
2. **\`rem\` (Root EM - Relative)**:
   - Relative to the font size of the root \`<html>\` element (Default: 1rem = 16px).
3. **\`em\` (Element EM - Relative)**:
   - Relative to the font size of the parent element (for font-size) or the element itself (for margins/padding).
4. **\`vw\` & \`vh\` (Viewport Units - Relative)**:
   - \`1vw\` = 1% of viewport width; \`1vh\` = 1% of viewport height.
5. **\`%\` (Percentage - Relative)**:
   - Relative to the corresponding dimension of the parent containing block.
6. **\`dvh\` / \`svh\` / \`lvh\` (Dynamic Viewport Height - Modern CSS3)**:
   - Solves the mobile browser address bar jump issue:
     - \`svh\` (Small Viewport): Height when address bar is expanded.
     - \`lvh\` (Large Viewport): Height when address bar is retracted.
     - \`dvh\` (Dynamic Viewport): Automatically adapts as address bar retracts/expands during scroll!`
  },
  {
    id: 'css-33',
    section: 'css',
    number: 33,
    question: 'Explain what does :has do in CSS.',
    answer: `The \`:has()\` functional pseudo-class is the long-awaited **"Parent Selector"** in CSS. It allows an element to style itself conditionally based on whether it contains descendants matching a specified selector.

### Syntax & Practical Use-Cases:
\`\`\`css
/* 1. Style a card parent differently IF it contains an image */
.card:has(img) {
  padding-top: 0;
  border-top: none;
}

/* 2. Style a form-group if its input is currently invalid */
.form-group:has(input:invalid:focus) {
  border-left: 4px solid #ef4444;
}

/* 3. Style an article heading if a sub-heading immediately follows */
article h2:has(+ h3) {
  margin-bottom: 4px;
}

/* 4. Disable body scrolling when modal is open */
body:has(.modal.is-open) {
  overflow: hidden;
}
\`\`\`

👉 Interview Tip: Before \`:has()\`, detecting children to conditionally style a parent required JavaScript class toggling (e.g., \`parent.classList.add('has-image')\`). CSS \`:has()\` eliminates this JavaScript dependency entirely with zero runtime overhead.`
  },
  {
    id: 'css-34',
    section: 'css',
    number: 34,
    question: 'What are vendor prefixes in CSS.',
    answer: `Vendor prefixes were strings prepended to CSS properties by browser rendering engines to implement experimental, non-standard, or drafting CSS specifications before final W3C stabilization.

### Major Vendor Prefixes:
- **\`-webkit-\`**: Chrome, Safari, Edge (Chromium), iOS WebKit.
- **\`-moz-\`**: Mozilla Firefox (Gecko).
- **\`-ms-\`**: Microsoft Internet Explorer / Old Edge.
- **\`-o-\`**: Old Opera (Presto).

\`\`\`css
/* Historical cross-browser declaration */
.box {
  -webkit-user-select: none; /* Safari, Chrome */
  -moz-user-select: none;    /* Firefox */
  -ms-user-select: none;     /* IE 10+ */
  user-select: none;         /* Official W3C Standard (Always placed last!) */
}
\`\`\`

📌 Note: Modern browsers no longer introduce new vendor prefixes; instead, experimental features are hidden behind user flags (e.g., \`chrome://flags\`). Modern toolchains use **Autoprefixer** via PostCSS to inject prefixes automatically based on your \`browserslist\` config.`
  },
  {
    id: 'css-35',
    section: 'css',
    number: 35,
    question: 'How can you hide a scrollbar in CSS.',
    answer: `Hiding the visual scrollbar while retaining functional touch and mouse wheel scrolling requires addressing WebKit (Chrome/Safari) and standardized Firefox properties.

\`\`\`css
/* Universal Cross-Browser Scrollbar Hiding */
.no-scrollbar {
  /* 1. Firefox */
  scrollbar-width: none;

  /* 2. Internet Explorer 10+ and legacy Edge */
  -ms-overflow-style: none;

  /* 3. Enable scrolling */
  overflow: auto;
}

/* 4. WebKit browsers (Chrome, Safari, Edge, Opera) */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
\`\`\`

👉 Interview Tip: When hiding scrollbars on desktop, ensure you provide visible UI indicators (like fade masks or arrow buttons) so keyboard-only and mouse users understand that additional horizontal content exists.`
  },
  {
    id: 'css-36',
    section: 'css',
    number: 36,
    question: 'What CSS properties you apply on a button which is disabled.',
    answer: `Styling a disabled button properly requires visual dimming, cursor feedback, and preventing click event interception.

\`\`\`css
button:disabled,
button[aria-disabled="true"] {
  /* 1. Visual indication of inactive state */
  opacity: 0.6;
  background-color: #cbd5e1;
  color: #64748b;
  border-color: #94a3b8;
  
  /* 2. Cursor feedback */
  cursor: not-allowed;
  
  /* 3. Suppress hover and active animations */
  transform: none;
  box-shadow: none;
  
  /* 4. Prevent pointer events */
  pointer-events: none;
}
\`\`\`

📌 Note: If you add \`pointer-events: none\`, the browser will also stop showing the \`cursor: not-allowed\` because mouse interaction is completely disabled! If you want the \`not-allowed\` cursor to be visible, wrap the button in an outer \`<span>\` with \`cursor: not-allowed\` or manage state via JavaScript without \`pointer-events: none\`.`
  },
  {
    id: 'css-37',
    section: 'css',
    number: 37,
    question: 'What are pseudo elements?',
    answer: `A **CSS Pseudo-element** (designated by the double-colon syntax \`::\`) creates an abstraction that allows developers to style a specific sub-part of an element's content or inject cosmetic content that does not exist in the DOM tree.

### Common Pseudo-Elements:
1. **\`::before\` & \`::after\`**:
   - Injects decorative inline content before or after the element's actual content. Requires the \`content\` property (e.g., \`content: "";\`).
2. **\`::first-letter\` & \`::first-line\`**:
   - Styles the opening typographic drop-cap letter or the entire first rendered line of text.
3. **\`::placeholder\`**:
   - Styles the gray hint text inside \`<input>\` or \`<textarea>\` elements.
4. **\`::selection\`**:
   - Styles the background and text color when a user highlights text with their cursor.
5. **\`::backdrop\`**:
   - Styles the background overlay behind native HTML5 \`<dialog>\` modals or fullscreen elements.

\`\`\`css
/* Custom Tooltip using ::after */
.tooltip-btn {
  position: relative;
}

.tooltip-btn::after {
  content: attr(data-tooltip); /* Reads dynamic attribute value */
  position: absolute;
  bottom: 120%;
  left: 50%;
  transform: translateX(-50%);
  background: #1e293b;
  color: #fff;
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  white-space: nowrap;
  pointer-events: none;
  opacity: 0;
  transition: opacity 0.2s;
}

.tooltip-btn:hover::after {
  opacity: 1;
}
\`\`\``
  },
  {
    id: 'css-38',
    section: 'css',
    number: 38,
    question: 'How can you give a border only to the left and right of a div.',
    answer: `To style borders selectively on specific sides, use individual directional border sub-properties or use modern logical properties.

\`\`\`css
/* Method 1: Directional Physical Border Properties */
.vertical-borders {
  border-left: 2px solid #3b82f6;
  border-right: 2px solid #3b82f6;
  border-top: none;
  border-bottom: none;
}

/* Method 2: Modern CSS Logical Properties (Supports RTL Languages) */
.inline-borders {
  border-inline: 2px solid #3b82f6; /* Applies to both inline-start and inline-end */
}
\`\`\`

👉 Interview Tip: Mentioning **CSS Logical Properties** (\`border-inline\`) demonstrates senior-level knowledge of internationalization (i18n), ensuring styles automatically adapt if the website switches to Right-to-Left (RTL) languages like Arabic or Hebrew.`
  },
  {
    id: 'css-39',
    section: 'css',
    number: 39,
    question: 'Difference between outline and border.',
    answer: `While both \`outline\` and \`border\` draw visible lines around HTML elements, their behavior in the browser's layout engine is completely distinct.

### Comparison Table:
| Criterion | \`border\` | \`outline\` |
| :--- | :--- | :--- |
| **Box Model Layout** | Part of the Box Model; **takes up physical space** and pushes adjacent elements away. | Drawn *outside* the box model; **takes zero space** and never causes layout reflow. |
| **Individual Side Control** | Can set custom styles per side (\`border-left\`, \`border-top\`). | Applied uniformly to **all 4 sides** (cannot do \`outline-left\`). |
| **Offset Distance** | Always hugs the padding directly. | Can be pushed away or inward via **\`outline-offset\`**. |
| **Follows \`border-radius\`?** | Fully curves with \`border-radius\`. | Historically rectangular, though modern browsers now follow curvature. |
| **Primary Use-Case** | UI component decoration and card containers. | **Accessibility Focus Rings** (\`:focus-visible\`). |

\`\`\`css
/* Accessible custom focus indicator using outline */
.btn:focus-visible {
  outline: 3px solid #3b82f6;
  outline-offset: 2px; /* Leaves a clean 2px gap between button and ring */
}
\`\`\`

📌 Note: Never remove focus outlines (\`outline: none\`) without providing a distinct replacement focus state, as doing so breaks keyboard navigation for accessibility (WCAG 2.4.7 Focus Visible).`
  },
  {
    id: 'css-40',
    section: 'css',
    number: 40,
    question: 'Explain margin padding collapsing feature.',
    answer: `**Margin Collapsing** is a layout behavior where adjacent vertical margins (\`margin-top\` and \`margin-bottom\`) of block-level elements merge into a single margin instead of summing together.

### The Collapsing Rules:
- The resulting collapsed margin is equal to the **largest individual margin**.
- If one margin is negative, the negative margin is subtracted from the largest positive margin.
- **Horizontal margins never collapse**. Padding and borders never collapse.

### 3 Common Collapsing Scenarios:
1. **Adjacent Siblings**:
   - If an \`<h1>\` has \`margin-bottom: 30px\` and the following \`<p>\` has \`margin-top: 20px\`, the space between them is **30px**, not 50px.
2. **Parent and First/Last Child**:
   - If a parent \`<div>\` has no border or padding, the child's \`margin-top\` "bleeds through" the parent and pushes the parent down from above!
3. **Empty Blocks**:
   - An empty element with \`margin-top: 20px\` and \`margin-bottom: 20px\` collapses to a single 20px margin.

\`\`\`css
/* How to PREVENT unwanted margin collapsing */
/* 1. Add border or padding to parent */
.parent {
  padding-top: 1px; 
}

/* 2. Modern: Establish a new Block Formatting Context (BFC) */
.parent {
  display: flow-root; /* Cleanest modern solution */
}

/* 3. Use Flexbox or Grid (Flex/Grid items NEVER collapse margins) */
.parent {
  display: flex;
  flex-direction: column;
}
\`\`\`

👉 Interview Tip: Mentioning \`display: flow-root\` to prevent parent-child margin collapse is the gold standard answer in frontend interviews.`
  }
];
