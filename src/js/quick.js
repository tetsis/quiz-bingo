let maxNumber = 0;
let flag = Array();
let answerSelection = Array();
let quizAndAnswer = Array();
let quizAndAnswerAndGenre = Array();
let quizCounter = 0;
let genreTemplate = ['pink', 'indigo', 'dark-green', 'amber', 'cyan', 'light-green', 'yellow', 'purple', 'deep-orange', 'brown', 'blue-grey'];
let usedGenreList = new Array();
const QUIZ_ROWNUM = 1;
const SELECTION_ROWSTART = 2;
const SELECTION_ROWEND = 5;
const ANSWER_ROWNUM = 6;
const GENRE_ROWNUM = 7;

window.addEventListener('load',
    function (event) {

        //初期化
        init();
        document.getElementById('btnQuit').addEventListener('click', clickQuit, false);
        document.getElementById('btnLoadOfQuickStart').addEventListener('click', clickStart, false);
        document.getElementById('inputCSV').addEventListener('change', changeInputCSV, false);
    }
, false);

function init() {
        document.getElementById('start').style.display = 'block';
        document.getElementById('running').style.display = 'none';
        document.getElementById('menu').style.display = 'none';
        document.getElementById('buttons').textContent = null;
        document.getElementById('genres').textContent = null;
        document.getElementById('quizzes').textContent = null;
}

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
            button.className = 'btn btn-raised waves-effect btn_quiz btn_quiz_before_answer';
            if (quizAndAnswerAndGenre[number - 1].length >= GENRE_ROWNUM - 1) {
                if (quizAndAnswerAndGenre[number - 1][GENRE_ROWNUM - 1].match(/\S/g) !== null) {
                    for (let k = 0; k < usedGenreList.length; k++) {
                        if (quizAndAnswerAndGenre[number - 1][GENRE_ROWNUM - 1] == usedGenreList[k]) {
                            button.className += ' btn-' + genreTemplate[k];
                        }
                    }
                }
                else {
                    button.className += ' btn-default';
                }
            }
            button.innerHTML = number;
            button.addEventListener('click', function(){clickButton(number)}, false);
            td.appendChild(button);
            tr.appendChild(td);
        }
        buttons.appendChild(tr);
    }
}

