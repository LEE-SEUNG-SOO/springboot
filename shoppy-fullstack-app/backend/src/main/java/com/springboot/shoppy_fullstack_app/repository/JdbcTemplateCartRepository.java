package com.springboot.shoppy_fullstack_app.repository;

import com.springboot.shoppy_fullstack_app.dto.CartItem;
import com.springboot.shoppy_fullstack_app.dto.CartListResponse;
import org.springframework.dao.EmptyResultDataAccessException;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.util.List;

@Repository
public class JdbcTemplateCartRepository implements CartRepository{

    private final JdbcTemplate jdbcTemplate;

    public JdbcTemplateCartRepository(DataSource dataSource) {
        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }

    @Override
    // 장바구니에 데이터 추가
    public int add(CartItem cartItem) {
        String sql = """
                    INSERT INTO cart(size, qty, pid, id, cdate)
                        VALUES(?, ?, ?, ?, now())""";
        Object[] params = {
                cartItem.getSize(),
                cartItem.getQty(),
                cartItem.getPid(),
                cartItem.getId()
        };

        return jdbcTemplate.update(sql, params);
    }

    @Override
    // 장바구니 추가시 기존 데이터 확인
    public CartItem checkCart(CartItem cartItem) {
        String sql = """
                    SELECT cid
                    FROM cart
                    WHERE id = ?
                    AND size = ?
                    AND pid = ?
                """;
        Object[] params = { cartItem.getId(), cartItem.getSize(), cartItem.getPid() };

        try {
            return jdbcTemplate.queryForObject(sql,
                    new BeanPropertyRowMapper<>(CartItem.class),
                    params);
        } 
        // 검색 결과 데이터가 없을 경우 에러 방지
        catch (EmptyResultDataAccessException e) {
            // 데이터가 없을 경우 -> null 반환
            return null;
        }
    }

    @Override
    // 장바구니 qty 갯수 증가
    public int increaseQty(CartItem cartItem) {
        String sql = """
                    UPDATE cart
                    SET qty = qty + 1
                    WHERE cid = ?
                """;
        return jdbcTemplate.update(sql, cartItem.getCid());
    }

    @Override
    // 장바구니 qty 갯수 감소
    public int decreaseQty(CartItem cartItem) {
        String sql = """
                    UPDATE cart
                    SET qty = qty - 1
                    WHERE cid = ?
                """;
        return jdbcTemplate.update(sql, cartItem.getCid());
    }

    @Override
    // 장바구니 유저별 카운트 갯수
    public CartItem getCount(CartItem cartItem) {
        String sql = """
                    SELECT ifnull(SUM(qty), 0) as sumQty
                    FROM cart
                    WHERE id = ?
                """;
        return jdbcTemplate.queryForObject(sql,
                new BeanPropertyRowMapper<>(CartItem.class),
                cartItem.getId());
    }

    @Override
    public List<CartListResponse> getCartList(CartItem cartItem) {
        String sql = """
                    SELECT m.id,  p.pid, c.cid, p.name, p.price, p.image, c.size, c.qty
                    FROM member m, product p, cart c
                    WHERE m.id = c.id
                    AND p.pid = c.pid
                    AND m.id = ?
                """;
        return jdbcTemplate.query(sql,
                new BeanPropertyRowMapper<>(CartListResponse.class),
                cartItem.getId());
    }
}
