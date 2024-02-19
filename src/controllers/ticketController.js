import ErroBase from '../errors/ErroBase.js';
import NaoEncontrado from '../errors/NaoEncontrado.js';
import Ticket from '../schemas/ticketSchema.js';

class TicketController {
  static async listTickets(_, res, next) {
    try {
      const findTicket = await Ticket.find();

      if (!findTicket || findTicket.length < 1) {
        return next(new NaoEncontrado('No tickets found'));
      } else {
        res.send(findTicket);
      }
    } catch (err) {
      return next(err);
    }
  }

  static async listTicketById(req, res, next) {
    const { ticketId } = req.params;

    try {
      const ticketFinded = await Ticket.findById(ticketId);
  
      if(!ticketFinded) {
        return next(new NaoEncontrado(`Ticket not founded by id ${ticketId}`));
      }

      res.send(ticketFinded);
    } catch (err) {
      return next(err);
    }
  }

  static async createTicket(req, res, next) {
    const newTicket = {
      name: req.body.name,
      description: req.body.description,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    try {
      const ticketExisted = await Ticket.findOne({ name: req.body.name });
      if(ticketExisted) {
        return next(new ErroBase('Ticket existed!', 409));
      }

      const ticket = new Ticket(newTicket);
      await ticket.save();

      res.status(201).send(ticket);
    } catch (err) {
      return next(err);
    }
  }

  static async updateTicket(req, res, next) {
    const { ticketId } = req.params;
    const newTicket = {
      name: req.body.name,
      description: req.body.description,
      updatedAt: new Date(),
    };
    try {
      const ticketFinded = await Ticket.findByIdAndUpdate(ticketId, { $set: newTicket});
      if(!ticketFinded) {
        return next(new NaoEncontrado(`Ticket not founded by id ${ticketId}`));
      }

      const updateTicket = await Ticket.findById(ticketId);
      res.send(updateTicket);
    } catch (err) {
      return next(err);
    }
  }

  static async deleteTicket(req, res, next) {
    const { ticketId } = req.params;

    try {
      const ticketFinded = await Ticket.findByIdAndDelete(ticketId);
  
      if(!ticketFinded) {
        return next(new NaoEncontrado(`Ticket not founded by id ${ticketId}`));
      }

      res.status(204).send();
    } catch (err) {
      return next(err);
    }
  }
}

export default TicketController;