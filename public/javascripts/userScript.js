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

        }
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
    var $btnObj = $('.rowIndex-'+selectedIndex.rowIndex+' .buttonIndex-'+selectedIndex.index);
    tl.set($btnObj,{scale: 0.1});

    tl.to($btnObj, 1, {
        scale: 1,
        onStart : function(){
            changeStep(selectedObj,'step1');
            selectedObj.color = getRandomColor();
        },
        onComplete: function () {
            selectedObj.state= "wait";
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

    if(vueData.combo>500){
        result = 5;
    }else if(vueData.combo>400){
        result = 4;
    }else if(vueData.combo>300){
        result = 3;
    }else if(vueData.combo>200){
        result = 2;
    }else if(vueData.combo>90){
        result = 1.9;
    }else if(vueData.combo>80){
        result = 1.8;
    }else if(vueData.combo>70){
        result = 1.7;
    }else if(vueData.combo>60){
        result = 1.6;
    }else if(vueData.combo>50){
        result = 1.5;
    }else if(vueData.combo>40){
        result = 1.4;
    }else if(vueData.combo>30){
        result = 1.3;
    }else if(vueData.combo>20){
        result = 1.2;
    }else if(vueData.combo>10){
        result = 1.1;
    }else {
        result = 1;
    }
    return result;
}

$(document).ready(function(){

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
            vueData.time -= 1;
            if(vueData.time > 0){
                timeFunc();
            }else{
                alert('당신의 점수는 : '+ vueData.score + '점 입니다.');
                location.reload();
            }
        },1000);
    }


});