import React from 'react';
import { LayoutGrid, Maximize2 } from 'lucide-react';

const ViewToggleBar = ({ currentView, onViewChange }) => {
  return (
    <div className="fixed top-32 right-8 z-50 flex gap-2 bg-black/80 backdrop-blur-md rounded-full p-2 border border-white/10">
      <button
        onClick={() => onViewChange('grid')}
        className={`p-3 rounded-full transition-all duration-300 ${
          currentView === 'grid'
            ? 'bg-[#D3FD50] text-black'
            : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
        }`}
        aria-label="Grid View"
      >
        <LayoutGrid size={20} />
      </button>
      <button
        onClick={() => onViewChange('full')}
        className={`p-3 rounded-full transition-all duration-300 ${
          currentView === 'full'
            ? 'bg-[#D3FD50] text-black'
            : 'bg-white/5 text-white/60 hover:bg-white/10 hover:text-white'
        }`}
        aria-label="Full View"
      >
        <Maximize2 size={20} />
      </button>
    </div>
  );
};

export default ViewToggleBar;
