class EditLink {
    constructor(payload) {
        this._verifyPayload(payload);
        const { ctlnkname, ctlnkdmn, statusctlnk } = payload;
        this.ctlnkname = ctlnkname;
        this.ctlnkdmn = ctlnkdmn;
        this.statusctlnk = statusctlnk;



    }

    _verifyPayload({ ctlnkname, ctlnkdmn, statusctlnk }) {
        if (!ctlnkname || !ctlnkdmn || !statusctlnk) {
            throw new Error('EDIT_LINK.NOT_CONTAIN_NEEDED_PROPERTY');
        }

        if (typeof ctlnkname !== 'string' || typeof ctlnkdmn !== 'string' || typeof statusctlnk !== 'string') {
            throw new Error('EDIT_LINK.NOT_MEET_DATA_TYPE_SPECIFICATION');
        }

        if (!ctlnkname.match(/^[a-zA-Z0-9\s]+$/) || !statusctlnk.match(/^[0-9]+$/)) {
            throw new Error('EDIT_LINK.CONTAIN_RESTRICTED_CHARACTER');
        }
    }
}

module.exports = EditLink;
