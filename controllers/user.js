'use strict';

const UserSchema = require('../models/user');

class UserController {
  // Find all users
  static getAll(req, res) {
    UserSchema.find()
      .sort({
        registerDate: 'descending'
      })
      .then(users => res.status(200).json(users))
      .catch(error => res.status(500).send(error));
  }

  // Get user by id
  static getById(req, res) {
    UserSchema.findById(req.params.id)
      .then(user => res.status(200).json(user))
      .catch(error => res.status(500).send(error));
  }

  // Register user
  static save(req, res) {
    new UserSchema(req.body).save()
      .then(user => {
        console.log('Insert id :', user._id);

        return res.status(200).json(user);
      })
      .catch(error => res.status(500).send(error));
  }

  // Update user
  static update(req, res) {
    const { id } = req.params;

    req.body.updateDate = new Date();

    UserSchema.findById(id)
      .then(user => {
        if (!user)
          return res.status(404).send(`The user with id ${id} does not exist`);
        else
          UserSchema.updateOne({ _id: id }, req.body)
            .then(result => res.status(200).json(result))
            .catch(error => res.status(500).send(error));
      })
      .catch(error => res.status(500).send(error));
  }

  // Delete user
  static delete(req, res) {
    const { id } = req.params;

    UserSchema.findByIdAndDelete(id)
      .then(user => res.status(200).json(user))
      .catch(error => res.status(500).send(error));
  }
}

module.exports = UserController;
