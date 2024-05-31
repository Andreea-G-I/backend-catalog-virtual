import express from 'express';
import { PrismaClient } from '@prisma/client';
import authMiddleware from '../middleware/authMiddleware.js';
import roleMiddleware from '../middleware/roleMiddleware.js';
import bcrypt from 'bcryptjs';

const router = express.Router();
const prisma = new PrismaClient();

router.use(authMiddleware);
router.use(roleMiddleware(['admin']));

// GET requests

/**
 * @swagger
 * tags:
 *   name: Admin
 *   description: Operatii CRUD pt un user admin
 * /admin/profesori:
 *   get:
 *     summary: Lista profesorilor
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: Returneaza toti profesorii
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
 *                   email:
 *                     type: string
 */
router.get('/profesori', async (req, res) => {
    const profesori = await prisma.profesor.findMany({
        select: {
            id: true,
            nume: true,
            domeniu: true,
            email: true,
            // am exclus parola
        }
    });
    res.json(profesori);
});


/**
 * @swagger
 * /admin/studenti:
 *   get:
 *     summary: Lista studentilor
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: O lista de studenti
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
 *                   grupa:
 *                     type: integer
 *                   email:
 *                     type: string
 */
router.get('/studenti', async (req, res) => {
    const studenti = await prisma.student.findMany({
        select: {
            id: true,
            nume: true,
            domeniu: true,
            grupa: true,
            email: true,
            //fara parola
        }
    });
    res.json(studenti);
});


/**
 * @swagger
 * /admin/discipline:
 *   get:
 *     summary: Lista disciplinelor
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: Lista cu toate disciplinele
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
    const discipline = await prisma.disciplina.findMany();
    res.json(discipline);
});

/**
 * @swagger
 * /admin/note:
 *   get:
 *     summary: Lista notelor
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: Toate notele care s-au dat la toate disciplinele
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
    const note = await prisma.nota.findMany();
    res.json(note);
});

/**
 * @swagger
 * /admin/testari:
 *   get:
 *     summary: Lista cu toate testarile
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: Toate testele/examenele/partiale/verificari etc 
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   id_disciplina:
 *                     type: integer
 *                   descriere:
 *                     type: string
 *                   data:
 *                     type: string
 */
router.get('/testari', async (req, res) => {
    const testari = await prisma.testare.findMany();
    res.json(testari);
});

/**
 * @swagger
 * /admin/contracte:
 *   get:
 *     summary: Lista contractelor
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: Lista tuturor contractelor
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   id_profesor:
 *                     type: integer
 *                   id_disciplina:
 *                     type: integer
 *                   descriere:
 *                     type: string
 */
router.get('/contracte', async (req, res) => {
    const contracte = await prisma.contract.findMany();
    res.json(contracte);
});

/**
 * @swagger
 * /admin/inscrieri:
 *   get:
 *     summary: Lista inscrierilor
 *     tags: [Admin]
 *     responses:
 *       200:
 *         description: Toate inscrierile
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   id_student:
 *                     type: integer
 *                   id_disciplina:
 *                     type: integer
 *                   descriere:
 *                     type: string
 */
router.get('/inscrieri', async (req, res) => {
    const inscrieri = await prisma.inscriere.findMany();
    res.json(inscrieri);
});

// POST requests


/**
 * @swagger
 * /admin/studenti:
 *   post:
 *     summary: Creaza un nou student
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nume:
 *                 type: string
 *               domeniu:
 *                 type: string
 *               grupa:
 *                 type: integer
 *               email:
 *                 type: string
 *               parola:
 *                 type: string
 *     responses:
 *       201:
 *         description: Student creat
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 nume:
 *                   type: string
 *                 domeniu:
 *                   type: string
 *                 grupa:
 *                   type: integer
 *                 email:
 *                   type: string
 *                 parola:
 *                   type: string
 */
router.post('/studenti', async (req, res) => {
    const { nume, domeniu, grupa, email, parola } = req.body;

    try { //hash parola
        const saltRounds = parseInt(process.env.SALT_ROUNDS) || 10;
        const hashedPassword = await bcrypt.hash(parola, saltRounds);

        const student = await prisma.student.create({
            data: {
                nume,
                domeniu,
                grupa,
                email,
                parola: hashedPassword
            },
        });
        res.status(201).json(student);
    } catch (error) {
        res.status(500).json({ message: 'Eroare la crearea studentului', error });
    }
});


/**
 * @swagger
 * /admin/profesori:
 *   post:
 *     summary: Creaza un nou profesor
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nume:
 *                 type: string
 *               domeniu:
 *                 type: string
 *               email:
 *                 type: string
 *               parola:
 *                 type: string
 *     responses:
 *       201:
 *         description: Profesor creat
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 nume:
 *                   type: string
 *                 domeniu:
 *                   type: string
 *                 email:
 *                   type: string
 */
router.post('/profesori', async (req, res) => {
    const { nume, domeniu, email, parola } = req.body;

    const saltRounds = parseInt(process.env.SALT_ROUNDS) || 10;
    try {
        // hash pt parola inainte de a o stoca in baza de date
        const hashedPassword = await bcrypt.hash(parola, saltRounds);

        const profesor = await prisma.profesor.create({
            data: {
                nume: nume,
                domeniu: domeniu,
                email: email,
                parola: hashedPassword
            },
        });
        res.status(201).json(profesor);
    } catch (error) {
        res.status(500).json({ message: 'Eroare la crearea profesorului', error });
    }
});


