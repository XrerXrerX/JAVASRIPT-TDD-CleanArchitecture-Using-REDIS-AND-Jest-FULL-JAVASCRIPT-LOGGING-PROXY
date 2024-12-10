/* eslint-disable camelcase */
exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.createTable('databnk', {
        idbank: {
            type: 'SERIAL',
            primaryKey: true,
        },
        namegroupxyzt: {
            type: 'VARCHAR(30)[]', // Definisi kolom sebagai array dari VARCHAR
            notNull: true,
        },
        masterbnkxyxt: {
            type: 'VARCHAR(30)',
            notNull: true,
        },
        namebankxxyy: {
            type: 'VARCHAR(30)',
            notNull: true,
        },
        yyxxmethod: {
            type: 'VARCHAR(20)',
            notNull: true,
        },
        xynamarekx: {
            type: 'VARCHAR(35)',
            notNull: true,
        },
        norekxyxy: {
            type: 'VARCHAR(20)',
            notNull: true,
        },
        barcodexrxr: {
            type: 'VARCHAR(130)',
            notNull: true,
            default: false // Menambahkan nilai default

        },
        zwzwshowbarcode: {
            type: 'BOOLEAN',
            notNull: true,
            default: false // Menambahkan nilai default

        },
        created_at: {
            type: 'TEXT',
        },
        updated_at: {
            type: 'TEXT',
        },
    });
    pgm.sql(`
    INSERT INTO databnk (namegroupxyzt, masterbnkxyxt,namebankxxyy,yyxxmethod,xynamarekx,norekxyxy,barcodexrxr) VALUES
    ('{"groupbank1","groupbankwd1"}', 'bca' ,'bca1' , 'bank' , 'fernanda putri oktavia' , '1746490089', '0'),
    ('{"groupbank1","groupbankwd1"}', 'mandiri' ,'mandiri1' , 'bank' , 'fernanda putri oktavia' , '1746490089', '0')
`);
};

exports.down = (pgm) => {
    pgm.dropTable('databnk');
};
