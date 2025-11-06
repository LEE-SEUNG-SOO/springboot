package com.springboot.shoppy_fullstack_app.jpa_repository;

import com.springboot.shoppy_fullstack_app.entity.Product;
import com.springboot.shoppy_fullstack_app.entity.ProductDetailInfo;
import com.springboot.shoppy_fullstack_app.entity.ProductQnA;
import com.springboot.shoppy_fullstack_app.entity.ProductReturn;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

// int 타입일 경우 Long 또는 Integer < 대부분은 Long
@Repository
public interface JpaProductRepository extends JpaRepository<Product, Long> {
    Product findByPid(int pid);
//    List<Product> findAll();
    // 상품 상세 디테일 탭 정보
    @Query("SELECT d FROM ProductDetailInfo d WHERE d.pid = :pid")
    ProductDetailInfo findProductDetailinfoByPid(@Param("pid") int pid);

    // 상품 QNA 탭 정보
    @Query("SELECT q FROM ProductQnA q WHERE q.pid = :pid")
    List<ProductQnA> findProductQnAByPid(@Param("pid") int pid);

    // 상품 Return & Delivery 탭 정보
    @Query("SELECT r FROM ProductReturn r")
    ProductReturn findProductReturn();
}
