const chai = require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server');

const Department = require('../../../models/department.model');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('GET /api/departments', () => {

    before(async () => {
        const testDepOne = new Department({ _id: '5d9f1140f10a81216cfd4408', name: 'Department #1' });
        await testDepOne.save();
      
        const testDepTwo = new Department({ _id: '5d9f1159f81ce8d1ef2bee48', name: 'Department #2' });
        await testDepTwo.save();
    });

    it('/ should return all departments', async () => {

        const res = await request(server).get('api/departments');
        expect(res.status).to.be.equal(200);
        expect(res.body).to.be.an('array');
        expect(res.body.length).to.be.equal(2);

    });

    it('/:id should return one department by :id', () => {

    });

    it('/random should return one random depratment', () => {

    });

    after(async () => {
        await Department.deleteMany();
    });

});