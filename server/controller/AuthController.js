import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const register = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(406).json({ message: "This user already exists." });
    return;
  }

  const saltRounds = 10;
  const salt = await bcrypt.genSaltSync(saltRounds);
  const hashedPassword = await bcrypt.hashSync(password, salt);
    
  const user = await User({ email, password: hashedPassword, firstName, lastName });
  await user.save();
  res.status(201).json({ 'message': "Account registered" })
};

export const login = async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email });
  if (!user) {
    res.status(406).json({ message: "This user does not exist. Please, register" });
    return;
  }

  const matched = await bcrypt.compare(password, user.password);
  if (!matched) {
    res.status(406).json({ message: "This user does not exist. Please, register" });
    return;
  }

  // create jwt token
  const payload = {
    username: email,
    _id: user._id,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET);
  console.log(token);
  res.json({ message: "User login successful.", token, user });

};