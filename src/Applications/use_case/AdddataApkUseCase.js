const AddApk = require('../../Domains/apks/entities/AddApk');
const AddeventApk = require('../../Domains/apks/entities/AddeventApk');
const AddPemberitahuanApk = require('../../Domains/apks/entities/AddPemberitahuanApk');


class AdddataApkUseCase {
    constructor({ apkRepository, cacheServices }) {
        this._apkRepository = apkRepository;
        this._cacheService = cacheServices;

    }

    async execute(useCasePayload) {
        const dataapks = new AddApk(useCasePayload);
        // const dataevent = new AddeventApk(useCasePayload);
        // const dataPemberitahuans = new AddPemberitahuanApk(useCasePayload);
        const apkid = await this._apkRepository.datasettings(dataapks);
        await this._cacheService.delete(`apkid:${apkid}`);
        // this._apkRepository.events(dataevent, apkid);
        // this._apkRepository.pemberitahuans(dataPemberitahuans, apkid);
        return apkid;
    }

    async executeevent(useCasePayload) {
        // const dataapks = new AddApk(useCasePayload);
        const dataevent = new AddeventApk(useCasePayload);
        // const dataPemberitahuans = new AddPemberitahuanApk(useCasePayload);
        // const apkid = await this._apkRepository.datasettings(dataapks);
        const apkid = this._apkRepository.events(dataevent);

        await this._cacheService.delete(`apkid:${{ apkid }}`);
        // this._apkRepository.pemberitahuans(dataPemberitahuans, apkid);
        return apkid;
    }

    async executenotice(useCasePayload) {
        // const dataapks = new AddApk(useCasePayload);
        // const dataevent = new AddeventApk(useCasePayload);
        const dataPemberitahuans = new AddPemberitahuanApk(useCasePayload);
        // const apkid = await this._apkRepository.datasettings(dataapks);
        // this._apkRepository.events(dataevent, apkid);
        const apkid = await this._apkRepository.pemberitahuans(dataPemberitahuans);

        await this._cacheService.delete(`apkid:${apkid}`);
        return apkid;
    }
}

module.exports = AdddataApkUseCase;