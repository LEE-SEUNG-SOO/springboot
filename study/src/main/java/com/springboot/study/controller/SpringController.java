package com.springboot.study.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;

@Controller
public class SpringController {

    /**
     * 매핑은 반드시 소문자만 가능
     * 대소문자 자동 변환
     * 예) SPRING 으로 입력해도 자동 변환되어 실행(한글자씩 바꾸어도 가능)
     */
    @GetMapping("/spring")
    public String spring(){
        return "spring";
    }
}
