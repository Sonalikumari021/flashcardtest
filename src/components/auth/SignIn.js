import React, { useState, useEffect, useRef } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { collection, getDocs, query, where } from "firebase/firestore";
import { auth, db } from "../../firebase";
import Dashboard from "../Dashboard";
import { useDispatch } from "react-redux";
import { setPreviousScores } from "../../redux/slices/questionSlice";

  const SignIn = ({ goBack }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const formRef = useRef(null);
  const [redirectToDashboard, setRedirectToDashboard] = useState(false);
  const dispatch = useDispatch();
  
  useEffect(() => {
    setEmail("");
    setPassword("");
    if (formRef.current) {
      formRef.current.reset();
    }
  }, []);

  const signIn = async (e) => {
    e.preventDefault();
    setError("");
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;
      console.log("User signed in:", user);
      
  const scoresQuery = query(
    collection(db, "userScores"),
    where("userId", "==", user.uid)
    );
  
  const querySnapshot = await getDocs(scoresQuery);
  const scores = [];
  querySnapshot.forEach((doc) => {
    scores.push(doc.data().score);
    });

    dispatch(setPreviousScores(scores));
    setRedirectToDashboard(true);
  } 
  catch (error) {
      console.error("Error signing in:", error);
      setError(error.message);
    }
  };


  const goBackHandler = () => {
    goBack(); 
  };

  if (redirectToDashboard) {
    return (
      <>
      <Dashboard/>;
      </>)
  }

  return (
    <div className="flex items-center justify-center min-h-full">
      <form ref={formRef} onSubmit={signIn} className="w-full max-w-sm p-8 bg-white rounded shadow-md" autoComplete="off">
        <h1 className="mb-6 text-2xl font-semibold text-center">Log In to your Account</h1>
        {error && <p className="mb-4 text-red-600">{error}</p>}
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          autoComplete="off"
          autoCorrect="off"
          spellCheck="false"
          className="w-full px-4 py-2 mb-4 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="password"
          placeholder="Enter your password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          autoComplete="off"
          autoCorrect="off"
          spellCheck="false"
          className="w-full px-4 py-2 mb-6 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button type="submit" className="w-full px-4 py-2 font-semibold text-white bg-indigo-600 rounded hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500">
          Log In
        </button>
        <div className="mt-4 text-lg text-blue-500 hover:underline cursor-pointer" onClick={goBackHandler}>
          Go back
        </div>
      </form>
    </div>
  );
};

export default SignIn;

