#include <math.h>
#include <TFT_eSPI.h>
#include "Ultrasonic.h"
#include "Countimer.h"

TFT_eSPI tft = TFT_eSPI();
Ultrasonic ultrasonic(A2); // 16th pin

// Cache Variable for the distance
bool isMoving = false;
bool isRedLight = false;
bool screenIsRed = false;
bool gameOver = false;

float last_distance = 0.0;
Countimer timer;

const int pinTempSensor = A1; // 15 pin for sig, 4 for 5v(Red), 6 for GND(Black)
#define PIR_MOTION_SENSOR D0  // 13th pin for Mini PIR motion sensor
#define RESTART_BUTTON D3     // Or any pin you're using

// Update the Last casptured Distance before red light.
void Update_last_Dist()
{
  last_distance = ultrasonic.MeasureInInches();
}

// Function to check the distance when the red light is activated.
void check_Distance()
{
  delay(3000);

  if (isRedLight)
  {
    if (ultrasonic.MeasureInInches() != last_distance)
    {
      isMoving = true;
      tft.setCursor(60, 160);
      tft.fillRect(60, 160, 200, 20, TFT_BLACK);
      tft.print("Your Are Lost");
      restartGame();
      delay(3000);
    }
    else
    {
      tft.setCursor(20, 160);
      tft.fillRect(20, 160, 200, 20, TFT_BLACK);
      tft.print("Keep Going");
    }
  }
}

// Changes Screen Color once the timer reaches a certain thrushold.
// Remarks: Need a random number generator that will indicate the pause time and start time for the game.
void setScreenColor()
{
  float current_dist = ultrasonic.MeasureInInches();

  if (timer.getCurrentMinutes() <= 2 && !screenIsRed)
  {
    tft.fillScreen(TFT_RED);
    screenIsRed = true;
    isRedLight = true;
  }
  else if (timer.getCurrentMinutes() > 2 && screenIsRed)
  {
    tft.fillScreen(TFT_GREEN);
    screenIsRed = false;
    isRedLight = false;
  }
}

// Refreshes the timer on the screen and calls the Screen Color Function
void refreshClock()
{
  tft.setCursor(40, 10);
  tft.fillRect(40, 10, 240, 30, TFT_BLACK);
  tft.print("Time Left: ");
  tft.print(timer.getCurrentTime());
}

// Runs when the timer goes to 00:00
void timeComplete()
{
  tft.fillScreen(TFT_BLACK);
  tft.setCursor(50, 100);
  tft.setTextSize(3);
  tft.setTextColor(TFT_RED);
  tft.print("You Are Dead :)");
  tft.setTextSize(2);
  tft.setCursor(50, 150);
  tft.setTextColor(TFT_WHITE);
  tft.print("Press Button to Restart");

  gameOver = true;
}

// Used to restart the game either if the time is over or there was a movement detected during red light
void restartGame()
{
  gameOver = false;
  isRedLight = false;
  screenIsRed = false;
  isMoving = false;
  tft.fillScreen(TFT_GREEN);
  tft.setTextSize(2);
  tft.setTextColor(TFT_WHITE);
  tft.setCursor(50, 100);
  tft.print("You Lost...");

  delay(2000);
  tft.print("Restarting...");

  tft.fillScreen(TFT_GREEN);
  tft.setTextSize(2);
  tft.setTextColor(TFT_WHITE);
  tft.setCursor(50, 100);

  delay(1000);

  timer.setCounter(0, 3, 10, timer.COUNT_DOWN, timeComplete);
  timer.restart();
  tft.print("");

  last_distance = ultrasonic.MeasureInInches();
}

void setup()
{

  pinMode(PIR_MOTION_SENSOR, INPUT);
  pinMode(RESTART_BUTTON, INPUT_PULLUP);
  Serial.begin(9600);
  tft.begin();
  tft.setRotation(3);
  tft.fillScreen(TFT_GREEN);
  tft.setTextColor(TFT_WHITE);
  tft.setTextSize(2);

  timer.setCounter(0, 3, 10, timer.COUNT_DOWN, timeComplete);
  timer.setInterval(refreshClock, 1000);
  timer.start();
}

void loop()
{
  int a = analogRead(pinTempSensor);
  timer.run();
  setScreenColor();
  // For Debugging
  Serial.print("Distance: ");
  Serial.print(ultrasonic.MeasureInInches());
  Serial.println(" cm");
  // For Arduino Wio Terminal Screen
  tft.fillRect(10, 70, 280, 20, TFT_BLACK);
  tft.setCursor(10, 70);
  tft.print("Distance: ");
  tft.print(ultrasonic.MeasureInInches());
  tft.print(" inches");
  // If there is a Red Light, It runs check_Distance() and if not Red Light, then normal distance checking function
  if (isRedLight)
  {
    check_Distance();
  }
  else
  {
    Update_last_Dist();
    if (digitalRead(PIR_MOTION_SENSOR) && ultrasonic.MeasureInInches() < 50.0)
    {
      Serial.println("You are close to wining line");
      tft.fillRect(10, 120, 280, 20, TFT_BLACK);
      tft.setCursor(10, 120);
      tft.print("You are close to wining");
    }
    else
    {
      Serial.println("Nobody is here..");
      tft.fillRect(10, 120, 280, 20, TFT_BLACK);
      tft.setCursor(10, 120);
      tft.print("Nobody is here yet..");
    }
  }

  delay(250);
}