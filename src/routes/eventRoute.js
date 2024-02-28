import express from 'express';
import EventController from '../controllers/eventController.js';
import multer from 'multer';

const router = express.Router();

const storage = multer.memoryStorage();
const upload = multer({ storage: storage});

router
  .get('/events', EventController.listEvents)
  .get('/events/:eventId', EventController.listEventById)
  .get('/events/:eventId/photo', EventController.findPhoto)
  .post('/events', EventController.createEvent)
  .put('/events/:eventId', EventController.updateEvent)
  .put('/events/:eventId/photo', upload.single('image'), EventController.savePhoto)
  .delete('/events/:eventId', EventController.deleteEvent);

export default router;