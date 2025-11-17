import React, { useState, useEffect, useContext } from 'react';
import { SearchForm } from '../components/commons/SearchForm.jsx';
import { MenuList } from '../components/commons/MenuList.jsx';
import { axiosData } from '../utils/fetchData.js';
import { getSupport } from '../feature/support/SupportAPI.js'
//-- 페이징 처리 추가
// import Pagination from 'rc-pagination';
// import 'bootstrap/dist/css/bootstrap.css';
// import 'rc-pagination/assets/index.css';

export function Support() {
    const [menus, setMenus] = useState([]);
    const [category, setCategory] = useState([]);
    const [list, setList] = useState([]);

    const [currentPage, setCurrentPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0);
    const [pageSize, setPageSize] = useState(3);
    const [type, setType] = useState('all');

    useEffect( () => {
        const fetch = async () => {
//             const data = {
//                 "stype": stype,
//                 "currentPage": currentPage,
//                 "pageSize": pageSize
//             }

//             const pageList = await getSupport(data);
            const jsonData = await axiosData('/data/support.json');
            setMenus(jsonData.menus);
            setCategory(jsonData.category);
//             setList(pageList.list);
//             setTotalCount(pageList.totalCount);
        }
        
        fetch();
    },[type, currentPage]);

    // 필터
    const filterList = (type) => {
        setType(type);
        setCurrentPage(1);
     };

    return (
        <div className="content">
            <div className="support center-layout">
                <h1 className="center-title">공지/뉴스</h1>
                <div className="support-content">
                    <p style={{color:"#777"}}>CGV의 주요한 이슈 및 여러가지 소식들을 확인할 수 있습니다.</p>
                    <SearchForm category={category}/>
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
                                    <td>{item.rowNumber}</td>
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
{/*                                 <td colSpan={5}> */}
{/*                                      */}{/* 페이징 처리 출력 컴포넌트 */}
{/*                                     <Pagination */}
{/*                                       className="d-flex justify-content-center" */}
{/*                                       current = {currentPage} */}
{/*                                       total = {totalCount} */}
{/*                                       pageSize = {pageSize} */}
{/*                                       onChange = {(page) => setCurrentPage(page) }/> */}
{/*                                 </td> */}
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </div>
    );
}

