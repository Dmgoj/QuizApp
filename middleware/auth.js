// Middleware to check if user is authenticated
const auth = (req, res, next) => {
  console.log(req.session)
      if (!req.session.userId) {
      res.redirect('/api/users/login');
    } else {
      next();
    }
  };

  module.exports = {auth}