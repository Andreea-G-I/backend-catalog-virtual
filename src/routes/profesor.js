import express from 'express';
import { PrismaClient } from '@prisma/client';
import authMiddleware from '../middleware/authMiddleware.js';
import roleMiddleware from '../middleware/roleMiddleware.js';

const router = express.Router();
const prisma = new PrismaClient();

/**
 * @swagger
 * tags:
 *   name: Profesor
 *   description: Operatii CRUD pt un user profesor
 */

router.use(authMiddleware);
router.use(roleMiddleware(['profesor']));

/**
 * @swagger
 * /profesor/discipline:
 *   get:
 *     summary: Lista disciplinelor predate de catre acest profesor
 *     tags: [Profesor]
 *     responses:
 *       200:
 *         description: O lista cu disciplinele profesorului
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
    const contracte = await prisma.contract.findMany({
        where: { id_profesor: req.user.id },
        include: { disciplina: true },
    });
    res.json(contracte);
});

/**
 * @swagger
 * /profesor/studenti:
 *   get:
 *     summary: Lista studentilor inscrisi la disciplinele predate de profesor
 *     tags: [Profesor]
 *     responses:
 *       200:
 *         description: O lista cu studentii inscrisi
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
 *                   email:
 *                     type: string
 *                   grupa:
 *                     type: integer
 */
router.get('/studenti', async (req, res) => {
    const discipline = await prisma.contract.findMany({
        where: { id_profesor: req.user.id },
        select: { id_disciplina: true },
    });

    const idDiscipline = discipline.map(d => d.id_disciplina);

    const studenti = await prisma.inscriere.findMany({
        where: { id_disciplina: { in: idDiscipline } },
        include: {
            student: true,
        },
    });

    const response = studenti.map(inscriere => {
        const { parola, ...rest } = inscriere.student;
        return rest;
    });

    res.json(response);
});


/**
 * @swagger
 * /profesor/testari:
 *   post:
 *     summary: Adauga o testare noua
 *     tags: [Profesor]
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
 *               data:
 *                 type: string
 *     responses:
 *       201:
 *         description: Testare a fost adaugata
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id_disciplina:
 *                   type: integer
 *                 descriere:
 *                   type: string
 *                 data:
 *                   type: string
 */
router.post('/testari', async (req, res) => {
    const { id_disciplina, descriere, data } = req.body;
    const testare = await prisma.testare.create({
        data: { id_disciplina, descriere, data },
    });
    res.status(201).json(testare);
});

/**
 * @swagger
 * /profesor/note:
 *   post:
 *     summary: Adauga o nota noua
 *     tags: [Profesor]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               descriere:
 *                 type: string
 *               id_student:
 *                 type: integer
 *               id_testare:
 *                 type: integer
 *               valoare:
 *                 type: integer
 *     responses:
 *       201:
 *         description: Nota a fost adaugata
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 descriere:
 *                   type: string
 *                 id:
 *                   type: integer
 *                 id_student:
 *                   type: integer
 *                 id_testare:
 *                   type: integer
 *                 valoare:
 *                   type: integer
 */
router.post('/note', async (req, res) => {
    const { descriere, id_student, id_testare, valoare } = req.body;
    const nota = await prisma.nota.create({
        data: { descriere, id_student, id_testare, valoare },
    });
    res.status(201).json(nota);
});

/**
 * @swagger
 * /profesor/note/{id}:
 *   patch:
 *     summary: Actualizeaza o nota existenta
 *     tags: [Profesor]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         description: ID-ul notei de actualizat
 *         schema:
 *           type: integer
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               descriere:
 *                 type: string
 *               valoare:
 *                 type: integer
 *     responses:
 *       200:
 *         description: Nota a fost actualizata
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 descriere:
 *                   type: string
 *                 id:
 *                   type: integer
 *                 id_student:
 *                   type: integer
 *                 id_testare:
 *                   type: integer
 *                 valoare:
 *                   type: integer
 */
router.patch('/note/:id', async (req, res) => {
    const { id } = req.params;
    const { descriere, valoare } = req.body;
    const nota = await prisma.nota.update({
        where: { id: Number(id) },
        data: { descriere, valoare },
    });
    res.json(nota);
});

export default router;
