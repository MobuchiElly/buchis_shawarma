import dbConnect from "@/utils/mongodb";
import Order from "@/models/Order";

const handler = async (req, res) => {
    const { method } = req;
    console.log(req.body);
    await dbConnect();

    if(method === "GET"){
        try{
            const orders = await Order.find();
            res.status(200).json(orders);
        } catch(error){
            res.status(500).json(error);
        }
    }
    if(method === "POST"){
        try{
            const order = await Order.create(req.body);
            res.status(201).json(order);
        } catch(error){
            res.status(500).json(error);
        }
    }
}

export default handler;