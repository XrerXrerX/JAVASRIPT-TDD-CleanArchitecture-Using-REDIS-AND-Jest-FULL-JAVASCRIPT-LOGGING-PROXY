const RegisterUserLog = require('../RegisterUserLog');

describe('entities for Register Users', () => {
    it('should throw error whe payload not contain needed properties', () => {
        //arrange
        const payload = {
            xyusernamexxy: 'fakeuser',
            password: 'secret',
        };

        // Action and Assert
        expect(() => new RegisterUserLog(payload)).toThrowError('REGISTER_USER_LOG.NOT_CONTAIN_NEEDED_PROPERTY');
    });

    it('should throw error when xyuseridxy , username , password contains more than 16 character', () => {
        //arrange
        const payload = {
            xyuseridxy: 'user123123312312312322',
            xyusernamexxy: 'fakeuser',
            password: 'secret',
        };

        // Action and Assert
        expect(() => new RegisterUserLog(payload)).toThrowError('REGISTER_USER_LOG.USERNAME_MORE_LIMIT_CHAR');
    });
    it('should throw error when xyuseridxy , username , password contains less than 6 character', () => {
        //arrange
        const payload = {
            xyuseridxy: 'user',
            xyusernamexxy: 'fakeuser',
            password: 'secret',
        };

        // Action and Assert
        expect(() => new RegisterUserLog(payload)).toThrowError('REGISTER_USER_LOG.USERNAME_LESS_LIMIT_CHAR');
    });

    it('should throw error when xyuseridxy , username , password did not meet data type specification', () => {
        //arrange

        const payload = {
            xyuseridxy: 123,
            xyusernamexxy: 'fakeuser',
            password: 'secret',
        };
        // Action and Assert
        expect(() => new RegisterUserLog(payload)).toThrowError('REGISTER_USER_LOG.NOT_MEET_DATA_TYPE_SPECIFICATION');
    });
    it('should throw error when xyuseridxy , username , passwordbank number numphone password contains restricted character', () => {
        //arrange
        //arrange
        const payload = {
            xyuseridxy: 'user 123',
            xyusernamexxy: 'fakeuser',
            password: 'secret',
        };
        // Action and Assert
        expect(() => new RegisterUserLog(payload)).toThrowError('REGISTER_USER_LOG.REGISTER_CONTAIN_RESTRICTED_CHARACTER');
    });

    it('should register objectc correctly', () => {
        //arrange
        const payload = {
            xyuseridxy: 'user123',
            xyusernamexxy: 'fakeuser',
            password: 'secret',
        };

        // Action
        const { xyuseridxy, xyusernamexxy, password } = new RegisterUserLog(payload);

        // Assert
        expect(xyuseridxy).toEqual(payload.xyuseridxy);
        expect(xyusernamexxy).toEqual(payload.xyusernamexxy);
        expect(password).toEqual(payload.password);

    });
});