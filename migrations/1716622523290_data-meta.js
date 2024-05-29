/* eslint-disable camelcase */
exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.createTable('datameta', {
        iddtmeta: {
            type: 'SERIAL',
            primaryKey: true,
        },
        mttag: {
            type: 'TEXT',
            notNull: true,
        },
        artcl: {
            type: 'TEXT',
            notNull: true,
        },
        scrptlvc: {
            type: 'TEXT',
            notNull: true,
        },

        created_at: {
            type: 'TEXT',
        },
        updated_at: {
            type: 'TEXT',
        },
    });
    pgm.sql(`
    INSERT INTO datameta (mttag, artcl,scrptlvc) VALUES
    ('<h1> welcome metatag</h1>' , '<h1>hai terimakasih sudah bergabung. silahkan cek promosi kami dan lakukan deposit untuk mulai bermain yah .</h1>' , '<h1>https://livcchat.com</h1>' )
`);
};

exports.down = (pgm) => {
    pgm.dropTable('datameta');
};
