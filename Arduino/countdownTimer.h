#ifndef COUNTDOWN_TIMER_H
#define COUNTDOWN_TIMER_H
#include <rgb_lcd.h>

void LCDsetup();
void countdown();
void stopTimer();
void resetTimer();

extern int timer;
extern rgb_lcd lcd;
extern unsigned long timerUpdate;

#endif