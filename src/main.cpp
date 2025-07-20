/*
 * Sample program for DokodeModem
 * led brink
 * Copyright (c) 2024 Circuit Desgin,Inc
 * Released under the MIT license
 */
#include <dokodemo.h>
#include <cstring>
DOKODEMO Dm = DOKODEMO();

int i = 0;
// IDLE, RX, TXの文字列を持つ配列
enum class States  {IDLE, RX, TX};
const char* StatesNames [] = {"IDLE", "RX", "TX"};
States current_state = States::IDLE;


void setup()
{
  Dm.begin(); // 初期化が必要です。z
  SerialDebug.begin(115200);
  
}

void loop()
{  

  SerialDebug.print("STATE: ");
  SerialDebug.println(StatesNames[static_cast<int>(current_state)]);
  if(current_state == States::IDLE){
    current_state = States::RX;
  }
  else if(current_state == States::RX){
    current_state = States::TX;
  }
  else if(current_state == States::TX){
    current_state = States::IDLE;
  }
  Dm.LedCtrl(RED_LED, ON);
  Dm.LedCtrl(GREEN_LED, ON);
  delay(500);
  Dm.LedCtrl(RED_LED, OFF);
  Dm.LedCtrl(GREEN_LED, OFF);
  delay(500);
}
    