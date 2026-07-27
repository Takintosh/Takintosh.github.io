# Simulador de Costos - Guía de Uso

## 📋 Descripción

El simulador de costos es una herramienta serverless integrada en tu página de resume que permite calcular presupuestos para servicios de mantenimiento y reparación de ordenadores.

## 🚀 Características

### Servicios Base
- **Formateo e Instalación de SO** - $1,000
- **Respaldo de Datos** (por cada 100GB) - $700
- **Respaldo de SO (imagen) y Datos en Disco Duro** - $1,700
- **Instalación y/o Actualización de Software** - $500
- **Instalación de Impresora o Periférico** - $800
- **Recuperación de Datos por Software** - $2,000
- **Mantenimiento Preventivo (Limpieza)** - $1,000
- **Asesoría y Consultoría a Domicilio** (por hora) - $1,000
- **Diagnóstico (Reembolsable si se realiza reparación)** - $500
- **Instalación Física de Red, Cableado y Tarjetas de Red** (por PC) - $2,000
- **Configuración en Red de Cliente** (por PC) - $900
- **Configurar Impresora en Red** - $900

### Costos Adicionales
- **Recogida y Entrega a Domicilio** - $500
- **Urgencia en Taller** - $800 (selecciona uno)
- **Urgencia a Domicilio** - $1,000 (selecciona uno)

### Descuentos
- Si el cliente realiza la reparación, el **Diagnóstico es reembolsable** (se descuenta $500)

## 🎯 Cómo Usar

1. **Abre el Simulador**: Haz clic en el botón "Simulador" en la barra de navegación
2. **Selecciona Servicios**: Marca los checkbox de los servicios que el cliente necesita
3. **Ingresa Cantidades**: Si el servicio tiene cantidad, aparecerá un campo de entrada
4. **Agrega Costos Adicionales**: Selecciona opciones adicionales (urgencia, desplazamiento, etc.)
5. **Aplica Descuento**: Si se realiza la reparación, marca "Se realiza reparación conmigo"
6. **Copia el Presupuesto**: Usa el botón "Copiar Presupuesto" para copiar al portapapeles

## 💻 Archivos del Proyecto

- `simulator/services.json` - Base de datos de servicios y costos
- `js/simulator.js` - Lógica del simulador (JavaScript puro, sin dependencias externas)
- `css/simulator.css` - Estilos del simulador
- Modal integrado en `index.html`

## 🔧 Personalización

### Agregar un Nuevo Servicio

Edita `simulator/services.json` y agrega un objeto en el array `servicios`:

```json
{
  "id": "nuevo_servicio",
  "nombre": "Nombre del Servicio",
  "precio": 1000,
  "cantidad": false,  // true si es por unidad (hora, PC, GB, etc.)
  "unidad": "unidad",  // si cantidad es true
  "categoria": "categoria",
  "reembolsable": false  // opcional, solo para diagnóstico
}
```

### Modificar Precios

Solo edita los valores `precio` en `simulator/services.json`.

### Cambiar Costos Adicionales

Edita el array `costos_adicionales` en `simulator/services.json`.

## 🌐 Compatibilidad

- ✓ Chrome/Edge (navegadores modernos)
- ✓ Firefox
- ✓ Safari
- ✓ Dispositivos móviles
- ✓ Sin dependencias externas (vanilla JavaScript)
- ✓ Integrado con Bootstrap existente

## 📱 Funcionalidades Avanzadas

### Servicios con Cantidad
Los servicios como "Respaldo de Datos (100GB)" permiten ingresar cantidades. Por ejemplo:
- Cliente quiere respaldar 250GB = 3x Respaldo de Datos = $2,100

### Descuento Automático
Si activas "Se realiza reparación conmigo" y has seleccionado "Diagnóstico":
- El costo del diagnóstico ($500) se resta automáticamente del total

### Exportar Presupuesto
El botón "Copiar Presupuesto" genera un texto formateado con:
- Lista de servicios y costos
- Descuentos aplicados
- Total final
- Fecha

Todo se copia automáticamente al portapapeles.

## 🔗 Integración

El simulador se abre desde el botón en el navbar. Los datos se cargan desde `services.json` al iniciarse la página.

---

**Nota**: Todo funciona sin internet/servidor. Es completamente serverless.
