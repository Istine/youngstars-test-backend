const express = require('express')
const app = express() // call express function

const PORT = process.env.PORT || 3000


app.get("/", (req, res) => {
    res.json({
        message:"Hello sean!"
    })
})

app.use(express.json())
app.use(express.urlencoded({extended:false}))

// server listening on port 
app.listen(PORT,() => console.log("Sever running on port" + PORT))

