const RegisterUser = require('../RegisterUser');

describe('entities for Register Users', () => {

    it('should throw error whe payload not contain needed properties', () => {
        //arrange
        const payload = {
            password: 'secret',
            xybanknamexyy: 'abc',
            xybankuserxy: 'fake name',
            xxybanknumberxy: '12345678',
            xyx11xuser_mailxxyy: 'user@gmail.com',
            xynumbphonexyyy: '58469874451',
        };

        // Action and Assert
        expect(() => new RegisterUser(payload)).toThrowError('REGISTER_USER.NOT_CONTAIN_NEEDED_PROPERTY');
    });


    it('should throw error when xyusernamexxy , password , bank name, bank user did not meet data type specification', () => {
        //arrange
        const payload = {
            xyusernamexxy: 'fakeuser',
            password: 'secret',
            xybanknamexyy: 123,
            xybankuserxy: 'fake name',
            xxybanknumberxy: '12345678',
            xyx11xuser_mailxxyy: 'user@gmail.com',
            xynumbphonexyyy: '58469874451',
        };
        // Action and Assert
        expect(() => new RegisterUser(payload)).toThrowError('REGISTER_USER.NOT_MEET_DATA_TYPE_SPECIFICATION');
    });

    it('should throw error when xyusernamexxy, contains more than 12 character', () => {
        //arrange
        const payload = {
            xyusernamexxy: 'fakeuser1231231231231212312312313212313',
            password: 'secret',
            xybanknamexyy: 'abc',
            xybankuserxy: 'fake name',
            xxybanknumberxy: '12345678',
            xyx11xuser_mailxxyy: 'user@gmail.com',
            xynumbphonexyyy: '58469874451',
        };

        // Action and Assert
        expect(() => new RegisterUser(payload)).toThrowError('REGISTER_USER.USERNAME_MORE_LIMIT_CHAR');
    });

    it('should throw error when xyusernamexxy, contains less than 6 character', () => {
        //arrange
        const payload = {
            xyusernamexxy: 'user',
            password: 'secret',
            xybanknamexyy: 'abc',
            xybankuserxy: 'fake name',
            xxybanknumberxy: '12345678',
            xyx11xuser_mailxxyy: 'user@gmail.com',
            xynumbphonexyyy: '58469874451',
        };

        // Action and Assert
        expect(() => new RegisterUser(payload)).toThrowError('REGISTER_USER.USERNAME_LESS_LIMIT_CHAR');
    });

    it('should throw error when bank user, xyx11xuser_mailxxyy more than 50 characters', () => {
        //arrange
        const payload = {
            xyusernamexxy: 'fakeuser',
            password: 'secret',
            xybanknamexyy: 'abc',
            xybankuserxy: 'fake namenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamenamename',
            xxybanknumberxy: '12345678',
            xyx11xuser_mailxxyy: 'user@gmail.com',
            xynumbphonexyyy: '58469874451',
        };

        // Action and Assert
        expect(() => new RegisterUser(payload)).toThrowError('REGISTER_USER.BANKUSER_LIMIT_CHAR');
    });

    it('should throw error when bank number more than 20 characters', () => {
        //arrange
        const payload = {
            xyusernamexxy: 'fakeuser',
            password: 'secret',
            xybanknamexyy: 'abc',
            xybankuserxy: 'fake name',
            xxybanknumberxy: '123456787891234567811155556789123',
            xyx11xuser_mailxxyy: 'user@gmail.com',
            xynumbphonexyyy: '58469874451',
        };

        // Action and Assert
        expect(() => new RegisterUser(payload)).toThrowError('REGISTER_USER.BANKNUMBER_MORE_LIMIT_CHAR');
    });


    it('should throw error when bank number LESS  than 6 characters', () => {
        //arrange
        const payload = {
            xyusernamexxy: 'fakeuser',
            password: 'secret',
            xybanknamexyy: 'abc',
            xybankuserxy: 'fake name',
            xxybanknumberxy: '1234',
            xyx11xuser_mailxxyy: 'user@gmail.com',
            xynumbphonexyyy: '58469874451',
        };

        // Action and Assert
        expect(() => new RegisterUser(payload)).toThrowError('REGISTER_USER.BANKNUMBER_LESS_LIMIT_CHAR');
    });

    it('should throw error when phone number more than 15 characters', () => {
        //arrange
        const payload = {
            xyusernamexxy: 'fakeuser',
            password: 'secret',
            xybanknamexyy: 'abc',
            xybankuserxy: 'fake name',
            xxybanknumberxy: '12345678',
            xyx11xuser_mailxxyy: 'user@gmail.com',
            xynumbphonexyyy: '123456787891234567811155556789123',
        };

        // Action and Assert
        expect(() => new RegisterUser(payload)).toThrowError('REGISTER_USER.PHONENUMBER_MORE_LIMIT_CHAR');
    });

    it('should throw error when phone number less than 15 characters', () => {
        //arrange
        const payload = {
            xyusernamexxy: 'fakeuser',
            password: 'secret',
            xybanknamexyy: 'abc',
            xybankuserxy: 'fake name',
            xxybanknumberxy: '12345678',
            xyx11xuser_mailxxyy: 'user@gmail.com',
            xynumbphonexyyy: '1234',
        };

        // Action andAssert
        expect(() => new RegisterUser(payload)).toThrowError('REGISTER_USER.PHONENUMBER_LESS_LIMIT_CHAR');
    });
    it('should throw error when xyusernamexxy, pasword, bank name bank number numphone password contains restricted character', () => {
        //arrange
        const payload = {
            xyusernamexxy: 'user 123',
            password: 'secret',
            xybanknamexyy: 'abc',
            xybankuserxy: 'fake name',
            xxybanknumberxy: '12345678',
            xyx11xuser_mailxxyy: 'user@gmail.com',
            xynumbphonexyyy: '58469874451',
        };
        // Action and Assert
        expect(() => new RegisterUser(payload)).toThrowError('REGISTER_USER.REGISTER_CONTAIN_RESTRICTED_CHARACTER');
    });
    it('should register objectc correctly', () => {
        //arrange
        const payload = {
            xyusernamexxy: 'fakeuser',
            password: 'secret',
            xybanknamexyy: 'abc',
            xybankuserxy: 'fake name',
            xxybanknumberxy: '12345678',
            xyx11xuser_mailxxyy: 'user@gmail.com',
            xynumbphonexyyy: '58469874451',
        };

        // Action
        const { xyusernamexxy, password, xybanknamexyy, xybankuserxy, xxybanknumberxy, xyx11xuser_mailxxyy, xynumbphonexyyy } = new RegisterUser(payload);

        // Assert
        expect(xyusernamexxy).toEqual(payload.xyusernamexxy);
        expect(password).toEqual(payload.password);
        expect(xybanknamexyy).toEqual(payload.xybanknamexyy);
        expect(xybankuserxy).toEqual(payload.xybankuserxy);
        expect(xxybanknumberxy).toEqual(payload.xxybanknumberxy);
        expect(xyx11xuser_mailxxyy).toEqual(payload.xyx11xuser_mailxxyy);
        expect(xynumbphonexyyy).toEqual(payload.xynumbphonexyyy);

    });
});