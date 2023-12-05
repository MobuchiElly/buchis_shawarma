import dbConnect from "@/utils/mongodb";
import Product from "@/models/Product";

const productapi = async (req, res) => {

    await dbConnect();

    if (req.method === 'GET') {
        try{
            const products = Product.find();
            res.status(200).json(products);
        }catch(err){
            res.status(500).json(err);
        }
    }
    if (req.method === 'POST') {
        try{
            const product = await Product.create(req.body);
            res.status(201).json(product);
        }catch(err){
           res.status(500).json(err) 
        }
    }
}

export default productapi;