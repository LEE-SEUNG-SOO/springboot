// DMO 트리 생성(body생성이후) DOMContetnLoaded 함수 처리
window.addEventListener('DOMContentLoaded', function(){
    createTable('all');
    filterMenuEvent();
})

function setColor(menu,color){
    
    if(color == 'select'){
        menu.style.background = "rgb(251, 67, 87)";
    } else {
        menu.style.background = "rgb(137,137,135)";
    }
}

function filterMenuEvent(){
    let menuList = document.querySelectorAll(".filter-menu a");
    console.log(menuList);

    menuList.forEach( menu => {
        if(menu.id == 'all'){
            setColor(menu, 'select');
        } else {
            setColor(menu, 'default');
        }
    })
    
    menuList.forEach( menu => {
        menu.addEventListener( 'click' , ()=> {
            let type = menu.id;
            createTable(type);
            menuList.forEach (menu => setColor(menu, 'default'));
            setColor(menu, 'select');
        });
    });
}

async function getData(type){
    let response = await fetch("/data/support.json");
    return response.json();
};

async function createTable(type){
    let list = await getData(type);
    console.log(list);
    
    if(type != 'all'){
        list = list.filter( (data) => data.type == type);
    }
    
    let output = `
        <table class ="stable">
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
                ${list.map( (data, index) => `
                    <tr>
                        <td>${index + 1}</td>
                        <td>[${data.type}]</td>
                        <td><a href="#">${data.title}</a></td>
                        <td>${data.rdate}</td>
                        <td>${data.hits}</td>
                    </tr>
                `).join("") }
            </tbody>
            <tfoot>
                <tr>
                    <td colspan="5">1 2 3 4 5 >> </td>
                </tr>
            </tfoot>
        </table>
    `

    document.querySelector(".stable")?.remove(); // 해당 태그가 존재하면 삭제
    document.querySelector("#before-table").insertAdjacentHTML('afterend',output); // 설정한 태그 밑에 계속 쌓음.(삭제 X)
}

