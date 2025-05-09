#ifndef MQTT_CONNECTION_H
#define MQTT_CONNECTION_H
#include <ArduinoMqttClient.h>

extern MqttClient mqttClient;

void mqttSetup();
void checkMqttCommands();
void onMqttMessage(int messageSize);


#endif