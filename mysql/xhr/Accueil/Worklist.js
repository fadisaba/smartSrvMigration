//var DbUtility = require('../../direct/Settings/DbUtility');
//var db = global.App.database.connection;
var Worklist={
    read:function(callback)
    {
        var appDB = global.App.database;

        appDB.connect();

        var sql='select * ' +
            'from worklist limit 0,50 ';

        DbUtility.read({},'worklist',appDB.connection)
            .then(function(rows){
               // console.log(rows);
                callback(null, {
                    data: rows,
                    success:true,
                    msg:''

                });
                appDB.disconnect();
            })
            .fail(function(error)
            {

                console.log(error);
                callback(null, {
                    data: [],
                    success:false,
                    msg:'Error'

                });
                appDB.disconnect();
            })
            .done();
    }
};
module.exports=Worklist;