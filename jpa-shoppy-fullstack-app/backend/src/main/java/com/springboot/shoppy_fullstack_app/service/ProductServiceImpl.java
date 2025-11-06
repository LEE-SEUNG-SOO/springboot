package com.springboot.shoppy_fullstack_app.service;

import com.springboot.shoppy_fullstack_app.dto.ProductDTO;
import com.springboot.shoppy_fullstack_app.dto.ProductDetailInfoDTO;
import com.springboot.shoppy_fullstack_app.dto.ProductQnADTO;
import com.springboot.shoppy_fullstack_app.dto.ProductReturnDTO;
import com.springboot.shoppy_fullstack_app.entity.Product;
import com.springboot.shoppy_fullstack_app.entity.ProductDetailInfo;
import com.springboot.shoppy_fullstack_app.entity.ProductQnA;
import com.springboot.shoppy_fullstack_app.entity.ProductReturn;
import com.springboot.shoppy_fullstack_app.jpa_repository.JpaProductRepository;
import com.springboot.shoppy_fullstack_app.repository.ProductRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;

@Service
@Transactional // DB가 autocommit일 경우 생략 가능. <= 중요
public class ProductServiceImpl implements ProductService{

    // productRepository 선언
    private final ProductRepository productRepository;
    
    // JpaProductRepository 선언
    private final JpaProductRepository jpaProductRepository;

    @Autowired
    public ProductServiceImpl(ProductRepository productRepository, JpaProductRepository jpaProductRepository){
        this.productRepository = productRepository;
        this.jpaProductRepository = jpaProductRepository;
    }

//    @Override
//    public List<ProductDTO> findAll() {
//        return productRepository.findAll();
//    }

    @Override
    public List<ProductDTO> findAll() {
        // Product 타입으로 결과 취득
        List<Product> entityList = jpaProductRepository.findAll();
        // ProductDTO 타입의 list 생성
        List<ProductDTO> dList = new ArrayList<>();
        // ProductDTO 타입으로 변경
        entityList.forEach( (product) -> dList.add(new ProductDTO(product)) );

        return dList;
    }

//    @Override
//    public ProductDTO findByPid(int pid) {
//        return productRepository.findByPid(pid);
//    }

    @Override
    public ProductDTO findByPid(int pid) {
        // Product 타입으로 결과 취득
        Product entity = jpaProductRepository.findByPid(pid);

        return new ProductDTO(entity);
    }

//    @Override
//    public ProductDetailInfoDTO findDetailInfo(int pid) {
//        return productRepository.findProductDetailByPid(pid);
//    }

    @Override
    public ProductDetailInfoDTO findDetailInfo(int pid) {
        ProductDetailInfo entity = jpaProductRepository.findProductDetailinfoByPid(pid);
        return new ProductDetailInfoDTO(entity);
    }

//    @Override
//    public List<ProductQnADTO> findQnA(int pid) {
//        return productRepository.findProductQnAByPid(pid);
//    }

    @Override
    public List<ProductQnADTO> findQnA(int pid) {
        // Product 타입으로 결과 취득
        List<ProductQnA> entityList = jpaProductRepository.findProductQnAByPid(pid);
        // ProductDTO 타입의 list 생성
        List<ProductQnADTO> qList = new ArrayList<>();
        // ProductDTO 타입으로 변경
        entityList.forEach( (product) -> qList.add(new ProductQnADTO(product)) );

        return qList;
    }

//    @Override
//    public ProductReturnDTO findReturn() {
//        return productRepository.findProductReturn();
//    }
    @Override
    public ProductReturnDTO findReturn() {
        ProductReturn entity = jpaProductRepository.findProductReturn();
        return new ProductReturnDTO(entity);
    }
}
