const mongoose = require("mongoose");
const validate = require("mongoose-validator");
const Schema = mongoose.Schema; 

let adminSchema = new Schema({
    name: { required: true, type: String },
    phone: {
    type: String,
    lowercase:true,
    trim: true,
    unique: true,
    sparse: true,
    validate: [
        validate({
            validator: "isNumeric",
            arguments: [7, 20],
            message: "This is not a valid phone number"
        })
    ]
},
    email: {
        type: String,
        lowercase: true,
        trim: true,
        index: true,
        unique: true,
        spars: true,
        validate: [
            validate({
                validator: "isEmail",
                message: "This is not a valid email"
            })
        ]
    },
    password: { type: String },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("User", adminSchema);



