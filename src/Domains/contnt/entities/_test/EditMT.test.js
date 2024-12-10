const EditMT = require('../EditMT');


describe('entities for content MT', () => {

    it('should send an error when not contain fill in data spesification', () => {
        //arrange
        const payload = {
        };

        expect(() => new EditMT(payload)).toThrowError('EDIT_MT.NOT_CONTAIN_NEEDED_PROPERTY');
    });

    it('should send an error when not meet data spesification', () => {
        //arrange
        const payload = {
            stsmtncnc: 1,
        };

        expect(() => new EditMT(payload)).toThrowError('EDIT_MT.NOT_MEET_DATA_TYPE_SPECIFICATION');
    });


    it('should send an error when not meet data spesification', () => {
        //arrange
        const payload = {
            stsmtncnc: '1a',
        };

        expect(() => new EditMT(payload)).toThrowError('EDIT_MT.CONTAIN_RESTRICTED_CHARACTER');
    });



    it('should edit data MT Correctly', () => {
        //arrange
        const payload = {
            stsmtncnc: '1',
        };

        const editMT = new EditMT(payload);

        // Assert
        expect(editMT).toBeInstanceOf(EditMT);
        expect(editMT.stsmtncnc).toEqual(payload.stsmtncnc);


    });
});
