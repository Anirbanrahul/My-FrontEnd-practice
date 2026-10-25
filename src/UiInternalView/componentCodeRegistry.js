// Component Code Registry for UiInternalView
// Raw source imports powered by Vite ?raw

import tabViewCode from '../TabPractice/TabView.jsx?raw';
import navbarDemoCode from '../Navbar/NavbarDemo.jsx?raw';
import modalDemoCode from '../ModalDialog/ModalDemo.jsx?raw';
import countdownDemoCode from '../CountdownTimer/CountdownDemo.jsx?raw';
import autocompleteDemoCode from '../Autocomplete/AutocompleteDemo.jsx?raw';
import otpLayoutCode from '../OTPComponent/OtpLayout.jsx?raw';
import otpInputCode from '../OTPComponent/OTPInput.jsx?raw';
import carouselDemoCode from '../ImageCarousel/CarouselDemo.jsx?raw';
import accordionDemoCode from '../Accordion/AccordionDemo.jsx?raw';
import starRatingCode from '../StarComp/StarRating.jsx?raw';
import progressBarsDemoCode from '../ProgressBars/ProgressBarsDemo.jsx?raw';

// Data & Forms
import nestedCommentsDemoCode from '../NestedComments/NestedCommentsDemo.jsx?raw';
import crudListDemoCode from '../CrudList/CrudListDemo.jsx?raw';
import paginationPracCode from '../ApiCallingPrac/PaginationPrac.jsx?raw';
import infiniteScrollDemoCode from '../InfiniteScroll/InfiniteScrollDemo.jsx?raw';
import nestedAccordionDemoCode from '../NestedAccordion/NestedAccordionDemo.jsx?raw';
import stepperDemoCode from '../StepperForm/StepperDemo.jsx?raw';
import formValidationDemoCode from '../FormValidation/FormValidationDemo.jsx?raw';
import dataTableDemoCode from '../DataTable/DataTableDemo.jsx?raw';
import fileExplorerDemoCode from '../FileExplorer/FileExplorerDemo.jsx?raw';

// Custom Hooks
import customHooksDemoCode from '../customHooks/CustomHooksDemo.jsx?raw';
import useDebounceCode from '../customHooks/useDebounce.js?raw';
import useFetchCode from '../customHooks/useFetch.jsx?raw';
import useLocalStorageCode from '../customHooks/useLocalStorage.js?raw';
import useOnClickOutsideCode from '../customHooks/useOnClickOutside.js?raw';
import usePreviousCode from '../customHooks/usePrevious.js?raw';
import useTimerCode from '../customHooks/useTimer.jsx?raw';

// Performance
import searchCode from '../DebouncerAndThrottle/Search.jsx?raw';
import debounceAndThrottleCode from '../DebouncerAndThrottle/DebounceAndThrottle.jsx?raw';

// Apps & Games
import memoryCode from '../MemoryGame/Memory.jsx?raw';
import trafficLightDemoCode from '../TrafficLight/TrafficLightDemo.jsx?raw';
import digitalClockDemoCode from '../DigitalClock/DigitalClockDemo.jsx?raw';
import stopwatchCode from '../StopWatch/Stopwatch.jsx?raw';
import todoListDemoCode from '../TodoList/TodoListDemo.jsx?raw';
import kanbanDemoCode from '../KanbanBoard/KanbanDemo.jsx?raw';

