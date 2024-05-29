const AddBnks = require('../AddBnks.js');


describe('entities for APK data', () => {


    it('should send an error when not contain fill in data spesification', () => {
        //arrange
        const payload = {
            namebankxxyy: 'bca',
            masterbnkxyxt: 'bca',
            yyxxmethod: 'bank',
            xynamarekx: 'florensia sitanggang',
            norekxyxy: '0355917811',
            barcodexrxr: 'https://i.ibb.co/n671yNG/Screenshot-44.png',
        };

        expect(() => new AddBnks(payload)).toThrowError('ADD_BANK.NOT_CONTAIN_NEEDED_PROPERTY');
    });

    it('should send an error when not contain fill in data spesification', () => {
        //arrange
        const payload = {
            namegroupxyzt: [123],
            namebankxxyy: 'bca',
            masterbnkxyxt: 'bca',
            yyxxmethod: 'bank',
            xynamarekx: 'florensia sitanggang',
            norekxyxy: '0355917811',
            barcodexrxr: 'https://i.ibb.co/n671yNG/Screenshot-44.png',
        };

        expect(() => new AddBnks(payload)).toThrowError('ADD_BANK.NOT_MEET_DATA_TYPE_SPECIFICATION');
    });

    it('should send an error when not meet data spesification', () => {
        //arrange
        const payload = {
            namegroupxyzt: ['groupbank1'],
            namebankxxyy: 2,
            masterbnkxyxt: 'bca',
            yyxxmethod: 'bank',
            xynamarekx: 'florensia sitanggang',
            norekxyxy: '0355917811',
            barcodexrxr: 'https://i.ibb.co/n671yNG/Screenshot-44.png',
        };

        expect(() => new AddBnks(payload)).toThrowError('ADD_BANK.NOT_MEET_DATA_TYPE_SPECIFICATION');
    });

    it('should send an error when not meet data spesification', () => {
        //arrange
        const payload = {
            namegroupxyzt: ['groupbank1'],
            namebankxxyy: 'bca#',
            masterbnkxyxt: 'bca',
            yyxxmethod: 'bank',
            xynamarekx: 'florensia sitanggang',
            norekxyxy: '0355917811',
            barcodexrxr: 'https://i.ibb.co/n671yNG/Screenshot-44.png',
        };

        expect(() => new AddBnks(payload)).toThrowError('ADD_BANK.REGISTER_CONTAIN_RESTRICTED_CHARACTER');
    });

    it('should send an error when not meet data spesification', () => {
        //arrange
        const payload = {
            namegroupxyzt: ['*_*'],
            namebankxxyy: 'bca#',
            masterbnkxyxt: 'bca',
            yyxxmethod: 'bank',
            xynamarekx: 'florensia sitanggang',
            norekxyxy: '0355917811',
            barcodexrxr: 'https://i.ibb.co/n671yNG/Screenshot-44.png',
        };

        expect(() => new AddBnks(payload)).toThrowError('ADD_BANK.REGISTER_CONTAIN_RESTRICTED_CHARACTER');
    });





    it('should add bank dp data Correctly', () => {
        //arrange
        const payload = {
            namegroupxyzt: ['groupbank1'],
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
        const { namegroupxyzt, masterbnkxyxt, namebankxxyy, yyxxmethod, xynamarekx, norekxyxy, barcodexrxr } = new AddBnks(payload);

        // Assert
        expect(namegroupxyzt).toEqual(payload.namegroupxyzt);
        expect(namebankxxyy).toEqual(payload.namebankxxyy);
        expect(masterbnkxyxt).toEqual(payload.masterbnkxyxt);
        expect(yyxxmethod).toEqual(payload.yyxxmethod);
        expect(xynamarekx).toEqual(payload.xynamarekx);
        expect(norekxyxy).toEqual(payload.norekxyxy);
        expect(barcodexrxr).toEqual(payload.barcodexrxr);

    });
});