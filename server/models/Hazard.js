const { Schema, model } = require('mongoose');

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
        enum: {
            values: ['Aggresive Dog', 'Aggresive Human', 'Aggresive Magpie', 'Blind Driveway', 'Slippery Surface', 'School', 'Intersection', 'Roadworks', 'Missing Letterbox', 'Other']
        },
        required: true
    },
    message: {
        type: String
    },
    address: {
        type: String,
        required: true
    },
    lat: {
        type: Number,
        required: true
    },
    lng: {
        type: Number,
        required: true
    },
    

})

const Hazard = model('Hazard', hazardSchema)

module.exports = Hazard;