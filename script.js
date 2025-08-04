// Variables para lightbox y álbumes
const lightbox = document.getElementById("lightbox");
const lightboxContent = document.getElementById("lightbox-content");
const closeBtn = document.querySelector(".close-lightbox");
const prevBtn = document.querySelector(".prev-photo");
const nextBtn = document.querySelector(".next-photo");
const currentPhotoSpan = document.getElementById("current-photo");
const totalPhotosSpan = document.getElementById("total-photos");
const albumTitleLightbox = document.getElementById("album-title-lightbox");

let currentAlbumItems = [];
let currentPhotoIndex = 0;
let currentAlbumTitle = "";

// Manejo de la carga de la página
document.addEventListener('DOMContentLoaded', function() {
  console.log('Página cargada - Hero con imagen de fondo');
  
  // Inicializar mapa después de que se cargue el DOM
  setTimeout(() => {
    initializeMap();
    initializeMapControls(); // Nueva función para inicializar controles del mapa
    initializeAdvancedLightbox(); // Inicializar controles avanzados del lightbox
  }, 100);
});

// Botón para iniciar - scroll hacia la primera sección
document.getElementById("startBtn").addEventListener("click", () => {
  window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
});

// Manejar títulos clickeables - Abrir directamente lightbox
document.querySelectorAll(".album-title-clickable").forEach(title => {
  title.addEventListener("click", (e) => {
    e.preventDefault();
    const albumId = title.getAttribute("data-album");
    openAlbumDirectly(albumId);
  });
});

// Función para abrir álbum directamente en lightbox
function openAlbumDirectly(albumId) {
  // Verificar si es un álbum futuro
  if (albumId.startsWith('future')) {
    showFutureDestinationMessage(albumId);
    return;
  }
  
  // Obtener todas las fotos del álbum específico
  currentAlbumItems = Array.from(document.querySelectorAll(`.album-item[data-album="${albumId}"]`));
  
  // Obtener el título del álbum desde el título clickeable
  const titleElement = document.querySelector(`[data-album="${albumId}"].album-title-clickable`);
  currentAlbumTitle = titleElement ? titleElement.textContent : "Álbum";
  
  if (currentAlbumItems.length > 0) {
    currentPhotoIndex = 0; // Empezar con la primera foto
    openLightbox();
    showPhoto(0);
  }
}

// Ya no necesitamos estas funciones de álbum por separado
// Comentamos o eliminamos la funcionalidad de vista de cuadrícula

// Lightbox para fotos y videos del álbum con navegación (ya no necesario porque se abre directamente)
// document.querySelectorAll(".album-item").forEach((el, index) => {
//   el.addEventListener("click", () => {
//     const albumId = el.getAttribute("data-album");
//     currentAlbumItems = Array.from(document.querySelectorAll(`.album-item[data-album="${albumId}"]`));
//     currentPhotoIndex = currentAlbumItems.indexOf(el);
    
//     openLightbox();
//     showPhoto(currentPhotoIndex);
//   });
// });

// Función para abrir lightbox
function openLightbox() {
  lightbox.style.display = "flex";
  totalPhotosSpan.textContent = currentAlbumItems.length;
  albumTitleLightbox.textContent = currentAlbumTitle;
  document.body.style.overflow = "hidden";
  
  // Ocultar el botón del mapa
  const mapToggleBtn = document.querySelector('.map-toggle-btn');
  if (mapToggleBtn) {
    mapToggleBtn.style.opacity = '0';
    mapToggleBtn.style.visibility = 'hidden';
    mapToggleBtn.style.transform = 'translateY(20px)';
  }
  
  // Activar animaciones después de mostrar
  setTimeout(() => {
    lightbox.classList.add("active");
  }, 50);
}

// Función para mostrar foto específica
function showPhoto(index) {
  if (index < 0 || index >= currentAlbumItems.length) return;
  
  currentPhotoIndex = index;
  const item = currentAlbumItems[index];
  lightboxContent.innerHTML = "";

  if (item.tagName === "IMG") {
    const img = document.createElement("img");
    img.src = item.src;
    img.alt = item.alt;
    lightboxContent.appendChild(img);
  } else if (item.tagName === "VIDEO") {
    const video = document.createElement("video");
    video.src = item.querySelector("source").src;
    video.controls = true;
    video.autoplay = true;
    video.muted = true;
    lightboxContent.appendChild(video);
  }

  // Actualizar contador
  currentPhotoSpan.textContent = index + 1;
  
  // Actualizar estado de botones
  prevBtn.disabled = index === 0;
  nextBtn.disabled = index === currentAlbumItems.length - 1;
}

