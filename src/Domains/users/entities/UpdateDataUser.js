class UpdateDataUser {
    constructor(payload) {
        this._verifyPayload(payload);

        const { xybanknamexyy, xybankuserxy, xxybanknumberxy, group, groupwd } = payload;
        this.xybanknamexyy = xybanknamexyy;
        this.xybankuserxy = xybankuserxy;
        this.xxybanknumberxy = xxybanknumberxy;
        this.group = group;
        this.groupwd = groupwd;

    }

    _verifyPayload({ xybanknamexyy, xybankuserxy, xxybanknumberxy, group, groupwd }) {
        if (!xybanknamexyy || !xybankuserxy || !xxybanknumberxy || !group || !groupwd) {
            throw new Error('UPDATED_USER.NOT_CONTAIN_NEEDED_PROPERTY');
        }

        if (typeof xybanknamexyy !== 'string' || typeof xybankuserxy !== 'string' || typeof xxybanknumberxy !== 'string' || typeof group !== 'string' || typeof groupwd !== 'string') {
            throw new Error('UPDATED_USER.NOT_MEET_DATA_TYPE_SPECIFICATION');
        }

        if (xybanknamexyy.length > 20 || xybankuserxy.length > 50 || xxybanknumberxy.length > 20) {
            throw new Error('UPDATED_USER.RESTRICTED_LIMIT_CHARACTER');
        }


        if (!xybanknamexyy.match(/^[\w]+$/) || !xybankuserxy.match(/^[\w ]+$/) || !xxybanknumberxy.match(/^[0-9]+$/)) {
            throw new Error('UPDATED_USER.UPDATED_CONTAIN_RESTRICTED_CHARACTER');
        }

    }
}

module.exports = UpdateDataUser;
