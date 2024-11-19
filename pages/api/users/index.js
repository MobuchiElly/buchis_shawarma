import User from "@/models/User";
import adminProtection from "@/middleware/index.js";
import dbConnect from "@/utils/mongodb";

const userApi = async(req, res) => {
    await dbConnect();
    if (req.method === "GET") { 
        const { filter, isAdmin } = req.query;
        const isUserAdmin = await adminProtection(req, res, User);
        const queryObj = {
            ...(filter ? { name: { $regex: filter, $options: "i" } } : {}),
            ...(isAdmin !== undefined ? { isAdmin: isAdmin === "true" } : {})
        };
        const users = await User.find(queryObj);
        return res.status(200).json(users);
    }
    
    if (req.method === "POST") {
        try {
            const { name, email, authId } = req.body;
            if (!name || !email) {
                return res.status(400).json({ message: "Name and Email must be provided" });
            };
            const user = await User.create({name, email, authId});
            return res.status(200).json(user);
        } catch (err) {
            if (err.code === 11000 && err.keyPattern.email) {
                return res.status(409).json({ message: "Email already exists. Please use a different email." });
            }
            res.status(500).json({ message: "Error creating user", error: err.message });
        }
    }
}

export default userApi;