package com.springboot.shoppy_fullstack_app.dto;

import com.springboot.shoppy_fullstack_app.entity.Product;
import lombok.Data;

@Data
public class ProductDTO {
    private int pid;
    private String name;
    private int price;
    private String info;
    private double rate;
    private String image;
    private String imgList;
    
    // Entity <=> DTO 변환용
    public ProductDTO(){}
    public ProductDTO(Product entity){
        this.pid = entity.getPid();
        this.name = entity.getName();
        this.price = entity.getPrice();
        this.info = entity.getInfo();
        this.rate = entity.getRate();
        this.image = entity.getImage();
        this.imgList = entity.getImgList();
    }
}
