import User from "../models/users.model.js";
import bcrypt from "bcryptjs";
import generateTokenAndSetToken from "../utils/generateToken.js";
export const signup = async (req, res) => {
  try {
    const { fullName, username, password, confirmPassword, gender } = req.body;
    console.log(req.body);
    if (password !== confirmPassword) {
      return res.status(400).json({
        error: "pass and confirmPass dont match!!!",
      });
    }
    // console.log(typeof String(password));
    const user = await User.findOne({ username });
    if (user) {
      return res.status(400).json({ error: "username already exists!!" });
    }
    const salt = await bcrypt.genSalt(10);

    const hashedpass = await bcrypt.hash(String(password), salt);
    // console.log(123, salt, password, hashedpass);
    const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
    const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;

    const newuser = new User({
      fullName,
      username,
      password: hashedpass,
      gender,
      profilePic: gender === "male" ? boyProfilePic : girlProfilePic,
    });
    // console.log("hassan behold:", newuser);
    if (newuser) {
      generateTokenAndSetToken(newuser._id, res);
      const newusersaved = await newuser.save();
      return res.status(201).json({
        status: "success",
        data: {
          user: newuser,
        },
      });
    } else {
      return res.status(400).json({ error: "invalid user data" });
    }
  } catch (error) {
    console.log("error in suign up controller", error.message);
    res.status(500).json({ error: "internal server error!!!" });
  }
};

export const login = async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await User.findOne({ username });
    const isPassCorrect = await bcrypt.compare(
      String(password),
      user?.password || ""
    );
    if (!user || !isPassCorrect) {
      return res.status(500).json({
        error: "invalid username or password!!",
      });
    }
    generateTokenAndSetToken(user._id, res);
    res.status(200).json({
      status: "success",
      data: {
        user,
      },
    });
  } catch (error) {
    console.log("error in login controller", error.message);
    res.status(500).json({ error: "internal server error!!!" });
  }
};
export const logout = (req, res) => {
  try {
    res.cookie("jwt", "", {
      maxAge: 0,
    });
    res.status(200).json({
      message: "logged out successfully!!!",
    });
  } catch (error) {
    console.log("error in logout controller", error.message);
    res.status(500).json({ error: "internal server error!!!" });
  }
};
