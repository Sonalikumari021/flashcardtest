import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import QuesCard from './QuesCard';
import FinishPage from './FinishPage';

const ReviewPage = ({ onBack }) => {
    const Questions = useSelector(state => state.questions.reviewQuestions);
    const [index, setIndex] = useState(0);

    const nextQuestion = () => {
        if (index + 1 < Questions.length) {
            setIndex(index + 1);
        } else {
            setIndex(index + 1);
        }
    };

    if (Questions === null) {
        return <div className='min-h-full flex justify-center items-center text-xl'>Loading...</div>;
    }

    if (index >= Questions.length) {
        return<FinishPage/>
    }

    return (
        <div className="min-h-screen p-8">
            
            <QuesCard
                Question={Questions[index]}
                nextQuestion={nextQuestion}
                isLastQuestion={index === Questions.length - 1}
                isReviewPage={true} 
            />
        </div>
    );
};

export default ReviewPage;
