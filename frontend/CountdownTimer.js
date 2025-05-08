import React, { useState, useEffect } from 'react';
import { View,StyleSheet} from 'react-native';
import RestartButton from './RestartButton';
import mqtt from "mqtt"


export default function Countdown() {
  const [count, setCount] = useState(90);
  useEffect(() => {
    const mqttClient = mqtt.connect("ws://172.20.10.5:9001");
    
    mqttClient.on("connect", () => {
      mqttClient.subscribe("game/command");
    });

    mqttClient.on("message", (topic, message) => {
      const connect = message.toString();
      if (topic === "game/command") {
        if (connect === "start")
          setCount(90);
        else if (connect === "restart") {
          setCount(90);
        }
      }
    });

    return () => {
      mqttClient.end();
    };
  }, []);

  
  useEffect(() => {
    if (count === 0) return;
    let timer = setTimeout(() => {
      setCount(count => count - 1);
    }, 1000);

    return () => clearTimeout(timer);
  }, [count]);

  return (
    <View style={styles.container}>
      <h1 style={styles.count_down}>
        {timerFormat(count)}
      </h1>
      <RestartButton />
    </View>
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
 

const styles = StyleSheet.create({
    container: {
      backgroundColor: '#2b5876',
      height: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      alignItems: 'center',
    },
    count_down: {
      color: '#fff',
      font: 'Beachside',
      fontSize: 50,
      fontWeight: 'bold',
    },
  });