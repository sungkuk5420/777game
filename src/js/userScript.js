$(document).ready(function () {
    touchEventInit();
});

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

function changeView(pageName) {
    //vueData.pageMoveDelay = true;
    switch (pageName) {
        case 'intro':
            vueData.pageState = 'intro';
            break;
        case 'main':
            vueData.pageState = 'main';
            break;
        case 'join':
            vueData.pageState = 'join';
            break;
        case 'game':
            // vueData = vueDefaultData;
            if (vueData.gamePlayInfo.time != 60) {
                vueData.pageState = 'gameEnd';
            } else {
                vueData.pageState = 'game';
            }
            break;
        case 'rank':
            getDataBase(function () {
                DB_USERS_DATA = DB_USERS_DATA.sort(function (a, b) {
                    return parseInt(a.info.score.toString().replace(/,/gi, '')) - parseInt(b.info.score.toString().replace(/,/gi, ''));
                });
                DB_USERS_DATA.reverse();

                vueData.usersRank = DB_USERS_DATA;
                vueData.pageState = 'rank';
            });

            break;
        default:
            vueData.pageState = 'main';
            break;
    }

    //setTimeout(function(){
    //    vueData.pageMoveDelay = false;
    //},1000)
}

function findWithAttr(array, attr, value) {
    for (var i = 0; i < array.length; i += 1) {
        for (var j = 0; j < array[i].length; j += 1) {
            if (array[i][j][attr] === value) {
                return {
                    'rowIndex': i,
                    'index': j
                };
            }
        }
    }
    return {
        'rowIndex': -1,
        'index': -1
    };
}

function comma(str) {
    str = String(str);
    return str.replace(/(\d)(?=(?:\d{3})+(?!\d))/g, '$1,');
}