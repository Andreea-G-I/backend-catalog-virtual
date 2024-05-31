-- CreateTable
CREATE TABLE "Profesor" (
    "id" SERIAL NOT NULL,
    "nume" TEXT NOT NULL,
    "domeniu" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Profesor_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Student" (
    "id" SERIAL NOT NULL,
    "nume" TEXT NOT NULL,
    "domeniu" TEXT NOT NULL,
    "grupa" INTEGER NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Student_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Disciplina" (
    "id" SERIAL NOT NULL,
    "nume" TEXT NOT NULL,
    "domeniu" TEXT NOT NULL,

    CONSTRAINT "Disciplina_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contract" (
    "id" SERIAL NOT NULL,
    "descriere" TEXT NOT NULL,
    "id_profesor" INTEGER NOT NULL,
    "id_disciplina" INTEGER NOT NULL,

    CONSTRAINT "Contract_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Inscriere" (
    "id" SERIAL NOT NULL,
    "descriere" TEXT NOT NULL,
    "id_student" INTEGER NOT NULL,
    "id_disciplina" INTEGER NOT NULL,

    CONSTRAINT "Inscriere_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Contract" ADD CONSTRAINT "Contract_id_profesor_fkey" FOREIGN KEY ("id_profesor") REFERENCES "Profesor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Contract" ADD CONSTRAINT "Contract_id_disciplina_fkey" FOREIGN KEY ("id_disciplina") REFERENCES "Disciplina"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inscriere" ADD CONSTRAINT "Inscriere_id_student_fkey" FOREIGN KEY ("id_student") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Inscriere" ADD CONSTRAINT "Inscriere_id_disciplina_fkey" FOREIGN KEY ("id_disciplina") REFERENCES "Disciplina"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
