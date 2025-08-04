# 🌍 MAPAMUNDI OVERLAY - FUNCIONALIDAD ADICIONAL

## � **Concepto Actualizado: Overlay Interactivo**

### **Estructura Actual → Con Mapamundi Overlay:**
```
Timeline Existente    →    Timeline + Botón Mapa
    ↓                           ↓
Álbumes de Fotos     →    Álbumes + Mapamundi Overlay
    ↓                           ↓
Navegación Scroll    →    Scroll + Vista Mapa Alternativa
```

## 🗺️ **Mapamundi como Overlay**

### **1. Botón de Activación:**
```html
<!-- Botón flotante en la esquina de la pantalla -->
<button id="map-toggle" class="map-toggle-btn">
  🌍 Ver Mapa
</button>

<!-- Overlay del mapamundi (inicialmente oculto) -->
<div id="map-overlay" class="map-overlay">
  <div class="map-container">
    <div class="map-header">
      <h2>Nuestros Destinos</h2>
      <button class="close-map">✕</button>
    </div>
    <svg class="world-map" viewBox="0 0 1000 500">
      <!-- Mapa del mundo SVG -->
      <g id="countries">
        <path id="spain" class="country visited" />
        <path id="uk" class="country visited" />
        <path id="austria" class="country visited" />
      </g>
      
      <!-- Marcadores que conectan con álbumes actuales -->
      <g id="markers">
        <circle class="marker" cx="250" cy="200" data-album="album1" data-title="Gran Canaria"/>
        <circle class="marker" cx="240" cy="190" data-album="album2" data-title="Tenerife"/>
        <circle class="marker" cx="300" cy="150" data-album="album3" data-title="Londres"/>
        <!-- ... más marcadores -->
      </g>
    </svg>
  </div>
</div>
```

### **2. Integración con Álbumes Actuales:**
- **Marcadores conectan** directamente con `album1`, `album2`, etc.
- **Mantiene lightbox existente** con las fotos actuales
- **Navegación dual**: timeline O mapa hacia el mismo contenido

## 🎵 **Video Player Premium**

### **Características:**
- **Pantalla completa inmersiva**
- **Controles elegantes** (play/pause, volumen, timeline)
- **Transiciones cinematográficas**
- **Información del destino** superpuesta
- **Navegación entre videos** desde el player

### **Estructura del Player:**
```html
<div id="video-player" class="video-player-overlay">
  <div class="video-container">
    <video id="main-video" controls>
      <source src="" type="video/mp4">
    </video>
    
    <div class="video-info">
      <h2 id="destination-title"></h2>
      <p id="destination-date"></p>
    </div>
    
    <div class="video-navigation">
      <button class="nav-video prev">‹ Anterior</button>
      <button class="nav-video next">Siguiente ›</button>
    </div>
    
    <button class="close-video">✕</button>
  </div>
</div>
```

## 🎨 **Estilos del Mapamundi**

### **Países y Marcadores:**
```css
.world-map-section {
  min-height: 100vh;
  background: linear-gradient(135deg, #101c29 0%, #1a2f42 100%);
  display: flex;
  align-items: center;
  justify-content: center;
}

.country {
  fill: rgba(189, 178, 148, 0.1);
  stroke: rgba(189, 178, 148, 0.3);
  transition: all 0.4s ease;
}

.country.visited {
  fill: rgba(189, 178, 148, 0.3);
  cursor: pointer;
}

.country.visited:hover {
  fill: rgba(189, 178, 148, 0.5);
  filter: drop-shadow(0 0 10px rgba(189, 178, 148, 0.6));
}

.marker {
  fill: #bdb294;
  r: 8;
  cursor: pointer;
  transition: all 0.3s ease;
  animation: pulse 2s infinite;
}

.marker:hover {
  r: 12;
  fill: #d4c9a4;
  filter: drop-shadow(0 0 15px rgba(189, 178, 148, 0.8));
}

@keyframes pulse {
  0%, 100% { opacity: 1; }
  50% { opacity: 0.6; }
}
```

## 🛠️ **JavaScript Interactivo**

### **Funcionalidad Principal:**
```javascript
// Configuración de destinos
const destinations = {
  'canarias': {
    video: 'videos/canarias-montage.mp4',
    title: 'Islas Canarias',
    date: '2022-2023',
    description: 'Gran Canaria y Tenerife'
  },
  'londres': {
    video: 'videos/londres-montage.mp4',
    title: 'Londres',
    date: '2023',
    description: 'La capital británica'
  },
  // ... más destinos
};

// Evento click en marcadores
document.querySelectorAll('.marker').forEach(marker => {
  marker.addEventListener('click', (e) => {
    const country = e.target.dataset.country;
    const destination = destinations[country];
    
    if (destination) {
      openVideoPlayer(destination);
    }
  });
});

// Abrir video player
function openVideoPlayer(destination) {
  const player = document.getElementById('video-player');
  const video = document.getElementById('main-video');
  const title = document.getElementById('destination-title');
  
  video.src = destination.video;
  title.textContent = destination.title;
  
  player.classList.add('active');
  video.play();
}
```

## 🎯 **Migración Gradual**

### **Fase 1: Preparación**
1. **Mantener timeline actual** para referencia
2. **Crear videomontajes** con música
3. **Diseñar mapamundi SVG**
4. **Desarrollar player de video**

### **Fase 2: Implementación**
1. **Añadir botón** "Ver en Mapa" en timeline
2. **Integrar mapamundi** como nueva sección
3. **Conectar videos** con marcadores
4. **Testear navegación**

### **Fase 3: Refinamiento**
1. **Animaciones de transición** entre mapa y videos
2. **Efectos de hover** avanzados en países
3. **Información adicional** en tooltips
4. **Optimización mobile**

## 📱 **Adaptación Mobile**

### **Características Mobile:**
- **Mapa responsivo** con zoom touch
- **Marcadores más grandes** para táctil
- **Player fullscreen** optimizado
- **Gestos de navegación** (swipe entre videos)

## 🌟 **Características Premium**

### **Efectos Visuales:**
- **Animación de "vuelo"** entre países
- **Partículas doradas** siguiendo el cursor
- **Iluminación progresiva** de países visitados
- **Transiciones cinematográficas** al abrir videos

### **Audio:**
- **Música ambiente** sutil en el mapa
- **Crossfade** entre tracks de diferentes países
- **Controles de volumen** elegantes

## 🎬 **Herramientas Recomendadas para Videos**

### **Software de Edición:**
- **DaVinci Resolve** (gratuito, profesional)
- **Adobe Premiere Pro** (suscripción)
- **CapCut** (móvil, fácil de usar)

### **Música Libre de Derechos:**
- **Epidemic Sound**
- **AudioJungle**
- **YouTube Audio Library**
- **Freesound.org**

---

## 💫 **Resultado Final**

Un sitio web que evoluciona de:
**"Timeline de Recuerdos"** → **"Atlas Interactivo de Aventuras"**

Con videomontajes emotivos, navegación intuitiva y una experiencia verdaderamente inmersiva que cuenta vuestra historia de viajes de forma cinematográfica.

**¿Te gusta la dirección? ¿Quieres que empecemos implementando alguna parte específica?**
