const EditLink = require('../EditLink');


describe('entities for content Link', () => {

    it('should send an error when not contain fill in data spesification', () => {
        //arrange
        const payload = {
            ctlnkdmn: 'https://example.com/3',
            statusctlnk: '1',
        };

        expect(() => new EditLink(payload)).toThrowError('EDIT_LINK.NOT_CONTAIN_NEEDED_PROPERTY');
    });

    it('should send an error when not meet data spesification', () => {
        //arrange
        const payload = {
            ctlnkname: 2,
            ctlnkdmn: 'https://example.com/3',
            statusctlnk: '1',
        };

        expect(() => new EditLink(payload)).toThrowError('EDIT_LINK.NOT_MEET_DATA_TYPE_SPECIFICATION');
    });


    it('should send an error when not meet data spesification', () => {
        //arrange
        const payload = {
            ctlnkname: 'link alternatif2 %$',
            ctlnkdmn: 'https://example.com/3',
            statusctlnk: '1',
        };

        expect(() => new EditLink(payload)).toThrowError('EDIT_LINK.CONTAIN_RESTRICTED_CHARACTER');
    });



    it('should edit data meta Correctly', () => {
        //arrange
        const payload = {
            ctlnkname: 'link alternatif2',
            ctlnkdmn: 'https://example.com/3',
            statusctlnk: '1',
        };


        const editLink = new EditLink(payload);

        // Assert
        expect(editLink).toBeInstanceOf(EditLink);
        expect(editLink.ctlnkname).toEqual(payload.ctlnkname);
        expect(editLink.ctlnkdmn).toEqual(payload.ctlnkdmn);
        expect(editLink.statusctlnk).toEqual(payload.statusctlnk);


    });
});
