# Last Man Standing

![Logo](assets\last-man-standing-1.png)

# Table of Contents

- [Purpose and Benefits](#purpose-and-benefits)
- [Hardware & Software Architecture](#hardware--software-architecture)
- [Getting Started](#getting-started)
- [How to Play?](#how-to-play)
- [Contribution](#contribution)

## Purpose and Benefits

The goal of our project was to design an interactive game that seamlesslyintegrates software and hardware components. Therefore, we decided to implement a version of the "red light, green light" game. Our project uses the WIO SEEED Terminal, a device that combines a display screen with a built-in Arduino-compatible microcontroller. This terminal is connected to an MQTT Broker, a server that handles real-time communication between devices.
The core of the gameplay is managed through a web app, which sends commands to start or stop the game.The lights, such as the red light and the green light, are displayed using a single LED, and the sounds that will alert the user will be tracked through the WIO Terminal device. To detect players' movement during the "red light" phase, we integrated an Ultrasonic Sensor with the WIO Terminal. If the system detects a movement during a red light, a message on the WIO terminal screen states that the game has ended.

### Features

- Real-time communication between hardware and web interface via MQTT
- Movement detection using Ultrasonic sensor
- LED-based visual signals (red/green light)
- Sound alert system via WIO Terminal
- Game controlled through a React-based web interface

## Hardware & Software Architecture

### Hardware Components:

1. Arduino WIO Terminal.
2. Grove Ultrasonic sensor
3. LCD Grove (white on blue)
4. Chainable RGB grove LED
5. 3x Grove connector cables.

### Software Stack:

```
LastManStanding/
├── Arduino/         # Arduino code for Wio Terminal
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
├── Backend/         # Web app backend logic and MQTT communication
│ ├── .gitkeep
│ ├── Generatebots.js
│ ├── mqttClient.js
│ ├── scores.js
│ └── supabaseClient.js
│
├── Frontend/     # React Native frontend for the game interface
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
```

## Getting Started

### Prerequisite:

To be able to use this code, make sure that you have the following:

- [Mosquitto MQTT Broker](https://mosquitto.org/download/)
- [Arduino IDE](https://www.arduino.cc/en/software)
- [Visual Studio Code](https://code.visualstudio.com/)
- [Node.js](https://nodejs.org/en)
- [React Native](https://reactnative.dev/docs/environment-setup)

### Arduino IDE Setup

**Wio Terminal Board Installation**

1. Open Arduino IDE → File > Preferences
2. Under "Additional Boards Manager URLs", add:

```
https://arduino.esp8266.com/stable/package_esp8266com_index.json,https://files.seeedstudio.com/arduino/package_seeeduino_boards_index.json
```

**Install Libraries:**

Install these libraries using Sketch > Include Library > Add .ZIP Library

- [TFT_eSPI](https://github.com/Bodmer/TFT_eSPI)
- [Ultrasonic.h](https://github.com/Seeed-Studio/Seeed_Arduino_UltrasonicRanger)
- [WiFiClient.h](https://docs.arduino.cc/language-reference/en/functions/wifi/client/)
- [rpcWiFi.h](https://github.com/Seeed-Studio/Seeed_Arduino_rpcWiFi)
- [ArduinoMqttClient.h](https://github.com/arduino-libraries/ArduinoMqttClient)
- [PubSubClient.h](https://pubsubclient.knolleary.net)

**MQTT Configuration:**

In Arduino/mqttConnection.cpp, update:

```
char ssid[] = "Network_Name";
char pass[] = "Password";
```

Ensure your MQTT broker is running locally and note your local IP address for later use (default port: 1883).

### Frontend Setup (React Native)

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

**MQTT Configuration for Web App:**

- Inside Backend\mqttClient.js, update the <ip address> with your pc IP4 address:
  `const MQTT_BROKER = 'ws://<ip_adress>:9001';`

**Start React Native Web:**

To start react native web use the following command:

- npm start

## How to Play?

### 1. Power Up the Hardware

- Connect the following components to you WIO Terminal:

  - **Grove Ultrasonic Distance Sensor:**
    - [Yellow] => 18/A3 (SIG)
    - [Black] => 6 (GND)
    - [Red] => 2 (5V)
  - **Blue and White LED Screen:** to port **B** (Left One)
  - **Grove Chainable RGB LED:** to port **A** (Right One)

- Power the Wio Terminal via USB or battery.
- Ensure the Wio Terminal is connected to Wi-Fi.(Set credentials in Arduino/mqttConnection.cpp)

### 2. Launch the Game

- Flash the Arduino sketch to your Wio Terminal
  (Refer to Getting Started for detailed steps)

- Start the Web App:

```
npm start
```

### 3. Play the Game

- On the web app, click the Start button to initiate the game.

- The RGB LED on the Wio Terminal will switch to green → players can move.

- At random intervals, it will switch to red → players must stop moving.

- If a player moves during a red light, the ultrasonic sensor detects the motion:

- A game over message appears on the Wio Terminal screen.

- The game ends until restarted from the web interface.

- Use the Stop button on the web app to reset and restart the game logic.

- Optionally, restart the broker or web server if any connection issues arise.

## Contribution:

#### Abdullah Arif: Developer

- Integrated Ultrasonic sensor for movement detection.
- Contributed to Modularization of Arduino Code.
- Contributed to weekly presentation.
- Contributed to bug fix related to Arduino WIO components.
- Designed and Deployed CI/CD Pipeline.
- Worked on the Game logic and state management.
- Implemented The Finish Game Logic.
- Contributed to WIKI (System Architecture Diagram).

#### Aisha Attar: Developer

- Developed the start screen, including the start and restart buttons.
- Implemented the time progress bar and the finish button functionality.
- Added logic to display the completed time on the LCD screen.
- Integrated MQTT configuration.
- Actively participated in weekly stand-up meetings.
- Assisted in integrating various components of the frontend codebase.
- Contributed to project documentation, including the WIKI (Sequence - Diagram) and Glossary.

#### Anisa Hashi: Developer

- Implemented the Homepage and User Registration functionality on the frontend.
- Created bots with random scores and contributed to the development of the Leaderboard.
- Set up and configured the CI/CD pipeline.
- Contributed to the project Wiki by writing documentation and improving structure.
- Designed the vertical slicing diagram to illustrate the system architecture.
- Actively participated in team meetings, decision-making, and collaboration to drive the project forward.

#### Intisar Warfa: Developer

- Developed the game logic for the WIO-terminal
- Initialized the leaderboard screen that displays the users score and bots
- Contributed to creating the Database.
- Contributed to integrating three hardware components(LED,LCD and Ultrasonic distance sensor) to work simultaneously.
- Actively attended all weekly stand-up meetings
- Contributed to the development of wiki pages, including meeting notes and system architecture documentation.

#### Sireen Abu Ajamieh: Developer

- Developed the countdown timer logic in both the hardware and frontend.
- Developed the login screen in frontend.
- Contributed in the integration of MQTT.
- Contributed in creating the Supabase database.
- Contributed to separating the Arduino code into different files.
- Contributed to the wiki by writing meeting documentation, working on the Supabase database section, and creating the activity diagram.
- Actively attended in all meetings
