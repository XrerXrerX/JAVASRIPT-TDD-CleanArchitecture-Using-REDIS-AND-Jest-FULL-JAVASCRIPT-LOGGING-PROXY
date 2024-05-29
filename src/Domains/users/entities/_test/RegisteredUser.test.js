const RegisteredUser = require('../RegisteredUser');

describe('entities for Registered Users', () => {
    it('should throw an error payload did not contain needed fields properties', () => {
        const payload = {
            xyusernamexxy: 'fakeuser'
        };

        expect(() => new RegisteredUser(payload)).toThrowError('REGISTERED_USER.NOT_CONTAIN_NEEDED_PROPERTY');

    });

    it('should throw error when payload did not meet data type specification', () => {
        //arrange
        const payload = {
            xyuseridxy: 'user123',
            xyusernamexxy: 123
        }
        // Action and Assert
        expect(() => new RegisteredUser(payload)).toThrowError('REGISTERED_USER.NOT_MEET_DATA_TYPE_SPECIFICATION');
    });

    it('should registered objectc correctly', () => {
        //arrange
        const payload = {
            xyuseridxy: 'user123',
            xyusernamexxy: 'fakeuser'
        };
        // Action
        const { xyuseridxy, xyusernamexxy } = new RegisteredUser(payload);

        // Assert
        expect(xyuseridxy).toEqual(payload.xyuseridxy);
        expect(xyusernamexxy).toEqual(payload.xyusernamexxy);
    });
});