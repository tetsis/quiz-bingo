
let maxNumber = 75;
let flag = Array();
let answerFlag = false;

window.addEventListener('load',
    function (event) {

        //初期化
        document.getElementById('start').style.display = 'block';
        document.getElementById('running').style.display = 'none';
        document.getElementById('btnStart').addEventListener('click', clickStart, false);
        for (let i = 1; i <= maxNumber; i++) {
            flag[i] = false;
        }

        //ボタン生成
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
                button.className = 'btn btn-raised btn-default btn_main';
                button.innerHTML = number;
                button.addEventListener('click', function(){clickButton(number)}, false);
                td.appendChild(button);
                tr.appendChild(td);
            }
            buttons.appendChild(tr);
        }

        //クイズ生成
        let quizzes = document.getElementById('quizzes');
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
            let mistakeButton = document.createElement('button');
            let correctButton = document.createElement('button');
            quiz.id = 'quiz' + i;
            quiz.className = 'modal fade';
            quiz.tabindex = '-1';
            modalDialog.className = 'modal-dialog modal-lg';
            modalContent.className = 'modal-content';
            modalHeader.className = 'modal-header';
            modalBody.className = 'modal-body';
            modalFooter.id = 'modalFooter' + i;
            modalFooter.className = 'modal-footer';

            header.innerHTML = 'QUIZ ' + i;
            modalHeader.appendChild(header);
            modalContent.appendChild(modalHeader);

            quizBody.className = 'well sentence';
            quizBody.innerHTML = 'No.' + i + ' question sentence is written here.';
            modalBody.appendChild(quizBody);

            answerButton.type = 'button';
            answerButton.id = 'answerButton' + i;
            answerButton.className = 'btn btn-raised btn-success btn_answer';
            answerButton.innerHTML = 'ANSWER';
            answerButton.addEventListener('click', function(){clickAnswer(i)}, false);
            modalBody.appendChild(answerButton);

            collapse.id = 'collapse' + i;
            collapse.className = 'collapse';
            answerBody.id = 'answerBody' + i;
            answerBody.className = 'well sentence';
            answerBody.innerHTML = 'No.' + i + ' answer sentence is written here when ANSWER button is clicked. answer sentence is written here when ANSWER button is clicked.';
            collapse.appendChild(answerBody);
            modalBody.appendChild(collapse);
            modalContent.appendChild(modalBody);

            mistakeButton.type = 'button';
            mistakeButton.id = 'mistakeButton' + i;
            mistakeButton.className = 'btn btn-default btn_result';
            mistakeButton.innerHTML = 'MISTAKE';
            mistakeButton.addEventListener('click', function(){clickMistake(i)}, false);
            modalFooter.appendChild(mistakeButton);

            correctButton.type = 'button';
            correctButton.id = 'correctButton' + i;
            correctButton.className = 'btn btn-primary btn_result';
            correctButton.innerHTML = 'CORRECT';
            correctButton.addEventListener('click', function(){clickCorrect(i)}, false);
            modalFooter.appendChild(correctButton);
            modalContent.appendChild(modalFooter);

            modalDialog.appendChild(modalContent);
            quiz.appendChild(modalDialog);
            quizzes.appendChild(quiz);
        }
    }
, false);

function clickStart() {
    console.log('clickStart');
    document.getElementById('start').style.display = 'none';
    document.getElementById('running').style.display = 'block';
}

function clickButton(number) {
    console.log(number);
    let button = document.getElementById('button' + number);
    let modalFooter = document.getElementById('modalFooter' + number);
    if (flag[number] == false) {
        modalFooter.style.display = 'none';
        answerFlag = false;
        $('#collapse' + number).collapse('hide');
        $('#quiz' + number).modal('show');
    }
    else {
        button.className = 'btn btn-raised btn-default btn_main';
        flag[number] = false;
    }
}

function clickAnswer(number) {
    console.log('clickAnswer');
    let modalFooter = document.getElementById('modalFooter' + number);
    if (answerFlag == false) {
        $('#collapse' + number).collapse('show');
        modalFooter.style.display = 'block';
        answerFlag = true;
    }
}

function clickMistake(number) {
    console.log('clickMistake');
    let button = document.getElementById('button' + number);
    button.className = 'btn btn-raised btn-warning btn_main';
    $('#quiz' + number).modal('hide');
    flag[number] = true;
}

function clickCorrect(number) {
    console.log('clickCorrect');
    let button = document.getElementById('button' + number);
    button.className = 'btn btn-raised btn-info btn_main';
    $('#quiz' + number).modal('hide');
    flag[number] = true;
}
