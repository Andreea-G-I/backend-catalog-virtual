const roleMiddleware = (roles) => {

    return (req, res, next) => {

        //console.log('roleMiddleware');

        if (!roles.includes(req.user.role)) {
            return res.status(403).json({ message: 'Forbidden. Contacteaza un admin.' });
        }
        next();
    };

};

export default roleMiddleware;
