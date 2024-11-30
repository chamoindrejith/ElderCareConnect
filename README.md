# ElderCare Connect  
A **Progressive Web Application (PWA)** designed to support elderly individuals living alone by enhancing safety, health monitoring, and social engagement.  

---

## 📑 Table of Contents  
1. [Project Overview](#project-overview)  
2. [Features](#features)  
3. [Technologies Used](#technologies-used)  
4. [Installation](#installation)  
5. [Usage](#usage)  
6. [Contributors](#contributors)  
7. [Conclusion](#conclusion)   

---

## 📖 Project Overview  
ElderCare Connect addresses critical challenges faced by elderly individuals living alone, such as medical emergencies, falls, and isolation. By offering real-time health monitoring, emergency alerts, location sharing, and social engagement features, the application empowers independent living while providing caregivers and families with peace of mind.  

---

## ✨ Features  

### For Elderly Users  
- **Health Monitoring**: Integration with wearable devices to track vital signs, including heart rate, blood pressure, and activity levels.  
- **Emergency Alerts**: Automatic fall detection and an SOS button for real-time notifications.  
- **Location Sharing**: Share real-time location with caregivers during emergencies using geolocation technology.  
- **Medication Reminders**: Notifications to maintain timely medication intake.  
- **Daily Check-ins**: Wellness surveys and reminders to monitor well-being.  
- **Communication Tools**: Messaging with caregivers and virtual communities using WebSocket-based real-time chat.  

### For Family/Caregivers  
- **Real-time Alerts**: Notifications for emergencies, missed check-ins, and location updates.  
- **Health Reports**: Periodic summaries of vital health trends.  
- **Location Tracking**: GPS tracking during emergencies or other critical events.  
- **Communication Tools**: Real-time chat features to stay connected with elderly users.  

### Backend Features  
- Secure storage and management of health data.  
- Role-based access for users, caregivers, and healthcare providers.  
- WebSocket-based infrastructure for real-time communication and notifications.  

### Key Highlights  
- Offline capabilities enabled by Progressive Web App (PWA) technology.  
- Optimized for elderly users with intuitive navigation and accessibility features.  

---

## 💻 Technologies Used  
- **Frontend**: Next.js, Tailwind CSS  
- **Backend**: Node.js, Express.js, MongoDB  
- **Real-time Communication**: WebSocket for chat and notification features  
- **Geolocation**: Integrated for real-time location sharing  
- **PWA Features**: Service Workers, Web App Manifest, Push Notifications API  
- **APIs**: Google Fit, Firebase Cloud Messaging (FCM), Twilio  
- **Security**: JWT (JSON Web Tokens), SSL Encryption  

---

## ⚙️ Installation  

1. **Clone the repository** :  
   ```bash  
   git clone https://github.com/your-repo/eldercare-connect.git  
   cd eldercare-connect  

2. **Install dependencies** :
   ```bash
   npm install  

3. **Configure environment variables** :
Create a `.env` file in the root directory and add the required API keys and configurations.
    ```bash
    FIREBASE_CONFIG=your-firebase-config  
    TWILIO_API_KEY=your-twilio-api-key  

4. **Start the development server** :
   ```bash
   npm run dev
   
5.**Build for production** :
  ```bash
    npm run build  
    npm start

```
---
## 🚀 Usage
### **For Elderly Users**
1. Log in or register an account.
2. Pair wearable devices for health monitoring.
3. Access health stats, medication reminders, and social features via the dashboard.
4. Share location with caregivers during emergencies.
### **For Caregivers**
1. Log in to monitor the assigned user’s health and activity.
2. Receive alerts and notifications for emergencies or anomalies.
3. Use real-time chat and location tracking to ensure communication and support during critical moments.

---

## 👩‍💻 Contributors
### **Team Members**
- Indrejith S.A.C.S. - [2020/ICT/65]
- Lakmini L.A.M. - [2020/ICT/44]
- Thavarajah H. - [2020/ICT/120]
- Lakshna G. - [2020/ICT/83]
- Perera H.D.S. - [2020/ICT/91]
- Chandrasekara C.G.H.P.L. - [2020/ICT/69]
- Imran B.M. - [2020/ICT/02]
  
**Supervisor**: Mr. K. Mathanaharan

---

## 🎯 Conclusion
ElderCare Connect is a thoughtfully designed solution addressing the unique challenges faced by elderly individuals living alone. By integrating advanced technologies such as WebSocket for real-time communication and geolocation for emergency location sharing, the application enhances the safety, health monitoring, and social engagement of its users. This project not only empowers elderly individuals to live independently but also provides peace of mind to families and caregivers. As we continue to innovate and refine the platform, ElderCare Connect strives to set a benchmark in elderly care technology.
