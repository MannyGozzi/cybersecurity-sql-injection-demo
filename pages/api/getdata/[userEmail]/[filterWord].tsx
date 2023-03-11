import {query} from "../../../../lib/db";

export default async function handler(req, res) {
    const {userEmail, filterWord} = req.query;    
    if (req.method === "GET") {
        try {
            // ' OR '1'='1' OR secret LIKE '
            const badQuery = `SELECT * FROM Users WHERE email = '${userEmail}' AND secret LIKE '%${filterWord}%'`;
            const data = await query({query: badQuery, values: []});
            res.status(200).json({products: data});
        } catch(err) {
            console.debug(err);
            res.status(500).json({error: err.message});
        }
    } 
    
}