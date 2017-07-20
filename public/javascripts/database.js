/**
 * Created by pc on 2017/06/20.
 */
var usersScore = undefined;
var database = undefined;
$(document).ready(function(){
    // Initialize Firebase
    var config = {
        
    };
    firebase.initializeApp(config);

    database = firebase.database();
    getDataBase();

});

function getDataBase(cb){
    database.ref().limitToLast(10).on('child_added', function (database) {
        database = database.val();
        usersScore = Object.keys(database).map(function(data) {
            return {
                name : data,
                score :database[data]
            };
        });
        if(cb){
            cb();
        }

        console.log(usersScore);
    });
}