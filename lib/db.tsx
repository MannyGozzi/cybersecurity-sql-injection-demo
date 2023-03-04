import mysql from "mysql2/promise";

export default async function query({query, values = []}) {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        database: process.env.DB,
        user: process.env.DB_USER,
        port: process.env.DB_PORT,
        password: process.env.DB_PASSWORD,
    });
    // res.status(200).json({ name: 'John Doe' });
    try {
        const [results] = await connection.execute(query, values);
        connection.end();
        return results;
    } catch(err) {
        throw Error(err.message);
        return {err};
    }
}