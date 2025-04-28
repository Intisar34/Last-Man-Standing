#include <TFT_eSPI.h>
#include <rpcWiFi.h>
#include <WiFiClient.h>
#include <WiFiServer.h>
#include <PubSubClient.h>
#include <ArduinoMqttClient.h>

// This is for the display
TFT_eSPI tft = TFT_eSPI();

const char* ssid = "Aishaaa";  // Newtwork name
const char* password = "AishaAttar";  // Newtwork password


const char* mqtt_server = "172.20.10.2"; // local network ip adress
const int mqtt_port = 1883;  // lokal broker port 
const char* topic = "game/command"; // Topic name 

// MQTT and web server
WiFiServer server(80);
WiFiClient espClient;
PubSubClient client(espClient);

void setup() {
  Serial.begin(115200);

  // Initialize the wio terminal screen
  tft.begin();
  tft.setRotation(3);
  tft.fillScreen(TFT_BLACK);
  tft.setTextSize(2);
  tft.setTextColor(TFT_WHITE);
  tft.setCursor(20, 60);
  tft.println("Connecting to WiFi...");

  // Connecting to the WiFi
  WiFi.begin(ssid, password);
  while (WiFi.status() != WL_CONNECTED) {
    delay(500);
    Serial.print(".");
  }

  Serial.println("\nYou're connected to the network!");
  Serial.println(WiFi.localIP());

  tft.fillScreen(TFT_BLACK);
  tft.setCursor(20, 60);
  tft.println("WiFi Connected!");

  server.begin();

  // MQTT broker setup
  client.setServer(mqtt_server, mqtt_port);
  client.setCallback(callback);

  reconnectMQTT();
}

void loop() {
  if (!client.connected()) {
    reconnectMQTT();
  }
  client.loop();

  WiFiClient webClient = server.available();
  if (webClient) {
    String req = webClient.readStringUntil('\r');
    Serial.println(req);
    webClient.flush();
  }
}

// MQTT Reconnect function
void reconnectMQTT() {
  while (!client.connected()) {
    Serial.print("Attempting MQTT connection...");
    if (client.connect("WioTerminalClient")) {
      Serial.println("You're connected to the MQTT broker!");
      client.subscribe(topic);
    } else {
      Serial.print("failed connection!");
      Serial.print(client.state());
      Serial.println("Please try to reconnect...");
      delay(5000);
    }
  }
}

// Handle incoming MQTT messages
void callback(char* topic, byte* payload, unsigned int length) {
  String message;
  for (unsigned int i = 0; i < length; i++) {
    message += (char)payload[i];
  }

  Serial.print("Message arrived [");
  Serial.print(topic);
  Serial.print("]: ");
  Serial.println(message);

  tft.fillScreen(TFT_BLACK);
  tft.setCursor(20, 60);

  if (message == "start") {
    tft.println("Game Started!");
  } else if (message == "restart") {
    tft.println("New game started!");
  } else {
    tft.println("Unknown Command");
  }
}








