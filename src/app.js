import express from 'express';
import db from './config/db/mongodb/mongodb.js';
import routes from './routes/index.js';
import manipulador404 from './middlewares/manipulador404.js';
import manipuladorDeErros from './middlewares/manipuladorDeErros.js';
import LoginController from './controllers/loginController.js';
import verifyToken from './services/tokenService.js';

db.on('error', console.log.bind(console, 'Erro de conexão'));
db.once('open', () => {
  console.log('Conexão com o banco feita com sucesso!');
});

const app = express();
app.use(express.json());

app.use(express.Router().post('/login', LoginController.login));

app.use(verifyToken);
routes(app);

app.use(manipulador404);
app.use(manipuladorDeErros);

export default app;
