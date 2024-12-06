import React, { useState } from "react";

const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim()) {
      setMessages((prev) => [...prev, { sender: "You", text: input }]);
      setInput("");
    }
  };

  const handleLocation = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const locationMessage = `📍 Location: https://www.google.com/maps?q=${latitude},${longitude}`;
          setMessages((prev) => [...prev, { sender: "You", text: locationMessage }]);
        },
        (error) => {
          alert("Unable to fetch location. Please enable location services.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };

  const handleMicrophone = () => {
    alert("Voice recording feature is under development!");
  };

  return (
    <div className="h-screen flex flex-col bg-gray-100">
      <header className="bg-gradient-to-r from-blue-500 to-pink-300 text-black text-center p-4 font-bold">
        Chat with Caregivers
      </header>
      

    
<div className="flex flex-1">
  <aside className="w-1/4 bg-gray-200 p-4 flex flex-col items-center rounded-lg shadow-lg">
    <button className="bg-gradient-to-r from-blue-400 to-pink-500 text-white rounded-full w-full py-2 mb-4 text-lg font-bold shadow-md hover:shadow-lg transition-shadow duration-300">
      Chat
    </button>
    <button className="bg-gradient-to-r from-purple-500 to-blue-300 text-white rounded-full w-full py-2 mb-2 text-lg font-semibold shadow-md hover:shadow-lg transition-shadow duration-300">
      Caregiver 1
    </button>
    <button className="bg-gradient-to-r from-purple-500 to-blue-300 text-white rounded-full w-full py-2 mb-2 text-lg font-semibold shadow-md hover:shadow-lg transition-shadow duration-300">
      Caregiver 2
    </button>
    <button className="bg-gradient-to-r from-purple-500 to-blue-300 text-white rounded-full w-full py-2 text-lg font-semibold shadow-md hover:shadow-lg transition-shadow duration-300">
      Caregiver 3
    </button>
  </aside>



        <main className="flex-1 flex flex-col bg-white rounded-lg shadow-md p-4">
          <div className="flex-1 overflow-y-auto mb-4">
            {messages.map((msg, index) => (
              <p key={index} className={`mb-2 ${msg.sender === "You" ? "text-right" : "text-left"}`}>
                <span className={`font-bold ${msg.sender === "You" ? "text-blue-500" : "text-green-500"}`}>
                  {msg.sender}:
                </span>{" "}
                {msg.text}
              </p>
            ))}
          </div>

          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 border rounded-lg p-2 focus:outline-none focus:ring focus:ring-green-300"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button onClick={handleLocation}>
              <img src="/icons/location-icon.png" alt="Location" className="w-8 h-8" />
            </button>
            <button onClick={handleMicrophone}>
              <img src="/icons/microphone-icon.png" alt="Microphone" className="w-8 h-8" />
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

export default ChatApp;
