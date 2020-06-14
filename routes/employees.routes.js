const express = require('express');
const router = express.Router();
const EmployeeController = require('../controllers/employees.controller');

router.get('/Employees', EmployeeController.getAll);
router.get('/Employees/random', EmployeeController.getRandom);
router.get('/Employees/:id', EmployeeController.getSelected);
router.post('/Employees', EmployeeController.postNew);
router.put('/Employees/:id', EmployeeController.modifyDoc);
router.delete('/Employees/:id', EmployeeController.deleteDoc);

module.exports = router;
