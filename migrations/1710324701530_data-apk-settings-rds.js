/* eslint-disable camelcase */
exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.createTable('dataapksettings', {
        idapk: {
            type: 'SERIAL',
            primaryKey: true,
        },
        apkid: {
            type: 'VARCHAR(30)',
            notNull: true,
            unique: true,
        },
        version: {
            type: 'VARCHAR(18)',
            notNull: true,
        },
        home: {
            type: 'VARCHAR(80)',
            notNull: true,
        },
        deposit: {
            type: 'VARCHAR(80)',
            notNull: true,
        },
        server1: {
            type: 'VARCHAR(80)',
            notNull: true,
        },
        server2: {
            type: 'VARCHAR(80)',
            notNull: true,
        },
        server3: {
            type: 'VARCHAR(80)',
            notNull: true,
        },
        update: {
            type: 'VARCHAR(80)',
            notNull: true,
        },
        peraturan: {
            type: 'VARCHAR(80)',
            notNull: true,
        },
        klasemen: {
            type: 'VARCHAR(80)',
            notNull: true,
        },
        promosi: {
            type: 'VARCHAR(80)',
            notNull: true,
        },
        livescore: {
            type: 'VARCHAR(80)',
            notNull: true,
        },
        livechat: {
            type: 'VARCHAR(80)',
            notNull: true,
        },
        whatsapp1: {
            type: 'VARCHAR(80)',
            notNull: true,
        },
        whatsapp2: {
            type: 'VARCHAR(80)',
            notNull: true,
        },
        facebook: {
            type: 'VARCHAR(80)',
            notNull: true,
        },
        telegram: {
            type: 'VARCHAR(80)',
            notNull: true,
        },
        instagram: {
            type: 'VARCHAR(80)',
            notNull: true,
        },
        prediksi: {
            type: 'VARCHAR(80)',
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
    pgm.dropTable('dataapksettings');
};
