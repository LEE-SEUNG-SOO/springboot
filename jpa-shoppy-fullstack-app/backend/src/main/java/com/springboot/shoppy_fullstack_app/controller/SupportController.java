package com.springboot.shoppy_fullstack_app.controller;

import com.springboot.shoppy_fullstack_app.dto.PageResponseDTO;
import com.springboot.shoppy_fullstack_app.dto.SupportDTO;
import com.springboot.shoppy_fullstack_app.service.SupportService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/support")
public class SupportController {

    private SupportService supportService;

    @Autowired
    public SupportController(SupportService supportService){
        this.supportService = supportService;
    }

    @PostMapping("/search/list")
    public PageResponseDTO<SupportDTO> searchList(@RequestBody SupportDTO support) {
        return supportService.findSearchAll(support);
    }

    @PostMapping("/list")
    public PageResponseDTO<SupportDTO> list(@RequestBody SupportDTO support){
        return supportService.findAll(support);
    }
}
