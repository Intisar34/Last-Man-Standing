# Last Man Standing

# 📂 Table of Contents

- [📘 Description](#-description)
- [✅ Features](#-features)
- [📁 Project Structure](#-project-structure)
- [⚙️ How to Setup?](#️-how-to-setup)
- [🎮 How to Play?](#-how-to-play)

## 📘 Description

We set out to develop a game that integrates software and hardware components. Therefore, we decided to implement a version of the
"red light, green light" game. Our project uses the WIO SEEED Terminal, a device that combines a display screen with a
built-in Arduino-compatible microcontroller. This terminal is connected to an MQTT Broker, a server that handles real-time communication
between devices. The core of the gameplay is managed through a web app, which sends commands to start or stop the game.
The lights, such as the red light and the green light, are displayed using a single LED, and the sounds that will alert the user
will be tracked through the WIO Terminal device. To detect players' movement during the "red light" phase, we integrated an
Ultrasonic Sensor with the WIO Terminal. If the system detects a movement during a red light, a message on the WIO terminal screen
states that the game has ended.

## ✅ Features

- Real-time communication between hardware and web interface via MQTT
- Movement detection using Ultrasonic sensor
- LED-based visual signals (red/green light)
- Sound alert system via WIO Terminal
- Game controlled through a React-based web interface

## 📁 Project Structure

**LastManStanding/**
│
├── **Arduino/** # Arduino code for Wio Terminal
│ ├── .gitkeep
│ ├── mainGame.ino
│ ├── countdownTimer.cpp
│ ├── countdownTimer.h
│ ├── displayBuzzerLED.cpp
│ ├── displayBuzzerLED.h
│ ├── movementDetection.cpp
│ ├── movementDetection.h
│ ├── mqttConnection.cpp
│ ├── mqttConnection.h
│ └── pitches.h
│
├── **Backend/** # Web app backend logic and MQTT communication
│ ├── .gitkeep
│ ├── Generatebots.js
│ ├── mqttClient.js
│ ├── scores.js
│ └── supabaseClient.js
│
├── **Frontend/** # React Native frontend for the game interface
│ ├── App.js # Main entry point of the app
│ ├── Countdowntimer.js
│ ├── FinishButton.js
│ ├── Homescreen.js
│ ├── LeaderBoard.js
│ ├── loginScreen.js
│ ├── Registerscreen.js
│ ├── RestartButton.js
│ └── StartScreen.js
│
└── README.md # Project overview and documentation

## ⚙️ How to Setup?

### Prerequisite:

To be able to use this code, make sure that you have the following:

### Sensor and Hardware list:

1. Arduino WIO Terminal.
2. Grove Ultrasonic sensor
3. LCD Grove (white on blue)
4. Chainable RGB grove LED
5. 3x Grove connector cables.

### Software Dependencies:

1. MQTT Broker (Mosquitto).
2. Arduino IDE.
3. Visual Studio Code.
4. Node.js.
5. React Native.

### Arduino IDE Setup

#### Setup The Arduino Wio Board:

1. Go to "File" in the Menu.
2. Click "Preferences".
3. Edit the "Additional Boards Manager URLs"
4. Insert the following link:
   [https://arduino.esp8266.com/stable/package_esp8266com_index.json,https://files.seeedstudio.com/arduino/package_seeeduino_boards_index.json]

#### Install Libraries:

For this code to work, you need the following Libraries Installed.

TFT_eSPI = [https://github.com/Bodmer/TFT_eSPI]
Ultrasonic.h = [https://github.com/Seeed-Studio/Seeed_Arduino_UltrasonicRanger]
WiFiClient.h = [https://docs.arduino.cc/language-reference/en/functions/wifi/client/]
rpcWiFi.h = [https://github.com/Seeed-Studio/Seeed_Arduino_rpcWiFi]
ArduinoMqttClient.h = [https://github.com/arduino-libraries/ArduinoMqttClient]
PubSubClient.h = [https://pubsubclient.knolleary.net]

**Importing Libraries in Arduino IDE:**

To import these libraries, follow the instructions.

1. Click on "Sketch" from Menu Bar.
2. Click on "Include Library" from the Drop-down.
3. Then, Click "Add .ZIP Library".
4. Choose the Library.

#### MQTT Setup on Arduino Wio Board:

Make sure you update your the following in mqttConnection.cpp:
`char ssid[] = "Network_Name";`
`char pass[] = "Password";`

#### For MQTT Broker Connection:

Make sure you start your broker localy and you need to retrieve your local network ip adress as the _mqtt_server_, as well as the operating mqtt port 1883.

### React Native Web Setup

To set up React Native Web on you device, use
`npm install`

if you are still missing dependencies, use the following:

```
npm install react
npm install react-router-dom
npm install react-native-web-linear-gradient
npm install react-native
npm install mqtt
npm install @supabase/supabase-js
```

#### MQTT Setup on Web App:

- Inside Backend\mqttClient.js, update the <ip address> with your pc IP4 address:
  `const MQTT_BROKER = 'ws://<ip_adress>:9001';`

#### Start React Native Web:

To start react native web use the following command:

- npm start

## 🎮 How to Play?

### 🔌 1. Power Up the Hardware

Connect the Ultrasonic Sensor, Chainable RGB LED, and LCD (Grove) to the appropriate ports on the Wio Terminal.

Ensure the Wio Terminal is powered either through USB or battery.

The terminal must be connected to your local Wi-Fi network. You can set your Wi-Fi credentials in the file:

```// mqttConnection.cpp
char ssid[] = "Your_SSID";
char pass[] = "Your_PASSWORD";
```

### 🧠 2. Flash the Arduino Code

1. Open the Arduino IDE.
2. Select the correct board:
   Tools → Board → Seeeduino Wio Terminal
3. Connect your Wio Terminal to your computer via USB.
4. Open the .ino file provided in the Arduino/ directory.
5. Verify and upload the code using the right arrow icon or Ctrl + U.

### 3. Connect the Sensor to the right Port:

### Grove Ultrasonic Distance Sensor:

- [Yellow] => 18/A3 (SIG)
- [Black] => 6 (GND)
- [Red] => 2 (5V)

### Blue and White LED Screen:

- Conenct to port **B** (Left One)

## Grove Chainable RGB LED:

- Connect to port **A** (Right One)

### 💻 3. Run the Web App

Open a terminal and navigate to the React project folder:

`cd WebApp/`

#### Install dependencies:

- [Installation](#installation)

#### Configure MQTT broker address:

Open src/Backend/mqttClient.js
Replace <ip_address> with your local machine’s IP:

`const MQTT_BROKER = 'ws://192.168.X.X:9001';`

#### Start the app:

`npm start`

### 🕹️ 4. Play the Game

- On the web app, click the Start button to initiate the game.

- The RGB LED on the Wio Terminal will switch to green → players can move.

- At random intervals, it will switch to red → players must stop moving.

- If a player moves during a red light, the ultrasonic sensor detects the motion:

- A game over message appears on the Wio Terminal screen.

- The game ends until restarted from the web interface.

- Use the Stop button on the web app to reset and restart the game logic.

- Optionally, restart the broker or web server if any connection issues arise.
