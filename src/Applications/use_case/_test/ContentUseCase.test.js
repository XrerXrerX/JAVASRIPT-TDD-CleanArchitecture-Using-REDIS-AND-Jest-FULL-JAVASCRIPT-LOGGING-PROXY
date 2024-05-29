const EditContent = require('../../../Domains/contnt/entities/EditContent');
const AddSitemap = require('../../../Domains/contnt/entities/AddSitemap');
const EditGeneral = require('../../../Domains/contnt/entities/EditGeneral');
const EditSlider = require('../../../Domains/contnt/entities/EditSlider');
const EditLink = require('../../../Domains/contnt/entities/EditLink');
const EditSocmed = require('../../../Domains/contnt/entities/EditSocmed');
const EditPromo = require('../../../Domains/contnt/entities/EditPromo');
const EditMT = require('../../../Domains/contnt/entities/EditMT');
const ContentRepository = require('../../../Domains/contnt/ContentRepository');
const CacheService = require('../../caching/CacheService');
const ContentUseCase = require('../ContentUseCase');


describe('CONTENT MetaTag', () => {
    describe('it should edit meta tag correctltly', () => {
        it('it should edit meta tag correctltly', async () => {
            // Arrange
            const useCasePayload = new EditContent({
                mttag: '<h2>welcome</h2>',
                artcl: '<h2>test article</h2>',
                scrptlvc: 'http://deposit.home',
            });
            const params = {
                iddtmeta: 3
            };


            const mockcacheService = new CacheService();
            const mockContentRepository = new ContentRepository();

            mockContentRepository.editmtdt = jest.fn()
                .mockImplementation(() => Promise.resolve());
            mockcacheService.delete = jest.fn().mockResolvedValue();


            const editcontentusecase = new ContentUseCase({
                contentRepository: mockContentRepository,
                cacheServices: mockcacheService
            });

            const datagroupusecase = await editcontentusecase.editmttag(useCasePayload, params);


            expect(datagroupusecase).toStrictEqual('metatag updated');

            expect(mockContentRepository.editmtdt).toBeCalledWith(useCasePayload, params.iddtmeta);
            expect(mockcacheService.delete).toBeCalledWith(`metatag:metatag`);

        });
    });
    describe('should success calling get data metatag', () => {

        it('should success calling get data metatag', async () => {

            // Arrange
            const resultMockMetaTag = {
                mttag: '<h2>welcome44</h2>',
                artcl: '<h2>test article44</h2>',
                scrptlvc: 'http://deposit.home44',
            };

            // Action
            const mockcacheService = new CacheService();
            const mockContentRepository = new ContentRepository();


            mockContentRepository.gettmtdt = jest.fn()
                .mockImplementation(() => Promise.resolve(resultMockMetaTag));
            mockcacheService.delete = jest.fn().mockResolvedValue();
            mockcacheService.set = jest.fn().mockResolvedValue();

            const getdataContent = new ContentUseCase({
                contentRepository: mockContentRepository,
                cacheServices: mockcacheService
            });

            const payload = await getdataContent.getmttag();

            // Assert
            expect(mockContentRepository.gettmtdt).toBeCalledWith();
            expect(mockcacheService.delete).toBeCalledWith(`metatag:metatag`);
            expect(mockcacheService.set).toBeCalledWith(`metatag:metatag`, JSON.stringify(resultMockMetaTag));
            expect(payload).toEqual(resultMockMetaTag);
        });

        it('should success calling get data metatag with redis', async () => {

            // Arrange
            const resultMockMetaTag = {
                mttag: '<h2>welcome44</h2>',
                artcl: '<h2>test article44</h2>',
                scrptlvc: 'http://deposit.home44',
                headers: {
                    'X-Data-Source': 'cache',
                }
            };

            // Action
            const mockcacheService = new CacheService();
            mockcacheService.get = jest.fn().mockResolvedValue(JSON.stringify(resultMockMetaTag));


            const getdataContent = new ContentUseCase({
                cacheServices: mockcacheService
            });

            const payload = await getdataContent.getmttag();

            // Assert
            expect(mockcacheService.get).toBeCalledWith(`metatag:metatag`);
            expect(payload).toEqual(
                resultMockMetaTag
            );
        });
    });
});
describe('CONTNET SITEMAP', () => {
    describe('should success add data sitemap', () => {
        it('should success add data sitemap', async () => {
            // Arrange
            const useCasePayload = new AddSitemap({
                urpage: 'home',
            });
            // Action
            const mockcacheService = new CacheService();
            const mockContentRepository = new ContentRepository();
            mockContentRepository.checkstmp = jest.fn()
                .mockImplementation(() => Promise.resolve());
            mockContentRepository.addstmp = jest.fn()
                .mockImplementation(() => Promise.resolve());
            mockcacheService.delete = jest.fn().mockResolvedValue();
            const addSiteMapUseCase = new ContentUseCase({
                contentRepository: mockContentRepository,
                cacheServices: mockcacheService
            });
            const addSiteMaps = await addSiteMapUseCase.addstmp(useCasePayload);
            //assert
            expect(addSiteMaps).toStrictEqual('sitemap added succesfully !');
            expect(mockContentRepository.checkstmp).toBeCalledWith(useCasePayload.urpage);
            expect(mockContentRepository.addstmp).toBeCalledWith(useCasePayload.urpage);
            expect(mockcacheService.delete).toBeCalledWith(`sitemap:sitemap`);
        });
    });
    describe('should success edit data sitemap', () => {
        it('should edit sitemap successfully', async () => {
            const useCasePayload = new AddSitemap({
                urpage: 'home',
            });
            const params = {
                urpage: 'home',
            };
            const mockcacheService = new CacheService();
            const mockContentRepository = new ContentRepository();
            mockContentRepository.checkstmp = jest.fn()
                .mockImplementation(() => Promise.resolve());
            mockContentRepository.editstmp = jest.fn()
                .mockImplementation(() => Promise.resolve());
            mockcacheService.delete = jest.fn().mockResolvedValue();
            const editSiteMapUseCase = new ContentUseCase({
                contentRepository: mockContentRepository,
                cacheServices: mockcacheService
            });
            const editSiteMaps = await editSiteMapUseCase.editstmpusecase(useCasePayload, params);
            expect(editSiteMaps).toStrictEqual('Sitemap Edit Success !');
            expect(mockContentRepository.checkstmp).toBeCalledWith(useCasePayload.urpage);
            expect(mockContentRepository.editstmp).toBeCalledWith(useCasePayload.urpage, params.urpage);
            expect(mockcacheService.delete).toBeCalledWith(`sitemap:sitemap`);
        });
    });
    describe('should get data sitemap succcessfulldy using redis and database', () => {
        it('should get data sitemap succcessfulldy using redis', async () => {
            // Arrange
            const resultMockSitemap = {
                urpage: 'home',
                updated_at: '2024-02-24',
                headers: {
                    'X-Data-Source': 'cache',
                }
            };
            // Action
            const mockcacheService = new CacheService();
            mockcacheService.get = jest.fn().mockResolvedValue(JSON.stringify(resultMockSitemap));
            const getdataContent = new ContentUseCase({
                cacheServices: mockcacheService
            });
            const payload = await getdataContent.getstmp();
            // Assert
            expect(mockcacheService.get).toBeCalledWith(`sitemap:sitemap`);
            expect(payload).toEqual(
                resultMockSitemap
            );
        });
        it('should get data sitemap succcessfulldy using database', async () => {
            // Arrange
            const resultMockSitemap = {
                urpage: 'home',
                updated_at: '2024-02-24'
            };
            // Action
            const mockcacheService = new CacheService();
            const mockContentRepository = new ContentRepository();
            mockContentRepository.getstmp = jest.fn()
                .mockImplementation(() => Promise.resolve(resultMockSitemap));
            mockcacheService.delete = jest.fn().mockResolvedValue();
            mockcacheService.set = jest.fn().mockResolvedValue();
            const getdataContent = new ContentUseCase({
                contentRepository: mockContentRepository,
                cacheServices: mockcacheService
            });
            const payload = await getdataContent.getstmp();
            // Assert
            expect(mockContentRepository.getstmp).toBeCalledWith();
            expect(mockcacheService.delete).toBeCalledWith(`sitemap:sitemap`);
            expect(mockcacheService.set).toBeCalledWith(`sitemap:sitemap`, JSON.stringify(resultMockSitemap));
            expect(payload).toEqual(resultMockSitemap);
        });
    });
    describe('sitemap should be deleted', () => {
        it('should delete sitemap successfully', async () => {
            const useCasePayload = new AddSitemap({
                urpage: 'home',
            });
            const mockcacheService = new CacheService();
            const mockContentRepository = new ContentRepository();

            mockContentRepository.delstmp = jest.fn()
                .mockImplementation(() => Promise.resolve());
            mockcacheService.delete = jest.fn().mockResolvedValue();

            const deleteSiteMapUseCase = new ContentUseCase({
                contentRepository: mockContentRepository,
                cacheServices: mockcacheService
            });
            const deleteSiteMaps = await deleteSiteMapUseCase.delstmp(useCasePayload);
            expect(deleteSiteMaps).toStrictEqual('Sitemap deleted successfully !');

            expect(mockContentRepository.delstmp).toBeCalledWith(useCasePayload.urpage);
            expect(mockcacheService.delete).toBeCalledWith(`sitemap:sitemap`);
        });
    });

});

