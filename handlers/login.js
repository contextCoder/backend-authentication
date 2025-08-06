/**
 * @file login.js
 * @description This file contains the login logic for the backend application.
 */
const bcrypt = require('bcrypt');
const userSchema = require('../connects/schema/createUserSchema');
const { generateAccessToken,  generateRefreshToken } = require('../helper/authHelper');
async function endpoint(req, res) {
  const { email, password } = req.body;
  try {
    // will handel this via validation later
    if (!email || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    const user = await userSchema.findOne({ email: email }).select('userId password');
    if (!user) return res.status(401).json({ msg: 'User not found creat a account' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ msg: 'Invalid credentials' });
    const userObj = {
      userId: user.userId
    }
    const accessToken = generateAccessToken(userObj);
    const refreshToken = generateRefreshToken(userObj);

    res.cookie(process.env.ACCESS_TOKEN_NAME, accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
      maxAge: 15 * 60 * 1000,
    });

    res.cookie(process.env.REFRESH_TOKEN_NAME, refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV == 'production',
      sameSite: process.env.NODE_ENV == 'production' ? 'none' : 'lax',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({status: 'success', message: 'user loggedIn successfully'});
    } catch (error) {
      console.log(error);
      return res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  endpoint
};