import { config } from 'dotenv';
config({ path: './src/configs/.env' });
import { set, connect, connection } from 'mongoose';
import { createConnection } from 'mysql';
import ClickHouse from '@apla/clickhouse';
import { ClickHouse as _ClickHouse } from 'clickhouse';
import { createPool } from 'generic-pool';

const { CL_MONGODB_ADMIN, CL_MONGODB_HOST, CL_MONGODB_PORT, CL_MONGODB_USERNAME, CL_MONGODB_PASSWORD, CL_MONGODB_SCHEME, CL_CLICKHOUSE_HOST, CL_CLICKHOUSE_PORT, CL_CLICKHOUSE_USER, CL_CLICKHOUSE_PASSWORD, CL_CLICKHOUSE_PROTOCOL, CL_CLICKHOUSE_DATA_OBJECTS, CL_CLICKHOUSE_CONNECT_TIMEOUT, CL_CLICKHOUSE_DATABASE, CL_CLICKHOUSE_MAX, CL_CLICKHOUSE_MIN, CL_CLICKHOUSE_ACQUIRE_TIMEOUT_MILLIS, CL_CLICKHOUSE_IDLE_TIMEOUT_MILLIS, CL_MYSQL_PORT, CL_MYSQL_PRIMARY_HOST, CL_MYSQL_PRIMARY_USER, CL_MYSQL_PRIMARY_PASSWORD, CL_MYSQL_PRIMARY_DATABASE, CL_MYSQL_SECONDARY_HOST, CL_MYSQL_SECONDARY_USER, CL_MYSQL_SECONDARY_PASSWORD, CL_MYSQL_SECONDARY_DATABASE, CL_MYSQL_DIALECT, CL_MYSQL_CHARSET, CL_MYSQL_MAX, CL_MYSQL_MIN, CL_MYSQL_ACQUIRE, CL_MYSQL_IDLE, CL_MYSQL_PING_INTERVAL } = process.env;

const mongoUri = `mongodb://${CL_MONGODB_USERNAME}:${CL_MONGODB_PASSWORD}@${CL_MONGODB_HOST}:${CL_MONGODB_PORT}/${CL_MONGODB_SCHEME}?authMechanism=DEFAULT&authSource=${CL_MONGODB_ADMIN}`;
const message = 'Database Connection Established Successfully!!';

set('strictQuery', false);
set('bufferCommands', true);
set('bufferTimeoutMS', 20000); // Set to 20000 milliseconds (20 second)
connect(mongoUri);
connection.once('open', () => {
    console.log(`MongoDB: "${CL_MONGODB_SCHEME.toUpperCase().replace('_', '')}" ${message}`);
}).on('error', (err) => {
    console.log('Error while connecting to DB: ' + err);
});

/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
/***************************** CLICKHOUSE CONNECTION ******************************/
/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

export const ClickHouseCon = new ClickHouse({
    host: CL_CLICKHOUSE_HOST,
    port: CL_CLICKHOUSE_PORT,
    user: CL_CLICKHOUSE_USER,
    password: CL_CLICKHOUSE_PASSWORD,
    protocol: CL_CLICKHOUSE_PROTOCOL,
});

/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
/************************** CLICKHOUSE POOL CONNECTION ****************************/
/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

export const clickhousePool = createPool({
    create: () => {
        return new _ClickHouse({
            host: CL_CLICKHOUSE_HOST,
            port: CL_CLICKHOUSE_PORT,
            user: CL_CLICKHOUSE_USER,
            password: CL_CLICKHOUSE_PASSWORD,
            protocol: CL_CLICKHOUSE_PROTOCOL,
            dataObjects: CL_CLICKHOUSE_DATA_OBJECTS,
            connect_timeout: CL_CLICKHOUSE_CONNECT_TIMEOUT,
            queryOptions: {
                database: CL_CLICKHOUSE_DATABASE
            }
        });
    },
    destroy: (client) => { client.disconnect(); }
}, {
    max: CL_CLICKHOUSE_MAX,
    min: CL_CLICKHOUSE_MIN,
    idleTimeoutMillis: CL_CLICKHOUSE_IDLE_TIMEOUT_MILLIS,
    acquireTimeoutMillis: CL_CLICKHOUSE_ACQUIRE_TIMEOUT_MILLIS
});

/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
/************************ MYSQL PRODUCTION POOL CONNECTION ************************/
/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

// Configuration for the primary MySQL pool
const primaryConfig = {
    host: CL_MYSQL_PRIMARY_HOST,
    port: CL_MYSQL_PORT,
    user: CL_MYSQL_PRIMARY_USER,
    password: CL_MYSQL_PRIMARY_PASSWORD,
    database: CL_MYSQL_PRIMARY_DATABASE,
    dialect: CL_MYSQL_DIALECT,
    charset: CL_MYSQL_CHARSET,
    pool: {
        max: CL_MYSQL_MAX,
        min: CL_MYSQL_MIN,
        acquire: CL_MYSQL_ACQUIRE,
        idle: CL_MYSQL_IDLE,
    },
    pingInterval: CL_MYSQL_PING_INTERVAL
};

// Configuration for the secondary MySQL pool
const secondaryConfig = {
    host: CL_MYSQL_SECONDARY_HOST,
    port: CL_MYSQL_PORT,
    user: CL_MYSQL_SECONDARY_USER,
    password: CL_MYSQL_SECONDARY_PASSWORD,
    database: CL_MYSQL_SECONDARY_DATABASE,
    dialect: CL_MYSQL_DIALECT,
    charset: CL_MYSQL_CHARSET,
    pool: {
        max: CL_MYSQL_MAX,
        min: CL_MYSQL_MIN,
        acquire: CL_MYSQL_ACQUIRE,
        idle: CL_MYSQL_IDLE,
    },
    pingInterval: CL_MYSQL_PING_INTERVAL
};

// Function to create a MySQL connection pool
const createMysqlPool = (config) => {
    const pool = createConnection(config);
    pool.connect((err) => {
        if (err) {
            console.error(`Connection error: ${err.code}, ${err.sqlMessage}`);
        } else {
            console.log(`MySQL: "${config.database.toUpperCase().replace('_', '')}" ${message}`);
        }
    });
    // Ping the connection periodically to keep it alive
    const pingConnection = () => {
        pool.ping((err) => {
            if (err) { console.error('Error pinging MySQL: ', err); }
            else { console.log('MySQL connection is alive!'); }
        });
    };
    // Schedule the pinging at regular intervals
    setInterval(pingConnection, config.pingInterval);
    pool.on('error', (err) => { console.error('MySQL connection error: ', err); });
    return pool;
};

// Create primary and secondary MySQL connection pools
export const mysqlPrimaryPool = createMysqlPool(primaryConfig);
export const mysqlSecondaryPool = createMysqlPool(secondaryConfig);

/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/
/****************************** TO RUN MYSQL QUERY ********************************/
/*++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++*/

export const msQuery = (pool, query, values = []) => {
    return new Promise((resolve, reject) => {
        pool.query(query, values, (err, rows, fields) => {
            if (!err) { resolve({ rows, fields }); } else { reject(new Error(err)); }
        });
    });
};