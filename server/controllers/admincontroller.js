const Category = require('../models/category');
const User = require('../models/user');

exports.createCategory = async (req, res) => {
  const category = await Category.create(req.body);
  res.status(201).json(category);
};

exports.getUsers = async (req, res) => {
  const users = await User.find();
  res.json(users);
};
