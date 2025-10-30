package com.springboot.shoppy_fullstack_app.dto;

import lombok.Data;

@Data
public class CartListResponse {
    private String id;
    private int pid;
    private int cid;
    private String name;
    private String info;
    private int price;
    private String image;
    private String size;
    private int qty;
}
