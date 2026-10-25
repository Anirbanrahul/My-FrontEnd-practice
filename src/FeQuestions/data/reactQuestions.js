// 52 React.js Interview Questions & Answers (from Saikrishna Nangunuri Ebook)

export const REACT_QUESTIONS = [
  {
    id: 'react-1',
    section: 'react-js',
    number: 1,
    question: 'What is React?',
    answer: `React is an open-source, component-based JavaScript library developed by Meta (Facebook) used for building interactive, efficient, and dynamic user interfaces.`
  },
  {
    id: 'react-2',
    section: 'react-js',
    number: 2,
    question: 'What are the features of React?',
    answer: `1. **JSX**: Syntax extension combining HTML structure with JavaScript logic.
2. **Virtual DOM**: In-memory lightweight representation of the real DOM for fast reconciliation.
3. **One-Way Data Binding**: Unidirectional data flow from parent to child components via props.
4. **Reusable Components**: Component-driven architecture promoting modularity.
5. **Server-Side Rendering (SSR)**: Supported via frameworks like Next.js for SEO and performance.`
  },
  {
    id: 'react-3',
    section: 'react-js',
    number: 3,
    question: 'What is JSX?',
    answer: `JSX stands for **JavaScript XML**. It allows writing HTML-like markup inside JavaScript files. JSX is transpiled by Babel into \`React.createElement()\` calls.`
  },
  {
    id: 'react-4',
    section: 'react-js',
    number: 4,
    question: 'What is DOM?',
    answer: `DOM (**Document Object Model**) is a tree-like structural representation of an HTML document created by the browser, allowing scripts to inspect and manipulate page structure and styles.`
  },
  {
    id: 'react-5',
    section: 'react-js',
    number: 5,
    question: 'What is Virtual Dom?',
    answer: `The Virtual DOM is a lightweight copy of the real DOM kept in memory.
When component state or props change:
1. A new Virtual DOM tree is generated.
2. React computes the difference (**Diffing Algorithm**) between the new and old Virtual DOM.
3. React batches minimal updates and applies only the changes to the real DOM (**Reconciliation**).`
  },
  {
    id: 'react-6',
    section: 'react-js',
    number: 6,
    question: 'What is state in Reactjs?',
    answer: `State is a built-in React object used to store data specific to a component that can change over time. When state updates, React automatically triggers a re-render of the component.
\`\`\`javascript
const [message, setMessage] = useState("Welcome React");
\`\`\``
  },
  {
    id: 'react-7',
    section: 'react-js',
    number: 7,
    question: 'What is the purpose of callback function as an argument of setState()?',
    answer: `In class components, \`this.setState(updater, callback)\` executes the callback function asynchronously **after** the state update has been committed and the component has re-rendered.`
  },
  {
    id: 'react-8',
    section: 'react-js',
    number: 8,
    question: 'What are props?',
    answer: `Props (short for properties) are read-only inputs passed from a parent component to a child component to customize its rendering and behavior. Props are **immutable**.`
  },
  {
    id: 'react-9',
    section: 'react-js',
    number: 9,
    question: 'What are the differences between State and Props in react?',
    answer: `| Feature | State | Props |
|---|---|---|
| Ownership | Internal to the component | Passed from parent component |
| Mutability | Mutable (via \`setState\` / \`useState\`) | Immutable (Read-only) |
| Cause Re-render? | Yes | Yes (when parent passes updated props) |`
  },
  {
    id: 'react-10',
    section: 'react-js',
    number: 10,
    question: 'What is props drilling?',
    answer: `Props drilling is the process of passing props down through multiple layers of intermediate components that do not need the data themselves, just to reach a deeply nested child component.`
  },
  {
    id: 'react-11',
    section: 'react-js',
    number: 11,
    question: 'What are the disadvantages of props drilling and How we can avoid props drilling?',
    answer: `**Disadvantages**: Increased code complexity, reduced maintainability, performance overhead from unnecessary intermediate re-renders.
**Solutions**: Use **React Context API**, **Redux**, **Zustand**, or **Component Composition**.`
  },
  {
    id: 'react-12',
    section: 'react-js',
    number: 12,
    question: 'What is useReducer hook?',
    answer: `\`useReducer\` is an alternative to \`useState\` for managing complex state logic involving multiple sub-values or state transitions based on dispatched actions.
\`\`\`javascript
const [state, dispatch] = useReducer(reducer, initialState);
\`\`\``
  },
  {
    id: 'react-13',
    section: 'react-js',
    number: 13,
    question: 'What is useMemo?',
    answer: `\`useMemo\` is a performance optimization hook used to memoize the **computed result** of an expensive calculation across component re-renders.
\`\`\`javascript
const cachedVal = useMemo(() => computeExpensiveValue(a, b), [a, b]);
\`\`\``
  },
  {
    id: 'react-14',
    section: 'react-js',
    number: 14,
    question: 'What is useCallback?',
    answer: `\`useCallback\` is a performance optimization hook used to memoize a **function definition** between re-renders, preventing child components wrapped in \`React.memo\` from re-rendering due to new function references.`
  },
  {
    id: 'react-15',
    section: 'react-js',
    number: 15,
    question: 'What are the differences between useMemo and useCallback?',
    answer: `- **\`useMemo\`**: Caches the **return value** of a function call.
- **\`useCallback\`**: Caches the **function instance** itself.`
  },
  {
    id: 'react-16',
    section: 'react-js',
    number: 16,
    question: 'Which lifecycle hooks in class component are replaced with useEffect in functional components?',
    answer: `1. \`componentDidMount()\`: \`useEffect(() => { ... }, [])\` (empty dependency array).
2. \`componentDidUpdate()\`: \`useEffect(() => { ... }, [dep1, dep2])\` (with dependencies).
3. \`componentWillUnmount()\`: \`useEffect(() => { return () => { /* cleanup */ }; }, [])\` (return cleanup function).`
  },
  {
    id: 'react-17',
    section: 'react-js',
    number: 17,
    question: 'What is component life cycle of React class component?',
    answer: `1. **Mounting**: \`constructor\` -> \`static getDerivedStateFromProps\` -> \`render\` -> \`componentDidMount\`.
2. **Updating**: \`getDerivedStateFromProps\` -> \`shouldComponentUpdate\` -> \`render\` -> \`getSnapshotBeforeUpdate\` -> \`componentDidUpdate\`.
3. **Unmounting**: \`componentWillUnmount\`.`
  },
  {
    id: 'react-18',
    section: 'react-js',
    number: 18,
    question: 'What are keys in React?',
    answer: `Keys are special string attributes used when rendering lists of elements. Keys help React identify which items have changed, been added, or removed during Reconciliation.`
  },
  {
    id: 'react-19',
    section: 'react-js',
    number: 19,
    question: 'What are fragments in react?',
    answer: `React Fragments (\`<React.Fragment>\` or \`<>\...</>\`) group multiple children elements without adding an extra node wrapper to the DOM.`
  },
  {
    id: 'react-20',
    section: 'react-js',
    number: 20,
    question: 'What are Pure components in React?',
    answer: `A Pure Component (\`React.PureComponent\` or \`React.memo\`) performs a shallow comparison of props and state before rendering, preventing re-renders if props/state haven't changed.`
  },
  {
    id: 'react-21',
    section: 'react-js',
    number: 21,
    question: 'What are the differences between controlled and uncontrolled components?',
    answer: `- **Controlled**: Input value is managed by React state (\`value={state}\` + \`onChange\`). React is single source of truth.
- **Uncontrolled**: Input value is managed directly by the DOM tree (\`useRef()\`).`
  },
  {
    id: 'react-22',
    section: 'react-js',
    number: 22,
    question: 'What are Ref’s in React?',
    answer: `Refs (\`useRef\`) provide a way to access underlying DOM nodes directly or store mutable values that persist across renders without triggering a re-render.`
  },
  {
    id: 'react-23',
    section: 'react-js',
    number: 23,
    question: 'What is meant by forward ref?',
    answer: `\`React.forwardRef()\` allows a component to pass an incoming \`ref\` down to one of its child DOM elements.`
  },
  {
    id: 'react-24',
    section: 'react-js',
    number: 24,
    question: 'What are Error boundaries?',
    answer: `Error boundaries are class components that implement \`static getDerivedStateFromError()\` or \`componentDidCatch()\` to catch JavaScript errors anywhere in their child component tree and display a fallback UI.`
  },
  {
    id: 'react-25',
    section: 'react-js',
    number: 25,
    question: 'What are Higher order components in react?',
    answer: `A Higher-Order Component (HOC) is a pure function that takes a component as an argument and returns a new enhanced component (\`const EnhancedComp = withHOC(OriginalComp)\`).`
  },
  {
    id: 'react-26',
    section: 'react-js',
    number: 26,
    question: 'What is Lazy loading in React?',
    answer: `Lazy loading (\`React.lazy()\`) dynamically imports components only when they are needed, splitting JS bundles to improve initial load time.`
  },
  {
    id: 'react-27',
    section: 'react-js',
    number: 27,
    question: 'What is suspense in React?',
    answer: `\`<Suspense fallback={<Spinner />}>\` wraps lazy-loaded components to render a fallback loading indicator while waiting for the component code to download.`
  },
  {
    id: 'react-28',
    section: 'react-js',
    number: 28,
    question: 'What are custom hooks?',
    answer: `Custom hooks are reusable JavaScript functions whose names start with \`use\` and can call other React hooks to extract and share stateful logic across components.`
  },
  {
    id: 'react-29',
    section: 'react-js',
    number: 29,
    question: 'What is context api in react?',
    answer: `Context API provides a way to share data globally across the component tree without passing props manually down through every level.`
  },
  {
    id: 'react-30',
    section: 'react-js',
    number: 30,
    question: 'Give an example of context api usage?',
    answer: `\`\`\`javascript
const UserContext = createContext();
function App() {
  return (
    <UserContext.Provider value={{ name: 'Alice' }}>
      <Child />
    </UserContext.Provider>
  );
}
function Child() {
  const user = useContext(UserContext);
  return <h1>{user.name}</h1>;
}
\`\`\``
  },
  {
    id: 'react-31',
    section: 'react-js',
    number: 31,
    question: 'What is Strict mode in react?',
    answer: `\`<React.StrictMode>\` is a development helper tool that highlights potential problems (deprecated APIs, side effects, double-invoking effects in React 18).`
  },
  {
    id: 'react-32',
    section: 'react-js',
    number: 32,
    question: 'What are the different ways to pass data from child component to parent component in react?',
    answer: `1. **Callback Function**: Parent passes callback prop \`onData(data)\`, child invokes it.
2. **Context API**: Child updates shared context state.
3. **\`useRef\`**: Parent passes ref object to child.
4. **State Management**: Redux/Zustand global actions.`
  },
  {
    id: 'react-33',
    section: 'react-js',
    number: 33,
    question: 'How do you optimize your react application?',
    answer: `- Code splitting & Lazy loading (\`React.lazy\`, \`Suspense\`)
- Memoization (\`React.memo\`, \`useMemo\`, \`useCallback\`)
- List Virtualization (\`react-window\`)
- Stable key props for mapped lists
- CDN delivery & asset compression
- Avoiding inline functions in JSX render loops`
  },
  {
    id: 'react-34',
    section: 'react-js',
    number: 34,
    question: 'What are Portals in react?',
    answer: `\`ReactDOM.createPortal(child, container)\` renders a DOM element outside the DOM hierarchy of the parent component (useful for modals, tooltips, toasts).`
  },
  {
    id: 'react-35',
    section: 'react-js',
    number: 35,
    question: 'What are synthetic events in react?',
    answer: `SyntheticEvent is React's cross-browser wrapper around native browser events providing a unified interface across all browsers.`
  },
  {
    id: 'react-36',
    section: 'react-js',
    number: 36,
    question: 'What are the difference between Package.json and Package.lock.json',
    answer: `- **\`package.json\`**: Defines project dependencies with version specifiers (\`^\`, \`~\`).
- **\`package-lock.json\`**: Locks exact resolved version tree for deterministic builds.`
  },
  {
    id: 'react-37',
    section: 'react-js',
    number: 37,
    question: 'What are the differences between client side and server side rendering',
    answer: `- **CSR**: HTML skeleton sent to browser; JS renders page on client (slower initial load, fast transitions).
- **SSR**: Server compiles and renders full HTML per request (faster LCP, superior SEO).`
  },
  {
    id: 'react-38',
    section: 'react-js',
    number: 38,
    question: 'What is react-router ?',
    answer: `Standard routing library for React providing client-side navigation between views without full page reloads (\`<BrowserRouter>\`, \`<Routes>\`, \`<Route>\`, \`<Link>\`).`
  },
  {
    id: 'react-39',
    section: 'react-js',
    number: 39,
    question: 'What are protected routes in react ?',
    answer: `Wrapper routes checking authentication token/role before rendering protected view components, redirecting unauthenticated users to \`/login\`.`
  },
  {
    id: 'react-40',
    section: 'react-js',
    number: 40,
    question: 'What is the difference between useEffect and useLayoutEffect ?',
    answer: `- **\`useEffect\`**: Runs asynchronously **after** browser DOM paint (non-blocking).
- **\`useLayoutEffect\`**: Runs synchronously **before** browser paint (for DOM measurements to avoid visual flickers).`
  },
  {
    id: 'react-41',
    section: 'react-js',
    number: 41,
    question: 'Practical question: How to send data from child to parent using callback functions ?',
    answer: `\`\`\`javascript
function Parent() {
  const [data, setData] = useState('');
  return <Child onSend={(val) => setData(val)} />;
}
function Child({ onSend }) {
  return <button onClick={() => onSend("Hello Parent")}>Send</button>;
}
\`\`\``
  },
  {
    id: 'react-42',
    section: 'react-js',
    number: 42,
    question: 'Practical question: How to send the data from child component to parent using useRef ?',
    answer: `Pass a \`ref\` object as prop to child component; child attaches values to \`ref.current\` on change.`
  },
  {
    id: 'react-43',
    section: 'react-js',
    number: 43,
    question: 'Practical question: Create a increment decrement counter using useReducer hook in react ?',
    answer: `\`\`\`javascript
const reducer = (state, action) => {
  switch (action.type) {
    case 'inc': return { count: state.count + 1 };
    case 'dec': return { count: state.count - 1 };
    default: return state;
  }
};
function Counter() {
  const [state, dispatch] = useReducer(reducer, { count: 0 });
  return (
    <div>
      <span>{state.count}</span>
      <button onClick={() => dispatch({ type: 'inc' })}>+</button>
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
    answer: `\`\`\`javascript
function useCounter(initial = 0) {
  const [count, setCount] = useState(initial);
  const inc = () => setCount(c => c + 1);
  const dec = () => setCount(c => c - 1);
  return { count, inc, dec };
}
\`\`\``
  },
  {
    id: 'react-45',
    section: 'react-js',
    number: 45,
    question: 'Machine coding question: Dynamic checkbox counter',
    answer: `Manage checkbox state list \`[{ id, label, checked }]\`. Implement \`handleSelectAll\` toggling all checkboxes and disabling button when all selected.`
  },
  {
    id: 'react-46',
    section: 'react-js',
    number: 46,
    question: 'Create nested circles based on user input',
    answer: `Recursive \`<Circle numbCircles={n} />\` component rendering a \`div\` styled with \`width: n*100px\`, returning \`<Circle numbCircles={n-1} />\` inside itself.`
  },
  {
    id: 'react-47',
    section: 'react-js',
    number: 47,
    question: 'What are the various design patterns in react ?',
    answer: `1. Compound Component Pattern
2. Higher-Order Component (HOC) Pattern
3. Render Props Pattern
4. Container / Presentational Pattern
5. Custom Hooks Pattern`
  },
  {
    id: 'react-48',
    section: 'react-js',
    number: 48,
    question: 'What is compound pattern ?',
    answer: `Design pattern where multiple components work together sharing implicit state via Context (e.g. \`<Select><Select.Option /></Select>\`).`
  },
  {
    id: 'react-49',
    section: 'react-js',
    number: 49,
    question: 'What is render props pattern ?',
    answer: `Component receives a function prop returning JSX (\`<DataProvider render={data => <View data={data} />} />\`).`
  },
  {
    id: 'react-50',
    section: 'react-js',
    number: 50,
    question: 'What is Container/Presentational pattern ?',
    answer: `Separates data fetching/business logic (Container) from purely UI rendering markup (Presentational).`
  },
  {
    id: 'react-51',
    section: 'react-js',
    number: 51,
    question: 'What is React.memo ?',
    answer: `Higher-order component for functional components that memoizes rendered output, skipping re-renders when props don't change.`
  },
  {
    id: 'react-52',
    section: 'react-js',
    number: 52,
    question: 'Differences between dependencies and devdependencies ?',
    answer: `- **\`dependencies\`**: Required for production application runtime.
- **\`devDependencies\`**: Required only during development & build testing (e.g. Jest, ESLint, Vite).`
  }
];
