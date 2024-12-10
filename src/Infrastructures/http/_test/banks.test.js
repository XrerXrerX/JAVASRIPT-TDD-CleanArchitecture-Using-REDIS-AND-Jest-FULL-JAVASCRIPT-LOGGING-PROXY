const pool = require('../../database/postgres/pool');
const AddBnksTableTestHelper = require('../../../../tests/AddBnksTableTestHelper');
const AddGroupTableTestHelper = require('../../../../tests/AddGroupTableTestHelper');
const AddMasterTableTestHelper = require('../../../../tests/AddMasterTableTestHelper');
const AddBanksTableTestHelper = require('../../../../tests/AddBanksTableTestHelper');
const container = require('../../container');
const createServer = require('../createServer');

describe('/addBankEndpoints', () => {
    afterAll(async () => {
        await pool.end();
    });

    afterEach(async () => {
        await AddBnksTableTestHelper.cleanTable();
        await AddGroupTableTestHelper.cleanTable();
        await AddMasterTableTestHelper.cleanTable();
        await AddBanksTableTestHelper.cleanTable();
    });

    describe('When add and get group bank /banks/group', () => {
        describe('Group Bank Add', () => {

            it('should repsonse 201 and persisted group bank data', async () => {
                const requestPayload = {
                    namegroupxyzt: 'groupbank88',
                    grouptype: 1,
                    min_dp: 10,
                    max_dp: 2500,
                    min_wd: 30,
                    max_wd: 50000,
                };

                const server = await createServer(container);

                // Action
                const response = await server.inject({
                    method: 'POST',
                    url: '/banks/group',
                    payload: requestPayload,
                    headers: { 'x-customblhdrs': process.env.CUSTOM_HEADER_VALUE }

                });
                // Assert
                const responseJson = JSON.parse(response.payload);
                expect(response.statusCode).toEqual(201);
                expect(responseJson.status).toEqual('success');

            });
        });
        describe('Group Bank PUT', () => {
            it('should repsonse 200 when edit and persisted Group bank data', async () => {
                const namegroup = 'groupbank77';

                const requestPayload = {
                    namegroupxyzt: 'groupbank78',
                    grouptype: 1,
                    min_dp: 10,
                    max_dp: 2500,
                    min_wd: 30,
                    max_wd: 50000,
                };
                await AddGroupTableTestHelper.addgroup({ idgroup: 77, groupbank: 'groupbank77' });

                const server = await createServer(container);

                // Action
                const response = await server.inject({
                    method: 'PUT',
                    url: `/banks/group/${namegroup}`,
                    payload: requestPayload,
                    headers: { 'x-customblhdrs': process.env.CUSTOM_HEADER_VALUE }

                });
                // Assert
                const responseJson = JSON.parse(response.payload);
                expect(response.statusCode).toEqual(200);
                expect(responseJson.status).toEqual('success');

            });
        });

        describe('Group Bank GET', () => {

            it('should repsonse 200 and get group bank data', async () => {


                const server = await createServer(container);

                await AddGroupTableTestHelper.addgroup({ idgroup: 3, groupbank: 'groupbank3' });
                await AddGroupTableTestHelper.addgroup({ idgroup: 4, groupbank: 'groupbank4' });
                // Action
                const response = await server.inject({
                    method: 'GET',
                    url: '/banks/group',
                    headers: { 'x-customblhdrs': process.env.CUSTOM_HEADER_VALUE }

                });
                // Assert
                const responseJson = JSON.parse(response.payload);
                expect(response.statusCode).toEqual(200);
                expect(responseJson.status).toEqual('success');

            });
        });
        describe('Group Bank Delete', () => {

            it('should repsonse 200 and delete group bank data', async () => {

                const groupid = '18';

                const server = await createServer(container);

                await AddGroupTableTestHelper.addgroup({ idgroup: 18, groupbank: 'groupbank8' });
                await AddGroupTableTestHelper.addgroup({ idgroup: 19, groupbank: 'groupbank9' });
                // Action
                const response = await server.inject({
                    method: 'DELETE',
                    url: `/banks/group/${groupid}`,
                    headers: { 'x-customblhdrs': process.env.CUSTOM_HEADER_VALUE }

                });
                // Assert
                const responseJson = JSON.parse(response.payload);
                expect(response.statusCode).toEqual(200);
                expect(responseJson.status).toEqual('success');

            });


            it('should repsonse 404 when delete group bank data', async () => {

                const groupid = '20';

                const server = await createServer(container);
                // Action
                const response = await server.inject({
                    method: 'DELETE',
                    url: `/banks/group/${groupid}`,
                    headers: { 'x-customblhdrs': process.env.CUSTOM_HEADER_VALUE }

                });
                // Assert
                const responseJson = JSON.parse(response.payload);
                expect(response.statusCode).toEqual(404);
                expect(responseJson.status).toEqual('fail');

            });
        });

    });

    describe('Master Bank feature', () => {
        describe('Master Bank POST', () => {

            it('should repsonse 201 and persisted master bank data', async () => {
                const requestPayload = {
                    bnkmstrxyxyx: 'dana',
                    groupbank: 'groupbank1',
                    urllogoxxyx: 'https://www.coskoc.com/api/',
                    statusxyxyy: 1,
                    wdstatusxyxyy: 1
                };

                const server = await createServer(container);

                // Action
                const response = await server.inject({
                    method: 'POST',
                    url: '/banks/master',
                    payload: requestPayload,
                    headers: { 'x-customblhdrs': process.env.CUSTOM_HEADER_VALUE }

                });
                // Assert
                const responseJson = JSON.parse(response.payload);
                expect(response.statusCode).toEqual(201);
                expect(responseJson.status).toEqual('success');

            });

            it('should repsonse 400 when master already exist group bank data', async () => {

                const requestPayload = {
                    bnkmstrxyxyx: 'ovo',
                    groupbank: 'groupbank1',
                    urllogoxxyx: 'https://www.coskoc.com/api/',
                    statusxyxyy: 1,
                    wdstatusxyxyy: 1,
                };
                await AddMasterTableTestHelper.addmaster({ bnkmstrxyxyx: 'ovo', });

                const server = await createServer(container);
                // Action
                const response = await server.inject({
                    method: 'POST',
                    url: '/banks/master',
                    payload: requestPayload,
                    headers: { 'x-customblhdrs': process.env.CUSTOM_HEADER_VALUE }

                });

                // Assert
                const responseJson = JSON.parse(response.payload);
                expect(response.statusCode).toEqual(400);
                expect(responseJson.status).toEqual('fail');
            });

        });
        describe('Master Bank PUT', () => {
            it('should repsonse 200 when edit and persisted master bank data', async () => {
                const mstrbnks = 'ovo';

                const requestPayload = {
                    bnkmstrxyxyx: 'ovo2',
                    groupbank: 'groupbank1',
                    urllogoxxyx: 'https://www.coskoc.com/api/',
                    statusxyxyy: 2,
                    wdstatusxyxyy: 1,
                };
                await AddMasterTableTestHelper.addmaster({ bnkmstrxyxyx: 'ovo', });

                const server = await createServer(container);

                // Action
                const response = await server.inject({
                    method: 'PUT',
                    url: `/banks/master/${mstrbnks}`,
                    payload: requestPayload,
                    headers: { 'x-customblhdrs': process.env.CUSTOM_HEADER_VALUE }

                });
                // Assert
                const responseJson = JSON.parse(response.payload);
                expect(response.statusCode).toEqual(200);
                expect(responseJson.status).toEqual('success');

            });
        });
        describe('Master Bank GET', () => {

            it('should repsonse 200 and get master bank data', async () => {


                const server = await createServer(container);

                await AddMasterTableTestHelper.addmaster({ idbnkmaster: 7, bnkmstrxyxyx: 'bca4' });
                await AddMasterTableTestHelper.addmaster({ idbnkmaster: 8, bnkmstrxyxyx: 'bca5' });
                // Action
                const response = await server.inject({
                    method: 'GET',
                    url: '/banks/master',
                    headers: { 'x-customblhdrs': process.env.CUSTOM_HEADER_VALUE }

                });
                // Assert
                const responseJson = JSON.parse(response.payload);
                expect(response.statusCode).toEqual(200);
                expect(responseJson.status).toEqual('success');

            });


            describe('Master Bank DELETE', () => {
                it('should repsonse 200 and delete group bank data', async () => {

                    const idbnkmaster = '99';

                    const server = await createServer(container);

                    await AddMasterTableTestHelper.addmaster({ idbnkmaster: 99, bnkmstrxyxyx: 'bca' });
                    // Action
                    const response = await server.inject({
                        method: 'DELETE',
                        url: `/banks/master/${idbnkmaster}`,
                        headers: { 'x-customblhdrs': process.env.CUSTOM_HEADER_VALUE }


                    });
                    // Assert
                    const responseJson = JSON.parse(response.payload);
                    expect(response.statusCode).toEqual(200);
                    expect(responseJson.status).toEqual('success');

                });

                it('should repsonse 404 when delete group bank data', async () => {

                    const idbnkmaster = '98';

                    const server = await createServer(container);
                    // Action
                    const response = await server.inject({
                        method: 'DELETE',
                        url: `/banks/master/${idbnkmaster}`,
                        headers: { 'x-customblhdrs': process.env.CUSTOM_HEADER_VALUE }


                    });
                    // Assert
                    const responseJson = JSON.parse(response.payload);
                    expect(response.statusCode).toEqual(404);
                    expect(responseJson.status).toEqual('fail');

                });

            });
        });
    });

    describe(' Data Bank ', () => {
        describe('WHEN POST /banks', () => {

            it('should response 201 and persisted banks data', async () => {
                // Arrange
                const requestPayload = {
                    namegroupxyzt: ['groupbank1'],
                    masterbnkxyxt: 'mandiri',
                    namebankxxyy: 'mamdiri2',
                    yyxxmethod: 'bank',
                    xynamarekx: 'florensiaa sitanggang',
                    norekxyxy: '0355917844',
                    barcodexrxr: 'https://i.ibb.co/n671yNG/Scr44.png',
                };

                // eslint-disable-next-line no-undef
                const server = await createServer(container);

                // Action
                const response = await server.inject({
                    method: 'POST',
                    url: '/banks/v2/add',
                    payload: requestPayload,
                    headers: { 'x-customblhdrs': process.env.CUSTOM_HEADER_VALUE }

                });
                // Assert
                const responseJson = JSON.parse(response.payload);
                expect(response.statusCode).toEqual(201);
                expect(responseJson.status).toEqual('success');

            });
        });

        describe('Bank DELETE', () => {
            it('should repsonse 200 and delete group bank data', async () => {

                const idbank = '74';
                const namabank = 'bca81';

                const server = await createServer(container);

                await AddBanksTableTestHelper.addbks({ idbank: '74', namebankxxyy: 'bca81' });
                // Action
                const response = await server.inject({
                    method: 'DELETE',
                    url: `/banks/${idbank}/${namabank}`,
                    headers: { 'x-customblhdrs': process.env.CUSTOM_HEADER_VALUE }


                });
                // Assert
                const responseJson = JSON.parse(response.payload);
                expect(response.statusCode).toEqual(200);
                expect(responseJson.status).toEqual('success');

            });

            it('should repsonse 404 when delete bank data fail', async () => {

                const idbank = '79';
                const namabank = 'bca81';

                await AddBanksTableTestHelper.addbks({ idbank: '75', namebankxxyy: 'bca82' });

                const server = await createServer(container);

                // Action
                const response = await server.inject({
                    method: 'DELETE',
                    url: `/banks/${idbank}/${namabank}`,
                    headers: { 'x-customblhdrs': process.env.CUSTOM_HEADER_VALUE }

                });
                // Assert
                const responseJson = JSON.parse(response.payload);
                expect(response.statusCode).toEqual(404);
                expect(responseJson.status).toEqual('fail');
                expect(responseJson.message).toEqual('data not found !');

            });
        });

        describe('Bank DELETE ARRAY', () => {
            it('should repsonse 200 and delete group array bank data', async () => {

                const idbank = '75';
                const groupbank = 'groupbank4';

                const server = await createServer(container);

                await AddBanksTableTestHelper.addbks({ idbank: '75', namebankxxyy: 'bca82', namegroupxyzt: ['groupbank4'] });
                // Action
                const response = await server.inject({
                    method: 'DELETE',
                    url: `/banks/arr/${idbank}/${groupbank}`,
                    headers: { 'x-customblhdrs': process.env.CUSTOM_HEADER_VALUE }

                });
                // Assert
                const responseJson = JSON.parse(response.payload);
                expect(response.statusCode).toEqual(200);
                expect(responseJson.status).toEqual('success');

            });

            it('should repsonse 404 when delete bank data fail', async () => {

                const idbank = '76';
                const groupbank = 'groupbank4';

                const server = await createServer(container);

                // Action
                const response = await server.inject({
                    method: 'DELETE',
                    url: `/banks/arr/${idbank}/${groupbank}`,
                    headers: { 'x-customblhdrs': process.env.CUSTOM_HEADER_VALUE }

                });
                // Assert
                const responseJson = JSON.parse(response.payload);
                expect(response.statusCode).toEqual(404);
                expect(responseJson.status).toEqual('fail');
                expect(responseJson.message).toEqual('data not found !');

            });
            it('should repsonse 400 when delete bank data fail', async () => {

                const idbank = '78';
                const groupbank = 'groupbank4';

                const server = await createServer(container);

                await AddBanksTableTestHelper.addbks({ idbank: '78', namebankxxyy: 'bca83', namegroupxyzt: ['groupbank1'] });
                // Action
                const response = await server.inject({
                    method: 'DELETE',
                    url: `/banks/arr/${idbank}/${groupbank}`,
                    headers: { 'x-customblhdrs': process.env.CUSTOM_HEADER_VALUE }

                });
                // Assert
                const responseJson = JSON.parse(response.payload);
                expect(response.statusCode).toEqual(400);
                expect(responseJson.status).toEqual('fail');
                expect(responseJson.message).toEqual('data fail to delete !');

            });
        });




        describe('Bank PUT', () => {
            it('should repsonse 200 when edit and persisted  bank data', async () => {
                const idbank = '89';
                const nmbank = 'bca47';

                const requestPayload = {
                    masterbnkxyxt: 'bca',
                    namebankxxyy: 'bca44',
                    yyxxmethod: 'bank',
                    xynamarekx: 'florensia sitangg',
                    norekxyxy: '0355917811',
                    barcodexrxr: 'https://i.ibb.co/n671yNG/Screenshot-44.png',
                };
                await AddBanksTableTestHelper.addbks({
                    idbank: '89', namebankxxyy: 'bca47',
                });

                const server = await createServer(container);

                // Action
                const response = await server.inject({
                    method: 'PUT',
                    url: `/banks/v2/${idbank}/${nmbank}`,
                    payload: requestPayload,
                    headers: { 'x-customblhdrs': process.env.CUSTOM_HEADER_VALUE }

                });
                // Assert
                const responseJson = JSON.parse(response.payload);
                expect(response.statusCode).toEqual(200);
                expect(responseJson.status).toEqual('success');

            });


        });


        describe('Bank PUTCHANGE GROUP', () => {
            it('should repsonse 200 when edit and persisted  bank data', async () => {
                const idbank = '52';

                const requestPayload = {
                    namegroupxyzt: 'groupbank2'
                };
                await AddBanksTableTestHelper.addbks({ idbank: '52' });

                const server = await createServer(container);

                // Action
                const response = await server.inject({
                    method: 'PUT',
                    url: `/banks/v3/${idbank}`,
                    payload: requestPayload,
                    headers: { 'x-customblhdrs': process.env.CUSTOM_HEADER_VALUE }

                });
                // Assert
                const responseJson = JSON.parse(response.payload);
                expect(response.statusCode).toEqual(200);
                expect(responseJson.status).toEqual('success');
            });

            it('should repsonse 404 when edit and persisted  bank data', async () => {
                const idbank = '52';

                const requestPayload = {
                    namegroupxyzt: 'groupbank1'
                };
                await AddBanksTableTestHelper.addbks({ idbank: '52' });

                const server = await createServer(container);

                // Action
                const response = await server.inject({
                    method: 'PUT',
                    url: `/banks/v3/${idbank}`,
                    payload: requestPayload,
                    headers: { 'x-customblhdrs': process.env.CUSTOM_HEADER_VALUE }

                });
                // Assert
                const responseJson = JSON.parse(response.payload);
                expect(response.statusCode).toEqual(400);
                expect(responseJson.status).toEqual('fail');
                expect(responseJson.message).toEqual('Group already exists in this bank!');

            });
        });

    });


    describe('WHEN GET /banks/{groupname}', () => {

        it('should response 201 and persisted bank', async () => {

            const server = await createServer(container);
            const groupname = 'groupbank8';

            await AddBanksTableTestHelper.addbks({ idbank: 4, namegroupxyzt: ['groupbank8'], norekxyxy: '0355917810', masterbnkxyxt: 'mandiri', namebankxxyy: 'mandiri1' });
            await AddMasterTableTestHelper.addmaster({ idbnkmaster: 99, bnkmstrxyxyx: 'mandiri' });
            await AddGroupTableTestHelper.addgroup({ idgroup: 18, groupbank: 'groupbank8' });

            const response = await server.inject({
                method: 'GET',
                url: `/banks/v2/${groupname}`,
                headers: { 'x-customblhdrs': process.env.CUSTOM_HEADER_VALUE }

            })

            // Assert
            const responseJson = JSON.parse(response.payload);
            expect(response.statusCode).toEqual(200);
            expect(responseJson.status).toEqual('success');
            expect(responseJson.data).toBeDefined();
        });

        it('should  throw an error 404 when payload is not found', async () => {
            const server = await createServer(container);
            const groupname = 'groupbank555';

            // Action
            const response = await server.inject({
                method: 'GET',
                url: `/banks/v2/${groupname}`,
                headers: { 'x-customblhdrs': process.env.CUSTOM_HEADER_VALUE }

            })
            // Assert
            const responseJson = JSON.parse(response.payload);
            expect(response.statusCode).toEqual(404);
            expect(responseJson.status).toEqual('fail');
            expect(responseJson.message).toEqual('data not found !');
        });


    });


    describe('WHEN GET /banks/exc/{groupname}', () => {

        it('should response 200 and persisted bank exc ', async () => {

            const server = await createServer(container);
            const groupname = 'groupbank2';

            await AddBanksTableTestHelper.addbks({ idbank: 7, namegroupxyzt: ['groupbank7'], norekxyxy: '0355917810', masterbnkxyxt: 'mandiri', namebankxxyy: 'mandiri2' });
            await AddBanksTableTestHelper.addbks({ idbank: 9, namegroupxyzt: ['groupbank7', 'groupbank2'], norekxyxy: '0355917810', masterbnkxyxt: 'mandiri', namebankxxyy: 'mandiri1' });
            await AddMasterTableTestHelper.addmaster({ idbnkmaster: 99, bnkmstrxyxyx: 'mandiri' });
            await AddGroupTableTestHelper.addgroup({ idgroup: 18, groupbank: 'groupbank7' }, { idgroup: 19, groupbank: 'groupbank2' });

            const response = await server.inject({
                method: 'GET',
                url: `/banks/exc/${groupname}`,
                headers: { 'x-customblhdrs': process.env.CUSTOM_HEADER_VALUE }

            })

            // Assert
            const responseJson = JSON.parse(response.payload);
            expect(response.statusCode).toEqual(200);
            expect(responseJson.status).toEqual('success');
            expect(responseJson.data).toBeDefined();
        });

        it('should  throw an error 404 when payload is not found', async () => {
            const server = await createServer(container);
            const groupname = 'groupbank555';

            // Action
            const response = await server.inject({
                method: 'GET',
                url: `/banks/exc/${groupname}`,
                headers: { 'x-customblhdrs': process.env.CUSTOM_HEADER_VALUE }

            })
            // Assert
            const responseJson = JSON.parse(response.payload);
            expect(response.statusCode).toEqual(404);
            expect(responseJson.status).toEqual('fail');
            expect(responseJson.message).toEqual('data not found !');
        });


    });


});