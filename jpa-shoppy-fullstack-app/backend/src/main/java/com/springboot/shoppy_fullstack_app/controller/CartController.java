package com.springboot.shoppy_fullstack_app.controller;

import com.springboot.shoppy_fullstack_app.dto.CartItem;
import com.springboot.shoppy_fullstack_app.dto.CartListResponse;
import com.springboot.shoppy_fullstack_app.service.CartService;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

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
    public int updateQty(@RequestBody CartItem cartItem){
        return cartService.updateQty(cartItem);
    }

    @PostMapping("/count")
    public CartItem count(@RequestBody CartItem cartItem){
        return cartService.getCount(cartItem);
    }

    @PostMapping("/cartList")
    public ResponseEntity<?> cartList(@RequestBody CartItem cartItem,
                                   HttpServletRequest request){
        ResponseEntity<?> response = null;

        // 기존 세션에서 세션값 가져오려면 false
        HttpSession session = request.getSession(false);
        String sid = session.getAttribute("sid").toString();
        String ssid = session.getId();

        if(ssid != null && sid != null){ // 로그인 회원 확인
            List<CartListResponse> list = cartService.getCartList(cartItem);
            response = ResponseEntity.ok(list);
        } else {
            response = ResponseEntity.ok(Map.of("result", false));
        }

        return response;
    }

    @PostMapping("/deleteItem")
    public int deleteItem(@RequestBody CartItem cartItem){
        return cartService.deleteItem(cartItem);
    }
}
