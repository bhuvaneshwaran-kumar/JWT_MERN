import React, { useState } from "react";
import { authFetch, baseURL } from "../utils/authFetch";

function ProfilePage() {
  const [message, setMessage] = useState("");
  const getRandomNumber = async () => {
    const response = await authFetch(`${baseURL}/api/auth/random`);
    let { ok, message: resMessage } = await response.json();
    if (ok) {
      setMessage(resMessage);
    } else {
      alert(resMessage);
    }
  };
  return (
    <div className="page">
      <h1>ProfilePage</h1>
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit,Quo est quod?
      </p>
      <br />
      <br />
      <button onClick={getRandomNumber}>Create Random</button>
      <br />
      <br />
      {message && <p>{message}</p>}
    </div>
  );
}

export default ProfilePage;
