const { verifyAccessToken, verifyRefreshToken, generateAccessToken } = require('../helper/authHelper');

const verifyToken = (req, res, next) => {
  const accessToken = req.cookies?.[process.env.ACCESS_TOKEN_NAME];
  const refreshToken = req.cookies?.[process.env.REFRESH_TOKEN_NAME];

  if (!accessToken) return res.sendStatus(401);

  try {
    const user = verifyAccessToken(accessToken);
    const userObj = { id: user.id, username: user.username };
    req.user = userObj;
    console.log("== Access token verified successfully ==");
    next();
  } catch (err) {
    console.log("== Access token verification failed:", err.message);
    // Access token expired or invalid, try refresh token
    if (!refreshToken) return res.sendStatus(401);

    try {
      const user = verifyRefreshToken(refreshToken);
      // If refresh token is valid, generate new access token
      const userObj = { id: user.id, username: user.username };
      req.user = userObj;
      console.log("== Refresh token verified successfully ==");
      const newAccessToken = generateAccessToken(userObj);
      res.cookie(process.env.ACCESS_TOKEN_NAME, newAccessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 15 * 60 * 1000
      });
      console.log("== New access token issued ==");
      next();
    } catch (err) {
      console.log(`Error verifying tokens: ${err.message}`);
      return res.sendStatus(401);
    }
  }
};

module.exports = verifyToken;