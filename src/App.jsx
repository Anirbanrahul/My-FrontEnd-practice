import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

// Import Sidebar & All Machine Coding Components
import Sidebar from './components/Sidebar';
import TabView from './TabPractice/TabView';
import ModalDemo from './ModalDialog/ModalDemo';
import CountdownDemo from './CountdownTimer/CountdownDemo';
import AutocompleteDemo from './Autocomplete/AutocompleteDemo';
import OtpLayout from './OTPComponent/OtpLayout';
import CarouselDemo from './ImageCarousel/CarouselDemo';
import AccordionDemo from './Accordion/AccordionDemo';
import StarRating from './StarComp/StarRating';
import ProgressBarsDemo from './ProgressBars/ProgressBarsDemo';
import PaginationPrac from './ApiCallingPrac/PaginationPrac';
import InfiniteScrollDemo from './InfiniteScroll/InfiniteScrollDemo';
import NestedAccordionDemo from './NestedAccordion/NestedAccordionDemo';
import Memory from './MemoryGame/Memory';
import StepperDemo from './StepperForm/StepperDemo';
import FormValidationDemo from './FormValidation/FormValidationDemo';
import Search from './DebouncerAndThrottle/Search';
import TrafficLightDemo from './TrafficLight/TrafficLightDemo';
import DigitalClockDemo from './DigitalClock/DigitalClockDemo';
import Stopwatch from './StopWatch/Stopwatch';
import TodoListDemo from './TodoList/TodoListDemo';
import DataTableDemo from './DataTable/DataTableDemo';
import FileExplorerDemo from './FileExplorer/FileExplorerDemo';
import KanbanDemo from './KanbanBoard/KanbanDemo';

// New Interview Component Additions
import NavbarDemo from './Navbar/NavbarDemo';
import NestedCommentsDemo from './NestedComments/NestedCommentsDemo';
import CrudListDemo from './CrudList/CrudListDemo';
import CustomHooksDemo from './customHooks/CustomHooksDemo';
import DsaPracticeDemo from './DsaPractice/DsaPracticeDemo';
import FeQuestionsDemo from './FeQuestions/FeQuestionsDemo';
import QuizDemo from './Quiz/QuizDemo';
import StudyNudge from './StudyNudge/StudyNudge';

import UiInternalView from './UiInternalView/UiInternalView';
import UiCodeWrapper from './UiInternalView/UiCodeWrapper';

