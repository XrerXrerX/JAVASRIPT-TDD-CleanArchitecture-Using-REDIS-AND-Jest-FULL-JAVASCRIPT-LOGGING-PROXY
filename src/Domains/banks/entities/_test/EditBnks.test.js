const EditBnks = require('../EditBnks.js');


describe('entities for APK data', () => {


    it('should send an error when not contain fill in data spesification', () => {
        //arrange
        const payload = {
            namebankxxyy: 'bca',
            yyxxmethod: 'bank',
            xynamarekx: 'florensia sitanggang',
            norekxyxy: '0355917811',
            barcodexrxr: 'https://i.ibb.co/n671yNG/Screenshot-44.png',
        };

        expect(() => new EditBnks(payload)).toThrowError('ADD_BANK.NOT_CONTAIN_NEEDED_PROPERTY');
    });



    it('should send an error when not meet data spesification', () => {
        //arrange
        const payload = {
            namebankxxyy: 2,
            masterbnkxyxt: 'bca',
            yyxxmethod: 'bank',
            xynamarekx: 'florensia sitanggang',
            norekxyxy: '0355917811',
            barcodexrxr: 'https://i.ibb.co/n671yNG/Screenshot-44.png',
        };

        expect(() => new EditBnks(payload)).toThrowError('ADD_BANK.NOT_MEET_DATA_TYPE_SPECIFICATION');
    });

    it('should send an error when not meet data spesification', () => {
        //arrange
        const payload = {
            namebankxxyy: 'bca#',
            masterbnkxyxt: 'bca',
            yyxxmethod: 'bank',
            xynamarekx: 'florensia sitanggang',
            norekxyxy: '0355917811',
            barcodexrxr: 'https://i.ibb.co/n671yNG/Screenshot-44.png',
        };

        expect(() => new EditBnks(payload)).toThrowError('ADD_BANK.REGISTER_CONTAIN_RESTRICTED_CHARACTER');
    });





    it('should add bank dp data Correctly', () => {
        //arrange
        const payload = {
            masterbnkxyxt: 'bca',
            namebankxxyy: 'bca1',
            yyxxmethod: 'bank',
            xynamarekx: 'florensia sitanggang',
            norekxyxy: '0355917811',
            barcodexrxr: 'https://i.ibb.co/n671yNG/Screenshot-44.png',
        };

        /** 
         * unutk barcode kalau ada isi otomatis di repositorynya
         */
        const { masterbnkxyxt, namebankxxyy, yyxxmethod, xynamarekx, norekxyxy, barcodexrxr } = new EditBnks(payload);

        // Assert
        expect(masterbnkxyxt).toEqual(payload.masterbnkxyxt);
        expect(namebankxxyy).toEqual(payload.namebankxxyy);
        expect(yyxxmethod).toEqual(payload.yyxxmethod);
        expect(xynamarekx).toEqual(payload.xynamarekx);
        expect(norekxyxy).toEqual(payload.norekxyxy);
        expect(barcodexrxr).toEqual(payload.barcodexrxr);

    });
});