package com.springboot.shoppy_fullstack_app.dto;

import com.springboot.shoppy_fullstack_app.entity.ProductDetailInfo;
import lombok.Data;

@Data
public class ProductDetailInfoDTO {
    private int did;
    private int pid;
    private String list;
    private String titleEn;
    private String titleKo;

    public ProductDetailInfoDTO(){}
    public ProductDetailInfoDTO(ProductDetailInfo entity){
        this.did = entity.getDid();
        this.pid = entity.getPid();
        this.list = entity.getList();
        this.titleEn = entity.getTitleEn();
        this.titleKo = entity.getTitleKo();
    }
}
