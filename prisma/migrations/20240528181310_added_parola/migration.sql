/*
  Warnings:

  - Made the column `parola` on table `Profesor` required. This step will fail if there are existing NULL values in that column.
  - Made the column `parola` on table `Student` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Profesor" ALTER COLUMN "parola" SET NOT NULL;

-- AlterTable
ALTER TABLE "Student" ALTER COLUMN "parola" SET NOT NULL;
