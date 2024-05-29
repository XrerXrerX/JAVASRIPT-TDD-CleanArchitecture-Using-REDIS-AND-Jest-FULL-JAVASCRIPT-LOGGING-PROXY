const EditContent = require('../../Domains/contnt/entities/EditContent');
const AddSiteMap = require('../../Domains/contnt/entities/AddSitemap');
const EditGeneral = require('../../Domains/contnt/entities/EditGeneral');
const EditSlider = require('../../Domains/contnt/entities/EditSlider');
const EditLink = require('../../Domains/contnt/entities/EditLink');
const EditSocmed = require('../../Domains/contnt/entities/EditSocmed');
const EditPromo = require('../../Domains/contnt/entities/EditPromo');
const EditMT = require('../../Domains/contnt/entities/EditMT');


class ContentUseCase {

    constructor({ contentRepository, cacheServices }) {
        this._contentRepository = contentRepository;
        this._cacheService = cacheServices;
    }


    async editmttag(useCasePayload, params) {
        const payload = new EditContent(useCasePayload);
        await this._contentRepository.editmtdt(payload, params.iddtmeta);
        await this._cacheService.delete(`metatag:metatag`);

        return 'metatag updated';
    }

    async getmttag() {
        try {
            const result = await this._cacheService.get(`metatag:metatag`);
            const dataresult = JSON.parse(result);
            dataresult.headers = {
                'X-Data-Source': 'cache',
            };
            return dataresult;
        } catch (error) {
            const dtmttag = await this._contentRepository.gettmtdt();
            await this._cacheService.delete(`metatag:metatag`);
            await this._cacheService.set(`metatag:metatag`, JSON.stringify(dtmttag));
            return dtmttag;

        }
    }

    async addstmp(useCasePayload) {
        const payload = new AddSiteMap(useCasePayload);
        await this._contentRepository.checkstmp(payload.urpage);
        await this._contentRepository.addstmp(payload.urpage);
        await this._cacheService.delete(`sitemap:sitemap`);
        return "sitemap added succesfully !";
    }
    async editstmpusecase(useCasePayload, params) {
        const payload = new AddSiteMap(useCasePayload);
        await this._contentRepository.checkstmp(payload.urpage);
        await this._contentRepository.editstmp(payload.urpage, params.urpage);
        await this._cacheService.delete(`sitemap:sitemap`);
        return "Sitemap Edit Success !";
    }

    async getstmp() {
        try {
            const result = await this._cacheService.get(`sitemap:sitemap`);
            const dataresult = JSON.parse(result);
            dataresult.headers = {
                'X-Data-Source': 'cache',
            };
            return dataresult;
        } catch (error) {
            const dtstmp = await this._contentRepository.getstmp();
            await this._cacheService.delete(`sitemap:sitemap`);
            await this._cacheService.set(`sitemap:sitemap`, JSON.stringify(dtstmp));
            return dtstmp;

        }
    }

    async delstmp(useCasePayload) {
        const payload = new AddSiteMap(useCasePayload);
        await this._contentRepository.delstmp(payload.urpage);
        await this._cacheService.delete(`sitemap:sitemap`);
        return "Sitemap deleted successfully !";
    }

    async editgeneral(useCasePayload, params) {
        const payload = new EditGeneral(useCasePayload);
        await this._contentRepository.editgeneral(payload, params.idnmwebst);
        await this._cacheService.delete(`ctgeneral:ctgeneral`);
        return 'general data updated';
    }
    async getgeneral() {
        try {
            const result = await this._cacheService.get(`ctgeneral:ctgeneral`);
            const dataresult = JSON.parse(result);
            dataresult.headers = {
                'X-Data-Source': 'cache',
            };
            return dataresult;
        } catch (error) {
            const dtgeneral = await this._contentRepository.getgeneral();
            await this._cacheService.delete(`ctgeneral:ctgeneral`);
            await this._cacheService.set(`ctgeneral:ctgeneral`, JSON.stringify(dtgeneral));
            return dtgeneral;
        }
    }

    async editslider(useCasePayload, params) {
        const payload = new EditSlider(useCasePayload);
        await this._contentRepository.editslider(payload, params.idctsldr);
        await this._cacheService.delete(`ctslider:ctslider`);
        return 'slider data updated';
    }

