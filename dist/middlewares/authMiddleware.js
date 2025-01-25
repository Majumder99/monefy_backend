import jwt from "jsonwebtoken";
export const authenticate = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;
        if (!authHeader?.startsWith("Bearer ")) {
            res.status(401).json({ message: "No token provided" });
            return;
        }
        const token = authHeader.split(" ")[1];
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    }
    catch (error) {
        res.status(401).json({ message: "Invalid token" });
    }
};
export const isAdmin = async (req, res, next) => {
    try {
        if (req.user?.role !== "admin") {
            res.status(403).json({ message: "Admin access required" });
            return;
        }
        next();
    }
    catch (error) {
        next(error);
    }
};
