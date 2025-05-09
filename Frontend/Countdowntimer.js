import React, { useState, useEffect } from 'react';
import { View,StyleSheet} from 'react-native';
import RestartButton from './components/RestartButton';
import { mqtt_client, game_topic } from './components/mqttClient';

//subscribing to the
export default function Countdown() {
  const [count, setCount] = useState(90);

  useEffect(() => {
    mqtt_client.subscribe(game_topic);
    
    mqtt_client.on("message", (topic, message) => {
      const command = message.toString();
       if (topic === game_topic) {
        if (command === "start")
          setCount(90);
        else if (command === "restart") {
          setCount(90);
        }
      }
    });

    return () => {
      mqtt_client.unsubscribe(game_topic);
    };
  }, []);
// countdown logic 
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