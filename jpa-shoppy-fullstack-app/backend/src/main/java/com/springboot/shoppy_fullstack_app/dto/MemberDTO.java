package com.springboot.shoppy_fullstack_app.dto;

import com.springboot.shoppy_fullstack_app.entity.Member;
import lombok.Data;

//lombok으로 getter, setter 메소드를 대신함. @Data
@Data
public class MemberDTO {
    private String id;
    private String pwd;
    private String name;
    private String phone;
    private String email;
    
    // Member 엔티티의 결과를 저장하기 위한 생성자 정의
    public MemberDTO() {}
    public MemberDTO(String id, String pwd) {
        this.id = id;
        this.pwd = pwd;
    }

    public MemberDTO(Member entity){
        this.id = entity.getId();
        this.pwd = entity.getPwd();
        this.name = entity.getName();
        this.phone = entity.getPhone();
        this.email = entity.getEmail();
    }
}
