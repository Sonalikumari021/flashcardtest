import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { resetQuizState, storePreviousScore } from '../redux/slices/questionSlice';
import { collection, addDoc } from "firebase/firestore";
import { db, auth } from '../firebase';
import CorrectPage from './CorrectPage';
import IncorrectPage from './IncorrectPage';
import ReviewPage from './ReviewPage';
import PreviousMarks from './Previousmarks';
import QuesPage from './QuesPage';
import Home from './Home';

const FinishPage = () => {
    const dispatch = useDispatch();
    const correctQuestions = useSelector(state => state.questions.correctQuestions);
    const incorrectQuestions = useSelector(state => state.questions.incorrectQuestions);
    const reviewQuestions = useSelector(state => state.questions.reviewQuestions);
    const totalMarks = useSelector(state => state.questions.totalMarks);
    const previousScores = useSelector(state => state.questions.previousScores);

    const [showCorrectPage, setShowCorrectPage] = useState(false);
    const [showIncorrectPage, setShowIncorrectPage] = useState(false);
    const [showReviewPage, setShowReviewPage] = useState(false);
    const [showPreviousMarksPage, setShowPreviousMarksPage] = useState(false);
    const [restartTest, setRestartTest] = useState(false);
    const [logout, setLogout] = useState(false);

    const correctPageHandler = () => {
        setShowCorrectPage(true);
    };

    const incorrectPageHandler = () => {
        setShowIncorrectPage(true);
    };

    const reviewPageHandler = () => {
        setShowReviewPage(true);
    };

    const previousMarksPageHandler = () => {
        setShowPreviousMarksPage(true);
    };

    const saveScoreToFirestore = async (userId, score) => {
        try {
            await addDoc(collection(db, "userScores"), {
                userId: userId,
                score: score,
                timestamp: new Date(),
            });
            console.log("Score saved successfully");
        } 
        catch (error) {
            console.error("Error saving score: ", error);
        }
    };

    const restartHandler = async () => {
        const userId = auth.currentUser?.uid;
        if (userId) {
            await saveScoreToFirestore(userId, totalMarks);
        }
        dispatch(storePreviousScore());
        dispatch(resetQuizState());
        setRestartTest(true);
    };

    const logoutHandler = async () => {
        const userId = auth.currentUser?.uid;
        if (userId) {
            await saveScoreToFirestore(userId, totalMarks);
        }
        dispatch(storePreviousScore());
        dispatch(resetQuizState());
        auth.signOut();
        setLogout(true);
    };

    const backToFinishHandler = () => {
        setShowPreviousMarksPage(false);
        setShowCorrectPage(false);
        setShowIncorrectPage(false);
        setShowReviewPage(false);
    };

    if (restartTest) {
        return <QuesPage />;
    }

    if (logout) {
        return <Home />;
    }

    return (
        <div className="flex flex-col items-center justify-center h-screen relative">
            {!showCorrectPage && !showIncorrectPage && !showReviewPage && !showPreviousMarksPage && (
                <>
                    <div className="result-section">
                        <button onClick={logoutHandler} className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 absolute mt-[-190px]  rounded">
                            Logout
                        </button>
                    </div>
                    <div className="result-section mb-4 flex items-center gap-8">
                        <h2 className="text-xl font-bold">Correct Questions: {correctQuestions.length}</h2>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={correctPageHandler}>
                            View Correct Questions
                        </button>
                    </div>
                    <div className="result-section mb-4 flex items-center gap-8">
                        <h2 className="text-xl font-bold">Incorrect Questions: {incorrectQuestions.length}</h2>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={incorrectPageHandler}>
                            View Incorrect Questions
                        </button>
                    </div>
                    <div className="result-section mb-4 flex items-center gap-8">
                        <h2 className="text-xl font-bold">Review Questions: {reviewQuestions.length}</h2>
                        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={reviewPageHandler}>
                            View Review Questions
                        </button>
                    </div>
                    <div className="result-section mb-4">
                        <h2 className="text-xl font-bold">Total Marks: {totalMarks}</h2>
                    </div>
                    <div className="result-section mb-4">
                        {previousScores.length > 0 ? (
                            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" onClick={previousMarksPageHandler}>
                                View Previous Scores
                            </button>
                        ) : (
                            <p className="text-lg">No previous scores available.</p>
                        )}
                    </div>
                    <div className="result-section mb-4">
                        <button onClick={restartHandler} className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded">
                            Restart Quiz
                        </button>
                    </div>
                </>
            )}

            {showCorrectPage && <CorrectPage onBack={backToFinishHandler} />}
            {showIncorrectPage && <IncorrectPage onBack={backToFinishHandler} />}
            {showReviewPage && <ReviewPage onBack={backToFinishHandler} />}
            {showPreviousMarksPage && <PreviousMarks onBack={backToFinishHandler} />}
        </div>
    );
};

export default FinishPage;
