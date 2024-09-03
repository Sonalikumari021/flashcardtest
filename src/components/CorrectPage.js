import React from "react";
import { useSelector } from 'react-redux';


const CorrectPage = ({onBack}) => {
    const correctQuestions = useSelector(state => state.questions.correctQuestions);
    

    return (
        <div className=" min-h-screen p-8">
            <h2 className="text-2xl font-bold mb-4">Correct Questions</h2>
            {correctQuestions.map((question, index) => (
                <div key={index} className="bg-white shadow-md rounded-lg p-4 mb-4">
                    <p className="mb-2">{question.question}</p>
                    <ul className="list-disc pl-4 mb-2">
                        {question.options.map((option, optIndex) => (
                            <li key={optIndex}>Option {optIndex + 1}: {option}</li>
                        ))}
                    </ul>
                    <p className="text-gray-700">Correct Answer: {question.correctanswer}</p>
                </div>
           ))}
           <button
                onClick={onBack}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            >
                Back to Finish Page
            </button>
           
        </div>
    );
};

export default CorrectPage;