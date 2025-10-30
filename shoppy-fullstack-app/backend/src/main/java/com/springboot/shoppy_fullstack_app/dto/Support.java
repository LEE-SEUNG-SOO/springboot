package com.springboot.shoppy_fullstack_app.dto;

import lombok.Data;

@Data
public class Support {
    private int sid;
    private String type;
    private String title;
    private String content;
    private int hits;
    private String rdate;
}
