package com.springboot.study.controller;

import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;

@Controller
public class HelloController {
    /**
     * 호출하는 서비스 context path 주소를 매핑하는 작업
     * 예) /hello
     */
    @GetMapping("/hello")
    public String hello(Model model){
        // model에 매핑 설정
        model.addAttribute("pathName","hello");
        model.addAttribute("data","이순신");
        System.out.println(" ********* HelloController *********");
        return "hello"; // view name
    }

    /**
     * Get과 Post로 같은 매핑 주소를 사용 가능.
     */
    @PostMapping("/hello")
    public String helloPost(){
        return "hello"; // view name
    }

    /**
     * 호출하는 서비스 context path 주소를 매핑하는 작업
     * 예) /hello
     */
    @GetMapping("/hello2")
    public String hello2(Model model){
        // model에 매핑 설정
        model.addAttribute("pathName","hello2");
        model.addAttribute("data","홍길동");
        System.out.println(" ********* HelloController2222 *********");
        return "hello"; // view name
    }
}
