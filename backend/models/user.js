const { Schema, model } = require('mongoose')

const schema = new Schema({
    email: { type: String, required: true},
    password: { type: String, required: true },
    status: { type: String, required: true },
    role_id: { type: Schema.Types.ObjectId, ref: 'Role', required: true},
}, { timestamps: { createdAt: 'created_at' } })

module.exports = model('User', schema);