# Carlos Gilabert - Documentación del Proyecto  

Video Documentación del Proyecto: https://www.loom.com/share/9c5a3ae248b645f088a7a2418b969fb8
Vercel: https://vercel.com/carlos-gilaberts-projects/proyecto-hearthstone

## Introducción  
Soy Carlos Gilabert, estudiante de 1º de DAW y esta es la documentación de mi proyecto con JavaScript:

El proyecto trata de un código con HTML, CSS y JavaScript basado en el juego online de cartas **Hearthstone**, integrando varias API, cada una en una pantalla diferente.  

---

## Pantallas del Proyecto  

### 1. Index  
La primera pantalla es el **Index**, en el que se muestra:  
- Un título  
- Una imagen de presentación  
- Varios enlaces con información acerca del juego  
- Botones para interactuar con las diferentes pantallas, cada una con un **endpoint** diferente  

---

### 2. Pantalla de Cartas por Clases  
Esta pantalla muestra todas las cartas de cada clase, con un botón de **siguiente** y **anterior** para navegar entre las diferentes clases y ver todas las cartas disponibles en el juego.  

---

### 3. Buscador de Cartas  
Permite buscar cartas por nombre o palabras clave:  
- Si escribes el **nombre de una carta**, aparecerán todas las coincidencias.  
- Si usas una **palabra clave del juego** (ejemplo: "Provocar"), se mostrarán todas las cartas que contengan esa palabra en su descripción.  
- Si introduces **cualquier grupo de letras** (ejemplo: "Ar"), se mostrarán todas las cartas que incluyan esas letras en su nombre o descripción.  
- Si la búsqueda está vacía o no hay coincidencias, aparecerá un mensaje indicando que no se ha encontrado ninguna carta.  

---

### 4. Buscador de Mazos  
El juego proporciona un código para los mazos creados con 30 cartas.  

Ejemplo de código de mazo:  
AAECAZICHq6fBPjlBoHUBO+pBtXzBq3iBtmxBqviBoDUBJ/cBoefBMO6BqmxBpKxBvflBv+wBvPKBpndBsnQBsfQBqO7BoexBsXhBqO7BqLiBvrlBqHjBvzlBpj/BtK6BgAAAA==

Si introduces este código en el buscador, se mostrarán todas las cartas incluidas en ese mazo.  

## Casos especiales  
- Si el campo está vacío, aparecerá un mensaje indicando que no se encontró el mazo.  
- Si el código ingresado no tiene el formato correcto, también se mostrará un mensaje de error.  

---

## Conclusión  
Este proyecto integra múltiples **API** para mostrar información sobre Hearthstone en diferentes pantallas, permitiendo buscar cartas, explorar clases y analizar mazos con códigos predefinidos.  

