import { createSlice } from '@reduxjs/toolkit';

export const questionSlice = createSlice({
    name: 'questions',
    initialState: {
        correctQuestions: [],
        incorrectQuestions: [],
        reviewQuestions: [],
        totalMarks: 0,
        previousScores: [],
    },
    reducers: {
        addCorrectQuestion: (state, action) => {
            state.correctQuestions.push(action.payload);
            state.totalMarks += 5;
        },
        addIncorrectQuestion: (state, action) => {
            state.incorrectQuestions.push(action.payload);
        },
        addReviewQuestion: (state, action) => {
            state.reviewQuestions.push(action.payload);
        },
        clearReviewQuestions: (state) => {
            state.reviewQuestions = [];
        },
        setTotalMarks: (state, action) => {
            state.totalMarks = action.payload;
        },
        storePreviousScore: (state) => {
            if (state.totalMarks !== 0) {
                state.previousScores.push(state.totalMarks);
            }
        },
        setPreviousScores: (state, action) => {
            state.previousScores = action.payload;
        },
        resetQuizState: (state) => {
            state.correctQuestions = [];
            state.incorrectQuestions = [];
            state.reviewQuestions = [];
            state.totalMarks = 0;
        },
    },
});

export const {
    addCorrectQuestion,
    addIncorrectQuestion,
    addReviewQuestion,
    clearReviewQuestions,
    setTotalMarks,
    storePreviousScore,
    setPreviousScores,
    resetQuizState,
} = questionSlice.actions;

export default questionSlice.reducer;


