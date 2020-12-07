const Users = require("../model/Users");
const crypto = require("crypto");

const validate_fields = (email, password) => {
  const regex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  const errors = [];
  if (!email) {
    errors.push("Please fill in email field.");
  }
  if (email && !regex.test(email)) {
    errors.push("Please fill in a valid email address");
  }
  if (!password) {
    errors.push("Please fill in password");
  }
  if (errors.length === 0) {
    return {
      email,
      password: create_password_hash(password),
    };
  } else {
    return {
      error: errors,
      code: 400,
    };
  }
};

// method that returns a successfull response object
const json_success_response = (response, message, data, code) => {
  return response.status(code).json({
    message,
    data,
  });
};
// method that returns a failed response object
const json_error_response = (response, message, code) => {
  return response.status(code).json({
    code,
    message,
  });
};

// helper function for creating a new user
const createUser = async (email, password) => {
  const results = {};
  const user = new Users({
    email,
    password,
  });
  const data = await user.save();
  return data;
};

//function to create a hashed password
const create_password_hash = (password) => {
  let hash = crypto.createHash("sha256").update(password).digest("hex");
  return hash;
};

const check_user_details = async (username, password) => {
  const user_check = await Users.find({
    email: username,
    password: create_password_hash(password),
  });
  return user_check;
};

//exporting functions
module.exports = {
  validate_fields,
  json_error_response,
  json_success_response,
  createUser,
  check_user_details,
};
