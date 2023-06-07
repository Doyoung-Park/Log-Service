const jwt = require('jsonwebtoken');

const verify = (token) => { // access token 검증
    let decoded = null;
    try {
        decoded = jwt.verify(token, process.env.JWT_SECRET);
        return {
            ok: true,
            id: decoded.userId,
        };
    } catch (err) {
        return {
            ok: false,
            message: err.message,
        };
    }
}

const isLoggedIn = async (req, res, next) => {
    try {
        if (req.headers.authorization) {
            const token = req.headers.authorization.split('Bearer ')[1]; // accessToken
            const result = verify(token);
            if (result.ok) {
                res.locals.userId = result.id;
                next();
            } else {
                res.status(401).send({
                    ok: false,
                    message: result.message, // if jwt is expired, message === 'jwt expired'
                });
            }
        }
    } catch (error) {
        console.error(error);
        res.status(400).json({
            ok: false,
            errorMessage: 'isLoggedIn 미들웨어 오류'
        })
    }
}

module.exports = {
    isLoggedIn
}
