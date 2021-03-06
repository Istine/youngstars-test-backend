const {
  validate_fields,
  json_error_response,
  check_user_details,
  json_success_response,
  create_token
} = require("./helpers");

// middleware for authenticating user
const authenticate_user = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const data = validate_fields(username, password);
    if (data.error) {
      json_error_response(res, data.error, data.code);
      return
    }

    const response = await check_user_details(username, password);
    if(response.length > 0) {
        const token = create_token(username)
        const data = {
            token
        }
        json_success_response(res, "Login success", data, 200)
        return
    }

    json_error_response(res, ["Invalid username or password"], 404)
    return
  } catch (error) {
      json_error_response(res, error.message, 500)
      return
  }
};

module.exports = {
    authenticate_user
}