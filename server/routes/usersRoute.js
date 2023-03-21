const router = require("express").Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
//const auth = require("../middleware/auth")

router.post("/register", async (req, res) => {
  try {

    const userExists = await User.findOne({ email: req.body.email });
    if (userExists) {
      return res.send({
        success: false,
        message: "User already exists",
      });
    }


    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(req.body.password, salt);
    req.body.password = hashedPassword;


    const newUser = new User(req.body);
    await newUser.save();

    res.send({ success: true, message: "Registration Successfully" });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});


router.post("/login", async (req, res) => {
  try {

    const user = await User.findOne({ email: req.body.email });
    if (!user) {
      return res.send({
        success: false,
        message: "User does not exist",
      });
    }


    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );

    if (!validPassword) {
      return res.send({
        success: false,
        message: "Invalid password",
      });
    }


    const token = jwt.sign({ userId: user._id }, process.env.jwt_secret, {
      expiresIn: "5h",
    });

    res.send({
      success: true,
      message: "User logged in successfully",
      data: token,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

/*router.get("/get-current-user", async(req,res)=> {
  try{
    const user = await User.findById(req.body.userId).select("-password");
    res.send({
      success: true,
      message:"User fetched",
      data: user,
    });
  } catch (error){
    res.send({
      success:false,
      message:error.message,
    }) ;
  }
}) */

module.exports = router;