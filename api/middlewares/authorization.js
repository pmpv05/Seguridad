const jwt = require('jsonwebtoken');
const User = require('../models/user');

const authorization = (req, res, next) => {
  const token = req.headers.authorization;

  if (!token)
    return res
      .status(401)
      .send({ auth: false, message: "No hay authorization header" });

  jwt.verify(token, 'security', (err, decoded) => {
    if (err)
      return res.status(401).send({ auth: false, message: 'Token inválido' });

    // TODO Fetch user with that id, verifying that the user exists.

    const payload = jwt.decode(token, 'security');

    User.findOne({ id: payload.id }, (error, user) => {
      if (error) {
        res.sendStatus(401).json({ error: "Usuario no existe" });
      }

      req.user = user;
      next();
    });
  });
};

module.exports = authorization;
