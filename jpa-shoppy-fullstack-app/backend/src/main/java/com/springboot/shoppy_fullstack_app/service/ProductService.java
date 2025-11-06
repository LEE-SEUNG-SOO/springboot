package com.springboot.shoppy_fullstack_app.service;

import com.springboot.shoppy_fullstack_app.dto.ProductDTO;
import com.springboot.shoppy_fullstack_app.dto.ProductDetailInfoDTO;
import com.springboot.shoppy_fullstack_app.dto.ProductQnADTO;
import com.springboot.shoppy_fullstack_app.dto.ProductReturnDTO;

import java.util.List;

public interface ProductService {
    public List<ProductDTO> findAll();
    public ProductDTO findByPid(int pid);
    public ProductDetailInfoDTO findDetailInfo(int pid);
    public List<ProductQnADTO> findQnA(int pid);
    public ProductReturnDTO findReturn();
}
