import express from 'express';
import car from './carRoute.js';
import driver from './driverRoute.js';
import login from './loginRoute.js';

const routes = (app) => {
  app.route('/').get((_, res) => {
    res.status(200).send('Gear Meeting');
  });

  app.use(
    express.json(),
    car,
    driver,
    login
  );
};

export default routes;