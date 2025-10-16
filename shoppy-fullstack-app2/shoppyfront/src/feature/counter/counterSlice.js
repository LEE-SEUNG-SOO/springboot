import { createSlice } from '@reduxjs/toolkit'

// 전체 전역 변수
const initialState = {
  value: 100,
}

// Slice reducers 설정( 함수 설정 )
export const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    increment: (state) => {
      state.value += 1
    },
    decrement: (state) => {
      state.value -= 1
    },
    incrementByAmount: (state, action) => {
      state.value += action.payload
    },
  },
})

// 컴포넌트, API함수에서 reducers의 함수를 사용하기 위해 action 추가(dispatch)
export const { increment, decrement, incrementByAmount } = counterSlice.actions

// store import
export default counterSlice.reducer