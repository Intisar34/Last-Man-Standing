#ifndef MOVEMENT_DETECTION_H
#define MOVEMENT_DETECTION_H
#include <Arduino.h>
#include "Ultrasonic.h"

extern float last_distance;
extern bool isGameOver;

void updateLastDistance();
void checkDistance();
float returnDistance();

#endif