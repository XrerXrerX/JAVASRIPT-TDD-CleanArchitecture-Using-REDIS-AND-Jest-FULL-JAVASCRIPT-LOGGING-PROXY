class RegisteredUser {
    constructor(payload) {
        this._verifyPayload(payload);

        const { xyuseridxy, xyusernamexxy } = payload;

        this.xyuseridxy = xyuseridxy;
        this.xyusernamexxy = xyusernamexxy;
    }

    _verifyPayload({ xyuseridxy, xyusernamexxy }) {
        if (!xyuseridxy || !xyusernamexxy) {
            throw new Error('REGISTERED_USER.NOT_CONTAIN_NEEDED_PROPERTY');
        }

        if (typeof xyuseridxy !== 'string' || typeof xyusernamexxy !== 'string') {
            throw new Error('REGISTERED_USER.NOT_MEET_DATA_TYPE_SPECIFICATION');
        }
    }
}

module.exports = RegisteredUser;
