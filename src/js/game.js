var autoPlayIndex = 0;

function gameStart() {

    if (vueData.gamePlayInfo.time != 60) {
        location.reload();
    } else {
        timeFunc();
        //changeColor
        var array = vueData.buttons;
        for (var i = 0; i < array.length; i += 1) {
            for (var j = 0; j < array[i].length; j += 1) {
                array[i][j].color = getRandomColor();
            }
        }
        vueData.pageState = 'gameStart';
    }
}

function getRandomColor() {
    var color = [
        'red',
        'blue',
        'yellow'
    ];
    var resultColor = '';
    resultColor = color[Math.floor(Math.random() * 3)];

    return resultColor;
}

function timeFunc() {
    setTimeout(function () {
        if (vueData.gamePlayInfo.time >= 1) {
            // if(vueData.gamePlayInfo.time >= 59){
            vueData.gamePlayInfo.time -= 1;
            timeFunc();
        } else {
            var userId = localStorage.getItem("userId");
            var selectUser = getUserInfo(userId);
            // alert('당신의 점수는 : '+ comma(vueData.gamePlayInfo.score) + '점 입니다.');
            var score = comma(vueData.gamePlayInfo.score);
            score = String(score).replace(/,/gi, '');
            score = parseInt(score);

            if (autoPlayIndex > 3) {
                autoPlayIndex = 0;
                changeView('rank');
                return false;
            }
            writeUserData({
                id: userId,
                score: score,
                cb: function () {

                    getDataBase(function () {
                        var selectUser = getUserInfo(userId);
                        if (selectUser === undefined) {
                            alert('아이디가 없습니다.');
                        }
                        vueData.gamePlayInfo.bonus = selectUser.bonus;
                        vueData.gamePlayInfo.exe = selectUser.exe;
                        vueData.gamePlayInfo.level = selectUser.level;
                        vueData.gamePlayInfo.rank = selectUser.rank;
                        vueData.pageState = 'gameEnd';
                    });

                }
            });

            //vueData.showModal = true;
            //var answer = window.prompt("저장할 유저 이름을 입력하세요.", "닉네임");
            //if(answer){
            //    writeUserData(answer,score);
            //}
            //location.reload();
        }
    }, 1000);
}

function getComboScore() {
    var result = 1;
    result = (vueData.gamePlayInfo.combo / 100);

    if (result < 1.0) {
        result += 1;
    }

    return result;
}

function getRandomColor() {
    var color = [
        'red',
        'blue',
        'yellow'
    ];

    var resultColor = '';

    resultColor = color[Math.floor(Math.random() * 3)];

    return resultColor;
}
function scoreSave() {
    var userName = $('.userNameInput').val();
    if (userName !== '') {
        writeUserData(userName, comma(vueData.gamePlayInfo.score));
    } else {
        alert('유저이름을 입력하세요.');

        setTimeout(function () {
            vueData.showModal = true;
        }, 500);
    }
}
function reloadBtn(selectedIndex) {
    var selectedObj = vueData.buttons[selectedIndex.rowIndex][selectedIndex.index];
    //selectedObj.text= "";
    selectedObj.state = "none";
    selectedObj.styleClass = "none";
    var tl = new TimelineMax();
    var $btnObj = $('.rowIndex-' + selectedIndex.rowIndex + ' .buttonIndex-' + selectedIndex.index + ' .inner.text');
    tl.set($btnObj, {
        scale: 0.1
    });

    tl.to($btnObj, 1, {
        scale: 1,
        onStart: function () {
            changeStep(selectedObj, 'step1');
            selectedObj.color = getRandomColor();
            selectedObj.state = "wait";
        },
        onComplete: function () { }
    });
}

function changeStep(btnObj, step) {
    switch (step) {
        case 'step1':
            btnObj.styleClass = 'step1';
            btnObj.text = '7';
            break;
        case 'step2':
            btnObj.styleClass = 'step2';
            btnObj.text = '77';
            break;
        case 'step3':
            btnObj.styleClass = 'step3';
            btnObj.text = '★';
            break;
        case 'complete':
            btnObj.text = '7';
            break;
        default:
            alert('StepChange error!');
            break;

    }
}

function getRandomColor() {
    var color = [
        'red',
        'blue',
        'yellow'
    ];

    var resultColor = '';

    resultColor = color[Math.floor(Math.random() * 3)];

    return resultColor;
}

function getComboScore() {
    var result = 1;
    result = (vueData.gamePlayInfo.combo / 100);

    if (result < 1.0) {
        result += 1;
    }

    return result;
}
