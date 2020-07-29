const jwt = require('jsonwebtoken');

module.exports = user => {
   const token = jwt.sign(
      { id: user._id.toString() },
      '$2a$12$Lf2bi8/FCB/eZAcBjsft.Ooyh',
      {
         expiresIn: '1d'
      }
   );

   return { token };
};
