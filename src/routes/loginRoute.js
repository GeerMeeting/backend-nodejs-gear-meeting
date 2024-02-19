import express from 'express';
import LoginController from '../controllers/loginController.js';

const router = express.Router();

router
  .get('/logins', LoginController.listAllLogins)
  .get('/logins/:loginId', LoginController.listLoginById)
  .post('/logins', LoginController.createLogin)
  .put('/logins/:loginId', LoginController.updateLogin)
  .delete('/logins/:loginId', LoginController.deleteLogin);

export default router;