
var slc_tv_sta = {}

const INIT_STA = ["TOKYO MX", "テレビ東京", "日本テレビ", "テレビ朝日", "TBSテレビ", "フジテレビ", "NHK"];
const WEEK = ["sun", "mon", "tue", "wed", "thu", "fri", "sat"];

var checkbox_all_hokkaido = null;
var checkbox_list_hokkaido = null;


function createColumns(week, tv_sta=TV_STATIONS){

    let thead_row_element = document.querySelector("#div-" + week + " div.overflow table thead #thead-row");

    // 放送局ヘッダー列生成
    for(let key in tv_sta){
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



function creatTimeIndex(week, tv_sta=TV_STATIONS){
    // 時刻生成
    //let tbody_element = document.getElementsByTagName("tbody")[0];
    let tbody_element = document.querySelector("#div-" + week + " div.overflow table tbody");
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
            for(let key in tv_sta){
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

function creatAnimeTable(week, tv_sta=TV_STATIONS){
    for(let a_key in ANIME){
        for(let key in tv_sta){
            for (let anime_bc in ANIME[a_key]["bcInfo"]){
                for(let i=0; i<ANIME[a_key]["bcInfo"][anime_bc].length; i++){
                    //console.log(i, a_key, ANIME[a_key]["bcInfo"][anime_bc][i]);
                    if(key === anime_bc & ANIME[a_key]["bcInfo"][anime_bc][i]["week"] === week){
                        try {
                            //console.log(a_key, anime_bc, ANIME[a_key]["bcInfo"][anime_bc]["time"]);
                            let time_id = ANIME[a_key]["bcInfo"][anime_bc][i]["time"].replace(":", "");
                            let tr_element = document.querySelector("div#div-" + week + " div.overflow >table>tbody>tr#tr-"+time_id);
                            //console.log(anime_bc, a_key, tr_element);
                            if (tr_element !== null){
                                let td_element = tr_element.getElementsByClassName(anime_bc)[0];
                                console.log(td_element);
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
                                    //console.log(tr_next_element);
                                    if(tr_next_element === null){
                                        break;
                                    }
                                    let td_del_element = tr_next_element.getElementsByClassName(anime_bc)[0];
                                    td_del_element.remove();
                                }
                            }
                        } catch (error) {
                            //console.log(tr_next_element, td_element);
                            console.log(error)
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
    let checkboxes = document.getElementsByClassName("bc-checkbox");
    for(let i=0; i<checkboxes.length; i++){
        input_checkBox = checkboxes[i];
        label = input_checkBox.nextSibling;
        if(INIT_STA.includes(label.textContent)){
            input_checkBox.setAttribute("checked", "checked");
        }
    }
    //全選択・解除のチェックボックス
    checkbox_all_hokkaido = document.querySelector("#checkbox-all-hokkaido");
    console.log(checkbox_all_hokkaido);
    //チェックボックスのリスト
    checkbox_list_hokkaido = document.querySelectorAll("li.area-hokkaido input");
    console.log(checkbox_list_hokkaido);
    //全選択のチェックボックスイベント
    checkbox_all_hokkaido.addEventListener('change', change_all_hokkaido);
    update();

});

function createCheckbox(){
    
    //最後のli要素取得
    let drag_last_li = document.getElementById("drag-last-temp");

    let cnt = 1;
    for(let key in TV_STATIONS){
        //新規のli要素作成
        let new_li_element = document.createElement('li');
        //id用文字列作成
        let str_cnt = ('00' + cnt).slice(-2);
        //id属性設定
        new_li_element.setAttribute("id", "item"+str_cnt);
        new_li_element.setAttribute("draggable", "true");
        // class属性

        if(TV_STATIONS[key]["area"] === "北海道"){
            new_li_element.setAttribute("class", "area-hokkaido");
        }else if(TV_STATIONS[key]["area"] === "東北"){
            new_li_element.setAttribute("class", "area-tohoku");
        }else if(TV_STATIONS[key]["area"] === "関東"){
            new_li_element.setAttribute("class", "area-tohoku");
        }else if(TV_STATIONS[key]["area"] === "北陸・甲信越"){
            new_li_element.setAttribute("class", "area-hokuriku");
        }else if(TV_STATIONS[key]["area"] === "東海"){
            new_li_element.setAttribute("class", "area-tokai");
        }else if(TV_STATIONS[key]["area"] === "関西"){
            new_li_element.setAttribute("class", "area-kansai");
        }else if(TV_STATIONS[key]["area"] === "中国"){
            new_li_element.setAttribute("class", "area-chugoku");
        }else if(TV_STATIONS[key]["area"] === "四国"){
            new_li_element.setAttribute("class", "area-shikoku");
        }else if(TV_STATIONS[key]["area"] === "九州"){
            new_li_element.setAttribute("class", "area-kyushu");
        }else if(TV_STATIONS[key]["area"] === "沖縄"){
            new_li_element.setAttribute("class", "area-okinawa");
        }

        drag_last_li.before(new_li_element);
        
        let new_input_element = document.createElement('input');
        new_input_element.setAttribute("type", "checkbox");
        new_input_element.setAttribute("id", TV_STATIONS[key]["abbrev"]);
        new_input_element.setAttribute("name", TV_STATIONS[key]["abbrev"]);
        new_input_element.setAttribute("class", "bc-checkbox");
        //new_input_element.setAttribute("checked", "checked");
        new_li_element.appendChild(new_input_element);
        
        let new_label_element = document.createElement('label');
        new_label_element.setAttribute("for", TV_STATIONS[key]["abbrev"]);
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
    slc_tv_sta = {};
    let checkboxes = document.getElementsByClassName("bc-checkbox");
    for(let i=0; i<checkboxes.length; i++){
        if(checkboxes[i].checked){
            slc_tv_sta[checkboxes[i].nextSibling.textContent] = TV_STATIONS[checkboxes[i].nextSibling.textContent];
        }
    }

    for(let i=0; i<WEEK.length; i++){
        resetTable(WEEK[i]);
        createColumns(WEEK[i], slc_tv_sta);
        creatTimeIndex(WEEK[i], slc_tv_sta);
        creatAnimeTable(WEEK[i], slc_tv_sta);
    }
}

function change_all_hokkaido() {

    //チェックされているか
    if (checkbox_all_hokkaido.checked) {
        //全て選択
        for (let i in checkbox_list_hokkaido) {
            if (checkbox_list_hokkaido.hasOwnProperty(i)) {
                checkbox_list_hokkaido[i].checked = true;
            }
        }
    } else {
        //全て解除
        for (let i in checkbox_list_hokkaido) {
            if (checkbox_list_hokkaido.hasOwnProperty(i)) {
                checkbox_list_hokkaido[i].checked = false;
            }
        }
        
    }

};
