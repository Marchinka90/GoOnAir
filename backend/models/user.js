const { Schema, model } = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator');

const schema = new Schema({
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    status: { type: String, required: true },
    role: { type: String, required: true },
}, { timestamps: { createdAt: 'created_at' } })

schema.plugin(uniqueValidator);

module.exports = model('User', schema);