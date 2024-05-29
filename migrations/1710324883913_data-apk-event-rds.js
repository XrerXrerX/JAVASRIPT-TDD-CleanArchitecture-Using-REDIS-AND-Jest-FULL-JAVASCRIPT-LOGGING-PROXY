/* eslint-disable camelcase */
exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.createTable('dataapkevent', {
        idevent: {
            type: 'SERIAL',
            primaryKey: true,
        },
        apkid: {
            type: 'VARCHAR(30)',
            refrences: 'dataapksettings(apkid)',  // Menunjukkan foreign key ke tabel threads
            notnull: true,
            onDelete: 'CASCADE',// Tambahkan opsi ON DELETE CASCADE di sini
        },
        icongif: {
            type: 'VARCHAR(60)',
            notNull: true,
        },
        posisi: {
            type: 'VARCHAR(6)',
            notNull: true,
        },
        switchs: {
            type: 'BOOLEAN',
            notNull: true,
        },
        bannerurl: {
            type: 'VARCHAR(180)',
            notNull: true,
        },
        linkevent: {
            type: 'VARCHAR(60)',
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
    pgm.dropTable('dataapkevent');
};
