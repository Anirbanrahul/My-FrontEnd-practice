import { useState, useRef, useEffect } from "react";
import PropTypes from "prop-types"; // Import PropTypes

const OTPInput = ({ length = 6, onComplete }) => {
  const [otp, setOtp] = useState(Array(length).fill("")); // Array to store OTP digits
  const inputRefs = useRef([]); // Refs for each input field

  // Handle input change
  const handleChange = (index, value) => {
    if (isNaN(value)) return; // Allow only numeric input

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus to the next input
    if (value && index < length - 1) {
      inputRefs.current[index + 1].focus();
    }

    // Trigger onComplete when all fields are filled
    if (newOtp.every((digit) => digit !== "")) {
      onComplete(newOtp.join(""));
    }
  };

  // Handle backspace
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // Handle paste
  const handlePaste = (e) => {
    e.preventDefault();
    const pasteData = e.clipboardData.getData("text").slice(0, length);
    const newOtp = [...otp];

    pasteData.split("").forEach((char, i) => {
      if (i < length) {
        newOtp[i] = char;
      }
    });

    setOtp(newOtp);
    if (pasteData.length === length) {
      onComplete(newOtp.join(""));
    }
  };

  // Focus the first input on mount
  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  return (
    <div style={{ display: "flex", gap: "10px", justifyContent: "center" }}>
      {otp.map((digit, index) => (
        <input
          key={index}
          type="text"
          maxLength="1"
          value={digit}
          onChange={(e) => handleChange(index, e.target.value)}
          onKeyDown={(e) => handleKeyDown(index, e)}
          onPaste={handlePaste}
          ref={(el) => (inputRefs.current[index] = el)}
          style={{
            width: "40px",
            height: "40px",
            textAlign: "center",
            fontSize: "18px",
            border: "1px solid #ccc",
            borderRadius: "5px",
          }}
        />
      ))}
    </div>
  );
};

// Define PropTypes for the component
OTPInput.propTypes = {
  length: PropTypes.number, // Length of the OTP (default is 6)
  onComplete: PropTypes.func.isRequired, // Callback function triggered when OTP is complete
};

export default OTPInput;