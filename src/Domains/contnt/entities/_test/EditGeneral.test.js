const EditGeneral = require('../EditGeneral');


describe('entities for content meta data', () => {

    it('should send an error when not contain fill in data spesification', () => {
        //arrange
        const payload = {
            logrl: 'home',
            icrl: 'home',
            pkrl: 'home',
            rnntxt: 'home',
        };

        expect(() => new EditGeneral(payload)).toThrowError('EDIT_GENERAL.NOT_CONTAIN_NEEDED_PROPERTY');
    });

    it('should send an error when not meet data spesification', () => {
        //arrange
        const payload = {
            nmwebsite: 2,
            logrl: 'home',
            icrl: 'home',
            pkrl: 'home',
            rnntxt: 'home',
        };

        expect(() => new EditGeneral(payload)).toThrowError('EDIT_GENERAL.NOT_MEET_DATA_TYPE_SPECIFICATION');
    });


    it('should send an error when not meet data spesification', () => {
        //arrange
        const payload = {
            nmwebsite: 'home%',
            logrl: 'home',
            icrl: 'home',
            pkrl: 'home',
            rnntxt: 'home',
        };

        expect(() => new EditGeneral(payload)).toThrowError('EDIT_GENERAL.CONTAIN_RESTRICTED_CHARACTER');
    });



    it('should edit data meta Correctly', () => {
        //arrange
        const payload = {
            nmwebsite: 'home',
            logrl: 'home',
            icrl: 'home',
            pkrl: 'home',
            rnntxt: 'home',
        };


        const editGeneral = new EditGeneral(payload);

        // Assert
        expect(editGeneral).toBeInstanceOf(EditGeneral);
        expect(editGeneral.nmwebsite).toEqual(payload.nmwebsite);
        expect(editGeneral.logrl).toEqual(payload.logrl);
        expect(editGeneral.icrl).toEqual(payload.icrl);
        expect(editGeneral.pkrl).toEqual(payload.pkrl);
        expect(editGeneral.rnntxt).toEqual(payload.rnntxt);


    });
});
