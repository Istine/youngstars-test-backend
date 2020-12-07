const {
  validate_fields,
  json_error_response,
  check_user_details,
  json_success_response,
} = require("./helpers");

// middleware for authenticating user
const authenticate_user = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const data = validate_fields(username, password);
    if (data.error) {
      json_error_response(res, data.error, data.code);
    }

    const response = await check_user_details(username, password);
    if(response.length > 0) {
        json_success_response(res, "Login success", response, 200)
    }

    json_error_response(res, "User not found", 404)
  } catch (error) {
      json_error_response(res, error.message, 500)
  }
};

module.exports = {
    authenticate_user
}