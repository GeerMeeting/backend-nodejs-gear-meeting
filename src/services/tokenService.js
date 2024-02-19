import jwt from 'jsonwebtoken';
import AccessNotAuthorized from '../errors/AccessNotAuthorized.js';

const verifyToken = (req, res, next) => {
  const token = req.headers['authorization'];

  if(!token) {
    return res.status(401).send({ message: 'Token isn\'t present '});
  }

  jwt.verify(token, 'GearMeetingToken', (err, decoded) => {
    if(err) {
      next(new AccessNotAuthorized('Token invalid'));
    }

    req.usedId = decoded.userId;
    next();
  });
};

export default verifyToken;