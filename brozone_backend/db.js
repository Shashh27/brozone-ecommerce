const mysql= require('mysql2');

const connection= mysql.createConnection({
    host:'localhost',
    user:'root',
    password: 'root',
    database: 'myntra_db'
});

connection.connect((error)=>{
    if(error){
        console.log('error connecting to MYSQL:'+ error.stack);
        return;
    }
    else{
        console.log('connected to mysql:', connection.threadId);
    }
});

module.exports = connection;

