const mongoose = require("mongoose")
const Schema = mongoose.Schema;
const objectId = mongoose.Types.ObjectId
require("dotenv").config();
mongoose.connect(process.env.DB_connect)

const userSchema = new Schema({
    email:{type:String,unique:true},
    password:String,
    fname:String,
    lname:String,
    role:String,
    purchasedCourses : [{type:Schema.Types.ObjectId , ref:"course"}]
})

const adminSchema = new Schema({
    email:String,
    password:String,
    fname:String,
    lname:String,
})
const courseSchema = new Schema({
    title:String,
    description:String,
    price:Number,
    imageUrl:String,
    createrId:{type: Schema.Types.ObjectId,ref:"admin",required:true},
    updatedBy:{type: Schema.Types.ObjectId,ref:"admin"}
})
const purchaseSchema = new Schema({
    userId:objectId,
    courseId:objectId,
})

const UserModel = mongoose.model('user',userSchema)
const adminModel = mongoose.model('admin',adminSchema)
const courseModel = mongoose.model('course',courseSchema)
const purchaseModel = mongoose.model('purchase',purchaseSchema)

module.exports={
    UserModel,adminModel,courseModel,purchaseModel
}