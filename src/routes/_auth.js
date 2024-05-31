import express from 'express';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Autentificare user 
 * /auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Token JWT
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 token:
 *                   type: string
 *       401:
 *         description: Email sau parola incorecta
 */
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    const user = await prisma.admin.findUnique({ where: { email } }) ||
        await prisma.profesor.findUnique({ where: { email } }) ||
        await prisma.student.findUnique({ where: { email } });

    if (!user) {
        return res.status(401).json({ message: 'Email incorect' });
    }

    const isPasswordValid = await bcrypt.compare(password, user.parola);

    if (!isPasswordValid) {
        return res.status(401).json({ message: 'Parola incorecta' });
    }

    const role = user.hasOwnProperty('grupa') ? 'student' : (user.hasOwnProperty('domeniu') ? 'profesor' : 'admin');

    const token = jwt.sign({ id: user.id, email: user.email, role }, process.env.JWT_SECRET, {
        expiresIn: '1h',
    });

    res.json({ token });
});

/**
 * @swagger
 * /auth/logout:
 *   post:
 *     summary: Logout user
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Logout cu succes
 */
router.post('/logout', (req, res) => {
    res.clearCookie('token');
    res.sendStatus(200);
});

export default router;
