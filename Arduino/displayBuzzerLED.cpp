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

void gameLogic(){
  if (GreenStage && millis() - greenLightStart >= greenLightDuration) {
    startRedStage();
  }
  if (RedStage && millis() - redLightStart >= redLightDuration) {
    currentRound++;
    if (currentRound < 3) {
      startGreenStage();
    } else {
      RedStage = false;
      gameOver();
    }
  }
}

void startGame() {
  currentRound = 0;
  startGreenStage();
}

void restartGame() {
  Serial.println("Restarting Game...");
  tft.fillScreen(TFT_BLUE);
  tft.setTextColor(TFT_WHITE);
  tft.setTextSize(2);
  tft.setCursor(70, 112);
  tft.println("RESTARTING...");
  leds.setColorRGB(0, 255, 255, 0);
  delay(2000);
  startGame();  
}

void melody() {
  for (int i = 0; i < 9; i++) {
    int noteDuration = 1000 / durations[i];
    tone(BUZZER, melodies[i], noteDuration);
    delay(noteDuration * 1.3);
    noTone(BUZZER);
  }
}

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

  leds.setColorRGB(0, 0, 255, 0);
  melody();
}

void startRedStage() {
  GreenStage = false;
  RedStage = true;
  redLightStart = millis();

  tft.fillScreen(TFT_RED);
  tft.setTextColor(TFT_BLACK);
  tft.setTextSize(2);
  tft.setCursor(18, 112);
  tft.println("RED LIGHT!!");

  leds.setColorRGB(0, 255, 0, 0);

  mqttClient.beginMessage("game/state");
  mqttClient.print("Red light");
  mqttClient.endMessage();

  melody();
}

void gameOver() {
  tft.fillScreen(TFT_WHITE);
  tft.setTextColor(TFT_BLACK);
  tft.setTextSize(2);
  tft.setCursor(94, 112);
  tft.println("GAME OVER");

  leds.setColorRGB(0, 0, 0, 0);
}