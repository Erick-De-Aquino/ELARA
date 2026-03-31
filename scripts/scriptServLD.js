// scriptServLD.js - Lógica específica para servicio Larga Distancia

document.addEventListener('DOMContentLoaded', function() {
    // Elementos del modal
    const abrirFormularioBtn = document.getElementById('abrirFormulario');
    const cerrarModalBtn = document.getElementById('cerrarModal');
    const cancelarBtn = document.getElementById('cancelarForm');
    const modalOverlay = document.getElementById('modalOverlay');
    const formulario = document.getElementById('formularioServicio');

    // Abrir modal
    if (abrirFormularioBtn) {
        abrirFormularioBtn.addEventListener('click', () => {
            modalOverlay.classList.add('activo');
            document.body.style.overflow = 'hidden';
        });
    }

    // Cerrar modal
    function cerrarModal() {
        modalOverlay.classList.remove('activo');
        document.body.style.overflow = '';
    }

    if (cerrarModalBtn) cerrarModalBtn.addEventListener('click', cerrarModal);
    if (cancelarBtn) cancelarBtn.addEventListener('click', cerrarModal);

    // Cerrar al hacer clic fuera
    modalOverlay.addEventListener('click', (e) => {
        if (e.target === modalOverlay) cerrarModal();
    });

    // Cerrar con ESC
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modalOverlay.classList.contains('activo')) {
            cerrarModal();
        }
    });

    // Enviar formulario (simulación)
    if (formulario) {
        formulario.addEventListener('submit', function(e) {
            e.preventDefault();

            // Validación
            const camposRequeridos = formulario.querySelectorAll('[required]');
            let valido = true;
            
            camposRequeridos.forEach(campo => {
                if (!campo.value.trim()) {
                    campo.style.borderColor = '#e74c3c';
                    valido = false;
                } else {
                    campo.style.borderColor = '#ccc';
                }
            });

            // Validación específica: máximo 3 pasajeros
            const pasajeros = document.getElementById('pasajeros');
            if (pasajeros && pasajeros.value > 3) {
                alert('El servicio de larga distancia tiene un máximo de 3 pasajeros');
                pasajeros.style.borderColor = '#e74c3c';
                valido = false;
            }

            if (!valido) {
                alert('Por favor, complete todos los campos obligatorios (*) correctamente');
                return;
            }

            // Simulación de envío
            const botonEnviar = formulario.querySelector('.btn-enviar');
            const textoOriginal = botonEnviar.innerHTML;
            botonEnviar.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            botonEnviar.disabled = true;

            // Recoger datos
            const datos = {};
            const elementos = formulario.elements;
            for (let elem of elementos) {
                if (elem.name && elem.type !== 'submit' && elem.type !== 'button') {
                    if (elem.type === 'checkbox') {
                        datos[elem.name] = elem.checked ? 'Sí' : 'No';
                    } else {
                        datos[elem.name] = elem.value;
                    }
                }
            }

            // Calcular distancia aproximada (simulación)
            const origen = document.getElementById('ciudad-origen').value;
            const destino = document.getElementById('ciudad-destino').value;
            
            console.log('Solicitud Larga Distancia:', datos);
            console.log('Ruta:', origen, '→', destino);

            setTimeout(() => {
                alert(`✅ Solicitud enviada correctamente para viaje: ${origen} → ${destino}\n\nNos pondremos en contacto en menos de 24 horas para confirmar precio exacto según distancia.`);
                formulario.reset();
                
                // Restaurar fecha y hora
                const fechaInput = document.getElementById('fecha');
                if (fechaInput) {
                    const hoy = new Date().toISOString().split('T')[0];
                    fechaInput.value = hoy;
                }
                
                const horaInput = document.getElementById('hora');
                if (horaInput) {
                    const ahora = new Date();
                    const hora = ahora.getHours().toString().padStart(2, '0');
                    const minutos = ahora.getMinutes().toString().padStart(2, '0');
                    horaInput.value = `${hora}:${minutos}`;
                }
                
                botonEnviar.innerHTML = textoOriginal;
                botonEnviar.disabled = false;
                cerrarModal();
            }, 1500);
        });
    }

    // Configurar fecha y hora por defecto
    const fechaInput = document.getElementById('fecha');
    if (fechaInput) {
        const hoy = new Date().toISOString().split('T')[0];
        fechaInput.min = hoy;
        fechaInput.value = hoy;
    }

    const horaInput = document.getElementById('hora');
    if (horaInput) {
        const ahora = new Date();
        const hora = ahora.getHours().toString().padStart(2, '0');
        const minutos = ahora.getMinutes().toString().padStart(2, '0');
        horaInput.value = `${hora}:${minutos}`;
    }

    // Sugerir ciudades comunes al escribir
    const ciudadOrigen = document.getElementById('ciudad-origen');
    const ciudadDestino = document.getElementById('ciudad-destino');
    
    const ciudadesComunes = ['Valencia', 'Madrid', 'Barcelona', 'Alicante', 'Murcia', 'Sevilla', 'Zaragoza', 'Bilbao'];
    
    if (ciudadOrigen) {
        ciudadOrigen.addEventListener('input', function() {
            // Podríamos añadir autocompletado aquí si quieres
        });
    }
    
    if (ciudadDestino) {
        ciudadDestino.addEventListener('input', function() {
            // Podríamos añadir autocompletado aquí si quieres
        });
    }
});