/* eslint-disable camelcase */
exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.createTable('stmp', {
        idstmp: {
            type: 'SERIAL',
            primaryKey: true,
        },
        urpage: {
            type: 'VARCHAR(50)',
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
    INSERT INTO stmp (urpage , created_at,updated_at ) VALUES
    ('home' , '2024-05-25T13:52:28.438Z' ,'2024-05-25T13:52:28.438Z'  )
`);
};

exports.down = (pgm) => {
    pgm.dropTable('stmp');
};
