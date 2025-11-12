package com.springboot.shoppy_fullstack_app.entity;

import com.springboot.shoppy_fullstack_app.dto.CartItemDTO;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name="cart")
public class CartItem {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int cid;
    private String size;
    private int qty;
    private int pid;
    private String id;
    private String cdate;

    public CartItem(CartItemDTO entity) {
        this.cid = entity.getCid();
        this.size = entity.getSize();
        this.qty = entity.getQty();
        this.pid = entity.getPid();
        this.id = entity.getId();
        this.cdate = entity.getCdate();
    }
}