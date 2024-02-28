import ErroBase from '../errors/ErroBase.js';
import NaoEncontrado from '../errors/NaoEncontrado.js';
import Login from '../schemas/loginSchema.js';
import LoginService from '../services/loginService.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

class LoginController {
  static async listAllLogins(_, res, next) {
    try {
      let findLogins = await Login.find();

      if (!findLogins || findLogins.length < 1) {
        return next(new NaoEncontrado('No logins found'));
      } else {
        findLogins = findLogins.map((login) => {
          // eslint-disable-next-line no-unused-vars
          const {dataImage, ...loginWithoutDataImage} = login.toObject();
          return loginWithoutDataImage;
        });
        res.send(findLogins);
      }
    } catch (err) {
      return next(err);
    }
  }

  static async listLoginById(req, res, next) {
    const { loginId } = req.params;

    try {
      const loginFound = await Login.findById(loginId);

      if (!loginFound) {
        return next(NaoEncontrado(`Login not founded by id ${loginId}`));
      }

      res.send(loginFound);
    } catch (err) {
      return next(err);
    }
  }

  static async listLoginByEmail(req, res, next) {
    const { email } = req.body;
    try {
      const loginFound = await Login.findOne({ email });

      if (!loginFound) {
        return next(NaoEncontrado(`Login not founded by email ${email}`));
      }

      res.send(loginFound);
    } catch (err) {
      return next(err);
    }
  }

  static async createLogin(req, res, next) {
    const { password, confirmPassword } = req.body;

    try {
      const areSameLogin = await LoginService.validPasswordsConfirmPassword(password, confirmPassword);
      if (areSameLogin === false) {
        return next(new ErroBase('Passwords are different', 402));
      }

      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      const newLogin = {
        email: req.body.email,
        name: req.body.name,
        phone: req.body.phone,
        password: hashedPassword,
        createdAt: new Date(),
        updatedAt: new Date(),
      };

      const loginExisted = await Login.findOne({ email: req.body.email });
      if (loginExisted) {
        return next('Login existed!', 409);
      } else {
        const login = new Login(newLogin);
        await login.save();

        res.status(201).send(login);
      }

    } catch (err) {
      return next(err);
    }
  }

  static async savePhoto(req, res, next) {
    const { loginId } = req.params; 

    const newPhoto = {
      nameImage: req.file.originalname,
      dataImage: req.file.buffer,
      contentType: req.file.mimetype,
      updatedAt: new Date(),
    };

    try {
      const userExisted = await Login.findByIdAndUpdate(loginId, { $set:  newPhoto });

      if(!userExisted) {
        return next(new NaoEncontrado('User not recognized'));
      }

      const userUpdated = await Login.findOne({ _id: loginId });
      res.status(200).send({ 
        _id: userUpdated._id,
        email: userUpdated.email,
        name: userUpdated.name,
        password: userUpdated.password,
        phone: userUpdated.phone,
        nameImage: userUpdated.nameImage
      });
    } catch (e) {
      return next(e);
    }
  }

  static async findPhoto(req, res, next) {
    const { loginId } = req.params;

    try {
      const loginExisted = await Login.findById(loginId);

      if(!loginExisted.nameImage) {
        return next(new NaoEncontrado('Image not found'));
      }

      res.set('Content-Type', loginExisted.contentType);
      res.send(loginExisted.dataImage);
    } catch (e) {
      console.error(e);
      return next(e);
    }
  }

  static async login(req, res, next) {
    const { email, password } = req.body;

    try {
      const validEmail = await Login.findOne({ email });

      if (!validEmail) {
        return next(new NaoEncontrado('Account not found by email'));
      }

      const validPassword = bcrypt.compare(password, validEmail.password);
      const token = jwt.sign({ userId: validEmail._id }, 'GearMeetingToken', { expiresIn: '38h' });

      if (validPassword) {
        res.send({ token, userId: validEmail._id });
      }
    } catch (err) {
      return next(err);
    }
  }

  static async updateLogin(req, res, next) {
    const { loginId } = req.params;
    const newLogin = {
      email: req.body.email,
      name: req.body.name,
      updatedAt: new Date(),
    };
    try {
      const loginFound = await Login.findByIdAndUpdate(loginId, { $set: newLogin });
      if (!loginFound) {
        return next(NaoEncontrado(`Login not founded by id ${loginId}`));
      }

      const updateLogin = await Login.findById(loginId);
      res.send(updateLogin);
    } catch (err) {
      return next(err);
    }
  }

  static async deleteLogin(req, res, next) {
    const { loginId } = req.params;

    try {
      const loginFound = await Login.findByIdAndDelete(loginId);

      if (!loginFound) {
        return next(NaoEncontrado(`Login not founded by id ${loginId}`));
      }

      res.status(204).send();
    } catch (err) {
      return next(err);
    }
  }
}

export default LoginController;