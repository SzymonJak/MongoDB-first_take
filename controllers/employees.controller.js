const Employee = require('../models/Employee.model');

exports.getAll = async (req, res) => {
    try {
        res.json(await Employee.find().populate('department'));
    } catch (err) {
        res.status(500).json({ message: err })
    }
};

exports.getRandom = async (req, res) => {
    try {
        const count = await Employee.countDocuments();
        const rand = Math.floor(Math.random() * count);
        const emp = await (await Employee.findOne().populate('department').skip(rand));
        if (!emp) res.status(404).json({ message: 'Not found' });
        else res.json(emp);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

exports.getSelected = async (req, res) => {
    try {
        const emp = await Employee.findById(req.params.id).populate('department');
        if (!emp) res.status(404).json({ message: 'Not found' });
        else res.json(emp);
    } catch (err) {
        res.status(500).json({ message: err })
    }
};

exports.postNew = async (req, res) => {
    const { firstName, lastName, department } = req.body;
    if (firstName && lastName && department) {
        try {
            const newEmployee = new Employee({ firstName, lastName, department });
            await newEmployee.save();
            res.json({ message: 'OK' });
        } catch (err) {
            res.status(500).json({ message: err });
        }
    } else {
        res.json({ message: 'Some data is missing' });
    }
};

exports.modifyDoc = async (req, res) => {
    const { firstName, lastName, department } = req.body;

    if (firstName && lastName && department) {
        try {
            const emp = await Employee.findById(req.params.id);
            if (emp) {
                await Employee.updateOne({ _id: req.params.id }, { $set: { firstName, lastName, department } });
                res.json({ message: 'OK' });
            }
            else res.status(404).json({ message: 'Not found' })
        } catch (err) {
            res.status(500).json({ message: err });
        }
    } else res.json({ message: 'Some data is missing' });
};

exports.deleteDoc = async (req, res) => {
    try {
        const emp = await Employee.findById(req.params.id);
        if (emp) {
            await emp.remove();
            res.json({ message: 'OK' });
        } else res.status(404).json({ message: 'Not found' });
    } catch (err) {
        res.status(500).json({ message: err });
    }
};