package com.springboot.shoppy_fullstack_app.service;

import com.springboot.shoppy_fullstack_app.dto.Member;
import com.springboot.shoppy_fullstack_app.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service //memberServiceImpl 이름으로 Service생성
@Transactional // DB가 autocommit일 경우 생략 가능. <= 중요
public class MemberServiceImpl implements MemberService{

    private final MemberRepository memberRepository;
    // 패스워드 암호화
    private final PasswordEncoder passwordEncoder;

    @Autowired
    public MemberServiceImpl(MemberRepository memberRepository, PasswordEncoder passwordEncoder){
        this.memberRepository = memberRepository;
        this.passwordEncoder = passwordEncoder;
    }

    @Override
    //회원가입 처리
    public int signup(Member member) {
        // 패스워드 인코딩
        String encodePwd = passwordEncoder.encode(member.getPwd()); // UUID타입으로 생성
        member.setPwd(encodePwd);

        // Repository
        return memberRepository.save(member);
    }

    @Override
    public boolean checkDuplicateId(String id) {
        boolean result = false;
        Long count = memberRepository.findById(id);

        if(count == 1){
            result = true;
        }

        return result;
    }

    @Override
    // 로그인 체크
    public boolean checkLogin(Member member) {
        // id로 DB값 취득
        Member resultMember = memberRepository.getPwd(member.getId());

        // 검색결과
        // passwordEncoder는 decode가 없기때문에 matches를 사용하여 비교
        return passwordEncoder.matches(member.getPwd(), resultMember.getPwd());
    }

}
