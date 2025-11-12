package com.springboot.shoppy_fullstack_app.dto;

import com.springboot.shoppy_fullstack_app.entity.Support;
import lombok.Data;

@Data
public class SupportDTO {
    private int sid;
    private String stype;
    private String title;
    private String content;
    private int hits;
    private String rdate;
    // 페이징용
    private int currentPage;
    private int pageSize;
    private int nowNumber; // 페이징 처리 후 출력되는 행 번호
    private String keyword;

    //Entity <=> DTO : Front 결과 출력
    public SupportDTO() {}
    public SupportDTO(Support entity) {
        this.sid = entity.getSid();
        this.title = entity.getTitle();
        this.content = entity.getContent();
        this.stype = entity.getStype();
        this.hits = entity.getHits();
        this.rdate = entity.getRdate();
    }
}
