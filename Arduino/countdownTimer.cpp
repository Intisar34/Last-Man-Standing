#include "countdownTimer.h"
#include "rgb_lcd.h"
#include <Arduino.h>


int timer = -1; 
unsigned long timerUpdate = 0;
bool timerActive = false;
rgb_lcd lcd; 

void LCDsetup() {
  lcd.begin(16, 2);
}

//Handles the countdown logic
void countdown() {
  if (!timerActive) {
    return;   // Don’t update countdown if stopped or finished
  }

  if (timer >= 0 && (millis() - timerUpdate >= 850)) {
    timerUpdate = millis();
    int minutes = timer / 60;
    int seconds = timer % 60;
    lcd.setCursor(6, 0);
    if (minutes < 10) {
      lcd.print("0");
    }
    lcd.print(minutes);
    lcd.print(":");
    if (seconds < 10){
      lcd.print("0");
    }
    lcd.print(seconds);  
    timer -= 1;  
  } 
  if (timer < 0) {
    lcd.print("                "); 
    lcd.setCursor(6, 0);
    lcd.print("00:00"); 
}
}

void resetTimer() {
  timer = 60;
  timerUpdate = millis();
  timerActive = true;

  lcd.setCursor(0, 0);
  lcd.print("Time:          ");
  lcd.setCursor(6, 0);
  lcd.print("01:00");
}


void stopTimer() {
  timerActive = false;

  int displayTime = max(timer, 0);
  int minutes = displayTime / 60;
  int seconds = displayTime % 60;

  lcd.setCursor(0, 0);
  lcd.print("Finished:      ");
  lcd.setCursor(10, 0);
  if (minutes < 10) lcd.print("0");
  lcd.print(minutes);
  lcd.print(":");
  if (seconds < 10) lcd.print("0");
  lcd.print(seconds);

  timer = -1; 
}