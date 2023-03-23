const router = require("express").Router();
const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const auth = require("../middleware/auth")
var nodeoutlook = require('nodejs-nodemailer-outlook')

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

    res.send({ 
      success: true, 
      message: "Verfication code sent to email" 

    });

    

    code = Math.floor(Math.random() * (99999-10000))

    nodeoutlook.sendEmail({
      auth: {
          user: "yl205@outlook.com",
          pass: "lhs52329"
      },
      from: 'yl205@outlook.com',
      to: req.body.email,
      subject: 'Verification Email',
      html: 'Thank you for registering with us. Before you can proceed, please enter the given verification code: ' + code,
      text: 'This is text version!',
      onError: (e) => console.log(e),
    onSuccess: (i) => console.log(i)
    },

    function validateForm() {
      let x = document.forms["myForm"]["fname"].value;
      if (x == "") {
        alert("Name must be filled out");
        return false;
      } 
    }

    );

   

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
      message: "User logged in successful",
      data: token,
    });
  } catch (error) {
    res.send({
      success: false,
      message: error.message,
    });
  }
});

router.get("/current-user", auth, async(req,res)=> {
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
}) 

module.exports = router;