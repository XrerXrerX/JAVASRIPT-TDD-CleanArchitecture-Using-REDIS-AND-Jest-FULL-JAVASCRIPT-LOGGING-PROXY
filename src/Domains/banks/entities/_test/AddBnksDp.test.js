const AddBnksDp = require('../AddBnksDp.js');


describe('entities for APK data', () => {


    it('should send an error when not contain fill in data spesification', () => {
        //arrange
        const payload = {
            namebankxxyy: 'bca',
            statusxxyy: 1,
            yyxxmethod: 'bank',
            xynamarekx: 'florensia sitanggang',
            norekxyxy: '0355917811',
            barcodexrxr: 'https://i.ibb.co/n671yNG/Screenshot-44.png',
            zwzwshowbarcode: 1,
        };

        expect(() => new AddBnksDp(payload)).toThrowError('ADD_DP_BANK.NOT_CONTAIN_NEEDED_PROPERTY');
    });

    it('should send an error when not meet data spesification', () => {
        //arrange
        const payload = {
            namegroupxyzt: 'groupbank1',
            namebankxxyy: 2,
            statusxxyy: 1,
            yyxxmethod: 'bank',
            xynamarekx: 'florensia sitanggang',
            norekxyxy: '0355917811',
            barcodexrxr: 'https://i.ibb.co/n671yNG/Screenshot-44.png',
            zwzwshowbarcode: 1,
        };

        expect(() => new AddBnksDp(payload)).toThrowError('ADD_DP_BANK.NOT_MEET_DATA_TYPE_SPECIFICATION');
    });

    it('should send an error when not meet data spesification', () => {
        //arrange
        const payload = {
            namegroupxyzt: 'groupbank1',
            namebankxxyy: 'bca#',
            statusxxyy: 1,
            yyxxmethod: 'bank',
            xynamarekx: 'florensia sitanggang',
            norekxyxy: '0355917811',
            barcodexrxr: 'https://i.ibb.co/n671yNG/Screenshot-44.png',
            zwzwshowbarcode: 1,
        };

        expect(() => new AddBnksDp(payload)).toThrowError('ADD_DP_BANK.REGISTER_CONTAIN_RESTRICTED_CHARACTER');
    });



    it('should add bank dp data Correctly', () => {
        //arrange
        const payload = {
            namegroupxyzt: 'groupbank1',
            namebankxxyy: 'bca',
            statusxxyy: 1,
            yyxxmethod: 'bank',
            xynamarekx: 'florensia sitanggang',
            norekxyxy: '0355917811',
            barcodexrxr: 'https://i.ibb.co/n671yNG/Screenshot-44.png',
            zwzwshowbarcode: 1,
        };

        const { namegroupxyzt, namebankxxyy, statusxxyy, yyxxmethod, xynamarekx, norekxyxy, barcodexrxr, zwzwshowbarcode } = new AddBnksDp(payload);

        // Assert
        expect(namegroupxyzt).toEqual(payload.namegroupxyzt);
        expect(namebankxxyy).toEqual(payload.namebankxxyy);
        expect(statusxxyy).toEqual(payload.statusxxyy);
        expect(yyxxmethod).toEqual(payload.yyxxmethod);
        expect(xynamarekx).toEqual(payload.xynamarekx);
        expect(norekxyxy).toEqual(payload.norekxyxy);
        expect(barcodexrxr).toEqual(payload.barcodexrxr);
        expect(zwzwshowbarcode).toEqual(payload.zwzwshowbarcode);

    });
});