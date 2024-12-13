#include <WiFi.h>
#include <FirebaseESP32.h>
#include <Arduino_LSM6DS3.h>            // Built-in IMU for accelerometer
#include <MAX30100.h>                   // Heart Rate Sensor Library
#include <OneWire.h>                    // Temperature Sensor Communication Protocol
#include <DallasTemperature.h>          // Dallas Temperature Sensor Library
#include <WiFiNINA.h>                   // WiFi Library for Arduino
#include <Firebase_Arduino_WiFiNINA.h>  // Firebase Library for WiFi-enabled Arduino
#include "addons/TokenHelper.h"
#include "addons/RTDBHelper.h"

#define WIFI_SSID "Chamz"
#define WIFI_PASSWORD "koff2288"
#define API_KEY "AIzaSyAThCI2rPi7Js9ZZMzvfxoXn6WqLpHVeC8"
#define DATABASE_URL "https://eldercareconnect-956ab-default-rtdb.asia-southeast1.firebasedatabase.app/"

#define ONE_WIRE_BUS 2
#define FALL_THRESHOLD 2.5

OneWire oneWire(ONE_WIRE_BUS);
DallasTemperature tempSensor(&oneWire);
MAX30100 heartRateSensor;
FirebaseData fbdo;
FirebaseAuth auth;
FirebaseConfig config;

unsigned long sednDataPrevMillis = 0;
bool signupOK = false;
float heartRate = 0;
float oxygenSaturation = 0;
float bodyTemperature = 0;
bool fallDetected = false;

void setup() {
  Serial.begin(115200);

  initializeAccelerometer();
  initializeHeartRateSensor();
  tempSensor.begin();

  WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
  Serial.print("Connecting to Wi-Fi");
  while (WiFi.status() != WL_CONNECTED) {
    Serial.print(".");
    delay(300);
  }
  Serial.println();
  Serial.print("Connected with IP:");
  Serial.print(WiFi.localIP());
  Serial.println();

  config.api_key = API_KEY;
  config.database_url = DATABASE_URL;
  if (Firebase.signUp(&config, &auth, "", "")) {
    Serial.println("SignUp OK");
    signupOK = true;
  } else {
    Serial.println("%s\n", config.signer.signupError.message.c.str())
  }

  config.token_status_callback = tokenStatusCallback;
  Firebase.begin(&config, &auth);
  Firebase.reconnnectWiFi(true);
}

void loop() {
  if (Firebase.ready() && signupOK && (millis() - sendDataPrevMillis > 5000 || sendDataPrevMillis == 0)) {
    sendDataPrevMillis = millis();
    //-------Store sensor data to RTDB------
    readHeartRateSensor();
    readTemperature();
    checkFallDetection();

    String healthData = createHealthPayload();

    sendToFirebase(healthData);

    delay(5000);
  }
  void initializeAccelerometer() {
    if (!IMU.begin()) {
      Serial.println("Failed to initialize IMU!");
      while (1)
        ;
    }
  }

  void initializeHeartRateSensor() {
    heartRateSensor.begin();
    heartRateSensor.setMode(MAX30100_MODE_SPO2_HR);
    heartRateSensor.setLedsCurrent(MAX30100_LED_CURR_50MA, MAX30100_LED_CURR_27_1MA);
  }

  void readHeartRateSensor() {
    heartRateSensor.update();

    if (heartRateSensor.getRawValues(&heartRate, &oxygenSaturation)) {
      Serial.print("Heart Rate: ");
      Serial.println(heartRate);
      Serial.print("Oxygen Saturation: ");
      Serial.println(oxygenSaturation);
    }
  }

  void readTemperature() {
    tempSensor.requestTemperatures();
    bodyTemperature = tempSensor.getTempCByIndex(0);
    Serial.print("Body Temperature: ");
    Serial.println(bodyTemperature);
  }

  void checkFallDetection() {
    float ax, ay, az;

    if (IMU.accelerationAvailable()) {
      IMU.readAcceleration(ax, ay, az);

      // Calculate total acceleration
      float totalAcceleration = sqrt(ax * ax + ay * ay + az * az);

      // Detect fall
      if (totalAcceleration > FALL_THRESHOLD) {
        fallDetected = true;
        Serial.println("FALL DETECTED!");
      }
    }
  }

  String createHealthPayload() {
    String payload = "{";
    payload += "\"heartRate\":" + String(heartRate);
    payload += ",\"oxygenSaturation\":" + String(oxygenSaturation);
    payload += ",\"bodyTemperature\":" + String(bodyTemperature);
    payload += ",\"fallDetected\":" + String(fallDetected);
    payload += ",\"timestamp\":" + String(millis());
    payload += "}";

    return payload;
  }

  void sendToFirebase(String data) {
    if (Firebase.pushJSON(firebaseData, "/health-data", data)) {
      Serial.println("Data sent to Firebase successfully");
    } else {
      Serial.println("Firebase push failed");
      Serial.println(firebaseData.errorReason());
    }
  }

  void connectToWiFi() {
    WiFi.begin(WIFI_SSID, WIFI_PASSWORD);
    while (WiFi.status() != WL_CONNECTED) {
      delay(500);
      Serial.print(".");
    }
    Serial.println("\nConnected to WiFi");
  }
