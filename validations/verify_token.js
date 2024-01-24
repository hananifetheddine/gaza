const jwt = require('jsonwebtoken')
const db = require('../db')

async function verifyTokenUser(req, res, next) {
  const token = req.headers['x-access-token']
  if (!token) {
    return res.status(403).send({
      success: false,
      message: 'A token is required for authentication'
    }
    )
  }
  try {
    const decodedToken = jwt.verify(token, 'your-secret-key')
    var query = 'SELECT * FROM user_account WHERE user_id = ?';
    var [user] = await db.execute(query, [decodedToken.user_id]);
    if (user.length === 0) {
      return res.status(404).send({
        success: false,
        message: "account doesn't exist",
        errors: ["Account doesn't exist"]
      })
    } else {
      if (user[0].state === 1) {
        return res.status(403).json({
          success: false,
          message: 'your account is desactivated by admin',
          errors: ['your account is desactivated by admin']
        })
      }
      req.user_id = decodedToken.user_id;
      req.email = decodedToken.email;
      return next()
    }
  } catch (err) {
    return res.status(401).send({
      success: false,
      message: 'A valid token is required',
      errors: [err]
    })
  }
}

async function verifyTokenDonation(req, res, next) {
  const token = req.headers['x-access-token']
  if (!token) {
    return next();
  }
  try {
    const decodedToken = jwt.verify(token, 'your-secret-key')
    var query = 'SELECT * FROM user_account WHERE user_id = ?';
    var [user] = await db.execute(query, [decodedToken.user_id]);
    if (user.length === 0) {
      return res.status(404).send({
        success: false,
        message: "account doesn't exist",
        errors: ["Account doesn't exist"]
      })
    } else {
      if (user[0].state === 1) {
        return res.status(403).json({
          success: false,
          message: 'your account is desactivated by admin',
          errors: ['your account is desactivated by admin']
        })
      }
      req.user_id = decodedToken.user_id;
      req.email = decodedToken.email;
      return next()
    }
  } catch (err) {
    return res.status(401).send({
      success: false,
      message: 'A valid token is required',
      errors: [err]
    })
  }
}
module.exports = { verifyTokenUser ,verifyTokenDonation};