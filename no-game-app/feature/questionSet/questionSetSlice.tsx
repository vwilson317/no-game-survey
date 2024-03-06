import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { QuestionSet } from '../../QuestionSet'

export interface QuestionSetState {
  questionSet: QuestionSet
}

const initialState: QuestionSetState = {
    questionSet: {} as QuestionSet,
}

export const questionSetSlice = createSlice({
  name: 'questionSet',
  initialState,
  reducers: {
    // changeQuestionSet: (state) => {
    //   // Redux Toolkit allows us to write "mutating" logic in reducers. It
    //   // doesn't actually mutate the state because it uses the Immer library,
    //   // which detects changes to a "draft state" and produces a brand new
    //   // immutable state based off those changes
    //   state.value += 1
    // },
    // decrement: (state) => {
    //   state.value -= 1
    // },
    change: (state, action: PayloadAction<QuestionSet>) => {
      state.questionSet = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { change } = questionSetSlice.actions

export default questionSetSlice.reducer