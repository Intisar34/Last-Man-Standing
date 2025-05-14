import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LinearGradient from "react-native-web-linear-gradient";

const LeaderBoardScreen = () => (
  <View style ={styles.container}>
    <LinearGradient
        colors={['#FF0000', '#800080', '#0000FF']} 
        style={styles.linearGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }} >
            <View style = {styles.textContainer}>
                <Text style = {styles.text}> WELCOME TO LEADERBOARD!
                </Text>
                </View>
    </LinearGradient>
  </View>
);

const styles = StyleSheet.create({
  container: {
    height : '100vh',
    width: '100vw',
  },
  
  linearGradient: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: '100vh', 
    width: '100vw', 
    paddingTop: 50,
  },

  textContainer: {
    borderWidth: 6,
    borderColor: '#DCD0FF',
    padding: 10,
    marginTop: 40,
    backgroundColor: 'transparent',
    borderRadius: 8,
  },

 text: {
  fontFamily: 'Arial',
  fontWeight: 'bold',
  fontSize: 24,
  color: '#FFFFFF',
  textAlign: 'center',
  letterSpacing: 2,
  textTransform: 'uppercase',
  textShadowColor: '#000000',
  textShadowOffset: { width: 2, height: 2 },
  textShadowRadius: 4,
},

});


export default LeaderBoardScreen;


