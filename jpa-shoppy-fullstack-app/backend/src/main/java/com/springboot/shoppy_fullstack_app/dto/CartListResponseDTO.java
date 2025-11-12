package com.springboot.shoppy_fullstack_app.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Data
@Setter
@Getter
@AllArgsConstructor
public class CartListResponseDTO {
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
