import React, { useState, useEffect } from "react";

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
  const [isPrep, setPrep] = useState(false);
  const [isBreak, setBreak] = useState(false);
  const [timeline, addToTimeline] = useState([]);

  const displayTime = secs => {
    let sec = secs % 60;
    let min = parseInt(secs / 60);
    let hr = parseInt(min / 60);
    min = min % 60;
    return `${hr}:${min}:${sec}`;
  };

  const togglePrep = () => {
    if(isPrep){
      recordInterval();
      return;
    }
    setPrep(true);
    clearInterval(breakInt);
    prepInt = setInterval(() => {
      setPrepCount(prev => ++prev);
    }, 1000);
  };

  const toggleBreak = () => {
    if(isBreak){
      recordInterval();
      return;
    }
    setBreak(true);
    clearInterval(prepInt);
    breakInt = setInterval(() => {
      setBreakCount(prev => ++prev);
    }, 1000);
  };

  const reset = () => {
    setPrep(false);
    setBreak(false);
    setBreakCount(0);
    setPrepCount(0);
    clearInterval(prepInt);
    clearInterval(breakInt);
  };

  const recordInterval = () => {
    addToTimeline([...timeline,{isPrep,count:isPrep?prepCount:breakCount}]);
  }

  useEffect(() => {
    console.log(timeline);
    reset();
  }, [timeline]);

  return (
    <div className="app" style={styles.container}>
        <div>
            {isPrep || isBreak ? (
                <h1>{isPrep ? "Prep" : "Break"} time</h1>
            ) : (
              <h2>Click Start</h2>
            )}
            <h2>{displayTime(isPrep ? prepCount : breakCount)}</h2>
            {!isBreak && (<button onClick={togglePrep}>{isPrep?'Stop':'Start'} Prep</button>)}
            {!isPrep && (<button onClick={toggleBreak} style={{ marginLeft: "30px" }}> {isBreak?'Stop':'Start'} Break</button>)}
            <div>
                <button onClick={reset} style={{ marginTop: "30px" }}>
                Reset
                </button>
            </div>
            <div>
              <h2>Previous times</h2>
              <div>
                {timeline.map(({count}) => (
                  <div style={{display:'flex', flexDirection:'row', justifyContent:'space-between'}}>
                    <div>{isPrep?'Prep':'Break'}</div>
                    <div>{displayTime(count)}</div>
                  </div>
                ))}
              </div>
          </div> 
        </div>       
    </div>
  );
};

export default App;