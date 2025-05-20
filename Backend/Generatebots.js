
import { supabase } from './supabaseClient'

// Genertes a random score between 0-500.
const getRandomScore = () => Math.floor(Math.random() * 501) 

export async function getRandomBotsWithScores(limit = 10) {

  // Fetch all bots from the database.
  const { data, error } = await supabase.from('bots').select('*')

  if (error) {
    console.error('Error fetching bots:', error)
    return []
  }
  if (!data.length) return []

  // Randomizes all the bots by shuffling them.
  const randomBots = data.sort(() => 0.5 - Math.random())
  const selectedBots = randomBots.slice(0, limit)

  // Assignes random scores to the bots.
  const botsWithScores = selectedBots.map(bot => ({
    ...bot,
    score: getRandomScore(),
  }))

  // Sorts the bots by descending order.
  botsWithScores.sort((a, b) => b.score - a.score)

  return botsWithScores
}
