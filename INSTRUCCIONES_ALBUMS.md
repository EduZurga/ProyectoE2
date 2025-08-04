# 📸 INSTRUCCIONES PARA AÑADIR FOTOS A LOS ÁLBUMES

## 🗂️ Estructura de Carpetas Creadas:

```
album/
├── londres23/     (Londres - 2023)
├── cadiz23/       (Cádiz - 2023) 
├── lanzarote24/   (Lanzarote - 2024)
├── ibiza24/       (Ibiza - 2024)
├── asturias24/    (Asturias - 2024)
└── vienna24/      (Viena - 2024)
```

## 📋 Pasos Para Añadir Fotos:

### 1. **Añadir Fotos de Portada del Timeline**
En la carpeta `timeline/` añade estas imágenes en formato portrait/vertical:
- `londres-portrait.jpeg`
- `cadiz-portrait.jpeg` 
- `lanzarote-portrait.jpeg`
- `ibiza-portrait.jpeg`
- `asturias-portrait.jpeg`
- `vienna-portrait.jpeg`

### 2. **Añadir Fotos del Álbum**
Para cada destino, añade las fotos en su carpeta correspondiente:

**Ejemplo para Londres:**
```html
<!-- En index.html, busca el álbum de Londres (album3) y añade: -->
<img src="album/londres23/londres1.jpeg" alt="Foto 1" class="album-item" data-album="album3"/>
<img src="album/londres23/londres2.jpeg" alt="Foto 2" class="album-item" data-album="album3"/>
<img src="album/londres23/londres3.jpeg" alt="Foto 3" class="album-item" data-album="album3"/>
<!-- Si tienes videos: -->
<video class="album-item" data-album="album3" muted>
  <source src="album/londres23/londres-video1.mp4" type="video/mp4" />
</video>
```

### 3. **Plantilla para Cada Álbum:**

**CÁDIZ (album4):**
```html
<img src="album/cadiz23/cadiz1.jpeg" alt="Foto 1" class="album-item" data-album="album4"/>
<img src="album/cadiz23/cadiz2.jpeg" alt="Foto 2" class="album-item" data-album="album4"/>
```

**LANZAROTE (album5):**
```html
<img src="album/lanzarote24/lanzarote1.jpeg" alt="Foto 1" class="album-item" data-album="album5"/>
<img src="album/lanzarote24/lanzarote2.jpeg" alt="Foto 2" class="album-item" data-album="album5"/>
```

**IBIZA (album6):**
```html
<img src="album/ibiza24/ibiza1.jpeg" alt="Foto 1" class="album-item" data-album="album6"/>
<img src="album/ibiza24/ibiza2.jpeg" alt="Foto 2" class="album-item" data-album="album6"/>
```

**ASTURIAS (album7):**
```html
<img src="album/asturias24/asturias1.jpeg" alt="Foto 1" class="album-item" data-album="album7"/>
<img src="album/asturias24/asturias2.jpeg" alt="Foto 2" class="album-item" data-album="album7"/>
```

**VIENA (album8):**
```html
<img src="album/vienna24/vienna1.jpeg" alt="Foto 1" class="album-item" data-album="album8"/>
<img src="album/vienna24/vienna2.jpeg" alt="Foto 2" class="album-item" data-album="album8"/>
```

## ⚡ Mejoras Implementadas:

✅ **Distancia Vertical Reducida:**
- Desktop: 55vh por álbum (antes 80vh)
- Tablet: 45vh por álbum
- Móvil: 40vh por álbum
- Márgenes reducidos entre slides

✅ **8 Álbumes Preparados:**
- Gran Canaria 2022 ✅ (ya tiene fotos)
- Tenerife 2023 ✅ (ya tiene fotos)  
- Londres 2023 🆕
- Cádiz 2023 🆕
- Lanzarote 2024 🆕
- Ibiza 2024 🆕
- Asturias 2024 🆕
- Viena 2024 🆕

## 🎯 Próximos Pasos:

1. Añade las imágenes de portada en `timeline/`
2. Copia tus fotos a las carpetas correspondientes en `album/`
3. Edita el `index.html` para añadir las rutas de las fotos
4. ¡Disfruta de tu timeline interactivo!

---
*El scroll ahora es mucho más fluido y todos los álbumes mantienen las animaciones premium.*
