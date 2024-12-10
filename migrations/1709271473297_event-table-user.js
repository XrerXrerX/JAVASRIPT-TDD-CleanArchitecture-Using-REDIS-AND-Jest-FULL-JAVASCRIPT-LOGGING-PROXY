/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.createTable('events', {
        eventid: {
            type: 'VARCHAR(30)',
            primaryKey: true,
        },
        xyuseridxy: {
            type: 'VARCHAR(30)',
            refrences: 'users(xyuseridxy)',  // Menunjukkan foreign key ke tabel threads
            notnull: true,
            onDelete: 'CASCADE',// Tambahkan opsi ON DELETE CASCADE di sini
        },
        imlek: {
            type: 'VARCHAR(50)',
        },
        agustus: {
            type: 'VARCHAR(50)',
        },
        lebaran: {
            type: 'VARCHAR(50)',
        },
        spinner: {
            type: 'VARCHAR(50)',
        },
        is_delete: {
            type: 'VARCHAR(7)',
        },
    })
};

exports.down = pgm => {
    pgm.dropTable('events');
};
