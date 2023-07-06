import jwt from 'jsonwebtoken';
export const auth = (req, res, next) => {
    console.log(req.cookies)
    if (!req.cookies) {
        return res.status(401).json({ message: 'Unauthorized: Missing token' });
    }

    const { token } = req.cookies;
    console.log(token)
    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized: Invalid token' });
        }

        req.user = decoded;

        next();
    });
};
