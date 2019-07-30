import React, { useState } from "react";

const styles = {
    container: {
       display: 'flex',
       flex:1,
       justifyContent:'center',
       alignItems: 'center'
    }
}

let prepInt, breakInt;
const App = () => {
  const [prepCount, setPrepCount] = useState(0);
  const [breakCount, setBreakCount] = useState(0);
  const [prep, setPrepFlag] = useState(false);
  const [paused, setPaused] = useState(false);
  const [initialLoad, setInitialLoad] = useState(true);

  const displayTime = secs => {
    let sec = secs % 60;
    let min = parseInt(secs / 60);
    let hr = parseInt(min / 60);
    min = min % 60;
    return `${hr}:${min}:${sec}`;
  };

  const startPrep = (refreshCount = true) => {
    setInitialLoad(false);
    setPaused(false);
    setPrepFlag(true);
    if (refreshCount) setPrepCount(0);
    clearInterval(breakInt);
    prepInt = setInterval(() => {
      setPrepCount(prev => ++prev);
    }, 1000);
  };

  const startBreak = (refreshCount = true) => {
    setInitialLoad(false);
    setPaused(false);
    setPrepFlag(false);
    if (refreshCount) setBreakCount(0);
    clearInterval(prepInt);
    breakInt = setInterval(() => {
      setBreakCount(prev => ++prev);
    }, 1000);
  };

  const pause = () => {
    setPaused(true);
    clearInterval(prepInt);
    clearInterval(breakInt);
  };

  const unPause = () => {
    setPaused(false);
    if (prep) startPrep(false);
    else startBreak(false);
  };

  const reset = () => {
    setInitialLoad(true);
    setPaused(false);
    setPrepFlag(false);
    setBreakCount(0);
    setPrepCount(0);
    clearInterval(prepInt);
    clearInterval(breakInt);
  };

  return (
    <div className="app" style={styles.container}>
        <div>
            {initialLoad ? (
                <h2>Welcome! Click start</h2>
            ) : (
                <h1>{prep ? "Prep" : "Break"} time</h1>
            )}
            <h2>{displayTime(prep ? prepCount : breakCount)}</h2>
            <button onClick={startPrep}>Start Prep</button>
            <button onClick={startBreak} style={{ marginLeft: "30px" }}>
                Start Break
            </button>
            <div>
                {paused ? (
                <button style={{ marginTop: "20px" }} onClick={unPause}>
                    Unpause
                </button>
                ) : (
                <button style={{ marginTop: "20px" }} onClick={pause}>
                    Pause
                </button>
                )}
                <button onClick={reset} style={{ marginLeft: "30px" }}>
                Reset
                </button>
            </div>
        </div>    
    </div>
  );
};

export default App;