/* eslint-disable camelcase */
exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.createTable('ctprm', {
        idctprm: {
            type: 'SERIAL',
            primaryKey: true,
        },
        ctprmur: {
            type: 'VARCHAR(256)',
            notNull: true,
        },
        ttlectprm: {
            type: 'VARCHAR(256)',
            notNull: true,
        },
        trgturctprm: {
            type: 'VARCHAR(256)',
            notNull: true,
        },
        dskprm: {
            type: 'TEXT',
            notNull: true,
        },
        pssprm: {
            type: 'VARCHAR(8)',
            notNull: true,
        },
        statusctprm: {
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
    INSERT INTO ctprm (ctprmur , ttlectprm , trgturctprm , dskprm , pssprm , statusctprm ) VALUES
    ('https://example.com/' , 'example title' ,'https://example.com/',  'example title' ,'1','1'),
    ('https://example.com/2' , 'example title' ,'https://example.com/2', 'example title' ,'1','1'),
    ('https://example.com/3' , 'example title' ,'https://example.com/3','example title' ,'1', '1')
`);
};

exports.down = (pgm) => {
    pgm.dropTable('ctprm');
};
