const Userdata = require("../models/userModel");
const bcrypt = require("bcrypt");

exports.userSignup = async (req, res) => {
  try {
    const { name,password,  email } = req.body;
    console.log({name,password,  email})
    const existingUser = await Userdata.findOne({ email: email });
    if (existingUser) {
      return res.status(400).json({ message: "User is already registered" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new Userdata({
      name:name,
      email: email,
      hash: hashedPassword, 
    });

    const saveData = await newUser.save();
    console.log(saveData);
    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Server Error" });
  }
};

exports.userLogin = async (req, res) => {
  try {
    const {password,email } = req.body;
    console.log({password,  email})
    const user = await Userdata.findOne({ email: email });
    if (!user) {
      return res.status(400).json({ message: "User not registered " });
    }
    const passwordCheck= await bcrypt.compare(password, user.hash);
        if(!passwordCheck){
           return res.status(401).send("massege: password not match");
        }
        return res.status(201).send("massege: login sucessful")

    res.status(201).json({ message: "User created successfully" });
  } catch (error) {
    console.log("error", error);
    res.status(500).json({ message: "Server Error" });
  }
};


