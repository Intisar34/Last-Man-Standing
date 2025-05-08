#include "TFT_eSPI.h"
#include "pitches.h"

#define BUZZER WIO_BUZZER 

TFT_eSPI tft = TFT_eSPI();

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



  tft.begin();

  for(int round = 0; round < 3; round++){
    tft.fillScreen(TFT_GREEN);
    tft.setTextColor(TFT_BLACK);
    tft.setTextSize(2);
    tft.setCursor(40, 60);
    tft.println("GAME HAS STARTED!!");
    tft.setCursor(18, 112);
    tft.println("RUN FOR YOUR LIFE!");

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
  
}

void loop() {

}
