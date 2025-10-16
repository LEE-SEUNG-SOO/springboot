package com.springboot.deploy.controller;

import com.springboot.deploy.dto.Member;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;

/**
 * 내부에 @ResponseBody 를 포함하고 있다.
 * Map 객체 생성 없이 JSON 객체로 바로 전송(한개만 보낼경우)
 */
@RestController
@RequestMapping("/member") // 공통적으로 들어가는 매핑설정 >> /member/restLogin
public class MemberRestController {

    // 로그인(REST)
    @PostMapping("/restLogin")
    public Map<String, Object> restLogin(@RequestBody Member member){
        boolean result = false;

        if(member.getId().equals("test") && member.getPwd().equals("1234")){
            result = true;
        } else {}

        // Map 객체를 생성하여 전송 --> 자동으로 JSON 객체로 변환
        Map<String, Object> response = new HashMap<String, Object>();
        response.put("result", result);
        response.put("member", member);

        return response; // 호출한 페이지로 문자열 혹은 JSON 객체로 전송
    }
    
    // 회원가입(REST)
    @PostMapping("/restSignup")
    public Map<String, Object> restSignup(@RequestBody Member member){
        boolean result = false;
        Map<String, Object> response = new HashMap<String, Object>();

        if(!(member.getId().isBlank()
                || member.getPwd().isBlank()
                || member.getName().isBlank()
                || member.getAddress().isBlank())){
            result = true;
            response.put("member", member);
        }
        response.put("result", result);

        return response;
    }
}

// restController 생기기전
//@Controller
//public class MemberRestController {
//
//    @GetMapping("/restLogin")
//    public String restLogin(){
//        return "restLogin";
//    }
//
//    @PostMapping("/restLogin")
//    @ResponseBody // 요청한 페이지에 결과를 리턴
//    public Map<String, Boolean> restLogin(@RequestBody Member member){
//        boolean result = false;
//
//        if(member.getId().equals("test") && member.getPwd().equals("1234")){
//            result = true;
//        } else {}
//
//        // Map 객체를 생성하여 전송 --> 자동으로 JSON 객체로 변환
//        Map<String, Boolean> response = new HashMap<String, Boolean>();
//        response.put("result", result);
//
//        return response; // 호출한 페이지로 문자열 혹은 JSON 객체로 전송
//    }
//}