describe('CONTENT GENERAL', () => {
    describe('it should edit content general correctltly', () => {
        it('it should edit meta tag correctltly', async () => {
            // Arrange
            const useCasePayload = new EditGeneral({
                nmwebsite: 'nama website',
                logrl: 'global-bola-logo.webp',
                icrl: 'global-bola-logo.webp',
                pkrl: 'https://apkdownload.com/',
                rnntxt: 'GLOBALBOLA SITUS RESMI | Situs Betting Parlay Terlengkap & Terpercaya | proses transaksi kurang dari 1 menit',
            });

            const params = {
                idnmwebst: 2
            };

            const mockcacheService = new CacheService();
            const mockContentRepository = new ContentRepository();

            mockContentRepository.editgeneral = jest.fn()
                .mockImplementation(() => Promise.resolve());
            mockcacheService.delete = jest.fn().mockResolvedValue();

            const editcontentusecase = new ContentUseCase({
                contentRepository: mockContentRepository,
                cacheServices: mockcacheService
            });

            const datagroupusecase = await editcontentusecase.editgeneral(useCasePayload, params);

            expect(datagroupusecase).toStrictEqual('general data updated');
            expect(mockContentRepository.editgeneral).toBeCalledWith(useCasePayload, params.idnmwebst);
            expect(mockcacheService.delete).toBeCalledWith(`ctgeneral:ctgeneral`);
        });
    });
    describe('should success calling get data content GENERAL', () => {

        it('should success calling get data metatag', async () => {

            // Arrange
            const resultmockctgeneral = {
                nmwebsite: 'nama website',
                logrl: 'global-bola-logo.webp',
                icrl: 'global-bola-logo.webp',
                pkrl: 'https://apkdownload.com/',
                rnntxt: 'GLOBALBOLA SITUS RESMI | Situs Betting Parlay Terlengkap & Terpercaya | proses transaksi kurang dari 1 menit',
            };

            // Action
            const mockcacheService = new CacheService();
            const mockContentRepository = new ContentRepository();


            mockContentRepository.getgeneral = jest.fn()
                .mockImplementation(() => Promise.resolve(resultmockctgeneral));
            mockcacheService.delete = jest.fn().mockResolvedValue();
            mockcacheService.set = jest.fn().mockResolvedValue();

            const getdataCtgeneralUsecase = new ContentUseCase({
                contentRepository: mockContentRepository,
                cacheServices: mockcacheService
            });

            const payload = await getdataCtgeneralUsecase.getgeneral();

            // Assert
            expect(mockContentRepository.getgeneral).toBeCalledWith();
            expect(mockcacheService.delete).toBeCalledWith(`ctgeneral:ctgeneral`);
            expect(mockcacheService.set).toBeCalledWith(`ctgeneral:ctgeneral`, JSON.stringify(resultmockctgeneral));
            expect(payload).toEqual(resultmockctgeneral);
        });

        it('should success calling get data metatag with redis', async () => {

            // Arrange
            const resultmockctgeneral = {
                nmwebsite: 'nama website',
                logrl: 'global-bola-logo.webp',
                icrl: 'global-bola-logo.webp',
                pkrl: 'https://apkdownload.com/',
                rnntxt: 'GLOBALBOLA SITUS RESMI | Situs Betting Parlay Terlengkap & Terpercaya | proses transaksi kurang dari 1 menit',
                headers: {
                    'X-Data-Source': 'cache',
                }
            };

            // Action
            const mockcacheService = new CacheService();
            mockcacheService.get = jest.fn().mockResolvedValue(JSON.stringify(resultmockctgeneral));


            const getdataCtgeneralUsecase = new ContentUseCase({
                cacheServices: mockcacheService
            });

            const payload = await getdataCtgeneralUsecase.getgeneral();

            // Assert
            expect(mockcacheService.get).toBeCalledWith(`ctgeneral:ctgeneral`);
            expect(payload).toEqual(
                resultmockctgeneral
            );
        });
    });
});

