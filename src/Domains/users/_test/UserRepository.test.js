const UserRepository = require('../UserRepository');

describe('UserRepository interface', () => {
    it('should throw error when invoke abstract behavior', async () => {
        // Arrange
        const userRepository = new UserRepository();

        // Action and Assert
        await expect(userRepository.addUser({})).rejects.toThrowError('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED');
        await expect(userRepository.addLogBase({})).rejects.toThrowError('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED');
        await expect(userRepository.addEventUser({})).rejects.toThrowError('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED');
        await expect(userRepository.addReffUser({})).rejects.toThrowError('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED');

        await expect(userRepository.verifyAvailableUsername('')).rejects.toThrowError('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED');
        await expect(userRepository.verifybankuser('')).rejects.toThrowError('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED');
        await expect(userRepository.verifydoublebankuser('')).rejects.toThrowError('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED');
        await expect(userRepository.getPasswordByUsername('')).rejects.toThrowError('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED');
        await expect(userRepository.getIdByUsername('')).rejects.toThrowError('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED');
        await expect(userRepository.getDataBankByUsername()).rejects.toThrowError('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED');
        await expect(userRepository.UDataUser()).rejects.toThrowError('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED');
        await expect(userRepository.Uvipuser()).rejects.toThrowError('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED');
        await expect(userRepository.GetDataByUsername()).rejects.toThrowError('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED');
        await expect(userRepository.changepssw()).rejects.toThrowError('USER_REPOSITORY.METHOD_NOT_IMPLEMENTED');
    });
});
