import React, { useState, useEffect } from "react";
import CaregiverList from "./CaregiverList";
import MessageInput from "./MessageInput";

const ChatInterface = () => {
  const [messages, setMessages] = useState([]); // Store messages
  const [currentCaregiver, setCurrentCaregiver] = useState("Caregiver 1");

  // Fetch existing chat history
  useEffect(() => {
    fetch(`/api/chat/${currentCaregiver}`)
      .then((response) => response.json())
      .then((data) => setMessages(data.messages || []));
  }, [currentCaregiver]);

  // Send a new message
  const sendMessage = (newMessage) => {
    const message = {
      sender: "elder", // or "caregiver"
      content: newMessage,
      timestamp: new Date().toISOString(),
    };
    setMessages((prev) => [...prev, message]);

    // Send to backend
    fetch(`/api/chat/${currentCaregiver}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(message),
    });
  };

  return (
    <div className="flex h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-1/4 bg-green-200 p-4">
        <h2 className="text-lg font-bold text-center text-gray-800 mb-6">Chat</h2>
        <CaregiverList
          currentCaregiver={currentCaregiver}
          setCurrentCaregiver={setCurrentCaregiver}
        />
      </div>

      {/* Chat Section */}
      <div className="w-3/4 bg-white shadow-lg rounded-tl-lg flex flex-col">
        {/* Header */}
        <div className="bg-gradient-to-r from-blue-500 to-purple-500 text-white text-center text-lg font-semibold p-3">
          {currentCaregiver}
        </div>

        {/* Message Area */}
        <div className="flex-1 p-6 overflow-y-auto">
          {messages.map((msg, index) => (
            <div
              key={index}
              className={`mb-4 ${
                msg.sender === "elder" ? "text-right" : "text-left"
              }`}
            >
              <div
                className={`${
                  msg.sender === "elder"
                    ? "bg-blue-100 text-blue-800"
                    : "bg-gray-100 text-gray-600"
                } rounded-lg p-3 max-w-sm`}
              >
                {msg.sender === "elder" ? "You: " : `${currentCaregiver}: `}
                {msg.content}
              </div>
            </div>
          ))}
        </div>

        {/* Input Section */}
        <MessageInput sendMessage={sendMessage} />
      </div>
    </div>
  );
};

export default ChatInterface;
