# Project Wolf Tracks

Proyecto personal de programación del curso de ISDI Coders.
Autor: Sergio G. Girona
Objetivo: Realiza una web single page aplication fullstack MERN y mobile first para demostrar en la práctica los conocimientos aprendidos a lo largo del bootcamp.

### La idea:

Una web para una ONG de ayuda de conservación del lobo que se especializa en hacer un seguimiento manual de diferentes manadas para tener un mayor control sobre la población lobuna, a menudo sobreestimada.

En la landing se encontrarán datos de la propia ONG con enlace a más info, así como los que se siguen por la ONG.

El proyecto se centra en crear un CRUD con dos entities, Users y Wolfs, donde el primero podrá añadir, editar, crear y borrar lobos. Los users tendán que estar registrados y logueados para acceder a toda la información así como a los métodos de crear, editar y eliminar.

## Requisitos FrontEnd:

-Vite con TypeScript
-tests unitarios
-100% coverage
-0 deuda técnica
-Colección de endpoints de Postman exportada como JSON (en el root del proyecto)

## Anotaciones

Dado que la página está centrada tanto en empleados como en usuarios normales que puedan estar interesados, el proceso de login y register no aparece visualmente en la página, sino que se accede añadiendo a la url "/login". Una vez dentro, encontraremos entonces que el menú contiene un enlace más, al perfil del empleado, donde se muestran únicamente los lobos a los que hace seguimiento.
