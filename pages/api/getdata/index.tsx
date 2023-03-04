import query from "../../../lib/db";

export default async function handler(req, res) {
    // res.status(200).json({ name: 'John Doe' });
    try {
        const querySql = "SELECT * FROM Users";
        const valuesParams = [];
        const data = await query({query: querySql, values: valuesParams});
        res.status(200).json({products: data});
    } catch(err) {
        // console.log(err);
        res.status(500).json({error: err.message});
    }
}