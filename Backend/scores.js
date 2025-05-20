
function scoreLogic(currentTime) {
  let score = 0;
  if (currentTime > 0 && currentTime <= 10) score += 100;
  else if (currentTime > 10 && currentTime <= 30) score += 50;
  else if (currentTime > 30 && currentTime <= 60) score += 30;
  return score;
}


