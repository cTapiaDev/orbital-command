# Proyecto Evaluado: "Arcane Grimoire"

<i><b>Objetivo:</b> Construir un gestor de campañas de Rol/Fatansía</i>

---

### Requerimientos Primera Parte (16/02):

1. <b>Setup:</b> Crear proyecto Vue + Tailwind v4 (Pueden cambiarlo) + FontAwesome (Pueden usar otro)
2. <b>Tema:</b> Configurar en CSS su paleta de colores.
3. <b>Iconos:</b> Instalar e importar iconos acordes a la tematica.
4. <b>Layout:</b> Crear `BookLayout.vue`
    - Debe tener una <b>Sidebar</b> a la izquierda que parezca el lomo de un libro antiguo (Sugerencia de diseño).
    - Links: "Inicio" (Dashboard) y "Bestiario" (Lista de Monstruos).
5. <b>Rutas:</b> Configurar el router para que funcione igual como lo trabajamos en la clase (Rutas anidadas dentro del layout principal).
6. <b>Datos:</b> Crear `src/data/monsters.js` con al menos 3 monstruos (Nombre, Tipo, Puntos de Vida).

---

### Requerimientos Segunda Parte (17/02):

1. <b>Iconos:</b> Registrar en `main.js` iconos de RPG: `faHeart`, `faShieldHalved`, `faSkull`.
2. <b>Componente:</b> Crear `TypeBadge.vue` que cambie de color según si el monstruo es "Bestia" (Verde), "No-muerto" (Morado) o "Dragón" (Rojo).
3. <b>Card:</b> Crear `MonsterCard.vue`
    - Debe recibir un prop `monster` (Objeto).
    - Mostrar imagen, nombre y stats (HP, AC, CR).
    - Recomendación simular un diseño de pergamino (Fondo claro/beige con texto oscuro).
4. <b>View:</b> En su vista de Bestiario:
    - Importar la data de `monsters.js`
    - Usar `v-for` para pintarlos.
    - Implementar un `MonsterSkeleton`.
