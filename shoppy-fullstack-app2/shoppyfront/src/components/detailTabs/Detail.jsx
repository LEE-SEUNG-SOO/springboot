import React from 'react';
import { ImageList } from '../commons/ImageList.jsx';

/**
 * ProductDetail > Detail
 */
export function Detail({imgList, detailInfo}) {    
    return (
        <div>
            <DetailImages imgList={imgList}/>
            <DetailInfo detailInfo={detailInfo}/>
        </div>
    );
}

/**
 * ProductDetail > Detail > DetailImages
 */
export function DetailImages({imgList}) {
    return (
        <div className='detail-images'>
            <div style={{padding:"10px"}} />
            <img src="/images/holidays_notice.jpg" alt="notice"/>
            <ImageList imgList={imgList} className="detail-images-list"/>
        </div>
    );
}

/**
 * ProductDetail > Detail > DetailInfo
 */
export function DetailInfo({detailInfo}) {

    return (
        <div className='detail-info'>
            <h4 className='detail-info-title-top'>
                {detailInfo && detailInfo.title_en} / {detailInfo && detailInfo.title_ko}
            </h4>
            {
                detailInfo && detailInfo.list.map( item => 
                    <div>
                        <h5 className='detail-info-title'>[{item.title}]</h5>
                        {
                            item.title === "SIZE" || item.title === "MODEL SIZE" ?
                            <ul className='nolist'>
                                <li>{item.type}</li>
                                { item.title === "MODEL SIZE" && 
                                    <>
                                        <li>{item.height}</li>
                                        <li>{item.size}</li>
                                    </> 
                                }
                                { item.title === "SIZE" &&
                                    <>
                                        <li>총길이 : {item.totalLength}</li>
                                        <li>어깨너비 : {item.shoulderWidth}</li>
                                        <li>가슴너비 : {item.chestWidth}</li>
                                        <li>소매길이 : {item.sleeveLength}</li>
                                        <li>소매밑단 : {item.sleeveHemWidth}</li>
                                        <li>밑단너비 : {item.hemLength}</li>
                                        <li>암홀 : {item.armhole}</li>
                                    </>
                                }
                            </ul>
                            : 
                            <ul className='list nolist'>
                                { item.title === "FABRIC" && 
                                    <>
                                        <li>color : {item.color}</li>
                                        <li>material : {item.material}</li>
                                    </>
                                }
                                { item.description.map( desc =>  
                                    <li>{desc}</li>
                                )}
                            </ul>
                        }
                    </div>
                )
            }
        </div>
    );
}