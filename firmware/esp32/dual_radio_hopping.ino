#include "RF24.h"
#include <SPI.h>
#include <ezButton.h>
#include "esp_bt.h"
#include "esp_wifi.h"
#include <Wire.h>
#include <Adafruit_SSD1306.h>

// OLED Configuration
#define SCREEN_WIDTH 128
#define SCREEN_HEIGHT 64
#define OLED_SDA 32
#define OLED_SCL 35
#define OLED_RESET -1

Adafruit_SSD1306 display(SCREEN_WIDTH, SCREEN_HEIGHT, &Wire, OLED_RESET);

// SPI Instances
SPIClass *sp = nullptr;
SPIClass *hp = nullptr;

// MODIFIED HSPI PINS (as per your changes)
// Original: CE=16, SCK=14, MISO=12, MOSI=13, CS=15
// New: CE=14, SCK=12, MISO=2, MOSI=13, CS=15
#define HSPI_CE 14
#define HSPI_CS 15
#define HSPI_SCK 12
#define HSPI_MISO 2
#define HSPI_MOSI 13

// VSPI PINS (unchanged)
// CE = 22, CS = 21, SCK = 18, MISO = 19, MOSI = 23
#define VSPI_CE 22
#define VSPI_CS 21

RF24 radio(HSPI_CE, HSPI_CS, 16000000);    // HSPI with modified pins
RF24 radio1(VSPI_CE, VSPI_CS, 16000000);   // VSPI standard pins

// Channel variables
unsigned int flag = 0;    // HSPI flag
unsigned int flagv = 0;   // VSPI flag
int ch = 45;              // HSPI channel
int ch1 = 45;             // VSPI channel

// Toggle switch
ezButton toggleSwitch(33);

void setup() {
  Serial.begin(115200);
  
  // Disable ESP32 internal Bluetooth and WiFi to reduce interference
  esp_bt_controller_deinit();
  esp_wifi_stop();
  esp_wifi_deinit();
  esp_wifi_disconnect();
  
  // Initialize toggle switch
  toggleSwitch.setDebounceTime(50);
  
  // Initialize OLED
  Wire.begin(OLED_SDA, OLED_SCL);
  if(!display.begin(SSD1306_SWITCHCAPVCC, 0x3C)) {
    Serial.println(F("SSD1306 allocation failed"));
  }
  display.clearDisplay();
  display.setTextSize(1);
  display.setTextColor(SSD1306_WHITE);
  display.setCursor(0,0);
  display.println("BLE Jammer Init...");
  display.display();
  
  // Initialize both NRF24 modules
  initHP();  // HSPI - Modified pins
  initSP();  // VSPI - Standard pins
  
  delay(1000);
}

void initSP() {
  sp = new SPIClass(VSPI);
  sp->begin();
  
  if (radio1.begin(sp)) {
    Serial.println("VSPI Started !!!");
    radio1.setAutoAck(false);
    radio1.stopListening();
    radio1.setRetries(0, 0);
    radio1.setPALevel(RF24_PA_MAX, true);
    radio1.setDataRate(RF24_2MBPS);
    radio1.setCRCLength(RF24_CRC_DISABLED);
    radio1.startConstCarrier(RF24_PA_MAX, ch1);
    
    display.println("VSPI: OK");
    display.display();
  } else {
    Serial.println("VSPI couldn't start !!!");
    display.println("VSPI: FAIL");
    display.display();
  }
}

void initHP() {
  hp = new SPIClass(HSPI);
  
  // Configure HSPI with modified pins
  // SCK=12, MISO=2, MOSI=13, CS=15
  hp->begin(HSPI_SCK, HSPI_MISO, HSPI_MOSI, HSPI_CS);
  
  if (radio.begin(hp)) {
    Serial.println("HSPI Started !!!");
    radio.setAutoAck(false);
    radio.stopListening();
    radio.setRetries(0, 0);
    radio.setPALevel(RF24_PA_MAX, true);
    radio.setDataRate(RF24_2MBPS);
    radio.setCRCLength(RF24_CRC_DISABLED);
    radio.startConstCarrier(RF24_PA_MAX, ch);
    
    display.println("HSPI: OK");
    display.display();
  } else {
    Serial.println("HSPI couldn't start !!!");
    display.println("HSPI: FAIL");
    display.display();
  }
}

// Mode 2: Sweeping channel hop
void two() {
  // VSPI channel hopping
  if (flagv == 0) {
    ch1 += 4;
  } else {
    ch1 -= 4;
  }

  // HSPI channel hopping  
  if (flag == 0) {
    ch += 2;
  } else {
    ch -= 2;
  }

  // VSPI direction change
  if ((ch1 > 79) && (flagv == 0)) {
    flagv = 1;
  } else if ((ch1 < 2) && (flagv == 1)) {
    flagv = 0;
  }

  // HSPI direction change
  if ((ch > 79) && (flag == 0)) {
    flag = 1;
  } else if ((ch < 2) && (flag == 1)) {
    flag = 0;
  }
  
  radio.setChannel(ch);
  radio1.setChannel(ch1);
  
  // Update OLED
  display.clearDisplay();
  display.setCursor(0,0);
  display.println("MODE: SWEEP");
  display.print("HP:"); display.println(ch);
  display.print("SP:"); display.println(ch1);
  display.display();
}

// Mode 1: Random channel hop
void one() {
  radio1.setChannel(random(80));
  radio.setChannel(random(80));
  delayMicroseconds(random(60));
  
  // Update OLED
  display.clearDisplay();
  display.setCursor(0,0);
  display.println("MODE: RANDOM");
  display.print("HP:"); display.println(ch);
  display.print("SP:"); display.println(ch1);
  display.display();
}

void loop() {
  toggleSwitch.loop();
  int state = toggleSwitch.getState();

  if (state == HIGH)
    two();
  else
    one();
    
  delay(1); // Small delay for stability
}
