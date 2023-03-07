import {query} from "../../../lib/db";

export default async function handler(req, res) {
    const {userEmail} = req.query;    
    // res.status(200).json({ name: 'John Doe' });
    let message;
    if (req.method === "GET") {
        try {
            const querySql = "SELECT * FROM Users WHERE email = ?";
            const valuesParams = [userEmail];
            // console.log(valuesParams);
            const data = await query({query: querySql, values: valuesParams});
            res.status(200).json({products: data});
        } catch(err) {
            console.debug(err);
            res.status(500).json({error: err.message});
        }
    } else if (req.method === "POST") {
        try {
            // INSERT INTO `NextAuthUserDB`.`Users` (`email`, `name`, `secret`) VALUES ('myman@gmail.com', 'my man', 'secret man');
            const addProducts = "INSERT INTO Users (email, name, secret) VALUES (?, ?, ?)";
            const valuesParams = [req.body.email, req.body.name, req.body.secret];
            //console.debug(valuesParams);
            const data = await query({query: addProducts, values: valuesParams});
            //console.debug(data);
            if (data.insertId) {
                message = "success";
            } else {
                message = "error";
            }
            let product = {
                name: req.body.name,
                email: req.body.email,
                secret: req.body.secret,
                itemid: data.insertId,
            };
            res.status(200).json({message: message, products: product});
        } catch(err) {
            // console.debug(err);
            res.status(500).json({error: err.message});
        }
    } else if (req.method === "DELETE") {
        try {
            const deleteProduct = "DELETE FROM Users WHERE (email = ? AND name = ? AND secret = ?)";
            const valuesParams = [req.body.email, req.body.name, req.body.secret];
            console.log("valueparams", valuesParams);
            //console.debug(valuesParams);
            const data = await query({query: deleteProduct, values: valuesParams});
            const result = data.affectedRows;
            // console.log(data);
            if (result) {
                message = "success";
            } else {
                message = "error";
            }
            // console.log("message", message);
            const product = {email: req.body.email, name: req.body.name, secret: req.body.secret};
            res.status(200).json({ message: message, products: product});
        } catch(err) {
            console.log(err);
            res.status(500).json({error: err.message});
        }
    }
    // else if (req.method === "PUT") {
    //     const updateProduct = "UPDATE Users SET secret = ? WHERE (email = ? AND name = name)";
    //     const valuesParams = [req.body.email, req.body.name, req.body.secret];
    //     //console.debug(valuesParams);
    //     const data = await query({query: addProducts, values: valuesParams});
    //     res.status(200).json({ message: message, products: product });
    // }
    
}