import ErroBase from './ErroBase.js';

class AccessNotAuthorized extends ErroBase{
  constructor(message = 'You have not permissions access') {
    super(message, 403);
  }
}

export default AccessNotAuthorized;