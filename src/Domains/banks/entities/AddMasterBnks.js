class AddMasterBnks {
    constructor(payload) {
        this._verifyPayload(payload);

        this.bnkmstrxyxyx = payload.bnkmstrxyxyx;
        // this.groupbank = payload.groupbank;
        this.urllogoxxyx = payload.urllogoxxyx;
        this.statusxyxyy = payload.statusxyxyy;
<<<<<<< HEAD
        this.wdstatusxyxyy = payload.wdstatusxyxyy;
    }

    _verifyPayload({ bnkmstrxyxyx, urllogoxxyx, statusxyxyy, wdstatusxyxyy }) {
        if (!bnkmstrxyxyx || !urllogoxxyx || !statusxyxyy || !wdstatusxyxyy) {
=======
    }

    _verifyPayload({ bnkmstrxyxyx, urllogoxxyx, statusxyxyy }) {
        if (!bnkmstrxyxyx || !urllogoxxyx || !statusxyxyy) {
>>>>>>> aaf28ac1629362d7e0c504db6cc6a3a138f07f0b
            throw new Error('ADD_MASRTER_BANK.NOT_CONTAIN_NEEDED_PROPERTY');
        }

        // if (typeof bnkmstrxyxyx !== 'string' || typeof groupbank !== 'string' || typeof urllogoxxyx !== 'string' || typeof statusxyxyy !== 'number') {
<<<<<<< HEAD
        if (typeof bnkmstrxyxyx !== 'string' || typeof urllogoxxyx !== 'string' || typeof statusxyxyy !== 'number' || typeof wdstatusxyxyy !== 'number') {
=======
        if (typeof bnkmstrxyxyx !== 'string' || typeof urllogoxxyx !== 'string' || typeof statusxyxyy !== 'number') {
>>>>>>> aaf28ac1629362d7e0c504db6cc6a3a138f07f0b
            throw new Error('ADD_MASRTER_BANK.NOT_MEET_DATA_TYPE_SPECIFICATION');
        }


        // if (!bnkmstrxyxyx.match(/^[a-zA-Z0-9]+$/) || !groupbank.match(/^[a-zA-Z0-9]+$/) || !urllogoxxyx.match(/^[a-zA-Z0-9\-_~:/?#\[\]@!$&'()*+,;=.]+$/)) {

<<<<<<< HEAD
        if (!bnkmstrxyxyx.match(/^[a-zA-Z0-9]+\s*$/) || !urllogoxxyx.match(/^[a-zA-Z0-9\-_~:/?#\[\]@!$&'()*+,;=.]+\s*$/)) {
=======
        if (!bnkmstrxyxyx.match(/^[a-zA-Z0-9]+$/) || !urllogoxxyx.match(/^[a-zA-Z0-9\-_~:/?#\[\]@!$&'()*+,;=.]+$/)) {
>>>>>>> aaf28ac1629362d7e0c504db6cc6a3a138f07f0b
            throw new Error('ADD_MASRTER_BANK.REGISTER_CONTAIN_RESTRICTED_CHARACTER');
        }
    }
}

module.exports = AddMasterBnks;
