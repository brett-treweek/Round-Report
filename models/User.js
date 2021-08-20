const { Schema, model } = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true,
  },
  lastName: {
    type: String,
    required: true,
    trim: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
    minlength: 5,
  },
  hazards: [
    {
      type: Schema.Types.ObjectId,
      ref: "Hazard",
    },
  ],
});

// Hashing passwords with bcrypt.
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// Checking if password is correct.
userSchema.methods.isCorrectPassword = async function (password) {
  console.log(password, this.password);
  const match = await bcrypt.compare(password, this.password);
  console.log("match",match);
  return match
};

const User = model("User", userSchema);

module.exports = User;
