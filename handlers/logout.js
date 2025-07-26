/**
 * @file logout.js
 * @description This file contains the logout logic for the backend application.
 */

async function endpoint(req, res) {
 res.clearCookie(process.env.ACCESS_TOKEN_NAME, {
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  });

  res.clearCookie(process.env.REFRESH_TOKEN_NAME, {
    httpOnly: true,
    secure: false,
    sameSite: 'strict',
  });
  res.json({ message: 'Logged out' });
}

module.exports = {
  endpoint
};