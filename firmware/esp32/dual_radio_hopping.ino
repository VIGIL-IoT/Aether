#include "RF24.h"
#include <SPI.h>
#include <ezButton.h>
#include "esp_bt.h"
#include "esp_wifi.h"
#include <Wire.h>
#include <Adafruit_SSD1306.h>

#define OLED_SDA 32
#define OLED_SCL 33
#define OLED_RESET -1
Adafruit_SSD1306 display(128, 64, &Wire, OLED_RESET);

#define BATTERY_PIN 34
#define USB_DETECT_PIN 35
#define SWITCH_PIN 4

ezButton toggleSwitch(SWITCH_PIN);

SPIClass *sp = nullptr;
SPIClass *hp = nullptr;

// MODIFIED PINS: CE=14 (was 16), CS=15, SCK=12 (was 14), MISO=2 (was 12), MOSI=13
RF24 radio(14, 15, 16000000);    // HSPI: CE=14, CS=15
RF24 radio1(22, 21, 16000000);   // VSPI: CE=22, CS=21 (unchanged)

unsigned int flag = 0;
unsigned int flagv = 0;
int ch = 45;
int ch1 = 45;

void setup() {
  Serial.begin(115200);
  
  esp_bt_controller_deinit();
  esp_wifi_stop();
  esp_wifi_deinit();
  esp_wifi_disconnect();
  
  // Initialize OLED first
  Wire.begin(OLED_SDA, OLED_SCL);
  if(!display.begin(SSD1306_SWITCHCAPVCC, 0x3C)) {
    Serial.println("OLED failed");
  }
  
  display.clearDisplay();
  display.setTextSize(1);
  display.setTextColor(SSD1306_WHITE);
  display.setCursor(0,0);
  display.println("BLE Jammer");
  display.println("Init...");
  display.display();
  
  pinMode(USB_DETECT_PIN, INPUT);
  toggleSwitch.setDebounceTime(50);
  
  // Initialize both NRF24
  initHP();  // Uses pins 14,15,12,2,13
  initSP();  // Uses pins 22,21,18,19,23
  
  delay(500);
  display.clearDisplay();
}

void initSP() {
  sp = new SPIClass(VSPI);
  sp->begin();
  if (radio1.begin(sp)) {
    Serial.println("SP Started!");
    radio1.setAutoAck(false);
    radio1.stopListening();
    radio1.setRetries(0, 0);
    radio1.setPALevel(RF24_PA_MAX, true);
    radio1.setDataRate(RF24_2MBPS);
    radio1.setCRCLength(RF24_CRC_DISABLED);
    radio1.startConstCarrier(RF24_PA_MAX, ch1);
    display.println("SP:OK");
    display.display();
  } else {
    Serial.println("SP FAILED!");
    display.println("SP:FAIL");
    display.display();
  }
}

void initHP() {
  hp = new SPIClass(HSPI);
  // MODIFIED HSPI: SCK=12, MISO=2, MOSI=13, CS=15
  hp->begin(12, 2, 13, 15);
  
  if (radio.begin(hp)) {
    Serial.println("HP Started!");
    radio.setAutoAck(false);
    radio.stopListening();
    radio.setRetries(0, 0);
    radio.setPALevel(RF24_PA_MAX, true);
    radio.setDataRate(RF24_2MBPS);
    radio.setCRCLength(RF24_CRC_DISABLED);
    radio.startConstCarrier(RF24_PA_MAX, ch);
    display.println("HP:OK");
    display.display();
  } else {
    Serial.println("HP FAILED!");
    display.println("HP:FAIL");
    display.display();
  }
}

void sweepMode() {
  if (flagv == 0) ch1 += 4; else ch1 -= 4;
  if (flag == 0) ch += 2; else ch -= 2;
  
  if ((ch1 > 79) && (flagv == 0)) flagv = 1;
  else if ((ch1 < 2) && (flagv == 1)) flagv = 0;
  
  if ((ch > 79) && (flag == 0)) flag = 1;
  else if ((ch < 2) && (flag == 1)) flag = 0;
  
  radio.setChannel(ch);
  radio1.setChannel(ch1);
}

void randomMode() {
  int r1 = random(80);
  int r2 = random(80);
  radio.setChannel(r1);
  radio1.setChannel(r2);
  delayMicroseconds(random(60));
}

void updateDisplay(const char* mode) {
  static unsigned long lastUpdate = 0;
  if (millis() - lastUpdate < 200) return;
  lastUpdate = millis();
  
  int rawADC = analogRead(BATTERY_PIN);
  float voltage = (rawADC / 4095.0) * 3.3 * 2.0;
  int percentage = (int)((voltage - 3.0) / 1.2 * 100);
  if (percentage > 100) percentage = 100;
  if (percentage < 0) percentage = 0;
  bool usb = digitalRead(USB_DETECT_PIN) == HIGH;
  
  display.clearDisplay();
  display.setTextSize(1);
  display.setTextColor(SSD1306_WHITE);
  
  // Top line: Mode and Power
  display.setCursor(0,0);
  display.print(mode);
  if (usb) display.print(" [USB]");
  else { display.print(" [B]"); display.print(percentage); display.print("%"); }
  
  // Channel values - these should change for jamming to work
  display.setTextSize(2);
  display.setCursor(0,16);
  display.print("H:"); display.println(ch);
  display.setCursor(0,36);
  display.print("S:"); display.println(ch1);
  
  // Voltage
  display.setTextSize(1);
  display.setCursor(0,56);
  display.print(voltage, 1); display.print("V");
  display.display();
}

void loop() {
  toggleSwitch.loop();
  
  if (toggleSwitch.getState() == HIGH) {
    sweepMode();
    updateDisplay("SWEEP");
  } else {
    randomMode();
    updateDisplay("RND");
  }
}
