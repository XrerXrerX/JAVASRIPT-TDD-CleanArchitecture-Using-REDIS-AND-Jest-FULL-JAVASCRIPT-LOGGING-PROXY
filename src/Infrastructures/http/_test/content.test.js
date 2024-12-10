const pool = require('../../database/postgres/pool');
const ContentMetatagTableHelper = require('../../../../tests/ContentMetatagTableHelper');
const ContentSiteMapTableHelper = require('../../../../tests/ContentSiteMapTableHelper');
const ContentgeneralContentTableHelper = require('../../../../tests/ContentgeneralContentTableHelper');
const ContentSliderTableHelper = require('../../../../tests/ContentSliderTableHelper');
const ContentLinkTableHelpertest = require('../../../../tests/ContentLinkTableHelpertest');
const ContentSocmedTableHelper = require('../../../../tests/ContentSocmedTableHelper');
const ContentPromoTableHelper = require('../../../../tests/ContentPromoTableHelper');
const ContentMTTableHelpertest = require('../../../../tests/ContentMTTableHelpertest');
const container = require('../../container');
const createServer = require('../createServer');


describe('ContentEndPoints', () => {
    afterAll(() => {
        pool.end();
    });

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


    describe('CONTENT METATAG ENDPOINTS', () => {
        describe('ContentRepositoryPostgres.editmtdt', () => {
            it('should edit metatag success', async () => {
                const requestPayload = {
                    mttag: '<h2>welcome3</h2>',
                    artcl: '<h2>test arti0cle</h2>',
                    scrptlvc: 'http://deposit.home3',
                };
                const iddtmeta = 5;

                const server = await createServer(container);
                await ContentMetatagTableHelper.addContent({ iddtmeta: 5 });

                const response = await server.inject({
                    method: 'POST',
                    url: `/content/dtmttag/${iddtmeta}`,
                    payload: requestPayload,
                    headers: { 'x-customblhdrs': process.env.CUSTOM_HEADER_VALUE }

                });
                // Assert

                const responseJson = JSON.parse(response.payload);
                expect(response.statusCode).toEqual(200);
                expect(responseJson.status).toEqual('success');


            });
            it('should edit metatag fail', async () => {
                const requestPayload = {
                    mttag: '<h2>welcome3</h2>',
                    artcl: '<h2>test arti0cle</h2>',
                    scrptlvc: 'http://deposit.home3',
                };
                const iddtmeta = 99;

                const server = await createServer(container);

                const response = await server.inject({
                    method: 'POST',
                    url: `/content/dtmttag/${iddtmeta}`,
                    payload: requestPayload,
                    headers: { 'x-customblhdrs': process.env.CUSTOM_HEADER_VALUE }

                });
                // Assert
                const responseJson = JSON.parse(response.payload);
                expect(response.statusCode).toEqual(400);
                expect(responseJson.status).toEqual('fail');
                expect(responseJson.message).toEqual('fail edit data !');

            });
        });
        describe('ContentRepositoryPostgres.getmtdt', () => {
            it('should get metatag success', async () => {
                const server = await createServer(container);
                await ContentMetatagTableHelper.addContent({ iddtmeta: 9 });
                const response = await server.inject({
                    method: 'GET',
                    url: `/content/dtmttag/gtdt`,
                    headers: { 'x-customblhdrs': process.env.CUSTOM_HEADER_VALUE }

                });


                //assert
                const responseJson = JSON.parse(response.payload);
                expect(response.statusCode).toEqual(200);
                expect(responseJson.status).toEqual('success');
                expect(responseJson.data).toBeDefined();
            });
        });
    });

    describe('CONTENT SITE MAP ENDPOINTS', () => {
        describe('ContentRepositoryPostgres.ADDsitemap', () => {
            it('should add sitemaps success', async () => {

                //arrange
                const requestPayload = {
                    urpage: 'sience',
                };
                const server = await createServer(container);
                const response = await server.inject({
                    method: 'POST',
                    url: `/content/stmp`,
                    payload: requestPayload,
                    headers: { 'x-customblhdrs': process.env.CUSTOM_HEADER_VALUE }

                });
                //assert
                const responseJson = JSON.parse(response.payload);
                expect(response.statusCode).toEqual(200);
                expect(responseJson.status).toEqual('success');
                expect(responseJson.data).toBeDefined();
            });
            it('should add sitemaps fail', async () => {

                //arrange
                const requestPayload = {
                    urpage: 'sience',
                };

                await ContentSiteMapTableHelper.addsitemap({ idstmp: 12, urpage: 'sience' });

                const server = await createServer(container);
                const response = await server.inject({
                    method: 'POST',
                    url: `/content/stmp`,
                    payload: requestPayload,
                    headers: { 'x-customblhdrs': process.env.CUSTOM_HEADER_VALUE }

                });
                //assert
                const responseJson = JSON.parse(response.payload);
                expect(response.statusCode).toEqual(400);
                expect(responseJson.status).toEqual('fail');
                expect(responseJson.message).toEqual('path already exiested !');
            });
        });
        describe('Contentrepository Edit sitemap', () => {
            it('should edit sitemap success', async () => {
                const requestPayload = {
                    urpage: 'basic',
                };
                const urpage = 'standard';
                const server = await createServer(container);
                await ContentSiteMapTableHelper.addsitemap({ idstmp: 32, urpage: 'standard' });

                const response = await server.inject({
                    method: 'POST',
                    url: `/content/stmp/${urpage}`,
                    payload: requestPayload,
                    headers: { 'x-customblhdrs': process.env.CUSTOM_HEADER_VALUE }

                });
                // Assert
                const responseJson = JSON.parse(response.payload);
                expect(response.statusCode).toEqual(200);
                expect(responseJson.status).toEqual('success');

            });
            it('should edit metatag fail', async () => {
                const requestPayload = {
                    urpage: 'basicdua',
                };
                const paramurpage = 'standardtiga';
                const server = await createServer(container);
                const response = await server.inject({
                    method: 'POST',
                    url: `/content/stmp/${paramurpage}`,
                    payload: requestPayload,
                    headers: { 'x-customblhdrs': process.env.CUSTOM_HEADER_VALUE }

                });
                // Assert
                const responseJson = JSON.parse(response.payload);
                expect(response.statusCode).toEqual(400);
                expect(responseJson.status).toEqual('fail');
                expect(responseJson.message).toEqual('fail edit data !');

            });

        });
        describe('Contentrepository.edit sitemap', () => {
            it('should get metatag success', async () => {
                const server = await createServer(container);
                await ContentSiteMapTableHelper.addsitemap({ idstmp: 33 });
                await ContentSiteMapTableHelper.addsitemap({ idstmp: 3, urpage: 'standard3' });

                const response = await server.inject({
                    method: 'GET',
                    url: `/content/stmp`,
                    headers: { 'x-customblhdrs': process.env.CUSTOM_HEADER_VALUE }

                });

                //assert
                const responseJson = JSON.parse(response.payload);
                expect(response.statusCode).toEqual(200);
                expect(responseJson.status).toEqual('success');
                expect(responseJson.data).toBeDefined();
            });
        });
        describe('Contentrepository. delete sitemap', () => {
            it('should delete metatag success', async () => {
                const requestPayload = {
                    urpage: 'standard5',
                };
                const server = await createServer(container);
                await ContentSiteMapTableHelper.addsitemap({ idstmp: 54, urpage: 'standard5' });

                const response = await server.inject({
                    method: 'DELETE',
                    url: `/content/stmp`,
                    payload: requestPayload,
                    headers: { 'x-customblhdrs': process.env.CUSTOM_HEADER_VALUE }
                });

                //assert
                const responseJson = JSON.parse(response.payload);
                expect(response.statusCode).toEqual(200);
                expect(responseJson.status).toEqual('success');
                expect(responseJson.data).toBeDefined();
            });
            it('should delete metatag fail', async () => {
                const server = await createServer(container);
                const requestPayload = {
                    urpage: 'standard',
                };

                const response = await server.inject({
                    method: 'DELETE',
                    url: `/content/stmp`,
                    payload: requestPayload,
                    headers: { 'x-customblhdrs': process.env.CUSTOM_HEADER_VALUE }
                });

                //assert
                const responseJson = JSON.parse(response.payload);
                expect(response.statusCode).toEqual(400);
                expect(responseJson.status).toEqual('fail');
                expect(responseJson.message).toEqual('fail delete data !');

            });


        });
    });

    describe('CONTENT GENERAL ENDPOINTS', () => {
        describe('Contentrepository. Edit Content General', () => {
            it('should edit content general success', async () => {
                const requestPayload = {
                    nmwebsite: 'nama website',
                    logrl: 'global-bola-logo.webp',
                    icrl: 'global-bola-logo.webp',
                    pkrl: 'https://apkdownload.com/',
                    rnntxt: 'GLOBALBOLA SITUS RESMI | Situs Betting Parlay Terlengkap & Terpercaya | proses transaksi kurang dari 1 menit',
                };
                const idnmwebst = 77;

                const server = await createServer(container);
                await ContentgeneralContentTableHelper.addgeneralct({ idnmwebst: 77 });

                const response = await server.inject({
                    method: 'PUT',
                    url: `/content/ctgeneral/${idnmwebst}`,
                    payload: requestPayload,
                    headers: { 'x-customblhdrs': process.env.CUSTOM_HEADER_VALUE }

                });
                // Assert

                const responseJson = JSON.parse(response.payload);
                expect(response.statusCode).toEqual(200);
                expect(responseJson.status).toEqual('success');


            });
            it('should edit content general fail', async () => {
                const requestPayload = {
                    nmwebsite: 'nama website',
                    logrl: 'global-bola-logo.webp',
                    icrl: 'global-bola-logo.webp',
                    pkrl: 'https://apkdownload.com/',
                    rnntxt: 'GLOBALBOLA SITUS RESMI | Situs Betting Parlay Terlengkap & Terpercaya | proses transaksi kurang dari 1 menit',
                };
                const idnmwebst = 99;

                const server = await createServer(container);

                const response = await server.inject({
                    method: 'PUT',
                    url: `/content/ctgeneral/${idnmwebst}`,
                    payload: requestPayload,
                    headers: { 'x-customblhdrs': process.env.CUSTOM_HEADER_VALUE }

                });
                // Assert
                const responseJson = JSON.parse(response.payload);
                expect(response.statusCode).toEqual(400);
                expect(responseJson.status).toEqual('fail');
                expect(responseJson.message).toEqual('fail edit data !');

            });
        });

        describe('ContentRepositoryPostgres.get data general', () => {
            it('should get content general success', async () => {
                const server = await createServer(container);
                await ContentgeneralContentTableHelper.addgeneralct({ idnmwebst: 77 });
                const response = await server.inject({
                    method: 'GET',
                    url: `/content/ctgeneral`,
                    headers: { 'x-customblhdrs': process.env.CUSTOM_HEADER_VALUE }

                });


                //assert
                const responseJson = JSON.parse(response.payload);
                expect(response.statusCode).toEqual(200);
                expect(responseJson.status).toEqual('success');
                expect(responseJson.data).toBeDefined();
            });
        });
    });


    describe('CONTENT SLIDER ENDPOINTS', () => {
        describe('Contentrepository. Edit Content SLIDER', () => {
            it('should edit content SLIDER success', async () => {
                const requestPayload = {
                    ctsldrur: 'https://example.com/2',
                    ttlectsldr: 'example title 2',
                    trgturctsldr: 'https://example.com/2',
                    statusctsldr: '2',
                };
                const idctsldr = 77;

                const server = await createServer(container);
                await ContentSliderTableHelper.addslider({ idctsldr: 77 });

                const response = await server.inject({
                    method: 'PUT',
                    url: `/content/ctslider/${idctsldr}`,
                    payload: requestPayload,
                    headers: { 'x-customblhdrs': process.env.CUSTOM_HEADER_VALUE }

                });
                // Assert

                const responseJson = JSON.parse(response.payload);
                expect(response.statusCode).toEqual(200);
                expect(responseJson.status).toEqual('success');


            });
            it('should edit content SLIDER fail', async () => {
                const requestPayload = {
                    ctsldrur: 'https://example.com/2',
                    ttlectsldr: 'example title 2',
                    trgturctsldr: 'https://example.com/2',
                    statusctsldr: '2',
                };
                const idctsldr = 99;

                const server = await createServer(container);

                const response = await server.inject({
                    method: 'PUT',
                    url: `/content/ctslider/${idctsldr}`,
                    payload: requestPayload,
                    headers: { 'x-customblhdrs': process.env.CUSTOM_HEADER_VALUE }

                });
                // Assert
                const responseJson = JSON.parse(response.payload);
                expect(response.statusCode).toEqual(400);
                expect(responseJson.status).toEqual('fail');
                expect(responseJson.message).toEqual('fail edit data !');

            });
        });

        describe('ContentRepositoryPostgres.get data SLIDER', () => {
            it('should get content SLIDER success', async () => {
                const server = await createServer(container);
                await ContentSliderTableHelper.addslider({ idnmwebst: 78 });
                const response = await server.inject({
                    method: 'GET',
                    url: `/content/ctslider`,
                    headers: { 'x-customblhdrs': process.env.CUSTOM_HEADER_VALUE }

                });


                //assert
                const responseJson = JSON.parse(response.payload);
                expect(response.statusCode).toEqual(200);
                expect(responseJson.status).toEqual('success');
                expect(responseJson.data).toBeDefined();
            });
        });
    });

    describe('CONTENT LINK ENDPOINTS', () => {
        describe('Contentrepository. Edit Content LINK', () => {
            it('should edit content LINK success', async () => {
                const requestPayload = {
                    ctlnkname: 'link alternatif55',
                    ctlnkdmn: 'https://example.com/55',
                    statusctlnk: '2',
                };
                const idctlnk = 77;

                const server = await createServer(container);
                await ContentLinkTableHelpertest.addlink({ idctlnk: 77 });

                const response = await server.inject({
                    method: 'PUT',
                    url: `/content/ctlink/${idctlnk}`,
                    payload: requestPayload,
                    headers: { 'x-customblhdrs': process.env.CUSTOM_HEADER_VALUE }

                });
                // Assert

                const responseJson = JSON.parse(response.payload);
                expect(response.statusCode).toEqual(200);
                expect(responseJson.status).toEqual('success');


            });
            it('should edit content LINK fail', async () => {
                const requestPayload = {
                    ctlnkname: 'link alternatif55',
                    ctlnkdmn: 'https://example.com/55',
                    statusctlnk: '2',
                };
                const idctlnk = 99;

                const server = await createServer(container);

                const response = await server.inject({
                    method: 'PUT',
                    url: `/content/ctlink/${idctlnk}`,
                    payload: requestPayload,
                    headers: { 'x-customblhdrs': process.env.CUSTOM_HEADER_VALUE }

                });
                // Assert
                const responseJson = JSON.parse(response.payload);
                expect(response.statusCode).toEqual(400);
                expect(responseJson.status).toEqual('fail');
                expect(responseJson.message).toEqual('fail edit data !');

            });
        });

        describe('ContentRepositoryPostgres.get data LINK', () => {
            it('should get content SLIDER success', async () => {
                const server = await createServer(container);
                await ContentLinkTableHelpertest.addlink({ idctlnk: 78 });
                const response = await server.inject({
                    method: 'GET',
                    url: `/content/ctlink`,
                    headers: { 'x-customblhdrs': process.env.CUSTOM_HEADER_VALUE }

                });


                //assert
                const responseJson = JSON.parse(response.payload);
                expect(response.statusCode).toEqual(200);
                expect(responseJson.status).toEqual('success');
                expect(responseJson.data).toBeDefined();
            });
        });
    });


    describe('CONTENT SOCMED ENDPOINTS', () => {
        describe('Contentrepository. Edit Content SOCMED', () => {
            it('should edit content SOCMED success', async () => {
                const requestPayload = {
                    ctscmedur: 'https://example.com/3',
                    nmectscmed: 'example title 2',
                    trgturctscmed: 'https://example.com',
                    lvchturctscmed: 'https://example.com',
                    fdbckurctscmed: 'https://example.com',
                    statusctscmed: '1',
                };
                const idctscmed = 77;

                const server = await createServer(container);
                await ContentSocmedTableHelper.addsocmed({ idctscmed: 77 });

                const response = await server.inject({
                    method: 'PUT',
                    url: `/content/socmed/${idctscmed}`,
                    payload: requestPayload,
                    headers: { 'x-customblhdrs': process.env.CUSTOM_HEADER_VALUE }

                });
                // Assert

                const responseJson = JSON.parse(response.payload);
                expect(response.statusCode).toEqual(200);
                expect(responseJson.status).toEqual('success');


            });
            it('should edit content SLIDER fail', async () => {
                const requestPayload = {
                    ctscmedur: 'https://example.com/3',
                    nmectscmed: 'example title 2',
                    trgturctscmed: 'https://example.com',
                    lvchturctscmed: 'https://example.com',
                    fdbckurctscmed: 'https://example.com',
                    statusctscmed: '1',
                };
                const idctscmed = 99;

                const server = await createServer(container);

                const response = await server.inject({
                    method: 'PUT',
                    url: `/content/socmed/${idctscmed}`,
                    payload: requestPayload,
                    headers: { 'x-customblhdrs': process.env.CUSTOM_HEADER_VALUE }

                });
                // Assert
                const responseJson = JSON.parse(response.payload);
                expect(response.statusCode).toEqual(400);
                expect(responseJson.status).toEqual('fail');
                expect(responseJson.message).toEqual('fail edit data !');

            });
        });
        describe('ContentRepositoryPostgres.get data SLIDER', () => {
            it('should get content SLIDER success', async () => {
                const server = await createServer(container);
                await ContentSocmedTableHelper.addsocmed({ idctscmed: 78 });
                const response = await server.inject({
                    method: 'GET',
                    url: `/content/socmed`,
                    headers: { 'x-customblhdrs': process.env.CUSTOM_HEADER_VALUE }

                });


                //assert
                const responseJson = JSON.parse(response.payload);
                expect(response.statusCode).toEqual(200);
                expect(responseJson.status).toEqual('success');
                expect(responseJson.data).toBeDefined();
            });
        });
    });
    describe('CONTENT PROMO ENDPOINTS', () => {
        describe('ContentRepositoryPostgres.ADD ORINI', () => {
            it('should add PROMO success', async () => {

                //arrange
                const requestPayload = {
                    ctprmur: 'https://example.com/3',
                    ttlectprm: 'example title 2',
                    dskprm: 'example title 2',
                    trgturctprm: 'https://example.com',
                    pssprm: '1',
                    statusctprm: '1',
                };

                const server = await createServer(container);
                const response = await server.inject({
                    method: 'POST',
                    url: `/content/prm`,
                    payload: requestPayload,
                    headers: { 'x-customblhdrs': process.env.CUSTOM_HEADER_VALUE }

                });
                //assert
                const responseJson = JSON.parse(response.payload);
                expect(response.statusCode).toEqual(200);
                expect(responseJson.status).toEqual('success');
                expect(responseJson.data).toBeDefined();
            });
        });
        describe('Contentrepository Edit PROMO', () => {
            it('should edit PROMO success', async () => {
                const requestPayload = {
                    ctprmur: 'https://example.com/3',
                    ttlectprm: 'example title 2',
                    dskprm: 'example title 2',
                    trgturctprm: 'https://example.com',
                    pssprm: '1',
                    statusctprm: '1',
                };

                const idctprm = 32;
                const server = await createServer(container);
                await ContentPromoTableHelper.addprm({ idctprm: 32 });

                const response = await server.inject({
                    method: 'PUT',
                    url: `/content/prm/${idctprm}`,
                    payload: requestPayload,
                    headers: { 'x-customblhdrs': process.env.CUSTOM_HEADER_VALUE }

                });
                // Assert
                const responseJson = JSON.parse(response.payload);
                expect(response.statusCode).toEqual(200);
                expect(responseJson.status).toEqual('success');

            });
            it('should edit metatag fail', async () => {
                const requestPayload = {
                    ctprmur: 'https://example.com/3',
                    ttlectprm: 'example title 2',
                    dskprm: 'example title 2',
                    trgturctprm: 'https://example.com',
                    pssprm: '1',
                    statusctprm: '1',
                };

                const idctprm = 33;
                const server = await createServer(container);
                const response = await server.inject({
                    method: 'PUT',
                    url: `/content/prm/${idctprm}`,
                    payload: requestPayload,
                    headers: { 'x-customblhdrs': process.env.CUSTOM_HEADER_VALUE }

                });
                // Assert
                const responseJson = JSON.parse(response.payload);
                expect(response.statusCode).toEqual(400);
                expect(responseJson.status).toEqual('fail');
                expect(responseJson.message).toEqual('fail edit data !');

            });

        });
        describe('Contentrepository.GET PROMO', () => {
            it('should get PROMO success', async () => {
                const server = await createServer(container);
                await ContentPromoTableHelper.addprm({ idctprm: 66 });
                await ContentPromoTableHelper.addprm({ idctprm: 77 });

                const response = await server.inject({
                    method: 'GET',
                    url: `/content/prm`,
                    headers: { 'x-customblhdrs': process.env.CUSTOM_HEADER_VALUE }

                });

                //assert
                const responseJson = JSON.parse(response.payload);
                expect(response.statusCode).toEqual(200);
                expect(responseJson.status).toEqual('success');
                expect(responseJson.data).toBeDefined();
            });
        });
        describe('Contentrepository. delete PROMO', () => {
            it('should delete PROMO success', async () => {
                const idctprm = 30;

                const server = await createServer(container);
                await ContentPromoTableHelper.addprm({ idctprm: 30 });

                const response = await server.inject({
                    method: 'DELETE',
                    url: `/content/prm/${idctprm}`,
                    headers: { 'x-customblhdrs': process.env.CUSTOM_HEADER_VALUE }

                });

                //assert
                const responseJson = JSON.parse(response.payload);
                expect(response.statusCode).toEqual(200);
                expect(responseJson.status).toEqual('success');
                expect(responseJson.data).toBeDefined();
            });
            it('should delete PROMO fail', async () => {
                const server = await createServer(container);
                const idctprm = 29;


                const response = await server.inject({
                    method: 'DELETE',
                    url: `/content/prm/${idctprm}`,
                    headers: { 'x-customblhdrs': process.env.CUSTOM_HEADER_VALUE }

                });

                //assert
                const responseJson = JSON.parse(response.payload);
                expect(response.statusCode).toEqual(400);
                expect(responseJson.status).toEqual('fail');
                expect(responseJson.message).toEqual('fail delete data !');

            });


        });
    });
    describe('STATUS MT ENDPOINTS', () => {
        describe('Contentrepository. Edit status mt', () => {
            it('should edit content status mt', async () => {
                const requestPayload = {
                    stsmtncnc: '1',

                };
                const idctmtncnc = 3;

                const server = await createServer(container);
                await ContentMTTableHelpertest.admt({ idctmtncnc: 3 });

                const response = await server.inject({
                    method: 'PUT',
                    url: `/content/sts/${idctmtncnc}`,
                    payload: requestPayload,
                    headers: { 'x-customblhdrs': process.env.CUSTOM_HEADER_VALUE }

                });
                // Assert

                const responseJson = JSON.parse(response.payload);
                expect(response.statusCode).toEqual(200);
                expect(responseJson.status).toEqual('success');


            });
            it('should edit content MT fail', async () => {
                const requestPayload = {
                    stsmtncnc: '1',

                };
                const idctmtncnc = 99;

                const server = await createServer(container);

                const response = await server.inject({
                    method: 'PUT',
                    url: `/content/sts/${idctmtncnc}`,
                    payload: requestPayload,
                    headers: { 'x-customblhdrs': process.env.CUSTOM_HEADER_VALUE }

                });
                // Assert
                const responseJson = JSON.parse(response.payload);
                expect(response.statusCode).toEqual(400);
                expect(responseJson.status).toEqual('fail');
                expect(responseJson.message).toEqual('fail edit data !');

            });
        });

        describe('ContentRepositoryPostgres.get data LINK', () => {
            it('should get content SLIDER success', async () => {
                const server = await createServer(container);
                await ContentMTTableHelpertest.admt({ idctmtncnc: 78 });
                const response = await server.inject({
                    method: 'GET',
                    url: `/content/sts`,
                    headers: { 'x-customblhdrs': process.env.CUSTOM_HEADER_VALUE }

                });


                //assert
                const responseJson = JSON.parse(response.payload);
                expect(response.statusCode).toEqual(200);
                expect(responseJson.status).toEqual('success');
                expect(responseJson.data).toBeDefined();
            });
        });
    });
});
