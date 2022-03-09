//JSON File로 부터 items을 불러온다.
function loadItems(){
    return fetch('data/data.json')
        .then(response => response.json()) // response의 body를 json object로 변환함.
        .then(json => json.items);
}

//주어진 아이템 리스트를 업데이트
function displayItems(items) {
    const container = document.querySelector('.items');
    container.innerHTML = items.map(item => createHTMLString(item)).join(''); 
    //mapping -> 하나하나 일대일로 짝 지어줌 
    //data.json의 items를 createHTMLString에서 지정한 형태의 리스트로 매핑 후, join으로 하나의 문자열로 바꿔줌.
}

//map한 상태
//let a = [
//    ' <li class="item">
//<img src="${item.image}" alt="${item.type}" class="itemthumbnail" />
//<span class="itemdescription">${item.gender}, ${item.size}</span>
//</li>',

// ' <li class="item">
//<img src="${item.image}" alt="${item.type}" class="itemthumbnail" />
//<span class="itemdescription">${item.gender}, ${item.size}</span>
//</li>',

// ' <li class="item">
//<img src="${item.image}" alt="${item.type}" class="itemthumbnail" />
//<span class="itemdescription">${item.gender}, ${item.size}</span>
//</li>'
//]

//join한 상태 -> 위에 map한 것이 하나의 문자열로 바뀜

//주어진 데이터 아이템을 HTML 리스트 아이템으로 만듬
function createHTMLString(item){
    return `
    <li class="item">
        <img src="${item.image}" alt="${item.type}" class="item__thumbnail">
        <span class="item__description">${item.gender}, ${item.size}</span>
    </li>
    `;
}

function onButtonClick(event, items) {
    const dataset = event.target.dataset;
    const key = dataset.key;
    const value = dataset.value;
    
    if(key == null || value == null){
        return; //아무것도 실행되자 않고 다음 코드로 넘어감.
    }
    const filtered = items.filter(item => item[key] === value);  
    //dictionary 개념 사용. key 값을 이용해 value 값을 찾은뒤, 해당 value와 같은 value들만 찾음
    displayItems(filtered);
    //updateItems(items, key, value);
}

//function updateItems(items, key, value) {
    // items.forEach(item => {
        // if (item.dataset[key] === value) {
            // item.classList.remove('invisible');
        // } else {
            // item.classList.add('invisible');
        // }
        // });
// }


function setEventListeners(items){
    const logo = document.querySelector('.logo');
    const buttons = document.querySelector('.buttons');
    logo.addEventListener('click', () => displayItems(items));
    buttons.addEventListener('click', event => onButtonClick(event, items));
}

// main
loadItems() //items를 동적으로 받아와서 promise가 return이 되면
    .then(itmes => { // 전달받은 아이템들을
        displayItems(itmes);
        setEventListeners(itmes);//  html에 보여주고
    })//  setEventListeners로 버튼을 누를 때 필터링을 해야해주기 때문에 추가
.catch(console.log)// 에러일 때