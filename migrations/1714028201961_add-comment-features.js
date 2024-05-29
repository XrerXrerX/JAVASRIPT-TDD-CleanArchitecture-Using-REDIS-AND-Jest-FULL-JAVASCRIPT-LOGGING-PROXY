/* eslint-disable camelcase */
exports.shorthands = undefined;

exports.up = (pgm) => {
    pgm.createTable('memodata', {
        idmemo: {
            type: 'SERIAL',
            primaryKey: true,
        },
        statustype: {
            type: 'INTEGER',
            notNull: true,
            default: 1,
        },
        statuspriority: {
            type: 'INTEGER',
            notNull: true,
            default: 1,
        },
        subject: {
            type: 'VARCHAR(50)',
            notNull: true,
        },
        memo: {
            type: 'TEXT',
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
    INSERT INTO memodata (statustype, statuspriority,subject,memo) VALUES
    ('1', '1' ,'Selamat Datang' , 'hai terimakasih sudah bergabung. silahkan cek promosi kami dan lakukan deposit untuk mulai bermain yah .' ),
`);
};

exports.down = (pgm) => {
    pgm.dropTable('memodata');
};
