class AddMemo {
    constructor(payload) {
        this._verifyPayload(payload);

        const { statustype, statuspriority, subject, memo } = payload;

        this.statustype = statustype;
        this.statuspriority = statuspriority;
        this.subject = subject;
        this.memo = memo;

    }

    _verifyPayload({ statustype, statuspriority, subject, memo }) {
        if (!statustype || !statuspriority || !subject || !memo) {
            throw new Error('ADD_MEMO.NOT_CONTAIN_NEEDED_PROPERTY');
        }

        if (typeof statustype != 'number' || typeof statuspriority != 'number' || typeof subject !== 'string' || typeof memo !== 'string') {
            throw new Error('ADD_MEMO.NOT_MEET_DATA_TYPE_SPECIFICATION');
        }


        if (!subject.match(/^[\w.,\s\-%]+$/) || !memo.match(/^[\w.,\s\n\-%]+$/)) {
            throw new Error('ADD_MEMO.ADD_CONTAIN_RESTRICTED_CHARACTER');
        }
    }
}

module.exports = AddMemo;
