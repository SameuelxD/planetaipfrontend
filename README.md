# PlanetIp Network 

## Componente App
### El componente App es el componente raíz de la aplicación React. Se encarga de gestionar el estado de autenticación del usuario, aplicar el tema oscuro o claro, y renderizar la vista correspondiente (página de inicio o página de inicio de sesión) en función del estado de autenticación.

## Descripción
### App actúa como el contenedor principal para la lógica de autenticación y la gestión del tema de la interfaz. Utiliza Redux para manejar el estado global del usuario y Firebase para la autenticación. Dependiendo de si el usuario está autenticado o no, renderiza la HomePage o la SignInPage.

## Características
### -Gestión de Estado de Autenticación: Usa Firebase para escuchar los cambios en el estado de autenticación del usuario y actualiza el estado global a través de Redux.
### -Cambio de Tema: Permite alternar entre un tema oscuro y claro.
### -Renderizado Condicional: Muestra la página de inicio de sesión o la página de inicio dependiendo del estado de autenticación del usuario.


## Componente SignInPage
### El componente SignInPage es una solución de interfaz de usuario para la autenticación de usuarios en aplicaciones React. Permite a los usuarios iniciar sesión mediante correo electrónico/contraseña, Google o GitHub. También proporciona retroalimentación sobre el éxito o fracaso del inicio de sesión mediante alertas.

## Descripción
### El componente SignInPage ofrece tres métodos de inicio de sesión:

### -Inicio de sesión con Email/Contraseña: Permite a los usuarios ingresar sus credenciales de correo electrónico y contraseña.
### -Inicio de sesión con Google: Utiliza la autenticación de Google para permitir a los usuarios iniciar sesión con sus cuentas de Google.
### -Inicio de sesión con GitHub: Utiliza la autenticación de GitHub para permitir a los usuarios iniciar sesión con sus cuentas de GitHub.
### -El componente utiliza SweetAlert2 para mostrar alertas de éxito o error, y está diseñado para integrarse fácilmente con Firebase Authentication.

## Características
### -Soporte para múltiples métodos de autenticación: Email/Contraseña, Google y GitHub.
### -Manejo de errores: Mensajes de error claros y amigables para el usuario.
### -Retroalimentación positiva: Notificaciones de éxito tras un inicio de sesión exitoso.
### -Estilo personalizable: Diseñado con CSS modular que puedes personalizar según tus necesidades.

![alt text](<imagenes/Captura de pantalla 2024-08-10 104407.png>)

![alt text](<imagenes/Captura de pantalla 2024-08-10 105408.png>)

![alt text](<imagenes/Captura de pantalla 2024-08-10 105449.png>)


## Componente HomePage
### El componente HomePage es una interfaz para la visualización y gestión de publicaciones en una aplicación React. Permite a los usuarios explorar publicaciones, buscar contenido, aplicar filtros por etiquetas y gestionar su perfil.

## Descripción
### HomePage presenta una vista de publicaciones, con funcionalidades para buscar y filtrar publicaciones por etiquetas, así como para gestionar el perfil del usuario y cerrar sesión. Utiliza Firebase para la autenticación y la gestión de datos en tiempo real.

## Características
### -Visualización de Publicaciones: Muestra una lista de publicaciones con imágenes, texto, etiquetas, likes y comentarios.
### -Búsqueda: Permite a los usuarios buscar publicaciones, usuarios y comentarios mediante un campo de búsqueda.
### -Filtrado por Etiquetas: Ofrece un modal para filtrar publicaciones según etiquetas seleccionadas.
### -Gestión del Perfil: Muestra un modal con información del perfil del usuario y la opción de cerrar sesión.
### -Interacción de Usuario: Utiliza SweetAlert2 para confirmar acciones importantes como el cierre de sesión.

![alt text](<imagenes/Captura de pantalla 2024-08-10 104651.png>)

![alt text](<imagenes/Captura de pantalla 2024-08-10 105002.png>)

![alt text](<imagenes/Captura de pantalla 2024-08-10 105038.png>)

![alt text](<imagenes/Captura de pantalla 2024-08-10 105235.png>)

![alt text](<imagenes/Captura de pantalla 2024-08-10 105318.png>)


## Conclusiones
### El componente App actúa como la base de la aplicación, gestionando la autenticación del usuario y el tema de la interfaz. Utiliza Redux para manejar el estado global y Firebase para la autenticación de usuarios. El componente proporciona una experiencia de usuario fluida mediante el renderizado condicional y la funcionalidad de cambio de tema. La implementación asegura que los usuarios autenticados vean la página principal (HomePage), mientras que los usuarios no autenticados son dirigidos a la página de inicio de sesión (SignInPage).

### Las características principales incluyen la gestión del estado de autenticación, la capacidad de cambiar entre un tema claro y oscuro, y la renderización dinámica basada en el estado de autenticación del usuario. La estructura del proyecto facilita la extensión y personalización, permitiendo futuras adiciones y ajustes según las necesidades del proyecto.

## Tecnologías Usadas
### React: Biblioteca de JavaScript para construir interfaces de usuario.
### TypeScript: Superset de JavaScript que añade tipos estáticos a los componentes React.
### Redux: Biblioteca para el manejo del estado global de la aplicación.
### Firebase: Plataforma para autenticación de usuarios y base de datos en tiempo real.
### React-Redux: Conecta Redux con los componentes de React.
### SweetAlert2: Biblioteca para mostrar alertas bonitas y personalizables.
### FontAwesome: Conjunto de íconos para la interfaz de usuario.
### React-Modal: Biblioteca para crear modales accesibles en React.


## Librerías y Paquetes
### react: ^18.0.0
### react-dom: ^18.0.0
### react-redux: ^8.0.0
### redux: ^4.2.0
### @reduxjs/toolkit: ^1.8.0
### firebase: ^10.0.0
### sweetalert2: ^11.0.0
### @fortawesome/react-fontawesome: ^0.2.0
### @fortawesome/free-solid-svg-icons: ^6.0.0
### react-modal: ^3.14.3
### typescript: ^4.6.3