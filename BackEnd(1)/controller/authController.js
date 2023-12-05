const User = require('../model/userSchema');
const bcryptjs = require('bcryptjs');
const jwt = require('jsonwebtoken');


const registerUser = async (req, res, next) => {
  //console.log(req.body);
  const { usernameS, emailS, passwordS } = req.body;
  console.log("emailS received:-", emailS);
  let emailExists = await User.findOne({ email: emailS });
  if (emailExists) {
    console.log("emailExists:-",emailExists);
    return res.status(400).send("Email already Exists.");
  }
  const encPassword = bcryptjs.hashSync(passwordS, 15);
  try {
    const newUser = await User.create({ name:usernameS, email: emailS, password: encPassword });
    res.status(200).json({ newUser, message: "User Successfully Registered" });
  } catch (error) {
    next({ status: 500, message: error.message });
  }
};

// login
const loginUser = async (req, res, next) => {
  const { emailL, passwordL } = req.body;
  console.log("emailL in api"+emailL);
  try {
    const user = await User.findOne({ email : emailL });
     //console.log("user Found in db " + user);
    if (!user) {
      return next({ status: 404, message: 'Email does not exist!' });
    }
    // checking the password from the payload
    const dbPwd = user.password;
    const isSamePassword = await bcryptjs.compare(passwordL, dbPwd);
    if (isSamePassword) {
      // sending jwt token
      const jsonPayload = { name: user.name, id: user._id, email: user.email };
      const token = jwt.sign(jsonPayload, process.env.SECRET_KEY, { expiresIn: '3d' });
      res.json({ message: 'Login success', token });
    } else {
      next({ status: 404, message: 'Password is wrong' })
    }
  } catch (error) {
    next({ status: 500, message: error.message });
  }
};


module.exports = {registerUser, loginUser};
