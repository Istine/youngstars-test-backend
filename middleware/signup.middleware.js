const {
  validate_fields,
  json_error_response,
  createUser,
  json_success_response,
} = require("./helpers");

//middleware function for creating a new user
const create_new_user = async (req, res) => {
  try {
    const { username, password } = req.body; // get username and password from request body
    //validate the username and password
    const data = validate_fields(username, password);
    if (data.error) {
      return json_error_response(res, data.error, data.code);
    }
    const response =  await createUser(data.email, data.password);
    console.log(response)
    if (!response) {
      return json_error_response(res, "Failed to create user.", 400);
    }

    return json_success_response(res, "Successfully created user", null, 201);

    //  call function to create user in database
  } catch (error) {
    json_error_response(res, error.message, 500);
  }
};

module.exports = {
  create_new_user,
};
