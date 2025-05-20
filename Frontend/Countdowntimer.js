import React, { useState, useEffect, useRef } from 'react';
import { View, StyleSheet, Animated, Text } from 'react-native';
import RestartButton from './RestartButton';
import FinishButton from './FinishButton';
import { mqtt_client, game_topic } from '../Backend/mqttClient';
import LinearGradient from 'react-native-web-linear-gradient';

export default function CountdownTimer() {
  const [time_left, set_time_left] = useState(60);
  const [stop_timer, setstop_timer] = useState(false); 
  const animation_progress = useRef(new Animated.Value(60)).current;

  useEffect(() => {
    mqtt_client.subscribe(game_topic);
    mqtt_client.on("message", (topic, message) => {
      const command = message.toString();
      if (topic === game_topic) {
        if (command === "start") {
          reset_timer();
        } else if (command === "restart") {
          reset_timer();
        }
      }
    });

    return () => {
      mqtt_client.unsubscribe(game_topic);
    };
  }, []);

  const reset_timer = () => {
    set_time_left(60);
    animation_progress.setValue(60);
  };

// This checks the stop_timer function
const run_timer = () => {
  if (time_left === 0 || stop_timer) return;
  
  Animated.timing(animation_progress, {
    toValue: time_left - 1,
    duration: 1000,
    useNativeDriver: false,
  }).start();
  
  const timer = setTimeout(() => {
    set_time_left(current => current - 1);
  }, 1000);

  return () => clearTimeout(timer);
};

// Add handler for finish
const handleFinish = () => {
  setstop_timer(true); // This will stop the timer
};

  const get_progress_width = animation_progress.interpolate({
    inputRange: [0, 60],
    outputRange: ['0%', '100%']
  });

  const get_progress_color = () => {
    if (time_left > 45) return '#4CAF50';
    else if (time_left > 30) return '#FFC107';
    else if (time_left > 15) return '#FF9800';
    else return '#F44336';
  };

  useEffect(run_timer, [time_left]);


  return (
    <View style={styles.background}>
      <LinearGradient  
        colors={['#FF0000', '#800080', '#0000FF']} 
        style={styles.linearGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}>
      <Text style={styles.header}>Tick Tock...</Text>
      <View style={styles.timer_background}>
        <Animated.View style={[styles.timer_progress, 
          { width: get_progress_width,
            backgroundColor: get_progress_color() }]} />
      </View>
      <RestartButton />
      <FinishButton currentTime={time_left} onFinish={handleFinish}/>
      </LinearGradient>
    </View>
  );

};

const styles = StyleSheet.create({
  background: {
    height: '100vh',
    width: '100vw'
},
linearGradient: {
  height: '100vh',
  width: '100vw',
  justifyContent: 'center',  
  alignItems: 'center',       
  paddingTop: 0,         
},
  header: {
    font: 'Beachside',
    fontSize: 60,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 20,
  },
  timer_background: {
    width: '40%',
    height: 30,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 15,
    overflow: 'hidden',
    marginBottom: 60,
  },
  timer_progress: {
    height: '100%',
    borderRadius: 15,
  },
});