function App() {
  const [theme, setTheme] = useState('dark');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(() => {
    try {
      return localStorage.getItem('sidebar_collapsed') === 'true';
    } catch {
      return false;
    }
  });
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarCollapsed(prev => {
      const next = !prev;
      try {
        localStorage.setItem('sidebar_collapsed', String(next));
      } catch (err) {
        console.error(err);
      }
      return next;
    });
  };

  const toggleTheme = () => {
    const nextTheme = theme === 'dark' ? 'light' : 'dark';
    setTheme(nextTheme);
    document.documentElement.setAttribute('data-theme', nextTheme);
  };

  const closeMobileSidebar = () => {
    setIsMobileSidebarOpen(false);
  };

  return (
    <Router>
      <div className={`app-container ${isSidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
        {/* Mobile Overlay Backdrop */}
        {isMobileSidebarOpen && (
          <div className="mobile-sidebar-overlay" onClick={closeMobileSidebar} />
        )}

        {/* Navigation Sidebar */}
        <Sidebar
          isCollapsed={isSidebarCollapsed}
          toggleCollapse={toggleSidebar}
          isMobileOpen={isMobileSidebarOpen}
          onMobileClose={closeMobileSidebar}
        />

        {/* Main Workspace Area */}
        <main className={`main-content ${isSidebarCollapsed ? 'expanded' : ''}`}>
          <div className="top-bar">
            <div className="top-bar-left">
              <button
                className="mobile-hamburger-btn"
                onClick={() => setIsMobileSidebarOpen(true)}
                title="Open Navigation"
              >
                ☰
              </button>
              <button
                className="toggle-sidebar-bar-btn"
                onClick={toggleSidebar}
                title={isSidebarCollapsed ? "Expand Sidebar" : "Collapse Sidebar"}
              >
                {isSidebarCollapsed ? '▶ Show Sidebar' : '◀ Collapse Sidebar'}
              </button>
              <div className="top-bar-title-block">
                <h1 className="top-bar-title">Anirbans Interview Practice</h1>
                <p className="top-bar-subtitle">
                  Comprehensive React machine coding components & custom hooks suite for interview preparation
                </p>
              </div>
            </div>
            <button className="toggle-btn" onClick={toggleTheme}>
              {theme === 'dark' ? '☀️ Light' : '🌙 Dark'}
            </button>
          </div>

          <Routes>
            <Route path="/" element={<FeQuestionsDemo />} />
            <Route path="/ui-internal-view" element={<UiInternalView />} />
            <Route path="/fe-questions" element={<FeQuestionsDemo />} />
            <Route path="/quiz" element={<QuizDemo />} />
            <Route path="/dsa-practice" element={<DsaPracticeDemo />} />
            <Route path="/study-nudge" element={<StudyNudge />} />
            <Route path="/tabs" element={<UiCodeWrapper componentId="tabs"><TabView /></UiCodeWrapper>} />
            <Route path="/navbar-demo" element={<UiCodeWrapper componentId="navbar-demo"><NavbarDemo /></UiCodeWrapper>} />
            <Route path="/modal" element={<UiCodeWrapper componentId="modal"><ModalDemo /></UiCodeWrapper>} />
            <Route path="/countdown" element={<UiCodeWrapper componentId="countdown"><CountdownDemo /></UiCodeWrapper>} />
            <Route path="/autocomplete" element={<UiCodeWrapper componentId="autocomplete"><AutocompleteDemo /></UiCodeWrapper>} />
            <Route path="/otp" element={<UiCodeWrapper componentId="otp"><OtpLayout /></UiCodeWrapper>} />
            <Route path="/carousel" element={<UiCodeWrapper componentId="carousel"><CarouselDemo /></UiCodeWrapper>} />
            <Route path="/accordion" element={<UiCodeWrapper componentId="accordion"><AccordionDemo /></UiCodeWrapper>} />
            <Route path="/star-rating" element={<UiCodeWrapper componentId="star-rating"><StarRating /></UiCodeWrapper>} />
            <Route path="/progress-bars" element={<UiCodeWrapper componentId="progress-bars"><ProgressBarsDemo /></UiCodeWrapper>} />
            <Route path="/pagination" element={<UiCodeWrapper componentId="pagination"><PaginationPrac /></UiCodeWrapper>} />
            <Route path="/infinite-scroll" element={<UiCodeWrapper componentId="infinite-scroll"><InfiniteScrollDemo /></UiCodeWrapper>} />
            <Route path="/nested-accordion" element={<UiCodeWrapper componentId="nested-accordion"><NestedAccordionDemo /></UiCodeWrapper>} />
            <Route path="/nested-comments" element={<UiCodeWrapper componentId="nested-comments"><NestedCommentsDemo /></UiCodeWrapper>} />
            <Route path="/crud-list" element={<UiCodeWrapper componentId="crud-list"><CrudListDemo /></UiCodeWrapper>} />
            <Route path="/custom-hooks" element={<UiCodeWrapper componentId="custom-hooks"><CustomHooksDemo /></UiCodeWrapper>} />
            <Route path="/stepper" element={<UiCodeWrapper componentId="stepper"><StepperDemo /></UiCodeWrapper>} />
            <Route path="/form-validation" element={<UiCodeWrapper componentId="form-validation"><FormValidationDemo /></UiCodeWrapper>} />
            <Route path="/search" element={<UiCodeWrapper componentId="search"><Search /></UiCodeWrapper>} />
            <Route path="/memory" element={<UiCodeWrapper componentId="memory"><Memory /></UiCodeWrapper>} />
            <Route path="/traffic-light" element={<UiCodeWrapper componentId="traffic-light"><TrafficLightDemo /></UiCodeWrapper>} />
            <Route path="/digital-clock" element={<UiCodeWrapper componentId="digital-clock"><DigitalClockDemo /></UiCodeWrapper>} />
            <Route path="/stopwatch" element={<UiCodeWrapper componentId="stopwatch"><Stopwatch /></UiCodeWrapper>} />
            <Route path="/todo" element={<UiCodeWrapper componentId="todo"><TodoListDemo /></UiCodeWrapper>} />
            <Route path="/data-table" element={<UiCodeWrapper componentId="data-table"><DataTableDemo /></UiCodeWrapper>} />
            <Route path="/file-explorer" element={<UiCodeWrapper componentId="file-explorer"><FileExplorerDemo /></UiCodeWrapper>} />
            <Route path="/kanban" element={<UiCodeWrapper componentId="kanban"><KanbanDemo /></UiCodeWrapper>} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

