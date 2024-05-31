import jwt from 'jsonwebtoken';

const authMiddleware = (req, res, next) => {
    const token = req.headers.authorization?.split(' ')[1] || req.cookies.token;

    //console.log('authMiddleware');

    if (!token) {
        return res.status(401).json({ message: 'Unauthorized. Trebuie sa te autentifici' });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        return res.status(401).json({ message: 'Token invalid' });
    }
};

export default authMiddleware;