describe('CONTENT SLIDER', () => {
    describe('it should edit content SLIDER correctltly', () => {
        it('it should edit SLIDER correctltly', async () => {
            // Arrange
            const useCasePayload = new EditSlider({
                ctsldrur: 'https://example.com/2',
                ttlectsldr: 'example title 2',
                trgturctsldr: 'https://example.com/2',
                statusctsldr: '2',
            });

            const params = {
                idctsldr: 4
            };

            const mockcacheService = new CacheService();
            const mockContentRepository = new ContentRepository();

            mockContentRepository.editslider = jest.fn()
                .mockImplementation(() => Promise.resolve());
            mockcacheService.delete = jest.fn().mockResolvedValue();

            const editcontentusecase = new ContentUseCase({
                contentRepository: mockContentRepository,
                cacheServices: mockcacheService
            });

            const datasliderUseCase = await editcontentusecase.editslider(useCasePayload, params);

            expect(datasliderUseCase).toStrictEqual('slider data updated');
            expect(mockContentRepository.editslider).toBeCalledWith(useCasePayload, params.idctsldr);
            expect(mockcacheService.delete).toBeCalledWith(`ctslider:ctslider`);
        });
    });
    describe('should success calling get data content SLIDER', () => {

        it('should success calling get data SLIDER', async () => {

            // Arrange
            const resultmockctSlider = {
                ctsldrur: 'https://example.com/2',
                ttlectsldr: 'example title 2',
                trgturctsldr: 'https://example.com/2',
                statusctsldr: '2',
            };

            // Action
            const mockcacheService = new CacheService();
            const mockContentRepository = new ContentRepository();


            mockContentRepository.getslider = jest.fn()
                .mockImplementation(() => Promise.resolve(resultmockctSlider));
            mockcacheService.delete = jest.fn().mockResolvedValue();
            mockcacheService.set = jest.fn().mockResolvedValue();

            const getdataCtsliderUsecase = new ContentUseCase({
                contentRepository: mockContentRepository,
                cacheServices: mockcacheService
            });

            const payload = await getdataCtsliderUsecase.getslider();

            // Assert
            expect(mockContentRepository.getslider).toBeCalledWith();
            expect(mockcacheService.delete).toBeCalledWith(`ctslider:ctslider`);
            expect(mockcacheService.set).toBeCalledWith(`ctslider:ctslider`, JSON.stringify(resultmockctSlider));
            expect(payload).toEqual(resultmockctSlider);
        });

        it('should success calling get data metatag with redis', async () => {

            // Arrange
            const resultmockctSlider = {
                ctsldrur: 'https://example.com/2',
                ttlectsldr: 'example title 2',
                trgturctsldr: 'https://example.com/2',
                statusctsldr: '2',
                headers: {
                    'X-Data-Source': 'cache',
                }
            };

            // Action
            const mockcacheService = new CacheService();
            mockcacheService.get = jest.fn().mockResolvedValue(JSON.stringify(resultmockctSlider));


            const getdataCtsliderUsecase = new ContentUseCase({
                cacheServices: mockcacheService
            });

            const payload = await getdataCtsliderUsecase.getslider();

            // Assert
            expect(mockcacheService.get).toBeCalledWith(`ctslider:ctslider`);
            expect(payload).toEqual(
                resultmockctSlider
            );
        });
    });
});

