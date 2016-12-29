let maxNumber = 0;
let flag = Array();
let quizAndAnswerAndGenre = Array();
let quizCounter = 0;
let genreTemplate = ['pink', 'indigo', 'dark-green', 'amber', 'cyan', 'light-green', 'yellow', 'purple', 'deep-orange', 'brown', 'blue-grey'];
let usedGenreList = new Array();

window.addEventListener('load',
    function (event) {

        //初期化
        init();
        document.getElementById('btnLoad').addEventListener('click', clickStart, false);
        document.getElementById('btnDecide').addEventListener('click', clickDecide, false);
        document.getElementById('inputCSV').addEventListener('change', changeInputCSV, false);
    }
, false);

function init() {
        document.getElementById('load').style.display = 'block';
        document.getElementById('confirm').style.display = 'none';
        document.getElementById('quizzes').textContent = null;
        flag = Array();
        quizAndAnswerAndGenre = Array();
        quizCounter = 0;
        usedGenreList = Array();
}

function clickStart() {
    console.log('clickStart');
    let file = document.getElementById('inputCSV');
    file.click();
}

function changeInputCSV(event) {
    console.log('changeInputCSV');
    let file = event.target.files[0];
    let render = new FileReader();
    let json;

    render.onload = function(event) {
        quizAndAnswerAndGenre = getCSV(render.result);
        if (quizAndAnswerAndGenre === null) {
            alert('クイズファイルのフォーマットが正しくありません。');
            return;
        }
        maxNumber = quizAndAnswerAndGenre.length;
        for (let i = 1; i <= maxNumber; i++) {
            flag[i] = false;
        }

        let quizzes = document.getElementById('quizzes');
        for (let i = 0; i < maxNumber; i++) {
            let tr = document.createElement('tr');

            let number = document.createElement('th');
            let question = document.createElement('td');
            let answer = document.createElement('td');
            let genre = document.createElement('td');
            let edit = document.createElement('td');
            let button = document.createElement('button');

            number.scope = 'row';
            number.innerHTML = i + 1;
            question.innerHTML = quizAndAnswerAndGenre[i][0];
            answer.innerHTML = quizAndAnswerAndGenre[i][1];
            genre.innerHTML = quizAndAnswerAndGenre[i][2];
            button.type = 'button';
            button.id = 'button' + (i+1);
            button.className = 'btn btn-raised waves-effect btn-primary btn-sm';
            button.innerHTML = 'edit';
            button.addEventListener('click', function(){clickDetail(i+1)}, false);
            edit.appendChild(button);

            tr.appendChild(number);
            tr.appendChild(question);
            tr.appendChild(answer);
            tr.appendChild(genre);
            tr.appendChild(edit);

            quizzes.appendChild(tr);
        }
        document.getElementById('load').style.display = 'none';
        document.getElementById('confirm').style.display = 'block';


    }
    render.readAsText(file, "Shift_JIS");
}

function XMLHttpRequestCreate(){
    try{
        return new XMLHttpRequest();
    }catch(e){}
    try{
        return new ActiveXObject('MSXML2.XMLHTTP.6.0');
    }catch(e){}
    try{
        return new ActiveXObject('MSXML2.XMLHTTP.3.0');
    }catch(e){}
    try{
        return new ActiveXObject('MSXML2.XMLHTTP');
    }catch(e){}

    return null;
}

function clickDecide() {
        json = JSON.stringify(quizAndAnswerAndGenre);

        console.log(json);

        var xhr = XMLHttpRequestCreate();
        xhr.open("GET" , "http://192.168.33.254:8000/api/bingos/?format=json");
        xhr.responseType = "json";
        xhr.onreadystatechange = function(event) {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    console.log("success");
                    console.log(xhr.response);
                }
                else {
                    console.log("Error");
                }
            }
        }
        xhr.send();
    
}

function getCSV(data) {
    console.log('getCSV');
    let result = new Array();
    let lines = new Array();
    lines = data.split('\n');
    for (let i = 0; i < lines.length; i++) {
        lines[i] = lines[i].replace('\r', '');
        let cells = lines[i].split(',');
        if(cells.length >= 2) {
            if (cells.length >= 3) {
                if (cells[2].match(/\S/g) !== null) {
                    if (usedGenreList.length == 0) {
                        usedGenreList.push(cells[2]);
                    }
                    else {
                        for (let j = 0; j < usedGenreList.length; j++) {
                            if (cells[2] == usedGenreList[j]) {
                                break;
                            }
                            else if (j == usedGenreList.length - 1) {
                                usedGenreList.push(cells[2]);
                            }
                        }
                    }
                }
            }
            result.push(cells);
        }
    }
    return result;
}
