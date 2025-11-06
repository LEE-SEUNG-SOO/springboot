package com.springboot.shoppy_fullstack_app.controller;

import com.springboot.shoppy_fullstack_app.dto.Member;
import com.springboot.shoppy_fullstack_app.service.MemberService;
import jakarta.servlet.http.Cookie;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.servlet.http.HttpSession;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

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

    // ResponseEntity => json형태로 반환
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Member member,
                                HttpServletRequest request){
        ResponseEntity<?> response = null;
        // 로그인
        boolean result = memberService.checkLogin(member);
        
        // 로그인 성공시
        if(result){
            // 세션 생성(true)
            // 빈값설정시 없을경우 생성(첫 로그인시)
            // 기존 세션 가져오기 - false
            // session은 response전송시 자동전송 (org.springframework.http.HttpEntity<T>를 상속 받았기 때문)
            HttpSession session = request.getSession();
            session.setAttribute("sid", "hong");
            response = ResponseEntity.ok(Map.of("login",true));
        } else{
            response = ResponseEntity.ok(Map.of("login",false));
        }
        
        // 로그인 체크
        return response;
    }

    @PostMapping("/logout")
    // 쿠키를 수정하고 싶을경우 HttpServletResponse 사용
    public ResponseEntity<?> logout(HttpServletRequest request, HttpServletResponse response){
        HttpSession session = request.getSession();
        String sid = session.getAttribute("sid").toString();
        String ssid = session.getId();
//        ResponseEntity<?> response = null;

        if(sid != null && ssid != null){
            session.invalidate(); // session 삭제 - 스프링의 세션 테이블에서 삭제
            System.out.println("session clear");

            // 브라우저의 쿠키 삭제(JSEESIONID를 새로 생성함으로 삭제 처리)
            Cookie cookie = new Cookie("JSESSIONID", null);
            cookie.setPath("/");        // 현재 패스 유지
            cookie.setMaxAge(0);        // 즉시 종료(유효 기간)
            cookie.setHttpOnly(true);   // 개발 중에도 httpOnly 유지 권장
            response.addCookie(cookie);

            // 브라우저의 쿠키 삭제(CSRF토큰 재발행)
            Cookie xsrf = new Cookie("XSRF-TOKEN", null);
            xsrf.setPath("/");        // 현재 패스 유지
            xsrf.setMaxAge(0);        // 즉시 종료(유효 기간)
            xsrf.setHttpOnly(false);
            // xsrf.setSecure(ture) // HTTPS일경우 설정
            response.addCookie(xsrf);
            
            

            return ResponseEntity.ok(true);
        } else {
            return ResponseEntity.ok(false);
        }
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
