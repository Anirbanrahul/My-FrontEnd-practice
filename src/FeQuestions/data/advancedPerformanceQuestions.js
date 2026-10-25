// Advanced Frontend Performance & Optimization Interview Questions

export const ADVANCED_PERFORMANCE_QUESTIONS = [
  {
    id: 'perf-adv-1',
    section: 'performance',
    number: 101,
    question: 'Explain Core Web Vitals (LCP, INP, CLS, FCP, TTFB) and how to optimize them in modern web apps.',
    answer: `**Core Web Vitals** are Google's standardized metrics for measuring real-world user experience:

| Metric | Full Name | Good Threshold | What It Measures | Top Optimization Strategies |
| :--- | :--- | :--- | :--- | :--- |
| **LCP** | Largest Contentful Paint | ≤ 2.5s | Loading speed of largest visible image/text block | Preload hero image (\`<link rel="preload">\`), use WebP/AVIF, enable CDN & HTTP/3, eliminate render-blocking CSS |
| **INP** | Interaction to Next Paint | ≤ 200ms | Responsiveness to user clicks/keys | Break up long tasks (>50ms) using Web Workers, \`requestIdleCallback\`, \`useTransition\`, and debouncing |
| **CLS** | Cumulative Layout Shift | ≤ 0.1 | Visual stability (unexpected layout shifts) | Always set explicit \`width\`/\`height\` on images/videos, reserve ad slots, use CSS \`contain-intrinsic-size\` |
| **FCP** | First Contentful Paint | ≤ 1.8s | Time until browser renders first piece of DOM content | Minimize TTFB, inline critical CSS, defer non-critical JS scripts |
| **TTFB** | Time to First Byte | ≤ 800ms | Server response and network latency | Server-side caching, Edge CDNs (Cloudflare Workers), fast database indexing |

**Code Example for LCP Preloading:**
\`\`\`html
<!-- Preload High Priority Hero Image -->
<link rel="preload" fetchpriority="high" as="image" href="/hero.webp" type="image/webp">
\`\`\``
  },
  {
    id: 'perf-adv-2',
    section: 'performance',
    number: 102,
    question: 'How do React 18 & 19 Concurrent Features (useTransition, useDeferredValue) improve UI responsiveness?',
    answer: `In traditional React, every state update was synchronous and urgent, which could cause input typing or animations to stutter during heavy UI calculations.

**1. \`useTransition\`**: Marks expensive state updates as **non-urgent (transitions)** so urgent events (like user keystrokes) remain instantly responsive.

\`\`\`javascript
import React, { useState, useTransition } from 'react';

function SearchList({ items }) {
  const [query, setQuery] = useState('');
  const [filteredList, setFilteredList] = useState(items);
  const [isPending, startTransition] = useTransition();

  const handleSearch = (e) => {
    const nextVal = e.target.value;
    // 1. Urgent update: Input updates immediately without lag
    setQuery(nextVal);

    // 2. Non-urgent background transition: Filtering 20,000 items
    startTransition(() => {
      const results = items.filter(item => item.name.toLowerCase().includes(nextVal.toLowerCase()));
      setFilteredList(results);
    });
  };

  return (
    <div>
      <input type="text" value={query} onChange={handleSearch} placeholder="Type fast..." />
      {isPending && <span className="loading-badge">Updating list...</span>}
      <List items={filteredList} />
    </div>
  );
}
\`\`\`

**2. \`useDeferredValue\`**: Defers re-rendering a slow child component until the main UI thread is idle.`
  },
  {
    id: 'perf-adv-3',
    section: 'performance',
    number: 103,
    question: 'What is Layout Thrashing (Reflow & Repaint) and how do you prevent it in high-performance UIs?',
    answer: `**The Browser Rendering Pipeline:**
\`JavaScript\` ➔ \`Style (CSSOM)\` ➔ \`Layout (Reflow)\` ➔ \`Paint (Repaint)\` ➔ \`Composite (GPU)\`

**Layout Thrashing (Forced Synchronous Layout):**
Occurs when JavaScript repeatedly alternates between **writing** to the DOM and **reading** layout properties in a rapid loop, forcing the browser to recalculate layout repeatedly.

**Bad (Triggers Layout Thrashing):**
\`\`\`javascript
// ❌ BAD: Read and write inside same loop
elements.forEach(el => {
  const height = el.offsetHeight; // READ (Forces reflow!)
  el.style.height = (height + 10) + 'px'; // WRITE (Invalidates layout!)
});
\`\`\`

**Good (Batched Reads and Writes):**
\`\`\`javascript
// ✅ GOOD: Read all dimensions first, then batch all writes
const heights = elements.map(el => el.offsetHeight); // Batch READ

elements.forEach((el, i) => {
  el.style.height = (heights[i] + 10) + 'px'; // Batch WRITE
});
\`\`\`

💡 **Performance Pro-Tip:** Animate using **\`transform\`** and **\`opacity\`** because they execute directly on the **GPU Composite layer** without triggering Reflow or Repaint!`
  },
  {
    id: 'perf-adv-4',
    section: 'performance',
    number: 104,
    question: 'How do Web Workers prevent JavaScript from freezing the browser UI thread?',
    answer: `JavaScript is single-threaded. Running CPU-intensive tasks (e.g. image processing, large dataset sorting, encryption, matrix computation) on the main thread blocks UI event handling and frame rendering.

**Web Workers** allow running JavaScript scripts in background background worker threads completely isolated from the main thread.

**Code Example:**
\`\`\`javascript
// worker.js
self.onmessage = function(event) {
  const { data } = event;
  // Heavy computation: Sort 1,000,000 items
  const sorted = data.sort((a, b) => a - b);
  self.postMessage(sorted);
};

// main.js (React Component)
import React, { useEffect, useState } from 'react';

function HeavyDataVisualizer({ bigArray }) {
  const [sortedData, setSortedData] = useState([]);

  useEffect(() => {
    const worker = new Worker(new URL('./worker.js', import.meta.url));

    worker.postMessage(bigArray);

    worker.onmessage = (e) => {
      setSortedData(e.data);
    };

    return () => worker.terminate();
  }, [bigArray]);

  return <div>{sortedData.length} records processed in background without UI lag.</div>;
}
\`\`\``
  },
  {
    id: 'perf-adv-5',
    section: 'performance',
    number: 105,
    question: 'How does Virtual Scrolling (Windowing) render 100,000+ items at 60 FPS?',
    answer: `**The Problem:** Rendering 100,000 DOM nodes simultaneously consumes hundreds of megabytes of RAM, causes massive initial DOM construction lag, and slows scroll interactions to a crawl.

**The Solution (Virtual Scrolling):**
Virtual scrolling dynamically calculates which items are currently visible inside the viewport scroll window and renders **only the visible slice** (e.g., 20 items + 5 buffer items above/below) while using an outer container with total calculated height to maintain the native scrollbar.

**Simplified Virtual List Implementation:**
\`\`\`javascript
import React, { useState } from 'react';

function VirtualList({ items, itemHeight = 40, viewportHeight = 400 }) {
  const [scrollTop, setScrollTop] = useState(0);

  const totalHeight = items.length * itemHeight;
  const startIndex = Math.max(0, Math.floor(scrollTop / itemHeight) - 3);
  const visibleCount = Math.ceil(viewportHeight / itemHeight) + 6;
  const visibleItems = items.slice(startIndex, startIndex + visibleCount);

  const offsetY = startIndex * itemHeight;

  return (
    <div
      style={{ height: viewportHeight, overflowY: 'auto', position: 'relative' }}
      onScroll={(e) => setScrollTop(e.currentTarget.scrollTop)}
    >
      <div style={{ height: totalHeight, position: 'relative' }}>
        <div style={{ transform: \`translateY(\${offsetY}px)\` }}>
          {visibleItems.map(item => (
            <div key={item.id} style={{ height: itemHeight }}>
              {item.name}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
\`\`\``
  },
  {
    id: 'perf-adv-6',
    section: 'performance',
    number: 106,
    question: 'Explain Resource Hints: preload, prefetch, preconnect, and dns-prefetch.',
    answer: `Resource hints instruct the browser to anticipate future network requests and initiate connections or downloads early:

1. **\`preconnect\`**: Performs DNS lookup, TLS handshake, and TCP negotiation early with a third-party server (e.g., Google Fonts, CDN).
\`\`\`html
<link rel="preconnect" href="https://fonts.googleapis.com">
\`\`\`

2. **\`dns-prefetch\`**: Resolves only the DNS of a domain in the background (fallback for older browsers).
\`\`\`html
<link rel="dns-prefetch" href="https://api.example.com">
\`\`\`

3. **\`preload\`**: High-priority directive telling the browser to fetch a critical resource needed for the **current page** immediately (Hero images, critical fonts).
\`\`\`html
<link rel="preload" href="/fonts/Inter.woff2" as="font" type="font/woff2" crossorigin>
\`\`\`

4. **\`prefetch\`**: Low-priority background download of resources likely needed for the **next page/route** after the user navigates.
\`\`\`html
<link rel="prefetch" href="/checkout.chunk.js">
\`\`\``
  },
  {
    id: 'perf-adv-7',
    section: 'performance',
    number: 107,
    question: 'What are the top causes of Memory Leaks in React and how do you debug them using Chrome DevTools Heap Snapshots?',
    answer: `**Common Causes of Memory Leaks in Single Page Applications:**
1. **Uncleaned Intervals & Timers**: \`setInterval\` running after component unmounts.
2. **Unremoved Global Event Listeners**: \`window.addEventListener('resize', handler)\` without \`removeEventListener\` in cleanup.
3. **Detached DOM Nodes**: Storing references to removed DOM elements in JavaScript variables or closures.
4. **Active Subscriptions**: Uncancelled WebSockets, RxJS observables, or Firebase listeners.

**Debugging with Chrome DevTools:**
1. Open **Chrome DevTools** ➔ Navigate to the **Memory** tab.
2. Take a **Heap Snapshot** (Baseline).
3. Perform the user action (e.g. open and close modal 10 times).
4. Take a 2nd **Heap Snapshot**.
5. Switch view from **Summary** to **Comparison** against Snapshot 1.
6. Look for **Detached HTMLElement** or retained objects with growing delta counts.`
  }
];
