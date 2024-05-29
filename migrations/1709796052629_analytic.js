/* eslint-disable camelcase */
exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.createTable('analytics', {
        xyuseridxy: {
            type: 'VARCHAR(30)',
            refrences: 'users(xyuseridxy)',  // Menunjukkan foreign key ke tabel threads
            notnull: true,
            onDelete: 'CASCADE',// Tambahkan opsi ON DELETE CASCADE di sini
        },
        is_favorite: {
            type: 'VARCHAR(50)[]',
        },
    });
};

exports.down = (pgm) => {
    pgm.dropTable('analytics');
};
