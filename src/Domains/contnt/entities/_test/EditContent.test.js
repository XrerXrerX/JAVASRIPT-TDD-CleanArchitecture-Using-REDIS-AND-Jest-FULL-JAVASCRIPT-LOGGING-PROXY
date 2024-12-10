const EditContent = require('../EditContent.js');


describe('entities for content meta data', () => {

    it('should send an error when not contain fill in data spesification', () => {
        //arrange
        const payload = {
            artcl: '<h2>test article</h2>',
            scrptlvc: 'http://deposit.home',
        };

        expect(() => new EditContent(payload)).toThrowError('EDIT_CONTENT.NOT_CONTAIN_NEEDED_PROPERTY');
    });

    it('should send an error when not meet data spesification', () => {
        //arrange
        const payload = {
            mttag: '<h2>welcome</h2>',
            artcl: 123,
            scrptlvc: 'http://deposit.home',
        };


        expect(() => new EditContent(payload)).toThrowError('EDIT_CONTENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
    });


    it('should edit data meta Correctly', () => {
        //arrange
        const payload = {
            mttag: '<h2>welcome</h2>',
            artcl: '<h2>test article</h2>',
            scrptlvc: 'http://deposit.home',
        };

        const { mttag, artcl, scrptlvc } = new EditContent(payload);

        // Assert
        expect(mttag).toEqual(payload.mttag);
        expect(artcl).toEqual(payload.artcl);
        expect(scrptlvc).toEqual(payload.scrptlvc);
    });
});
