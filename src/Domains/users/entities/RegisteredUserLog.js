class RegisteredUserLog {
    constructor(payload) {
        this._verifyPayload(payload);

        const { xyuseridxy, username } = payload;

        this.xyuseridxy = xyuseridxy;
        this.username = username;
    }

    _verifyPayload({ xyuseridxy, username }) {
        if (!xyuseridxy || !username) {
            throw new Error('REGISTERED_USER.NOT_CONTAIN_NEEDED_PROPERTY');
        }

        if (typeof xyuseridxy !== 'string' || typeof username !== 'string') {
            throw new Error('REGISTERED_USER.NOT_MEET_DATA_TYPE_SPECIFICATION');
        }
    }
}

module.exports = RegisteredUserLog;
