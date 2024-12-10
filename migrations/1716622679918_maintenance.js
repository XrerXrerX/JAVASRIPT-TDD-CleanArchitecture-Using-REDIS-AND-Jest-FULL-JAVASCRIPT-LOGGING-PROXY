/* eslint-disable camelcase */
exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.createTable('mtncnc', {
        idctmtncnc: {
            type: 'SERIAL',
            primaryKey: true,
        },
        stsmtncnc: {
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
    INSERT INTO mtncnc (stsmtncnc) VALUES
    ('1')
`);
};

exports.down = (pgm) => {
    pgm.dropTable('mtncnc');
};
