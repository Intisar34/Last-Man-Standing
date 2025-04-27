#include <Wire.h>
#include "rgb_lcd.h"
#include "TFT_eSPI.h"

rgb_lcd lcd;
TFT_eSPI tft;

int time = 90; 

void setup() {
  Wire.begin();                
  lcd.begin(16, 2);            
  tft.begin();
  tft.setRotation(3);  
  tft.fillScreen(TFT_WHITE); 
  tft.setTextColor(TFT_BLACK, TFT_WHITE); 
  tft.setTextSize(5);  
}
// countdown loop
void loop() {
  if (time >= 0) {
    int minutes = time / 60;
    int seconds = time % 60;

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

    tft.setCursor(80, 100);
    if (minutes < 10) {
      tft.print("0");
    }
    tft.print(minutes);
    tft.print(":");
    if (seconds < 10) {
      tft.print("0");
    }
    tft.print(seconds);

    delay(1000);
    time -= 1;   
  } else {
    lcd.print("                "); 
    lcd.setCursor(6, 0);
    lcd.print("00:00"); 
    tft.setCursor(80, 100);
    tft.print("00:00");

  }
}
