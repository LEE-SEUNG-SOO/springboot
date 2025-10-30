import { axiosPost } from '../../utils/fetchData.js';

// 카카오 결제
export const getPayment = async(receiver, paymentInfo, cartList, cidList) => {
    // userId, orderId, itemName, totalPrice...
    const { userId } = JSON.parse(localStorage.getItem("loginInfo"));
    // QR코드 보여주기 실제 결제는 따로
    const url = "/payment/kakao/ready";
    // 카카오에서 데이터를 연계할땐 전부 스트링으로
    const data = {
         "orderId": "",
         "userId": userId,
         "itemName": "테스트 상품",
         "qty": "10",
         "totalAmount" : paymentInfo.totalAmount,
         "receiver": receiver,
         "cidList": cidList
     };

     // 외부 시스템으로 갔다가 오기때문에 exception
     try{
        const kakaoReadyResult = await axiosPost(url, data);
        console.log("kakaoReadyResult : ", kakaoReadyResult);
        if(kakaoReadyResult.tid){
            // 새로운 페이지 연결
            window.location.href = kakaoReadyResult.next_redirect_pc_url;
        }
     }
     catch(error){
        console.log("ERROR :: ", error);
     }
}