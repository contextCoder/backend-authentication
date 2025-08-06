const User = require('../connects/schema/createUserSchema');
const bcrypt = require('bcrypt');
const { v4: uuidv4 } = require('uuid');

const endpoint = async (req, res) => {
  try {
    console.log('user details body', req.body);
    const { username, password, email } = req.body;

    const userDetails = await User.findOne({ email });

    if (userDetails) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = uuidv4();
    const newUser = new User({
      userId: userId,
      username,
      password: hashedPassword,
      email
    });

    try {
      await newUser.save();
      res.status(201).json({ message: 'User created successfully' });
    } catch (error) {
      console.error('Error saving user:', error);
      res.status(500).json({ error: 'Failed to create user' });
    }

    console.log('New user created:', newUser);
  } catch (error) {
      console.error('Error creating user:', error);
      return res.status(500).json({ error: 'Internal server error' });
    }
};

module.exports = {
  endpoint
};