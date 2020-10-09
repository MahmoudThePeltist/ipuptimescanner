# IP Uptime Scanner
A Small tool to periodically ping IP addresses to check uptime.

# Planned use-cases:
 * ping known locations to scan for poweroutages.
 * ping websites to scan for downtime.
 * store historical outage/downtime data.

# start test server
 * Run `node src/app.js`

# deployment
 * Developed using MySQL database
 * Configure the database in the knexfile.js
 * Select the development/production object in knexConnection.js
 * Install knex from npm globaly to use the CLI `npm install knex -g`
 * Install your database driver `npm install mysql`
 * Migrate using `knex migrate:latest`
 * Rollback migrations using `knex migrate:rollback -all`