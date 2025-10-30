package com.springboot.shoppy_fullstack_app.service;

import com.springboot.shoppy_fullstack_app.dto.CartItem;
import com.springboot.shoppy_fullstack_app.dto.CartListResponse;
import com.springboot.shoppy_fullstack_app.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service //memberServiceImpl 이름으로 Service생성
@Transactional // DB가 autocommit일 경우 생략 가능. <= 중요
public class CartServiceImpl implements CartService {

    private CartRepository cartRepository;

    @Autowired
    public CartServiceImpl(CartRepository cartRepository){
        this.cartRepository = cartRepository;
    }

    @Override
    public int add(CartItem cartItem) {
        return cartRepository.add(cartItem);
    }

    @Override
    public CartItem checkCart(CartItem cartItem) {
        return cartRepository.checkCart(cartItem);
    }

    @Override
    public int updateQty(CartItem cartItem) {
        int result;

        if(cartItem.isUpFlag()){
            result = cartRepository.increaseQty(cartItem);
        } else {
            result = cartRepository.decreaseQty(cartItem);
        }

        return result;
    }

    @Override
    public CartItem getCount(CartItem cartItem) {
        return cartRepository.getCount(cartItem);
    }

    @Override
    public List<CartListResponse> getCartList(CartItem cartItem) {
        return cartRepository.getCartList(cartItem);
    }

    @Override
    public int deleteItem(CartItem cartItem) {
        return cartRepository.deleteItem(cartItem);
    }
}
