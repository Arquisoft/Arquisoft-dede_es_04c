import { Request, Response } from 'express';
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require('../model/userModel');

export const verify = async (req: Request, res: Response): Promise<Response> => {
    try{
        let token = req.body.token;
        let decoded = jwt.verify(token, 'secretkey');

        return res.status(200).json(decoded);
    }catch (error) {
        return res.status(401).json(error);
    }

};

export const signup = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { username, email, password } = req.body;
        const existingUser = await User.findOne({ _email: email });

        if (existingUser)
            return res.status(500).send("Ya existe un usuario con ese email");
        const salt = await bcrypt.genSalt();
        const hash = await bcrypt.hash(password, salt);

        const newUser = new User({
            _username: username,
            _email: email,
            _password: hash
        });
        const savedUser = await newUser.save();
        const token = jwt.sign({ savedUser }, 'secretkey');
        return res.status(200).json({
            token,
            user: {
                username: savedUser._username,
                email: savedUser._email,
            }
        });
    } catch (error) {
        return res.status(500).send(error);
    }
}

export const login = async (req: Request, res: Response): Promise<Response> => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ _email: email });
        
        if (!user)
            return res.status(400).send("No existe una cuenta con ese email");

        const success = await bcrypt.compare(password, user._password);
        
        if (!success)
            return res.status(400).send("Credenciales inválidas");
        const token = jwt.sign({ user }, 'secretkey');
        return res.status(200).json({
            token,
            user: {
                username: user._username,
                email: user._email,
            }
        });

    } catch (error) {
        return res.status(500).send(error);
    }
}