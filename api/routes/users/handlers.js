const User = require('../../models/user');

const find = (req, res) => {
  User.find({}, (err, users) => {
    if (err) throw err;
    const filteredUsers = users.map(user => {
      const { _id, name, email, createdAt, updatedAt } = user;
      return { _id, name, email, createdAt, updatedAt };
    });
    res.json(filteredUsers);
  });
};

const findOne = (req, res) => {
  User.findById(req.params.id, (err, user) => {
    if (user !== undefined && user !== null) {
      const { _id, name, email, createdAt, updatedAt } = user;
      res.json({ _id, name, email, createdAt, updatedAt });
    } else {
      res.sendStatus(404);
    }
  });
};

const create = (req, res) => {
  const { name, email, password } = req.body;
  const user = new User({
    name,
    email,
    password
  });
  user.save(err => {
    if (err) {
      res.sendStatus(400);
    } else {
      res.status(201).json({ name, email });
    }
  });
};

const uncreate = (req, res) => {
  User.deleteOne({ _id: req.params.id }, err => {
    if (err) {
      res.sendStatus(404);
    }
    res.sendStatus(200);
  });
};

const update = (req, res) => {
  User.update({ _id: req.params.id }, { $set: req.body }, err => {
    if (err) {
      res.sendStatus(400);
    } else {
      res.sendStatus(200);
    }
  });
};

module.exports = {
  find,
  findOne,
  create,
  uncreate,
  update
};
