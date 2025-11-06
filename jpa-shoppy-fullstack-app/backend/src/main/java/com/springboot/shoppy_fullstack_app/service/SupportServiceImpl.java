package com.springboot.shoppy_fullstack_app.service;

import com.springboot.shoppy_fullstack_app.dto.Support;
import com.springboot.shoppy_fullstack_app.repository.SupportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class SupportServiceImpl implements SupportService{

    private SupportRepository supportRepository;

    @Autowired
    public SupportServiceImpl(SupportRepository supportRepository){
        this.supportRepository = supportRepository;
    }

    @Override
    public List<Support> getList(Support support) {
        // 공지사항 전체 정보 취득
        if(support.getType().equals("all")){
            return supportRepository.findAll();
        }
        // 공지사항 타입 정보 취득
        else {
            return supportRepository.findByType(support);
        }
    }
}
