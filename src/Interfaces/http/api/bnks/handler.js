const AddbnksUseCase = require('../../../../Applications/use_case/AddbnksUseCase');
// const GetDataApkUseCase = require('../../../../Applications/use_case/GetDataApkUseCase');

class BnksHandler {
  constructor(container) {
    this._container = container;
    // this.postBanksHandler = this.postBanksHandler.bind(this);
    // this.getBanksHandler = this.getBanksHandler.bind(this);

    this.postGroupHandler = this.postGroupHandler.bind(this);
    this.putGroupHandler = this.putGroupHandler.bind(this);
    this.getGroupHandler = this.getGroupHandler.bind(this);
    this.delGroupHandler = this.delGroupHandler.bind(this);

    this.postMasterHandler = this.postMasterHandler.bind(this);
    this.putMasterHandler = this.putMasterHandler.bind(this);
    this.getMasterHandler = this.getMasterHandler.bind(this);
    this.delMasterHandler = this.delMasterHandler.bind(this);

    this.postBanknwHandler = this.postBanknwHandler.bind(this);
    this.putBanknwHandler = this.putBanknwHandler.bind(this);
    this.putGroupBanknwHandler = this.putGroupBanknwHandler.bind(this);
    this.getBanknwHandler = this.getBanknwHandler.bind(this);
    this.getBanknwexHandler = this.getBanknwexHandler.bind(this);
    this.delBankHandler = this.delBankHandler.bind(this);
    this.delArrBankHandler = this.delArrBankHandler.bind(this);

  }

  /**
 * @param {group} untuk master bank 
 * harus add group dulu baru master
 */

  async postGroupHandler(request, h) {
    const addGroupBankUsecase = this._container.getInstance(AddbnksUseCase.name);
    const groupbnks = await addGroupBankUsecase.addgrp(request.payload);
    const response = h.response({
      status: 'success',
      data: groupbnks
    });
    response.code(201);
    return response;
  }
  async putGroupHandler(request, h) {
    const putGroupBankUsecase = this._container.getInstance(AddbnksUseCase.name);
    const datagroupDone = await putGroupBankUsecase.editgroupbnks(request.payload, request.params);
    const response = h.response({
      status: 'success',
      data: datagroupDone
    });
    response.code(200);
    return response;
  }
  async getGroupHandler(request, h) {

    const getGroupBankUsecase = this._container.getInstance(AddbnksUseCase.name);
    const datagroup = await getGroupBankUsecase.getgroup();
    const response = h.response({
      status: 'success',
      data: datagroup
    });
    response.code(200);
    return response;
  }

  async delGroupHandler(request, h) {

    const delGroupBankUsecase = this._container.getInstance(AddbnksUseCase.name);
    const datagroup = await delGroupBankUsecase.delgroupdata(request.params);
    const response = h.response({
      status: 'success',
      data: datagroup
    });
    response.code(200);
    return response;
  }

  /**
   * @param {master} untuk master bank 
   * harus add group dulu baru master
   */
  async postMasterHandler(request, h) {
    const addMasterBankUsecase = this._container.getInstance(AddbnksUseCase.name);
    const groupbnks = await addMasterBankUsecase.admasterbank(request.payload);
    const response = h.response({
      status: 'success',
      data: groupbnks
    });
    response.code(201);
    return response;
  }
  async putMasterHandler(request, h) {
    const putMasterBankUsecase = this._container.getInstance(AddbnksUseCase.name);
    const datamasterbnks = await putMasterBankUsecase.putmasterbank(request.payload, request.params);
    const response = h.response({
      status: 'success',
      data: datamasterbnks
    });
    response.code(200);
    return response;
  }
  async getMasterHandler(request, h) {
    const getmasterBankUsecase = this._container.getInstance(AddbnksUseCase.name);
    const datamastr = await getmasterBankUsecase.getdtmstr();
    const response = h.response({
      status: 'success',
      data: datamastr
    });
    response.code(200);
    return response;
  }


  async delMasterHandler(request, h) {

    const delmsterBankUsecase = this._container.getInstance(AddbnksUseCase.name);
    const datadeletemstr = await delmsterBankUsecase.delmasterdata(request.params);
    const response = h.response({
      status: 'success',
      data: datadeletemstr
    });
    response.code(200);
    return response;
  }




  /**
   * @param {Bank}
   * khusus data tambah bank
   */

  async postBanknwHandler(request, h) {
    const adddataBankUsecase = this._container.getInstance(AddbnksUseCase.name);
    const databank = await adddataBankUsecase.addbnkdt(request.payload);
    const response = h.response({
      status: 'success',
      data: databank
    });
    response.code(201);
    return response;
  }

  async putBanknwHandler(request, h) {
    const putBankUsecase = this._container.getInstance(AddbnksUseCase.name);
    const databankedit = await putBankUsecase.edtbank(request.payload, request.params);
    const response = h.response({
      status: 'success',
      data: databankedit
    });
    response.code(200);
    return response;
  }

  async delBankHandler(request, h) {
    const delBankUsecase = this._container.getInstance(AddbnksUseCase.name);
    const databankdel = await delBankUsecase.delbankdata(request.params);
    const response = h.response({
      status: 'success',
      data: databankdel
    });
    response.code(200);
    return response;
  }
  async delArrBankHandler(request, h) {
    const delArrBankUsecase = this._container.getInstance(AddbnksUseCase.name);
    const databankarrdel = await delArrBankUsecase.delbankdataarr(request.params);
    const response = h.response({
      status: 'success',
      data: databankarrdel
    });
    response.code(200);
    return response;
  }
  async putGroupBanknwHandler(request, h) {
    const putGroupBankUsecase = this._container.getInstance(AddbnksUseCase.name);
    const databankeditgr = await putGroupBankUsecase.edtbankgroup(request.payload, request.params);
    const response = h.response({
      status: 'success',
      data: databankeditgr
    });
    response.code(200);
    return response;
  }
  async getBanknwHandler(request, h) {
    const getBankUsecase = this._container.getInstance(AddbnksUseCase.name);
    const databankall = await getBankUsecase.getbankdt(request.params);
    const response = h.response({
      status: 'success',
      data: databankall
    });
    response.code(200);
    return response;
  }


  async getBanknwexHandler(request, h) {
    const getBankexUsecase = this._container.getInstance(AddbnksUseCase.name);
    const databankall = await getBankexUsecase.getbankdtex(request.params);
    const response = h.response({
      status: 'success',
      data: databankall
    });
    response.code(200);
    return response;
  }









}

module.exports = BnksHandler;
