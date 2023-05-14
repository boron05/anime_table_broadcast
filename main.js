
var BC = {
    "北海道放送":{
        "type": "地上波",
        "area": "北海道",
        "group": "TBS",
        "abbrev": "HBC"
    },
    "札幌テレビ":{
        "type": "地上波",
        "area": "北海道",
        "group": "日本テレビ",
        "abbrev": "STV"
    },
    "北海道テレビ":{
        "type": "地上波",
        "area": "北海道",
        "group": "テレビ朝日",
        "abbrev": "HTB"
    },
    "テレビ北海道":{
        "type": "地上波",
        "area": "北海道",
        "group": "テレビ東京",
        "abbrev": "TVh"
    },
    "北海道文化放送":{
        "type": "地上波",
        "area": "北海道",
        "group": "フジテレビ",
        "abbrev": "UHB"
    },
    
    "NHK":{
        "type": "地上波",
        "area": "関東",
        "group": "NHK",
        "abbrev": "NHK"
    },
    "日本テレビ":{
        "type": "地上波",
        "area": "関東",
        "group": "日本テレビ",
        "abbrev": "NTV"
    },
    "テレビ朝日":{
        "type": "地上波",
        "area": "関東",
        "group": "テレビ朝日",
        "abbrev": "EX"
    },
    "TOKYO MX":{
        "type": "地上波",
        "area": "関東",
        "group": "TOKYO MX",
        "abbrev": "MX"
    },
    "テレビ東京":{
        "type": "地上波",
        "area": "関東",
        "group": "テレビ東京",
        "abbrev": "TX"
    },
    "BS日テレ":{
        "type": "BS",
        "area": "関東",
        "group": "日本テレビ",
        "abbrev": "NTV"
    },
};

var select_bc = {}

const WEEK = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

function createColumns(week, bc=BC){

    let thead_row_element = document.querySelector("#div-" + week + " table thead #thead-row");

    // 放送局ヘッダー列生成
    for(let key in bc){
        let new_element = document.createElement('th');
        new_element.textContent = key;
        new_element.style.width = "200px";
        new_element.style.maxWidth = "200px";
        new_element.style.minWidth = "200px";
        new_element.style.borderBottom = "solid 1px black";
        new_element.setAttribute("class", week+"-bc-head");
        thead_row_element.appendChild(new_element);
    }
}

function creatTimeIndex(week, bc=BC){
    // 時刻生成
    //let tbody_element = document.getElementsByTagName("tbody")[0];
    let tbody_element = document.querySelector("#div-" + week + " table tbody");
    for(let h=22; h<27; h++){
        for(let m=0; m<60; m++){
            let new_tr_element = document.createElement('tr');
            let new_th_element = document.createElement('th');
            let str_h = ('00' + h).slice(-2);
            let str_m = ('00' + m).slice(-2);
            new_tr_element.setAttribute("id", "tr-"+str_h+str_m);
            new_th_element.style.height = "7px";
            new_tr_element.style.height = "7px";
            new_th_element.style.borderRight = "solid 1px black";
            tbody_element.appendChild(new_tr_element);
            new_tr_element.appendChild(new_th_element);
            for(let key in bc){
                let new_td_element = document.createElement('td');
                new_td_element.setAttribute("class", key);
                new_tr_element.appendChild(new_td_element);
            }
            if(m === 0 || m===30){
                new_th_element.textContent = str_h + ":" + str_m;
                new_th_element.setAttribute("valign", "top");
                new_th_element.setAttribute("rowSpan", 30);
                new_tr_element.style.borderTop = "solid 2px black";
            }else{
                new_th_element.remove();
            }
        }
    }
}

function creatAnimeTable(week, bc = BC){
    for(let a_key in ANIME){
        for(let key in bc){
            for (let anime_bc in ANIME[a_key]["bcInfo"]){
                
                
                for(let i=0; i<ANIME[a_key]["bcInfo"][anime_bc].length; i++){
                    console.log(i, a_key, ANIME[a_key]["bcInfo"][anime_bc][i]);
                    if(key === anime_bc & ANIME[a_key]["bcInfo"][anime_bc][i]["week"]===week){
                        try {
                            //console.log(a_key, anime_bc, ANIME[a_key]["bcInfo"][anime_bc]["time"]);
                            let time_id = ANIME[a_key]["bcInfo"][anime_bc][i]["time"].replace(":", "");
                            let tr_element = document.querySelector("div#div-" + week + ">table>tbody>tr#tr-"+time_id);
                            console.log(anime_bc, a_key, tr_element);
                            if (tr_element !== null){
                                let td_element = tr_element.getElementsByClassName(anime_bc)[0];
                                //console.log(td_element);
                                td_element.textContent = a_key;
                                td_element.setAttribute("rowSpan", ANIME[a_key]["minutes"]);
                                td_element.setAttribute("valign", "top");
                                td_element.style.borderTop = "solid 2px red";
                                td_element.style.borderBottom = "solid 2px red";
                                td_element.style.borderRight = "solid 2px red";
                                td_element.style.borderLeft = "solid 2px red";
                                if(ANIME[a_key]["minutes"] >= 10){
                                    let img_element = document.createElement('img');
                                    img_element.style.width = "200px";
                                    img_element.style.height = "285px";
                                    img_element.src = "./key_visual/"+ANIME[a_key]["img"] + ".webp";
                                    td_element.appendChild(img_element);
                                }
                                //rowspan分のtdタグを消す処理
                                let tr_next_element = tr_element;
                                for(i=1; i<ANIME[a_key]["minutes"]; i++){
                                    tr_next_element = tr_next_element.nextElementSibling;
                                    if(tr_next_element === null){
                                        break;
                                    }
                                    let td_del_element = tr_next_element.getElementsByClassName(anime_bc)[0];
                                    //console.log(tr_next_element, td_element);
                                    td_del_element.remove();
                                }
                            }
                            
                            /*
                            let td_element = tr_element.getElementsByClassName(anime_bc)[0];
                            //console.log(td_element);
                            td_element.textContent = a_key;
                            td_element.setAttribute("rowSpan", ANIME[a_key]["minutes"]);
                            td_element.setAttribute("valign", "top");
                            let img_element = document.createElement('img');
                            img_element.style.width = "200px";
                            img_element.style.height = "285px";
                            img_element.src = "./key_visual/webp/"+ANIME[a_key]["img"] + ".webp";
                            td_element.appendChild(img_element);
                            //rowspan分のtdタグを消す処理
                            let tr_next_element = tr_element;
                            for(i=1; i<ANIME[a_key]["minutes"]; i++){
                                tr_next_element = tr_next_element.nextElementSibling;
                                let td_element = tr_next_element.getElementsByClassName(anime_bc)[0];
                                //console.log(tr_next_element, td_element);
                                td_element.remove();
                            }
                            */
                        } catch (error) {
                            console.log("error")
                        }
                    }
                }

            }
        }
    }
}

