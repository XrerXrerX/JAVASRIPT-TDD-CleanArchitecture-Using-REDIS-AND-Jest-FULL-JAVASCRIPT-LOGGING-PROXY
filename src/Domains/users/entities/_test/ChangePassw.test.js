const ChangePassw = require('../ChangePassw');

describe('entities for update data Users', () => {

    it('should throw error whe payload not contain needed properties', () => {
        //arrange
        const payload = {};

        // Action and Assert
        expect(() => new ChangePassw(payload)).toThrowError('PASSWORD.NOT_CONTAIN_NEEDED_PROPERTY');
    });

    it('should throw error when payload user did not meet data type specification', () => {
        //arrange
        const payload = {
            password: 123,

        };
        // Action and Assert
        expect(() => new ChangePassw(payload)).toThrowError('PASSWORD.NOT_MEET_DATA_TYPE_SPECIFICATION');
    });



    it('should throw error when HAVE RESTRTICED CHARACTER', () => {
        //arrange
        const payload = {
            password: 'asdad123a#!!',

        };

        // Action and Assert
        expect(() => new ChangePassw(payload)).toThrowError('PASSWORD.UPDATED_CONTAIN_RESTRICTED_CHARACTER');
    });


    it('should registered objectc correctly', () => {
        //arrange
        const payload = {
            password: 'asdad123a',

        };
        // Action
        const { password } = new ChangePassw(payload);

        // Assert
        expect(password).toEqual(payload.password);

    });
});