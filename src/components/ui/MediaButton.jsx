import React, { useRef } from 'react';

export const MediaButton = ({ label, mediaUrl }) => {
  const videoRef = useRef(null);
  const isVideo = /\.(mp4|webm)$/i.test(mediaUrl);

  const handleMouseEnter = () => {
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.play();
    }
  };

  const handleMouseLeave = () => {
    if (videoRef.current) {
      videoRef.current.pause();
      videoRef.current.currentTime = 0;
    }
  };

  return (
    <button
      className="relative overflow-hidden rounded-full px-6 py-3 text-black font-medium bg-[#D3FD50] group shadow-lg inline-flex items-center gap-3"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {isVideo ? (
        <video
          ref={videoRef}
          className="absolute top-0 left-0 w-full h-full object-cover z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          src={mediaUrl}
          muted
          loop
          playsInline
        />
      ) : (
        <img
          className="absolute top-0 left-0 w-full h-full object-cover z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          src={mediaUrl}
          alt="Background"
        />
      )}

      <div className="absolute inset-0 bg-black/50 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <span className="relative z-20 font-[font2] group-hover:text-white transition-colors duration-300">
        {label}
      </span>
    </button>
  );
};
