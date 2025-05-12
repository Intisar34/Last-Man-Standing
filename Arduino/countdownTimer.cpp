#include "countdownTimer.h"
#include "rgb_lcd.h"
#include <Arduino.h>

int timer = 90; 
unsigned long timerUpdate = 0;
rgb_lcd lcd; 

void LCDsetup() {
  lcd.begin(16, 2);
}

//Handles the countdown logic
void countdown() {
  if (timer >= 0 && (millis() - timerUpdate >= 1000)) {
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