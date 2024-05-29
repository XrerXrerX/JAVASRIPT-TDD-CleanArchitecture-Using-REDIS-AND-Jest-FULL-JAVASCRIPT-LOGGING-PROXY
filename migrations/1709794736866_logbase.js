/* eslint-disable camelcase */
exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.createTable('logbasxxyte', {
        id_logbase: {
            type: 'VARCHAR(30)',
            primaryKey: true,
        },
        xyuseridxy: {
            type: 'VARCHAR(30)',
            refrences: 'users(xyuseridxy)',  // Menunjukkan foreign key ke tabel threads
            notnull: true,
            onDelete: 'CASCADE',// Tambahkan opsi ON DELETE CASCADE di sini
        },
        username: {
            type: 'VARCHAR(16)',
            notNull: true,
            unique: true,
        },
        password: {
            type: 'VARCHAR(80)',
            notNull: true,
        }
        // ,

        // is_verified: {
        //     type: 'Boolean',
        // },

        // last_login: {
        //     type: 'TEXT',
        // }
    });
};

exports.down = (pgm) => {
    pgm.dropTable('logbasxxyte');
};
