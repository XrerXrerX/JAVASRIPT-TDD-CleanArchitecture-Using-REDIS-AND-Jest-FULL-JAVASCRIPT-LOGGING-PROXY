class AddMasterBnks {
    constructor(payload) {
        this._verifyPayload(payload);

        this.bnkmstrxyxyx = payload.bnkmstrxyxyx;
        // this.groupbank = payload.groupbank;
        this.urllogoxxyx = payload.urllogoxxyx;
        this.statusxyxyy = payload.statusxyxyy;
        this.wdstatusxyxyy = payload.wdstatusxyxyy;
    }

    _verifyPayload({ bnkmstrxyxyx, urllogoxxyx, statusxyxyy, wdstatusxyxyy }) {
        if (!bnkmstrxyxyx || !urllogoxxyx || !statusxyxyy || !wdstatusxyxyy) {
            throw new Error('ADD_MASRTER_BANK.NOT_CONTAIN_NEEDED_PROPERTY');
        }

        // if (typeof bnkmstrxyxyx !== 'string' || typeof groupbank !== 'string' || typeof urllogoxxyx !== 'string' || typeof statusxyxyy !== 'number') {
        if (typeof bnkmstrxyxyx !== 'string' || typeof urllogoxxyx !== 'string' || typeof statusxyxyy !== 'number' || typeof wdstatusxyxyy !== 'number') {
            throw new Error('ADD_MASRTER_BANK.NOT_MEET_DATA_TYPE_SPECIFICATION');
        }


        // if (!bnkmstrxyxyx.match(/^[a-zA-Z0-9]+$/) || !groupbank.match(/^[a-zA-Z0-9]+$/) || !urllogoxxyx.match(/^[a-zA-Z0-9\-_~:/?#\[\]@!$&'()*+,;=.]+$/)) {

        if (!bnkmstrxyxyx.match(/^[a-zA-Z0-9]+\s*$/) || !urllogoxxyx.match(/^[a-zA-Z0-9\-_~:/?#\[\]@!$&'()*+,;=.]+\s*$/)) {
            throw new Error('ADD_MASRTER_BANK.REGISTER_CONTAIN_RESTRICTED_CHARACTER');
        }
    }
}

module.exports = AddMasterBnks;
