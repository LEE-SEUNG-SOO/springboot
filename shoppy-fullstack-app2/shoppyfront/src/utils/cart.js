
export function getTotalPrice(cartData) {
    return cartData.reduce( (total, item) =>  total +(parseInt(item.price) * parseInt(item.qty)) , 0)
}

/**
 * 상품리스트에서 이미지, 상품명, 가격 --> 장바구니 리스트에 추가
 */
export function cartItemsAddInfo(products, cartItems){
    return cartItems.map( item => {
        const product = products.find( product => product.pid === item.pid );
        return {...item, image: product.image, price:product.price, name:product.name, info:product.info}
    })
}


/**
 * 장바구니 수량 증가 체크 함수
 */
export function cartItemsCheck(prevItems, cartItem) {
    //존재여부 체크
    const existItem = prevItems.find((item) => 
        item.pid === cartItem.pid && item.size === cartItem.size);

    if(existItem) { //존재하면 map으로 순회하면서 pid, size가 동일한 item에 qty +1 증가
        return prevItems.map((item) =>  //map은 새로운 배열 반환
        item.pid === cartItem.pid && item.size === cartItem.size
            ? { ...item, qty: item.qty + 1 }
            : item
        );
    } else {
        // cid 설정
        const cid = Math.floor(Math.random()*100000);
        return [...prevItems, { ...cartItem, "cid":cid }];  //존재하지 않으면 새로운 item 추가
    }
}

