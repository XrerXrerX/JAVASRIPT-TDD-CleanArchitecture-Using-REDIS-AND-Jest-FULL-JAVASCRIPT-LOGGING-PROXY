// const AddBnksDp = require('../../Domains/banks/entities/AddBnksDp');
const AddBnks = require('../../Domains/banks/entities/AddBnks');
const EditBnks = require('../../Domains/banks/entities/EditBnks');
const EditGroupBnks = require('../../Domains/banks/entities/EditGroupBnks');
const AddGroupBnks = require('../../Domains/banks/entities/AddGroupBnks');
const AddMasterBnks = require('../../Domains/banks/entities/AddMasterBnks');
const NotFoundError = require('../../Commons/exceptions/NotFoundError');



class AddbnksUseCase {
    constructor({ bnksRepository, cacheServices }) {
        this._bnksRepository = bnksRepository;
        this._cacheService = cacheServices;

    }

    // async execute(useCasePayload) {

    //     const databks = new AddBnksDp(useCasePayload);

    //     await this._bnksRepository.checkbnks(databks.norekxyxy, databks.namegroupxyzt, databks.xynamarekx);
    //     const namegroup = await this._bnksRepository.databnksdp(databks);
    //     await this._cacheService.delete(`namegroup:${namegroup}`);
    //     return namegroup;
    // }

    /**
 ********************************************** 
 * @param {masterbank}  
 * @returns 
 */


    async admasterbank(useCasePayload) {
        const payload = new AddMasterBnks(useCasePayload);
        await this._bnksRepository.chckmstr(payload.bnkmstrxyxyx);
        const data = await this._bnksRepository.addmstr(payload);
        await this._cacheService.delete(`namemaster:master`);
        return data;
    }

    async putmasterbank(useCasePayload, params) {
        const payload = new AddMasterBnks(useCasePayload);
        const data = await this._bnksRepository.putmstrbnk(payload, params.mstrbnks);
        await this._cacheService.delete(`namemaster:master`);

        return data;
    }
    async getdtmstr() {
        try {

            // mendapatkan catatan dari cache
            // await this._cacheService.delete(`namegroupex:${params.groupname}`);

            const result = await this._cacheService.get(`namemaster:master`);
            const dataresult = JSON.parse(result);
            return dataresult;
        } catch (error) {
            const dtbnksmstr = await this._bnksRepository.getmstrbnk();
            await this._cacheService.delete(`namemaster:master`);
            await this._cacheService.set(`namemaster:master`, JSON.stringify(dtbnksmstr));
            return dtbnksmstr;

        }
    }

    async delmasterdata(params) {
        await this._bnksRepository.findmstr(params.idbnkmaster);
        const data = await this._bnksRepository.delmstrbnk(params.idbnkmaster);
        await this._cacheService.delete(`namemaster:master`);
        return data;
    }
    /**
     ********************************************** 
     * @param {groupbank}  
     * @returns 
     */

    async addgrp(useCasePayload) {
        const addgroup = new AddGroupBnks(useCasePayload);
        const namegroup = await this._bnksRepository.addgrp(addgroup);
        await this._cacheService.delete(`group:group`);

        return namegroup;
    }

    async editgroupbnks(useCasePayload, params) {
        const payload = new AddGroupBnks(useCasePayload);
        const data = await this._bnksRepository.edtgrp(payload, params.namegroup);
        await this._cacheService.delete(`group:group`);

        return data;
    }
    async getgroup() {
        try {
            const result = await this._cacheService.get(`group:group`);

            const dataresult = JSON.parse(result);
            return dataresult;
        } catch (error) {
            const namegroup = await this._bnksRepository.getdtGroup();

            const formattedData = {};

            namegroup.forEach(group => {
                const { groupbank, idgroup, grouptype, min_dp, max_dp, min_wd, max_wd } = group;
                formattedData[groupbank] = { idgroup, grouptype, min_dp, max_dp, min_wd, max_wd };
            });



            await this._cacheService.delete(`group:group`);
            await this._cacheService.set(`group:group`, JSON.stringify(formattedData));
            return formattedData;
        }
    }
    async delgroupdata(params) {
        await this._bnksRepository.findgroup(params.idgroup);
        const data = await this._bnksRepository.delgroup(params.idgroup);
        await this._cacheService.delete(`group:group`);

        return data;
    }

