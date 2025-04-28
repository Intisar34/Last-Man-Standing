# System Developemnt
Last Man Standing

# Description 


# Hardware list
1. UltraSonic sensor
2. LCD Grove (white on blue)
3. Chainable RGB grove LED

# Software Dependencies
1. MQTT Broker (Mosquitto)
2. Arduino IDE

## Prerequisite

To be able to use this code, make sure that you have the following software installed:

1. Arduino IDE
2. Visual Studio Code
3. Node.js and npm

## Installation

For this code to work, you need the following Libraries Installed.

TFT_eSPI = [https://github.com/Bodmer/TFT_eSPI]
rpcWiFi.h = [https://github.com/Seeed-Studio/Seeed_Arduino_rpcWiFi]
ArduinoMqttClient.h = [https://github.com/arduino-libraries/ArduinoMqttClient]
PubSubClient.h = [https://pubsubclient.knolleary.net]


### Importing Libraries

To import these libraries, follow the instructions.

1. Click on "Sketch" from Menu Bar.
2. Click on "Include Library" from the Drop-down.
3. Them, Click "Add .ZIP Library".
4. Choose the Library.

### Setup The Board

1. Go to "File" in the Menu.
2. Click "Preferrence".
3. Edit the "Additional Boards Manager URLs"
4. Insert the following link:
   [https://arduino.esp8266.com/stable/package_esp8266com_index.json,https://files.seeedstudio.com/arduino/package_seeeduino_boards_index.json]

## Setup

### For wifi connection

Make sure you update your WiFi SSID and PASSWORD inside the Arduino_wifi.ino file before uploading.

### For mqtt broker connection

Make sure you start your broker localy and you need to retrieve your local network ip adress as the _mqtt_server_, as well as the operating mqtt port 1883.
