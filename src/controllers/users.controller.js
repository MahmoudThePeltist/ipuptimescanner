var knex = require("../services/knex.service");
var bcrypt = require('bcryptjs');
var jwt = require('jsonwebtoken');
const config = require("../../config");


exports.getAll = (req, res) => {
    knex("users").then((rows) => res.status(200).json(rows));
  };
  
  exports.getSpecific = (req, res) => {
    knex("users")
      .where("id", req.params.id)
      .then((rows) => res.status(200).json(rows));
  };
  
  exports.create = (req, res) => {
    data_to_insert = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      password: generatePasswordHash(req.body.password),
    };
  
    knex("users")
      .insert(data_to_insert)
      .then((inserted_id) => {
        knex("users")
          .where("id", inserted_id)
          .then((rows) => res.status(200).json(rows));
      });
  };
  
  exports.put = (req, res) => {
    data_to_update = {
      name: req.body.name,
      email: req.body.email,
      phone: req.body.phone,
      password: generatePasswordHash(req.body.password),
    };
  
    knex("users")
      .where("id", req.params.id)
      .update(data_to_update)
      .then((inserted_id) => {
        knex("users")
          .where("id", inserted_id)
          .then((rows) => res.status(200).json(rows));
      });
  };
  
  exports.delete = (req, res) => {
    knex("users")
      .where("id", req.params.id)
      .del()
      .then((data) => res.status(200).json(data));
  };
  
  exports.login = (req, res) => {
    auth_data = {
        email: req.body.email,
        password: req.body.password,
    }

    try {
        knex("users")
            .where("email", auth_data.email)
            .then((user) => {
                let authenticated = validatePassword(auth_data.password, user[0].password);
    
                if(authenticated) {
                    token = jwt.sign({id: user[0].id},  config.secret, {expiresIn: "10d"});
                    res.status(200).json({ status: 200, data: user, token: token });
                } else {
                    res.status(400).json({ status: 400, message: "Password is wrong." });
                }   
            });
    } catch (error) {
        res.status(400).json({ status: 400, message: "No account exist" });
    }
  };

const generatePasswordHash = (password) => {    
    const saltRounds = 10;
    var salt = bcrypt.genSaltSync(saltRounds);
    var hash = bcrypt.hashSync(password, salt);
    return hash;
}

const validatePassword = (password, hashedPassword) => {
    let res = bcrypt.compareSync(password, hashedPassword);
    return res;
}