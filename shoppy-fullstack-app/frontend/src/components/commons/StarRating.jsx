import React from 'react';
import { FaStarHalfAlt, FaStar, FaRegStar } from "react-icons/fa";

export function StarRating({totalRate, style}) {
    const MAXCOUNT = 5;
    let fillStar = 0;
    let halfStar = 0;
    let emptyStar = 0;

    // 프롭스로 넘어 오는 totalRate의 값의 범위를 정확히 정의
    if(totalRate > 0 && totalRate <= 5){
        fillStar = Math.floor(totalRate); // 채워진 별 개수
        halfStar = totalRate % 1 !== 0 ? 1 : 0; // 반 별 개수
        emptyStar = MAXCOUNT - (fillStar + halfStar); // 빈 별 개수

    }

    return (
        <div className={style}>
            {/* fillStar : 채워진 별 추가 */}
            {
                [...Array(fillStar)].map((_,i)=> 
                    <span key={i} 
                        className={style.concat(" ", "coral")}>
                    <FaStar />
                    </span>
                )
            }
            {/* fillStar : 반 별 추가 */}
            {
                [...Array(halfStar)].map((_,i)=> 
                    <span key={i} 
                        className={style.concat(" ", "coral")}>
                    <FaStarHalfAlt />
                    </span>
                )
            }   
            {/* fillStar : 빈 별 추가 */}
            {
                [...Array(emptyStar)].map((_,i)=> 
                    <span key={i} 
                        className={style.concat(" ", "coral")}>
                    <FaRegStar />
                    </span>
                )
            }
            {/* 별점 추가 */}
            { 
                style && style === "star-black-big" ?
                <>
                    <span className="star-black-big number">{totalRate} / </span>
                    <span className="star-black-big tot-number">{MAXCOUNT}.0</span>
                </>
                 : style && style === "star-black-review" ?
                 ""
                 : <span className="star-coral number">{totalRate}</span> 
            }
        </div>
    );
}

