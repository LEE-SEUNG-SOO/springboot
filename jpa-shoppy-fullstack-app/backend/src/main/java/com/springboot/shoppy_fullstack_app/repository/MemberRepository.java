package com.springboot.shoppy_fullstack_app.repository;

import com.springboot.shoppy_fullstack_app.dto.MemberDTO;

public interface MemberRepository {
    public int save(MemberDTO member);
    public Long findById(String id);
    public MemberDTO getPwd(String id);
}
