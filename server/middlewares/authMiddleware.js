import jwt from "jsonwebtoken";

export const middleware  = (req, res, next) => {
    const token = req.header('Authorization');
    console.log(token);
    if (!token) return res.status(401).json({ message: 'Access Denied' });
    try {
        // const verified = jwt.verify(token, 'JWT_SECRET');
        // if(!verified) return res.status(401).json({ message: 'Access Denied' });
        const user = jwt.decode(token);
        req.id = user.id;
        console.log(user.id);
        // req.users = verified;
        // console.log(verified);
        next();
    } catch (err) {
        console.log(err);
        res.status(400).json({ message: 'Invalid Token' });
    }
};