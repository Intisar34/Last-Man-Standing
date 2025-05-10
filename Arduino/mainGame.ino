#include "displayBuzzerLED.h"
#include "countdownTimer.h"
#include "mqttconnection.h"
#include <TFT_eSPI.h>
#include <rgb_lcd.h>
#include <ChainableLED.h>
#include "pitches.h"


void setup() {
  Serial.begin(9600);
  mqttSetup();
  LCDsetup(); 
  BuzzerLEDsetup();                   
}

void loop() {
  mqttClient.poll();      
  checkMqttCommands();     
  gameLogic();
  countdown();           
}
