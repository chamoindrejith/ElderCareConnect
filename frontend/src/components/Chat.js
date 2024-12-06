const express = require("express");
const app = express();
app.use(express.json());

let chatData = {
  "Caregiver 1": [],
  "Caregiver 2": [],
  "Caregiver 3": [],
};

// Fetch chat history
app.get("/api/chat/:caregiver", (req, res) => {
  const caregiver = req.params.caregiver;
  res.json({ messages: chatData[caregiver] || [] });
});

// Post new messages
app.post("/api/chat/:caregiver", (req, res) => {
  const caregiver = req.params.caregiver;
  const message = req.body;
  chatData[caregiver].push(message);
  res.status(200).send("Message saved!");
});

// Start the server
app.listen(3001, () => {
  console.log("Server is running on port 3001");
});
