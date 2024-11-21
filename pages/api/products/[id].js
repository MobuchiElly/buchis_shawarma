import dbConnect from "@/utils/mongodb";
import Product from "@/models/Product";
import adminProtection from "@/middleware";

const productapi = async (req, res) => {
    const {
        method, 
        query: {id},
        cookies, 
    } = req;

    const token = cookies.token;
    await dbConnect();
    
    if (method === 'GET') {
        try{
            const product = await Product.findById(id);
            res.status(200).json(product);
        }catch(err){
            res.status(500).json(err);
        }
    }
    await adminProtection(req, res);
    if (method === 'PUT') {
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
        try{
            const product = await Product.create(req.body);
            res.status(201).json(product);
        }catch(err){
           res.status(500).json(err) 
        }
    }
    if (method === 'DELETE') {
        await adminProtection(req, res);
        try{
            await Product.findByIdAndDelete(id);
            res.status(200).json("Item successfully deleted");
        }catch(err){
           res.status(500).json(err); 
        }
    }
}

export default productapi;