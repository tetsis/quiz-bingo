let maxNumber = 0;
let flag = Array();
let quizAndAnswer = Array();
let quizCounter = 0;

window.addEventListener('load',
    function (event) {

        //初期化
        document.getElementById('start').style.display = 'block';
        document.getElementById('running').style.display = 'none';
        document.getElementById('btnStart').addEventListener('click', clickStart, false);
        document.getElementById('inputCSV').addEventListener('change', changeInputCSV, false);

    }
, false);

function generateButtons() {
    let buttons = document.getElementById('buttons');
    for (let i = 0; i < (maxNumber/10); i++) {
        let tr = document.createElement('tr');
        for (let j = 1; j <= 10; j++) {
            let number = i * 10 + j;
            let td = document.createElement('td');
            let button = document.createElement('button');
            if (number > maxNumber) {
                break;
            }
            button.type = 'button';
            button.id = 'button' + number;
            button.className = 'btn btn-raised btn-outline-default waves-effect btn_quiz';
            button.innerHTML = number;
            button.addEventListener('click', function(){clickButton(number)}, false);
            td.appendChild(button);
            tr.appendChild(td);
        }
        buttons.appendChild(tr);
    }
}

function generateQuizzes() {
    for (let i = 1; i <= maxNumber; i++) {
        let quiz = document.createElement('div');
        let modalDialog = document.createElement('div');
        let modalContent = document.createElement('div');
        let modalHeader = document.createElement('div');
        let modalBody = document.createElement('div');
        let modalFooter = document.createElement('div');
        let header = document.createElement('h2');
        let quizBody = document.createElement('div');
        let answerButton = document.createElement('button');
        let collapse = document.createElement('div');
        let answerBody = document.createElement('div');
        let okButton = document.createElement('button');
        quiz.id = 'quiz' + i;
        quiz.className = 'modal fade';
        quiz.tabindex = '-1';
        modalDialog.className = 'modal-dialog modal-lg';
        modalContent.className = 'modal-content';
        modalHeader.className = 'modal-header';
        modalBody.className = 'modal-body';
        modalFooter.id = 'modalFooter' + i;
        modalFooter.className = 'modal-footer';

        header.innerHTML = 'QUIZ No.' + i;
        modalHeader.appendChild(header);
        modalContent.appendChild(modalHeader);

        quizBody.id = 'quizBody' + i;
        quizBody.className = 'well sentence';
        quizBody.innerHTML = quizAndAnswer[i - 1][0];
        modalBody.appendChild(quizBody);

        answerButton.type = 'button';
        answerButton.id = 'answerButton' + i;
        answerButton.className = 'btn btn-raised btn-default waves-effect btn_answer';
        answerButton.innerHTML = 'ANSWER';
        answerButton.addEventListener('click', function(){clickAnswer(i)}, false);
        modalBody.appendChild(answerButton);

        collapse.id = 'collapse' + i;
        collapse.className = 'collapse';
        answerBody.id = 'answerBody' + i;
        answerBody.className = 'well sentence';
        answerBody.innerHTML = quizAndAnswer[i - 1][1];
        collapse.appendChild(answerBody);
        modalBody.appendChild(collapse);
        modalContent.appendChild(modalBody);

        okButton.type = 'button';
        okButton.id = 'okButton' + i;
        okButton.className = 'btn btn-outline-default waves-effect btn_result';
        okButton.innerHTML = 'OK';
        okButton.addEventListener('click', function(){clickOk(i)}, false);
        modalFooter.appendChild(okButton);
        modalContent.appendChild(modalFooter);

        modalDialog.appendChild(modalContent);
        quiz.appendChild(modalDialog);
        quizzes.appendChild(quiz);
    }
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

    render.onload = function(event) {
        quizAndAnswer = getCSV(render.result);
        maxNumber = quizAndAnswer.length;
        for (let i = 1; i <= maxNumber; i++) {
            flag[i] = false;
        }
        //ボタン生成
        generateButtons();
        //クイズ生成
        generateQuizzes();
        document.getElementById('start').style.display = 'none';
        document.getElementById('running').style.display = 'block';
    }

    render.readAsText(file, "Shift_JIS");
}

function clickButton(number) {
    console.log('clickButton');
    let button = document.getElementById('button' + number);
    let quizBody = document.getElementById('quizBody' + number);
    let answerBody = document.getElementById('answerBody' + number);
    let modalFooter = document.getElementById('modalFooter' + number);
    if (flag[number] == false) {
        modalFooter.style.display = 'none';
        $('#collapse' + number).collapse('hide');
        $('#quiz' + number).modal('show');
    }
}

function clickAnswer(number) {
    console.log('clickAnswer');
    let modalFooter = document.getElementById('modalFooter' + number);
    $('#collapse' + number).collapse('show');
    modalFooter.style.display = 'block';
    let button = document.getElementById('button' + number);
    button.className = 'btn btn-raised btn-default waves-effect btn_quiz';
    flag[number] = true;
}

function clickOk(number) {
    console.log('clickOk');
    $('#quiz' + number).modal('hide');
}

function getCSV(data) {
    console.log('getCSV');
    let result = new Array();
    let lines = new Array();
    lines = data.split('\n');
    for (let i = 0; i < lines.length; i++) {
        let cells = lines[i].split(",");
        if(cells.length == 2) {
            result.push(cells);
        }
    }
    return result;
}
