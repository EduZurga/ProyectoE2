// ======================== MAPAMUNDI INTERACTIVO ========================

// Configuración de destinos con videomontajes
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
  'cadiz': {
    video: 'videos/cadiz-montage.mp4',
    title: 'Cádiz',
    date: '2023',
    description: 'La Perla del Atlántico'
  },
  'lanzarote': {
    video: 'videos/lanzarote-montage.mp4',
    title: 'Lanzarote',
    date: '2024',
    description: 'Isla de volcanes'
  },
  'ibiza': {
    video: 'videos/ibiza-montage.mp4',
    title: 'Ibiza',
    date: '2024',
    description: 'Isla Blanca'
  },
  'asturias': {
    video: 'videos/asturias-montage.mp4',
    title: 'Asturias',
    date: '2024',
    description: 'Paraíso Natural'
  },
  'vienna': {
    video: 'videos/vienna-montage.mp4',
    title: 'Viena',
    date: '2024',
    description: 'Ciudad Imperial'
  }
};

let currentVideoIndex = 0;
const videoList = Object.keys(destinations);

// ======================== INICIALIZACIÓN ========================

document.addEventListener('DOMContentLoaded', function() {
  initializeMap();
  initializeVideoPlayer();
});

// ======================== FUNCIONES DEL MAPA ========================

function initializeMap() {
  // Eventos para marcadores
  document.querySelectorAll('.marker').forEach(marker => {
    marker.addEventListener('click', handleMarkerClick);
    marker.addEventListener('mouseenter', showTooltip);
    marker.addEventListener('mouseleave', hideTooltip);
  });

  // Eventos para países
  document.querySelectorAll('.country.visited').forEach(country => {
    country.addEventListener('click', handleCountryClick);
  });
}

function handleMarkerClick(event) {
  const countryCode = event.target.dataset.country;
  const destination = destinations[countryCode];
  
  if (destination) {
    // Efecto de "vuelo" hacia el país
    animateFlyToCountry(event.target);
    
    // Abrir video player después de la animación
    setTimeout(() => {
      openVideoPlayer(countryCode);
    }, 800);
  }
}

function handleCountryClick(event) {
  const countryCode = event.target.id;
  const destination = destinations[countryCode];
  
  if (destination) {
    openVideoPlayer(countryCode);
  }
}

function showTooltip(event) {
  const marker = event.target;
  const countryCode = marker.dataset.country;
  const destination = destinations[countryCode];
  
  if (destination) {
    const tooltip = createTooltip(destination.title, destination.date);
    positionTooltip(tooltip, marker);
  }
}

function hideTooltip(event) {
  const existingTooltip = document.querySelector('.marker-tooltip');
  if (existingTooltip) {
    existingTooltip.remove();
  }
}

function createTooltip(title, date) {
  // Remover tooltip existente
  const existingTooltip = document.querySelector('.marker-tooltip');
  if (existingTooltip) {
    existingTooltip.remove();
  }

  const tooltip = document.createElement('div');
  tooltip.className = 'marker-tooltip';
  tooltip.innerHTML = `${title}<br><small>${date}</small>`;
  
  document.body.appendChild(tooltip);
  
  // Mostrar tooltip con animación
  setTimeout(() => {
    tooltip.classList.add('visible');
  }, 10);
  
  return tooltip;
}

function positionTooltip(tooltip, marker) {
  const mapContainer = document.querySelector('.map-container');
  const mapRect = mapContainer.getBoundingClientRect();
  const markerRect = marker.getBoundingClientRect();
  
  const x = markerRect.left + (markerRect.width / 2);
  const y = markerRect.top;
  
  tooltip.style.left = x + 'px';
  tooltip.style.top = y + 'px';
}

function animateFlyToCountry(marker) {
  const mapContainer = document.querySelector('.world-map');
  const rect = marker.getBoundingClientRect();
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;
  
  const deltaX = centerX - rect.left;
  const deltaY = centerY - rect.top;
  
  mapContainer.style.setProperty('--fly-x', deltaX + 'px');
  mapContainer.style.setProperty('--fly-y', deltaY + 'px');
  mapContainer.style.animation = 'flyToCountry 1s cubic-bezier(0.25, 0.46, 0.45, 0.94)';
  
  setTimeout(() => {
    mapContainer.style.animation = '';
  }, 1000);
}

// ======================== VIDEO PLAYER ========================

function initializeVideoPlayer() {
  const overlay = document.getElementById('video-player');
  const closeBtn = document.querySelector('.close-video');
  const prevBtn = document.querySelector('.nav-video.prev');
  const nextBtn = document.querySelector('.nav-video.next');
  const video = document.getElementById('main-video');

  // Eventos de control
  closeBtn.addEventListener('click', closeVideoPlayer);
  prevBtn.addEventListener('click', playPreviousVideo);
  nextBtn.addEventListener('click', playNextVideo);
  
  // Cerrar con ESC
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && overlay.classList.contains('active')) {
      closeVideoPlayer();
    }
  });
  
  // Navegación con flechas
  document.addEventListener('keydown', (e) => {
    if (overlay.classList.contains('active')) {
      if (e.key === 'ArrowLeft') {
        playPreviousVideo();
      } else if (e.key === 'ArrowRight') {
        playNextVideo();
      }
    }
  });

  // Cerrar al hacer clic fuera del video
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) {
      closeVideoPlayer();
    }
  });
}

