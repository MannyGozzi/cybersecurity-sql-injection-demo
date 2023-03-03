import mysql from "mysql2/promise";

export default async function handler(req, res) {
    const connection = await mysql.createConnection({
        host: process.env.DB_HOST,
        database: process.env.DB,
        user: process.env.DB_USER,
        port: process.env.DB_PORT,
        password: process.env.DB_PASSWORD,
    });
    // res.status(200).json({ name: 'John Doe' });
    try {
        const query = "SELECT * FROM Users";
        const values = [];
        const [data] = await connection.execute(query, values);
        connection.end();
        res.status(200).json({results: data});
    } catch(err) {
        console.log(err);
    }
}