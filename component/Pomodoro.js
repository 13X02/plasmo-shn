import React, { useState, useEffect } from 'react';

const TIMER_VALUES = {
  pomodoro: 1500, // 25 minutes
  shortBreak: 300, // 5 minutes
  longBreak: 900, // 15 minutes
};

const Pomodoro = () => {
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
    <div style={{
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      height: '200px',
      backgroundColor: '#ea2121',
      borderRadius: '20px',
      padding: '10px'
    }} className='pomodoro'>
      <h2 style={{ fontSize: '1.5rem', marginBottom: '10px', color: '#ffffff', fontFamily: 'Courier New' }}>{timerType}</h2>
<h1 style={{ fontSize: '3.5rem', fontWeight: 700, margin: 0, color: '#ffffff', fontFamily: 'Courier New' }}>{formatTime(timer)}</h1>

      <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', marginTop: '10px' }} className='buttons'>
        {!isActive && !isPaused && (
          <button style={{
            padding: '8px 16px',
            fontSize: '1rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            backgroundColor: '#8ac926',
            color: 'white',
            border: 'none',
            borderRadius: '50px',
            cursor: 'pointer',
            transition: 'all 0.2s ease-in-out', fontFamily: 'Courier New' 
          }} onClick={handleStart}>Start</button>
        )}
        {isActive && !isPaused && (
          <button style={{
            padding: '8px 16px',
            fontSize: '1rem',
            fontWeight: 600,
            textTransform: 'uppercase',
            backgroundColor: '#8ac926',
            color: 'white',
            border: 'none',
            borderRadius: '50px',
            cursor: 'pointer',
            transition: 'all 0.2s ease-in-out', fontFamily: 'Courier New' 
          }} onClick={handlePause}>Pause</button>
        )}
        {isPaused && <button style={{
          padding: '8px 16px',
          fontSize: '1rem',
          fontWeight: 600,
          textTransform: 'uppercase',
          backgroundColor: '#8ac926',
          color: 'white',
          border: 'none',
          borderRadius: '50px',
          cursor: 'pointer',
          transition: 'all 0.2s ease-in-out', fontFamily: 'Courier New' 
        }} onClick={handleResume}>Resume</button>}
        <button style={{
          padding: '8px 16px',
          fontSize: '1rem',
          fontWeight: 600,
          textTransform: 'uppercase',
          backgroundColor: '#8ac926',
          color: 'white',
          border: 'none',
          borderRadius: '50px',
          cursor: 'pointer',
          transition: 'all 0.2s ease-in-out', fontFamily: 'Courier New' 
        }} onClick={handleReset}>Reset</button>
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