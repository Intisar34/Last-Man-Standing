#include "mqttConnection.h"
#include <ArduinoMqttClient.h>
#include <rpcWiFi.h>
#include <WiFiClient.h>
#include "displayBuzzerLED.h"
#include "countdownTimer.h"


char ssid[]    = "Aishaaa";        
char pass[]    = "AishaAttar";   

WiFiClient wifiClient;
MqttClient mqttClient(wifiClient);

const char broker[] = "172.20.10.5";
int        port     = 1883;
const char topic[]  = "game/command";

String message = "";


//Handles MQTT connectivity 
void mqttSetup() {
  Serial.begin(9600);
  while (!Serial) {
    ; 
  }
  
  Serial.print("Attempting to connect to SSID: ");
  Serial.println(ssid);
  while (WiFi.begin(ssid, pass) != WL_CONNECTED) {
    Serial.print(".");
    delay(5000);
  }

  Serial.println("You're connected to the network");
  Serial.println();

  Serial.print("Attempting to connect to the MQTT broker: ");
  Serial.println(broker);

  if (!mqttClient.connect(broker, port)) {
    Serial.print("MQTT connection failed! Error code = ");
    Serial.println(mqttClient.connectError());

    while (1);
  }

  Serial.println("You're connected to the MQTT broker!");
  Serial.println();

  mqttClient.onMessage(onMqttMessage);

  Serial.print("Subscribing to topic: ");
  Serial.println(topic);
  Serial.println();

  mqttClient.subscribe(topic);
}

void onMqttMessage(int messageSize) {
  Serial.println("Received a message with topic '");
  Serial.print(mqttClient.messageTopic());
  Serial.print("', length ");
  Serial.print(messageSize);
  Serial.println(" bytes:");

  while (mqttClient.available()) {
    char connect = (char)mqttClient.read();   
    message += connect;                     
  }
  Serial.println();
  Serial.println();
}

//Starts the game in the hardware components once message received 
void checkMqttCommands() {
   if (message == "start") {
    timer = 90; 
    message = "";
    startGame();
  } else if (message == "restart") {
    timer = 90;  
    message = "";
    restartGame();
  }
}