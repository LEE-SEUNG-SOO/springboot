import React, { useState, useEffect, useContext } from 'react';
import { SearchForm } from '../components/commons/SearchForm.jsx';
import { MenuList } from '../components/commons/MenuList.jsx';
import { axiosData } from '../utils/fetchData.js';

export function Support() {
    const [menus, setMenus] = useState([]);
    const [categorys, setCategorys] = useState([]);
    const [list, setList] = useState([]);

    useEffect( () => {
        const fetch = async () => {
            const jsonData = await axiosData('/data/support.json');
            setMenus(jsonData.menus);
            setCategorys(jsonData.categorys);
            setList(jsonData.list);
        }
        
        fetch();
    },[])   
    
    // 필터
    const filterList = (type) => {
        const filter = async () => {
            const jsonData = await axiosData('/data/support.json');
            const filterList = jsonData.list;
            setList(filterList.filter( item => type === 'all' ? item : item.type === type ));
        }
        filter();
     };

    return (
        <div className="content">
            <div className="support center-layout">
                <h1 className="center-title">공지/뉴스</h1>
                <div className="support-content">
                    <p style={{color:"#777"}}>CGV의 주요한 이슈 및 여러가지 소식들을 확인할 수 있습니다.</p>
                    <SearchForm categorys={categorys}/>
                    <nav>
                        <MenuList menus={menus} filterList={filterList}/>
                    </nav>
                    <p id="before-table" style={{color:"#777"}}>총 114건이 검색되었습니다. </p>
                    {/* list 내용 출력 */}
                    <table>
                        <thead>
                            <tr>
                                <th>번호</th>
                                <th>구분</th>
                                <th>제목</th>
                                <th>등록일</th>
                                <th>조회수</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                list && list.map( (item, index) => 
                                <tr>
                                    <td>{index + 1}</td>
                                    <td>[{item.type}]</td>
                                    <td>{item.title}</td>
                                    <td>{item.rdate}</td>
                                    <td>{item.hits}</td>
                                </tr>
                                )
                            }
                        </tbody>
                        <tfoot>
                            <tr>
                                <td colSpan="5">1 2 3 4 5 &gt;&gt; </td>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
    );
}

