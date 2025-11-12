package com.springboot.shoppy_fullstack_app.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name="view_cartList")
public class CartListView {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int cid;
    private String id;
    private int pid;
    private String name;
    private String info;
    private int price;
    private String image;
    private String size;
    private int qty;
}
