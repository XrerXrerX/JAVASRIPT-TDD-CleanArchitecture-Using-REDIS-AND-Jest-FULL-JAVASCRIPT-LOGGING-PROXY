const AddGroupBnks = require('../AddGroupBnks.js');


<<<<<<< HEAD
describe('entities for BANK data', () => {
=======
describe('entities for APK data', () => {
>>>>>>> aaf28ac1629362d7e0c504db6cc6a3a138f07f0b


    it('should send an error when not contain fill in data spesification', () => {
        //arrange
        const payload = {
            grouptype: 1,
            min_dp: 10,
            max_dp: 2500,
            min_wd: 30,
            max_wd: 50000,
        };

        expect(() => new AddGroupBnks(payload)).toThrowError('ADD_GROUP_BANK.NOT_CONTAIN_NEEDED_PROPERTY');
    });

    it('should send an error when not meet data spesification', () => {
        //arrange
        const payload = {
            namegroupxyzt: 123,
            grouptype: 1,
            min_dp: 10,
            max_dp: 2500,
            min_wd: 30,
            max_wd: 50000,
        };

        expect(() => new AddGroupBnks(payload)).toThrowError('ADD_GROUP_BANK.NOT_MEET_DATA_TYPE_SPECIFICATION');
    });

<<<<<<< HEAD

=======
>>>>>>> aaf28ac1629362d7e0c504db6cc6a3a138f07f0b
    it('should send an error when not data restrict given', () => {
        //arrange
        const payload = {
            namegroupxyzt: "restrict characters",
            grouptype: 1,
            min_dp: 10,
            max_dp: 2500,
            min_wd: 30,
            max_wd: 50000,
        };

<<<<<<< HEAD
        expect(() => new AddGroupBnks(payload)).toThrowError('ADD_GROUP_BANK.UPDATED_CONTAIN_RESTRICTED_CHARACTER');
    });



    it('should add bank data Correctly', () => {
=======
        expect(() => new AddGroupBnks(payload)).toThrowError('ADD_GROUP_BANK.REGISTER_CONTAIN_RESTRICTED_CHARACTER');
    });


    it('should add bank dp data Correctly', () => {
>>>>>>> aaf28ac1629362d7e0c504db6cc6a3a138f07f0b
        //arrange
        const payload = {
            namegroupxyzt: 'groupbank1',
            grouptype: 1,
            min_dp: 10,
            max_dp: 2500,
            min_wd: 30,
            max_wd: 50000,
        };

        const { namegroupxyzt, grouptype, min_dp, max_dp, min_wd, max_wd } = new AddGroupBnks(payload);

        // Assert
        expect(namegroupxyzt).toEqual(payload.namegroupxyzt);
        expect(grouptype).toEqual(payload.grouptype);
        expect(min_dp).toEqual(payload.min_dp);
        expect(max_dp).toEqual(payload.max_dp);
        expect(min_wd).toEqual(payload.min_wd);
        expect(max_wd).toEqual(payload.max_wd);

    });
});