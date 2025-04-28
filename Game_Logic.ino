#include "TFT_eSPI.h"
#include "ChainableLED.h"
#include "pitches.h"

TFT_eSPI tft = TFT_eSPI();


#define BUZZER WIO_BUZZER 


#define DATA_PIN 0
#define CLOCK_PIN 1
#define NUM_LEDS 1

ChainableLED leds(DATA_PIN, CLOCK_PIN, NUM_LEDS);

int melodies[] = {
  NOTE_E2, NOTE_F2, NOTE_A1, NOTE_B0, NOTE_AS4, 0, NOTE_G4, NOTE_F7, NOTE_CS6
};

int durations[] = {
  4, 8, 8, 8, 8, 8, 8, 8, 8
};

void setup() {
  Serial.begin(9600);
  pinMode(BUZZER, OUTPUT);     
  digitalWrite(BUZZER, HIGH);  

  
  leds.setColorRGB(0, 0, 0, 0); 

  tft.begin();

  for(int round = 0; round < 3; round++){
    tft.fillScreen(TFT_GREEN);
    tft.setTextColor(TFT_BLACK);
    tft.setTextSize(2);
    tft.setCursor(40, 60);
    tft.println("GAME HAS STARTED!!");
    tft.setCursor(18, 112);
    tft.println("RUN FOR YOUR LIFE!");


    leds.setColorRGB(0, 0, 255, 0); 

    for (int i = 0; i < 9; i++) {
      int noteDuration = 1000 / durations[i];
      tone(BUZZER, melodies[i], noteDuration);  
      delay(noteDuration * 1.3);
      noTone(BUZZER);
    }

    delay(5000);

    tft.fillScreen(TFT_RED);
    tft.setTextColor(TFT_BLACK);
    tft.setTextSize(2);
    tft.setCursor(18, 112);
    tft.println("RED LIGHT!!");

    leds.setColorRGB(0, 255, 0, 0);  

    for (int i = 0; i < 9; i++) {
      int noteDuration = 1000 / durations[i];
      tone(BUZZER, melodies[i], noteDuration);  
      delay(noteDuration * 1.3);
      noTone(BUZZER);
    }

    delay(2000);
  }

  tft.fillScreen(TFT_WHITE);
  tft.setTextColor(TFT_BLACK);
  tft.setTextSize(2);
  tft.setCursor(94, 112);
  tft.println("GAME OVER");
  
  leds.setColorRGB(0, 0, 0, 0);
}

void loop() {

}
