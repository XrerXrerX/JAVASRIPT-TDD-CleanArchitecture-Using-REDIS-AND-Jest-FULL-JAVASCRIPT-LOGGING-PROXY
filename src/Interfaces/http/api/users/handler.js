const AddUserUseCase = require('../../../../Applications/use_case/AddUserUseCase');

class UsersHandler {
  constructor(container) {
    this._container = container;
    this.postUserHandler = this.postUserHandler.bind(this);
    this.getUserHandler = this.getUserHandler.bind(this);
    this.putUserHandler = this.putUserHandler.bind(this);
    this.putPassHandler = this.putPassHandler.bind(this);
    this.putUserVIPHandler = this.putUserVIPHandler.bind(this);
  }

  async postUserHandler(request, h) {
    const addUserUseCase = this._container.getInstance(AddUserUseCase.name);
    const addedUser = await addUserUseCase.execute(request.payload);

    const response = h.response({
      status: 'success',
      data: {
        addedUser,
      },
    });
    response.code(201);
    return response;
  }

  async getUserHandler(request, h) {
    const getDataUsecase = this._container.getInstance(AddUserUseCase.name);
    const datauser = await getDataUsecase.getdatabyu(request.params);

    const response = h.response({
      status: 'success',
      data: {
        datauser,
      },
    });
    response.code(200);
    return response;
  }

  async putUserHandler(request, h) {
    const putDataUsecase = this._container.getInstance(AddUserUseCase.name);
    const updatedata = await putDataUsecase.UDataUser(request.payload, request.params);

    const response = h.response({
      status: 'success',
      data: updatedata,

    });
    response.code(200);
    return response;
  }
  async putUserVIPHandler(request, h) {
    const putDataVIPUsecase = this._container.getInstance(AddUserUseCase.name);
    const updatedata = await putDataVIPUsecase.Uvipuser(request.payload, request.params);

    const response = h.response({
      status: 'success',
      data: updatedata,

    });
    response.code(200);
    return response;
  }

  async putPassHandler(request, h) {
    const putpassDataUsecase = this._container.getInstance(AddUserUseCase.name);
    const updatedata = await putpassDataUsecase.changepssw(request.payload, request.params);

    const response = h.response({
      status: 'success',
      data: updatedata,

    });
    response.code(200);
    return response;
  }
}

module.exports = UsersHandler;
