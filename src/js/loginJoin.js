function joinId() {
    var $joinPage = $('.join');
    var id = $joinPage.find('.userId').val();
    var password = $joinPage.find('.userPassword').val();
    var password2 = $joinPage.find('.userPassword2').val();
    var nickName = $joinPage.find('.userNickName').val();

    if (password !== password2) {
        alert('패스워드와 패스워드 확인이 일치하지 않습니다.');
        return false;
    }

    if (
        (id === '') &&
        (password === '') &&
        (password2 === '') &&
        (nickName === '')
    ) {
        alert('입력되지 않은 항목이 있습니다.');
        return false;
    }
    getDataBase(function () {
        var selectUser = getUserInfo(id);

        if (selectUser !== undefined) {
            alert('중복된 아이디가 있습니다.');
            return false;
        }

        var selectUserNickName = checkUserNickName(nickName);

        if (selectUserNickName !== undefined) {
            alert('중복된 닉네임이 있습니다.');
            return false;
        }
        DATABASE.ref('user/' + id).set({
            password: password.toString(),
            nickName: nickName.toString(),
            level: 1,
            exe: 0,
            score: 0
        });

        if (id) {
            alert('가입 완료.');
            localStorage.setItem("userId", id);
            localStorage.setItem("userPassword", password);
            getDataBase(function () {
                vueData.pageState = 'game';
            });
        } else {
            alert('가입 실패');
        }
    });


}

function login(inputId, inputPassword) {
    var $introPage = $('.intro');
    var id = $introPage.find('.userId').val();
    var password = $introPage.find('.userPassword').val();

    if (inputId) {
        id = inputId;
    }

    if (inputPassword) {
        password = inputPassword;
    }

    if ((id === '') &&
        (password === '')
    ) {
        alert('입력되지 않은 항목이 있습니다.');
        return false;
    }
    getDataBase(function () {
        var selectUser = getUserInfo(id);

        if (selectUser === undefined) {
            alert('아이디가 없습니다.');
            return false;
        }

        if (selectUser.password !== password) {
            alert('패스워드가 틀렸습니다.');
            localStorage.removeItem("userId");
            localStorage.removeItem("userPassword");
            location.reload();
            return false;
        } else {
            localStorage.setItem("userId", id);
            localStorage.setItem("userPassword", password);
            vueData.pageState = 'game';
        }
    });
}

function logout() {
    localStorage.removeItem("userId");
    localStorage.removeItem("userPassword");
    changeView('intro');
}

function writeUserData(params) {
    //id, score, cb
    if ((params.id !== undefined) &&
        (params.score !== undefined)
    )
        var userId = params.id;
    var userScore = params.score;
    if (DB_USERS_DATA !== undefined) {
        var selectUser = getUserInfo(userId);
        var score = comma(userScore);
        score = String(score).replace(/,/gi, '');
        score = parseInt(score);


        var bonus = parseInt(score * (selectUser.level / 100));
        var resultScore = score + bonus;
        var exe = parseInt(String(selectUser.exe).replace(/,/gi, '')) + parseInt(1000 + (resultScore / 100));
        var level = selectUser.level;
        if (level < parseInt(exe / 5000)) {
            level = parseInt(exe / 5000);

            bonus = parseInt(score * (level / 50));
            resultScore = score + bonus;
            exe = parseInt(String(selectUser.exe).replace(/,/gi, '')) + parseInt(1000 + (resultScore / 100));
            level = parseInt(exe / 5000);
        }
        if ((selectUser !== undefined) &&
            (parseInt(String(selectUser.score).replace(/,/gi, '')) > parseInt(String(resultScore).replace(/,/gi, '')))) {
            //alert('현재 점수보다 저장된 점수가 높습니다. 저장하지 않습니다.');
            resultScore = comma(selectUser.score);
        }

        userId = getUserId(userId);
        DATABASE.ref('user/' + userId).set({
            password: selectUser.password.toString(),
            nickName: selectUser.nickName.toString(),
            level: level,
            exe: comma(exe),
            bonus: comma(bonus),
            score: comma(resultScore)
        });
        if (params.cb) {
            params.cb();
        }
        // changeView('rank');
    }
}

function getUserInfo(userId) {
    if (!userId) {
        return false;
    }
    if (DB_USERS_DATA !== undefined) {
        var selectUser = DB_USERS_DATA.filter(function (item, index) {
            if (item.id.toLowerCase() == userId.toLowerCase()) return true;
        });
        if (selectUser.length !== 0) {
            return selectUser[0].info;
        } else {
            return undefined;
        }
    }
}

function getUserId(userId) {
    if (DB_USERS_DATA !== undefined) {
        var selectUser = DB_USERS_DATA.filter(function (item, index) {
            if (item.id.toLowerCase() == userId.toLowerCase()) return true;
        });
        if (selectUser.length !== 0) {
            return selectUser[0].id;
        } else {
            return undefined;
        }
    }
}

function checkUserNickName(userNickName) {
    if (DB_USERS_DATA !== undefined) {
        var selectUser = DB_USERS_DATA.filter(function (item, index) {
            if (item.info.nickName == userNickName) return true;
        });
        if (selectUser.length !== 0) {
            return selectUser[0].info;
        } else {
            return undefined;
        }
    }
}