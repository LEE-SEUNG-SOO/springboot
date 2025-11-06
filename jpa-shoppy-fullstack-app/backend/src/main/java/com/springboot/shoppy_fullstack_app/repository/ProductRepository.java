package com.springboot.shoppy_fullstack_app.repository;

import com.springboot.shoppy_fullstack_app.dto.Product;
import com.springboot.shoppy_fullstack_app.dto.ProductDetailInfo;
import com.springboot.shoppy_fullstack_app.dto.ProductQnA;
import com.springboot.shoppy_fullstack_app.dto.ProductReturn;

import java.util.List;

public interface ProductRepository {
    public List<Product> findAll();
    public Product findByPid(int pid);
    public ProductDetailInfo findProductDetailByPid(int pid);
    public List<ProductQnA> findProductQnAByPid(int pid);
    public ProductReturn findProductReturn();
}
