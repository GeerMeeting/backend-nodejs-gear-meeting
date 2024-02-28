import NaoEncontrado from '../errors/NaoEncontrado.js';
import Event from '../schemas/eventSchema.js';

class EventController {
  static async listEvents(_, res, next) {
    try {
      let findEvents = await Event.find();

      if (!findEvents || findEvents.length < 1) {
        return next(new NaoEncontrado('No events found'));
      } else {
        findEvents = findEvents.map((event) => {
          // eslint-disable-next-line no-unused-vars
          const {dataImage, ...eventWithoutDataImage} = event.toObject();
          return eventWithoutDataImage;
        });

        res.send(findEvents);
      }
    } catch (err) {
      return next(err);
    }
  }

  static async listEventById(req, res, next) {
    const { eventId } = req.params;

    try {
      const eventFound = await Event.findById(eventId);
  
      if(!eventFound) {
        return next(NaoEncontrado(`Event not founded by id ${eventId}`));
      }

      res.send(eventFound);
    } catch (err) {
      return next(err);
    }
  }

  static async findPhoto(req, res, next) {
    const { eventId } = req.params;

    try {
      const eventExisted = await Event.findById(eventId);

      if(!eventExisted.nameImage) {
        return next(new NaoEncontrado('Image not found'));
      }

      res.set('Content-Type', eventExisted.contentType);
      res.send(eventExisted.dataImage);
    } catch (e) {
      console.error(e);
      return next(e);
    }
  }

  static async createEvent(req, res, next) {
    const newEvent = {
      name: req.body.name,
      description: req.body.description,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    try {
      const eventExisted = await Event.findOne({ name: req.body.name });
      if(eventExisted) {
        return next('Event existed!', 409);
      }

      const event = new Event(newEvent);
      await event.save();

      res.status(201).send(event);
    } catch (err) {
      return next(err);
    }
  }

  static async savePhoto(req, res, next) {
    const { eventId } = req.params; 

    const newPhoto = {
      nameImage: req.file.originalname,
      dataImage: req.file.buffer,
      contentType: req.file.mimetype,
      updatedAt: new Date(),
    };

    try {
      const eventExisted = await Event.findByIdAndUpdate(eventId, { $set:  newPhoto });

      if(!eventExisted) {
        return next(new NaoEncontrado('Event not recognized'));
      }

      const eventUpdated = await Event.findOne({ _id: eventId });
      res.status(200).send({ 
        _id: eventUpdated._id,
        name: eventUpdated.name,
        description: eventUpdated.description,
        nameImage: eventUpdated.nameImage
      });
    } catch (e) {
      return next(e);
    }
  }

  static async updateEvent(req, res, next) {
    const { eventId } = req.params;
    const newEvent = {
      name: req.body.name,
      description: req.body.description,
      updatedAt: new Date(),
    };
    try {
      const eventFound = await Event.findByIdAndUpdate(eventId, { $set: newEvent});
      if(!eventFound) {
        return next(NaoEncontrado(`Event not founded by id ${eventId}`));
      }

      const updateEvent = await Event.findById(eventId);
      res.send(updateEvent);
    } catch (err) {
      return next(err);
    }
  }

  static async deleteEvent(req, res, next) {
    const { eventId } = req.params;

    try {
      const eventFound = await Event.findByIdAndDelete(eventId);
  
      if(!eventFound) {
        return next(NaoEncontrado(`Event not founded by id ${eventId}`));
      }

      res.status(204).send();
    } catch (err) {
      return next(err);
    }
  }
}

export default EventController;