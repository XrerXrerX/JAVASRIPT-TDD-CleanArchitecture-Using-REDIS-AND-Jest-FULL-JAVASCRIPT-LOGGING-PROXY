const UpdateDataUser = require('../UpdateDataUser');

describe('entities for update data Users', () => {

    it('should throw error whe payload not contain needed properties', () => {
        //arrange
        const payload = {
            xybankuserxy: 'fake name',
            xxybanknumberxy: '12345678',
            group: 'groupbank2',
            groupwd: 'groupbankwd2',
        };

        // Action and Assert
        expect(() => new UpdateDataUser(payload)).toThrowError('UPDATED_USER.NOT_CONTAIN_NEEDED_PROPERTY');
    });

    it('should throw error when payload user did not meet data type specification', () => {
        //arrange
        const payload = {
            xybanknamexyy: 123,
            xybankuserxy: 'fake name',
            xxybanknumberxy: '12345678',
            group: 'groupbank2',
            groupwd: 'groupbankwd2',
        };
        // Action and Assert
        expect(() => new UpdateDataUser(payload)).toThrowError('UPDATED_USER.NOT_MEET_DATA_TYPE_SPECIFICATION');
    });


    it('should throw error when LENGTH MORE THAN EXCEEDED', () => {
        //arrange
        const payload = {
            xybanknamexyy: 'abcaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
            xybankuserxy: 'fake name',
            xxybanknumberxy: '12345678',
            group: 'groupbank2',
            groupwd: 'groupbankwd2',
        };

        // Action and Assert
        expect(() => new UpdateDataUser(payload)).toThrowError('UPDATED_USER.RESTRICTED_LIMIT_CHARACTER');
    });




    it('should throw error when HAVE RESTRTICED CHARACTER', () => {
        //arrange
        const payload = {
            xybanknamexyy: 'abc',
            xybankuserxy: 'fake name',
            xxybanknumberxy: '12345678AA',
            group: 'groupbank2',
            groupwd: 'groupbankwd2',
        };

        // Action and Assert
        expect(() => new UpdateDataUser(payload)).toThrowError('UPDATED_USER.UPDATED_CONTAIN_RESTRICTED_CHARACTER');
    });


    it('should registered objectc correctly', () => {
        //arrange
        const payload = {
            xybanknamexyy: 'abc',
            xybankuserxy: 'fake name',
            xxybanknumberxy: '12345678',
            group: 'groupbank2',
            groupwd: 'groupbankwd2',
        };
        // Action
        const { xybanknamexyy, xybankuserxy, xxybanknumberxy, group, groupwd, } = new UpdateDataUser(payload);

        // Assert
        expect(xybanknamexyy).toEqual(payload.xybanknamexyy);
        expect(xybankuserxy).toEqual(payload.xybankuserxy);
        expect(xxybanknumberxy).toEqual(payload.xxybanknumberxy);
        expect(group).toEqual(payload.group);
        expect(groupwd).toEqual(payload.groupwd);
    });
});