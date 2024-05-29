class EditGroupBnks {
    constructor(payload) {
        this._verifyPayload(payload);

        const { namegroupxyzt } = payload;

        this.namegroupxyzt = namegroupxyzt;
    }

    _verifyPayload({ namegroupxyzt }) {
        if (!namegroupxyzt) {
            throw new Error('ADD_BANK.NOT_CONTAIN_NEEDED_PROPERTY');
        }

        if (typeof namegroupxyzt !== 'string') {
            throw new Error('ADD_BANK.NOT_MEET_DATA_TYPE_SPECIFICATION');
        }
        if (!namegroupxyzt.match(/^[a-zA-Z0-9]+$/)) {
            throw new Error('ADD_BANK.REGISTER_CONTAIN_RESTRICTED_CHARACTER');
        }

    }
}

module.exports = EditGroupBnks;
