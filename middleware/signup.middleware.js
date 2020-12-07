const { validate_fields, json_error_response } = require("./helpers")

//middleware function for creating a new user
const create_new_user = (req, res, next) => {
    try {
        const { username, password} =  req.body // get username and password from request body
        //validate the username and password
        const data = validate_fields(email, password)
        if(data.error) {
           return json_error_response(res, data.error, data.code) 
        }

        //  call function to create user in database
    } catch (error) {
        
    }
}