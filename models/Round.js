const { Schema, model } = require('mongoose');
const roundSchema = new Schema({
roundNumber: {
    type: Number,
    required: true,
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
],
lpo: {
    type: String,
    required: false
},
lat: {
    type: Number,
    required: true
},
lng:{
    type: Number,
    required: true
}
})

const Round = model('Round', roundSchema)

module.exports = Round;