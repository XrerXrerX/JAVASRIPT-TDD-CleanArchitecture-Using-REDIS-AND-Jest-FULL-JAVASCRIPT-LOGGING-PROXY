const MemoUseCase = require('../../../../Applications/use_case/MemoUseCase');
// const GetDataApkUseCase = require('../../../../Applications/use_case/GetDataApkUseCase');

class MemoHandler {
  constructor(container) {
    this._container = container;
    this.postMemo = this.postMemo.bind(this);
    this.getMemo = this.getMemo.bind(this);
    this.getMemostts = this.getMemostts.bind(this);
    this.delMemo = this.delMemo.bind(this);
  }

  /**
 * @param {memo} untuk master bank 
 * harus add group dulu baru master
 */

  async postMemo(request, h) {
    const addMemoUsecase = this._container.getInstance(MemoUseCase.name);
    const successmemo = await addMemoUsecase.addmemomem(request.payload);
    const response = h.response({
      status: 'success',
      data: successmemo
    });
    response.code(201);
    return response;
  }

  async getMemo(request, h) {
    const getMemoUsecase = this._container.getInstance(MemoUseCase.name);
    const getmemo = await getMemoUsecase.getmemodt(request.payload);
    const response = h.response({
      status: 'success',
      data: getmemo
    });
    response.code(200);
    return response;
  }
  async getMemostts(request, h) {
    const getMemobystatusUsecase = this._container.getInstance(MemoUseCase.name);
    const getmemo = await getMemobystatusUsecase.getmemodtall(request.params);
    const response = h.response({
      status: 'success',
      data: getmemo
    });
    response.code(200);
    return response;
  }

  async delMemo(request, h) {
    const delMemoUsecase = this._container.getInstance(MemoUseCase.name);
    const delmemo = await delMemoUsecase.delmemodata(request.params);

    const response = h.response({
      status: 'success',
      data: delmemo
    });
    response.code(200);
    return response;
  }

}

module.exports = MemoHandler;
