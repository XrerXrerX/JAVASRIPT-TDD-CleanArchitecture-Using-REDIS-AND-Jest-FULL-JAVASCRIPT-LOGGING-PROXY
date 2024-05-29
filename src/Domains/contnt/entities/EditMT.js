class EditMT {
    constructor(payload) {
        this._verifyPayload(payload);
        const { stsmtncnc } = payload;
        this.stsmtncnc = stsmtncnc;


    }

    _verifyPayload({ stsmtncnc }) {
        if (!stsmtncnc) {
            throw new Error('EDIT_MT.NOT_CONTAIN_NEEDED_PROPERTY');
        }

        if (typeof stsmtncnc !== 'string') {
            throw new Error('EDIT_MT.NOT_MEET_DATA_TYPE_SPECIFICATION');
        }

        if (!stsmtncnc.match(/^[0-9]+$/)) {
            throw new Error('EDIT_MT.CONTAIN_RESTRICTED_CHARACTER');
        }
    }
}

module.exports = EditMT;
