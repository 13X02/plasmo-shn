import React, { useState, useEffect } from 'react';

const TIMER_VALUES = {
  pomodoro: 1500, // 25 minutes
  shortBreak: 300, // 5 minutes
  longBreak: 900, // 15 minutes
};

const App = () => {
  const [timer, setTimer] = useState(TIMER_VALUES.pomodoro);
  const [isActive, setIsActive] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [timerType, setTimerType] = useState('pomodoro');
  const [pomodoroCount, setPomodoroCount] = useState(0);

  useEffect(() => {
    let interval = null;

    if (isActive && !isPaused) {
      interval = setInterval(() => {
        setTimer((timer) => {
          if (timer === 0) {
            clearInterval(interval);
            if (timerType === 'pomodoro') {
              setPomodoroCount(pomodoroCount + 1);
              if (pomodoroCount === 3) {
                setTimerType('longBreak');
                setPomodoroCount(0);
              } else {
                setTimerType('shortBreak');
              }
            } else {
              setTimerType('pomodoro');
            }
            return TIMER_VALUES[timerType];
          } else {
            return timer - 1;
          }
        });
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isActive, isPaused, timerType, pomodoroCount]);

  const handleStart = () => {
    setIsActive(true);
    setIsPaused(false);
  };

  const handlePause = () => {
    setIsPaused(true);
  };

  const handleResume = () => {
    setIsPaused(false);
  };

  const handleReset = () => {
    setTimer(TIMER_VALUES.pomodoro);
    setIsActive(false);
    setIsPaused(false);
    setTimerType('pomodoro');
    setPomodoroCount(0);
    localStorage.clear();
  };

  useEffect(() => {
    const storedData = localStorage.getItem('pomodoroAppData');
    if (storedData) {
      const { timerType, pomodoroCount } = JSON.parse(storedData);
      setTimerType(timerType);
      setPomodoroCount(pomodoroCount);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      'pomodoroAppData',
      JSON.stringify({ timerType, pomodoroCount })
    );
  }, [timerType, pomodoroCount]);

  return (
    <div className='pomodoro'>
      <h2>{timerType}</h2>
      <h1>{formatTime(timer)}</h1>
      <div className='buttons'>
        {!isActive && !isPaused && (
          <button onClick={handleStart}>Start</button>
        )}
        {isActive && !isPaused && (
          <button onClick={handlePause}>Pause</button>
        )}
        {isPaused && <button onClick={handleResume}>Resume</button>}
        <button onClick={handleReset}>Reset</button>
      </div>
    </div>
  );
};

const formatTime = (timeInSeconds) => {
  const minutes = Math.floor(timeInSeconds / 60)
    .toString()
    .padStart(2, '0');
  const seconds = (timeInSeconds % 60).toString().padStart(2, '0');
  return `${minutes}:${seconds}`;
};

export default Pomodoro;