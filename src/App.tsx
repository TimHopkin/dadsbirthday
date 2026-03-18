/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */
import { motion, AnimatePresence } from 'motion/react';
import { useEffect, useRef, useState } from 'react';
import { Guitar } from 'lucide-react';
import Confetti from './components/Confetti';
import photo1 from './assets/IMG_9114.JPG';
import photo2 from './assets/IMG_8984.JPG';
import photo3 from './assets/IMG_8299.JPG';
import photo4 from './assets/2c17a814-1ae8-4567-be84-f83eaedf964d.jpg';
import photo5 from './assets/5249a938-6561-42a7-9242-bb51e28732ae.jpg';
import photo6 from './assets/Screenshot 2026-03-18 at 09.09.17.png';
import music from './assets/The_Unwavering.mp3';

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
};

const photos = [
  { src: photo1, position: 'center' },
  { src: photo2, position: 'center' },
  { src: photo3, position: 'center' },
  { src: photo4, position: 'center' },
  { src: photo5, position: 'center' },
  { src: photo6, position: 'center' },
];

const carouselVariants = {
  enter: (direction: number) => ({
    x: direction > 0 ? 300 : -300,
    opacity: 0,
    scale: 0.8,
    rotate: direction > 0 ? 5 : -5,
  }),
  center: {
    zIndex: 1,
    x: 0,
    opacity: 1,
    scale: 1,
    rotate: 0,
    transition: {
      duration: 0.8,
      ease: [0.4, 0, 0.2, 1],
    },
  },
  exit: (direction: number) => ({
    zIndex: 0,
    x: direction < 0 ? 300 : -300,
    opacity: 0,
    scale: 0.8,
    rotate: direction < 0 ? 5 : -5,
    transition: {
      duration: 0.8,
      ease: [0.4, 0, 0.2, 1],
    },
  }),
};

const imageVariants = {
  hidden: { opacity: 0, scale: 0.8, rotate: 0 },
  visible: (i: number) => ({
    opacity: 1,
    scale: 1,
    rotate: [0, -2, 2, -1, 1][i % 5],
    transition: {
      duration: 0.8,
      ease: [0.43, 0.13, 0.23, 0.96],
      delay: i * 0.1
    },
  }),
};

