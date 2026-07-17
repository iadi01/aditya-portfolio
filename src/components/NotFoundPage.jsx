import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { audioSynth } from '../utils/audioSynth';
import { navigateTo } from '../utils/router';

export default function NotFoundPage() {
  const COLS = 17;
  const ROWS = 15;

  // Game States: 'START', 'PLAYING', 'GAMEOVER'
  const [gameState, setGameState] = useState('START');
  const [score, setScore] = useState(0);
  const [highScore, setHighScore] = useState(() => {
    return parseInt(localStorage.getItem('google_snake_high_score') || '0', 10);
  });
  
  // Snake and Food state
  const [snake, setSnake] = useState([
    { x: 5, y: 7 },
    { x: 4, y: 7 },
    { x: 3, y: 7 }
  ]);
  const [food, setFood] = useState({ x: 12, y: 7 });
  const [direction, setDirection] = useState('RIGHT');
  const [isMuted, setIsMuted] = useState(false);
  const [screenGrid, setScreenGrid] = useState(true);
  const [speedMode, setSpeedMode] = useState('NORMAL'); // 'EASY' | 'NORMAL' | 'HARD'
  const [isFullScreen, setIsFullScreen] = useState(false);
  
  // Custom theme colors for controller outer frame
  const [consoleTheme, setConsoleTheme] = useState('bg-[#FCD34D]'); // default yellow

  // Refs for tracking mutable states in interval loops
  const stateRef = useRef({ gameState, snake, food, direction, score });
  stateRef.current = { gameState, snake, food, direction, score };

  // Lock body/html scroll to enforce exactly one-page viewport on mobile/desktop
  useEffect(() => {
    document.documentElement.style.overflow = 'hidden';
    document.documentElement.style.height = '100dvh';
    document.body.style.overflow = 'hidden';
    document.body.style.height = '100dvh';

    return () => {
      document.documentElement.style.overflow = '';
      document.documentElement.style.height = '';
      document.body.style.overflow = '';
      document.body.style.height = '';
    };
  }, []);

  // Sound triggers
  const playTurnSound = () => {
    if (isMuted) return;
    audioSynth.playTone(380, 'triangle', 0.05, 0.05);
  };

  const playEatSound = () => {
    if (isMuted) return;
    audioSynth.playTone(523.25, 'sine', 0.08, 0.1);
    setTimeout(() => audioSynth.playTone(659.25, 'sine', 0.08, 0.1), 80);
    setTimeout(() => audioSynth.playTone(783.99, 'sine', 0.12, 0.1), 160);
  };

  const playGameOverSound = () => {
    if (isMuted) return;
    audioSynth.playTone(220, 'sawtooth', 0.2, 0.12);
    setTimeout(() => audioSynth.playTone(165, 'sawtooth', 0.25, 0.12), 150);
    setTimeout(() => audioSynth.playTone(110, 'sawtooth', 0.4, 0.12), 300);
  };

  const playStartSound = () => {
    if (isMuted) return;
    audioSynth.playTone(523.25, 'sine', 0.06, 0.08);
    setTimeout(() => audioSynth.playTone(659.25, 'sine', 0.06, 0.08), 60);
  };

  // Start/Restart Game logic
  const startGame = () => {
    playStartSound();
    setScore(0);
    setSnake([
      { x: 5, y: 7 },
      { x: 4, y: 7 },
      { x: 3, y: 7 }
    ]);
    
    // Spawn food at a random position not overlapping snake
    const startSnake = [{ x: 5, y: 7 }, { x: 4, y: 7 }, { x: 3, y: 7 }];
    let newFood;
    do {
      newFood = {
        x: Math.floor(Math.random() * COLS),
        y: Math.floor(Math.random() * ROWS)
      };
    } while (startSnake.some(cell => cell.x === newFood.x && cell.y === newFood.y));
    
    setFood(newFood);
    setDirection('RIGHT');
    setGameState('PLAYING');
  };

  // Change direction safely
  const changeDirection = (newDir) => {
    const currentDir = stateRef.current.direction;
    if (newDir === 'UP' && currentDir === 'DOWN') return;
    if (newDir === 'DOWN' && currentDir === 'UP') return;
    if (newDir === 'LEFT' && currentDir === 'RIGHT') return;
    if (newDir === 'RIGHT' && currentDir === 'LEFT') return;
    
    playTurnSound();
    setDirection(newDir);
  };

  // Keyboard support
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (stateRef.current.gameState === 'PLAYING') {
        switch (e.key) {
          case 'ArrowUp':
            e.preventDefault();
            changeDirection('UP');
            break;
          case 'ArrowDown':
            e.preventDefault();
            changeDirection('DOWN');
            break;
          case 'ArrowLeft':
            e.preventDefault();
            changeDirection('LEFT');
            break;
          case 'ArrowRight':
            e.preventDefault();
            changeDirection('RIGHT');
            break;
          case 'b':
          case 'B':
            e.preventDefault();
            cycleSpeed();
            break;
          default:
            break;
        }
      } else {
        if (e.key === 'a' || e.key === 'A' || e.key === 'Enter') {
          e.preventDefault();
          startGame();
        }
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Snake game logic loop
  useEffect(() => {
    if (gameState !== 'PLAYING') return;

    const getSpeedDelay = () => {
      if (speedMode === 'EASY') return 220;
      if (speedMode === 'HARD') return 90;
      return 150; // NORMAL
    };

    const interval = setInterval(() => {
      const { snake: currentSnake, direction: currentDir, food: currentFood, score: currentScore } = stateRef.current;
      
      const head = currentSnake[0];
      let newHead = { ...head };

      switch (currentDir) {
        case 'UP': newHead.y -= 1; break;
        case 'DOWN': newHead.y += 1; break;
        case 'LEFT': newHead.x -= 1; break;
        case 'RIGHT': newHead.x += 1; break;
      }

      // Check boundary collisions
      if (
        newHead.x < 0 || newHead.x >= COLS ||
        newHead.y < 0 || newHead.y >= ROWS
      ) {
        handleGameOver();
        clearInterval(interval);
        return;
      }

      // Check self collision
      if (currentSnake.some(cell => cell.x === newHead.x && cell.y === newHead.y)) {
        handleGameOver();
        clearInterval(interval);
        return;
      }

      // Check food collision
      const ateFood = newHead.x === currentFood.x && newHead.y === currentFood.y;
      
      setSnake((prevSnake) => {
        const nextSnake = [newHead, ...prevSnake];
        if (!ateFood) {
          nextSnake.pop(); // Remove tail
        }
        return nextSnake;
      });

      if (ateFood) {
        playEatSound();
        const nextScore = currentScore + 1;
        setScore(nextScore);

        // Spawn new food
        let newFood;
        const newSnakeRepresentation = [newHead, ...currentSnake];
        do {
          newFood = {
            x: Math.floor(Math.random() * COLS),
            y: Math.floor(Math.random() * ROWS)
          };
        } while (newSnakeRepresentation.some(cell => cell.x === newFood.x && cell.y === newFood.y));

        setFood(newFood);
      }

    }, getSpeedDelay()); // Fluid gameplay speed

    return () => clearInterval(interval);
  }, [gameState, speedMode]);

  const handleGameOver = () => {
    playGameOverSound();
    setGameState('GAMEOVER');
    setHighScore((hs) => {
      const currentScore = stateRef.current.score;
      if (currentScore > hs) {
        localStorage.setItem('google_snake_high_score', currentScore.toString());
        return currentScore;
      }
      return hs;
    });
  };

  const isWatermarkCell = (x, y) => {
    // Number '4' (left)
    if (x === 3 && y >= 5 && y <= 7) return true;
    if (x === 4 && y === 7) return true;
    if (x === 5 && y >= 5 && y <= 9) return true;

    // Number '0' (middle)
    if (x === 7 && y >= 5 && y <= 9) return true;
    if (x === 8 && (y === 5 || y === 9)) return true;
    if (x === 9 && y >= 5 && y <= 9) return true;

    // Number '4' (right)
    if (x === 11 && y >= 5 && y <= 7) return true;
    if (x === 12 && y === 7) return true;
    if (x === 13 && y >= 5 && y <= 9) return true;

    return false;
  };

  const toggleTheme = () => {
    audioSynth.playTone(550, 'sawtooth', 0.08, 0.1);
    const themes = [
      'bg-[#FCD34D]', // Cyberpunk Yellow
      'bg-[#FF8DA1]', // Neon Pink
      'bg-[#C084FC]', // Pastel Purple
      'bg-[#34D399]'  // Retro Mint Green
    ];
    setConsoleTheme((current) => {
      const idx = themes.indexOf(current);
      return themes[(idx + 1) % themes.length];
    });
  };

  const cycleSpeed = () => {
    setSpeedMode((prev) => {
      const nextSpeed = prev === 'EASY' ? 'NORMAL' : prev === 'NORMAL' ? 'HARD' : 'EASY';
      const hz = nextSpeed === 'EASY' ? 350 : nextSpeed === 'NORMAL' ? 440 : 550;
      if (!isMuted) {
        audioSynth.playTone(hz, 'triangle', 0.08, 0.05);
      }
      return nextSpeed;
    });
  };

  const goHome = () => {
    audioSynth.playTone(523.25, 'sine', 0.1, 0.1);
    setTimeout(() => audioSynth.playTone(659.25, 'sine', 0.1, 0.1), 100);
    setTimeout(() => audioSynth.playTone(783.99, 'sine', 0.25, 0.1), 200);
    setTimeout(() => navigateTo('/'), 400);
  };

  return (
    <div className="h-[100dvh] w-full bg-[#FAF6EE] text-black font-mono flex flex-col justify-between items-center py-4 px-3 select-none overflow-hidden relative selection:bg-custom-yellow selection:text-black">
      {/* Background grid lines */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#EAE2D5_1px,transparent_1px),linear-gradient(to_bottom,#EAE2D5_1px,transparent_1px)] bg-[size:4rem_4rem] pointer-events-none z-0 opacity-70" />

      {/* Header */}
      {!isFullScreen && (
        <div className="z-10 text-center flex flex-col items-center flex-shrink-0">
          <motion.div 
            initial={{ rotate: -2, scale: 0.9 }}
            animate={{ rotate: 2, scale: 1 }}
            transition={{ repeat: Infinity, repeatType: "reverse", duration: 2.5, ease: "easeInOut" }}
            className="bg-[#E74C3C] text-white px-5 sm:px-8 py-1.5 sm:py-2.5 border-2 sm:border-4 border-black font-black text-sm sm:text-base md:text-lg shadow-[3px_3px_0_black] sm:shadow-[4px_4px_0_black]"
          >
            STATUS: 404 NOT FOUND
          </motion.div>
          <p className="hidden xs:block text-[9px] sm:text-xs font-bold text-gray-600 mt-2 max-w-xs sm:max-w-sm px-4 leading-relaxed">
            Oops! The page you were looking for doesn't exist. Re-calibrate your connections by eating apples in the Google Snake clone!
          </p>
        </div>
      )}

      {/* CONSOLE OUTER CASE */}
      <motion.div
        initial={{ y: 50, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ type: "spring", stiffness: 100, damping: 15 }}
        style={isFullScreen ? { transform: 'none' } : {}}
        className={`transition-all duration-300 flex flex-col items-center flex-shrink-0 ${
          isFullScreen 
            ? `fixed inset-0 w-screen h-screen z-[100] max-w-none rounded-none border-none p-4 sm:p-6 md:p-8 justify-between ${consoleTheme} overflow-y-auto`
            : `z-10 w-full max-w-[95vw] xs:max-w-[345px] sm:max-w-[370px] md:max-w-[390px] ${consoleTheme} border-4 sm:border-8 border-black rounded-[20px] sm:rounded-[24px] p-1.5 sm:p-4 shadow-[6px_6px_0px_rgba(0,0,0,1)] sm:shadow-[12px_12px_0px_rgba(0,0,0,1)] mt-1 mb-1 sm:mt-2 sm:mb-2`
        }`}
      >
        {/* Top Bezel Accents */}
        <div className="w-16 h-1 bg-black/20 rounded-full mb-3" />

        {/* SCREEN SECTION / GAME CONSOLE BOX */}
        <div className={`w-full bg-[#1A1A1A] border-6 border-black rounded-lg shadow-inner flex flex-col overflow-hidden relative transition-all duration-300 ${
          isFullScreen 
            ? 'max-w-[480px] md:max-w-[520px] aspect-[17/15] my-auto' 
            : ''
        }`}>
          {/* HEADER BAR (DARK GREEN) */}
          <div className="h-12 bg-[#4A752C] px-4 flex justify-between items-center text-white border-b-4 border-black flex-shrink-0">
            {/* Left side: Score and High Score */}
            <div className="flex items-center gap-4 text-sm font-black">
              {/* Apple Score */}
              <div className="flex items-center gap-1.5">
                {/* Red Apple SVG Icon */}
                <svg viewBox="0 0 512 512" className="w-5 h-5 fill-[#E74C3C] drop-shadow-[1px_1px_0px_black]">
                  <path d="M428.3 147.2c-15.6-18.7-38.3-30.8-63.5-34.6-26-3.9-52.9 5.8-72.8 17.5-12.7 7.5-22.3 13.5-36 13.5s-23.3-6-36-13.5c-19.9-11.7-46.8-21.4-72.8-17.5-25.2 3.8-47.9 15.9-63.5 34.6C54.4 182.4 32 239.5 32 301.8c0 109.9 83.2 201 190.7 201 23.1 0 42.4-8.8 62.5-17.3 18.5-7.8 38-16 53.3-16s34.8 8.2 53.3 16c20.1 8.5 39.4 17.3 62.5 17.3 107.5 0 190.7-91.1 190.7-201 0-62.3-22.4-119.4-52.7-154.6zm-172.3-43c2.2-22.5 15.9-42.5 35.8-54.8 2.6-1.6 4.7.6 3.5 3.3-11.8 26.6-35.8 45.4-38.1 53.8-1.2 4.4-2.2-1.1-1.2-2.3z" />
                </svg>
                <span>{score}</span>
              </div>
              {/* Gold Trophy High Score */}
              <div className="flex items-center gap-1.5">
                {/* Trophy SVG Icon */}
                <svg viewBox="0 0 576 512" className="w-5 h-5 fill-[#F1C40F] drop-shadow-[1px_1px_0px_black]">
                  <path d="M552 96h-64V48c0-26.51-21.49-48-48-48H136c-26.51 0-48 21.49-48 48v48H24C10.75 96 0 106.75 0 120v40c0 98.71 72.8 180.79 167.36 197.02C195.42 411.3 242.06 448 304 448h11.2c8.2 0 14.8-6.6 14.8-14.8v-72.31C433.91 346.72 512 284.14 512 160h40c13.25 0 24-10.75 24-24v-40c0-13.25-10.75-24-24-24zM88 224V144h48v112.57C107.67 249.27 88 238.15 88 224zm400 0c0 14.15-19.67 25.27-48 32.57V144h48v80z" />
                </svg>
                <span>{highScore}</span>
              </div>
              {/* Speed Mode Badge */}
              <div className="text-[8px] tracking-wider bg-black/30 border border-black/10 px-1.5 py-0.5 rounded font-black uppercase">
                {speedMode}
              </div>
            </div>

            {/* Right side: Volume and Actions */}
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  audioSynth.playTone(450, 'sine', 0.05, 0.05);
                  setIsMuted(!isMuted);
                }}
                className="w-8 h-8 rounded hover:bg-black/20 active:scale-95 flex items-center justify-center cursor-pointer transition border border-transparent hover:border-white/10"
                title={isMuted ? "Unmute" : "Mute"}
              >
                {isMuted ? (
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white drop-shadow-[1px_1px_0px_black]">
                    <path d="M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.21.05-.42.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white drop-shadow-[1px_1px_0px_black]">
                    <path d="M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z" />
                  </svg>
                )}
              </button>

              {/* Fullscreen Toggle Button */}
              <button
                onClick={() => {
                  audioSynth.playTone(480, 'sine', 0.05, 0.05);
                  setIsFullScreen(!isFullScreen);
                }}
                className="w-8 h-8 rounded hover:bg-black/20 active:scale-95 flex items-center justify-center cursor-pointer transition border border-transparent hover:border-white/10"
                title={isFullScreen ? "Exit Fullscreen" : "Fullscreen"}
              >
                {isFullScreen ? (
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white drop-shadow-[1px_1px_0px_black]">
                    <path d="M5 16h3v3h2v-5H5v2zm3-8H5v2h5V5H8v3zm6 11h2v-3h3v-2h-5v5zm2-11V5h-2v5h5V8h-3z" />
                  </svg>
                ) : (
                  <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white drop-shadow-[1px_1px_0px_black]">
                    <path d="M7 14H5v5h5v-2H7v-3zm-2-4h2V7h3V5H5v5zm12 7h-3v2h5v-5h-2v3zM14 5v2h3v3h2V5h-5z" />
                  </svg>
                )}
              </button>

              <button
                onClick={startGame}
                className="w-8 h-8 rounded hover:bg-black/20 active:scale-95 flex items-center justify-center cursor-pointer transition border border-transparent hover:border-white/10"
                title="Restart"
              >
                <svg viewBox="0 0 24 24" className="w-5 h-5 fill-white drop-shadow-[1px_1px_0px_black]">
                  <path d="M17.65 6.35C16.2 4.9 14.21 4 12 4c-4.42 0-7.99 3.58-7.99 8s3.57 8 7.99 8c3.73 0 6.84-2.55 7.73-6h-2.08c-.82 2.33-3.04 4-5.65 4-3.31 0-6-2.69-6-6s2.69-6 6-6c1.66 0 3.14.69 4.22 1.78L13 11h7V4l-2.35 2.35z" />
                </svg>
              </button>
            </div>
          </div>

          {/* SCREEN PLAYBOARD (17x15 CHECKERED GRID) */}
          <div className="w-full aspect-[17/15] relative bg-[#AAD751] border-b-4 border-black">
            {/* Screen Scanlines Scan Overlay */}
            {screenGrid && (
              <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(255,255,255,0.04)_50%,rgba(0,0,0,0.02)_50%)] bg-[size:100%_4px] z-30" />
            )}

            {/* START SCREEN */}
            {gameState === 'START' && (
              <div className="absolute inset-0 flex flex-col justify-center items-center p-4 text-center z-20 bg-[#4A752C] text-white">
                <h3 className="text-xl font-black uppercase tracking-tight text-white drop-shadow-[2px_2px_0_black] animate-pulse">
                  ERROR_404
                </h3>
                <p className="text-xs font-bold mt-2 text-[#AAD751]">
                  Oops! This page is missing.<br />
                  Repair connections by eating apples!<br />
                  <span className="text-white font-black">SPEED: {speedMode}</span>
                </p>
                <button
                  onClick={startGame}
                  className="mt-6 border-4 border-black bg-[#E74C3C] text-white px-5 py-2 font-black text-xs hover:bg-[#c0392b] active:translate-y-0.5 shadow-[4px_4px_0px_rgba(0,0,0,1)] cursor-pointer"
                >
                  PRESS [A] TO START
                </button>
                {highScore > 0 && (
                  <span className="text-[10px] font-black mt-3 text-white/80">
                    HI-SCORE: {highScore} APPLES
                  </span>
                )}
              </div>
            )}

            {/* PLAYING STATE */}
            {gameState === 'PLAYING' && (
              <div className="w-full h-full grid p-0.5">
                <div 
                  className="w-full h-full grid"
                  style={{
                    gridTemplateColumns: `repeat(${COLS}, minmax(0, 1fr))`,
                    gridTemplateRows: `repeat(${ROWS}, minmax(0, 1fr))`
                  }}
                >
                  {Array.from({ length: COLS * ROWS }).map((_, index) => {
                    const x = index % COLS;
                    const y = Math.floor(index / COLS);

                    const isSnake = snake.some(cell => cell.x === x && cell.y === y);
                    const isHead = snake[0].x === x && snake[0].y === y;
                    const isFood = food.x === x && food.y === y;
                    
                    // Checker pattern: light green vs dark green
                    const isCheckerLight = (x + y) % 2 === 0;
                    
                    // Render "404" watermark in slightly shaded green cells
                    const cellColor = isWatermarkCell(x, y)
                      ? (isCheckerLight ? 'bg-[#96C742]' : 'bg-[#8EBD3A]')
                      : (isCheckerLight ? 'bg-[#AAD751]' : 'bg-[#A2D149]');

                    return (
                      <div
                        key={index}
                        className={`w-full h-full ${cellColor} flex items-center justify-center relative`}
                      >
                        {/* Render Snake segment */}
                        {isSnake && (
                          <div 
                            className={`w-[96%] h-[96%] bg-[#4E7CF6] rounded-[4px] relative flex items-center justify-center ${
                              isHead ? 'z-20 shadow-md' : 'z-10'
                            }`}
                          >
                            {/* Googly Eyes on Head */}
                            {isHead && (
                              <div 
                                className={`absolute flex gap-[5px] justify-center items-center w-full h-full ${
                                  direction === 'UP' ? 'flex-row top-1' :
                                  direction === 'DOWN' ? 'flex-row bottom-1' :
                                  direction === 'LEFT' ? 'flex-col left-1' :
                                  'flex-col right-1'
                                }`}
                              >
                                {/* Eye 1 */}
                                <div className="w-2.5 h-2.5 bg-white rounded-full flex items-center justify-center relative shadow-sm">
                                  {/* Pupil looking in direction */}
                                  <div 
                                    className={`w-1.5 h-1.5 bg-black rounded-full absolute ${
                                      direction === 'UP' ? 'top-[1px]' :
                                      direction === 'DOWN' ? 'bottom-[1px]' :
                                      direction === 'LEFT' ? 'left-[1px]' :
                                      'right-[1px]'
                                    }`}
                                  />
                                </div>
                                {/* Eye 2 */}
                                <div className="w-2.5 h-2.5 bg-white rounded-full flex items-center justify-center relative shadow-sm">
                                  <div 
                                    className={`w-1.5 h-1.5 bg-black rounded-full absolute ${
                                      direction === 'UP' ? 'top-[1px]' :
                                      direction === 'DOWN' ? 'bottom-[1px]' :
                                      direction === 'LEFT' ? 'left-[1px]' :
                                      'right-[1px]'
                                    }`}
                                  />
                                </div>
                              </div>
                            )}
                          </div>
                        )}

                        {/* Render Food Apple */}
                        {isFood && (
                          <div className="w-[85%] h-[85%] bg-[#E74C3C] rounded-full relative flex justify-center items-center z-15 shadow-[0px_2px_4px_rgba(0,0,0,0.2)]">
                            {/* Stem */}
                            <div className="w-0.5 h-1.5 bg-[#5D4037] absolute top-[-4px] left-[50%] -translate-x-1/2 rounded-full" />
                            {/* Leaf */}
                            <div className="w-1.5 h-1.5 bg-[#2ECC71] absolute top-[-5px] left-[58%] rounded-full rotate-45" />
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* GAMEOVER SCREEN */}
            {gameState === 'GAMEOVER' && (
              <div className="absolute inset-0 flex flex-col justify-center items-center p-4 text-center z-20 bg-black/85 text-white">
                <h3 className="text-xl font-black uppercase tracking-tight text-[#E74C3C] animate-bounce">
                  404 GAME OVER
                </h3>
                <p className="text-sm font-bold mt-2 text-white/90">
                  APPLES EATEN: {score}
                </p>
                {score >= highScore && score > 0 && (
                  <p className="text-xs font-black text-[#F1C40F] uppercase mt-1 animate-pulse">
                    🏆 NEW HIGH RECORD!
                  </p>
                )}
                <button
                  onClick={startGame}
                  className="mt-6 border-4 border-black bg-[#4A752C] text-white px-5 py-2 font-black text-xs hover:bg-[#3d6024] active:translate-y-0.5 shadow-[4px_4px_0px_rgba(0,0,0,1)] cursor-pointer"
                >
                  PLAY AGAIN [A]
                </button>
              </div>
            )}
          </div>
        </div>

        {/* CONTROLS SECTION */}
        <div className={`w-full grid grid-cols-2 gap-2 sm:gap-4 items-center ${
          isFullScreen ? 'max-w-[480px] md:max-w-[520px] mt-4' : 'mt-2 sm:mt-4'
        }`}>
          {/* D-PAD CONTROLLER (Responsive Circle with massive tap sector overlays) */}
          <div className="relative w-22 h-22 sm:w-26 sm:h-26 bg-[#252525] border-4 border-black rounded-full shadow-[3px_3px_0_rgba(0,0,0,0.3)] overflow-hidden mx-auto flex items-center justify-center">
            {/* Background D-Pad Cross Graphic */}
            <div className="absolute w-[80%] h-[26%] bg-black rounded-sm pointer-events-none" />
            <div className="absolute w-[26%] h-[80%] bg-black rounded-sm pointer-events-none" />
            
            {/* Center Cap Circle */}
            <div className="absolute w-[32%] h-[32%] bg-[#353535] rounded-full border-2 border-black z-20 pointer-events-none" />

            {/* UP Tap Sector Button */}
            <button
              onClick={() => changeDirection('UP')}
              className="absolute top-0 left-[25%] w-[50%] h-[38%] bg-transparent hover:bg-white/10 active:bg-white/20 z-10 cursor-pointer border-none outline-none"
              aria-label="Move Up"
            />
            {/* DOWN Tap Sector Button */}
            <button
              onClick={() => changeDirection('DOWN')}
              className="absolute bottom-0 left-[25%] w-[50%] h-[38%] bg-transparent hover:bg-white/10 active:bg-white/20 z-10 cursor-pointer border-none outline-none"
              aria-label="Move Down"
            />
            {/* LEFT Tap Sector Button */}
            <button
              onClick={() => changeDirection('LEFT')}
              className="absolute left-0 top-[25%] w-[38%] h-[50%] bg-transparent hover:bg-white/10 active:bg-white/20 z-10 cursor-pointer border-none outline-none"
              aria-label="Move Left"
            />
            {/* RIGHT Tap Sector Button */}
            <button
              onClick={() => changeDirection('RIGHT')}
              className="absolute right-0 top-[25%] w-[38%] h-[50%] bg-transparent hover:bg-white/10 active:bg-white/20 z-10 cursor-pointer border-none outline-none"
              aria-label="Move Right"
            />
          </div>

          {/* ACTION BUTTONS (A & B) */}
          <div className="flex justify-end gap-2 sm:gap-3 h-full items-center pr-1 sm:pr-2 rotate-[-8deg] mx-auto">
            <div className="flex flex-col items-center">
              <button
                onClick={cycleSpeed}
                className="w-7 h-7 sm:w-9 sm:h-9 bg-red-600 border-2 sm:border-4 border-black rounded-full active:translate-y-0.5 active:shadow-none shadow-[2px_2px_0px_black] hover:bg-red-500 cursor-pointer flex items-center justify-center font-bold text-white text-[10px] sm:text-xs"
                aria-label="Button B"
              >
                B
              </button>
              <span className="text-[6px] sm:text-[7px] font-black text-black/50 mt-1 uppercase">SPEED</span>
            </div>
            <div className="flex flex-col items-center">
              <button
                onClick={() => {
                  if (gameState === 'START' || gameState === 'GAMEOVER') {
                    startGame();
                  } else {
                    audioSynth.playTone(660, 'sine', 0.05, 0.05);
                  }
                }}
                className="w-7 h-7 sm:w-9 sm:h-9 bg-red-600 border-2 sm:border-4 border-black rounded-full active:translate-y-0.5 active:shadow-none shadow-[2px_2px_0px_black] hover:bg-red-500 cursor-pointer flex items-center justify-center font-bold text-white text-[10px] sm:text-xs"
                aria-label="Button A"
              >
                A
              </button>
              <span className="text-[6px] sm:text-[7px] font-black text-black/50 mt-1 uppercase">START</span>
            </div>
          </div>
        </div>

        {/* START & SELECT BUTTONS */}
        <div className={`w-full flex justify-center gap-6 ${isFullScreen ? 'mt-4 mb-2' : 'mt-4'}`}>
          <div className="flex flex-col items-center">
            <button
              onClick={toggleTheme}
              className="w-12 h-3 bg-black/60 rounded-full border border-black/40 shadow-[1px_1px_0px_black] hover:bg-black/80 active:translate-y-0.5 cursor-pointer rotate-[-20deg]"
              aria-label="Select Theme"
            />
            <span className="text-[7px] font-black text-black/50 mt-1 uppercase">THEME</span>
          </div>
          <div className="flex flex-col items-center">
            <button
              onClick={goHome}
              className="w-12 h-3 bg-black/60 rounded-full border border-black/40 shadow-[1px_1px_0px_black] hover:bg-black/80 active:translate-y-0.5 cursor-pointer rotate-[-20deg]"
              aria-label="Exit Game"
            />
            <span className="text-[7px] font-black text-black/50 mt-1 uppercase">EXIT</span>
          </div>
        </div>

        {/* Brand Sticker */}
        <div className="mt-4 text-[9px] font-black tracking-widest text-black/40">
          RETRO 404 ARCADE MACHINE
        </div>
      </motion.div>

      {/* FOOTER BUTTON */}
      {!isFullScreen && (
        <div className="z-10 mt-1 text-center flex flex-col items-center flex-shrink-0">
          <button
            onClick={goHome}
            onMouseEnter={() => audioSynth.playHover()}
            className="bg-[#34D399] px-4 sm:px-6 py-2 sm:py-3 border-2 sm:border-4 border-black font-black text-xs sm:text-base shadow-[3px_3px_0px_rgba(0,0,0,1)] sm:shadow-[6px_6px_0px_rgba(0,0,0,1)] hover:translate-x-0.5 hover:-translate-y-0.5 hover:shadow-none transition-all cursor-pointer inline-flex items-center gap-1.5"
          >
            🛸 RETURN TO EARTH
          </button>
          <span className="hidden sm:block text-[8px] text-gray-500 font-bold mt-1.5">
            (Keyboard: use ARROW keys to navigate snake, [A] to Start/Retry, [B] to change Speed)
          </span>
        </div>
      )}
    </div>
  );
}
