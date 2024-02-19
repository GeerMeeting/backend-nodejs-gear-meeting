class LoginService {
  static async validPasswordsConfirmPassword(password, confirmPassowrd ) {
    if(password !== confirmPassowrd) {
      return false;
    } else {
      return true;
    }
  }
}

export default LoginService;