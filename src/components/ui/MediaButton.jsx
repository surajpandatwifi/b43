import React from 'react';
import { motion } from 'framer-motion';

export const MediaButton = ({ label, mediaUrl }) => {
  const isVideo = /\.(mp4|webm)$/i.test(mediaUrl);

  return (
    <motion.button
      className="relative overflow-hidden rounded-full px-6 py-3 text-black font-medium bg-[#D3FD50] hover:bg-[#b8e03e] group shadow-lg transition-colors inline-flex items-center gap-3"
      whileHover="hover"
      initial="rest"
      animate="rest"
    >
      {isVideo ? (
        <motion.video
          className="absolute top-0 left-0 w-full h-full object-cover z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          src={mediaUrl}
          muted
          loop
          playsInline
          autoPlay
        />
      ) : (
        <motion.img
          className="absolute top-0 left-0 w-full h-full object-cover z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
          src={mediaUrl}
          alt="Background"
        />
      )}

      <div className="absolute inset-0 bg-black/50 z-10 pointer-events-none opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <span className="relative z-20 font-[font2] group-hover:text-white transition-colors duration-300">
        {label}
      </span>
    </motion.button>
  );
};
