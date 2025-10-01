import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import ViewToggleBar from './ViewToggleBar';
import VideoGrid from './VideoGrid';
import VideoFullView from './VideoFullView';

const PortfolioShowcase = ({ videos, category, title }) => {
  const [viewMode, setViewMode] = useState('grid');

  return (
    <section className="floating-panel-dark space-y-8 sm:space-y-10 lg:space-y-12 flex flex-col items-center relative">
      <ViewToggleBar currentView={viewMode} onViewChange={setViewMode} />

      <motion.h2
        className="section-title font-[font2] text-3xl sm:text-4xl lg:text-5xl xl:text-6xl uppercase text-center text-layer-2 text-glow"
        layout
      >
        {title}
      </motion.h2>

      <AnimatePresence mode="wait">
        {viewMode === 'grid' ? (
          <motion.div
            key="grid-view"
            className="w-full max-w-7xl"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.4 }}
          >
            <VideoGrid
              videos={videos}
              gridCols="grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
              aspectRatio="aspect-video"
            />
          </motion.div>
        ) : (
          <motion.div
            key="full-view"
            className="w-full"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
          >
            <VideoFullView videos={videos} category={category} />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
};

export default PortfolioShowcase;
