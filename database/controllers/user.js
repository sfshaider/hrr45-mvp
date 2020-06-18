const User = require("../models/users.js")
const salt = require("../salt.js");
// const secret = require("../secret.js")
// const jwt = require("jwt-then");


exports.register = async (req, res) => {
  console.log(req.body);
  const { name, email, password } = req.body;

  if (password.length < 6) {
    res.status(404).end("Password too short. Must be atleast 6 characters long.");
  }
  const userExists = await User.findOne({
    email,
  });

  if (userExists) {
    res.status(404).end("Email already exits.")
  } else {
    const user = new User({
      name,
      email,
      password: password + salt,
    });

    await user.save();

    res.json({
      message: name + " registered successfully!",
    });
  }
};

exports.login = async (req, res) => {
  console.log(req.body);
  const { email, password } = req.body;
  const user = await User.findOne({
    email,
    password: password + salt,
  });

  if (!user) {
    res.status(404).json("Email and Password did not match.")
  } else {
    res.json({
      message: "User logged in successfully!",
      userId: user.id,
    });
  };
};