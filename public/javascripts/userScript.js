/**
 * Created by pc on 2017/06/20.
 */


Vue.use(VueMaterial);
// Vue.use(VueMaterial.mdCore);
// Vue.use(VueMaterial.mdButton);
// Vue.use(VueMaterial.mdIcon);
// Vue.use(VueMaterial.mdSidenav);
// Vue.use(VueMaterial.mdToolbar);
Vue.component('modal', {
    template: '#modal-template',
    data : function () {
        return { focusClass: '' }
    },
    methods: {
        focus: function () {
            this.focusClass = 'md-input-focused';
        },
        blur: function () {
            var userName = $('.userNameInput').val();
            if(userName === ''){
                this.focusClass = '';
            }
        }
    }
});
var vueData = {
    'pageState' : 'game',
    'showModal': false,
    'buttons' : [
        [
            {
                'state': 'wait',
                'text': '7',
                'styleClass': 'step1',
                'color': 'red'
            },
            {
                'state': 'wait',
                'text': '7',
                'styleClass': 'step1',
                'color': 'red'
            },
            {
                'state': 'wait',
                'text': '7',
                'styleClass': 'step1',
                'color': 'red'
            },
            {
                'state': 'wait',
                'text': '7',
                'styleClass': 'step1',
                'color': 'red'
            }
        ],
        [
            {
                'state': 'wait',
                'text': '7',
                'styleClass': 'step1',
                'color': 'red'
            },
            {
                'state': 'wait',
                'text': '7',
                'styleClass': 'step1',
                'color': 'red'
            },
            {
                'state': 'wait',
                'text': '7',
                'styleClass': 'step1',
                'color': 'red'
            },
            {
                'state': 'wait',
                'text': '7',
                'styleClass': 'step1',
                'color': 'red'
            }
        ],
        [
            {
                'state': 'wait',
                'text': '7',
                'styleClass': 'step1',
                'color': 'red'
            },
            {
                'state': 'wait',
                'text': '7',
                'styleClass': 'step1',
                'color': 'red'
            },
            {
                'state': 'wait',
                'text': '7',
                'styleClass': 'step1',
                'color': 'red'
            },
            {
                'state': 'wait',
                'text': '7',
                'styleClass': 'step1',
                'color': 'red'
            }
        ],
        [
            {
                'state': 'wait',
                'text': '7',
                'styleClass': 'step1',
                'color': 'red'
            },
            {
                'state': 'wait',
                'text': '7',
                'styleClass': 'step1',
                'color': 'red'
            },
            {
                'state': 'wait',
                'text': '7',
                'styleClass': 'step1',
                'color': 'red'
            },
            {
                'state': 'wait',
                'text': '7',
                'styleClass': 'step1',
                'color': 'red'
            }
        ]
    ],
    'pageMoveDelay':false,
    'usersRank': [],
    'score' : 0,
    'combo' : 0,
    'time':60
};

var vueDefaultData = {
    'pageState' : 'game',
    'buttons' : [
        [
            {
                'state': 'wait',
                'text': '7',
                'styleClass': 'step1',
                'color': 'red'
            },
            {
                'state': 'wait',
                'text': '7',
                'styleClass': 'step1',
                'color': 'red'
            },
            {
                'state': 'wait',
                'text': '7',
                'styleClass': 'step1',
                'color': 'red'
            },
            {
                'state': 'wait',
                'text': '7',
                'styleClass': 'step1',
                'color': 'red'
            }
        ],
        [
            {
                'state': 'wait',
                'text': '7',
                'styleClass': 'step1',
                'color': 'red'
            },
            {
                'state': 'wait',
                'text': '7',
                'styleClass': 'step1',
                'color': 'red'
            },
            {
                'state': 'wait',
                'text': '7',
                'styleClass': 'step1',
                'color': 'red'
            },
            {
                'state': 'wait',
                'text': '7',
                'styleClass': 'step1',
                'color': 'red'
            }
        ],
        [
            {
                'state': 'wait',
                'text': '7',
                'styleClass': 'step1',
                'color': 'red'
            },
            {
                'state': 'wait',
                'text': '7',
                'styleClass': 'step1',
                'color': 'red'
            },
            {
                'state': 'wait',
                'text': '7',
                'styleClass': 'step1',
                'color': 'red'
            },
            {
                'state': 'wait',
                'text': '7',
                'styleClass': 'step1',
                'color': 'red'
            }
        ],
        [
            {
                'state': 'wait',
                'text': '7',
                'styleClass': 'step1',
                'color': 'red'
            },
            {
                'state': 'wait',
                'text': '7',
                'styleClass': 'step1',
                'color': 'red'
            },
            {
                'state': 'wait',
                'text': '7',
                'styleClass': 'step1',
                'color': 'red'
            },
            {
                'state': 'wait',
                'text': '7',
                'styleClass': 'step1',
                'color': 'red'
            }
        ]
    ],
    'usersRank': [],
    'score' : 0,
    'combo' : 0,
    'time':60
};

