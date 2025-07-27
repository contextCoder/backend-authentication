/**
 * @file login.js
 * @description This file contains the login logic for the backend application.
 */
const { generateAccessToken,  generateRefreshToken } = require('../helper/authHelper');
const DUMMY_USER = { id: 1, username: 'user' };

async function endpoint(req, res) {
  const { username, password } = req.body;

  try {
    if (!username || !password) {
      return res.status(400).json({ error: 'Username and password are required' });
    }

    // Replace with real user validation
    if (username !== 'tukatodkari@gmail.com' || password !== 'tukatodkari@gmail.com') {
      return res.status(401).json({ error: 'Invalid credentials' });
    }

    const accessToken = generateAccessToken(DUMMY_USER);
    const refreshToken = generateRefreshToken(DUMMY_USER);

    res.cookie(process.env.ACCESS_TOKEN_NAME, accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 15 * 60 * 1000,
    });

    res.cookie(process.env.REFRESH_TOKEN_NAME, refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    res.status(200).json({status: 'success', message: 'user loggedIn successfully'});
    } catch (error) {
      return res.status(500).json({ error: 'Internal server error' });
  }
}

module.exports = {
  endpoint
};