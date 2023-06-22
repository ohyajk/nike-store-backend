import jwt from 'jsonwebtoken';

export const auth = (req, res, next) => {
    const { cookies } = req;

    if (!cookies.token) {
        return res.status(401).json({ message: 'Unauthorized: Missing token' });
    }

    const { token } = cookies;

    jwt.verify(token, process.env.SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized: Invalid token' });
        }

        req.user = decoded;

        next();
    });
};
