#include <math.h>
#include <TFT_eSPI.h>
#include "Ultrasonic.h"
#include "Countimer.h"

// timer Variable
Countimer timer;
// Cache Variable for the distance
float last_distance = 0.0;
bool isMoving = false;
bool isRedLight = false;
TFT_eSPI tft = TFT_eSPI();
// Conditional Function to change the Screen Color and use it for speaker
// to tell the time left and indicate red light and green light
bool screenIsRed = false;
Ultrasonic ultrasonic(A2); // 16th pin
bool gameOver = false;
#define RESTART_BUTTON D3 // Or any pin you're using

// Update Last Distance

void Update_last_Dist()
{
  last_distance = ultrasonic.MeasureInInches();
}

// Distance Checking function
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
// check for change in the current_distance and the last_distance recorded just before turning the red light
// also asign a new value to the last distance once the screen turns back green.
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
  float currentDistance = ultrasonic.MeasureInInches();
  timer.run();
  setScreenColor();

  Serial.print("Distance: ");
  Serial.print(currentDistance);
  Serial.println(" cm");

  tft.fillRect(10, 70, 280, 20, TFT_BLACK);
  tft.setCursor(10, 70);
  tft.print("Distance: ");
  tft.print(ultrasonic.MeasureInInches());
  tft.print(" inches");

  if (isRedLight)
  {
    check_Distance();
  }
  else
  {
    if (currentDistance < 80.0)
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