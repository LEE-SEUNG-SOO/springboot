import axios from 'axios';

/**
 * axios 함수를 이용하여 데이터 가져오기
 */
export const axiosData = async (url) => {
    const response = await axios.get(url);
    return response.data;
}

/**
 * fetch 함수를 이용하여 데이터 가져오기
 */
export const fetchData = async (url) => {
    const response = await fetch(url);
    const jsonData = await response.json(); 
    return jsonData;
}

/**
 * product 출력 갯수 설정
 */
export const groupByRows = (list, num) => {
    // 출력 포맷 함수 : 한줄에 3개씩 출력
    // for(let i = 0; i< list.length; i+3){
    //     const row = list.slice(i, i + 3);
    //     rows.push(row);
    // }
    const rows = list.reduce((acc, cur, idx) => {
        if( idx % num === 0 ) acc.push([cur])
            else acc[acc.length-1].push(cur);
        return acc;
    }, []);

    return rows;
}