describe('CONTENT LINK', () => {
    describe('it should edit content LINK correctltly', () => {
        it('it should edit LINK correctltly', async () => {
            // Arrange
            const useCasePayload = new EditLink({
                ctlnkname: 'link alternatif 2',
                ctlnkdmn: 'https://example.com/2',
                statusctlnk: '1',
            });

            const params = {
                idctlnk: 4
            };

            const mockcacheService = new CacheService();
            const mockContentRepository = new ContentRepository();

            mockContentRepository.editlink = jest.fn()
                .mockImplementation(() => Promise.resolve());
            mockcacheService.delete = jest.fn().mockResolvedValue();

            const editcontentusecase = new ContentUseCase({
                contentRepository: mockContentRepository,
                cacheServices: mockcacheService
            });

            const datasliderUseCase = await editcontentusecase.editlink(useCasePayload, params);

            expect(datasliderUseCase).toStrictEqual('link data updated');
            expect(mockContentRepository.editlink).toBeCalledWith(useCasePayload, params.idctlnk);
            expect(mockcacheService.delete).toBeCalledWith(`ctlink:ctlink`);
        });
    });
    describe('should success calling get data content LINK', () => {

        it('should success calling get data LINK', async () => {

            // Arrange
            const resultmocklink = {
                ctlnkname: 'link alternatif 2',
                ctlnkdmn: 'https://example.com/2',
                statusctlnk: '1',
            };

            // Action
            const mockcacheService = new CacheService();
            const mockContentRepository = new ContentRepository();


            mockContentRepository.getlink = jest.fn()
                .mockImplementation(() => Promise.resolve(resultmocklink));
            mockcacheService.delete = jest.fn().mockResolvedValue();
            mockcacheService.set = jest.fn().mockResolvedValue();

            const getdataCtsliderUsecase = new ContentUseCase({
                contentRepository: mockContentRepository,
                cacheServices: mockcacheService
            });

            const payload = await getdataCtsliderUsecase.getlink();

            // Assert
            expect(mockContentRepository.getlink).toBeCalledWith();
            expect(mockcacheService.delete).toBeCalledWith(`ctlink:ctlink`);
            expect(mockcacheService.set).toBeCalledWith(`ctlink:ctlink`, JSON.stringify(resultmocklink));
            expect(payload).toEqual(resultmocklink);
        });

        it('should success calling get data Link with redis', async () => {

            // Arrange
            const resultmocklink = {
                ctlnkname: 'link alternatif 2',
                ctlnkdmn: 'https://example.com/2',
                statusctlnk: '1',
                headers: {
                    'X-Data-Source': 'cache',
                }
            };

            // Action
            const mockcacheService = new CacheService();
            mockcacheService.get = jest.fn().mockResolvedValue(JSON.stringify(resultmocklink));


            const getdataCtsliderUsecase = new ContentUseCase({
                cacheServices: mockcacheService
            });

            const payload = await getdataCtsliderUsecase.getlink();

            // Assert
            expect(mockcacheService.get).toBeCalledWith(`ctlink:ctlink`);
            expect(payload).toEqual(
                resultmocklink
            );
        });
    });
});

