// const AddBnksDp = require('../../../Domains/banks/entities/AddBnksDp');
const AddGroupBnks = require('../../../Domains/banks/entities/AddGroupBnks');
const AddBnks = require('../../../Domains/banks/entities/AddBnks');
const EditBnks = require('../../../Domains/banks/entities/EditBnks');
const EditGroupBnks = require('../../../Domains/banks/entities/EditGroupBnks');
const AddMasterBnks = require('../../../Domains/banks/entities/AddMasterBnks');
const BnksRepository = require('../../../Domains/banks/BnksRepository');
const AddbnksUseCase = require('../AddbnksUseCase');
const CacheService = require('../../caching/CacheService');
const NotFoundError = require('../../../Commons/exceptions/NotFoundError');


describe('GROUPBANK', () => {

    describe('AddGroup bnks api for add master data', () => {
        it('should orchestrating add group correctly', async () => {
            const useCasePayload = new AddGroupBnks({
                namegroupxyzt: 'groupbank2',
                grouptype: 1,
                min_dp: 10,
                max_dp: 2500,
                min_wd: 30,
                max_wd: 50000,
            });
            const namegroup = 'groupbank2';

            const mockcacheService = new CacheService();

            const mockbnksRepository = new BnksRepository();

            mockbnksRepository.addgrp = jest.fn()
                .mockImplementation(() => Promise.resolve(namegroup));
            mockcacheService.delete = jest.fn().mockResolvedValue();


            const addgroupusecase = new AddbnksUseCase({
                bnksRepository: mockbnksRepository,
                cacheServices: mockcacheService

            });

            const datagroupusecase = await addgroupusecase.addgrp(useCasePayload);
            expect(datagroupusecase).toStrictEqual(namegroup);
            expect(mockbnksRepository.addgrp).toBeCalledWith(useCasePayload);
            expect(mockcacheService.delete).toBeCalledWith(`group:group`);


        });
    });



    describe('Edit Group bnks for add Group data', () => {

        it('should edit data Group data correctly', async () => {

            const params = {
                namegroup: 'groupbank2'
            }
            const useCasePayload = new AddGroupBnks({
                namegroupxyzt: 'groupbank2',
                grouptype: 1,
                min_dp: 10,
                max_dp: 2500,
                min_wd: 30,
                max_wd: 50000,
            });

            const resultmockGroup = "Group Bank Edit Success !!";

            const mockcacheService = new CacheService();
            const mockbnksRepository = new BnksRepository();


            mockbnksRepository.edtgrp = jest.fn()
                .mockImplementation(() => Promise.resolve(resultmockGroup));
            mockcacheService.delete = jest.fn().mockResolvedValue();


            const addgroupusecase = new AddbnksUseCase({
                bnksRepository: mockbnksRepository,
                cacheServices: mockcacheService

            });

            const datagroupusecase = await addgroupusecase.editgroupbnks(useCasePayload, params);

            expect(datagroupusecase).toStrictEqual(resultmockGroup);
            expect(mockbnksRepository.edtgrp).toBeCalledWith(useCasePayload, params.namegroup);
            expect(mockcacheService.delete).toBeCalledWith(`group:group`);

        });
    });


    describe('GetDataGroup that already create', () => {
        it("should get data group bank caching", async () => {
            const resultmockgroup = {
                groupbank3: {
                    idgroup: 3,
                    grouptype: 1,
                    min_dp: 10,
                    max_dp: 2500,
                    min_wd: 30,
                    max_wd: 50000
                },
                groupbank4: {
                    idgroup: 4,
                    grouptype: 1,
                    min_dp: 10,
                    max_dp: 2500,
                    min_wd: 30,
                    max_wd: 50000
                }
            };



            const mockcacheService = new CacheService();
            mockcacheService.get = jest.fn().mockResolvedValue(JSON.stringify(resultmockgroup));

            const getDataMasterUseCase = new AddbnksUseCase({
                cacheServices: mockcacheService
            });

            const payload = await getDataMasterUseCase.getgroup();

            expect(mockcacheService.get).toBeCalledWith(`group:group`);
            expect(payload).toEqual(
                resultmockgroup

            );
        });
        it('should get data group bank', async () => {


            const resultmockgroup = {
                groupbank3: {
                    idgroup: 3,
                    grouptype: 1,
                    min_dp: 10,
                    max_dp: 2500,
                    min_wd: 30,
                    max_wd: 50000
                },
                groupbank4: {
                    idgroup: 4,
                    grouptype: 1,
                    min_dp: 10,
                    max_dp: 2500,
                    min_wd: 30,
                    max_wd: 50000
                }
            };

            const resultdataresult = [{ "idgroup": 3, groupbank: "groupbank3", grouptype: 1, min_dp: 10, max_dp: 2500, min_wd: 30, max_wd: 50000 }, { "idgroup": 4, groupbank: "groupbank4", grouptype: 1, min_dp: 10, max_dp: 2500, min_wd: 30, max_wd: 50000 }];


            const mockcacheService = new CacheService();


            const mockBnksRepository = new BnksRepository();

            mockBnksRepository.getdtGroup = jest.fn()
                .mockImplementation(() => Promise.resolve(resultdataresult));
            mockcacheService.delete = jest.fn().mockResolvedValue();
            mockcacheService.set = jest.fn().mockResolvedValue();

            const getGroupDataUsecase = new AddbnksUseCase({
                bnksRepository: mockBnksRepository,
                cacheServices: mockcacheService

            });

            const payload = await getGroupDataUsecase.getgroup();

            expect(mockBnksRepository.getdtGroup)
                .toBeCalledWith();
            expect(payload).toEqual(resultmockgroup);
            expect(mockcacheService.delete).toBeCalledWith(`group:group`);
            expect(mockcacheService.set).toBeCalledWith(`group:group`, JSON.stringify(resultmockgroup));
        });
    });

    describe("delete  group bank for master data", () => {
        it("should delete data group succesfully", async () => {

            params = {
                idgroup: 12
            }

            resultdelete = "success delete group";

            const mockcacheService = new CacheService();
            const mockBnksRepository = new BnksRepository();

            mockBnksRepository.findgroup = jest.fn()
                .mockImplementation(() => Promise.resolve());
            mockBnksRepository.delgroup = jest.fn()
                .mockImplementation(() => Promise.resolve(resultdelete));
            mockcacheService.delete = jest.fn().mockResolvedValue();



            const delGroupDataUsecase = new AddbnksUseCase({
                bnksRepository: mockBnksRepository,
                cacheServices: mockcacheService

            });

            const datasuccess = await delGroupDataUsecase.delgroupdata(params);

            expect(mockBnksRepository.findgroup)
                .toBeCalledWith(params.idgroup);
            expect(mockBnksRepository.delgroup)
                .toBeCalledWith(params.idgroup);
            expect(datasuccess).toEqual(resultdelete);
            expect(mockcacheService.delete).toBeCalledWith(`group:group`);


        });
    });
});

