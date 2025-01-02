import React, { useState } from "react";
import "./App.css";
import PushNotifications from "./components/PushNotifications";

const ChatApp = () => {
  const [messages, setMessages] = useState({});
  const [input, setInput] = useState("");
  const [selectedCaregiver, setSelectedCaregiver] = useState("Chat"); // Default header is "Chat"

  const handleSend = () => {
    if (input.trim() && selectedCaregiver !== "Chat") {
      setMessages((prev) => ({
        ...prev,
        [selectedCaregiver]: [...(prev[selectedCaregiver] || []), { sender: "You", text: input }],
      }));
      setInput("");
    } else if (selectedCaregiver === "Chat") {
      alert("Please select a caregiver to send a message.");
    }
  };

  const handleLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const locationMessage = `📍 Location: https://www.google.com/maps?q=${latitude},${longitude}`;
          setMessages((prev) => ({
            ...prev,
            [selectedCaregiver]: [...(prev[selectedCaregiver] || []), { sender: "You", text: locationMessage }],
          }));
        },
        (error) => {
          alert("Unable to fetch location. Please enable location services.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  const handleReminder = () => {
    if (selectedCaregiver !== "Chat") {
      const reminderMessage = "Take your pills at 8:00 PM!";
      setMessages((prev) => ({
        ...prev,
        [selectedCaregiver]: [...(prev[selectedCaregiver] || []), { sender: "Reminder", text: reminderMessage }],
      }));
      alert(reminderMessage);
    } else {
      alert("Please select a caregiver to send a reminder.");
    }
  };

  const selectCaregiver = (caregiver) => {
    setSelectedCaregiver(caregiver);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      {/* Dynamic Header */}
      <header className="bg-gradient-to-r from-blue-300 to-pink-300 text-black text-center p-4 font-bold">
        {selectedCaregiver === "Chat" ? "Chat with Caregivers" : `Chat with ${selectedCaregiver}`}
      </header>

      <div className="flex flex-1">
        {/* Sidebar with Caregiver List */}
        <aside className="w-1/4 bg-gray-200 p-4 flex flex-col items-center rounded-lg shadow-lg">
          <button
            onClick={() => selectCaregiver("Chat")}
            className="bg-gradient-to-r from-pink-400 to-yellow-500 text-white rounded-full w-full py-2 mb-4 text-lg font-bold shadow-md hover:shadow-lg transition-shadow duration-300"
          >
            Chat
          </button>
          {["Caregiver 1", "Caregiver 2", "Caregiver 3"].map((caregiver, index) => (
            <button
              key={index}
              onClick={() => selectCaregiver(caregiver)}
              className={`bg-gradient-to-r from-purple-500 to-blue-300 text-white rounded-full w-full py-2 mb-2 text-lg font-semibold shadow-md hover:shadow-lg transition-shadow duration-300 ${
                selectedCaregiver === caregiver ? "ring-4 ring-blue-400" : ""
              }`}
            >
              {caregiver}
            </button>
          ))}
        </aside>

        {/* Main Chat Interface */}
        <main className="flex-1 flex flex-col bg-white rounded-lg shadow-md p-4">
          <div className="flex-1 overflow-y-auto mb-4">
            {selectedCaregiver === "Chat" ? (
              <b><p className="text-red-500 text-center">Please select a caregiver to start chatting!!!</p></b>
            ) : (
              (messages[selectedCaregiver] || []).map((msg, index) => (
                <p key={index} className={`mb-2 ${msg.sender === "You" ? "text-right" : "text-left"}`}>
                  <span className={`font-bold ${msg.sender === "You" ? "text-blue-500" : "text-green-500"}`}>
                    {msg.sender}:
                  </span>{" "}
                  {msg.text}
                </p>
              ))
            )}
          </div>

          {/* Input Section */}
          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 border rounded-lg p-2 focus:outline-none focus:ring focus:ring-black-300"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={selectedCaregiver === "Chat"}
            />
            <button onClick={handleLocation}>
              <img src="/icons/location-icon.png" alt="Location" className="w-8 h-8" />
            </button>
            <button onClick={handleReminder}>
              <img src="/icons/reminder-icon.png" alt="Reminder" className="w-8 h-8" />
            </button>
            <button onClick={handleSend}>
              <img src="/icons/send-icon.png" alt="Send" className="w-8 h-8" />
            </button>
          </div>
        </main>
      </div>
    </div>
  );
};

// App Component
function App() {
  return (
    <div className="App">
      <PushNotifications />
      <ChatApp />
    </div>
  );
}

export default App;