window.addEventListener('DOMContentLoaded', function() {
    //drag-list生成
    createCheckbox();
    
    for(let i=0; i<WEEK.length; i++){
        createColumns(WEEK[i]);
    }
    for(let i=0; i<WEEK.length; i++){
        creatTimeIndex(WEEK[i]);
    }
    for(let i=0; i<WEEK.length; i++){
        creatAnimeTable(WEEK[i]);
    }
});

function createCheckbox(){
    
    //最後のli要素取得
    let drag_last_li = document.getElementById("drag-last-temp");

    let cnt = 1;
    for(let key in BC){
        //新規のli要素作成
        let new_li_element = document.createElement('li');
        //id用文字列作成
        let str_cnt = ('00' + cnt).slice(-2);
        //id属性設定
        new_li_element.setAttribute("id", "item"+str_cnt);
        new_li_element.setAttribute("draggable", "true");
        drag_last_li.before(new_li_element);
        
        let new_input_element = document.createElement('input');
        new_input_element.setAttribute("type", "checkbox");
        new_input_element.setAttribute("id", BC[key]["abbrev"]);
        new_input_element.setAttribute("name", BC[key]["abbrev"]);
        new_input_element.setAttribute("class", "bc-checkbox");
        //new_input_element.setAttribute("checked", "checked");
        new_li_element.appendChild(new_input_element);
        
        let new_label_element = document.createElement('label');
        new_label_element.setAttribute("for", BC[key]["abbrev"]);
        new_label_element.textContent = key;
        new_li_element.appendChild(new_label_element);
        cnt++;
    }
    
    document.querySelectorAll('.drag-list li').forEach (elm => {
        elm.ondragstart = function () {
            event.dataTransfer.setData('text/plain', event.target.id);
        };
        elm.ondragover = function () {
            event.preventDefault();
            let rect = this.getBoundingClientRect();
            if ((event.clientY - rect.top) < (this.clientHeight / 2)) {
                //マウスカーソルの位置が要素の半分より上
                this.style.borderTop = '2px solid blue';
                this.style.borderBottom = '';
            } else {
                //マウスカーソルの位置が要素の半分より下
                this.style.borderTop = '';
                this.style.borderBottom = '2px solid blue';
            }
        };
        elm.ondragleave = function () {
            this.style.borderTop = '';
            this.style.borderBottom = '';
        };
        elm.ondrop = function () {
            event.preventDefault();
            let id = event.dataTransfer.getData('text/plain');
            let elm_drag = document.getElementById(id);

            let rect = this.getBoundingClientRect();
            if ((event.clientY - rect.top) < (this.clientHeight / 2)) {
                //マウスカーソルの位置が要素の半分より上
                this.parentNode.insertBefore(elm_drag, this);
            } else {
                //マウスカーソルの位置が要素の半分より下
                this.parentNode.insertBefore(elm_drag, this.nextSibling);
            }
            this.style.borderTop = '';
            this.style.borderBottom = '';
        };
    });
}


function resetTable(week){

    let table = document.querySelector("#div-" + week + " table");
    table.innerHTML = '<thead><tr id="thead-row"><th>時刻</th></tr></thead><tbody></tbody>';
}

function getHeaderByWeek(week){
    return document.querySelector("#div-" + week + " table thead #thead-row");
}

function getTbodyByWeek(week){
    return document.querySelector("#div-" + week + " table tbody");
}

function update() {
    select_bc = {};
    let checkboxes = document.getElementsByClassName("bc-checkbox");
    for(let i=0; i<checkboxes.length; i++){
        if(checkboxes[i].checked){
            select_bc[checkboxes[i].nextSibling.textContent] = BC[checkboxes[i].nextSibling.textContent];
        }
    }
    //console.log(select_bc);
    //console.log(BC);
    //createTable("sun");
    for(let i=0; i<WEEK.length; i++){
        resetTable(WEEK[i]);
        createColumns(WEEK[i], select_bc);
        creatTimeIndex(WEEK[i], select_bc);
        creatAnimeTable(WEEK[i], select_bc);
    }
}



