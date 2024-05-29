const ContentMetatagTableHelper = require('../../../../tests/ContentMetatagTableHelper');
const ContentSiteMapTableHelper = require('../../../../tests/ContentSiteMapTableHelper');
const ContentgeneralContentTableHelper = require('../../../../tests/ContentgeneralContentTableHelper');
const ContentSliderTableHelper = require('../../../../tests/ContentSliderTableHelper');
const ContentLinkTableHelpertest = require('../../../../tests/ContentLinkTableHelpertest');
const ContentSocmedTableHelper = require('../../../../tests/ContentSocmedTableHelper');
const ContentPromoTableHelper = require('../../../../tests/ContentPromoTableHelper');
const ContentMTTableHelpertest = require('../../../../tests/ContentMTTableHelpertest');
const InvariantError = require('../../../Commons/exceptions/InvariantError');
const NotFoundError = require('../../../Commons/exceptions/NotFoundError');
const EditGeneral = require('../../../Domains/contnt/entities/EditGeneral');
const EditContent = require('../../../Domains/contnt/entities/EditContent');
const AddSitemap = require('../../../Domains/contnt/entities/AddSitemap');
const EditSlider = require('../../../Domains/contnt/entities/EditSlider');
const EditLink = require('../../../Domains/contnt/entities/EditLink');
const EditSocmed = require('../../../Domains/contnt/entities/EditSocmed');
const EditPromo = require('../../../Domains/contnt/entities/EditPromo');
const EditMT = require('../../../Domains/contnt/entities/EditMT');
const pool = require('../../database/postgres/pool');
const ContentRepositoryPostgres = require('../ContentRepositoryPostgres');

