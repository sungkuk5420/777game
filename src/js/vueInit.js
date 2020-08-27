/**
 * Created by pc on 2017/06/20.
 */

Vue.use(VueMaterial);
Vue.component('modal', {
    template: '#modal-template',
    data: function () {
        return {
            focusClass: ''
        }
    },
    methods: {
        focus: function () {
            this.focusClass = 'md-input-focused';
        },
        blur: function () {
            var userName = $('.userNameInput').val();
            if (userName === '') {
                this.focusClass = '';
            }
        }
    }
});

window.vueData = {
    'currentEvent': null,
    'pageState': 'wait',
    'showModal': false,
    'buttons': [
        [{
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
        [{
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
        [{
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
        [{
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
    'pageMoveDelay': false,
    'usersRank': [],
    'gamePlayInfo': {
        'exe': 0,
        'level': 0,
        'bonus': 0,
        'score': 0,
        'combo': 0,
        'time': 60
    }
};
var userName = '';
var mainVue = new Vue({
    el: '#app',
    data: vueData,
    methods: {
        onTouch(func) {
            console.log(event)
            event.preventDefault();
            if (event.touches.length > 1 || (event.type == "touchend" && event.touches.length > 0))
                return;

            var newEvt = document.createEvent("MouseEvents");
            var type = null;
            var touch = null;
            this.currentEvent = Date.now();

            switch (event.type) {
                case "touchstart":
                    type = "mousedown";
                    touch = event.changedTouches[event.changedTouches.length - 1];
                    break;
                case "touchmove":
                    type = "mousemove";
                    touch = event.changedTouches[event.changedTouches.length - 1];
                    break;
                case "touchend":
                    type = "mouseup";
                    touch = event.changedTouches[event.changedTouches.length - 1];
                    break;
            }

            newEvt.initMouseEvent(type, true, true, event.target.ownerDocument.defaultView, 0,
                touch.screenX, touch.screenY, touch.clientX, touch.clientY,
                event.ctrlKey, event.altKey, event.shiftKey, event.metaKey, 0, null);
            event.target.dispatchEvent(newEvt);

            func();
        },
        buttonClick: function (rowIndex, index) {

            var selectedIndex = findWithAttr(vueData.buttons, 'state', 'select');
            var selectedObj = undefined;
            var clickObj = vueData.buttons[rowIndex][index];
            var clickIndex = {
                'rowIndex': rowIndex,
                'index': index
            };

            if ((selectedIndex.rowIndex !== -1) && (selectedIndex.rowIndex !== -1)) {
                selectedObj = vueData.buttons[selectedIndex.rowIndex][selectedIndex.index];

                //클릭한 버튼이 스탭이 다를경우 취소. + 색상이 다를경우에도 취소
                if ((selectedObj.styleClass !== clickObj.styleClass) || (selectedObj.color !== clickObj.color)) {
                    selectedObj.state = 'wait';
                    vueData.gamePlayInfo.combo = 0;
                    return false;
                }

                //클릭한 버튼이 대기상태가 아닐경우 멈춤. 같은 버튼이라면 취소함.
                if (clickObj.state !== 'wait') {
                    if (clickObj.state === 'select') {
                        clickObj.state = 'wait';
                    } else {
                        selectedObj.state = 'wait';
                    }

                    return false;
                }
                var comboScore = getComboScore();
                vueData.gamePlayInfo.score = String(vueData.gamePlayInfo.score).replace(/,/gi, '');
                vueData.gamePlayInfo.score = parseInt(vueData.gamePlayInfo.score);

                switch (clickObj.styleClass) {
                    case 'step1':
                        changeStep(clickObj, 'step2');
                        vueData.gamePlayInfo.combo += 1;
                        vueData.gamePlayInfo.score += 1000 * comboScore;
                        break;
                    case 'step2':
                        changeStep(clickObj, 'step3');
                        vueData.gamePlayInfo.combo += 1;
                        vueData.gamePlayInfo.score += 3000 * comboScore;
                        break;
                    case 'step3':
                        changeStep(clickObj, 'complete');
                        reloadBtn(clickIndex);
                        vueData.gamePlayInfo.combo += 1;
                        vueData.gamePlayInfo.score += 5000 * comboScore;
                        break;
                }
                vueData.gamePlayInfo.score = comma(vueData.gamePlayInfo.score);

                reloadBtn(selectedIndex);


            } else {
                clickObj.state = 'select';
            }

        },
    }
});

$(document).ready(function () {
    // touchEventInit();
    function touchEventInit() {
        var el = document.getElementById("app");
        el.addEventListener("touchstart", handleStart, false);
        el.addEventListener("touchend", handleEnd, false);
        el.addEventListener("touchcancel", touchCancel, false);
        el.addEventListener("touchmove", touchMove, false);

        function touchMove() {
            //console.log(event);
        }

        function touchCancel() {
            //console.log(event);
        }

        function handleStart(event) {
            //console.log(vueData.pageMoveDelay);
            //if(vueData.pageMoveDelay === true){
            //    return false;
            //}
            var $eventTarget = $(event.target);
            if ($eventTarget.closest('.eventEnd').length === 0) {
                var $clickObj = $eventTarget.closest('.eventObj');

                if ($clickObj.closest('input').length !== 0) {
                    $clickObj.focus();
                } else {
                    $clickObj.click();
                }
            } else {
                event.preventDefault();
            }

        }

        function handleEnd(event) {
            //console.log(vueData.pageMoveDelay);
            //if(vueData.pageMoveDelay === true){
            //    return false;
            //}
            var $eventTarget = $(event.target);
            if ($eventTarget.closest('.eventEnd').length !== 0) {
                var $eventTarget = $(event.target);
                var $clickObj = $eventTarget.closest('.eventEnd');

                if ($clickObj.closest('input').length !== 0) {
                    $clickObj.focus();
                } else {
                    $clickObj.click();
                }
            } else {
                event.preventDefault();
            }
        }
    }
});