import { REACT_QUESTIONS } from './data/reactQuestions';
import { OUTPUT_BASED_QUESTIONS } from './data/outputBasedQuestions';
import { JS_THEORY_SAIKRISHNA_QUESTIONS } from './data/jsTheorySaikrishnaQuestions';
import { JS_PROBLEM_SOLVING_QUESTIONS } from './data/jsProblemSolvingQuestions';
import { HTML_QUESTIONS } from './data/htmlQuestions';
import { CSS_QUESTIONS } from './data/cssQuestions';
import { JS_CONCEPTUAL_QUESTIONS } from './data/jsConceptualQuestions';
import { DOM_EVENTS_QUESTIONS, TASK_DESIGN_QUESTIONS } from './data/domAndTaskQuestions';
import { POLYFILL_QUESTIONS, MACHINE_CODING_QUESTIONS, PERFORMANCE_QUESTIONS } from './data/polyfillsAndMachineQuestions';
import {
  ADDITIONAL_REACT_QUESTIONS,
  ADDITIONAL_PS_QUESTIONS,
  ADDITIONAL_OUTPUT_QUESTIONS,
  ADDITIONAL_CSS_QUESTIONS
} from './data/additionalInterviewQuestions';
import {
  PDF_HTML_CSS_QUESTIONS,
  PDF_OUTPUT_QUESTIONS,
  PDF_REACT_ARCHITECTURE_QUESTIONS
} from './data/pdfMasterQuestions';
import { ADVANCED_PERFORMANCE_QUESTIONS } from './data/advancedPerformanceQuestions';

const PDF_HTML = PDF_HTML_CSS_QUESTIONS.filter(q => q.section === 'html');
const PDF_CSS = PDF_HTML_CSS_QUESTIONS.filter(q => q.section === 'css');

const ALL_REACT = [...REACT_QUESTIONS, ...ADDITIONAL_REACT_QUESTIONS, ...PDF_REACT_ARCHITECTURE_QUESTIONS];
const ALL_OUTPUT = [...OUTPUT_BASED_QUESTIONS, ...ADDITIONAL_OUTPUT_QUESTIONS, ...PDF_OUTPUT_QUESTIONS];
const ALL_PS = [...JS_PROBLEM_SOLVING_QUESTIONS, ...ADDITIONAL_PS_QUESTIONS];
const ALL_HTML = [...HTML_QUESTIONS, ...PDF_HTML];
const ALL_CSS = [...CSS_QUESTIONS, ...ADDITIONAL_CSS_QUESTIONS, ...PDF_CSS];
const ALL_PERFORMANCE = [...PERFORMANCE_QUESTIONS, ...ADVANCED_PERFORMANCE_QUESTIONS];

export const ALL_FE_QUESTIONS = [
  ...ALL_REACT,
  ...ALL_OUTPUT,
  ...JS_THEORY_SAIKRISHNA_QUESTIONS,
  ...ALL_PS,
  ...ALL_HTML,
  ...ALL_CSS,
  ...JS_CONCEPTUAL_QUESTIONS,
  ...DOM_EVENTS_QUESTIONS,
  ...TASK_DESIGN_QUESTIONS,
  ...POLYFILL_QUESTIONS,
  ...MACHINE_CODING_QUESTIONS,
  ...ALL_PERFORMANCE
];

export const FE_SECTIONS = [
  { id: 'all', title: `🌐 All Questions (${ALL_FE_QUESTIONS.length})`, count: ALL_FE_QUESTIONS.length },
  { id: 'react-js', title: `⚛️ React.js Questions (${ALL_REACT.length})`, count: ALL_REACT.length },
  { id: 'js-output', title: `⚡ JS Output Questions (${ALL_OUTPUT.length})`, count: ALL_OUTPUT.length },
  { id: 'js-theory-sai', title: `🧠 JS Theory & Scenarios (${JS_THEORY_SAIKRISHNA_QUESTIONS.length})`, count: JS_THEORY_SAIKRISHNA_QUESTIONS.length },
  { id: 'js-problem-solving', title: `🧩 JS Problem Solving (${ALL_PS.length})`, count: ALL_PS.length },
  { id: 'html', title: `🌐 HTML Questions (${ALL_HTML.length})`, count: ALL_HTML.length },
  { id: 'css', title: `🎨 CSS Questions (${ALL_CSS.length})`, count: ALL_CSS.length },
  { id: 'js-conceptual', title: `⚡ JS Conceptual (${JS_CONCEPTUAL_QUESTIONS.length})`, count: JS_CONCEPTUAL_QUESTIONS.length },
  { id: 'dom-events', title: `👆 DOM & Events (${DOM_EVENTS_QUESTIONS.length})`, count: DOM_EVENTS_QUESTIONS.length },
  { id: 'task-design', title: `🏗️ Task-Based Design (${TASK_DESIGN_QUESTIONS.length})`, count: TASK_DESIGN_QUESTIONS.length },
  { id: 'polyfills', title: `🛠️ Polyfills (${POLYFILL_QUESTIONS.length})`, count: POLYFILL_QUESTIONS.length },
  { id: 'machine-coding', title: `💻 Machine Coding (${MACHINE_CODING_QUESTIONS.length})`, count: MACHINE_CODING_QUESTIONS.length },
  { id: 'performance', title: `🚀 Performance & Bar Raiser (${ALL_PERFORMANCE.length})`, count: ALL_PERFORMANCE.length }
];
