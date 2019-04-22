/**
 * Created by pc on 2017/06/20.
 */
var DB_USERS_DATA = undefined;
var DATABASE = undefined;
$(document).ready(function () {
    // Initialize Firebase
    var config = {
        apiKey: "AIzaSyCEpS3L1i1SWVmsdY3B1Si72wMlGUC2dNE",
        authDomain: "sevengame-96feb.firebaseapp.com",
        databaseURL: "https://sevengame-96feb.firebaseio.com",
        projectId: "sevengame-96feb",
        storageBucket: "sevengame-96feb.appspot.com",
        messagingSenderId: "352836000520"
    };
    firebase.initializeApp(config);

    DATABASE = firebase.database();
    getDataBase(function () {
        var saveId = localStorage.getItem("userId");
        var savePassword = localStorage.getItem("userPassword");
        document.getElementById('app').style.display = "block";
        if (
            (saveId) &&
            (savePassword)
        ) {
            login(saveId, savePassword);
        } else {
            vueData.pageState = 'intro';
        }
    });
});

function getDataBase(cb) {
    DATABASE.ref().on('child_added', function (data) {
        var database = data.val();
        DB_USERS_DATA = Object.keys(database).map(function (data) {
            return {
                id: data,
                info: database[data]
            };
        });
        if (cb) {
            cb();
        }
    });
}
