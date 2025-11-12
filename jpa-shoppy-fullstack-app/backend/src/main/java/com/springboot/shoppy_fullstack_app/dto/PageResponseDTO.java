package com.springboot.shoppy_fullstack_app.dto;

import lombok.*;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class PageResponseDTO<T> {
    private List<T> list;
    private Long totalCount;
    private int pageSize;
    private int currentPage;
}
