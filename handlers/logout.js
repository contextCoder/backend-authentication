/**
 * @file logout.js
 * @description This file contains the logout logic for the backend application.
 */

async function endpoint(req, res) {
  console.log('logging user out');
  // Clear the cookies for access and refresh tokens
  res.clearCookie(process.env.ACCESS_TOKEN_NAME, {
    httpOnly: true,
    secure: process.env.NODE_ENV == 'production',
    sameSite: process.env.NODE_ENV == 'production' ? 'none' : 'lax',
    path: '/',
  });

  res.clearCookie(process.env.REFRESH_TOKEN_NAME, {
    httpOnly: true,
    secure: process.env.NODE_ENV == 'production',
    sameSite: process.env.NODE_ENV == 'production' ? 'none' : 'lax',
    path: '/',
  });

  // Respond with a success message
  res.status(200).json({ message: 'Logged out' });
}

module.exports = {
  endpoint
};