function openVideoPlayer(countryCode) {
  const destination = destinations[countryCode];
  if (!destination) return;

  const overlay = document.getElementById('video-player');
  const video = document.getElementById('main-video');
  const title = document.getElementById('destination-title');
  const date = document.getElementById('destination-date');

  // Configurar video
  video.src = destination.video;
  title.textContent = destination.title;
  date.textContent = `${destination.date} • ${destination.description}`;

  // Actualizar índice actual
  currentVideoIndex = videoList.indexOf(countryCode);
  updateNavigationButtons();

  // Mostrar overlay
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';

  // Reproducir video automáticamente
  video.play().catch(e => {
    console.log('Autoplay failed:', e);
  });
}

function closeVideoPlayer() {
  const overlay = document.getElementById('video-player');
  const video = document.getElementById('main-video');

  // Ocultar overlay
  overlay.classList.remove('active');
  document.body.style.overflow = 'auto';

  // Pausar y resetear video
  video.pause();
  video.currentTime = 0;
  
  // Limpiar source después de la animación
  setTimeout(() => {
    video.src = '';
  }, 600);
}

function playPreviousVideo() {
  if (currentVideoIndex > 0) {
    currentVideoIndex--;
    const countryCode = videoList[currentVideoIndex];
    switchToVideo(countryCode);
  }
}

function playNextVideo() {
  if (currentVideoIndex < videoList.length - 1) {
    currentVideoIndex++;
    const countryCode = videoList[currentVideoIndex];
    switchToVideo(countryCode);
  }
}

function switchToVideo(countryCode) {
  const destination = destinations[countryCode];
  const video = document.getElementById('main-video');
  const title = document.getElementById('destination-title');
  const date = document.getElementById('destination-date');

  // Fade out
  const container = document.querySelector('.video-container');
  container.style.opacity = '0.5';

  setTimeout(() => {
    // Cambiar contenido
    video.src = destination.video;
    title.textContent = destination.title;
    date.textContent = `${destination.date} • ${destination.description}`;
    
    // Fade in
    container.style.opacity = '1';
    video.play().catch(e => console.log('Play failed:', e));
    
    updateNavigationButtons();
  }, 300);
}

function updateNavigationButtons() {
  const prevBtn = document.querySelector('.nav-video.prev');
  const nextBtn = document.querySelector('.nav-video.next');

  prevBtn.disabled = currentVideoIndex === 0;
  nextBtn.disabled = currentVideoIndex === videoList.length - 1;
}

// ======================== UTILIDADES ========================

// Función para añadir botón "Ver en Mapa" al timeline existente
function addMapButton() {
  const timelineSection = document.getElementById('timeline');
  
  if (timelineSection) {
    const mapButton = document.createElement('div');
    mapButton.className = 'map-transition-button';
    mapButton.innerHTML = `
      <button onclick="scrollToMap()" class="view-map-btn">
        🌍 Ver en Mapamundi
      </button>
    `;
    
    timelineSection.appendChild(mapButton);
  }
}

function scrollToMap() {
  const mapSection = document.querySelector('.world-map-section');
  if (mapSection) {
    mapSection.scrollIntoView({ behavior: 'smooth' });
  }
}

// Función para migración gradual - mantener compatibilidad con timeline
function addMapCompatibility() {
  // Conectar títulos del timeline con países del mapa
  const albumTitles = document.querySelectorAll('.album-title-clickable');
  
  albumTitles.forEach(title => {
    const originalClick = title.onclick;
    
    title.addEventListener('click', (e) => {
      e.preventDefault();
      
      // Mostrar opciones: ver fotos o ver video
      showViewOptions(title);
    });
  });
}

function showViewOptions(titleElement) {
  const albumId = titleElement.dataset.album;
  
  // Crear modal de opciones
  const modal = document.createElement('div');
  modal.className = 'view-options-modal';
  modal.innerHTML = `
    <div class="view-options-content">
      <h3>¿Cómo quieres ver este destino?</h3>
      <button onclick="viewPhotos('${albumId}')" class="option-btn photos">
        📸 Ver Fotos
      </button>
      <button onclick="viewVideo('${albumId}')" class="option-btn video">
        🎬 Ver Videomontaje
      </button>
      <button onclick="closeViewOptions()" class="option-btn close">
        ✕ Cancelar
      </button>
    </div>
  `;
  
  document.body.appendChild(modal);
  setTimeout(() => modal.classList.add('active'), 10);
}

// Inicializar compatibilidad cuando se cargue la página
document.addEventListener('DOMContentLoaded', function() {
  addMapButton();
  addMapCompatibility();
});

// ======================== EXPORTAR PARA USO GLOBAL ========================
window.MapamundiInteractivo = {
  openVideoPlayer,
  closeVideoPlayer,
  scrollToMap,
  destinations
};
