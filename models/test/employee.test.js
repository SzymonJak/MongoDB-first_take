const Employee = require('../employee.model');
const mongoose = require('mongoose');
const expect = require('chai').expect;

describe('Employee', () => {

    it('should throw an error if no "firstName" or "lastName" args, department is given', () => {
        const department = 'Marketing';
        const empl = new Employee({department});

        empl.validate(err => {
            expect(err.errors.firstName).to.exist;
            expect(err.errors.lastName).to.exist;
            expect(err.errors.department).to.not.exist;
        });
    });

    it('should throw na error if "firstName" or "lastName" is not a string', () => {
        const cases = [
            [[], []],
            [{}, {}],
            [{}, []],
            [[], {}]
        ];

        for (let option of cases) {
            const [firstName, lastName] = option;
            const empl = new Employee({ firstName, lastName });

            empl.validate(err => {
                expect(err.errors.firstName).to.exist;
                expect(err.errors.lastName).to.exist;
            })
        }

    });

    it('should not throw an error if "firstName" and "lastName" are OK', () => {
        const firstName = 'jeden';
        const lastName = 'dwa';
    
        const empl = new Employee({firstName, lastName});
        
        empl.validate(err => {
            expect(err.errors.firstName).to.not.exist;
            expect(err.errors.lastName).to.not.exist;
        });
    
    });
});

after(() => {
    mongoose.models = {};
});