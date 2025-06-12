# Last Man Standing

![Logo](assets/last-man-standing-1.png)

# Table of Contents

- [Purpose and Benefits](#purpose-and-benefits)
- [Hardware & Software Architecture](#hardware--software-architecture)
- [Getting Started](#getting-started)
- [How to Play?](#how-to-play)
- [Contribution](#contribution)
- [Game Demo "Last Man Standing"](https://youtu.be/hN49XPJNxgo)

## Purpose and Benefits

Many people struggle to balance amusement with a healthy lifestyle, whether due to lack of motivation, a busy schedule, or simply not enjoying traditional physical activity. As a result, individuals seeking entertainment often find it difficult to stay physically active.

To bridge this gap, **Last Man Standing** was designed as a physically interactive game that makes exercise both fun and rewarding. By requiring players to move their bodies to advance in the game, it transforms physical activity into a playful experience. The game doesn't just support cardiovascular health—it also sharpens cognitive skills by encouraging strategic planning, quick thinking, and smart decision-making.

Using motion detection technology, the game promotes:

- Coordination, by requiring precise, controlled movements.
- Mind-body synchronization, by blending physical response with cognitive awareness.
- Quick reaction time, by challenging players to stay alert and respond instantly to changing signals.

Through this combination of play and physical challenge, Last Man Standing offers a holistic way to support both mental and physical well being, making fitness engaging, accessible, and fun.

## Hardware & Software Architecture

Our project consists of two main tiers; Hardware and Software, that communicate seamlessly using a Mosquitto MQTT Broker to enable real-time interaction.

### Overall Architecture Flow

1. User interacts with the React Native frontend.
2. Frontend sends MQTT messages (via backend) to trigger hardware actions.
3. Hardware listens to those MQTT messages, executes corresponding actions.

For a more detailed system architecture diagram, refer to the [System Architecture Diagram](https://git.chalmers.se/courses/dit113/2025/group-22/system-development/-/wikis/Diagrams/%7BSystem-architecture%7D)

### Hardware Components:

- Arduino WIO Terminal – Acts as the main controller with built-in display and sound.
- Grove Ultrasonic Sensor – Detects motion during the “Red Light” phase.
- Grove LCD Display (White on Blue) – Displays the countdown timer and game messages.
- Chainable Grove RGB LED – Indicates game state (Green = Go, Red = Stop).
- Grove Ultrasonic Sensor - Detects motion during Red Light.

### MQTT Broker:

The system uses MQTT Broker that allows real-time and swift communication between it's hardware and software components.

#### How it works

The MQTT Broker (e.g., Mosquitto) Acts as a central hub. It listens to topics and forwards messages between the hardware and the web app. For our project, The Arduino Wio Terminal subscribe to the "game" topic of our React Native Web.

**React Native Web App (Publisher)**

Publishes to:

- game/start when the user presses the Start button in the Start Screen.
- game/finish when the user presses the Finish button in the Countdown Timer Screen.
- game/restart when the user presses the Restart button in the Countdown Timer Screen.

**Wio Terminal (Subscriber)**

Subscribes to:

- game/start → Starts the game logic, "RGB LED" Turns Green, timer on the "LCD Screen" starts and the "Buzzer" plays a melody.
- game/finish → Ends the game with a congratulation message on "Arduino Wio Terminal".
- game/restart → Restarts the game by reseting the screen, turning the LED green, reseting the Time of The LCD Screen and playing a melody via Buzzer.

### Software Components:

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
├── Frontend/         # React Native frontend for the game interface
│ ├── App.js          # Main entry point of the app
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
- [ChainableLED.h](https://github.com/Seeed-Studio/Grove_Chainable_RGB_LED)
- [rgb_lcd.h](https://github.com/Seeed-Studio/Grove_LCD_RGB_Backlight)

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

- cd setup
- npm install --save-dev webpack webpack-cli
- npm install --save-dev webpack-dev-server
- npm start

## How to Play?

### 1. Power Up the Hardware

- Connect the following components to your WIO Terminal:

  - **Grove Ultrasonic Distance Sensor:**
    - [Yellow] => 18/A3 (SIG)
    - [Black] => 6 (GND)
    - [Red] => 2 (5V)
  - **Blue and White LCD Screen:** to port **B** (Left One)
  - **Grove Chainable RGB LED:** to port **A** (Right One)

- Power the Wio Terminal via USB or battery.
- Ensure the Wio Terminal is connected to Wi-Fi.(Set credentials in Arduino/mqttConnection.cpp)

### 2. Launch the Game

- Flash the Arduino sketch to your Wio Terminal
  (Refer to Getting Started for detailed steps)

- Start the Web App:

```
cd setup
npm install --save-dev webpack webpack-cli
npm install --save-dev webpack-dev-server
npm start
```

### 3. Play the Game

- Power on the Arduino Wio Terminal and wait for it to establish a connection with the MQTT broker.

- Once the connection is established, a success message will appear on the Serial Monitor.

- On the web app, click the Register button and fill in your credentials to create an account and access the game.

- Click the Start button to start the game. This will start the countdown timer on the lcd screen.

- The RGB LED on the Wio Terminal will turn green → this means players are allowed to move forward.

- When the RGB LED switches to red → players must stop moving immediately.

- If a player moves during a red light, the ultrasonic sensor will detect the motion:

  - A "Game Over" message will be displayed on the Wio Terminal screen.

  - The game will be over until it is restarted from the web interface.

- The goal is to reach the finish line by moving only during green lights.

- After crossing the finish line, click the Finish button on the web app to complete the game.

- The player can view their finishing time on the LCD screen of the Wio Terminal.

- The player’s score will be displayed on the leaderboard within the web app.

- To play again, click the Restart button on the web app to reset and restart the game logic.

- If you encounter any connection issues, - Restart the broker or - [Reset the Arduino Wio Terminal](https://forum.seeedstudio.com/t/wio-terminal-reset-reboot-from-code/257625).

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
