export const CSS_QUESTIONS = [
  {
    id: 'css-1',
    section: 'css',
    number: 1,
    question: 'What is CSS?',
    answer: `**CSS (Cascading Style Sheets)** is a style sheet language used to describe the presentation, layout, visual design, and formatting of HTML or XML elements on web pages.`
  },
  {
    id: 'css-2',
    section: 'css',
    number: 2,
    question: 'What is inheritance in CSS?',
    answer: `Inheritance is the mechanism by which certain CSS property values assigned to a parent element are automatically passed down to child elements.
- *Inherited properties*: \`color\`, \`font-family\`, \`font-size\`, \`line-height\`, \`text-align\`, \`visibility\`.
- *Non-inherited properties*: \`margin\`, \`padding\`, \`border\`, \`width\`, \`height\`, \`background\`, \`position\`.
You can force inheritance using \`inherit\` keyword.`
  },
  {
    id: 'css-3',
    section: 'css',
    number: 3,
    question: 'Explain specificity rules in CSS?',
    answer: `Specificity determines which CSS rule applies when multiple rules target the same element. It is calculated as a 4-part value **(Inline, ID, Class/Attribute/Pseudo-class, Element/Pseudo-element)**:
1. **Inline Styles**: \`(1, 0, 0, 0)\`
2. **ID Selectors**: \`(0, 1, 0, 0)\` (\`#header\`)
3. **Classes, Attributes, Pseudo-classes**: \`(0, 0, 1, 0)\` (\`.btn\`, \`[type="text"]\`, \`:hover\`)
4. **Elements & Pseudo-elements**: \`(0, 0, 0, 1)\` (\`div\`, \`p\`, \`::before\`)
*\`!important\` overrides all specificity calculations.*`
  },
  {
    id: 'css-4',
    section: 'css',
    number: 4,
    question: 'Explain 4 ways to import CSS in an HTML file.',
    answer: `1. **External Stylesheet**: \`<link rel="stylesheet" href="styles.css">\` inside \`<head>\`.
2. **Internal/Embedded Styles**: \`<style> p { color: red; } </style>\` inside \`<head>\`.
3. **Inline Styles**: \`<div style="color: red;">\` attribute directly on element.
4. **CSS \`@import\` Rule**: \`@import url('styles.css');\` placed inside a \`<style>\` block or CSS file.`
  },
  {
    id: 'css-5',
    section: 'css',
    number: 5,
    question: 'Can I use <style> tag in body instead of Head?',
    answer: `Yes, HTML5 permits \`<style>\` tags inside the \`<body>\`. However, placing \`<style>\` in the body can cause **FOUC (Flash of Unstyled Content)** because the browser parses and renders HTML before encountering the body styles. Best practice is to place styles in \`<head>\`.`
  },
  {
    id: 'css-6',
    section: 'css',
    number: 6,
    question: 'Explain !important. Can we use it !important in all CSS rules?',
    answer: `\`!important\` is a keyword added to a CSS rule value (\`color: red !important;\`) to override any specificity and inline styles.
- Yes, syntax-wise it can be added to any rule.
- **Best Practice**: Avoid using \`!important\` liberally as it breaks cascading rules and makes CSS debugging extremely difficult. Only use for utility override classes or overriding external 3rd-party component styles.`
  },
  {
    id: 'css-7',
    section: 'css',
    number: 7,
    question: 'How can you center a div in a webpage, horizontally and vertically. Give 3 Possible ways.',
    answer: `**Way 1: Flexbox**
\`\`\`css
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
}
\`\`\`
**Way 2: CSS Grid**
\`\`\`css
.container {
  display: grid;
  place-items: center;
  min-height: 100vh;
}
\`\`\`
**Way 3: Absolute Positioning & Transform**
\`\`\`css
.centered-div {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
\`\`\``
  },
  {
    id: 'css-8',
    section: 'css',
    number: 8,
    question: 'Explain Positioning properties.',
    answer: `- **\`static\`**: Default positioning; flows naturally according to normal document layout.
- **\`relative\`**: Positioned relative to its normal position without taking it out of document flow.
- **\`absolute\`**: Positioned relative to its nearest *non-static ancestor*. Removed from normal document flow.
- **\`fixed\`**: Positioned relative to the *browser viewport*. Stays in place during scrolling.
- **\`sticky\`**: Toggles between \`relative\` and \`fixed\` depending on user scroll position.`
  },
  {
    id: 'css-9',
    section: 'css',
    number: 9,
    question: 'What is the difference between sticky and fixed?',
    answer: `- **\`position: fixed\`**: Always positioned relative to the browser viewport window regardless of scrolling or parent containers. Removed from document flow.
- **\`position: sticky\`**: Acts as \`relative\` until the scroll threshold (\`top: 0\`) is reached within its container, at which point it "sticks" like a fixed element inside its parent boundaries.`
  },
  {
    id: 'css-10',
    section: 'css',
    number: 10,
    question: 'What is difference between opacity:0, visibility:hidden and display:none?',
    answer: `| Property | Visible? | Takes Space in Layout? | Receives Click Events? |
|---|---|---|---|
| \`display: none\` | No | ❌ No (Removed from DOM flow) | ❌ No |
| \`visibility: hidden\` | No | ✅ Yes (Keeps layout box) | ❌ No |
| \`opacity: 0\` | No (Transparent) | ✅ Yes (Keeps layout box) | ✅ Yes (Can be clicked) |`
  },
  {
    id: 'css-11',
    section: 'css',
    number: 11,
    question: 'How can I only make horizontal scroll, and disable vertical scroll.',
    answer: `Set \`overflow-x: auto\` and \`overflow-y: hidden\` on the scroll container:
\`\`\`css
.scroll-container {
  overflow-x: auto;
  overflow-y: hidden;
  white-space: nowrap;
}
\`\`\``
  },
  {
    id: 'css-12',
    section: 'css',
    number: 12,
    question: 'Explain box model.',
    answer: `Every HTML element is rendered as a rectangular box consisting of 4 layers from inside out:
1. **Content**: Text or images.
2. **Padding**: Transparent area surrounding content inside border.
3. **Border**: Line surrounding padding and content.
4. **Margin**: Transparent area outside border pushing adjacent elements away.

\`box-sizing: border-box\` ensures \`width\` and \`height\` include padding & border.`
  },
  {
    id: 'css-13',
    section: 'css',
    number: 13,
    question: 'What does calc() function do?',
    answer: `The \`calc()\` function allows performing mathematical calculations when specifying CSS property values.
\`\`\`css
.sidebar-main {
  width: calc(100% - 280px);
  padding: calc(1rem + 5px);
}
\`\`\``
  },
  {
    id: 'css-14',
    section: 'css',
    number: 14,
    question: 'Explain rem vs em.',
    answer: `- **\`rem\` (Root EM)**: Relative to the font-size of the **root element** (\`<html>\`). If root is 16px, 2rem = 32px everywhere.
- **\`em\`**: Relative to the font-size of the **parent element** (causes compounding effect when nested).`
  },
  {
    id: 'css-15',
    section: 'css',
    number: 15,
    question: 'What is the default value of rem.',
    answer: `The browser default root font-size is **16px**. Therefore, by default:
- \`1rem = 16px\`
- \`0.5rem = 8px\`
- \`2rem = 32px\``
  },
  {
    id: 'css-16',
    section: 'css',
    number: 16,
    question: 'Explain how I can change 1rem = 20px.',
    answer: `Set the root \`<html>\` font-size to 20px:
\`\`\`css
html {
  font-size: 20px;
}
\`\`\`
Alternatively set \`font-size: 125%\` (since 125% of 16px is 20px).`
  },
  {
    id: 'css-17',
    section: 'css',
    number: 17,
    question: 'What are the benefits of using rem.',
    answer: `1. **Accessibility**: Respects user browser settings if a user increases font size in browser settings.
2. **Scalability**: Allows scaling an entire responsive UI design by changing root font-size via media queries.
3. **Consistency**: Avoids compounding bugs caused by nested \`em\` units.`
  },
  {
    id: 'css-18',
    section: 'css',
    number: 18,
    question: 'Explain clamp function.',
    answer: `The \`clamp(MIN, VAL, MAX)\` function clamps a value between a lower and upper bound.
\`\`\`css
h1 {
  font-size: clamp(1.5rem, 5vw, 3rem);
}
\`\`\`
*Explanation*: Font size will be \`5vw\`, but never smaller than \`1.5rem\` and never larger than \`3rem\`.`
  },
  {
    id: 'css-19',
    section: 'css',
    number: 19,
    question: 'How can I show ... when some text is overflowing a container.',
    answer: `Use text-overflow ellipsis styles:
\`\`\`css
.truncate {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  width: 200px;
}
\`\`\``
  },
  {
    id: 'css-20',
    section: 'css',
    number: 20,
    question: 'How can I restrict the number of lines using css.',
    answer: `Use webkit line-clamp properties:
\`\`\`css
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
\`\`\``
  },
  {
    id: 'css-21',
    section: 'css',
    number: 21,
    question: 'How can I animate height width using css.',
    answer: `Use CSS transitions on animatable properties:
\`\`\`css
.box {
  width: 100px;
  height: 100px;
  transition: width 0.3s ease, height 0.3s ease;
}
.box:hover {
  width: 200px;
  height: 200px;
}
\`\`\`
*Performance Tip*: Animating \`transform: scale()\` is GPU-accelerated and smoother than animating layout \`width/height\`.`
  },
  {
    id: 'css-22',
    section: 'css',
    number: 22,
    question: 'Rotate a div by 45 deg.',
    answer: `Use the CSS transform property:
\`\`\`css
.rotated-box {
  transform: rotate(45deg);
}
\`\`\``
  },
  {
    id: 'css-23',
    section: 'css',
    number: 23,
    question: 'Explain flex, and its properties.',
    answer: `**Flexbox (Flexible Box Layout)** provides 1-dimensional layout alignment along main axis and cross axis.
- **Container Properties**: \`display: flex\`, \`flex-direction\` (\`row|column\`), \`justify-content\` (\`flex-start|center|space-between\`), \`align-items\` (\`center|stretch\`), \`flex-wrap\`.
- **Item Properties**: \`flex-grow\`, \`flex-shrink\`, \`flex-basis\`, \`align-self\`.`
  },
  {
    id: 'css-24',
    section: 'css',
    number: 24,
    question: 'How can I change the cursor using CSS.',
    answer: `Use the \`cursor\` property:
\`\`\`css
.btn { cursor: pointer; }
.disabled { cursor: not-allowed; }
.draggable { cursor: grab; }
\`\`\``
  },
  {
    id: 'css-25',
    section: 'css',
    number: 25,
    question: 'How can I apply CSS to the first word of a paragraph using CSS.',
    answer: `CSS has \`::first-letter\` and \`::first-line\`, but no direct \`::first-word\` pseudo-element. Wrap the first word in a \`<span>\` tag:
\`\`\`html
<p><span class="first-word">Hello</span> World</p>
\`\`\`
Or use CSS JS string formatting.`
  },
  {
    id: 'css-26',
    section: 'css',
    number: 26,
    question: 'How can I check if user devices support hover or not, and based on that apply CSS.',
    answer: `Use the \`@media (hover: hover)\` media feature query:
\`\`\`css
@media (hover: hover) {
  .btn:hover {
    background-color: #4f46e5;
  }
}
@media (hover: none) {
  /* Mobile touch fallback */
  .btn {
    background-color: #6366f1;
  }
}
\`\`\``
  },
  {
    id: 'css-27',
    section: 'css',
    number: 27,
    question: 'Explain sibling selectors.',
    answer: `- **Adjacent Sibling Selector (\`+\`)**: Targets immediately adjacent next element: \`h1 + p\` (p right after h1).
- **General Sibling Selector (\`~\`)**: Targets all matching siblings following an element: \`h1 ~ p\` (all p elements following h1).`
  },
  {
    id: 'css-28',
    section: 'css',
    number: 28,
    question: 'Explain clearfix property.',
    answer: `Clearfix is a CSS technique used to force a container element to expand and contain its floated child elements.
\`\`\`css
.clearfix::after {
  content: "";
  display: table;
  clear: both;
}
\`\`\``
  },
  {
    id: 'css-29',
    section: 'css',
    number: 29,
    question: 'Explain how z-index works in CSS.',
    answer: `The \`z-index\` property controls vertical stacking order along the Z-axis for **positioned elements** (\`relative\`, \`absolute\`, \`fixed\`, \`sticky\`, or flex/grid items).
Higher values render on top of lower values. Stacking context is established by parent elements.`
  },
  {
    id: 'css-30',
    section: 'css',
    number: 30,
    question: 'What is the maximum number the z-index supports?',
    answer: `In modern browser layout engines, \`z-index\` is stored as a 32-bit signed integer. The maximum supported number is **\`2147483647\`** (\`2^31 - 1\`).`
  },
  {
    id: 'css-31',
    section: 'css',
    number: 31,
    question: 'Explain background property.',
    answer: `Shorthand property for setting background styles:
\`background: color image repeat position / size attachment;\`
*Sub-properties*: \`background-color\`, \`background-image\`, \`background-repeat\` (\`no-repeat\`), \`background-position\` (\`center\`), \`background-size\` (\`cover|contain\`).`
  },
  {
    id: 'css-32',
    section: 'css',
    number: 32,
    question: 'What are different measurement units in CSS. Give at least 6 units.',
    answer: `1. **\`px\`**: Absolute pixels.
2. **\`rem\`**: Relative to root font-size.
3. **\`em\`**: Relative to parent font-size.
4. **\`vh\`**: 1% of viewport height.
5. **\`vw\`**: 1% of viewport width.
6. **\`%\`**: Percentage of parent container width/height.`
  },
  {
    id: 'css-33',
    section: 'css',
    number: 33,
    question: 'Explain what does :has do in CSS.',
    answer: `The \`:has()\` pseudo-class is the "parent selector" in CSS. It selects an element if any selector passed inside matches a child or descendant:
\`\`\`css
/* Select card container if it contains an image */
.card:has(img) {
  padding: 0;
}
\`\`\``
  },
  {
    id: 'css-34',
    section: 'css',
    number: 34,
    question: 'What are vendor prefixes in CSS.',
    answer: `Vendor prefixes allow browser makers to test experimental CSS features before final W3C standardization:
- \`-webkit-\`: Chrome, Safari, Edge, iOS.
- \`-moz-\`: Firefox.
- \`-ms-\`: Old Internet Explorer.`
  },
  {
    id: 'css-35',
    section: 'css',
    number: 35,
    question: 'How can you hide a scrollbar in CSS.',
    answer: `\`\`\`css
/* Hide scrollbar for Chrome, Safari and Opera */
.no-scrollbar::-webkit-scrollbar {
  display: none;
}
/* Hide scrollbar for IE, Edge and Firefox */
.no-scrollbar {
  -ms-overflow-style: none;  /* IE and Edge */
  scrollbar-width: none;  /* Firefox */
}
\`\`\``
  },
  {
    id: 'css-36',
    section: 'css',
    number: 36,
    question: 'What CSS properties you apply on a button which is disabled.',
    answer: `\`\`\`css
button:disabled {
  opacity: 0.6;
  cursor: not-allowed;
  pointer-events: none;
  background-color: #cbd5e1;
}
\`\`\``
  },
  {
    id: 'css-37',
    section: 'css',
    number: 37,
    question: 'What are pseudo elements?',
    answer: `Pseudo-elements (\`::\`) style specific sub-parts of an element:
- \`::before\` & \`::after\`: Insert cosmetic content.
- \`::first-line\` & \`::first-letter\`: Format text boundaries.
- \`::placeholder\`: Format input placeholders.`
  },
  {
    id: 'css-38',
    section: 'css',
    number: 38,
    question: 'How can you give a border only to the left and right of a div.',
    answer: `\`\`\`css
.custom-border {
  border-left: 2px solid #6366f1;
  border-right: 2px solid #6366f1;
}
\`\`\``
  },
  {
    id: 'css-39',
    section: 'css',
    number: 39,
    question: 'Difference between outline and border.',
    answer: `- **\`border\`**: Occupies space inside the CSS box model layout.
- **\`outline\`**: Drawn *outside* the border edge, does **not** take up space or affect layout calculations.`
  },
  {
    id: 'css-40',
    section: 'css',
    number: 40,
    question: 'Explain margin padding collapsing feature.',
    answer: `Margin collapsing occurs when vertical top and bottom margins of adjacent block elements collapse into a single margin equal to the largest of the individual margins.`
  }
];
