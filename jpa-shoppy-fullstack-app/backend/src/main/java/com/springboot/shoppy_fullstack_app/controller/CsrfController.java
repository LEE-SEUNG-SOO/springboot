package com.springboot.shoppy_fullstack_app.controller;

import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.ResponseEntity;
import org.springframework.security.web.csrf.CsrfToken;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/csrf")
public class CsrfController {

    // csrf 토큰 만들기
    @GetMapping("/create")
    public ResponseEntity<?> create(HttpServletRequest request){
        // csrf토큰을 생성해서 쿠키에 실어서 보냄 - 쿠키는 Response 응답객체에 자동으로 설정되어짐
        CsrfToken token = (CsrfToken) request.getAttribute(CsrfToken.class.getName());
        return ResponseEntity.ok(token);
    }

    // csrf 토큰 재발급
    @PostMapping("/refresh") // 프론트에서 로그아웃 발생시 토큰 재발급
    public ResponseEntity<?> refresh(HttpServletRequest request){
        // sessionId 변경
        request.changeSessionId();
        // csrf토큰을 생성해서 쿠키에 실어서 보냄 - 쿠키는 Response 응답객체에 자동으로 설정되어짐
        CsrfToken token = (CsrfToken) request.getAttribute(CsrfToken.class.getName());
        return ResponseEntity.ok(token);
    }
}
