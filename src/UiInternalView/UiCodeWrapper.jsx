import React, { useState } from 'react';
import { COMPONENT_REGISTRY } from './componentCodeRegistry';
import CodeViewer from './CodeViewer';

const UiCodeWrapper = ({ componentId, children }) => {
  const [viewMode, setViewMode] = useState('ui'); // default 'ui' for standard page routes, toggleable to 'split' or 'code'
  const registryItem = COMPONENT_REGISTRY[componentId];

  if (!registryItem) {
    return <>{children}</>;
  }

  return (
    <div className="ui-code-wrapper">
      {/* View Switcher Top Bar */}
      <div className="wrapper-mode-bar">
        <div className="wrapper-title-info">
          <span className="wrapper-badge">{registryItem.category}</span>
          <span className="wrapper-name">{registryItem.name}</span>
        </div>

        <div className="wrapper-toggle-btns">
          <button
            className={`wrapper-btn ${viewMode === 'ui' ? 'active' : ''}`}
            onClick={() => setViewMode('ui')}
            title="UI Only View"
          >
            🖥️ UI View
          </button>
          <button
            className={`wrapper-btn ${viewMode === 'split' ? 'active' : ''}`}
            onClick={() => setViewMode('split')}
            title="Split UI + Code View"
          >
            ⚡ Split View (UI + Code)
          </button>
          <button
            className={`wrapper-btn ${viewMode === 'code' ? 'active' : ''}`}
            onClick={() => setViewMode('code')}
            title="Code Only View"
          >
            💻 Code View
          </button>
        </div>
      </div>

      {/* Workspace Display Area */}
      <div className={`wrapper-workspace mode-${viewMode}`}>
        {(viewMode === 'ui' || viewMode === 'split') && (
          <div className="wrapper-ui-pane">
            {children}
          </div>
        )}

        {(viewMode === 'code' || viewMode === 'split') && (
          <div className="wrapper-code-pane">
            <div className="pane-header">
              <span>💻 Implementation Code & Interview Notes</span>
            </div>
            <CodeViewer item={registryItem} />
          </div>
        )}
      </div>
    </div>
  );
};

export default UiCodeWrapper;