    /**
 ********************************************** 
 * @param {bankdata}  
 * @returns 
 */
    async addbnkdt(useCasePayload) {
        const payload = new AddBnks(useCasePayload);
        await this._bnksRepository.chckbnks(payload);
        const databanks = await this._bnksRepository.addbnks(payload);
        databanks.namegroupxyzt.forEach(async (group) => {
            await this._cacheService.delete(`namegroup:${group}`);
        });
        return databanks;
    }


    async edtbank(useCasePayload, params) {
        const payload = new EditBnks(useCasePayload);
        const checkbank = await this._bnksRepository.chckedybnks(payload, params.nmbank);
        await this._bnksRepository.putbnks(payload, params.idbank);
        checkbank.namegroupxyzt.forEach(async (group) => {
            await this._cacheService.delete(`namegroup:${group}`);
        });

        return "Bank Edit Success !";
    }
    async edtbankgroup(useCasePayload, params) {
        const payload = new EditGroupBnks(useCasePayload);
        await this._bnksRepository.checkbankar(payload, params.idbank);
        await this._bnksRepository.editbankar(payload, params.idbank);
        await this._cacheService.delete(`namegroup:${payload.namegroupxyzt}`);

        return "Bank Edit Success !";
    }


    async getbankdt(params) {
        try {
            // mendapatkan catatan dari cache
            const result = await this._cacheService.get(`namegroup:${params.groupname}`);
            // await this._cacheService.delete(`namegroup:${params.groupname}`);
            const dataresult = JSON.parse(result);
            dataresult.headers = {
                'X-Data-Source': 'cache',
            };
            return dataresult;
        } catch (error) {
            const getbankdata = await this._bnksRepository.getbnks(params.groupname);

            const getgroupbankdata = await this._bnksRepository.getgroupbnks(params.groupname);

            const getmasterbankdata = await this._bnksRepository.getmasterbnks(params.groupname);

            const foundGroup = getgroupbankdata.find(group => group.groupbank === params.groupname);

            const bankbybankmaster = {};

            const groupedData = {};

            for (const master of getmasterbankdata) {
                const { bnkmstrxyxyx, ...datamaster } = master;

                bankbybankmaster[bnkmstrxyxyx] = {
                    url_logo: datamaster.urllogoxxyx, // Anda bisa mengisi URL logo bank dari 
                    statusxxyy: datamaster.statusxyxyy, // Anda bisa mengisi status dari 
                };
                bankbybankmaster[bnkmstrxyxyx];
            }

            for (const bank of getbankdata) {
                const { namegroupxyzt, masterbnkxyxt, ...bankData } = bank;
                for (const groupName of namegroupxyzt) {
                    if (groupName == foundGroup.groupbank) {

                        if (!groupedData[groupName]) {
                            groupedData[foundGroup.groupbank] = {};

                        }

                        if (!groupedData[foundGroup.groupbank][masterbnkxyxt]) {
                            groupedData[foundGroup.groupbank][masterbnkxyxt] = {
                                data_bank: []
                            };
                        }

                        // Jika ya, masukkan data bankbybankmaster ke dalam groupedData
                        groupedData[foundGroup.groupbank][masterbnkxyxt] = {
                            ...bankbybankmaster[masterbnkxyxt],
                            data_bank: groupedData[foundGroup.groupbank][masterbnkxyxt].data_bank,
                        };
                        groupedData[foundGroup.groupbank][masterbnkxyxt].data_bank.push(bankData);

                    }

                }
            }

            await this._cacheService.delete(`namegroup:${params.groupname}`);
            await this._cacheService.set(`namegroup:${params.groupname}`, JSON.stringify(groupedData));
            return groupedData;


            // const bankbybankmaster = {};
            // const groupedData = {};

            // for (const master of getmasterbankdata) {
            //     const { bnkmstrxyxyx, ...datamaster } = master;
            //     bankbybankmaster[bnkmstrxyxyx] = {
            //         url_logo: datamaster.urllogoxxyx, // Anda bisa mengisi URL logo bank dari 
            //         statusxxyy: datamaster.statusxyxyy, // Anda bisa mengisi status dari getmasterbankdata
            //     };
            //     bankbybankmaster[bnkmstrxyxyx];
            // }

            // // Memasukkan data dari getbankdata ke dalam struktur yang diinginkan
            // for (const bank of getbankdata) {
            //     const { namegroupxyzt, masterbnkxyxt, ...bankData } = bank;
            //     if (!groupedData[namegroupxyzt]) {
            //         groupedData[getgroupbankdata[0].groupbank] = {};
            //     }
            //     if (!groupedData[getgroupbankdata[0].groupbank][masterbnkxyxt]) {
            //         groupedData[getgroupbankdata[0].groupbank][masterbnkxyxt] = {
            //             data_bank: []
            //         };
            //     }
            //     // Jika ya, masukkan data bankbybankmaster ke dalam groupedData
            //     groupedData[getgroupbankdata[0].groupbank][masterbnkxyxt] = {
            //         ...bankbybankmaster[masterbnkxyxt],
            //         data_bank: groupedData[getgroupbankdata[0].groupbank][masterbnkxyxt].data_bank,
            //     };
            //     groupedData[getgroupbankdata[0].groupbank][masterbnkxyxt].data_bank.push(bankData);
            // }


            // Memasukkan data ke dalam objek hasil
            // result[getgroupbankdata.groupbank] = groupedData;


        };
    }

