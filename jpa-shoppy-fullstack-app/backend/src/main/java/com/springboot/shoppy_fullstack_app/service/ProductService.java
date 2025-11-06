package com.springboot.shoppy_fullstack_app.service;

import com.springboot.shoppy_fullstack_app.dto.Product;
import com.springboot.shoppy_fullstack_app.dto.ProductDetailInfo;
import com.springboot.shoppy_fullstack_app.dto.ProductQnA;
import com.springboot.shoppy_fullstack_app.dto.ProductReturn;

import java.util.List;

public interface ProductService {
    public List<Product> findAll();
    public Product findByPid(int pid);
    public ProductDetailInfo findDetailInfo(int pid);
    public List<ProductQnA> findQnA(int pid);
    public ProductReturn findReturn();
}
