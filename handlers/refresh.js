/**
 * @file refresh.js
 * @description This file contains the refresh token logic for the backend application.
 */
const {
  generateAccessToken,
  verifyRefreshToken
} = require('../helper/authHelper'); // Adjust the path as necessary
async function endpoint(req, res) {
   const token = req.cookies?.[process.env.REFRESH_TOKEN_NAME];
  if (!token) return res.sendStatus(401);

  try {
    const user = verifyRefreshToken(token);
    const newAccessToken = generateAccessToken({ id: user.id, username: user.username });
    res.cookie(process.env.ACCESS_TOKEN_NAME, newAccessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 15 * 60 * 1000
    });
    res.status(200).json({ message: 'Access token refreshed successfully' });
  } catch {
    res.sendStatus(403);
  }
}

module.exports = {
  endpoint
};