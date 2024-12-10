class NewAuth {
  constructor(payload) {
    this._verifyPayload(payload);

    this.accessToken = payload.accessToken;
    this.refreshToken = payload.refreshToken;
    this.apkToken = payload.apkToken;
  }

  _verifyPayload(payload) {
    const { accessToken, refreshToken, apkToken } = payload;

    if (!accessToken || !refreshToken || !apkToken) {
      throw new Error('NEW_AUTH.NOT_CONTAIN_NEEDED_PROPERTY');
    }

    if (typeof accessToken !== 'string' || typeof refreshToken !== 'string' || typeof apkToken !== 'string') {
      throw new Error('NEW_AUTH.NOT_MEET_DATA_TYPE_SPECIFICATION');
    }
  }
}

module.exports = NewAuth;