describe('MASTER BANK', () => {

    describe('Add Master bnks for add master data', () => {

        it('should orchestrating add master correctly', async () => {
            const useCasePayload = new AddMasterBnks({
                bnkmstrxyxyx: 'bca',
                // groupbank: 'groupbank1',
                urllogoxxyx: 'https://www.coskoc.com/api/',
                statusxyxyy: 1,
                wdstatusxyxyy: 1,
            });

            const resultmockmaster = {
                bankmaster: 'bca'
            };
            const mockcacheService = new CacheService();
            mockcacheService.delete = jest.fn().mockResolvedValue();


            const mockbnksRepository = {
                chckmstr: jest.fn().mockResolvedValue(),
                addmstr: jest.fn().mockResolvedValue(resultmockmaster),
            };


            const addgroupusecase = new AddbnksUseCase({
                bnksRepository: mockbnksRepository,
                cacheServices: mockcacheService

            });

            const datamasterusecase = await addgroupusecase.admasterbank(useCasePayload);

            expect(datamasterusecase).toStrictEqual(resultmockmaster);
            expect(mockbnksRepository.chckmstr).toBeCalledWith(useCasePayload.bnkmstrxyxyx);
            expect(mockbnksRepository.addmstr).toBeCalledWith(useCasePayload);
            expect(mockcacheService.delete).toBeCalledWith(`namemaster:master`);
        });
    });

    describe('Edit Master bnks for add master data', () => {

        it('should edit data master data correctly', async () => {

            const params = {
                mstrbnks: "bca",
            }
            const useCasePayload = new AddMasterBnks({
                bnkmstrxyxyx: 'bca',
                // groupbank: 'groupbank1',
                urllogoxxyx: 'https://www.coskoc.com/api/',
                statusxyxyy: 1,
                wdstatusxyxyy: 1,
            });
            const resultmockmaster = "Master Bank Edit Success !!";

            const mockcacheService = new CacheService();
            const mockbnksRepository = new BnksRepository();


            mockbnksRepository.putmstrbnk = jest.fn()
                .mockImplementation(() => Promise.resolve(resultmockmaster));
            mockcacheService.delete = jest.fn().mockResolvedValue();


            const addgroupusecase = new AddbnksUseCase({
                bnksRepository: mockbnksRepository,
                cacheServices: mockcacheService

            });
            const datagroupusecase = await addgroupusecase.putmasterbank(useCasePayload, params);
            expect(datagroupusecase).toStrictEqual(resultmockmaster);
            expect(mockbnksRepository.putmstrbnk).toBeCalledWith(useCasePayload, params.mstrbnks);
            expect(mockcacheService.delete).toBeCalledWith(`namemaster:master`);

        });
    });


    describe('GetdataMaster that already create', () => {
        it("should get data master bank caching", async () => {
            const resultmockmaster = [
                { "idbnkmaster": 5, bnkmstrxyxyx: "bca2" },
                { "idbnkmaster": 6, bnkmstrxyxyx: "bca3" }];

            const mockcacheService = new CacheService();
            mockcacheService.get = jest.fn().mockResolvedValue(JSON.stringify(resultmockmaster));
            const getDataMasterUseCase = new AddbnksUseCase({
                cacheServices: mockcacheService
            });
            const payload = await getDataMasterUseCase.getdtmstr();
            expect(mockcacheService.get).toBeCalledWith(`namemaster:master`);
            expect(payload).toEqual(
                resultmockmaster
            );
        });
        it('should get data master bank', async () => {


            const resultmockmaster = [{ "idbnkmaster": 5, bnkmstrxyxyx: "bca2" }, { "idbnkmaster": 6, bnkmstrxyxyx: "bca3" }];

            const mockcacheService = new CacheService();
            mockcacheService.delete = jest.fn().mockResolvedValue();
            mockcacheService.set = jest.fn().mockResolvedValue();

            const mockBnksRepository = {
                getmstrbnk: jest.fn().mockResolvedValue(resultmockmaster),
            };

            const getGroupDataUsecase = new AddbnksUseCase({
                bnksRepository: mockBnksRepository,
                cacheServices: mockcacheService

            });

            const payload = await getGroupDataUsecase.getdtmstr();

            expect(mockBnksRepository.getmstrbnk)
                .toBeCalledWith();
            expect(mockcacheService.delete).toBeCalledWith(`namemaster:master`);
            expect(mockcacheService.set).toBeCalledWith(`namemaster:master`, JSON.stringify(resultmockmaster));

            expect(payload).toEqual(resultmockmaster);
        });
    });

    describe("delete  master bank for master data", () => {
        it("should delete data master succesfully", async () => {

            params = {
                idbnkmaster: 12
            }


            resultdelete = "success delete master bank";

            const mockcacheService = new CacheService();
            const mockBnksRepository = new BnksRepository();

            mockBnksRepository.findmstr = jest.fn()
                .mockImplementation(() => Promise.resolve());
            mockBnksRepository.delmstrbnk = jest.fn()
                .mockImplementation(() => Promise.resolve(resultdelete));
            mockcacheService.delete = jest.fn().mockResolvedValue();



            const delGroupDataUsecase = new AddbnksUseCase({
                bnksRepository: mockBnksRepository,
                cacheServices: mockcacheService

            });
            const datasuccess = await delGroupDataUsecase.delmasterdata(params);

            expect(mockBnksRepository.findmstr)
                .toBeCalledWith(params.idbnkmaster);
            expect(mockBnksRepository.delmstrbnk)
                .toBeCalledWith(params.idbnkmaster);
            expect(datasuccess).toEqual(resultdelete);
            expect(mockcacheService.delete).toBeCalledWith(`namemaster:master`);


        });
    });
});


