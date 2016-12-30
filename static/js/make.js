let maxNumber = 0;
let flag = Array();
let quizAndAnswerAndGenre = Array();
let quizCounter = 0;
let genreTemplate = ['pink', 'indigo', 'dark-green', 'amber', 'cyan', 'light-green', 'yellow', 'purple', 'deep-orange', 'brown', 'blue-grey'];
let usedGenreList = new Array();
let editFlag = false;
let editQuizNumber = 0;

window.addEventListener('load',
    function (event) {

        //初期化
        init();
        document.getElementById('btnLoad').addEventListener('click', clickStart, false);
        document.getElementById('inputCSV').addEventListener('change', changeInputCSV, false);
        document.getElementById('btnDecide').addEventListener('click', clickDecide, false);
        document.getElementById('btnAddButton').addEventListener('click', clickAdd, false);
        document.getElementById('btnAddTop').addEventListener('click', clickAdd, false);
        document.getElementById('btnAddOrUpdate').addEventListener('click', clickAddOrUpdate, false);
        document.getElementById('btnDelete').addEventListener('click', clickDelete, false);
        document.getElementById('mdlSlctQuizNumber').addEventListener('change', checkAddOrUpdate, false);
        document.getElementById('mdlIptQuestion').addEventListener('change', checkAddOrUpdate, false);
        document.getElementById('mdlIptAnswer').addEventListener('change', checkAddOrUpdate, false);
        document.getElementById('txtName').addEventListener('change', checkDecide, false);
        document.getElementById('txtPassword').addEventListener('change', checkDecide, false);
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
            let tr = createQuizRow(i + 1, quizAndAnswerAndGenre[i][0], quizAndAnswerAndGenre[i][1], quizAndAnswerAndGenre[i][2]);

            quizzes.appendChild(tr);
        }
        document.getElementById('load').style.display = 'none';
        document.getElementById('confirm').style.display = 'block';


    }
    render.readAsText(file, "Shift_JIS");
}

function createQuizRow(quizNumber, question, answer, genre) {
    let tr = document.createElement('tr');
    let thQuizNumber = document.createElement('th');
    let tdQuestion = document.createElement('td');
    let tdAnswer = document.createElement('td');
    let tdGenre = document.createElement('td');
    let edit = document.createElement('td');
    let button = document.createElement('button');

    thQuizNumber.scope = 'row';
    thQuizNumber.innerHTML = quizNumber;
    tdQuestion.innerHTML = question;
    tdAnswer.innerHTML = answer;
    tdGenre.innerHTML = genre;
    button.type = 'button';
    button.id = 'button' + quizNumber;
    button.className = 'btn btn-raised waves-effect btn-primary btn-sm';
    button.innerHTML = 'edit';
    button.addEventListener('click', function(){clickEdit(this)}, false);
    edit.appendChild(button);

    tr.appendChild(thQuizNumber);
    tr.appendChild(tdQuestion);
    tr.appendChild(tdAnswer);
    tr.appendChild(tdGenre);
    tr.appendChild(edit);

    return tr;
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

function clickAdd() {
    console.log('clickAdd');
    let select = document.getElementById('mdlSlctQuizNumber');
    select.textContent = null;
    let maxNumber = document.getElementById('quizzes').childElementCount;
    for (let i = 1; i <= (maxNumber + 1); i++) {
        let option = document.createElement('option');
        option.innerHTML = i;
        if (i === (maxNumber + 1)) {
            option.selected = true;
        }
        select.appendChild(option);
    }
    document.getElementById('mdlIptQuestion').value = '';
    document.getElementById('mdlIptAnswer').value = '';
    document.getElementById('mdlIptGenre').value = '';
    document.getElementById('btnAddOrUpdate').innerHTML = 'add';
    document.getElementById('btnAddOrUpdate').disabled = true;
    document.getElementById('btnDelete').style.display = 'none';
}

function clickEdit(obj) {
    console.log('clickEdit: obj = ' + obj);
    let tr = obj.parentNode.parentNode;
    let quizNumber = tr.childNodes[0].innerHTML;
    let question = tr.childNodes[1].innerHTML;
    let answer = tr.childNodes[2].innerHTML;
    let genre = tr.childNodes[3].innerHTML;
    let select = document.getElementById('mdlSlctQuizNumber');
    let maxNumber = document.getElementById('quizzes').childElementCount;
    select.textContent = null;
    quizNumber = parseInt(quizNumber, 10);
    for (let i = 1; i <= maxNumber; i++) {
        let option = document.createElement('option');
        option.innerHTML = i;
        if (i === quizNumber) {
            option.selected = true;
        }
        select.appendChild(option);
    }
    document.getElementById('mdlIptQuestion').value = question;
    document.getElementById('mdlIptAnswer').value = answer;
    document.getElementById('mdlIptGenre').value = genre;
    editFlag = true;
    editQuizNumber = quizNumber;

    document.getElementById('btnAddOrUpdate').innerHTML = 'update';
    document.getElementById('btnAddOrUpdate').disabled = true;
    document.getElementById('btnDelete').style.display = 'inline';
    $('#modal').modal('show');
}

function checkAddOrUpdate() {
    let question = document.getElementById('mdlIptQuestion').value;
    let answer = document.getElementById('mdlIptAnswer').value;
    if ((question != "") && (answer != "")) {
        document.getElementById('btnAddOrUpdate').disabled = false;
    }
    else {
        document.getElementById('btnAddOrUpdate').disabled = true;
    }
}

function checkDecide() {
    let name = document.getElementById('txtName').value;
    let password = document.getElementById('txtPassword').value;
    if ((name != "") && (password != "")) {
        document.getElementById('btnDecide').disabled = false;
    }
    else {
        document.getElementById('btnDecide').disabled = true;
    }
}

function clickAddOrUpdate() {
    console.log('clickAddOrUpdate');
    let mdlSlctQuizNumber = document.getElementById('mdlSlctQuizNumber').value;
    let mdlIptQuestion = document.getElementById('mdlIptQuestion').value;
    let mdlIptAnswer = document.getElementById('mdlIptAnswer').value;
    let mdlIptGenre = document.getElementById('mdlIptGenre').value;
    let tbody = document.getElementById('quizzes');

    if (editFlag === true) {
        let trEdit = tbody.childNodes[editQuizNumber - 1];
        tbody.removeChild(trEdit);
        editFlag = false;
    }

    let tr = tbody.childNodes[mdlSlctQuizNumber - 1];
    let newTr = createQuizRow(mdlSlctQuizNumber, mdlIptQuestion, mdlIptAnswer, mdlIptGenre);

    tbody.insertBefore(newTr, tr);

    updateQuizNumber();

    $('#modal').modal('hide');
}

function updateQuizNumber() {
    console.log('updateQuizNumber');
    let maxNumber = document.getElementById('quizzes').childElementCount;
    for (let i = 0; i < maxNumber; i++) {
        let thQuizNumber = document.getElementById('quizzes').childNodes[i].childNodes[0];
        thQuizNumber.innerHTML = i + 1;
    }
}

function clickDelete() {
    console.log('clickDelete');
    console.log('editQuizNumber = ');
    console.log(editQuizNumber);
    let tbody = document.getElementById('quizzes');
    console.log('tbody = ');
    console.log(tbody);
    let trEdit = tbody.childNodes[editQuizNumber - 1];
    console.log('trEdit = ');
    console.log(trEdit);
    tbody.removeChild(trEdit);
    console.log('tbody = ');
    console.log(tbody);
    editFlag = false;
    updateQuizNumber();

    $('#modal').modal('hide');
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