// Navegación en lightbox
prevBtn.addEventListener("click", () => {
  if (currentPhotoIndex > 0) {
    showPhoto(currentPhotoIndex - 1);
  }
});

nextBtn.addEventListener("click", () => {
  if (currentPhotoIndex < currentAlbumItems.length - 1) {
    showPhoto(currentPhotoIndex + 1);
  }
});

// Navegación con teclado
document.addEventListener("keydown", (e) => {
  if (lightbox.style.display === "flex") {
    if (e.key === "ArrowLeft") {
      prevBtn.click();
    } else if (e.key === "ArrowRight") {
      nextBtn.click();
    } else if (e.key === "Escape") {
      closeLightbox();
    }
  }
});

// Cerrar lightbox
function closeLightbox() {
  // Parar auto-play si está activo
  stopAutoplayOnClose();
  
  // Remover animaciones primero
  lightbox.classList.remove("active");
  
  // Esperar a que termine la animación antes de ocultar
  setTimeout(() => {
    lightbox.style.display = "none";
    lightboxContent.innerHTML = "";
    albumTitleLightbox.textContent = "";
    document.body.style.overflow = "auto"; // Restaurar scroll al timeline
    
    // Mostrar el botón del mapa nuevamente
    const mapToggleBtn = document.querySelector('.map-toggle-btn');
    if (mapToggleBtn) {
      mapToggleBtn.style.opacity = '1';
      mapToggleBtn.style.visibility = 'visible';
      mapToggleBtn.style.transform = 'translateY(0)';
    }
    
    // Limpiar variables
    currentAlbumItems = [];
    currentPhotoIndex = 0;
    currentAlbumTitle = "";
  }, 600); // Tiempo que dura la animación de salida
}

if (closeBtn) {
  closeBtn.addEventListener("click", closeLightbox);
}

// Cerrar lightbox al hacer clic fuera del contenido
if (lightbox) {
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });
}

// ======================== MAPAMUNDI INTERACTIVITY ========================

// Función para inicializar el mapa cuando el DOM esté listo
function initializeMap() {
    console.log('Inicializando mapa...');
    
    // Obtener todos los marcadores en el mapa
    const markers = document.querySelectorAll('.marker');
    console.log('Marcadores encontrados:', markers.length);
    
    markers.forEach((marker, index) => {
        const albumId = marker.getAttribute('data-album');
        const albumTitle = marker.getAttribute('data-title') || formatAlbumName(albumId);
        
        console.log(`Marcador ${index + 1}:`, albumId, albumTitle);
        
        // Click para abrir álbum
        marker.addEventListener('click', () => {
            console.log('Click en marcador:', albumId);
            // Cerrar el mapa
            if (window.closeMap) {
                window.closeMap();
            }
            
            // Dar tiempo para que se cierre el mapa antes de abrir el álbum
            setTimeout(() => {
                openAlbumDirectly(albumId);
            }, 300);
        });
        
        // Los tooltips ya no son necesarios porque las etiquetas están integradas
        // Pero mantenemos compatibilidad por si acaso
        marker.addEventListener('mouseenter', (e) => {
            // El marcador ya tiene su propia etiqueta, no necesitamos tooltip externo
        });
        
        marker.addEventListener('mouseleave', () => {
            // Limpiar cualquier tooltip si existiera
            if (mapTooltip) {
                mapTooltip.classList.remove('visible');
            }
        });
    });
    
    // ======================== SUBMENU ISLAS CANARIAS ========================
    
    // Manejar clics en el submenú de Canarias
    const submenuItems = document.querySelectorAll('.submenu-item');
    submenuItems.forEach(item => {
        item.addEventListener('click', (e) => {
            e.stopPropagation(); // Evitar que se propague al marcador padre
            const albumId = item.getAttribute('data-album');
            console.log('Click en submenú:', albumId);
            
            // Cerrar el mapa
            if (window.closeMap) {
                window.closeMap();
            }
            
            // Dar tiempo para que se cierre el mapa antes de abrir el álbum
            setTimeout(() => {
                openAlbumDirectly(albumId);
            }, 300);
        });
    });
    
    // Evitar que el click en los marcadores principales haga algo
    const canariasMarker = document.querySelector('.marker.canarias-group');
    if (canariasMarker) {
        canariasMarker.addEventListener('click', (e) => {
            e.preventDefault();
            // No hacer nada, solo mostrar el submenú en hover
        });
    }
    
    const espanaMarker = document.querySelector('.marker.espana-group');
    if (espanaMarker) {
        espanaMarker.addEventListener('click', (e) => {
            e.preventDefault();
            // No hacer nada, solo mostrar el submenú en hover
        });
    }
    
    const balearesMarker = document.querySelector('.marker.baleares-group');
    if (balearesMarker) {
        balearesMarker.addEventListener('click', (e) => {
            e.preventDefault();
            // No hacer nada, solo mostrar el submenú en hover
        });
    }
    
    console.log('Sistema de mapamundi inicializado correctamente');
}

