const {
  verify_token,
  json_error_response,
  fetch_all_channels,
  json_success_response,
  validate_subscription_choice,
  add_subscription,
  get_user_channels,
  add_subscription_array,
} = require("./helpers");

// middleware to authorize users
const authorize_client = (req, res, next) => {
  try {
    const decoded = verify_token(req); // verify token with request object
    if (decoded.error) {
      json_error_response(res, decoded.error, decoded.code);
      return
    }
    req.email = decoded.decoded.username;
    next(); // call next function
    return;
  } catch (error) {
    json_error_response(res, error.message, 500);
  }
};

//get all channels
const get_all_channels = async (req, res) => {
  try {
    const all_channels = await fetch_all_channels();
    return json_success_response(res, "Success", all_channels, 200);
  } catch (error) {
    json_error_response(res, error.message, 500);
  }
};

// middleware for subscribing to a channel
const subscribe_to_channel = async (req, res) => {
  try {
    const { subscribe_to } = req.body; // get subscription choice
    let response = subscribe_to;
    if(typeof subscribe_to !== "object")  {
     response = validate_subscription_choice(subscribe_to);
    }
    if (!response) {
      json_error_response(
        res,
        "Please choose a channel between " + ["Dog", "Cat", "Goat"],
        400
      );
      return
    }
    const data = await add_subscription(req, subscribe_to); // await update operation
    if (!data.success) {
      json_error_response(res, data.update, 500);
      return
    } else {
      json_success_response(res, "success", data.update, 201);
      return
    }
  } catch (error) {
    json_error_response(res, error.message, 500);
    return
  }
};

//get channels for specific user
const fetch_my_channels = async (req,res) => {
    try {
        const username = req.query["username"]
        const response = await get_user_channels(username)
        if(response.error) {
           json_error_response(res, response.error, response.code)
           return 
        }

        json_success_response(res, "success", response.channels,response.code)
        return
    } catch (error) {
        json_error_response(res, error.message, 500)
        return
    }
}

module.exports = {
  authorize_client,
  get_all_channels,
  subscribe_to_channel,
  fetch_my_channels
};
