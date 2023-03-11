import {query} from "../../../../../lib/db";

export default async function handler(req, res) {
    const {userEmail, filterWord} = req.query;    
    let message;
    if (req.method === "GET") {
        try {
            // ' OR '1'='1' OR secret LIKE ' attack no longer works
            const safeQuery = `SELECT * FROM Users WHERE email = ? AND secret LIKE CONCAT('%', ?, '%')`;
            const data = await query({query: safeQuery, values: [userEmail, filterWord]});
            res.status(200).json({products: data});
        } catch(err) {
            console.debug(err);
            res.status(500).json({error: err.message});
        }
    } 
    
}