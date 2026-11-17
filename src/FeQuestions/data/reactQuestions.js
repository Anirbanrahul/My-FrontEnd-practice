// 52 React.js Interview Questions & Answers (from Saikrishna Nangunuri Ebook)

export const REACT_QUESTIONS = [
  {
    id: 'react-1',
    section: 'react-js',
    number: 1,
    question: 'What is React?',
    answer: `**React** is an open-source, component-based, declarative JavaScript library developed by Meta (Facebook) used for engineering dynamic, efficient, and composable user interfaces across web, mobile (React Native), and desktop platforms.

### Core Architectural Pillars:
1. **Declarative Paradigm**:
   - Developers describe *what* the UI should look like for a given state (\`UI = f(state)\`), and React's engine computes how to transition the DOM to match that state efficiently.
2. **Component-Driven Architecture**:
   - UIs are decomposed into encapsulated, independent, reusable components that manage their own state.
3. **Fiber Reconciliation Engine**:
   - Uses an internal in-memory virtual tree to calculate minimal DOM delta mutations rather than blowing away and repainting actual DOM nodes.

\`\`\`jsx
// Declarative React Component
import { useState } from 'react';

export default function Counter() {
  const [count, setCount] = useState(0);

  return (
    <div className="card">
      <h3>Live Counter: {count}</h3>
      <button onClick={() => setCount(prev => prev + 1)}>
        Increment Count
      </button>
    </div>
  );
}
\`\`\`

👉 Interview Tip: Clarify that React is officially a *library*, not a full framework like Angular. It handles only the View layer (\`V\` in MVC), allowing engineers to choose their own routing, state management, and build toolchains.`
  },
  {
    id: 'react-2',
    section: 'react-js',
    number: 2,
    question: 'What are the features of React?',
    answer: `React's architecture is defined by several standout features that set it apart from legacy imperative libraries (like jQuery):

### 1. JSX (JavaScript XML):
- A syntax extension allowing developers to write HTML-like markup inside JavaScript files with full access to JavaScript expressions.

### 2. Virtual DOM & Fiber Architecture:
- Lightweight virtual tree representation of real DOM nodes. React 16+ **Fiber** enables interruptible, incremental rendering for fluid 60 FPS interactions.

### 3. One-Way Unidirectional Data Flow:
- Data flows strictly from parent to child via read-only **Props**, making state mutations predictable and easy to trace.

### 4. Component Reusability & Composition:
- Building complex applications out of modular, isolated functional components using hooks.

### 5. React 18 & 19 Concurrent Features:
- **Concurrent Mode**, **Transitions** (\`useTransition\`), **Server Components (RSC)**, and the **Actions API** for native optimistic updates.`
  },
  {
    id: 'react-3',
    section: 'react-js',
    number: 3,
    question: 'What is JSX?',
    answer: `**JSX** stands for **JavaScript XML**. It is a syntax extension for ECMAScript that allows writing declarative, markup-like template structures directly within JavaScript code.

### How JSX Works Under the Hood:
- Browsers cannot understand JSX natively.
- Modern compilers (Babel or SWC) transpile JSX into standard JavaScript calls:
  - In React 17+: transpiled into the modern **\`jsx-runtime\`** (\`import { jsx as _jsx } from 'react/jsx-runtime'\`).
  - In legacy React: transpiled into **\`React.createElement(type, props, ...children)\`**.

\`\`\`jsx
// What you write (JSX):
const element = (
  <div id="card" className="highlight">
    <h1>Welcome to React</h1>
    <p>Declarative UI</p>
  </div>
);

// What Babel / SWC transpiles it to:
const transpiledElement = React.createElement(
  "div",
  { id: "card", className: "highlight" },
  React.createElement("h1", null, "Welcome to React"),
  React.createElement("p", null, "Declarative UI")
);
\`\`\`

### The Virtual DOM Object Produced:
\`\`\`javascript
{
  type: 'div',
  props: {
    id: 'card',
    className: 'highlight',
    children: [ /* child React elements */ ]
  },
  $$typeof: Symbol.for('react.element') // Security tag defending against XSS injection
}
\`\`\`

👉 Interview Tip: The hidden \`$$typeof: Symbol.for('react.element')\` property prevents JSON-based Cross-Site Scripting (XSS) attacks because JSON cannot store Symbol primitives.`
  },
  {
    id: 'react-4',
    section: 'react-js',
    number: 4,
    question: 'What is DOM?',
    answer: `The **DOM (Document Object Model)** is the browser's programmatic, language-independent object-oriented tree representation of an HTML or XML document.

### How the Browser Constructs the DOM:
1. **Bytes $\\to$ Characters**: Raw HTML bytes streaming across HTTP are decoded according to encoding (e.g. UTF-8).
2. **Tokens**: Tokens are extracted (\`StartTag: html\`, \`StartTag: body\`, \`EndTag\`).
3. **Nodes**: Tokens are mapped into object instances with properties and rules (\`HTMLDivElement\`, \`HTMLParagraphElement\`).
4. **DOM Tree**: Nodes are assembled into a hierarchical parent-child tree structure.

### Why Direct DOM Manipulation is Expensive:
- Accessing JavaScript properties is fast, but mutating real DOM nodes triggers the browser layout engine's **Reflow (Layout calculation)** and **Repaint** phases.
- If a script updates 100 table cells in a loop without batching, the browser can trigger 100 layout reflows, causing severe UI lag (layout thrashing).`
  },
  {
    id: 'react-5',
    section: 'react-js',
    number: 5,
    question: 'What is Virtual Dom?',
    answer: `The **Virtual DOM (VDOM)** is a lightweight, in-memory tree of plain JavaScript objects that mirrors the structure of the real browser DOM.

### The 3-Step Reconciliation Process:
1. **Generation (Render)**:
   - When a component's state or props change, React invokes the component function to construct a new Virtual DOM tree representing the desired UI.
2. **Diffing**:
   - React compares the newly generated Virtual DOM against the previous Virtual DOM tree using an optimized $\\mathcal{O}(n)$ **heuristic diffing algorithm**.
3. **Reconciliation (Commit)**:
   - React computes the minimal batch of DOM modifications and applies only those specific changes to the real DOM (via \`react-dom\`).

\`\`\`javascript
// Simplified Mental Model of a Virtual DOM Node
const vNode = {
  type: 'button',
  props: {
    className: 'btn-primary',
    onClick: () => handleClick(),
    children: 'Click Me'
  }
};
\`\`\`

👉 Interview Tip: Point out that since React 16, the reconciliation engine is powered by **React Fiber**, which breaks reconciliation work into small units of work called "fibers" that can be paused, prioritized, and resumed without freezing the main UI thread.`
  },
  {
    id: 'react-6',
    section: 'react-js',
    number: 6,
    question: 'What is state in Reactjs?',
    answer: `**State** is a built-in React object that stores dynamic, component-specific data that changes over time in response to user events, network responses, or timers.

### Core Mechanics:
1. **Encapsulated & Private**: State is strictly confined to the component that declares it unless passed explicitly down to children as props.
2. **Triggers Re-renders**: Mutating state via its setter function instructs React that the component's output is out-of-date, triggering a re-render.
3. **Asynchronous & Batched**: React batches multiple state updates occurring in the same event loop tick into a single re-render to maximize performance.

\`\`\`jsx
import { useState } from 'react';

export function UserProfile() {
  const [user, setUser] = useState({ name: 'Alex', status: 'Active' });

  // Always update state IMMUTABLY using functional updates:
  const updateStatus = () => {
    setUser(prevUser => ({
      ...prevUser,
      status: 'Away'
    }));
  };

  return <button onClick={updateStatus}>{user.name}: {user.status}</button>;
}
\`\`\`

📌 Note: **Never mutate state directly** (e.g. \`user.status = "Away"\`). Direct mutations bypass React's change detection and will not trigger a re-render.`
  },
  {
    id: 'react-7',
    section: 'react-js',
    number: 7,
    question: 'What is the purpose of callback function as an argument of setState()?',
    answer: `In React Class Components, \`this.setState(updater, callback)\` accepts an optional second argument: a **callback function** that executes **asynchronously after the state update has been committed to the DOM and the component has re-rendered**.

### Why It Exists:
- Because \`setState\` is asynchronous, inspecting \`this.state\` immediately after calling \`setState()\` reads the old, stale state.
- The callback guarantees that \`this.state\` reflects the updated values and the DOM is fresh.

\`\`\`javascript
// Class Component Pattern
this.setState({ score: this.state.score + 10 }, () => {
  console.log("Updated score confirmed:", this.state.score);
  this.saveScoreToBackend(this.state.score);
});
\`\`\`

### Functional Components Equivalent (\`useEffect\`):
In modern functional components with \`useState\`, there is no callback argument in \`setCount(val)\`. Instead, you use **\`useEffect\`** with the state variable in the dependency array:

\`\`\`jsx
const [score, setScore] = useState(0);

useEffect(() => {
  console.log("Score updated in DOM:", score);
}, [score]); // Fires whenever score changes
\`\`\``
  },
  {
    id: 'react-8',
    section: 'react-js',
    number: 8,
    question: 'What are props?',
    answer: `**Props** (short for properties) are read-only inputs passed from a parent component down to a child component to customize its rendering and behavior.

### Fundamental Rules of Props:
1. **Unidirectional Flow**: Props flow exclusively downward from parent to child.
2. **Immutability (Read-Only)**: A component must **never mutate its own props**. According to React's contract, all components must act like pure functions with respect to their props.
3. **Supports Any Data Type**: Props can accept strings, numbers, objects, arrays, functions (callbacks), and other React elements/JSX (\`children\`).

\`\`\`jsx
// Parent Component passing props
function App() {
  return (
    <Button 
      variant="danger" 
      onClick={() => console.log("Deleted!")}
      disabled={false}
    >
      Delete Account
    </Button>
  );
}

// Child Component consuming and destructuring props
function Button({ variant, onClick, disabled, children }) {
  return (
    <button className={\`btn btn-\${variant}\`} onClick={onClick} disabled={disabled}>
      {children}
    </button>
  );
}
\`\`\``
  },
  {
    id: 'react-9',
    section: 'react-js',
    number: 9,
    question: 'What are the differences between State and Props in react?',
    answer: `| Architectural Criterion | State (\`useState\`) | Props (\`props\`) |
| :--- | :--- | :--- |
| **Ownership** | Internal and local to the declaring component | Received from external parent component |
| **Mutability** | **Mutable** (via setter \`setState\` / \`useState\`) | **Immutable** (Strictly Read-Only) |
| **Origin** | Managed within the component itself | Passed down from above |
| **Triggers Re-render?** | ✅ Yes, when state setter is invoked | ✅ Yes, when parent re-renders and passes fresh props |
| **Purpose** | Holds dynamic, interactive component data | Configures child component behavior & layout |

\`\`\`jsx
// Demonstrating State vs Props
function Parent() {
  // 'theme' is STATE owned by Parent
  const [theme, setTheme] = useState('dark');

  return <Child theme={theme} onToggle={() => setTheme('light')} />;
}

// 'theme' and 'onToggle' are read-only PROPS for Child
function Child({ theme, onToggle }) {
  // Child CANNOT do theme = 'blue'
  return <button onClick={onToggle}>Current Theme: {theme}</button>;
}
\`\`\``
  },
  {
    id: 'react-10',
    section: 'react-js',
    number: 10,
    question: 'What is props drilling?',
    answer: `**Props Drilling** (also referred to as "threading") is an architectural code smell in React where props are passed down through multiple intermediate levels of components that do not need the data themselves, solely to deliver the data to a deeply nested child component.

\`\`\`mermaid
flowchart TD
    App["App (Owns user data)"] --> Nav["Navbar (Does not need user)"]
    Nav --> Profile["ProfileMenu (Does not need user)"]
    Profile --> Avatar["AvatarImage (Actually consumes user.avatarUrl)"]
\`\`\`

\`\`\`jsx
// Prop Drilling Example:
function App() {
  const [user] = useState({ name: "Dan", avatar: "/avatar.png" });
  return <Navbar user={user} />;
}

function Navbar({ user }) {
  return <NavMenu user={user} />; // Just passing it through!
}

function NavMenu({ user }) {
  return <UserBadge user={user} />; // Just passing it through!
}

function UserBadge({ user }) {
  return <img src={user.avatar} alt={user.name} />; // Finally consumed!
}
\`\`\``
  },
  {
    id: 'react-11',
    section: 'react-js',
    number: 11,
    question: 'What are the disadvantages of props drilling and How we can avoid props drilling?',
    answer: `### Disadvantages of Props Drilling:
1. **High Coupling & Fragility**: Refactoring or renaming a prop requires modifying every single intermediate file in the component chain.
2. **Boilerplate Pollution**: Clutters intermediate components with parameters they never use.
3. **Unnecessary Re-renders**: Modifying the prop can force intermediate components to re-evaluate their render functions.

### How to Avoid Props Drilling:
1. **React Context API (\`createContext\` + \`useContext\`)**:
   - Teleports global state (themes, authenticated user, localization) directly to any leaf component without intermediate passing.
2. **Component Composition (\`children\` prop)**:
   - Lift child components up so the top-level parent renders them directly:
\`\`\`jsx
// Composition eliminates drilling without Context:
function App() {
  const [user] = useState({ name: "Dan", avatar: "/avatar.png" });
  return (
    <Navbar>
      <UserBadge avatar={user.avatar} name={user.name} />
    </Navbar>
  );
}

function Navbar({ children }) {
  return <header className="navbar">{children}</header>;
}
\`\`\`
3. **External State Managers**:
   - Zustand, Redux Toolkit, or Jotai for complex global application state.`
  },
  {
    id: 'react-12',
    section: 'react-js',
    number: 12,
    question: 'What is useReducer hook?',
    answer: `The **\`useReducer\`** hook is an alternative state management hook to \`useState\` that manages complex state transitions using the Redux-style reducer pattern:
$$\\text{NewState} = \\text{reducer}(\\text{CurrentState}, \\text{Action})$$

### When to Prefer \`useReducer\` over \`useState\`:
1. When state has multiple sub-values (e.g. complex form or game state).
2. When the next state depends on multiple previous state variables.
3. When state transitions follow specific domain actions (\`FETCH_START\`, \`FETCH_SUCCESS\`, \`FETCH_ERROR\`).

\`\`\`jsx
import { useReducer } from 'react';

const initialState = { count: 0, step: 1 };

function counterReducer(state, action) {
  switch (action.type) {
    case 'increment':
      return { ...state, count: state.count + state.step };
    case 'decrement':
      return { ...state, count: state.count - state.step };
    case 'setStep':
      return { ...state, step: action.payload };
    case 'reset':
      return initialState;
    default:
      throw new Error(\`Unhandled action type: \${action.type}\`);
  }
}

export function CounterWidget() {
  const [state, dispatch] = useReducer(counterReducer, initialState);

  return (
    <div>
      <h3>Count: {state.count}</h3>
      <button onClick={() => dispatch({ type: 'increment' })}>+</button>
      <button onClick={() => dispatch({ type: 'decrement' })}>-</button>
      <button onClick={() => dispatch({ type: 'setStep', payload: 5 })}>Step 5</button>
      <button onClick={() => dispatch({ type: 'reset' })}>Reset</button>
    </div>
  );
}
\`\`\``
  },
  {
    id: 'react-13',
    section: 'react-js',
    number: 13,
    question: 'What is useMemo?',
    answer: `The **\`useMemo\`** hook memoizes the **computed return value** of an expensive calculation between component re-renders, recalculating only when specified dependencies change.

### Syntax & Mental Model:
\`\`\`jsx
const memoizedValue = useMemo(() => computeExpensiveCalculation(a, b), [a, b]);
\`\`\`

### Real-World Use-Case: Filtering 10,000 Products
\`\`\`jsx
import { useState, useMemo } from 'react';

export function ProductList({ products }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [theme, setTheme] = useState('light'); // Independent state

  // Without useMemo, this heavy O(N) filter would re-run whenever 'theme' changes!
  const filteredProducts = useMemo(() => {
    console.log("Filtering products list...");
    return products.filter(p => p.name.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [products, searchTerm]); // Only recomputes when products or searchTerm changes

  return (
    <div>
      <input value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
      <button onClick={() => setTheme(t => t === 'light' ? 'dark' : 'light')}>Toggle Theme</button>
      <ul>{filteredProducts.map(p => <li key={p.id}>{p.name}</li>)}</ul>
    </div>
  );
}
\`\`\`

📌 Note: **Do not overuse \`useMemo\`**. Memoization introduces memory overhead (caching the closure and dependency array). Only use it for genuinely expensive calculations or when preserving referential equality for child components.`
  },
  {
    id: 'react-14',
    section: 'react-js',
    number: 14,
    question: 'What is useCallback?',
    answer: `The **\`useCallback\`** hook memoizes a **function definition reference** between component re-renders, returning the same cached function pointer unless its dependencies change.

### Why It Is Needed:
- In JavaScript, \`function() {}\` creates a brand new memory reference on every render.
- When passing callbacks to child components wrapped in \`React.memo\`, passing a new function reference causes the child to fail shallow prop equality and re-render unnecessarily.

\`\`\`jsx
import { useState, useCallback, memo } from 'react';

// Child component wrapped in React.memo (skips re-render if props are identical)
const DeleteButton = memo(({ onDelete, id }) => {
  console.log("Rendering DeleteButton ID:", id);
  return <button onClick={() => onDelete(id)}>Delete</button>;
});

export function ItemManager() {
  const [items, setItems] = useState([1, 2, 3]);
  const [counter, setCounter] = useState(0);

  // Memoize callback: preserves exact same function reference across renders
  const handleDelete = useCallback((id) => {
    setItems(prevItems => prevItems.filter(item => item !== id));
  }, []); // Empty deps: function identity is permanent

  return (
    <div>
      <button onClick={() => setCounter(c => c + 1)}>Counter: {counter}</button>
      {items.map(id => (
        <DeleteButton key={id} id={id} onDelete={handleDelete} />
      ))}
    </div>
  );
}
\`\`\``
  },
  {
    id: 'react-15',
    section: 'react-js',
    number: 15,
    question: 'What are the differences between useMemo and useCallback?',
    answer: `| Feature | \`useMemo\` | \`useCallback\` |
| :--- | :--- | :--- |
| **What It Caches** | The **return value** of a function | The **function instance itself** |
| **Invocation** | **Invokes the function** during render to compute value | **Does not invoke** the function; returns the function reference |
| **Syntax Equivalence** | \`useMemo(() => fn, deps)\` | \`useCallback(fn, deps)\` is equivalent to \`useMemo(() => fn, deps)\` |
| **Primary Use-Case** | Expensive algorithmic computations, stable object configs | Passing stable callback props to memoized child components (\`React.memo\`) |

\`\`\`javascript
// The exact mathematical relationship:
useCallback(fn, deps);
// is identical to:
useMemo(() => fn, deps);
\`\`\``
  },
  {
    id: 'react-16',
    section: 'react-js',
    number: 16,
    question: 'Which lifecycle hooks in class component are replaced with useEffect in functional components?',
    answer: `The \`useEffect\` hook unifies the three traditional class lifecycle methods into a single, declarative API:

### 1. \`componentDidMount\` (Runs Once on Initial Render):
\`\`\`jsx
// Empty dependency array: runs strictly once after first DOM paint
useEffect(() => {
  console.log("Mounted! Fetching initial API data...");
}, []);
\`\`\`

### 2. \`componentDidUpdate\` (Runs on State / Prop Mutations):
\`\`\`jsx
// Dependency array with variables: runs whenever userId changes
useEffect(() => {
  console.log("userId updated, fetching new profile:", userId);
}, [userId]);
\`\`\`

### 3. \`componentWillUnmount\` (Cleanup Phase):
\`\`\`jsx
// Return a cleanup function: runs when component unmounts or before re-running effect
useEffect(() => {
  const socket = new WebSocket("wss://api.example.com/feed");
  
  return () => {
    console.log("Unmounting! Closing socket connection...");
    socket.close();
  };
}, []);
\`\`\``
  },
  {
    id: 'react-17',
    section: 'react-js',
    number: 17,
    question: 'What is component life cycle of React class component?',
    answer: `A React Class Component progresses through **3 primary phases**:

### 1. Mounting Phase (Component Inserted into DOM):
1. **\`constructor(props)\`**: Initialize state and bind event handlers.
2. **\`static getDerivedStateFromProps(props, state)\`**: Sync state based on prop changes.
3. **\`render()\`**: Returns JSX elements (pure, no side effects).
4. **\`componentDidMount()\`**: DOM is ready; initiate network requests, timers, DOM event listeners.

### 2. Updating Phase (Triggered by new props, setState, or forceUpdate):
1. **\`static getDerivedStateFromProps(props, state)\`**
2. **\`shouldComponentUpdate(nextProps, nextState)\`**: Returns boolean to optimize re-renders.
3. **\`render()\`**
4. **\`getSnapshotBeforeUpdate(prevProps, prevState)\`**: Captures scroll position before DOM mutation.
5. **\`componentDidUpdate(prevProps, prevState, snapshot)\`**: Execute side effects post-update.

### 3. Unmounting Phase (Component Removed from DOM):
1. **\`componentWillUnmount()\`**: Cleanup timers, unsubscribe from stores, detach event listeners to prevent memory leaks.`
  },
  {
    id: 'react-18',
    section: 'react-js',
    number: 18,
    question: 'What are keys in React?',
    answer: `A **\`key\`** is a special string attribute that must be provided when rendering lists of elements in React.

### Why Keys Are Critical for the Diffing Algorithm:
- When React diffs an old list with a new list, it uses keys to match children in the original tree with children in the subsequent tree.
- Without keys (or using array indices), inserting an item at the beginning of a list forces React to mutate every single existing DOM node rather than simply inserting 1 node.

\`\`\`jsx
// Good: Unique, stable ID key
{users.map(user => (
  <UserCard key={user.id} user={user} />
))}

// Anti-pattern: Using array index as key
{users.map((user, index) => (
  <UserCard key={index} user={user} /> // BUGGY during sorting, deleting, or reordering!
))}
\`\`\`

👉 Interview Tip: Using array index as a key leads to subtle UI bugs: uncontrolled component state (like text input contents or checkboxes) will stay attached to the wrong item when elements are deleted or reordered.`
  },
  {
    id: 'react-19',
    section: 'react-js',
    number: 19,
    question: 'What are fragments in react?',
    answer: `**React Fragments** allow grouping a list of child elements without adding an extra wrapping DOM node (like a redundant \`<div>\`) to the generated HTML document.

### Syntax Variations:
\`\`\`jsx
// 1. Short Syntax:
export function ItemList() {
  return (
    <>
      <li>Item 1</li>
      <li>Item 2</li>
    </>
  );
}

// 2. Explicit Syntax (Required when passing keys in mapped loops):
{items.map(item => (
  <React.Fragment key={item.id}>
    <dt>{item.term}</dt>
    <dd>{item.description}</dd>
  </React.Fragment>
))}
\`\`\`

### Benefits:
- Keeps the DOM tree shallow and clean.
- Preserves CSS layout integrity (prevents extra \`div\` wrappers from breaking CSS Flexbox or CSS Grid parent-child relationships).`
  },
  {
    id: 'react-20',
    section: 'react-js',
    number: 20,
    question: 'What are Pure components in React?',
    answer: `A **Pure Component** is a component that skips re-rendering if its new props and state are shallowly equal to its previous props and state.

### Implementations:
1. **Class Components**: Extend **\`React.PureComponent\`** (automatically implements \`shouldComponentUpdate\` with shallow comparison).
2. **Functional Components**: Wrap the component in **\`React.memo()\`**.

\`\`\`jsx
import React, { memo } from 'react';

// Re-renders ONLY if props 'title' or 'count' change by reference
export const StatCard = memo(function StatCard({ title, count }) {
  console.log("Rendering StatCard:", title);
  return (
    <div className="stat-card">
      <h4>{title}</h4>
      <p>{count}</p>
    </div>
  );
});
\`\`\`

📌 Note: Shallow comparison checks primitive equality (\`prev === next\`) and object reference equality. If you pass an inline object or function (e.g. \`style={{ margin: 0 }}\` or \`onClick={() => {}}\`), shallow equality fails and the pure component re-renders anyway!`
  },
  {
    id: 'react-21',
    section: 'react-js',
    number: 21,
    question: 'What are the differences between controlled and uncontrolled components?',
    answer: `| Feature | Controlled Component | Uncontrolled Component |
| :--- | :--- | :--- |
| **Source of Truth** | **React State** (\`useState\` / \`useReducer\`) | **Native DOM** (\`HTMLInputElement\`) |
| **Value Management** | Passed via \`value={state}\` with \`onChange\` | Accessed on-demand via **\`ref.current.value\`** |
| **Instant Validation** | Easy (validates on every keystroke) | Difficult (validates only on form submit) |
| **Predictability** | High; pure React data flow | Lower; directly mutates DOM |

\`\`\`jsx
// 1. Controlled Component (React drives value)
function ControlledInput() {
  const [val, setVal] = useState("");
  return <input value={val} onChange={e => setVal(e.target.value)} />;
}

// 2. Uncontrolled Component (DOM drives value)
function UncontrolledInput() {
  const inputRef = useRef(null);
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Value:", inputRef.current.value);
  };
  return (
    <form onSubmit={handleSubmit}>
      <input ref={inputRef} defaultValue="Initial text" />
      <button type="submit">Submit</button>
    </form>
  );
}
\`\`\``
  },
  {
    id: 'react-22',
    section: 'react-js',
    number: 22,
    question: 'What are Ref’s in React?',
    answer: `The **\`useRef\`** hook creates a mutable container object with a single \`.current\` property that persists across renders.

### The 2 Distinct Uses of Refs:
1. **Accessing Native DOM Elements Directly**:
   - For managing focus, scrolling, video playback, or calculating bounding dimensions.
2. **Storing Mutable Values Without Causing Re-renders**:
   - Unlike \`useState\`, mutating \`ref.current = newValue\` **does not trigger a component re-render**.
   - Ideal for storing timer IDs, previous prop values, or tracking mount status.

\`\`\`jsx
import { useRef, useEffect } from 'react';

export function AutoFocusSearch() {
  const inputRef = useRef(null);
  const renderCount = useRef(0);

  renderCount.current++; // Tracks renders silently without causing an infinite re-render loop!

  useEffect(() => {
    inputRef.current.focus(); // Focus native DOM node on mount
  }, []);

  return <input ref={inputRef} placeholder="Search documentation..." />;
}
\`\`\``
  },
  {
    id: 'react-23',
    section: 'react-js',
    number: 23,
    question: 'What is meant by forward ref?',
    answer: `By default, custom React components do not accept the native \`ref\` prop; passing a \`ref\` to a custom component returns \`undefined\` or warns in the console.

**\`React.forwardRef()\`** allows a parent component to pass an incoming \`ref\` through a child component directly down to a native child DOM node.

\`\`\`jsx
import { forwardRef, useRef } from 'react';

// Child component forwarding ref to native input
const CustomInput = forwardRef((props, ref) => {
  return <input ref={ref} className="custom-input-field" {...props} />;
});

// Parent passing ref
export function FormWrapper() {
  const inputRef = useRef(null);

  const handleFocus = () => {
    inputRef.current.focus();
  };

  return (
    <div>
      <CustomInput ref={inputRef} placeholder="Enter email" />
      <button onClick={handleFocus}>Focus Input</button>
    </div>
  );
}
\`\`\`

👉 Interview Tip: In **React 19**, \`ref\` is now a standard prop on functional components, meaning \`forwardRef\` is gradually being deprecated in favor of direct \`function MyInput({ ref, ...props })\`.`
  },
  {
    id: 'react-24',
    section: 'react-js',
    number: 24,
    question: 'What are Error boundaries?',
    answer: `An **Error Boundary** is a specialized React Class Component that catches JavaScript runtime errors anywhere in its child component tree during rendering, lifecycle methods, and constructors, logging the error and displaying a declarative fallback UI instead of crashing the entire React app into a blank white screen.

### The 2 Lifecycle Methods:
1. **\`static getDerivedStateFromError(error)\`**: Updates component state to render a fallback UI.
2. **\`componentDidCatch(error, errorInfo)\`**: Logs error diagnostics to monitoring services (e.g. Sentry, Datadog).

\`\`\`jsx
import React, { Component } from 'react';

export class ErrorBoundary extends Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }

  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }

  componentDidCatch(error, errorInfo) {
    console.error("ErrorBoundary caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="error-fallback">
          <h2>Something went wrong.</h2>
          <button onClick={() => this.setState({ hasError: false })}>Try Again</button>
        </div>
      );
    }
    return this.props.children;
  }
}
\`\`\`

📌 Note: **What Error Boundaries DO NOT Catch**:
1. Errors inside Event Handlers (use standard \`try...catch\` instead).
2. Asynchronous code (\`setTimeout\`, \`requestAnimationFrame\`).
3. Server-Side Rendering (SSR) errors.
4. Errors thrown inside the Error Boundary component itself.`
  },
  {
    id: 'react-25',
    section: 'react-js',
    number: 25,
    question: 'What are Higher order components in react?',
    answer: `A **Higher-Order Component (HOC)** is an advanced design pattern in React derived from functional programming: it is a pure function that takes a component as an argument and returns a new, enhanced component:
$$\\text{EnhancedComponent} = \\text{withHOC}(\\text{OriginalComponent})$$

\`\`\`jsx
// HOC: withAuthentication
function withAuthentication(WrappedComponent) {
  return function AuthenticatedComponent(props) {
    const isAuthenticated = checkAuthToken();

    if (!isAuthenticated) {
      return <div className="redirect">Please log in to view this content.</div>;
    }

    return <WrappedComponent {...props} userRole="Admin" />;
  };
}

// Usage:
const AdminDashboard = ({ userRole }) => <h1>Welcome, {userRole}</h1>;
export default withAuthentication(AdminDashboard);
\`\`\`

👉 Interview Tip: While HOCs were popular in early React, modern React codebases favor **Custom Hooks** for stateful logic reuse, which avoid deeply nested component wrappers ("wrapper hell").`
  },
  {
    id: 'react-26',
    section: 'react-js',
    number: 26,
    question: 'What is Lazy loading in React?',
    answer: `**Lazy Loading** via **\`React.lazy()\`** enables dynamic code-splitting by importing components on-demand asynchronously only when they are about to be rendered, rather than bundling them into the initial main JavaScript bundle.

### Benefits:
- Significantly decreases the initial bundle size.
- Dramatically accelerates **First Contentful Paint (FCP)** and **Time to Interactive (TTI)**.

\`\`\`jsx
import { lazy, Suspense } from 'react';

// Asynchronously split components into separate bundle chunks
const HeavyChart = lazy(() => import('./HeavyAnalyticsChart'));
const SettingsModal = lazy(() => import('./SettingsModal'));

export function Dashboard() {
  return (
    <div>
      <h2>Analytics Hub</h2>
      <Suspense fallback={<div className="spinner">Loading Visuals...</div>}>
        <HeavyChart />
      </Suspense>
    </div>
  );
}
\`\`\``
  },
  {
    id: 'react-27',
    section: 'react-js',
    number: 27,
    question: 'What is suspense in React?',
    answer: `**\`<Suspense>\`** is a built-in React component that lets you orchestrate and display a fallback UI (such as a loading spinner or skeleton placeholder) until its child components have finished an asynchronous operation (such as lazy code downloading or concurrent data fetching).

\`\`\`jsx
<Suspense fallback={<SkeletonLoader count={5} />}>
  <UserProfileDetails userId={123} />
</Suspense>
\`\`\`

### How Suspense Works Under the Hood:
- If a child component initiates an asynchronous task, it **throws a Promise**.
- The nearest parent \`<Suspense>\` boundary catches the thrown Promise, suspends rendering of the child, and displays the \`fallback\` prop.
- Once the Promise resolves, React re-renders the suspended subtree with the completed data.`
  },
  {
    id: 'react-28',
    section: 'react-js',
    number: 28,
    question: 'What are custom hooks?',
    answer: `A **Custom Hook** is a JavaScript function whose name starts with **\`use\`** (e.g. \`useWindowSize\`, \`useFetch\`, \`useDebounce\`) that can call other built-in React hooks to encapsulate and share reusable, stateful logic across multiple components.

\`\`\`jsx
// Custom Hook: useLocalStorage
import { useState, useEffect } from 'react';

export function useLocalStorage(key, initialValue) {
  const [storedValue, setStoredValue] = useState(() => {
    try {
      const item = localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(storedValue));
    } catch (err) {
      console.error("Storage error:", err);
    }
  }, [key, storedValue]);

  return [storedValue, setStoredValue];
}

// Consuming custom hook in component:
function ThemeSelector() {
  const [theme, setTheme] = useLocalStorage("app_theme", "dark");
  return <button onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}>{theme}</button>;
}
\`\`\``
  },
  {
    id: 'react-29',
    section: 'react-js',
    number: 29,
    question: 'What is context api in react?',
    answer: `The **Context API** is a built-in React mechanism designed to share global data (such as current user session, UI theme, language preferences, or cart state) across the entire component tree without having to manually thread props through intermediate components.

### Core Architecture:
1. **\`createContext(defaultValue)\`**: Defines a new Context object.
2. **\`<Context.Provider value={...}>\`**: Wraps the component tree to provide the active value.
3. **\`useContext(Context)\`**: Hook called by any descendant component to read the current context value.`
  },
  {
    id: 'react-30',
    section: 'react-js',
    number: 30,
    question: 'Give an example of context api usage?',
    answer: `\`\`\`jsx
import React, { createContext, useContext, useState } from 'react';

// 1. Create Context
const ThemeContext = createContext();

// 2. Provider Component
export function ThemeProvider({ children }) {
  const [theme, setTheme] = useState('dark');
  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

// 3. Custom Consumer Hook
export const useTheme = () => useContext(ThemeContext);

// 4. Deeply Nested Consumer Component
function NavButton() {
  const { theme, toggleTheme } = useTheme();
  return (
    <button onClick={toggleTheme} className={\`btn-\${theme}\`}>
      Switch Theme (Active: {theme})
    </button>
  );
}
\`\`\`

👉 Interview Tip: Whenever Context value changes, **all components calling \`useContext\` re-render**. To optimize performance, separate rarely changing data (like user auth) from frequently updating data into distinct providers.`
  },
  {
    id: 'react-31',
    section: 'react-js',
    number: 31,
    question: 'What is Strict mode in react?',
    answer: `**\`<React.StrictMode>\`** is a development-only tool that highlights potential bugs, deprecated APIs, and unintended side effects in your application. It produces no visible UI and has zero impact on production builds.

### What Strict Mode Does in React 18 & 19:
1. **Double-Invokes Effects**: Automatically mounts, unmounts, and re-mounts components in development (\`mount -> cleanup -> mount\`) to verify that your \`useEffect\` cleanup logic correctly prevents memory leaks.
2. **Double-Invokes Render Functions**: Runs component functions and state updaters twice to detect impure side-effects during the render phase.
3. **Warns About Deprecated APIs**: Highlights legacy string refs, \`findDOMNode\`, or deprecated lifecycle methods.`
  },
  {
    id: 'react-32',
    section: 'react-js',
    number: 32,
    question: 'What are the different ways to pass data from child component to parent component in react?',
    answer: `In React's unidirectional architecture, children communicate upward to parents through 4 established patterns:

1. **Callback Functions via Props (Standard Approach)**:
   - The parent passes a function prop (e.g. \`onSave\`), and the child invokes it with arguments.
2. **Shared State via Context API**:
   - The parent exposes a state setter via Context; the child calls it.
3. **Mutable Refs (\`useRef\`)**:
   - The parent passes a \`ref\` object, and the child updates \`ref.current\`.
4. **\`useImperativeHandle\` + \`forwardRef\`**:
   - The child exposes specific public API methods (like \`resetForm()\`) to the parent.
5. **Global State Stores** (Zustand / Redux).`
  },
  {
    id: 'react-33',
    section: 'react-js',
    number: 33,
    question: 'How do you optimize your react application?',
    answer: `Senior frontend performance optimization strategies for React:

### 1. Bundle Size & Loading Performance:
- **Route-Based Code Splitting**: Using \`React.lazy\` and \`Suspense\`.
- **Tree-Shaking**: Import named exports directly (\`import { debounce } from 'lodash-es'\`).
- **Asset Optimization**: Serve AVIF/WebP images with \`loading="lazy"\` and explicit aspect ratios.

### 2. Runtime & Rendering Optimization:
- **List Virtualization**: Render only visible items using **\`react-window\`** or **\`react-virtualized\`** for arrays with thousands of rows.
- **Memoization**: Protect pure components from re-renders using \`React.memo\`, \`useMemo\`, and \`useCallback\`.
- **Concurrent Transitions**: Use **\`useTransition()\`** to mark heavy filter updates as non-blocking background transitions.
- **Avoid Anonymous Inline Functions in Loops**: \`onClick={() => doSomething(id)}\` creates new references; pass \`id\` via \`data-id\` or memoized handlers.

### 3. State Architecture Optimization:
- **Colocate State**: Keep state as close as possible to where it is used (don't dump everything into global Context).`
  },
  {
    id: 'react-34',
    section: 'react-js',
    number: 34,
    question: 'What are Portals in react?',
    answer: `**React Portals** (\`ReactDOM.createPortal(children, domNode)\`) allow rendering a child component into a completely different DOM node outside the parent component's DOM hierarchy, while retaining full React event bubbling behavior.

\`\`\`jsx
import ReactDOM from 'react-dom';

export function ModalPortal({ isOpen, children, onClose }) {
  if (!isOpen) return null;

  // Mounts directly to document.body or a dedicated #modal-root div
  return ReactDOM.createPortal(
    <div className="modal-backdrop" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        {children}
      </div>
    </div>,
    document.getElementById("modal-root") || document.body
  );
}
\`\`\`

👉 Interview Tip: Crucially, events fired inside a Portal **still bubble up the React tree** (not the DOM tree), allowing parents to catch events from modals with standard \`onClick\` listeners!`
  },
  {
    id: 'react-35',
    section: 'react-js',
    number: 35,
    question: 'What are synthetic events in react?',
    answer: `A **\`SyntheticEvent\`** is React's cross-browser wrapper around the browser's native DOM event.

### Why React Uses Synthetic Events:
1. **Cross-Browser Consistency**: Normalizes quirks across Chromium, WebKit, and Gecko engines so event properties behave identically.
2. **Unified Event System**: React delegates events to the root container node (\`#root\` in React 17+) rather than attaching individual listeners to every single DOM element.
3. Access the underlying native browser event anytime via **\`e.nativeEvent\`**.`
  },
  {
    id: 'react-36',
    section: 'react-js',
    number: 36,
    question: 'What are the difference between Package.json and Package.lock.json',
    answer: `| Feature | \`package.json\` | \`package-lock.json\` |
| :--- | :--- | :--- |
| **Purpose** | High-level project manifest defining dependencies and scripts | Locks the **exact, deterministic dependency tree** |
| **Version Format** | Uses SemVer ranges (\`^18.2.0\`, \`~1.5.0\`) | Exact pinned version hashes (\`"18.2.0"\`, integrity sha512) |
| **Transitive Dependencies** | Only lists direct project dependencies | Lists all direct **and nested sub-dependencies** |
| **Team Consistency** | Running \`npm install\` can resolve different patch versions | Guarantees identical installations on all machines & CI/CD |`
  },
  {
    id: 'react-37',
    section: 'react-js',
    number: 37,
    question: 'What are the differences between client side and server side rendering',
    answer: `| Criterion | Client-Side Rendering (CSR - Plain React / Vite) | Server-Side Rendering (SSR - Next.js / Remix) |
| :--- | :--- | :--- |
| **Initial HTML** | Empty skeleton (\`<div id="root"></div>\`) | **Fully populated HTML markup** generated by server |
| **SEO & Crawlers** | Weaker (search bots must execute JS to see content) | **Superior** (bots receive fully populated HTML immediately) |
| **Initial Load (FCP / LCP)** | Slower on mobile networks (waits for heavy JS bundle) | **Fast initial paint**; interactive after hydration |
| **Server Workload** | Low (static CDN asset delivery) | Higher (server CPU computes HTML per request) |`
  },
  {
    id: 'react-38',
    section: 'react-js',
    number: 38,
    question: 'What is react-router ?',
    answer: `**React Router** is the standard routing library for React applications that enables dynamic, client-side routing without triggering full browser page reloads.

\`\`\`jsx
import { BrowserRouter, Routes, Route, Link, Outlet } from 'react-router-dom';

function App() {
  return (
    <BrowserRouter>
      <nav>
        <Link to="/">Home</Link> | <Link to="/dashboard">Dashboard</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<DashboardLayout />}>
          <Route path="analytics" element={<AnalyticsView />} />
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}
\`\`\``
  },
  {
    id: 'react-39',
    section: 'react-js',
    number: 39,
    question: 'What are protected routes in react ?',
    answer: `A **Protected Route** is an authentication wrapper component that verifies if the user is authenticated before granting access to a child route view, redirecting unauthorized users to \`/login\`.

\`\`\`jsx
import { Navigate, Outlet, useLocation } from 'react-router-dom';

export function ProtectedRoute({ isAuthenticated }) {
  const location = useLocation();

  if (!isAuthenticated) {
    // Redirect to /login while preserving original requested URL in state
    return <Navigate to="/login" replace state={{ from: location }} />;
  }

  // Render child route views
  return <Outlet />;
}

// App configuration:
// <Route element={<ProtectedRoute isAuthenticated={userToken !== null} />}>
//   <Route path="/account" element={<AccountPage />} />
// </Route>
\`\`\``
  },
  {
    id: 'react-40',
    section: 'react-js',
    number: 40,
    question: 'What is the difference between useEffect and useLayoutEffect ?',
    answer: `| Feature | \`useEffect\` | \`useLayoutEffect\` |
| :--- | :--- | :--- |
| **Timing** | **Asynchronous**: Runs **AFTER** the browser paints pixels to screen | **Synchronous**: Runs **BEFORE** the browser paints pixels |
| **Blocks Painting?** | ❌ No (Non-blocking, optimal for performance) | ✅ **Yes** (Blocks screen paint until execution completes) |
| **Primary Use-Case** | Data fetching, subscriptions, timers, logging | **DOM layout measurements** (\`getBoundingClientRect\`), scroll positioning |
| **Visual Flicker** | Can cause visual flicker if mutating DOM dimensions | **Prevents visual flicker** by applying styles before paint |

\`\`\`jsx
import { useLayoutEffect, useRef, useState } from 'react';

export function TooltipPositioner() {
  const boxRef = useRef(null);
  const [tooltipTop, setTooltipTop] = useState(0);

  // useLayoutEffect guarantees calculation occurs BEFORE user sees layout
  useLayoutEffect(() => {
    const rect = boxRef.current.getBoundingClientRect();
    setTooltipTop(rect.bottom + 8);
  }, []);

  return <div ref={boxRef}>Target Element</div>;
}
\`\`\``
  },
  {
    id: 'react-41',
    section: 'react-js',
    number: 41,
    question: 'Practical question: How to send data from child to parent using callback functions ?',
    answer: `\`\`\`jsx
import { useState } from 'react';

// Parent Component
export function OrderDashboard() {
  const [selectedItem, setSelectedItem] = useState(null);

  return (
    <div>
      <h2>Selected: {selectedItem ? selectedItem.name : "None"}</h2>
      {/* Pass callback function prop down to Child */}
      <ProductSelector onSelectProduct={(item) => setSelectedItem(item)} />
    </div>
  );
}

// Child Component
function ProductSelector({ onSelectProduct }) {
  const products = [
    { id: 1, name: "Mechanical Keyboard", price: 120 },
    { id: 2, name: "Ergonomic Mouse", price: 80 }
  ];

  return (
    <div>
      {products.map(p => (
        <button key={p.id} onClick={() => onSelectProduct(p)}>
          Choose {p.name}
        </button>
      ))}
    </div>
  );
}
\`\`\``
  },
  {
    id: 'react-42',
    section: 'react-js',
    number: 42,
    question: 'Practical question: How to send the data from child component to parent using useRef ?',
    answer: `Expose child state or helper methods to the parent using **\`useImperativeHandle\`** combined with **\`forwardRef\`**:

\`\`\`jsx
import { useRef, useImperativeHandle, forwardRef } from 'react';

// Child component exposing specific API methods to parent
const SearchInput = forwardRef((props, ref) => {
  const inputRef = useRef(null);

  useImperativeHandle(ref, () => ({
    getSearchValue: () => inputRef.current.value,
    clearInput: () => { inputRef.current.value = ""; },
    focusInput: () => { inputRef.current.focus(); }
  }));

  return <input ref={inputRef} placeholder="Type query..." />;
});

// Parent Component
export function SearchParent() {
  const searchComponentRef = useRef(null);

  const handleInspectChild = () => {
    // Call methods exposed by child:
    const query = searchComponentRef.current.getSearchValue();
    console.log("Extracted from child via ref:", query);
    searchComponentRef.current.clearInput();
  };

  return (
    <div>
      <SearchInput ref={searchComponentRef} />
      <button onClick={handleInspectChild}>Read & Clear Child</button>
    </div>
  );
}
\`\`\``
  },
  {
    id: 'react-43',
    section: 'react-js',
    number: 43,
    question: 'Practical question: Create a increment decrement counter using useReducer hook in react ?',
    answer: `\`\`\`jsx
import { useReducer } from 'react';

const initialState = { count: 0 };

function counterReducer(state, action) {
  switch (action.type) {
    case 'INCREMENT':
      return { count: state.count + 1 };
    case 'DECREMENT':
      return { count: Math.max(0, state.count - 1) }; // Guard against negatives
    case 'RESET':
      return initialState;
    default:
      return state;
  }
}

export function ReducerCounter() {
  const [state, dispatch] = useReducer(counterReducer, initialState);

  return (
    <div className="counter-card">
      <h2>Count: {state.count}</h2>
      <div className="btn-group">
        <button onClick={() => dispatch({ type: 'DECREMENT' })}>-</button>
        <button onClick={() => dispatch({ type: 'RESET' })}>Reset</button>
        <button onClick={() => dispatch({ type: 'INCREMENT' })}>+</button>
      </div>
    </div>
  );
}
\`\`\``
  },
  {
    id: 'react-44',
    section: 'react-js',
    number: 44,
    question: 'Practical question: create a custom hook for increment/decrement counter ?',
    answer: `\`\`\`jsx
import { useState, useCallback } from 'react';

// Custom Hook: useCounter
export function useCounter(initialValue = 0, { min = -Infinity, max = Infinity, step = 1 } = {}) {
  const [count, setCount] = useState(initialValue);

  const increment = useCallback(() => {
    setCount(c => Math.min(max, c + step));
  }, [max, step]);

  const decrement = useCallback(() => {
    setCount(c => Math.max(min, c - step));
  }, [min, step]);

  const reset = useCallback(() => {
    setCount(initialValue);
  }, [initialValue]);

  return { count, increment, decrement, reset, setCount };
}

// Consuming Component:
export function CounterExample() {
  const { count, increment, decrement, reset } = useCounter(10, { min: 0, max: 20 });

  return (
    <div>
      <p>Counter: {count}</p>
      <button onClick={decrement}>-</button>
      <button onClick={reset}>Reset</button>
      <button onClick={increment}>+</button>
    </div>
  );
}
\`\`\``
  },
  {
    id: 'react-45',
    section: 'react-js',
    number: 45,
    question: 'Machine coding question: Dynamic checkbox counter',
    answer: `Implements multi-checkbox select with "Select All" master checkbox and live selected tally:

\`\`\`jsx
import { useState } from 'react';

const INITIAL_ITEMS = [
  { id: 1, label: "React", checked: false },
  { id: 2, label: "TypeScript", checked: false },
  { id: 3, label: "Vite", checked: false },
  { id: 4, label: "Tailwind CSS", checked: false }
];

export function DynamicCheckboxCounter() {
  const [items, setItems] = useState(INITIAL_ITEMS);

  const allSelected = items.length > 0 && items.every(item => item.checked);
  const selectedCount = items.filter(item => item.checked).length;

  const toggleAll = () => {
    setItems(items.map(item => ({ ...item, checked: !allSelected })));
  };

  const toggleSingle = (id) => {
    setItems(items.map(item => 
      item.id === id ? { ...item, checked: !item.checked } : item
    ));
  };

  return (
    <div className="checkbox-widget">
      <h3>Selected: {selectedCount} / {items.length}</h3>
      <label>
        <input type="checkbox" checked={allSelected} onChange={toggleAll} />
        <strong>Select All</strong>
      </label>
      <hr />
      {items.map(item => (
        <div key={item.id}>
          <label>
            <input 
              type="checkbox" 
              checked={item.checked} 
              onChange={() => toggleSingle(item.id)} 
            />
            {item.label}
          </label>
        </div>
      ))}
    </div>
  );
}
\`\`\``
  },
  {
    id: 'react-46',
    section: 'react-js',
    number: 46,
    question: 'Create nested circles based on user input',
    answer: `Recursive React component rendering concentric nested circles:

\`\`\`jsx
import { useState } from 'react';

function ConcentricCircle({ depth, maxDepth }) {
  if (depth > maxDepth) return null;

  const size = (maxDepth - depth + 1) * 40; // Diameter in pixels

  return (
    <div
      style={{
        width: \`\${size}px\`,
        height: \`\${size}px\`,
        borderRadius: '50%',
        border: '2px solid #3b82f6',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: depth % 2 === 0 ? '#eff6ff' : '#dbeafe',
        transition: 'all 0.3s ease'
      }}
    >
      <ConcentricCircle depth={depth + 1} maxDepth={maxDepth} />
    </div>
  );
}

export function NestedCirclesWidget() {
  const [numCircles, setNumCircles] = useState(5);

  return (
    <div>
      <label>
        Number of Circles: {numCircles}
        <input 
          type="range" 
          min="1" 
          max="10" 
          value={numCircles} 
          onChange={e => setNumCircles(Number(e.target.value))} 
        />
      </label>
      <div style={{ display: 'flex', justifyContent: 'center', padding: '24px' }}>
        <ConcentricCircle depth={1} maxDepth={numCircles} />
      </div>
    </div>
  );
}
\`\`\``
  },
  {
    id: 'react-47',
    section: 'react-js',
    number: 47,
    question: 'What are the various design patterns in react ?',
    answer: `Essential enterprise design patterns in modern React:

1. **Compound Component Pattern**: Components share implicit state (e.g. \`<Tabs><Tabs.List /><Tabs.Panel /></Tabs>\`).
2. **Custom Hooks Pattern**: Extracts reusable stateful logic into pure composable functions.
3. **Container / Presentational Pattern**: Decouples data-fetching business logic from pure UI rendering markup.
4. **Render Props Pattern**: Component receives a function returning JSX to share dynamic behavior.
5. **Higher-Order Component (HOC) Pattern**: Function enhancing components with cross-cutting concerns.
6. **Provider Pattern**: Centralizes shared global context across subtrees.`
  },
  {
    id: 'react-48',
    section: 'react-js',
    number: 48,
    question: 'What is compound pattern ?',
    answer: `The **Compound Component Pattern** allows multiple related components to collaborate together sharing implicit state via an internal Context provider, providing an expressive, declarative API similar to native HTML \`<select>\` and \`<option>\`.

\`\`\`jsx
import React, { createContext, useContext, useState } from 'react';

const ToggleContext = createContext();

export function Toggle({ children, onToggle }) {
  const [on, setOn] = useState(false);
  const toggle = () => {
    setOn(prev => {
      onToggle?.(!prev);
      return !prev;
    });
  };

  return (
    <ToggleContext.Provider value={{ on, toggle }}>
      <div className="toggle-wrapper">{children}</div>
    </ToggleContext.Provider>
  );
}

Toggle.On = function ToggleOn({ children }) {
  const { on } = useContext(ToggleContext);
  return on ? children : null;
};

Toggle.Off = function ToggleOff({ children }) {
  const { on } = useContext(ToggleContext);
  return on ? null : children;
};

Toggle.Button = function ToggleButton() {
  const { on, toggle } = useContext(ToggleContext);
  return <button onClick={toggle}>{on ? "Turn OFF" : "Turn ON"}</button>;
};

// Usage (Extremely readable & flexible):
export function App() {
  return (
    <Toggle onToggle={state => console.log("State:", state)}>
      <Toggle.On>💡 The light is shining bright!</Toggle.On>
      <Toggle.Off>🌑 The room is dark.</Toggle.Off>
      <Toggle.Button />
    </Toggle>
  );
}
\`\`\``
  },
  {
    id: 'react-49',
    section: 'react-js',
    number: 49,
    question: 'What is render props pattern ?',
    answer: `The **Render Props Pattern** is a technique where a component accepts a function that returns a React element as a prop, delegating its rendering logic to the consumer while providing internal state.

\`\`\`jsx
import { useState, useEffect } from 'react';

// Reusable Mouse Tracker Component
export function MouseTracker({ render }) {
  const [coords, setCoords] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMove = (e) => setCoords({ x: e.clientX, y: e.clientY });
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  return render(coords);
}

// Consumer Component:
export function ViewportCoordinates() {
  return (
    <MouseTracker 
      render={({ x, y }) => (
        <h3>Current Cursor: X: {x}, Y: {y}</h3>
      )} 
    />
  );
}
\`\`\``
  },
  {
    id: 'react-50',
    section: 'react-js',
    number: 50,
    question: 'What is Container/Presentational pattern ?',
    answer: `The **Container / Presentational Pattern** (popularized by Dan Abramov) splits components into two distinct layers:

1. **Container Component**:
   - Manages state, side effects, API fetching, and business logic.
   - Contains no markup or styling other than passing data down.
2. **Presentational Component**:
   - Pure UI component. Receives data and callbacks strictly via props.
   - Contains styling, HTML structure, and zero stateful business logic.

\`\`\`jsx
// 1. Presentational Component (Dumb / Pure)
function UserListView({ users, isLoading, onSelect }) {
  if (isLoading) return <p>Loading users...</p>;
  return (
    <ul>
      {users.map(u => (
        <li key={u.id} onClick={() => onSelect(u.id)}>{u.name}</li>
      ))}
    </ul>
  );
}

// 2. Container Component (Smart / Stateful)
export function UserListContainer() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/users")
      .then(r => r.json())
      .then(data => { setUsers(data); setLoading(false); });
  }, []);

  return <UserListView users={users} isLoading={loading} onSelect={id => console.log(id)} />;
}
\`\`\``
  },
  {
    id: 'react-51',
    section: 'react-js',
    number: 51,
    question: 'What is React.memo ?',
    answer: `**\`React.memo\`** is a Higher-Order Component that wraps a functional component to optimize rendering performance by memoizing its rendered output, skipping re-renders when incoming props are shallowly equal to previous props.

\`\`\`jsx
import React, { memo } from 'react';

// Custom comparison function (Optional 2nd argument)
function arePropsEqual(prevProps, nextProps) {
  return prevProps.userId === nextProps.userId && prevProps.theme === nextProps.theme;
}

export const UserCard = memo(function UserCard({ userId, name, theme }) {
  console.log("Rendering UserCard for ID:", userId);
  return (
    <div className={\`card-\${theme}\`}>
      <h4>{name}</h4>
    </div>
  );
}, arePropsEqual);
\`\`\`

👉 Interview Tip: Don't wrap every component in \`React.memo\`. The shallow prop comparison itself incurs computational cost. Only use it for components that render frequently with identical props or have expensive subtrees.`
  },
  {
    id: 'react-52',
    section: 'react-js',
    number: 52,
    question: 'Differences between dependencies and devdependencies ?',
    answer: `In \`package.json\`, packages are classified into runtime and development dependencies:

| Criterion | \`dependencies\` | \`devDependencies\` |
| :--- | :--- | :--- |
| **Purpose** | Required for application to **run in production** | Required **only during local development, testing & building** |
| **Installation Flag** | \`npm install <pkg>\` | \`npm install --save-dev <pkg>\` (\`-D\`) |
| **Production Build** | Shipped to runtime / bundled into client code | Stripped out; not included in production runtime |
| **Examples** | \`react\`, \`react-dom\`, \`react-router-dom\`, \`zustand\` | \`vite\`, \`eslint\`, \`typescript\`, \`prettier\`, \`vitest\` |

\`\`\`bash
# Installing runtime package:
npm install axios

# Installing development tooling:
npm install -D tailwindcss @types/react
\`\`\``
  }
];