const landingVariants = {
  initial: { opacity: 0, scale: 0.9, y: 20 },
  animate: { opacity: 1, scale: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  exit: {
    opacity: 0,
    scale: 1.05,
    transition: { duration: 0.5, ease: "easeInOut" }
  }
};

const guitarVariants = {
  animate: {
    rotate: [0, -5, 5, -3, 3, 0],
    transition: { duration: 4, repeat: Infinity, ease: "easeInOut" }
  }
};

export default function App() {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [muted, setMuted] = useState(false);
  const [started, setStarted] = useState(false);
  const [isOpened, setIsOpened] = useState(false);
  const [[page, direction], setPage] = useState([0, 0]);

  const photoIndex = Math.abs(page) % photos.length;

  const paginate = (newDirection: number) => {
    setPage([page + newDirection, newDirection]);
  };

  // Auto-play carousel
  useEffect(() => {
    if (!isOpened) return;
    const timer = setInterval(() => {
      paginate(1);
    }, 4000);
    return () => clearInterval(timer);
  }, [isOpened, page]);

  // Play on first user interaction (browsers block autoplay without it)
  useEffect(() => {
    if (isOpened) return;

    const startAudio = () => {
      if (!started && audioRef.current) {
        audioRef.current.play().catch(() => { });
        setStarted(true);
      }
    };
    window.addEventListener('click', startAudio, { once: true });
    window.addEventListener('touchstart', startAudio, { once: true });
    return () => {
      window.removeEventListener('click', startAudio);
      window.removeEventListener('touchstart', startAudio);
    };
  }, [started, isOpened]);

  const handleOpen = () => {
    setIsOpened(true);
    if (audioRef.current) {
      audioRef.current.play().catch(() => { });
      setStarted(true);
    }
  };

  const toggleMute = () => {
    if (audioRef.current) {
      audioRef.current.muted = !muted;
      setMuted(!muted);
    }
  };

  return (
    <main
      className="min-h-screen flex items-center justify-center p-2 sm:p-4 font-sans text-white relative overflow-hidden"
      style={{ background: 'radial-gradient(ellipse at 50% 35%, #1e1306 0%, #09080f 55%, #05050a 100%)' }}
    >
      {/* Background Texture Overlay */}
      <div className="absolute inset-0 opacity-5 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')]"></div>

      {/* Animated stage-light orbs */}
      <motion.div
        className="absolute top-[20%] left-[50%] -translate-x-1/2 w-[700px] h-[500px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(180,100,10,0.18) 0%, transparent 70%)' }}
        animate={{ scale: [1, 1.15, 1], opacity: [0.7, 1, 0.7] }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
      />
      <motion.div
        className="absolute bottom-[10%] left-[15%] w-[400px] h-[400px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(120,60,5,0.12) 0%, transparent 70%)' }}
        animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.9, 0.5] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut', delay: 3 }}
      />
      <motion.div
        className="absolute top-[10%] right-[10%] w-[300px] h-[300px] rounded-full pointer-events-none"
        style={{ background: 'radial-gradient(ellipse, rgba(160,80,8,0.1) 0%, transparent 70%)' }}
        animate={{ scale: [1, 1.25, 1], opacity: [0.4, 0.8, 0.4] }}
        transition={{ duration: 12, repeat: Infinity, ease: 'easeInOut', delay: 5 }}
      />

      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at center, transparent 40%, rgba(0,0,0,0.7) 100%)' }}></div>

      {/* Background music */}
      <audio ref={audioRef} src={music} loop />

      {/* Mute / unmute button - only show if opened */}
      <AnimatePresence>
        {isOpened && (
          <motion.button
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            onClick={toggleMute}
            title={muted ? 'Unmute music' : 'Mute music'}
            className="fixed bottom-6 right-6 z-50 bg-amber-900/40 hover:bg-amber-800/50 backdrop-blur-sm text-amber-300 rounded-full w-12 h-12 flex items-center justify-center text-xl shadow-lg transition-colors border border-amber-500/30"
          >
            {muted ? '🔇' : '🎵'}
          </motion.button>
        )}
      </AnimatePresence>

      <AnimatePresence mode="wait">
        {!isOpened ? (
          <motion.div
            key="landing"
            variants={landingVariants}
            initial="initial"
            animate="animate"
            exit="exit"
            className="flex flex-col items-center justify-center text-center z-10 p-4"
          >
            <motion.div
              className="bg-slate-900/80 backdrop-blur-xl p-8 sm:p-14 rounded-[1.5rem] sm:rounded-[2rem] border-2 border-amber-500/30 shadow-[0_20px_50px_rgba(0,0,0,0.6),0_0_80px_rgba(212,160,23,0.12)] w-full max-w-lg relative overflow-hidden"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              {/* Decorative guitar in landing */}
              <motion.div
                className="absolute -top-10 -right-10 text-amber-400 opacity-15"
                variants={guitarVariants}
                animate="animate"
              >
                <Guitar size={150} />
              </motion.div>

              <motion.h1
                className="font-serif text-6xl sm:text-8xl font-bold mb-10 leading-tight relative z-10"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2, duration: 0.8 }}
              >
                <span className="text-amber-400 block">Happy</span>
                <span className="text-amber-200 block">Birthday</span>
                <span className="text-amber-300 block font-script text-8xl sm:text-9xl -mt-4">Dad!</span>
              </motion.h1>

              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 25px 30px -5px rgba(0,0,0,0.4)" }}
                whileTap={{ scale: 0.95 }}
                onClick={handleOpen}
                className="px-12 py-6 bg-gradient-to-r from-amber-700 via-amber-500 to-yellow-500 rounded-full font-bold text-2xl text-slate-950 shadow-2xl flex items-center gap-3 mx-auto group relative z-10 border border-amber-300/30"
              >
                <span>Open Card</span>
                <motion.span
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >🎸</motion.span>
              </motion.button>
            </motion.div>
          </motion.div>
        ) : (
          <motion.div
            key="card"
            className="w-full max-w-6xl mx-auto my-1 sm:my-4 z-10 p-4 sm:p-8 rounded-2xl sm:rounded-[3rem] border-2 border-amber-500/30 shadow-[0_30px_60px_rgba(0,0,0,0.7),0_0_120px_rgba(212,160,23,0.1)] bg-slate-900/70 backdrop-blur-xl flex flex-col items-center justify-center relative overflow-hidden min-h-[calc(100dvh-1rem)] sm:min-h-[600px]"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <Confetti />

            {/* Animated Guitar Motif */}
            <motion.div
              className="absolute top-8 right-8 text-amber-400/20"
              variants={guitarVariants}
              animate="animate"
            >
              <Guitar size={80} strokeWidth={1.5} />
            </motion.div>

            <div className="flex flex-col md:flex-row w-full gap-8 items-center">
              {/* Text section */}
              <motion.div
                className="p-2 sm:p-8 flex flex-col justify-center text-center md:text-left w-full md:w-1/2"
                variants={itemVariants}
              >
                <motion.h1
                  className="font-serif text-4xl sm:text-7xl font-bold leading-tight"
                  variants={itemVariants}
                >
                  <span className="text-amber-400">Happy</span>{' '}
                  <span className="text-amber-200">Birthday</span>{' '}
                  <span className="text-amber-300 font-script text-6xl sm:text-9xl block -mt-2">Dad</span>
                </motion.h1>

                <motion.div className="mt-6 sm:mt-8 space-y-4" variants={itemVariants}>
                  <div className="flex items-center gap-3 justify-center md:justify-start">
                    <p className="text-lg text-amber-300 font-semibold leading-relaxed">
                      To another year of projects, adventures, sports and making things happen with those you love
                    </p>
                    <motion.div
                      variants={guitarVariants}
                      animate="animate"
                      className="text-amber-400 shrink-0"
                    >
                      <Guitar size={22} />
                    </motion.div>
                  </div>
                  <p className="text-lg text-white/80 leading-relaxed">
                    Thank you for all you do for us
                  </p>
                </motion.div>

                <motion.div
                  className="mt-8 sm:mt-10 text-xl text-white space-y-2"
                  variants={itemVariants}
                >
                  <p className="opacity-70 text-amber-100">Lots of love,</p>
                  <p className="font-script text-7xl text-amber-400 -ml-2 drop-shadow-lg">
                    Tim
                  </p>
                  <p className="text-2xl text-amber-300 font-semibold -mt-2">x</p>
                </motion.div>
              </motion.div>

              {/* Image Carousel Section */}
              <div className="w-full md:w-1/2 h-[300px] sm:h-[500px] relative flex shadow-inner items-center justify-center p-4">
                <AnimatePresence initial={false} custom={direction}>
                  <motion.div
                    key={page}
                    custom={direction}
                    variants={carouselVariants}
                    initial="enter"
                    animate="center"
                    exit="exit"
                    className="absolute w-full h-full p-4"
                  >
                    <img
                      src={photos[photoIndex].src}
                      alt={`Memory ${photoIndex + 1}`}
                      className="w-full h-full object-cover rounded-3xl shadow-2xl border-4 border-amber-500/60 pointer-events-none"
                      style={{ objectPosition: photos[photoIndex].position }}
                    />
                  </motion.div>
                </AnimatePresence>

                {/* Navigation indicators */}
                <div className="absolute bottom-[-10px] flex gap-2 z-20">
                  {photos.map((_, i) => (
                    <motion.div
                      key={i}
                      className={`h-2 w-2 rounded-full ${i === photoIndex ? 'bg-amber-400' : 'bg-white/20'}`}
                      animate={{ scale: i === photoIndex ? 1.5 : 1 }}
                    />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  );
}
