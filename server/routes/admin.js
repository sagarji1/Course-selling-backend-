const { Router } = require("express");
const adminRouter = Router();
const { adminModel, courseModel } = require("../db");
const { default: mongoose } = require("mongoose");
const jwt = require("jsonwebtoken");
require("dotenv").config();
const bcrypt = require("bcrypt");
const { z, string, number } = require("zod");
const course = require("./course");

adminRouter.post("/signup", async (req, res) => {
  try {
    //schema for password
    const passwordSchema = z
      .string()
      .min(8)
      .max(100)
      .regex(/[A-Z]/, "Password must contain atleast 1 uppercase character")
      .regex(/[a-z]/, "Password must contain atleast 1 lowercase character")
      .regex(/[0-9]/, "Password must contain atleast 1  number")
      .regex(
        /[^A-Za-z0-9]/,
        "Password must contain at least one special character"
      );
    //using zod
    const requireBody = z.object({
      email: z.string().min(3).max(100).email(),
      password: passwordSchema,
      lname: z.string().min(3).max(30),
      fname: z.string().min(3).max(30),
    });
    //parse and validate data
    const safeparsedata = requireBody.safeParse(req.body);
    if (!safeparsedata.success) {
      return res.status(400).json({
        msg: "incorrect format",
        errors: safeparsedata.error.errors,
      });
    }
    //using validated data
    const { email, password, lname, fname } = safeparsedata.data;
    const duplicateEmailCheck = await adminModel.findOne({ email: email });
    if (duplicateEmailCheck) {
      return res.status(409).json({ msg: "email already exists" });
    }
    //hashing the password with bcrypt
    const hashedpassword = await bcrypt.hash(password, 10);
    //adding data to the db
    await adminModel.create({
      email: email,
      password: hashedpassword,
      fname: fname,
      lname: lname,
    });
    return res
      .status(201)
      .json({ msg: "signup successful, kindly signin now" });
  } catch (err) {
    res.status(500).json({ msg: "internal server error" });
  }
});

adminRouter.post("/signin", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const person = await adminModel.findOne({ email: email });
    if (!person) {
      return res.json({ mas: "admin not found" });
    }
    const ismatch = await bcrypt.compare(password, person.password);
    if (!ismatch) {
      return res.json({ msg: "incorrect credentials" });
    }
    const token = jwt.sign(
      {
        id: person.id,
      },
      process.env.jwtsecretkey
    );
    res.json({ msg: "you are signed in", token });
  } catch (err) {
    res.status(500).json({ msg: "internal server error" });
  }
});

async function auth(req, res, next) {
  const token = req.headers.token;
  const person = await jwt.verify(token, process.env.jwtsecretkey);
  if (!person) {
    return res.json({ msg: "invalid token" });
  }
  if (person) {
    req.adminId = person.id;
    next();
  } else {
    res.json({ msg: "invalid admin" });
  }
}
adminRouter.post("/courses", auth, async (req, res) => {
  const { title, description, price, imageUrl, createrId } = req.body;
  await courseModel.create({
    title,
    description,
    price,
    imageUrl,
    createrId: req.adminId,
  });
  res.json({ msg: "course added successfully", course });
});

const updateCourseSchema = z.object({
  title: z.string().min(5).max(100).optional(),
  description: z.string().min(5).max(500).optional(),
  price: z.number().min(0).optional(),
  imageUrl: z.string().url().optional(),
});

adminRouter.put("/courses/:id", auth, async (req, res) => {
  const courseid = req.params.id;
  const adminId = req.adminId;
  const safeparsedata = updateCourseSchema.safeParse(req.body);
  if (!safeparsedata.success) {
    return res.status(400).json({
      msg: "invalid format",
      errors: safeparsedata.error.errors,
    });
  }
  try {
    const coursedata = safeparsedata.data;
    const updatedCourse = await courseModel.findByIdAndUpdate(
      courseid,
      {
        $set: {
          ...coursedata,
          updatedBy: adminId,
        },
      },
      { new: true }
    );
    if (!updatedCourse) {
      return res.status(404).json({ msg: "data not updated" });
    }
    return res
      .status(200)
      .json({ msg: "course updated successfully", course: updatedCourse });
  } catch (err) {
    res.status(500).json({ msg: "internal server error" });
  }
});
adminRouter.get("/courses/bulk", auth, async (req, res) => {
  try {
    const courses = courseModel.find();
    res.json({ courses });
  } catch (err) {
    res.json({ msg: "courses not found" });
  }
});
module.exports = {
  adminRouter: adminRouter,
};
