package com.springboot.shoppy_fullstack_app.jpa_repository;

import com.springboot.shoppy_fullstack_app.dto.CartListResponseDTO;
import com.springboot.shoppy_fullstack_app.entity.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface JpaCartRepository extends JpaRepository<CartItem, Long> {
    @Query(value=  """
                    SELECT COALESCE(SUM(c.qty), 0) as sumQty
                    FROM CartItem c
                    WHERE c.id = :id
                """)
    public int countById(@Param("id") String id);

    @Query("""
        SELECT c
        FROM CartItem c
        WHERE c.id = :id
        AND c.size = :size
        AND c.pid = :pid""")
    public CartItem findByIdAndSizeAndPid(@Param("id") String id, @Param("size") String size, @Param("pid") int pid);

    @Query(
            """
             SELECT
                new com.springboot.shoppy_fullstack_app.dto.CartListResponseDTO(
                 vc.id,
                 vc.pid,
                 vc.cid,
                 vc.name,
                 vc.info,
                 vc.price,
                 vc.image,
                 vc.size,
                 vc.qty
             ) FROM CartListView vc
             WHERE vc.id = :id
             AND vc.pid = :pid""")
    public List<CartListResponseDTO> findByIdAndByPid(@Param("id") String id,@Param("pid") int pid);
}
