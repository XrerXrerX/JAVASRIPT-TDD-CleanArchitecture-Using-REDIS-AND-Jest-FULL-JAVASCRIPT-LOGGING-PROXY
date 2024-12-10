class AddApk {
    constructor(payload) {
        this._verifyPayload(payload);

        const { version, home, deposit, server1, server2, server3, update, peraturan, klasemen, promosi, livescore, livechat, whatsapp1, whatsapp2, facebook, telegram, instagram, prediksi } = payload;

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
    }

    _verifyPayload({ version, home, deposit, server1, server2, server3, update, peraturan, klasemen, promosi, livescore, livechat, whatsapp1, whatsapp2, facebook, telegram, instagram, prediksi }) {
        if (!version || !home || !deposit || !server1 || !server2 || !server3 || !update || !peraturan || !klasemen || !promosi || !livescore || !livechat || !whatsapp1 || !whatsapp2 || !facebook || !telegram || !instagram || !prediksi) {
            throw new Error('ADD_APK.NOT_CONTAIN_NEEDED_PROPERTY');
        }

        if (typeof version !== 'string' || typeof home !== 'string' || typeof deposit !== 'string' || typeof server1 !== 'string' || typeof server2 !== 'string' || typeof server3 !== 'string' || typeof update !== 'string' || typeof peraturan !== 'string' || typeof klasemen !== 'string' || typeof promosi !== 'string' || typeof livescore !== 'string' || typeof livechat !== 'string' || typeof whatsapp1 !== 'string' || typeof whatsapp2 !== 'string' || typeof facebook !== 'string' || typeof telegram !== 'string' || typeof instagram !== 'string' || typeof prediksi !== 'string') {
            throw new Error('ADD_APK.NOT_MEET_DATA_TYPE_SPECIFICATION');
        }
        if (!home.match(/^[a-zA-Z0-9\-_~:/?#\[\]@!$&'()*+,;=.]+$/) || !deposit.match(/^[a-zA-Z0-9\-_~:/?#\[\]@!$&'()*+,;=.]+$/) || !server1.match(/^[a-zA-Z0-9\-_~:/?#\[\]@!$&'()*+,;=.]+$/) || !server2.match(/^[a-zA-Z0-9\-_~:/?#\[\]@!$&'()*+,;=.]+$/) || !server3.match(/^[a-zA-Z0-9\-_~:/?#\[\]@!$&'()*+,;=.]+$/) || !update.match(/^[a-zA-Z0-9\-_~:/?#\[\]@!$&'()*+,;=.]+$/) || !peraturan.match(/^[a-zA-Z0-9\-_~:/?#\[\]@!$&'()*+,;=.]+$/) || !klasemen.match(/^[a-zA-Z0-9\-_~:/?#\[\]@!$&'()*+,;=.]+$/) || !promosi.match(/^[a-zA-Z0-9\-_~:/?#\[\]@!$&'()*+,;=.]+$/) || !livescore.match(/^[a-zA-Z0-9\-_~:/?#\[\]@!$&'()*+,;=.]+$/) || !livechat.match(/^[a-zA-Z0-9\-_~:/?#\[\]@!$&'()*+,;=.]+$/) || !whatsapp1.match(/^[a-zA-Z0-9\-_~:/?#\[\]@!$&'()*+,;=.]+$/) || !whatsapp2.match(/^[a-zA-Z0-9\-_~:/?#\[\]@!$&'()*+,;=.]+$/) || !facebook.match(/^[a-zA-Z0-9\-_~:/?#\[\]@!$&'()*+,;=.]+$/) || !telegram.match(/^[a-zA-Z0-9\-_~:/?#\[\]@!$&'()*+,;=.]+$/) || !instagram.match(/^[a-zA-Z0-9\-_~:/?#\[\]@!$&'()*+,;=.]+$/) || !prediksi.match(/^[a-zA-Z0-9\-_~:/?#\[\]@!$&'()*+,;=.]+$/)) {
            throw new Error('ADD_APK.REGISTER_CONTAIN_RESTRICTED_CHARACTER');
        }
    }
}

module.exports = AddApk;
