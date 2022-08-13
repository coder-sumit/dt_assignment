const { MongoClient } = require('mongodb');
const url = 'mongodb://localhost:27017';
const client = new MongoClient(url);
const database = 'dtassign';

async function dbConnect(){
    let result = await client.connect();
    return result.db(database);
}

module.exports = dbConnect;
