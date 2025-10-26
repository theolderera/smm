// database/migrations/001-init.js

module.exports = {
  async up(db) {
    await db.createCollection('users');
    await db.createCollection('courses');
  },

  async down(db) {
    await db.collection('users').drop();
    await db.collection('courses').drop();
  },
};