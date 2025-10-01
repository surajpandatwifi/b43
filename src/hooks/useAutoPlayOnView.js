import { useEffect, useRef } from 'react';

export const useAutoPlayOnView = (threshold = 0.6) => {
  const elementsRef = useRef([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const iframe = entry.target;

          if (entry.isIntersecting) {
            const src = iframe.getAttribute('data-src');
            if (src && !iframe.src) {
              iframe.src = src;
            }

            if (iframe.contentWindow) {
              try {
                iframe.contentWindow.postMessage(
                  '{"event":"command","func":"playVideo","args":""}',
                  '*'
                );
              } catch (e) {
                console.log('Autoplay attempt:', e);
              }
            }
          } else {
            if (iframe.contentWindow) {
              try {
                iframe.contentWindow.postMessage(
                  '{"event":"command","func":"pauseVideo","args":""}',
                  '*'
                );
              } catch (e) {
                console.log('Pause attempt:', e);
              }
            }
          }
        });
      },
      { threshold }
    );

    const currentElements = elementsRef.current;
    currentElements.forEach((element) => {
      if (element) observer.observe(element);
    });

    return () => {
      currentElements.forEach((element) => {
        if (element) observer.unobserve(element);
      });
    };
  }, [threshold]);

  const registerElement = (element) => {
    if (element && !elementsRef.current.includes(element)) {
      elementsRef.current.push(element);
    }
  };

  const clearElements = () => {
    elementsRef.current = [];
  };

  return { registerElement, clearElements };
};
