const RegisteredUserLog = require('../RegisteredUserLog');

describe('entities for Registered Users', () => {
    it('should throw an error payload did not contain needed fields properties', () => {
        const payload = {
            username: 'fakeuser'
        };

        expect(() => new RegisteredUserLog(payload)).toThrowError('REGISTERED_USER.NOT_CONTAIN_NEEDED_PROPERTY');

    });

    it('should throw error when payload did not meet data type specification', () => {
        //arrange
        const payload = {
            // id_logbase: 'baseid123',
            xyuseridxy: 'user123',
            username: 123
        }
        // Action and Assert
        expect(() => new RegisteredUserLog(payload)).toThrowError('REGISTERED_USER.NOT_MEET_DATA_TYPE_SPECIFICATION');
    });

    it('should registered objectc correctly', () => {
        //arrange
        const payload = {
            // id_logbase: 'baseid123',
            xyuseridxy: 'user123',
            username: 'fakeuser'
        };
        // Action
        const { xyuseridxy, username } = new RegisteredUserLog(payload);

        // Assert
        // expect(id_logbase).toEqual(payload.id_logbase);
        expect(xyuseridxy).toEqual(payload.xyuseridxy);
        expect(username).toEqual(payload.username);
    });
});