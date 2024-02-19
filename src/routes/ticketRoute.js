import express from 'express';
import TicketController from '../controllers/ticketController.js';

const router = express.Router();

router
  .get('/tickets', TicketController.listTickets)
  .get('/tickets/:ticketId', TicketController.listTicketById)
  .post('/tickets', TicketController.createTicket)
  .put('/tickets/:ticketId', TicketController.updateTicket)
  .delete('/tickets/:ticketId', TicketController.deleteTicket);

export default router;