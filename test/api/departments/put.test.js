const chai =require('chai');
const chaiHttp = require('chai-http');
const server = require('../../../server');
const Department = require('../../../models/department.model');

chai.use(chaiHttp);

const expect = chai.expect;
const request = chai.request;

describe('PUT /api/departments', () => {

    before(async () => {
        const testDeptOne = new Department({ _id: '5d9f1140f10a81216cfd4408', name: 'Department #1' });
        await testDeptOne.save();
    });

    it('/:id should update chosen document and return success', async () => {
        const res = await request(server).put('/api/departments/5d9f1140f10a81216cfd4408').send({name: '#NEW department'});
        expect(res.status).to.be.equal(200);
        expect(res.body.name).to.be.equal('#NEW department');
    });

    after(async () => {
        await Department.deleteMany();
    });
});