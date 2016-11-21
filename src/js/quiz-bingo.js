
window.addEventListener('load',
    function (event) {
        var buttons = document.getElementsByClassName('btn-main');
        for (var i = 0; i < buttons.length; i++) {
            buttons[i].addEventListener('click', clickButton, false);
        }
    }
, false);


function clickButton() {
    this.className = 'btn btn-raised btn-info btn-main';
}
