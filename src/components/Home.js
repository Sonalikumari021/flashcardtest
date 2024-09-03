import React, { useState } from "react";
import SignUp from "./auth/SignUp";
import SignIn from "./auth/SignIn";

const Home = () => {
    const [signin, setSignIn] = useState(false);
    const [signup, setSignUp] = useState(false);

    const signupHandler = () => {
        setSignUp(true);
        setSignIn(false); 
    };

    const signinHandler = () => {
        setSignIn(true);
        setSignUp(false); 
    };

    const goBackHandler = () => {
        setSignUp(false);
        setSignIn(false);
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <div className="text-center mb-8">
                {!signin && !signup && (
                    <>
                        <div className="mb-4 flex gap-x-2 mt-4">
                            <p className="text-lg">If you are a new user, register</p>
                            <p className="text-lg text-blue-500 hover:underline cursor-pointer" onClick={signupHandler}>Click here</p>
                        </div>
                        <div className="mb-4 flex gap-x-2">
                            <p className="text-lg">If you are already registered, log in</p>
                            <p className="text-lg text-blue-500 hover:underline cursor-pointer" onClick={signinHandler}>Click here</p>
                        </div>
                    </>
                )}
            </div>

            {signin && <SignIn goBack={goBackHandler} />} 
            {signup && <SignUp goBack={goBackHandler} />}
        </div>
    );
};

export default Home;
