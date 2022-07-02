const jwt = require('jsonwebtoken');

const validarJWT = (req, res, next) => {
    const token = req.header('x-token');

    if (!token) {
       return res.json({
            ok: false,
            msg: 'token invalido'
        })
    }
    try {

        const { uid } = jwt.verify(token, process.env.JWT_KEY);
        req.uid = uid;


        next();
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: 'token invalido'
        })
    }


}

module.exports = {
    validarJWT
}