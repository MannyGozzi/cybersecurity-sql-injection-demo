import {query} from "../../../../lib/db";

export default async function handler(req, res) {
    const {userEmail, filterWord} = req.query;    
    let message;
    if (req.method === "GET") {
        try {
            const badQuery = `SELECT * FROM Users WHERE email = "` + userEmail + `" AND secret LIKE "%` + filterWord + `%"`;
            //console.log(badQuery);
            const data = await query({query: badQuery, values: []});
            res.status(200).json({products: data});
        } catch(err) {
            console.debug(err);
            res.status(500).json({error: err.message});
        }
    } 
    
}