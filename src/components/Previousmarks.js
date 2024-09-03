import React from 'react';
import { useSelector } from 'react-redux';

const PreviousMarks = ({ onBack }) => {
    const previousScores = useSelector(state => state.questions.previousScores);

    return (
        <div className="flex flex-col items-center justify-center mt-4">
            <h1 className="text-3xl font-bold mb-8">Previous Scores</h1>
            <ul>
                {[...previousScores].reverse().map((score, index) => (
                    <li className="text-lg mb-2" key={index}>Score: {score}</li>
                ))}
            </ul>
            <button
                onClick={onBack}
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4"
            >
                Back to Finish Page
            </button>
        </div>
    );
};

export default PreviousMarks;
