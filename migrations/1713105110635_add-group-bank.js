/* eslint-disable camelcase */
exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.createTable('mastergroup', {
        idgroup: {
            type: 'SERIAL',
            primaryKey: true,
        },
        groupbank: {
            type: 'VARCHAR(35)',
            notNull: true,
            unique: true,

        },
        grouptype: {
            type: 'INTEGER', // Menggunakan tipe INTEGER untuk grouptype
            notNull: true,
        },
        min_dp: {
            type: 'INTEGER',
        },
        max_dp: {
            type: 'INTEGER',
        },
        min_wd: {
            type: 'INTEGER',
        },
        max_wd: {
            type: 'INTEGER',
        },
    });
    pgm.sql(`
    INSERT INTO mastergroup (groupbank, grouptype,min_dp,max_dp,min_wd,max_wd) VALUES
    ('groupbank1', 1,10 ,2500,30,50000),
    ('nongroup', 1,10 ,2500,30,50000),
    ('groupbankwd1', 1,10 ,2500,30,50000),
    ('nongroupwd', 1,10 ,2500,30,50000)
`);
};

exports.down = (pgm) => {
    pgm.dropTable('mastergroup');
};