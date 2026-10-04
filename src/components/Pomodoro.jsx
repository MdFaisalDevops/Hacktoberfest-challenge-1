import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, Coffee, BookOpen, Flame, CheckCircle2 } from 'lucide-react';

const Pomodoro = ({ streak, setStreak }) => {
  const [timeLeft, setTimeLeft] = useState(25 * 60); // 25 minutes
  const [isActive, setIsActive] = useState(false);
  const [mode, setMode] = useState('study'); // 'study', 'shortBreak', 'longBreak'
  const [sessionsCompleted, setSessionsCompleted] = useState(0);

  const getInitialTime = (currentMode) => {
    switch (currentMode) {
      case 'study': return 25 * 60;
      case 'shortBreak': return 5 * 60;
      case 'longBreak': return 15 * 60;
      default: return 25 * 60;
    }
  };

  useEffect(() => {
    let interval = null;
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft => timeLeft - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      clearInterval(interval);
      handleComplete();
    }
    return () => clearInterval(interval);
  }, [isActive, timeLeft]);

  const handleComplete = () => {
    setIsActive(false);
    if (mode === 'study') {
      const newSessions = sessionsCompleted + 1;
      setSessionsCompleted(newSessions);
      if (newSessions % 4 === 0) {
        setMode('longBreak');
        setTimeLeft(getInitialTime('longBreak'));
      } else {
        setMode('shortBreak');
        setTimeLeft(getInitialTime('shortBreak'));
      }
      // Update streak if it's the first session of the day (simplified logic for demo)
      if (newSessions === 1) {
        setStreak(streak + 1);
      }
      alert('Focus session complete! Time for a break.');
    } else {
      setMode('study');
      setTimeLeft(getInitialTime('study'));
      alert('Break is over! Ready to focus?');
    }
  };

  const toggleTimer = () => {
    setIsActive(!isActive);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(getInitialTime(mode));
  };

  const changeMode = (newMode) => {
    setIsActive(false);
    setMode(newMode);
    setTimeLeft(getInitialTime(newMode));
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const progressPercentage = ((getInitialTime(mode) - timeLeft) / getInitialTime(mode)) * 100;
  const timerColor = mode === 'study' ? 'var(--accent-primary)' : mode === 'shortBreak' ? 'var(--success)' : 'var(--warning)';

  return (
    <div className="animate-fade-in flex-col items-center justify-center" style={{ minHeight: 'calc(100vh - 80px)' }}>
      <div className="card glass text-center p-8 max-w-md w-full mx-auto relative overflow-hidden">
        {/* Glow effect based on mode */}
        <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full blur-[80px]" style={{ backgroundColor: timerColor, opacity: 0.2 }}></div>

        <h1 className="text-3xl font-bold mb-8">Focus Timer</h1>

        <div className="flex justify-center gap-2 mb-8 bg-[var(--bg-tertiary)] p-1 rounded-xl">
          <button 
            className={`btn flex-1 ${mode === 'study' ? 'bg-[var(--bg-secondary)] shadow-sm' : 'bg-transparent text-muted'}`}
            onClick={() => changeMode('study')}
          >
            <BookOpen size={16} /> Focus
          </button>
          <button 
            className={`btn flex-1 ${mode === 'shortBreak' ? 'bg-[var(--bg-secondary)] shadow-sm' : 'bg-transparent text-muted'}`}
            onClick={() => changeMode('shortBreak')}
          >
            <Coffee size={16} /> Short Break
          </button>
          <button 
            className={`btn flex-1 ${mode === 'longBreak' ? 'bg-[var(--bg-secondary)] shadow-sm' : 'bg-transparent text-muted'}`}
            onClick={() => changeMode('longBreak')}
          >
            <Coffee size={16} /> Long Break
          </button>
        </div>

        <div 
          className="timer-circle mb-8" 
          style={{ 
            '--progress': `${progressPercentage}%`,
            '--accent-primary': timerColor 
          }}
        >
          <div className="timer-display">
            {formatTime(timeLeft)}
            <span className="timer-label">{mode === 'study' ? 'Time to focus!' : 'Take a breather'}</span>
          </div>
        </div>

        <div className="flex justify-center gap-4 mb-8">
          <button 
            className="btn-icon bg-[var(--bg-tertiary)] hover:bg-[var(--bg-secondary)] w-14 h-14 flex items-center justify-center rounded-full shadow-sm"
            onClick={resetTimer}
          >
            <RotateCcw size={24} />
          </button>
          <button 
            className="btn-primary w-20 h-20 flex items-center justify-center rounded-full shadow-lg"
            style={{ backgroundColor: timerColor, boxShadow: `0 8px 24px ${timerColor}40` }}
            onClick={toggleTimer}
          >
            {isActive ? <Pause size={32} /> : <Play size={32} style={{ marginLeft: '4px' }} />}
          </button>
        </div>

        <div className="flex items-center justify-center gap-6 text-muted">
          <div className="flex items-center gap-2">
            <CheckCircle2 size={18} className="text-success" />
            <span>{sessionsCompleted} Sessions Today</span>
          </div>
          <div className="flex items-center gap-2">
            <Flame size={18} className="text-warning" />
            <span>{streak} Day Streak</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Pomodoro;
