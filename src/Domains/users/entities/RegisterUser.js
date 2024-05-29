class RegisterUser {
    constructor(payload) {
        this._verifyPayload(payload);

        const { xyusernamexxy, password, xybanknamexyy, xybankuserxy, xxybanknumberxy, xyx11xuser_mailxxyy, xynumbphonexyyy } = payload;

        this.xyusernamexxy = xyusernamexxy;
        this.password = password;
        this.xybanknamexyy = xybanknamexyy;
        this.xybankuserxy = xybankuserxy;
        this.xxybanknumberxy = xxybanknumberxy;
        this.xyx11xuser_mailxxyy = xyx11xuser_mailxxyy;
        this.xynumbphonexyyy = xynumbphonexyyy;

    }

    _verifyPayload({ xyusernamexxy, password, xybanknamexyy, xybankuserxy, xxybanknumberxy, xyx11xuser_mailxxyy, xynumbphonexyyy }) {
        if (!xyusernamexxy || !password || !xybanknamexyy || !xybankuserxy || !xxybanknumberxy || !xyx11xuser_mailxxyy || !xynumbphonexyyy) {
            throw new Error('REGISTER_USER.NOT_CONTAIN_NEEDED_PROPERTY');
        }

        if (typeof xyusernamexxy !== 'string' || typeof password !== 'string' || typeof xybanknamexyy !== 'string' || typeof xybankuserxy !== 'string' || typeof xxybanknumberxy !== 'string' || typeof xyx11xuser_mailxxyy !== 'string' || typeof xynumbphonexyyy !== 'string') {
            throw new Error('REGISTER_USER.NOT_MEET_DATA_TYPE_SPECIFICATION');
        }

        if (xyusernamexxy.length > 16) {
            throw new Error('REGISTER_USER.USERNAME_MORE_LIMIT_CHAR');
        }
        if (xyusernamexxy.length < 6) {
            throw new Error('REGISTER_USER.USERNAME_LESS_LIMIT_CHAR');
        }

        if (xybankuserxy.length > 50) {
            throw new Error('REGISTER_USER.BANKUSER_LIMIT_CHAR');
        }

        if (xxybanknumberxy.length > 20) {
            throw new Error('REGISTER_USER.BANKNUMBER_MORE_LIMIT_CHAR');
        }

        if (xxybanknumberxy.length < 7) {
            throw new Error('REGISTER_USER.BANKNUMBER_LESS_LIMIT_CHAR');
        }

        if (xynumbphonexyyy.length > 15) {
            throw new Error('REGISTER_USER.PHONENUMBER_MORE_LIMIT_CHAR');
        }

        if (xynumbphonexyyy.length < 8) {
            throw new Error('REGISTER_USER.PHONENUMBER_LESS_LIMIT_CHAR');
        }

        // ^[\w]+$ digunakan untuk memeriksa apakah suatu string hanya terdiri dari karakter alfanumerik (a-z, A-Z, 0-9) dan garis bawah (_), tanpa ada spasi atau karakter khusus lainnya 

        //0 hingga 9, Anda dapat menggunakan ekspresi reguler berikut: ^[0-9]+$


        //karakter huruf a hingga z (baik huruf kecil maupun huruf besar), Anda dapat menggunakan ekspresi reguler berikut: ^[a-zA-Z]+$

        //memperbolehkan hanya karakter huruf a-z (baik huruf kecil maupun huruf besar) dan angka 0-9, Anda dapat menggunakan ekspresi reguler berikut: ^[a-zA-Z0-9]+$

        //memperbolehkan karakter huruf a-z (baik huruf kecil maupun huruf besar) serta spasi, Anda dapat menggunakan ekspresi reguler berikut: ^[a-zA-Z ]+$
        if (!xyusernamexxy.match(/^[\w]+$/) || !password.match(/^[a-zA-Z0-9]+$/) || !xybanknamexyy.match(/^[a-zA-Z ]+$/) || !xybankuserxy.match(/^[a-zA-Z ]+$/) || !xxybanknumberxy.match(/^[0-9]+$/) || !xynumbphonexyyy.match(/^[0-9]+$/)) {
            throw new Error('REGISTER_USER.REGISTER_CONTAIN_RESTRICTED_CHARACTER');
        }

    }
}

module.exports = RegisterUser;
