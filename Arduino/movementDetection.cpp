#include "movementDetection.h"

float last_distance = 0.0;

Ultrasonic ultrasonic(A3); //(trig,echo)

// Updates the last_distance and is called at GreenStage.
void updateLastDistance()
{
    last_distance = ultrasonic.MeasureInCentimeters();
}

// returns if there is a change in distance
bool checkDistance()
{
    bool moved = false;
    float sensitivity = 3.0;
    float current_distance = ultrasonic.MeasureInCentimeters();
    Serial.println(current_distance);
    float difference = current_distance - last_distance;
    if (abs(difference) > sensitivity)
    {
        moved = true;
    }
    last_distance = current_distance;
    return moved;
}
// Returns the Distance
float returnDistance()
{
    return ultrasonic.MeasureInCentimeters();
}