describe('CONTENT SOCMED', () => {
    describe('it should edit content SOCMED correctltly', () => {
        it('it should edit SOCMED correctltly', async () => {
            // Arrange
            const useCasePayload = new EditSocmed({
                ctscmedur: 'https://example.com/3',
                nmectscmed: 'example title 2',
                trgturctscmed: 'https://example.com',
                lvchturctscmed: 'https://example.com',
                fdbckurctscmed: 'https://example.com',
                statusctscmed: '1',
            });

            const params = {
                idctscmed: 4
            };

            const mockcacheService = new CacheService();
            const mockContentRepository = new ContentRepository();

            mockContentRepository.editsocmed = jest.fn()
                .mockImplementation(() => Promise.resolve());
            mockcacheService.delete = jest.fn().mockResolvedValue();

            const editcontentusecase = new ContentUseCase({
                contentRepository: mockContentRepository,
                cacheServices: mockcacheService
            });

            const datasliderUseCase = await editcontentusecase.editsocmed(useCasePayload, params);

            expect(datasliderUseCase).toStrictEqual('social media data updated');
            expect(mockContentRepository.editsocmed).toBeCalledWith(useCasePayload, params.idctscmed);
            expect(mockcacheService.delete).toBeCalledWith(`ctsocmed:ctsocmed`);
        });
    });
    describe('should success calling get data content SOCMED', () => {

        it('should success calling get data SOCMED', async () => {

            // Arrange
            const resultsocmedmock = {
                ctscmedur: 'https://example.com/3',
                nmectscmed: 'example title 2',
                trgturctscmed: 'https://example.com',
                lvchturctscmed: 'https://example.com',
                fdbckurctscmed: 'https://example.com',
                statusctscmed: '1',
            };

            // Action
            const mockcacheService = new CacheService();
            const mockContentRepository = new ContentRepository();


            mockContentRepository.getsocmed = jest.fn()
                .mockImplementation(() => Promise.resolve(resultsocmedmock));
            mockcacheService.delete = jest.fn().mockResolvedValue();
            mockcacheService.set = jest.fn().mockResolvedValue();

            const getdataSocmedUsecase = new ContentUseCase({
                contentRepository: mockContentRepository,
                cacheServices: mockcacheService
            });

            const payload = await getdataSocmedUsecase.getsocmed();

            // Assert
            expect(mockContentRepository.getsocmed).toBeCalledWith();
            expect(mockcacheService.delete).toBeCalledWith(`ctsocmed:ctsocmed`);
            expect(mockcacheService.set).toBeCalledWith(`ctsocmed:ctsocmed`, JSON.stringify(resultsocmedmock));
            expect(payload).toEqual(resultsocmedmock);
        });

        it('should success calling get data SOCMED with redis', async () => {

            // Arrange
            const resultsocmedmock = {
                ctsldrur: 'https://example.com/2',
                ttlectsldr: 'example title 2',
                trgturctsldr: 'https://example.com/2',
                lvchturctscmed: 'https://example.com',
                fdbckurctscmed: 'https://example.com',
                statusctsldr: '2',
                headers: {
                    'X-Data-Source': 'cache',
                }
            };

            // Action
            const mockcacheService = new CacheService();
            mockcacheService.get = jest.fn().mockResolvedValue(JSON.stringify(resultsocmedmock));


            const getdataSocmedUsecase = new ContentUseCase({
                cacheServices: mockcacheService
            });

            const payload = await getdataSocmedUsecase.getsocmed();

            // Assert
            expect(mockcacheService.get).toBeCalledWith(`ctsocmed:ctsocmed`);
            expect(payload).toEqual(
                resultsocmedmock
            );
        });
    });
});

