/**
 * Created by pc on 2017/06/20.
 */

var vueData = {
    'buttons': [
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
    'score' : 0,
    'combo' : 0,
    'time':60
};

var userName ='';

var mainVue = new Vue ({
    el : '#main' ,
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

    console.log(result);

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
    timeFunc();
    userName = alert('게임시작');


    function timeFunc(){
        setTimeout(function(){
            if(vueData.time >= 0){
                vueData.time -= 1;
                timeFunc();
            }else{
                alert('당신의 점수는 : '+ comma(vueData.score) + '점 입니다.');
                location.reload();
            }
        },1000);
    }
    function touchEventInit() {
        var el = document.getElementById("main");
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

        function handleStart(){
            //console.log(event);
            $(event.target).closest('.gameButton').click();
        }

        function handleEnd(event){
            event.preventDefault();
        }
        $('.score').on('click touchstart', function() {
            autoPlay();
        });
    }

});
var autoPlayIndex = 0;
function autoPlay(){
    if(autoPlayIndex < 4){
        console.log(autoPlayIndex);
        autoPlayIndex++;
        return false;
    }else{
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