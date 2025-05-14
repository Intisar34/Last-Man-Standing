
const bots = [
  { id: '1', name: 'Redshift', score: 0 },
  { id: '2', name: 'PhantomX', score: 0 },
  { id: '3', name: 'Spectra', score: 0 },
  { id: '4', name: 'Glitchmaster', score: 0 },
  { id: '5', name: 'Cipher', score: 0 },
  { id: '6', name: 'Vortex', score: 0 },
  { id: '7', name: 'Echo', score: 0 },
  { id: '8', name: 'StealthX', score: 0 },
  { id: '9', name: 'RogueWave', score: 0 },
  { id: '10', name: 'ShadowStrike', score: 0 }
];

const randomScores = () => {
  return Math.floor(Math.random() * (1000 - 100 + 1) + 100);
}

bots.forEach(bot => {
  bot.score = randomScores();
});

bots.sort((a, b) => b.score - a.score);
