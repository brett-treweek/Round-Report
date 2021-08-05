const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt')

const userSchema = new Schema({
    firstName: {
        type: String,
        required: true,
        trim: true
      },
      lastName: {
        type: String,
        required: true,
        trim: true
      },
      email: {
        type: String,
        required: true,
        unique: true
      },
      password: {
        type: String,
        required: true,
        minlength: 5
      },
      hazards: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Hazard'
        }
      ]
})

const User = model('User', userSchema)

module.exports = User;