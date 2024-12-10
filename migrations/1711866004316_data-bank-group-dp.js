/* eslint-disable camelcase */
exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.createTable('datagroupdp', {
        idbank: {
            type: 'SERIAL',
            primaryKey: true,
        },
        namegroupxyzt: {
            type: 'VARCHAR(30)',
            notNull: true,
        },
        namebankxxyy: {
            type: 'VARCHAR(30)',
            notNull: true,
        },
        statusxxyy: {
            type: 'INTEGER',
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
        },
        zwzwshowbarcode: {
            type: 'INTEGER',
            notNull: true,
        },
        created_at: {
            type: 'TEXT',
            notNull: true,
        },
        updated_at: {
            type: 'TEXT',
        },
    });
};

exports.down = (pgm) => {
    pgm.dropTable('datagroupdp');
};
