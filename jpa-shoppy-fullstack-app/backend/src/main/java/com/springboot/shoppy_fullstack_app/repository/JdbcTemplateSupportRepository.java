package com.springboot.shoppy_fullstack_app.repository;

import com.springboot.shoppy_fullstack_app.dto.SupportDTO;
import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Repository;

import javax.sql.DataSource;
import java.util.List;

@Repository
public class JdbcTemplateSupportRepository implements SupportRepository{

    private final JdbcTemplate jdbcTemplate;

    public JdbcTemplateSupportRepository(DataSource dataSource) {
        this.jdbcTemplate = new JdbcTemplate(dataSource);
    }

    @Override
    public List<SupportDTO> findAll() {
        String sql = """
                    SELECT sid, stype as type, title, content, hits, rdate
                    FROM support
                """;
            return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(SupportDTO.class));
    }

    @Override
    public List<SupportDTO> findAll(SupportDTO support) {
        String sql = """
                        SELECT sid, stype as type, title, content, hits, rdate
                        FROM support
                        WHERE stype = ?
                    """;
            return jdbcTemplate.query(sql, new BeanPropertyRowMapper<>(SupportDTO.class), support.getStype());
    }
}
