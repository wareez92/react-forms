import React, { useState } from "react";

export default function Authenticate({ token }) {
  const [sucessMessage, setSucessMessage] = useState(null);
  const [error, setError] = useState(null);
  const [username, setUsername] = useState(null);

  async function handleClick() {
    try {
      const response = await fetch(
        "https://fsa-jwt-practice.herokuapp.com/authenticate",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const result = await response.json();
      console.log(result);
      setSucessMessage(result.message);
      if (result.data && result.data.username) {
        setUsername(result.data.username);
      } else {
        setUsername(null);
      }
    } catch (error) {
      setError(error.message);
    }
  }

  return (
    <>
      <h2>Authenticate!</h2>;
        {sucessMessage && <p>{sucessMessage}</p>} 
        {error && <p>{error}</p>}
        {username && <p> Username : {username}</p>}
        <button onClick={handleClick}>Token Authentication</button>
    </>
  );
}
