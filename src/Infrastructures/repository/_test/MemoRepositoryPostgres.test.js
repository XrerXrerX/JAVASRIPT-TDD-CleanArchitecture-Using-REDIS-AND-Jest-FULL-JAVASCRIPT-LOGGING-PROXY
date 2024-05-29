const AddMemoTableTestHelper = require('../../../../tests/AddMemoTableTestHelper');

const InvariantError = require('../../../Commons/exceptions/InvariantError');
const NotFoundError = require('../../../Commons/exceptions/NotFoundError');
const AddMemo = require('../../../Domains/memo/entities/AddMemo');
const pool = require('../../database/postgres/pool');
const MemoRepositoryPostgres = require('../MemoRepositoryPostgres');



describe('DataBank repository', () => {
  afterEach(async () => {
    await AddMemoTableTestHelper.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });

  describe('MEMO data FOR NOTIF', () => {

    describe('add MEMO data in redis', () => {
      it('should add data MEMO and return success', async () => {
        //arrange
        const addmemo = new AddMemo({
          statustype: 1,
          statuspriority: 1,
          subject: 'ini contoh subject 50 character',
          memo: 'ini contoh memo unlimited length character ini contoh memo unlimited length characterini contoh memo unlimited length character',
        });

        const memoRepositoryPostgres = new MemoRepositoryPostgres(pool);

        // Action
        const data = await memoRepositoryPostgres.addmemo(addmemo);

        expect(data).toStrictEqual('Add memo Success !');

      });
    });
    describe('get data memo vip', () => {
      it('should return data memo', async () => {
        await AddMemoTableTestHelper.addmemo({ idmemo: 3 });
        const memoRepositoryPostgres = new MemoRepositoryPostgres(pool);
        const getbankdata = await memoRepositoryPostgres.getmemo();
        expect(getbankdata).toStrictEqual([{ "idmemo": 3, "statustype": 1, "statuspriority": 10, "subject": 'ini contoh subject 50 character', "memo": 'ini contoh memo unlimited length character ini contoh memo unlimited length characterini contoh memo unlimited length character', "created_at": "2024-02-24T15:25:51.326Z" }]);
      });
    });

    describe('get data memo by status', () => {
      it('should return data memo', async () => {
        const params = {
          statustype: 1
        }

        await AddMemoTableTestHelper.addmemo({ idmemo: 3 });
        const memoRepositoryPostgres = new MemoRepositoryPostgres(pool);
        const getbankdata = await memoRepositoryPostgres.getmemomem(params.statustype);
        expect(getbankdata).toStrictEqual([{ "idmemo": 3, "statustype": 1, "statuspriority": 10, "subject": 'ini contoh subject 50 character', "memo": 'ini contoh memo unlimited length character ini contoh memo unlimited length characterini contoh memo unlimited length character', "created_at": "2024-02-24T15:25:51.326Z" }]);
      });

      it('should return invariant error when get data memo', async () => {
        const params = {
          statustype: 1
        }

        const memoRepositoryPostgres = new MemoRepositoryPostgres(pool);
        await expect(memoRepositoryPostgres.getmemomem(params.statustype))
          .rejects
          .toThrowError(NotFoundError);
      });


    });
  });

  describe('delete data memo', () => {


    it('should check data memo have in database', async () => {
      //arrange
      const params = {
        idmemo: 32
      }
      const memoRepositoryPostgres = new MemoRepositoryPostgres(pool);

      // Action
      await AddMemoTableTestHelper.addmemo({ idmemo: 33 });
      await expect(memoRepositoryPostgres.findmemo(params.idmemo))
        .rejects.toThrow(NotFoundError);
    });

    it('should not throw NotFoundError if memo have in database', async () => {
      // Arrange
      const params = {
        idmemo: 33
      }
      const memoRepositoryPostgres = new MemoRepositoryPostgres(pool);
      await AddMemoTableTestHelper.addmemo({ idmemo: 33 });
      await expect(memoRepositoryPostgres.findmemo(params.idmemo))
        .resolves.not.toThrow(NotFoundError);
    });
    it('should return data group', async () => {
      const params = {
        idmemo: 14
      }
      await AddMemoTableTestHelper.addmemo({ idmemo: 14 });

      const memoRepositoryPostgres = new MemoRepositoryPostgres(pool);

      await memoRepositoryPostgres.findmemo(params.idmemo);
      const datadelete = await memoRepositoryPostgres.deletememo(params.idmemo);

      expect(datadelete).toStrictEqual("success delete memo");
    });


  });
});

