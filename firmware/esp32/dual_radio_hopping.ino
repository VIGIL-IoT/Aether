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

RF24 radio(14, 15, 16000000);
RF24 radio1(22, 21, 16000000);

unsigned int flag = 0;
unsigned int flagv = 0;
int ch = 45;
int ch1 = 45;

// Battery smoothing variables
#define BATTERY_SAMPLES 10
float voltageReadings[BATTERY_SAMPLES];
int readingIndex = 0;
float smoothedVoltage = 0;
bool prevUsbState = false;
unsigned long usbChangeTime = 0;

void setup() {
  Serial.begin(115200);
  
  esp_bt_controller_deinit();
  esp_wifi_stop();
  esp_wifi_deinit();
  esp_wifi_disconnect();
  
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
  
  // Initialize battery readings array
  for(int i=0; i<BATTERY_SAMPLES; i++) voltageReadings[i] = 3.7;
  
  initHP();
  initSP();
  
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
    // MAX POWER: RF24_PA_MAX with LNA enabled (second parameter true)
    radio1.setPALevel(RF24_PA_MAX, true);
    radio1.setDataRate(RF24_2MBPS);
    radio1.setCRCLength(RF24_CRC_DISABLED);
    // Additional power optimization: disable dynamic payload and features
    radio1.setPayloadSize(5);
    radio1.setAddressWidth(3);
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
  hp->begin(12, 2, 13, 15);
  
  if (radio.begin(hp)) {
    Serial.println("HP Started!");
    radio.setAutoAck(false);
    radio.stopListening();
    radio.setRetries(0, 0);
    // MAX POWER: RF24_PA_MAX with LNA enabled
    radio.setPALevel(RF24_PA_MAX, true);
    radio.setDataRate(RF24_2MBPS);
    radio.setCRCLength(RF24_CRC_DISABLED);
    // Additional power optimization
    radio.setPayloadSize(5);
    radio.setAddressWidth(3);
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

void readBatteryAndUSB() {
  // Read ADC with averaging
  long sum = 0;
  for(int i=0; i<5; i++) {
    sum += analogRead(BATTERY_PIN);
    delayMicroseconds(100);
  }
  float rawADC = sum / 5.0;
  
  // Calculate voltage (100k+100k divider = factor of 2)
  float instantVoltage = (rawADC / 4095.0) * 3.3 * 2.0;
  
  // Smoothing filter (moving average)
  voltageReadings[readingIndex] = instantVoltage;
  readingIndex = (readingIndex + 1) % BATTERY_SAMPLES;
  
  float total = 0;
  for(int i=0; i<BATTERY_SAMPLES; i++) total += voltageReadings[i];
  smoothedVoltage = total / BATTERY_SAMPLES;
  
  // USB detection with debouncing
  bool currentUsb = digitalRead(USB_DETECT_PIN) == HIGH;
  if (currentUsb != prevUsbState) {
    if (millis() - usbChangeTime > 100) { // 100ms debounce
      prevUsbState = currentUsb;
    }
  } else {
    usbChangeTime = millis();
  }
}

void updateDisplay(const char* mode) {
  static unsigned long lastUpdate = 0;
  if (millis() - lastUpdate < 200) return;
  lastUpdate = millis();
  
  readBatteryAndUSB();
  
  // Calculate percentage based on LiPo curve (3.0V = 0%, 4.2V = 100%)
  int percentage = (int)((smoothedVoltage - 3.0) / 1.2 * 100);
  if (percentage > 100) percentage = 100;
  if (percentage < 0) percentage = 0;
  
  display.clearDisplay();
  display.setTextSize(1);
  display.setTextColor(SSD1306_WHITE);
  
  // Top line: Mode and Power Status
  display.setCursor(0,0);
  display.print(mode);
  
  if (prevUsbState) {
    display.print(" [USB");
    // If voltage is high, show charging indicator
    if (smoothedVoltage > 4.0) display.print("+");
    display.print("]");
  } else {
    display.print(" [B");
    display.print(percentage);
    display.print("%]");
  }
  
  // Battery bar when on battery
  if (!prevUsbState) {
    int barWidth = map(percentage, 0, 100, 0, 40);
    display.drawRect(84, 0, 44, 8, SSD1306_WHITE);
    if (barWidth > 0) display.fillRect(86, 2, barWidth, 4, SSD1306_WHITE);
  }
  
  // Channel values
  display.setTextSize(2);
  display.setCursor(0,16);
  display.print("H:"); display.println(ch);
  display.setCursor(0,36);
  display.print("S:"); display.println(ch1);
  
  // Voltage with 2 decimal precision
  display.setTextSize(1);
  display.setCursor(0,56);
  display.print(smoothedVoltage, 2); 
  display.print("V");
  
  // Show power indicator
  display.setCursor(100,56);
  display.print("MAX");
  
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
