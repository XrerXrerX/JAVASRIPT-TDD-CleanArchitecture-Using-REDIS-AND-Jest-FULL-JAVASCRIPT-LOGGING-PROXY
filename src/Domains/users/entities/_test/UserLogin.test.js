const UserLogin = require('../UserLogin');

describe('UserLogin Entities', () => {

    it('should throw error when payload does not contain needed property', () => {
        // Arrange
        const payload = {
            username: 'fakeuser',
        };

        // Action & Assert
        expect(() => new UserLogin(payload)).toThrowError('USER_LOGIN.NOT_CONTAIN_NEEDED_PROPERTY');
    });

    it('should throw error when payload not meet data type specification', () => {
        // Arrange
        const payload = {
            username: 'fakeuser',
            password: 12345,
        };

        // Action & Assert
        expect(() => new UserLogin(payload)).toThrowError('USER_LOGIN.NOT_MEET_DATA_TYPE_SPECIFICATION');
    });


    it('should create UserLogin Entities Coorectly', () => {
        // Arrange
        const payload = {
            username: 'fakeuser',
            password: 'secret',
        };


        // Action
        const userLogin = new UserLogin(payload);

        // Assert
        expect(userLogin).toBeInstanceOf(UserLogin);
        expect(userLogin.username).toEqual(payload.username);
        expect(userLogin.password).toEqual(payload.password);
    });

});