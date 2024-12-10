const AddMemo = require('../AddMemo.js');


describe('entities for MEMO', () => {


    it('should send an error when not contain fill in data spesification', () => {
        // arrange
        const payload = {
            statuspriority: 1,
            subject: 'ini contoh subject 50 character',
            memo: 'ini contoh memo unlimited length character ini contoh memo unlimited length characterini contoh memo unlimited length character',
        };

        expect(() => new AddMemo(payload)).toThrowError('ADD_MEMO.NOT_CONTAIN_NEEDED_PROPERTY');
    });



    it('should send an error when not meet data spesification', () => {
        //arrange
        const payload = {
            statustype: 'a',
            statuspriority: 1,
            subject: 'ini contoh subject 50 character',
            memo: 'ini contoh memo unlimited length character ini contoh memo unlimited length characterini contoh memo unlimited length character',
        };
        expect(() => new AddMemo(payload)).toThrowError('ADD_MEMO.NOT_MEET_DATA_TYPE_SPECIFICATION');
    });

    it('should send an error when not meet data spesification', () => {
        //arrange
        const payload = {
            statustype: 1,
            statuspriority: 1,
            subject: 'ini contoh subject 50 character',
            memo: 'ini contoh memo unlimited length character ini contoh memo unlimited length characterini contoh memo unlimited length character##',
        };

        expect(() => new AddMemo(payload)).toThrowError('ADD_MEMO.ADD_CONTAIN_RESTRICTED_CHARACTER');
    });





    it('should add memo Correctly', () => {
        //arrange
        const payload = {
            statustype: 1,
            statuspriority: 1,
            subject: 'ini contoh subject 50 character',
            memo: 'ini contoh memo unlimited length character ini contoh memo unlimited length characterini contoh memo unlimited length character',
        };

        /** 
         * unutk barcode kalau ada isi otomatis di repositorynya
         */
        const { statustype, statuspriority, subject, memo } = new AddMemo(payload);

        // Assert
        expect(statustype).toEqual(payload.statustype);
        expect(statuspriority).toEqual(payload.statuspriority);
        expect(subject).toEqual(payload.subject);
        expect(memo).toEqual(payload.memo);


    });
});