const express = require("express")
const jwt = require("jsonwebtoken")
const { userRouter } = require("./routes/user")
const { courseRouter } = require("./routes/course")
const {adminRouter} = require("./routes/admin")
const app = express()
app.use(express.json());
const mongoose = require("mongoose")
require('dotenv').config();

app.use('/api/v1/user',userRouter)
app.use('/api/v1/course',courseRouter)
app.use('/api/v1/admin',adminRouter)
    
function main(){
    mongoose.connect(process.env.DB_connect)
    app.listen(process.env.localhost, () => {
        console.log("Server running on http://localhost:3000")
    })   
}
main()