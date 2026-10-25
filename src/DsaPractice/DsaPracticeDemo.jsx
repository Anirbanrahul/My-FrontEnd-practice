import React, { useState, useEffect } from 'react';
import { DSA_PROBLEMS } from './dsaData';
import ProblemSelector from './components/ProblemSelector';
import ProblemOverview from './components/ProblemOverview';
import PseudoCodeView from './components/PseudoCodeView';
import JsCodeView from './components/JsCodeView';
import VisualizerCanvas from './components/VisualizerCanvas';
import PracticePlayground from './components/PracticePlayground';
import './DsaPractice.css';

const TABS = [
  { id: 'visualizer', label: '🎬 Interactive Visualizer' },
  { id: 'overview', label: '💡 Problem & Easy-Remember' },
  { id: 'pseudocode', label: '📝 Pseudocode' },
  { id: 'code', label: '💻 JavaScript Solution' },
  { id: 'playground', label: '🏋️ Practice Playground' }
];

const DsaPracticeDemo = () => {
  const [activeProblemId, setActiveProblemId] = useState(DSA_PROBLEMS[0].id);
  const [activeTab, setActiveTab] = useState('visualizer');
  const [completedIds, setCompletedIds] = useState(() => {
    try {
      const saved = localStorage.getItem('dsa_practiced_ids');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const activeProblem = DSA_PROBLEMS.find((p) => p.id === activeProblemId) || DSA_PROBLEMS[0];

  useEffect(() => {
    try {
      localStorage.setItem('dsa_practiced_ids', JSON.stringify(completedIds));
    } catch (err) {
      console.error('Failed saving practiced IDs:', err);
    }
  }, [completedIds]);

  const handleMarkCompleted = (id) => {
    if (!completedIds.includes(id)) {
      setCompletedIds([...completedIds, id]);
    }
  };

  const handleToggleCompleted = () => {
    if (completedIds.includes(activeProblemId)) {
      setCompletedIds(completedIds.filter((id) => id !== activeProblemId));
    } else {
      setCompletedIds([...completedIds, activeProblemId]);
    }
  };

  return (
    <div className="dsa-workspace">
      {/* Top Header */}
      <div className="dsa-header">
        <div>
          <div className="dsa-header-title">
            <h2>⚡ DSA & JS Practice Hub</h2>
            <span className="dsa-header-badge">{DSA_PROBLEMS.length} Core Practice Problems</span>
          </div>
          <p className="dsa-header-subtitle">
            Step-by-step memory visualization, easy-remember tricks, pseudocode, optimized JS code & practice playground.
          </p>
        </div>

        <div className="dsa-header-stats">
          <div className="stat-card">
            <span className="num">{completedIds.length} / {DSA_PROBLEMS.length}</span>
            <span className="lbl">Completed</span>
          </div>
          <div className="stat-card">
            <span className="num">{Math.round((completedIds.length / DSA_PROBLEMS.length) * 100)}%</span>
            <span className="lbl">Progress</span>
          </div>
        </div>
      </div>

      {/* Main Layout Grid */}
      <div className="dsa-body-grid">
        {/* Left Sidebar Problem Selector */}
        <div className="dsa-sidebar-pane">
          <ProblemSelector
            problems={DSA_PROBLEMS}
            activeProblemId={activeProblemId}
            onSelectProblem={setActiveProblemId}
            completedIds={completedIds}
          />
        </div>

        {/* Right Main Content Pane */}
        <div className="dsa-content-pane">
          {/* Problem Banner Header */}
          <div className="dsa-problem-banner">
            <div className="banner-left">
              <span className="banner-number">#{activeProblem.number}</span>
              <h2 className="banner-title">{activeProblem.title}</h2>
              <span className={`dsa-badge diff-${activeProblem.difficulty.toLowerCase()}`}>
                {activeProblem.difficulty}
              </span>
              <span className="dsa-badge tag-cat">{activeProblem.category}</span>
            </div>

            <button
              className={`dsa-mark-btn ${completedIds.includes(activeProblemId) ? 'done' : ''}`}
              onClick={handleToggleCompleted}
            >
              {completedIds.includes(activeProblemId) ? '✓ Mark Unfinished' : '◯ Mark Practiced'}
            </button>
          </div>

          {/* Navigation Tabs */}
          <div className="dsa-tabs-nav">
            {TABS.map((tab) => (
              <button
                key={tab.id}
                className={`dsa-tab-btn ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>

          {/* Tab Views Content */}
          <div className="dsa-tab-content">
            {activeTab === 'visualizer' && (
              <VisualizerCanvas problem={activeProblem} />
            )}
            {activeTab === 'overview' && (
              <ProblemOverview problem={activeProblem} />
            )}
            {activeTab === 'pseudocode' && (
              <PseudoCodeView problem={activeProblem} />
            )}
            {activeTab === 'code' && (
              <JsCodeView problem={activeProblem} />
            )}
            {activeTab === 'playground' && (
              <PracticePlayground
                problem={activeProblem}
                onMarkCompleted={handleMarkCompleted}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DsaPracticeDemo;
