import express from 'express';
import { PrismaClient } from '@prisma/client';
import authMiddleware from '../middleware/authMiddleware.js';
import roleMiddleware from '../middleware/roleMiddleware.js';

const router = express.Router();
const prisma = new PrismaClient();

/**
 * @swagger
 * tags:
 *   name: Student
 *   description: Operatii CRUD pentru un user student
 */

router.use(authMiddleware);
router.use(roleMiddleware(['student']));

/**
 * @swagger
 * /student/discipline:
 *   get:
 *     summary: Lista disciplinelor la care este inscris acest student
 *     tags: [Student]
 *     responses:
 *       200:
 *         description: O lista cu disciplinele studentului
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   nume:
 *                     type: string
 *                   domeniu:
 *                     type: string
 */
router.get('/discipline', async (req, res) => {
    const inscrieri = await prisma.inscriere.findMany({
        where: { id_student: req.user.id },
        include: { disciplina: true },
    });
    res.json(inscrieri);
});

/**
 * @swagger
 * /student/note:
 *   get:
 *     summary: Lista notelor studentului
 *     tags: [Student]
 *     responses:
 *       200:
 *         description: O lista de note
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   descriere:
 *                     type: string
 *                   id_student:
 *                     type: integer
 *                   id_testare:
 *                     type: integer
 *                   valoare:
 *                     type: integer
 */
router.get('/note', async (req, res) => {
    const note = await prisma.nota.findMany({
        where: { id_student: req.user.id },
    });
    res.json(note);
});

/**
 * @swagger
 * /student/inscriere:
 *   post:
 *     summary: Inscriere la o noua disciplina
 *     tags: [Student]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_disciplina:
 *                 type: integer
 *               descriere:
 *                 type: string
 *     responses:
 *       201:
 *         description: Inscriere efectuata
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 id_student:
 *                   type: integer
 *                 id_disciplina:
 *                   type: integer
 *                 descriere:
 *                   type: string
 */
router.post('/inscriere', async (req, res) => {
    const { id_disciplina, descriere } = req.body;
    const inscriere = await prisma.inscriere.create({
        data: { id_student: req.user.id, id_disciplina, descriere },
    });
    res.status(201).json(inscriere);
});

export default router;
