package com.springboot.shoppy_fullstack_app.repository;

import com.springboot.shoppy_fullstack_app.dto.SupportDTO;
import java.util.List;

public interface SupportRepository {
    List<SupportDTO> findAll();
    List<SupportDTO> findAll(SupportDTO support);
}
