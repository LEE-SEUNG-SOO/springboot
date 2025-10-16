package com.springboot.deploy.controller;

import com.springboot.deploy.dto.Member;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;

@Controller
@RequestMapping("/member")
public class MemberController {
    
    // restLogin 로그인 화면
    @GetMapping("/restLogin")
    public String restLogin(){
        return "restLogin";
    }

    // restLogin 회원가입 화면
    @GetMapping("/restSignup")
    public String restSignup(){
        return "restSignup";
    }

    // 로그인
    @GetMapping("/login")
    public String login(){
        return "login";
    }

    @PostMapping("/login")
    public String login(Member member, Model model){
        String result = "실패";
        // 아이디, 패스워드 확인
        if(member.getId().equals("test") && member.getPwd().equals("1234")) result = "성공";
        // 아이디, 패스워드 설정
        model.addAttribute(member);
        // 결과 설정
        model.addAttribute("result", result);

        return "loginResult";
    }

    // 회원가입
    @GetMapping("/signup")
    public String signup(){
        return "signup";
    }

    // 회원가입
    @PostMapping("/signup")
    public String signup(Model model, Member member){
        String result;
        
        if(member.getId().isBlank()){
            result = "실패(아이디 미입력)";
        } else if(member.getPwd().isBlank()){
            result = "실패(패스워드 미입력)";
        } else if(member.getName().isBlank()){
            result = "실패(이름 미입력)";
        } else if(member.getAddress().isBlank()){
            result = "실패(주소 미입력)";
        } else {
            result = "성공";
        }
        
        // 회원가입 정보 설정
        model.addAttribute(member);
        // 결과 설정
        model.addAttribute("result", result);

        return "signupResult";
    }
}
