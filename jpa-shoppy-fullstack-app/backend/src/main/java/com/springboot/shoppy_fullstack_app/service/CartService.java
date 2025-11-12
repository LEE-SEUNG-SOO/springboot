package com.springboot.shoppy_fullstack_app.service;

import com.springboot.shoppy_fullstack_app.dto.CartItemDTO;
import com.springboot.shoppy_fullstack_app.dto.CartListResponseDTO;

import java.util.List;

public interface CartService {
    public int add(CartItemDTO cartItem);
    public CartItemDTO checkCart(CartItemDTO cartItem);
    public int updateQty(CartItemDTO cartItem);
    public CartItemDTO getCount(CartItemDTO cartItem);
    public List<CartListResponseDTO> getCartList(CartItemDTO cartItem);
    public int deleteItem(CartItemDTO cartItem);
}
