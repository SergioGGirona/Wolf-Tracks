# Project Wolf Tracks

Proyecto personal de programación del curso de ISDI Coders.
Autor: Sergio G. Girona
Enlace al Deploy: https://wolf-tracks-front.vercel.app/
Objetivo: Realiza una web single page aplication fullstack MERN y mobile first para demostrar en la práctica los conocimientos aprendidos a lo largo del bootcamp.

## Importante:

- El elemento de Login no debería estar disponible y a la vista de todos, pero por motivos de Deploy y para que cualquiera pueda probar la página, lo he dejado en el menú y a la vista.
- Puedes registrarte, pero en tu perfil solo aparecen los lobos a los que tú como "empleado" estarías haciendo seguimiento (los únicos que podrías editar), por lo que si estás probando la web, te recomendaría que entraras con el usuario y la contraseña "Luffy" o el usuario y contraseña Nami, para que pruebes distintos perfiles.

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
