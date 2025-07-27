/**
 * @file logout.js
 * @description This file contains the logout logic for the backend application.
 */

async function endpoint(req, res) {
  console.log('logging user out');
  // Clear the cookies for access and refresh tokens
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
  console.log('logging user out done');
  // Respond with a success message
  res.status(200);
  res.json({ message: 'Logged out' });
}

module.exports = {
  endpoint
};