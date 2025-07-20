/*
 * Sample program for DokodeModem
 * led brink
 * Copyright (c) 2024 Circuit Desgin,Inc
 * Released under the MIT license
 */
#include <dokodemo.h>
#include <cstring>
#include "magic_enum.hpp"

DOKODEMO Dm = DOKODEMO();

int i = 0;
// IDLE, RX, TXの文字列を持つ配列
enum class STATES  {IDLE, RX, TX};

void setup()
{
  Dm.begin(); // 初期化が必要です。z
  SerialDebug.begin(115200);
  
}

void loop()
{  
  SerialDebug.print("STATE: ");
  SerialDebug.println(STATES[i % 3]); // IDLE, RX, TXの順に表示
  i++;
  Dm.LedCtrl(RED_LED, ON);
  Dm.LedCtrl(GREEN_LED, ON);
  delay(500);
  Dm.LedCtrl(RED_LED, OFF);
  Dm.LedCtrl(GREEN_LED, OFF);
  delay(500);
}
    