class EditSocmed {
    constructor(payload) {
        this._verifyPayload(payload);
        const { ctscmedur, nmectscmed, trgturctscmed, statusctscmed, lvchturctscmed, fdbckurctscmed } = payload;
        this.ctscmedur = ctscmedur;
        this.nmectscmed = nmectscmed;
        this.trgturctscmed = trgturctscmed;
        this.statusctscmed = statusctscmed;
        this.lvchturctscmed = lvchturctscmed;
        this.fdbckurctscmed = fdbckurctscmed;



    }

    _verifyPayload({ ctscmedur, nmectscmed, trgturctscmed, statusctscmed, lvchturctscmed, fdbckurctscmed }) {
        if (!ctscmedur || !nmectscmed || !trgturctscmed || !statusctscmed || !lvchturctscmed || !fdbckurctscmed) {
            throw new Error('EDIT_SOCMED.NOT_CONTAIN_NEEDED_PROPERTY');
        }

        if (typeof ctscmedur !== 'string' || typeof nmectscmed !== 'string' || typeof trgturctscmed !== 'string' || typeof statusctscmed !== 'string' || typeof lvchturctscmed !== 'string' || typeof fdbckurctscmed !== 'string') {
            throw new Error('EDIT_SOCMED.NOT_MEET_DATA_TYPE_SPECIFICATION');
        }

        if (!nmectscmed.match(/^[a-zA-Z0-9\s]+$/) || !statusctscmed.match(/^[0-9]+$/)) {
            throw new Error('EDIT_SOCMED.CONTAIN_RESTRICTED_CHARACTER');
        }
    }
}

module.exports = EditSocmed;
