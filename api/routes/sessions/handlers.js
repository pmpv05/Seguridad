const jwt = require('jsonwebtoken');
const User = require('../../models/user');

const find = (req, res) => {
  debugger;
  // Find email
  User.findOne({ email: req.body.email }, (err, user) => {
    if (err) {
      res.status(401).json({ error: 'Correo o contraseña incorrecta' });
      return;
    }
    if (user) {
      user.comparePassword(req.body.password, user.password).then(result => {
        if (result) {
          const token = jwt.sign(
            {
              id: user.id,
              email: user.email,
              name: user.name
            },
            'security',
            { expiresIn: '2h' },
          );
          res.status(200).send(res.json({ token, message: 'Autenticado' }));
          return;
        } else {
          res.status(401).json({ error: 'Correo o contraseña incorrecta' });
          return;
        }
      });
    } else {
      res.status(401).json({ error: 'Correo o contraseña incorrecta' });
      return;
    }
  });
};

module.exports = {
  find,
};
