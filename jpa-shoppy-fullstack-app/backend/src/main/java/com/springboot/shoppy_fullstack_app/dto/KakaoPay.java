package com.springboot.shoppy_fullstack_app.dto;

import lombok.Data;

@Data
public class KakaoPay {
    private String orderId;
    private String userId;
    private String itemName;
    private String qty;
    private String totalAmount;
    private Receiver receiver;
    private PaymentInfo paymentInfo;
    
    // Receiver타입에 대한 정의
    @Data
    public static class Receiver{
        private String name;
        private String phone;
        private String zipcode;
        private String address1;
        private String address2;
        private String memo;
    }

    // PaymentInfo타입에 대한 정의
    @Data
    public static class PaymentInfo{
        private int shoppingFree;
        private int discountAmount;
        private int totalAmount;
    }
}
