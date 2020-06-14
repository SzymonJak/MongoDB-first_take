const express = require('express');
const router = express.Router();
const DepartmentController = require('../controllers/departments.controller');

router.get('/departments', DepartmentController.getAll);
router.get('/departments/random', DepartmentController.getRandom);  
router.get('/departments/:id', DepartmentController.getSelected);
router.post('/departments', DepartmentController.postNew);
router.put('/departments/:id', DepartmentController.modifyDoc);
router.delete('/departments/:id', DepartmentController.deleteDoc);

module.exports = router;
