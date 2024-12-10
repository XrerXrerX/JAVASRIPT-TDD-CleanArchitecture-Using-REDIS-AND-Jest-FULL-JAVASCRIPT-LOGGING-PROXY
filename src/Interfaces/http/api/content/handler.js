const ContentUseCase = require('../../../../Applications/use_case/ContentUseCase');

class ContentHandler {
  constructor(container) {
    this._container = container;
    this.putcontentMtTagHandler = this.putcontentMtTagHandler.bind(this);
    this.getcontentMtTagHandler = this.getcontentMtTagHandler.bind(this);
    this.postcontentSiteMapTagHandler = this.postcontentSiteMapTagHandler.bind(this);
    this.putcontentSiteMapTagHandler = this.putcontentSiteMapTagHandler.bind(this);
    this.getcontentSiteMapTagHandler = this.getcontentSiteMapTagHandler.bind(this);
    this.delcontentSiteMapTagHandler = this.delcontentSiteMapTagHandler.bind(this);
    this.putctGeneralTagHandler = this.putctGeneralTagHandler.bind(this);
    this.getctGeneralTagHandler = this.getctGeneralTagHandler.bind(this);
    this.putctSliderTagHandler = this.putctSliderTagHandler.bind(this);
    this.getctSliderTagHandler = this.getctSliderTagHandler.bind(this);
    this.putctLinkTagHandler = this.putctLinkTagHandler.bind(this);
    this.getctLinkTagHandler = this.getctLinkTagHandler.bind(this);
    this.putctSocmedTagHandler = this.putctSocmedTagHandler.bind(this);
    this.socmedctSocmedTagHandler = this.socmedctSocmedTagHandler.bind(this);
    this.postcontentPromoTagHandler = this.postcontentPromoTagHandler.bind(this);
    this.putcontentPromoTagHandler = this.putcontentPromoTagHandler.bind(this);
    this.getcontentPromoTagHandler = this.getcontentPromoTagHandler.bind(this);
    this.delcontentPromoTagHandler = this.delcontentPromoTagHandler.bind(this);
    this.putctMTTagHandler = this.putctMTTagHandler.bind(this);
    this.getctMTTagHandler = this.getctMTTagHandler.bind(this);
  }

  async putcontentMtTagHandler(request, h) {
    const editmttagcontentUseCase = this._container.getInstance(ContentUseCase.name);
    const dataid = await editmttagcontentUseCase.editmttag(request.payload, request.params);

    const response = h.response({
      status: 'success',
      data: dataid
    });
    response.code(200);
    return response;
  }
  async getcontentMtTagHandler(request, h) {
    const getmtcontentUseCase = this._container.getInstance(ContentUseCase.name);
    const datameta = await getmtcontentUseCase.getmttag();
    const response = h.response({
      status: 'success',
      data: datameta
    });
    response.code(200);
    return response;
  }
  async postcontentSiteMapTagHandler(request, h) {
    const postsitempcontentUseCase = this._container.getInstance(ContentUseCase.name);
    const datasitemap = await postsitempcontentUseCase.addstmp(request.payload);

    const response = h.response({
      status: 'success',
      data: datasitemap
    });
    response.code(200);
    return response;
  }
  async putcontentSiteMapTagHandler(request, h) {
    const putmttagcontentUseCase = this._container.getInstance(ContentUseCase.name);
    const datasitemap = await putmttagcontentUseCase.editstmpusecase(request.payload, request.params);

    const response = h.response({
      status: 'success',
      data: datasitemap
    });
    response.code(200);
    return response;
  }

  async getcontentSiteMapTagHandler(request, h) {
    const putmttagcontentUseCase = this._container.getInstance(ContentUseCase.name);
    const datameta = await putmttagcontentUseCase.getstmp();
    const response = h.response({
      status: 'success',
      data: datameta
    });
    response.code(200);
    return response;
  }
  async delcontentSiteMapTagHandler(request, h) {
    const delcontentSiteMapTagHandler = this._container.getInstance(ContentUseCase.name);
    const datameta = await delcontentSiteMapTagHandler.delstmp(request.payload);
    const response = h.response({
      status: 'success',
      data: datameta
    });
    response.code(200);
    return response;
  }