describe('ContentRepositoryPostgres', () => {
  afterEach(async () => {
    await ContentMetatagTableHelper.cleanTable();
    await ContentSiteMapTableHelper.cleanTable();
    await ContentgeneralContentTableHelper.cleanTable();
    await ContentSliderTableHelper.cleanTable();
    await ContentLinkTableHelpertest.cleanTable();
    await ContentSocmedTableHelper.cleanTable();
    await ContentPromoTableHelper.cleanTable();
    await ContentMTTableHelpertest.cleanTable();
  });

  afterAll(async () => {
    await pool.end();
  });


  describe('METATAG REPOSITORY', () => {
    describe('ContentRepositoryPostgres.editmtdt', () => {
      it('should edit metatag fail', async () => {

        const useCasePayload = new EditContent({
          mttag: '<h2>welcome2</h2>',
          artcl: '<h2>test article2</h2>',
          scrptlvc: 'http://deposit.home2',
        });
        const params = {
          iddtmeta: 4
        }

        const contentRepositoryPostgres = new ContentRepositoryPostgres(pool);

        await expect(contentRepositoryPostgres.editmtdt(useCasePayload, params.iddtmeta))
          .rejects
          .toThrowError(InvariantError);
      });

      it('should edit metatag success', async () => {
        //arrange
        const useCasePayload = new EditContent({
          mttag: '<h2>welcome</h2>',
          artcl: '<h2>test article</h2>',
          scrptlvc: 'http://deposit.home',
        });
        const params = {
          iddtmeta: 4
        }

        // Action
        await ContentMetatagTableHelper.addContent({ iddtmeta: 4 });
        const contentRepositoryPostgres = new ContentRepositoryPostgres(pool);

        //assertion
        await contentRepositoryPostgres.editmtdt(useCasePayload, params.iddtmeta);
        const metatag = await ContentMetatagTableHelper.findcontent(4);
        expect(metatag).toHaveLength(1);

      });
    });
    describe('ContentRepositoryPostgres.getdatameta', () => {

      it('should get datameta success', async () => {
        const contentRepositoryPostgres = new ContentRepositoryPostgres(pool);
        await ContentMetatagTableHelper.addContent({ iddtmeta: 7 });
        const metatag = await contentRepositoryPostgres.gettmtdt();
        expect(metatag).toEqual({
          iddtmeta: 7,
          mttag: '<h2>welcome</h2>',
          artcl: '<h2>test article</h2>',
          scrptlvc: 'http://deposit.home',
        });
      });
    });
  });

  describe('SITEMAP REPOSITORY', () => {
    describe('SITEMAP ADD FEATURES', () => {
      it('should check data sitemap have in database', async () => {
        //arrange
        const useCasePayload = new AddSitemap({
          urpage: 'test',
        });
        // Arrange
        await ContentSiteMapTableHelper.addsitemap({ idstmp: 78 });
        const contentRepositoryPostgres = new ContentRepositoryPostgres(pool);
        // Action & Assert
        await expect(contentRepositoryPostgres.checkstmp(useCasePayload.urpage)).resolves.not.toThrow(InvariantError);
      });

      it('should not throw InvariantError if sitemap not available', async () => {
        //arrange
        const useCasePayload = new AddSitemap({
          urpage: 'tools',
        });
        const contentRepositoryPostgres = new ContentRepositoryPostgres(pool);
        await ContentSiteMapTableHelper.addsitemap({ idstmp: 99, urpage: 'tools' });
        await expect(contentRepositoryPostgres.checkstmp(useCasePayload.urpage))
          .rejects.toThrowError(InvariantError);
      });
      it('should add sitemap success', async () => {

        //arrange
        const useCasePayload = new AddSitemap({
          urpage: 'tolkit',
        });

        const contentRepositoryPostgres = new ContentRepositoryPostgres(pool);

        await contentRepositoryPostgres.addstmp(useCasePayload.urpage);
        const metatag = await ContentSiteMapTableHelper.findsitemap(useCasePayload.urpage);
        expect(metatag).toHaveLength(1);
      })
    });
    describe('SITEMAP EDIT FEATURES', () => {
      it('should edit SITEMAP fail', async () => {
        //arrange
        const useCasePayload = new AddSitemap({
          urpage: 'landing2',

        });
        const params = {
          urpage: 'landing'
        }

        // Action
        const contentRepositoryPostgres = new ContentRepositoryPostgres(pool);

        //assertion
        await expect(contentRepositoryPostgres.editstmp(useCasePayload.urpage, params.urpage))
          .rejects.toThrowError(InvariantError);
      });
      it('should edit SITEMAP success', async () => {
        //arrange
        const useCasePayload = new AddSitemap({
          urpage: 'landing2',

        });
        const params = {
          urpage: 'landing'
        }

        // Action
        await ContentSiteMapTableHelper.addsitemap({ idstmp: 4, urpage: 'landing' });
        const contentRepositoryPostgres = new ContentRepositoryPostgres(pool);

        //assertion
        await contentRepositoryPostgres.editstmp(useCasePayload.urpage, params.urpage);
        const metatag = await ContentSiteMapTableHelper.findsitemap(useCasePayload.urpage);
        expect(metatag).toHaveLength(1);

      });
    });
    describe('SITEMAP GET FEATURES', () => {
      it('should get SITEMAP success', async () => {
        const contentRepositoryPostgres = new ContentRepositoryPostgres(pool);
        await ContentSiteMapTableHelper.addsitemap({ idstmp: 8, urpage: 'landing' });
        const metatag = await contentRepositoryPostgres.getstmp();
        expect(metatag).toEqual([{
          idstmp: 8,
          urpage: 'landing',
          updated_at: "2024-05-25",
        }]);
      });
    });
    describe('SITEMAP DELETE FEATURES', () => {

      it('should check data bnks have in database', async () => {
        //arrange
        const usecasepayload = {
          urgrup: 'índexempat'
        }

        const contentRepositoryPostgres = new ContentRepositoryPostgres(pool);

        // Action
        await ContentSiteMapTableHelper.addsitemap({ idstmp: 9, urpage: 'índextiga' });
        // Assert
        await expect(contentRepositoryPostgres.delstmp(usecasepayload.urgrup))
          .rejects.toThrow(InvariantError);
      });
      it('should return data group', async () => {
        const usecasepayload = {
          urgrup: 'índextiga'
        }

        const contentRepositoryPostgres = new ContentRepositoryPostgres(pool);

        // Action
        await ContentSiteMapTableHelper.addsitemap({ idstmp: 9, urpage: 'índextiga' });
        // Assert
        const datadelete = await contentRepositoryPostgres.delstmp(usecasepayload.urgrup);

        expect(datadelete).toStrictEqual("Sitemap deleted successfully !");
      });
    });
  })

  describe('GENERAL CONTENT REPOSITORY', () => {
    describe('GENERAL CONTENT REPOSITORY EDIT FEATURES', () => {

      it('should edit content fail', async () => {
        //arrange
        const useCasePayload = new EditGeneral({
          nmwebsite: 'nama website',
          logrl: 'global-bola-logo.webp',
          icrl: 'global-bola-logo.webp',
          pkrl: 'https://apkdownload.com/',
          rnntxt: 'GLOBALBOLA SITUS RESMI | Situs Betting Parlay Terlengkap & Terpercaya | proses transaksi kurang dari 1 menit',
        });
        const params = {
          idnmwebst: 4
        }

        // Action
        const contentRepositoryPostgres = new ContentRepositoryPostgres(pool);

        //assertion
        await expect(contentRepositoryPostgres.editgeneral(useCasePayload, params.idnmwebst))
          .rejects.toThrowError(InvariantError);
      });
      it('should edit content success', async () => {
        //arrange
        const useCasePayload = new EditGeneral({
          nmwebsite: 'nama website',
          logrl: 'global-bola-logo.webp',
          icrl: 'global-bola-logo.webp',
          pkrl: 'https://apkdownload.com/',
          rnntxt: 'GLOBALBOLA SITUS RESMI | Situs Betting Parlay Terlengkap & Terpercaya | proses transaksi kurang dari 1 menit',
        });
        const params = {
          idnmwebst: 4
        }

        // Action
        await ContentgeneralContentTableHelper.addgeneralct({ idnmwebst: 4 });
        const contentRepositoryPostgres = new ContentRepositoryPostgres(pool);

        //assertion
        await contentRepositoryPostgres.editgeneral(useCasePayload, params.idnmwebst);
        const metatag = await ContentgeneralContentTableHelper.findctgeneral(params.idnmwebst);
        expect(metatag).toHaveLength(1);

      });

    })

    describe('ContentRepositoryPostgres.getdatameta', () => {

      it('should get datameta success', async () => {
        const contentRepositoryPostgres = new ContentRepositoryPostgres(pool);
        await ContentgeneralContentTableHelper.addgeneralct({ nmwebsite: 'sarutobi' });
        const ctgeneral = await contentRepositoryPostgres.getgeneral();
        expect(ctgeneral).toEqual({
          idnmwebst: 1,
          nmwebsite: 'sarutobi',
          logrl: 'global-bola-logo.webp2',
          icrl: 'global-bola-logo.webp2',
          pkrl: 'https://apkdownload.com/2',
          rnntxt: 'GLOBALBOLA SITUS RESMI22 | Situs Betting Parlay Terlengkap & Terpercaya | proses transaksi kurang dari 1 menit',
        });
      });
    });


  });

  describe('SLIDER CONTENT REPOSITORY', () => {
    describe('SLIDER CONTENT REPOSITORY EDIT FEATURES', () => {

      it('should edit content fail', async () => {
        //arrange
        const useCasePayload = new EditSlider({
          ctsldrur: 'https://example.com/2',
          ttlectsldr: 'example title 2',
          trgturctsldr: 'https://example.com/2',
          statusctsldr: '2',
        });
        const params = {
          idctsldr: 5
        }

        // Action
        const contentRepositoryPostgres = new ContentRepositoryPostgres(pool);

        //assertion
        await expect(contentRepositoryPostgres.editslider(useCasePayload, params.idctsldr))
          .rejects.toThrowError(InvariantError);
      });
      it('should edit content success', async () => {
        //arrange
        const useCasePayload = new EditSlider({
          ctsldrur: 'https://example.com/2',
          ttlectsldr: 'example title 2',
          trgturctsldr: 'https://example.com/2',
          statusctsldr: '2',
        });
        const params = {
          idctsldr: 6
        }

        // Action
        await ContentSliderTableHelper.addslider({ idctsldr: 6 });
        const contentRepositoryPostgres = new ContentRepositoryPostgres(pool);

        //assertion
        await contentRepositoryPostgres.editslider(useCasePayload, params.idctsldr);
        const dataslider = await ContentSliderTableHelper.findslider(params.idctsldr);
        expect(dataslider).toHaveLength(1);

      });

    })

    describe('ContentRepositoryPostgres.getslider', () => {

      it('should get slider success', async () => {
        const contentRepositoryPostgres = new ContentRepositoryPostgres(pool);
        await ContentSliderTableHelper.addslider({ idctsldr: 5, ctsldrur: 'https=//example.com/2' });
        const ctgeneral = await contentRepositoryPostgres.getslider();
        expect(ctgeneral).toEqual([{
          idctsldr: 5,
          ctsldrur: 'https=//example.com/2',
          ttlectsldr: 'example title 2',
          trgturctsldr: 'https=//example.com/2',
          statusctsldr: '2',
        }]);
      });
    });
  });


  describe('LINK CONTENT REPOSITORY', () => {
    describe('LINK CONTENT REPOSITORY EDIT FEATURES', () => {

      it('should edit content fail', async () => {
        //arrange
        const useCasePayload = new EditLink({
          ctlnkname: 'link alternatif44',
          ctlnkdmn: 'https://example.com/44',
          statusctlnk: '1',
        });
        const params = {
          idctlnk: 5
        }

        // Action
        const contentRepositoryPostgres = new ContentRepositoryPostgres(pool);

        //assertion
        await expect(contentRepositoryPostgres.editlink(useCasePayload, params.idctlnk))
          .rejects.toThrowError(InvariantError);
      });
      it('should edit content success', async () => {
        //arrange
        const useCasePayload = new EditLink({
          ctlnkname: 'link alternatif44',
          ctlnkdmn: 'https://example.com/44',
          statusctlnk: '1',
        });
        const params = {
          idctlnk: 6
        }

        // Action
        await ContentLinkTableHelpertest.addlink({ idctlnk: 6 });
        const contentRepositoryPostgres = new ContentRepositoryPostgres(pool);

        //assertion
        await contentRepositoryPostgres.editlink(useCasePayload, params.idctlnk);
        const datalink = await ContentLinkTableHelpertest.findlink(params.idctlnk);
        expect(datalink).toHaveLength(1);

      });

    })

    describe('ContentRepositoryPostgres.get LINK', () => {

      it('should get LINK success', async () => {
        const contentRepositoryPostgres = new ContentRepositoryPostgres(pool);
        await ContentLinkTableHelpertest.addlink({ idctlnk: 5, ctlnkdmn: 'https://example.com/44' });
        const ctlink = await contentRepositoryPostgres.getlink();
        expect(ctlink).toEqual([{
          idctlnk: 5,
          ctlnkname: 'link alternatif33',
          ctlnkdmn: 'https://example.com/44',
          statusctlnk: '3',
        }]);
      });
    });
  });

  describe('SOCMED CONTENT REPOSITORY', () => {
    describe('SOCMED CONTENT REPOSITORY EDIT FEATURES', () => {

      it('should edit content fail', async () => {
        //arrange
        const useCasePayload = new EditSocmed({
          ctscmedur: 'https://example.com/3',
          nmectscmed: 'example title 2',
          trgturctscmed: 'https://example.com',
          lvchturctscmed: 'https://example.com',
          fdbckurctscmed: 'https://example.com',
          statusctscmed: '1',
        });
        const params = {
          idctscmed: 5
        }

        // Action
        const contentRepositoryPostgres = new ContentRepositoryPostgres(pool);

        //assertion
        await expect(contentRepositoryPostgres.editsocmed(useCasePayload, params.idctscmed))
          .rejects.toThrowError(InvariantError);
      });
      it('should edit content success', async () => {
        //arrange
        const useCasePayload = new EditSocmed({
          ctscmedur: 'https://example.com/3',
          nmectscmed: 'example title 2',
          trgturctscmed: 'https://example.com',
          lvchturctscmed: 'https://example.com',
          fdbckurctscmed: 'https://example.com',
          statusctscmed: '1',
        });
        const params = {
          idctscmed: 6
        }

        // Action
        await ContentSocmedTableHelper.addsocmed({ idctscmed: 6 });
        const contentRepositoryPostgres = new ContentRepositoryPostgres(pool);

        //assertion
        await contentRepositoryPostgres.editsocmed(useCasePayload, params.idctscmed);
        const datasocmed = await ContentSocmedTableHelper.findsocmed(params.idctscmed);
        expect(datasocmed).toHaveLength(1);

      });

    })

    describe('ContentRepositoryPostgres.Get Socmed', () => {

      it('should get Socmed success', async () => {
        const contentRepositoryPostgres = new ContentRepositoryPostgres(pool);
        await ContentSocmedTableHelper.addsocmed({ idctscmed: 5, ctscmedur: 'https://example.com/3' });
        const ctsocmed = await contentRepositoryPostgres.getsocmed();
        expect(ctsocmed).toEqual([{
          idctscmed: 5,
          ctscmedur: 'https://example.com/3',
          nmectscmed: 'example title 2',
          trgturctscmed: 'https://example.com',
          lvchturctscmed: 'https://example.com',
          fdbckurctscmed: 'https://example.com',
          statusctscmed: '1',
        }]);
      });
    });
  });

  describe('PROMO REPOSITORY', () => {
    describe('PROMO ADD FEATURES', () => {

      it('should add Promo success', async () => {
        //arrange
        const useCasePayload = new EditPromo({
          ctprmur: 'https://example.com/3',
          ttlectprm: 'example title 2',
          dskprm: 'example title 2',
          trgturctprm: 'https://example.com',
          pssprm: '1',
          statusctprm: '1',
        });

        const contentRepositoryPostgres = new ContentRepositoryPostgres(pool);

        await contentRepositoryPostgres.addpromo(useCasePayload);
        const datapromo = await ContentPromoTableHelper.findpromo(useCasePayload.ctprmur);
        expect(datapromo).toHaveLength(1);
      })
    });
    describe('PROMO EDIT FEATURES', () => {
      it('should edit PROMO fail', async () => {
        //arrange
        const useCasePayload = new EditPromo({
          ctprmur: 'https://example.com/3',
          ttlectprm: 'example title 2',
          dskprm: 'example title 2',
          trgturctprm: 'https://example.com',
          pssprm: '1',
          statusctprm: '1',
        });
        const params = {
          idctprm: 2
        }

        // Action
        const contentRepositoryPostgres = new ContentRepositoryPostgres(pool);

        //assertion
        await expect(contentRepositoryPostgres.editpromo(useCasePayload, params.idctprm))
          .rejects.toThrowError(InvariantError);
      });
      it('should edit PROMO success', async () => {
        //arrange
        const useCasePayload = new EditPromo({
          ctprmur: 'https://example.com/3',
          ttlectprm: 'example title 2',
          dskprm: 'example title 2',
          trgturctprm: 'https://example.com',
          pssprm: '1',
          statusctprm: '1',
        });
        const params = {
          idctprm: 4
        }

        // Action
        await ContentPromoTableHelper.addprm({ idctprm: 4 });
        const contentRepositoryPostgres = new ContentRepositoryPostgres(pool);

        //assertion
        await contentRepositoryPostgres.editpromo(useCasePayload, params.idctprm);
        const datapromo = await ContentPromoTableHelper.findpromo(useCasePayload.ctprmur);
        expect(datapromo).toHaveLength(1);

      });
    });
    describe('PROMO GET FEATURES', () => {
      it('should get PROMO success', async () => {
        const contentRepositoryPostgres = new ContentRepositoryPostgres(pool);
        await ContentPromoTableHelper.addprm({ idctprm: 8 });
        const datapromo = await contentRepositoryPostgres.getpromo();
        expect(datapromo).toEqual([{
          idctprm: 8,
          ctprmur: 'https://example.com/3',
          ttlectprm: 'example title 2',
          dskprm: 'example title 2',
          trgturctprm: 'https://example.com',
          pssprm: '1',
          statusctprm: '1',
        }]);
      });
    });
    describe('PROMO DELETE FEATURES', () => {

      it('should delete fail in promo feature', async () => {
        //arrange
        const params = {
          idctprm: 88
        }

        const contentRepositoryPostgres = new ContentRepositoryPostgres(pool);


        // Assert
        await expect(contentRepositoryPostgres.deletepromo(params.idctprm))
          .rejects.toThrow(InvariantError);
      });
      it('should delete promo successfully', async () => {
        const params = {
          idctprm: 8
        }

        const contentRepositoryPostgres = new ContentRepositoryPostgres(pool);

        // Action
        await ContentPromoTableHelper.addprm({ idctprm: 8 });
        // Assert
        const datadelete = await contentRepositoryPostgres.deletepromo(params);

        expect(datadelete).toStrictEqual("Promo deleted successfully !");
      });
    });
  })

  describe('MT CONTENT REPOSITORY', () => {
    describe('MT CONTENT REPOSITORY EDIT FEATURES', () => {

      it('should edit content fail', async () => {
        //arrange
        const useCasePayload = new EditMT({
          stsmtncnc: '1',
        });
        const params = {
          idctmtncnc: 5
        }

        // Action
        const contentRepositoryPostgres = new ContentRepositoryPostgres(pool);

        //assertion
        await expect(contentRepositoryPostgres.editmt(useCasePayload, params.idctmtncnc))
          .rejects.toThrowError(InvariantError);
      });
      it('should edit content success', async () => {
        //arrange

        const useCasePayload = new EditMT({
          stsmtncnc: '1',
        });
        const params = {
          idctmtncnc: 5
        }

        // Action
        await ContentMTTableHelpertest.admt({ idctmtncnc: 5 });
        const contentRepositoryPostgres = new ContentRepositoryPostgres(pool);

        //assertion
        await contentRepositoryPostgres.editmt(useCasePayload, params.idctmtncnc);
        const statusmt = await ContentMTTableHelpertest.findmt(params.idctmtncnc);
        expect(statusmt).toHaveLength(1);

      });

    })

    describe('ContentRepositoryPostgres.get MT status', () => {

      it('should get LINK success', async () => {
        const contentRepositoryPostgres = new ContentRepositoryPostgres(pool);
        await ContentMTTableHelpertest.admt({ idctmtncnc: 6 });
        const statusmt = await contentRepositoryPostgres.getmt();
        expect(statusmt).toEqual({
          stsmtncnc: '3',
        });
      });
    });
  });
});



