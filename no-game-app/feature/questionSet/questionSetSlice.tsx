import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { QuestionSet } from '../../models/QuestionSet'
import { Question } from '../../models/Question'

export interface QuestionSetState {
    questionSet: QuestionSet,
    questionSetsAvailable: QuestionSet[],
}

const initialState: QuestionSetState = {
    questionSet: {} as QuestionSet,
    questionSetsAvailable: [] as QuestionSet[],
}

export const questionSetSlice = createSlice({
    name: 'questionSet',
    initialState,
    reducers: {
        change: (state, action: PayloadAction<QuestionSet>) => {
            state.questionSet = action.payload
        },
        addQuestion: (state, action: PayloadAction<Question>) => {
            state.questionSet.Questions.push(action.payload)
        },
        updateQuestionText: (state, action: PayloadAction<{ id: number, text: string }>) => {
            const question = state.questionSet.Questions.find(x => x.Id === action.payload.id);
            if (question) {
                question.Text = action.payload.text;
            }
        },
        updateQuestionType: (state, action: PayloadAction<{ id: number | undefined, value: string }>) => {
            const question = state.questionSet.Questions.find(x => x.Id === action.payload.id);
            if (question) {
                question.Type = action.payload.value;
            }
        },
        updateQuestionId: (state, action: PayloadAction<{ id: number | undefined, value: number }>) => {
            const question = state.questionSet.Questions.find(x => x.Id === action.payload.id);
            if (question) {
                question.Id = action.payload.value;
            }
        },
        update: (state, action: PayloadAction<{ id: number, name: string }>) => {
            state.questionSet.Id = action.payload.id;
            state.questionSet.Name = action.payload.name;
        },
        addQuestionSets: (state, action: PayloadAction<QuestionSet[]>) => {
            state.questionSetsAvailable = state.questionSetsAvailable.concat(action.payload);
        }
    },
})

// Action creators are generated for each case reducer function
export const { change, addQuestion, updateQuestionText, 
    updateQuestionType, updateQuestionId, update,
    addQuestionSets } = questionSetSlice.actions

export default questionSetSlice.reducer