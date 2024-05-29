/* eslint-disable camelcase */
exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('users', {
    xyuseridxy: {
      type: 'VARCHAR(30)',
      primaryKey: true,
    },
    xyusernamexxy: {
      type: 'VARCHAR(16)',
      notNull: true,
      unique: true,
    },
    xybanknamexyy: {
      type: 'VARCHAR(20)',
      notNull: true,
    },
    xybankuserxy: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    xxybanknumberxy: {
      type: 'VARCHAR(20)',
      notNull: true,
    },
    xyx11xuser_mailxxyy: {
      type: 'VARCHAR(50)',
    },
    xynumbphonexyyy: {
      type: 'VARCHAR(15)',
      notNull: true,
    },
    is_verified: {
      type: 'BOOLEAN',
      notNull: true,
      default: false // Menambahkan nilai default
    },
    last_login: {
      type: 'TEXT',
    },
    created_at: {
      type: 'TEXT',
      notNull: true,
    },
    updated_at: {
      type: 'TEXT',
    },
    group: {
      type: 'VARCHAR(80)',
      notNull: true,
      default: 'groupbank1' // Menambahkan nilai default
    },
    groupwd: {
      type: 'VARCHAR(80)',
      notNull: true,
      default: 'groupbankwd1' // Menambahkan nilai default
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('users');
};
