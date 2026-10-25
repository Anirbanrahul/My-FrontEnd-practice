import { useState, useEffect } from "react";

function useTimer(initialTime = 60) {
  const [time, setTime] = useState(initialTime);
  const [isRunning, setIsRunning] = useState(false);

  useEffect(() => {
    let interval;
    if (isRunning && time > 0) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1);
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isRunning, time]);

  const startTimer = () => setIsRunning(true);
  const resetTimer = () => {
    setIsRunning(false);
    setTime(initialTime);
  };

  return { time, isRunning, startTimer, resetTimer };
}

export default useTimer;

// function App() {
//     const { time, isRunning, startTimer, resetTimer } = useTimer(60);
  
//     return (
//       <div>
//         <p>Time Left: {time} seconds</p>
//         <button onClick={startTimer} disabled={isRunning}>
//           Start Timer
//         </button>
//         <button onClick={resetTimer}>Reset Timer</button>
//       </div>
//     );
//   }