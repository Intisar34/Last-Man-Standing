#include "movementDetection.h"

float last_distance = 0.0;

Ultrasonic ultrasonic(A3); //(trig,echo)

// Updates the last_distance and is called at GreenStage.
void updateLastDistance()
{
    last_distance = ultrasonic.MeasureInInches();
}

// returns if there is a change in distance
bool checkDistance()
{
    bool moved = false;
    float sensitivity = 4.0;
    float current_distance = ultrasonic.MeasureInInches();
    Serial.println(current_distance);
    if (abs(current_distance - last_distance) > sensitivity)
    {
        moved = true;
    }
    last_distance = current_distance;
    return moved;
}
// Returns the Distance
float returnDistance()
{
    return ultrasonic.MeasureInInches();
}