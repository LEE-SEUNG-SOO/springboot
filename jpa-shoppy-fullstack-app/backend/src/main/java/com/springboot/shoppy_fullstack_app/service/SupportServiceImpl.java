package com.springboot.shoppy_fullstack_app.service;

import com.springboot.shoppy_fullstack_app.dto.PageResponseDTO;
import com.springboot.shoppy_fullstack_app.dto.SupportDTO;
import com.springboot.shoppy_fullstack_app.entity.Support;
import com.springboot.shoppy_fullstack_app.jpa_repository.JpaSupportRepository;
import com.springboot.shoppy_fullstack_app.repository.SupportRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class SupportServiceImpl implements SupportService{

    private SupportRepository supportRepository;
    private JpaSupportRepository jpaSupportRepository;

    @Autowired
    public SupportServiceImpl(SupportRepository supportRepository,
                              JpaSupportRepository jpaSupportRepository) {
        this.supportRepository = supportRepository;
        this.jpaSupportRepository = jpaSupportRepository;
    }

    @Override
    public PageResponseDTO<SupportDTO> findSearchAll(SupportDTO support) {
        return null;
    }


    @Override
    public PageResponseDTO<SupportDTO> findAll(SupportDTO support) {
        //✨Page 객체의 인덱스 시작점이 currentPage 이므로, 0번지 인덱스로 초기화!!!!
        int currentPage = support.getCurrentPage()-1;  
        int pageSize = support.getPageSize();
        String stype = support.getStype();
        Pageable pageable = PageRequest.of(currentPage, pageSize);
        Page<Support> list = null;
        if(support.getStype().equals("all")) {
            list = jpaSupportRepository.findAll(pageable);
        } else {
            list = jpaSupportRepository.findByType(stype, pageable);
        }

        List<SupportDTO> resultList = new ArrayList<>();
        //entity <=> Dto, rowNumber 추가
        int offset = pageSize * currentPage;
        for(int i=0; i<list.getContent().size(); i++) {
                SupportDTO dto = new SupportDTO(list.getContent().get(i));
                dto.setNowNumber(offset + i + 1);  //행번호 추가
                resultList.add(dto);
        }

        return new PageResponseDTO<>(
                resultList,
                list.getTotalElements(),
                list.getTotalPages(),
                list.getNumber()  //currentPage
        );
    }
}
