#ifndef DISPLAY_BUZZER_LED_H
#define DISPLAY_BUZZER_LED_H

#include <TFT_eSPI.h>
#include <ChainableLED.h>

extern TFT_eSPI tft;
extern ChainableLED leds;
extern int durations[];
extern int melodies[];
extern int currentRound;
extern unsigned long greenLightStart;
extern unsigned long greenLightDuration;
extern unsigned long redLightStart;
extern unsigned long redLightDuration;

extern bool GreenStage;
extern bool RedStage;
extern bool isGameOver;

void BuzzerLEDsetup();
void gameLogic();
void startGame();
void restartGame();
void melody();
void startGreenStage();
void startRedStage();
void gameOver();
void gameFinishDisplay();

#endif