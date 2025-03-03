'use client';
import { Button } from "@/components/ui/button";
import { BellRing, MapPin, Send } from "lucide-react";
import React, { useState } from "react";
import { toast } from "sonner";

type Message = {
  sender: string;
  text: string;
};

type Messages = {
  [key: number]: Message[];
};

const caregivers = ["Caregiver 1", "Caregiver 2", "Caregiver 3"];

const ChatApp = () => {
  const [messages, setMessages] = useState<Messages>({});
  const [input, setInput] = useState<string>("");
  const [selectedCaregiver, setSelectedCaregiver] = useState<number | null>(null);

  const handleSend = () => {
    if (input.trim() && selectedCaregiver !== null) {
      setMessages((prev) => ({
        ...prev,
        [selectedCaregiver]: [
          ...(prev[selectedCaregiver] || []),
          { sender: "You", text: input },
        ],
      }));
      setInput("");
    } else {
      toast("Please select a caregiver to send a message.");
    }
  };

  const handleLocation = () => {
    if (selectedCaregiver === null) {
      toast("Please select a caregiver to send a location.");
      return;
    }

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const locationMessage = `📍 Location: https://www.google.com/maps?q=${latitude},${longitude}`;
          setMessages((prev) => ({
            ...prev,
            [selectedCaregiver]: [
              ...(prev[selectedCaregiver] || []),
              { sender: "You", text: locationMessage },
            ],
          }));
        },
        () => {
          toast("Unable to fetch location. Please enable location services.");
        }
      );
    } else {
      toast("Geolocation is not supported by your browser.");
    }
  };

  const handleReminder = () => {
    if (selectedCaregiver === null) {
      toast("Please select a caregiver to send a reminder.");
      return;
    }

    const reminderMessage = "Take your pills at 8:00 PM!";
    setMessages((prev) => ({
      ...prev,
      [selectedCaregiver]: [
        ...(prev[selectedCaregiver] || []),
        { sender: "Reminder", text: reminderMessage },
      ],
    }));
    toast(reminderMessage);
  };

  return (
    <div className="h-full flex flex-col bg-gray-100">
      <header className="bg-slate-200 text-black text-center p-4 font-bold">
        {selectedCaregiver === null
          ? "Chat with Caregivers"
          : `${caregivers[selectedCaregiver]}`}
      </header>

      <div className="flex flex-1">
        <aside className="w-1/4 bg-gray-200 p-4 gap-4 flex flex-col items-center rounded-lg shadow-lg">
          {caregivers.map((caregiver, index) => (
            <Button
              key={index}
              onClick={() => setSelectedCaregiver(index)}
              className="w-full"
              variant={selectedCaregiver === index ? "secondary" : "outline"}
            >
              {caregiver}
            </Button>
          ))}
        </aside>

        <main className="flex-1 flex flex-col bg-white rounded-lg shadow-md p-4">
          <div className="flex-1 overflow-y-auto mb-4">
            {selectedCaregiver === null ? (
              <b>
                <p className="text-red-500 text-center">
                  Please select a caregiver to start chatting!!!
                </p>
              </b>
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

          <div className="flex items-center space-x-4">
            <input
              type="text"
              placeholder="Type a message..."
              className="flex-1 border rounded-lg p-2 focus:outline-none focus:ring focus:ring-black-300"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={selectedCaregiver === null}
            />
            <button onClick={handleLocation}><MapPin className="text-green-500" /></button>
            <button onClick={handleReminder}><BellRing className="text-blue-500" /></button>
            <button onClick={handleSend}><Send /></button>
          </div>
        </main>
      </div>
    </div>
  );
};

export default ChatApp;
