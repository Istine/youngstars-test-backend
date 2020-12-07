const { verify_token, json_error_response, fetch_all_channels, json_success_response } = require("./helpers")

// middleware to authorize users
const authorize_client = (req, res, next) => {
    try {
        const decoded = verify_token(req) // verify token with request object
        console.log(decoded.error)
        if(decoded.error) {
            json_error_response(res, decoded.error, decoded.code)   
        }
        next() // call next function
        return
    } catch (error) {
        json_error_response(res, error.message, 500)   
    }
}

//get all channels
const get_all_channels = async (req, res) => {
    try {
        const all_channels = await fetch_all_channels()
        return json_success_response(res, "Success", all_channels, 200)
    } catch (error) {
        json_error_response(res,error.message, 500)
    }
}

module.exports = {
    authorize_client,
    get_all_channels
}