  async putctGeneralTagHandler(request, h) {
    const putctGeneralTagHandler = this._container.getInstance(ContentUseCase.name);
    const datactGeneral = await putctGeneralTagHandler.editgeneral(request.payload, request.params);
    const response = h.response({
      status: 'success',
      data: datactGeneral
    });
    response.code(200);
    return response;
  }
  async getctGeneralTagHandler(request, h) {
    const getctGeneralTagHandler = this._container.getInstance(ContentUseCase.name);
    const datactGeneral = await getctGeneralTagHandler.getgeneral();
    const response = h.response({
      status: 'success',
      data: datactGeneral
    });
    response.code(200);
    return response;
  }

  async putctSliderTagHandler(request, h) {
    const putctSliderTagHandler = this._container.getInstance(ContentUseCase.name);
    const dataslider = await putctSliderTagHandler.editslider(request.payload, request.params);
    const response = h.response({
      status: 'success',
      data: dataslider
    });
    response.code(200);
    return response;
  }
  async getctSliderTagHandler(request, h) {
    const getctSliderTagHandler = this._container.getInstance(ContentUseCase.name);
    const getslider = await getctSliderTagHandler.getslider();
    const response = h.response({
      status: 'success',
      data: getslider
    });
    response.code(200);
    return response;
  }

  async putctLinkTagHandler(request, h) {
    const putctLinkTagHandler = this._container.getInstance(ContentUseCase.name);
    const datalink = await putctLinkTagHandler.editlink(request.payload, request.params);
    const response = h.response({
      status: 'success',
      data: datalink
    });
    response.code(200);
    return response;
  }
  async getctLinkTagHandler(request, h) {
    const getctLinkTagHandler = this._container.getInstance(ContentUseCase.name);
    const getlink = await getctLinkTagHandler.getlink();
    const response = h.response({
      status: 'success',
      data: getlink
    });
    response.code(200);
    return response;
  }
  async putctSocmedTagHandler(request, h) {
    const putctSocmedTagHandler = this._container.getInstance(ContentUseCase.name);
    const datasocmed = await putctSocmedTagHandler.editsocmed(request.payload, request.params);
    const response = h.response({
      status: 'success',
      data: datasocmed
    });
    response.code(200);
    return response;
  }
  async socmedctSocmedTagHandler(request, h) {
    const socmedctSocmedTagHandler = this._container.getInstance(ContentUseCase.name);
    const getsocmed = await socmedctSocmedTagHandler.getsocmed();
    const response = h.response({
      status: 'success',
      data: getsocmed
    });
    response.code(200);
    return response;
  }


  async postcontentPromoTagHandler(request, h) {
    const postcontentPromoTagHandler = this._container.getInstance(ContentUseCase.name);
    const datasitemap = await postcontentPromoTagHandler.addpromo(request.payload);

    const response = h.response({
      status: 'success',
      data: datasitemap
    });
    response.code(200);
    return response;
  }
  async putcontentPromoTagHandler(request, h) {
    const putcontentPromoTagHandler = this._container.getInstance(ContentUseCase.name);
    const datasitemap = await putcontentPromoTagHandler.editpromo(request.payload, request.params);

    const response = h.response({
      status: 'success',
      data: datasitemap
    });
    response.code(200);
    return response;
  }

  async getcontentPromoTagHandler(request, h) {
    const getcontentPromoTagHandler = this._container.getInstance(ContentUseCase.name);
    const datameta = await getcontentPromoTagHandler.getpromo();
    const response = h.response({
      status: 'success',
      data: datameta
    });
    response.code(200);
    return response;
  }
  async delcontentPromoTagHandler(request, h) {
    const delcontentPromoTagHandler = this._container.getInstance(ContentUseCase.name);
    const datameta = await delcontentPromoTagHandler.deletepromo(request.params);
    const response = h.response({
      status: 'success',
      data: datameta
    });
    response.code(200);
    return response;
  }

  async putctMTTagHandler(request, h) {
    const putctMTTagHandler = this._container.getInstance(ContentUseCase.name);
    const dataMT = await putctMTTagHandler.editmt(request.payload, request.params);
    const response = h.response({
      status: 'success',
      data: dataMT
    });
    response.code(200);
    return response;
  }
  async getctMTTagHandler(request, h) {
    const getctMTTagHandler = this._container.getInstance(ContentUseCase.name);
    const getMT = await getctMTTagHandler.getmt();
    const response = h.response({
      status: 'success',
      data: getMT
    });
    response.code(200);
    return response;
  }


}

module.exports = ContentHandler;
