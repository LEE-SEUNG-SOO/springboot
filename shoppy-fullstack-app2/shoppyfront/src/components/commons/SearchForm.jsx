import React from 'react';

export function SearchForm({categorys}) {
    return (
        <div>
            <select name="search_cartegory" style={{width:"15%", margin:"10px"}}>
                { categorys && categorys.map( 
                    item => <option value={item.value}>{item.name}</option>
                )}
            </select>
            <input type="text" name="search_content" style={{width:"60%", margin:"5px"}}/>
            <button>검색하기</button>
        </div>
    );
}

