import React, { useState, useEffect } from 'react';


export default function Countdown() {
  const [count, setCount] = useState(90);

  useEffect(() => {
    if (count === 0) return;
    let timer = setTimeout(() => {
      setCount(count => count - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [count]);

  return (
    <div style={styles.container}>
      <h1 style={styles.count_down}>
        {timerFormat(count)}
      </h1>
    </div>
  );
};

function timerFormat(time) {
  const minutes = Math.floor(time / 60);
  const seconds = time % 60;

  let formatted = "";

  if (minutes < 10) {
    formatted += "0";
  }
  formatted += minutes + ":";

  if (seconds < 10) {
    formatted += "0";
  }
  formatted += seconds;

  return formatted;
}
 

const styles = {
    container: {
      backgroundColor: "#00000080", 
      alignItems: "center", 
      padding: "10px 20px", 
    },
    count_down: {
      color: "#010501",
      fontSize: "49px",
      fontWeight: "bold",
    },
  };
