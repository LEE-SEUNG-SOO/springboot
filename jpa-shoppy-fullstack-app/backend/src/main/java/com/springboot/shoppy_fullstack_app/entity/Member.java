package com.springboot.shoppy_fullstack_app.entity;

import com.springboot.shoppy_fullstack_app.dto.MemberDTO;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Table;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDate;

// Lombok의 Data는 사용 금지
// 생성자 필수
@Entity
@Table(name="member")
@Setter
@Getter
public class Member {

    @Id // PK설정
    @Column(name="id", length = 50, nullable = false) // DB와 연동되는 이름 설정, 길이 설정(DB와 동일하게 설정하는걸 추천, null불가)
    private String id;

    @Column(name="pwd", length = 100, nullable = false)
    private String pwd;

    @Column(name="name", length = 20, nullable = false)
    private String name;

    @Column(name="phone", length = 13)
    private String phone;

    @Column(name="email", length = 50, nullable = false)
    private String email;

    @Column(name="mdate") // 날짜타입은 LocalDate타입으로 설정( date : LocalDate, dateTime : LocalDateTime)
    private LocalDate mdate;

    // 생성자 필수
    public Member() {}

    // MemberDTO를 파라미터로 하는 생성자
    public Member(MemberDTO memberDto) {
        this.id = memberDto.getId();
        this.pwd = memberDto.getPwd();
        this.name = memberDto.getName();
        this.phone = memberDto.getPhone();
        this.email = memberDto.getEmail();
        this.mdate = LocalDate.now();
    }
}