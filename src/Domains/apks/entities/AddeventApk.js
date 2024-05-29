class AddeventApk {
    constructor(payload) {
        this._verifyPayload(payload);

        const { apkid, icongif, posisi, bannerurl, linkevent, switchs } = payload;


        this.apkid = apkid;
        this.icongif = icongif;
        this.posisi = posisi;
        this.bannerurl = bannerurl;
        this.linkevent = linkevent;
        this.switchs = switchs;


    }

    _verifyPayload({ apkid, icongif, posisi, bannerurl, linkevent, switchs }) {
        if (!apkid || !icongif || !posisi || !bannerurl || !linkevent || !switchs) {
            throw new Error('ADD_EVENT_APK.NOT_CONTAIN_NEEDED_PROPERTY');
        }

        if (typeof apkid !== 'string' || typeof icongif !== 'string' || typeof posisi !== 'string' || typeof bannerurl !== 'string' || typeof linkevent !== 'string' ||
            typeof switchs !== 'boolean') {
            throw new Error('ADD_EVENT_APK.NOT_MEET_DATA_TYPE_SPECIFICATION');
        }

        if (!icongif.match(/^[a-zA-Z0-9\-_~:/?#\[\]@!$&'()*+,;=.]+$/) || !bannerurl.match(/^[a-zA-Z0-9\-_~:%/?#\[\]@!$&'()*+,;=.]+$/) || !linkevent.match(/^[a-zA-Z0-9\-_~:%/?#\[\]@!$&'()*+,;=.]+$/) || !posisi.match(/^[0-9]+$/)) {
            throw new Error('ADD_EVENT_APK.REGISTER_CONTAIN_RESTRICTED_CHARACTER');
        }
    }
}

module.exports = AddeventApk;
