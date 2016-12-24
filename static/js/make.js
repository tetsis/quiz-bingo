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
        document.getElementById('inputCSV').addEventListener('change', changeInputCSV, false);
    }
, false);

function init() {
        document.getElementById('load').style.display = 'block';
        document.getElementById('result').style.display = 'none';
        document.getElementById('result').textContent = null;
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

        json = JSON.stringify(quizAndAnswerAndGenre);

        console.log(json);
    }

    render.readAsText(file, "Shift_JIS");

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
