package com.springboot.shoppy_fullstack_app.repository;

import com.springboot.shoppy_fullstack_app.dto.Member;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.util.List;

@Repository
public class JdbcTemplateMemberRepository implements MemberRepository {
    private final JdbcTemplate jdbcTemplate;

    // DB연결을 위해 application.properties에 설정한 DB연동정보 취득
    public JdbcTemplateMemberRepository(DataSource dataSource){
        this.jdbcTemplate = new JdbcTemplate(dataSource); // 커넥션 생성
    }

    @Override
    // 회원가입 처리
    public int save(Member member) {
        // jdbcTemplate객체를 이용하여 DB의 member테이블에 insert
        String sql=""; // prepareStatement형식으로
        sql = "INSERT INTO MEMBER(id,pwd,name,phone,email,mdate) VALUES(?,?,?,?,?,now())";
        Object[] param = { member.getId(), member.getPwd(), member.getName(), member.getPhone(), member.getEmail() };
    
        // DB처리 결과
        return jdbcTemplate.update(sql, param);
    }

    @Override
    public Long findById(String id) {
        String sql = "SELECT count(id) FROM member WHERE id = ?";
        // select문
        Long count = jdbcTemplate.queryForObject(sql, Long.class, id);

        return count;
    }

    @Override
    public Member getPwd(String id) {
        String sql = "SELECT pwd FROM member WHERE id = ?";
        // select문
        // BeanPropertyRowMapper를 사용해서 member객체에 출력결과 취득
        return jdbcTemplate.queryForObject(sql, new BeanPropertyRowMapper<>(Member.class), id);
    }
}
