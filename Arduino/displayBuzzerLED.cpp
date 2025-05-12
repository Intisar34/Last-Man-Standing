#include "displayBuzzerLED.h"
#include "mqttConnection.h"
#include <ChainableLED.h>
#include "pitches.h"
#include <TFT_eSPI.h>

#define DATA_PIN 0
#define CLOCK_PIN 1
#define NUM_LEDS 1
#define BUZZER WIO_BUZZER

TFT_eSPI tft = TFT_eSPI();
ChainableLED leds(DATA_PIN, CLOCK_PIN, NUM_LEDS);

int durations[] = { 4, 8, 8, 8, 8, 8, 8, 8, 8};
int melodies[] = { NOTE_E2, NOTE_F2, NOTE_A1, NOTE_B0, NOTE_AS4, 0, NOTE_G4, NOTE_F7, NOTE_CS6};
int currentRound = 0;
unsigned long greenLightStart = 0;
unsigned long greenLightDuration = 5000;
unsigned long redLightStart = 0;
unsigned long redLightDuration = 2000;

bool GreenStage = false;
bool RedStage = false;


void BuzzerLEDsetup() {
  pinMode(BUZZER, OUTPUT);
  digitalWrite(BUZZER, HIGH);
  leds.setColorRGB(0, 0, 0, 0);
  tft.begin();
}
// Handles game stages transitions based on timers.
void gameLogic(){
  if (GreenStage && millis() - greenLightStart >= greenLightDuration) { //If it is currently in green stage and the duration has passed, switch to red stage.
    startRedStage();
  }
  if (RedStage && millis() - redLightStart >= redLightDuration) { // If its currently the red stage and the duration has passed, then increment the round.
    currentRound++;
    if (currentRound < 3) { // if the round is still less than three, then start the green stage again.
      startGreenStage();
    } else {
      RedStage = false;//Otherwise, end the red stage.
      gameOver();//Game over.
    }
  }
}
// Initalizes the game and starts the green stage.
void startGame() {
  currentRound = 0;
  startGreenStage();
}
// the set up screen on the WIO terminal for restarting the game.
void restartGame() {
  Serial.println("Restarting Game...");
  tft.fillScreen(TFT_BLUE);
  tft.setTextColor(TFT_WHITE);
  tft.setTextSize(2);
  tft.setCursor(70, 112);
  tft.println("RESTARTING...");
  leds.setColorRGB(0, 255, 255, 0);//sets the color to cyan color LED.
  delay(2000);
  startGame();  
}
// the sound that is playing throught the game.
void melody() {
  for (int i = 0; i < 9; i++) {
    int noteDuration = 1000 / durations[i];
    tone(BUZZER, melodies[i], noteDuration);
    delay(noteDuration * 1.3);
    noTone(BUZZER);
  }
}
// the set up screen on the WIO terminal for green stage.
void startGreenStage() {
  RedStage = false;
  GreenStage = true;
  greenLightStart = millis();

  tft.fillScreen(TFT_GREEN);
  tft.setTextColor(TFT_BLACK);
  tft.setTextSize(2);
  tft.setCursor(40, 60);
  tft.println("GAME HAS STARTED!!");
  tft.setCursor(18, 112);
  tft.println("RUN FOR YOUR LIFE!");

  leds.setColorRGB(0, 0, 255, 0);// sets the color to green on the LED.
  melody();
}
//set up screen on the WIO terminal for red stage.
void startRedStage() {
  GreenStage = false;
  RedStage = true;
  redLightStart = millis();

  tft.fillScreen(TFT_RED);
  tft.setTextColor(TFT_BLACK);
  tft.setTextSize(2);
  tft.setCursor(18, 112);
  tft.println("RED LIGHT!!");

  leds.setColorRGB(0, 255, 0, 0);//sets the color to red on the LED.

  mqttClient.beginMessage("game/state");
  mqttClient.print("Red light");
  mqttClient.endMessage();

  melody();
}
// set up screen on the WIO terminal for game over.
void gameOver() {
  tft.fillScreen(TFT_WHITE);
  tft.setTextColor(TFT_BLACK);
  tft.setTextSize(2);
  tft.setCursor(94, 112);
  tft.println("GAME OVER");

  leds.setColorRGB(0, 0, 0, 0);// turn off the LED.
}