package com.springboot.shoppy_fullstack_app.controller;

import com.springboot.shoppy_fullstack_app.dto.Member;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/member")
// 해당 url로 접근시 허용
@CrossOrigin(origins = { "http://localhost:3000/" })
public class MemberController {

    @PostMapping("/login")
    public boolean login(@RequestBody Member member){
        boolean result = false;

        if(member.getId().equals("test") && member.getPwd().equals("1234")){
            result = true;
        }

        return result;
    }

    @PostMapping("/signup")
    public boolean signup(@RequestBody Member member){
        boolean result = false;

        System.out.println("id : " + member.getId());
        System.out.println("pwd : " + member.getPwd());
        System.out.println("name : " + member.getName());
        System.out.println("phone : " + member.getPhone());
        System.out.println("email : " + member.getEmail());

        if(member.getId().equals("test") && member.getPwd().equals("1234")){
            result = true;
        }

        return result;
    }

    @PostMapping("/checkDuplicateId")
    public String checkDuplicateId(@RequestBody Member member){
        String msg = "사용가능한 아이디 입니다.";

        if(member.getId().equals("test")){
            msg = "이미 사용중인 아이디가 존재합니다.";
        }

        return msg;
    }
}
