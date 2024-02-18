import express from 'express';
import car from './carRoute.js';

const routes = (app) => {
  app.route('/').get((_, res) => {
    res.status(200).send('Gear Meeting');
  });

  app.use(
    express.json(),
    car
  );
};

export default routes;