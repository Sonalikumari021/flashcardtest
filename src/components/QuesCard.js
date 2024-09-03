import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
    addCorrectQuestion,
    addIncorrectQuestion,
    addReviewQuestion,
    clearReviewQuestions, 
} from '../redux/slices/questionSlice';
import './QuesCard.css';
import FinishPage from './FinishPage';

const QuesCard = ({ Question, nextQuestion, isLastQuestion, isReviewPage }) => {
    const [selectedOption, setSelectedOption] = useState('');
    const reviewQuestions = useSelector(state => state.questions.reviewQuestions);
    const [isCorrect, setIsCorrect] = useState(null);
    const [isFlipped, setIsFlipped] = useState(false);
    const [NextButton, setNextButton] = useState(false);
    const [timer, setTimer] = useState(20);
    const dispatch = useDispatch();
    const [finishPage, setFinishPage] = useState(false);

    useEffect(() => {
        const countdown = setInterval(() => {
            setTimer((prevTimer) => {
                if (prevTimer <= 1) {
                    clearInterval(countdown);
                    setIsFlipped(true);
                    setNextButton(true);
                    return 0;
                }
                return prevTimer - 1;
            });
        }, 1000);

        return () => clearInterval(countdown);
    }, [Question]);

    const optionChangeHandler = (event) => {
        const selected = event.target.value;
        setSelectedOption(selected);
        setIsFlipped(true);

        if (selected === Question.correctanswer) {
            setIsCorrect(true);
            dispatch(addCorrectQuestion(Question));
        } else {
            setIsCorrect(false);
            dispatch(addIncorrectQuestion(Question));
        }

        setNextButton(true);
    };

    const nextQuestionHandler = () => {
        setSelectedOption('');
        setIsFlipped(false);
        setTimer(20);
        setNextButton(false);
        nextQuestion();
    };

    const reviewHandler = () => {
        setIsFlipped(true);
        dispatch(addReviewQuestion(Question));
    };

    const finishHandler = () => {
        setFinishPage(true);
        if (isReviewPage) {
            dispatch(clearReviewQuestions()); 
        }
    };

    if (finishPage) {
        return <FinishPage />;
    }

    return (
        <div className="flex justify-center items-center h-full">
            <div className={`card ${isFlipped ? 'flipped' : ''} bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4 border border-gray-300 w-full md:max-w-xl lg:max-w-2xl xl:max-w-3xl h-auto flex`}>
                <div className="front">
                    <p className="mb-4">{Question.question}</p>
                    <div className="options mb-4">
                        {Question.options.map((option, index) => (
                            <label key={index} className="block mb-2">
                                <input
                                    type="radio"
                                    name="option"
                                    value={option}
                                    checked={selectedOption === option}
                                    onChange={optionChangeHandler}
                                    className="form-radio h-4 w-4 text-indigo-600"
                                />
                                <span className="ml-2">{option}</span>
                            </label>
                        ))}
                    </div>
                    {!isReviewPage && (
                        <button onClick={reviewHandler} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                            Review
                        </button>
                    )}
                    <div className="timer mt-4">Time left: {timer} seconds</div>
                </div>
                <div className="back">
                    <div>
                        <h1 className="text-xl font-bold mb-4">Answer</h1>
                        <p className="mb-4">{Question.correctanswer}</p>
                        {isLastQuestion ? (
                            <button onClick={finishHandler} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                Finish
                            </button>
                        ) : (
                            <button onClick={nextQuestionHandler} className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
                                Next Question
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default QuesCard;
