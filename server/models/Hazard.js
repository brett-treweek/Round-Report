const { Schema, model } = require('mongoose');
const Round = require('./Round');

const hazardSchema = new Schema({
    roundNumber: {
        type: Number,
        required: [true, 'Please enter this round number'],
        min: 1,
        max: 100
    },
    round: {
        type: Schema.Types.ObjectId,
        ref: 'Round'
    },
    hazardType: {
        type: String,
        required: true
    },
    title: {
        type: String
    },
    message: {
        type: String
    },
    rating: {
        type: String,
        enum: {
            values: ['Yellow', 'Orange', 'Red']
        }
    },
    imageFile: {
        type: String
    },
    location: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    creator: {
        type: String
    }

})

const Hazard = model('Hazard', hazardSchema)

module.exports = Hazard;