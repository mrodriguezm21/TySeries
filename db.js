const db = require("mongoose");
const config = require("./config");

db.Promise = global.Promise;

const connect = async (url) =>{
    await db.connect(url, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: config.dbName
    });
}

module.exports = connect;