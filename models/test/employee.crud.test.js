const Employee = require('../employee.model');
const Department = require('../department.model');
const expect = require('chai').expect;
const mongoose = require('mongoose');
const MongoMemoryServer = require('mongodb-memory-server').MongoMemoryServer;

describe('Employee', () => {
    let fakeDB = new MongoMemoryServer();
    let conn;
    before(async () => {

        try {
            const uri = await fakeDB.getConnectionString();
            conn = await mongoose.connect(uri, { useNewUrlParser: true, useUnifiedTopology: true});
        } catch(err) {
            console.log(err);
        }
    });

    describe('Reading data', () => {

        before(async () => {
            const testEmplOne = new Employee({ firstName: 'Jan', lastName: 'Kowalski', department: 'Marketing'});
            await testEmplOne.save();

            const testEmplTwo = new Employee({ firstName: 'Anna', lastName: 'Nowak', department: 'HR'});
            await testEmplTwo.save();
        });

        it('should return all the data with "find" method', async () => {
            const employees = await Employee.find();
            const expectedLength = 2;
            expect(employees.length).to.be.equal(expectedLength);
        });

        it('should return a proper document by various params with "findOne" method', async () => {
            const employee1 = await Employee.findOne({ lastName: 'Kowalski' });
            const employee2 = await Employee.findOne({ firstName: 'Anna' });
            const employeeDept = await Employee.findOne({ department: 'Marketing' });
            expect(employee1.firstName).to.be.equal('Jan');
            expect(employee2.department).to.be.equal('HR');
            expect(employeeDept.lastName).to.be.equal('Kowalski');
        });

        after(async () => {
            await Employee.deleteMany();
        });
    });

    describe('Creating data', () => {

        it('should insert new document with "insertOne" method', async () => {
            const employee = new Employee({ firstName: 'Jan', lastName: 'Kowalski', department: 'Marketing' });
            await employee.save();
            expect(employee.isNew).to.be.false;
        });

        after(async () => {
            await Employee.deleteMany();
        });

    });

    describe('Updating data', () => {

        beforeEach(async () => {
            const testEmplOne = new Employee({ firstName: 'Jan', lastName: 'Kowalski', department: 'Marketing'});
            await testEmplOne.save();

            const testEmplTwo = new Employee({ firstName: 'Anna', lastName: 'Nowak', department: 'HR'});
            await testEmplTwo.save();
        });

        it('should properly update one document witn "updateOne" method', async () => {
            await Employee.updateOne({ firstName: 'Jan' }, { $set: { firstName: '==Employee #1==', lastName: '==Kowalski==', department: '==Marketing==' } });
            const updatedEmployee = await Employee.findOne({ firstName: '==Employee #1==' });
            expect(updatedEmployee).to.not.be.null;
        });

        it('should properly update one document with "save" method', async () => {
            const employee = await Employee.findOne({ firstName: 'Anna' });
            employee.firstName = '=Employee #2=';
            await employee.save();

            const updatedEmployee = await Employee.findOne({ firstName: '=Employee #2=' });
            expect(updatedEmployee).to.not.be.null;
        });

        it('should properly update many documents with "updateMany" method', async () => {
            await Employee.updateMany({}, {$set: { firstName: 'newName!'}});
            const employees = await Employee.find();
            expect(employees[0].firstName).to.be.equal('newName!');
            expect(employees[1].firstName).to.be.equal('newName!');
        });

        afterEach(async () => {
            await Employee.deleteMany();
        });

    });

    describe('Removing data', () => {

        beforeEach(async () => {
            const testEmplOne = new Employee({ firstName: 'Jan', lastName: 'Kowalski', department: 'Marketing'});
            await testEmplOne.save();

            const testEmplTwo = new Employee({ firstName: 'Anna', lastName: 'Nowak', department: 'HR'});
            await testEmplTwo.save();
        });

        it('should properly remove one document with "deleteOne" method', async () => {
            await Employee.deleteOne({ firstName: 'Jan' });
            const deletedEmpl = await Employee.findOne({ firstName: 'Jan' });
            expect(deletedEmpl).to.be.null;
        });
      
        it('should properly remove one document with "remove" method', async () => {
            const employee = await Employee.findOne({ firstName: 'Anna' });
            await employee.remove();
            const removedEmpl = await Employee.findOne({ lastName: 'Nowak' });
            expect(removedEmpl).to.be.null;
        });
      
        it('should properly remove multiple documents with "deleteMany" method', async () => {
            await Employee.deleteMany();
            const deletedEmpls = await Employee.find();
            expect(deletedEmpls.length).to.be.equal(0);
        });

        afterEach(async () => {
            await Employee.deleteMany();
        });
      
    });

    describe('Populate', () => {

        before(async () => {
            const testDeptOne = new Department({ name: 'Department #1'});
            const deptOneId = await testDeptOne.save();

            const testDeptTwo = new Department({ name: 'Department #2'});
            const deptTwoId = await testDeptTwo.save();

            const testEmplOne = new Employee({ firstName: 'Jan', lastName: 'Kowalski', department: deptOneId.id }); //ref: 'Department'
            await testEmplOne.save();

            const testEmplTwo = new Employee({ firstName: 'Anna', lastName: 'Nowak', department: deptTwoId.id });
            await testEmplTwo.save();

        });

        it('should return proper dept name', async () => {
            const populated = await Employee.find().populate('department');

            expect(populated[0].department.name).to.be.equal('Department #1');
            expect(populated[1].department.name).to.be.equal('Department #2');
            
        });

        after(async () => {
            await Employee.deleteMany();
        });

    });

    after(async () => {
        mongoose.models ={};
        await conn.disconnect();
        await fakeDB.stop();
    });

});