import React, { useState ,useEffect } from 'react';
import { axiosData } from '../../utils/fetchData.js';
import { StarRating } from '../commons/StarRating.jsx';
import { ImageList } from '../commons/ImageList.jsx';
import { FaRegCircleQuestion } from 'react-icons/fa6';
import { LikeItem } from '../commons/LikeItem.jsx';

/**
 * ProductDetail > Review
 */
export function Review() {
    const [reviewData, setReviewData] = useState({});

    // productReview.json 취득 비동기식
    useEffect( () => {
        const fetch = async () => {
            const jsonData = await axiosData("/data/productReview.json");
            setReviewData(jsonData);
        }

        fetch();
    }, []);

    return (
        <div>
            <ReviewTop data={reviewData}/>
            <ReviewList />
        </div>
    );
}

/**
 * ProductDetail > Review > ReviewTop
 */
export function ReviewTop({data}){
    const reviewCount = 569;
    return(
        <div className='review-top'>
            <div style={{paddingTop:'20px'}}/>
            <h3>상품 만족도({reviewCount})</h3>
            <ul className='review-top-list'>
                <li>
                    <div>
                        <p className='review-top-text'>
                            구매하신 분들의 상품에 대한 평점입니다.
                        </p>
                        <StarRating totalRate="3.6" style="star-black-big"/>
                    </div>
                </li>
                    {
                        data.topList && data.topList.map( item => 
                            <li>
                                <ReviewType data={item}/>
                            </li>
                        )
                    }
            </ul>
            <ImageList imgList={data.topImgList} className="review-top-imglist"/>
        </div>
    )
}

/**
 * ProductDetail > Review > ReviewTop > ReviewType
 */
export function ReviewType({data}){
    const {title, names, values} = data;
    return(
        <div className='review-type'>
            <p className='review-type text'>{title}</p>
            { names && names.map( (name,idx) => 
               <div className='bar-metadata'>
                <span className='bar-text1'>{name}</span>
                <div className='bar-bg'>
                    <div className='bar-value'
                        style={{width:`${values[idx]}%`}}>
                    </div>
                </div>
                <span className='bar-text2'>{`${values[idx]}%`}</span>
               </div> 
            ) }
        </div>
    )
}

/**
 * ProductDetail > Review > ReviewList
 */
export function ReviewList(){
    return(
        <div>
            <ul className='review-list-title'>
                <li><button type='button'>최신순</button></li>
                <li><button type='button'>평점 높은순</button></li>
                <li><button type='button'>평점 낮은순</button></li>
                <li><button type='button'>추천순<FaRegCircleQuestion /></button></li>
            </ul>
            <table className='review-list-content'>
                <tbody>
                    <tr>
                        <td className='review-list-star'><StarRating totalRate="4.6" style="star-black-review"/></td>
                        <td><ReviewListItem /></td>
                    </tr>
                    <tr>
                        <td className='review-list-star'><StarRating totalRate="2.6" style="star-black-review"/></td>
                        <td><ReviewListItem /></td>
                    </tr>
                    <tr>
                        <td className='review-list-star'><StarRating totalRate="1   .6" style="star-black-review"/></td>
                        <td><ReviewListItem /></td>
                    </tr>
                    <tr>
                        <td colSpan={2}>&lt;&lt; 1 2 3 4 5 6 7 8 &gt;&gt;</td>
                    </tr>
                </tbody>
            </table>
        </div>
    )
}

/**
 * ProductDetail > Review > ReviewList > ReviewListItem
 */
export function ReviewListItem(){
    return(
        <div className='review-list-item'>
            <div className='pdt_review_info'>
                <div className='product_review_info_left'>
                    <div className='pdt_review_option'>
                        <p><span>구매옵션 : MEDIUM</span></p>
                        <p><span>사이즈정보 : 180cm</span></p>
                    </div>
                </div>
                <p className='product_review_info_right'>
                    <em>da******</em>
                    <span>2025.09.22</span>
                </p>
            </div>
            <ul className='product_review_evaluation'>
                <li>
                    <div>
                        <strong>사이즈</strong>
                        <em>적당함</em>
                    </div>
                </li>
                <li>
                    <div>
                        <strong>색상</strong>
                        <em>같음</em>
                    </div>
                </li>
                <li>
                    <div>
                        <strong>소재</strong>
                        <em>같음</em>
                    </div>
                </li>
            </ul>
            <ul className='pdt_review_photo'>
                <li>
                    <img src="https://media.wconcept.co.kr/review/306386529/306386529_1758328823664.jpg?RS=300"/>
                </li>
            </ul>
            <div className='pdt_review_detail'>
                <p className='pdt_review_text'>겨울에 입으려고 미리구매~마감처리는 깔끔하게 돼있구요.조금 무겁기는 합니다.빠르게 배송해주셔서 고맙습니다</p>
            </div>
            <div className='product_review_reaction'>
                <div className='btn_report_item'>
                    <button type='button'
                         className='btn_report_item link_txt'>
                            <span>신고</span>
                    </button>
                    <button type='button'
                         className='btn_report_item link_txt'>
                            <span>숨김</span>
                    </button>
                </div>
                <LikeItem style="review-like" icon="tb" value="0"/>
            </div>
        </div>
    )
}