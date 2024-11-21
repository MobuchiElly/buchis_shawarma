import User from "@/models/User";

const adminProtection = async (req, res) => {
    if (!req.headers.authorization || !req.headers.authorization.startsWith("Bearer")) {
        return res.status(403).json("This request is forbidden for you");
    }
    const authId = req.headers.authorization.split(" ")[1];
    const userCred = await User.findOne({authId: authId});
    if (!userCred) {
        return res.status(403).json("You are not authorized to make this request");
    }
    if (!userCred.isAdmin) {
        return res.status(403).json("You are not authorized to make this request");
    }
    return true;
};

export default adminProtection;