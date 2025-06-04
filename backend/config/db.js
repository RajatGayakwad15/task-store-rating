const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('store_rating_db', 'root', '1234567', {
  host: 'localhost',
  dialect: 'mysql',
});

sequelize
  .authenticate()
  .then(() => {
    console.log('✅ MySQL connected with Sequelize');
  })
  .catch((err) => {
    console.error('❌ Unable to connect to MySQL:', err);
  });

module.exports = sequelize;
