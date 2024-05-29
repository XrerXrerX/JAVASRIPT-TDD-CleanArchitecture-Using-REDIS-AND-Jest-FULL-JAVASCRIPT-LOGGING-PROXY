class EditContent {
    constructor(payload) {
        this._verifyPayload(payload);
        const { mttag, artcl, scrptlvc } = payload;
        this.mttag = mttag;
        this.artcl = artcl;
        this.scrptlvc = scrptlvc;

    }

    _verifyPayload({ mttag, artcl, scrptlvc }) {
        if (!mttag || !artcl || !scrptlvc) {
            throw new Error('EDIT_CONTENT.NOT_CONTAIN_NEEDED_PROPERTY');
        }

        if (typeof mttag !== 'string' || typeof artcl !== 'string' || typeof scrptlvc !== 'string') {
            throw new Error('EDIT_CONTENT.NOT_MEET_DATA_TYPE_SPECIFICATION');
        }
    }
}

module.exports = EditContent;
