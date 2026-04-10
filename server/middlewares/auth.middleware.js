const jwt = require("jsonwebtoken");

const userAuth = (req, res, next) => {
    try {
        const authHeader = req.headers["authorization"];
        if (!authHeader) return res.status(401).json({ msg: "No token provided" });

        const token = authHeader.split(" ")[1];
        if (!token) return res.status(401).json({ msg: "Invalid token format", token });

        const decoded = jwt.verify(token, process.env.jwtsecretkey);
        if (decoded) {
            req.userId = decoded.id;
            next();
        } else {
            return res.status(401).json({ msg: "invalid user" });
        }
    } catch (err) {
        res.status(401).json({ msg: "you have not signedin, please signedin" });
    }
};

const adminAuth = (req, res, next) => {
    try {
        const token = req.headers.token || (req.headers["authorization"] ? req.headers["authorization"].split(" ")[1] : null);
        if (!token) return res.status(401).json({ msg: "No token provided" });

        const decoded = jwt.verify(token, process.env.jwtsecretkey);
        if (decoded) {
            req.adminId = decoded.id;
            next();
        } else {
            return res.status(401).json({ msg: "invalid admin" });
        }
    } catch (err) {
        res.status(401).json({ msg: "invalid token" });
    }
};

module.exports = { userAuth, adminAuth };
