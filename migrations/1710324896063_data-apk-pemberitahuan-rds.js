/* eslint-disable camelcase */
exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.createTable('dataapknotice', {
        idnotice: {
            type: 'SERIAL',
            primaryKey: true,
        },
        apkid: {
            type: 'VARCHAR(30)',
            refrences: 'dataapksettings(apkid)',  // Menunjukkan foreign key ke tabel threads
            notnull: true,
            onDelete: 'CASCADE',// Tambahkan opsi ON DELETE CASCADE di sini
        },
        title: {
            type: 'VARCHAR(75)',
            notNull: true,
        },
        content: {
            type: 'text',
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
    pgm.dropTable('dataapknotice');
};
