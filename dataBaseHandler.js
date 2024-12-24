const sqlite = require("sqlite3").verbose();

const db = new sqlite.Database(__dirname + '/usuarios.db', error => {
    if (error) {
        return console.error("todo mal ", error);
    }
    console.log("se abrio la base de datos correctamente");
});

const getUserbyName = async (user) => {
    user = user.toLowerCase();
    return new Promise((resolve, reject) => {
        db.all(`SELECT * FROM usuarios WHERE lower(Name) = "${user}"`, (error, rows) => {
            if (error) {
                reject(error);
            }
            resolve(rows);
        });
    });
};

const appendUser = (user, password) => {
    return new Promise((resolve, reject) => {
        db.run(`INSERT INTO usuarios (name, password) VALUES ("${user}", "${password}")`,[] ,error => {
            if (error) {
                reject(error);
            }
            resolve(1);
        });
    });
};


module.exports = {getUserbyName, appendUser};
