import verify from 'jsonwebtoken';

export default (req, res, next) => {
    const token = req.header('Authorization')?.split(' ')[1];

    if (!token) {
        return res.status(401).json({ message: 'Authorization token required' });
    }

    try {
        const decoded = verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(401).json({ message: 'Invalid or expired token' });
    }
};
