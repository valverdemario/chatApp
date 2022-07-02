const { response } = require('express');
const Usuario = require('../models/usuario');
const bcrypt = require('bcryptjs');
const { generarJWT } = require('../helpers/jwt');

const crearUsuario = async (req, res = response) => {

    const { email, password } = req.body;

    try {

        const existeEmail = await Usuario.findOne({ email });
        if (existeEmail) {
            res.status(500).json({ ok: false, error: 'El correo ya está registrado' });
        }

        const usuario = new Usuario(req.body);

        //Encriptar contraseña
        const salt = bcrypt.genSaltSync();
        usuario.password = bcrypt.hashSync(password, salt);

        await usuario.save();

        //Generar JWT
        const token = await generarJWT(usuario.id);

        res.json({
            ok: true,
            usuario,
            token
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({ ok: false, error: 'Ocurrio un error' });
    }


}
const login = async (req, res = response) => {
    const { email, password } = req.body;

    try {

        const usuarioDB = await Usuario.findOne({ email: email });
        if (!usuarioDB) {
            res.status(404).json({ ok: false, error: 'Email no encontrado' });
        }

        const validPassword = bcrypt.compareSync(password, usuarioDB.password);
        if (!validPassword) {
            res.status(404).json({ ok: false, error: 'Password no valido' });
        }

        const token = await generarJWT(usuarioDB.id);
        res.json({
            ok: true,
            usuarioDB,
            token
        });

    } catch (error) {

        res.json({
            ok: false,
            error: 'Ocurrio un error'
        });
    }
}

const renewToken = async (req, res = response) => {

    const uid = req.uid;
    const token = await generarJWT(uid);
    const usuario = await Usuario.findById(uid);

    if (!usuario) {
        res.status(404).json({
            ok: false,
            error: 'Usuario no encontrado'
        });
    }
    res.json({
        ok: true,
        usuario,
        token
    });
}


module.exports = {
    crearUsuario,
    login,
    renewToken
}