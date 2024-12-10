const GetDataApk = require('../../Domains/apks/entities/GetDataApk');



class GetDataApkUseCase {
    constructor({ apkRepository, cacheServices }) {
        this._apkRepository = apkRepository;
        this._cacheService = cacheServices;
    }

    async execute(params) {
        try {
            // mendapatkan catatan dari cache
            const result = await this._cacheService.get(`apkid:${params.apkid}`);
            const dataapk = JSON.parse(result);
            const data = {
                data: dataapk,
                headers: {
                    'X-Data-Source': 'cache',
                },
            };
            return data;
        } catch (error) {
            const { idapk, created_at, updated_at, ...getDataApk } = await this._apkRepository.getapkdata(params.apkid);
            const { apkid, ...getEvent } = await this._apkRepository.getapkevent(params.apkid);
            const getNotice = await this._apkRepository.getapknotice(params.apkid);

            const events = [];
            for (const key in getEvent) {
                const { apkid, idapk, ...eventData } = getEvent[key];
                events.push({
                    ...eventData
                });
            }

            const notice = [];
            for (const key in getNotice) {
                notice.push({
                    ...getNotice[key]
                });
            }

            const dataapkfull = {
                masterdata: {
                    ...getDataApk
                },
                events: events,
                notice: notice,
                created_at,
                updated_at
            };


            // console.log('ini params apk id' + params.apkid);
            await this._cacheService.delete(`apkid:${params.apkid}`);
            await this._cacheService.set(`apkid:${params.apkid}`, JSON.stringify(dataapkfull));

            const data = {
                data: dataapkfull,
            };

            return data;
        };
    }
}

module.exports = GetDataApkUseCase;