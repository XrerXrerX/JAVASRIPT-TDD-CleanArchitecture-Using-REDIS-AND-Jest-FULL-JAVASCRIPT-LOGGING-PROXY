class RegisterUserLog {
    constructor(payload) {
        this._verifyPayload(payload);

        const { xyuseridxy, xyusernamexxy, password } = payload;
        this.xyuseridxy = xyuseridxy;
        this.xyusernamexxy = xyusernamexxy;
        this.password = password;

    }

    _verifyPayload({ xyuseridxy, xyusernamexxy, password }) {
        if (!xyuseridxy || !xyusernamexxy || !password) {
            throw new Error('REGISTER_USER_LOG.NOT_CONTAIN_NEEDED_PROPERTY');
        }

        if (typeof xyuseridxy !== 'string' || typeof xyusernamexxy !== 'string' || typeof password !== 'string') {
            throw new Error('REGISTER_USER_LOG.NOT_MEET_DATA_TYPE_SPECIFICATION');
        }

        if (xyuseridxy.length > 16 || xyusernamexxy.length > 16) {
            throw new Error('REGISTER_USER_LOG.USERNAME_MORE_LIMIT_CHAR');
        }

        if (xyusernamexxy.length < 6 || xyuseridxy.length < 6 || password.length < 6) {
            throw new Error('REGISTER_USER_LOG.USERNAME_LESS_LIMIT_CHAR');
        }


        // ^[\w]+$ digunakan untuk memeriksa apakah suatu string hanya terdiri dari karakter alfanumerik (a-z, A-Z, 0-9) dan garis bawah (_), tanpa ada spasi atau karakter khusus lainnya 

        //0 hingga 9, Anda dapat menggunakan ekspresi reguler berikut: ^[0-9]+$


        //karakter huruf a hingga z (baik huruf kecil maupun huruf besar), Anda dapat menggunakan ekspresi reguler berikut: ^[a-zA-Z]+$

        //memperbolehkan hanya karakter huruf a-z (baik huruf kecil maupun huruf besar) dan angka 0-9, Anda dapat menggunakan ekspresi reguler berikut: ^[a-zA-Z0-9]+$

        //memperbolehkan karakter huruf a-z (baik huruf kecil maupun huruf besar) serta spasi, Anda dapat menggunakan ekspresi reguler berikut: ^[a-zA-Z ]+$
        if (!xyusernamexxy.match(/^[\w]+$/) || !password.match(/^[a-zA-Z0-9]+$/) || !xyuseridxy.match(/^[\w]+$/)) {
            throw new Error('REGISTER_USER_LOG.REGISTER_CONTAIN_RESTRICTED_CHARACTER');
        }

    }
}

module.exports = RegisterUserLog;
