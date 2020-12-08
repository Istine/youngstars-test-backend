require("dotenv").config()

const BASE_URL = "http://localhost:8000";
const {
  validate_subscription_choice,
  json_error_response,
  add_subscription,
} = require("../middleware/helpers");
const mockAxios = require("./axios"); // get axios mock object

const mongoose = require("mongoose");
const databaseName = "Pet_assist";

beforeAll(async () => {
  await mongoose.connect(process.env.URI, {
    dbName: databaseName,
    user: process.env.URI_USERNAME,
    pass: process.env.URI_PASSWORD,
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
  });

  const connection = mongoose.connection;
  connection.once("open", () => console.log("MongoDB connection established test..."));
});

const methods = {
  subscribe_to_channel: async () => {
    try {
      const response = await mockAxios.put(
        `${BASE_URL}/channels?${JSON.stringify({
          email: "user@petsassist.com",
        })}`,
        {
          subscribe_to: "Cat",
        },
        {
          headers: {
            "content-type": "application/json",
          },
        }
      );
      return response;
    } catch (error) {
      return error;
    }
  },
  subscribe_to_channel_fail: async () => {
    try {
      const response = await mockAxios.put(
        `${BASE_URL}/channels?${JSON.stringify({ username: "user" })}`,
        {
          subscribe_to: "Goat",
        },
        {
          headers: {
            "content-type": "application/json",
          },
        }
      );
      return response;
    } catch (error) {
      return error;
    }
  },
};

//helper function for getting query params
const getParams = (url) => {
  let param = url.split("?")[1];
  param = JSON.parse(param);
  return param;
};

//helper function to mock database request
const add_subscription_mock = (user, channel) => {
  //mock users
  const mock_users = {
    user1: {
      password: "xyz",
      subscriptions: new Set(["Dog"]),
    },
  };
  //check if user is in database
  if (mock_users[user] == undefined) {
    return {
      success: false,
      update: [],
    };
  }
  // add subscription to channel
  const { subscriptions } = mock_users[user];
  subscriptions.add(channel);
  return {
    success: true,
    update: subscriptions,
  };
};

//test for successful request
test("should return a success message object", async () => {
  
    const choices = ["Dog", "Cat", "Goat"];
    const acceptableFormats = ["application/json"]; //content-type mock
    mockAxios.put.mockImplementationOnce(async (url, body, config) => {
      //content type header check
      try {
      const content_type = config.headers;
      if (acceptableFormats[0] !== content_type["content-type"]) {
        return Promise.resolve({
          error_message: "unacceptable content-type",
        });
      }

      const { subscribe_to } = body; // get choice
      //validate sunscription choice
      const validated_response = validate_subscription_choice(subscribe_to);
      if (!validated_response) {
        return Promise.resolve({
          message: `Please choose a channel between ${choices}`,
          code: 400,
        });
      }

      //add channel to subscriptions list
      const data = await add_subscription(
        getParams(url),
        subscribe_to
      );
      // check if the mock request was successfull
      if (!data.success) {
        //return error object
        return {
          message: "error encountered",
          data: [],
        };
      }
      // return success object
      return {
        message: "success",
        data: data.update,
      };
    }
    catch(err){
      return Promise.resolve({
        error
      })
    }
    });

  const data = await methods.subscribe_to_channel();
  expect(data.message).toBe("success");
});

//test for failed update
test("should return a success message object", async () => {
  
  const choices = ["Dog", "Cat", "Goat"];
  const acceptableFormats = ["application/json"]; //content-type mock
  mockAxios.put.mockImplementationOnce(async (url, body, config) => {
    //content type header check
    try {
    const content_type = config.headers;
    if (acceptableFormats[0] !== content_type["content-type"]) {
      return Promise.resolve({
        error_message: "unacceptable content-type",
      });
    }

    const { subscribe_to } = body; // get choice
    //validate sunscription choice
    const validated_response = validate_subscription_choice(subscribe_to);
    if (!validated_response) {
      return Promise.resolve({
        message: `Please choose a channel between ${choices}`,
        code: 400,
      });
    }

    //add channel to subscriptions list
    const data = await add_subscription(
      getParams(url),
      subscribe_to
    );
    // check if the mock request was successfull
    if (!data.success) {
      //return error object
      return {
        message: "error encountered",
        data: [],
      };
    }
    // return success object
    return {
      message: "success",
      data: data.update,
    };
  }
  catch(err){
    return Promise.resolve({
      error
    })
  }
  });

const data = await methods.subscribe_to_channel_fail();
expect(data.message).toBe("error encountered");
});