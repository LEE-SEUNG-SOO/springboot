package com.springboot.shoppy_fullstack_app.repository;

import com.springboot.shoppy_fullstack_app.dto.Product;
import com.springboot.shoppy_fullstack_app.dto.ProductDetailInfo;
import com.springboot.shoppy_fullstack_app.dto.ProductQnA;
import com.springboot.shoppy_fullstack_app.dto.ProductReturn;
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

    @Override
    public ProductDetailInfo findProductDetailByPid(int pid) {
        String sql = "SELECT pd.did as did, pd.title_en as titleEn, pd.title_ko as titleKo, pd.pid as pid, pd.list as list"
                .concat(" FROM product_detailinfo pd, product p")
                .concat(" WHERE pd.pid = ?")
                .concat(" AND pd.pid = p.pid");

        return jdbcTemplate.queryForObject(sql, new BeanPropertyRowMapper<>(ProductDetailInfo.class), pid);
    }

    @Override
    public List<ProductQnA> findProductQnAByPid(int pid) {
        String sql = "SELECT qna.qid, qna.title, qna.content, qna.is_lock as isLock, qna.is_complete as isComplete, qna.id, qna.pid, qna.cdate"
                .concat(" FROM product_qna qna, product p")
                .concat(" WHERE qna.pid = ?")
                .concat(" AND qna.pid = p.pid");
        return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(ProductQnA.class), pid);
    }

    @Override
    public ProductReturn findProductReturn() {
        String sql = "SELECT rid, title, description, list FROM product_return";
        return jdbcTemplate.queryForObject(sql, new BeanPropertyRowMapper<>(ProductReturn.class));
    }
}
