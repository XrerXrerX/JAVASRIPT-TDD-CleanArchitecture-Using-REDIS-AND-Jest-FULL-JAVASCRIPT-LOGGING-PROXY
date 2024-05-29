class EditPromo {
    constructor(payload) {
        this._verifyPayload(payload);
        const { ctprmur, ttlectprm, trgturctprm, statusctprm, pssprm, dskprm } = payload;
        this.ctprmur = ctprmur;
        this.ttlectprm = ttlectprm;
        this.trgturctprm = trgturctprm;
        this.statusctprm = statusctprm;
        this.pssprm = pssprm;
        this.dskprm = dskprm;




    }

    _verifyPayload({ ctprmur, ttlectprm, trgturctprm, statusctprm, pssprm, dskprm }) {
        if (!ctprmur || !ttlectprm || !trgturctprm || !statusctprm || !pssprm || !dskprm) {
            throw new Error('EDIT_PROMO.NOT_CONTAIN_NEEDED_PROPERTY');
        }

        if (typeof ctprmur !== 'string' || typeof ttlectprm !== 'string' || typeof trgturctprm !== 'string' || typeof statusctprm !== 'string' || typeof pssprm !== 'string' || typeof dskprm !== 'string') {
            throw new Error('EDIT_PROMO.NOT_MEET_DATA_TYPE_SPECIFICATION');
        }

        if (!ttlectprm.match(/^[a-zA-Z0-9\s%]+$/) || !statusctprm.match(/^[0-9]+$/) || !pssprm.match(/^[0-9]+$/)) {
            throw new Error('EDIT_PROMO.CONTAIN_RESTRICTED_CHARACTER');
        }
    }
}

module.exports = EditPromo;