    async getslider() {
        try {
            // await this._cacheService.delete(`ctslider:ctslider`);

            const result = await this._cacheService.get(`ctslider:ctslider`);
            const dataresult = JSON.parse(result);
            dataresult.headers = {
                'X-Data-Source': 'cache',
            };
            return dataresult;
        } catch (error) {
            const dtslider = await this._contentRepository.getslider();
            await this._cacheService.delete(`ctslider:ctslider`);
            await this._cacheService.set(`ctslider:ctslider`, JSON.stringify(dtslider));
            return dtslider;
        }
    }

    async editlink(useCasePayload, params) {
        const payload = new EditLink(useCasePayload);
        await this._contentRepository.editlink(payload, params.idctlnk);
        await this._cacheService.delete(`ctlink:ctlink`);
        return 'link data updated';
    }

    async getlink() {
        try {
            const result = await this._cacheService.get(`ctlink:ctlink`);
            const dataresult = JSON.parse(result);
            dataresult.headers = {
                'X-Data-Source': 'cache',
            };
            return dataresult;
        } catch (error) {
            const dtlink = await this._contentRepository.getlink();
            await this._cacheService.delete(`ctlink:ctlink`);
            await this._cacheService.set(`ctlink:ctlink`, JSON.stringify(dtlink));
            return dtlink;
        }
    }

    async editsocmed(useCasePayload, params) {
        const payload = new EditSocmed(useCasePayload);
        await this._contentRepository.editsocmed(payload, params.idctscmed);
        await this._cacheService.delete(`ctsocmed:ctsocmed`);
        return 'social media data updated';
    }

    async getsocmed() {
        try {
            const result = await this._cacheService.get(`ctsocmed:ctsocmed`);
            const dataresult = JSON.parse(result);
            dataresult.headers = {
                'X-Data-Source': 'cache',
            };
            return dataresult;
        } catch (error) {
            const dtsocmed = await this._contentRepository.getsocmed();
            await this._cacheService.delete(`ctsocmed:ctsocmed`);
            await this._cacheService.set(`ctsocmed:ctsocmed`, JSON.stringify(dtsocmed));
            return dtsocmed;
        }
    }

    async addpromo(useCasePayload) {
        const payload = new EditPromo(useCasePayload);
        await this._contentRepository.addpromo(payload);
        await this._cacheService.delete(`ctpromo:ctpromo`);
        return 'promo added succesfully !';
    }

    async editpromo(useCasePayload, params) {
        const payload = new EditPromo(useCasePayload);
        await this._contentRepository.editpromo(payload, params.idctprm);
        await this._cacheService.delete(`ctpromo:ctpromo`);
        return 'promo Edit Success !';
    }

    async getpromo() {
        try {
            const result = await this._cacheService.get(`ctpromo:ctpromo`);
            const dataresult = JSON.parse(result);
            dataresult.headers = {
                'X-Data-Source': 'cache',
            };
            return dataresult;
        } catch (error) {
            const dtpromo = await this._contentRepository.getpromo();
            await this._cacheService.delete(`ctpromo:ctpromo`);
            await this._cacheService.set(`ctpromo:ctpromo`, JSON.stringify(dtpromo));
            return dtpromo;
        }
    }

    async deletepromo(params) {
        await this._contentRepository.deletepromo(params);
        await this._cacheService.delete(`ctpromo:ctpromo`);
        return 'Promo deleted successfully !';
    }

    async editmt(useCasePayload, params) {
        const payload = new EditMT(useCasePayload);
        await this._contentRepository.editmt(payload, params.idctmtncnc);
        await this._cacheService.delete(`ctmaintenance:ctmaintenance`);
        return 'Status updated';
    }

    async getmt() {
        try {
            const result = await this._cacheService.get(`ctmaintenance:ctmaintenance`);
            const dataresult = JSON.parse(result);
            dataresult.headers = {
                'X-Data-Source': 'cache',
            };
            return dataresult;
        } catch (error) {
            const dtmt = await this._contentRepository.getmt();
            await this._cacheService.delete(`ctmaintenance:ctmaintenance`);
            await this._cacheService.set(`ctmaintenance:ctmaintenance`, JSON.stringify(dtmt));
            return dtmt;
        }
    }

}

module.exports = ContentUseCase;