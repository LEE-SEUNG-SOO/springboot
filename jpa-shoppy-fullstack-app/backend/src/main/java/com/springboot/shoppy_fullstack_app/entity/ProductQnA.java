package com.springboot.shoppy_fullstack_app.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name="product_qna")
public class ProductQnA {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int qid;
    private String title;
    private String content;
    private int isLock;
    private int isComplete;
    private String id;
    private int pid;
    private String cdate;
}