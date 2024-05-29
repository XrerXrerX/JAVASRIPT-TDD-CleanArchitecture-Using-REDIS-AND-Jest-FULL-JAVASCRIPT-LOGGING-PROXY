/* eslint-disable camelcase */
exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.createTable('ctlnk', {
        idctlnk: {
            type: 'SERIAL',
            primaryKey: true,
        },
        ctlnkname: {
            type: 'VARCHAR(128)',
            notNull: true,
        },
        ctlnkdmn: {
            type: 'VARCHAR(256)',
            notNull: true,
        },
        statusctlnk: {
            type: 'VARCHAR(8)',
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
    INSERT INTO ctlnk (ctlnkname , ctlnkdmn,statusctlnk ) VALUES
    ('link alternative1' ,'https://example.com/', '1'),
    ('link alternative2' ,'https://example.com/2', '1'),
    ('link alternative3' ,'https://example.com/3', '1')
`);
};

exports.down = (pgm) => {
    pgm.dropTable('ctlnk');
};
