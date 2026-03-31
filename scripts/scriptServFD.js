// scriptServFullDay.js - Lógica específica para servicio Full Day

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

    // Validación de mínimo 4 horas
    const horasSelect = document.getElementById('horas');
    if (horasSelect) {
        horasSelect.addEventListener('change', function() {
            const horas = parseInt(this.value);
            if (horas < 4 && horas !== '') {
                alert('El servicio Full Day tiene un mínimo de 4 horas');
                this.value = 4;
            }
        });
    }

    // Enviar formulario
    if (formulario) {
        formulario.addEventListener('submit', function(e) {
            e.preventDefault();

            // Validación
            const camposRequeridos = formulario.querySelectorAll('[required]');
            let valido = true;
            
            camposRequeridos.forEach(campo => {
                if (campo.type !== 'checkbox' && !campo.value.trim()) {
                    campo.style.borderColor = '#e74c3c';
                    valido = false;
                } else if (campo.type === 'checkbox' && !campo.checked) {
                    campo.closest('.checkbox-label').style.color = '#e74c3c';
                    valido = false;
                } else {
                    campo.style.borderColor = '#ccc';
                    if (campo.closest('.checkbox-label')) {
                        campo.closest('.checkbox-label').style.color = '';
                    }
                }
            });

            if (!valido) {
                alert('Por favor, complete todos los campos obligatorios (*)');
                return;
            }

            // Validación específica: mínimo 4 horas
            const horas = document.getElementById('horas').value;
            if (parseInt(horas) < 4) {
                alert('El servicio Full Day requiere un mínimo de 4 horas');
                return;
            }

            // Simulación de envío
            const botonEnviar = formulario.querySelector('.btn-enviar');
            const textoOriginal = botonEnviar.innerHTML;
            botonEnviar.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Enviando...';
            botonEnviar.disabled = true;

            // Recoger datos
            const datos = {
                servicio: 'Full Day',
                fechaSolicitud: new Date().toLocaleDateString()
            };
            
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

            console.log('Solicitud Full Day:', datos);

            setTimeout(() => {
                alert(`✅ Solicitud enviada correctamente para servicio Full Day:\n\n• Fecha: ${datos.fecha}\n• Duración: ${datos.horas} horas\n• Itinerario: ${datos.itinerario.substring(0, 50)}...\n\nNos pondremos en contacto en menos de 24 horas para confirmar disponibilidad y tarifa exacta.`);
                
                formulario.reset();
                
                // Restaurar fecha
                const fechaInput = document.getElementById('fecha');
                if (fechaInput) {
                    const hoy = new Date();
                    const manana = new Date(hoy);
                    manana.setDate(hoy.getDate() + 1);
                    fechaInput.value = manana.toISOString().split('T')[0];
                }
                
                const horaInicio = document.getElementById('hora-inicio');
                if (horaInicio) {
                    horaInicio.value = '09:00';
                }
                
                botonEnviar.innerHTML = textoOriginal;
                botonEnviar.disabled = false;
                cerrarModal();
            }, 1500);
        });
    }

    // Configurar fechas y horas por defecto
    const fechaInput = document.getElementById('fecha');
    if (fechaInput) {
        const hoy = new Date();
        const manana = new Date(hoy);
        manana.setDate(hoy.getDate() + 1);
        fechaInput.min = manana.toISOString().split('T')[0];
        fechaInput.value = manana.toISOString().split('T')[0];
    }

    const horaInicio = document.getElementById('hora-inicio');
    if (horaInicio) {
        horaInicio.value = '09:00';
    }

    // Poner horas por defecto (4)
    const horasSelectDefecto = document.getElementById('horas');
    if (horasSelectDefecto) {
        horasSelectDefecto.value = '4';
    }
});