import { createSlice } from '@reduxjs/toolkit';

// 전체 전역 변수
const initialState = {
    "productList": [], // 출력용 2차원 배열
    "products":[], // 원본 - 1차원 배열
    "product":{},
    "number":3
};

// Slice reducers 설정( 함수 설정 )
// state => initialState의 값을 가져오는 객체
// action => 컴포넌트에서 발생하는 이벤트
export const productSlice = createSlice({
  name: 'product',
  initialState,
  reducers: {
    createProduct (state, action) {
        const { productList, products } = action.payload;
        state.productList = productList;
        state.products = products;
    },
    setProduct (state, action) {
        const { pid } = action.payload;
        // const pid = action.payload.pid;
        state.product = state.products.find( data => data.pid === pid ); // find => 객체 형태로 리턴, fillter => 배열 형태로 리턴
    }
  }
});

// 컴포넌트, API함수에서 reducers의 함수를 사용하기 위해 action 추가(dispatch)
export const { createProduct, setProduct } = productSlice.actions;

// store import
export default productSlice.reducer;