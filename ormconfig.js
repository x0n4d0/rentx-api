module.exports = {
  "type": "postgres",
  "port": 5432,
  "host": "localhost",
  "username": "docker",
  "password": "docker",
  "database": "rentx",
  "cli": {
    "migrationsDir": "./src/database/migrations"
  }
}
