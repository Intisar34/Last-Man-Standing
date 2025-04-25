
#include "pitches.h"

#define BUZZER WIO_BUZZER 


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

   for (int i = 0; i < 9; i++) {
      int noteDuration = 1000 / durations[i];
      tone(BUZZER, melodies[i], noteDuration);  
      delay(noteDuration * 1.3);
      noTone(BUZZER);
    }

}

void loop() {
 

}
