import React, { useState } from "react";
import axios from "axios";

const PhoneInput = ({ setStep, setPhone, telegramId }) => {
  const [phoneInput, setPhoneInput] = useState("");

  const sendOTP = async () => {
    try {
      const response = await axios.post("/send_otp", { phone: phoneInput });
      alert("OTP sent successfully.");
      setPhone(phoneInput);
      setStep("otp");
    } catch (error) {
      alert("Failed to send OTP.");
    }
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Enter Phone Number"
        value={phoneInput}
        onChange={(e) => setPhoneInput(e.target.value)}
      />
      <button onClick={sendOTP}>Send OTP</button>
    </div>
  );
};

export default PhoneInput;