    async getbankdtex(params) {
        // try {

        //     // mendapatkan catatan dari cache
        //     // await this._cacheService.delete(`namegroupex:${params.groupname}`);
        //     // await this._cacheService.delete(`namegroupex:${params.groupname}`);

        //     const result = await this._cacheService.get(`namegroupex:${params.groupname}`);
        //     const dataresult = JSON.parse(result);

        //     dataresult.headers = {
        //         'X-Data-Source': 'cache',
        //     };
        //     return dataresult;
        // } catch (error) {
        const getbankdata = await this._bnksRepository.getbnkex(params.groupname);
        const getgroupbankdata = await this._bnksRepository.getgroupbnkex(params.groupname);
        const getmasterbankdata = await this._bnksRepository.getmasterbnks(params.groupname);
        const tmpgroup = {};
        for (const groupdt of getgroupbankdata) {
            if (groupdt.groupbank != params.groupname) {
                tmpgroup[groupdt.groupbank] = groupdt; // Memasukkan data yang memenuhi kondisi ke dalam tmpgroup
            }
        }
        const bankbybankmaster = {};
        const groupedData = {};

        for (const master of getmasterbankdata) {
            const { bnkmstrxyxyx, ...datamaster } = master;

            bankbybankmaster[bnkmstrxyxyx] = {
                url_logo: datamaster.urllogoxxyx, // Anda bisa mengisi URL logo bank dari 
                statusxxyy: datamaster.statusxyxyy, // Anda bisa mengisi status dari 
            };
            bankbybankmaster[bnkmstrxyxyx];
        }

        getbankdata.forEach(bank => {
            if (!bank.namegroupxyzt.includes(params.groupname)) {
                bank.namegroupxyzt.forEach(group => {
                    const { namegroupxyzt, masterbnkxyxt, ...bankData } = bank;
                    if (!groupedData[group]) {
                        groupedData[group] = {};
                    }
                    if (!groupedData[group][bank.masterbnkxyxt]) {
                        groupedData[group][bank.masterbnkxyxt] = {
                            data_bank: []
                        };
                    }
                    groupedData[group][bank.masterbnkxyxt] = {
                        ...bankbybankmaster[masterbnkxyxt],
                        data_bank: groupedData[group][bank.masterbnkxyxt].data_bank,
                    };

                    groupedData[group][bank.masterbnkxyxt].data_bank.push(bankData);
                });
            }
        });
        // console.log(params.groupname);
        // await this._cacheService.delete(`namegroupex:${params.groupname}`);
        // await this._cacheService.set(`namegroupex:${params.groupname}`, JSON.stringify(groupedData));
        return groupedData;
        // };
    }

    async delbankdata(params) {
        const groupbank = await this._bnksRepository.findbank(params.idbank);
        const result = await this._bnksRepository.delbnks(params);
        await this._cacheService.delete(`namegroup:${groupbank}`);
        return result;
    }
    async delbankdataarr(params) {
        await this._bnksRepository.findbankarr(params);

        const result = await this._bnksRepository.delbankar(params);
        await this._cacheService.delete(`namegroup:${params.groupbank}`);
        return result;
    }

}
module.exports = AddbnksUseCase;