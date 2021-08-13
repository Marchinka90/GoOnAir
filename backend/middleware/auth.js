const jwt = require('jsonwebtoken');

module.exports = {
    isAuth: (req, res, next) => {
        try {
            const token = req.headers.authorization.split(' ')[1];
            const decodedToken = jwt.verify(token, 'secret_this_should_be_longer');
            req.userData = { email: decodedToken.email, role: decodedToken.role, userId: decodedToken.userId };
            next();
        } catch (err) {
            res.status(401).json({ message: 'Auth failed' });
        }
    },

    isAdmin: (req, res, next) => {
        try {
            const token = req.headers.authorization.split(' ')[1];
            const decodedToken = jwt.verify(token, 'secret_this_should_be_longer');
            if (decodedToken.role == 'user') {
                throw new Error();
            }
            req.userData = { email: decodedToken.email, role: decodedToken.role, userId: decodedToken.userId };
            next();
        } catch (err) {
            res.status(401).json({ message: 'Only Admin Access' });
        }
    },

    isUser: (req, res, next) => {
        try {
            const token = req.headers.authorization.split(' ')[1];
            const decodedToken = jwt.verify(token, 'secret_this_should_be_longer');
            if (decodedToken.role == 'admin') {
                throw new Error();
            }
            req.userData = { email: decodedToken.email, role: decodedToken.role, userId: decodedToken.userId };
            next();
        } catch (err) {
            res.status(401).json({ message: 'Only User Access' });
        }
    },

};