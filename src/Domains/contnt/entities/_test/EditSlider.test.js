const EditSlider = require('../EditSlider');


describe('entities for content meta data', () => {

    it('should send an error when not contain fill in data spesification', () => {
        //arrange
        const payload = {
            ttlectsldr: 'example title 2',
            trgturctsldr: 'https://example.com',
            statusctsldr: '1',
        };

        expect(() => new EditSlider(payload)).toThrowError('EDIT_SLIDER.NOT_CONTAIN_NEEDED_PROPERTY');
    });

    it('should send an error when not meet data spesification', () => {
        //arrange
        const payload = {
            ctsldrur: 1,
            ttlectsldr: 'example title 2',
            trgturctsldr: 'https://example.com',
            statusctsldr: '1',
        };

        expect(() => new EditSlider(payload)).toThrowError('EDIT_SLIDER.NOT_MEET_DATA_TYPE_SPECIFICATION');
    });


    it('should send an error when not meet data spesification', () => {
        //arrange
        const payload = {
            ctsldrur: 'https://example.com/3',
            ttlectsldr: 'example title 2%',
            trgturctsldr: 'https://example.com',
            statusctsldr: '1',
        };

        expect(() => new EditSlider(payload)).toThrowError('EDIT_SLIDER.CONTAIN_RESTRICTED_CHARACTER');
    });



    it('should edit data meta Correctly', () => {
        //arrange
        const payload = {
            ctsldrur: 'https://example.com/3',
            ttlectsldr: 'example title 2',
            trgturctsldr: 'https://example.com',
            statusctsldr: '1',
        };


        const editSlider = new EditSlider(payload);

        // Assert
        expect(editSlider).toBeInstanceOf(EditSlider);
        expect(editSlider.ctsldrur).toEqual(payload.ctsldrur);
        expect(editSlider.ttlectsldr).toEqual(payload.ttlectsldr);
        expect(editSlider.trgturctsldr).toEqual(payload.trgturctsldr);
        expect(editSlider.statusctsldr).toEqual(payload.statusctsldr);


    });
});
