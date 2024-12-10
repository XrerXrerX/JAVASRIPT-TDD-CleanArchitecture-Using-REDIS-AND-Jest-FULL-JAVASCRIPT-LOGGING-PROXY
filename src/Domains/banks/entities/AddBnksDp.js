class AddBnksDp {
    constructor(payload) {
        this._verifyPayload(payload);

        const { namegroupxyzt, namebankxxyy, statusxxyy, yyxxmethod, xynamarekx, norekxyxy, barcodexrxr, zwzwshowbarcode } = payload;

        this.namegroupxyzt = namegroupxyzt;
        this.namebankxxyy = namebankxxyy;
        this.statusxxyy = statusxxyy;
        this.yyxxmethod = yyxxmethod;
        this.xynamarekx = xynamarekx;
        this.norekxyxy = norekxyxy;
        this.barcodexrxr = barcodexrxr;
        this.zwzwshowbarcode = zwzwshowbarcode;
    }

    _verifyPayload({ namegroupxyzt, namebankxxyy, statusxxyy, yyxxmethod, xynamarekx, norekxyxy, barcodexrxr, zwzwshowbarcode }) {
        if (!namegroupxyzt || !namebankxxyy || !statusxxyy || !yyxxmethod || !xynamarekx || !norekxyxy || !barcodexrxr || !zwzwshowbarcode) {
            throw new Error('ADD_DP_BANK.NOT_CONTAIN_NEEDED_PROPERTY');
        }

        if (typeof namegroupxyzt !== 'string' || typeof namebankxxyy !== 'string' || typeof yyxxmethod !== 'string' || typeof xynamarekx !== 'string' || typeof norekxyxy !== 'string' || typeof barcodexrxr !== 'string' || typeof statusxxyy != 'number' || typeof zwzwshowbarcode != 'number') {
            throw new Error('ADD_DP_BANK.NOT_MEET_DATA_TYPE_SPECIFICATION');
        }


        if (!namegroupxyzt.match(/^[a-zA-Z0-9]+$/) || !namebankxxyy.match(/^[A-Za-z\s]+$/) || !yyxxmethod.match(/^[A-Za-z\s]+$/) || !xynamarekx.match(/^[A-Za-z\s]+$/) || !norekxyxy.match(/^[0-9]+$/) || !barcodexrxr.match(/^[a-zA-Z0-9\-_~:/?#\[\]@!$&'()*+,;=.]+$/)) {
            throw new Error('ADD_DP_BANK.REGISTER_CONTAIN_RESTRICTED_CHARACTER');
        }
    }
}

module.exports = AddBnksDp;
