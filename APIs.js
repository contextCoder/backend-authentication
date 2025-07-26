const expressPromiseRouter = require('express-promise-router');
const router = expressPromiseRouter();

const logout = require('./handlers/logout');
const refresh = require('./handlers/refresh');
const login = require('./handlers/login');
const verifyToken = require('./middlewere/verifyAccessToken');

router.route('/logout').post(logout.endpoint);
router.route('/refresh').post(refresh.endpoint);
router.route('/login').post(login.endpoint);
router.route('/health').get((req, res) => {
  res.status(200).json({ message: 'service is healthy' });
});

router.route('/protected').get(verifyToken, (req, res) => {
  res.status(200).json({ message: 'Welcome to the API', user: req.user || 'Guest' });
});

module.exports = router;