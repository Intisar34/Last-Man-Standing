
import { supabase } from './supabaseClient';
import { getLoggedInUsername } from '../Frontend/loginScreen';

function scoreLogic(currentTime) {
  let score = 0;
  if (currentTime > 0 && currentTime <= 10) score += 100;
  else if (currentTime > 10 && currentTime <= 30) score += 50;
  else if (currentTime > 30 && currentTime <= 60) score += 30;
  return score;
}

export async function saveScore(currentTime) {
  let username = getLoggedInUsername();
  if (!username) {
    console.error('No user is currently logged in.');
    return;
  }

  const score = scoreLogic(currentTime);

  // Fetch existing score
  const { data: existing} = await supabase
    .from('users')
    .select('score')
    .eq('username', username)
    .single();


  const updatedScore = (existing?.score || 0) + score;

  // Upsert user with updated score; assumes `username` is unique in the table
  const { error: upsertError } = await supabase
    .from('users')
    .upsert({ username, score: updatedScore }, { onConflict: ['username'] });

  if (upsertError) {
    console.error('Error updating score:', upsertError);
  }
} 
// fetches the users score from the database
export async function fetchScores() {
  const username = getLoggedInUsername();
  if (!username) {
    console.error('No user is currently logged in.');
    return [];
  }

  const { data, error } = await supabase
    .from('users')
    .select('username, score')
    .eq('username', username);

  if (error) {
    console.error('Error fetching scores:', error);
    return [];
  }

  return data;
}