const knex = require('knex')({
    client: 'mysql',
    connection: {
        host: "118.190.146.207",
        port:"3306",
        user: 'root',
        password: 'Tangfengguoji_20180402',
        database: 'tangfeng'
    },
    pool: { min: 1, max: 7 }
});

module.exports = knex;