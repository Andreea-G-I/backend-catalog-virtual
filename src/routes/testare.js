import express from 'express';
import { PrismaClient } from '@prisma/client';

const router = express.Router();
const prisma = new PrismaClient();

/**
 * @swagger
 * tags: 
 *   name: Testari
 * /testari:
 *   get:
 *      summary: Lista tuturor examinarilor, publica
 *      tags: [Testari]
 *      responses:
 *       200:
 *         description: Lista tuturor examinarilor
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
 *                   data:
 *                     type: string
 * 
 */
router.get('/', async (req, res) => {
    const testari = await prisma.testare.findMany();
    res.json(testari);
});

export default router;
