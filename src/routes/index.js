import express from 'express';
import car from './carRoute.js';
import driver from './driverRoute.js';
import login from './loginRoute.js';
import ticket from './ticketRoute.js';

const routes = (app) => {
  app.route('/').get((_, res) => {
    res.status(200).send('Gear Meeting');
  });

  app.use(
    express.json(),
    car,
    driver,
    login,
    ticket
  );
};

export default routes;