// Frontend Interview Bible - Complete Master Q&A Dataset (197 Questions across 8 Sections)

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
    answer: `**HTML** stands for **HyperText Markup Language**:
- **HyperText**: Refers to text that contains links (hyperlinks) to other pieces of text or webpages. It allows non-linear navigation across documents on the Web.
- **Markup**: Refers to the special tags and annotations (\`<h1>\`, \`<p>\`, \`<div>\`) used to structure and format text/content so a web browser knows how to render it.
- **Language**: Indicates it is a syntax-based system of rules and tags used to communicate document structure to web browsers.`
  },
  {
    id: 'html-2',
    section: 'html',
    number: 2,
    question: 'Is HTML case sensitive or case in-sensitive?',
    answer: `HTML is **case-insensitive**. Elements like \`<div>\`, \`<DIV>\`, or \`<Div>\` are parsed identically by browsers. However, **W3C standards & JSX (React)** strictly mandate lowercase tag names. Attribute values (like IDs, CSS class names, and URLs) are **case-sensitive**.`
  },
  {
    id: 'html-3',
    section: 'html',
    number: 3,
    question: 'Explain <head> tag.',
    answer: `The \`<head>\` element is a container for **document metadata** (data about the HTML document that is not directly rendered in the page body).
It contains:
- \`<title>\`: Sets webpage title shown in browser tabs.
- \`<meta>\`: Character encoding (\`utf-8\`), viewport settings (\`width=device-width\`), SEO description, and social media tags.
- \`<link>\`: Links external resources like CSS stylesheets (\`rel="stylesheet"\`), favicons, and fonts.
- \`<script>\` & \`<style>\`: Internal scripts and inline CSS styles.`
  },
  {
    id: 'html-4',
    section: 'html',
    number: 4,
    question: 'How can I refresh my page every 60 seconds using HTML?',
    answer: `You can automatically refresh the page using a \`<meta>\` http-equiv tag placed inside the \`<head>\`:
\`\`\`html
<meta http-equiv="refresh" content="60">
\`\`\`
To redirect to another URL after 60 seconds:
\`\`\`html
<meta http-equiv="refresh" content="60; url=https://example.com">
\`\`\``
  },
  {
    id: 'html-5',
    section: 'html',
    number: 5,
    question: 'What are inline and block elements?',
    answer: `**Block Elements**:
- Always start on a new line and take up the **full width** available.
- Can set custom \`width\`, \`height\`, \`margin\`, and \`padding\`.
- *Examples*: \`<div>\`, \`<p>\`, \`<h1>\`-\`<h6>\`, \`<section>\`, \`<ul>\`.

**Inline Elements**:
- Do **not** start on a new line; take only as much width as content requires.
- Custom \`width\` and \`height\` are ignored. Vertical margins do not push other elements.
- *Examples*: \`<span>\`, \`<a>\`, \`<strong>\`, \`<em>\`, \`<img>\`.`
  },
  {
    id: 'html-6',
    section: 'html',
    number: 6,
    question: 'What is a table tag? And what is the importance of table tag.',
    answer: `The \`<table>\` tag defines tabular data organized into rows (\`<tr>\`), header cells (\`<th>\`), and data cells (\`<td>\`).
**Importance**:
- Provides accessibility (via screen readers using \`<caption>\`, \`<thead>\`, \`<tbody>\`, \`scope="col"\`).
- Ideal for structured data representation (financial data, schedules, comparison matrices).
- *Note*: Tables should NOT be used for overall page layouts (use CSS Flexbox/Grid instead).`
  },
  {
    id: 'html-7',
    section: 'html',
    number: 7,
    question: 'What are different ways to take input from users?',
    answer: `Ways to accept user input in HTML:
1. \`<input type="text|password|number|email|date|checkbox|radio|file|range|color">\`
2. \`<textarea>\`: Multi-line text input.
3. \`<select>\` & \`<option>\`: Dropdown selection menus.
4. \`<input list="browsers">\` with \`<datalist>\`: Autocomplete dropdown input.
5. \`contenteditable="true"\` on any element (\`<div>\`, \`<p>\`).`
  },
  {
    id: 'html-8',
    section: 'html',
    number: 8,
    question: 'How can you make an upload file button?',
    answer: `Use an \`<input>\` element with \`type="file"\`:
\`\`\`html
<input type="file" id="fileUpload" name="filename" multiple>
\`\`\`
Add the \`multiple\` attribute to allow users to select multiple files at once.`
  },
  {
    id: 'html-9',
    section: 'html',
    number: 9,
    question: 'How can you restrict users to only select a .jpg file when a file upload picker is opened?',
    answer: `Use the \`accept\` attribute on the file input:
\`\`\`html
<input type="file" accept=".jpg, .jpeg, image/jpeg">
\`\`\`
*Note*: Always validate file extension and MIME type on the backend server for security.`
  },
  {
    id: 'html-10',
    section: 'html',
    number: 10,
    question: 'What does rowspan and colspan do?',
    answer: `- **\`colspan="n"\`**: Spans a table cell horizontally across *n* columns.
- **\`rowspan="n"\`**: Spans a table cell vertically down across *n* rows.
\`\`\`html
<td colspan="2">Spans 2 Columns</td>
<td rowspan="3">Spans 3 Rows</td>
\`\`\``
  },
  {
    id: 'html-11',
    section: 'html',
    number: 11,
    question: 'Explain Marquee tag and its usage.',
    answer: `The \`<marquee>\` tag was an old HTML tag used to create scrolling text/images horizontally or vertically.
**Usage Status**: Deprecated in HTML5. Use CSS animations instead:
\`\`\`css
@keyframes scrollText {
  from { transform: translateX(100%); }
  to { transform: translateX(-100%); }
}
\`\`\``
  },
  {
    id: 'html-12',
    section: 'html',
    number: 12,
    question: 'Semantic and Non Semantic Elements.',
    answer: `- **Semantic Elements**: Clearly describe their meaning to both developer & browser/screen readers.
  *Examples*: \`<header>\`, \`<nav>\`, \`<main>\`, \`<article>\`, \`<section>\`, \`<aside>\`, \`<footer>\`.
- **Non-Semantic Elements**: Tell nothing about their content.
  *Examples*: \`<div>\`, \`<span>\`.`
  },
  {
    id: 'html-13',
    section: 'html',
    number: 13,
    question: 'What is the significance of the <noscript> tag?',
    answer: `The \`<noscript>\` tag defines alternate content to be displayed to users who have JavaScript disabled in their browser or use a browser that doesn't support scripts.
\`\`\`html
<noscript>
  <div class="warning">JavaScript is required to run this application.</div>
</noscript>
\`\`\``
  },
  {
    id: 'html-14',
    section: 'html',
    number: 14,
    question: 'Describe the importance of the <!DOCTYPE html> declaration in HTML.',
    answer: `The \`<!DOCTYPE html>\` declaration tells the browser which version of HTML the document is written in.
**Importance**:
- Forces browser into **Standards Mode** (preventing Quirks Mode).
- Ensures consistent CSS rendering and JavaScript execution behavior across modern browsers.`
  },
  {
    id: 'html-15',
    section: 'html',
    number: 15,
    question: 'What is a picture tag and its advantages?',
    answer: `The \`<picture>\` element allows developers to provide multiple image sources based on media queries (responsive image art direction) or image format support (WebP, AVIF).
\`\`\`html
<picture>
  <source srcset="large.avif" type="image/avif">
  <source srcset="mobile.jpg" media="(max-width: 600px)">
  <img src="fallback.jpg" alt="Responsive Header">
</picture>
\`\`\`
**Advantages**: Saves bandwidth on mobile devices and serves next-gen formats automatically.`
  },
  {
    id: 'html-16',
    section: 'html',
    number: 16,
    question: 'What is srcset attribute?',
    answer: `The \`srcset\` attribute on \`<img>\` or \`<source>\` tags defines a list of image file sources along with size descriptors (e.g. \`1x, 2x\` for Retina screens or \`400w, 800w\` for device widths).
\`\`\`html
<img src="small.jpg" 
     srcset="small.jpg 400w, medium.jpg 800w, large.jpg 1200w" 
     sizes="(max-width: 600px) 100vw, 50vw" 
     alt="Responsive image">
\`\`\``
  },
  {
    id: 'html-17',
    section: 'html',
    number: 17,
    question: 'Explain loading=lazy and loading=eager.',
    answer: `The \`loading\` attribute controls when images and iframe resources are loaded by the browser:
- **\`loading="lazy"\`**: Defers loading the image until it reaches a calculated distance from the viewport (improves page load performance & LCP).
- **\`loading="eager"\`**: Loads the image immediately regardless of viewport location (default behavior for hero images above the fold).`
  },
  {
    id: 'html-18',
    section: 'html',
    number: 18,
    question: 'How can you change the image in the title bar?',
    answer: `Add a **favicon** \`<link>\` tag inside the \`<head>\` section:
\`\`\`html
<link rel="icon" type="image/png" href="/favicon.png">
<link rel="shortcut icon" href="/favicon.ico">
\`\`\``
  }
];
