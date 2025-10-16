import React, { useState, useEffect } from 'react';
import { axiosData } from '../../utils/fetchData.js';

export function Return() {
    const [returnData, setReturnData] = useState({});

    useEffect( () => {
        const fetch = async () => {
            const jsonData = await axiosData('/data/productReturn.json');
            setReturnData(jsonData);
        }

        fetch();

    }, []);

    return (
        <div>
            <div style={{paddingTop:"20px"}}></div>
            <h4>{returnData.title}</h4>
            <p>{returnData.description}</p>
            <table className='review-list-content' style={{marginTop:"10px"}}>
                <InfoDetail list={returnData.list}/>
            </table>
        </div>
    );
}

export function InfoDetail({list}){
    return(
        <tbody>
            {
                list && list.map( item => 
                    <tr>
                        <td style={{width:"30%"}}>{item.title}</td>
                        <td style={{padding:"20px"}}>
                            <ul style={{textAlign:"left"}}>
                                {item.infoList && item.infoList.map( info => 
                                        <li>{info}</li>
                                )}
                            </ul>
                        </td>
                    </tr>
                )
            }
            <tr></tr>
        </tbody>
    )
}