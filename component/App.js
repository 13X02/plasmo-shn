import React from 'react';
import Pomodoro from './Pomodoro';

function App() {
  return (
    <div style={{
        position: 'relative',
        width:'198vh',
        height: '200px'
      }} className="App">
        <div style={{
          position: 'absolute',
          top: '20px',
          right: '20px'
        }}>
          <Pomodoro />
        </div>
      </div>
      
  );
}

export default App;
