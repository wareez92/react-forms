import React, { useState } from "react";

export default function SignUpForm({ token, setToken }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const [loggedInUser, setLoggedInUser] = useState(null);
  //   const [token, setToken] = useState(null);

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await fetch(
        "https://fsa-jwt-practice.herokuapp.com/signup",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            username: username,
            password: password,
          }),
        }
      );

      const result = await response.json();
      console.log(result);
      setToken(result.token);

    } catch (error) {
      setLoggedInUser(result.data.username);

      setError(error.message);
    }
  }

//   console.log("username --->", username);

  return (
    <>
      <h2>SignUpForm</h2>
      {error && <p>{error}</p>}

      <form onSubmit={handleSubmit}>
        <label>
          Username:{" "}
          <input
            value={username}
            onChange={(event) => setUsername(event.target.value)}
          />
        </label>
        <label>
          Password:{" "}
          <input
            value={password}
            onChange={(event) => setPassword(event.target.value)}
          />
        </label>
        <button>Submit</button>
      </form>
    </>
  );
}
