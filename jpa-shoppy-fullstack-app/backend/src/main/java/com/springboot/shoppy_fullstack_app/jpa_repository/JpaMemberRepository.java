package com.springboot.shoppy_fullstack_app.jpa_repository;

import com.springboot.shoppy_fullstack_app.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository // interface를 구현하는 클래스를 생성하는 작업을 Spring Data JPA가 작업.
            // -> 서버 부팅시 컨테이너에 로딩
public interface JpaMemberRepository extends JpaRepository<Member, String> { // JpaRepository<T, ID> T : entity, ID : entity의 Id타입
//    Member save(Member member); // save는 JpaRepository에 정의되있기때문에 생략가능.
    // 새로운 메소드 정의 - 1. 네이밍 규칙적용
    //                 - 2. @Query 적용 : SQL 직접 생성
    @Query("select count(m.id) from Member m where id = :id") // 주석처리해도됨
    public Long countById(String id);
}
