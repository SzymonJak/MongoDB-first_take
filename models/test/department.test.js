const Department = require('../department.model');
const mongoose = require('mongoose');
const expect = require('chai').expect;

describe('Department', () => {
    
    it('should throw an error if no "name" arg', () => {
        const dept = new Department({}); //creates new department without name

        dept.validate(err => {
            expect(err.errors.name).to.exist;
        });
    });

    it('should throw an error if "name" is not a string', () => {
        const cases = [{}, []];
        for (let name of cases) {
            const dept = new Department({ name });

            dept.validate(err => {
                expect(err.errors.name).to.exist;
            });
        }
    });

    it('should throw an error if "name" length is not within 5-20 range', () => {
        const cases = ['demo', 'test1234test5678test0'];
        for(let name of cases) {
            const dept = new Department({ name });

            dept.validate(err => {
                expect(err.errors.name).to.exist;
            });
        }
    });

    it('should not throw an error if "name" is OK', () => {
        const cases = ['goodOne', 'correct'];
        for(let name of cases) {
            const dept = new Department({ name });

            dept.validate(err => {
                expect(err).to.be.null;
            });
        }
    });
});

after(() => {
    mongoose.models = {};
});