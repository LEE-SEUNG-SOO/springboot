import React, { useState, useEffect } from 'react';
import { axiosData } from '../../utils/fetchData.js';
import { CiLock, CiUnlock } from "react-icons/ci";
import { getQnA } from '../../feature/product/productAPI.js';

export function QnA({pid}) {
    const [qnaData, setQnaData] = useState([]);
    const [openQid, setOpenQid] = useState();
    const [isOpen, setIsOpen] = useState(true);
    const [bgcolor, setBgColor] = useState("blue");
    
    useEffect( () => {
        const fetch = async(pid) => {
            const jsonData = await getQnA(pid);
            setQnaData(jsonData);
        }
        fetch(pid);
    }, []);

    const handleToggle = (qid) =>{
        setOpenQid( prev => prev === qid ? null : qid);
    };

    const handleClick = () =>{
        setIsOpen(!isOpen);
        isOpen ? setBgColor("blue") : setBgColor("green");
    };

    return (
        <div className='review-top'>
            <div style={{paddingTop:"20px"}}>
                <button type="button" onClick={handleClick} 
                    style={{backgroundColor:bgcolor , color:"white"}}>상품 문의</button>
            </div>
            <table className='review-list-content' style={{marginTop:"10px"}}>
                <tbody>
                    { qnaData && qnaData.map( item =>
                        <tr>
                            <td style={{width:"15%", padding:"10px"}}><span>{item.isComplete ? "답변완료" : "답변중"}</span></td>
                            <td style={{width:"70%"}}>
                                <span style={{cursor:"pointer"}} 
                                    onClick={() => {handleToggle(item.qid)} }>{item.title}</span>
                                    {item.isLock ? <CiLock /> : <CiUnlock />}
                                { openQid === item.qid ? <span>{item.content}</span> : ""}
                            </td>
                            <td style={{width:"10%"}}>{item.id}</td>
                            <td>{item.cdate}</td>
                        </tr>
                    )}
                    <tr>
                        <td colSpan={4}>&lt;&lt; 1 2 3 4 5 6 7 8 &gt;&gt;</td>
                    </tr>
                </tbody>
            </table>
        </div>
    );
}