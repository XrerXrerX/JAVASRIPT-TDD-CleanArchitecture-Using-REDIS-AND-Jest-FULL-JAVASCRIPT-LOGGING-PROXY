/* eslint-disable camelcase */
exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.createTable('ctsldr', {
        idctsldr: {
            type: 'SERIAL',
            primaryKey: true,
        },
        ctsldrur: {
            type: 'VARCHAR(256)',
            notNull: true,
        },
        ttlectsldr: {
            type: 'VARCHAR(256)',
            notNull: true,
        },
        trgturctsldr: {
            type: 'VARCHAR(256)',
            notNull: true,
        },
        statusctsldr: {
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
    INSERT INTO ctsldr (ctsldrur , ttlectsldr,trgturctsldr,statusctsldr ) VALUES
    ('https://example.com/' , 'example title' ,'https://example.com/', '1'),
    ('https://example.com/2' , 'example title' ,'https://example.com/2', '1'),
    ('https://example.com/3' , 'example title' ,'https://example.com/3', '1')
`);
};

exports.down = (pgm) => {
    pgm.dropTable('ctsldr');
};