describe('DATA BANK', () => {
    describe('add data BANK', () => {
        it('should orchestrating add data apk get correctly', async () => {
            //arrange
            const useCasePayload = new AddBnks({
                namegroupxyzt: ['groupbank1'],
                masterbnkxyxt: 'bca',
                namebankxxyy: 'bca1',
                yyxxmethod: 'bank',
                xynamarekx: 'florensia sitanggang',
                norekxyxy: '0355917811',
                barcodexrxr: 'https://i.ibb.co/n671yNG/Screenshot-44.png',
            });

            resultmockdoneadd = {
                masterbnkxyxt: 'bca',
                namegroupxyzt: ['groupbank1'],
                namebankxxyy: 'bca1',
                norekxyxy: '0355917811',
                xynamarekx: 'florensia sitanggang',
            };

            /** creating dependency of use case */
            const mockcacheService = new CacheService();
            const mockbnksRepository = new BnksRepository();

            /** mocking needed function */

            mockbnksRepository.chckbnks = jest.fn()
                .mockImplementation(() => Promise.resolve());
            mockbnksRepository.addbnks = jest.fn()
                .mockImplementation(() => Promise.resolve(resultmockdoneadd));
            mockcacheService.delete = jest.fn().mockResolvedValue();


            const addbnksUseCase = new AddbnksUseCase({
                bnksRepository: mockbnksRepository,
                cacheServices: mockcacheService

            });

            const databnksusecase = await addbnksUseCase.addbnkdt(useCasePayload);

            expect(databnksusecase).toStrictEqual(resultmockdoneadd);
            expect(mockbnksRepository.chckbnks).toBeCalledWith(useCasePayload);
            expect(mockbnksRepository.addbnks).toBeCalledWith(useCasePayload);
            expect(mockcacheService.delete).toBeCalledWith(`namegroup:${resultmockdoneadd.namegroupxyzt[0]}`);
        });
    });
    describe('edit data BANK', () => {

        it('should edit data groupbank correctly', async () => {

            const params = {
                idbank: 2,
            }
            const useCasePayload = new EditGroupBnks({
                namegroupxyzt: 'groupbank1',
            });

            const resultmockresult = "Bank Edit Success !";


            const mockbnksRepository = new BnksRepository();
            const mockcacheService = new CacheService();


            mockbnksRepository.checkbankar = jest.fn()
            mockbnksRepository.editbankar = jest.fn()
                .mockImplementation(() => Promise.resolve(resultmockresult));
            mockcacheService.delete = jest.fn().mockResolvedValue();


            const putBankusecase = new AddbnksUseCase({
                bnksRepository: mockbnksRepository,
                cacheServices: mockcacheService
            });

            const resultbankusecase = await putBankusecase.edtbankgroup(useCasePayload, params);

            expect(resultbankusecase).toStrictEqual(resultmockresult);
            expect(mockbnksRepository.checkbankar).toBeCalledWith(useCasePayload, params.idbank);
            expect(mockbnksRepository.editbankar).toBeCalledWith(useCasePayload, params.idbank);
            expect(mockcacheService.delete).toBeCalledWith(`namegroup:${useCasePayload.namegroupxyzt}`);


        });


        it('should edit data bank data correctly', async () => {

            const params = {
                idbank: 2,
                nmbank: 'bca2'
            }
            const useCasePayload = new EditBnks({
                masterbnkxyxt: 'bca',
                namebankxxyy: 'bca1',
                yyxxmethod: 'bank',
                xynamarekx: 'florensia sitanggang',
                norekxyxy: '0355917811',
                barcodexrxr: 'https://i.ibb.co/n671yNG/Screenshot-44.png',
            });

            checkbank = { namegroupxyzt: ['groupbank3', 'groupbankwd1'] };


            const resultmockresult = "Bank Edit Success !";

            // const resultmockbank = { namegroupxyzt: 'groupbank1' };

            const mockbnksRepository = new BnksRepository();
            const mockcacheService = new CacheService();

            mockbnksRepository.chckedybnks = jest.fn()
                .mockImplementation(() => Promise.resolve(checkbank));
            mockbnksRepository.putbnks = jest.fn()
                .mockImplementation(() => Promise.resolve(resultmockresult));
            mockcacheService.delete = jest.fn().mockResolvedValue();
            mockcacheService.delete = jest.fn().mockResolvedValue();


            const putBankusecase = new AddbnksUseCase({
                bnksRepository: mockbnksRepository,
                cacheServices: mockcacheService
            });

            const resultbankusecase = await putBankusecase.edtbank(useCasePayload, params);

            expect(resultbankusecase).toStrictEqual(resultmockresult);
            expect(mockbnksRepository.chckedybnks).toBeCalledWith(useCasePayload, params.nmbank);
            expect(mockbnksRepository.putbnks).toBeCalledWith(useCasePayload, params.idbank);
            checkbank.namegroupxyzt.forEach(async (group) => {
                expect(mockcacheService.delete).toBeCalledWith(`namegroup:${group}`);
            });


        });
    });
    describe('BANK DATA GET DATA', () => {
        it('should get data apk caching successfully', async () => {
            const params = {
                groupname: 'groupbank1',
            };

            const resultmockgroup = {
                groupbank1: {
                    bca: {
                        url_logo: "URL_logo_bank",
                        statusxxyy: 1,
                        data_bank: [
                            {
                                idbank: 3,
                                namebankxxyy: 'bca1',
                                yyxxmethod: 'bank',
                                xynamarekx: 'florensia sitanggang',
                                norekxyxy: '0355917811',
                                barcodexrxr: 'https://i.ibb.co/n671yNG/Screenshot-44.png',
                                zwzwshowbarcode: true,

                            },
                            {
                                idbank: 4,

                                namebankxxyy: 'bca2',
                                yyxxmethod: 'bank',
                                xynamarekx: 'florensia sitanggang',
                                norekxyxy: '0355917811',
                                barcodexrxr: 'https://i.ibb.co/n671yNG/Screenshot-44.png',
                                zwzwshowbarcode: true,

                            }
                        ]
                    },
                    mandiri: {
                        url_logo: "URL_logo_bank_mandiri",
                        statusxxyy: 2,
                        data_bank: [
                            {
                                idbank: 1,
                                namebankxxyy: 'mandiri1',
                                yyxxmethod: 'bank',
                                xynamarekx: 'florensia sitanggang',
                                norekxyxy: '0355917333',
                                barcodexrxr: 'https://i.ibb.co/n671yNG/Screenshot-44.png',
                                zwzwshowbarcode: true,

                            },
                            {
                                idbank: 2,
                                namebankxxyy: 'mandiri2',
                                yyxxmethod: 'bank',
                                xynamarekx: 'florensia sitanggang',
                                norekxyxy: '0355917222',
                                barcodexrxr: 'https://i.ibb.co/n671yNG/Screenshot-44.png',
                                zwzwshowbarcode: true,

                            }
                        ]
                    }
                },
                headers: {
                    'X-Data-Source': 'cache',
                }
            };

            const mockcacheService = new CacheService();
            mockcacheService.get = jest.fn().mockResolvedValue(JSON.stringify(resultmockgroup));

            const getDataBankUseCase = new AddbnksUseCase({
                cacheServices: mockcacheService
            });
            const getdatausecase = await getDataBankUseCase.getbankdt(params);
            expect(mockcacheService.get).toBeCalledWith(`namegroup:${params.groupname}`);
            expect(getdatausecase).toEqual(
                resultmockgroup

            );
        });

        it('should get data bank successfully', async () => {
            const params = {
                groupname: 'groupbank1'
            };

            const resultmockgroup = {
                groupbank1: {
                    bca: {
                        url_logo: "URL_logo_bank",
                        statusxxyy: 1,
                        data_bank: [
                            {
                                idbank: 3,
                                namebankxxyy: 'bca1',
                                yyxxmethod: 'bank',
                                xynamarekx: 'florensia sitanggang',
                                norekxyxy: '0355917811',
                                barcodexrxr: 'https://i.ibb.co/n671yNG/Screenshot-44.png',
                                zwzwshowbarcode: true,

                            },
                            {
                                idbank: 4,

                                namebankxxyy: 'bca2',
                                yyxxmethod: 'bank',
                                xynamarekx: 'florensia sitanggang',
                                norekxyxy: '0355917811',
                                barcodexrxr: 'https://i.ibb.co/n671yNG/Screenshot-44.png',
                                zwzwshowbarcode: true,

                            }
                        ]
                    },
                    mandiri: {
                        url_logo: "URL_logo_bank_mandiri",
                        statusxxyy: 2,
                        data_bank: [
                            {
                                idbank: 1,
                                namebankxxyy: 'mandiri1',
                                yyxxmethod: 'bank',
                                xynamarekx: 'florensia sitanggang',
                                norekxyxy: '0355917333',
                                barcodexrxr: 'https://i.ibb.co/n671yNG/Screenshot-44.png',
                                zwzwshowbarcode: true,

                            },
                            {
                                idbank: 2,
                                namebankxxyy: 'mandiri2',
                                yyxxmethod: 'bank',
                                xynamarekx: 'florensia sitanggang',
                                norekxyxy: '0355917222',
                                barcodexrxr: 'https://i.ibb.co/n671yNG/Screenshot-44.png',
                                zwzwshowbarcode: true,

                            }
                        ]
                    }
                }

            };


            const resultbank = [
                {
                    idbank: 1,
                    namegroupxyzt: ['groupbank1', 'groupbank2', 'groupbank3'],
                    masterbnkxyxt: 'mandiri',
                    namebankxxyy: 'mandiri1',
                    yyxxmethod: 'bank',
                    xynamarekx: 'florensia sitanggang',
                    norekxyxy: '0355917333',
                    barcodexrxr: 'https://i.ibb.co/n671yNG/Screenshot-44.png',
                    zwzwshowbarcode: true,

                },
                {
                    idbank: 2,
                    namegroupxyzt: ['groupbank1', 'groupbank2', 'groupbank3'],
                    masterbnkxyxt: 'mandiri',
                    namebankxxyy: 'mandiri2',
                    yyxxmethod: 'bank',
                    xynamarekx: 'florensia sitanggang',
                    norekxyxy: '0355917222',
                    barcodexrxr: 'https://i.ibb.co/n671yNG/Screenshot-44.png',
                    zwzwshowbarcode: true,

                },
                {
                    idbank: 3,
                    namegroupxyzt: ['groupbank1', 'groupbank2', 'groupbank3'],
                    masterbnkxyxt: 'bca',
                    namebankxxyy: 'bca1',
                    yyxxmethod: 'bank',
                    xynamarekx: 'florensia sitanggang',
                    norekxyxy: '0355917811',
                    barcodexrxr: 'https://i.ibb.co/n671yNG/Screenshot-44.png',
                    zwzwshowbarcode: true,

                },
                {
                    idbank: 4,
                    namegroupxyzt: ['groupbank1', 'groupbank2', 'groupbank3'],
                    masterbnkxyxt: 'bca',
                    namebankxxyy: 'bca2',
                    yyxxmethod: 'bank',
                    xynamarekx: 'florensia sitanggang',
                    norekxyxy: '0355917811',
                    barcodexrxr: 'https://i.ibb.co/n671yNG/Screenshot-44.png',
                    zwzwshowbarcode: true,

                }
            ]

            const resultgroup = [{
                idgroup: 1,
                groupbank: "groupbank1",
                grouptype: 1
            }, {
                idgroup: 1,
                groupbank: "groupbank2",
                grouptype: 1
            }
            ]

            const resultmaster = [
                {
                    idbnkmaster: 1,
                    bnkmstrxyxyx: "bca",
                    urllogoxxyx: "URL_logo_bank",
                    statusxyxyy: 1
                },
                {
                    idbnkmaster: 2,
                    bnkmstrxyxyx: "mandiri",
                    urllogoxxyx: "URL_logo_bank_mandiri",
                    statusxyxyy: 2
                },
            ]

            const mockbnksRepository = new BnksRepository();
            const mockcacheService = new CacheService();




            mockbnksRepository.getbnks = jest.fn()
                .mockImplementation(() => Promise.resolve(resultbank));
            mockbnksRepository.getgroupbnks = jest.fn()
                .mockImplementation(() => Promise.resolve(resultgroup));
            mockbnksRepository.getmasterbnks = jest.fn()
                .mockImplementation(() => Promise.resolve(resultmaster));
            mockcacheService.delete = jest.fn().mockResolvedValue();
            mockcacheService.set = jest.fn().mockResolvedValue();




            // const bnksRepository = {
            //     getbnks: jest.fn().mockResolvedValue(resultbank),
            //     getgroupbnks: jest.fn().mockResolvedValue(resultgroup),
            //     getmasterbnks: jest.fn().mockResolvedValue(resultmaster),
            // };

            const getDataBankUseCase = new AddbnksUseCase({
                bnksRepository: mockbnksRepository,
                cacheServices: mockcacheService
            });

            const getdatausecase = await getDataBankUseCase.getbankdt(params);

            expect(mockbnksRepository.getbnks).toBeCalledWith(params.groupname);
            expect(mockbnksRepository.getgroupbnks).toBeCalledWith(params.groupname);
            expect(mockbnksRepository.getmasterbnks).toBeCalledWith(params.groupname);
            expect(mockcacheService.delete).toBeCalledWith(`namegroup:${params.groupname}`);
            expect(mockcacheService.set).toBeCalledWith(`namegroup:${params.groupname}`, JSON.stringify(getdatausecase));
            expect(getdatausecase).toEqual(resultmockgroup);
        });
    });
    describe('BANK DATA GET DATA EXCEPT GROUP', () => {
        // it('should get data bank except caching successfully', async () => {
        //     const params = {
        //         groupname: 'groupbank2',
        //     };

        //     const resultmockgroup = {
        //         groupbank1: {
        //             bca: {
        //                 url_logo: "URL_logo_bank",
        //                 statusxxyy: 1,
        //                 data_bank: [
        //                     {
        //                         idbank: 3,
        //                         namebankxxyy: 'bca1',
        //                         yyxxmethod: 'bank',
        //                         xynamarekx: 'florensia sitanggang',
        //                         norekxyxy: '0355917811',
        //                         barcodexrxr: 'https://i.ibb.co/n671yNG/Screenshot-44.png',
        //                         zwzwshowbarcode: true,

        //                     }
        //                 ]
        //             },
        //             mandiri: {
        //                 url_logo: "URL_logo_bank_mandiri",
        //                 statusxxyy: 2,
        //                 data_bank: [
        //                     {
        //                         idbank: 2,
        //                         namebankxxyy: 'mandiri2',
        //                         yyxxmethod: 'bank',
        //                         xynamarekx: 'florensia sitanggang',
        //                         norekxyxy: '0355917222',
        //                         barcodexrxr: 'https://i.ibb.co/n671yNG/Screenshot-44.png',
        //                         zwzwshowbarcode: true,

        //                     }
        //                 ]
        //             }
        //         },
        //         groupbank3: {
        //             bca: {
        //                 url_logo: "URL_logo_bank",
        //                 statusxxyy: 1,
        //                 data_bank: [
        //                     {
        //                         idbank: 3,
        //                         namebankxxyy: 'bca1',
        //                         yyxxmethod: 'bank',
        //                         xynamarekx: 'florensia sitanggang',
        //                         norekxyxy: '0355917811',
        //                         barcodexrxr: 'https://i.ibb.co/n671yNG/Screenshot-44.png',
        //                         zwzwshowbarcode: true,

        //                     }
        //                 ]
        //             },
        //             mandiri: {
        //                 url_logo: "URL_logo_bank_mandiri",
        //                 statusxxyy: 2,
        //                 data_bank: [
        //                     {
        //                         idbank: 2,
        //                         namebankxxyy: 'mandiri2',
        //                         yyxxmethod: 'bank',
        //                         xynamarekx: 'florensia sitanggang',
        //                         norekxyxy: '0355917222',
        //                         barcodexrxr: 'https://i.ibb.co/n671yNG/Screenshot-44.png',
        //                         zwzwshowbarcode: true,

        //                     }
        //                 ]
        //             }
        //         }
        //         ,
        //         headers: {
        //             'X-Data-Source': 'cache',
        //         }
        //     };

        //     const mockcacheService = new CacheService();
        //     mockcacheService.get = jest.fn().mockResolvedValue(JSON.stringify(resultmockgroup));

        //     const getDataBankUseCase = new AddbnksUseCase({
        //         cacheServices: mockcacheService
        //     });
        //     const getdatausecase = await getDataBankUseCase.getbankdtex(params);
        //     expect(mockcacheService.get).toBeCalledWith(`namegroupex:${params.groupname}`);
        //     expect(getdatausecase).toEqual(
        //         resultmockgroup

        //     );
        // });

        it('should get data bank except successfully', async () => {
            const params = {
                groupname: 'groupbank2'
            };

            const resultmockgroup = {
                groupbank1: {
                    bca: {
                        url_logo: "URL_logo_bank",
                        statusxxyy: 1,
                        data_bank: [
                            {
                                idbank: 3,
                                namebankxxyy: 'bca1',
                                yyxxmethod: 'bank',
                                xynamarekx: 'florensia sitanggang',
                                norekxyxy: '0355917811',
                                barcodexrxr: 'https://i.ibb.co/n671yNG/Screenshot-44.png',
                                zwzwshowbarcode: true,

                            }
                        ]
                    },
                    mandiri: {
                        url_logo: "URL_logo_bank_mandiri",
                        statusxxyy: 2,
                        data_bank: [
                            {
                                idbank: 2,
                                namebankxxyy: 'mandiri2',
                                yyxxmethod: 'bank',
                                xynamarekx: 'florensia sitanggang',
                                norekxyxy: '0355917222',
                                barcodexrxr: 'https://i.ibb.co/n671yNG/Screenshot-44.png',
                                zwzwshowbarcode: true,

                            }
                        ]
                    }
                },
                groupbank3: {
                    bca: {
                        url_logo: "URL_logo_bank",
                        statusxxyy: 1,
                        data_bank: [
                            {
                                idbank: 3,
                                namebankxxyy: 'bca1',
                                yyxxmethod: 'bank',
                                xynamarekx: 'florensia sitanggang',
                                norekxyxy: '0355917811',
                                barcodexrxr: 'https://i.ibb.co/n671yNG/Screenshot-44.png',
                                zwzwshowbarcode: true,

                            },
                            {
                                idbank: 4,
                                namebankxxyy: 'bca2',
                                yyxxmethod: 'bank',
                                xynamarekx: 'florensia sitanggang',
                                norekxyxy: '0355917811',
                                barcodexrxr: 'https://i.ibb.co/n671yNG/Screenshot-44.png',
                                zwzwshowbarcode: true,
                            }
                        ]
                    },
                    mandiri: {
                        url_logo: "URL_logo_bank_mandiri",
                        statusxxyy: 2,
                        data_bank: [
                            {
                                idbank: 2,
                                namebankxxyy: 'mandiri2',
                                yyxxmethod: 'bank',
                                xynamarekx: 'florensia sitanggang',
                                norekxyxy: '0355917222',
                                barcodexrxr: 'https://i.ibb.co/n671yNG/Screenshot-44.png',
                                zwzwshowbarcode: true,

                            }
                        ]
                    }
                }

            };


            const resultbank = [
                {
                    idbank: 1,
                    namegroupxyzt: ['groupbank1', 'groupbank2', 'groupbank3'],
                    masterbnkxyxt: 'mandiri',
                    namebankxxyy: 'mandiri1',
                    yyxxmethod: 'bank',
                    xynamarekx: 'florensia sitanggang',
                    norekxyxy: '0355917333',
                    barcodexrxr: 'https://i.ibb.co/n671yNG/Screenshot-44.png',
                    zwzwshowbarcode: true,

                },
                {
                    idbank: 2,
                    namegroupxyzt: ['groupbank1', 'groupbank3'],
                    masterbnkxyxt: 'mandiri',
                    namebankxxyy: 'mandiri2',
                    yyxxmethod: 'bank',
                    xynamarekx: 'florensia sitanggang',
                    norekxyxy: '0355917222',
                    barcodexrxr: 'https://i.ibb.co/n671yNG/Screenshot-44.png',
                    zwzwshowbarcode: true,

                },
                {
                    idbank: 3,
                    namegroupxyzt: ['groupbank1', 'groupbank3'],
                    masterbnkxyxt: 'bca',
                    namebankxxyy: 'bca1',
                    yyxxmethod: 'bank',
                    xynamarekx: 'florensia sitanggang',
                    norekxyxy: '0355917811',
                    barcodexrxr: 'https://i.ibb.co/n671yNG/Screenshot-44.png',
                    zwzwshowbarcode: true,

                },
                {
                    idbank: 4,
                    namegroupxyzt: ['groupbank3'],
                    masterbnkxyxt: 'bca',
                    namebankxxyy: 'bca2',
                    yyxxmethod: 'bank',
                    xynamarekx: 'florensia sitanggang',
                    norekxyxy: '0355917811',
                    barcodexrxr: 'https://i.ibb.co/n671yNG/Screenshot-44.png',
                    zwzwshowbarcode: true,
                }
            ]

            const resultgroup = [{
                idgroup: 1,
                groupbank: "groupbank1",
                grouptype: 1
            }, {
                idgroup: 2,
                groupbank: "groupbank2",
                grouptype: 1
            }, {
                idgroup: 3,
                groupbank: "groupbank3",
                grouptype: 1
            }
            ]


            const resultmaster = [
                {
                    idbnkmaster: 1,
                    bnkmstrxyxyx: "bca",
                    urllogoxxyx: "URL_logo_bank",
                    statusxyxyy: 1
                },
                {
                    idbnkmaster: 2,
                    bnkmstrxyxyx: "mandiri",
                    urllogoxxyx: "URL_logo_bank_mandiri",
                    statusxyxyy: 2
                },
            ]


            // const mockcacheService = new CacheService();
            // mockcacheService.delete = jest.fn().mockResolvedValue();
            // mockcacheService.set = jest.fn().mockResolvedValue();

            const bnksRepository = {
                getbnkex: jest.fn().mockResolvedValue(resultbank),
                getgroupbnkex: jest.fn().mockResolvedValue(resultgroup),
                getmasterbnks: jest.fn().mockResolvedValue(resultmaster),
            };

            const getDataBankUseCase = new AddbnksUseCase({
                bnksRepository,
                // cacheServices: mockcacheService
            });

            const getdatausecase = await getDataBankUseCase.getbankdtex(params);

            expect(bnksRepository.getbnkex).toBeCalledWith(params.groupname);
            expect(bnksRepository.getgroupbnkex).toBeCalledWith(params.groupname);
            expect(bnksRepository.getmasterbnks).toBeCalledWith(params.groupname);
            // expect(mockcacheService.delete).toBeCalledWith(`namegroupex:${params.groupname}`);
            // expect(mockcacheService.set).toBeCalledWith(`namegroupex:${params.groupname}`, JSON.stringify(getdatausecase));
            expect(getdatausecase).toEqual(resultmockgroup);
        });
    });

    describe("delete  group bank for master data", () => {
        it("should delete data group succesfully", async () => {
            params = {
                namabank: "bca1",
                idbank: 12
            }

            const groupbank = "groupbank1"
            resultdelete = "success delete bank";
            const mockcacheService = new CacheService();
            const mockBnksRepository = new BnksRepository();

            mockBnksRepository.findbank = jest.fn()
                .mockImplementation(() => Promise.resolve(groupbank));
            mockBnksRepository.delbnks = jest.fn()
                .mockImplementation(() => Promise.resolve(resultdelete));
            mockcacheService.delete = jest.fn().mockResolvedValue();
            const delBanksGroupDataUsecase = new AddbnksUseCase({
                bnksRepository: mockBnksRepository,
                cacheServices: mockcacheService
            });
            const datasuccess = await delBanksGroupDataUsecase.delbankdata(params);

            expect(mockBnksRepository.findbank)
                .toBeCalledWith(params.idbank);
            expect(mockBnksRepository.delbnks)
                .toBeCalledWith(params);
            expect(datasuccess).toEqual(resultdelete);
            expect(mockcacheService.delete).toBeCalledWith(`namegroup:${groupbank}`);


        });
    });

    describe("delete  group bank array for master data", () => {
        it("should delete data group succesfully", async () => {
            params = {
                idbank: 15,
                groupbank: "groupbank3"
            }
            const resultdelete = "success delete array bank";
            const mockcacheService = new CacheService();
            const mockBnksRepository = new BnksRepository();


            mockBnksRepository.findbankarr = jest.fn()
                .mockImplementation(() => Promise.resolve());
            mockBnksRepository.delbankar = jest.fn()
                .mockImplementation(() => Promise.resolve(resultdelete));
            mockcacheService.delete = jest.fn().mockResolvedValue();
            const delBanksGroupDataUsecase = new AddbnksUseCase({
                bnksRepository: mockBnksRepository,
                cacheServices: mockcacheService
            });
            const datasuccess = await delBanksGroupDataUsecase.delbankdataarr(params);

            expect(mockBnksRepository.findbankarr)
                .toBeCalledWith(params);
            expect(mockBnksRepository.delbankar)
                .toBeCalledWith(params);
            expect(datasuccess).toEqual(resultdelete);
            expect(mockcacheService.delete).toBeCalledWith(`namegroup:${params.groupbank}`);

        });
    });



});
