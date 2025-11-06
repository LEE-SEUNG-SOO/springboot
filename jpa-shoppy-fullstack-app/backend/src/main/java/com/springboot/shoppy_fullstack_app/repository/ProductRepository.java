package com.springboot.shoppy_fullstack_app.repository;

import com.springboot.shoppy_fullstack_app.dto.ProductDTO;
import com.springboot.shoppy_fullstack_app.dto.ProductDetailInfoDTO;
import com.springboot.shoppy_fullstack_app.dto.ProductQnADTO;
import com.springboot.shoppy_fullstack_app.dto.ProductReturnDTO;

import java.util.List;

public interface ProductRepository {
    public List<ProductDTO> findAll();
    public ProductDTO findByPid(int pid);
    public ProductDetailInfoDTO findProductDetailByPid(int pid);
    public List<ProductQnADTO> findProductQnAByPid(int pid);
    public ProductReturnDTO findProductReturn();
}
