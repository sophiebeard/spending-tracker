import User from '../models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

const categories = [
  { label: 'Bills', icon: 'user' },
  { label: 'Charity', icon: 'user' },
  { label: 'Eating out', icon: 'user' },
  { label: 'Entertainment', icon: 'user' },
  { label: 'Expenses', icon: 'user' },
  { label: 'General', icon: 'user' },
  { label: 'Gifts', icon: 'user' },
  { label: 'Groceries', icon: 'user' },
  { label: 'Holidays', icon: 'user' },
  { label: 'Personal care', icon: 'user' },
  { label: 'Savings', icon: 'user' },
  { label: 'Shopping', icon: 'user' },
  { label: 'Transport', icon: 'user' },
];

export const register = async (req, res) => {
  const { email, password, firstName, lastName } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    res.status(406).json({ message: "User already exists." });
    return;
  }

  // hash the password
  const saltRounds = 10;
  const salt = await bcrypt.genSaltSync(saltRounds);
  const hashedPassword = await bcrypt.hashSync(password, salt);

  const user = await User({
    email,
    password: hashedPassword,
    firstName,
    lastName,
    categories,
  });
  await user.save();
  res.status(201).json({ message: "user is created" });
};

export const login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    res.status(406).json({ message: "credentials not found" });
    return;
  }

  const matched = await bcrypt.compare(password, user.password);
  if (!matched) {
    res.status(406).json({ message: "credentials not found" });
    return;
  }

  // create jwt token
  const payload = {
    username: email,
    _id: user._id,
  };
  const token = jwt.sign(payload, process.env.JWT_SECRET);
  res.json({ message: "succesfully logged in.", token, user });
};