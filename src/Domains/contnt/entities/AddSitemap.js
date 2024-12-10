class AddSitemap {
    constructor(payload) {
        this._verifyPayload(payload);
        const { urpage } = payload;
        this.urpage = urpage;

    }

    _verifyPayload({ urpage }) {
        if (!urpage) {
            throw new Error('ADD_SITEMAP.NOT_CONTAIN_NEEDED_PROPERTY');
        }

        if (typeof urpage !== 'string') {
            throw new Error('ADD_SITEMAP.NOT_MEET_DATA_TYPE_SPECIFICATION');
        }

        if (!urpage.match(/^[a-zA-Z0-9\-_]+$/)) {
            throw new Error('ADD_SITEMAP.CONTAIN_RESTRICTED_CHARACTER');
        }
    }
}

module.exports = AddSitemap;