describe('CONTNET PROMO', () => {
    describe('should success add data PROMO', () => {
        it('should success add data PROMO', async () => {
            // Arrange
            const useCasePayload = new EditPromo({
                ctprmur: 'https://example.com/3',
                ttlectprm: 'example title 2',
                dskprm: 'example title 2',
                trgturctprm: 'https://example.com',
                pssprm: '1',
                statusctprm: '1',
            });
            // Action
            const mockcacheService = new CacheService();
            const mockContentRepository = new ContentRepository();

            mockContentRepository.addpromo = jest.fn()
                .mockImplementation(() => Promise.resolve());
            mockcacheService.delete = jest.fn().mockResolvedValue();
            const addPromoUsecase = new ContentUseCase({
                contentRepository: mockContentRepository,
                cacheServices: mockcacheService
            });
            const addPromo = await addPromoUsecase.addpromo(useCasePayload);
            //assert
            expect(addPromo).toStrictEqual('promo added succesfully !');
            expect(mockContentRepository.addpromo).toBeCalledWith(useCasePayload);
            expect(mockcacheService.delete).toBeCalledWith(`ctpromo:ctpromo`);
        });
    });
    describe('should success edit data PROMO', () => {
        it('should edit PROMO successfully', async () => {
            const useCasePayload = new EditPromo({
                ctprmur: 'https://example.com/3',
                ttlectprm: 'example title 2',
                dskprm: 'example title 2',
                trgturctprm: 'https://example.com',
                pssprm: '1',
                statusctprm: '1',
            });

            const params = {
                idctprm: 7,
            };
            const mockcacheService = new CacheService();
            const mockContentRepository = new ContentRepository();

            mockContentRepository.editpromo = jest.fn()
                .mockImplementation(() => Promise.resolve());
            mockcacheService.delete = jest.fn().mockResolvedValue();

            const editPromoUsecase = new ContentUseCase({
                contentRepository: mockContentRepository,
                cacheServices: mockcacheService
            });
            const editSiteMaps = await editPromoUsecase.editpromo(useCasePayload, params);
            expect(editSiteMaps).toStrictEqual('promo Edit Success !');
            expect(mockContentRepository.editpromo).toBeCalledWith(useCasePayload, params.idctprm);
            expect(mockcacheService.delete).toBeCalledWith(`ctpromo:ctpromo`);
        });
    });
    describe('should get data PROMO succcessfulldy using redis and database', () => {
        it('should get data PROMO succcessfulldy using redis', async () => {
            // Arrange
            const resultMockPromo = {
                ctprmur: 'https://example.com/3',
                ttlectprm: 'example title 2',
                dskprm: 'example title 2',
                trgturctprm: 'https://example.com',
                pssprm: '1',
                statusctprm: '1',
                headers: {
                    'X-Data-Source': 'cache',
                }
            };
            // Action
            const mockcacheService = new CacheService();
            mockcacheService.get = jest.fn().mockResolvedValue(JSON.stringify(resultMockPromo));
            const getdataPromo = new ContentUseCase({
                cacheServices: mockcacheService
            });
            const payload = await getdataPromo.getpromo();
            // Assert
            expect(mockcacheService.get).toBeCalledWith(`ctpromo:ctpromo`);
            expect(payload).toEqual(
                resultMockPromo
            );
        });
        it('should get data Promo succcessfulldy using database', async () => {
            // Arrange
            const resultMockPromo = {
                ctprmur: 'https://example.com/3',
                ttlectprm: 'example title 2',
                dskprm: 'example title 2',
                trgturctprm: 'https://example.com',
                pssprm: '1',
                statusctprm: '1',
            };
            // Action
            const mockcacheService = new CacheService();
            const mockContentRepository = new ContentRepository();
            mockContentRepository.getpromo = jest.fn()
                .mockImplementation(() => Promise.resolve(resultMockPromo));
            mockcacheService.delete = jest.fn().mockResolvedValue();
            mockcacheService.set = jest.fn().mockResolvedValue();
            const getdataPromoUsecase = new ContentUseCase({
                contentRepository: mockContentRepository,
                cacheServices: mockcacheService
            });
            const payload = await getdataPromoUsecase.getpromo();
            // Assert
            expect(mockContentRepository.getpromo).toBeCalledWith();
            expect(mockcacheService.delete).toBeCalledWith(`ctpromo:ctpromo`);
            expect(mockcacheService.set).toBeCalledWith(`ctpromo:ctpromo`, JSON.stringify(resultMockPromo));
            expect(payload).toEqual(resultMockPromo);
        });
    });
    describe('PROMO should be deleted', () => {
        it('should PROMO sitemap successfully', async () => {


            const params = {
                idctprm: 5
            };
            const mockcacheService = new CacheService();
            const mockContentRepository = new ContentRepository();

            mockContentRepository.deletepromo = jest.fn()
                .mockImplementation(() => Promise.resolve());
            mockcacheService.delete = jest.fn().mockResolvedValue();

            const deletePromousecase = new ContentUseCase({
                contentRepository: mockContentRepository,
                cacheServices: mockcacheService
            });
            const deletePromo = await deletePromousecase.deletepromo(params.idctprm)
            expect(deletePromo).toStrictEqual('Promo deleted successfully !');

            expect(mockContentRepository.deletepromo).toBeCalledWith(params.idctprm);
            expect(mockcacheService.delete).toBeCalledWith(`ctpromo:ctpromo`);
        });
    });

});

