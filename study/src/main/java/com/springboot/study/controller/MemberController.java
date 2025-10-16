package com.springboot.study.controller;

import com.springboot.study.dto.Member;
import org.springframework.ui.Model;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.servlet.ModelAndView;

@Controller
public class MemberController {

    @GetMapping("/login")
    public String login(){
        return "login"; // 로그인 화면 view name --> templates
    }

    /** 옛날 버전
    // ModelAndView 사용
    @PostMapping("/login")
    public ModelAndView login(@RequestParam String id, String pwd){
        ModelAndView model = new ModelAndView();
        String result = "[ModelAndView]로그인 실패";

        if(id.equals("test") && pwd.equals("1234")) result = "[ModelAndView]로그인 성공";
        model.addObject("result", result);
        model.setViewName("loginResult");

        return model;
    }
    */
    
    // 파라미터 설정 and login 오버라이딩
    @PostMapping("/login")
//    public String login(String id, String pwd){
//    public String login(Model model, @RequestParam String id, String pwd){
    public String login(Model model, Member member){
        String result = "로그인 실패";

//        if(id.equals("test") && pwd.equals("1234")) result = "로그인 성공";
        if(member.getId().equals("test") && member.getPwd().equals("1234")) result = "로그인 성공";
        model.addAttribute("result", result);

        return "loginResult";
    }

    @GetMapping("/signup")
    public String signup(){
        return "signup"; // 회원가입 화면 view name --> templates
    }

    @PostMapping("/signup")
    public String signup(Model model, Member member){
        System.out.println(member.getId());
        System.out.println(member.getPwd());
        System.out.println(member.getName());
        System.out.println(member.getAddr());

        // model에 member오브젝트 설정
//        model.addAttribute(member);
        model.addAttribute("member", member);

        return "signupResult"; // 회원가입 화면 view name --> templates
    }
}
