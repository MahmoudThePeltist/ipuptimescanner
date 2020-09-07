# IP Uptime Scanner
A Small tool to periodically ping IP addresses to check uptime.

# Planned use-cases:
 * ping known locations to scan for poweroutages.
 * ping websites to scan for downtime.
 * store historical outage/downtime data.

# deployment
 * Developed using MySQL database
 * Configure the database in the knexfile.js
 * Select the development/production object in knexConnection.js
 * Migrate using `knex migrate:latest`
 * Rollback migrations using `knex migrate:rollback -all`