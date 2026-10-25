// 12 Additional Real-World Interview Q&As (Virtual DOM, Routing, Pagination, JWT Security, Redux Cart, useMemo vs useCallback, Media Queries, Redux Middleware)

export const ADDITIONAL_REACT_QUESTIONS = [
  {
    id: 'react-53',
    section: 'react-js',
    number: 53,
    question: 'Is Virtual DOM active during build/deployment or only at runtime?',
    answer: `**Question:**
I have a header, content, and footer. I built the application and sent it to the server. Later, I changed something in the content, built it again, and sent it to the server. Will Virtual DOM work in this scenario? If not, when does Virtual DOM work?

**Answer:**
Yes, but we need to understand that the **Virtual DOM works at runtime in the browser**, not during the build or deployment process.

1. When you build your React application, the source code (JSX/JS) is compiled into browser-readable JavaScript, CSS, and HTML assets for server deployment.
2. When the browser loads the React application, React initializes the **Virtual DOM tree in memory**.
3. Whenever state or props change during user interaction, React generates a new Virtual DOM tree, performs a diffing comparison against the previous tree, and batches updates to the real DOM (**Reconciliation**).

**Code Example:**
\`\`\`javascript
function App() {
  const [count, setCount] = useState(0);

  return (
    <>
      <h1>Hello</h1>
      <p>{count}</p>
      <button onClick={() => setCount(count + 1)}>
        Increment
      </button>
    </>
  );
}
\`\`\`

**Runtime Reconciliation Flow:**
- State changes (\`setCount\`)
- Component re-renders
- New Virtual DOM tree generated in memory
- React Diffing algorithm compares old & new Virtual DOM
- Minimal real DOM patch applied

💡 **Key Takeaway:** Build/deployment bundles code assets, while the Virtual DOM is a runtime mechanism in the browser.`
  },
  {
    id: 'react-54',
    section: 'react-js',
    number: 54,
    question: "What happens when a user opens root URL '/' if only '/home' and '/product' routes exist?",
    answer: `**Question:**
I have only two paths configured: \`/home\` and \`/product\`. If I open \`localhost:3000/\`, what will I see in the UI?

**Answer:**
It depends on how your routing is configured in React Router.

If routes are defined without a root \`/\` match:
\`\`\`javascript
<Routes>
  <Route path="/home" element={<Home />} />
  <Route path="/product" element={<Product />} />
</Routes>
\`\`\`

Visiting \`localhost:3000/\` will not match any route, resulting in either a **blank screen** or an unhandled route state.

**Solutions to handle root URL \`/\`:**

1. **Automatic Redirect to \`/home\`:**
\`\`\`javascript
<Routes>
  <Route path="/" element={<Navigate to="/home" replace />} />
  <Route path="/home" element={<Home />} />
  <Route path="/product" element={<Product />} />
</Routes>
\`\`\`

2. **Wildcard 404 Not Found Page:**
\`\`\`javascript
<Route path="*" element={<NotFound />} />
\`\`\`

📌 **Flow with Redirect:**
\`localhost:3000/\` ➔ \`<Navigate to="/home" />\` ➔ \`/home\` ➔ Renders \`<Home />\` component.`
  },
  {
    id: 'react-55',
    section: 'react-js',
    number: 55,
    question: 'How to handle JWT authentication & Payment Page security? Is storing JWT in localStorage safe?',
    answer: `**Question:**
I logged in and received a JWT from the API response. If I have the JWT, should I allow the user to access the payment page? How would you implement it? Is storing the JWT directly in localStorage a good approach?

**Answer:**
Protecting a sensitive route like \`/payment\` requires both frontend route guards and backend authentication verification.

1. **Frontend Route Protection:**
\`\`\`javascript
<Route
  path="/payment"
  element={
    isAuthenticated ? <Payment /> : <Navigate to="/login" replace />
  }
/>
\`\`\`

2. **Backend Security Layer (Critical):**
Never rely solely on frontend state. The backend must verify the authorization header/session token on every API call before executing payment transactions.

3. **Is storing JWT in \`localStorage\` safe?**
- Storing raw JWTs in \`localStorage\` exposes them to **XSS (Cross-Site Scripting)** attacks because any injected JavaScript code can access \`localStorage.getItem('jwt')\`.
- Simply encoding the JWT with \`btoa(jwt)\` is NOT security — Base64 is encoding, not encryption!

📌 **Recommended Industry Practice:**
Use **Secure, HttpOnly, SameSite Cookies** issued by the server. HttpOnly cookies cannot be accessed by client-side JavaScript scripts, protecting the token against XSS attacks.`
  },
  {
    id: 'react-56',
    section: 'react-js',
    number: 56,
    question: 'What happens to Redux state on page refresh? How to persist cart items?',
    answer: `**Question:**
I have products, and when I click "Add to Cart", I want to add the product to the cart. How will you implement this using Redux? If I add two products and refresh the page, what will happen?

**Answer:**
1. **Redux Cart Slice Implementation:**
\`\`\`javascript
const cartSlice = createSlice({
  name: "cart",
  initialState: { items: [] },
  reducers: {
    addToCart: (state, action) => {
      state.items.push(action.payload);
    },
    removeFromCart: (state, action) => {
      state.items = state.items.filter(item => item.id !== action.payload);
    }
  }
});
\`\`\`

2. **Dispatching & Selecting Cart Items:**
\`\`\`javascript
const dispatch = useDispatch();
const cartItems = useSelector(state => state.cart.items);

const handleAddToCart = (product) => {
  dispatch(addToCart(product));
};
\`\`\`

3. **What happens on browser refresh?**
Redux state is stored **in-memory** in JavaScript variable space. Upon page refresh, the entire application script reloads, causing the Redux store to recreate with its \`initialState\` — losing all cart items!

📌 **Solutions to Persist State:**
- **\`redux-persist\` library**: Automatically syncs selected Redux slices with \`localStorage\` or \`sessionStorage\`.
- **Manual rehydration**: Save to \`localStorage\` on cart update and load into initial state.
- **Server-Side Persistence**: For authenticated e-commerce apps, store cart items in the database via API so the cart persists across devices and sessions.`
  },
  {
    id: 'react-57',
    section: 'react-js',
    number: 57,
    question: 'What is the difference between useMemo and useCallback? How to memoize functions?',
    answer: `**Question:**
What is the difference between \`useMemo\` and \`useCallback\`? How do you memoize functions?

**Answer:**
Both \`useMemo\` and \`useCallback\` are React hooks used for performance optimization through memoization.

1. **\`useMemo\`**: Memoizes the **result value** of a calculation.
\`\`\`javascript
const memoizedValue = useMemo(() => {
  return computeExpensiveValue(data);
}, [data]);
\`\`\`
*Recomputed only when dependencies in the array change.*

2. **\`useCallback\`**: Memoizes a **function instance reference**.
\`\`\`javascript
const handleClick = useCallback(() => {
  console.log("Button clicked");
}, [dependency]);
\`\`\`
*Prevents child components wrapped in \`React.memo\` from re-rendering due to new function reference creation on parent render.*

⚡ **Quick Rule of Thumb:**
- \`useMemo\` ➔ Memoizes a **Value**
- \`useCallback\` ➔ Memoizes a **Function Reference**`
  },
  {
    id: 'react-58',
    section: 'react-js',
    number: 58,
    question: 'Does Virtual DOM work when props change? Explain with an example.',
    answer: `**Question:**
Does Virtual DOM work when props change? Explain with an example.

**Answer:**
Yes! Virtual DOM reconciliation triggers whenever a component re-renders — whether caused by **state updates, prop changes, or context changes**.

**Code Example:**
\`\`\`javascript
function Parent() {
  const [name, setName] = useState("John");
  return (
    <div>
      <Child name={name} />
      <button onClick={() => setName("Alex")}>Change Name</button>
    </div>
  );
}

function Child({ name }) {
  return <h1>Hello {name}</h1>;
}
\`\`\`

**Reconciliation Step-by-Step:**
1. Initial render: \`name = "John"\` ➔ Real DOM displays \`Hello John\`.
2. Button click triggers \`setName("Alex")\`.
3. \`Parent\` re-renders, passing updated prop \`name="Alex"\` to \`Child\`.
4. \`Child\` re-renders, creating a new Virtual DOM tree containing \`Hello Alex\`.
5. React compares the new Virtual DOM (\`Hello Alex\`) with the old Virtual DOM (\`Hello John\`).
6. React identifies that only the inner text node changed and updates **only that specific text node** in the real DOM.

📌 **Summary:** Virtual DOM diffing applies to any UI change in React regardless of whether the trigger is state, props, or context.`
  },
  {
    id: 'react-59',
    section: 'react-js',
    number: 59,
    question: 'Why use Redux Middleware? What is Redux Thunk? Can we use alternatives besides Thunk & Saga?',
    answer: `**Question:**
Why is middleware used in Redux? Why do we use Thunk? What is Thunk? Can we use anything else as middleware apart from Thunk and Saga?

**Answer:**
1. **Why Redux Middleware?**
Redux middleware intercepts dispatched actions **between dispatch and the reducer**. It handles side-effects such as API fetching, logging, analytics, and action transformation.

\`\`\`
dispatch(action) ➔ Middleware ➔ Reducer ➔ Store Updated
\`\`\`

2. **What is Redux Thunk?**
Standard Redux dispatches plain Javascript objects (\`{ type: 'ADD' }\`). **Redux Thunk** allows dispatching **functions** instead of plain objects, enabling asynchronous logic inside actions.

\`\`\`javascript
const fetchProducts = () => async (dispatch) => {
  dispatch({ type: "FETCH_START" });
  try {
    const res = await fetch("/api/products");
    const data = await res.json();
    dispatch({ type: "FETCH_SUCCESS", payload: data });
  } catch (err) {
    dispatch({ type: "FETCH_ERROR", payload: err.message });
  }
};
\`\`\`

3. **Middleware Alternatives:**
- **Redux Thunk** (Default in Redux Toolkit)
- **Redux Saga** (Uses ES6 Generator functions \`function*\`)
- **Redux Observable** (Uses RxJS Observables)
- **RTK Query** (Modern built-in data fetching solution in Redux Toolkit)
- **Custom Middleware**:
\`\`\`javascript
const logger = store => next => action => {
  console.log("Dispatching:", action);
  return next(action);
};
\`\`\``
  }
];

