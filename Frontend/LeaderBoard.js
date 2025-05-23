import React, { useState, useEffect } from 'react'; 
import { View, Text, StyleSheet, ScrollView, Button } from 'react-native';
import { useNavigate } from 'react-router-dom';
import LinearGradient from "react-native-web-linear-gradient";
import { fetchScores } from '../Backend/scores';
import { getRandomBotsWithScores } from '../Backend/Generatebots'

const LeaderBoardScreen = () => {
  const [users, setUsers] = useState([]);
  const [bots, setBots] = useState([])
  const navigate = useNavigate(); 

  useEffect(() => {
    async function loadData() {

      // Fetches bots and user scores.
      const [botData, userData] = await Promise.all([
        getRandomBotsWithScores(10),
        fetchScores()
      ])
      setBots(botData)
      setUsers(userData)
    }
    loadData();
  }, []);

  // Combines bots and users and sort by score descending.
  const leaderboard = [...bots, ...users].sort((a, b) => b.score - a.score)

  let leaderBoarddisplay

  // Conditional rendering for the leaderboard display.
  if (leaderboard.length === 0) {
    leaderBoarddisplay = (
      <Text style={{ color: 'white', textAlign: 'center', marginTop: 20 }}>
        No scores to display yet.
      </Text>
    )
  } else {
    leaderBoarddisplay = leaderboard.map((item, index) => {
      let medal = ''
      if (index === 0) medal = '🥇'
      else if (index === 1) medal = '🥈'
      else if (index === 2) medal = '🥉'

      return (
        <View key={item.username} style={styles.row}>
          <Text style={[styles.username_text, { flex: 2, textAlign: 'left' }]}>
            {medal} {item.username}
          </Text>
          <Text style={[styles.score_text, { flex: 1, textAlign: 'right' }]}>{item.score}</Text>
        </View>
      )
    })
  }
  
  // Navigate to startpage.
  const goToDifferentPage = () => {
    navigate('/startpage');
  }

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#FF0000', '#800080', '#0000FF']}
        style={styles.linearGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Text style={styles.trophy}>🏆</Text>
        <Text style={styles.text}>🏅WELCOME TO LEADERBOARD! 🏅</Text>

        <ScrollView style={styles.table}>
          <View style={styles.row}>
            <Text style={[styles.header, { flex: 2 }]}>Username</Text>
            <Text style={[styles.header, { flex: 1, textAlign: 'right' }]}>Score</Text>
          </View>
          {leaderBoarddisplay}
        </ScrollView>

        <View style={styles.buttonContainer}>
          <Button title='⬅ Back to Start' onPress={goToDifferentPage} color='#8b008b' />
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: '100vh',
    width: '100vw',
  },
  linearGradient: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    height: '100vh',
    width: '100vw',
    paddingTop: 50,
  },
  table: {
    marginTop: 60,
    width: '80%',
    borderColor: '#DCD0FF',
    padding: 10,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 8,
    maxHeight: '60vh',
  },
  trophy: {
    position: 'absolute',
    top: 20,
    right: 20,
    fontSize: 120,
    color: '#FFD700',
    zIndex: 10,
  },
  row: {
    flexDirection: 'row',
    paddingVertical: 10,
    borderBottomColor: '#DCD0FF',
    borderBottomWidth: 1,
  },
  header: {
    fontWeight: 'bold',
    fontSize: 20,
    color: '#FFD700',
  },
  username_text: {
    fontFamily: 'Times New Roman',
    fontSize: 25,
    fontWeight: 'bold',
    textShadowColor: '#000000',
    color: '#FFFFFF',
    letterSpacing: 1
  },
  score_text: {
    fontFamily: 'Times New Roman',
    fontSize: 25,
    fontWeight: 'bold',
    textShadowColor: '#000000',
    color: '#FFFFFF',
    letterSpacing: 1
  },
  text: {
    fontFamily: 'Times New Roman',
    fontWeight: 'bold',
    fontSize: 36,
    color: '#FFFFFF',
    textAlign: 'center',
    letterSpacing: 2,
    textTransform: 'uppercase',
    textShadowColor: '#000000',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 4,
  },
  buttonContainer: {
    marginTop: 30,
  }
});

export default LeaderBoardScreen;

