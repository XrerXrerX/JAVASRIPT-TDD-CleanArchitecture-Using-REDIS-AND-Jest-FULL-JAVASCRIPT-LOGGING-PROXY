class AddGroupBnks {
    constructor(payload) {
        this._verifyPayload(payload);

        const { namegroupxyzt, grouptype, min_dp, max_dp, min_wd, max_wd } = payload;

        this.namegroupxyzt = namegroupxyzt;
        this.grouptype = grouptype;
        this.min_dp = min_dp;
        this.max_dp = max_dp;
        this.min_wd = min_wd;
        this.max_wd = max_wd;
    }

    _verifyPayload({ namegroupxyzt, grouptype, min_dp, max_dp, min_wd, max_wd }) {
        if (!namegroupxyzt || !grouptype || !min_dp || !max_dp || !min_wd || !max_wd) {
            throw new Error('ADD_GROUP_BANK.NOT_CONTAIN_NEEDED_PROPERTY');
        }

        if (typeof namegroupxyzt !== 'string' || typeof grouptype !== 'number' || typeof min_dp !== 'number' || typeof max_dp !== 'number' || typeof min_wd !== 'number' || typeof max_wd !== 'number') {
            throw new Error('ADD_GROUP_BANK.NOT_MEET_DATA_TYPE_SPECIFICATION');
        }


        if (!namegroupxyzt.match(/^[a-zA-Z0-9]+\s*$/)) {
            throw new Error('ADD_GROUP_BANK.UPDATED_CONTAIN_RESTRICTED_CHARACTER');
        }


    }
}

module.exports = AddGroupBnks;
