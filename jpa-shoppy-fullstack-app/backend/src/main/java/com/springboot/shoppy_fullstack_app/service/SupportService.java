package com.springboot.shoppy_fullstack_app.service;

import com.springboot.shoppy_fullstack_app.dto.PageResponseDTO;
import com.springboot.shoppy_fullstack_app.dto.SupportDTO;

import java.util.List;

public interface SupportService {
    PageResponseDTO<SupportDTO> findAll(SupportDTO support);
    PageResponseDTO<SupportDTO> findSearchAll(SupportDTO support);
}
