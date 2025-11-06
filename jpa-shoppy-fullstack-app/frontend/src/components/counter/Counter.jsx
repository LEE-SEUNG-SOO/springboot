import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { decrement, increment } from '../../feature/counter/counterSlice.js'

export function Counter() {
    //store의 값 호출
    const count = useSelector((state) => state.counter.value)
    // 이벤트(액션) 발생시 slice에 함수 호출
    const dispatch = useDispatch()

    return (
        <div>
            <div>
                <button
                aria-label="Increment value"
                onClick={() => dispatch(increment())}
                >
                Increment
                </button>
                <span>{count}</span>
                <button
                aria-label="Decrement value"
                onClick={() => dispatch(decrement())}
                >
                Decrement
                </button>
            </div>
        </div>
    )
}