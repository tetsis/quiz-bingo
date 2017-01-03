let maxNumber = 0;
let flag = Array();
let questionAndAnswerAndGenre = Array();
let quizCounter = 0;
let genreTemplate = ['pink', 'indigo', 'dark-green', 'amber', 'cyan', 'light-green', 'yellow', 'purple', 'deep-orange', 'brown', 'blue-grey'];
let usedGenreList = new Array();
let editFlag = false;
let editQuizNumber = 0;
let addOrUpdateFlag = false;

window.addEventListener('load',
    function (event) {

        //初期化
        init();
        document.getElementById('btnImport').addEventListener('click', clickStart, false);
        document.getElementById('inputCSV').addEventListener('change', changeInputCSV, false);
        document.getElementById('btnDecide').addEventListener('click', clickDecide, false);
        document.getElementById('btnAddTop').addEventListener('click', clickAddTop, false);
        document.getElementById('btnAdd').addEventListener('click', clickAdd, false);
        document.getElementById('btnUpdate').addEventListener('click', clickUpdate, false);
        document.getElementById('btnDelete').addEventListener('click', clickDelete, false);
        document.getElementById('mdlSlctQuizNumber').addEventListener('change', checkAddOrUpdate, false);
        document.getElementById('mdlIptQuestion').addEventListener('change', checkAddOrUpdate, false);
        document.getElementById('mdlIptAnswer').addEventListener('change', checkAddOrUpdate, false);
    }
, false);

function init() {
        document.getElementById('import').style.display = 'block';
        document.getElementById('confirm').style.display = 'block';
        document.getElementById('quizzes').textContent = null;
        let userId = document.getElementById('hdnUserId').value;
        flag = Array();
        questionAndAnswerAndGenre = Array();
        quizCounter = 0;
        usedGenreList = Array();

        let hostname = window.location.hostname;
        let port = window.location.port;
        let url = 'http://' + hostname + ':' + port + '/api/quizzes/?format=json&user=' + userId;
        let xhr = XMLHttpRequestCreate();
        xhr.open("GET" , url);
        xhr.responseType = "json";
        xhr.onreadystatechange = function(event) {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    console.log("success");
                    questionAndAnswerAndGenre = xhr.response;
                    //console.log(xhr.response);
                    //console.log(questionAndAnswerAndGenre);
                    maxNumber = questionAndAnswerAndGenre.length;

                    let quizzes = document.getElementById('quizzes');
                    for (let i = 0; i < maxNumber; i++) {
                        if (questionAndAnswerAndGenre[i].quiz_number == i + 1) {
                            let tr = createQuizRow(questionAndAnswerAndGenre[i].id, questionAndAnswerAndGenre[i].quiz_number, questionAndAnswerAndGenre[i].question, questionAndAnswerAndGenre[i].answer, questionAndAnswerAndGenre[i].genre);
                            quizzes.appendChild(tr);
                        }
        }
                    //json = JSON.stringify(xhr.response);
                    //console.log(json);
                }
                else {
                    console.log("Error");
                }
            }
        }
        xhr.send();
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
        questionAndAnswerAndGenre = getCSV(render.result);
        if (questionAndAnswerAndGenre === null) {
            alert('クイズファイルのフォーマットが正しくありません。');
            return;
        }
        maxNumber = questionAndAnswerAndGenre.length;
        for (let i = 1; i <= maxNumber; i++) {
            flag[i] = false;
        }

        let quizzes = document.getElementById('quizzes');
        for (let i = 0; i < maxNumber; i++) {
            let tr = createQuizRow(i + 1, questionAndAnswerAndGenre[i][0], questionAndAnswerAndGenre[i][1], questionAndAnswerAndGenre[i][2]);

            quizzes.appendChild(tr);
        }
    }
    render.readAsText(file, "Shift_JIS");
}

