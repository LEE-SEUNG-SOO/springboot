import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { PiGiftThin } from 'react-icons/pi';
import { ImageList } from '../components/commons/ImageList.jsx';
import { StarRating } from '../components/commons/StarRating.jsx';
import { Detail } from '../components/detailTabs/Detail.jsx';
import { Review } from '../components/detailTabs/Review.jsx';
import { QnA } from '../components/detailTabs/QnA.jsx';
import { Return } from '../components/detailTabs/Return.jsx';
import { useDispatch, useSelector } from 'react-redux';
import { addCart } from '../feature/cart/cartAPI.js';
import { getFilter } from '../feature/product/productAPI.js';

export function ProductDetail() {
    // addCartItem을 사용하기 위한 dispatch설정
    const dispatch = useDispatch();
    const product = useSelector( state => state.product.product );
    const imgList = product.imgList;
    const { pid } = useParams(); // useParams -> 객체형태로 데이터 보존
    const [size, setSize] = useState("XS");
    const tabLables = ["DETAIL", "REVIEW", "Q&A", "RETURN & DELIVERY"];
    const [tabName, setTabName] = useState("detail");
    const tabEventNames = ['detail', 'review', 'qna', 'return']

    useEffect( () => {
        dispatch(getFilter(pid));
    }, []);
    
    const price = parseInt(product.price).toLocaleString() + "원";

    // // 쇼핑백 추가
    // const handleAddCartItem = () => {
    //     const cartItem = {
    //         pid:product.pid,
    //         name:product.name,
    //         image:product.image,
    //         price:product.price,
    //         info:product.info,
    //         size: size,
    //         qty:1
    //     };

    //     dispatch(addCart(cartItem)); // addCart 호출시 dispatch 전송
    // }

    return (
        <div className='content'>
            <div className='product-detail-top'>
                <div className='product-detail-image-top'>
                    <img src={product.image} alt={product.info} />
                    <ImageList imgList={imgList} className="product-detail-image-top-list"/>
                </div>
                <ul className='product-detail-info-top'>
                    <li className='product-detail-title'>{product.name}</li>
                    <li className='product-detail-title'>{price}</li>
                    <li className='product-detail-subtitle'>{product.info}</li>
                    <li className='product-detail-subtitle-star'>
                        <StarRating totalRate={product.rate} style="star-rating"/>
                        <span>527개 리뷰&nbsp;&nbsp;&gt;</span>
                    </li>
                    <li><p className='product-detail-box'>신규회원, 무이자 할부 등</p></li>
                    <li className='flex'>
                        <button className='product-detail-button size'>사이즈</button>
                        <select className='product-detail-select2' 
                                onChange={(e) => { setSize(e.target.value) }}>
                            <option value="XS">XS</option>
                            <option value="S">S</option>
                            <option value="M">M</option>
                            <option value="L">L</option>
                            <option value="XL">XL</option>
                        </select>
                    </li>
                    <li className='flex'>
                        <button type='button' className='product-detail-button order'>바로 구매</button>
                        <button type='button'
                                className='product-detail-button cart'
                                onClick={ () => dispatch(addCart(product, size))  }>쇼핑백 담기</button>
                        <div type="button" className='gift'>
                            <PiGiftThin />
                            <div className='gift-span'>선물하기</div>
                        </div>
                    </li>
                    <li>
                        <ul className='product-detail-summary-info'>
                            <li>상품 정보 요약</li>
                        </ul>
                    </li>
                </ul>
            </div>
            <div className='product-detail-tab'>
                <ul className='tabs'>{
                        tabLables && tabLables.map( (lable, i) =>
                            <li className={tabName=== tabEventNames[i] ? "active": ""}>
                                <button type='button'
                                        onClick={ () => setTabName(tabEventNames[i])}>{lable}</button>
                            </li> 
                        )
                    }
                </ul>
                { tabName === "detail" ? <Detail imgList={imgList} detailInfo={product.detailInfo}/> 
                    : tabName === "review" ? <Review />
                    : tabName === "qna" ? <QnA />
                    : <Return />}
            </div>
            <div style={{marginBottom:"50px"}}></div>
        </div>
    );
}