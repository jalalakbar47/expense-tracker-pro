import React from 'react';
import { FileQuestion, Layers, SearchX } from 'lucide-react';



const EmptyState = ({ type = 'none', message, subtext, action }) => {
  const icons = {
    none: <Layers size={64} className="empty-icon" />,
    search: <SearchX size={64} className="empty-icon" />,
    filter: <FileQuestion size={64} className="empty-icon" />,
  };

  return (
    <div className="empty-state animate-fade-in">
      <div className="empty-icon-wrapper">
        {icons[type]}
      </div>
      <h3 className="empty-title">{message || 'No Data Found'}</h3>
      <p className="empty-subtext">{subtext || 'Try adding some items or changing your filters.'}</p>
      {action && (
        <button className="empty-action-btn" onClick={action.onClick}>
          {action.label}
        </button>
      )}
    </div>
  );
};

export default EmptyState;
