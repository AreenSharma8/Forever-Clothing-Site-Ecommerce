import jwt from "jsonwebtoken";

const authUser = async (req, res, next) => {
    const { token } = req.headers;

    if (!token) {
        return res.json({ success: false, message: "Not an Authorized User. Login Again!" });
    }

    try {
        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        
        // Make sure the userId is correctly attached, either 'id' or '_id' might be used depending on token structure
        req.user = { id: token_decode.id || token_decode._id };

        next(); // Proceed to the next middleware/route handler
    } catch (error) {
        console.log(error);
        res.json({ success: false, message: error.message });
    }
};

export default authUser;
