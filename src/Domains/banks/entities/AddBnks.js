class AddBnks {
    constructor(payload) {
        this._verifyPayload(payload);

        const { namegroupxyzt, namebankxxyy, masterbnkxyxt, yyxxmethod, xynamarekx, norekxyxy, barcodexrxr } = payload;

        this.namegroupxyzt = namegroupxyzt;
        this.namebankxxyy = namebankxxyy;
        this.masterbnkxyxt = masterbnkxyxt;
        this.yyxxmethod = yyxxmethod;
        this.xynamarekx = xynamarekx;
        this.norekxyxy = norekxyxy;
        this.barcodexrxr = barcodexrxr;
    }

    _verifyPayload({ namegroupxyzt, namebankxxyy, masterbnkxyxt, yyxxmethod, xynamarekx, norekxyxy, barcodexrxr }) {
        if (!namegroupxyzt || !namebankxxyy || !masterbnkxyxt || !yyxxmethod || !xynamarekx || !norekxyxy || !barcodexrxr) {
            throw new Error('ADD_BANK.NOT_CONTAIN_NEEDED_PROPERTY');
        }

        if (typeof namebankxxyy !== 'string' || typeof yyxxmethod !== 'string' || typeof xynamarekx !== 'string' || typeof norekxyxy !== 'string' || typeof barcodexrxr !== 'string' || typeof masterbnkxyxt != 'string') {
            throw new Error('ADD_BANK.NOT_MEET_DATA_TYPE_SPECIFICATION');
        }

        for (const name of namegroupxyzt) {
            if (typeof name !== 'string') {
                throw new Error('ADD_BANK.NOT_MEET_DATA_TYPE_SPECIFICATION');
            }
            if (!name.match(/^[a-zA-Z0-9]+$/)) {
                throw new Error('ADD_BANK.REGISTER_CONTAIN_RESTRICTED_CHARACTER');
            }
        }


        if (!masterbnkxyxt.match(/^[a-zA-Z0-9]+$/) || !namebankxxyy.match(/^[A-Za-z0-9\s]+$/) || !yyxxmethod.match(/^[A-Za-z\s]+$/) || !xynamarekx.match(/^[A-Za-z\s]+$/) || !norekxyxy.match(/^[0-9]+$/) || !barcodexrxr.match(/^[a-zA-Z0-9\-_~:/?#\[\]@!$&'()*+,;=.]+$/)) {
            throw new Error('ADD_BANK.REGISTER_CONTAIN_RESTRICTED_CHARACTER');
        }
    }
}

module.exports = AddBnks;
