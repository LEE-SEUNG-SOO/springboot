package com.springboot.shoppy_fullstack_app.entity;

import com.springboot.shoppy_fullstack_app.dto.SupportDTO;
import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
@Table(name="support")
public class Support {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private int sid;
    private String stype;
    private String title;
    private String content;
    private int hits;
    private String rdate;

    public Support(){}
    public Support(SupportDTO entity){
        this.sid = entity.getSid();
        this.stype = entity.getStype();
        this.title = entity.getTitle();
        this.content = entity.getContent();
        this.hits = entity.getHits();
        this.rdate = entity.getRdate();
    }
}
