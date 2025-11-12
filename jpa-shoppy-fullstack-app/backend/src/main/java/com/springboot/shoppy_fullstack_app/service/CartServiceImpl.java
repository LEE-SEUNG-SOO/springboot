package com.springboot.shoppy_fullstack_app.service;

import com.springboot.shoppy_fullstack_app.dto.CartItemDTO;
import com.springboot.shoppy_fullstack_app.dto.CartListResponseDTO;
import com.springboot.shoppy_fullstack_app.entity.CartItem;
import com.springboot.shoppy_fullstack_app.jpa_repository.JpaCartRepository;
import com.springboot.shoppy_fullstack_app.repository.CartRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service //memberServiceImpl 이름으로 Service생성
@Transactional // DB가 autocommit일 경우 생략 가능. <= 중요
public class CartServiceImpl implements CartService {
    private JpaCartRepository jpaCartRepository;

    private CartRepository cartRepository;

    @Autowired
    public CartServiceImpl(CartRepository cartRepository, JpaCartRepository jpaCartRepository){
        this.jpaCartRepository = jpaCartRepository;
        this.cartRepository = cartRepository;
    }

    @Override
    public int add(CartItemDTO cartItem) {
        CartItem entity = jpaCartRepository.save(new CartItem(cartItem));

        if(entity != null){
            return 1;
        } else {
            return 0;
        }
    }

    @Override
    public CartItemDTO checkCart(CartItemDTO cartItem) {
        CartItem entity = jpaCartRepository.findByIdAndSizeAndPid(cartItem.getId(), cartItem.getSize(), cartItem.getPid());
        System.out.println("entitiy asfsadsa ;" + entity);
        return new CartItemDTO(entity);
    }

    @Override
    public int updateQty(CartItemDTO cartItem) {
        int result;

        if(cartItem.isUpFlag()){
            result = cartRepository.increaseQty(cartItem);
        } else {
            result = cartRepository.decreaseQty(cartItem);
        }

        return result;
    }

    @Override
    public CartItemDTO getCount(CartItemDTO cartItem) {
        int count = jpaCartRepository.countById(cartItem.getId());
        CartItemDTO cartItemDTO = new CartItemDTO();
        cartItemDTO.setSumQty(count);
        return cartItemDTO;
    }

    @Override
    public List<CartListResponseDTO> getCartList(CartItemDTO cartItem) {
        return jpaCartRepository.findByIdAndByPid(cartItem.getId(), cartItem.getPid());
    }

    @Override
    public int deleteItem(CartItemDTO cartItem) {
        return cartRepository.deleteItem(cartItem);
    }
}
