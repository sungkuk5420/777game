/**
 * Created by pc on 2017/06/20.
 */
var DB_USERS_DATA = undefined;
var DATABASE = undefined;
$(document).ready(function(){
    // Initialize Firebase
    var config = {
    };
    firebase.initializeApp(config);

    DATABASE = firebase.database();
    console.log(DATABASE);
    getDataBase(function(){

        var saveId = $.cookie("userId");
        var savePassword = $.cookie("userPassword");

        console.log(saveId);
        console.log(savePassword);

        if(
            (saveId !== undefined)
            &&(savePassword !== undefined)
        ){
            login(saveId,savePassword);
        }else{
            vueData.pageState = 'intro';
        }
    });

});

function getDataBase(cb){
    // database.ref().limitToLast(10).on('child_added', function (database) {
    //     database = database.val();
    //     DB_USERS_DATA = Object.keys(database).map(function(data) {
    //         return {
    //             name : data,
    //             score :database[data]
    //         };
    //     });
    //     if(cb){
    //         cb();
    //     }
    //
    //     console.log(DB_USERS_DATA);
    // });

    // DATABASE.ref().limitToLast(10).on('child_added', function (data) {
    DATABASE.ref().on('child_added', function (data) {
        var database = data.val();
        DB_USERS_DATA = Object.keys(database).map(function(data) {
            return {
                id : data,
                info :database[data]
            };
        });
        if(cb){
            cb();
        }
    });
}

function joinId(){
    var $joinPage = $('.join');
    var id = $joinPage.find('.userId').val();
    var password = $joinPage.find('.userPassword').val();
    var password2 = $joinPage.find('.userPassword2').val();
    var nickName = $joinPage.find('.userNickName').val();
    
    if(password !== password2){
        alert('패스워드와 패스워드 확인이 일치하지 않습니다.');
        return false;
    }

    if(
        (id === '')
        &&(password === '')
        &&(password2 === '')
        &&(nickName === '')
    ){
        alert('입력되지 않은 항목이 있습니다.');
        return false;
    }


    firebase.database().ref('user/'+id).set({
        password: password.toString(),
        nickName: nickName.toString(),
        level: 1,
        exe : 0,
        score: 0
    });

    alert('가입 완료.');
    vueData.pageState='game';
}

function login(inputId, inputPassword){
    var $introPage = $('.intro');
    var id = $introPage.find('.userId').val();
    var password = $introPage.find('.userPassword').val();

    if(inputId){
        id = inputId;
    }

    if(inputPassword){
        password = inputPassword;
    }

    if((id === '')
        && (password === '')
    ) {
        alert('입력되지 않은 항목이 있습니다.');
        return false;
    }
    getDataBase(function(){
        var selectUser = getUserInfo(id);
        console.log(selectUser);

        if(selectUser === undefined){
            alert('아이디가 없습니다.');
            return false;
        }

        if(selectUser.password !== password){
            alert('패스워드가 틀렸습니다.');
            return false;
        }else{
            $.cookie("userId", id, { expires: 30 });
            $.cookie("userPassword", password, { expires: 30 });
            // $.removeCookie("KEY");
            vueData.pageState='game';
        }
    });
}

function writeUserData(params) {
    //id, score, cb
    if((params.id !== undefined)
        && (params.score !== undefined)
    )
    var userId = params.id;
    var userScore = params.score;
    if(DB_USERS_DATA !== undefined){
        var selectUser = getUserInfo(userId);
        var score = comma(userScore);
        score = String(score).replace(/,/gi,'');
        score = parseInt(score);

        if( (selectUser !== undefined)
            && (selectUser.score > score) ){
            alert('현재 점수보다 저장된 점수가 높습니다. 저장하지 않습니다.');
        }else{
            var bonus = parseInt(score*(selectUser.level/100));
            var resultScore = score+bonus;
            var exe = parseInt( String(selectUser.exe).replace(/,/gi,'')) + parseInt(1000+(resultScore/100));
            var level = selectUser.level;
            if(level < parseInt( exe / 10000 )){
                level = parseInt( exe / 10000 );

                bonus = parseInt(score*(level/100));
                resultScore = score+bonus;
                exe = parseInt( String(selectUser.exe).replace(/,/gi,'')) + parseInt(1000+(resultScore/100));
            }
            firebase.database().ref('user/'+userId).set({
                password: selectUser.password.toString(),
                nickName: selectUser.nickName.toString(),
                level: level,
                exe : comma(exe),
                bonus : comma(bonus),
                score: comma(resultScore)
            });
            if(params.cb){
                params.cb();
            }
            // changeView('rank');
        }
    }
}

function getUserInfo(userId){
    if(DB_USERS_DATA !== undefined){
        var selectUser = DB_USERS_DATA.filter(function(item, index){
            if (item.id == userId) return true;
        });
        if(selectUser.length !== 0){
            return selectUser[0].info;
        }else{
            return undefined;
        }
    }
}
