import React from "react";

const CaregiverList = ({ setCaregiver }) => {
  const caregivers = [
    { id: 1, name: "Caregiver 1 👩‍⚕️" },
    { id: 2, name: "Caregiver 2 👨‍⚕️" },
    { id: 3, name: "Caregiver 3 💊" },
  ];

  return (
    <div className="sidebar">
      <h2>👥 Chat</h2>
      {caregivers.map((caregiver) => (
        <button
          key={caregiver.id}
          onClick={() => setCaregiver(caregiver.name)}
        >
          {caregiver.name}
        </button>
      ))}
    </div>
  );
};

export default CaregiverList;
