Aplicatie catalog virtual

1. Arhitectura Aplicatiei

Aplicatia este un backend dezvoltat folosind Node.js si Express.js, cu baza de date gestionata prin Prisma ORM și PostgreSQL. Functionalitatile aplicatiei includ autentificarea utilizatorilor, gestionarea disciplinelor, testarilor (examinarilor) si notelor pentru studenti si profesori.


2. Componente Principale

	- Express.JS - framework-ul utilizat pentru a construi serverul web si pentru a defini rutele API
	- Prisma - ORM folosit pentru interactiunea cu baza de date PostgreSQL
	- JWT (Json Web Token) - utilizat pentru autentificare
	- Middlewares - functii care proceseaza cereririle HTTP inainte de a ajunge la rutele finale, cum ar fi autentificarea si verificarea rolului utilizatorului
	- Swagger - folosit pentru documentarea API-ului


3. Autentificare

	3.1 Login
	- utilizatorul trimite cererea de autentificare cu email si parola
	- aplicatia verifica emailul si parola, si daca sunt corecte, returneaza un token JWT
	- tokenul este trimis in raspunsul HTTP

	3.2. Middleware de autentificare
	- "authMiddleware.js" verifica prezenta si validitatea tokenului JWT in cerere
	- daca tokenul este valid, middleware-ul ataseaza datele utilizatorului (id, email, rol) la obiectul "req"

	3.3 Middleware de rol
	- "roleMiddleware.js" verifica daca utilizatorul are rolul necesar pentru a accesa ruta

4. Gestionarea datelor

	Profesori
	- crearea unui profesor: un admin poate crea un profesor nou, iar parola este criptata inainte de a fi salvata in baza de date
	- vizualizarea disciplinelor: profesorii pot vedea disciplinele cu care au contract (pe care le predau)
	- adaugarea testarilor: profesorii pot adauga examinari noi pentru disciplinele lor
	- adaugarea si actualizarea notelor: profesorii pot adauga si actualiza note studentilor

	Studenti
	- vizualizarea disciplinelor: studentii pot vedea disciplinele la care sunt inscrisi
	- vizualizarea notelor: studentii pot vedea notele pe care le-au obtinut in urma testarilor


5. Documentare API

Configurarea Swagger ofera o interfata unde utilizatorii pot vedea si testa rute disponibile


6. Pasii pentru rulare
Instalam toate dependintele, folosind comanda urmatoare intr-un terminal:
$ npm install

Ne conectam local, spre exemplu, cu Docker la baza de date. Docker trebuie sa fie pornit.
$ docker run -p 5432:5432 --name local-postgres -e POSTGRES_PASSWORD=mysecretpassword -d postgres

Apoi aplicam migrarea.
$ npx prisma migrate dev 
$ npx prisma generate

Pentru a vizualiza datele din baza de date:
$ npx prisma studio

In alt terminal rulam serverul, folosind scriptul "start" definit in package.json
$ npm start
Sau putem rula direct; e acelasi lucru
$ node app.js


7. Concluzie

Aplicatia ofera o solutie pentru gestionarea unei platforme academice, permitand administrarea profesorilor, studentilor, disciplinelor, testarilor, si a notelor. Prin utilizarea middlewares pentru autentificare, aplicatia asigura securitatea accesului.

