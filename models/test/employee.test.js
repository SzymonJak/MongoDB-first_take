// const Employee = require('../employee.model');
// const mongoose = require('mongoose');
// const expect = require('chai').expect;

// describe('Employee', () => {

//     it('should throw an error if no any arg is missing', () => {
//         const empl = new Employee({});

//         empl.validate(err => {
//             expect(err.errors.firstName).to.exist;
//             expect(err.errors.lastName).to.exist;
//             expect(err.errors.department).to.exist;
//         });
//     });

//     it('should throw na error if any arg is not a string', () => {
//         const cases = [
//             [[], [], []],
//             [{}, {}, {}],
//             [{}, [], []],
//             [[], {}, {}]
//         ];

//         for (let option of cases) {
//             const [firstName, lastName, department] = option;
//             const empl = new Employee({ firstName, lastName, department });

//             empl.validate(err => {
//                 expect(err.errors.firstName).to.exist;
//                 expect(err.errors.lastName).to.exist;
//                 expect(err.errors.department).to.exist;
//             })
//         }

//     });

//     it('should not throw an error if "firstName" and "lastName" are OK', () => {
//         const firstName = 'jeden';
//         const lastName = 'dwa';
//         const department = 'example';
    
//         const empl = new Employee({firstName, lastName, department});
        
//         empl.validate(err => {
//             expect(err).to.not.exist;
//         });
    
//     });
// });

// after(() => {
//     mongoose.models = {};
// });