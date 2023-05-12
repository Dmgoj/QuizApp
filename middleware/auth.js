// Middleware to check if user is authenticated
const auth = (req, res, next) => {
    if (!req.session.userId) {
      res.status(401).send('Unauthorized');
    } else {
      next();
    }
  }

  module.exports = {auth}