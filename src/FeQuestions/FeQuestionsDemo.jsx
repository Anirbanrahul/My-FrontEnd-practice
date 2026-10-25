import React, { useState, useEffect } from 'react';
import { FE_SECTIONS, ALL_FE_QUESTIONS } from './feQuestionsData';
import FormattedAnswer from './FormattedAnswer';
import PdfPasscodeModal from './PdfPasscodeModal';
import './FeQuestions.css';

const FeQuestionsDemo = () => {
  const [activeSection, setActiveSection] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [expandedIds, setExpandedIds] = useState([]);
  const [isPdfModalOpen, setIsPdfModalOpen] = useState(false);
  const [masteredIds, setMasteredIds] = useState(() => {
    try {
      const saved = localStorage.getItem('fe_mastered_ids');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem('fe_mastered_ids', JSON.stringify(masteredIds));
    } catch (err) {
      console.error('Error saving mastered IDs:', err);
    }
  }, [masteredIds]);

  const toggleExpand = (id) => {
    if (expandedIds.includes(id)) {
      setExpandedIds(expandedIds.filter(item => item !== id));
    } else {
      setExpandedIds([...expandedIds, id]);
    }
  };

  const toggleMastered = (id) => {
    if (masteredIds.includes(id)) {
      setMasteredIds(masteredIds.filter(item => item !== id));
    } else {
      setMasteredIds([...masteredIds, id]);
    }
  };

  const expandAll = () => {
    setExpandedIds(filteredQuestions.map(q => q.id));
  };

  const collapseAll = () => {
    setExpandedIds([]);
  };

  const filteredQuestions = ALL_FE_QUESTIONS.filter((q) => {
    const matchesSection = activeSection === 'all' || q.section === activeSection;
    const matchesSearch =
      q.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      q.answer.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesSection && matchesSearch;
  });

  return (
    <div className="fe-workspace">
      {/* Header Banner */}
      <div className="fe-header">
        <div>
          <div className="fe-header-title">
            <h2>📖 Frontend Interview Bible</h2>
            <span className="fe-header-badge">{ALL_FE_QUESTIONS.length} Core FE Questions & Answers</span>
          </div>
          <p className="fe-header-subtitle">
            Comprehensive answers across React.js, JS Output, JS Theory & Scenarios, JS Problem Solving, HTML, CSS, JS Conceptual, DOM Events, Task-Based Design, Polyfills, Machine Coding & Performance.
          </p>
        </div>

        <div className="fe-header-stats">
          <div className="fe-stat-card">
            <span className="num">{masteredIds.length} / {ALL_FE_QUESTIONS.length}</span>
            <span className="lbl">Mastered</span>
          </div>
          <div className="fe-stat-card">
            <span className="num">{ALL_FE_QUESTIONS.length > 0 ? Math.round((masteredIds.length / ALL_FE_QUESTIONS.length) * 100) : 0}%</span>
            <span className="lbl">Progress</span>
          </div>
        </div>
      </div>

      {/* Control Bar: Search & Action Buttons */}
      <div className="fe-control-bar">
        <input
          type="text"
          className="fe-search-input"
          placeholder={`🔍 Search across ${ALL_FE_QUESTIONS.length} Frontend Questions & Answers...`}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />

        <div className="fe-action-buttons">
          <button className="fe-btn" onClick={expandAll}>Expand All</button>
          <button className="fe-btn" onClick={collapseAll}>Collapse All</button>
          <button className="fe-btn" style={{ background: '#10b981', borderColor: '#10b981', color: '#fff' }} onClick={() => setIsPdfModalOpen(true)}>
            📥 Download PDF
          </button>
        </div>
      </div>

      {/* PDF Passcode Modal */}
      <PdfPasscodeModal
        isOpen={isPdfModalOpen}
        onClose={() => setIsPdfModalOpen(false)}
        questions={ALL_FE_QUESTIONS}
        sections={FE_SECTIONS}
      />

      {/* Section Navigation Tabs */}
      <div className="fe-sections-nav">
        {FE_SECTIONS.map((sec) => (
          <button
            key={sec.id}
            className={`fe-sec-tab ${activeSection === sec.id ? 'active' : ''}`}
            onClick={() => setActiveSection(sec.id)}
          >
            {sec.title}
          </button>
        ))}
      </div>

      {/* Questions Counter & Status */}
      <div className="fe-status-bar">
        <span>Showing {filteredQuestions.length} Questions</span>
        <span>{masteredIds.length} Marked as Mastered ✓</span>
      </div>

      {/* Questions List */}
      <div className="fe-questions-list">
        {filteredQuestions.map((q) => {
          const isExpanded = expandedIds.includes(q.id);
          const isMastered = masteredIds.includes(q.id);

          return (
            <div key={q.id} className={`fe-question-card ${isMastered ? 'mastered' : ''}`}>
              <div className="card-header" onClick={() => toggleExpand(q.id)}>
                <div className="header-title-row">
                  <span className="q-num">#{q.number}</span>
                  <h3 className="q-text">{q.question}</h3>
                </div>

                <div className="header-actions" onClick={(e) => e.stopPropagation()}>
                  <button
                    className={`fe-mastered-btn ${isMastered ? 'done' : ''}`}
                    onClick={() => toggleMastered(q.id)}
                  >
                    {isMastered ? '✓ Mastered' : '◯ Mark Mastered'}
                  </button>
                  <button className="fe-toggle-btn" onClick={() => toggleExpand(q.id)}>
                    {isExpanded ? '▲ Hide Answer' : '▼ Show Answer'}
                  </button>
                </div>
              </div>

              {isExpanded && (
                <div className="card-body">
                  <div className="answer-title">💡 Detailed Solution & Explanation:</div>
                  <FormattedAnswer text={q.answer} />
                </div>
              )}
            </div>
          );
        })}

        {filteredQuestions.length === 0 && (
          <div className="fe-empty-state">
            No questions matching your search criteria found.
          </div>
        )}
      </div>
    </div>
  );
};

export default FeQuestionsDemo;
