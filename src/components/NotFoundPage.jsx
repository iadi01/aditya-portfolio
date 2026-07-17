import { motion } from 'framer-motion';
import { navigateTo } from '../utils/router';
import { audioSynth } from '../utils/audioSynth';

export default function NotFoundPage() {
  const handleGoHome = () => {
    audioSynth.playClick();
    navigateTo('/');
  };

  return (
    <div className="min-h-screen bg-[#fafafa] text-black flex flex-col items-center justify-center p-6 md:p-12 font-sans select-none relative overflow-hidden">
      
      {/* Background Decorative Grid Matrix (Top Right) */}
      <div className="absolute top-12 right-12 opacity-60 hidden md:block">
        <div className="grid grid-cols-5 gap-2 w-12">
          {[...Array(15)].map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-black" />
          ))}
        </div>
      </div>

      {/* Background Decorative Grid Matrix (Bottom Left) */}
      <div className="absolute bottom-16 left-12 opacity-60 hidden md:block">
        <div className="grid grid-cols-5 gap-2 w-12">
          {[...Array(15)].map((_, i) => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-black" />
          ))}
        </div>
      </div>

      {/* Decorative Purple Staircase (Bottom Right) */}
      <div className="absolute bottom-0 right-0 z-0 pointer-events-none">
        <svg viewBox="0 0 100 100" className="w-36 h-36 md:w-52 md:h-52 drop-shadow-[6px_6px_0px_rgba(0,0,0,1)]">
          <path 
            d="M 0,100 L 0,75 L 25,75 L 25,50 L 50,50 L 50,25 L 75,25 L 75,0 L 100,0 L 100,100 Z" 
            fill="#a78bfa" 
            stroke="black" 
            strokeWidth="5" 
          />
        </svg>
      </div>

      {/* Decorative Black Zigzag Line (Middle Left) */}
      <div className="absolute top-1/2 left-8 md:left-24 z-0 pointer-events-none transform -translate-y-1/2 opacity-80">
        <svg viewBox="0 0 60 20" className="w-16 h-6 md:w-24 md:h-8">
          <path 
            d="M 0,10 L 10,0 L 20,10 L 30,0 L 40,10 L 50,0 L 60,10" 
            fill="none" 
            stroke="black" 
            strokeWidth="5" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />
        </svg>
      </div>

      {/* Decorative Black Zigzag Line (Top Right) */}
      <div className="absolute top-24 right-24 md:right-48 z-0 pointer-events-none opacity-80 hidden md:block">
        <svg viewBox="0 0 60 20" className="w-20 h-6">
          <path 
            d="M 0,10 L 10,0 L 20,10 L 30,0 L 40,10 L 50,0 L 60,10" 
            fill="none" 
            stroke="black" 
            strokeWidth="5" 
            strokeLinecap="round" 
            strokeLinejoin="round" 
          />
        </svg>
      </div>

      {/* Decorative Small Pink Square (Left Side) */}
      <div className="absolute top-1/3 left-16 md:left-48 w-8 h-8 bg-custom-pink border-4 border-black shadow-[4px_4px_0px_rgba(0,0,0,1)] rounded-md transform -rotate-12 hidden md:block" />

      {/* Decorative Small Purple Square (Top Right) */}
      <div className="absolute top-16 right-1/3 w-6 h-6 bg-custom-purple border-4 border-black rounded-md transform rotate-45 hidden md:block" />

      {/* Decorative Diagonal Striped Square (Bottom Left) */}
      <div 
        className="absolute bottom-20 left-16 md:left-32 w-16 h-16 border-4 border-black shadow-[6px_6px_0px_rgba(0,0,0,1)] rounded-md hidden md:block"
        style={{
          backgroundImage: 'repeating-linear-gradient(-45deg, #000, #000 6px, #fff 6px, #fff 12px)'
        }}
      />

      {/* Main Grid Wrapper */}
      <div className="w-full max-w-5xl grid grid-cols-1 md:grid-cols-12 gap-8 items-center justify-center relative z-10">
        
        {/* Left Column - Text Content */}
        <motion.div 
          initial={{ x: -50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="col-span-1 md:col-span-6 flex flex-col items-center md:items-start text-center md:text-left"
        >
          {/* Oops Badge */}
          <motion.div 
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            className="bg-custom-pink border-4 border-black px-4 py-1.5 font-mono font-black text-sm uppercase rounded-xl shadow-[4px_4px_0px_rgba(0,0,0,1)] inline-block rotate-[-3deg] transform my-2"
          >
            OOPS!
          </motion.div>

          {/* 404 Text */}
          <div className="flex gap-2 text-8xl md:text-[10rem] font-shrikhand tracking-tighter leading-none select-none my-4">
            <span 
              className="text-[#a78bfa] drop-shadow-[6px_6px_0px_rgba(0,0,0,1)]"
              style={{ WebkitTextStroke: '4px black' }}
            >
              4
            </span>
            <span 
              className="text-[#ccff00] drop-shadow-[6px_6px_0px_rgba(0,0,0,1)]"
              style={{ WebkitTextStroke: '4px black' }}
            >
              0
            </span>
            <span 
              className="text-[#ff9fac] drop-shadow-[6px_6px_0px_rgba(0,0,0,1)]"
              style={{ WebkitTextStroke: '4px black' }}
            >
              4
            </span>
          </div>

          {/* Page Not Found Banner */}
          <div className="bg-custom-purple border-4 border-black px-6 py-2 rounded-2xl shadow-[4px_4px_0px_rgba(0,0,0,1)] inline-block my-2 rotate-[1deg] transform">
            <span className="text-black font-black text-xl md:text-2xl uppercase tracking-wider">
              PAGE NOT FOUND
            </span>
          </div>

          {/* Description Card */}
          <div className="bg-white border-4 border-black p-5 rounded-2xl shadow-[6px_6px_0px_rgba(0,0,0,1)] max-w-sm my-6 text-left transform -rotate-[1deg]">
            <p className="font-bold text-base leading-relaxed text-gray-800">
              Looks like you've wandered into the <span className="bg-custom-yellow px-1.5 py-0.5 border-2 border-black font-black">void.</span> Let's get you back!
            </p>
          </div>

          {/* Take me Home Button */}
          <button
            onClick={handleGoHome}
            onMouseEnter={() => audioSynth.playHover()}
            className="bg-[#ccff00] border-4 border-black px-8 py-4 font-mono font-black text-base uppercase rounded-2xl shadow-[6px_6px_0px_rgba(0,0,0,1)] hover:translate-y-1 hover:shadow-none transition-all flex items-center justify-center gap-3 cursor-pointer text-black"
          >
            TAKE ME HOME <span className="text-lg font-sans">➔</span>
          </button>
        </motion.div>

        {/* Right Column - Character Illustration */}
        <motion.div 
          initial={{ x: 50, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="col-span-1 md:col-span-6 flex items-center justify-center relative mt-8 md:mt-0"
        >
          {/* Main Octagon Container with Drop Shadow */}
          <div className="w-[18rem] h-[18rem] md:w-[26rem] md:h-[26rem] relative">
            
            {/* Background SVG Octagon with Dot Halftone Pattern */}
            <svg viewBox="0 0 100 100" className="w-full h-full drop-shadow-[10px_10px_0px_rgba(0,0,0,1)] absolute inset-0">
              <defs>
                <pattern id="octagon-dots" width="4" height="4" patternUnits="userSpaceOnUse">
                  <circle cx="2" cy="2" r="0.75" fill="black" opacity="0.4" />
                </pattern>
              </defs>
              {/* Main solid neon yellow-green octagon */}
              <polygon 
                points="30,5 70,5 95,30 95,70 70,95 30,95 5,70 5,30" 
                fill="#ccff00" 
                stroke="black" 
                strokeWidth="3" 
              />
              {/* Halftone dot pattern overlay on the right half of the octagon */}
              <polygon 
                points="50,5 70,5 95,30 95,70 70,95 50,95" 
                fill="url(#octagon-dots)" 
              />
            </svg>

            {/* Scribble Spiral above character head */}
            <div className="absolute top-4 left-[40%] transform -translate-x-1/2 z-20 pointer-events-none opacity-90">
              <svg viewBox="0 0 50 50" className="w-14 h-14 md:w-20 md:h-20">
                <path 
                  d="M25,40 C35,35 40,25 30,15 C20,5 10,15 20,25 C30,35 35,20 25,10 C15,0 5,10 15,20" 
                  fill="none" 
                  stroke="black" 
                  strokeWidth="3.5" 
                  strokeLinecap="round" 
                />
              </svg>
            </div>

            {/* Question Mark Speech Bubble */}
            <div className="absolute top-2 right-6 md:right-12 z-20 bg-white border-4 border-black p-2 rounded-2xl shadow-[4px_4px_0px_rgba(0,0,0,1)] flex items-center justify-center font-shrikhand text-2xl md:text-3xl w-11 h-11 md:w-14 md:h-14 transform rotate-[6deg]">
              ?
              {/* Speech bubble tail */}
              <div className="absolute -bottom-2 left-3 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[10px] border-t-black" />
              <div className="absolute -bottom-1 left-3 w-0 h-0 border-l-[6px] border-l-transparent border-r-[6px] border-r-transparent border-t-[8px] border-t-white" />
            </div>

            {/* Sitting Character Image */}
            <div className="absolute inset-0 z-10 flex items-center justify-center p-2">
              <img 
                src="/404-character.png" 
                alt="404 Error Character" 
                className="w-[85%] h-[85%] object-contain"
                draggable="false"
              />
            </div>
            
          </div>
        </motion.div>
        
      </div>

    </div>
  );
}
