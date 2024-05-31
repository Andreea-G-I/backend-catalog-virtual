/*
  Warnings:

  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "Testare" (
    "id" SERIAL NOT NULL,
    "id_disciplina" INTEGER NOT NULL,
    "data" TEXT NOT NULL,

    CONSTRAINT "Testare_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Nota" (
    "id" SERIAL NOT NULL,
    "id_student" INTEGER NOT NULL,
    "id_testare" INTEGER NOT NULL,
    "valoare" INTEGER NOT NULL,

    CONSTRAINT "Nota_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Admin" (
    "id" SERIAL NOT NULL,
    "nume" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "parola" TEXT NOT NULL,

    CONSTRAINT "Admin_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Testare" ADD CONSTRAINT "Testare_id_disciplina_fkey" FOREIGN KEY ("id_disciplina") REFERENCES "Disciplina"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Nota" ADD CONSTRAINT "Nota_id_student_fkey" FOREIGN KEY ("id_student") REFERENCES "Student"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Nota" ADD CONSTRAINT "Nota_id_testare_fkey" FOREIGN KEY ("id_testare") REFERENCES "Testare"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
