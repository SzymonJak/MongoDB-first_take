const Product = require('../models/product.model');

exports.getAll = async (req, res) => {
    try {
        res.json(await Product.find());
    } catch (err) {
        res.status(500).json({ message: err })
    }
};

exports.getRandom = async (req, res) => {
    try {
        const count = await Product.countDocuments();
        const rand = Math.floor(Math.random() * count);
        const prod = await Product.findOne().skip(rand);
        if (!prod) res.status(404).json({ message: 'Not found' });
        else res.json(prod);
    } catch (err) {
        res.status(500).json({ message: err });
    }
};

exports.getSelected = async (req, res) => {
    try {
        const prod = await Product.findById(req.params.id);
        if (!prod) res.status(404).json({ message: 'Not found' });
        else res.json(prod);
    } catch (err) {
        res.status(500).json({ message: err })
    }
};

exports.postNew = async (req, res) => {
    const { name, client } = req.body;
    if (name && client) {
        try {
            const newProduct = new Product({ name, client });
            await newProduct.save();
            res.json({ message: 'OK' });
        } catch (err) {
            res.status(500).json({ message: err });
        }
    } else {
        res.json({ message: 'Some data is missing' });
    }
};

exports.modifyDoc = async (req, res) => {
    const { name, client } = req.body;

    if (name && client) {
        try {
            const prod = await Product.findById(req.params.id);
            if (prod) {
                await Product.updateOne({ _id: req.params.id }, { $set: { name, client } });
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
        const prod = await Product.findById(req.params.id);
        if (prod) {
            await Product.deleteOne({ _id: req.params.id });
            res.json({ message: 'OK' });
        } else res.status(404).json({ message: 'Not found' });
    } catch (err) {
        res.status(500).json({ message: err });
    }
};