var userName ='';
function scoreSave(){
    var userName = $('.userNameInput').val();
    if(userName !== ''){
        writeUserData(userName,comma(vueData.score));
    }else{
        alert('유저이름을 입력하세요.');

        setTimeout(function(){
            vueData.showModal = true;
        },500);
    }
}
var mainVue = new Vue ({
    el : '#app' ,
    data : vueData,
    methods : {
        buttonClick : function (rowIndex, index ) {

            var selectedIndex = findWithAttr(vueData.buttons,'state','select');
            var selectedObj = undefined;
            var clickObj = vueData.buttons[rowIndex][index];
            var clickIndex = {
                                'rowIndex' : rowIndex,
                                'index' : index
                              };

            if((selectedIndex.rowIndex !== -1) && (selectedIndex.rowIndex !== -1)) {
                selectedObj = vueData.buttons[selectedIndex.rowIndex][selectedIndex.index];

                //클릭한 버튼이 스탭이 다를경우 취소. + 색상이 다를경우에도 취소
                if((selectedObj.styleClass !== clickObj.styleClass) || (selectedObj.color !== clickObj.color)){
                    selectedObj.state = 'wait';
                    vueData.combo = 0;
                    return false;
                }

                //클릭한 버튼이 대기상태가 아닐경우 멈춤. 같은 버튼이라면 취소함.
                if(clickObj.state !== 'wait'){
                    if(clickObj.state === 'select'){
                        clickObj.state = 'wait';
                    }else{
                        selectedObj.state = 'wait';
                    }

                    return false;
                }
                var comboScore = getComboScore();
                vueData.score = String(vueData.score).replace(/,/gi,'');
                vueData.score = parseInt(vueData.score);

                switch (clickObj.styleClass){
                    case 'step1':
                        changeStep(clickObj,'step2');
                        vueData.combo += 1;
                        vueData.score += 1000*comboScore;
                        break;
                    case 'step2':
                        changeStep(clickObj,'step3');
                        vueData.combo += 1;
                        vueData.score += 3000*comboScore;
                        break;
                    case 'step3':
                        changeStep(clickObj,'complete');
                        reloadBtn(clickIndex);
                        vueData.combo += 1;
                        vueData.score += 5000*comboScore;
                        break;
                }
                vueData.score = comma(vueData.score);

                reloadBtn(selectedIndex);


            }else{
                clickObj.state = 'select';
            }

        },
    }
});



function findWithAttr(array, attr, value) {
    for(var i = 0; i < array.length; i += 1) {
        for(var j = 0; j < array[i].length; j += 1) {
            if(array[i][j][attr] === value) {
                return {
                    'rowIndex':i,
                    'index':j
                };
            }
        }
    }
    return {
        'rowIndex':-1,
        'index':-1
    };
}

function reloadBtn(selectedIndex){
    var selectedObj = vueData.buttons[selectedIndex.rowIndex][selectedIndex.index];
    //selectedObj.text= "";
    selectedObj.state= "none";
    selectedObj.styleClass= "none";
    var tl = new TimelineMax();
    var $btnObj = $('.rowIndex-'+selectedIndex.rowIndex+' .buttonIndex-'+selectedIndex.index + ' .inner.text');
    tl.set($btnObj,{scale: 0.1});

    tl.to($btnObj, 1, {
        scale: 1,
        onStart : function(){
            changeStep(selectedObj,'step1');
            selectedObj.color = getRandomColor();
            selectedObj.state= "wait";
        },
        onComplete: function () {
        }
    });
}

function changeStep(btnObj, step){
    switch (step){
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
        default :
            alert('StepChange error!');
            break;

    }
}

function getRandomColor(){
    var color = [
        'red',
        'blue',
        'yellow'
    ];

    var resultColor = '';

    resultColor =color[Math.floor(Math.random() * 3)];

    return resultColor;
}

function getComboScore(){
    var result = 1;
    result = (vueData.combo / 100);

    if(result < 1.0){
        result += 1;
    }

    return result;
}

