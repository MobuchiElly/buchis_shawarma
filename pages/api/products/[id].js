import dbConnect from "@/utils/mongodb";
import Product from "@/models/Product";

const productapi = async (req, res) => {
    const {
        method, 
        query: {id},
        cookies, 
    } = req;

    await dbConnect();
    const token = cookies.token;

    if (method === 'GET') {
        try{
            const product = await Product.findById(id);
            res.status(200).json(product);
        }catch(err){
            res.status(500).json(err);
        }
    }
    if (method === 'PUT') {
        if(!token || token !== process.env.TOKEN) {
            return res.status(401).json('Not Authenticated/Authorised to carry out this action')
        }
        
        try{
            const product = await Product.findByIdAndUpdate(id, req.body, {
                new:true,
            });
            res.status(200).json(product);
        }catch(err){
           res.status(500).json(err) 
        }
    }
    if (method === 'POST') {
        if(!token || token !== process.env.TOKEN){
            return res.status(401).json("Not Authorised to carry out this action");
        }

        try{
            const product = await Product.create(req.body);
            res.status(201).json(product);
        }catch(err){
           res.status(500).json(err) 
        }
    }
    if (method === 'DELETE') {
        if(!token || token !== process.env.TOKEN){
            return res.status(401).json('Not Authenticated/Authorised to carry out this action');
        }
        
        try{
            await Product.findByIdAndDelete(id);
            res.status(200).json("Item successfully deleted");
        }catch(err){
           res.status(500).json(err); 
        }
    }
}

export default productapi;