export const COMPONENT_REGISTRY = {
  // UI Components
  'tabs': {
    id: 'tabs',
    name: 'Tabs',
    path: '/',
    category: 'UI Components',
    tag: 'Basic State',
    description: 'Dynamic tabbed component switching active index state with animated line indicator.',
    files: [
      { name: 'TabView.jsx', code: tabViewCode, language: 'jsx' }
    ],
    interviewNotes: [
      'Key state: track activeTab index',
      'Accessibility: aria-selected, role="tab", role="tabpanel"',
      'Performance: conditional rendering vs CSS display:none based on state preservation needs'
    ]
  },
  'navbar-demo': {
    id: 'navbar-demo',
    name: 'Navigation Bar',
    path: '/navbar-demo',
    category: 'UI Components',
    tag: 'Nav / Menu',
    description: 'Responsive navbar with mobile hamburger menu toggle and active route highlighting.',
    files: [
      { name: 'NavbarDemo.jsx', code: navbarDemoCode, language: 'jsx' }
    ],
    interviewNotes: [
      'Responsive design: CSS flexbox & media queries with state-driven mobile drawer toggle',
      'Event listener cleanup: handle window resize gracefully',
      'Focus trapping & keyboard navigation for mobile drawer'
    ]
  },
  'modal': {
    id: 'modal',
    name: 'Modal Dialog',
    path: '/modal',
    category: 'UI Components',
    tag: 'DOM / Portal',
    description: 'Accessible modal dialog rendered via React Portal with backdrop click, Escape key dismiss, and focus trap.',
    files: [
      { name: 'ModalDemo.jsx', code: modalDemoCode, language: 'jsx' }
    ],
    interviewNotes: [
      'ReactDOM.createPortal to break out of DOM hierarchy',
      'Keyboard event listener (Escape key) attached on mount, removed on unmount',
      'Prevent background page scrolling (document.body.style.overflow = "hidden")'
    ]
  },
  'countdown': {
    id: 'countdown',
    name: 'Countdown Timer',
    path: '/countdown',
    category: 'UI Components',
    tag: 'Timer / Interval',
    description: 'Configurable countdown timer with Start, Pause, Resume, and Reset logic using setInterval & useRef.',
    files: [
      { name: 'CountdownDemo.jsx', code: countdownDemoCode, language: 'jsx' }
    ],
    interviewNotes: [
      'useRef for storing interval ID without triggering unnecessary re-renders',
      'Proper cleanup of setInterval in useEffect return function to prevent memory leaks',
      'Format time formatting helper (HH:MM:SS)'
    ]
  },
  'autocomplete': {
    id: 'autocomplete',
    name: 'Autocomplete Search',
    path: '/autocomplete',
    category: 'UI Components',
    tag: 'Search / Debounce',
    description: 'Typeahead autocomplete search input with debounced API fetching, highlighting query matches, and keyboard navigation.',
    files: [
      { name: 'AutocompleteDemo.jsx', code: autocompleteDemoCode, language: 'jsx' }
    ],
    interviewNotes: [
      'Debouncing search query to avoid firing API requests on every keystroke',
      'Caching API responses in memory (cache object or Map)',
      'Keyboard navigation (ArrowUp, ArrowDown, Enter) through dropdown options'
    ]
  },
  'otp': {
    id: 'otp',
    name: 'OTP Input',
    path: '/otp',
    category: 'UI Components',
    tag: 'Focus / Refs',
    description: 'Multi-digit OTP verification code component with automatic auto-focus shift, backspace focus handling, and paste handling.',
    files: [
      { name: 'OtpLayout.jsx', code: otpLayoutCode, language: 'jsx' },
      { name: 'OTPInput.jsx', code: otpInputCode, language: 'jsx' }
    ],
    interviewNotes: [
      'array of useRefs or callback refs to control input DOM elements focus',
      'Handling Backspace: focus previous input if current input is empty',
      'Handling Paste: split pasted code across inputs and focus last input'
    ]
  },
  'carousel': {
    id: 'carousel',
    name: 'Image Carousel',
    path: '/carousel',
    category: 'UI Components',
    tag: 'Slider / Touch',
    description: 'Auto-playing image slider with next/prev controls, dot indicators, and pause on hover.',
    files: [
      { name: 'CarouselDemo.jsx', code: carouselDemoCode, language: 'jsx' }
    ],
    interviewNotes: [
      'Circular index wrapping: (index + 1) % length & (index - 1 + length) % length',
      'Interval auto-slide timer with mouseEnter / mouseLeave pause functionality',
      'Preloading next slide images for seamless transitions'
    ]
  },
  'accordion': {
    id: 'accordion',
    name: 'Accordion',
    path: '/accordion',
    category: 'UI Components',
    tag: 'Collapse State',
    description: 'Collapsible accordion panel supporting both Single-expand and Multi-expand modes.',
    files: [
      { name: 'AccordionDemo.jsx', code: accordionDemoCode, language: 'jsx' }
    ],
    interviewNotes: [
      'Single vs Multi state: string/number ID vs Set/Array of active IDs',
      'Toggle handler logic depending on allowMultiple boolean flag',
      'ARIA attributes: aria-expanded, aria-controls'
    ]
  },
  'star-rating': {
    id: 'star-rating',
    name: 'Star Rating',
    path: '/star-rating',
    category: 'UI Components',
    tag: 'Hover / Rating',
    description: 'Interactive N-star rating component supporting hover preview state, click rating, and custom star icons.',
    files: [
      { name: 'StarRating.jsx', code: starRatingCode, language: 'jsx' }
    ],
    interviewNotes: [
      'Dual state: rating (persisted value) vs hoverRating (temporary preview)',
      'Display logic: star is filled if index <= (hoverRating || rating)',
      'Reusable prop design (totalStars, initialRating, onRate callback)'
    ]
  },
  'progress-bars': {
    id: 'progress-bars',
    name: 'Progress Bars Suite',
    path: '/progress-bars',
    category: 'UI Components',
    tag: 'Animation / Visual',
    description: 'Linear, circular, and animated sequence progress bars with smooth CSS transition effects.',
    files: [
      { name: 'ProgressBarsDemo.jsx', code: progressBarsDemoCode, language: 'jsx' }
    ],
    interviewNotes: [
      'CSS clip-path or strokeDashoffset math for SVG circular progress bars',
      'Clamping percentage value between 0 and 100',
      'Sequential queue execution for multi-step progress bar sequences'
    ]
  },

  // Data & Forms
  'nested-comments': {
    id: 'nested-comments',
    name: 'Nested Comments',
    path: '/nested-comments',
    category: 'Data & Forms',
    tag: 'Tree / Recursion',
    description: 'Infinite level nested commenting system supporting add reply, edit comment, and delete subtree operations.',
    files: [
      { name: 'NestedCommentsDemo.jsx', code: nestedCommentsDemoCode, language: 'jsx' }
    ],
    interviewNotes: [
      'Recursive React component pattern: Component calling itself for children',
      'Immutable state tree updates for deep nesting insertion/deletion',
      'State structure: [{ id, text, replies: [] }]'
    ]
  },
  'crud-list': {
    id: 'crud-list',
    name: 'CRUD List Operations',
    path: '/crud-list',
    category: 'Data & Forms',
    tag: 'CRUD / Sort',
    description: 'Complete CRUD interface with search filter, column sorting, inline edit, bulk selection, and pagination.',
    files: [
      { name: 'CrudListDemo.jsx', code: crudListDemoCode, language: 'jsx' }
    ],
    interviewNotes: [
      'Immutable CRUD operations: concat/spread for Create, map for Update, filter for Delete',
      'Derived state for search filtering and column sorting before slice pagination',
      'Bulk batch operations state management'
    ]
  },
  'pagination': {
    id: 'pagination',
    name: 'Pagination (Truncate)',
    path: '/pagination',
    category: 'Data & Forms',
    tag: 'Algo / Truncate',
    description: 'Client & Server pagination algorithm featuring dynamic page number truncation (e.g. 1, 2, ..., 8, 9, 10).',
    files: [
      { name: 'PaginationPrac.jsx', code: paginationPracCode, language: 'jsx' }
    ],
    interviewNotes: [
      'Pagination truncation algorithm: generating page ranges with ellipses',
      'Client-side slicing: data.slice((page - 1) * pageSize, page * pageSize)',
      'Handling dynamic totalPages calculation (Math.ceil(total / pageSize))'
    ]
  },
  'infinite-scroll': {
    id: 'infinite-scroll',
    name: 'Infinite Scroll',
    path: '/infinite-scroll',
    category: 'Data & Forms',
    tag: 'Observer / DOM',
    description: 'Infinite scroll list fetching new pages dynamically using IntersectionObserver API.',
    files: [
      { name: 'InfiniteScrollDemo.jsx', code: infiniteScrollDemoCode, language: 'jsx' }
    ],
    interviewNotes: [
      'IntersectionObserver API attached to a bottom target sentinel element',
      'Callback ref pattern or useRef for target element observer binding',
      'Loading state check & prevent duplicate parallel fetches'
    ]
  },
  'nested-accordion': {
    id: 'nested-accordion',
    name: 'Nested Accordion',
    path: '/nested-accordion',
    category: 'Data & Forms',
    tag: 'Recursion / Tree',
    description: 'Multi-level nested tree menu accordion with recursive expand/collapse node rendering.',
    files: [
      { name: 'NestedAccordionDemo.jsx', code: nestedAccordionDemoCode, language: 'jsx' }
    ],
    interviewNotes: [
      'Tree structure traversal with recursive component rendering',
      'Isolated local expanded state per node level',
      'Optimizing render performance for deep tree branches'
    ]
  },
  'stepper': {
    id: 'stepper',
    name: 'Form Stepper',
    path: '/stepper',
    category: 'Data & Forms',
    tag: 'Wizard / Form',
    description: 'Multi-step form wizard with progress indicators, step validation, and form data accumulation.',
    files: [
      { name: 'StepperDemo.jsx', code: stepperDemoCode, language: 'jsx' }
    ],
    interviewNotes: [
      'Centralized form state object accumulating step-by-step user input',
      'Step validation guard before incrementing currentStep state',
      'Progress percentage calculation: (currentStep / totalSteps) * 100'
    ]
  },
  'form-validation': {
    id: 'form-validation',
    name: 'Form Validation',
    path: '/form-validation',
    category: 'Data & Forms',
    tag: 'Validation / Regex',
    description: 'Comprehensive form validation engine supporting touch status, real-time regex rules, and custom validators.',
    files: [
      { name: 'FormValidationDemo.jsx', code: formValidationDemoCode, language: 'jsx' }
    ],
    interviewNotes: [
      'Tracking touched field states to trigger error messages on blur vs submit',
      'Pure validation helper functions returning error message maps',
      'Disabling submit button while form contains active validation errors'
    ]
  },
  'data-table': {
    id: 'data-table',
    name: 'Data Table',
    path: '/data-table',
    category: 'Data & Forms',
    tag: 'Filter / Sort',
    description: 'Feature-packed data table with multi-column sorting, column filtering, pagination, and selection.',
    files: [
      { name: 'DataTableDemo.jsx', code: dataTableDemoCode, language: 'jsx' }
    ],
    interviewNotes: [
      'Declarative column configuration data schema',
      'Sorting direction state toggling (asc -> desc -> null)',
      'Memoizing filtered & sorted data calculations with useMemo'
    ]
  },
  'file-explorer': {
    id: 'file-explorer',
    name: 'File Explorer',
    path: '/file-explorer',
    category: 'Data & Forms',
    tag: 'Tree / Recursion',
    description: 'VS Code style file & folder explorer supporting file creation, folder creation, deletion, and expansion.',
    files: [
      { name: 'FileExplorerDemo.jsx', code: fileExplorerDemoCode, language: 'jsx' }
    ],
    interviewNotes: [
      'Recursive tree node renderer component',
      'Immutably inserting new child node (file/folder) inside target parent node',
      'Handling file vs folder icon toggling and state indicators'
    ]
  },

  // Custom Hooks
  'custom-hooks': {
    id: 'custom-hooks',
    name: 'Custom Hooks Suite',
    path: '/custom-hooks',
    category: 'Custom Hooks',
    tag: 'Hooks Rules',
    description: 'Production-ready reusable custom React hooks (useDebounce, useFetch, useLocalStorage, useOnClickOutside, usePrevious, useTimer).',
    files: [
      { name: 'CustomHooksDemo.jsx', code: customHooksDemoCode, language: 'jsx' },
      { name: 'useDebounce.js', code: useDebounceCode, language: 'javascript' },
      { name: 'useFetch.jsx', code: useFetchCode, language: 'jsx' },
      { name: 'useLocalStorage.js', code: useLocalStorageCode, language: 'javascript' },
      { name: 'useOnClickOutside.js', code: useOnClickOutsideCode, language: 'javascript' },
      { name: 'usePrevious.js', code: usePreviousCode, language: 'javascript' },
      { name: 'useTimer.jsx', code: useTimerCode, language: 'jsx' }
    ],
    interviewNotes: [
      'Rules of Hooks: call hooks only at top level, only from React function components/custom hooks',
      'useRef for holding values across renders without causing re-renders (usePrevious, useOnClickOutside)',
      'Encapsulating side-effects with custom hooks for clean component logic separation'
    ]
  },

  // Performance
  'search': {
    id: 'search',
    name: 'Debounce & Throttle',
    path: '/search',
    category: 'Performance',
    tag: 'Optimization',
    description: 'Interactive visualizer demonstrating raw input execution vs debounced vs throttled function calls.',
    files: [
      { name: 'Search.jsx', code: searchCode, language: 'jsx' },
      { name: 'DebounceAndThrottle.jsx', code: debounceAndThrottleCode, language: 'jsx' }
    ],
    interviewNotes: [
      'Debouncing: delays execution until user stops calling for N milliseconds (useful for autocomplete search)',
      'Throttling: limits execution to once per N milliseconds interval (useful for scroll & window resize events)',
      'Implementation using setTimeout & clearTimeout / timestamp comparison'
    ]
  },

  // Apps & Games
  'memory': {
    id: 'memory',
    name: 'Memory Grid Light',
    path: '/memory',
    category: 'Apps & Games',
    tag: 'Matrix / Game',
    description: 'Interactive memory tile pattern sequence game testing visual recall memory.',
    files: [
      { name: 'Memory.jsx', code: memoryCode, language: 'jsx' }
    ],
    interviewNotes: [
      'Grid matrix representation using arrays',
      'Async sequence playback with setTimeout delays',
      'Comparing user tap sequence against generated pattern sequence step-by-step'
    ]
  },
  'traffic-light': {
    id: 'traffic-light',
    name: 'Traffic Light',
    path: '/traffic-light',
    category: 'Apps & Games',
    tag: 'State Machine',
    description: 'Traffic light state machine cycling red (4s), yellow (1.5s), and green (3s) with manual override controls.',
    files: [
      { name: 'TrafficLightDemo.jsx', code: trafficLightDemoCode, language: 'jsx' }
    ],
    interviewNotes: [
      'State machine config object: mapping light state to duration and next state',
      'Dynamic setTimeout duration based on active light state',
      'Manual override controls clearing active timer and setting explicit light state'
    ]
  },
  'digital-clock': {
    id: 'digital-clock',
    name: 'Digital Clock',
    path: '/digital-clock',
    category: 'Apps & Games',
    tag: 'Timer / Date',
    description: 'Real-time digital clock with 12-hour/24-hour toggles, seconds display toggle, and date formatting.',
    files: [
      { name: 'DigitalClockDemo.jsx', code: digitalClockDemoCode, language: 'jsx' }
    ],
    interviewNotes: [
      '1-second interval timer updating Date object state',
      'Formatting helpers: String(val).padStart(2, "0")',
      'Derived state logic for 12h AM/PM conversion'
    ]
  },
  'stopwatch': {
    id: 'stopwatch',
    name: 'Stopwatch',
    path: '/stopwatch',
    category: 'Apps & Games',
    tag: 'Timer / Lap',
    description: 'High-precision stopwatch with lap time recorder, split time tracking, and reset.',
    files: [
      { name: 'Stopwatch.jsx', code: stopwatchCode, language: 'jsx' }
    ],
    interviewNotes: [
      'Using performance.now() or Date.now() delta for high precision without drift',
      'Lap time array state accumulation',
      'Interval cleanup on stop or unmount'
    ]
  },
  'todo': {
    id: 'todo',
    name: 'Todo List',
    path: '/todo',
    category: 'Apps & Games',
    tag: 'CRUD / State',
    description: 'Feature-complete Todo list with task filtering (All, Active, Completed), inline edit, batch toggle, and localStorage persistence.',
    files: [
      { name: 'TodoListDemo.jsx', code: todoListDemoCode, language: 'jsx' }
    ],
    interviewNotes: [
      'LocalStorage synchronization using useEffect',
      'Immutable state operations for toggle completed & delete todo',
      'Filter state (All/Active/Completed) controlling derived visible items'
    ]
  },
  'kanban': {
    id: 'kanban',
    name: 'Kanban Board',
    path: '/kanban',
    category: 'Apps & Games',
    tag: 'State / DnD',
    description: 'Drag and drop Kanban task board with custom column movement, task creation, and modal editing.',
    files: [
      { name: 'KanbanDemo.jsx', code: kanbanDemoCode, language: 'jsx' }
    ],
    interviewNotes: [
      'HTML5 Drag and Drop API events: onDragStart, onDragOver, onDrop',
      'Column status re-assignment state updates',
      'Optimistic state updates for smooth drag interactions'
    ]
  }
};

export const CATEGORIES = ['UI Components', 'Data & Forms', 'Custom Hooks', 'Performance', 'Apps & Games'];
