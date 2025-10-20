package com.springboot.shoppy_fullstack_app.controller;

import com.springboot.shoppy_fullstack_app.dto.Member;
import com.springboot.shoppy_fullstack_app.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/member")
// 해당 url로 접근시 허용
@CrossOrigin(origins = { "http://localhost:3000/" })
public class MemberController {
    // 서비스 객체 가져오기
    private final MemberService memberService;

    @Autowired // 인젝션내용(MemberService)을 Container에서 찾아서 설정
    public MemberController(MemberService memberService){
        this.memberService = memberService; // 컨테이너에 생성된 서비스 객체
    }

    @PostMapping("/login")
    public boolean login(@RequestBody Member member){
        // 로그인 체크
        return memberService.checkLogin(member);
    }

    @PostMapping("/signup")
    public boolean signup(@RequestBody Member member){
        boolean result = false;
        int rows;
        // 회원가입 처리호출
        rows = memberService.signup(member);

        // 실행성공
        if(rows == 1){
            result = true;
        }

        return result;
    }

    @PostMapping("/checkDuplicateId")
    public String checkDuplicateId(@RequestBody Member member){
        String msg = "사용가능한 아이디 입니다.";

        boolean checkId = memberService.checkDuplicateId(member.getId());

        if(checkId){
            msg = "이미 사용중인 아이디가 존재합니다.";
        }

        return msg;
    }
}
