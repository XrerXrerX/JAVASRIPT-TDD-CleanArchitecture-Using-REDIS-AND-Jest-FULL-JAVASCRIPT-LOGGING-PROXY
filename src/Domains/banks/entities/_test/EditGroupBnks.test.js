const EditGroupBnks = require('../EditGroupBnks.js');


describe('entities for EDIT BANK GROUP data', () => {

    it('should send an error when not meet data spesification', () => {
        //arrange
        const payload = {
        };

        expect(() => new EditGroupBnks(payload)).toThrowError('ADD_BANK.NOT_CONTAIN_NEEDED_PROPERTY');
    });

    it('should send an error when not meet data spesification', () => {
        //arrange
        const payload = {
            namegroupxyzt: 1,
        };

        expect(() => new EditGroupBnks(payload)).toThrowError('ADD_BANK.NOT_MEET_DATA_TYPE_SPECIFICATION');
    });

    it('should send an error when not meet data spesification', () => {
        //arrange
        const payload = {
            namegroupxyzt: '*_*',
        };

        expect(() => new EditGroupBnks(payload)).toThrowError('ADD_BANK.REGISTER_CONTAIN_RESTRICTED_CHARACTER');
    });





    it('should add bank dp data Correctly', () => {
        //arrange
        const payload = {
            namegroupxyzt: 'groupbank1',
        };

        /** 
         * unutk barcode kalau ada isi otomatis di repositorynya
         */
        const { namegroupxyzt } = new EditGroupBnks(payload);

        // Assert
        expect(namegroupxyzt).toEqual(payload.namegroupxyzt);

    });
});