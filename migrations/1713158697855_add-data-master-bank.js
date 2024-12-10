/* eslint-disable camelcase */
exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.createTable('masterbank', {
        idbnkmaster: {
            type: 'SERIAL',
            primaryKey: true,
        },
        bnkmstrxyxyx: {
            type: 'VARCHAR(35)',
            notNull: true,
            unique: true,
        },
        urllogoxxyx: {
            type: 'VARCHAR(130)',
            notNull: true,
        },
        statusxyxyy: {
            type: 'INTEGER',
            notNull: true,
            default: 1,
        },
        wdstatusxyxyy: {
            type: 'INTEGER',
            notNull: true,
            default: 1,
        },
        created_at: {
            type: 'TEXT',
        },
        updated_at: {
            type: 'TEXT',
        },
    });
    pgm.sql(`
    INSERT INTO masterbank (bnkmstrxyxyx, urllogoxxyx,statusxyxyy,wdstatusxyxyy) VALUES
    ('bca', 'bca.webp',1,1),
    ('bni','bni.webp', 1,1),
    ('bri','bri.webp', 1,1),
    ('mandiri','mandiri.webp', 2,1),
    ('cimb','cimb.webp', 1,1),
    ('danamon','danamon.webp', 1,1),
    ('panin','panin.webp', 1,1),
    ('permata','permata.webp', 1,1),
    ('bsi','bsi.webp', 1,1),
    ('dana','dana.webp', 1,1),
    ('gopay','gopay.webp', 1,1),
    ('ovo','ovo.webp', 1,1),
    ('pulsa','pulsa.webp', 1,1),
    ('linkaja','linkaja.webp', 1,1),
    ('qris','qris.webp', 1,1)
`);
};



exports.down = (pgm) => {
    pgm.dropTable('masterbank');
};
