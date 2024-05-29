const LoginUserUseCase = require('../../../../Applications/use_case/LoginUserUseCase');
const RefreshAuthenticationUseCase = require('../../../../Applications/use_case/RefreshAuthenticationUseCase');
const LogoutUserUseCase = require('../../../../Applications/use_case/LogoutUserUseCase');
const VerifyUserAuthUseCase = require('../../../../Applications/use_case/VerifyUserAuthUseCase');

class AuthenticationsHandler {
  constructor(container) {
    this._container = container;

    this.postAuthenticationHandler = this.postAuthenticationHandler.bind(this);
    this.postAuthenticationdataHandler = this.postAuthenticationdataHandler.bind(this);
    this.putAuthenticationHandler = this.putAuthenticationHandler.bind(this);
    this.deleteAuthenticationHandler = this.deleteAuthenticationHandler.bind(this);
  }

  async postAuthenticationHandler(request, h) {

    const loginUserUseCase = this._container.getInstance(LoginUserUseCase.name);
    const { accessToken, refreshToken, apkToken } = await loginUserUseCase.execute(request.payload);

    const response = h.response({
      status: 'success',
      data: {
        accessToken,
        refreshToken,
        apkToken
      },
    });
    response.code(201);
    return response;

  }
  async postAuthenticationdataHandler(request, h) {
    const verifyUserAuthUseCase = this._container.getInstance(VerifyUserAuthUseCase.name);
    const databnks = await verifyUserAuthUseCase.execute(request.payload.refreshToken);
    const response = h.response({
      status: 'success',
      data: {
        databnks
      },
    });
    response.code(200);
    return response;

  }

  async putAuthenticationHandler(request) {
    const refreshAuthenticationUseCase = this._container
      .getInstance(RefreshAuthenticationUseCase.name);
<<<<<<< HEAD
    const { accessToken, refreshTokennew, apkToken } = await refreshAuthenticationUseCase.execute(request.payload);
=======
    const accessToken = await refreshAuthenticationUseCase.execute(request.payload);
>>>>>>> aaf28ac1629362d7e0c504db6cc6a3a138f07f0b

    return {
      status: 'success',
      data: {
        accessToken,
<<<<<<< HEAD
        refreshTokennew,
        apkToken
=======
>>>>>>> aaf28ac1629362d7e0c504db6cc6a3a138f07f0b
      },
    };
  }

  async deleteAuthenticationHandler(request) {
    const logoutUserUseCase = this._container.getInstance(LogoutUserUseCase.name);
    await logoutUserUseCase.execute(request.payload);
    return {
      status: 'success',
    };
  }
}

module.exports = AuthenticationsHandler;
