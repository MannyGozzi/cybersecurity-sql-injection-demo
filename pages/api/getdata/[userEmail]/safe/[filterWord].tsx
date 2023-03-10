import {query} from "../../../../../lib/db";

export default async function handler(req, res) {
    const {userEmail, filterWord} = req.query;    
    let message;
    if (req.method === "GET") {
        try {
            // attack
            // ' OR '1'='1' OR secret LIKE '
            //console.log(filterWord);
            const badQuery = `SELECT * FROM Users WHERE email = ? AND secret LIKE CONCAT('%', ?, '%')`;
            //console.log(badQuery);
            const data = await query({query: badQuery, values: [userEmail, filterWord]});
            res.status(200).json({products: data});
        } catch(err) {
            console.debug(err);
            res.status(500).json({error: err.message});
        }
    } 
    
}