describe('CONTENT MT', () => {
    describe('it should edit content MT correctltly', () => {
        it('it should edit LINK correctltly', async () => {
            // Arrange
            const useCasePayload = new EditMT({
                stsmtncnc: '1',
            });

            const params = {
                idctmtncnc: 1
            };

            const mockcacheService = new CacheService();
            const mockContentRepository = new ContentRepository();

            mockContentRepository.editmt = jest.fn()
                .mockImplementation(() => Promise.resolve());
            mockcacheService.delete = jest.fn().mockResolvedValue();

            const editMTusecase = new ContentUseCase({
                contentRepository: mockContentRepository,
                cacheServices: mockcacheService
            });

            const dataMtUsecase = await editMTusecase.editmt(useCasePayload, params);

            expect(dataMtUsecase).toStrictEqual('Status updated');
            expect(mockContentRepository.editmt).toBeCalledWith(useCasePayload, params.idctmtncnc);
            expect(mockcacheService.delete).toBeCalledWith(`ctmaintenance:ctmaintenance`);
        });
    });
    describe('should success calling get data content MT', () => {

        it('should success calling get data MT', async () => {

            // Arrange
            const resultmockMt = {
                stsmtncnc: '1',
            };

            // Action
            const mockcacheService = new CacheService();
            const mockContentRepository = new ContentRepository();


            mockContentRepository.getmt = jest.fn()
                .mockImplementation(() => Promise.resolve(resultmockMt));
            mockcacheService.delete = jest.fn().mockResolvedValue();
            mockcacheService.set = jest.fn().mockResolvedValue();

            const getMtStatusUsecase = new ContentUseCase({
                contentRepository: mockContentRepository,
                cacheServices: mockcacheService
            });

            const payload = await getMtStatusUsecase.getmt();

            // Assert
            expect(mockContentRepository.getmt).toBeCalledWith();
            expect(mockcacheService.delete).toBeCalledWith(`ctmaintenance:ctmaintenance`);
            expect(mockcacheService.set).toBeCalledWith(`ctmaintenance:ctmaintenance`, JSON.stringify(resultmockMt));
            expect(payload).toEqual(resultmockMt);
        });

        it('should success calling get data Link with redis', async () => {

            // Arrange
            const resultmockMt = {
                stsmtncnc: '1',
                headers: {
                    'X-Data-Source': 'cache',
                }
            };

            // Action
            const mockcacheService = new CacheService();
            mockcacheService.get = jest.fn().mockResolvedValue(JSON.stringify(resultmockMt));


            const getDataMTstatusUsecase = new ContentUseCase({
                cacheServices: mockcacheService
            });

            const payload = await getDataMTstatusUsecase.getmt();

            // Assert
            expect(mockcacheService.get).toBeCalledWith(`ctmaintenance:ctmaintenance`);
            expect(payload).toEqual(
                resultmockMt
            );
        });
    });
});
