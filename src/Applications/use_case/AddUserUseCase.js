const RegisterUser = require('../../Domains/users/entities/RegisterUser');
const UpdateDataUser = require('../../Domains/users/entities/UpdateDataUser');
const ChangePassw = require('../../Domains/users/entities/ChangePassw');


class AddUserUseCase {
    constructor({ userRepository, passwordHash, cacheServices }) {
        this._userRepository = userRepository;
        this._passwordHash = passwordHash;
        this._cacheService = cacheServices;

    }

    async execute(useCasePayload) {
        const registerUser = new RegisterUser(useCasePayload);
        await this._userRepository.verifydoublebankuser(registerUser);
        await this._userRepository.verifyAvailableUsername(registerUser);
        await this._userRepository.verifybankuser(registerUser);
        const userlogbase = await this._userRepository.addUser(registerUser);
        this._userRepository.addEventUser(userlogbase.xyuseridxy);
        // this._userRepository.addReffUser(userlogbase.xyuseridxy);
        userlogbase.password = await this._passwordHash.hash(registerUser.password);
        return this._userRepository.addLogBase(userlogbase);
    }


    async getdatabyu(params) {
        const dataux = await this._userRepository.GetDataByUsername(params.xxuserxx);
        return dataux;
    }


    async UDataUser(useCasePayload, params) {
        const updatedData = new UpdateDataUser(useCasePayload);
        await this._userRepository.UDataUser(updatedData, params);
        await this._cacheService.delete(`datauser:${params.xyusernamexxy}`);

        return 'data berhasil di updated !';
    }

    async Uvipuser(useCasePayload, params) {
        await this._userRepository.Uvipuser(useCasePayload, params);
        await this._cacheService.delete(`datauser:${params.xyusernamexxy}`);
        return 'data berhasil di updated !';
    }

    async changepssw(useCasePayload, params) {
        const { password } = new ChangePassw(useCasePayload);

        const restpass = await this._passwordHash.hash(password);
        await this._userRepository.changepssw(restpass, params.xyusernamexxy);
        return 'password berhasil diubah !';
    }


}

module.exports = AddUserUseCase;