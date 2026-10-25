import React, { useState } from 'react';
import { COMPONENT_REGISTRY, CATEGORIES } from './componentCodeRegistry';
import CodeViewer from './CodeViewer';
import './UiInternalView.css';

// Component Demo Imports
import TabView from '../TabPractice/TabView';
import NavbarDemo from '../Navbar/NavbarDemo';
import ModalDemo from '../ModalDialog/ModalDemo';
import CountdownDemo from '../CountdownTimer/CountdownDemo';
import AutocompleteDemo from '../Autocomplete/AutocompleteDemo';
import OtpLayout from '../OTPComponent/OtpLayout';
import CarouselDemo from '../ImageCarousel/CarouselDemo';
import AccordionDemo from '../Accordion/AccordionDemo';
import StarRating from '../StarComp/StarRating';
import ProgressBarsDemo from '../ProgressBars/ProgressBarsDemo';
import NestedCommentsDemo from '../NestedComments/NestedCommentsDemo';
import CrudListDemo from '../CrudList/CrudListDemo';
import PaginationPrac from '../ApiCallingPrac/PaginationPrac';
import InfiniteScrollDemo from '../InfiniteScroll/InfiniteScrollDemo';
import NestedAccordionDemo from '../NestedAccordion/NestedAccordionDemo';
import StepperDemo from '../StepperForm/StepperDemo';
import FormValidationDemo from '../FormValidation/FormValidationDemo';
import DataTableDemo from '../DataTable/DataTableDemo';
import FileExplorerDemo from '../FileExplorer/FileExplorerDemo';
import CustomHooksDemo from '../customHooks/CustomHooksDemo';
import Search from '../DebouncerAndThrottle/Search';
import Memory from '../MemoryGame/Memory';
import TrafficLightDemo from '../TrafficLight/TrafficLightDemo';
import DigitalClockDemo from '../DigitalClock/DigitalClockDemo';
import Stopwatch from '../StopWatch/Stopwatch';
import TodoListDemo from '../TodoList/TodoListDemo';
import KanbanDemo from '../KanbanBoard/KanbanDemo';

const COMPONENT_MAP = {
  'tabs': TabView,
  'navbar-demo': NavbarDemo,
  'modal': ModalDemo,
  'countdown': CountdownDemo,
  'autocomplete': AutocompleteDemo,
  'otp': OtpLayout,
  'carousel': CarouselDemo,
  'accordion': AccordionDemo,
  'star-rating': StarRating,
  'progress-bars': ProgressBarsDemo,
  'nested-comments': NestedCommentsDemo,
  'crud-list': CrudListDemo,
  'pagination': PaginationPrac,
  'infinite-scroll': InfiniteScrollDemo,
  'nested-accordion': NestedAccordionDemo,
  'stepper': StepperDemo,
  'form-validation': FormValidationDemo,
  'data-table': DataTableDemo,
  'file-explorer': FileExplorerDemo,
  'custom-hooks': CustomHooksDemo,
  'search': Search,
  'memory': Memory,
  'traffic-light': TrafficLightDemo,
  'digital-clock': DigitalClockDemo,
  'stopwatch': Stopwatch,
  'todo': TodoListDemo,
  'kanban': KanbanDemo,
};

const UiInternalView = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [selectedId, setSelectedId] = useState('accordion');
  const [viewMode, setViewMode] = useState('split'); // 'split' | 'ui' | 'code'
  const [searchQuery, setSearchQuery] = useState('');

  const registryItems = Object.values(COMPONENT_REGISTRY);

  const filteredItems = registryItems.filter(item => {
    const matchesCategory = activeCategory === 'All' || item.category === activeCategory;
    const matchesSearch = item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          item.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const activeItem = COMPONENT_REGISTRY[selectedId] || registryItems[0];
  const ActiveComponent = COMPONENT_MAP[selectedId] || AccordionDemo;

  return (
    <div className="ui-internal-container">
      {/* Header Banner */}
      <div className="ui-internal-header">
        <div className="header-info">
          <h2>⚡ UI & Internal Code Workspace</h2>
          <p>
            Inspect the live interactive UI side-by-side with full implementation source code & frontend interview key takeaways across all 5 core practice categories.
          </p>
        </div>

        {/* View Mode Controls */}
        <div className="view-mode-toggle">
          <button
            className={`mode-btn ${viewMode === 'split' ? 'active' : ''}`}
            onClick={() => setViewMode('split')}
            title="Side-by-side UI and Internal Code"
          >
            ⚡ Split View (UI + Code)
          </button>
          <button
            className={`mode-btn ${viewMode === 'ui' ? 'active' : ''}`}
            onClick={() => setViewMode('ui')}
            title="Focus purely on interactive UI"
          >
            🖥️ UI Only
          </button>
          <button
            className={`mode-btn ${viewMode === 'code' ? 'active' : ''}`}
            onClick={() => setViewMode('code')}
            title="Focus purely on Source Code"
          >
            💻 Code Only
          </button>
        </div>
      </div>

      {/* Category Tabs & Search Selector */}
      <div className="ui-internal-controls">
        <div className="category-pill-group">
          <button
            className={`cat-pill ${activeCategory === 'All' ? 'active' : ''}`}
            onClick={() => setActiveCategory('All')}
          >
            All Categories ({registryItems.length})
          </button>
          {CATEGORIES.map(cat => {
            const count = registryItems.filter(i => i.category === cat).length;
            return (
              <button
                key={cat}
                className={`cat-pill ${activeCategory === cat ? 'active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat} ({count})
              </button>
            );
          })}
        </div>

        <div className="search-and-select">
          <input
            type="text"
            className="component-search-box"
            placeholder="🔍 Filter components..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />

          <select
            className="component-select-dropdown"
            value={selectedId}
            onChange={(e) => setSelectedId(e.target.value)}
          >
            {filteredItems.map(item => (
              <option key={item.id} value={item.id}>
                {item.category}: {item.name} ({item.tag})
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Active Component Details Bar */}
      {activeItem && (
        <div className="active-item-bar">
          <div className="item-meta">
            <span className="cat-badge">{activeItem.category}</span>
            <span className="tag-badge">{activeItem.tag}</span>
            <h3>{activeItem.name}</h3>
          </div>
          <p className="item-desc">{activeItem.description}</p>
        </div>
      )}

      {/* Workspace Display Area */}
      <div className={`workspace-grid mode-${viewMode}`}>
        {/* Live UI Container */}
        {(viewMode === 'split' || viewMode === 'ui') && (
          <div className="ui-pane">
            <div className="pane-header">
              <span>🖥️ Live Interactive UI</span>
            </div>
            <div className="ui-pane-content">
              <ActiveComponent />
            </div>
          </div>
        )}

        {/* Source Code Container */}
        {(viewMode === 'split' || viewMode === 'code') && (
          <div className="code-pane">
            <div className="pane-header">
              <span>💻 Source Code & Implementation Details</span>
            </div>
            <div className="code-pane-content">
              <CodeViewer item={activeItem} />
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default UiInternalView;
