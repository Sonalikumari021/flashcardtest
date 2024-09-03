import React, { useState } from "react";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

const SignUp = ({ goBack }) => {
const [email, setEmail] = useState("");
const [password, setPassword] = useState("");
const [error, setError] = useState("");

const handleSignUp = async (e) => {
  e.preventDefault();
  try {
    await createUserWithEmailAndPassword(auth, email, password);
    setError(""); 
  } catch (error) {
    if (error.code === "auth/email-already-in-use") {
      setError("Email already exists. Please log in.");
    } else {
      setError("Failed to create an account. Please try again.");
    }
  }
};

return (
<div className="flex flex-col items-center justify-center min-h-screen">
<form onSubmit={handleSignUp} className="w-full flex flex-col max-w-sm p-8 bg-white rounded shadow-md" autoComplete="off">
  <h1 className="mb-6 text-2xl font-semibold text-center">Create new Account</h1>
  <input
    type="email"
    value={email}
    onChange={(e) => setEmail(e.target.value)}
    placeholder="Email"
    name={email}
    autoCorrect="off"
    spellCheck="false"
    className="mb-2 p-2 border"
  />
  <input
    type="password"
    value={password}
    onChange={(e) => setPassword(e.target.value)}
    placeholder="Password"
    name={password}
    autoComplete="off"
    autoCorrect="off"
    spellCheck="false"
    className="mb-2 p-2 border"
  />
  <button
    type="submit"
    className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
  >
    Sign Up
  </button>
</form>
{error && <p className="text-red-600 mt-2">{error}</p>}
<div className="text-lg text-blue-500 hover:underline cursor-pointer" onClick={goBack}>
  Go back
</div>
</div>
);
};

export default SignUp;