function generateQuizzes() {
    let quizzes = document.getElementById('quizzes');
    for (let i = 1; i <= maxNumber; i++) {
        let quiz = document.createElement('div');
        let modalDialog = document.createElement('div');
        let modalContent = document.createElement('div');
        let modalHeader = document.createElement('div');
        let modalBody = document.createElement('div');
        let modalFooter = document.createElement('div');
        let header = document.createElement('h2');
        let closeButton = document.createElement('button');
        let quizBody = document.createElement('div');
        let answerSelects = [];
        for(let j = 1; j <= SELECTION_ROWEND - SELECTION_ROWSTART + 1; j++){
          answerSelects.push(document.createElement('button'));
        }
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
        quizBody.innerHTML = quizAndAnswerAndGenre[i - 1][QUIZ_ROWNUM - 1] + '<br>' + 'Answer is ' + quizAndAnswerAndGenre[i - 1][ANSWER_ROWNUM - 1];
        modalBody.appendChild(quizBody);

        for(let j = 1; j <= SELECTION_ROWEND - SELECTION_ROWSTART + 1; j++){
          let answerSelect = answerSelects[j - 1];
          answerSelect.type = 'button';
          answerSelect.id = 'answerButton' + i + '-' + j;
          answerSelect.className = 'btn btn-raised btn-outline-default waves-effect btn_answer_select';
          answerSelect.innerHTML = j + ' : ' + quizAndAnswerAndGenre[i - 1][j - 1 + SELECTION_ROWSTART - 1];
          answerSelect.addEventListener('click', function(){selectAnswer(i, j)}, false);
          modalBody.appendChild(answerSelect);
        }

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
        answerBody.innerHTML = 'Answer is ' + quizAndAnswerAndGenre[i - 1][ANSWER_ROWNUM - 1];
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

function generateGenres() {
    let genres = document.getElementById('genres');
    let table = document.createElement('table');
    for (let i = 0; i < usedGenreList.length; i++) {
        let tr = document.createElement('tr');
        let tdButton = document.createElement('td');
        let tdGenre = document.createElement('td');
        let button = document.createElement('button');
        let genre = document.createElement('div');

        tdButton.className = 'td_genre';
        tdGenre.className = 'td_genre';

        button.type = 'button';
        button.className = 'btn waves-effect btn_quiz btn_quiz_before_answer';
        button.className += ' btn-' + genreTemplate[i];
        tdButton.appendChild(button);
        tr.appendChild(tdButton);

        genre.className = 'txt_genre';
        genre.innerHTML = ' : ' + usedGenreList[i];
        tdGenre.appendChild(genre);
        tr.appendChild(tdGenre);

        table.appendChild(tr);
    }
    genres.appendChild(table);
}

function clickQuit() {
    init();
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
        quizAndAnswerAndGenre = getCSV(render.result);
        if (quizAndAnswerAndGenre === null) {
            alert('クイズファイルのフォーマットが正しくありません。');
            return;
        }
        //maxNumber = quizAndAnswer.length;
        maxNumber = quizAndAnswerAndGenre.length;
        for (let i = 1; i <= maxNumber; i++) {
            flag[i] = false;
        }
        //ボタン生成
        generateButtons();
        //クイズ生成
        generateQuizzes();
        //ジャンル生成
        generateGenres();
        document.getElementById('start').style.display = 'none';
        document.getElementById('running').style.display = 'block';
        document.getElementById('menu').style.display = 'block';
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

// 選択した選択肢のボタン表示を変更する
// selectionNumberに範囲外の数字をを入れるとリセットされる
function selectAnswer(quizNumber, selectionNumber){
    for (let j = 1; j <= SELECTION_ROWEND - SELECTION_ROWSTART + 1; j++) {
      let answerSelect = document.getElementById('answerButton' + quizNumber + '-' + j);
      if (j == selectionNumber) {
        answerSelect.classList.add('selected');
        answerSelect.classList.add('btn-primary');
        answerSelect.classList.remove('btn-outline-default');
      } else {
        answerSelect.classList.add('btn-outline-default');
        answerSelect.classList.remove('selected');
        answerSelect.classList.remove('btn-primary');
        
      }
    }
    answerSelection[quizNumber] = selectionNumber;
}

function clickAnswer(number) {
    console.log('clickAnswer');
    let answerButton = document.getElementById('answerButton' + number);
    let answerBody = document.getElementById('answerBody' + number);
    let modalFooter = document.getElementById('modalFooter' + number);
    // ボタンの無効化
    answerButton.disabled = true;
    for (let j = 1; j <= SELECTION_ROWEND - SELECTION_ROWSTART + 1; j++) {
      if (j !== answerSelection[number]) {
        let answerSelect = document.getElementById('answerButton' + number + '-' + j);
        answerSelect.disabled = true;
      }
    }
    // 正解・不正解の時の処理
    // ボタンの変更＆結果の格納
    if (answerSelection[number] == Number(quizAndAnswerAndGenre[number - 1][ANSWER_ROWNUM - 1])) {
      let button = document.getElementById('button' + number);
      button.className = 'btn btn-raised btn-outline-default waves-effect btn_quiz btn_quiz_after_answer';
      answerBody.innerHTML = '正解！';
      flag[number] = true;
    } else {
      answerBody.innerHTML = '不正解！';
      answerSelection[number] = '';
    }
    // 結果の表示
    $('#collapse' + number).collapse('show');
    modalFooter.style.display = 'block';
}

function clickOk(number) {
    console.log('clickOk');
    $('#quiz' + number).modal('hide');
    // 不正解だった場合はボタンの無効化を解除
    if (!flag[number]) {
      let answerButton = document.getElementById('answerButton' + number);
      answerButton.disabled = false;
      selectAnswer(number, 0);
      for (let j = 1; j <= SELECTION_ROWEND - SELECTION_ROWSTART + 1; j++) {
        let answerSelect = document.getElementById('answerButton' + number + '-' + j);
        answerSelect.disabled = false;
      }
    }
}

function getCSV(data) {
    console.log('getCSV');
    let result = new Array();
    let lines = new Array();
    lines = data.split('\n');
    for (let i = 0; i < lines.length; i++) {
        let cells = lines[i].split(",");
        if(cells.length >= ANSWER_ROWNUM) {
            if (cells.length >= GENRE_ROWNUM) {
                if (cells[GENRE_ROWNUM - 1].match(/\S/g) !== null) {
                    if (usedGenreList.length == 0) {
                        usedGenreList.push(cells[GENRE_ROWNUM - 1]);
                    }
                    else {
                        for (let j = 0; j < usedGenreList.length; j++) {
                            if (cells[GENRE_ROWNUM - 1] == usedGenreList[j]) {
                                break;
                            }
                            else if (j == usedGenreList.length - 1) {
                                usedGenreList.push(cells[GENRE_ROWNUM - 1]);
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
