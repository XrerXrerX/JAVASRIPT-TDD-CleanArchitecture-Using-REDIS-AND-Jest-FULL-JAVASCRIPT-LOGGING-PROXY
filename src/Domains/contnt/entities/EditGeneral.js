class EditGeneral {
    constructor(payload) {
        this._verifyPayload(payload);
        const { nmwebsite, logrl, icrl, pkrl, rnntxt } = payload;
        this.nmwebsite = nmwebsite;
        this.logrl = logrl;
        this.icrl = icrl;
        this.pkrl = pkrl;
        this.rnntxt = rnntxt;

    }

    _verifyPayload({ nmwebsite, rnntxt, logrl, icrl, pkrl }) {
        if (!nmwebsite || !rnntxt || !logrl || !icrl || !pkrl) {
            throw new Error('EDIT_GENERAL.NOT_CONTAIN_NEEDED_PROPERTY');
        }

        if (typeof nmwebsite !== 'string' || typeof rnntxt !== 'string' || typeof logrl !== 'string' || typeof icrl !== 'string' || typeof pkrl !== 'string') {
            throw new Error('EDIT_GENERAL.NOT_MEET_DATA_TYPE_SPECIFICATION');
        }

        if (!nmwebsite.match(/^[a-zA-Z0-9\s]+$/) || !rnntxt.match(/^[a-zA-Z0-9\s\.,'"\|&!]+$/) || !logrl.match(/^[a-zA-Z0-9\-_.]+$/) || !icrl.match(/^[a-zA-Z0-9\-_.]+$/)) {
            throw new Error('EDIT_GENERAL.CONTAIN_RESTRICTED_CHARACTER');
        }
    }
}

module.exports = EditGeneral;
