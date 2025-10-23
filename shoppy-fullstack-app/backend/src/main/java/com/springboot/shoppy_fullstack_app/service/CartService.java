package com.springboot.shoppy_fullstack_app.service;

import com.springboot.shoppy_fullstack_app.dto.CartItem;
import com.springboot.shoppy_fullstack_app.dto.CartListResponse;

import java.util.List;

public interface CartService {
    public int add(CartItem cartItem);
    public CartItem checkCart(CartItem cartItem);
    public int updateQty(CartItem cartItem);
    public CartItem getCount(CartItem cartItem);
    public List<CartListResponse> getCartList(CartItem cartItem);
}
