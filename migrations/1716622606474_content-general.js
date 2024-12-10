/* eslint-disable camelcase */
exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.createTable('ctgeneral', {
        idnmwebst: {
            type: 'SERIAL',
            primaryKey: true,
        },
        nmwebsite: {
            type: 'VARCHAR(256)',
            notNull: true,
        },
        logrl: {
            type: 'VARCHAR(256)',
            notNull: true,
        },
        icrl: {
            type: 'VARCHAR(256)',
            notNull: true,
        },
        pkrl: {
            type: 'VARCHAR(256)',
            notNull: true,
        },
        rnntxt: {
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
    INSERT INTO ctgeneral (nmwebsite , logrl,icrl,pkrl,rnntxt ) VALUES
    ('globalbola' , 'global-bola-logo.webp' ,'global-bola-icon.webp', 'https://apkdownload.com/' , 'GLOBALBOLA SITUS RESMI | Situs Betting Parlay Terlengkap & Terpercaya | proses transaksi kurang dari 1 menit'   )
`);
};

exports.down = (pgm) => {
    pgm.dropTable('ctgeneral');
};
