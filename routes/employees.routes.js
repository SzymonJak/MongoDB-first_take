const express = require('express');
const router = express.Router();
const Employee = require('../models/Employee.model');

router.get('/Employees', async (req, res) => {
    try {
      res.json(await Employee.find());
    } catch(err) {
      res.status(500).json({ message: err })
    }
});

router.get('/Employees/random', async (req, res) => {
  try {
    const count = await Employee.countDocuments();
    const rand = Math.floor(Math.random() * count);
    const emp = await Employee.findOne().skip(rand);
    if(!emp) res.status(404).json({ message: 'Not found' });
    else res.json(emp);
  } catch(err) {
    res.status(500).json({ message: err });
  }
});

router.get('/Employees/:id', async (req, res) => {
  try {
    const emp = await Employee.findById(req.params.id);
    if(!emp) res.status(404).json({ message: 'Not found' });
    else res.json(emp);
  } catch(err) {
    res.status(500).json({ message: err })
  }
});

router.post('/Employees', async (req, res) => {
  const { firstName, lastName, department } = req.body;
  if(firstName && lastName && department){
    try {
      const newEmployee = new Employee({firstName, lastName, department});
      await newEmployee.save();
      res.json({message: 'OK'});
    } catch(err) {
      res.status(500).json({message: err});
    }
  } else { 
      res.json({ message: 'Some data is missing' }); 
  }
});

router.put('/Employees/:id', async (req, res) => {
  const { firstName, lastName, department } = req.body;

  if (firstName && lastName && department) {
    try {
      const emp = await Employee.findById(req.params.id);
      if(emp) {
        await Employee.updateOne({_id: req.params.id}, { $set: {firstName, lastName, department}});
        res.json({ message: 'OK' });
      }
      else res.status(404).json({ message: 'Not found' })
    } catch(err) {
      res.status(500).json({ message: err });
    }
  } else res.json({ message: 'Some data is missing' });
});

router.delete('/Employees/:id', async (req, res) => {
  try {
    const emp = await Employee.findById(req.params.id);
    if(emp) {
      await emp.remove();
      res.json({message: 'OK'});
    } else res.status(404).json({message: 'Not found'});
  } catch(err) {
    res.status(500).json({message: err});
  }
});

module.exports = router;
