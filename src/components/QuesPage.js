import React, { useState, useEffect } from 'react';
import QuesCard from './QuesCard';
import FinishPage from './FinishPage';
import { db } from '../firebase';
import { collection,getDocs } from 'firebase/firestore';

const QuesPage = () => {
    const [index, setIndex] = useState(0);
    const [Questions, setQuestions] = useState(null);

   
    const fetchData = async () => {
       
        await getDocs(collection(db, "Questions"))
            .then((querySnapshot)=>{               
                const newData = querySnapshot.docs
                    .map((doc) => ({...doc.data(), id:doc.id }));
                setQuestions(newData);                
                console.log(Questions, newData);
            })
       
    }
   
    useEffect(()=>{
        fetchData();
    }, [])
    
    const nextQuestion = () => {
        if (Questions && index + 1 < Questions.length) {
            setIndex(index + 1);
        } else if (Questions) {
            setIndex(index + 1);
        }
    };

    if (Questions === null) {
        return <div className='min-h-full flex justify-center items-center text-xl'> Loading...</div>;
    }

    if (index >= Questions.length) {
        return <FinishPage />;
    }

    return (
        <div className="flex justify-center items-center min-h-screen px-4">
            <div className="p-6 min-h-0">
                <QuesCard
                    Question={Questions[index]}
                    nextQuestion={nextQuestion}
                    isLastQuestion={index === Questions.length - 1}
                />
            </div>
        </div>
    );
};

export default QuesPage;
