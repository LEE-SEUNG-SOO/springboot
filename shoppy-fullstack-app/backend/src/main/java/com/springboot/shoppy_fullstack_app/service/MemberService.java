package com.springboot.shoppy_fullstack_app.service;

import com.springboot.shoppy_fullstack_app.dto.Member;

public interface MemberService {
    public int signup(Member member);
    public boolean checkDuplicateId(String id);
    public boolean checkLogin(Member member);
}
