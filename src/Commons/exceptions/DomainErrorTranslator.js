const InvariantError = require('./InvariantError');
const NotFoundError = require('./NotFoundError');
const AuthenticationError = require('./AuthenticationError');
const AuthorizationError = require('./AuthorizationError');

const DomainErrorTranslator = {
  translate(error) {
    return DomainErrorTranslator._directories[error.message] || error;
  },
};

DomainErrorTranslator._directories = {
  'REGISTER_USER.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('register fail, check your input !'),
  'REGISTER_USER.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('register fail, type data not match !'),
  'REGISTER_USER.USERNAME_MORE_LIMIT_CHAR': new InvariantError('register fail, username too long !'),
  'REGISTER_USER.USERNAME_LESS_LIMIT_CHAR': new InvariantError('register fail , username too short !'),
  'REGISTER_USER.BANKUSER_LIMIT_CHAR': new InvariantError('register fail, bank owner too short !'),
  'REGISTER_USER.BANKNUMBER_MORE_LIMIT_CHAR': new InvariantError('register fail , bank number too long !'),
  'REGISTER_USER.BANKNUMBER_LESS_LIMIT_CHAR': new InvariantError('register fail , bank number too short !'),
  'REGISTER_USER.PHONENUMBER_MORE_LIMIT_CHAR': new InvariantError('register fail , phone number too long !'),
  'REGISTER_USER.PHONENUMBER_LESS_LIMIT_CHAR': new InvariantError('register fail , phone number too short !'),
  'REGISTER_USER.REGISTER_CONTAIN_RESTRICTED_CHARACTER': new InvariantError('register fail , input restricted !'),

  'REGISTERED_USER.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('register fail in the moment processing some data missing !'),
  'REGISTERED_USER.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('register fail in the moment processing some data restricted !'),

  'REGISTER_USER_LOG.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('register loging fail while syncing input data !'),
  'REGISTER_USER_LOG.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('register loging fail type data not match !'),
  'REGISTER_USER_LOG.USERNAME_MORE_LIMIT_CHAR': new InvariantError('register loging fail username too long !'),
  'REGISTER_USER_LOG.USERNAME_LESS_LIMIT_CHAR': new InvariantError('register loging fail username too short !'),
  'REGISTER_USER_LOG.REGISTER_CONTAIN_RESTRICTED_CHARACTER': new InvariantError('register loging fail input restricted !'),

  'USER_LOGIN.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('username or password need to be input !'),
  'USER_LOGIN.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('username or password must be string !'),

  'REFRESH_AUTHENTICATION_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN': new InvariantError('harus mengirimkan token refresh'),
  'REFRESH_AUTHENTICATION_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('refresh token harus string'),
  'DELETE_AUTHENTICATION_USE_CASE.NOT_CONTAIN_REFRESH_TOKEN': new InvariantError('harus mengirimkan token refresh'),
  'DELETE_AUTHENTICATION_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('refresh token harus string'),
  'DELETE_AUTHENTICATION_USE_CASE.PAYLOAD_NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('refresh token harus string'),

  'ADD_APK.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('field settings must be fill , fail !'),
  'ADD_APK.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('type data apk settings not match'),
  'ADD_APK.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('restricted input apk settings , watch your input !'),
  'ADD_EVENT_APK.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('event field must be fill , fail'),
  'ADD_EVENT_APK.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('event type data not match'),
  'ADD_EVENT_APK.REGISTER_CONTAIN_RESTRICTED_CHARACTER': new InvariantError('event restricted input watch your input !'),

  'ADD_PEMBERITAHUAN_APK.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('field notice must be fill , fail !'),
  'ADD_PEMBERITAHUAN_APK.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('notice type data not match'),
  'ADD_PEMBERITAHUAN_APK.PEMBERITAHUAN_TITLE_LIMIT_CHAR': new InvariantError('title notice too short'),
  'ADD_PEMBERITAHUAN_APK.PEMBERITAHUAN_CONTENT_LIMIT_CHAR': new InvariantError('content notice too long'),

  'GET_DATA.NOT_CONTAIN_NEEDED_PROPERTY': new NotFoundError('data not found'),

  'ADD_BANK.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('data bank tidak boleh kosong'),
  'ADD_BANK.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('type data input salah, cek lagi !'),
  'ADD_BANK.REGISTER_CONTAIN_RESTRICTED_CHARACTER': new InvariantError('masukkan character yang sesuai !'),


  'UPDATED_USER.UPDATED_CONTAIN_RESTRICTED_CHARACTER': new InvariantError('masukkan character yang sesuai !'),
  'UPDATED_USER.RESTRICTED_LIMIT_CHARACTER': new InvariantError('Character melebihi batas maksimum !'),
  'UPDATED_USER.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('Input tipe data yang sesuai !'),
  'UPDATED_USER.NOT_CONTAIN_NEEDED_PROPERTY': new NotFoundError('isi semua fill yang sesuai !'),

  'ADD_GROUP_BANK.UPDATED_CONTAIN_RESTRICTED_CHARACTER': new InvariantError('masukkan character yang sesuai !'),
  'ADD_GROUP_BANK.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('Input tipe data yang sesuai !'),
  'ADD_GROUP_BANK.NOT_CONTAIN_NEEDED_PROPERTY': new NotFoundError('isi semua fill yang sesuai !'),

  'ADD_MASRTER_BANK.REGISTER_CONTAIN_RESTRICTED_CHARACTER': new InvariantError('masukkan character yang sesuai !'),
  'ADD_MASRTER_BANK.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('Input tipe data yang sesuai !'),
  'ADD_MASRTER_BANK.NOT_CONTAIN_NEEDED_PROPERTY': new NotFoundError('isi semua fill yang sesuai !'),

  'EDIT_CONTENT.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('data meta tag cannot empty'),
  'EDIT_CONTENT.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('wrong type data input, check again !'),

  'ADD_SITEMAP.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('data sitemap cannot empty'),
  'ADD_SITEMAP.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('wrong type data input, check again !'),
  'ADD_SITEMAP.CONTAIN_RESTRICTED_CHARACTER': new InvariantError('restricted input , watch your input !'),

  'EDIT_GENERAL.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('fill cannot empty'),
  'EDIT_GENERAL.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('wrong type data input, check again !'),
  'EDIT_GENERAL.CONTAIN_RESTRICTED_CHARACTER': new InvariantError('restricted input , watch your input !'),

  'EDIT_SLIDER.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('fill cannot empty'),
  'EDIT_SLIDER.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('wrong type data input, check again !'),
  'EDIT_SLIDER.CONTAIN_RESTRICTED_CHARACTER': new InvariantError('restricted input , watch your input !'),

  'EDIT_LINK.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('fill cannot empty'),
  'EDIT_LINK.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('wrong type data input, check again !'),
  'EDIT_LINK.CONTAIN_RESTRICTED_CHARACTER': new InvariantError('restricted input , watch your input !'),

  'EDIT_SOCMED.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('fill cannot empty'),
  'EDIT_SOCMED.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('wrong type data input, check again !'),
  'EDIT_SOCMED.CONTAIN_RESTRICTED_CHARACTER': new InvariantError('restricted input , watch your input !'),

  'EDIT_PROMO.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('fill cannot empty'),
  'EDIT_PROMO.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('wrong type data input, check again !'),
  'EDIT_PROMO.CONTAIN_RESTRICTED_CHARACTER': new InvariantError('restricted input , watch your input !'),

  'EDIT_MT.NOT_CONTAIN_NEEDED_PROPERTY': new InvariantError('fill cannot empty'),
  'EDIT_MT.NOT_MEET_DATA_TYPE_SPECIFICATION': new InvariantError('wrong type data input, check again !'),
  'EDIT_MT.CONTAIN_RESTRICTED_CHARACTER': new InvariantError('restricted input , watch your input !'),
};

module.exports = DomainErrorTranslator;
