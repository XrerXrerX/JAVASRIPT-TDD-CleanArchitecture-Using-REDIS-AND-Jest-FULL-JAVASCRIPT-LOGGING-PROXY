class GetDataApk {
    constructor(payload) {
        this._verifyPayload(payload);

        const { apkid, version, home, deposit, server1, server2, server3, update, peraturan, klasemen, promosi, livescore, livechat, whatsapp1, whatsapp2, facebook, telegram, instagram, prediksi, icongif, posisi, bannerurl, linkevent, switchs, title, content, created_at, updated_at } = payload;
        this.apkid = apkid;
        this.version = version;
        this.home = home;
        this.deposit = deposit;
        this.server1 = server1;
        this.server2 = server2;
        this.server3 = server3;
        this.update = update;
        this.peraturan = peraturan;
        this.klasemen = klasemen;
        this.promosi = promosi;
        this.livescore = livescore;
        this.livechat = livechat;
        this.whatsapp1 = whatsapp1;
        this.whatsapp2 = whatsapp2;
        this.facebook = facebook;
        this.telegram = telegram;
        this.instagram = instagram;
        this.prediksi = prediksi;
        this.icongif = icongif;
        this.posisi = posisi;
        this.bannerurl = bannerurl;
        this.linkevent = linkevent;
        this.switchs = switchs;
        this.title = title;
        this.content = content;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }

    _verifyPayload({ apkid, version, home, deposit, server1, server2, server3, update, peraturan, klasemen, promosi, livescore, livechat, whatsapp1, whatsapp2, facebook, telegram, instagram, prediksi, icongif, posisi, bannerurl, linkevent, switchs, title, content, created_at, updated_at }) {
        if (!apkid || !version || !home || !deposit || !server1 || !server2 || !server3 || !update || !peraturan || !klasemen || !promosi || !livescore || !livechat || !whatsapp1 || !whatsapp2 || !facebook || !telegram || !instagram || !prediksi || !icongif || !posisi || !bannerurl || !linkevent || !switchs || !title || !content || !created_at || !updated_at) {
            throw new Error('GET_DATA.NOT_CONTAIN_NEEDED_PROPERTY');
        }
    }
}

module.exports = GetDataApk;