$(document).ready(function(){
    touchEventInit();
    //changeColor
    var array = vueData.buttons;
    for(var i = 0; i < array.length; i += 1) {
        for(var j = 0; j < array[i].length; j += 1) {
            array[i][j].color = getRandomColor();
        }
    }


    function touchEventInit() {
        var el = document.getElementById("app");
        el.addEventListener("touchstart", handleStart, false);
        el.addEventListener("touchend", handleEnd, false);
        el.addEventListener("touchcancel", touchCancel, false);
        el.addEventListener("touchmove", touchMove, false);

        function touchMove(){
            //console.log(event);
        }

        function touchCancel(){
            //console.log(event);
        }

        function handleStart(event){
            //console.log(vueData.pageMoveDelay);
            //if(vueData.pageMoveDelay === true){
            //    return false;
            //}
            var $eventTarget = $(event.target);
            if($eventTarget.closest('.eventEnd').length === 0 ){
                var $clickObj = $eventTarget.closest('.eventObj');

                if($clickObj.closest('input').length !== 0){
                    $clickObj.focus();
                }else{
                    $clickObj.click();
                }
            }else{
                event.preventDefault();
            }

        }

        function handleEnd(event){
            //console.log(vueData.pageMoveDelay);
            //if(vueData.pageMoveDelay === true){
            //    return false;
            //}
            var $eventTarget = $(event.target);
            if($eventTarget.closest('.eventEnd').length !== 0 ) {
                var $eventTarget = $(event.target);
                var $clickObj = $eventTarget.closest('.eventEnd');

                if ($clickObj.closest('input').length !== 0) {
                    $clickObj.focus();
                } else {
                    $clickObj.click();
                }
            }else{
                event.preventDefault();
            }
        }
    }

});
var autoPlayIndex = 0;
function autoPlay(){
    if(autoPlayIndex < 4){
        autoPlayIndex++;
        return false;
    }else{
        //vueData.showModal = true;
        clickButton();

    }
    function clickButton(){
        var array = vueData.buttons;
        var firstButtonIndex = {
            'rowIndex' : Math.floor(Math.random() * 4),
            'index' : Math.floor(Math.random() * 4)
        };
        var firstButton = array[firstButtonIndex.rowIndex][firstButtonIndex.index];
        var breakKey = false;
        for(var i = 0; i < array.length; i += 1) {
            for(var j = 0; j < array[i].length; j += 1) {
                if((firstButton.color === array[i][j].color) && (firstButton.styleClass === array[i][j].styleClass)) {
                    $('.rowIndex-'+firstButtonIndex.rowIndex+' .buttonIndex-'+firstButtonIndex.index).click();
                    $('.rowIndex-'+i+' .buttonIndex-'+j).click();
                    breakKey = true;
                    setTimeout(function(){
                        clickButton();
                    },0);

                    break;
                }
            }
            if(breakKey){
                break;
            }
        }
    }

}

function comma(str) {

    str = String(str);
    return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
}

function changeView(pageName){
    //vueData.pageMoveDelay = true;
    switch (pageName){
        case 'main':
            vueData.pageState='main';
            break;
        case 'join':
            vueData.pageState='join';
            break;
        case 'game':
            // vueData = vueDefaultData;
            vueData.pageState='game';
            break;
        case 'rank':
            getDataBase(function(){

                DBUsersScore = DBUsersScore.sort(function(a, b) {
                    return parseFloat(a.score) - parseFloat(b.score);
                });
                DBUsersScore.reverse();
                vueData.usersRank = DBUsersScore;
                vueData.pageState = 'rank';
            });

            break;
        default:
            vueData.pageState='main';
            break;
    }

    //setTimeout(function(){
    //    vueData.pageMoveDelay = false;
    //},1000)
}

function writeUserData(userName, userScore) {
    if(DBUsersScore !== undefined){
        var selectUser = DBUsersScore.filter(function(item, index){
            if (item.name == userName) return true;
        });
        var score = comma(userScore);
        if( (selectUser.length !== 0)
            && (selectUser[0].score > score) ){
            alert('현재 점수보다 저장된 점수가 높습니다. 저장하지 않습니다.');
        }else{
            firebase.database().ref('user/'+userName).set(score);
            changeView('rank');
        }
    }

}

function gameStart(){
    if(vueData.time != 60){
        location.reload();
    }else{
        timeFunc();
        vueData.pageState='gameStart';
    }
}
function timeFunc(){
    setTimeout(function(){
        if(vueData.time >= 1){
            vueData.time -= 1;
            timeFunc();
        }else{
            // alert('당신의 점수는 : '+ comma(vueData.score) + '점 입니다.');
            var score = comma(vueData.score);
            vueData.showModal = true;
            //var answer = window.prompt("저장할 유저 이름을 입력하세요.", "닉네임");
            //if(answer){
            //    writeUserData(answer,score);
            //}
            //location.reload();
        }
    },1000);
}