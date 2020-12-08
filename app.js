require("dotenv").config(); // configuring access to environment variables

const express = require("express");
const app = express(); // call express function
const mongoose = require("mongoose");
const cors = require("cors")


const PORT = process.env.PORT || 3000;

app.use(cors())
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//enable cors

// let allowedList = ["http://localhost:3000"] // list of allowed origins
// const corsOptions = (req, callback) => {
//     let options
//     if(allowedList.indexOf(req.header("Origin") != -1)) {
//         options = {
//             origin:true,
//             credentials: true
//         }
//     }
//     else {
//         options = {
//             origin:false,
//             credentials: false
//         }
//     }

//     callback(null, options)
// }

//connect to atlas
const URI = process.env.URI;
//connect to mongodb Atlas
mongoose.connect(URI, {
dbName:"Pet_assist",
user:process.env.URI_USERNAME,
pass:process.env.URI_PASSWORD,
  useNewUrlParser: true,
  useCreateIndex: true,
  useUnifiedTopology: true,
});


const connection = mongoose.connection;
connection.once("open", () => console.log("MongoDB connection established"));

//routes
app.use("/signup", require("./routes/signup")); // singup route
app.use("/login", require("./routes/login")); //login route
app.use("/channels", require("./routes/channels")); // channels route

// server listening on port
app.listen(PORT, () => console.log("Sever running on port " + PORT));
