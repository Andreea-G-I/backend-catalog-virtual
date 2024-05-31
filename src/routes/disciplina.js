import express from 'express';
import { PrismaClient } from '@prisma/client';

/**
 * @swagger
 * tags:
 *   name: Disciplina
 */

const router = express.Router();
const prisma = new PrismaClient();

/**
 * @swagger
 * /discipline:
 *   get:
 *     summary: Lista disciplinelor, publica
 *     tags: [Disciplina]
 *     responses:
 *       200:
 *         description: O lista de discipline
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
router.get('/', async (req, res) => {
    const discipline = await prisma.disciplina.findMany();
    res.json(discipline);
});

export default router;
