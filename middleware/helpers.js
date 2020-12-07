const Users = require("../model/Users"); // Users model
const crypto = require("crypto"); // crypto module for hashing password

const JWT = require("jsonwebtoken"); // jwt module import
const Channels = require("../model/Channels");

//fields validator function
const validate_fields = (email, password) => {
  //regex for validating input
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
      password: password,
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
  const response = await check_user_details(email, password);

  const user = new Users({
    email,
    password: create_password_hash(password),
  });
  const data = await user.save();
  return data;
};

//function to create a hashed password
const create_password_hash = (password) => {
  let hash = crypto.createHash("sha256").update(password).digest("hex");
  return hash;
};

//function to check for user details in the database
const check_user_details = async (username, password) => {
  try {
    const user_check = await Users.find({
      email: username,
      password: create_password_hash(password),
    });
    return user_check;
  } catch (err) {
    return [];
  }
};

//jwt token create function
const create_token = (username) => {
  const token = JWT.sign({ username }, "youngstars", {
    expiresIn: "1h",
  });
  return token;
};

//token verification
const verify_token = (request) => {
  try {
    const token = request.headers.authorization.split(" ")[1];
    const decoded = JWT.verify(token, "youngstars");
    return {
      decoded,
      code: 200,
    };
  } catch (error) {
    return {
      error: error.message,
      code: 400,
    };
  }
};

//get all channels
const fetch_all_channels = async () => {
  const all_channels = await Channels.find();
  return all_channels;
};

//validate subscription choice
const validate_subscription_choice = (choice) => {
  switch (choice) {
    case "Dog":
      return true;
    case "Cat":
      return true;
    case "Goat":
      return true;
    default:
      return false;
  }
};

//add subscription to user subscriptions
const add_subscription = async (request, subscription) => {
  const email = request.email;
  const update = await Users.updateOne(
    {
      email,
    },
    {
      $push: {
        subscriptions: subscription,
      },
    }
  );

  if (update.nModified == 1) {
    return {
      success: true,
      update,
    };
  } else {
    return {
      success: false,
      update,
    };
  }
};

//get user channels
const get_user_channels = async (username) => {
  try {
    //get users by email from db
    const channels = await Users.find({
      email: username,
    });
    console.log(username)
    if(channels.length > 0) {
       return {
            channels:channels.subscriptions,
            code:200
        }
    }
    else {
        return {
            code:404,
            channels
        }
    }
  } catch (error) {
      return {
          error,
          code:500
      }
  }
};

//exporting functions
module.exports = {
  validate_fields,
  json_error_response,
  json_success_response,
  createUser,
  check_user_details,
  create_token,
  verify_token,
  fetch_all_channels,
  validate_subscription_choice,
  add_subscription,
  get_user_channels
};
