package com.springboot.shoppy_fullstack_app.service;

import com.springboot.shoppy_fullstack_app.dto.MemberDTO;

public interface MemberService {
    public int signup(MemberDTO member);
    public boolean checkDuplicateId(String id);
    public boolean checkLogin(MemberDTO member);
}