export const ADDITIONAL_PS_QUESTIONS = [
  {
    id: 'js-ps-28',
    section: 'js-problem-solving',
    number: 28,
    question: 'How to implement client-side array pagination logic for 20 items (4 items per page)?',
    answer: `**Question:**
I have 20 data items and I need to display 4 items on each page. What will be the logic? What parameters do I need? Suppose I click on page 3. What will happen?

**Answer:**
Pagination requires two primary parameters:
1. \`currentPage\` (1-indexed page number)
2. \`itemsPerPage\` (number of items per view)

**Formula & Calculation:**
\`\`\`javascript
const items = Array.from({ length: 20 }, (_, i) => \`Item \${i + 1}\`);
const currentPage = 3;
const itemsPerPage = 4;

// Calculate total pages
const totalPages = Math.ceil(items.length / itemsPerPage); // Math.ceil(20 / 4) = 5

// Calculate starting index
const startIndex = (currentPage - 1) * itemsPerPage; // (3 - 1) * 4 = 8

// Extract page slice
const pageData = items.slice(startIndex, startIndex + itemsPerPage); // items.slice(8, 12)
console.log(pageData); // Items 9, 10, 11, 12
\`\`\`

**API-based Pagination Parameters:**
When fetching from a server API, pass query parameters:
\`\`\`javascript
// Request: /api/products?page=3&limit=4
fetch('/api/products?page=' + currentPage + '&limit=' + itemsPerPage);
\`\`\`

⚡ **Result for Page 3:** Extract items from index 8 to 11 (displaying items 9 to 12).`
  },
  {
    id: 'js-ps-29',
    section: 'js-problem-solving',
    number: 29,
    question: 'How to remove duplicate values from an array using the spread operator and Set?',
    answer: `**Question:**
How can you remove duplicate values using the spread operator?

**Answer:**
Combine the ES6 \`Set\` data structure with the Spread operator (\`...\`).

**Primitive Array Example:**
\`\`\`javascript
const arr = [1, 2, 2, 3, 4, 4, 5];

const uniqueArr = [...new Set(arr)];

console.log(uniqueArr); // Output: [1, 2, 3, 4, 5]
\`\`\`

**How it works:**
1. \`new Set(arr)\` creates a Set containing only unique values.
2. \`[...Set]\` uses the spread operator to expand Set values back into a new array.

📌 **Important Note for Objects:**
\`Set\` does NOT eliminate duplicate objects by property values because objects are compared by memory reference (\`{}\` !== \`{}\`). For array of objects, use \`filter()\` or \`Map()\`:
\`\`\`javascript
const users = [{ id: 1 }, { id: 1 }, { id: 2 }];
const uniqueUsers = Array.from(new Set(users.map(u => u.id)))
  .map(id => users.find(u => u.id === id));
\`\`\``
  }
];

