import React, { useRef, useState } from 'react';

export const MediaButton = ({ label, mediaUrl }) => {
  const videoRef = useRef(null);
  const [isHovered, setIsHovered] = useState(false);
  const isVideo = /\.(mp4|webm)$/i.test(mediaUrl);

  const handleMouseEnter = () => {
    setIsHovered(true);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play().catch(err => {
        console.log('Video play failed:', err);
      });
    }
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <button
      className="relative overflow-hidden rounded-full px-6 py-3 text-black font-medium bg-[#D3FD50] shadow-lg inline-flex items-center gap-3"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isVideo ? (
        <video
          ref={videoRef}
          className="absolute top-0 left-0 w-full h-full object-cover z-0 transition-opacity duration-300"
          style={{ opacity: isHovered ? 1 : 0 }}
          src={mediaUrl}
          muted
          loop
          playsInline
          preload="auto"
        />
      ) : (
        <img
          className="absolute top-0 left-0 w-full h-full object-cover z-0 transition-opacity duration-300"
          style={{ opacity: isHovered ? 1 : 0 }}
          src={mediaUrl}
          alt="Background"
        />
      )}

      <div
        className="absolute inset-0 bg-black/50 z-10 pointer-events-none transition-opacity duration-300"
        style={{ opacity: isHovered ? 1 : 0 }}
      />

      <span
        className="relative z-20 font-[font2] transition-colors duration-300"
        style={{ color: isHovered ? 'white' : 'black' }}
      >
        {label}
      </span>
    </button>
  );
};
