import User from "@/models/User";
import adminProtection from "@/middleware";
import dbConnect from "@/utils/mongodb";

const userApi = async(req, res) => {
    const {userId} = req.query;
    await dbConnect();
    if (req.method === "GET"){
        try {
            const user = await User.findOne({authId: userId});
            if (!user){
                return res.status(404).json("User not found");
            }
            res.status(200).json(user);
        } catch(error){
            res.status(500).json({"message":"Error finding user", error});
        }
    }

    if (req.method === "PUT"){
        try {
            const { isAdmin, ...updateBody } = req.body;
            const { userId } = req.query;
            if(req.body.hasOwnProperty("isAdmin")){
                const isUserAdmin = await adminProtection(req, res);
                updateBody.isAdmin = isAdmin;
            }
            if(!userId){
                res.status(400).json("User id is required in the request body");
                throw new Error("User id is required in the request body");
            };
            const updatedUser = await User.findOneAndUpdate({authId: userId }, updateBody, {new: true});
            if (!updatedUser) {
                return res.status(404).json({ message: "User not found" });
            };
            res.status(200).json(updatedUser);
        } catch (err) {
            res.status(500).json({ message: "Error updating user", err });
        }
    }

    // if (req.method === "DELETE"){
    //     try{
    //         const deleteUser = await User.findOneAndDelete({authId:userId});
    //         return res.send("Successfully deleted user");
    //     } catch (error) {
    //         res.send("Error deleting user from db");
    //     }
    // }
}

export default userApi;