var mysql = require('mysql');

module.exports = {
    con: null,
    getConnection: () => {
        this.con = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database: "prodappdb" // products app database
        });
        return this.con;
    },
    select: (sql,fields) => {
        
    }
}