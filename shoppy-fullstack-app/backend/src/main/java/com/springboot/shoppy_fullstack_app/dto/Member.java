package com.springboot.shoppy_fullstack_app.dto;

import lombok.Data;

//lombok으로 getter, setter 메소드를 대신함. @Data
@Data
public class Member {
    private String id;
    private String pwd;
    private String name;
    private String phone;
    private String email;
}
