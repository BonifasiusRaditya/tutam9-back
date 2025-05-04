require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
    connectionString: process.env.PG_CONNECTION_STRING,
    ssl: process.env.PG_SSL === "true" ? { rejectUnauthorized: false } : false,
});

const connect = async () => {
    try {
        await pool.query("SELECT NOW()");
        console.log("✅ Connected to database");
    } catch (error) {
        console.error("❌ Error connecting to database:", error.message);
    }
};

connect();

const query = async (text, params) => {
    try {
        const res = await pool.query(text, params);
        return res;
    } catch (error) {
        console.error("❌ Error executing query:", error.message);
        throw error; // lempar error agar bisa ditangani controller
    }
};

module.exports = {
    query,
};