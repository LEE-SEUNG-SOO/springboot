package com.springboot.shoppy_fullstack_app.dto;

import lombok.Data;

@Data
public class ProductQnA {
    private int qid;
    private String title;
    private String content;
    private int isLock;
    private int isComplete;
    private String id;
    private int pid;
    private String cdate;
}