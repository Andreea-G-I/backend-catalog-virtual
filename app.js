import express from 'express';
import cookieParser from 'cookie-parser';
import dotenv from 'dotenv';
import cors from 'cors';
import setupSwagger from './src/swagger/swagger.js';
import logger from './src/logger/logger.js';

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());

// Logger
app.use((req, res, next) => {
    logger.info(`${req.method} ${req.url}`);
    next();
});


// Rute
import authRoutes from './src/routes/_auth.js';
import adminRoutes from './src/routes/admin.js';
import profesorRoutes from './src/routes/profesor.js';
import studentRoutes from './src/routes/student.js';
import disciplineRoutes from './src/routes/disciplina.js';
import testariRoutes from './src/routes/testare.js';

app.use('/auth', authRoutes);
app.use('/admin', adminRoutes);
app.use('/profesor', profesorRoutes);
app.use('/student', studentRoutes);
app.use('/discipline', disciplineRoutes);
app.use('/testari', testariRoutes)

// Swagger
setupSwagger(app);

app.listen(process.env.PORT, () => {
    console.log(`Serverul ruleaza la http://localhost:${process.env.PORT}`);
});
