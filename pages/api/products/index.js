import dbConnect from "@/utils/mongodb";
import Product from "@/models/Product";
import adminProtection from "@/middleware";
import User from "@/models/User";

const productapi = async (req, res) => {
    const { method, cookies } = req;
    const token = cookies.token;
    await dbConnect();

    if (req.method === 'GET') {
        try{
            const products = await Product.find();
            res.status(200).json(products);
        }catch(err){
            res.status(500).json(err);
        }
    }
    if (req.method === 'POST') {
        adminProtection(req, res);
        try{
            const product = await Product.create(req.body);
            res.status(201).json(product);
        }catch(err){
           res.status(500).json(err) 
        }
    }
}

export default productapi;