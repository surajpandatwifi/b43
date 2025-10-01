import { useGSAP } from '@gsap/react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/all'
import PageWrapper from '../components/common/PageWrapper'
import { Link } from 'react-router-dom'
import PortfolioShowcase from '../components/projects/PortfolioShowcase'

/**
 * Projects component - Now displays YouTube videos in a responsive grid
 * 
 * Key changes from original:
 * - Replaced image URLs with YouTube video IDs
 * - Updated layout to support 3-4 videos per row on desktop, 2 on tablet, 1 on mobile
 * - Removed "Voir le projet" overlay (not needed for videos)
 * - Added proper spacing and responsive design for video content
 * - Structured to easily support 31+ videos without layout issues
 */
const Projects = () => {

  // Teasers section - replaced with provided video IDs
  const teasers = [
    { videoId: 'QGsa5QB5gK4' },
    { videoId: '5fR4MErzYeI' },
    { videoId: '2qFnRXpSFn8' },
    { videoId: '7bZ5MKY6pfU' },
    { videoId: 'QstSPHan4oE' },
    { videoId: 'HMJyD-kPWek' },
    { videoId: 'zd5De3LAMQc' },
    { videoId: 'HMJyD-kPWek' },
    { videoId: 'YM1TZnbcbOs' },
    { videoId: 'pRya97qUJMs' },
    { videoId: 'AqqGxOrwv_g' }
  ]

  // Highlights section - starts with last provided videoId, rest unchanged
  const highlights = [
    { videoId: '2qFnRXpSFn8' },
    { videoId: 'dRjCKw7YonM' },
    { videoId: 'L9PMwOelcRk' },
    { videoId: 'qeMFqkcPYcg' },
    { videoId: 'SQoA_wjmE9w' },
    { videoId: 'ZbZSe6N_BXs' },
    { videoId: 'HEXWRTEbj1I' },
    { videoId: 'U9t-slLl69E' },
    { videoId: 'iik25wqIuFo' },
    { videoId: 'C0DPdy98e4c' },
    { videoId: 'YQHsXMglC9A' },
    { videoId: 'AdUw5RdyZxI' },
    { videoId: 'hTWKbfoikeg' },
    { videoId: 'NUYvbT6vTPs' },
    { videoId: 'RgKAFK5djSk' },
    { videoId: 'uelHwf8o7_U' },
    { videoId: 'EhxJLojIE_o' },
    { videoId: 'KQ6zr6kCPj8' },
    { videoId: 'MtN1YnoL46Q' },
    { videoId: 'sOnqjkJTMaA' }
  ]

  gsap.registerPlugin(ScrollTrigger)

  useGSAP(function () {
    gsap.fromTo('.video-container', 
      {
        opacity: 0,
        scale: 0.95,
        y: 30
      },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.6,
        ease: "power2.out",
        stagger: {
          amount: 0.4
        },
        scrollTrigger: {
          trigger: '.video-container',
          start: 'top 85%',
          toggleActions: 'play none none none'
        }
      }
    )

    gsap.fromTo('.section-title',
      {
        opacity: 0,
        y: 20
      },
      {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power2.out",
        stagger: 0.15,
        scrollTrigger: {
          trigger: '.section-title',
          start: 'top 90%',
          toggleActions: 'play none none none'
        }
      }
    )
  })

  return (
    <PageWrapper className='section-dark'>
      <div className="cinematic-overlay"></div>
      <div className='container mx-auto section-padding mb-[30vh] sm:mb-[40vh] lg:mb-[50vh]'>
      {/* Page Header */}
      <div className='pt-[25vh] sm:pt-[30vh] lg:pt-[35vh] component-margin flex flex-col items-center justify-center text-center'>
        <div className='floating-panel-dark space-y-8 sm:space-y-10 lg:space-y-12 mx-auto'>
          <h1 className='font-[font2] heading-responsive-xl uppercase text-white text-layer-3 text-glow'>
            The designs that turn vision into a bold reality
          </h1>
          <div className='flex justify-center items-center'>
            <Link 
              to='/contact'
              className='btn-pill btn-primary h-12 sm:h-16 lg:h-20 px-8 sm:px-12 lg:px-16 inline-flex items-center justify-center group'
            >
              <span className='font-[font2] text-base sm:text-xl lg:text-2xl'>
                Get In Touch Today
              </span>
            </Link>
          </div>
        </div>
      </div>

      <div className='projects-content space-y-16 sm:space-y-24 lg:space-y-32'>
        {/* Teasers Section */}
        <PortfolioShowcase
          videos={teasers}
          category="Teasers"
          title="Teasers"
        />

        {/* Highlights Section */}
        <PortfolioShowcase
          videos={highlights}
          category="Highlights"
          title="Highlights"
        />
      </div>
      </div>
    </PageWrapper>
  )
}

export default Projects
