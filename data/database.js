const dotenv = require('dotenv');
dotenv.config();

const MongoClient = require('mongodb').MongoClient; 

let database; 

const initDb = (callback) => {
    if (database) {
        console.log('Db is allready initialized!'); 
        return callback(null, database); 
    }
    MongoClient.connect(process.env.MONGO_URL)
        .then((client) => {
            database = client; 
            callback(null, database); 
        })
        .catch((err) => {
            callback(err);
        });
};

const getDatabase = () => {
    if (!database) {
        throw Error('Databse not initialized')
    }
    return database; 
};

module.exports = {
    initDb, 
    getDatabase
};