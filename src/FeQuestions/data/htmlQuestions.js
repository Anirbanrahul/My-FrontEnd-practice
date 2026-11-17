// Frontend Interview Bible - Complete Master Q&A Dataset (HTML Section)

export const FE_SECTIONS = [
  { id: 'html', title: '🌐 HTML Questions', count: 18 },
  { id: 'css', title: '🎨 CSS Questions', count: 40 },
  { id: 'js-conceptual', title: '⚡ JS Conceptual Questions', count: 51 },
  { id: 'dom-events', title: '👆 DOM Manipulation & Events', count: 10 },
  { id: 'task-design', title: '🏗️ Task-Based FE Design', count: 21 },
  { id: 'polyfills', title: '🛠️ Polyfills Questions', count: 12 },
  { id: 'machine-coding', title: '💻 Machine Coding Questions', count: 18 },
  { id: 'performance', title: '🚀 Performance & Bar Raiser', count: 27 }
];

export const HTML_QUESTIONS = [
  {
    id: 'html-1',
    section: 'html',
    number: 1,
    question: 'What does H, T, M, L stand for in HTML and explain each word in detail.',
    answer: `**HTML** stands for **HyperText Markup Language**. It is the standard declarative markup language used to structure web documents and define how content is presented in web browsers.

### Detailed Breakdown of Terms:
1. **HyperText**:
   - Refers to text that contains hyperlinks connecting users non-linearly to other documents, media, or web addresses across the World Wide Web.
   - Unlike linear text (like a printed book), HyperText allows instantaneous branching navigation via the \`<a>\` (anchor) tag and HTTP protocol.

2. **Markup**:
   - Refers to formatting syntax—tags and attributes (\`<header>\`, \`<p>\`, \`<section>\`, \`class\`, \`id\`)—applied to raw textual content to delineate semantic hierarchy and structure.
   - The browser's HTML parser interprets these markup tags to construct the **Document Object Model (DOM)** tree.

3. **Language**:
   - Denotes a formal system of syntactic rules, specifications, and standardized element sets governed by the **W3C** (World Wide Web Consortium) and **WHATWG** (Web Hypertext Application Technology Working Group).

\`\`\`html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>HyperText Navigation</title>
  </head>
  <body>
    <!-- Markup defines the structure; HyperText provides non-linear linking -->
    <h1>Welcome to the Modern Web</h1>
    <p>Visit the <a href="https://w3.org" target="_blank" rel="noopener noreferrer">W3C Specification</a> for standards.</p>
  </body>
</html>
\`\`\`

👉 Interview Tip: Always emphasize that HTML is a *declarative markup language*, not a programming language, because it does not provide computational logic, flow control (loops/conditionals), or state mutation by itself.`
  },
  {
    id: 'html-2',
    section: 'html',
    number: 2,
    question: 'Is HTML case sensitive or case in-sensitive?',
    answer: `HTML is **case-insensitive** for tag names and attribute names according to the HTML5 specification (WHATWG).

### How Browsers Handle Case:
- The browser's HTML tokenization stage automatically normalizes all HTML element tag names and standard attribute names to lowercase before appending them to the DOM.
- For example, \`<DIV CLASS="container">\`, \`<div>\`, and \`<Div>\` are all normalized into an \`HTMLDivElement\` node with lowercase tag name \`div\`.

| HTML Element/Property | Case Sensitivity | Example / Rule |
| :--- | :--- | :--- |
| **HTML Tag Names** | Case-Insensitive | \`<div>\` is identical to \`<DIV>\` or \`<Div>\` |
| **Standard Attribute Names** | Case-Insensitive | \`id="app"\` is identical to \`ID="app"\` |
| **Attribute Values (IDs & Classes)** | **Case-Sensitive** | \`.btnPrimary\` will NOT match \`class="btnprimary"\` |
| **URLs & File Paths** | **Case-Sensitive** | \`href="/About"\` differs from \`href="/about"\` on Linux servers |
| **JSX in React** | **Strictly Case-Sensitive** | Lowercase (\`<div>\`) denotes native DOM; Capitalized (\`<Header>\`) denotes custom React Component |

\`\`\`html
<!-- Valid HTML5, but violates industry style guides -->
<DIV CLASS="box" ID="myCard">
  <P>Hello World</P>
</DIV>

<style>
  /* CSS selectors matching attribute values ARE case-sensitive! */
  .box { color: blue; }         /* Matches */
  #mycard { color: red; }       /* FAILS to match #myCard */
</style>
\`\`\`

📌 Note: In XHTML and React (JSX), strict case-sensitivity is enforced. JSX uses the leading uppercase character heuristic to distinguish user-defined React components from native HTML DOM elements.`
  },
  {
    id: 'html-3',
    section: 'html',
    number: 3,
    question: 'Explain <head> tag.',
    answer: `The \`<head>\` element is a critical container for **document metadata**—machine-readable data about the HTML document that is parsed prior to rendering the \`<body>\`.

### Core Responsibilities of the \`<head>\`:
1. **Character Encoding & Viewport Configuration**: Essential for responsive rendering and multi-lingual glyph decoding.
2. **Resource Hints & Network Prioritization**: Instructs the browser to pre-fetch, pre-connect, or preload critical assets.
3. **SEO & Social Graph Metadata**: OpenGraph, Twitter Cards, and canonical URLs for search engines and crawlers.
4. **Style & Script Loading**: External CSS sheets, inline design tokens, and deferred/asynchronous scripts.

\`\`\`html
<head>
  <!-- 1. Technical Encoding (Must appear within first 1024 bytes) -->
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  
  <!-- 2. Document Title (Used in browser tabs, bookmarks, and search results) -->
  <title>Senior Frontend Engineer Guide | Tech Portal</title>
  
  <!-- 3. Performance Optimization & Resource Hints -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preload" href="/fonts/inter.woff2" as="font" type="font/woff2" crossorigin>

  <!-- 4. Stylesheets & Scripts -->
  <link rel="stylesheet" href="/styles/main.css">
  <script src="/scripts/analytics.js" defer></script>

  <!-- 5. SEO & Social Graph (OpenGraph) -->
  <meta name="description" content="Master front-end engineering interviews with comprehensive technical notes.">
  <meta property="og:title" content="Senior Frontend Engineer Guide">
  <meta property="og:type" content="website">
  <link rel="canonical" href="https://example.com/fe-guide">
</head>
\`\`\`

👉 Interview Tip: Placing \`<meta charset="UTF-8">\` as the very first element inside \`<head>\` prevents encoding-based cross-site scripting (UTF-7 XSS attacks) and avoids browser character re-sniffing reloads.`
  },
  {
    id: 'html-4',
    section: 'html',
    number: 4,
    question: 'How can I refresh my page every 60 seconds using HTML?',
    answer: `You can configure automatic page refreshing declaratively using the \`<meta http-equiv="refresh">\` pragma directive placed inside the document \`<head>\`.

### Syntax & Implementations:
1. **Periodic Refresh on the Current Page**:
\`\`\`html
<head>
  <!-- Refreshes the current URL every 60 seconds -->
  <meta http-equiv="refresh" content="60">
</head>
\`\`\`

2. **Delayed Redirection to a New Destination**:
\`\`\`html
<head>
  <!-- Waits 5 seconds, then redirects the client to the specified URL -->
  <meta http-equiv="refresh" content="5; url=https://example.com/dashboard">
</head>
\`\`\`

### Step-by-Step Browser Behavior:
- The browser's HTTP parser reads \`http-equiv="refresh"\` as if it were sent as a raw HTTP header (\`Refresh: 60\`).
- When the specified timer completes, the browser initiates a navigation request.

📌 Note: Modern Web Accessibility Guidelines (WCAG 2.2.1 Timing Adjustable) advise **against** unconditional auto-refreshing without user consent because it can disorient screen-reader users, disrupt input fields, and drain mobile battery. In modern Single Page Applications (SPAs), prefer polling via \`setInterval()\` with WebSocket/Server-Sent Events (SSE) updates instead of full-page reload.`
  },
  {
    id: 'html-5',
    section: 'html',
    number: 5,
    question: 'What are inline and block elements?',
    answer: `In HTML and CSS layout mechanics, elements traditionally fall into two primary display paradigms: **Block-level elements** and **Inline elements**.

### 1. Block-Level Elements:
- **Layout Behavior**: Always begin on a new line and expand horizontally to consume the full width available within their containing parent block (\`width: 100%\`).
- **Box Model Support**: Fully respect \`width\`, \`height\`, \`padding\`, \`margin\`, and \`border\` across all 4 axes (top, right, bottom, left).
- **Nesting**: Can contain inline elements and other block-level elements.
- *Examples*: \`<div>\`, \`<p>\`, \`<h1>\`-\`<h6>\`, \`<section>\`, \`<article>\`, \`<header>\`, \`<ul>\`, \`<li>\`.

### 2. Inline Elements:
- **Layout Behavior**: Flow seamlessly within textual content without breaking onto a new line, occupying only the intrinsic width necessary for their content.
- **Box Model Support**: Respect horizontal margins and padding (\`margin-left\`, \`margin-right\`), but **ignore** custom \`width\` and \`height\`. Vertical padding/margin will render visually but will **NOT** push adjacent vertical content away.
- **Nesting**: Should only contain text or other inline elements (cannot legally contain block elements in older specifications).
- *Examples*: \`<span>\`, \`<a>\`, \`<strong>\`, \`<em>\`, \`<code>\`, \`<label>\`.

### Comparison Table:
| Feature | Block Element | Inline Element | Inline-Block Element |
| :--- | :--- | :--- | :--- |
| **Starts on new line?** | Yes | No | No |
| **Default Width** | 100% of parent container | Intrinsic (content width) | Intrinsic (content width) |
| **Custom Width / Height?** | Fully respected | **Ignored** | Fully respected |
| **Vertical Margin & Padding** | Pushes adjacent content | Visual only (no flow push) | Pushes adjacent content |
| **CSS \`display\` value** | \`display: block\` | \`display: inline\` | \`display: inline-block\` |

\`\`\`html
<!-- Block vs Inline Demonstration -->
<div style="background: #e2e8f0; padding: 12px;">
  <!-- Block: takes full line -->
  <p style="background: #bfdbfe; margin-bottom: 8px;">Block paragraph (100% width)</p>
  
  <!-- Inline: flows together -->
  <span style="background: #fef08a; padding: 4px;">Inline Item 1</span>
  <span style="background: #bbf7d0; padding: 4px;">Inline Item 2</span>
</div>
\`\`\`

👉 Interview Tip: Mention that with modern CSS3 Flexbox and CSS Grid, traditional block vs inline distinctions are superseded by flex items and grid items whose sizing follows the parent container's layout algorithms.`
  },
  {
    id: 'html-6',
    section: 'html',
    number: 6,
    question: 'What is a table tag? And what is the importance of table tag.',
    answer: `The \`<table>\` element is a semantic container specifically engineered to represent **two-dimensional structured data** arranged in rows and columns.

### Semantic Architecture of a Modern HTML Table:
A standards-compliant table should include explicit header, body, footer, and caption structures to provide full accessibility for screen readers and assistive tech:

\`\`\`html
<table aria-describedby="quarterly-finance">
  <caption>Quarterly Frontend Engineering Metrics (2025)</caption>
  <thead>
    <tr>
      <th scope="col">Sprint</th>
      <th scope="col">Story Points Completed</th>
      <th scope="col">Defect Escape Rate</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">Sprint 42</th>
      <td>84</td>
      <td>1.2%</td>
    </tr>
    <tr>
      <th scope="row">Sprint 43</th>
      <td>92</td>
      <td>0.8%</td>
    </tr>
  </tbody>
  <tfoot>
    <tr>
      <th scope="row">Average</th>
      <td>88</td>
      <td>1.0%</td>
    </tr>
  </tfoot>
</table>
\`\`\`

### Importance & Key Benefits:
1. **Screen Reader Accessibility (a11y)**:
   - Assistive technologies navigate tables using keyboard shortcuts based on \`<th>\`, \`scope="col"\`, and \`scope="row"\`.
   - When a user navigates between data cells, screen readers announce both the column header and the row header, maintaining spatial context.
2. **Auto-Aligning Grid Calculations**:
   - The browser automatically aligns columns based on cell content width or explicitly defined percentages without requiring complex layout logic.

📌 Note: **Anti-Pattern Warning**: Tables must NEVER be used for general page layout or UI component alignment (e.g., aligning navigation bars, forms, or sidebars). Layout with tables severely harms mobile responsiveness, inflates DOM size, and disrupts accessibility tree parsing. Use CSS Flexbox or Grid instead.`
  },
  {
    id: 'html-7',
    section: 'html',
    number: 7,
    question: 'What are different ways to take input from users?',
    answer: `HTML provides multiple native interactive input mechanisms tailored for text, numeric, categorical, binary, and file-based data ingestion.

### Primary Input Mechanisms:
1. **The Versatile \`<input>\` Element**:
   - \`type="text"\` / \`type="password"\`: Single-line alphanumeric text and masked credentials.
   - \`type="email"\` / \`type="url"\` / \`type="tel"\`: Automatic client-side validation and mobile keypad optimization.
   - \`type="number"\` / \`type="range"\`: Numeric steppers and continuous sliders.
   - \`type="checkbox"\` / \`type="radio"\`: Multi-choice toggle vs mutually exclusive single choice within a shared \`name\` group.
   - \`type="date"\` / \`type="time"\` / \`type="datetime-local"\`: Native calendar and clock pickers.
   - \`type="file"\`: Local filesystem document and media uploaders.
   - \`type="color"\`: Native system color picker palette.

2. **The \`<textarea>\` Element**:
   - Designed for multi-line unstructured text inputs (comments, code snippets, descriptions) with resizable dimensions.

3. **Selection Elements (\`<select>\` & \`<option>\` / \`<optgroup>\`)**:
   - Standard single or multi-select dropdown menus.

4. **Autocomplete Search with \`<datalist>\`**:
   - Combines free-form text typing with a predefined list of suggestion options.

5. **Rich In-Place Editing via \`contenteditable\`**:
   - Turns any standard container element (\`<div>\`, \`<p>\`) into an editable WYSIWYG editor surface.

\`\`\`html
<form action="/api/profile" method="POST">
  <!-- Datalist Autocomplete -->
  <label for="framework">Preferred Framework:</label>
  <input list="framework-options" id="framework" name="framework">
  <datalist id="framework-options">
    <option value="React"></option>
    <option value="Vue"></option>
    <option value="Angular"></option>
    <option value="Svelte"></option>
  </datalist>

  <!-- Multi-line input -->
  <label for="bio">Bio:</label>
  <textarea id="bio" name="bio" rows="4" maxlength="500"></textarea>

  <!-- Dropdown select -->
  <label for="experience">Experience Level:</label>
  <select id="experience" name="experience">
    <option value="junior">Junior (0-2 yrs)</option>
    <option value="mid">Mid-Level (2-5 yrs)</option>
    <option value="senior" selected>Senior (5+ yrs)</option>
  </select>

  <!-- Submit button -->
  <button type="submit">Save Profile</button>
</form>
\`\`\`

👉 Interview Tip: Always pair interactive inputs with a corresponding \`<label for="id">\` or nest inputs inside the \`<label>\`. This enhances accessibility by creating a focusable target and giving screen readers an audible label.`
  },
  {
    id: 'html-8',
    section: 'html',
    number: 8,
    question: 'How can you make an upload file button?',
    answer: `An upload file button is created using the native \`<input type="file">\` element. It can be customized and augmented with file-filtering attributes, drag-and-drop triggers, and programmatic styling.

### Standard HTML Implementation:
\`\`\`html
<!-- Multiple file upload with file type filters -->
<label for="documentUpload" class="custom-file-button">
  Upload Documents
</label>
<input 
  type="file" 
  id="documentUpload" 
  name="userDocuments" 
  multiple 
  accept=".pdf, .docx, image/*"
  style="display: none;" 
/>
\`\`\`

### Attributes Breakdown:
- **\`multiple\`**: A boolean attribute that enables selecting multiple files concurrently in the OS file picker dialog.
- **\`accept\`**: Specifies the allowed MIME types or file extensions (e.g., \`image/*\`, \`.pdf\`).
- **\`capture\`**: (Mobile only) Directs mobile devices to open the camera (\`capture="environment"\`) or microphone (\`capture="user"\`) directly.

### Modern JavaScript File Handling (Reading Metadata & Blobs):
\`\`\`javascript
const fileInput = document.getElementById('documentUpload');

fileInput.addEventListener('change', (event) => {
  const files = Array.from(event.target.files);
  
  files.forEach(file => {
    console.log(\`File: \${file.name}, Size: \${(file.size / 1024).toFixed(2)} KB, Type: \${file.type}\`);
    
    // Preview image locally via FileReader without server upload
    if (file.type.startsWith('image/')) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const img = document.createElement('img');
        img.src = e.target.result;
        document.body.appendChild(img);
      };
      reader.readAsDataURL(file);
    }
  });
});
\`\`\`

📌 Note: Browsers enforce strict security sandboxing on \`<input type="file">\`. JavaScript cannot programmatically pre-populate the \`value\` property with an arbitrary filesystem path due to client data privacy restrictions.`
  },
  {
    id: 'html-9',
    section: 'html',
    number: 9,
    question: 'How can you restrict users to only select a .jpg file when a file upload picker is opened?',
    answer: `You can restrict the OS file picker dialog using the \`accept\` attribute on the \`<input type="file">\` element.

### Strict Syntax for JPEG Files:
\`\`\`html
<!-- Restrict strictly to JPEG / JPG formats -->
<input 
  type="file" 
  id="profilePic" 
  name="avatar" 
  accept=".jpg, .jpeg, image/jpeg" 
/>
\`\`\`

### Why Specify Both Extension and MIME Type?
- **\`.jpg, .jpeg\`**: Catches OS-level file extension filters in Windows Explorer and macOS Finder.
- **\`image/jpeg\`**: Represents the standardized IANA MIME type recognized by mobile operating systems (iOS/Android) and browser file engines.

### Essential Client-Side & Server-Side Verification:
\`\`\`javascript
const fileInput = document.querySelector('#profilePic');

fileInput.addEventListener('change', (e) => {
  const file = e.target.files[0];
  if (!file) return;

  // Client-side verification guard
  const validMime = 'image/jpeg';
  const validExtensions = ['jpg', 'jpeg'];
  const fileExtension = file.name.split('.').pop().toLowerCase();

  if (file.type !== validMime && !validExtensions.includes(fileExtension)) {
    alert('Invalid file! Please upload a valid JPG/JPEG image.');
    fileInput.value = ''; // Reset file input
  }
});
\`\`\`

👉 Interview Tip: The \`accept\` attribute is a *client-side user-experience hint*, not a security boundary. A malicious user can change the file filter dropdown in their OS dialog to "All Files (*.*)" and upload an \`.exe\` or \`.sh\` file disguised as an image. Always validate magic bytes (file signature headers) on your backend server.`
  },
  {
    id: 'html-10',
    section: 'html',
    number: 10,
    question: 'What does rowspan and colspan do?',
    answer: `In HTML tables, \`rowspan\` and \`colspan\` are attributes applied to \`<td>\` (table data) or \`<th>\` (table header) cells to merge adjacent cells across dimensions.

### Attribute Definitions:
1. **\`colspan="n"\` (Column Span - Horizontal Merge)**:
   - Merges the current cell across **\`n\` columns horizontally to the right**.
   - Decreases the required cell count in the current row by \`n - 1\`.

2. **\`rowspan="n"\` (Row Span - Vertical Merge)**:
   - Merges the current cell across **\`n\` rows vertically downward**.
   - Subsequent rows that overlap the span must omit their corresponding cell at that column index to prevent table layout overflow.

\`\`\`html
<table border="1" style="border-collapse: collapse; text-align: center;">
  <thead>
    <tr>
      <!-- Colspan: Spans across 3 columns -->
      <th colspan="3">Department Performance Overview</th>
    </tr>
    <tr>
      <th>Department</th>
      <th>Quarter</th>
      <th>Revenue</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <!-- Rowspan: Engineering spans 2 consecutive rows -->
      <td rowspan="2">Engineering</td>
      <td>Q1</td>
      <td>$250,000</td>
    </tr>
    <tr>
      <!-- Notice only 2 cells here: the first column is already consumed by Rowspan! -->
      <td>Q2</td>
      <td>$310,000</td>
    </tr>
  </tbody>
</table>
\`\`\`

📌 Note: Miscalculating \`rowspan\` or \`colspan\` numbers causes table distortion, pushing subsequent cells out of alignment and breaking accessibility column mapping.`
  },
  {
    id: 'html-11',
    section: 'html',
    number: 11,
    question: 'Explain Marquee tag and its usage.',
    answer: `The \`<marquee>\` element was a proprietary non-standard HTML tag introduced in early versions of Microsoft Internet Explorer to produce animated, horizontally or vertically scrolling text or image banners.

### Current Status: **Deprecated and Obsolete**:
- Removed from the HTML5 standard by W3C and WHATWG.
- Causes significant accessibility violations: cannot be paused, disrupts reading, causes issues for users with vestibular/cognitive disorders, and fails WCAG 2.2.2 (Pause, Stop, Hide).

### Modern Standard Solution: CSS Keyframe Animations:
Modern applications replace marquee behavior with hardware-accelerated CSS animations using \`transform: translateX()\`:

\`\`\`html
<div class="marquee-container" aria-label="News ticker" role="region">
  <div class="marquee-content">
    ⚡ Breaking News: React 19 and Next.js modern architecture patterns adopted industry-wide!
  </div>
</div>

<style>
  .marquee-container {
    width: 100%;
    overflow: hidden;
    white-space: nowrap;
    background: #0f172a;
    color: #38bdf8;
    padding: 10px 0;
  }

  .marquee-content {
    display: inline-block;
    padding-left: 100%;
    animation: smoothScroll 15s linear infinite;
    will-change: transform;
  }

  /* Pause animation when user hovers or reduces motion */
  .marquee-container:hover .marquee-content {
    animation-play-state: paused;
  }

  @media (prefers-reduced-motion: reduce) {
    .marquee-content {
      animation: none;
      padding-left: 0;
    }
  }

  @keyframes smoothScroll {
    0% { transform: translateX(0); }
    100% { transform: translateX(-100%); }
  }
</style>
\`\`\`

👉 Interview Tip: Mentioning \`@media (prefers-reduced-motion: reduce)\` and \`animation-play-state: paused\` on hover demonstrates deep production-level awareness of web accessibility (a11y) standards.`
  },
  {
    id: 'html-12',
    section: 'html',
    number: 12,
    question: 'Semantic and Non Semantic Elements.',
    answer: `In HTML5, elements are categorized into **Semantic** and **Non-Semantic** based on whether their tag name communicates intrinsic human and machine-readable meaning about their content.

### 1. Semantic Elements:
Semantic elements clearly describe the purpose of their enclosed content to developers, search engine crawlers, and assistive technologies (screen readers):
- \`<header>\`: Introductory content, navigational links, or site logos.
- \`<nav>\`: Primary navigational link collections.
- \`<main>\`: Central unique content of the document (only one visible \`<main>\` per page).
- \`<article>\`: Self-contained, independently distributable composition (blog post, news item, tweet).
- \`<section>\`: Standalone thematic grouping of content, typically with a heading.
- \`<aside>\`: Tangentially related content (sidebars, callout boxes, related links).
- \`<footer>\`: Document footer containing copyright, contact, and legal information.

### 2. Non-Semantic Elements:
Non-semantic elements convey zero meaning about what they contain; they are purely generic grouping containers used for visual styling and layout hooks:
- \`<div>\`: Generic block-level container.
- \`<span>\`: Generic inline phrasing container.

### Modern Semantic Page Blueprint:
\`\`\`html
<!DOCTYPE html>
<html lang="en">
<body>
  <header>
    <h1>Frontend Tech Journal</h1>
    <nav aria-label="Main Navigation">
      <ul>
        <li><a href="/articles">Articles</a></li>
        <li><a href="/about">About</a></li>
      </ul>
    </nav>
  </header>

  <main>
    <article>
      <h2>Deep-Dive into V8 Compilation Pipelines</h2>
      <p>Understanding Ignition interpreter and TurboFan JIT compiler...</p>
    </article>
    <aside>
      <h3>Related Topics</h3>
      <p>Memory Leaks and Garbage Collection</p>
    </aside>
  </main>

  <footer>
    <p>&copy; 2025 Tech Journal. All rights reserved.</p>
  </footer>
</body>
</html>
\`\`\`

### Key Benefits of Semantic Markup:
1. **Accessibility (a11y)**: Screen reader users can jump directly between landmarks (\`<nav>\`, \`<main>\`, \`<header>\`) without listening through the whole page.
2. **SEO Ranking**: Google and Bing bots assign higher semantic weight to content enclosed in \`<article>\`, \`<h1>\`, and \`<main>\`.
3. **Maintainability**: Clear architectural readability across large development teams.`
  },
  {
    id: 'html-13',
    section: 'html',
    number: 13,
    question: 'What is the significance of the <noscript> tag?',
    answer: `The \`<noscript>\` element provides an alternative, graceful fallback markup block that renders **only** when client-side JavaScript execution is disabled in the user's browser or when the browser lacks a JavaScript engine.

### How Browsers Process \`<noscript>\`:
- **When JavaScript is Enabled (Default)**: The browser completely ignores and does not render the contents inside \`<noscript>\`.
- **When JavaScript is Disabled**: The browser displays the enclosed fallback elements directly to the user.

\`\`\`html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Single Page App</title>
  
  <noscript>
    <!-- Fallback stylesheet or message for non-JS environments -->
    <style>
      .app-root { display: none; }
      .no-js-warning {
        background-color: #fee2e2;
        color: #991b1b;
        padding: 24px;
        text-align: center;
        border: 2px solid #ef4444;
      }
    </style>
  </noscript>
</head>
<body>
  <noscript>
    <div class="no-js-warning" role="alert">
      <h2>JavaScript Required</h2>
      <p>This web application requires JavaScript for interactive dashboard rendering. Please enable JavaScript in your browser settings or switch to an updated modern browser.</p>
    </div>
  </noscript>

  <div id="root" class="app-root">
    <!-- React / Vue App mounts here -->
  </div>
</body>
</html>
\`\`\`

👉 Interview Tip: Modern tracking pixels (such as Google Tag Manager or Facebook Pixel) frequently embed an \`<img>\` tracking beacon inside a \`<noscript>\` block to ensure basic impression tracking even if a client blocks script execution.`
  },
  {
    id: 'html-14',
    section: 'html',
    number: 14,
    question: 'Describe the importance of the <!DOCTYPE html> declaration in HTML.',
    answer: `The \`<!DOCTYPE html>\` declaration is an indispensable instruction placed at the very top (line 1, character 1) of every HTML document that tells the browser's layout engine which mode to use when rendering the page.

### The Rendering Modes:
1. **Standards Mode (Strict Mode)**:
   - Triggered by \`<!DOCTYPE html>\`.
   - The browser adheres strictly to official W3C and WHATWG specifications for CSS box sizing, font metrics, line height calculations, and DOM behaviors.

2. **Quirks Mode**:
   - Triggered when the DOCTYPE declaration is omitted or malformed.
   - The browser emulates legacy bugs from late 1990s browsers (Netscape Navigator 4 and Internet Explorer 5), such as calculating \`width\` and \`height\` including padding/border (old IE box model) instead of content width.

3. **Almost Standards Mode**:
   - Follows Standards mode in all aspects except for table cell image vertical alignment mechanics.

### Evolution of DOCTYPE:
| Specification | DOCTYPE Syntax |
| :--- | :--- |
| **HTML 4.01 Strict** | \`<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">\` |
| **XHTML 1.0 Strict** | \`<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Strict//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-strict.dtd">\` |
| **HTML5 (Modern)** | \`<!DOCTYPE html>\` |

\`\`\`html
<!-- Clean HTML5 Standards Mode Initialization -->
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8">
    <title>Standards-Compliant Document</title>
  </head>
  <body>
    <!-- Renders with predictable, standardized CSS box calculations -->
  </body>
</html>
\`\`\`

📌 Note: \`<!DOCTYPE html>\` is technically not an HTML tag; it is an SGML/HTML processing instruction directed specifically at the browser layout engine (Blink, Gecko, WebKit).`
  },
  {
    id: 'html-15',
    section: 'html',
    number: 15,
    question: 'What is a picture tag and its advantages?',
    answer: `The \`<picture>\` element is a responsive HTML5 image container that wraps one or more \`<source>\` tags alongside a mandatory fallback \`<img>\` element to execute **Art Direction** and **Format Negotiation**.

### Core Architecture:
\`\`\`html
<picture>
  <!-- 1. Format Negotiation: Serve modern next-gen formats (AVIF, WebP) with high compression -->
  <source srcset="hero-desktop.avif" type="image/avif" media="(min-width: 1024px)">
  <source srcset="hero-desktop.webp" type="image/webp" media="(min-width: 1024px)">

  <!-- 2. Art Direction: Crop or swap image ratio for mobile devices -->
  <source srcset="hero-mobile-square.webp" type="image/webp" media="(max-width: 600px)">
  <source srcset="hero-mobile-square.jpg" type="image/jpeg" media="(max-width: 600px)">

  <!-- 3. Mandatory Default Fallback Element (Provides dimensions, alt text, and legacy support) -->
  <img 
    src="hero-fallback.jpg" 
    alt="Frontend Developer Coding at Modern Workstation" 
    width="1200" 
    height="600" 
    loading="lazy" 
    decoding="async"
  />
</picture>
\`\`\`

### Primary Advantages:
1. **Format Fallback & High Compression**:
   - Allows serving cutting-edge image codecs like **AVIF** (~50% smaller than JPEG) or **WebP** (~30% smaller) while falling back seamlessly to \`.jpg\` or \`.png\` for older browsers.
2. **Art Direction (Different Imagery per Screen Size)**:
   - Instead of merely shrinking a widescreen hero image onto a mobile display (making central subjects tiny), you can serve a closely cropped square portrait photo for mobile screens.
3. **Bandwidth & Data Savings**:
   - Mobile users do not download heavy 4K desktop assets, dramatically boosting **Largest Contentful Paint (LCP)** Core Web Vitals scores.

👉 Interview Tip: Remember that the \`<img>\` tag inside \`<picture>\` is not optional. The \`<picture>\` wrapper acts merely as an invisible decision-maker; the browser ultimately renders the \`<img>\` element with the chosen source URL.`
  },
  {
    id: 'html-16',
    section: 'html',
    number: 16,
    question: 'What is srcset attribute?',
    answer: `The \`srcset\` attribute on \`<img>\` and \`<source>\` elements allows developers to provide a list of image resource candidates along with resolution or width descriptors, enabling the browser to automatically select the most bandwidth-efficient asset.

### Descriptor Types:
1. **Width Descriptors (\`w\`) & \`sizes\` (Recommended for Responsive Layouts)**:
   - Tells the browser the exact pixel width of each image file.
   - Combined with the \`sizes\` attribute, which defines the display slot size at various media query breakpoints.

2. **Pixel Density Descriptors (\`x\`) (For Fixed-Dimension Icons & Avatars)**:
   - Serves high-DPI (Retina, 2x, 3x) assets on high-density screens while serving 1x assets on standard screens.

\`\`\`html
<!-- Pattern 1: Responsive Width Descriptors (w) with sizes -->
<img 
  src="card-800.jpg" 
  srcset="
    card-400.jpg 400w,
    card-800.jpg 800w,
    card-1200.jpg 1200w,
    card-1600.jpg 1600w
  "
  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
  alt="Architecture Blueprint"
  loading="lazy"
/>

<!-- Pattern 2: Retina Pixel Density Descriptors (x) -->
<img 
  src="avatar-1x.png" 
  srcset="avatar-1x.png 1x, avatar-2x.png 2x, avatar-3x.png 3x" 
  alt="User Profile" 
  width="64" 
  height="64" 
/>
\`\`\`

### How the Browser Chooses:
- The browser calculates the required physical pixels:
  $$\\text{Target Pixels} = \\text{Slot Width from } \\texttt{sizes} \\times \\text{Device Pixel Ratio (DPR)}$$
- If the slot width is 400px and DPR is 2 (e.g., iPhone Retina), the browser selects the closest asset $\\ge 800\\text{px}$ (\`card-800.jpg\`).

📌 Note: Browsers make this decision *before* downloading CSS or running JavaScript during the speculative HTML pre-parsing phase. Therefore, CSS media queries cannot inform early image downloading as quickly as native \`srcset\` and \`sizes\` tags.`
  },
  {
    id: 'html-17',
    section: 'html',
    number: 17,
    question: 'Explain loading=lazy and loading=eager.',
    answer: `The native \`loading\` attribute on \`<img>\` and \`<iframe>\` elements gives developers control over when external resources are fetched relative to the user's viewport.

### Attribute Values:
1. **\`loading="lazy"\`**:
   - Defers fetching the image or iframe until it reaches an engine-calculated threshold distance from the visible viewport (typically within 1000px to 1500px depending on network speed).
   - Conserves client memory, prevents unneeded network payload transfer, and dramatically reduces initial page load time.

2. **\`loading="eager"\`**:
   - Instructs the browser to fetch the resource immediately upon encountering the tag during HTML parsing, regardless of its position on the page (default browser behavior if omitted).

\`\`\`html
<!-- ABOVE THE FOLD (Hero Banner): Eager loading to optimize Largest Contentful Paint (LCP) -->
<header>
  <img 
    src="hero-banner.jpg" 
    alt="Product Launch Showcase" 
    loading="eager" 
    fetchpriority="high"
    width="1200" 
    height="500"
  />
</header>

<!-- BELOW THE FOLD (Product Grid): Native lazy loading -->
<main>
  <section class="gallery">
    <img src="product-1.jpg" alt="Gadget A" loading="lazy" width="300" height="300">
    <img src="product-2.jpg" alt="Gadget B" loading="lazy" width="300" height="300">
  </section>

  <!-- Lazy loaded embeds -->
  <iframe src="https://maps.google.com/..." loading="lazy" width="600" height="400"></iframe>
</main>
\`\`\`

### Core Web Vitals Best Practices:
| Scenario | Recommended Loading | Reason |
| :--- | :--- | :--- |
| **Hero Image / LCP Element** | \`loading="eager"\` + \`fetchpriority="high"\` | **Crucial**: Lazy loading your LCP hero element delays discovery and degrades your LCP score by 1-2 seconds! |
| **Below-the-fold Content** | \`loading="lazy"\` | Minimizes initial DOM network congestion and saves cellular data. |
| **Always provide \`width\` & \`height\`** | Required with \`loading="lazy"\` | Prevents **Cumulative Layout Shift (CLS)** by reserving aspect ratio space prior to image download. |`
  },
  {
    id: 'html-18',
    section: 'html',
    number: 18,
    question: 'How can you change the image in the title bar?',
    answer: `The image displayed in the browser tab, title bar, bookmarks, and mobile home screen shortcut is known as a **Favicon** (Favorites Icon). It is configured via declarative \`<link rel="...">\` tags placed inside the document \`<head>\`.

### Modern Production Favicon Implementation:
For optimal cross-platform support across desktop browsers, modern high-DPI displays, Apple iOS home screens, and Android devices:

\`\`\`html
<head>
  <!-- 1. Modern SVG Favicon (Vector-based, sharp at all resolutions, supports dark-mode CSS) -->
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">

  <!-- 2. Standard PNG Favicons (For older browsers or fixed dimensions) -->
  <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
  <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">

  <!-- 3. Apple Touch Icon (Used when iOS users save page to Home Screen) -->
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">

  <!-- 4. Legacy Fallback (For Internet Explorer and older tools) -->
  <link rel="shortcut icon" href="/favicon.ico">

  <!-- 5. Progressive Web App (PWA) Manifest -->
  <link rel="manifest" href="/site.webmanifest">
</head>
\`\`\`

### Dynamic Favicon Updates via JavaScript:
You can also change the title bar icon dynamically at runtime (e.g., displaying an unread notification dot or switching during dark mode):

\`\`\`javascript
function setFaviconNotification(hasUnreadMessages) {
  const faviconLink = document.querySelector("link[rel*='icon']");
  if (!faviconLink) return;

  if (hasUnreadMessages) {
    faviconLink.href = '/favicon-unread-dot.svg';
    document.title = '(1) New Notification - My App';
  } else {
    faviconLink.href = '/favicon.svg';
    document.title = 'My App';
  }
}
\`\`\`

👉 Interview Tip: SVG favicons allow embedded \`<style>\` tags with \`@media (prefers-color-scheme: dark)\`, automatically switching between a light-themed and dark-themed icon without running any JavaScript!`
  }
];
