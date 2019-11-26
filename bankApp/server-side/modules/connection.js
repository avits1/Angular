var mysql = require('mysql');

module.exports = {
    con: null,
    getConnection: () => {
        this.con = mysql.createConnection({
            host: "localhost",
            user: "root",
            password: "",
            database: "bankappdb"
        });
        return this.con;
    },
    select: (sql,fields) => {
        
    }
}