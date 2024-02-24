import express from 'express';
import LoginController from '../controllers/loginController.js';
import multer from 'multer';

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

router
  .get('/logins', LoginController.listAllLogins)
  .get('/logins/:loginId', LoginController.listLoginById)
  .get('/logins/:loginId/photo', LoginController.findPhoto)
  .post('/logins', LoginController.createLogin)
  .put('/logins/:loginId', LoginController.updateLogin)
  .put('/logins/:loginId/photo', upload.single('image') ,LoginController.savePhoto)
  .delete('/logins/:loginId', LoginController.deleteLogin);

export default router;