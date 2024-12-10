const AddMasterBnks = require('../AddMasterBnks.js');


describe('entities for BANK MASTER data', () => {


    it('should send an error when not contain fill in data spesification', () => {
        //arrange
        const payload = {
            // groupbank: 'groupbank1',
            urllogoxxyx: 'https://www.coskoc.com/api/',
            statusxyxyy: 1,
            wdstatusxyxyy: 1,

        };


        expect(() => new AddMasterBnks(payload)).toThrowError('ADD_MASRTER_BANK.NOT_CONTAIN_NEEDED_PROPERTY');
    });

    it('should send an error when not meet data spesification', () => {
        //arrange
        const payload = {
            bnkmstrxyxyx: 1,
            // groupbank: 'groupbank1',
            urllogoxxyx: 'https://www.coskoc.com/api/',
            statusxyxyy: 1,
            wdstatusxyxyy: 1,

        };


        expect(() => new AddMasterBnks(payload)).toThrowError('ADD_MASRTER_BANK.NOT_MEET_DATA_TYPE_SPECIFICATION');
    });

    it('should send an error when not data restrict given', () => {
        //arrange
        //arrange
        const payload = {
            bnkmstrxyxyx: 'bca bukan',
            // groupbank: 'groupbank1#',
            urllogoxxyx: 'https://www.coskoc.com/api/',
            statusxyxyy: 1,
            wdstatusxyxyy: 1,

        };

        expect(() => new AddMasterBnks(payload)).toThrowError('ADD_MASRTER_BANK.REGISTER_CONTAIN_RESTRICTED_CHARACTER');
    });


    it('should add bank dp data Correctly', () => {
        //arrange
        const payload = {
            bnkmstrxyxyx: 'bca',
            // groupbank: 'groupbank1',
            urllogoxxyx: 'https://www.coskoc.com/api/',
            statusxyxyy: 1,
            wdstatusxyxyy: 1,
        };

        const addMasterBnks = new AddMasterBnks(payload);


        // Assert
        expect(addMasterBnks).toBeInstanceOf(AddMasterBnks);
        expect(addMasterBnks.bnkmstrxyxyx).toEqual(payload.bnkmstrxyxyx);
        // expect(addMasterBnks.groupbank).toEqual(payload.groupbank);
        expect(addMasterBnks.urllogoxxyx).toEqual(payload.urllogoxxyx);
        expect(addMasterBnks.statusxyxyy).toEqual(payload.statusxyxyy);
        expect(addMasterBnks.wdstatusxyxyy).toEqual(payload.wdstatusxyxyy);
    });
});