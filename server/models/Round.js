const { Schema, model } = require('mongoose');

const roundSchema = new Schema({
roundNumber: {
    type: Number,
    required: true,
    unique: true,
    min: 1,
    max: 100
},
startAddress: {
    type: String
},
hazards: [
    {
        type: Schema.Types.ObjectId,
        ref: 'Hazard'
    }
]
})

const Round = model('Round', roundSchema)

module.exports = Round;