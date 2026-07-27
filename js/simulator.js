/**
 * Simulador de Costos - Versión Simplificada
 */
window.SimuladorCostos = {
  estado: {
    servicios: [
      { id: "formateo_so", nombre: "Formateo e Instalación de SO", precio: 1000, cantidad: false },
      { id: "respaldo_datos", nombre: "Respaldo de Datos (por cada 100GB)", precio: 700, cantidad: true, unidad: "100GB" },
      { id: "respaldo_so_datos", nombre: "Respaldo de SO (imagen) y Datos en Disco Duro", precio: 1700, cantidad: false },
      { id: "instalacion_software", nombre: "Instalación y/o Actualización de Software", precio: 500, cantidad: false },
      { id: "instalacion_impresora", nombre: "Instalación de Impresora o Periférico", precio: 800, cantidad: false },
      { id: "recuperacion_datos", nombre: "Recuperación de Datos por Software", precio: 2000, cantidad: false },
      { id: "mantenimiento_preventivo", nombre: "Mantenimiento Preventivo (Limpieza)", precio: 1000, cantidad: false },
      { id: "asesoria", nombre: "Asesoría y Consultoría a Domicilio (por hora)", precio: 1000, cantidad: true, unidad: "hora" },
      { id: "diagnostico", nombre: "Diagnóstico (Reembolsable si se realiza reparación)", precio: 500, cantidad: false, reembolsable: true },
      { id: "instalacion_red", nombre: "Instalación Física de Red, Cableado y Tarjetas de Red (por PC)", precio: 2000, cantidad: true, unidad: "PC" },
      { id: "configuracion_red", nombre: "Configuración en Red de Cliente (por PC)", precio: 900, cantidad: true, unidad: "PC" },
      { id: "configurar_impresora_red", nombre: "Configurar Impresora en Red", precio: 900, cantidad: false }
    ],
    costosAdicionales: [
      { id: "recogida_entrega", nombre: "Recogida y Entrega a Domicilio", precio: 500 },
      { id: "sin_urgencia", nombre: "Sin urgencia", precio: 0, esUrgencia: true, esDefault: true },
      { id: "urgencia_taller", nombre: "Urgencia en Taller", precio: 800, esUrgencia: true },
      { id: "urgencia_domicilio", nombre: "Urgencia a Domicilio", precio: 1000, esUrgencia: true }
    ],
    seleccionados: [],
    aplicarDescuento: false
  },

  init: function() {
    console.log('[Simulador] Inicializando...');
    console.log('[Simulador] ✓ Cargados', this.estado.servicios.length, 'servicios');
    this.renderizar();
    return true;
  },

  renderizar: function() {
    console.log('[Simulador] Renderizando...');
    this.renderizarServicios();
    this.renderizarCostosAdicionales();
  },

  renderizarServicios: function() {
    const container = document.getElementById('simulador-servicios-lista');
    if (!container) {
      console.error('[Simulador] No se encontró: simulador-servicios-lista');
      return;
    }

    container.innerHTML = '';

    this.estado.servicios.forEach(servicio => {
      const div = document.createElement('div');
      div.className = 'simulador-servicio mb-3 p-3 border rounded';

      let html = `
        <label class="mb-0">
          <input type="checkbox" data-id="${servicio.id}" 
                 onchange="window.SimuladorCostos.toggleServicio('${servicio.id}')">
          <strong>${servicio.nombre}</strong>
        </label>
        <div class="text-muted small mt-1">
          $${servicio.precio.toLocaleString('es-UY')}
          ${servicio.cantidad ? ' por ' + servicio.unidad : ''}
          ${servicio.reembolsable ? '<span class="badge badge-info ml-2">Reembolsable</span>' : ''}
        </div>
      `;

      if (servicio.cantidad) {
        html += `
          <input type="number" class="form-control form-control-sm" 
                 data-qty="${servicio.id}" value="1" min="1" max="100"
                 onchange="window.SimuladorCostos.actualizarCantidad('${servicio.id}', this.value)"
                 style="width: 70px; margin-top: 5px; display: none;">
        `;
      }

      div.innerHTML = html;
      container.appendChild(div);
    });

    console.log('[Simulador] ✓ Servicios renderizados');
  },

  renderizarCostosAdicionales: function() {
    const container = document.getElementById('simulador-costos-adicionales');
    if (!container) {
      console.error('[Simulador] No se encontró: simulador-costos-adicionales');
      return;
    }

    container.innerHTML = '<h6 class="mb-3">Costos Adicionales</h6>';

    this.estado.costosAdicionales.forEach(costo => {
      const div = document.createElement('div');
      div.className = 'mb-2';

      const isUrgencia = costo.esUrgencia;
      const inputType = isUrgencia ? 'radio' : 'checkbox';
      const radioName = isUrgencia ? 'urgencia' : '';
      const isChecked = costo.esDefault ? 'checked' : '';
      const precioTexto = costo.precio > 0 ? ` - $${costo.precio.toLocaleString('es-UY')}` : '';

      div.innerHTML = `
        <label class="mb-0">
          <input type="${inputType}" ${radioName ? `name="${radioName}"` : ''} 
                 data-id="${costo.id}" value="${costo.id}" ${isChecked}
                 onchange="window.SimuladorCostos.toggleCosto('${costo.id}', this.checked)">
          ${costo.nombre}${precioTexto}
        </label>
      `;

      container.appendChild(div);
    });

    // Descuento de diagnóstico
    const descDiv = document.createElement('div');
    descDiv.className = 'mt-3 pt-3 border-top';
    descDiv.innerHTML = `
      <label class="mb-0">
        <input type="checkbox" id="descuento-diag"
               onchange="window.SimuladorCostos.toggleDescuento()">
        <strong>Se realiza reparación (descuento diagnóstico)</strong>
      </label>
    `;
    container.appendChild(descDiv);

    console.log('[Simulador] ✓ Costos adicionales renderizados');
  },

  toggleServicio: function(servicioId) {
    const checkbox = document.querySelector(`[data-id="${servicioId}"]`);
    const qtyInput = document.querySelector(`[data-qty="${servicioId}"]`);
    const servicio = this.estado.servicios.find(s => s.id === servicioId);

    if (!checkbox) return;

    if (checkbox.checked) {
      if (qtyInput) qtyInput.style.display = 'block';
      const cantidad = qtyInput ? parseInt(qtyInput.value) : 1;
      this.estado.seleccionados.push({ id: servicioId, cantidad, tipo: 'servicio' });
    } else {
      if (qtyInput) qtyInput.style.display = 'none';
      this.estado.seleccionados = this.estado.seleccionados.filter(s => s.id !== servicioId);
    }
    this.actualizarTotal();
  },

  actualizarCantidad: function(servicioId, cantidad) {
    const item = this.estado.seleccionados.find(s => s.id === servicioId);
    if (item) {
      item.cantidad = parseInt(cantidad) || 1;
      this.actualizarTotal();
    }
  },

  toggleCosto: function(costoId, checked) {
    if (checked) {
      const costo = this.estado.costosAdicionales.find(c => c.id === costoId);
      // Solo agregar si tiene precio (ignorar "Sin urgencia" con precio 0)
      if (costo && costo.precio > 0) {
        this.estado.seleccionados.push({ id: costoId, cantidad: 1, tipo: 'costo' });
      } else if (costo && costo.precio === 0) {
        // Remover todos los costos de urgencia si se selecciona "Sin urgencia"
        this.estado.seleccionados = this.estado.seleccionados.filter(s => {
          const c = this.estado.costosAdicionales.find(co => co.id === s.id);
          return !c || !c.esUrgencia;
        });
      }
    } else {
      this.estado.seleccionados = this.estado.seleccionados.filter(s => s.id !== costoId);
    }
    this.actualizarTotal();
  },

  toggleDescuento: function() {
    this.estado.aplicarDescuento = document.getElementById('descuento-diag').checked;
    this.actualizarTotal();
  },

  calcularTotal: function() {
    let total = 0;

    this.estado.seleccionados.forEach(item => {
      const servicio = this.estado.servicios.find(s => s.id === item.id);
      const costo = this.estado.costosAdicionales.find(c => c.id === item.id);
      const precio = servicio ? servicio.precio : (costo ? costo.precio : 0);

      // Solo sumar si el precio es mayor que 0
      if (precio > 0) {
        total += precio * item.cantidad;
      }
    });

    if (this.estado.aplicarDescuento && this.estado.seleccionados.some(s => s.id === 'diagnostico')) {
      total -= 500;
    }

    return total;
  },

  actualizarTotal: function() {
    const totalEl = document.getElementById('simulador-total');
    if (!totalEl) return;

    const total = this.calcularTotal();
    totalEl.textContent = '$' + total.toLocaleString('es-UY');

    this.actualizarDesglose();
  },

  actualizarDesglose: function() {
    const desgloseEl = document.getElementById('simulador-desglose');
    if (!desgloseEl) return;

    if (this.estado.seleccionados.length === 0) {
      desgloseEl.innerHTML = '<p class="text-muted">No hay servicios seleccionados</p>';
      return;
    }

    let html = '<h6 class="mb-3">Desglose de Costos:</h6><ul class="list-unstyled">';
    let total = 0;

    this.estado.seleccionados.forEach(item => {
      const servicio = this.estado.servicios.find(s => s.id === item.id);
      const costo = this.estado.costosAdicionales.find(c => c.id === item.id);
      const nombre = servicio ? servicio.nombre : (costo ? costo.nombre : '');
      const precio = servicio ? servicio.precio : (costo ? costo.precio : 0);
      
      // Solo mostrar en desglose si tiene precio
      if (precio > 0) {
        const subtotal = precio * item.cantidad;
        total += subtotal;

        html += `<li class="d-flex justify-content-between mb-2">
          <span>${nombre}${item.cantidad > 1 ? ' (x' + item.cantidad + ')' : ''}</span>
          <strong>$${subtotal.toLocaleString('es-UY')}</strong>
        </li>`;
      }
    });

    if (this.estado.aplicarDescuento && this.estado.seleccionados.some(s => s.id === 'diagnostico')) {
      html += `<li class="d-flex justify-content-between mb-2 text-success">
        <span>Descuento Diagnóstico</span>
        <strong>-$500</strong>
      </li>`;
      total -= 500;
    }

    html += '</ul><div class="border-top pt-3"><h6 class="text-right">Total: <span class="text-primary">$' + 
            total.toLocaleString('es-UY') + '</span></h6></div>';

    desgloseEl.innerHTML = html;
  },

  limpiar: function() {
    this.estado.seleccionados = [];
    this.estado.aplicarDescuento = false;
    document.querySelectorAll('#simulador-servicios-lista input, #simulador-costos-adicionales input').forEach(el => el.checked = false);
    // Seleccionar "Sin urgencia" por defecto
    const sinUrgencia = document.querySelector('[data-id="sin_urgencia"]');
    if (sinUrgencia) sinUrgencia.checked = true;
    document.querySelectorAll('[data-qty]').forEach(el => el.style.display = 'none');
    this.actualizarTotal();
  },

  exportarPresupuesto: function() {
    if (this.estado.seleccionados.length === 0) {
      alert('Selecciona al menos un servicio');
      return;
    }

    let texto = 'PRESUPUESTO DE SERVICIOS\n========================\n\n';
    let total = 0;

    this.estado.seleccionados.forEach(item => {
      const servicio = this.estado.servicios.find(s => s.id === item.id);
      const costo = this.estado.costosAdicionales.find(c => c.id === item.id);
      const nombre = servicio ? servicio.nombre : (costo ? costo.nombre : '');
      const precio = servicio ? servicio.precio : (costo ? costo.precio : 0);
      const subtotal = precio * item.cantidad;
      total += subtotal;

      texto += nombre + (item.cantidad > 1 ? ' (x' + item.cantidad + ')' : '') + '\n$' + subtotal.toLocaleString('es-UY') + '\n\n';
    });

    if (this.estado.aplicarDescuento && this.estado.seleccionados.some(s => s.id === 'diagnostico')) {
      texto += 'Descuento Diagnóstico\n-$500\n\n';
      total -= 500;
    }

    texto += '------------------------\nTOTAL: $' + total.toLocaleString('es-UY') + '\n';
    texto += 'Fecha: ' + new Date().toLocaleDateString('es-UY');

    navigator.clipboard.writeText(texto).then(() => {
      alert('Presupuesto copiado');
    });
  },

  abrirModal: function() {
    const modal = document.getElementById('simuladorModal');
    if (!modal) return;

    if (jQuery) {
      jQuery(modal).modal('show');
    }
  }
};

// Inicializar cuando esté listo
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', () => {
    console.log('[Simulador] DOMContentLoaded - Inicializando');
    window.SimuladorCostos.init();
  });
} else {
  console.log('[Simulador] DOM ya cargado - Inicializando inmediatamente');
  window.SimuladorCostos.init();
}

// También inicializar después de un tiempo como garantía
setTimeout(() => {
  if (!window.SimuladorCostos.estado.servicios.length) {
    console.log('[Simulador] Reintentando inicialización');
    window.SimuladorCostos.init();
  }
}, 500);

