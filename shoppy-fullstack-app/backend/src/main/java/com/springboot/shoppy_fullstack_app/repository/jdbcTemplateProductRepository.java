package com.springboot.shoppy_fullstack_app.repository;

import com.springboot.shoppy_fullstack_app.dto.Member;
import com.springboot.shoppy_fullstack_app.dto.Product;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.util.List;

@Repository
public class jdbcTemplateProductRepository implements ProductRepository{
    private final JdbcTemplate jdbcTemplate;

    public jdbcTemplateProductRepository(DataSource dataSource) {
        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }

    @Override
    public List<Product> findAll() {
        System.out.println("repository!!!!!!!!!!!!!!!!!");
        // jdbcTemplate객체를 이용하여 DB의 member테이블에 insert
        // trim을 그냥 사용할 경우 trim(image)란 항목으로 결과가 나오기때문에 as로 항목명 변경
        String sql = "SELECT pid, name, price, info, rate, trim(image) as image, imgList FROM product";
        // select문
        // BeanPropertyRowMapper를 사용해서 member객체에 출력결과 취득
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(Product.class));
    }

    @Override
    public Product findByPid(int pid) {
        // pid를 이용한 상품 검색
        String sql = "SELECT pid, name, price, info, rate, trim(image) as image, imgList FROM product WHERE pid = ?";

        return jdbcTemplate.queryForObject(sql, new BeanPropertyRowMapper<>(Product.class), pid);
    }
}
