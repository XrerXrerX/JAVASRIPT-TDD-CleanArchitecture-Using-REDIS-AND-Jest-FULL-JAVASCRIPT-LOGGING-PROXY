class ChangePassw {
    constructor(payload) {
        this._verifyPayload(payload);

        const { password } = payload;
        this.password = password;


    }

    _verifyPayload({ password }) {
        if (!password) {
            throw new Error('PASSWORD.NOT_CONTAIN_NEEDED_PROPERTY');
        }

        if (typeof password !== 'string') {
            throw new Error('PASSWORD.NOT_MEET_DATA_TYPE_SPECIFICATION');
        }



        if (!password.match(/^[a-zA-Z0-9]+$/)) {
            throw new Error('PASSWORD.UPDATED_CONTAIN_RESTRICTED_CHARACTER');
        }

    }
}

module.exports = ChangePassw;
