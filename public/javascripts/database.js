/**
 * Created by pc on 2017/06/20.
 */
var DBUsersScore = undefined;
var database = undefined;
$(document).ready(function(){
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

    database = firebase.database();
    getDataBase();

});

function getDataBase(cb){
    database.ref().limitToLast(10).on('child_added', function (database) {
        database = database.val();
        DBUsersScore = Object.keys(database).map(function(data) {
            return {
                name : data,
                score :database[data]
            };
        });
        if(cb){
            cb();
        }

        console.log(DBUsersScore);
    });
}