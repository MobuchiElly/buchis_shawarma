import User from "@/models/User";

const adminProtection = async (req, res, User) => {
    if (!req.headers.authorization || !req.headers.authorization.startsWith("Bearer")) {
        return res.status(403).json("This request is forbidden for you");
        return false;
    }
    const authId = req.headers.authorization.split(" ")[1];
    const userCred = await User.findOne({authId: authId});
    if (!userCred) {
        return res.status(403).json("You are not authorized to make this request");
        return false;
    }
    if (!userCred.isAdmin) {
        return res.status(403).json("You are not authorized to make this request");
        return false;
    }
    return true;
};

export default adminProtection;