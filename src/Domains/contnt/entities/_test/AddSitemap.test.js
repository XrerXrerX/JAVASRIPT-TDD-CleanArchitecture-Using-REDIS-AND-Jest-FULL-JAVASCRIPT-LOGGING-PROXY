const AddSitemap = require('../AddSitemap');


describe('entities for content meta data', () => {

    it('should send an error when not contain fill in data spesification', () => {
        //arrange
        const payload = {
        };
        expect(() => new AddSitemap(payload)).toThrowError('ADD_SITEMAP.NOT_CONTAIN_NEEDED_PROPERTY');
    });

    it('should send an error when not meet data spesification', () => {
        //arrange
        const payload = {
            urpage: 1,
        };
        expect(() => new AddSitemap(payload)).toThrowError('ADD_SITEMAP.NOT_MEET_DATA_TYPE_SPECIFICATION');
    });


    it('should send an error when not meet data spesification', () => {
        //arrange
        const payload = {
            urpage: 'home>',
        };
        expect(() => new AddSitemap(payload)).toThrowError('ADD_SITEMAP.CONTAIN_RESTRICTED_CHARACTER');
    });



    it('should edit data meta Correctly', () => {
        //arrange
        const payload = {
            urpage: 'home',
        };

        const { urpage } = new AddSitemap(payload);

        // Assert
        expect(urpage).toEqual(payload.urpage);
    });
});
