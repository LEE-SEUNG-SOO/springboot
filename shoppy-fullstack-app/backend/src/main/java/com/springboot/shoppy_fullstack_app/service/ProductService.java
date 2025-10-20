package com.springboot.shoppy_fullstack_app.service;

import com.springboot.shoppy_fullstack_app.dto.Product;
import java.util.List;

public interface ProductService {
    public List<Product> findAll();
    public Product findByPid(int pid);
}
