package com.springboot.shoppy_fullstack_app.dto;

import com.springboot.shoppy_fullstack_app.entity.CartItem;
import lombok.Data;

@Data
public class CartItemDTO {
    private int cid;
    private String size;
    private int qty;
    private int pid;
    private String id;
    private String cdate;
    private boolean upFlag;
    private int sumQty;

    public CartItemDTO(){}
    public CartItemDTO(CartItem entity){
        this.cid = entity.getCid();
        this.size = entity.getSize();
        this.qty = entity.getQty();
        this.pid = entity.getPid();
        this.id = entity.getId();
        this.cdate = entity.getCdate();
    }
}