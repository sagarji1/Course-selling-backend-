const { Router } = require("express");
const userRouter = Router();
const { UserModel, courseModel } = require("../db");
const jwt = require("jsonwebtoken");
const course = require("./course");
const z = require("zod");
const bcrypt = require("bcrypt");
require("dotenv").config();

userRouter.post("/signup", async (req, res) => {
  try {
    const passwordSchema = z
      .string()
      .min(8)
      .max(32)
      .regex(/[A-Z]/, "password should contail atleast one capital letter")
      .regex(/[a-z]/, "password should contail atleast one small letter")
      .regex(/[0-9]/, "password should contail atleast one  number")
      .regex(
        /[^A-Za-z0-9]/,
        "password should contail atleast one special character"
      );

    const requireBody = z.object({
      email: z.string().min(8).max(100).email(),
      password: passwordSchema,
      fname: z.string().min(3).max(100),
      lname: z.string().min(3).max(100),
    });
    const parseddata = requireBody.safeParse(req.body);
    if (!parseddata.success) {
      return res.status(400).json({
        msg: "incorrect format",
        errors: parseddata.error.errors,
      });
    }
    const { email, password, fname, lname } = parseddata.data;
    const duplicateEmailCheck = await UserModel.findOne({ email: email });
    if (duplicateEmailCheck) {
      return res.status(409).json({ msg: "user already exist" });
    }
    const hashedpassword = await bcrypt.hash(password, 10);
    await UserModel.create({
      email: email,
      password: hashedpassword,
      lname: lname,
      fname: fname,
    });
    return res
      .status(200)
      .json({ msg: "signup successfully , you can signin now !!!" });
  } catch (err) {
    res.status(500).json({ msg: "internal server error" });
  }
});

userRouter.post("/signin", async (req, res) => {
  try {
    const email = req.body.email;
    const password = req.body.password;
    const person = await UserModel.findOne({ email: email });
    if (!person) {
      return res.status(404).json({ msg: "user not found" });
    } else {
      const passwordmatch = await bcrypt.compare(password, person.password);
      if (!passwordmatch) {
        return res.json({ msg: "invalid credentials" });
      }
      const token = jwt.sign(
        {
          id: person.id,
        },
        process.env.jwtsecretkey
      );
      return res.json({
        msg: "you have signedin , do whatever you want",
        token,
      });
    }
  } catch (err) {
    res.status(500).json({ msg: "internal server error" });
  }
});

function auth(req, res, next) {
  try {
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res.status(401).json({ msg: "No token provided" });
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(401).json({ msg: "Invalid token format",token :token});
    }
    const person = jwt.verify(token, process.env.jwtsecretkey);
    if (!person) {
      return res.status(401).json({ msg: "invalid user" });
    }
    if (person) {
      req.userId = person.id;
      next();
    }
  } catch (err) {
    res.status(401).json({ msg: "you have not signedin, please signedin" });
  }
}

userRouter.post("/purchase/:courseId", auth, async (req, res) => {
  const courseId = req.params.courseId;
  const course = await courseModel.findById(courseId);
  if (!course) {
    return res.status(400).json({ msg: "course not found " });
  }
  const user = await UserModel.findByIdAndUpdate(
    req.userId,  
    {
      $addToSet: { purchasedCourses: courseId },
    },
    { new: true }
  ).populate("purchasedCourses")
  return res.status(200).json({
    msg:"course purchased successfully",
    purchasedCourses:user.purchasedCourses,
  })
});

userRouter.get("/purchase", auth, async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId).populate(
      "purchasedCourses"
    );
    if (!user) {
      return res.status(404).json({ msg: "User not found" });
    }
    res.json({ purchasedCourses: user.purchasedCourses });
  } catch (err) {
    res.status(500).json({ msg: "internal server error" });
  }
});
module.exports = {
  userRouter: userRouter,
};