// ======================== FUNCIONALIDAD EXTENDIDA ========================

// Alias para mantener compatibilidad con marcadores del mapa
function openAlbum(albumId) {
    openAlbumDirectly(albumId);
}

// Función para mostrar mensaje de destinos futuros
function showFutureDestinationMessage(albumId) {
    console.log('Mostrando mensaje futuro para:', albumId);
    
    // Obtener el nombre del destino desde el marcador
    const marker = document.querySelector(`[data-album="${albumId}"]`);
    console.log('Marcador encontrado:', marker);
    
    const destinationTitle = marker ? marker.getAttribute('data-title') : 'Destino futuro';
    const destinationName = marker ? marker.querySelector('.marker-label').textContent : 'Destino';
    
    console.log('Destino:', destinationName, 'Título:', destinationTitle);
    
    // Crear overlay de mensaje
    const messageOverlay = document.createElement('div');
    messageOverlay.className = 'future-destination-overlay';
    messageOverlay.innerHTML = `
        <div class="future-destination-content">
            <div class="future-destination-icon">✈️</div>
            <h2>${destinationName}</h2>
            <p>Este será nuestro próximo destino...</p>
            <p class="future-subtitle">¡Próximamente nuevos recuerdos!</p>
            <button class="close-future-message">Cerrar</button>
        </div>
    `;
    
    // Añadir al body
    document.body.appendChild(messageOverlay);
    
    // Mostrar con animación
    setTimeout(() => {
        messageOverlay.classList.add('active');
    }, 10);
    
    // Manejar cierre
    const closeBtn = messageOverlay.querySelector('.close-future-message');
    const closeMessage = () => {
        messageOverlay.classList.remove('active');
        setTimeout(() => {
            document.body.removeChild(messageOverlay);
        }, 300);
    };
    
    closeBtn.addEventListener('click', closeMessage);
    messageOverlay.addEventListener('click', (e) => {
        if (e.target === messageOverlay) {
            closeMessage();
        }
    });
}

// ======================== FUNCIONES DEL MAPA ========================

// Función para inicializar los controles del mapa
function initializeMapControls() {
    console.log('Inicializando controles del mapa...');
    
    // Variables del mapa
    const mapOverlay = document.querySelector('.map-overlay');
    const mapToggleBtn = document.querySelector('.map-toggle-btn');
    const closeMapBtn = document.querySelector('.close-map');

    console.log('Elementos del mapa:', {
        mapOverlay: mapOverlay,
        mapToggleBtn: mapToggleBtn,
        closeMapBtn: closeMapBtn
    });

    // Función para abrir el mapa
    function openMap() {
        console.log('Abriendo mapa...');
        if (mapOverlay) {
            mapOverlay.style.display = 'flex';
            // Ocultar el botón del mapa
            if (mapToggleBtn) {
                mapToggleBtn.style.opacity = '0';
                mapToggleBtn.style.visibility = 'hidden';
                mapToggleBtn.style.transform = 'translateY(20px)';
            }
            setTimeout(() => {
                mapOverlay.classList.add('active');
            }, 10);
        } else {
            console.error('No se encontró mapOverlay');
        }
    }

    // Función para cerrar el mapa
    function closeMap() {
        console.log('Cerrando mapa...');
        if (mapOverlay) {
            mapOverlay.classList.remove('active');
            setTimeout(() => {
                mapOverlay.style.display = 'none';
                // Mostrar el botón del mapa nuevamente
                if (mapToggleBtn) {
                    mapToggleBtn.style.opacity = '1';
                    mapToggleBtn.style.visibility = 'visible';
                    mapToggleBtn.style.transform = 'translateY(0)';
                }
            }, 600);
        }
    }

    // Event listeners para el mapa
    if (mapToggleBtn) {
        console.log('Añadiendo event listener al botón del mapa');
        mapToggleBtn.addEventListener('click', openMap);
    } else {
        console.error('No se encontró mapToggleBtn');
    }

    if (closeMapBtn) {
        closeMapBtn.addEventListener('click', closeMap);
    }

    // Cerrar mapa al hacer clic fuera del contenido
    if (mapOverlay) {
        mapOverlay.addEventListener('click', (e) => {
            if (e.target === mapOverlay) {
                closeMap();
            }
        });
    }
    
    // Hacer las funciones globales para uso en initializeMap
    window.openMap = openMap;
    window.closeMap = closeMap;
}

