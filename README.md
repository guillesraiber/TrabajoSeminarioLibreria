# Librería Angular

## Temática del trabajo
Proyecto enfocado en una librería que muestra una lista de libros y un carrito de compras principalmente.

## Componentes Principales
- `book-list-component`
- `shopping-cart-component`

## Secciones
- `/books` — muestra el listado de libros disponibles.
- `/about` — sección informativa con datos de la librería.

 ## Servicios
- **book-data-service**  
  Se encarga de la comunicación con la MockAPI para obtener los datos de los libros que se mostrarán.

- **shopping-cart-service**  
  Maneja las acciones relacionadas con el carrito de compras, como agregar o eliminar libros.

## Métodos HTTP utilizados
- `GET` — para obtener datos de los libros desde la MockApi.
- `PUT` — para actualizar información (stock o cantidad en el carrito).
