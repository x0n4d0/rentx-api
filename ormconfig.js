module.exports = {
  "type": "postgres",
  "port": 5432,
  "host": "localhost",
  "username": "docker",
  "password": "docker",
  "database": "rentx",
  "synchronize": true,
  "migrations": ["./src/database/migrations/*.ts"],
  "entities": ["./src/modules/**/entities/*.ts"],
  "cli": {
    "migrationsDir": "./src/database/migrations"
  }
}
