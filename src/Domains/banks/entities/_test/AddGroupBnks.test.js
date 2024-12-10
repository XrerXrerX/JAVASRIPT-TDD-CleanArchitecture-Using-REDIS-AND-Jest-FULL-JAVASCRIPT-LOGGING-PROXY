const AddGroupBnks = require('../AddGroupBnks.js');


describe('entities for BANK data', () => {


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

        expect(() => new AddGroupBnks(payload)).toThrowError('ADD_GROUP_BANK.UPDATED_CONTAIN_RESTRICTED_CHARACTER');
    });



    it('should add bank data Correctly', () => {
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