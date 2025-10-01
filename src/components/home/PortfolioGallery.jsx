import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import VideoThumbnailCard from './VideoThumbnailCard';
import VideoModal from './VideoModal';
import { MediaButton } from '../ui/MediaButton';
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from '../ui/carousel';

function PortfolioGallery({
  title = "Browse our video library",
  archiveButton = {
    text: "View gallery",
    href: "/projects"
  },
  videos = [],
  className = "",
  maxHeight = 120,
  spacing = "-space-x-60 md:-space-x-64 lg:-space-x-72", // updated spacing
  onVideoClick,
  pauseOnHover = true,
  marqueeRepeat = 4
}) {
  const [hoveredIndex, setHoveredIndex] = useState(null);
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [carouselApi, setCarouselApi] = useState(null);
  const [canScrollPrev, setCanScrollPrev] = useState(false);
  const [canScrollNext, setCanScrollNext] = useState(false);

  useEffect(() => {
    if (!carouselApi) return;

    const updateSelection = () => {
      setCanScrollPrev(carouselApi.canScrollPrev());
      setCanScrollNext(carouselApi.canScrollNext());
    };

    updateSelection();
    carouselApi.on('select', updateSelection);

    return () => {
      carouselApi.off('select', updateSelection);
    };
  }, [carouselApi]);

  const handleVideoClick = (video, index) => {
    setSelectedVideo(video);
    onVideoClick?.(index);
  };

  const handleCloseModal = () => {
    setSelectedVideo(null);
  };

  return (
    <>
      <div
        className={`relative min-h-screen py-20 px-4 ${className}`}
      >
        <div className="max-w-7xl mx-auto bg-black/30 backdrop-blur-sm rounded-2xl border border-white/10 overflow-hidden">
          <div className="relative z-10 text-center pt-16 pb-8 px-8">
            <h2 className="text-4xl md:text-6xl font-bold text-white mb-8 font-[font2]">
              {title}
            </h2>

            <Link to={archiveButton.href} className="mb-20 inline-block">
              <MediaButton label={archiveButton.text} mediaUrl="/button.webm" />
            </Link>
          </div>

          <div className="hidden md:block relative overflow-x-hidden overflow-y-visible h-[500px] -mb-[200px]">
            <div className={`flex ${spacing} pb-8 pt-40 items-end justify-center`}>
              {videos.map((video, index) => {
                const totalVideos = videos.length;
                const middle = Math.floor(totalVideos / 2);
                const distanceFromMiddle = Math.abs(index - middle);
                const staggerOffset = maxHeight - distanceFromMiddle * 20;
                const zIndex = totalVideos - index;
                const isHovered = hoveredIndex === index;
                const isOtherHovered = hoveredIndex !== null && hoveredIndex !== index;
                const yOffset = isHovered ? -120 : isOtherHovered ? 0 : -staggerOffset;

                return (
                  <motion.div
                    key={index}
                    className="group cursor-pointer flex-shrink-0"
                    style={{ zIndex }}
                    initial={{
                      transform: `perspective(5000px) rotateY(-45deg) translateY(200px)`,
                      opacity: 0,
                    }}
                    animate={{
                      transform: `perspective(5000px) rotateY(-45deg) translateY(${yOffset}px)`,
                      opacity: 1,
                    }}
                    transition={{
                      duration: 0.2,
                      delay: index * 0.05,
                      ease: [0.25, 0.1, 0.25, 1],
                    }}
                    onHoverStart={() => setHoveredIndex(index)}
                    onHoverEnd={() => setHoveredIndex(null)}
                    onClick={() => handleVideoClick(video, index)}
                  >
                    <VideoThumbnailCard video={video} onClick={() => handleVideoClick(video, index)} />
                  </motion.div>
                );
              })}
            </div>
          </div>

          <div className="block md:hidden relative pb-8">
            <Carousel
              setApi={setCarouselApi}
              opts={{
                breakpoints: {
                  "(max-width: 768px)": {
                    dragFree: true,
                  },
                },
              }}
            >
              <CarouselContent className="ml-0">
                {videos.map((video, index) => (
                  <CarouselItem key={index} className="pl-4 md:max-w-[452px]">
                    <VideoThumbnailCard video={video} onClick={() => handleVideoClick(video, index)} />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </div>
      </div>

      <VideoModal
        isOpen={!!selectedVideo}
        onClose={handleCloseModal}
        videoUrl={selectedVideo?.url || ''}
        title={selectedVideo?.title || 'Video'}
      />
    </>
  );
}

export default PortfolioGallery;
