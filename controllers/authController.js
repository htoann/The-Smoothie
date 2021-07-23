const User = require("../models/User");
const jwt = require("jsonwebtoken");

// handle errors
const handleErrors = (err) => {
  console.log(err.message, err.code);
  let errors = { email: "", password: "" };

  // duplicate error code
  if (err.code === 11000) {
    errors.email = "That email is already registered";
    return errors;
  }

  // validation errors
  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach(({ properties }) => {
      errors[properties.path] = properties.message;
    });
  }

  return errors;
};

module.exports.get_signup = (req, res, next) => {
  res.render("signup");
};

module.exports.get_login = (req, res, next) => {
  res.render("login");
};

module.exports.post_signup = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.create({ email, password });
    res.json(user);
  } catch (err) {
    const errors = handleErrors(err);
    res.json({ errors });
  }
};

module.exports.post_login = async (req, res, next) => {};
