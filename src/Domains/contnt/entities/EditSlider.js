class EditSlider {
    constructor(payload) {
        this._verifyPayload(payload);
        const { ctsldrur, ttlectsldr, trgturctsldr, statusctsldr } = payload;
        this.ctsldrur = ctsldrur;
        this.ttlectsldr = ttlectsldr;
        this.trgturctsldr = trgturctsldr;
        this.statusctsldr = statusctsldr;


    }

    _verifyPayload({ ctsldrur, ttlectsldr, trgturctsldr, statusctsldr }) {
        if (!ctsldrur || !ttlectsldr || !trgturctsldr || !statusctsldr) {
            throw new Error('EDIT_SLIDER.NOT_CONTAIN_NEEDED_PROPERTY');
        }

        if (typeof ctsldrur !== 'string' || typeof ttlectsldr !== 'string' || typeof trgturctsldr !== 'string' || typeof statusctsldr !== 'string') {
            throw new Error('EDIT_SLIDER.NOT_MEET_DATA_TYPE_SPECIFICATION');
        }

        if (!ttlectsldr.match(/^[a-zA-Z0-9\s]+$/) || !statusctsldr.match(/^[0-9]+$/)) {
            throw new Error('EDIT_SLIDER.CONTAIN_RESTRICTED_CHARACTER');
        }
    }
}

module.exports = EditSlider;
