# Medios opcionales (fotografía / video real)

La película funciona 100% con ilustración vectorial. Si quieres reemplazar fondos por
imágenes reales generadas (p. ej. en ChatGPT) o fotos propias, colócalas aquí con estos
nombres exactos en 1920×1080 (JPG/WebP) y se usarán automáticamente como fondo de la escena:

| Archivo               | Escena                    | Prompt sugerido (ES) |
|-----------------------|---------------------------|----------------------|
| `mine-day.jpg`        | 1 · Faena                 | Rajo de mina de cobre a cielo abierto en el desierto de Atacama, camión CAT 797 amarillo cargado, mediodía, polvo, fotografía cinematográfica 16:9 |
| `mine-dusk.jpg`       | 3 · Retiro                | Camino de acarreo minero al atardecer, camión de transporte con carga sobredimensionada, luz dorada, 16:9 |
| `workshop.jpg`        | 4 · Recepción / 7 · Taller| Interior de taller industrial de reparación de componentes mineros, puente grúa, mando final gigante sobre banco, técnicos con casco, 16:9 |
| `warehouse.jpg`       | 6 · Bodega                | Centro de distribución con racks industriales azules y naranjos, grúa horquilla, códigos de barra, iluminación fría, 16:9 |
| `mine-dawn.jpg`       | 8 · Cierre                | Camión CAT 797 saliendo a operar al amanecer en faena minera, 16:9 |

Las escenas buscan `/media/<archivo>` al cargar; si no existe, mantienen el fondo vectorial.
