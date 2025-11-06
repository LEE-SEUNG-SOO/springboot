package com.springboot.shoppy_fullstack_app.controller;

import com.springboot.shoppy_fullstack_app.dto.ProductDTO;
import com.springboot.shoppy_fullstack_app.dto.ProductDetailInfoDTO;
import com.springboot.shoppy_fullstack_app.dto.ProductQnADTO;
import com.springboot.shoppy_fullstack_app.dto.ProductReturnDTO;
import com.springboot.shoppy_fullstack_app.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;


@RestController
@RequestMapping("/product")
public class ProductController {
    // Product서비스 생성
    private final ProductService productService;
    
    @Autowired // Spring boot에서 자동 생성된 서비스를 가져오는 방법
    public ProductController(ProductService productService){
        this.productService = productService;
    }

    @GetMapping("/all")
    public List<ProductDTO> all(){
        // List타입으로 반환하지만 RestController가 있으므로 JSON형태로 넘어간다.
        return productService.findAll();
    }

    @PostMapping("/detail")
    public ProductDTO detail(@RequestBody ProductDTO product){
        return productService.findByPid(product.getPid());
    }

    @PostMapping("/detailInfo")
    public ProductDetailInfoDTO detailInfo(@RequestBody ProductDTO product){
        return productService.findDetailInfo(product.getPid());
    }

    @PostMapping("/qna")
    public List<ProductQnADTO> qna(@RequestBody ProductDTO product){
        return productService.findQnA(product.getPid());
    }

    @GetMapping("/return")
    public ProductReturnDTO getReturn(){
        // List타입으로 반환하지만 RestController가 있으므로 JSON형태로 넘어간다.
        return productService.findReturn();
    }
}