// ======================== FUNCIONES AVANZADAS DEL LIGHTBOX ========================

// Variables para auto-play y zoom
let autoplayInterval = null;
let isAutoplayActive = false;
let isZoomMode = false;

// Función para inicializar controles avanzados del lightbox
function initializeAdvancedLightbox() {
    const autoplayBtn = document.getElementById('autoplay-btn');
    const zoomBtn = document.getElementById('zoom-btn');
    
    // Auto-play functionality
    if (autoplayBtn) {
        autoplayBtn.addEventListener('click', toggleAutoplay);
    }
    
    // Zoom functionality
    if (zoomBtn) {
        zoomBtn.addEventListener('click', toggleZoomMode);
    }
    
    // Click en imagen para zoom si está en modo zoom
    document.addEventListener('click', (e) => {
        if (e.target.matches('.lightbox-content img') && isZoomMode) {
            toggleImageZoom(e.target);
        }
    });
}

// Función para toggle auto-play
function toggleAutoplay() {
    const autoplayBtn = document.getElementById('autoplay-btn');
    
    if (isAutoplayActive) {
        // Parar auto-play
        clearInterval(autoplayInterval);
        isAutoplayActive = false;
        autoplayBtn.classList.remove('active');
        autoplayBtn.textContent = '⏯️';
    } else {
        // Iniciar auto-play
        isAutoplayActive = true;
        autoplayBtn.classList.add('active');
        autoplayBtn.textContent = '⏸️';
        
        autoplayInterval = setInterval(() => {
            if (currentPhotoIndex < currentAlbumItems.length - 1) {
                showPhoto(currentPhotoIndex + 1);
            } else {
                showPhoto(0); // Volver al inicio
            }
        }, 3000); // Cambiar cada 3 segundos
    }
}

// Función para toggle zoom mode
function toggleZoomMode() {
    const zoomBtn = document.getElementById('zoom-btn');
    const currentImg = lightboxContent.querySelector('img');
    
    isZoomMode = !isZoomMode;
    
    if (isZoomMode) {
        zoomBtn.classList.add('active');
        zoomBtn.textContent = '🔍✓';
        if (currentImg) {
            currentImg.classList.add('zoom-mode');
        }
    } else {
        zoomBtn.classList.remove('active');
        zoomBtn.textContent = '🔍';
        if (currentImg) {
            currentImg.classList.remove('zoom-mode', 'zoomed');
        }
    }
}

// Función para toggle zoom en imagen específica
function toggleImageZoom(img) {
    if (img.classList.contains('zoomed')) {
        img.classList.remove('zoomed');
    } else {
        img.classList.add('zoomed');
    }
}

// Función para parar auto-play cuando se cierra el lightbox
function stopAutoplayOnClose() {
    if (isAutoplayActive) {
        clearInterval(autoplayInterval);
        isAutoplayActive = false;
        const autoplayBtn = document.getElementById('autoplay-btn');
        if (autoplayBtn) {
            autoplayBtn.classList.remove('active');
            autoplayBtn.textContent = '⏯️';
        }
    }
    
    // Reset zoom mode
    isZoomMode = false;
    const zoomBtn = document.getElementById('zoom-btn');
    if (zoomBtn) {
        zoomBtn.classList.remove('active');
        zoomBtn.textContent = '🔍';
    }
}
