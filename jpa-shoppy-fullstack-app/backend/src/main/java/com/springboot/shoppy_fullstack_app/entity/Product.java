package com.springboot.shoppy_fullstack_app.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name="product")
public class Product {

    @Id // primary key
    @GeneratedValue(strategy = GenerationType.IDENTITY) // auto_increment
    private int pid;

    @Column(name = "name", length = 200, nullable = false)
    private String name;
    @Column(name = "price")
    private int price;
    @Column(name = "info", length = 200)
    private String info;
    @Column(name = "rate")
    private double rate;
    @Column(name = "image", length = 100)
    private String image;
    @Column(name = "img_list", columnDefinition = "JSON")
    private String imgList;
}
