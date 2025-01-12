#include <Servo.h>

#define BUTTON_PIN 4 // Pin for the touch sensor

Servo myservo;  // create servo object to control a servo
int pos = 0;    // variable to store the servo position
int startPos = 90; // starting position (neutral, like at rest)
int endPos = 180; // ending position (full inhale or exhale)
bool isBreathing = false; // flag to control start/stop of breathing

struct touch { 
  byte wasPressed = LOW; 
  byte isPressed = LOW; 
}; 

touch touchSensor;

void setup() {
  myservo.attach(9);  // attaches the servo on pin 9 to the servo object
  pinMode(BUTTON_PIN, INPUT); // initialize the touch sensor pin as input
  Serial.begin(115200); // initialize serial communication for debugging
}

void loop() {
  touchSensor.isPressed = isTouchPressed(BUTTON_PIN); // check if the touch sensor is pressed
  
  if (touchSensor.wasPressed != touchSensor.isPressed) { // detect touch state change
    if (touchSensor.isPressed) {
      // Toggle the breathing effect when the touch sensor is pressed
      isBreathing = !isBreathing;
      
      if (isBreathing) {
        Serial.println("Breathing effect started"); 
      } else {
        Serial.println("Breathing effect stopped");
      }
    }
  }

  touchSensor.wasPressed = touchSensor.isPressed; // update the previous state

  // If breathing is active, run the breathing effect
  if (isBreathing) {
    breathingEffect();  
  }
}

// Function to check if the touch sensor is pressed
bool isTouchPressed(int pin) { 
  return digitalRead(pin) == HIGH; 
}

// Function to control the servo movement with a breathing-like effect
void breathingEffect() {
  // Simulate inhaling (servo moves slowly to endPos)
  for (pos = startPos; pos <= endPos && isBreathing; pos += 1) {
    int breathingSpeed = map(pos, startPos, endPos, 30, 10); // slow at start, faster in middle
    myservo.write(pos);    
    delay(breathingSpeed); // breathing effect: slow inhale, faster in middle

  }

  if (isBreathing) {
    delay(1000); // Pause at full inhale (endPos), like holding your breath
  }

  // Simulate exhaling (servo moves slowly back to startPos)
  for (pos = endPos; pos >= startPos && isBreathing; pos -= 1) {
    int breathingSpeed = map(pos, startPos, endPos, 10, 30); // fast at start, slow at end
    myservo.write(pos);    
    delay(breathingSpeed); // breathing effect: faster at start, slower towards the end
  }

  if (isBreathing) {
    delay(1000); // Pause at full exhale (startPos), like holding before next inhale
    // exit(0);
  }
}
