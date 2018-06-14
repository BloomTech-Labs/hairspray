const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const Admin = require("../models/Admin.js");

const createAdmin = (req, res) => {
    const password = req.password;
    const{ name, phone, email } = req.body;
    if (!email) {
        res.status(422).json({ error: " You didn't provide an email address "})
    return;
}

const newAdmin = new Admin({
    name,
    phone, 
    email,
    password
});
newAdmin
    .save()
    .then(createdAdmin => res.json(createdAdmin))
    .catch(err => res.status(500).json(err));
}

const getAdmin = (req, res) => {
    const { id } = req.params;
    Admin.findById(id).exec((err, admin) => {
        if (err) {
            res.status(422).json({ "That admin doesn't exist": err});
            return;
        }
        res.json(admin);
    });
};

const updateAdmin = (req, res) => {
    const { id } = req.params;
    const { name, phone, email } = req.body;
    Admin.findByIdAndUpdate(id, req.body, { new: true }).exec((err, admin) => {
        if (err) {
            res.status(422).json({ "Could not find that admin": err});
            return;
        }
        res.json(admin);
    });
};

const adminLogin = (req,res) => {
    res.json(req.loggedInAdmin);
};

module.exports = {
    createAdmin,
    getAdmin,
    updateAdmin,
    adminLogin
}