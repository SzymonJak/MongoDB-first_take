const express = require('express');
const router = express.Router();
const Department = require('../models/department.model');

router.get('/departments', async (req, res) => {
  try {
    res.json(await Department.find());
  } catch(err) {
    res.status(500).json({ message: err });
  }
});

router.get('/departments/random', async (req, res) => {
  try {
    const count = await Department.countDocuments();
    const random = Math.floor(Math.random() * count);
    const dept = await Department.findOne().skip(random);
    if(!dept) res.status(404).json({message: 'Not found'});
    else res.json(dept);
  } catch {
    res.status(500).json({message: err});
  }
});

router.get('/departments/:id', async (req, res) => {
  try {
    const dept = await Department.findById(req.params.id);
    if(!dept) res.status(404).json({message: 'Not found'});
    else res.json(dept);
  } catch(err) {
    res.status(500).json({message: err});
  }
});

router.post('/departments', async (req, res) => {
  const { name } =req.body;

  if(name) {
    try {
      const newDepartment = new Department({ name });
      await newDepartment.save();
      res.json({ message: 'OK' });
    } catch(err) {
      res.status(500).json({ message: err });
    }
  } else res.json({ message: 'Some data is missing' });
});

router.put('/departments/:id', async (req, res) => {
  const { name } = req.body;

  if(name) {
    try {
      const dept = Department.findById(req.params.id);
      if(dept) {
        const doc = await Department.findOneAndUpdate({_id: req.params.id}, {$set: { name }}, {new: true});
        // const newDept = Department.findById(req.params.id);
        res.json({message: doc});
      }
      else res.status(404).json({message: 'Not found'});
    } catch(err) {
      res.status(500).json({message: err});
    }
  } else res.json({ message: 'Some data is missing' });
});

router.delete('/departments/:id', async (req, res) => {
  try {
    const dept = Department.findById(req.params.id);
    if(dept) {
      const doc = await Department.findOne({_id: req.params.id});
      await doc.remove();
      res.json({message: doc});
    }
    else res.status(404).json({message: 'Not found'});
  }
  catch(err) {
    res.status(500).json({message: err});
  }
});

module.exports = router;
