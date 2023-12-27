import dbConnect from "@/utils/mongodb";
import Order from "@/models/Order";

const handler = async (req, res) => {
    const { method, query:{id} } = req;
    await dbConnect();

    if(method === "GET"){
        try{
            const order = await Order.findById(id);
            if (!order) {
                return res.status(404).json({error: 'Order not found'});
            }
            res.status(200).json(order);
        } catch (error) {
            res.status(500).json(error);
        }
    }
    if(method === "PUT"){
        try{
            const order = await Order.findByIdAndUpdate(id, req.body, {
                new:true,
            });
            res.status(200).json(order);
        }catch(error){
            res.status(500).json(error);
        }
    }
    if(method === "DELETE"){
        
    }
}

export default handler;