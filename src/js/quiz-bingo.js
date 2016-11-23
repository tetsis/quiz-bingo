let maxNumber = 75;
let flag = Array();
let quizAndAnswer = Array();
let quizCounter = 0;

window.addEventListener('load',
    function (event) {

        //初期化
        document.getElementById('start').style.display = 'block';
        document.getElementById('running').style.display = 'none';
        document.getElementById('btnStart').addEventListener('click', clickStart, false);
        for (let i = 1; i <= maxNumber; i++) {
            flag[i] = false;
        }
        quizAndAnswer = getCSV('quiz.csv');

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
                button.className = 'btn btn-raised btn-outline-default waves-effect btn_quiz';
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

            header.innerHTML = 'QUIZ No.' + i;
            modalHeader.appendChild(header);
            modalContent.appendChild(modalHeader);

            quizBody.id = 'quizBody' + i;
            quizBody.className = 'well sentence';
            quizBody.innerHTML = 'No.' + i + ' quiz sentence is written here. Once you know the answer to this quiz, please click ANSWER button.';
            modalBody.appendChild(quizBody);

            answerButton.type = 'button';
            answerButton.id = 'answerButton' + i;
            answerButton.className = 'btn btn-raised btn-success waves-effect btn_answer';
            answerButton.innerHTML = 'ANSWER';
            answerButton.addEventListener('click', function(){clickAnswer(i)}, false);
            modalBody.appendChild(answerButton);

            collapse.id = 'collapse' + i;
            collapse.className = 'collapse';
            answerBody.id = 'answerBody' + i;
            answerBody.className = 'well sentence';
            answerBody.innerHTML = 'No.' + i + ' answer sentence is written here when ANSWER button is clicked. This section appears using "collapse" function of Material Design for Bootstrap.';
            collapse.appendChild(answerBody);
            modalBody.appendChild(collapse);
            modalContent.appendChild(modalBody);

            mistakeButton.type = 'button';
            mistakeButton.id = 'mistakeButton' + i;
            mistakeButton.className = 'btn btn-outline-danger waves-effect btn_result';
            mistakeButton.innerHTML = 'MISTAKE';
            mistakeButton.addEventListener('click', function(){clickMistake(i)}, false);
            modalFooter.appendChild(mistakeButton);

            correctButton.type = 'button';
            correctButton.id = 'correctButton' + i;
            correctButton.className = 'btn btn-outline-info waves-effect btn_result';
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
    let quizBody = document.getElementById('quizBody' + number);
    let answerBody = document.getElementById('answerBody' + number);
    let modalFooter = document.getElementById('modalFooter' + number);
    if (flag[number] == false) {
        if (quizAndAnswer.length > quizCounter) {
            quizBody.innerHTML = quizAndAnswer[quizCounter][0];
            answerBody.innerHTML = quizAndAnswer[quizCounter][1];
        }
        quizCounter++;
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
}

function clickMistake(number) {
    console.log('clickMistake');
    let button = document.getElementById('button' + number);
    button.className = 'btn btn-raised btn-danger waves-effect btn_quiz';
    $('#quiz' + number).modal('hide');
    flag[number] = true;
}

function clickCorrect(number) {
    console.log('clickCorrect');
    let button = document.getElementById('button' + number);
    button.className = 'btn btn-raised btn-info waves-effect btn_quiz';
    $('#quiz' + number).modal('hide');
    flag[number] = true;
}

function getCSV(filename) {
    console.log('getCSV');
    let result = new Array();
    let req = new XMLHttpRequest();
    let lines = new Array();
    req.open("get", filename, false);
    req.overrideMimeType('text/plain; charset=Shift_JIS');
    req.send(null);
    lines = req.responseText.split('\n');
    for (let i = 0; i < lines.length; i++) {
        let cells = lines[i].split(",");
        if( cells.length != 1 ) {
            result.push(cells);
        }
    }
    return result;
}