export const ADDITIONAL_OUTPUT_QUESTIONS = [
  {
    id: 'output-51',
    section: 'js-output',
    number: 51,
    question: 'What is the output of console.log(6 + "5" + "6") in JavaScript?',
    answer: `**Question:**
\`\`\`javascript
console.log(6 + "5" + "6");
\`\`\`
What will be the output?

**Answer:**
Output: \`"656"\`

**Step-by-Step Evaluation:**
JavaScript evaluates addition operators (\`+\`) from **left to right**.

1. **Step 1:** Evaluate \`6 + "5"\`
   - Numeric \`6\` is paired with string \`"5"\`.
   - JavaScript performs implicit type coercion, converting \`6\` to string \`"6"\`.
   - String concatenation occurs: \`"6" + "5"\` ➔ \`"65"\`.

2. **Step 2:** Evaluate \`"65" + "6"\`
   - String \`"65"\` concatenated with string \`"6"\`.
   - Result: \`"656"\`.

⚡ **Comparison Examples:**
\`\`\`javascript
console.log(6 + 5 + "6");   // "116" (6+5=11, then 11+"6"="116")
console.log(6 + "5" + 6);   // "656"
console.log("6" + 5 + 6);   // "656"
\`\`\``
  }
];

export const ADDITIONAL_CSS_QUESTIONS = [
  {
    id: 'css-41',
    section: 'css',
    number: 41,
    question: 'How to center an image in a div using Flexbox? Why use height: 100vh?',
    answer: `**Question:**
I have a \`div\` and an image. I want to display the image in the middle of the UI. How will you do it? And why do you use \`height: 100vh\` with Flexbox?

**Answer:**
**Flexbox Implementation:**
\`\`\`css
.container {
  display: flex;
  justify-content: center; /* Horizontally center */
  align-items: center;     /* Vertically center */
  height: 100vh;           /* Take full viewport height */
}
\`\`\`

\`\`\`html
<div class="container">
  <img src="image.jpg" alt="Centered Image" />
</div>
\`\`\`

**Why use \`height: 100vh\`?**
- By default, block containers take \`height: auto\` (only as tall as their content).
- Without setting container height, vertical centering (\`align-items: center\`) has no effect because there is no extra vertical height to center within!
- \`100vh\` sets container height to 100% of Viewport Height, providing full vertical space for perfect screen centering.`
  },
  {
    id: 'css-42',
    section: 'css',
    number: 42,
    question: 'How to display a box ONLY on tablet screens and hide it on mobile & desktop?',
    answer: `**Question:**
I have a box. I want it hidden on mobile and desktop, and visible only on tablet. How will you implement it?

**Answer:**
Hide the box by default, then enable it inside a specific tablet viewport media query range.

**CSS Implementation:**
\`\`\`css
/* Hidden by default on Mobile (< 768px) and Desktop (>= 1024px) */
.box {
  display: none;
}

/* Shown only in Tablet Viewport Range (768px to 1023px) */
@media (min-width: 768px) and (max-width: 1023px) {
  .box {
    display: block;
  }
}
\`\`\`

**Why \`display: none\` over \`visibility: hidden\`?**
- \`display: none\`: Removes element completely from layout flow (occupies 0 space).
- \`visibility: hidden\`: Hides element visually but leaves an empty blank box space in the DOM layout!`
  }
];
