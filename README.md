# feature/issue-8.1-detect-player-movement

## Prerequisites

To be able to use this code, make sure that you have the following softwares.

1. Arduino IDE.
2. Arduino Wio Terminal.
3. Grove Cable(With Pins).
4. Ultrasonic Distance Sensor.

## Installation

For this code to work, you need the following Libraries Installed.

TFT_eSPI = [https://github.com/Bodmer/TFT_eSPI]

Ultrasonic = [https://github.com/ErickSimoes/Ultrasonic]

Countimer = [https://github.com/inflop/Countimer]

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

## Setting Up Pins.

_Ultrasonic Distance Sensor_
RED -> 5v [4]
BLACK -> GND [2]
YELLOW -> A2 [16]
