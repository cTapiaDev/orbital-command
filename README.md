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

---

### Requerimientos Tercera Parte (18/02):

1. <b>Composable:</b> Crear `src/composables/useMonsters.js`. Debe tener una función para encontrar los monstruos por su id.
2. <b>Ruta Dinámica:</b> Configurar el router para recibir el props `:id`
3. <b>Link:</b> Modificar `MonsterCard.vue` para que al hacer clic en el nombre o imagen, lleve a la ruta de detalle.
4. <b>Vista de Detalle (`MosterDetail.vue`):</b>
    - Debe recibir el `id` como prop.
    - Mostrar el Nombre del Monstruo.
    - Mostrar una "Carta de Rol" con sus stats (Fuerza, Destreza, etc.).
    - Botón de "Volver al Bestiario".
    - Si el monstruo es tipo "Dragón", el borde de la carga debe ser Rojo (o el color que lo represente). Si es "Bestia", Verde. Y si es 'No-muerto', Morado.

---

### Requerimientos Cuarta Parte (19/02):

1. <b>Modificar el Router:</b> Agregar rutas `children` a `bestiary/:id`.
    - '' (Ruta por defecto): Componente `MonsterStats.vue`
    - 'lore': Componente `MonsterLore.vue`
2. <b>Vista Padre (`MonsterDetail.vue`):</b>
    - Crear los `<RouterLink>` para navegar entre "Atributos" e "Historia"
    - Implementar el `<RouterLink :monster="monster" />` para inyectar los datos.
3. <b>Vistas Hijas:</b>
    - En `MonsterStats.vue`: Diseñar un grid mostrando Fuerza, Destreza, Inteligencia, etc.
    - En `MonsterLore.vue`: Mostrar la descripción larga del monstruo con un estilo tipográfico de pergamino antiguo.

---

### Requerimientos Quinta Parte (23/02)

1. <b>Mock Data:</b> Asegúrense de que su archivo `monster.js` tenga atributos como `type` (ej: 'Dragon', 'Undead', 'Beast', etc.).
2. <b>Composable (`useMonsters.js`):</b> Crear las variables reactivas `searchQuery` y `selectedType`.
3. <b>Computed Property:</b> Crear `filteredMonsters` que evalúe si el monstruo coincide con el texto escrito Y con el tipo seleccionado en un `<select>`.
4. <b>UI:</b>
    - Crear un componente `MonsterSearch.vue` e implementar un Debounce manual de 400ms.
    - Crear un componente `MonsterFilter.vue` (Select) usando `defineModel()` para enlazar los tipos de monstruo.
5. <b>V-if:</b> Mostrar un mensaje de "El conjuro de búsqueda falló: No hay monstruos que coincidan" si el array filtrado queda en 0.
