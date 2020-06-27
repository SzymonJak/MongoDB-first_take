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

    describe('Reading data', () => {

        beforeEach(async () => {
            const testDeptOne = new Department({ name: 'Department #1'});
            await testDeptOne.save();

            const testDeptTwo = new Department({ name: 'Department #2'});
            await testDeptTwo.save();
        });

        it('should return all the data with "find" method', async () => {
            const departments = await Department.find();
            const expectedLength = 2;
            expect(departments.length).to.be.equal(expectedLength);
        });

        it('should return a proper document found by "name" with "findOne" method', async () => {
            const department = await Department.findOne({ name: 'Department #1' });
            const expectedName = 'Department #1';
            expect(department.name).to.be.equal(expectedName);
        });

        after(async () => {
            await Department.deleteMany();
        });
    });

    describe('Creating data', () => {

        it('should insert new document with "insertOne" method', async () => {
            const department = new Department({ name: 'Department #1' });
            await department.save();
            expect(department.isNew).to.be.false;
        });

        after(async () => {
            await Department.deleteMany();
        });

    });

    describe('Updating data', () => {

        beforeEach(async () => {
            const testDeptOne = new Department({ name: 'Department #1' });
            await testDeptOne.save();

            const testDeptTwo = new Department({ name: 'Department #2' });
            await testDeptTwo.save();
        });

        it('should properly update one document witn "updateOne" method', async () => {
            await Department.updateOne({ name: 'Department #1' }, { $set: { name: '==Department #1==' } });
            const updatedDepartment = await Department.findOne({ name: '==Department #1==' });
            expect(updatedDepartment).to.not.be.null;
        });

        it('should properly update one document with "save" method', async () => {
            const department = await Department.findOne({ name: 'Department #1' });
            department.name = '=Department #1=';
            await department.save();

            const updatedDepartment = await Department.findOne({ name: '=Department #1=' });
            expect(updatedDepartment).to.not.be.null;
        });

        it('should properly update many documents with "updateMany" method', async () => {
            await Department.updateMany({}, {$set: { name: 'newName!'}});
            const departments = await Department.find();
            expect(departments[0].name).to.be.equal('newName!');
            expect(departments[1].name).to.be.equal('newName!');
        });

        afterEach(async () => {
            await Department.deleteMany();
        });

    });

    describe('Removing data', () => {

        beforeEach(async () => {
            const testDeptOne = new Department({ name: 'Department #1' });
            await testDeptOne.save();

            const testDeptTwo = new Department({ name: 'Department #2' });
            await testDeptTwo.save();
        });

        it('should properly remove one document with "deleteOne" method', async () => {
            await Department.deleteOne({ name: 'Department #1' });
            const deletedDept = await Department.findOne({ name: 'Department #1' });
            expect(deletedDept).to.be.null;
        });
      
        it('should properly remove one document with "remove" method', async () => {
            const department = await Department.findOne({ name: 'Department #1' });
            await department.remove();
            const removedDept = await Department.findOne({ name: 'Department #1' });
            expect(removedDept).to.be.null;
        });
      
        it('should properly remove multiple documents with "deleteMany" method', async () => {
            await Department.deleteMany();
            const deletedDepts = await Department.find();
            expect(deletedDepts.length).to.be.equal(0);
        });

        afterEach(async () => {
            await Department.deleteMany();
        });
      
    });

});