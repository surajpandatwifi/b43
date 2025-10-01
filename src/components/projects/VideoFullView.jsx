import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { useAutoPlayOnView } from '../../hooks/useAutoPlayOnView';

const VideoFullView = ({ videos, category }) => {
  const { registerElement, clearElements } = useAutoPlayOnView(0.7);

  useEffect(() => {
    return () => clearElements();
  }, [clearElements]);

  return (
    <div className="snap-container">
      {videos.map((video, index) => (
        <motion.section
          key={`${category}-${video.videoId}-${index}`}
          className="snap-section"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: index * 0.1 }}
        >
          <div className="video-full-wrapper">
            <div className="video-full-container">
              <iframe
                ref={registerElement}
                data-src={`https://www.youtube.com/embed/${video.videoId}?enablejsapi=1&autoplay=1&mute=1&loop=1&playlist=${video.videoId}&controls=0&modestbranding=1&rel=0`}
                title={`Video ${index + 1}`}
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
                className="video-full-iframe"
              />
            </div>
            <div className="video-overlay">
              <div className="video-info">
                <span className="video-category">{category}</span>
                <span className="video-number">
                  {String(index + 1).padStart(2, '0')} / {String(videos.length).padStart(2, '0')}
                </span>
              </div>
            </div>
          </div>
        </motion.section>
      ))}
    </div>
  );
};

export default VideoFullView;
