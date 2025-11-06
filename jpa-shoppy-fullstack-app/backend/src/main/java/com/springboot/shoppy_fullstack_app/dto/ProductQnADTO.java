package com.springboot.shoppy_fullstack_app.dto;

import com.springboot.shoppy_fullstack_app.entity.ProductQnA;
import lombok.Data;

@Data
public class ProductQnADTO {
    private int qid;
    private String title;
    private String content;
    private int isLock;
    private int isComplete;
    private String id;
    private int pid;
    private String cdate;

    public ProductQnADTO(){}
    public ProductQnADTO(ProductQnA entity){
        this.qid = entity.getQid();
        this.title = entity.getTitle();
        this.content = entity.getContent();
        this.isLock = entity.getIsLock();
        this.isComplete = entity.getIsComplete();
        this.id = entity.getId();
        this.pid = entity.getPid();
        this.cdate = entity.getCdate();
    }
}