function createQuizRow(id, quizNumber, question, answer, genre) {
    let tr = document.createElement('tr');
    let hdnId = document.createElement('input');
    let thQuizNumber = document.createElement('th');
    let tdQuestion = document.createElement('td');
    let tdAnswer = document.createElement('td');
    let tdGenre = document.createElement('td');
    let edit = document.createElement('td');
    let button = document.createElement('button');

    hdnId.type = 'hidden';
    hdnId.value = id;
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

    tr.appendChild(hdnId);
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

function clickAddTop() {
    console.log('clickAddTop');
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
    addOrUpdateFlag = true;
    document.getElementById('mdlIptQuestion').value = '';
    document.getElementById('mdlIptAnswer').value = '';
    document.getElementById('mdlIptGenre').value = '';
    document.getElementById('btnUpdate').style.display = 'inline';
    document.getElementById('btnAdd').disabled = true;
    document.getElementById('btnUpdate').style.display = 'none';
    document.getElementById('btnDelete').style.display = 'none';
}

function clickEdit(obj) {
    console.log('clickEdit: obj = ' + obj);
    let tr = obj.parentNode.parentNode;
    let id = tr.childNodes[0].value;
    let quizNumber = tr.childNodes[1].innerHTML;
    let question = tr.childNodes[2].innerHTML;
    let answer = tr.childNodes[3].innerHTML;
    let genre = tr.childNodes[4].innerHTML;
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
    addOrUpdateFlag = false;

    document.getElementById('btnAdd').style.display = 'none';
    document.getElementById('btnUpdate').style.display = 'inline';
    document.getElementById('btnUpdate').disabled = true;
    document.getElementById('btnDelete').style.display = 'inline';
    $('#modal').modal('show');
}

function checkAddOrUpdate() {
    let question = document.getElementById('mdlIptQuestion').value;
    let answer = document.getElementById('mdlIptAnswer').value;
    let flag = false;
    if ((question != "") && (answer != "")) {
        flag = false;
    }
    else {
        flag = true;
    }

    if (addOrUpdateFlag === true) {
        document.getElementById('btnAdd').disabled = flag;
    }
    else {
        document.getElementById('btnUpdate').disabled = flag;
    }
}

function clickAdd() {
    console.log('clickAdd');
    let userId = document.getElementById('hdnUserId').value;
    let mdlSlctQuizNumber = document.getElementById('mdlSlctQuizNumber').value;
    let mdlIptQuestion = document.getElementById('mdlIptQuestion').value;
    let mdlIptAnswer = document.getElementById('mdlIptAnswer').value;
    let mdlIptGenre = document.getElementById('mdlIptGenre').value;
    let tbody = document.getElementById('quizzes');

    let tr = tbody.childNodes[mdlSlctQuizNumber - 1];
    let newTr = createQuizRow(userId, mdlSlctQuizNumber, mdlIptQuestion, mdlIptAnswer, mdlIptGenre);

    tbody.insertBefore(newTr, tr);

    updateQuizNumber();

    //POST to server
        let hostname = window.location.hostname;
        let port = window.location.port;
        let url = 'http://' + hostname + ':' + port + '/api/quizzes/';
        let data = {
            user: userId,
            quiz_number: mdlSlctQuizNumber,
            question: mdlIptQuestion,
            answer: mdlIptAnswer,
            genre: mdlIptGenre,
            solved: false
        };
        data = JSON.stringify(data);
        console.log(data);
        let xhr = XMLHttpRequestCreate();
        xhr.open("POST" , url);
        xhr.setRequestHeader("Content-Type" , "application/json");
        xhr.setRequestHeader("X-CSRFToken", getCookie('csrftoken'));
        xhr.onreadystatechange = function(event) {
            if (xhr.readyState == 4) {
                console.log(xhr.status);
                if (xhr.status == 200 || xhr.status == 201) {
                    console.log("success");
                    //console.log(xhr.responseText);
                }
                else {
                    console.log("Error");
                    //console.log(xhr.responseText);
                }
            }
        }
        xhr.send(data);


    $('#modal').modal('hide');
}

function clickUpdate() {
    console.log('clickUpdate');
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
        let thQuizNumber = document.getElementById('quizzes').childNodes[i].childNodes[1];
        thQuizNumber.innerHTML = i + 1;
    }
}

function clickDelete() {
    console.log('clickDelete');
    let tbody = document.getElementById('quizzes');
    let trEdit = tbody.childNodes[editQuizNumber - 1];
    tbody.removeChild(trEdit);
    editFlag = false;
    updateQuizNumber();

    $('#modal').modal('hide');
}

function clickDecide() {
    let tbody = document.getElementById('quizzes');
    let maxNumber = tbody.childElementCount;
    questionAndAnswerAndGenre = Array();
    for (let i = 0; i < maxNumber; i++) {
        let tr = tbody.childNodes[i];
        let id = tr.childNodes[0].value;
        let quizNumber = tr.childNodes[1].innerHTML;
        quizNumber = parseInt(quizNumber, 10);
        let question = tr.childNodes[2].innerHTML;
        let answer = tr.childNodes[3].innerHTML;
        let genre = tr.childNodes[4].innerHTML;
        let quiz = Array(quizNumber, question, answer, genre);
        questionAndAnswerAndGenre.push(quiz);
    }

        json = JSON.stringify(questionAndAnswerAndGenre);

        console.log(json);

        var xhr = XMLHttpRequestCreate();
        xhr.open("GET" , "http://192.168.33.254:8000/api/bingos/?format=json");
        xhr.responseType = "json";
        xhr.onreadystatechange = function(event) {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    console.log("success");
                    console.log(xhr.response);
                    json = JSON.stringify(xhr.response);
                    console.log(json);
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

function getCookie( name )
{
    var result = null;

    var cookieName = name + '=';
    var allcookies = document.cookie;

    var position = allcookies.indexOf( cookieName );
    if( position != -1 )
    {
        var startIndex = position + cookieName.length;

        var endIndex = allcookies.indexOf( ';', startIndex );
        if( endIndex == -1 )
        {
            endIndex = allcookies.length;
        }

        result = decodeURIComponent(
                allcookies.substring( startIndex, endIndex ) );
    }

    return result;
}
