package com.springboot.shoppy_fullstack_app.controller;

import com.springboot.shoppy_fullstack_app.dto.CartItem;
import com.springboot.shoppy_fullstack_app.dto.CartListResponse;
import com.springboot.shoppy_fullstack_app.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/cart")
public class CartController {
    // CartService서비스 생성
    private final CartService cartService;

    @Autowired // Spring boot에서 자동 생성된 서비스를 가져오는 방법
    public CartController(CartService cartService){
        this.cartService = cartService;
    }

    @PostMapping("/add")
    public int add(@RequestBody CartItem cartItem){
        return cartService.add(cartItem);
    }

    @PostMapping("/checkCart")
    public CartItem checkCart(@RequestBody CartItem cartItem){
        return cartService.checkCart(cartItem);
    }

    @PostMapping("/updateQty")
    public void updateQty(@RequestBody CartItem cartItem){
        cartService.updateQty(cartItem);
    }

    @PostMapping("/count")
    public CartItem count(@RequestBody CartItem cartItem){
        return cartService.getCount(cartItem);
    }

    @PostMapping("/cartList")
    public List<CartListResponse> cartList(@RequestBody CartItem cartItem){
        return cartService.getCartList(cartItem);
    }
}
