import { useState } from 'react';

function ApiCallButton() {
  // State to manage loading status
  const [loading, setLoading] = useState(false);
  // State to store messages (success or error)
  const [message, setMessage] = useState(null);

  const handleApiCall = async () => {
    setMessage(null);
    setLoading(true);

    const url = "https://workwithus.lucioai.com/get-started"; // VERIFY THIS URL on the page!
    const data = {
      name: "Anirban Sarkar", // <<< REPLACE with your name
      email: "rahulsarkar8343@gmail.com", // <<< REPLACE with your email
    };

    try {
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      // Check if the response was successful (status codes 200-299)
      if (!response.ok) {
        // Attempt to read error body if available, otherwise use status text
        const errorBody = await response.text(); // Use text() in case it's not JSON
        throw new Error(`HTTP error! status: ${response.status}, body: ${errorBody}`);
      }

      // Parse the response body (assuming it's JSON based on the previous context)
      const result = await response.json();

      // Set success message
      setMessage(`Success: ${JSON.stringify(result)}`);
      console.log("Success:", result);

    } catch (error) {
      // Set error message
      setMessage(`Error: ${error.message}`);
      console.error("Error:", error);

    } finally {
      // Always set loading to false after the fetch operation completes
      setLoading(false);
    }
  };

  return (
    <div>
      <button
        onClick={handleApiCall} // Attach the click handler
        disabled={loading} // Disable the button while loading
      >
        {loading ? 'Sending...' : 'Send Name & Email'} {/* Button text changes based on loading state */}
      </button>

      {/* Display messages below the button */}
      {message && (
        <p style={{ color: message.startsWith('Error:') ? 'red' : 'green', marginTop: '10px' }}>
          {message}
        </p>
      )}
    </div>
  );
}

export default ApiCallButton;