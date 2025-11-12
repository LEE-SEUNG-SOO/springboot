package com.springboot.shoppy_fullstack_app.repository;

import com.springboot.shoppy_fullstack_app.dto.CartItemDTO;
import com.springboot.shoppy_fullstack_app.dto.CartListResponseDTO;

import java.util.List;

public interface CartRepository {
    public int add(CartItemDTO cartItem);
    public CartItemDTO checkCart(CartItemDTO cartItem);
    public int increaseQty(CartItemDTO cartItem);
    public int decreaseQty(CartItemDTO cartItem);
    public CartItemDTO getCount(CartItemDTO cartItem);
    public List<CartListResponseDTO> getCartList(CartItemDTO cartItem);
    public int deleteItem(CartItemDTO cartItem);
}
