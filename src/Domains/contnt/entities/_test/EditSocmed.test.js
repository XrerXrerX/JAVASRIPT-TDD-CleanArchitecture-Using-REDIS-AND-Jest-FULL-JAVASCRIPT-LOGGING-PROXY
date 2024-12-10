const EditSocmed = require('../EditSocmed');


describe('entities for content SOCMED', () => {

    it('should send an error when not contain fill in data spesification', () => {
        //arrange
        const payload = {
            nmectscmed: 'example title 2',
            trgturctscmed: 'https://example.com',
            lvchturctscmed: 'https://example.com',
            fdbckurctscmed: 'https://example.com',
            statusctscmed: '1',
        };

        expect(() => new EditSocmed(payload)).toThrowError('EDIT_SOCMED.NOT_CONTAIN_NEEDED_PROPERTY');
    });

    it('should send an error when not meet data spesification', () => {
        //arrange
        const payload = {
            ctscmedur: 'https://example.com/3',
            nmectscmed: 'example title 2',
            trgturctscmed: 'https://example.com',
            lvchturctscmed: 'https://example.com',
            fdbckurctscmed: 'https://example.com',
            statusctscmed: 1,
        };

        expect(() => new EditSocmed(payload)).toThrowError('EDIT_SOCMED.NOT_MEET_DATA_TYPE_SPECIFICATION');
    });


    it('should send an error when not meet data spesification', () => {
        //arrange
        const payload = {
            ctscmedur: 'https://example.com/3',
            nmectscmed: 'example title 2 %#',
            trgturctscmed: 'https://example.com',
            lvchturctscmed: 'https://example.com',
            fdbckurctscmed: 'https://example.com',
            statusctscmed: '1',
        };

        expect(() => new EditSocmed(payload)).toThrowError('EDIT_SOCMED.CONTAIN_RESTRICTED_CHARACTER');
    });



    it('should edit data SOCMED Correctly', () => {
        //arrange
        const payload = {
            ctscmedur: 'https://example.com/3',
            nmectscmed: 'example title 2',
            trgturctscmed: 'https://example.com',
            lvchturctscmed: 'https://example.com',
            fdbckurctscmed: 'https://example.com',
            statusctscmed: '1',
        };


        const editSocmed = new EditSocmed(payload);

        // Assert
        expect(editSocmed).toBeInstanceOf(EditSocmed);
        expect(editSocmed.ctscmedur).toEqual(payload.ctscmedur);
        expect(editSocmed.nmectscmed).toEqual(payload.nmectscmed);
        expect(editSocmed.trgturctscmed).toEqual(payload.trgturctscmed);
        expect(editSocmed.lvchturctscmed).toEqual(payload.lvchturctscmed);
        expect(editSocmed.fdbckurctscmed).toEqual(payload.fdbckurctscmed);
        expect(editSocmed.statusctscmed).toEqual(payload.statusctscmed);


    });
});
