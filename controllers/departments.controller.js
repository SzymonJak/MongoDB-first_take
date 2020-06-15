const Department = require('../models/department.model');

exports.getAll = async (req, res) => {
    try {
        res.json(await Department.find());
    } catch(err) {
        res.status(500).json({ message: err });
    }
};

exports.getRandom = async (req, res) => {
    try {
        const count = await Department.countDocuments();
        const random = Math.floor(Math.random() * count);
        const dept = await Department.findOne().skip(random);
        if (!dept) res.status(404).json({ message: 'Not found' });
        else res.json(dept);
    } catch {
        res.status(500).json({ message: err });
    }
};

exports.getSelected = async (req, res) => {
    try {
        const dept = await Department.findById(req.params.id);
        if (!dept) res.status(404).json({ message: 'Not found' });
        else res.json(dept);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

exports.postNew = async (req, res) => {
    const { name } = req.body;

    if (name) {
        try {
            const newDepartment = new Department({ name });
            await newDepartment.save();
            res.json({ message: 'OK' });
        } catch (err) {
            res.status(500).json({ message: err });
        }
    } else res.json({ message: 'Some data is missing' });
};

exports.modifyDoc = async (req, res) => {
    const { name } = req.body;

    if (name) {
        try {
            const dept = Department.findById(req.params.id);
            if (dept) {
                const doc = await Department.findOneAndUpdate({ _id: req.params.id }, { $set: { name } }, { new: true });
                res.json(doc);
            }
            else res.status(404).json({ message: 'Not found' });
        } catch (err) {
            res.status(500).json({ message: err });
        }
    } else res.json({ message: 'Some data is missing' });
};

exports.deleteDoc = async (req, res) => {
    try {
        const dept = Department.findById(req.params.id);
        if (dept) {
            const doc = await Department.findOne({ _id: req.params.id });
            await doc.remove();
            res.json(doc);
        }
        else res.status(404).json({ message: 'Not found' });
    }
    catch (err) {
        res.status(500).json({ message: err });
    }
};