/**
 * @swagger
 * /admin/inscrieri:
 *   post:
 *     summary: Creaza o noua inscriere
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_student:
 *                 type: integer
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
router.post('/inscrieri', async (req, res) => {
    const { id_student, id_disciplina, descriere } = req.body;
    const inscriere = await prisma.inscriere.create({
        data: { id_student, id_disciplina, descriere },
    });
    res.status(201).json(inscriere);
});

/**
 * @swagger
 * /admin/contracte:
 *   post:
 *     summary: Creaza un nou contract
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               id_profesor:
 *                 type: integer
 *               id_disciplina:
 *                 type: integer
 *               descriere:
 *                 type: string
 *     responses:
 *       201:
 *         description: Contract creat
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 id_profesor:
 *                   type: integer
 *                 id_disciplina:
 *                   type: integer
 *                 descriere:
 *                   type: string
 */
router.post('/contracte', async (req, res) => {
    const { id_profesor, id_disciplina, descriere } = req.body;
    const contract = await prisma.contract.create({
        data: { id_profesor, id_disciplina, descriere },
    });
    res.status(201).json(contract);
});

/**
 * @swagger
 * /admin/discipline:
 *   post:
 *     summary: Creaza o noua disciplina
 *     tags: [Admin]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nume:
 *                 type: string
 *               domeniu:
 *                 type: string
 *     responses:
 *       201:
 *         description: Disciplina a fost creata
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                  nume:
 *                      type: string
 *                  domeniu:
 *                      type: string
 */
router.post('/discipline', async (req, res) => {
    const { nume, domeniu } = req.body;
    const contract = await prisma.disciplina.create({
        data: { nume, domeniu }
    });
    res.status(201).json(contract);
});

// PATCH requests


/**
 * @swagger
 * /admin/profesori/{id}:
 *   patch:
 *     summary: Actualizeaza un profesor
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID-ul profesorului
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nume:
 *                 type: string
 *               domeniu:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Profesor actualizat
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 nume:
 *                   type: string
 *                 domeniu:
 *                   type: string
 *                 email:
 *                   type: string
 */
router.patch('/profesori/:id', async (req, res) => {
    const { id } = req.params;
    const { nume, domeniu, email } = req.body;
    const profesor = await prisma.profesor.update({
        where: { id: Number(id) },
        data: { nume, domeniu, email },
    });
    res.json(profesor);
});

/**
 * @swagger
 * /admin/studenti/{id}:
 *   patch:
 *     summary: Actualizeaza un student
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID-ul studentului
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nume:
 *                 type: string
 *               domeniu:
 *                 type: string
 *               grupa:
 *                 type: integer
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: Student actualizat
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 nume:
 *                   type: string
 *                 domeniu:
 *                   type: string
 *                 grupa:
 *                   type: integer
 *                 email:
 *                   type: string
 */
router.patch('/studenti/:id', async (req, res) => {
    const { id } = req.params;
    const { nume, domeniu, grupa, email } = req.body;
    const student = await prisma.student.update({
        where: { id: Number(id) },
        data: { nume, domeniu, grupa, email },
    });
    res.json(student);
});

/**
 * @swagger
 * /admin/discipline/{id}:
 *   patch:
 *     summary: Actualizeaza o disciplina
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID-ul disciplinei
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               nume:
 *                 type: string
 *               domeniu:
 *                 type: string
 *     responses:
 *       200:
 *         description: Disciplina actualizata
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 nume:
 *                   type: string
 *                 domeniu:
 *                   type: string
 */
router.patch('/discipline/:id', async (req, res) => {
    const { id } = req.params;
    const { nume, domeniu } = req.body;
    const disciplina = await prisma.disciplina.update({
        where: { id: Number(id) },
        data: { nume, domeniu },
    });
    res.json(disciplina);
});

// DELETE requests


/**
 * @swagger
 * /admin/profesori/{id}:
 *   delete:
 *     summary: Sterge un profesor
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID-ul profesorului
 *     responses:
 *       204:
 *         description: Profesor sters cu succes
 */
router.delete('/profesori/:id', async (req, res) => {
    const { id } = req.params;
    await prisma.profesor.delete({ where: { id: Number(id) } });
    res.sendStatus(204);
});

/**
 * @swagger
 * /admin/studenti/{id}:
 *   delete:
 *     summary: Sterge un student
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID-ul studentului
 *     responses:
 *       204:
 *         description: Student sters cu succes
 */
router.delete('/studenti/:id', async (req, res) => {
    const { id } = req.params;
    await prisma.student.delete({ where: { id: Number(id) } });
    res.sendStatus(204);
});

/**
 * @swagger
 * /admin/discipline/{id}:
 *   delete:
 *     summary: Sterge o disciplina
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID-ul disciplinei
 *     responses:
 *       204:
 *         description: Disciplina stearsa cu succes
 */
router.delete('/discipline/:id', async (req, res) => {
    const { id } = req.params;
    await prisma.disciplina.delete({ where: { id: Number(id) } });
    res.sendStatus(204);
});

/**
 * @swagger
 * /admin/note/{id}:
 *   delete:
 *     summary: Sterge o nota
 *     tags: [Admin]
 *     parameters:
 *       - in: path
 *         name: id
 *         schema:
 *           type: integer
 *         required: true
 *         description: ID-ul notei
 *     responses:
 *       204:
 *         description: Nota stearsa cu succes
 */
router.delete('/note/:id', async (req, res) => {
    const { id } = req.params;
    await prisma.nota.delete({ where: { id: Number(id) } });
    res.sendStatus(204);
});

export default router;
