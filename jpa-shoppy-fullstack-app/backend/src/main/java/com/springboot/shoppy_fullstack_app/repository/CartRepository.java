package com.springboot.shoppy_fullstack_app.repository;

import com.springboot.shoppy_fullstack_app.dto.CartItem;
import com.springboot.shoppy_fullstack_app.dto.CartListResponse;

import java.util.List;

public interface CartRepository {
    public int add(CartItem cartItem);
    public CartItem checkCart(CartItem cartItem);
    public int increaseQty(CartItem cartItem);
    public int decreaseQty(CartItem cartItem);
    public CartItem getCount(CartItem cartItem);
    public List<CartListResponse> getCartList(CartItem cartItem);
    public int deleteItem(CartItem cartItem);
}
