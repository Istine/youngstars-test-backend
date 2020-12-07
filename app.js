const express = require('express')
const app = express() // call express function

const PORT = process.env.PORT || 3000


app.use(express.json())
app.use(express.urlencoded({extended:false}))

//routes
app.use("/", require("./routes/signup")) // singup route
app.use("/login", require("./routes/login")) //login route
app.use("/channels", require("./routes/channels")) // channels route

// server listening on port 
app.listen(PORT,() => console.log("Sever running on port " + PORT))

