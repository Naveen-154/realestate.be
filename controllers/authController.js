const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const prisma = require('../lib/prisma.js');

const register = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        // Check if the username already exists
        const existingUser = await prisma.user.findUnique({
            where: { username }
        });

        if (existingUser) {
            return res.status(400).json({ message: "Username already taken" });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        console.log(hashedPassword);

        const newUser = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword
            },
        });
        console.log(newUser);
        res.status(201).json({ message: "User created successfully" });

    } catch (err) {
        console.error('Error during registration:', err);
        res.status(500).json({ message: "Failed to create user" });
    }
};

const login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await prisma.user.findUnique({
            where: { username }
        });
        if (!user) return res.status(401).json({ message: "Invalid Credential" });

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(401).json({ message: "Invalid Credential" });

        const age = 1000 * 60 * 60 * 24 * 7;
        const token = jwt.sign({
            id: user.id
        }, process.env.JWT_SECRET_KEY, {
            expiresIn: age
        });

        res.cookie("token", token, {
            httpOnly: true,
            maxAge: age,
        }).status(200).json({ message: "Login successful" });

    } catch (err) {
        console.error('Error during login:', err);
        res.status(500).json({ message: "Failed to login" });
    }
};

const logout = (req, res) => {
    res.clearCookie("token").status(200).json({ message: "Logout successful" });
};

module.exports = { register, login, logout };






















