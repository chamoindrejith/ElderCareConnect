import React, { useState } from "react";

const MessageInput = ({ sendMessage }) => {
  const [input, setInput] = useState("");
  const [reminder, setReminder] = useState("");

  const handleSend = () => {
    if (input.trim()) {
      sendMessage(input);
      setInput("");
    }
  };

  const setPillReminder = () => {
    const reminderMessage = `Reminder set: ${reminder}`;
    sendMessage(reminderMessage); // Log the reminder to the chat
    alert(`Reminder saved for: ${reminder}`);
    setReminder("");
  };

  return (
    <div className="flex items-center bg-gray-100 p-4 border-t">
      <input
        type="text"
        className="flex-1 p-2 rounded border border-gray-300"
        placeholder="Type a message..."
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        className="ml-2 bg-blue-500 text-white px-4 py-2 rounded"
        onClick={handleSend}
      >
        Send
      </button>

      {/* Reminder Icon */}
      <div className="ml-4 flex items-center">
        <input
          type="text"
          placeholder="Set Reminder (e.g., Take pills at 8 PM)"
          className="p-2 border border-gray-300 rounded"
          value={reminder}
          onChange={(e) => setReminder(e.target.value)}
        />
        <button
          className="ml-2 bg-green-500 text-white px-4 py-2 rounded"
          onClick={setPillReminder}
        >
          Set Reminder
        </button>
      </div>
    </div>
  );
};

export default MessageInput;
