const { Schema, model } = require('mongoose')

const flightSchema = Schema({
    destination: { type: String, required: [true, 'Destination point is required']},
    city: { type: String, required: [true, 'City  is required']},
    date: { type: String, required: [true, 'Date is required']},
    time: { type: String, required: [true, 'Time is required']},
    seats: { type: Number, required: [true, 'All fields are required'] },
    price: { type: Number, required: [true, 'All fields are required'] },
    description: { type: String, required: [true, 'Time is required']},
    creator: { type: Schema.Types.ObjectId, ref: 'User', required: true},
    imagePath: { type: String, require: true },
    passengers: [{ type: Schema.Types.ObjectId, ref: 'User', required: true}],      
}, { timestamps: { createdAt: 'created_at' } });

module.exports = model('Flight', flightSchema);