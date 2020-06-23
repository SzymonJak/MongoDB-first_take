const Department = require('../department.model');
const expect = require('chai').expect;
const mongoose = require('mongoose');
const MongoMemoryServer = require('mongodb-memory-server').MongoMemoryServer;

describe('Department', () => {

    before(async () => {

        try {
            const fakeDB = new MongoMemoryServer();
            const uri = await fakeDB.getConnectionString();

            mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true});
        } catch(err) {
            console.log(err);
        }
    });

    

});