package com.springboot.shoppy_fullstack_app.service;

import com.springboot.shoppy_fullstack_app.dto.MemberDTO;
import com.springboot.shoppy_fullstack_app.entity.Member;
import com.springboot.shoppy_fullstack_app.jpa_repository.JpaMemberRepository;
import com.springboot.shoppy_fullstack_app.repository.MemberRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service //memberServiceImpl 이름으로 Service생성
@Transactional // DB가 autocommit일 경우 생략 가능. <= 중요
public class MemberServiceImpl implements MemberService{

    // JpaMemberRepository
    private final JpaMemberRepository jpaMemberRepository;
    // MemberRepository
    private final MemberRepository memberRepository;
    // 패스워드 암호화
    private final PasswordEncoder passwordEncoder;

    @Autowired // IOC 컨테이너에서 생성자 주입
    public MemberServiceImpl(MemberRepository memberRepository,
                             PasswordEncoder passwordEncoder,
                             JpaMemberRepository jpaMemberRepository){
        this.memberRepository = memberRepository;
        this.passwordEncoder = passwordEncoder;
        this.jpaMemberRepository = jpaMemberRepository;
    }

    @Override
    //회원가입 처리
    public int signup(MemberDTO memberDto) {
        int result = 0;

        // 패스워드 인코딩
        String encodePwd = passwordEncoder.encode(memberDto.getPwd()); // UUID타입으로 생성
        memberDto.setPwd(encodePwd);

        // Repository
//        return memberRepository.save(memberDto);

        // memberDTO -> member entity로 설정
        Member member = new Member(memberDto);
        Member saveMember = jpaMemberRepository.save(member);

        System.out.println("save :::: " + saveMember);

        if(saveMember != null) result = 1;

        return result;
    }

    @Override
    // 아이디 중복 체크
    public boolean checkDuplicateId(String id) {
        boolean result = false;
//        Long count = memberRepository.findById(id);
        Long count = jpaMemberRepository.countById(id);

        if(count == 1){
            result = true;
        }

        return result;
    }

    /**
     * Spring-Security를 이용하여 로그인 처리시 UserDetailService 객체를 사용하므로 로그인체크 메소드는 사용하지 않음
     * @param member
     * @return
     */
    @Override
    // 로그인 체크
    public boolean checkLogin(MemberDTO member) {
//        // id로 DB값 취득
//        MemberDTO resultMember = memberRepository.getPwd(member.getId());
        Optional<Member> resultMember = jpaMemberRepository.findById(member.getId());

        // 검색결과
        // passwordEncoder는 decode가 없기때문에 matches를 사용하여 비교
        return passwordEncoder.matches(member.getPwd(), resultMember.get().getPwd());
    }

}
