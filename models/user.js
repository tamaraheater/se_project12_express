const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 2,
    maxlength: 30,
  },
  avatar: {
    type: String,
    required: [true, "The avatar field is required."],
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: "You must enter a valid URL.",
    },
  },
  email: {
    type: String,
    required: [true, "The email field is required."],
    unique: true,
    trim: true,
    lowercase: true,
    validate: {
      validator(value) {
        return validator.isEmail(value);
      },
      message: "You must enter a valid email.",
    },
  },
  password: {
    type: String,
    required: [true, "The password field is required."],
    minlength: 8,
    select: false,
  },
});

// Password hashing middleware - Non-async version (better for ESLint)
userSchema.pre("save", function (next) {
  if (!this.isModified("password")) {
    return next();
  }

  bcrypt.genSalt(10, (saltError, salt) => {
    if (saltError) {
      return next(saltError);
    }

    bcrypt.hash(this.password, salt, (hashError, hash) => {
      if (hashError) {
        return next(hashError);
      }
      this.password = hash;
      return next();
    });
  });
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password
) {
  return this.findOne({ email })
    .select("+password")
    .then((user) => {
      if (!user) {
        return Promise.reject(new Error("Incorrect email or password"));
      }

      return bcrypt.compare(password, user.password).then((matched) => {
        if (!matched) {
          return Promise.reject(new Error("Incorrect email or password"));
        }
        return user;
      });
    });
};

module.exports = mongoose.model("user", userSchema);
